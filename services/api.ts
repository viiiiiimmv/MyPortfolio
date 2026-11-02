import {
  ProfileDTO,
  SkillDTO,
  ProjectDTO,
  EducationDTO,
  ExperienceDTO,
  PaginatedResponse,
  NormalizedTimelineItem,
  ContactMessageRequest,
  ContactMessageResponse,
  ProblemDetail,
  ExternalLinkDTO,
  GitHubContributionsDTO,
} from "@/types/portfolio";
import {
  MOCK_PROFILE,
  MOCK_SKILLS,
  MOCK_FEATURED_PROJECTS,
  MOCK_PUBLISHED_PROJECTS,
  MOCK_ALL_PROJECTS,
  MOCK_EDUCATIONS,
  MOCK_EXPERIENCES,
  MOCK_GITHUB_CONTRIBUTIONS,
} from "./mockData";

/**
 * Resolves the API base URL depending on execution environment:
 * - Client-side (Browser): Defaults to "/api/v1" (or NEXT_PUBLIC_API_BASE_URL if configured).
 *   Routes requests through the same-origin Next.js reverse proxy (/api/v1/*),
 *   eliminating Mixed Content errors when accessed over HTTPS.
 * - Server-side (Node.js): Uses private BACKEND_API_URL directly (e.g. during SSR/SSG)
 *   so that Node.js fetch has a valid absolute URL, or falls back to localhost:8080 for dev.
 */
export function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    // Server-side context (Node.js SSR / SSG / Route Handlers)
    const backendUrl = process.env.BACKEND_API_URL?.replace(/\/$/, "");
    if (backendUrl) {
      return `${backendUrl}/api/v1`;
    }
    const publicUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
    if (publicUrl && /^https?:\/\//i.test(publicUrl)) {
      return publicUrl;
    }
    return "http://localhost:8080/api/v1";
  }

  // Client-side context (Browser)
  const clientUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  return clientUrl || "/api/v1";
}

export const API_BASE_URL = getApiBaseUrl();

/**
 * Default timeout in milliseconds for API requests.
 * Uses API_TIMEOUT_MS environment variable if configured, defaulting to 20,000ms (20s)
 * to accommodate AWS Elastic Beanstalk wake-ups, cold starts, and complex database joins.
 */
export const DEFAULT_TIMEOUT_MS: number =
  typeof process !== "undefined" && process.env.API_TIMEOUT_MS
    ? Number(process.env.API_TIMEOUT_MS) || 20000
    : 20000;

export interface ApiFetchOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
}

/**
 * Universal safe fetcher with configurable timeout, automatic retry, and fallback support
 */
async function apiFetch<T>(
  endpoint: string,
  options?: ApiFetchOptions,
  fallbackData?: T
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.replace(/^\//, "");
  const url = `${baseUrl}/${cleanEndpoint}`;
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxRetries = options?.retries ?? 1;

  let lastError: unknown = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...options?.headers,
        },
        signal: AbortSignal.timeout(timeoutMs),
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let problem: ProblemDetail | null = null;
        try {
          problem = JSON.parse(errorText);
        } catch {
          // Not JSON
        }
        const errorMessage =
          problem?.detail ||
          problem?.title ||
          `API request failed with status ${response.status}: ${response.statusText}`;

        const error = new Error(errorMessage) as Error & {
          status?: number;
          problemDetail?: ProblemDetail;
        };
        error.status = response.status;
        if (problem) error.problemDetail = problem;
        throw error;
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      lastError = error;
      if (attempt < maxRetries) {
        const msg = error instanceof Error ? error.message : String(error);
        console.warn(
          `[API] Request to ${url} attempt ${attempt + 1} failed (${msg}). Retrying with ${timeoutMs}ms timeout...`
        );
        // Short pause to allow backend connection or cold instance to wake up
        await new Promise((resolve) => setTimeout(resolve, 650));
        continue;
      }
    }
  }

  if (fallbackData !== undefined) {
    const msg = lastError instanceof Error ? lastError.message : String(lastError);
    console.warn(
      `[API] Request to ${url} failed after ${maxRetries + 1} attempts (${msg}). Using documented mock data.`
    );
    return fallbackData;
  }
  throw lastError;
}

/**
 * Section 1 & 2: Developer Profile (GET /profile or /profiles)
 */
