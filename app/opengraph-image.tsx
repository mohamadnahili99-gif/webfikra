import { ImageResponse } from "next/og";

export const alt = "WEBFIKRA — Restaurant Digital Experiences";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundColor: "#15110e",
          backgroundImage: "radial-gradient(circle at 95% 20%, #53301e, #15110e 62%)",
          color: "#fff9f1",
          padding: "76px 88px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ fontSize: 58, fontWeight: 900, letterSpacing: -3 }}>
            WEB
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, letterSpacing: -3, color: "#f0a66e" }}>
            FIKRA.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 940 }}>
          <div style={{ fontSize: 26, letterSpacing: 5, color: "#dfaa83", fontWeight: 700 }}>
            DIGITAL EXPERIENCES FOR FOOD BRANDS
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 66, letterSpacing: -2, lineHeight: 1.12, fontWeight: 900 }}>
            <span>More than a website.</span>
            <span style={{ color: "#f0a66e" }}>An experience worth remembering.</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #674533", paddingTop: 24, color: "#cfb19d", fontSize: 22 }}>
          <span>WEBSITES  ·  DIGITAL MENUS  ·  ORDERING</span>
          <span>WEBFIKRA</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
