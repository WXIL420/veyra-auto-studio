import { ImageResponse } from "next/og";

export const alt = "Veyra Auto Studio — Precision in every reflection.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0D0F10",
        color: "#F3F1EB",
        padding: 72,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <svg width="84" height="84" viewBox="0 0 48 48">
          <path d="M3 6h12l9 25 9-25h12L28 43h-8z" fill="#F3F1EB" />
          <path d="M12.5 15.5 24 20l11.5-4.5" fill="none" stroke="#C87343" strokeWidth="2.2" />
          <path d="M17 24.5 24 27l7-2.5" fill="none" stroke="#0D0F10" strokeWidth="1.6" />
        </svg>
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 10, color: "#A8ADB0" }}>VEYRA AUTO STUDIO</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 108, fontWeight: 700, lineHeight: 1, textTransform: "uppercase" }}>
          Precision in every reflection.
        </div>
        <div style={{ display: "flex", marginTop: 32, width: 140, height: 4, background: "#C87343" }} />
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#A8ADB0" }}>
        Premium mobile detailing · Scottsdale &amp; Phoenix · Fictional portfolio demonstration
      </div>
    </div>,
    size,
  );
}
