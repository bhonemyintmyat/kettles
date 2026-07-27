import { ImageResponse } from "next/og";

export const alt = "Kettles Online Presence Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 82px",
          color: "white",
          background:
            "radial-gradient(circle at 80% 18%, rgba(255,83,3,.38), transparent 32%), linear-gradient(135deg, #050505 0%, #111 56%, #030303 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              background: "#ff5303",
              fontSize: 43,
              fontWeight: 800,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 38, fontWeight: 750, letterSpacing: "-1px" }}>Kettles</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 74,
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: "-4px",
            }}
          >
            <span>Clear digital work,</span>
            <span>built for real business.</span>
          </div>
          <div style={{ marginTop: 28, color: "rgba(255,255,255,.68)", fontSize: 27 }}>
            Websites · Content systems · Localization · B2B tools
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "rgba(255,255,255,.55)",
          }}
        >
          <span>Online Presence Studio</span>
          <span>kettles.studio</span>
        </div>
      </div>
    ),
    size,
  );
}
