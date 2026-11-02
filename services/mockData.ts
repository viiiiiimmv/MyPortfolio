import {
  ProfileDTO,
  SkillDTO,
  ProjectDTO,
  EducationDTO,
  ExperienceDTO,
  PaginatedResponse,
  GitHubContributionsDTO,
  ContributionDayDTO,
  ContributionWeekDTO,
  LeetCodeStatsData,
} from "@/types/portfolio";

export const MOCK_PROFILE: ProfileDTO = {
  publicId: "65e4285a-c457-43c2-a26f-c09fb3e6da4f",
  fullName: "Shivam Verma",
  headline: "Senior Backend & Distributed Systems Engineer",
  bio: "Passionate about high-throughput distributed architectures, Spring Boot 3, and Cloud infrastructure. Specializing in fault-tolerant, resilient backend engineering, event-driven pipelines, and high-performance APIs.",
  primaryEmail: "shivam.work@example.com",
  email: "shivam.personal@example.com",
  phoneNumber: "+1 (555) 019-2834",
  location: "San Francisco, CA / Remote",
  profileImage: {
    publicId: "7d9b4c2e-4b6e-4e89-8d8d-2947e4b95f12",
    cloudinaryPublicId: "portfolio/avatar_shivam",
    cloudinaryUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  },
  resumeUrl: {
    title: "Resume PDF",
    link: "https://portfolio.dev/resume.pdf",
    logo: null,
  },
  socialLinks: {
    github: "https://github.com/shivamverma",
    linkedin: "https://linkedin.com/in/shivamverma",
    leetcode: "https://leetcode.com/u/shivamverma",
  },
  heroTagLine: "Building resilient, cloud-native distributed platforms",
  availabilityStatus: "Open for exciting opportunities",
  yearsOfExperience: 5,
  createdAt: "2026-10-28T00:10:00Z",
  updatedAt: "2026-10-31T01:10:00Z",
};

export const MOCK_SKILLS: SkillDTO[] = [
  { publicId: "19f61325-2bcf-4759-b026-ddbb5e3642a2", name: "Java 21", category: "Languages" },
  { publicId: "38a7c211-19d4-4bb2-a1b3-4f92d4715f91", name: "Spring Boot 3", category: "Frameworks" },
  { publicId: "7df89a12-8411-44ee-811c-1910efcb5b44", name: "PostgreSQL", category: "Databases" },
  { publicId: "89a1b2c3-4d5e-6f70-1234-56789abcdef1", name: "Apache Kafka", category: "Distributed Systems" },
  { publicId: "90b2c3d4-5e6f-7012-3456-789abcdef123", name: "Kubernetes & Docker", category: "Cloud & DevOps" },
  { publicId: "01c3d4e5-6f70-1234-5678-9abcdef12345", name: "Redis", category: "Databases" },
  { publicId: "12d4e5f6-7012-3456-789a-bcdef1234567", name: "GraphQL & REST", category: "APIs" },
  { publicId: "23e5f6a7-0123-4567-89ab-cdef12345678", name: "AWS Cloud Architecture", category: "Cloud & DevOps" },
];

