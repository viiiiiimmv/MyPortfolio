import { connection } from "next/server";
import {
  getProfile,
  getSkills,
  getFeaturedProjects,
  getPublishedProjects,
  getUpcomingProjects,
  getEducations,
  getExperiences,
  buildNormalizedTimeline,
  getGitHubContributions,
} from "@/services/api";
import PortfolioApp from "@/components/common/PortfolioApp";
import StructuredData from "@/components/common/StructuredData";

export const instant = false;

export default async function PortfolioPage() {
  await connection();

  // Concurrently fetch all section data from the documented backend endpoints
  const [
    profile,
    skills,
    featuredProjects,
    publishedProjectsData,
    upcomingProjects,
    educations,
    experiences,
    githubContributions,
  ] = await Promise.all([
    getProfile(),
    getSkills(),
    getFeaturedProjects(),
    getPublishedProjects(0, 10),
    getUpcomingProjects(),
    getEducations(),
    getExperiences(),
    getGitHubContributions(),
  ]);

  // Merge and sort chronological timeline as specified in Section 5 of LAYOUT
  const timeline = buildNormalizedTimeline(educations, experiences);

  return (
    <>
      {/* Structured Data (JSON-LD) for Search Engines */}
      <StructuredData
        profile={profile}
        publishedProjects={publishedProjectsData.content}
      />

      {/* Client Shell with Preloader and Smooth Unveil Transition */}
      <PortfolioApp
        initialData={{
          profile,
          skills,
          featuredProjects,
          publishedProjects: publishedProjectsData.content,
          upcomingProjects,
          timeline,
          githubContributions,
        }}
      />
    </>
  );
}
