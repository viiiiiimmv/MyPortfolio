export interface CloudinaryImageDTO {
  publicId: string;
  cloudinaryPublicId: string;
  cloudinaryUrl: string;
}

export interface ExternalLinkDTO {
  title: string;
  link: string;
  logo?: string | null;
}

export interface SocialLinksDTO {
  github?: string;
  linkedin?: string;
  leetcode?: string;
  [key: string]: string | undefined;
}

export interface ProfileDTO {
  publicId: string;
  fullName: string;
  headline: string;
  bio: string;
  primaryEmail: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  profileImage?: CloudinaryImageDTO;
  resumeUrl?: ExternalLinkDTO;
  socialLinks: SocialLinksDTO;
  heroTagLine: string;
  availabilityStatus: string;
  yearsOfExperience: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkillDTO {
  publicId: string;
  name: string;
  category?: string;
}

export interface ProjectDTO {
  publicId: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  projectImage?: CloudinaryImageDTO;
  githubUrl?: ExternalLinkDTO;
  liveUrl?: ExternalLinkDTO;
  documentationUrl?: ExternalLinkDTO;
  techStack?: {
    skills: SkillDTO[];
  };
  startDate?: string;
  endDate?: string;
  status: "COMPLETED" | "IN_PROGRESS" | "PLANNED" | "DRAFT" | string;
  publicationStatus: "PUBLISHED" | "DRAFTED" | "UNPUBLISHED" | string;
  isFeatured: boolean;
  isDisplayed?: boolean;
  keyHighlights?: string[];
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PageMetadata {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: PageMetadata;
}

export interface ExperienceDTO {
  publicId: string;
  companyName: string;
  jobTitle: string;
  employment?: string;
  location?: string;
  description?: string;
  responsibilities?: string[];
  techStack?: {
    skills: SkillDTO[];
  };
  companyLogoUrl?: string | ExternalLinkDTO | null;
  companyWebsiteUrl?: string | ExternalLinkDTO | null;
  companyUrl?: string | ExternalLinkDTO | null;
  startMonth?: string | number;
  startYear: number | string;
  endMonth?: string | number;
  endYear?: number | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EducationDTO {
  publicId: string;
  institutionName: string;
  degree: string;
  fieldOfStudy?: string;
  startYear: number | string;
  endYear?: number | string;
  description?: string;
  institutionLogoUrl?: string | ExternalLinkDTO | null;
  institutionWebsiteUrl?: string | ExternalLinkDTO | null;
  institutionalUrl?: string | ExternalLinkDTO | null;
  institutionUrl?: string | ExternalLinkDTO | null;
  grade?: string | number | null;
  relevantCoursework?: string[];
  displayOrder?: number;
  isVisible?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type TimelineType = "EDUCATION" | "EXPERIENCE";

export interface NormalizedTimelineItem {
  id: string;
  type: TimelineType;
  title: string;
  organization: string;
  startYear: number;
  startMonth?: string;
  endYear?: number | string;
  endMonth?: string;
  dateRange: string;
  location?: string;
  description?: string;
  details?: string[];
  tags?: string[];
  logoUrl?: string;
  websiteUrl?: string;
  status?: string;
  isUpcoming?: boolean;
  original: EducationDTO | ExperienceDTO;
}

export interface ContactMessageRequest {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}

export interface ContactMessageResponse {
  publicId: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface ProblemDetail {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  timestamp?: string;
  errors?: Record<string, string>;
}

export interface ContributionDayDTO {
  date: string;
  count: number;
  level: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE" | string;
  weekday: number;
}

export interface ContributionWeekDTO {
  days: ContributionDayDTO[];
}

export interface GitHubContributionsDTO {
  username: string;
  totalContributions: number;
  from: string;
  to: string;
  weeks: ContributionWeekDTO[];
}

export interface LeetCodeStatsData {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate?: string;
  ranking?: string;
  profileUrl: string;
}


