import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Umidjon — Full Stack Web & Mobile Developer",
    short_name: "Umidjon",
    description: "Portfolio of Umidjon, full stack web and mobile developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d0d",
    theme_color: "#0d0d0d",
    icons: [
      { src: "/images/brand/logo.webp", sizes: "512x512", type: "image/webp" },
    ],
    id: site.url,
  };
}
