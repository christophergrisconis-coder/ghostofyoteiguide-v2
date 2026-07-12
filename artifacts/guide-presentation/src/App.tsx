import { useState, useEffect, useCallback, useRef } from 'react';

// ── Palette ──────────────────────────────────────────────────────────────────
const GOLD   = '#C9A84C';
const GOLD20 = 'rgba(201,168,76,0.20)';
const GOLD40 = 'rgba(201,168,76,0.40)';
const DARK   = '#0a0a0f';
const WHITE  = '#f0ede8';
const DIM    = 'rgba(240,237,232,0.65)';
const CARD   = 'rgba(10,10,20,0.72)';

// ── Verified image pool ───────────────────────────────────────────────────────
const IMGS = {
  ps1:  'https://image.api.playstation.com/vulcan/ap/rnd/202504/2116/53c76276602fca520ddf3269e1ff9f34aca0ac39ce46e4cb.jpg?w=1920',
  ps2:  'https://image.api.playstation.com/vulcan/ap/rnd/202504/2116/49934c62a922417e86bd3fc61a59b116cf7ae51e91d9a9de.jpg?w=1920',
  blog1:'https://blog.playstation.com/tachyon/2025/04/7908a4aca1e3d54a7853d2a81ea60675cf9b410a-scaled.jpg',
  blog2:'https://blog.playstation.com/tachyon/2026/07/c6797d9f407410a92adb25c652f66ef7a89f0f00.jpg',
  blog3:'https://blog.playstation.com/tachyon/2026/07/12f747e70ddd3d05eda2e203333e22153d970e89.jpg',
  blog4:'https://blog.playstation.com/tachyon/2026/07/6f36a9dd878b241b249dfba5214d6f7311ef32f3.jpg',
  blog5:'https://blog.playstation.com/tachyon/2026/07/be126041528c8a338b5166c9da2db6788bc3a854.jpg',
  blog6:'https://blog.playstation.com/tachyon/2026/07/bf80fcf2b0c9b0f938ea3b25cf12f33219bbce7c.jpg',
  mob1: 'https://cdn.mobygames.com/88461226-39fe-11f1-b3ba-02420a0001ca.webp',
  mob2: 'https://cdn.mobygames.com/97c4580c-39fe-11f1-8dc6-02420a0001ce.webp',
  mob3: 'https://cdn.mobygames.com/a59e4a0a-39fe-11f1-8faf-02420a0001c6.webp',
  mob4: 'https://cdn.mobygames.com/c02425b6-39fe-11f1-8dc6-02420a0001ce.webp',
  mob5: 'https://cdn.mobygames.com/e5d0c3fa-39fe-11f1-b3ba-02420a0001ca.webp',
  mob6: 'https://cdn.mobygames.com/1fa3139e-39ff-11f1-b8da-02420a0001ca.webp',
  mob7: 'https://cdn.mobygames.com/40170680-39ff-11f1-813b-02420a0001c6.webp',
  mob8: 'https://cdn.mobygames.com/41150bea-39ff-11f1-b84e-02420a0001ca.webp',
};

// ── Helper components ─────────────────────────────────────────────────────────
function BgSlide({ img, children, overlay = 'rgba(5,5,15,0.68)' }: { img: string; children: React.ReactNode; overlay?: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transform: 'scale(1.03)',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

function GoldLine() {
  return (
    <div style={{
      height: '2px', background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
      margin: '16px auto', width: '80%', animation: 'inkReveal 0.9s ease 0.4s both', transformOrigin: 'left center',
    }} />
  );
}

function Tag({ label, color = GOLD20, textColor = GOLD }: { label: string; color?: string; textColor?: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: 20,
      background: color, color: textColor,
      fontSize: 10, fontFamily: 'sans-serif', fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>{label}</span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 36px)',
      fontWeight: 400, color: WHITE, letterSpacing: '0.04em',
      textShadow: '0 2px 20px rgba(0,0,0,0.8)',
    }}>{children}</h2>
  );
}

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: CARD, backdropFilter: 'blur(12px)',
      border: `1px solid ${GOLD40}`, borderRadius: 12, padding: '20px 24px',
      ...style,
    }}>{children}</div>
  );
}

function MiniBar({ pct, color = GOLD }: { pct: number; color?: string }) {
  return (
    <div className="mini-bar-bg" style={{ marginTop: 8 }}>
      <div className="mini-bar-fg" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function TierDots({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`tier-dot ${i < filled ? 'filled' : 'empty'}`} />
      ))}
    </span>
  );
}

