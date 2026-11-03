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
  "publicId": "4b59aff6-0bd7-4e05-93b9-1ba00a54a8a4",
  "fullName": "Shiv Chauhan",
  "headline": "FullStack Web Devloper",
  "bio": "I'm a Computer Science engineer focused on full-stack development, backend systems, AI, and developer tooling. I enjoy understanding problems deeply, building practical solutions, and taking projects from an initial idea to something people can actually use.\n\nI'm particularly interested in backend engineering, system design, AI systems, and the engineering decisions that make software reliable beyond the prototype.",
  "primaryEmail": "shivchauhan41223@gmail.com",
  "email": "shiv.chauhan1518@gmail.com",
  "phoneNumber": "9625028888",
  "location": "Panchkula, Haryana",
  "profileImage": {
    "publicId": "11a411d7-dcaa-499d-828a-11ef76d3cada",
    "cloudinaryPublicId": "portfolio/profile/djigjkc9sui3qkkx37qh",
    "cloudinaryUrl": "https://res.cloudinary.com/bgwc25au/image/upload/v1793450392/portfolio/profile/djigjkc9sui3qkkx37qh.jpg"
  },
  "resumeUrl": {
    "title": "Resume PDF",
    "link": "https://resume.com",
    "logo": null
  },
  "cvUrl": {
    "title": "CV PDF",
    "link": "https://cv.com",
    "logo": null
  },
  "socialLinks": {
    "github": "https://github.com/viiiiiimmv",
    "website": "https://shivchauhan.vercel.app",
    "linkedin": "https://www.linkedin.com/in/shiv-chauhan-7a8f05/"
  },
  "heroTagLine": "Software Engineer building full-stack products, AI systems, and developer tools.",
  "availabilityStatus": "Open for exciting opportunities",
  "yearsOfExperience": 0,
  "createdAt": "2026-10-27T20:45:04.743729Z",
  "updatedAt": "2026-11-02T15:56:40.121259Z"
};

export const MOCK_SKILLS: SkillDTO[] = [
  {
    "publicId": "1cd65299-e698-4a48-9b91-d6ca4f581248",
    "name": "Java",
    "category": {
      "id": 1,
      "name": "Language"
    }
  },
  {
    "publicId": "759b8234-663e-4642-8546-c2a6c3259917",
    "name": "SpringBoot",
    "category": {
      "id": 6,
      "name": "Backend"
    }
  },
  {
    "publicId": "fe243820-1e08-4090-96e4-7800601ab5ed",
    "name": "OpenAI API",
    "category": {
      "id": 7,
      "name": "Authentication & APIs"
    }
  },
  {
    "publicId": "01c7ccae-9bf9-46cc-8cc4-1221c8b954e8",
    "name": "TypeScript",
    "category": {
      "id": 1,
      "name": "Language"
    }
  },
  {
    "publicId": "98bbceed-c07a-49be-8440-90da8e7d261c",
    "name": "C#",
    "category": {
      "id": 1,
      "name": "Language"
    }
  },
  {
    "publicId": "4f15adfb-7523-4cca-955c-eafca0ff20bf",
    "name": "Python",
    "category": {
      "id": 1,
      "name": "Language"
    }
  },
  {
    "publicId": "5f66d40d-8902-4dc5-955d-27f9557c7ef3",
    "name": "MongoDB",
    "category": {
      "id": 4,
      "name": "Databases"
    }
  },
  {
    "publicId": "3fc60c96-7162-4699-97b5-a626562a99dc",
    "name": "PostgreSQL",
    "category": {
      "id": 4,
      "name": "Databases"
    }
  },
  {
    "publicId": "e0d6f526-8a7d-484d-8dc4-335a4535d063",
    "name": "SQL Server",
    "category": {
      "id": 4,
      "name": "Databases"
    }
  },
  {
    "publicId": "6cc7f938-4b08-4407-bda4-9f1b0a577131",
    "name": "Git",
    "category": {
      "id": 2,
      "name": "Infrastructure"
    }
  },
  {
    "publicId": "0ea67bfa-054d-4c19-88d3-ab5b702de26f",
    "name": "NextJS",
    "category": {
      "id": 5,
      "name": "Frontend"
    }
  },
  {
    "publicId": "08b38be7-6469-4956-8924-f3d513374dda",
    "name": "TailwindCSS",
    "category": {
      "id": 5,
      "name": "Frontend"
    }
  },
  {
    "publicId": "6d8f699b-8968-4fcc-95ed-c2c015ff4a96",
    "name": "ReactJS",
    "category": {
      "id": 5,
      "name": "Frontend"
    }
  },
  {
    "publicId": "46521fa0-db79-474c-9612-2d8013697de8",
    "name": "REST API Development",
    "category": {
      "id": 6,
      "name": "Backend"
    }
  },
  {
    "publicId": "83380309-f7e1-4112-9296-2eaa53893b12",
    "name": "FastAPI",
    "category": {
      "id": 6,
      "name": "Backend"
    }
  },
  {
    "publicId": "d97f47c0-12f0-4a0b-be40-30abb70a5d9c",
    "name": "Vercel",
    "category": {
      "id": 2,
      "name": "Infrastructure"
    }
  },
  {
    "publicId": "978ec6a7-eb15-45d5-bf78-9702164a1eed",
    "name": "Redis",
    "category": {
      "id": 4,
      "name": "Databases"
    }
  },
  {
    "publicId": "183b1a9c-8e47-443d-a66c-8c70fe18409d",
    "name": ".NET",
    "category": {
      "id": 6,
      "name": "Backend"
    }
  },
  {
    "publicId": "133a332b-14f0-4b81-aed6-050d38ea7204",
    "name": "ASP.NET Core",
    "category": {
      "id": 6,
      "name": "Backend"
    }
  },
  {
    "publicId": "b083dfa7-db97-4d70-a245-582fb9723697",
    "name": "Flask",
    "category": {
      "id": 6,
      "name": "Backend"
    }
  },
  {
    "publicId": "bef2795e-189e-410d-a747-8e6e9f017889",
    "name": "Spring Data JPA",
    "category": {
      "id": 6,
      "name": "Backend"
    }
  },
  {
    "publicId": "250360b6-93eb-45fa-a867-35a8e9d432cb",
    "name": "Prisma",
    "category": {
      "id": 6,
      "name": "Backend"
    }
  },
  {
    "publicId": "9314b8f7-ab70-4476-9e77-6761496db563",
    "name": "Github OAuth",
    "category": {
      "id": 7,
      "name": "Authentication & APIs"
    }
  },
  {
    "publicId": "8dee71b6-1f55-487f-9f56-d5d06705cde2",
    "name": "Github API",
    "category": {
      "id": 7,
      "name": "Authentication & APIs"
    }
  },
  {
    "publicId": "730b22ac-645f-4710-a93a-98b4c85b9283",
    "name": "Google OAuth",
    "category": {
      "id": 7,
      "name": "Authentication & APIs"
    }
  },
  {
    "publicId": "1b95dcb4-c02b-4ada-9e79-52b1fafd107f",
    "name": "JWT",
    "category": {
      "id": 7,
      "name": "Authentication & APIs"
    }
  },
  {
    "publicId": "88e2864c-ff03-4073-804f-baf501650a6d",
    "name": "BullMQ",
    "category": {
      "id": 2,
      "name": "Infrastructure"
    }
  },
  {
    "publicId": "3530629e-79e9-4c89-81d9-e3729e9a6a4e",
    "name": "Cloudinary",
    "category": {
      "id": 2,
      "name": "Infrastructure"
    }
  },
  {
    "publicId": "1049061f-99ab-4406-b964-8c88f3107d94",
    "name": "Microsoft Azure",
    "category": {
      "id": 2,
      "name": "Infrastructure"
    }
  },
  {
    "publicId": "aa13beb8-3f9f-499a-a206-d147acbb1574",
    "name": "NLP",
    "category": {
      "id": 8,
      "name": "AI & Machine Learning"
    }
  },
  {
    "publicId": "6f188036-e539-46ed-934d-eac027d9ad53",
    "name": "Machine Learning",
    "category": {
      "id": 8,
      "name": "AI & Machine Learning"
    }
  }
];

