import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Diyorbek — Full Stack Web Developer",
    short_name: "Diyorbek",
    description: "Portfolio of Diyorbek, full stack web developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d0d",
    theme_color: "#0d0d0d",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    id: site.url,
  };
}
