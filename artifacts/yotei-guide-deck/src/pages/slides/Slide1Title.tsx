const base = import.meta.env.BASE_URL;

export default function Slide1Title() {
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
      {/* Full-bleed hero image */}
      <img
        src={`${base}yotei-hero.jpg`}
        alt="Ghost of Yotei wilderness"
        crossOrigin="anonymous"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      {/* Gradient overlay — bottom 55% */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "55vh",
          background: "linear-gradient(to bottom, transparent 0%, rgba(8,8,12,0.96) 100%)",
          zIndex: 2,
        }}
      />

      {/* Left-side vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50vw",
          height: "100vh",
          background: "linear-gradient(to right, rgba(8,8,12,0.4) 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Content — bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "11vh",
          left: "6vw",
          zIndex: 3,
        }}
      >
        {/* Eyebrow */}
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
          <span style={{ textTransform: "uppercase" }}>Developer Overview</span>
          <span style={{ color: "#4A90D9" }}>/</span>
          <span>Expo + React Native</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "#FFFFFF",
            fontSize: "6vw",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "3vh",
            textWrap: "balance",
          }}
        >
          Ghost of Yotei
          <span style={{ display: "block" }}>Guide</span>
        </div>

        {/* Accent line */}
        <div
          style={{
            width: "8vw",
            height: "0.25vh",
            backgroundColor: "#4A90D9",
            marginBottom: "2.5vh",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "#A0A8B4",
            fontSize: "1.8vw",
            fontWeight: 400,
            maxWidth: "44vw",
            lineHeight: 1.45,
          }}
        >
          A native mobile companion app for 100% completion of Ghost of Yotei — built with Expo + React Native.
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "3.5vh",
          left: "6vw",
          zIndex: 3,
          fontFamily: "'DM Mono', monospace",
          color: "#A0A8B4",
          fontSize: "1vw",
          letterSpacing: "0.1em",
        }}
      >
        ghostofyoteiguide.app
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "3.5vh",
          right: "6vw",
          zIndex: 3,
          fontFamily: "'DM Mono', monospace",
          color: "#A0A8B4",
          fontSize: "1vw",
          letterSpacing: "0.2em",
        }}
      >
        v1.0.0
      </div>
    </div>
  );
}
