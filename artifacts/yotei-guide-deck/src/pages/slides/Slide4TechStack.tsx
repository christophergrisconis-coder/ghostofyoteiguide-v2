export default function Slide4TechStack() {
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
      {/* Subtle right-side accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40vw",
          height: "100vh",
          background: "linear-gradient(to left, rgba(74,144,217,0.05) 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

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
          <span style={{ textTransform: "uppercase" }}>Engineering</span>
          <span style={{ color: "#4A90D9" }}>/</span>
          <span>Dependencies</span>
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
          Tech Stack
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
          gap: "6vw",
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
              Runtime
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
              Expo 54.0 / React Native 0.81.5
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.7vw" }}>
              iOS + Android from one codebase
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
              Routing
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
              Expo Router 6 — typed routes
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.7vw" }}>
              File-system routing with TypeScript path safety
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
              Storage
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
              AsyncStorage + expo-file-system
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.7vw" }}>
              Local state + expo-sharing for backup/restore
            </div>
          </div>
        </div>

        {/* Right column */}
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
              Data Management
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
              TanStack Query
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.7vw" }}>
              Async data management and caching
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
              Rendering
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
              React Compiler + Reanimated
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.7vw" }}>
              Compiler-optimized renders, native animations
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: "3.5vh", left: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.1em" }}>ghostofyoteiguide.app</div>
      <div style={{ position: "absolute", bottom: "3.5vh", left: "50%", transform: "translateX(-50%)", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>04</div>
      <div style={{ position: "absolute", bottom: "3.5vh", right: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>v1.0.0</div>
    </div>
  );
}
