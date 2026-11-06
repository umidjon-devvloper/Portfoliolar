import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

/* Open Graph image contract — every OG image in the app uses this. */
export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png" as const;

type OgParams = {
  title: string;
  eyebrow?: string;
  description?: string;
};

/**
 * Brand-matching OG template. Dark surface + gold accent, matching the
 * app's dark theme (where most previews render on social cards).
 */
export function renderOgImage({ title, eyebrow, description }: OgParams) {
  const fullName = profile.fullName ?? profile.firstName;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(1200px 630px at 85% 15%, #1c1811 0%, #0d0d0d 55%, #060606 100%)",
          color: "#f5f5f4",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header: brand + eyebrow */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#c9a56a",
                color: "#0d0d0d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              U
            </div>
            <span style={{ fontSize: 22, color: "#e7e5e4", letterSpacing: -0.2 }}>
              {site.domain}
            </span>
          </div>
          {eyebrow ? (
            <span
              style={{
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "#c9a56a",
                padding: "10px 18px",
                border: "1px solid #c9a56a66",
                borderRadius: 999,
              }}
            >
              {eyebrow}
            </span>
          ) : null}
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1000 }}>
          <div
            style={{
              fontSize: title.length > 48 ? 64 : 80,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#f5f5f4",
              display: "flex",
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: "#a8a8b3",
                display: "flex",
                maxWidth: 950,
              }}
            >
              {description}
            </div>
          ) : null}
        </div>

        {/* Footer: byline + accent line */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ height: 3, width: 140, background: "#c9a56a", borderRadius: 2 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#f5f5f4" }}>
                {fullName}
              </span>
              <span style={{ fontSize: 20, color: "#a8a8b3" }}>{profile.role}</span>
            </div>
            <span style={{ fontSize: 18, color: "#71717a" }}>
              {profile.location?.city}, {profile.location?.country}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
