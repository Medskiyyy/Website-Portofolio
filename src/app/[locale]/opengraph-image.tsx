import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = "Ahmad Hidayatullah, full-stack web and Android developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * Lives inside [locale] rather than at the app root: a root-level
 * /opengraph-image.png collides with the [locale] dynamic segment, which the
 * i18n proxy skips for any path containing a dot, so the route resolved to a
 * page instead of an image. Being in the segment also means each locale gets
 * its own copy.
 *
 * Generated rather than hand-designed so the preview can never drift from the
 * site. Colours mirror the dark theme in globals.css.
 */
const BG = "#16191c";
const FG = "#f4f5f6";
const PRIMARY = "#45bdd8";
const MUTED = "#a2a7ac";
const BORDER = "rgba(255,255,255,0.10)";

const STACK = ["Next.js", "TypeScript", "Postgres", "Kotlin", "Jetpack Compose"];

const COPY = {
  en: {
    availability: "Available for part-time internships & freelance",
    role: "Full-stack web & Android developer",
    student: `Information Systems student · ${profile.city}, Indonesia`,
  },
  id: {
    availability: "Terbuka untuk internship part-time & freelance",
    role: "Developer web full-stack & Android",
    student: `Mahasiswa Sistem Informasi · ${profile.city}, Indonesia`,
  },
} as const;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = locale === "id" ? COPY.id : COPY.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: 72,
          // Echoes the .grid-backdrop utility used across the site.
          backgroundImage: `linear-gradient(to right, ${BORDER} 1px, transparent 1px), linear-gradient(to bottom, ${BORDER} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 99, background: PRIMARY }} />
          <div style={{ fontSize: 26, color: MUTED }}>{copy.availability}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 94,
              fontWeight: 700,
              color: FG,
              letterSpacing: -2.5,
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: 40, color: PRIMARY, marginTop: 18 }}>{copy.role}</div>
          <div style={{ fontSize: 28, color: MUTED, marginTop: 16 }}>{copy.student}</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${BORDER}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {STACK.map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: 23,
                  color: MUTED,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 9,
                  padding: "9px 17px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 23, color: MUTED }}>{profile.githubHandle}</div>
        </div>
      </div>
    ),
    size,
  );
}