export const MOCK_FEATURED_PROJECTS: ProjectDTO[] = [
  {
    "publicId": "df8502b7-6624-411f-aa23-3dd906cd028c",
    "title": "DevPulse",
    "shortDescription": "Developer analytics platform that integrates with GitHub to turn repository, contribution, commit, and language data into actionable engineering insights through interactive dashboards.",
    "description": "## DevPulse — GitHub Analytics Platform\n\nDevPulse is a full-stack GitHub analytics platform that transforms repository and contribution activity into a centralized, data-driven dashboard. It helps developers track their coding consistency, explore repository statistics, and understand their development activity over time.\n\n### Key Features\n\n- **Contribution Analytics:** Visualize daily, weekly, and monthly commit activity through interactive analytics and contribution heatmaps.\n- **Repository Insights:** Explore repositories, programming language distributions, commit histories, and repository statistics.\n- **Developer Dashboard:** Track total commits, repositories, stars, and contribution streaks in one place.\n- **GitHub Authentication:** Authenticate using GitHub OAuth and access authorized repository data.\n- **Background Synchronization:** Process GitHub data asynchronously using BullMQ and Redis, with automatic retries for failed jobs.\n- **Persistent Analytics:** Store synchronized data in PostgreSQL and use database-backed dashboard queries instead of depending on live GitHub API requests for every page load.\n- **Incremental Data Storage:** Avoid inserting duplicate commit records during synchronization.\n- **Scalable Data Access:** Support paginated commit histories and dedicated analytics endpoints.\n\n### Tech Stack\n\nNext.js, TypeScript, Prisma ORM, PostgreSQL, GitHub REST API, GitHub OAuth, NextAuth.js, BullMQ, Redis, and ioredis.\n\n### Engineering Focus\n\nDevPulse emphasizes reliable background processing, persistent analytics, authentication, efficient database access, and separation between external API synchronization and dashboard data retrieval.",
    "category": "Developer Tools",
    "projectImage": {
      "publicId": "5b2b688e-3f28-434c-a611-f36d28b64328",
      "cloudinaryPublicId": "portfolio/projects/ulcg1dlcyur14aawuysz",
      "cloudinaryUrl": "https://res.cloudinary.com/bgwc25au/image/upload/v1793264793/portfolio/projects/ulcg1dlcyur14aawuysz.png"
    },
    "githubUrl": {
      "title": "GitHub",
      "link": "https://github.com/viiiiiimmv/DevPulse",
      "logo": null
    },
    "liveUrl": {
      "title": "Live Demo",
      "link": "https://devpulse-viiiiiimmv.vercel.app/",
      "logo": null
    },
    "documentationUrl": null,
    "techStack": {
      "skills": [
        {
          "publicId": "0ea67bfa-054d-4c19-88d3-ab5b702de26f",
          "name": "NextJS",
          "category": {
            "id": 5,
            "name": "Frontend"
          }
        },
        {
          "publicId": "08b38be7-6469-4956-8924-f3d513374dda",
          "name": "TailwindCSS",
          "category": {
            "id": 5,
            "name": "Frontend"
          }
        },
        {
          "publicId": "8dee71b6-1f55-487f-9f56-d5d06705cde2",
          "name": "Github API",
          "category": {
            "id": 7,
            "name": "Authentication & APIs"
          }
        },
        {
          "publicId": "250360b6-93eb-45fa-a867-35a8e9d432cb",
          "name": "Prisma",
          "category": {
            "id": 6,
            "name": "Backend"
          }
        },
        {
          "publicId": "88e2864c-ff03-4073-804f-baf501650a6d",
          "name": "BullMQ",
          "category": {
            "id": 2,
            "name": "Infrastructure"
          }
        },
        {
          "publicId": "978ec6a7-eb15-45d5-bf78-9702164a1eed",
          "name": "Redis",
          "category": {
            "id": 4,
            "name": "Databases"
          }
        },
        {
          "publicId": "01c7ccae-9bf9-46cc-8cc4-1221c8b954e8",
          "name": "TypeScript",
          "category": {
            "id": 1,
            "name": "Language"
          }
        },
        {
          "publicId": "1b95dcb4-c02b-4ada-9e79-52b1fafd107f",
          "name": "JWT",
          "category": {
            "id": 7,
            "name": "Authentication & APIs"
          }
        },
        {
          "publicId": "d97f47c0-12f0-4a0b-be40-30abb70a5d9c",
          "name": "Vercel",
          "category": {
            "id": 2,
            "name": "Infrastructure"
          }
        },
        {
          "publicId": "46521fa0-db79-474c-9612-2d8013697de8",
          "name": "REST API Development",
          "category": {
            "id": 6,
            "name": "Backend"
          }
        },
        {
          "publicId": "3fc60c96-7162-4699-97b5-a626562a99dc",
          "name": "PostgreSQL",
          "category": {
            "id": 4,
            "name": "Databases"
          }
        }
      ]
    },
    "startDate": "Jun 2026",
    "endDate": "Jul 2026",
    "status": "COMPLETED",
    "publicationStatus": "PUBLISHED",
    "keyHighlights": [
      "Background GitHub data synchronization using BullMQ and Redis, with automatic retries for failed jobs.",
      "PostgreSQL-backed analytics dashboard with commit activity heatmaps, contribution streaks, repository statistics, and language breakdowns.",
      "Efficient incremental data storage that avoids re-inserting existing commit records and keeps dashboard analytics available independently of GitHub API availability."
    ],
    "displayOrder": 1,
    "createdAt": "2026-10-27T20:47:43.667349Z",
    "updatedAt": "2026-10-30T17:12:09.045802Z",
    "displayed": true,
    "featured": true
  },
  {
    "publicId": "d72b8753-edd2-4234-b20f-e883f1019ab4",
    "title": "DevLink",
    "shortDescription": "A no-code developer portfolio builder that lets developers create and customize professional portfolios without writing code.",
    "description": "## DevLink — No-Code Developer Portfolio Builder\n\nDevLink is a full-stack platform that enables developers to create professional portfolio websites without writing code. It provides a streamlined way to present technical skills, projects, and professional information through customizable portfolio themes.\n\n### Key Features\n\n- **No-Code Portfolio Creation:** Build and publish a developer portfolio without manually developing a website.\n- **Customizable Themes:** Choose from different presentation styles while reusing the same underlying profile data.\n- **Developer Profiles:** Organize professional information, skills, and projects into a portfolio designed for showcasing technical experience.\n- **OAuth Authentication:** Support Google and GitHub sign-in through NextAuth.js.\n- **Image Management:** Use Cloudinary for image storage, asset delivery, and CDN-backed media handling.\n- **Server-Side Rendering:** Render portfolio pages on the server to support efficient page delivery and public accessibility.\n- **Production Deployment:** Deploy the application using Vercel.\n\n### Tech Stack\n\nNext.js, TypeScript, MongoDB, Mongoose, NextAuth.js, Google OAuth, GitHub OAuth, Cloudinary, and Vercel.\n\n### Engineering Focus\n\nDevLink focuses on reusable theme architecture, data-driven portfolio rendering, authentication, media management, and simplifying the process of building a professional online presence.",
    "category": "Developer Tools",
    "projectImage": {
      "publicId": "e65e1ca2-8cad-4f6d-9a39-b6356307cff4",
      "cloudinaryPublicId": "portfolio/projects/zvqb8d0llzf5im2g7crv",
      "cloudinaryUrl": "https://res.cloudinary.com/bgwc25au/image/upload/v1793265116/portfolio/projects/zvqb8d0llzf5im2g7crv.png"
    },
    "githubUrl": {
      "title": "GitHub",
      "link": "https://github.com/viiiiiimmv/DevLink",
      "logo": null
    },
    "liveUrl": {
      "title": "Live Demo",
      "link": "https://devlink-viiiiiimmv.vercel.app/",
      "logo": null
    },
    "documentationUrl": null,
    "techStack": {
      "skills": [
        {
          "publicId": "01c7ccae-9bf9-46cc-8cc4-1221c8b954e8",
          "name": "TypeScript",
          "category": {
            "id": 1,
            "name": "Language"
          }
        },
        {
          "publicId": "5f66d40d-8902-4dc5-955d-27f9557c7ef3",
          "name": "MongoDB",
          "category": {
            "id": 4,
            "name": "Databases"
          }
        },
        {
          "publicId": "0ea67bfa-054d-4c19-88d3-ab5b702de26f",
          "name": "NextJS",
          "category": {
            "id": 5,
            "name": "Frontend"
          }
        },
        {
          "publicId": "08b38be7-6469-4956-8924-f3d513374dda",
          "name": "TailwindCSS",
          "category": {
            "id": 5,
            "name": "Frontend"
          }
        },
        {
          "publicId": "d97f47c0-12f0-4a0b-be40-30abb70a5d9c",
          "name": "Vercel",
          "category": {
            "id": 2,
            "name": "Infrastructure"
          }
        },
        {
          "publicId": "9314b8f7-ab70-4476-9e77-6761496db563",
          "name": "Github OAuth",
          "category": {
            "id": 7,
            "name": "Authentication & APIs"
          }
        },
        {
          "publicId": "8dee71b6-1f55-487f-9f56-d5d06705cde2",
          "name": "Github API",
          "category": {
            "id": 7,
            "name": "Authentication & APIs"
          }
        },
        {
          "publicId": "730b22ac-645f-4710-a93a-98b4c85b9283",
          "name": "Google OAuth",
          "category": {
            "id": 7,
            "name": "Authentication & APIs"
          }
        },
        {
          "publicId": "3530629e-79e9-4c89-81d9-e3729e9a6a4e",
          "name": "Cloudinary",
          "category": {
            "id": 2,
            "name": "Infrastructure"
          }
        }
      ]
    },
    "startDate": "Oct 2025",
    "endDate": "Dec 2025",
    "status": "COMPLETED",
    "publicationStatus": "PUBLISHED",
    "keyHighlights": [
      "No-code portfolio creation that enables developers to showcase their skills, projects, and professional information without manually building a website.",
      "Reusable portfolio themes that allow users to customize their presentation while keeping the underlying profile data consistent.",
      "Google and GitHub OAuth authentication with NextAuth.js for secure account access.",
      "Cloudinary-powered image storage and CDN delivery for portfolio assets.",
      "Server-side rendering and Vercel deployment for responsive portfolio previews and public accessibility."
    ],
    "displayOrder": 2,
    "createdAt": "2026-10-29T09:12:01.403549Z",
    "updatedAt": "2026-10-29T09:12:01.403549Z",
    "displayed": true,
    "featured": true
  },
  {
    "publicId": "ae65ba38-8baa-4a7b-8d8f-f49d8f598b46",
    "title": "HealthAssist",
    "shortDescription": "NLP-powered AI health chatbot supporting symptom queries, mood journaling, sentiment analysis, and daily health history tracking.",
    "description": "Developed HealthAssist, an NLP-powered AI health chatbot designed to support symptom-related queries, mood journaling, and daily history tracking.\n\n### Key Features\n- AI-powered chatbot supporting symptom queries.\n- Mood journaling with daily sentiment classification.\n- Historical tracking of user interactions and mood records.\n- RESTful APIs for chat flow, mood tracking, and session-based history logs.\n\n### Technical Implementation\n- Developed the backend using Python and Flask.\n- Integrated NLP-based processing for chatbot functionality.\n- Implemented sentiment analysis for daily mood classification.\n- Used MongoDB for storing application data and session-based history.\n- Deployed the backend on Render with environment-based configuration to maintain development and production parity.\n\n### Technology Stack\nPython, Flask, NLP, MongoDB, REST APIs, Render.",
    "category": "AI SYSTEMS",
    "projectImage": {
      "publicId": "60c6f761-2b13-45eb-a62b-00f020bf08ad",
      "cloudinaryPublicId": "portfolio/projects/ho0wpsejxb414fiyxcv9",
      "cloudinaryUrl": "https://res.cloudinary.com/bgwc25au/image/upload/v1793479712/portfolio/projects/ho0wpsejxb414fiyxcv9.png"
    },
    "githubUrl": null,
    "liveUrl": {
      "title": "Live Demo",
      "link": "https://health-assist-chatbot-viiiiiimmv.vercel.app/",
      "logo": null
    },
    "documentationUrl": null,
    "techStack": {
      "skills": [
        {
          "publicId": "4f15adfb-7523-4cca-955c-eafca0ff20bf",
          "name": "Python",
          "category": {
            "id": 1,
            "name": "Language"
          }
        },
        {
          "publicId": "5f66d40d-8902-4dc5-955d-27f9557c7ef3",
          "name": "MongoDB",
          "category": {
            "id": 4,
            "name": "Databases"
          }
        },
        {
          "publicId": "b083dfa7-db97-4d70-a245-582fb9723697",
          "name": "Flask",
          "category": {
            "id": 6,
            "name": "Backend"
          }
        },
        {
          "publicId": "aa13beb8-3f9f-499a-a206-d147acbb1574",
          "name": "NLP",
          "category": {
            "id": 8,
            "name": "AI & Machine Learning"
          }
        },
        {
          "publicId": "6f188036-e539-46ed-934d-eac027d9ad53",
          "name": "Machine Learning",
          "category": {
            "id": 8,
            "name": "AI & Machine Learning"
          }
        }
      ]
    },
    "startDate": "Jul 2025",
    "endDate": "Sep 2025",
    "status": "COMPLETED",
    "publicationStatus": "PUBLISHED",
    "keyHighlights": [
      "NLP-powered AI chatbot for symptom queries",
      "Sentiment analysis for daily mood classification",
      "RESTful APIs for chat and mood tracking",
      "Session-based history logging",
      "Environment-based deployment on Render"
    ],
    "displayOrder": 3,
    "createdAt": "2026-10-31T20:48:38.575335Z",
    "updatedAt": "2026-10-31T20:49:45.837282Z",
    "displayed": true,
    "featured": true
  }
];

