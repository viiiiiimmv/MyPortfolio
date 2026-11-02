import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getPublishedProjects } from "@/services/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let latestModified = new Date("2026-10-31T01:10:00Z");

  try {
    // Retrieve published projects through the backend API
    const publishedData = await getPublishedProjects(0, 50);
    const published = publishedData?.content || [];

    // Filter strictly for published projects (strictly excluding drafts or private records)
    const validProjects = published.filter(
      (p) =>
        p &&
        p.publicationStatus === "PUBLISHED" &&
        p.status !== "DRAFT" &&
        p.status !== "DRAFTED"
    );

    // Compute the latest modification timestamp from valid published projects
    for (const project of validProjects) {
      if (project.updatedAt) {
        const projectDate = new Date(project.updatedAt);
        if (!isNaN(projectDate.getTime()) && projectDate > latestModified) {
          latestModified = projectDate;
        }
      }
    }
  } catch {
    // Fallback gracefully to default current date if API is temporarily unavailable
  }

  // Canonical homepage entry representing the complete, accessible portfolio
  return [
    {
      url: SITE_URL,
      lastModified: latestModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}

