import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = "Ahmad Hidayatullah, full-stack web and Android developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#141312";
const FG = "#f5f3f0";
const PRIMARY = "#d97706";
const MUTED = "#a8a29e";
const BORDER = "rgba(255,255,255,0.12)";

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
          border: `1px solid ${BORDER}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 99, background: PRIMARY }} />
          <div style={{ fontSize: 24, color: MUTED, fontFamily: "sans-serif" }}>{copy.availability}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 90,
              fontWeight: 700,
              color: FG,
              letterSpacing: -2.5,
              lineHeight: 1.05,
              fontFamily: "sans-serif",
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: 38, color: PRIMARY, marginTop: 18, fontFamily: "sans-serif", fontWeight: 600 }}>{copy.role}</div>
          <div style={{ fontSize: 26, color: MUTED, marginTop: 14, fontFamily: "sans-serif" }}>{copy.student}</div>
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
                  fontSize: 20,
                  color: MUTED,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontFamily: "monospace",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 22, color: MUTED, fontFamily: "monospace" }}>{profile.githubHandle}</div>
        </div>
      </div>
    ),
    size,
  );
}
