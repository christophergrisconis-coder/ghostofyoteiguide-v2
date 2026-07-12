export default function Slide5KeyFeatures() {
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
          <span style={{ textTransform: "uppercase" }}>Product</span>
          <span style={{ color: "#4A90D9" }}>/</span>
          <span>Capabilities</span>
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
          Key Features
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

      {/* 2x2 grid */}
      <div
        style={{
          position: "absolute",
          top: "38vh",
          left: "6vw",
          right: "6vw",
          display: "flex",
          gap: "3vw",
          zIndex: 3,
        }}
      >
        {/* Left column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3.5vh" }}>
          <div
            style={{
              backgroundColor: "#0F0F18",
              borderTop: "0.25vh solid #4A90D9",
              padding: "2.5vh 2.2vw",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: 700,
                marginBottom: "1.2vh",
              }}
            >
              Composable Filters
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#A0A8B4",
                fontSize: "1.7vw",
                lineHeight: 1.5,
              }}
            >
              Region, status, and keyword filters compose on every list screen — any combination, any order.
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#0F0F18",
              borderTop: "0.25vh solid #4A90D9",
              padding: "2.5vh 2.2vw",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: 700,
                marginBottom: "1.2vh",
              }}
            >
              Auto-Backup
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#A0A8B4",
                fontSize: "1.7vw",
                lineHeight: 1.5,
              }}
            >
              Backs up to iCloud / Google Drive automatically. Restore prompt on reinstall recovers all progress.
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3.5vh" }}>
          <div
            style={{
              backgroundColor: "#0F0F18",
              borderTop: "0.25vh solid #4A90D9",
              padding: "2.5vh 2.2vw",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: 700,
                marginBottom: "1.2vh",
              }}
            >
              Issue Reporting
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#A0A8B4",
                fontSize: "1.7vw",
                lineHeight: 1.5,
              }}
            >
              In-app reporting with offline queue — reports survive network loss and app restarts, then flush on reconnect.
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#0F0F18",
              borderTop: "0.25vh solid #4A90D9",
              padding: "2.5vh 2.2vw",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: 700,
                marginBottom: "1.2vh",
              }}
            >
              Queue Cap
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#A0A8B4",
                fontSize: "1.7vw",
                lineHeight: 1.5,
              }}
            >
              EAS queue cap prevents unbounded growth when the server is permanently unreachable.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: "3.5vh", left: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.1em" }}>ghostofyoteiguide.app</div>
      <div style={{ position: "absolute", bottom: "3.5vh", left: "50%", transform: "translateX(-50%)", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>05</div>
      <div style={{ position: "absolute", bottom: "3.5vh", right: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>v1.0.0</div>
    </div>
  );
}
