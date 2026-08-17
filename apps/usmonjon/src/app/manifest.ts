import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Usmonjon — Frontend Developer & UI/UX Designer",
    short_name: "Usmonjon",
    description: "Portfolio of Usmonjon, frontend developer and UI/UX designer.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d0d",
    theme_color: "#0d0d0d",
    icons: [
    /* TODO: add an icon file and list it here. */
    ],
    id: site.url,
  };
}
