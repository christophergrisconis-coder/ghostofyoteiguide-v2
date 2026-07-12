export default function Slide3DataCoverage() {
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
          <span style={{ textTransform: "uppercase" }}>Game Data</span>
          <span style={{ color: "#4A90D9" }}>/</span>
          <span>Real In-Game Content</span>
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
          Data Coverage
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

      {/* Stat row */}
      <div
        style={{
          position: "absolute",
          top: "39vh",
          left: "6vw",
          right: "6vw",
          display: "flex",
          gap: "2vw",
          zIndex: 3,
        }}
      >
        {/* Stat 1 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#0F0F18",
            borderLeft: "0.35vw solid #4A90D9",
            padding: "3vh 2vw",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#4A90D9",
              fontSize: "5.5vw",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "1.2vh",
            }}
          >
            119
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "#FFFFFF",
              fontSize: "1.3vw",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1vh",
            }}
          >
            Quests
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#A0A8B4",
              fontSize: "1.5vw",
              lineHeight: 1.4,
            }}
          >
            10 Main Story, Bounties, Mythic Tales, Side Tales
          </div>
        </div>

        {/* Stat 2 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#0F0F18",
            borderLeft: "0.35vw solid #4A90D9",
            padding: "3vh 2vw",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#4A90D9",
              fontSize: "5.5vw",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "1.2vh",
            }}
          >
            319
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "#FFFFFF",
              fontSize: "1.3vw",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1vh",
            }}
          >
            Collectibles
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#A0A8B4",
              fontSize: "1.5vw",
              lineHeight: 1.4,
            }}
          >
            Bamboo Strikes, Shrine Climbs, Hot Springs, Puzzle Boxes, and more
          </div>
        </div>

        {/* Stat 3 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#0F0F18",
            borderLeft: "0.35vw solid #4A90D9",
            padding: "3vh 2vw",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#4A90D9",
              fontSize: "5.5vw",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "1.2vh",
            }}
          >
            54
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "#FFFFFF",
              fontSize: "1.3vw",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1vh",
            }}
          >
            Trophies
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#A0A8B4",
              fontSize: "1.5vw",
              lineHeight: 1.4,
            }}
          >
            Bronze through Platinum — full PSN trophy set
          </div>
        </div>

        {/* Stat 4 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#0F0F18",
            borderLeft: "0.35vw solid #4A90D9",
            padding: "3vh 2vw",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#4A90D9",
              fontSize: "5.5vw",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "1.2vh",
            }}
          >
            6
          </div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "#FFFFFF",
              fontSize: "1.3vw",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1vh",
            }}
          >
            Regions
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#A0A8B4",
              fontSize: "1.5vw",
              lineHeight: 1.4,
            }}
          >
            Yotei Grasslands, Ishikari Plain, Tokachi Range, Nayoro Wilds, and more
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: "3.5vh", left: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.1em" }}>ghostofyoteiguide.app</div>
      <div style={{ position: "absolute", bottom: "3.5vh", left: "50%", transform: "translateX(-50%)", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>03</div>
      <div style={{ position: "absolute", bottom: "3.5vh", right: "6vw", zIndex: 3, fontFamily: "'DM Mono', monospace", color: "#A0A8B4", fontSize: "1vw", letterSpacing: "0.2em" }}>v1.0.0</div>
    </div>
  );
}