export async function getProfile(): Promise<ProfileDTO> {
  try {
    return await apiFetch<ProfileDTO>("profile", undefined, MOCK_PROFILE);
  } catch {
    return MOCK_PROFILE;
  }
}

/**
 * Section 2: Skills (GET /skills)
 */
export async function getSkills(): Promise<SkillDTO[]> {
  try {
    return await apiFetch<SkillDTO[]>("skills", undefined, MOCK_SKILLS);
  } catch {
    return MOCK_SKILLS;
  }
}

/**
 * Strict skill resolver that reads skills solely from the project response object.
 * The backend response object (ProjectResponseDTO.techStack.skills) is the single source of truth.
 * Supports:
 * - `techStack.skills`: SkillDTO[]
 * - `techStack`: (SkillDTO | string)[]
 * - `skills`: (SkillDTO | string)[]
 * - `tech_stack.skills`: (SkillDTO | string)[]
 *
 * If the response object does not supply skills, it returns an empty array.
 * No description scraping or synthetic skill generation is permitted.
 */
export function resolveProjectSkills(project: ProjectDTO): SkillDTO[] {
  if (!project) return [];

  const toSkillDTO = (item: unknown, index: number): SkillDTO | null => {
    if (!item) return null;
    if (typeof item === "string") {
      const trimmed = item.trim();
      return trimmed ? { publicId: `skill-${project.publicId || index}-${index}`, name: trimmed } : null;
    }
    if (typeof item === "object" && item !== null) {
      const obj = item as { publicId?: unknown; name?: unknown; category?: unknown };
      const name = typeof obj.name === "string" ? obj.name.trim() : "";
      if (!name) return null;
      return {
        publicId:
          typeof obj.publicId === "string" && obj.publicId.trim()
            ? obj.publicId.trim()
            : `skill-${project.publicId || index}-${index}`,
        name,
        category: typeof obj.category === "string" ? obj.category : undefined,
      };
    }
    return null;
  };

  // 1. Direct techStack.skills array from backend response object
  if (Array.isArray(project.techStack?.skills) && project.techStack.skills.length > 0) {
    const skills = project.techStack.skills
      .map(toSkillDTO)
      .filter((s): s is SkillDTO => s !== null);
    if (skills.length > 0) return skills;
  }

  // 2. Direct techStack array if backend sent flat list
  const rawTechStack = (project as unknown as { techStack?: unknown }).techStack;
  if (Array.isArray(rawTechStack) && rawTechStack.length > 0) {
    const skills = rawTechStack
      .map(toSkillDTO)
      .filter((s): s is SkillDTO => s !== null);
    if (skills.length > 0) return skills;
  }

  // 3. Direct project.skills array if backend returned skills on root
  const rawSkills = (project as unknown as { skills?: unknown }).skills;
  if (Array.isArray(rawSkills) && rawSkills.length > 0) {
    const skills = rawSkills
      .map(toSkillDTO)
      .filter((s): s is SkillDTO => s !== null);
    if (skills.length > 0) return skills;
  }

  // 4. Snake-case tech_stack.skills
  const anyProj = project as unknown as { tech_stack?: { skills?: unknown } };
  if (Array.isArray(anyProj.tech_stack?.skills) && (anyProj.tech_stack.skills as unknown[]).length > 0) {
    const skills = (anyProj.tech_stack.skills as unknown[])
      .map(toSkillDTO)
      .filter((s): s is SkillDTO => s !== null);
    if (skills.length > 0) return skills;
  }

  // If response object has no skills, return empty array.
  return [];
}

export function normalizeProject(project: ProjectDTO): ProjectDTO {
  const skills = resolveProjectSkills(project);
  return {
    ...project,
    techStack: {
      skills,
    },
  };
}

/**
 * Section 3.1: Featured Projects (GET /projects/featured)
 */
export async function getFeaturedProjects(): Promise<ProjectDTO[]> {
  try {
    const data = await apiFetch<ProjectDTO[]>(
      "projects/featured",
      undefined,
      MOCK_FEATURED_PROJECTS
    );
    return (data || []).map(normalizeProject);
  } catch {
    return MOCK_FEATURED_PROJECTS.map(normalizeProject);
  }
}

/**
 * Section 3.2: Published Projects (GET /projects?page=0&size=10&sort=displayOrder,asc)
 */
