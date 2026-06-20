export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
          background: "#fff",
          color: "#111",
        }}
      >
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", marginBottom: "1rem" }}>
          404
        </p>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Page Not Found
        </h1>
        <p style={{ color: "#555", marginBottom: "2rem" }}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <a
          href="/en"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.5rem 1.5rem",
            background: "#111",
            color: "#fff",
            borderRadius: "0.5rem",
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
        >
          Go Home
        </a>
      </body>
    </html>
  );
}