export const MOCK_PUBLISHED_PROJECTS: PaginatedResponse<ProjectDTO> = {
  "content": [
    {
      "publicId": "df8502b7-6624-411f-aa23-3dd906cd028c",
      "title": "DevPulse",
      "shortDescription": "Developer analytics platform that integrates with GitHub to turn repository, contribution, commit, and language data into actionable engineering insights through interactive dashboards.",
      "description": "## DevPulse — GitHub Analytics Platform\n\nDevPulse is a full-stack GitHub analytics platform that transforms repository and contribution activity into a centralized, data-driven dashboard. It helps developers track their coding consistency, explore repository statistics, and understand their development activity over time.\n\n### Key Features\n\n- **Contribution Analytics:** Visualize daily, weekly, and monthly commit activity through interactive analytics and contribution heatmaps.\n- **Repository Insights:** Explore repositories, programming language distributions, commit histories, and repository statistics.\n- **Developer Dashboard:** Track total commits, repositories, stars, and contribution streaks in one place.\n- **GitHub Authentication:** Authenticate using GitHub OAuth and access authorized repository data.\n- **Background Synchronization:** Process GitHub data asynchronously using BullMQ and Redis, with automatic retries for failed jobs.\n- **Persistent Analytics:** Store synchronized data in PostgreSQL and use database-backed dashboard queries instead of depending on live GitHub API requests for every page load.\n- **Incremental Data Storage:** Avoid inserting duplicate commit records during synchronization.\n- **Scalable Data Access:** Support paginated commit histories and dedicated analytics endpoints.\n\n### Tech Stack\n\nNext.js, TypeScript, Prisma ORM, PostgreSQL, GitHub REST API, GitHub OAuth, NextAuth.js, BullMQ, Redis, and ioredis.\n\n### Engineering Focus\n\nDevPulse emphasizes reliable background processing, persistent analytics, authentication, efficient database access, and separation between external API synchronization and dashboard data retrieval.",
      "category": "Developer Tools",
      "projectImage": {
        "publicId": "5b2b688e-3f28-434c-a611-f36d28b64328",
        "cloudinaryPublicId": "portfolio/projects/ulcg1dlcyur14aawuysz",
        "cloudinaryUrl": "https://res.cloudinary.com/bgwc25au/image/upload/v1793264793/portfolio/projects/ulcg1dlcyur14aawuysz.png"
      },
      "githubUrl": {
        "title": "GitHub",
        "link": "https://github.com/viiiiiimmv/DevPulse",
        "logo": null
      },
      "liveUrl": {
        "title": "Live Demo",
        "link": "https://devpulse-viiiiiimmv.vercel.app/",
        "logo": null
      },
      "documentationUrl": null,
      "techStack": {
        "skills": [
          {
            "publicId": "0ea67bfa-054d-4c19-88d3-ab5b702de26f",
            "name": "NextJS",
            "category": {
              "id": 5,
              "name": "Frontend"
            }
          },
          {
            "publicId": "08b38be7-6469-4956-8924-f3d513374dda",
            "name": "TailwindCSS",
            "category": {
              "id": 5,
              "name": "Frontend"
            }
          },
          {
            "publicId": "8dee71b6-1f55-487f-9f56-d5d06705cde2",
            "name": "Github API",
            "category": {
              "id": 7,
              "name": "Authentication & APIs"
            }
          },
          {
            "publicId": "250360b6-93eb-45fa-a867-35a8e9d432cb",
            "name": "Prisma",
            "category": {
              "id": 6,
              "name": "Backend"
            }
          },
          {
            "publicId": "88e2864c-ff03-4073-804f-baf501650a6d",
            "name": "BullMQ",
            "category": {
              "id": 2,
              "name": "Infrastructure"
            }
          },
          {
            "publicId": "978ec6a7-eb15-45d5-bf78-9702164a1eed",
            "name": "Redis",
            "category": {
              "id": 4,
              "name": "Databases"
            }
          },
          {
            "publicId": "01c7ccae-9bf9-46cc-8cc4-1221c8b954e8",
            "name": "TypeScript",
            "category": {
              "id": 1,
              "name": "Language"
            }
          },
          {
            "publicId": "1b95dcb4-c02b-4ada-9e79-52b1fafd107f",
            "name": "JWT",
            "category": {
              "id": 7,
              "name": "Authentication & APIs"
            }
          },
          {
            "publicId": "d97f47c0-12f0-4a0b-be40-30abb70a5d9c",
            "name": "Vercel",
            "category": {
              "id": 2,
              "name": "Infrastructure"
            }
          },
          {
            "publicId": "46521fa0-db79-474c-9612-2d8013697de8",
            "name": "REST API Development",
            "category": {
              "id": 6,
              "name": "Backend"
            }
          },
          {
            "publicId": "3fc60c96-7162-4699-97b5-a626562a99dc",
            "name": "PostgreSQL",
            "category": {
              "id": 4,
              "name": "Databases"
            }
          }
        ]
      },
      "startDate": "Jun 2026",
      "endDate": "Jul 2026",
      "status": "COMPLETED",
      "publicationStatus": "PUBLISHED",
      "keyHighlights": [
        "Background GitHub data synchronization using BullMQ and Redis, with automatic retries for failed jobs.",
        "PostgreSQL-backed analytics dashboard with commit activity heatmaps, contribution streaks, repository statistics, and language breakdowns.",
        "Efficient incremental data storage that avoids re-inserting existing commit records and keeps dashboard analytics available independently of GitHub API availability."
      ],
      "displayOrder": 1,
      "createdAt": "2026-10-27T20:47:43.667349Z",
      "updatedAt": "2026-10-30T17:12:09.045802Z",
      "displayed": true,
      "featured": true
    },
    {
      "publicId": "d72b8753-edd2-4234-b20f-e883f1019ab4",
      "title": "DevLink",
      "shortDescription": "A no-code developer portfolio builder that lets developers create and customize professional portfolios without writing code.",
      "description": "## DevLink — No-Code Developer Portfolio Builder\n\nDevLink is a full-stack platform that enables developers to create professional portfolio websites without writing code. It provides a streamlined way to present technical skills, projects, and professional information through customizable portfolio themes.\n\n### Key Features\n\n- **No-Code Portfolio Creation:** Build and publish a developer portfolio without manually developing a website.\n- **Customizable Themes:** Choose from different presentation styles while reusing the same underlying profile data.\n- **Developer Profiles:** Organize professional information, skills, and projects into a portfolio designed for showcasing technical experience.\n- **OAuth Authentication:** Support Google and GitHub sign-in through NextAuth.js.\n- **Image Management:** Use Cloudinary for image storage, asset delivery, and CDN-backed media handling.\n- **Server-Side Rendering:** Render portfolio pages on the server to support efficient page delivery and public accessibility.\n- **Production Deployment:** Deploy the application using Vercel.\n\n### Tech Stack\n\nNext.js, TypeScript, MongoDB, Mongoose, NextAuth.js, Google OAuth, GitHub OAuth, Cloudinary, and Vercel.\n\n### Engineering Focus\n\nDevLink focuses on reusable theme architecture, data-driven portfolio rendering, authentication, media management, and simplifying the process of building a professional online presence.",
      "category": "Developer Tools",
      "projectImage": {
        "publicId": "e65e1ca2-8cad-4f6d-9a39-b6356307cff4",
        "cloudinaryPublicId": "portfolio/projects/zvqb8d0llzf5im2g7crv",
        "cloudinaryUrl": "https://res.cloudinary.com/bgwc25au/image/upload/v1793265116/portfolio/projects/zvqb8d0llzf5im2g7crv.png"
      },
      "githubUrl": {
        "title": "GitHub",
        "link": "https://github.com/viiiiiimmv/DevLink",
        "logo": null
      },
      "liveUrl": {
        "title": "Live Demo",
        "link": "https://devlink-viiiiiimmv.vercel.app/",
        "logo": null
      },
      "documentationUrl": null,
      "techStack": {
        "skills": [
          {
            "publicId": "01c7ccae-9bf9-46cc-8cc4-1221c8b954e8",
            "name": "TypeScript",
            "category": {
              "id": 1,
              "name": "Language"
            }
          },
          {
            "publicId": "5f66d40d-8902-4dc5-955d-27f9557c7ef3",
            "name": "MongoDB",
            "category": {
              "id": 4,
              "name": "Databases"
            }
          },
          {
            "publicId": "0ea67bfa-054d-4c19-88d3-ab5b702de26f",
            "name": "NextJS",
            "category": {
              "id": 5,
              "name": "Frontend"
            }
          },
          {
            "publicId": "08b38be7-6469-4956-8924-f3d513374dda",
            "name": "TailwindCSS",
            "category": {
              "id": 5,
              "name": "Frontend"
            }
          },
          {
            "publicId": "d97f47c0-12f0-4a0b-be40-30abb70a5d9c",
            "name": "Vercel",
            "category": {
              "id": 2,
              "name": "Infrastructure"
            }
          },
          {
            "publicId": "9314b8f7-ab70-4476-9e77-6761496db563",
            "name": "Github OAuth",
            "category": {
              "id": 7,
              "name": "Authentication & APIs"
            }
          },
          {
            "publicId": "8dee71b6-1f55-487f-9f56-d5d06705cde2",
            "name": "Github API",
            "category": {
              "id": 7,
              "name": "Authentication & APIs"
            }
          },
          {
            "publicId": "730b22ac-645f-4710-a93a-98b4c85b9283",
            "name": "Google OAuth",
            "category": {
              "id": 7,
              "name": "Authentication & APIs"
            }
          },
          {
            "publicId": "3530629e-79e9-4c89-81d9-e3729e9a6a4e",
            "name": "Cloudinary",
            "category": {
              "id": 2,
              "name": "Infrastructure"
            }
          }
        ]
      },
      "startDate": "Oct 2025",
      "endDate": "Dec 2025",
      "status": "COMPLETED",
      "publicationStatus": "PUBLISHED",
      "keyHighlights": [
        "No-code portfolio creation that enables developers to showcase their skills, projects, and professional information without manually building a website.",
        "Reusable portfolio themes that allow users to customize their presentation while keeping the underlying profile data consistent.",
        "Google and GitHub OAuth authentication with NextAuth.js for secure account access.",
        "Cloudinary-powered image storage and CDN delivery for portfolio assets.",
        "Server-side rendering and Vercel deployment for responsive portfolio previews and public accessibility."
      ],
      "displayOrder": 2,
      "createdAt": "2026-10-29T09:12:01.403549Z",
      "updatedAt": "2026-10-29T09:12:01.403549Z",
      "displayed": true,
      "featured": true
    },
    {
      "publicId": "ae65ba38-8baa-4a7b-8d8f-f49d8f598b46",
      "title": "HealthAssist",
      "shortDescription": "NLP-powered AI health chatbot supporting symptom queries, mood journaling, sentiment analysis, and daily health history tracking.",
      "description": "Developed HealthAssist, an NLP-powered AI health chatbot designed to support symptom-related queries, mood journaling, and daily history tracking.\n\n### Key Features\n- AI-powered chatbot supporting symptom queries.\n- Mood journaling with daily sentiment classification.\n- Historical tracking of user interactions and mood records.\n- RESTful APIs for chat flow, mood tracking, and session-based history logs.\n\n### Technical Implementation\n- Developed the backend using Python and Flask.\n- Integrated NLP-based processing for chatbot functionality.\n- Implemented sentiment analysis for daily mood classification.\n- Used MongoDB for storing application data and session-based history.\n- Deployed the backend on Render with environment-based configuration to maintain development and production parity.\n\n### Technology Stack\nPython, Flask, NLP, MongoDB, REST APIs, Render.",
      "category": "AI SYSTEMS",
      "projectImage": {
        "publicId": "60c6f761-2b13-45eb-a62b-00f020bf08ad",
        "cloudinaryPublicId": "portfolio/projects/ho0wpsejxb414fiyxcv9",
        "cloudinaryUrl": "https://res.cloudinary.com/bgwc25au/image/upload/v1793479712/portfolio/projects/ho0wpsejxb414fiyxcv9.png"
      },
      "githubUrl": null,
      "liveUrl": {
        "title": "Live Demo",
        "link": "https://health-assist-chatbot-viiiiiimmv.vercel.app/",
        "logo": null
      },
      "documentationUrl": null,
      "techStack": {
        "skills": [
          {
            "publicId": "4f15adfb-7523-4cca-955c-eafca0ff20bf",
            "name": "Python",
            "category": {
              "id": 1,
              "name": "Language"
            }
          },
          {
            "publicId": "5f66d40d-8902-4dc5-955d-27f9557c7ef3",
            "name": "MongoDB",
            "category": {
              "id": 4,
              "name": "Databases"
            }
          },
          {
            "publicId": "b083dfa7-db97-4d70-a245-582fb9723697",
            "name": "Flask",
            "category": {
              "id": 6,
              "name": "Backend"
            }
          },
          {
            "publicId": "aa13beb8-3f9f-499a-a206-d147acbb1574",
            "name": "NLP",
            "category": {
              "id": 8,
              "name": "AI & Machine Learning"
            }
          },
          {
            "publicId": "6f188036-e539-46ed-934d-eac027d9ad53",
            "name": "Machine Learning",
            "category": {
              "id": 8,
              "name": "AI & Machine Learning"
            }
          }
        ]
      },
      "startDate": "Jul 2025",
      "endDate": "Sep 2025",
      "status": "COMPLETED",
      "publicationStatus": "PUBLISHED",
      "keyHighlights": [
        "NLP-powered AI chatbot for symptom queries",
        "Sentiment analysis for daily mood classification",
        "RESTful APIs for chat and mood tracking",
        "Session-based history logging",
        "Environment-based deployment on Render"
      ],
      "displayOrder": 3,
      "createdAt": "2026-10-31T20:48:38.575335Z",
      "updatedAt": "2026-10-31T20:49:45.837282Z",
      "displayed": true,
      "featured": true
    }
  ],
  "page": {
    "size": 50,
    "number": 0,
    "totalElements": 3,
    "totalPages": 1
  }
};

