import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Usmonjon Abduroziqov — Cloud & DevSecOps Engineer";

const rows = [
  ["22/tcp", "ssh", "Linux"],
  ["443/tcp", "https", "Security"],
  ["2376/tcp", "docker", "Containers"],
  ["8080/tcp", "ci", "CI/CD"],
];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e1b2b",
          color: "#dce6f0",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>Usmonjon</div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, color: "#8a9db3" }}>
            Abduroziqov
          </div>
          <div style={{ marginTop: 28, fontSize: 34 }}>Cloud & DevSecOps Engineer</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 24, fontFamily: "monospace", gap: 6 }}>
          {rows.map(([port, svc, area]) => (
            <div key={port} style={{ display: "flex", gap: 28 }}>
              <span style={{ width: 150 }}>{port}</span>
              <span style={{ width: 80, color: "#f3b23c" }}>open</span>
              <span style={{ width: 110, color: "#8a9db3" }}>{svc}</span>
              <span>{area}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", top: 0, right: 0, width: 36, height: 36, background: "#f3b23c" }} />
      </div>
    ),
    size,
  );
}
