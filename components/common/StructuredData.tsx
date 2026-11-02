import React from "react";
import { ProfileDTO, ProjectDTO } from "@/types/portfolio";
import {
  generatePersonJsonLd,
  generateWebSiteJsonLd,
  generateProfilePageJsonLd,
  generateProjectsItemListJsonLd,
  safeJsonLd,
} from "@/lib/seo";

interface StructuredDataProps {
  profile?: ProfileDTO;
  publishedProjects?: ProjectDTO[];
}

export default function StructuredData({
  profile,
  publishedProjects = [],
}: StructuredDataProps) {
  const schemas = [
    generatePersonJsonLd(profile),
    generateWebSiteJsonLd(),
    generateProfilePageJsonLd(profile),
    generateProjectsItemListJsonLd(publishedProjects),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schemas) }}
    />
  );
}

