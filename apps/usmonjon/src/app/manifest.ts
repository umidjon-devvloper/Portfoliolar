import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Usmonjon Abduroziqov",
    short_name: "Usmonjon",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1b2b",
    theme_color: "#0e1b2b",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