export const MOCK_ALL_PROJECTS: PaginatedResponse<ProjectDTO> = {
  "content": [
    {
      "publicId": "d538ce08-b689-4efa-8999-ec92876a3235",
      "title": "Pustakam",
      "shortDescription": "A book-centric community platform designed to bring readers together through a shared digital space for discovering books, exploring literary interests, and building a connected reading community.",
      "description": "# Pustakam — A Community Built Around Books\n\nPustakam is a book-centric community platform envisioned to bring readers together through a shared digital environment. It aims to create a space where people can explore books, connect through their reading interests, and participate in a community centered around literature.\n\n### Project Vision\n\nThe primary objective of Pustakam is to build a unified platform around reading and literary discovery, moving beyond a conventional digital book catalog toward a community-oriented experience.\n\n### Technical Architecture\n\n- Designed around a Spring Boot backend architecture.\n- Uses PostgreSQL as the relational database for structured data management.\n- Follows RESTful API principles for communication between application layers.\n- Uses Spring Data JPA for database interaction and persistence.\n- Follows an MVP-first development approach to establish a maintainable foundation for future expansion.\n\n### Technology Stack\n\nJava, Spring Boot, PostgreSQL, Spring Data JPA, and REST APIs.\n\n### Product Philosophy\n\nPustakam aims to make reading a more connected experience by bringing books and readers into one community-driven platform.",
      "category": "COMMUNITY",
      "projectImage": null,
      "githubUrl": null,
      "liveUrl": null,
      "documentationUrl": null,
      "techStack": {
        "skills": []
      },
      "startDate": "Q1 2027",
      "endDate": "Q2 2027",
      "status": "IN_PROGRESS",
      "publicationStatus": "DRAFT",
      "keyHighlights": [
        "Spring Boot-based backend architecture",
        "PostgreSQL relational database integration",
        "RESTful API-driven application architecture",
        "Modular backend development for book community features",
        "Structured data management using Spring Data JPA",
        "MVP-focused application development"
      ],
      "displayOrder": 5,
      "createdAt": "2026-10-31T21:06:42.102056Z",
      "updatedAt": "2026-10-31T21:08:17.46794Z",
      "displayed": true,
      "featured": false
    },
    {
      "publicId": "f433daf3-d397-4ba2-be62-1849079d3239",
      "title": "Anuvriddhi",
      "shortDescription": "An AI-powered adaptive learning and interview preparation platform that generates role-specific assessments, evaluates learner performance, identifies skill gaps, and delivers personalized learning recommendations.",
      "description": "# Anuvriddhi — Progress through Learning\n\nAnuvriddhi is an AI-powered adaptive learning and interview preparation platform designed to make technical preparation more structured, personalized, and performance-driven.\n\nThe platform transforms job descriptions into structured learning objectives, generates relevant technical assessments, analyzes learner performance, and identifies areas that require improvement.\n\nRather than following a static preparation path, Anuvriddhi focuses on continuous improvement through the cycle of learning, practice, identifying gaps, and improving.\n\n### Key Features\n\n- **Intelligent Job Analysis:** Processes job descriptions to identify relevant skills, technologies, and assessment requirements.\n- **AI Assessment Generation:** Generates structured technical assessments with questions categorized by skill, topic, and difficulty.\n- **Adaptive Assessments:** Uses previous assessment attempts and learning history to generate assessments aligned with individual learning progress.\n- **Performance Analytics:** Identifies strong skills, weak skills, unassessed topics, and improvement areas.\n- **Personalized Recommendations:** Suggests targeted learning activities, including concept reviews, practice, challenges, and assessments.\n- **Question Quality Validation:** Evaluates question correctness, explanations, ambiguity, and duplication to maintain assessment quality.\n\n### Technical Architecture\n\n- Developed a dedicated Python-based AI intelligence engine using FastAPI.\n- Integrated Google's Gemini API for AI-powered assessment and intelligence workflows.\n- Designed structured request and response models for reliable AI service communication.\n- Implemented modular REST API endpoints for job analysis, assessment generation, adaptive assessments, performance analysis, and recommendations.\n- Designed a separate Spring Boot backend integration layer to manage application data, assessment history, and user-facing business logic.\n- Used structured validation and data models to maintain consistency across service boundaries.\n\n### Core Technology Stack\n\nNext.js, TypeScript, Tailwind CSS, Python, FastAPI, Gemini API, MongoDB, Mongoose, Zod, Framer Motion, and Spring Boot.\n\n### Product Philosophy\n\n**Learn → Practice → Identify → Improve**\n\nAnuvriddhi represents continuous development through structured learning, measurable progress, and personalized improvement.",
      "category": "EdTech",
      "projectImage": null,
      "githubUrl": null,
      "liveUrl": null,
      "documentationUrl": null,
      "techStack": {
        "skills": []
      },
      "startDate": "Sep 2026",
      "endDate": "Present",
      "status": "IN_PROGRESS",
      "publicationStatus": "DRAFT",
      "keyHighlights": [
        "AI-powered job description analysis and skill extraction",
        "Dynamic assessment and question generation using Gemini",
        "Adaptive assessments based on historical learner performance",
        "AI-driven performance analysis and skill gap identification",
        "Personalized learning recommendations with priority scoring",
        "Question quality validation and duplicate detection",
        "Modular Python-based AI intelligence engine",
        "REST API integration with Spring Boot backend"
      ],
      "displayOrder": 4,
      "createdAt": "2026-10-31T20:55:39.846506Z",
      "updatedAt": "2026-10-31T21:08:24.008813Z",
      "displayed": true,
      "featured": false
    },
    {
      "publicId": "ae65ba38-8baa-4a7b-8d8f-f49d8f598b46",
      "title": "HealthAssist",
      "shortDescription": "NLP-powered AI health chatbot supporting symptom queries, mood journaling, sentiment analysis, and daily health history tracking.",
      "description": "Developed HealthAssist, an NLP-powered AI health chatbot designed to support symptom-related queries, mood journaling, and daily history tracking.\n\n### Key Features\n- AI-powered chatbot supporting symptom queries.\n- Mood journaling with daily sentiment classification.\n- Historical tracking of user interactions and mood records.\n- RESTful APIs for chat flow, mood tracking, and session-based history logs.\n\n### Technical Implementation\n- Developed the backend using Python and Flask.\n- Integrated NLP-based processing for chatbot functionality.\n- Implemented sentiment analysis for daily mood classification.\n- Used MongoDB for storing application data and session-based history.\n- Deployed the backend on Render with environment-based configuration to maintain development and production parity.\n\n### Technology Stack\nPython, Flask, NLP, MongoDB, REST APIs, Render.",
      "category": "AI SYSTEMS",
      "projectImage": {
        "publicId": "60c6f761-2b13-45eb-a62b-00f020bf08ad",
        "cloudinaryPublicId": "portfolio/projects/ho0wpsejxb414fiyxcv9",
        "cloudinaryUrl": "https://res.cloudinary.com/bgwc25au/image/upload/v1793479712/portfolio/projects/ho0wpsejxb414fiyxcv9.png"
      },
      "githubUrl": null,
      "liveUrl": {
        "title": "Live Demo",
        "link": "https://health-assist-chatbot-viiiiiimmv.vercel.app/",
        "logo": null
      },
      "documentationUrl": null,
      "techStack": {
        "skills": [
          {
            "publicId": "4f15adfb-7523-4cca-955c-eafca0ff20bf",
            "name": "Python",
            "category": {
              "id": 1,
              "name": "Language"
            }
          },
          {
            "publicId": "5f66d40d-8902-4dc5-955d-27f9557c7ef3",
            "name": "MongoDB",
            "category": {
              "id": 4,
              "name": "Databases"
            }
          },
          {
            "publicId": "b083dfa7-db97-4d70-a245-582fb9723697",
            "name": "Flask",
            "category": {
              "id": 6,
              "name": "Backend"
            }
          },
          {
            "publicId": "aa13beb8-3f9f-499a-a206-d147acbb1574",
            "name": "NLP",
            "category": {
              "id": 8,
              "name": "AI & Machine Learning"
            }
          },
          {
            "publicId": "6f188036-e539-46ed-934d-eac027d9ad53",
            "name": "Machine Learning",
            "category": {
              "id": 8,
              "name": "AI & Machine Learning"
            }
          }
        ]
      },
      "startDate": "Jul 2025",
      "endDate": "Sep 2025",
      "status": "COMPLETED",
      "publicationStatus": "PUBLISHED",
      "keyHighlights": [
        "NLP-powered AI chatbot for symptom queries",
        "Sentiment analysis for daily mood classification",
        "RESTful APIs for chat and mood tracking",
        "Session-based history logging",
        "Environment-based deployment on Render"
      ],
      "displayOrder": 3,
      "createdAt": "2026-10-31T20:48:38.575335Z",
      "updatedAt": "2026-10-31T20:49:45.837282Z",
      "displayed": true,
      "featured": true
    },
    {
      "publicId": "d72b8753-edd2-4234-b20f-e883f1019ab4",
      "title": "DevLink",
      "shortDescription": "A no-code developer portfolio builder that lets developers create and customize professional portfolios without writing code.",
      "description": "## DevLink — No-Code Developer Portfolio Builder\n\nDevLink is a full-stack platform that enables developers to create professional portfolio websites without writing code. It provides a streamlined way to present technical skills, projects, and professional information through customizable portfolio themes.\n\n### Key Features\n\n- **No-Code Portfolio Creation:** Build and publish a developer portfolio without manually developing a website.\n- **Customizable Themes:** Choose from different presentation styles while reusing the same underlying profile data.\n- **Developer Profiles:** Organize professional information, skills, and projects into a portfolio designed for showcasing technical experience.\n- **OAuth Authentication:** Support Google and GitHub sign-in through NextAuth.js.\n- **Image Management:** Use Cloudinary for image storage, asset delivery, and CDN-backed media handling.\n- **Server-Side Rendering:** Render portfolio pages on the server to support efficient page delivery and public accessibility.\n- **Production Deployment:** Deploy the application using Vercel.\n\n### Tech Stack\n\nNext.js, TypeScript, MongoDB, Mongoose, NextAuth.js, Google OAuth, GitHub OAuth, Cloudinary, and Vercel.\n\n### Engineering Focus\n\nDevLink focuses on reusable theme architecture, data-driven portfolio rendering, authentication, media management, and simplifying the process of building a professional online presence.",
      "category": "Developer Tools",
      "projectImage": {
        "publicId": "e65e1ca2-8cad-4f6d-9a39-b6356307cff4",
        "cloudinaryPublicId": "portfolio/projects/zvqb8d0llzf5im2g7crv",
        "cloudinaryUrl": "https://res.cloudinary.com/bgwc25au/image/upload/v1793265116/portfolio/projects/zvqb8d0llzf5im2g7crv.png"
      },
      "githubUrl": {
        "title": "GitHub",
        "link": "https://github.com/viiiiiimmv/DevLink",
        "logo": null
      },
      "liveUrl": {
        "title": "Live Demo",
        "link": "https://devlink-viiiiiimmv.vercel.app/",
        "logo": null
      },
      "documentationUrl": null,
      "techStack": {
        "skills": [
          {
            "publicId": "01c7ccae-9bf9-46cc-8cc4-1221c8b954e8",
            "name": "TypeScript",
            "category": {
              "id": 1,
              "name": "Language"
            }
          },
          {
            "publicId": "5f66d40d-8902-4dc5-955d-27f9557c7ef3",
            "name": "MongoDB",
            "category": {
              "id": 4,
              "name": "Databases"
            }
          },
          {
            "publicId": "0ea67bfa-054d-4c19-88d3-ab5b702de26f",
            "name": "NextJS",
            "category": {
              "id": 5,
              "name": "Frontend"
            }
          },
          {
            "publicId": "08b38be7-6469-4956-8924-f3d513374dda",
            "name": "TailwindCSS",
            "category": {
              "id": 5,
              "name": "Frontend"
            }
          },
          {
            "publicId": "d97f47c0-12f0-4a0b-be40-30abb70a5d9c",
            "name": "Vercel",
            "category": {
              "id": 2,
              "name": "Infrastructure"
            }
          },
          {
            "publicId": "9314b8f7-ab70-4476-9e77-6761496db563",
            "name": "Github OAuth",
            "category": {
              "id": 7,
              "name": "Authentication & APIs"
            }
          },
          {
            "publicId": "8dee71b6-1f55-487f-9f56-d5d06705cde2",
            "name": "Github API",
            "category": {
              "id": 7,
              "name": "Authentication & APIs"
            }
          },
          {
            "publicId": "730b22ac-645f-4710-a93a-98b4c85b9283",
            "name": "Google OAuth",
            "category": {
              "id": 7,
              "name": "Authentication & APIs"
            }
          },
          {
            "publicId": "3530629e-79e9-4c89-81d9-e3729e9a6a4e",
            "name": "Cloudinary",
            "category": {
              "id": 2,
              "name": "Infrastructure"
            }
          }
        ]
      },
      "startDate": "Oct 2025",
      "endDate": "Dec 2025",
      "status": "COMPLETED",
      "publicationStatus": "PUBLISHED",
      "keyHighlights": [
        "No-code portfolio creation that enables developers to showcase their skills, projects, and professional information without manually building a website.",
        "Reusable portfolio themes that allow users to customize their presentation while keeping the underlying profile data consistent.",
        "Google and GitHub OAuth authentication with NextAuth.js for secure account access.",
        "Cloudinary-powered image storage and CDN delivery for portfolio assets.",
        "Server-side rendering and Vercel deployment for responsive portfolio previews and public accessibility."
      ],
      "displayOrder": 2,
      "createdAt": "2026-10-29T09:12:01.403549Z",
      "updatedAt": "2026-10-29T09:12:01.403549Z",
      "displayed": true,
      "featured": true
    },
    {
      "publicId": "df8502b7-6624-411f-aa23-3dd906cd028c",
      "title": "DevPulse",
      "shortDescription": "Developer analytics platform that integrates with GitHub to turn repository, contribution, commit, and language data into actionable engineering insights through interactive dashboards.",
      "description": "## DevPulse — GitHub Analytics Platform\n\nDevPulse is a full-stack GitHub analytics platform that transforms repository and contribution activity into a centralized, data-driven dashboard. It helps developers track their coding consistency, explore repository statistics, and understand their development activity over time.\n\n### Key Features\n\n- **Contribution Analytics:** Visualize daily, weekly, and monthly commit activity through interactive analytics and contribution heatmaps.\n- **Repository Insights:** Explore repositories, programming language distributions, commit histories, and repository statistics.\n- **Developer Dashboard:** Track total commits, repositories, stars, and contribution streaks in one place.\n- **GitHub Authentication:** Authenticate using GitHub OAuth and access authorized repository data.\n- **Background Synchronization:** Process GitHub data asynchronously using BullMQ and Redis, with automatic retries for failed jobs.\n- **Persistent Analytics:** Store synchronized data in PostgreSQL and use database-backed dashboard queries instead of depending on live GitHub API requests for every page load.\n- **Incremental Data Storage:** Avoid inserting duplicate commit records during synchronization.\n- **Scalable Data Access:** Support paginated commit histories and dedicated analytics endpoints.\n\n### Tech Stack\n\nNext.js, TypeScript, Prisma ORM, PostgreSQL, GitHub REST API, GitHub OAuth, NextAuth.js, BullMQ, Redis, and ioredis.\n\n### Engineering Focus\n\nDevPulse emphasizes reliable background processing, persistent analytics, authentication, efficient database access, and separation between external API synchronization and dashboard data retrieval.",
      "category": "Developer Tools",
      "projectImage": {
        "publicId": "5b2b688e-3f28-434c-a611-f36d28b64328",
        "cloudinaryPublicId": "portfolio/projects/ulcg1dlcyur14aawuysz",
        "cloudinaryUrl": "https://res.cloudinary.com/bgwc25au/image/upload/v1793264793/portfolio/projects/ulcg1dlcyur14aawuysz.png"
      },
      "githubUrl": {
        "title": "GitHub",
        "link": "https://github.com/viiiiiimmv/DevPulse",
        "logo": null
      },
      "liveUrl": {
        "title": "Live Demo",
        "link": "https://devpulse-viiiiiimmv.vercel.app/",
        "logo": null
      },
      "documentationUrl": null,
      "techStack": {
        "skills": [
          {
            "publicId": "0ea67bfa-054d-4c19-88d3-ab5b702de26f",
            "name": "NextJS",
            "category": {
              "id": 5,
              "name": "Frontend"
            }
          },
          {
            "publicId": "08b38be7-6469-4956-8924-f3d513374dda",
            "name": "TailwindCSS",
            "category": {
              "id": 5,
              "name": "Frontend"
            }
          },
          {
            "publicId": "8dee71b6-1f55-487f-9f56-d5d06705cde2",
            "name": "Github API",
            "category": {
              "id": 7,
              "name": "Authentication & APIs"
            }
          },
          {
            "publicId": "250360b6-93eb-45fa-a867-35a8e9d432cb",
            "name": "Prisma",
            "category": {
              "id": 6,
              "name": "Backend"
            }
          },
          {
            "publicId": "88e2864c-ff03-4073-804f-baf501650a6d",
            "name": "BullMQ",
            "category": {
              "id": 2,
              "name": "Infrastructure"
            }
          },
          {
            "publicId": "978ec6a7-eb15-45d5-bf78-9702164a1eed",
            "name": "Redis",
            "category": {
              "id": 4,
              "name": "Databases"
            }
          },
          {
            "publicId": "01c7ccae-9bf9-46cc-8cc4-1221c8b954e8",
            "name": "TypeScript",
            "category": {
              "id": 1,
              "name": "Language"
            }
          },
          {
            "publicId": "1b95dcb4-c02b-4ada-9e79-52b1fafd107f",
            "name": "JWT",
            "category": {
              "id": 7,
              "name": "Authentication & APIs"
            }
          },
          {
            "publicId": "d97f47c0-12f0-4a0b-be40-30abb70a5d9c",
            "name": "Vercel",
            "category": {
              "id": 2,
              "name": "Infrastructure"
            }
          },
          {
            "publicId": "46521fa0-db79-474c-9612-2d8013697de8",
            "name": "REST API Development",
            "category": {
              "id": 6,
              "name": "Backend"
            }
          },
          {
            "publicId": "3fc60c96-7162-4699-97b5-a626562a99dc",
            "name": "PostgreSQL",
            "category": {
              "id": 4,
              "name": "Databases"
            }
          }
        ]
      },
      "startDate": "Jun 2026",
      "endDate": "Jul 2026",
      "status": "COMPLETED",
      "publicationStatus": "PUBLISHED",
      "keyHighlights": [
        "Background GitHub data synchronization using BullMQ and Redis, with automatic retries for failed jobs.",
        "PostgreSQL-backed analytics dashboard with commit activity heatmaps, contribution streaks, repository statistics, and language breakdowns.",
        "Efficient incremental data storage that avoids re-inserting existing commit records and keeps dashboard analytics available independently of GitHub API availability."
      ],
      "displayOrder": 1,
      "createdAt": "2026-10-27T20:47:43.667349Z",
      "updatedAt": "2026-10-30T17:12:09.045802Z",
      "displayed": true,
      "featured": true
    }
  ],
  "page": {
    "size": 50,
    "number": 0,
    "totalElements": 5,
    "totalPages": 1
  }
};