export const MOCK_FEATURED_PROJECTS: ProjectDTO[] = [
  {
    publicId: "7bcdd271-03b7-4aa2-9ebc-03bd62919e50",
    title: "Cloud Native Microservices Platform",
    shortDescription: "High-throughput distributed trading microservices engine",
    description: "Implemented event-driven architecture using Kafka, Spring Boot 3, and PostgreSQL with sub-millisecond data replication and automated horizontal scaling.",
    category: "Distributed Systems",
    projectImage: {
      publicId: "f1e2d3c4-b5a6-7890-1234-56789abcdef0",
      cloudinaryPublicId: "projects/cloud_arch",
      cloudinaryUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    },
    githubUrl: {
      title: "GitHub",
      link: "https://github.com/shivamverma/microservices",
      logo: null,
    },
    liveUrl: {
      title: "Live Demo",
      link: "https://platform.demo.dev",
      logo: null,
    },
    documentationUrl: {
      title: "Docs",
      link: "https://docs.platform.demo.dev",
      logo: null,
    },
    techStack: {
      skills: [
        { publicId: "19f61325-2bcf-4759-b026-ddbb5e3642a2", name: "Java 21" },
        { publicId: "38a7c211-19d4-4bb2-a1b3-4f92d4715f91", name: "Spring Boot 3" },
        { publicId: "7df89a12-8411-44ee-811c-1910efcb5b44", name: "PostgreSQL" },
        { publicId: "89a1b2c3-4d5e-6f70-1234-56789abcdef1", name: "Kafka" },
      ],
    },
    startDate: "Jan 2024",
    endDate: "Present",
    status: "COMPLETED",
    publicationStatus: "PUBLISHED",
    isFeatured: true,
    isDisplayed: true,
    keyHighlights: [
      "Sub-10ms P99 latency under 20,000 req/sec load",
      "Distributed tracing with OpenTelemetry and Jaeger",
      "Zero-downtime blue/green deployment strategy",
    ],
    displayOrder: 1,
    createdAt: "2026-10-28T00:15:00Z",
    updatedAt: "2026-10-31T01:15:00Z",
  },
  {
    publicId: "8cdef382-14c8-5bb3-afcd-14ce73020f61",
    title: "Real-Time Telemetry & Log Streamer",
    shortDescription: "Ultra-low latency streaming log analyzer processing multi-gigabit workloads",
    description: "Built high-performance distributed streaming engine with Apache Kafka and Redis cluster, handling dynamic anomaly detection algorithms with alerting webhooks.",
    category: "Data Engineering",
    projectImage: {
      publicId: "a2b3c4d5-e6f7-0123-4567-89abcdef0123",
      cloudinaryPublicId: "projects/telemetry",
      cloudinaryUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    },
    githubUrl: {
      title: "GitHub",
      link: "https://github.com/shivamverma/telemetry-streamer",
      logo: null,
    },
    liveUrl: {
      title: "Live Demo",
      link: "https://telemetry.demo.dev",
      logo: null,
    },
    techStack: {
      skills: [
        { publicId: "19f61325-2bcf-4759-b026-ddbb5e3642a2", name: "Java 21" },
        { publicId: "89a1b2c3-4d5e-6f70-1234-56789abcdef1", name: "Kafka" },
        { publicId: "01c3d4e5-6f70-1234-5678-9abcdef12345", name: "Redis" },
      ],
    },
    startDate: "Aug 2023",
    endDate: "Dec 2023",
    status: "COMPLETED",
    publicationStatus: "PUBLISHED",
    isFeatured: true,
    isDisplayed: true,
    keyHighlights: [
      "Processed 1.2M events/sec with memory-safe buffer management",
      "Dynamic rule engine for real-time fraud & intrusion detection",
    ],
    displayOrder: 2,
    createdAt: "2026-10-20T00:00:00Z",
    updatedAt: "2026-10-30T00:00:00Z",
  },
];

