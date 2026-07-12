export default function Slide2WhatItDoes() {
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
      {/* Subtle background accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "35vw",
          height: "100vh",
          background: "linear-gradient(to left, rgba(74,144,217,0.04) 0%, transparent 100%)",
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
          <span style={{ textTransform: "uppercase" }}>App Overview</span>
          <span style={{ color: "#4A90D9" }}>/</span>
          <span>Navigation</span>
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
          What It Does
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
          gap: "5vw",
          zIndex: 3,
        }}
      >
        {/* Left column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4vh" }}>
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: 700,
                marginBottom: "1.2vh",
              }}
            >
              Completion Tracking
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#A0A8B4",
                fontSize: "1.8vw",
                lineHeight: 1.5,
              }}
            >
              Tracks completion across every content category in the game with per-item toggles persisted locally via AsyncStorage.
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: 700,
                marginBottom: "1.2vh",
              }}
            >
              Five Content Tabs
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#A0A8B4",
                fontSize: "1.8vw",
                lineHeight: 1.5,
              }}
            >
              Quests, Collectibles, Trophies, Progress, Settings — each tab owns a focused content category.
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4vh" }}>
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: 700,
                marginBottom: "1.2vh",
              }}
            >
              Live Dashboard
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#A0A8B4",
                fontSize: "1.8vw",
                lineHeight: 1.5,
              }}
            >
              Dashboard shows live % completion across all categories, updated instantly as items are checked off.
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: 700,
                marginBottom: "1.2vh",
              }}
            >
              Persistent State
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#A0A8B4",
                fontSize: "1.8vw",
                lineHeight: 1.5,
              }}
            >
              Per-item toggle persists locally via AsyncStorage — progress survives app restarts without a backend.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: "3.5vh", left: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.1em" }}>ghostofyoteiguide.app</div>
      <div style={{ position: "absolute", bottom: "3.5vh", left: "50%", transform: "translateX(-50%)", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>02</div>
      <div style={{ position: "absolute", bottom: "3.5vh", right: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>v1.0.0</div>
    </div>
  );
}