export async function getPublishedProjects(
  page = 0,
  size = 10
): Promise<PaginatedResponse<ProjectDTO>> {
  try {
    const response = await apiFetch<PaginatedResponse<ProjectDTO>>(
      `projects?page=${page}&size=${size}&sort=displayOrder,asc`,
      undefined,
      MOCK_PUBLISHED_PROJECTS
    );
    return {
      ...response,
      content: (response?.content || []).map(normalizeProject),
    };
  } catch {
    return {
      ...MOCK_PUBLISHED_PROJECTS,
      content: MOCK_PUBLISHED_PROJECTS.content.map(normalizeProject),
    };
  }
}

/**
 * Project Details by Public UUID (GET /projects/{publicId})
 */
export async function getProjectById(
  publicId: string
): Promise<ProjectDTO | null> {
  try {
    const project = await apiFetch<ProjectDTO>(`projects/${publicId}`);
    return project ? normalizeProject(project) : null;
  } catch {
    const found = MOCK_ALL_PROJECTS.content.find((p) => p.publicId === publicId);
    return found ? normalizeProject(found) : null;
  }
}

/**
 * Section 4: Upcoming / Unpublished Projects (GET /projects/all)
 * Filters projects with status != PUBLISHED or status IN (DRAFTED, IN_PROGRESS, PLANNED)
 */
export async function getUpcomingProjects(): Promise<ProjectDTO[]> {
  try {
    const response = await apiFetch<PaginatedResponse<ProjectDTO>>(
      "projects/all?page=0&size=50&sort=displayOrder,asc",
      undefined,
      MOCK_ALL_PROJECTS
    );

    const all = (response?.content || []).map(normalizeProject);
    // Filter for upcoming / drafted / in-progress
    const upcoming = all.filter(
      (p) =>
        p.publicationStatus !== "PUBLISHED" ||
        p.status === "IN_PROGRESS" ||
        p.status === "PLANNED" ||
        p.status === "DRAFT"
    );

    const list =
      upcoming.length > 0
        ? upcoming
        : MOCK_ALL_PROJECTS.content
            .filter((p) => p.publicationStatus !== "PUBLISHED")
            .map(normalizeProject);

    return list.sort((a, b) => {
      const orderA = typeof a.displayOrder === "number" ? a.displayOrder : 999;
      const orderB = typeof b.displayOrder === "number" ? b.displayOrder : 999;
      return orderA - orderB;
    });
  } catch {
    return MOCK_ALL_PROJECTS.content
      .filter((p) => p.publicationStatus !== "PUBLISHED")
      .map(normalizeProject)
      .sort((a, b) => {
        const orderA = typeof a.displayOrder === "number" ? a.displayOrder : 999;
        const orderB = typeof b.displayOrder === "number" ? b.displayOrder : 999;
        return orderA - orderB;
      });
  }
}

/**
 * Section 5.1: Education (GET /educations or /education)
 */
export async function getEducations(): Promise<EducationDTO[]> {
  try {
    return await apiFetch<EducationDTO[]>("educations", undefined, MOCK_EDUCATIONS);
  } catch {
    try {
      return await apiFetch<EducationDTO[]>("education", undefined, MOCK_EDUCATIONS);
    } catch {
      return MOCK_EDUCATIONS;
    }
  }
}

/**
 * Strict skill resolver for Work Experience. Reads skills solely from the experience response object.
 * The backend response object (ExperienceResponseDTO.techStack.skills) is the single source of truth.
 */
