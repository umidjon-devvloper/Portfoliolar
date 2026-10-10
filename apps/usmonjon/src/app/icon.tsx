import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#13253a",
          color: "#dce6f0",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1,
          position: "relative",
        }}
      >
        UA
        <div style={{ position: "absolute", top: 0, right: 0, width: 14, height: 14, background: "#f3b23c" }} />
      </div>
    ),
    size,
  );
}