// ── Slide 1 — Title ───────────────────────────────────────────────────────────
function Slide1() {
  return (
    <BgSlide img={IMGS.ps1} overlay="rgba(4,4,12,0.72)">
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100%', textAlign: 'center', padding: '40px 24px',
      }}>
        <div style={{ animation: 'fadeUp 0.7s ease 0.1s both' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', marginBottom: 24 }}>
            ■ COMPLETE GUIDE ■
          </p>
        </div>
        <div style={{ animation: 'fadeUp 0.7s ease 0.25s both' }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(36px, 7vw, 80px)',
            fontWeight: 400, color: WHITE, letterSpacing: '0.06em',
            lineHeight: 1.1,
            textShadow: '0 4px 40px rgba(0,0,0,0.9)',
          }}>
            Ghost of Yōtei
          </h1>
        </div>
        <GoldLine />
        <div style={{ animation: 'fadeUp 0.7s ease 0.45s both' }}>
          <p style={{
            fontFamily: 'sans-serif', fontSize: 'clamp(13px, 2vw, 20px)',
            letterSpacing: '0.18em', color: 'rgba(240,237,232,0.80)',
            textTransform: 'uppercase', marginBottom: 32,
          }}>
            100% Completion Guide
          </p>
        </div>
        <div style={{ animation: 'fadeUp 0.7s ease 0.6s both' }}>
          <p style={{
            fontSize: 'clamp(26px, 5vw, 52px)', color: 'rgba(255,255,255,0.12)',
            letterSpacing: '0.3em', fontFamily: 'Georgia, serif', marginBottom: 40,
          }}>幽霊</p>
        </div>
        <div style={{ animation: 'fadeUp 0.7s ease 0.8s both' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            color: 'rgba(240,237,232,0.45)', fontFamily: 'sans-serif', fontSize: 12,
            letterSpacing: '0.1em',
          }}>
            <span>119 Quests</span>
            <span style={{ color: GOLD40 }}>•</span>
            <span>319 Collectibles</span>
            <span style={{ color: GOLD40 }}>•</span>
            <span>54 Trophies</span>
            <span style={{ color: GOLD40 }}>•</span>
            <span>6 Regions</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 56, animation: 'fadeUp 0.7s ease 1.1s both' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: 'rgba(240,237,232,0.35)', letterSpacing: '0.12em' }}>
            Press → to begin &nbsp;&nbsp;|&nbsp;&nbsp; Click arrows to navigate
          </p>
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide 2 — How to Use ─────────────────────────────────────────────────────
function Slide2() {
  const cols = [
    {
      icon: '📖', title: 'Guide Structure',
      items: ['Main Story Quests (10)', 'Side Tales (48)', 'Mythic Tales (7)', 'Sensei Tales (20)', 'Bounty Quests (31)', 'Post-Story (3)', 'Collectibles (319)', 'Trophies (54)'],
    },
    {
      icon: '🗺️', title: 'How to Read Each Quest',
      items: ['Category chip + Region tag', 'Prerequisites clearly listed', 'Step-by-step walkthrough', 'Boss phase breakdowns', 'Missable warnings in red', 'Rewards & time estimate', 'Tips highlighted in amber', 'Follow-up quest noted'],
    },
    {
      icon: '🏆', title: 'Recommended Order',
      items: ['1. Follow main story fully', '2. Clear regional side quests', '3. Collect region-by-region', '4. Finish all mythic tales', '5. Complete trophy cleanup', '6. Platinum unlocks at 100%'],
    },
  ];
  return (
    <BgSlide img={IMGS.blog1} overlay="rgba(6,6,18,0.78)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '48px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Guide Overview" />
          <SectionTitle><span style={{ color: GOLD }}>How to Use</span> This Guide</SectionTitle>
          <GoldLine />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {cols.map(col => (
            <Card key={col.title} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{col.icon}</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: GOLD, marginBottom: 14, letterSpacing: '0.03em' }}>{col.title}</h3>
              <div style={{ flex: 1 }}>
                {col.items.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8,
                    fontFamily: 'sans-serif', fontSize: 13, color: DIM, lineHeight: 1.4,
                  }}>
                    <span style={{ color: GOLD, fontSize: 8, marginTop: 5, flexShrink: 0 }}>◆</span>
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: 20, animation: 'fadeUp 0.6s ease 0.4s both' }}>
          <Card style={{ background: 'rgba(201,168,76,0.08)', borderColor: GOLD40, padding: '12px 20px' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: 'rgba(240,237,232,0.75)', lineHeight: 1.5 }}>
              <span style={{ color: GOLD, fontWeight: 700 }}>Zero missables.</span>&nbsp; Every quest, collectible, and trophy in Ghost of Yōtei is accessible via free-roam after the story credits roll. This guide is structured for a clean single playthrough with optional cleanup afterward.
            </p>
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide 3 — Main Story ──────────────────────────────────────────────────────
function Slide3() {
  const quests = [
    { id: 'ms_01', title: 'The Snake',          act: 'Prologue',   region: 'Yotei Grasslands', time: '20 min', boss: true },
    { id: 'ms_04', title: 'Belly of the Beast', act: 'Chapter 1',  region: 'Ishikari Plain',   time: '50 min', boss: false },
    { id: 'ms_05', title: 'A Mad Pursuit',      act: 'Chapter 1',  region: 'Ishikari Plain',   time: '35 min', boss: false },
    { id: 'ms_02', title: 'Shogun of the North',act: 'Chapter 1',  region: 'Tokachi Range',    time: '40 min', boss: false },
    { id: 'ms_06', title: 'The Yotei Six',      act: 'Chapter 1',  region: 'Yotei Grasslands', time: '40 min', boss: false },
    { id: 'ms_03', title: 'The Oni',            act: 'Chapter 1',  region: 'Yotei Grasslands', time: '45 min', boss: true  },
    { id: 'ms_07', title: 'The Kitsune',        act: 'Chapter 1',  region: 'Yotei Grasslands', time: '55 min', boss: true  },
    { id: 'ms_08', title: 'The Saito Brothers', act: 'Chapter 2',  region: 'Tokachi Range',    time: '65 min', boss: true  },
    { id: 'ms_09', title: 'Ryuhei the Enforcer',act: 'Chapter 2',  region: 'Nayoro Wilds',     time: '60 min', boss: true  },
    { id: 'ms_10', title: 'The Dragon',         act: 'Chapter 3',  region: 'Teshio Ridge',     time: '75 min', boss: true  },
  ];
  const actColors: Record<string, string> = {
    'Prologue':  '#6B7280',
    'Chapter 1': '#4A9B8E',
    'Chapter 2': '#8B5CF6',
    'Chapter 3': '#8B1A1A',
  };
  const expanded = quests[0];
  return (
    <BgSlide img={IMGS.mob1} overlay="rgba(4,6,18,0.80)">
      <div style={{ display: 'flex', height: '100%', padding: '40px 48px 80px', gap: 24 }}>
        {/* Left: Quest list */}
        <div style={{ flex: '0 0 52%', animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Main Story" color="rgba(201,168,76,0.15)" />
          <SectionTitle>Main Story Quests</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '10px 0 14px' }}>
            <div style={{ flex: 1 }}><MiniBar pct={0} /></div>
            <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: GOLD, whiteSpace: 'nowrap' }}>0 / 10</span>
          </div>
          <div className="slide-scroll">
            {quests.map((q, i) => (
              <div key={q.id} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                borderRadius: 8, marginBottom: 5,
                background: i === 0 ? 'rgba(201,168,76,0.10)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${i === 0 ? GOLD40 : 'rgba(255,255,255,0.06)'}`,
              }}>
                <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', width: 18 }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{
                  fontSize: 9, fontFamily: 'sans-serif', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.04em', padding: '2px 6px', borderRadius: 4,
                  background: `${actColors[q.act]}30`, color: actColors[q.act], whiteSpace: 'nowrap',
                }}>{q.act}</span>
                <span style={{ flex: 1, fontFamily: 'sans-serif', fontSize: 13, color: WHITE }}>{q.title}</span>
                {q.boss && <span style={{ fontSize: 11 }}>💀</span>}
                <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(240,237,232,0.4)' }}>{q.time}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Expanded example */}
        <div style={{ flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <Tag label="Example" />
              <Tag label="Boss Fight" color="rgba(139,26,26,0.3)" textColor="#ef4444" />
            </div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: WHITE, marginBottom: 4 }}>{expanded.title}</h3>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM }}>📍 {expanded.region}</span>
              <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM }}>⏱ {expanded.time}</span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.55, marginBottom: 14 }}>
                The opening sequence establishes Atsu's motivation. The Yotei Six attack her family and leave her for dead. This largely cinematic prologue includes a parry-focused boss duel, village sequences, and a homestead memory chain.
              </p>
              {[
                'Witness the Yotei Six attack at Kasabe village',
                'Defend through the burning village streets',
                'Infiltrate and clear the house — two waves',
                'Duel The Snake — Phase 1 (parry tutorial)',
                'Continue into Phase 2 — dodge the unparryable lunge',
                'Scout the destination with the Spyglass',
                'Follow Jubei through the homestead memory sequence',
                'Complete the shamisen & forge mini-tutorials',
              ].map((step, i) => (
                <div key={i} className="check-row">
                  <div className="check-box" />
                  <span className="check-text">{step}</span>
                </div>
              ))}
              <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 8, background: 'rgba(201,168,76,0.08)', border: `1px solid ${GOLD40}` }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, marginBottom: 4, fontWeight: 700 }}>💡 Boss Tip</p>
                <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>Phase 2 adds an unparryable lunge — his lead foot stamps audibly before the charge. Dodge left or right, never backward.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide 4 — Side Tales ──────────────────────────────────────────────────────
