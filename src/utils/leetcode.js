const sanitizeHandle = (value) =>
  String(value || "")
    .trim()
    .replace(/^@/, "")
    .replace(/^u\//i, "")
    .replace(/\//g, "")
    .toLowerCase();

export const extractLeetCodeHandle = (profileOrHandle) => {
  const raw = String(profileOrHandle || "").trim();
  if (!raw) return "";

  const includesDomain = raw.includes("leetcode.com");
  if (!includesDomain) {
    return sanitizeHandle(raw);
  }

  try {
    const normalized = raw.startsWith("http") ? raw : `https://${raw}`;
    const url = new URL(normalized);
    const segments = url.pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "";

    if (segments[0].toLowerCase() === "u" && segments[1]) {
      return sanitizeHandle(decodeURIComponent(segments[1]));
    }

    return sanitizeHandle(decodeURIComponent(segments[0]));
  } catch {
    return "";
  }
};

export const buildLeetCodeProfileUrl = (handle) => {
  if (!handle) return "https://leetcode.com/";
  return `https://leetcode.com/u/${encodeURIComponent(handle)}/`;
};