export const MOCK_PUBLISHED_PROJECTS: PaginatedResponse<ProjectDTO> = {
  content: [
    ...MOCK_FEATURED_PROJECTS,
    {
      publicId: "9def0493-25d9-6cc4-b0de-25df84131a72",
      title: "Distributed Cache & Lock Manager",
      shortDescription: "Consensus-based distributed locking library with Raft algorithm",
      description: "Designed a fault-tolerant distributed locking coordinator preventing race conditions across clustered stateless containers with sub-millisecond lease renewals.",
      category: "Infrastructure",
      projectImage: {
        publicId: "b3c4d5e6-f701-2345-6789-abcdef012345",
        cloudinaryPublicId: "projects/cache_lock",
        cloudinaryUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      },
      githubUrl: {
        title: "GitHub",
        link: "https://github.com/shivamverma/distributed-lock",
        logo: null,
      },
      techStack: {
        skills: [
          { publicId: "19f61325-2bcf-4759-b026-ddbb5e3642a2", name: "Java 21" },
          { publicId: "01c3d4e5-6f70-1234-5678-9abcdef12345", name: "Redis" },
        ],
      },
      startDate: "Feb 2023",
      endDate: "Jul 2023",
      status: "COMPLETED",
      publicationStatus: "PUBLISHED",
      isFeatured: false,
      isDisplayed: true,
      keyHighlights: [
        "Eliminated split-brain incidents with quorum consensus",
        "Adopted by 14 internal microservice pipelines",
      ],
      displayOrder: 3,
      createdAt: "2026-10-15T00:00:00Z",
      updatedAt: "2026-10-25T00:00:00Z",
    },
    {
      publicId: "aef015a4-36ea-7dd5-c1ef-36ea95242b83",
      title: "API Gateway & Rate Limiter",
      shortDescription: "Token-bucket and sliding window rate limiter at edge proxy",
      description: "Implemented high-performance reverse proxy routing with dynamic JWT validation, rate limiting, and circuit breaker patterns using Envoy and Spring Cloud Gateway.",
      category: "APIs & Security",
      projectImage: {
        publicId: "c4d5e6f7-0123-4567-89ab-cdef01234567",
        cloudinaryPublicId: "projects/gateway",
        cloudinaryUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      },
      githubUrl: {
        title: "GitHub",
        link: "https://github.com/shivamverma/edge-gateway",
        logo: null,
      },
      techStack: {
        skills: [
          { publicId: "38a7c211-19d4-4bb2-a1b3-4f92d4715f91", name: "Spring Boot 3" },
          { publicId: "01c3d4e5-6f70-1234-5678-9abcdef12345", name: "Redis" },
        ],
      },
      startDate: "Nov 2022",
      endDate: "Jan 2023",
      status: "COMPLETED",
      publicationStatus: "PUBLISHED",
      isFeatured: false,
      isDisplayed: true,
      keyHighlights: [
        "Handling 50,000 req/s with token bucket algorithm",
        "Sub-1ms overhead on upstream request proxies",
      ],
      displayOrder: 4,
      createdAt: "2026-10-10T00:00:00Z",
      updatedAt: "2026-10-22T00:00:00Z",
    },
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 4,
    totalPages: 1,
  },
};

export const MOCK_ALL_PROJECTS: PaginatedResponse<ProjectDTO> = {
  content: [
    ...MOCK_PUBLISHED_PROJECTS.content,
    {
      publicId: "bf0126b5-47fb-8ee6-d2fa-47fb06353c94",
      title: "Autonomous Event-Mesh Orchestrator",
      shortDescription: "Decentralized saga orchestration engine with self-healing workflows",
      description: "Developing next-generation saga coordinator for distributed transaction compensation with event sourcing and automated recovery.",
      category: "Distributed Systems",
      status: "IN_PROGRESS",
      publicationStatus: "DRAFTED",
      isFeatured: false,
      isDisplayed: false,
      techStack: {
        skills: [
          { publicId: "19f61325-2bcf-4759-b026-ddbb5e3642a2", name: "Java 21" },
          { publicId: "89a1b2c3-4d5e-6f70-1234-56789abcdef1", name: "Kafka" },
          { publicId: "90b2c3d4-5e6f-7012-3456-789abcdef123", name: "Kubernetes" },
        ],
      },
      startDate: "Nov 2026",
      endDate: "Q1 2027",
      displayOrder: 1,
      createdAt: "2026-10-29T00:00:00Z",
      updatedAt: "2026-10-31T00:00:00Z",
    },
    {
      publicId: "c01237c6-58ac-9ff7-e3ab-58ac17464da5",
      title: "Rust-Powered Vector Indexing Proxy",
      shortDescription: "Embedded SIMD-accelerated vector search proxy for localized embeddings",
      description: "Architecture research and prototype benchmarking sub-5ms nearest-neighbor vector similarity lookup against 10M embeddings in constrained cloud instances.",
      category: "AI Infrastructure",
      status: "PLANNED",
      publicationStatus: "DRAFTED",
      isFeatured: false,
      isDisplayed: false,
      techStack: {
        skills: [
          { publicId: "19f61325-2bcf-4759-b026-ddbb5e3642a2", name: "Rust" },
          { publicId: "7df89a12-8411-44ee-811c-1910efcb5b44", name: "PostgreSQL pgvector" },
        ],
      },
      startDate: "Q1 2027",
      endDate: "Q2 2027",
      displayOrder: 2,
      createdAt: "2026-10-27T00:00:00Z",
      updatedAt: "2026-10-31T00:00:00Z",
    },
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 6,
    totalPages: 1,
  },
};