export function resolveExperienceSkills(exp: ExperienceDTO): SkillDTO[] {
  if (!exp) return [];

  const toSkillDTO = (item: unknown, index: number): SkillDTO | null => {
    if (!item) return null;
    if (typeof item === "string") {
      const trimmed = item.trim();
      return trimmed
        ? { publicId: `exp-skill-${exp.publicId || index}-${index}`, name: trimmed }
        : null;
    }
    if (typeof item === "object" && item !== null) {
      const obj = item as { publicId?: unknown; name?: unknown; category?: unknown };
      const name = typeof obj.name === "string" ? obj.name.trim() : "";
      if (!name) return null;
      return {
        publicId:
          typeof obj.publicId === "string" && obj.publicId.trim()
            ? obj.publicId.trim()
            : `exp-skill-${exp.publicId || index}-${index}`,
        name,
        category: typeof obj.category === "string" ? obj.category : undefined,
      };
    }
    return null;
  };

  // 1. Direct techStack.skills array from backend response object
  if (Array.isArray(exp.techStack?.skills) && exp.techStack.skills.length > 0) {
    const skills = exp.techStack.skills
      .map(toSkillDTO)
      .filter((s): s is SkillDTO => s !== null);
    if (skills.length > 0) return skills;
  }

  // 2. Direct techStack array if backend sent flat list
  const rawTechStack = (exp as unknown as { techStack?: unknown }).techStack;
  if (Array.isArray(rawTechStack) && rawTechStack.length > 0) {
    const skills = rawTechStack
      .map(toSkillDTO)
      .filter((s): s is SkillDTO => s !== null);
    if (skills.length > 0) return skills;
  }

  // 3. Direct exp.skills array if backend returned skills on root
  const rawSkills = (exp as unknown as { skills?: unknown }).skills;
  if (Array.isArray(rawSkills) && rawSkills.length > 0) {
    const skills = rawSkills
      .map(toSkillDTO)
      .filter((s): s is SkillDTO => s !== null);
    if (skills.length > 0) return skills;
  }

  // 4. Snake-case tech_stack.skills
  const anyExp = exp as unknown as { tech_stack?: { skills?: unknown } };
  if (Array.isArray(anyExp.tech_stack?.skills) && (anyExp.tech_stack.skills as unknown[]).length > 0) {
    const skills = (anyExp.tech_stack.skills as unknown[])
      .map(toSkillDTO)
      .filter((s): s is SkillDTO => s !== null);
    if (skills.length > 0) return skills;
  }

  return [];
}

export function normalizeExperience(exp: ExperienceDTO): ExperienceDTO {
  const skills = resolveExperienceSkills(exp);
  return {
    ...exp,
    techStack: {
      skills,
    },
  };
}

/**
 * Section 5.2: Work Experience (GET /experiences)
 */
export async function getExperiences(): Promise<ExperienceDTO[]> {
  try {
    const data = await apiFetch<ExperienceDTO[]>(
      "experiences",
      undefined,
      MOCK_EXPERIENCES
    );
    return (data || []).map(normalizeExperience);
  } catch {
    return MOCK_EXPERIENCES.map(normalizeExperience);
  }
}

/**
 * Safely extracts a valid URL string from string or ExternalLinkDTO / UrlResponseDTO
 */
export function extractUrlString(
  raw?: string | ExternalLinkDTO | { link?: string; url?: string; href?: string } | null
): string | undefined {
  if (!raw) return undefined;
  let urlStr: string | undefined;

  if (typeof raw === "string") {
    urlStr = raw.trim();
  } else if (typeof raw === "object") {
    urlStr = (raw.link || (raw as { url?: string }).url || (raw as { href?: string }).href)?.trim();
  }

  if (!urlStr || urlStr === "null" || urlStr === "undefined") return undefined;

  // Add protocol if it starts with domain-like text without protocol
  if (!/^(?:https?:\/\/|mailto:|tel:|\/)/i.test(urlStr)) {
    return `https://${urlStr}`;
  }

  return urlStr;
}

/**
 * Section 5: Merged Chronological Timeline Logic
 * Combines Education and Experience into a single collection sorted by startYear
 */
