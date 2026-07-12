export default function Slide6BuildPublish() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#08080C",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ position: "absolute", top: "11vh", left: "6vw", zIndex: 3 }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            color: "#A0A8B4",
            fontSize: "1.2vw",
            letterSpacing: "0.2em",
            marginBottom: "2vh",
            display: "flex",
            alignItems: "center",
            gap: "1.5vw",
          }}
        >
          <span style={{ textTransform: "uppercase" }}>Release</span>
          <span style={{ color: "#4A90D9" }}>/</span>
          <span>EAS Build</span>
        </div>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "#FFFFFF",
            fontSize: "4vw",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "2.5vh",
          }}
        >
          Build &amp; Publish
        </div>
        <div
          style={{
            width: "8vw",
            height: "0.25vh",
            backgroundColor: "#4A90D9",
            marginBottom: "4vh",
          }}
        />
      </div>

      {/* Content — two columns */}
      <div
        style={{
          position: "absolute",
          top: "38vh",
          left: "6vw",
          right: "6vw",
          display: "flex",
          gap: "4vw",
          zIndex: 3,
        }}
      >
        {/* Left column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3.5vh" }}>
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "#4A90D9",
                fontSize: "1.1vw",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.8vh",
              }}
            >
              Bundle ID
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: 600,
                marginBottom: "0.5vh",
              }}
            >
              com.ghostofyoteiguide.app
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.7vw" }}>
              Identical on iOS and Android
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "#4A90D9",
                fontSize: "1.1vw",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.8vh",
              }}
            >
              Version
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: 600,
                marginBottom: "0.5vh",
              }}
            >
              1.0.0 — runtime-sourced
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.7vw" }}>
              Settings reads from expo-constants — no hardcoded strings
            </div>
          </div>
        </div>

        {/* Right column — EAS profiles */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "#4A90D9",
              fontSize: "1.1vw",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "2vh",
            }}
          >
            EAS Build Profiles
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "2vw",
                paddingBottom: "2vh",
                borderBottom: "0.1vh solid #1A1A28",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: "#4A90D9",
                  fontSize: "1.4vw",
                  minWidth: "10vw",
                  paddingTop: "0.2vh",
                }}
              >
                development
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.7vw", lineHeight: 1.4 }}>
                Simulator + internal APK
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "2vw",
                paddingBottom: "2vh",
                borderBottom: "0.1vh solid #1A1A28",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: "#4A90D9",
                  fontSize: "1.4vw",
                  minWidth: "10vw",
                  paddingTop: "0.2vh",
                }}
              >
                preview
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.7vw", lineHeight: 1.4 }}>
                Internal distribution APK
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "2vw",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: "#4A90D9",
                  fontSize: "1.4vw",
                  minWidth: "10vw",
                  paddingTop: "0.2vh",
                }}
              >
                production
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.7vw", lineHeight: 1.4 }}>
                App Store IPA + Play Store AAB
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: "3.5vh", left: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.1em" }}>ghostofyoteiguide.app</div>
      <div style={{ position: "absolute", bottom: "3.5vh", left: "50%", transform: "translateX(-50%)", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>06</div>
      <div style={{ position: "absolute", bottom: "3.5vh", right: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>v1.0.0</div>
    </div>
  );
}