export const MOCK_EXPERIENCES: ExperienceDTO[] = [
  {
    publicId: "e1234567-89ab-cdef-0123-456789abcdef",
    companyName: "Nexus Systems & Cloud",
    jobTitle: "Senior Backend Engineer",
    employment: "Full-Time",
    location: "San Francisco, CA / Remote",
    description: "Spearheaded core streaming infrastructure and distributed microservices supporting enterprise fintech platforms.",
    responsibilities: [
      "Architected event-driven microservices processing 25,000+ financial messages per second",
      "Cut database I/O overhead by 45% via Redis caching tiers and database connection pooling",
      "Mentored junior engineers and led architectural review board for distributed resilience",
    ],
    techStack: {
      skills: [
        { publicId: "19f61325-2bcf-4759-b026-ddbb5e3642a2", name: "Java 21" },
        { publicId: "38a7c211-19d4-4bb2-a1b3-4f92d4715f91", name: "Spring Boot 3" },
        { publicId: "89a1b2c3-4d5e-6f70-1234-56789abcdef1", name: "Apache Kafka" },
        { publicId: "01c3d4e5-6f70-1234-5678-9abcdef12345", name: "Redis" },
        { publicId: "90b2c3d4-5e6f-7012-3456-789abcdef123", name: "Kubernetes" },
      ],
    },
    companyWebsiteUrl: {
      title: "Nexus Systems & Cloud",
      link: "https://nexus-systems.example.com",
      logo: null,
    },
    startMonth: "March",
    startYear: 2024,
    endMonth: "Present",
    endYear: "Present",
  },
  {
    publicId: "f2345678-9abc-def0-1234-56789abcdef0",
    companyName: "Vanguard Tech Labs",
    jobTitle: "Backend & Systems Developer",
    employment: "Full-Time",
    location: "Austin, TX",
    description: "Engineered scalable REST & gRPC APIs in Spring Boot and managed Kubernetes deployment manifests.",
    responsibilities: [
      "Built resilient REST and gRPC internal services with zero-downtime deployment pipelines",
      "Automated CI/CD workflows reducing deploy cycle time from 40 mins to 6 mins",
      "Implemented comprehensive OpenTelemetry tracing across 18 microservices",
    ],
    techStack: {
      skills: [
        { publicId: "38a7c211-19d4-4bb2-a1b3-4f92d4715f91", name: "Spring Boot 3" },
        { publicId: "7df89a12-8411-44ee-811c-1910efcb5b44", name: "PostgreSQL" },
        { publicId: "90b2c3d4-5e6f-7012-3456-789abcdef123", name: "Docker" },
        { publicId: "23e5f6a7-0123-4567-89ab-cdef12345678", name: "OpenTelemetry" },
      ],
    },
    companyWebsiteUrl: {
      title: "Vanguard Tech Labs",
      link: "https://vanguard-tech.example.com",
      logo: null,
    },
    startMonth: "June",
    startYear: 2021,
    endMonth: "February",
    endYear: 2024,
  },
];

