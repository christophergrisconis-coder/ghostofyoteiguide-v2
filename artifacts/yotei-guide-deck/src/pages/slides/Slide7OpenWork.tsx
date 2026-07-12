const base = import.meta.env.BASE_URL;

export default function Slide7OpenWork() {
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
      {/* Faint hero image background */}
      <img
        src={`${base}yotei-hero.jpg`}
        alt=""
        crossOrigin="anonymous"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 1,
          opacity: 0.12,
        }}
      />

      {/* Radial vignette overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(8,8,12,0.85) 70%)",
          zIndex: 2,
        }}
      />

      {/* Content — centered */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          textAlign: "center",
          width: "72vw",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            color: "#4A90D9",
            fontSize: "1.2vw",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "2.5vh",
          }}
        >
          What's Next
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "#FFFFFF",
            fontSize: "5vw",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            marginBottom: "3vh",
          }}
        >
          Open Work
        </div>

        <div
          style={{
            width: "6vw",
            height: "0.25vh",
            backgroundColor: "#4A90D9",
            margin: "0 auto 4vh auto",
          }}
        />

        {/* Items */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.8vh",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2vw",
              backgroundColor: "rgba(15,15,24,0.7)",
              padding: "1.5vh 2.5vw",
            }}
          >
            <div style={{ width: "0.4vw", height: "2.5vh", backgroundColor: "#4A90D9", flexShrink: 0 }} />
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.8vw", textAlign: "left" }}>
              Fill in 9 unconfirmed Nayoro Wilds bounty names
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2vw",
              backgroundColor: "rgba(15,15,24,0.7)",
              padding: "1.5vh 2.5vw",
            }}
          >
            <div style={{ width: "0.4vw", height: "2.5vh", backgroundColor: "#4A90D9", flexShrink: 0 }} />
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.8vw", textAlign: "left" }}>
              Show collectible location hints inline
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2vw",
              backgroundColor: "rgba(15,15,24,0.7)",
              padding: "1.5vh 2.5vw",
            }}
          >
            <div style={{ width: "0.4vw", height: "2.5vh", backgroundColor: "#4A90D9", flexShrink: 0 }} />
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.8vw", textAlign: "left" }}>
              Filter collectibles by completion status
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2vw",
              backgroundColor: "rgba(15,15,24,0.7)",
              padding: "1.5vh 2.5vw",
            }}
          >
            <div style={{ width: "0.4vw", height: "2.5vh", backgroundColor: "#4A90D9", flexShrink: 0 }} />
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.8vw", textAlign: "left" }}>
              Cross-category search across all quest types
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2vw",
              backgroundColor: "rgba(15,15,24,0.7)",
              padding: "1.5vh 2.5vw",
            }}
          >
            <div style={{ width: "0.4vw", height: "2.5vh", backgroundColor: "#4A90D9", flexShrink: 0 }} />
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#A0A8B4", fontSize: "1.8vw", textAlign: "left" }}>
              Cross-device progress sync
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: "3.5vh", left: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.1em" }}>ghostofyoteiguide.app</div>
      <div style={{ position: "absolute", bottom: "3.5vh", left: "50%", transform: "translateX(-50%)", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>07</div>
      <div style={{ position: "absolute", bottom: "3.5vh", right: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>v1.0.0</div>
    </div>
  );
}
