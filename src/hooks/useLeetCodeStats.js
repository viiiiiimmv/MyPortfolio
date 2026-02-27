import { useEffect, useMemo, useRef, useState } from "react";
import fallbackStats from "../assets/data/leetcodeStats";
import {
  DEFAULT_DIFFICULTY_STATS,
  fetchLatestLeetCodeStats,
} from "../services/leetcodeStats";

const CACHE_KEY_PREFIX = "leetcode-stats-cache";
const DEFAULT_REFRESH_MS = 5 * 60 * 1000;

const isValidStatsArray = (value) => {
  if (!Array.isArray(value)) return false;

  return value.every((item) => {
    if (!item || typeof item !== "object") return false;
    return (
      typeof item.difficulty === "string" &&
      Number.isFinite(Number(item.count)) &&
      Number(item.count) >= 0
    );
  });
};

const normalizeStats = (value) => {
  if (!isValidStatsArray(value)) return null;

  const map = value.reduce((accumulator, entry) => {
    accumulator[String(entry.difficulty).toLowerCase()] = {
      difficulty: entry.difficulty,
      count: Number(entry.count),
      submissions: Number(entry.submissions ?? entry.count),
    };
    return accumulator;
  }, {});

  return [
    map.easy ?? DEFAULT_DIFFICULTY_STATS[0],
    map.medium ?? DEFAULT_DIFFICULTY_STATS[1],
    map.hard ?? DEFAULT_DIFFICULTY_STATS[2],
  ];
};

const FALLBACK_STATS = normalizeStats(fallbackStats) ?? DEFAULT_DIFFICULTY_STATS;
const FALLBACK_TOTAL = FALLBACK_STATS.reduce(
  (sum, entry) => sum + Number(entry.count || 0),
  0,
);

const normalizeTotalSolved = (value, minimum = 0) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return Math.max(minimum, parsed);
};

const readCache = (key) => {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const normalized = normalizeStats(parsed?.stats);
    if (!normalized) return null;

    const sum = normalized.reduce((total, entry) => total + Number(entry.count || 0), 0);

    return {
      stats: normalized,
      totalSolved: normalizeTotalSolved(parsed?.totalSolved, sum) ?? sum,
      updatedAt: parsed?.updatedAt || null,
      source: parsed?.source || "cache",
    };
  } catch {
    return null;
  }
};

const writeCache = (key, payload) => {
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({
        stats: payload.stats,
        totalSolved: payload.totalSolved,
        updatedAt: payload.updatedAt,
        source: payload.source,
      }),
    );
  } catch {
    // Ignore storage limits or blocked storage.
  }
};

export default function useLeetCodeStats(username, refreshIntervalMs = DEFAULT_REFRESH_MS) {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [totalSolved, setTotalSolved] = useState(FALLBACK_TOTAL);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState("fallback");
  const [lastUpdated, setLastUpdated] = useState(null);
  const lastSyncRef = useRef(0);

  useEffect(() => {
    if (!username) {
      setStats(FALLBACK_STATS);
      setTotalSolved(FALLBACK_TOTAL);
      setIsLoading(false);
      setIsRefreshing(false);
      setError("Username is missing");
      setSource("fallback");
      setLastUpdated(null);
      return undefined;
    }

    const cacheKey = `${CACHE_KEY_PREFIX}:${username.toLowerCase()}`;
    setError("");
    const cached = readCache(cacheKey);
    if (cached) {
      setStats(cached.stats);
      setTotalSolved(cached.totalSolved);
      setSource(cached.source);
      setLastUpdated(cached.updatedAt);
      setIsLoading(false);
    } else {
      setStats(FALLBACK_STATS);
      setTotalSolved(FALLBACK_TOTAL);
      setSource("fallback");
      setLastUpdated(null);
      setIsLoading(true);
    }

    let disposed = false;

    const syncStats = async (reason = "interval") => {
      const now = Date.now();
      const minimumGap = Math.max(30 * 1000, Math.floor(refreshIntervalMs * 0.6));
      const shouldSkip = reason !== "initial" && now - lastSyncRef.current < minimumGap;
      if (shouldSkip) return;

      if (reason === "initial" && !cached) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }

      try {
        const latest = await fetchLatestLeetCodeStats(username);
        if (disposed) return;

        const normalized = normalizeStats(latest.stats);
        if (!normalized) {
          throw new Error("Received invalid stats");
        }

        const sum = normalized.reduce((acc, entry) => acc + Number(entry.count || 0), 0);
        const normalizedTotalSolved = normalizeTotalSolved(latest.totalSolved, sum) ?? sum;

        setStats(normalized);
        setTotalSolved(normalizedTotalSolved);
        setSource(latest.source);
        setLastUpdated(latest.updatedAt);
        setError("");
        lastSyncRef.current = Date.now();
        writeCache(cacheKey, {
          stats: normalized,
          totalSolved: normalizedTotalSolved,
          updatedAt: latest.updatedAt,
          source: latest.source,
        });
      } catch (fetchError) {
        if (disposed) return;
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to refresh LeetCode stats",
        );
      } finally {
        if (!disposed) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    };

    syncStats("initial");

    const interval = window.setInterval(() => syncStats("interval"), refreshIntervalMs);
    const onFocus = () => syncStats("focus");
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        syncStats("visibility");
      }
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refreshIntervalMs, username]);

  const totalProblems = useMemo(
    () => stats.reduce((sum, entry) => sum + Number(entry.count || 0), 0),
    [stats],
  );
  const displayTotalProblems = Math.max(totalProblems, totalSolved || 0);

  return {
    stats,
    totalProblems,
    displayTotalProblems,
    isLoading,
    isRefreshing,
    error,
    source,
    lastUpdated,
  };
}
