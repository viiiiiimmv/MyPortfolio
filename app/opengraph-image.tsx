import { ImageResponse } from "next/og";

export const alt =
  "Shiv Chauhan — Senior Backend & Distributed Systems Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          padding: "64px 72px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Subtle grid accent background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.08) 2%, transparent 0%)",
            backgroundSize: "50px 50px",
            opacity: 0.6,
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#6ee7b7",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#a3a3a3",
              }}
            >
              PORTFOLIO ARCHITECTURE
            </span>
          </div>

          <span
            style={{
              fontSize: "15px",
              fontFamily: "monospace",
              letterSpacing: "0.28em",
              color: "#737373",
            }}
          >
            VIII · III · MMV
          </span>
        </div>

        {/* Center Main Identity Block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              textTransform: "uppercase",
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            SHIV CHAUHAN
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#d4d4d4",
              letterSpacing: "-0.01em",
              marginBottom: "24px",
            }}
          >
            Senior Backend & Distributed Systems Engineer
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {["Java 21", "Spring Boot 3", "Apache Kafka", "PostgreSQL", "Kubernetes", "System Design"].map((skill) => (
              <div
                key={skill}
                style={{
                  fontSize: "14px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#d4d4d4",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "6px 16px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Metadata Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
            fontSize: "14px",
            fontFamily: "monospace",
            letterSpacing: "0.16em",
            color: "#a3a3a3",
          }}
        >
          <span>shivchauhan.vercel.app</span>
          <span>github.com/viiiiiimmv</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