export const MOCK_EDUCATIONS: EducationDTO[] = [
  {
    publicId: "a3456789-bcde-f012-3456-789abcdef012",
    institutionName: "University of California, Berkeley",
    degree: "B.S. Computer Science & Engineering",
    fieldOfStudy: "Computer Science & Distributed Systems",
    startYear: 2017,
    endYear: 2021,
    description: "Focused on Operating Systems, Distributed Systems, Database Internals, and Computer Architecture.",
    institutionWebsiteUrl: {
      title: "University of California, Berkeley",
      link: "https://www.berkeley.edu",
      logo: null,
    },
    grade: "GPA: 3.85 / 4.0",
    relevantCoursework: [
      "Distributed Systems",
      "Operating Systems & Concurrency",
      "Database Systems Internals",
      "Data Structures & Algorithms",
      "Computer Networks",
    ],
    displayOrder: 1,
    isVisible: true,
    isFeatured: true,
  },
];

function generateMockGitHubContributions(): GitHubContributionsDTO {
  const weeks: ContributionWeekDTO[] = [];
  // Base UTC start timestamp: 2025-11-02 (Sunday, 52 weeks prior to current date 2026-11-02)
  const startMs = Date.UTC(2025, 10, 2);
  let totalContributions = 0;

  for (let w = 0; w < 53; w++) {
    const days: ContributionDayDTO[] = [];
    for (let d = 0; d < 7; d++) {
      const cur = new Date(startMs + (w * 7 + d) * 86400000);
      const dateStr = cur.toISOString().split("T")[0];

      const isToday = dateStr === "2026-11-02";
      const isPastOrToday = dateStr <= "2026-11-02";

      let count = 0;
      if (isToday) {
        count = 7; // Strong active commit representation on the current day
      } else if (!isPastOrToday) {
        count = 0; // Future days in current week
      } else {
        const isWeekend = d === 0 || d === 6;
        const cycle = (w * 7 + d) % 43;
        if (cycle < 16) {
          count = isWeekend ? (cycle % 2 === 0 ? 1 : 0) : (cycle % 5) + 1;
        } else if (cycle < 28) {
          count = isWeekend ? 0 : d % 2 === 0 ? 2 : 1;
        } else if (cycle < 35) {
          count = isWeekend ? 1 : (cycle % 4) + 2;
        } else {
          count = d === 2 || d === 4 ? 1 : 0;
        }

        // Keep active momentum in recent weeks leading up to today
        if (w >= 51 && isPastOrToday) {
          count = Math.max(2, ((d + 3) % 5) + 2);
        }
      }

      let level: ContributionDayDTO["level"] = "NONE";
      if (count >= 7) level = "FOURTH_QUARTILE";
      else if (count >= 4) level = "THIRD_QUARTILE";
      else if (count >= 2) level = "SECOND_QUARTILE";
      else if (count >= 1) level = "FIRST_QUARTILE";

      totalContributions += count;
      days.push({
        date: dateStr,
        count,
        level,
        weekday: d,
      });
    }
    weeks.push({ days });
  }

  return {
    username: "viiiiiimmv",
    totalContributions,
    from: "2025-11-02",
    to: "2026-11-02",
    weeks,
  };
}

export const MOCK_GITHUB_CONTRIBUTIONS: GitHubContributionsDTO =
  generateMockGitHubContributions();

export const MOCK_LEETCODE_STATS: LeetCodeStatsData = {
  username: "viii-iii-mmv",
  totalSolved: 415,
  easySolved: 148,
  mediumSolved: 223,
  hardSolved: 44,
  acceptanceRate: "68.4%",
  ranking: "Top 4.2%",
  profileUrl: "https://leetcode.com/u/viii-iii-mmv/",
};



