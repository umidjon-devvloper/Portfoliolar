import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    /* TODO: allow crawling once the placeholder content is replaced. */
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
