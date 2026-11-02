import type { MetadataRoute } from "next";
import {
  SITE_NAME,
  SITE_TITLE_DEFAULT,
  SITE_DESCRIPTION,
} from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE_DEFAULT,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.svg?v=3",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico?v=3",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png?v=3",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png?v=3",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

