import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon on iOS. Generated so it always matches the site's fresh colours. */
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
          background: "#0c0d0e",
          color: "#3b82f6",
          fontSize: 104,
          fontWeight: 700,
          letterSpacing: -4,
          fontFamily: "sans-serif",
        }}
      >
        A
      </div>
    ),
    size,
  );
}