export function buildNormalizedTimeline(
  educations: EducationDTO[],
  experiences: ExperienceDTO[]
): NormalizedTimelineItem[] {
  const normalizedEducations: NormalizedTimelineItem[] = educations.map((edu) => {
    const sYear = Number(edu.startYear) || 2020;
    const eYear = edu.endYear ? String(edu.endYear) : "Present";
    const rawEduUrl =
      edu.institutionWebsiteUrl ||
      edu.institutionalUrl ||
      edu.institutionUrl ||
      (edu as { websiteUrl?: string | ExternalLinkDTO }).websiteUrl;
    const websiteUrl = extractUrlString(rawEduUrl);
    const logoUrl = extractUrlString(edu.institutionLogoUrl);

    return {
      id: `edu-${edu.publicId}`,
      type: "EDUCATION",
      title: edu.degree + (edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""),
      organization: edu.institutionName,
      startYear: sYear,
      endYear: edu.endYear,
      dateRange: `${edu.startYear} — ${eYear}`,
      description: edu.description,
      details: edu.grade ? [String(edu.grade)] : undefined,
      tags: edu.relevantCoursework,
      logoUrl,
      websiteUrl,
      status:
        edu.endYear && String(edu.endYear).toLowerCase() !== "present"
          ? "Completed"
          : "In Progress",
      isUpcoming: false,
      original: edu,
    };
  });

  const formatMonth = (m?: string | number): string => {
    if (!m) return "";
    const num = Number(m);
    if (!isNaN(num) && num >= 1 && num <= 12) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${months[num - 1]} `;
    }
    return `${m} `;
  };

  const normalizedExperiences: NormalizedTimelineItem[] = experiences.map((exp) => {
    const sYear = Number(exp.startYear) || 2020;
    const sMonth = formatMonth(exp.startMonth);
    const eMonth = formatMonth(exp.endMonth);
    const eYear = exp.endYear ? String(exp.endYear) : "Present";
    const isUpcoming =
      String(exp.endYear).toLowerCase().includes("upcoming") ||
      String(exp.jobTitle).toLowerCase().includes("upcoming");

    // Clean title to display strictly job title (e.g. "Trainee")
    const cleanTitle = (exp.jobTitle || "Trainee")
      .replace(/\s*\((?:TRAINING|Training|INTERNSHIP|Internship)\)\s*$/i, "")
      .trim();

    // Determine upper right status badge text (e.g. "Training", "Current", "Completed")
    let statusText: string;
    if (isUpcoming) {
      statusText = "Upcoming";
    } else if (exp.employment) {
      statusText = exp.employment
        .toLowerCase()
        .split(/[_\s]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    } else if (exp.jobTitle && /(?:TRAINING|Training)/i.test(exp.jobTitle)) {
      statusText = "Training";
    } else if (eYear === "Present") {
      statusText = "Current";
    } else {
      statusText = "Completed";
    }

    const rawExpUrl =
      exp.companyWebsiteUrl ||
      exp.companyUrl ||
      (exp as { websiteUrl?: string | ExternalLinkDTO }).websiteUrl;
    const websiteUrl = extractUrlString(rawExpUrl);
    const logoUrl = extractUrlString(exp.companyLogoUrl);

    // Resolve tech stack skills from response object as tags (matching education tags behavior)
    const expSkills = resolveExperienceSkills(exp);
    const expTags = expSkills.map((s) => s.name);

    return {
      id: `exp-${exp.publicId}`,
      type: "EXPERIENCE",
      title: cleanTitle,
      organization: exp.companyName,
      startYear: sYear,
      startMonth: exp.startMonth ? String(exp.startMonth) : undefined,
      endYear: exp.endYear,
      endMonth: exp.endMonth ? String(exp.endMonth) : undefined,
      dateRange: `${sMonth}${exp.startYear} — ${eMonth}${eYear}`.trim(),
      location: exp.location,
      description: exp.description,
      details: exp.responsibilities,
      tags: expTags.length > 0 ? expTags : undefined,
      logoUrl,
      websiteUrl,
      status: statusText,
      isUpcoming,
      original: exp,
    };
  });

  const merged = [...normalizedEducations, ...normalizedExperiences];

  // Sort ascending chronologically (journey from earliest to latest)
  merged.sort((a, b) => {
    if (a.startYear !== b.startYear) {
      return a.startYear - b.startYear;
    }
    // If same year, experiences after education or stable sort
    return a.type === "EDUCATION" ? -1 : 1;
  });

  return merged;
}

/**
 * Section: GitHub Contributions Heatmap (GET /api/github/contributions or /github/contributions)
 */
export async function getGitHubContributions(): Promise<GitHubContributionsDTO> {
  try {
    return await apiFetch<GitHubContributionsDTO>(
      "github/contributions",
      undefined,
      MOCK_GITHUB_CONTRIBUTIONS
    );
  } catch {
    return MOCK_GITHUB_CONTRIBUTIONS;
  }
}

/**
 * Section 6: Submit Contact Message (POST /contact-messages)
 */
export async function submitContactMessage(
  payload: ContactMessageRequest
): Promise<ContactMessageResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl.replace(/\/$/, "")}/contact-messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let problem: ProblemDetail | null = null;
    try {
      problem = JSON.parse(errorText);
    } catch {
      // not JSON
    }

    const err = new Error(
      problem?.detail ||
      problem?.title ||
      "Unable to send message. Please try again."
    ) as Error & { problemDetail?: ProblemDetail; status?: number };
    err.status = response.status;
    if (problem) err.problemDetail = problem;
    throw err;
  }

  return (await response.json()) as ContactMessageResponse;
}
