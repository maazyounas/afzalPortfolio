import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #f7f1e8 0%, #dcefe9 45%, #0f766e 100%)",
          color: "#11211f",
          padding: "72px",
          fontFamily: "sans-serif",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          Softech Financials
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            Smarter finance systems for growing companies.
          </div>
          <div style={{ fontSize: 28, maxWidth: 900, color: "#284542" }}>
            CFO advisory, tax planning, audit readiness, and reporting
            operations built for clarity.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
