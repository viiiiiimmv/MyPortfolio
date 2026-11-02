import { ProfileDTO, ProjectDTO } from "@/types/portfolio";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://shivchauhan.vercel.app");

export const AUTHOR_NAME = "Shiv Chauhan";
export const SITE_NAME = "Shiv Chauhan — Software Engineer Portfolio";
export const SITE_TITLE_DEFAULT =
  "Shiv Chauhan — Senior Backend & Distributed Systems Engineer";
export const SITE_TITLE_TEMPLATE = "%s | Shiv Chauhan";
export const SITE_DESCRIPTION =
  "Portfolio of Shiv Chauhan, Senior Backend & Distributed Systems Engineer specializing in high-throughput architectures, event-driven pipelines, Spring Boot 3, Apache Kafka, and cloud-native systems.";

export const SITE_KEYWORDS = [
  "Shiv Chauhan",
  "Shiv Chauhan Portfolio",
  "Software Engineer",
  "Senior Backend Engineer",
  "Distributed Systems Engineer",
  "Cloud Architecture",
  "Java 21",
  "Spring Boot 3",
  "Apache Kafka",
  "PostgreSQL",
  "Kubernetes",
  "Docker",
  "Event-Driven Architecture",
  "Microservices",
  "High Throughput Systems",
  "System Design",
  "APIs",
  "REST",
  "gRPC",
];

export const SOCIAL_PROFILES = [
  "https://github.com/viiiiiimmv",
  "https://www.linkedin.com/in/shiv-chauhan-7a8f05",
  "https://leetcode.com/u/viii-iii-mmv/",
];

/**
 * Safely serializes data into a JSON-LD script content, escaping HTML tags to prevent XSS.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Generates Schema.org Person structured data
 */
export function generatePersonJsonLd(profile?: ProfileDTO) {
  const name = profile?.fullName || AUTHOR_NAME;
  const description =
    profile?.bio ||
    profile?.headline ||
    "Senior Backend & Distributed Systems Engineer specializing in fault-tolerant architectures and high-throughput systems.";

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}#person`,
    name,
    givenName: "Shiv",
    familyName: "Chauhan",
    jobTitle: profile?.headline || "Senior Backend & Distributed Systems Engineer",
    description,
    url: SITE_URL,
    image:
      profile?.profileImage?.cloudinaryUrl ||
      `${SITE_URL}/shiv-chauhan-logo.svg`,
    email: profile?.primaryEmail || "mailto:shivchauhan41223@gmail.com",
    sameAs: SOCIAL_PROFILES,
    knowsAbout: [
      "Distributed Systems",
      "Event-Driven Microservices",
      "High-Throughput Architectures",
      "Java 21",
      "Spring Boot 3",
      "Apache Kafka",
      "PostgreSQL",
      "Redis",
      "Kubernetes",
      "Docker",
      "REST & gRPC APIs",
      "Database Internals & Consensus",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of California, Berkeley",
      sameAs: "https://www.berkeley.edu",
    },
  };
}

/**
 * Generates Schema.org WebSite structured data
 */
export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    publisher: {
      "@id": `${SITE_URL}#person`,
    },
    author: {
      "@id": `${SITE_URL}#person`,
    },
  };
}

/**
 * Generates Schema.org ProfilePage structured data
 */
export function generateProfilePageJsonLd(profile?: ProfileDTO) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}#webpage`,
    url: SITE_URL,
    name: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    mainEntity: {
      "@id": `${SITE_URL}#person`,
    },
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
    dateCreated: profile?.createdAt || "2026-10-28T00:00:00Z",
    dateModified: profile?.updatedAt || profile?.createdAt || "2026-10-31T01:10:00Z",
  };
}

/**
 * Generates Schema.org ItemList for published software engineering projects
 */
export function generateProjectsItemListJsonLd(projects: ProjectDTO[]) {
  const publishedOnly = projects.filter(
    (p) =>
      p &&
      p.publicationStatus === "PUBLISHED" &&
      p.status !== "DRAFT" &&
      p.status !== "DRAFTED"
  );

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}#projects`,
    name: "Published Software Engineering Projects",
    description: "Production and research software architectures designed and built by Shiv Chauhan.",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: publishedOnly.length,
    itemListElement: publishedOnly.map((project, index) => {
      const skills = project.techStack?.skills?.map((s) => s.name) || [];
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.shortDescription || project.description,
          applicationCategory: project.category || "Distributed Systems",
          operatingSystem: "Cloud / Linux",
          author: {
            "@id": `${SITE_URL}#person`,
          },
          url: project.liveUrl?.link || `${SITE_URL}#projects`,
          ...(project.githubUrl?.link
            ? { codeRepository: project.githubUrl.link }
            : {}),
          ...(project.projectImage?.cloudinaryUrl
            ? { image: project.projectImage.cloudinaryUrl }
            : {}),
          ...(skills.length > 0 ? { keywords: skills.join(", ") } : {}),
        },
      };
    }),
  };
}

