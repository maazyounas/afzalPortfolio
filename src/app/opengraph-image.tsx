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
          width: "100%",
          height: "100%",
          position: "relative",
          background:
            "linear-gradient(135deg, #f7f1e8 0%, #dcefe9 40%, #0f766e 100%)",
          fontFamily: "sans-serif",
          padding: "80px",
          color: "#0f1724",
          overflow: "hidden",
        }}
      >
        {/* Soft decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "300px",
            height: "300px",
            background: "rgba(20,184,166,0.25)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-140px",
            left: "-140px",
            width: "340px",
            height: "340px",
            background: "rgba(15,118,110,0.25)",
            borderRadius: "50%",
            filter: "blur(90px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 2,
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "22px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#0f1724",
            }}
          >
            {/* Logo box */}
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#0f766e",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: "24px",
              }}
            >
              SF
            </div>
            Softech Financials
          </div>

          {/* Main text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                fontSize: "68px",
                fontWeight: 800,
                lineHeight: 1.1,
                maxWidth: "1000px",
              }}
            >
              Smarter finance systems for growing companies.
            </div>

            <div
              style={{
                fontSize: "28px",
                maxWidth: "900px",
                color: "#134e4a",
                lineHeight: 1.4,
              }}
            >
              CFO advisory, tax planning, audit readiness, and reporting
              operations built for clarity and control.
            </div>
          </div>

          {/* Footer badge */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                padding: "10px 16px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.6)",
                fontSize: "18px",
                color: "#0f1724",
                border: "1px solid rgba(15,118,110,0.2)",
              }}
            >
              Strategy • Compliance • Reporting
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