function Slide4() {
  const tales = [
    { title: 'The Farmer and the Fox',   region: 'Yotei Grasslands', time: '15 min' },
    { title: "The Widow's Lantern",      region: 'Ishikari Plain',   time: '20 min' },
    { title: 'Silk and Ash',             region: 'Teshio Ridge',     time: '25 min' },
    { title: 'The Last Woodcutter',      region: 'Nayoro Wilds',     time: '18 min' },
    { title: 'Red Banners Rising',       region: 'Oshima Coast',     time: '30 min' },
    { title: 'The Potter of Mori Cove',  region: 'Oshima Coast',     time: '22 min' },
    { title: 'A Promise of Salt',        region: 'Tokachi Range',    time: '20 min' },
    { title: 'Three Cups of Grief',      region: 'Yotei Grasslands', time: '15 min' },
    { title: 'The Healer of Hokkaido',   region: 'Ishikari Plain',   time: '35 min' },
    { title: 'Children of the Ash Road', region: 'Teshio Ridge',     time: '28 min' },
    { title: 'Ink and Embers',           region: 'Nayoro Wilds',     time: '20 min' },
    { title: 'The Hidden Carpenter',     region: 'Tokachi Range',    time: '18 min' },
  ];
  const regionColors: Record<string, string> = {
    'Yotei Grasslands': '#4A9B8E',
    'Ishikari Plain': '#4682B4',
    'Teshio Ridge': '#7B68EE',
    'Nayoro Wilds': '#4A9B6F',
    'Oshima Coast': '#4A7A9B',
    'Tokachi Range': '#B8860B',
  };
  return (
    <BgSlide img={IMGS.mob2} overlay="rgba(4,8,20,0.80)">
      <div style={{ display: 'flex', height: '100%', padding: '40px 48px 80px', gap: 24 }}>
        <div style={{ flex: '0 0 52%', animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Side Tales · 48 Quests" color="rgba(74,155,142,0.2)" textColor="#4A9B8E" />
          <SectionTitle>Side Tales</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '10px 0 14px' }}>
            <div style={{ flex: 1 }}><MiniBar pct={0} color="#4A9B8E" /></div>
            <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#4A9B8E', whiteSpace: 'nowrap' }}>0 / 48</span>
          </div>
          <div className="slide-scroll">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {tales.map((t, i) => (
                <div key={i} style={{
                  padding: '10px 12px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: WHITE, marginBottom: 5, lineHeight: 1.3 }}>{t.title}</div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{
                      fontSize: 9, fontFamily: 'sans-serif', fontWeight: 600, padding: '1px 6px', borderRadius: 3,
                      background: `${regionColors[t.region] || '#888'}25`, color: regionColors[t.region] || '#ccc',
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>{t.region.split(' ')[0]}</span>
                    <span style={{ fontSize: 10, color: DIM, fontFamily: 'sans-serif' }}>{t.time}</span>
                  </div>
                </div>
              ))}
              <div style={{
                padding: '10px 12px', borderRadius: 8, gridColumn: 'span 2',
                background: 'rgba(201,168,76,0.06)', border: `1px dashed ${GOLD40}`,
                fontFamily: 'sans-serif', fontSize: 12, color: DIM, textAlign: 'center',
              }}>
                + 36 more side tales spread across all 6 regions
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <Tag label="Example" />
              <Tag label="Yotei Grasslands" color="rgba(74,155,142,0.2)" textColor="#4A9B8E" />
            </div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: WHITE, marginBottom: 4 }}>The Farmer and the Fox</h3>
            <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM }}>⏱ 15 min</span>
              <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM }}>No prerequisites</span>
            </div>
            <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.55, marginBottom: 14 }}>
              A farmer near Kasabe reports fox spirits raiding his harvest. Investigate the field, track prints to the den, and resolve the conflict — the foxes are being driven out by Yotei Six soldiers burning the adjacent forest.
            </p>
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, marginBottom: 8, fontWeight: 700 }}>STEPS</p>
              {[
                'Speak to the farmer at the Kasabe field',
                'Track the fox prints north to the tree line',
                'Investigate the den for signs of disturbance',
                'Eliminate the Yotei Six patrol burning the forest',
                'Return and report — farmer offers a charm reward',
              ].map((step, i) => (
                <div key={i} className="check-row">
                  <div className="check-box" />
                  <span className="check-text">{step}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'auto', padding: '10px 14px', borderRadius: 8, background: 'rgba(74,155,142,0.08)', border: '1px solid rgba(74,155,142,0.3)' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM }}>
                <span style={{ color: '#4A9B8E', fontWeight: 700 }}>Reward:</span> Harvest Charm (attack up after resting), 200 Mon
              </p>
            </div>
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide 5 — Mythic & Special Quests ────────────────────────────────────────
function Slide5() {
  const mythics = [
    { id: 'myth_01', title: 'The Voice in the Blizzard',      boss: false, region: 'Teshio Ridge'    },
    { id: 'myth_02', title: 'The Mountain God Trial',         boss: true,  region: 'Teshio Ridge'    },
    { id: 'myth_03', title: 'The Serpent Spirits of the Lake',boss: true,  region: 'Nayoro Wilds'    },
    { id: 'myth_04', title: 'Storm Bear of Hokkaido',         boss: true,  region: 'Tokachi Range'   },
    { id: 'myth_05', title: 'The Ancestor\'s Blade',          boss: false, region: 'Ishikari Plain'  },
    { id: 'myth_06', title: 'Guardian of the Crescent Moon',  boss: true,  region: 'Oshima Coast'    },
    { id: 'myth_07', title: 'The Dragon Ascending',           boss: false, region: 'Yotei Grasslands'},
  ];
  return (
    <BgSlide img={IMGS.mob3} overlay="rgba(8,4,18,0.82)">
      <div style={{ display: 'flex', height: '100%', padding: '40px 48px 80px', gap: 24 }}>
        <div style={{ flex: '0 0 48%', animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Mythic Tales · 7 Quests" color="rgba(139,26,26,0.2)" textColor="#ef4444" />
          <SectionTitle>Mythic &amp; Special Quests</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '10px 0 14px' }}>
            <div style={{ flex: 1 }}><MiniBar pct={0} color="#8B1A1A" /></div>
            <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#ef4444', whiteSpace: 'nowrap' }}>0 / 7</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            {mythics.map((m, i) => (
              <div key={m.id} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                borderRadius: 8, marginBottom: 5,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', width: 18 }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{ flex: 1, fontFamily: 'sans-serif', fontSize: 13, color: WHITE }}>{m.title}</span>
                {m.boss && <span title="Boss encounter">💀</span>}
                <span style={{ fontFamily: 'sans-serif', fontSize: 10, color: DIM }}>{m.region.split(' ')[0]}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Card style={{ flex: 1, padding: '12px 14px' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700, marginBottom: 4 }}>Sensei Tales</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>20 companion questlines — one per ally. Unlock by progressing main story milestones.</p>
            </Card>
            <Card style={{ flex: 1, padding: '12px 14px' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700, marginBottom: 4 }}>Bounty Quests</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>31 criminal targets across Ezo. Track them via bounty boards in each region.</p>
            </Card>
          </div>
        </div>
        <div style={{ flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <Tag label="Boss Spotlight" color="rgba(139,26,26,0.3)" textColor="#ef4444" />
              <Tag label="Teshio Ridge" color="rgba(123,104,238,0.2)" textColor="#7B68EE" />
            </div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: WHITE, marginBottom: 12 }}>The Mountain God Trial</h3>
            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', marginBottom: 12 }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700, marginBottom: 4 }}>⚔ Recommended Stance</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>Wind Stance — fast-movement pattern, prioritise Elite Guardian elimination in Wave 3</p>
            </div>
            {[
              { phase: 'Wave 1', desc: 'Four temple guardians descend from the shrine steps. They attack in pairs — eliminate the archers first from distance, then engage the swordsmen.' },
              { phase: 'Wave 2', desc: 'Six guardians plus a shaman who channels lightning strikes at your position. Kill the shaman before engaging the remaining guards.' },
              { phase: 'Wave 3 (Final)', desc: 'Elite Guardian plus four archers. The Elite Guardian is immune to standard strikes — use Spirit Abilities only. Archers cover all flanks. Clear the archers with wind-blast, then commit to the Elite Guardian.' },
            ].map((p, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700 }}>{p.phase}</span>
                </div>
                <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.5, paddingLeft: 14 }}>{p.desc}</p>
              </div>
            ))}
            <div style={{ marginTop: 'auto', padding: '10px 14px', borderRadius: 8, background: GOLD20, border: `1px solid ${GOLD40}` }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: WHITE }}><span style={{ color: GOLD, fontWeight: 700 }}>Reward:</span> Mountain God Charm + Shrine Climb #9 unlocked</p>
            </div>
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide 6 — Collectibles ────────────────────────────────────────────────────
function Slide6() {
  const groups = [
    { label: 'Sumi-e Paintings',     icon: '🎨', count: 60,  color: '#4A9B8E', trophy: "An Artist's Eye"   },
    { label: 'Ainu Sacred Sites',    icon: '🌿', count: 80,  color: '#4A9B6F', trophy: 'Ainu Wanderer'     },
    { label: 'Clan Trophies',        icon: '🏴', count: 68,  color: '#8B1A1A', trophy: 'Relic Hunter'      },
    { label: 'Ancient Maps',         icon: '🗺️', count: 55, color: '#9B59B6', trophy: 'Cartographer'      },
    { label: 'Hot Springs',          icon: '♨️', count: 16,  color: '#4682B4', trophy: 'Well of Spirit'    },
    { label: 'Bamboo Strikes',       icon: '🎍', count: 15,  color: '#B8860B', trophy: 'The Bamboo Path'   },
    { label: 'Shrine Climbs',        icon: '⛩️', count: 13,  color: '#C9A84C', trophy: 'Body, Mind & Spirit' },
    { label: 'Nine-Tails Puzzle Boxes', icon: '🦊', count: 12, color: '#8B4513', trophy: 'Nine-Tails Champion' },
  ];
  return (
    <BgSlide img={IMGS.blog2} overlay="rgba(4,10,20,0.82)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Collectibles · 319 Total" color="rgba(74,155,142,0.2)" textColor="#4A9B8E" />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
            <SectionTitle>Collectibles</SectionTitle>
            <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: DIM }}>All available in free-roam · 0 missable</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '10px 0 20px' }}>
            <div style={{ flex: 1 }}><MiniBar pct={0} color="#4A9B8E" /></div>
            <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: '#4A9B8E', whiteSpace: 'nowrap', fontWeight: 700 }}>0 / 319</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {groups.map(g => (
            <Card key={g.label} style={{ padding: '16px 18px', borderColor: `${g.color}40` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{g.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: WHITE, lineHeight: 1.3 }}>{g.label}</div>
                </div>
                <div style={{
                  fontFamily: 'sans-serif', fontSize: 20, fontWeight: 700, color: g.color,
                }}>{g.count}</div>
              </div>
              <MiniBar pct={0} color={g.color} />
              <div style={{ marginTop: 10, fontFamily: 'sans-serif', fontSize: 10, color: DIM }}>
                🏆 {g.trophy}
              </div>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: 16, animation: 'fadeUp 0.6s ease 0.4s both' }}>
          <Card style={{ padding: '12px 20px', background: 'rgba(201,168,76,0.06)' }}>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {['Yotei Grasslands', 'Ishikari Plain', 'Teshio Ridge', 'Tokachi Range', 'Nayoro Wilds', 'Oshima Coast'].map(r => (
                <div key={r} style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>
                  📍 {r}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, marginTop: 8 }}>
              <span style={{ color: GOLD }}>Strategy:</span> Clear collectibles region-by-region after completing local quests — fast-travel hubs unlock progressively through story chapters.
            </p>
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide 7 — Activities & World Content ─────────────────────────────────────
function Slide7() {
  const activities = [
    { icon: '⚔️', name: 'Dueling Circles',       desc: 'Challenge wandering swordsmen to earn Technique Points',           count: '~25 encounters' },
    { icon: '🎋', name: 'Haiku Stations',         desc: 'Compose haiku at scenic viewpoints — rewards cosmetic dyes',       count: '20 stations'    },
    { icon: '🏘️', name: 'Liberated Settlements', desc: 'Free each village from Yotei Six occupation — unlocks merchants',  count: '18 settlements' },
    { icon: '🛒', name: 'Merchant Stalls',        desc: 'Craft material vendors — stock resets after each major region',    count: '6 regions'      },
    { icon: '🐾', name: 'Animal Sanctuaries',     desc: 'Pet and photograph wildlife for Spirit Growth bonus',              count: '12 sanctuaries' },
    { icon: '🗡️', name: 'Vanity Challenges',     desc: 'Complete combat style challenges for cosmetic armour pieces',      count: '8 challenges'   },
  ];
  const regions = [
    { name: 'Yotei Grasslands', abbr: 'YG', color: '#4A9B8E' },
    { name: 'Ishikari Plain',   abbr: 'IP', color: '#4682B4' },
    { name: 'Teshio Ridge',     abbr: 'TR', color: '#7B68EE' },
    { name: 'Tokachi Range',    abbr: 'TK', color: '#B8860B' },
    { name: 'Nayoro Wilds',     abbr: 'NW', color: '#4A9B6F' },
    { name: 'Oshima Coast',     abbr: 'OC', color: '#4A7A9B' },
  ];
  return (
    <BgSlide img={IMGS.blog3} overlay="rgba(4,12,22,0.82)">
      <div style={{ display: 'flex', height: '100%', padding: '40px 48px 80px', gap: 24 }}>
        <div style={{ flex: '0 0 55%', animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="World Activities" color="rgba(74,155,142,0.2)" textColor="#4A9B8E" />
          <SectionTitle>Activities &amp; World Content</SectionTitle>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: '12px 0 18px', width: '60%' }} />
          <div className="slide-scroll">
            {activities.map((a, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, padding: '12px 14px', borderRadius: 8, marginBottom: 8,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 14, color: WHITE, fontWeight: 500 }}>{a.name}</span>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, whiteSpace: 'nowrap', marginLeft: 8 }}>{a.count}</span>
                  </div>
                  <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, animation: 'fadeUp 0.6s ease 0.2s both', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: GOLD, marginBottom: 14 }}>The 6 Regions of Ezo</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {regions.map(r => (
                <div key={r.abbr} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, background: `${r.color}25`,
                    border: `2px solid ${r.color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'sans-serif', fontSize: 10, color: r.color, fontWeight: 700, flexShrink: 0,
                  }}>{r.abbr}</div>
                  <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: WHITE }}>{r.name}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD, marginBottom: 14 }}>World Completion Tips</h3>
            {[
              { n: '1', tip: 'Liberate settlements first — merchants unlock crafting materials' },
              { n: '2', tip: 'Complete dueling circles before finishing regional quests for bonus TP' },
              { n: '3', tip: 'Haiku stations are tied to specific viewpoints — check Sumi-e list for overlap' },
              { n: '4', tip: 'Animal sanctuaries refill Spirit — visit before major boss fights' },
              { n: '5', tip: 'Vanity challenges can be replayed if failed on the first attempt' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', background: GOLD20, border: `1px solid ${GOLD40}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700, flexShrink: 0,
                }}>{item.n}</div>
                <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4, paddingTop: 2 }}>{item.tip}</p>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide 8 — Weapons, Armour & Upgrades ─────────────────────────────────────
function Slide8() {
  const [tab, setTab] = useState(0);
  const tabs = ['⚔️ Weapons', '🛡️ Armour', '💎 Charms'];
  const weapons = [
    { name: 'Starting Katana',      tier: 1, note: 'Prologue reward — balanced starter' },
    { name: 'Rider\'s Edge',        tier: 2, note: 'Upgrade via Ishikari blacksmith (Copper + Iron)' },
    { name: 'Crescent Blade',       tier: 2, note: 'Crafted after Saito Brothers quest (Steel + Resin)' },
    { name: 'Ghost Blade',          tier: 3, note: 'Crafted post-story (Rare Iron + Haunted Wood)' },
    { name: 'Mountain God Katana',  tier: 4, note: 'Reward from myth_02 — highest base damage' },
    { name: 'Dragon\'s Fang',       tier: 5, note: 'Reward from ms_10 — unlocks final stance' },
  ];
  const armour = [
    { name: 'Ghost Kimono',        region: 'Prologue',         note: 'Starting armour — balanced stats' },
    { name: 'Traveller\'s Cloak',  region: 'Yotei Grasslands', note: 'Crafted at grasslands settlement' },
    { name: 'Ronin\'s Guard',      region: 'Ishikari Plain',   note: 'Merchant in liberated Ishikari town' },
    { name: 'Mountain Shroud',     region: 'Teshio Ridge',     note: 'Shrine Climb #7 reward' },
    { name: 'Ghost Armour Tier II',region: 'Ch.2 reward',      note: 'Saito Brothers quest completion' },
    { name: 'Spirit Weave',        region: 'Post-story',       note: 'Crafted with Dragon materials' },
  ];
  const charms = [
    { name: 'Harvest Charm',       slot: 1, note: 'Attack boost after resting — side tale reward' },
    { name: 'Nine-Tails Fox Charm',slot: 2, note: 'Puzzle Box #1 — stealth invisibility window' },
    { name: 'Mountain God Charm',  slot: 3, note: 'myth_02 reward — lightning resistance' },
    { name: 'Bear Hide Amulet',    slot: 4, note: 'myth_04 reward — health regeneration on kill' },
    { name: 'Crescent Moon Token', slot: 5, note: 'myth_06 reward — bow damage amplified' },
    { name: 'Atsu\'s Spirit Seal', slot: 6, note: 'Shrine Climb #13 (final) — all stances buffed' },
  ];
  const data = [weapons, armour, charms];
  const cols = [['Name','Tier','Notes'], ['Name','Region','Notes'], ['Name','Slot','Notes']];
  return (
    <BgSlide img={IMGS.mob4} overlay="rgba(5,8,18,0.84)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Equipment Reference" color={GOLD20} />
          <SectionTitle>Weapons, Armour &amp; Upgrades</SectionTitle>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: '12px 0 18px', width: '60%' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, animation: 'fadeUp 0.6s ease 0.15s both' }}>
          {tabs.map((t, i) => (
            <button key={i} className={`tab-btn ${i === tab ? 'active' : ''}`} onClick={() => setTab(i)} style={{
              padding: '8px 20px', borderRadius: 8, border: `1px solid ${GOLD40}`,
              fontFamily: 'sans-serif', fontSize: 13, cursor: 'pointer',
              background: i === tab ? GOLD : 'rgba(201,168,76,0.08)',
              color: i === tab ? DARK : DIM,
            }}>{t}</button>
          ))}
        </div>
        <Card style={{ flex: 1, overflow: 'hidden', animation: 'fadeUp 0.6s ease 0.25s both' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 3fr', gap: 12, marginBottom: 12, borderBottom: `1px solid ${GOLD40}`, paddingBottom: 8 }}>
            {cols[tab].map(h => (
              <span key={h} style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>
            ))}
          </div>
          <div className="slide-scroll">
            {data[tab].map((row: any, i: number) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 3fr', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
                <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: WHITE }}>{row.name}</span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {tab === 0 ? <TierDots filled={row.tier} /> : (
                    <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>
                      {tab === 1 ? row.region : `Slot ${row.slot}`}
                    </span>
                  )}
                </span>
                <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4 }}>{row.note}</span>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ marginTop: 14, animation: 'fadeUp 0.6s ease 0.35s both' }}>
          <Card style={{ padding: '10px 18px', background: 'rgba(201,168,76,0.06)' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>
              <span style={{ color: GOLD, fontWeight: 700 }}>Charm Slots:</span> Unlock via Shrine Climbs — 1 slot per shrine. 13 shrines = 13 charm slots max. Each slot can hold any one charm independently.
            </p>
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide 9 — Missables & Endgame ─────────────────────────────────────────────
function Slide9() {
  const cleanup = [
    'Complete all 9 Nayoro Wilds bounty targets (bnty_23 – bnty_31)',
    'Finish all 13 Shrine Climbs for full charm slot count',
    'Solve all 12 Nine-Tails Puzzle Boxes',
    'Locate all 80 Ainu Sacred Sites',
    'Collect all 60 Sumi-e Painting viewpoints',
    'Complete all 7 Mythic Tales including the Mountain God Trial',
    'Finish the 3 Post-Story epilogue quests',
    'Reach the Platinum Trophy threshold',
  ];
  return (
    <BgSlide img={IMGS.blog4} overlay="rgba(6,4,14,0.85)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Endgame Cleanup" color="rgba(139,26,26,0.2)" textColor="#ef4444" />
          <SectionTitle>Missables &amp; Endgame Cleanup</SectionTitle>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: '10px 0 16px', width: '60%' }} />
        </div>
        {/* Zero missables banner */}
        <div style={{
          padding: '18px 28px', borderRadius: 12, marginBottom: 20,
          background: 'linear-gradient(135deg, rgba(74,155,142,0.12), rgba(74,155,142,0.06))',
          border: '2px solid rgba(74,155,142,0.4)',
          animation: 'fadeUp 0.6s ease 0.15s both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 36 }}>✅</span>
            <div>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#4A9B8E', letterSpacing: '0.02em' }}>0 Truly Missable Quests</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: DIM, marginTop: 4 }}>Ghost of Yōtei is fully free-roam friendly. Every quest, collectible, and trophy remains available after the story credits roll.</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, flex: 1, animation: 'fadeUp 0.6s ease 0.25s both' }}>
          <div style={{ flex: 1 }}>
            <Card style={{ height: '100%' }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: GOLD, marginBottom: 16 }}>Post-Story Cleanup Checklist</h3>
              {cleanup.map((item, i) => (
                <div key={i} className="check-row">
                  <div className="check-box" />
                  <span className="check-text">{item}</span>
                </div>
              ))}
            </Card>
          </div>
          <div style={{ flex: '0 0 38%', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              padding: '16px 18px', borderRadius: 12,
              background: 'rgba(139,26,26,0.12)', border: '1px solid rgba(239,68,68,0.3)',
            }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>⚠ KNOWN BUG WARNING</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.5 }}>
                <strong style={{ color: WHITE }}>Bounty Quest bnty_04 (Black Powder Ippei):</strong> Ippei may fail to appear at the marked location if the Oshima Coast was cleared in a specific order. Reload your last save and fast-travel away and back to reset the spawn. This does not permanently block the trophy.
              </p>
            </div>
            <Card style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD, marginBottom: 14 }}>Post-Story Quests</h3>
              {[
                { title: 'Embers of the Snake',    note: 'Epilogue — confront the Snake\'s legacy' },
                { title: 'The Weight of Silence',  note: 'Jubei companion quest conclusion' },
                { title: 'Yōtei at First Snow',    note: 'True ending unlock — return to Kasabe' },
              ].map((q, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div className="check-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                    <div className="check-box" />
                    <div>
                      <div style={{ fontFamily: 'sans-serif', fontSize: 13, color: WHITE }}>{q.title}</div>
                      <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, marginTop: 2 }}>{q.note}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide 10 — Progress Tracking ──────────────────────────────────────────────
function Slide10() {
  const regions = [
    { name: 'Yotei Grasslands', abbr: 'YG', color: '#4A9B8E', quests: 22, collectibles: 62, activities: 14 },
    { name: 'Ishikari Plain',   abbr: 'IP', color: '#4682B4', quests: 18, collectibles: 55, activities: 11 },
    { name: 'Teshio Ridge',     abbr: 'TR', color: '#7B68EE', quests: 16, collectibles: 48, activities: 9  },
    { name: 'Tokachi Range',    abbr: 'TK', color: '#B8860B', quests: 21, collectibles: 58, activities: 12 },
    { name: 'Nayoro Wilds',     abbr: 'NW', color: '#4A9B6F', quests: 19, collectibles: 52, activities: 10 },
    { name: 'Oshima Coast',     abbr: 'OC', color: '#4A7A9B', quests: 23, collectibles: 44, activities: 13 },
  ];
  const R = 28;
  const C = 2 * Math.PI * R;
  return (
    <BgSlide img={IMGS.ps2} overlay="rgba(4,6,18,0.82)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Regional Progress" />
          <SectionTitle>Progress Tracking</SectionTitle>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: '10px 0 20px', width: '60%' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {regions.map(r => (
            <Card key={r.abbr} style={{ borderColor: `${r.color}40` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* SVG Ring */}
                <svg width={70} height={70} style={{ flexShrink: 0 }}>
                  <circle cx={35} cy={35} r={R} fill="none" strokeWidth={5} className="ring-track" />
                  <circle cx={35} cy={35} r={R} fill="none" strokeWidth={5} className="ring-fill"
                    strokeDasharray={C} strokeDashoffset={C}
                    transform="rotate(-90 35 35)" />
                  <text x={35} y={39} textAnchor="middle" fill={r.color} fontSize={14} fontFamily="sans-serif" fontWeight="bold">0%</text>
                </svg>
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: r.color, fontWeight: 700, marginBottom: 4 }}>{r.abbr}</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: WHITE, lineHeight: 1.3 }}>{r.name}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  { label: 'Quests',       val: r.quests,      color: GOLD    },
                  { label: 'Collectibles', val: r.collectibles, color: r.color },
                  { label: 'Activities',   val: r.activities,   color: '#888'  },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, width: 80 }}>{row.label}</span>
                    <div style={{ flex: 1 }}><MiniBar pct={0} color={row.color} /></div>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: row.color, width: 28, textAlign: 'right' }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide 11 — Completion Dashboard ──────────────────────────────────────────
