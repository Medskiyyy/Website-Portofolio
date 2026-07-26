import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Full-Stack Web & Android Developer`,
    short_name: profile.name.split(" ")[0],
    description:
      "Portfolio of Ahmad Hidayatullah — full-stack web and native Android developer.",
    start_url: "/en",
    display: "standalone",
    background_color: "#16191c",
    theme_color: "#16191c",
    icons: [
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