export const MOCK_EXPERIENCES: ExperienceDTO[] = [
  {
    "publicId": "40719d6d-5eee-45cb-8566-6ffa219097fe",
    "companyName": "Capgemini",
    "jobTitle": "Trainee",
    "employment": "TRAINING",
    "location": "Mohali, Punjab",
    "description": "Selected through Capgemini's campus recruitment process and currently undergoing the Exceller Training Program, gaining hands-on experience in Microsoft technologies, enterprise backend development, database management, and cloud computing. The training focuses on building a strong foundation in C#, .NET, ASP.NET Core, SQL Server, REST API development, and Microsoft Azure.",
    "responsibilities": [
      "Completed hands-on training in C# and object-oriented programming concepts.",
      "Gained practical experience with .NET and ASP.NET Core for enterprise backend development.",
      "Worked with SQL Server and relational database management concepts.",
      "Developed an understanding of RESTful API development and backend application architecture.",
      "Explored Microsoft Azure services, cloud deployment concepts, and fundamentals of cloud-based application development.",
      "Learned enterprise application development practices and Microsoft technology ecosystem."
    ],
    "techStack": {
      "skills": [
        {
          "publicId": "98bbceed-c07a-49be-8440-90da8e7d261c",
          "name": "C#",
          "category": {
            "id": 1,
            "name": "Language"
          }
        },
        {
          "publicId": "183b1a9c-8e47-443d-a66c-8c70fe18409d",
          "name": ".NET",
          "category": {
            "id": 6,
            "name": "Backend"
          }
        },
        {
          "publicId": "133a332b-14f0-4b81-aed6-050d38ea7204",
          "name": "ASP.NET Core",
          "category": {
            "id": 6,
            "name": "Backend"
          }
        },
        {
          "publicId": "e0d6f526-8a7d-484d-8dc4-335a4535d063",
          "name": "SQL Server",
          "category": {
            "id": 4,
            "name": "Databases"
          }
        },
        {
          "publicId": "46521fa0-db79-474c-9612-2d8013697de8",
          "name": "REST API Development",
          "category": {
            "id": 6,
            "name": "Backend"
          }
        },
        {
          "publicId": "1049061f-99ab-4406-b964-8c88f3107d94",
          "name": "Microsoft Azure",
          "category": {
            "id": 2,
            "name": "Infrastructure"
          }
        }
      ]
    },
    "companyLogoUrl": {
      "title": "Capgemini Logo",
      "link": "https://res.cloudinary.com/bgwc25au/image/upload/v1793378848/portfolio/experiences/lelqpevga5o6efxyx4yi.jpg",
      "logo": "https://res.cloudinary.com/bgwc25au/image/upload/v1793378848/portfolio/experiences/lelqpevga5o6efxyx4yi.jpg"
    },
    "companyWebsiteUrl": {
      "title": "Capgemini Website",
      "link": "https://www.capgemini.com/in-en/",
      "logo": null
    },
    "startMonth": 1,
    "startYear": 2026,
    "endMonth": 5,
    "endYear": 2026,
    "createdAt": "2026-10-30T16:47:36.836955Z",
    "updatedAt": "2026-11-01T07:31:37.855487Z"
  }
];

