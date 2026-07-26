import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon on iOS. Generated so it always matches the site's colours. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16191c",
          color: "#45bdd8",
          fontSize: 104,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        A
      </div>
    ),
    size,
  );
}