function Slide11() {
  const categories = [
    { label: 'Main Story',     count: 10,  color: '#C9A84C' },
    { label: 'Side Tales',     count: 48,  color: '#4A9B8E' },
    { label: 'Mythic Tales',   count: 7,   color: '#8B1A1A' },
    { label: 'Sensei Tales',   count: 20,  color: '#7B68EE' },
    { label: 'Bounty Quests',  count: 31,  color: '#B8860B' },
    { label: 'Post-Story',     count: 3,   color: '#9B59B6' },
  ];
  const trophyTiers = [
    { tier: 'Platinum', icon: '🏅', count: 1,  color: '#E5E4E2' },
    { tier: 'Gold',     icon: '🥇', count: 7,  color: '#FFD700' },
    { tier: 'Silver',   icon: '🥈', count: 18, color: '#C0C0C0' },
    { tier: 'Bronze',   icon: '🥉', count: 28, color: '#CD7F32' },
  ];
  return (
    <BgSlide img={IMGS.mob5} overlay="rgba(4,6,16,0.85)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Completion Dashboard" />
          <SectionTitle>Full Completion Overview</SectionTitle>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: '10px 0 18px', width: '60%' }} />
        </div>
        {/* Top row: totals */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 16, animation: 'fadeUp 0.6s ease 0.15s both' }}>
          {[
            { label: 'Quests',       val: '0 / 119',  sub: '6 categories', color: GOLD    },
            { label: 'Collectibles', val: '0 / 319',  sub: '8 groups',     color: '#4A9B8E' },
            { label: 'Trophies',     val: '0 / 54',   sub: '1 Platinum',   color: '#E5E4E2' },
          ].map(s => (
            <Card key={s.label} style={{ textAlign: 'center', padding: '16px 20px' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: s.color, fontWeight: 400 }}>{s.val}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, marginTop: 2 }}>{s.sub}</div>
              <MiniBar pct={0} color={s.color} />
            </Card>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, flex: 1, animation: 'fadeUp 0.6s ease 0.25s both' }}>
          {/* Category bars */}
          <Card>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD, marginBottom: 16 }}>Quest Categories</h3>
            {categories.map(c => (
              <div key={c.label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: WHITE }}>{c.label}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: c.color }}>0 / {c.count}</span>
                </div>
                <MiniBar pct={0} color={c.color} />
              </div>
            ))}
          </Card>
          {/* Trophy breakdown */}
          <Card>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD, marginBottom: 16 }}>Trophy Breakdown</h3>
            {trophyTiers.map(t => (
              <div key={t.tier} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: WHITE }}>{t.tier}</span>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: t.color }}>{t.count}</span>
                  </div>
                  <MiniBar pct={0} color={t.color} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.04)' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4 }}>Platinum unlocks automatically when all 53 other trophies are earned — no additional requirements.</p>
            </div>
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide 12 — Closing Strategy ───────────────────────────────────────────────
function Slide12() {
  const steps = [
    { n: '01', title: 'Main Story',           hours: '~8–10h',   desc: 'Follow the 10 main story quests in order. Boss fights unlock stances and abilities critical for side content.' },
    { n: '02', title: 'Regional Side Quests', hours: '~18–22h',  desc: 'Clear Side Tales, Sensei Tales, and Bounty Quests region-by-region as you unlock each area through story progress.' },
    { n: '03', title: 'Collectibles by Region',hours: '~12–16h', desc: 'Use the guide\'s regional hints to sweep each of the 6 regions for all 319 collectibles. Shrine Climbs first for charm slots.' },
    { n: '04', title: 'Mythic Tales + Cleanup',hours: '~6–8h',  desc: 'Complete all 7 Mythic Tales (some require story completion). Then run the post-story cleanup checklist.' },
    { n: '05', title: 'Trophy Cleanup',        hours: '~2–4h',   desc: 'Cross-reference the trophy list against your progress. The Platinum unlocks automatically when all 53 other trophies are earned.' },
  ];
  return (
    <BgSlide img={IMGS.blog5} overlay="rgba(4,4,14,0.84)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Completion Strategy" />
          <SectionTitle>Recommended 100% Order</SectionTitle>
          <GoldLine />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {steps.map((step, i) => (
            <Card key={i} style={{ display: 'flex', flexDirection: 'column', borderColor: i === 4 ? GOLD : `${GOLD40}` }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 40, color: i === 4 ? GOLD : 'rgba(201,168,76,0.2)', marginBottom: 8, lineHeight: 1 }}>{step.n}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: WHITE, marginBottom: 6, lineHeight: 1.3 }}>{step.title}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: GOLD, fontWeight: 700, marginBottom: 10 }}>{step.hours}</div>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, lineHeight: 1.5, flex: 1 }}>{step.desc}</p>
              {i === 4 && (
                <div style={{ marginTop: 12, padding: '8px', borderRadius: 6, background: GOLD20, textAlign: 'center' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700 }}>🏅 Platinum</span>
                </div>
              )}
            </Card>
          ))}
        </div>
        <div style={{ marginTop: 16, animation: 'fadeUp 0.6s ease 0.4s both' }}>
          <div style={{
            padding: '20px 32px', borderRadius: 12, textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.05))',
            border: `1px solid ${GOLD40}`,
          }}>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: WHITE, letterSpacing: '0.04em' }}>
              You've Got This, <span style={{ color: GOLD }}>Atsu.</span>
            </p>
            <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: DIM, marginTop: 8 }}>
              Total estimated time: <strong style={{ color: WHITE }}>46–60 hours</strong> · Zero missables · Free-roam friendly throughout
            </p>
          </div>
        </div>
      </div>
    </BgSlide>
  );
}