export const MOCK_EDUCATIONS: EducationDTO[] = [
  {
    "publicId": "dc57600b-63ef-49cd-a8c2-db6a2793d5ad",
    "institutionName": "Chandigarh University",
    "degree": "Bachelor of Engineering",
    "fieldOfStudy": "Computer Science and Engineering",
    "startYear": 2022,
    "endYear": 2026,
    "description": "Graduated with a Bachelor of Engineering in Computer Science and Engineering from Chandigarh University. Focused on software development, problem-solving, and building full-stack web applications. Developed projects involving web technologies, database management, authentication, and API integration.",
    "institutionLogoUrl": {
      "title": "Chandigarh University Logo",
      "link": "https://res.cloudinary.com/bgwc25au/image/upload/v1793382027/portfolio/education/rpubkgt6gvuj2ueykszn.jpg",
      "logo": "https://res.cloudinary.com/bgwc25au/image/upload/v1793382027/portfolio/education/rpubkgt6gvuj2ueykszn.jpg"
    },
    "institutionWebsiteUrl": {
      "title": "Chandigarh University Website",
      "link": "https://www.cuchd.in/",
      "logo": null
    },
    "grade": 7.98,
    "relevantCoursework": [
      "Data Structures",
      "Computer Architecture",
      "Operating System",
      "Database Management"
    ],
    "displayOrder": 1,
    "createdAt": "2026-10-29T09:20:18.031993Z",
    "updatedAt": "2026-10-30T17:40:50.572335Z",
    "featured": true,
    "visible": true
  }
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
