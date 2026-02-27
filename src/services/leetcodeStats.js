const REQUEST_TIMEOUT_MS = 9000;

const DEFAULT_DIFFICULTY_STATS = [
  { difficulty: "Easy", count: 0, submissions: 0 },
  { difficulty: "Medium", count: 0, submissions: 0 },
  { difficulty: "Hard", count: 0, submissions: 0 },
];

const toSafeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

const buildDifficultyStats = (easy, medium, hard) => {
  if (easy === null || medium === null || hard === null) return null;

  return [
    { difficulty: "Easy", count: easy, submissions: easy },
    { difficulty: "Medium", count: medium, submissions: medium },
    { difficulty: "Hard", count: hard, submissions: hard },
  ];
};

const sumDifficultyCounts = (stats) =>
  stats.reduce((sum, entry) => sum + Number(entry?.count || 0), 0);

const parseSubmissionArray = (entries) => {
  if (!Array.isArray(entries)) return null;

  const difficultyMap = entries.reduce((accumulator, entry) => {
    const difficulty = String(entry?.difficulty || "").toLowerCase();
    accumulator[difficulty] = toSafeNumber(entry?.count);
    return accumulator;
  }, {});

  const stats = buildDifficultyStats(
    difficultyMap.easy ?? null,
    difficultyMap.medium ?? null,
    difficultyMap.hard ?? null,
  );

  if (!stats) return null;

  const sum = sumDifficultyCounts(stats);
  const allCount = toSafeNumber(difficultyMap.all);
  const totalSolved = allCount !== null && allCount >= sum ? allCount : sum;

  return { stats, totalSolved };
};

const parseSolvedShape = (payload) => {
  if (!payload || typeof payload !== "object") return null;

  const stats = buildDifficultyStats(
    toSafeNumber(payload.easySolved ?? payload.easy ?? payload.totalEasy),
    toSafeNumber(payload.mediumSolved ?? payload.medium ?? payload.totalMedium),
    toSafeNumber(payload.hardSolved ?? payload.hard ?? payload.totalHard),
  );

  if (!stats) return null;

  const sum = sumDifficultyCounts(stats);
  const explicitTotal = toSafeNumber(
    payload.totalSolved ??
      payload.total ??
      payload["total solved"] ??
      payload.solvedProblem ??
      payload.solvedProblems,
  );
  const totalSolved = explicitTotal !== null && explicitTotal >= sum ? explicitTotal : sum;

  return { stats, totalSolved };
};

const fetchJson = async (url, options = {}) => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  } finally {
    window.clearTimeout(timeout);
  }
};

const fetchFromLeetCodeGraphQL = async (username) => {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;

  const payload = await fetchJson("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  const submissionStats = payload?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  const parsed = parseSubmissionArray(submissionStats);

  if (!parsed) {
    throw new Error("Unexpected GraphQL payload");
  }

  return {
    stats: parsed.stats,
    totalSolved: parsed.totalSolved,
    source: "leetcode-graphql",
    updatedAt: new Date().toISOString(),
  };
};

const MIRROR_SOURCES = [
  {
    name: "alfa-api",
    resolveUrl: (username) =>
      `https://alfa-leetcode-api.onrender.com/${encodeURIComponent(username)}/solved`,
  },
  {
    name: "leetcode-stats-api",
    resolveUrl: (username) =>
      `https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(username)}`,
  },
];

const fetchFromMirrorSource = async (username, source) => {
  const url = new URL(source.resolveUrl(username));
  url.searchParams.set("_", String(Date.now()));

  const payload = await fetchJson(url.toString());
  const parsed = parseSolvedShape(payload);

  if (!parsed) {
    throw new Error(`Unexpected payload from ${source.name}`);
  }

  return {
    stats: parsed.stats,
    totalSolved: parsed.totalSolved,
    source: source.name,
    updatedAt: new Date().toISOString(),
  };
};

export const fetchLatestLeetCodeStats = async (username) => {
  if (!username) {
    throw new Error("LeetCode username is required");
  }

  try {
    return await fetchFromLeetCodeGraphQL(username);
  } catch (primaryError) {
    for (const source of MIRROR_SOURCES) {
      try {
        return await fetchFromMirrorSource(username, source);
      } catch {
        // Try next mirror source.
      }
    }

    throw new Error(
      primaryError instanceof Error
        ? primaryError.message
        : "Unable to fetch latest LeetCode stats",
    );
  }
};

export { DEFAULT_DIFFICULTY_STATS };