// ── Slide engine ──────────────────────────────────────────────────────────────
const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12];
const SLIDE_TITLES = [
  'Title', 'How to Use', 'Main Story', 'Side Tales',
  'Mythic Quests', 'Collectibles', 'Activities', 'Weapons & Armour',
  'Missables', 'Progress', 'Dashboard', 'Closing Strategy',
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const prevRef = useRef(0);

  const go = useCallback((idx: number) => {
    if (idx < 0 || idx >= SLIDES.length) return;
    prevRef.current = current;
    setCurrent(idx);
    setAnimKey(k => k + 1);
  }, [current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(current + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(current - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, go]);

  const SlideComponent = SLIDES[current];

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: DARK }}>
      {/* Slide */}
      <div key={animKey} style={{ width: '100%', height: '100%', animation: 'fadeUp 0.45s ease both' }}>
        <SlideComponent />
      </div>

      {/* Left arrow */}
      {current > 0 && (
        <button onClick={() => go(current - 1)} style={{
          position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
          width: 44, height: 44, borderRadius: '50%', border: `1px solid ${GOLD40}`,
          background: 'rgba(10,10,20,0.7)', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: GOLD, fontSize: 18,
          backdropFilter: 'blur(8px)', transition: 'all 0.2s ease', zIndex: 100,
        }} onMouseEnter={e => (e.currentTarget.style.background = GOLD20)}
           onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,10,20,0.7)')}>
          ‹
        </button>
      )}

      {/* Right arrow */}
      {current < SLIDES.length - 1 && (
        <button onClick={() => go(current + 1)} style={{
          position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)',
          width: 44, height: 44, borderRadius: '50%', border: `1px solid ${GOLD40}`,
          background: 'rgba(10,10,20,0.7)', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: GOLD, fontSize: 18,
          backdropFilter: 'blur(8px)', transition: 'all 0.2s ease', zIndex: 100,
        }} onMouseEnter={e => (e.currentTarget.style.background = GOLD20)}
           onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,10,20,0.7)')}>
          ›
        </button>
      )}

      {/* Dot navigation */}
      <div style={{
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 8, alignItems: 'center', zIndex: 100,
      }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} title={SLIDE_TITLES[i]} style={{
            width: i === current ? 24 : 8,
            height: 8, borderRadius: 4,
            background: i === current ? GOLD : 'rgba(201,168,76,0.3)',
            border: 'none', cursor: 'pointer', padding: 0,
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* Slide counter */}
      <div style={{
        position: 'absolute', bottom: 22, right: 24,
        fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(240,237,232,0.35)',
        letterSpacing: '0.1em', zIndex: 100,
      }}>
        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>

      {/* Slide title */}
      <div style={{
        position: 'absolute', bottom: 22, left: 24,
        fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(240,237,232,0.35)',
        letterSpacing: '0.08em', textTransform: 'uppercase', zIndex: 100,
      }}>
        {SLIDE_TITLES[current]}
      </div>
    </div>
  );
}
