import { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from './hooks/use-mobile';
import {
  Card, Tag, SectionTitle, GoldLine, MiniBar, TierDots, SectionBg,
  QuestRow, QuestDetail, CollectibleCheckItem,
  StepCheckRow,
} from './components/guide-ui';
import {
  GOLD, GOLD20, GOLD40, DARK, WHITE, DIM,
  IMGS, REGION_COLOR, ACT_COLOR,
  MAIN_STORY, SIDE_TALES, MYTHIC_TALES, SENSEI_TALES, BOUNTY_QUESTS, POST_STORY,
} from './data/quests';
import {
  COLLECTIBLE_CATEGORIES, COLLECTIBLE_TOTAL, ALL_COLLECTIBLE_IDS, COLLECTIBLES_BY_REGION,
} from './data/collectibles';
import type { CollectibleItem } from './data/schema';
import { REGION_NAMES } from './data/schema';
import {
  ACTIVITY_CATEGORIES, ACTIVITY_TOTAL, ALL_ACTIVITY_IDS, ACTIVITIES_BY_REGION,
} from './data/activities';
import { WEAPONS, ARMOUR, CHARMS } from './data/equipment';
import { RESOURCES, RESOURCE_TOTAL } from './data/resources';
import { MERCHANTS, MERCHANT_TOTAL, VENDOR_TYPE_LABELS } from './data/merchants';
import { REGIONS } from './data/regions';
import {
  ITEMS, ITEM_TOTAL, ITEM_TYPE_LABELS, SOURCE_TYPE_LABELS, SOURCE_TYPE_ICONS, RARITY_COLORS,
  type ItemType,
} from './data/items';
import { ProgressContext, useProgressState, useProgress } from './hooks/use-progress';

// ── Sidebar navigation config ─────────────────────────────────────────────────

// ── NAV counts derived from data — never hardcoded ───────────────────────────
const NAV = [
  { id: 'overview',      label: 'Overview',       icon: '📖', group: 'guide'   },
  { id: 'main-story',    label: 'Main Story',      icon: '⚔️',  group: 'quests', count: MAIN_STORY.length    },
  { id: 'side-tales',    label: 'Side Tales',      icon: '📜',  group: 'quests', count: SIDE_TALES.length    },
  { id: 'mythic-tales',  label: 'Mythic Tales',    icon: '🔱',  group: 'quests', count: MYTHIC_TALES.length  },
  { id: 'sensei-tales',  label: 'Sensei Tales',    icon: '🧑‍🏫', group: 'quests', count: SENSEI_TALES.length  },
  { id: 'bounty-quests', label: 'Bounty Quests',   icon: '🎯',  group: 'quests', count: BOUNTY_QUESTS.length },
  { id: 'post-story',    label: 'Post-Story',      icon: '🌸',  group: 'quests', count: POST_STORY.length    },
  { id: 'collectibles',  label: 'Collectibles',    icon: '🗺️',  group: 'world',  count: COLLECTIBLE_TOTAL   },
  { id: 'activities',    label: 'Activities',      icon: '🏃',  group: 'world',  count: ACTIVITY_TOTAL      },
  { id: 'equipment',     label: 'Equipment',       icon: '🗡️',  group: 'world'  },
  { id: 'items',         label: 'Items',            icon: '🎒',  group: 'world',  count: ITEM_TOTAL },
  { id: 'resources',     label: 'Resources',        icon: '⚗️',  group: 'world',  count: RESOURCE_TOTAL },
  { id: 'merchants',     label: 'Merchants',        icon: '🛒',  group: 'world',  count: MERCHANT_TOTAL },
  { id: 'missables',     label: 'Missables',       icon: '⚠️',  group: 'world'  },
  { id: 'progress',      label: 'Progress',        icon: '📊',  group: 'status' },
  { id: 'dashboard',     label: 'Dashboard',       icon: '🏅',  group: 'status' },
  { id: 'strategy',      label: 'Strategy',        icon: '📋',  group: 'status' },
] as const;

// ── Section: Hero ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMGS.ps1})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,4,12,0.72)' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '40px 24px' }}>
        <div style={{ animation: 'fadeUp 0.7s ease 0.1s both' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', marginBottom: 24 }}>■ COMPLETE GUIDE ■</p>
        </div>
        <div style={{ animation: 'fadeUp 0.7s ease 0.25s both' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 400, color: WHITE, letterSpacing: '0.06em', lineHeight: 1.1, textShadow: '0 4px 40px rgba(0,0,0,0.9)' }}>Ghost of Yōtei</h1>
        </div>
        <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '20px auto', width: 300, animation: 'inkReveal 0.9s ease 0.4s both', transformOrigin: 'left center' }} />
        <div style={{ animation: 'fadeUp 0.7s ease 0.45s both' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 'clamp(13px, 2vw, 20px)', letterSpacing: '0.18em', color: 'rgba(240,237,232,0.80)', textTransform: 'uppercase', marginBottom: 32 }}>100% Completion Guide</p>
        </div>
        <div style={{ animation: 'fadeUp 0.7s ease 0.6s both' }}>
          <p style={{ fontSize: 'clamp(26px, 5vw, 52px)', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.3em', fontFamily: 'Georgia, serif', marginBottom: 40 }}>幽霊</p>
        </div>
        <div style={{ animation: 'fadeUp 0.7s ease 0.8s both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(240,237,232,0.45)', fontFamily: 'sans-serif', fontSize: 13, letterSpacing: '0.1em' }}>
            <span>{MAIN_STORY.length + SIDE_TALES.length + MYTHIC_TALES.length + SENSEI_TALES.length + BOUNTY_QUESTS.length + POST_STORY.length} Quests</span><span style={{ color: GOLD40 }}>•</span>
            <span>{COLLECTIBLE_TOTAL} Collectibles</span><span style={{ color: GOLD40 }}>•</span>
            <span>54 Trophies</span><span style={{ color: GOLD40 }}>•</span>
            <span>{REGIONS.length} Regions</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, animation: 'fadeUp 0.7s ease 1.1s both' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: 'rgba(240,237,232,0.3)', letterSpacing: '0.12em' }}>Use the sidebar to navigate ↑</p>
        </div>
      </div>
    </div>
  );
}

// ── Section: Overview ─────────────────────────────────────────────────────────

function OverviewSection() {
  const cols = [
    {
      icon: '⚔️', title: 'Quest Walkthrough',
      items: ['Click any quest to expand its full walkthrough','Steps, boss tips, and rewards shown for all 119 quests','Quest categories: Main Story, Side Tales, Mythic, Sensei, Bounty, Post-Story','Chapters and regions colour-coded for quick orientation'],
    },
    {
      icon: '🗺️', title: 'Collectibles & World',
      items: [`${COLLECTIBLE_TOTAL} collectibles across 13 categories and 6 regions`,'Regional clearing strategy to minimise backtracking','Fox Dens, Shrine Climbs & Zeni Hajiki each unlock unique charms or trophies','All collectibles accessible in free-roam after credits — zero missables'],
    },
    {
      icon: '🏅', title: 'Trophy & Progress',
      items: ['54 trophies total — 1 Platinum, 7 Gold, 18 Silver, 28 Bronze','Platinum auto-unlocks when all 53 others are earned','Recommended 100% order in the Strategy section','Estimated 46–60 hours for full completion'],
    },
  ];
  return (
    <SectionBg img={IMGS.blog1} overlay="rgba(4,8,18,0.88)">
      <div style={{ padding: '64px 48px' }}>
        <Tag label="Guide Overview" />
        <SectionTitle><span style={{ color: GOLD }}>How to Use</span> This Guide</SectionTitle>
        <GoldLine />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 24 }}>
          {cols.map(col => (
            <Card key={col.title} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{col.icon}</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: GOLD, marginBottom: 14, letterSpacing: '0.03em' }}>{col.title}</h3>
              {col.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8, fontFamily: 'sans-serif', fontSize: 13, color: DIM, lineHeight: 1.4 }}>
                  <span style={{ color: GOLD, fontSize: 8, marginTop: 5, flexShrink: 0 }}>◆</span>{item}
                </div>
              ))}
            </Card>
          ))}
        </div>
        <Card style={{ background: 'rgba(201,168,76,0.08)', borderColor: GOLD40, padding: '14px 22px' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: 'rgba(240,237,232,0.75)', lineHeight: 1.5 }}>
            <span style={{ color: GOLD, fontWeight: 700 }}>Zero missables.</span>&nbsp; Every quest, collectible, and trophy in Ghost of Yōtei is accessible via free-roam after the story credits roll. Use the sidebar links to jump directly to any section.
          </p>
        </Card>
      </div>
    </SectionBg>
  );
}

// ── Section: Main Story ───────────────────────────────────────────────────────

function MainStorySection() {
  const [selectedId, setSelectedId] = useState('ms_01');
  const [expandedActs, setExpandedActs] = useState<Record<string, boolean>>({
    'Prologue': true, 'Chapter 1': true, 'Chapter 2': true, 'Chapter 3': true,
  });
  const { isChecked, toggle, countChecked } = useProgress();

  const flatList = MAIN_STORY;
  const selectedIndex = flatList.findIndex(q => q.id === selectedId);
  const selected = flatList[selectedIndex];
  const allIds = flatList.map(q => q.id);
  const doneCount = countChecked(allIds);
  const pct = (doneCount / flatList.length) * 100;

  const byAct: Record<string, typeof MAIN_STORY> = {};
  for (const q of flatList) { if (!byAct[q.act!]) byAct[q.act!] = []; byAct[q.act!].push(q); }
  const acts = ['Prologue', 'Chapter 1', 'Chapter 2', 'Chapter 3'];

  return (
    <SectionBg img={IMGS.mob1} overlay="rgba(4,6,18,0.86)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="Main Story" color="rgba(201,168,76,0.15)" />
        <SectionTitle>Main Story Quests</SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 20px' }}>
          <div style={{ flex: 1 }}><MiniBar pct={pct} /></div>
          <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: GOLD }}>{doneCount} / {flatList.length}</span>
        </div>
        <div className="quest-browser">
          {/* Left: grouped quest list */}
          <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div className="quest-scroll" style={{ flex: 1 }}>
              {acts.map(act => {
                const quests = byAct[act] || [];
                const color = ACT_COLOR[act] || GOLD;
                const expanded = expandedActs[act];
                return (
                  <div key={act} style={{ marginBottom: 8 }}>
                    <button
                      onClick={() => setExpandedActs(prev => ({ ...prev, [act]: !prev[act] }))}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, background: `${color}15`, border: `1px solid ${color}30`, cursor: 'pointer', marginBottom: expanded ? 6 : 0 }}
                    >
                      <span style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', flex: 1, textAlign: 'left' }}>{act}</span>
                      <span style={{ fontSize: 10, color, opacity: 0.7 }}>{countChecked(quests.map(q => q.id))} / {quests.length}</span>
                      <span style={{ fontSize: 10, color, opacity: 0.5 }}>{expanded ? '▲' : '▼'}</span>
                    </button>
                    {expanded && quests.map((q) => {
                      const globalIndex = flatList.findIndex(x => x.id === q.id);
                      return (
                        <QuestRow key={q.id} quest={q} index={globalIndex} selected={q.id === selectedId}
                          onClick={() => setSelectedId(q.id)} accentColor={color}
                          checked={isChecked(q.id)}
                          onToggle={(e) => { e.stopPropagation(); toggle(q.id); }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Right: detail panel */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {selected && (
              <QuestDetail quest={selected}
                hasPrev={selectedIndex > 0} hasNext={selectedIndex < flatList.length - 1}
                onPrev={() => setSelectedId(flatList[selectedIndex - 1].id)}
                onNext={() => setSelectedId(flatList[selectedIndex + 1].id)}
                accentColor={ACT_COLOR[selected.act!] || GOLD}
              />
            )}
          </div>
        </div>
      </div>
    </SectionBg>
  );
}

// ── Section: Side Tales ───────────────────────────────────────────────────────

function SideTalesSection() {
  const [selectedId, setSelectedId] = useState(SIDE_TALES[0].id);
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const { isChecked, toggle, countChecked } = useProgress();
  const regions = ['All', ...Object.keys(REGION_COLOR)];

  const filtered = regionFilter === 'All' ? SIDE_TALES : SIDE_TALES.filter(q => q.region === regionFilter);
  const selectedIndex = filtered.findIndex(q => q.id === selectedId);
  const selected = filtered[selectedIndex] || filtered[0];
  const allIds = SIDE_TALES.map(q => q.id);
  const doneCount = countChecked(allIds);
  const pct = (doneCount / SIDE_TALES.length) * 100;
  const color = '#4A9B8E';

  return (
    <SectionBg img={IMGS.mob2} overlay="rgba(4,8,20,0.86)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="Side Tales · 48 Quests" color="rgba(74,155,142,0.2)" textColor={color} />
        <SectionTitle>Side Tales</SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 12px' }}>
          <div style={{ flex: 1 }}><MiniBar pct={pct} color={color} /></div>
          <span style={{ fontFamily: 'sans-serif', fontSize: 12, color }}>{doneCount} / {SIDE_TALES.length}</span>
        </div>
        {/* Region filter */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 16 }}>
          {regions.map(r => {
            const col = r === 'All' ? GOLD : (REGION_COLOR[r] || GOLD);
            const active = r === regionFilter;
            return (
              <button key={r}
                onClick={() => {
                  setRegionFilter(r);
                  setSelectedId(r === 'All' ? SIDE_TALES[0].id : (SIDE_TALES.find(q => q.region === r)?.id || SIDE_TALES[0].id));
                }}
                style={{ padding: '4px 10px', borderRadius: 4, border: `1px solid ${col}40`, fontFamily: 'sans-serif', fontSize: 9, cursor: 'pointer', fontWeight: 600, letterSpacing: '0.04em', background: active ? `${col}25` : 'transparent', color: active ? col : 'rgba(240,237,232,0.4)', transition: 'all 0.15s' }}>
                {r === 'All' ? 'All Regions' : r.split(' ')[0]}
              </button>
            );
          })}
        </div>
        <div className="quest-browser">
          <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <div className="quest-scroll" style={{ flex: 1 }}>
              {filtered.map((q, i) => (
                <QuestRow key={q.id} quest={q} index={i} selected={q.id === selectedId}
                  onClick={() => setSelectedId(q.id)} accentColor={REGION_COLOR[q.region] || GOLD}
                  checked={isChecked(q.id)}
                  onToggle={(e) => { e.stopPropagation(); toggle(q.id); }}
                />
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {selected && (
              <QuestDetail quest={selected}
                hasPrev={selectedIndex > 0} hasNext={selectedIndex < filtered.length - 1}
                onPrev={() => setSelectedId(filtered[selectedIndex - 1].id)}
                onNext={() => setSelectedId(filtered[selectedIndex + 1].id)}
                accentColor={REGION_COLOR[selected.region] || GOLD}
              />
            )}
          </div>
        </div>
      </div>
    </SectionBg>
  );
}

// ── Section: Mythic Tales ─────────────────────────────────────────────────────

function MythicTalesSection() {
  const [selectedId, setSelectedId] = useState(MYTHIC_TALES[0].id);
  const { isChecked, toggle, countChecked } = useProgress();
  const selectedIndex = MYTHIC_TALES.findIndex(q => q.id === selectedId);
  const selected = MYTHIC_TALES[selectedIndex];
  const color = '#ef4444';
  const allIds = MYTHIC_TALES.map(q => q.id);
  const doneCount = countChecked(allIds);
  const pct = (doneCount / MYTHIC_TALES.length) * 100;

  return (
    <SectionBg img={IMGS.mob3} overlay="rgba(8,4,18,0.88)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="Mythic Tales · 7 Quests" color="rgba(139,26,26,0.2)" textColor={color} />
        <SectionTitle>Mythic Tales</SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 20px' }}>
          <div style={{ flex: 1 }}><MiniBar pct={pct} color={color} /></div>
          <span style={{ fontFamily: 'sans-serif', fontSize: 12, color }}>{doneCount} / {MYTHIC_TALES.length}</span>
        </div>
        <div className="quest-browser">
          <div style={{ flex: '0 0 44%', minWidth: 0 }}>
            <div className="quest-scroll" style={{ height: '100%' }}>
              {MYTHIC_TALES.map((q, i) => (
                <QuestRow key={q.id} quest={q} index={i} selected={q.id === selectedId}
                  onClick={() => setSelectedId(q.id)} accentColor={color}
                  checked={isChecked(q.id)}
                  onToggle={(e) => { e.stopPropagation(); toggle(q.id); }}
                />
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {selected && (
              <QuestDetail quest={selected}
                hasPrev={selectedIndex > 0} hasNext={selectedIndex < MYTHIC_TALES.length - 1}
                onPrev={() => setSelectedId(MYTHIC_TALES[selectedIndex - 1].id)}
                onNext={() => setSelectedId(MYTHIC_TALES[selectedIndex + 1].id)}
                accentColor={color}
              />
            )}
          </div>
        </div>
      </div>
    </SectionBg>
  );
}

// ── Section: Sensei Tales ─────────────────────────────────────────────────────

function SenseiTalesSection() {
  const [selectedId, setSelectedId] = useState(SENSEI_TALES[0].id);
  const { isChecked, toggle, countChecked } = useProgress();
  const selectedIndex = SENSEI_TALES.findIndex(q => q.id === selectedId);
  const selected = SENSEI_TALES[selectedIndex];
  const color = '#7B68EE';
  const allIds = SENSEI_TALES.map(q => q.id);
  const doneCount = countChecked(allIds);
  const pct = (doneCount / SENSEI_TALES.length) * 100;

  return (
    <SectionBg img={IMGS.blog6} overlay="rgba(6,4,18,0.88)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="Sensei Tales · 20 Quests" color="rgba(123,104,238,0.2)" textColor={color} />
        <SectionTitle>Sensei Tales</SectionTitle>
        <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, marginBottom: 4, lineHeight: 1.4 }}>
          Each Sensei Tale unlocks a companion ally. Complete all 20 before attempting the true ending.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 20px' }}>
          <div style={{ flex: 1 }}><MiniBar pct={pct} color={color} /></div>
          <span style={{ fontFamily: 'sans-serif', fontSize: 12, color }}>{doneCount} / {SENSEI_TALES.length}</span>
        </div>
        <div className="quest-browser">
          <div style={{ flex: '0 0 44%', minWidth: 0 }}>
            <div className="quest-scroll" style={{ height: '100%' }}>
              {SENSEI_TALES.map((q, i) => (
                <QuestRow key={q.id} quest={q} index={i} selected={q.id === selectedId}
                  onClick={() => setSelectedId(q.id)} accentColor={color}
                  checked={isChecked(q.id)}
                  onToggle={(e) => { e.stopPropagation(); toggle(q.id); }}
                />
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {selected && (
              <QuestDetail quest={selected}
                hasPrev={selectedIndex > 0} hasNext={selectedIndex < SENSEI_TALES.length - 1}
                onPrev={() => setSelectedId(SENSEI_TALES[selectedIndex - 1].id)}
                onNext={() => setSelectedId(SENSEI_TALES[selectedIndex + 1].id)}
                accentColor={color}
              />
            )}
          </div>
        </div>
      </div>
    </SectionBg>
  );
}

// ── Section: Bounty Quests ────────────────────────────────────────────────────

function BountyQuestsSection() {
  const [selectedId, setSelectedId] = useState(BOUNTY_QUESTS[0].id);
  const { isChecked, toggle, countChecked } = useProgress();
  const selectedIndex = BOUNTY_QUESTS.findIndex(q => q.id === selectedId);
  const selected = BOUNTY_QUESTS[selectedIndex];
  const color = '#B8860B';
  const allIds = BOUNTY_QUESTS.map(q => q.id);
  const doneCount = countChecked(allIds);
  const pct = (doneCount / BOUNTY_QUESTS.length) * 100;

  return (
    <SectionBg img={IMGS.blog4} overlay="rgba(8,6,4,0.88)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="Bounty Quests · 31 Entries" color="rgba(184,134,11,0.2)" textColor={color} />
        <SectionTitle>Bounty Quests</SectionTitle>
        <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, marginBottom: 4, lineHeight: 1.4 }}>
          Activate from bounty boards in each region. Nayoro Blades (bnty_23–31) must be done in order.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 20px' }}>
          <div style={{ flex: 1 }}><MiniBar pct={pct} color={color} /></div>
          <span style={{ fontFamily: 'sans-serif', fontSize: 12, color }}>{doneCount} / {BOUNTY_QUESTS.length}</span>
        </div>
        <div className="quest-browser">
          <div style={{ flex: '0 0 44%', minWidth: 0 }}>
            <div className="quest-scroll" style={{ height: '100%' }}>
              {BOUNTY_QUESTS.map((q, i) => (
                <QuestRow key={q.id} quest={q} index={i} selected={q.id === selectedId}
                  onClick={() => setSelectedId(q.id)} accentColor={color}
                  checked={isChecked(q.id)}
                  onToggle={(e) => { e.stopPropagation(); toggle(q.id); }}
                />
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {selected && (
              <QuestDetail quest={selected}
                hasPrev={selectedIndex > 0} hasNext={selectedIndex < BOUNTY_QUESTS.length - 1}
                onPrev={() => setSelectedId(BOUNTY_QUESTS[selectedIndex - 1].id)}
                onNext={() => setSelectedId(BOUNTY_QUESTS[selectedIndex + 1].id)}
                accentColor={color}
              />
            )}
          </div>
        </div>
      </div>
    </SectionBg>
  );
}

// ── Section: Post-Story ───────────────────────────────────────────────────────

function PostStorySection() {
  const [selectedId, setSelectedId] = useState(POST_STORY[0].id);
  const { isChecked, toggle, countChecked } = useProgress();
  const selectedIndex = POST_STORY.findIndex(q => q.id === selectedId);
  const selected = POST_STORY[selectedIndex];
  const color = '#9B59B6';
  const allIds = POST_STORY.map(q => q.id);
  const doneCount = countChecked(allIds);
  const pct = (doneCount / POST_STORY.length) * 100;

  return (
    <SectionBg img={IMGS.blog5} overlay="rgba(6,4,14,0.88)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="Post-Story · 3 Quests" color="rgba(155,89,182,0.2)" textColor={color} />
        <SectionTitle>Epilogue Quests</SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 12px' }}>
          <div style={{ flex: 1 }}><MiniBar pct={pct} color={color} /></div>
          <span style={{ fontFamily: 'sans-serif', fontSize: 12, color }}>{doneCount} / {POST_STORY.length}</span>
        </div>
        <Card style={{ marginBottom: 20, padding: '12px 18px', background: 'rgba(155,89,182,0.08)', borderColor: 'rgba(155,89,182,0.3)' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4 }}>
            <span style={{ color, fontWeight: 700 }}>Completion order matters.</span> Complete <em>Embers of the Snake</em> and <em>The Weight of Silence</em> before attempting <em>Yōtei at First Snow</em> — it requires both.
          </p>
        </Card>
        <div className="quest-browser">
          <div style={{ flex: '0 0 44%', minWidth: 0 }}>
            <div className="quest-scroll" style={{ height: '100%' }}>
              {POST_STORY.map((q, i) => (
                <QuestRow key={q.id} quest={q} index={i} selected={q.id === selectedId}
                  onClick={() => setSelectedId(q.id)} accentColor={color}
                  checked={isChecked(q.id)}
                  onToggle={(e) => { e.stopPropagation(); toggle(q.id); }}
                />
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {selected && (
              <QuestDetail quest={selected}
                hasPrev={selectedIndex > 0} hasNext={selectedIndex < POST_STORY.length - 1}
                onPrev={() => setSelectedId(POST_STORY[selectedIndex - 1].id)}
                onNext={() => setSelectedId(POST_STORY[selectedIndex + 1].id)}
                accentColor={color}
              />
            )}
          </div>
        </div>
      </div>
    </SectionBg>
  );
}

// ── Fox Den Chain Tracker ─────────────────────────────────────────────────────

function FoxDenChainTracker({ done, total, color }: { done: number; total: number; color: string }) {
  const allDone = done === total;
  const steps = [
    { label: `All ${total} Fox Dens`, active: true, done: allDone },
    { label: 'Hunting Camp Hideout', active: allDone, done: false },
    { label: 'Fox Statue Puzzle', active: allDone, done: false },
    { label: 'Fox Mask', active: allDone, done: false },
    { label: '🏆 Guardian of Inari', active: allDone, done: false },
  ];
  return (
    <div style={{ marginBottom: 10 }}>
      {/* Progress row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }}>
          <div style={{ height: '100%', borderRadius: 3, background: color, width: `${(done / total) * 100}%`, transition: 'width 0.3s ease' }} />
        </div>
        <span style={{ fontFamily: 'sans-serif', fontSize: 11, color, fontWeight: 700, flexShrink: 0 }}>
          {done} of {total} complete
        </span>
      </div>
      {/* Chain steps */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap', marginBottom: 8 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{
              padding: '2px 7px', borderRadius: 10,
              fontFamily: 'sans-serif', fontSize: 9, fontWeight: 600,
              background: step.done ? `${color}30` : step.active ? `${color}14` : 'rgba(255,255,255,0.04)',
              color: step.done ? color : step.active ? `${color}CC` : 'rgba(240,237,232,0.25)',
              border: `1px solid ${step.done ? color + '60' : step.active ? color + '35' : 'rgba(255,255,255,0.08)'}`,
            }}>
              {step.done && '✓ '}{step.label}
            </div>
            {i < steps.length - 1 && (
              <span style={{ fontSize: 9, color: step.active ? `${color}70` : 'rgba(255,255,255,0.15)' }}>›</span>
            )}
          </div>
        ))}
      </div>
      {/* Final-step callout — shown only when all dens are done */}
      {allDone ? (
        <div style={{ padding: '10px 12px', borderRadius: 8, background: `${color}18`, border: `1px solid ${color}55`, marginBottom: 4 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>🦊</span>
            <div>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color, fontWeight: 700, marginBottom: 4 }}>
                All Fox Dens complete — one final step!
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: 'rgba(240,237,232,0.75)', lineHeight: 1.5, marginBottom: 3 }}>
                Travel to <strong style={{ color }}>Hunting Camp Hideout at Sanctuary Grove</strong> — northeast Teshio Ridge,
                accessible via Sarufutsu Lighthouse.
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: 'rgba(240,237,232,0.75)', lineHeight: 1.5 }}>
                Solve the fox statue door puzzle → receive the <strong style={{ color }}>Fox Mask</strong> → unlock <strong style={{ color }}>🏆 Guardian of Inari</strong>.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: 'rgba(240,237,232,0.35)', lineHeight: 1.4, marginBottom: 4 }}>
          Complete all {total} Fox Dens to unlock the final chain step at Hunting Camp Hideout (NE Teshio Ridge).
        </p>
      )}
    </div>
  );
}

// ── Ainu Items: route-grouped checklist ───────────────────────────────────────

const AINU_ROUTE_ORDER = [
  'Yotei Grasslands',
  'Ishikari Plain',
  'Teshio Ridge',
  'Tokachi Range',
  'Nayoro Wilds',
  'Oshima Coast',
] as const satisfies typeof REGION_NAMES;

function AinuRouteChecklist({ items, color }: { items: CollectibleItem[]; color: string }) {
  const { isChecked, toggle } = useProgress();

  const byRegion = AINU_ROUTE_ORDER.map(region => ({
    region,
    items: items.filter(item => item.region === region),
  }));

  const total = items.length;
  const done = items.filter(item => isChecked(item.id)).length;
  const allDone = done === total;

  return (
    <div>
      {/* Trade mechanic tip */}
      <div style={{ padding: '8px 10px', borderRadius: 7, background: `${color}14`, border: `1px solid ${color}35`, marginBottom: 10 }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: 10, color, fontWeight: 700, marginBottom: 3 }}>🌿 Trade mechanic</p>
        <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: 'rgba(240,237,232,0.75)', lineHeight: 1.5 }}>
          Trade all 30 to <strong style={{ color }}>Kaeka the Weaver</strong> at Husko Kotan (Nayoro Wilds) to fully upgrade the
          Robes for Sitturaynu outfit → 🏆 <strong style={{ color }}>Ainu Wanderer</strong>. Save Nayoro Wilds for last — you can
          trade immediately after clearing its 12 items.
        </p>
      </div>
      {/* Sweep order pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap', marginBottom: 10 }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: 9, color: 'rgba(240,237,232,0.35)', marginRight: 2 }}>SWEEP ORDER:</span>
        {byRegion.map(({ region, items: rItems }, i) => {
          const rDone = rItems.filter(item => isChecked(item.id)).length;
          const rComplete = rDone === rItems.length;
          return (
            <div key={region} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{
                padding: '2px 7px', borderRadius: 10,
                fontFamily: 'sans-serif', fontSize: 9, fontWeight: 600,
                background: rComplete ? `${color}30` : `${color}10`,
                color: rComplete ? color : 'rgba(240,237,232,0.45)',
                border: `1px solid ${rComplete ? color + '60' : 'rgba(255,255,255,0.1)'}`,
                whiteSpace: 'nowrap',
              }}>
                {rComplete && '✓ '}{i + 1}. {region.split(' ')[0]} ({rDone}/{rItems.length})
              </div>
              {i < byRegion.length - 1 && (
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.18)' }}>›</span>
              )}
            </div>
          );
        })}
      </div>
      {/* Per-region groups */}
      {byRegion.map(({ region, items: rItems }) => {
        if (rItems.length === 0) return null;
        const rDone = rItems.filter(item => isChecked(item.id)).length;
        const rComplete = rDone === rItems.length;
        return (
          <div key={region} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{
                fontFamily: 'sans-serif', fontSize: 9, fontWeight: 700,
                color: rComplete ? color : 'rgba(240,237,232,0.5)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                {rComplete ? '✓ ' : ''}{region}
              </span>
              <span style={{ fontFamily: 'sans-serif', fontSize: 9, color: rComplete ? color : 'rgba(240,237,232,0.3)' }}>
                {rDone}/{rItems.length}
              </span>
            </div>
            <div style={{ paddingLeft: 8, borderLeft: `2px solid ${rComplete ? color + '60' : 'rgba(255,255,255,0.1)'}` }}>
              {rItems.map(item => {
                const checked = isChecked(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 6, padding: '3px 4px',
                      borderRadius: 5, cursor: 'pointer', marginBottom: 2,
                      background: checked ? `${color}14` : 'transparent',
                    }}
                  >
                    <div style={{
                      width: 14, height: 14, borderRadius: 3, flexShrink: 0, marginTop: 2,
                      border: `1.5px solid ${checked ? color : 'rgba(255,255,255,0.2)'}`,
                      background: checked ? color : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.12s ease',
                    }}>
                      {checked && <span style={{ fontSize: 9, color: '#0a0a0f', fontWeight: 700, lineHeight: 1 }}>✓</span>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{
                        fontFamily: 'sans-serif', fontSize: 11,
                        color: checked ? 'rgba(240,237,232,0.4)' : 'rgba(240,237,232,0.85)',
                        textDecoration: checked ? 'line-through' : 'none',
                        lineHeight: 1.3,
                      }}>{item.name}</span>
                      {item.subArea && (
                        <p style={{
                          fontFamily: 'sans-serif', fontSize: 9,
                          color: 'rgba(240,237,232,0.3)', lineHeight: 1.3, marginTop: 1,
                        }}>
                          📍 {item.subArea}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {/* Trade callout when all 30 found */}
      {allDone && (
        <div style={{ padding: '10px 12px', borderRadius: 8, background: `${color}20`, border: `1px solid ${color}55`, marginTop: 4 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>🌿</span>
            <div>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color, fontWeight: 700, marginBottom: 4 }}>
                All 30 Ainu Items found — trade them now!
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: 'rgba(240,237,232,0.75)', lineHeight: 1.5 }}>
                Visit <strong style={{ color }}>Kaeka the Weaver</strong> at Husko Kotan (Nayoro Wilds) and trade all 30 items
                to fully upgrade the Robes for Sitturaynu outfit → 🏆 <strong style={{ color }}>Ainu Wanderer</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Section: Collectibles ─────────────────────────────────────────────────────

function CollectiblesSection() {
  const { isChecked, toggle, countChecked } = useProgress();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const totalDone = countChecked(ALL_COLLECTIBLE_IDS);
  const totalPct = (totalDone / COLLECTIBLE_TOTAL) * 100;
  const color = '#4A9B8E';

  return (
    <SectionBg img={IMGS.blog2} overlay="rgba(4,10,20,0.88)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label={`Collectibles · ${COLLECTIBLE_TOTAL} Total`} color="rgba(74,155,142,0.2)" textColor={color} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
          <SectionTitle>Collectibles</SectionTitle>
          <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: DIM }}>All available in free-roam · 0 missable</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 24px' }}>
          <div style={{ flex: 1 }}><MiniBar pct={totalPct} color={color} /></div>
          <span style={{ fontFamily: 'sans-serif', fontSize: 13, color, fontWeight: 700 }}>{totalDone} / {COLLECTIBLE_TOTAL}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
          {COLLECTIBLE_CATEGORIES.map(cat => {
            const ids = cat.items.map(item => item.id);
            const done = countChecked(ids);
            const pct = (done / cat.items.length) * 100;
            const isOpen = expandedKey === cat.key;
            return (
              <Card key={cat.key} style={{ padding: '16px 18px', borderColor: `${cat.color}40` }}>
                {/* Header — click to expand/collapse checklist */}
                <div
                  onClick={() => setExpandedKey(isOpen ? null : cat.key)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 20 }}>{cat.icon}</span>
                    <div style={{ flex: 1, fontFamily: 'sans-serif', fontSize: 11, color: WHITE, lineHeight: 1.3 }}>{cat.label}</div>
                    <div style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, color: cat.color }}>{done}/{cat.items.length}</div>
                  </div>
                  <MiniBar pct={pct} color={cat.color} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: DIM }}>🏆 {cat.trophy}</div>
                    <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: cat.color, opacity: 0.7 }}>{isOpen ? '▲ hide' : '▼ check off'}</div>
                  </div>
                </div>
                {/* Per-item checklist — real IDs and names from data model */}
                {isOpen && (
                  <div style={{ marginTop: 10, borderTop: `1px solid ${cat.color}25`, paddingTop: 10, maxHeight: 320, overflowY: 'auto' }}>
                    {cat.key === 'foxdens' ? (
                      <FoxDenChainTracker done={done} total={cat.items.length} color={cat.color} />
                    ) : cat.key === 'ainu' ? (
                      <AinuRouteChecklist items={cat.items} color={cat.color} />
                    ) : cat.catNote && (
                      <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: cat.color, lineHeight: 1.4, marginBottom: 8, opacity: 0.9 }}>{cat.catNote}</p>
                    )}
                    {cat.key !== 'foxdens' && cat.key !== 'ainu' && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
                        {cat.items.map(item => (
                          <CollectibleCheckItem
                            key={item.id} id={item.id}
                            label={item.name + (item.reward ? ` — ${item.reward}` : '') + (item.placeholder ? ' ⚠' : '')}
                            color={cat.color}
                            checked={isChecked(item.id)}
                            onToggle={() => toggle(item.id)}
                          />
                        ))}
                      </div>
                    )}
                    {done < cat.items.length && (
                      <button
                        onClick={() => ids.forEach(id => { if (!isChecked(id)) toggle(id); })}
                        style={{ marginTop: 8, width: '100%', padding: '5px', borderRadius: 5, border: `1px solid ${cat.color}40`, background: `${cat.color}14`, color: cat.color, fontFamily: 'sans-serif', fontSize: 10, cursor: 'pointer' }}
                      >
                        Mark all {cat.items.length} done
                      </button>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
        <Card style={{ padding: '14px 22px', background: 'rgba(201,168,76,0.06)' }}>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 10 }}>
            {REGIONS.map(r => (
              <div key={r.name} style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>📍 {r.name}</div>
            ))}
          </div>
          <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.5 }}>
            <span style={{ color: GOLD }}>Strategy:</span> Clear collectibles region-by-region after completing local quests — fast-travel hubs unlock progressively through story chapters. Do Shrine Climbs first in each region to unlock charm slots.
          </p>
        </Card>
      </div>
    </SectionBg>
  );
}

// ── Section: Activities ───────────────────────────────────────────────────────

function ActivitiesSection() {
  const { isChecked, toggle, countChecked } = useProgress();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const totalDone = countChecked(ALL_ACTIVITY_IDS);
  const totalPct = (totalDone / ACTIVITY_TOTAL) * 100;
  const color = '#4A9B8E';

  return (
    <SectionBg img={IMGS.blog3} overlay="rgba(4,12,22,0.88)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="World Activities" color="rgba(74,155,142,0.2)" textColor={color} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
          <SectionTitle>Activities &amp; World Content</SectionTitle>
          <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: DIM }}>{ACTIVITY_TOTAL} total activities</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 24px' }}>
          <div style={{ flex: 1 }}><MiniBar pct={totalPct} color={color} /></div>
          <span style={{ fontFamily: 'sans-serif', fontSize: 13, color, fontWeight: 700 }}>{totalDone} / {ACTIVITY_TOTAL}</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: '0 0 56%' }}>
            {ACTIVITY_CATEGORIES.map(cat => {
              const ids = cat.items.map(item => item.id);
              const done = countChecked(ids);
              const pct = (done / cat.items.length) * 100;
              const isOpen = expandedKey === cat.key;
              return (
                <div key={cat.key} style={{ marginBottom: 10, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: `1px solid ${isOpen ? cat.color + '50' : 'rgba(255,255,255,0.07)'}`, overflow: 'hidden' }}>
                  {/* Header row — click to expand */}
                  <div
                    onClick={() => setExpandedKey(isOpen ? null : cat.key)}
                    style={{ display: 'flex', gap: 14, padding: '14px 16px', alignItems: 'flex-start', cursor: 'pointer' }}
                  >
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{cat.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <span style={{ fontFamily: 'sans-serif', fontSize: 14, color: WHITE, fontWeight: 500 }}>{cat.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, marginLeft: 8 }}>
                          <span style={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 700, color: cat.color }}>{done} / {cat.items.length}</span>
                          <span style={{ fontFamily: 'sans-serif', fontSize: 10, color: cat.color, opacity: 0.7 }}>{isOpen ? '▲' : '▼'}</span>
                        </div>
                      </div>
                      <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4, marginBottom: 6 }}>{cat.desc}</p>
                      <MiniBar pct={pct} color={cat.color} />
                    </div>
                  </div>
                  {/* Expandable checklist — real IDs from data model */}
                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${cat.color}25`, padding: '10px 16px 14px', background: 'rgba(0,0,0,0.2)' }}>
                      {cat.catNote && (
                        <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: cat.color, lineHeight: 1.4, marginBottom: 8, opacity: 0.9 }}>{cat.catNote}</p>
                      )}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 4, marginBottom: 8 }}>
                        {cat.items.map(item => (
                          <CollectibleCheckItem
                            key={item.id} id={item.id}
                            label={item.name + (item.placeholder ? ' ⚠' : '')}
                            color={cat.color}
                            checked={isChecked(item.id)}
                            onToggle={() => toggle(item.id)}
                          />
                        ))}
                      </div>
                      {done < cat.items.length && (
                        <button
                          onClick={() => ids.forEach(id => { if (!isChecked(id)) toggle(id); })}
                          style={{ width: '100%', padding: '5px', borderRadius: 5, border: `1px solid ${cat.color}40`, background: `${cat.color}14`, color: cat.color, fontFamily: 'sans-serif', fontSize: 10, cursor: 'pointer' }}
                        >
                          Mark all {cat.items.length} done
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD, marginBottom: 14 }}>World Completion Tips</h3>
              {[
                { n: '1', tip: 'Shamisen Songs reveal nearby collectibles on the map — clear them first in each region for fast sweeps' },
                { n: '2', tip: 'Clear Yotei Six Camps early to unlock fast-travel hubs across all six regions' },
                { n: '3', tip: 'Complete all 11 Fox Dens, then visit Hunting Camp Hideout (Teshio Ridge, via Sarufutsu Lighthouse) for the Fox Mask' },
                { n: '4', tip: 'Win Zeni Hajiki twice at each table — first win gives only coins, second awards the charm and marks it complete' },
                { n: '5', tip: '4 Sensei Tale ally posters look like bounties but are NOT counted toward the 31 Bounties' },
              ].map(item => (
                <div key={item.n} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: GOLD20, border: `1px solid ${GOLD40}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
                  <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4, paddingTop: 2 }}>{item.tip}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </SectionBg>
  );
}

// ── Section: Equipment ────────────────────────────────────────────────────────

function EquipmentSection() {
  const [tab, setTab] = useState(0);
  const tabs = ['⚔️ Weapons', '🛡️ Armour', '💎 Charms'];
  const data = [WEAPONS, ARMOUR, CHARMS];
  const cols = [['Name','Tier','Notes'],['Name','Region','Notes'],['Name','Slot','Notes']];

  return (
    <SectionBg img={IMGS.mob4} overlay="rgba(5,8,18,0.90)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="Equipment Reference" color={GOLD20} />
        <SectionTitle>Weapons, Armour &amp; Upgrades</SectionTitle>
        <GoldLine />
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {tabs.map((t, i) => (
            <button key={i} className={`tab-btn ${i === tab ? 'active' : ''}`} onClick={() => setTab(i)}
              style={{ padding: '8px 22px', borderRadius: 8, border: `1px solid ${GOLD40}`, fontFamily: 'sans-serif', fontSize: 13, cursor: 'pointer', background: i === tab ? GOLD : 'rgba(201,168,76,0.08)', color: i === tab ? DARK : DIM }}>
              {t}
            </button>
          ))}
        </div>
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 3fr', gap: 12, marginBottom: 12, borderBottom: `1px solid ${GOLD40}`, paddingBottom: 8 }}>
            {cols[tab].map(h => <span key={h} style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>)}
          </div>
          {(data[tab] as any[]).map((row, i) => (
            <div key={row.id ?? i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 3fr', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: WHITE }}>
                {row.name}
                {row.placeholder && <span style={{ fontSize: 9, color: '#B8860B', marginLeft: 5 }}>⚠ unverified</span>}
              </span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {tab === 0 ? <TierDots filled={row.tier} /> : <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>{tab === 1 ? row.region : `Slot ${row.slot}`}</span>}
              </span>
              <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4 }}>{row.note}</span>
            </div>
          ))}
        </Card>
        <Card style={{ marginTop: 14, padding: '12px 20px', background: 'rgba(201,168,76,0.06)' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>
            <span style={{ color: GOLD, fontWeight: 700 }}>Charm Slots:</span> Unlock via Shrine Climbs — 1 slot per shrine. 13 shrines = 13 charm slots max. Each slot can hold any one charm independently.
          </p>
        </Card>
      </div>
    </SectionBg>
  );
}

// ── Section: Items ────────────────────────────────────────────────────────────

const ITEM_TYPE_COLORS: Record<string, string> = {
  crafting_material:   '#4A9B8E',
  quest_item:          '#C9A84C',
  upgrade_material:    '#8B5CF6',
  merchant_item:       '#4682B4',
  collectible_related: '#B8860B',
};

function ItemsSection() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ItemType | 'all'>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [selectedId, setSelectedId] = useState<string | null>(ITEMS[0]?.id ?? null);

  // All filter options derived from data
  const allTypes = Object.keys(ITEM_TYPE_LABELS) as ItemType[];
  const allRegions = [...new Set(ITEMS.flatMap(item => item.locations.map(loc => loc.region)))].sort();

  // Filter logic
  const filtered = ITEMS.filter(item => {
    const matchQuery   = query.trim() === '' || item.name.toLowerCase().includes(query.toLowerCase());
    const matchType    = typeFilter === 'all' || item.type === typeFilter;
    const matchRegion  = regionFilter === 'all' || item.locations.some(loc => loc.region === regionFilter);
    return matchQuery && matchType && matchRegion;
  });

  // Keep selected in sync when filters change
  const selectedItem = filtered.find(i => i.id === selectedId) ?? filtered[0] ?? null;

  const color = '#C9A84C';
  const dim = 'rgba(240,237,232,0.65)';

  return (
    <SectionBg img={IMGS.blog3} overlay="rgba(4,8,20,0.90)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label={`Item Location Search · ${ITEM_TOTAL} Items`} color="rgba(201,168,76,0.15)" />
        <SectionTitle><span style={{ color: GOLD }}>Item</span> Location Search</SectionTitle>
        <GoldLine />
        <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, marginBottom: 20, lineHeight: 1.5, maxWidth: 600 }}>
          Find where any item is obtained, what it is used for, and which quests or crafting recipes require it. Items marked ⚠ are unverified against the shipped game.
        </p>

        {/* Search bar */}
        <div style={{ marginBottom: 14 }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search items by name…"
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 16px', borderRadius: 8,
              border: `1px solid ${GOLD}40`,
              background: 'rgba(10,10,20,0.72)', color: WHITE,
              fontFamily: 'sans-serif', fontSize: 13,
              outline: 'none',
            }}
          />
        </div>

        {/* Type filters */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {(['all', ...allTypes] as const).map(t => {
            const active = t === typeFilter;
            const col = t === 'all' ? GOLD : ITEM_TYPE_COLORS[t];
            return (
              <button key={t} onClick={() => setTypeFilter(t)}
                style={{
                  padding: '4px 10px', borderRadius: 4, cursor: 'pointer',
                  border: `1px solid ${col}40`, fontFamily: 'sans-serif',
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  background: active ? `${col}25` : 'transparent',
                  color: active ? col : 'rgba(240,237,232,0.4)',
                  transition: 'all 0.15s',
                }}>
                {t === 'all' ? 'All Types' : ITEM_TYPE_LABELS[t]}
              </button>
            );
          })}
        </div>

        {/* Region filters */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {(['all', ...allRegions] as const).map(r => {
            const active = r === regionFilter;
            const regionCol = r === 'all' ? '#4682B4' : (REGION_COLOR[r] || '#4682B4');
            return (
              <button key={r} onClick={() => setRegionFilter(r)}
                style={{
                  padding: '4px 10px', borderRadius: 4, cursor: 'pointer',
                  border: `1px solid ${regionCol}40`, fontFamily: 'sans-serif',
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  background: active ? `${regionCol}25` : 'transparent',
                  color: active ? regionCol : 'rgba(240,237,232,0.4)',
                  transition: 'all 0.15s',
                }}>
                {r === 'all' ? 'All Regions' : r.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Split layout: list + detail */}
        <div className="quest-browser">
          {/* Left: item list */}
          <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, marginBottom: 10 }}>
              {filtered.length} of {ITEM_TOTAL} items
            </p>
            <div className="quest-scroll" style={{ flex: 1 }}>
              {filtered.length === 0 ? (
                <div style={{ padding: '24px 16px', textAlign: 'center', color: DIM, fontFamily: 'sans-serif', fontSize: 13 }}>
                  No items match your search.
                </div>
              ) : filtered.map(item => {
                const isSelected = item.id === selectedItem?.id;
                const typeColor = ITEM_TYPE_COLORS[item.type] || GOLD;
                const rarityColor = RARITY_COLORS[item.rarity];
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '10px 12px', borderRadius: 8, marginBottom: 4,
                      cursor: 'pointer',
                      background: isSelected ? `${typeColor}18` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isSelected ? typeColor + '60' : 'rgba(255,255,255,0.06)'}`,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {/* Rarity pip */}
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%', marginTop: 4, flexShrink: 0,
                      background: rarityColor,
                      boxShadow: isSelected ? `0 0 6px ${rarityColor}` : 'none',
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <span style={{
                          fontFamily: 'sans-serif', fontSize: 12,
                          color: isSelected ? WHITE : 'rgba(240,237,232,0.85)',
                          fontWeight: isSelected ? 600 : 400,
                          flex: 1, minWidth: 0,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {item.name}
                        </span>
                        {item.placeholder && (
                          <span title="Unverified" style={{ fontSize: 10, color: '#F59E0B', flexShrink: 0 }}>⚠</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{
                          fontFamily: 'sans-serif', fontSize: 9, fontWeight: 700,
                          color: typeColor, background: `${typeColor}15`,
                          padding: '1px 5px', borderRadius: 3,
                          textTransform: 'uppercase', letterSpacing: '0.04em',
                        }}>
                          {ITEM_TYPE_LABELS[item.type]}
                        </span>
                        <span style={{
                          fontFamily: 'sans-serif', fontSize: 9,
                          color: dim, padding: '1px 5px',
                          background: 'rgba(255,255,255,0.04)', borderRadius: 3,
                          textTransform: 'capitalize',
                        }}>
                          {item.rarity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: item detail */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {!selectedItem ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: DIM, fontFamily: 'sans-serif', fontSize: 13 }}>
                Select an item to see its locations and uses
              </div>
            ) : (
              <div style={{ background: 'rgba(10,10,20,0.72)', backdropFilter: 'blur(12px)', border: `1px solid ${GOLD}40`, borderRadius: 12, padding: '20px 24px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                      <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: WHITE, lineHeight: 1.2, margin: 0 }}>
                        {selectedItem.name}
                      </h3>
                      {selectedItem.placeholder && (
                        <span style={{
                          fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700,
                          color: '#F59E0B', background: 'rgba(245,158,11,0.15)',
                          border: '1px solid rgba(245,158,11,0.3)',
                          padding: '2px 8px', borderRadius: 4,
                          textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>
                          ⚠ Unverified
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700,
                        color: ITEM_TYPE_COLORS[selectedItem.type],
                        background: `${ITEM_TYPE_COLORS[selectedItem.type]}15`,
                        padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.05em',
                      }}>
                        {ITEM_TYPE_LABELS[selectedItem.type]}
                      </span>
                      <span style={{
                        fontFamily: 'sans-serif', fontSize: 10,
                        color: RARITY_COLORS[selectedItem.rarity],
                        background: `${RARITY_COLORS[selectedItem.rarity]}15`,
                        padding: '2px 8px', borderRadius: 4, textTransform: 'capitalize',
                      }}>
                        {selectedItem.rarity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.55, marginBottom: 18 }}>
                  {selectedItem.description}
                </p>

                {/* Locations */}
                <div style={{ marginBottom: 18 }}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                    📍 Where to Find It
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {selectedItem.locations.map((loc, i) => {
                      const regionColor = REGION_COLOR[loc.region] || '#4A9B8E';
                      return (
                        <div key={i} style={{
                          padding: '10px 14px', borderRadius: 8,
                          background: `${regionColor}0d`,
                          border: `1px solid ${regionColor}25`,
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                            <span style={{
                              fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700,
                              color: regionColor, textTransform: 'uppercase', letterSpacing: '0.04em',
                            }}>
                              {loc.region}
                              {loc.subArea ? ` — ${loc.subArea}` : ''}
                            </span>
                            <span style={{
                              fontFamily: 'sans-serif', fontSize: 9,
                              color: DIM, background: 'rgba(255,255,255,0.06)',
                              padding: '1px 6px', borderRadius: 3,
                            }}>
                              {SOURCE_TYPE_ICONS[loc.sourceType]} {SOURCE_TYPE_LABELS[loc.sourceType]}
                            </span>
                          </div>
                          <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, lineHeight: 1.45, margin: 0 }}>
                            {loc.notes}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Uses */}
                {selectedItem.usedFor.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                      🔧 Used For
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {selectedItem.usedFor.map((use, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4 }}>
                          <span style={{ color: GOLD, fontSize: 8, marginTop: 5, flexShrink: 0 }}>◆</span>
                          {use}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quest links */}
                {selectedItem.requiredForQuests.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                      ⚔️ Required For Quests
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {selectedItem.requiredForQuests.map(qId => (
                        <span key={qId} style={{
                          fontFamily: 'sans-serif', fontSize: 10,
                          color: GOLD, background: 'rgba(201,168,76,0.12)',
                          border: `1px solid ${GOLD}30`,
                          padding: '2px 8px', borderRadius: 4,
                        }}>
                          {qId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Crafting links */}
                {selectedItem.requiredForCrafting.length > 0 && (
                  <div>
                    <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                      🔨 Required For Crafting
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {selectedItem.requiredForCrafting.map(recipe => (
                        <span key={recipe} style={{
                          fontFamily: 'sans-serif', fontSize: 10,
                          color: '#8B5CF6', background: 'rgba(139,92,246,0.12)',
                          border: '1px solid rgba(139,92,246,0.3)',
                          padding: '2px 8px', borderRadius: 4,
                        }}>
                          {recipe}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionBg>
  );
}

// ── Section: Resources ────────────────────────────────────────────────────────

const RARITY_COLORS_RES: Record<string, string> = {
  common:   '#9CA3AF',
  uncommon: '#4A9B8E',
  rare:     '#C9A84C',
};

function ResourcesSection() {
  const color = '#4A9B8E';

  return (
    <SectionBg img={IMGS.blog2} overlay="rgba(4,12,20,0.90)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label={`Resources · ${RESOURCE_TOTAL} Types`} color="rgba(74,155,142,0.2)" textColor={color} />
        <SectionTitle><span style={{ color: GOLD }}>Resources</span> &amp; Materials</SectionTitle>
        <GoldLine />
        <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, marginBottom: 20, lineHeight: 1.5, maxWidth: 700 }}>
          Crafting and upgrade materials used throughout the game. All entries are verified from in-game sources.
          Common resources respawn over time; rare resources are limited in each region.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {RESOURCES.map(res => {
            const rarityColor = RARITY_COLORS_RES[res.rarity] || GOLD;
            return (
              <Card key={res.id} style={{ padding: '14px 18px', borderColor: `${rarityColor}35` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: WHITE, flex: 1, lineHeight: 1.2 }}>{res.name}</span>
                  <span style={{
                    fontFamily: 'sans-serif', fontSize: 9, fontWeight: 700,
                    color: rarityColor, background: `${rarityColor}20`,
                    padding: '2px 6px', borderRadius: 3,
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}>{res.rarity}</span>
                </div>
                <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, lineHeight: 1.4, marginBottom: 6 }}>
                  <span style={{ color: GOLD, fontWeight: 700 }}>Found: </span>{res.howToGet}
                </p>
                <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, lineHeight: 1.4 }}>
                  <span style={{ color: rarityColor, fontWeight: 700 }}>Uses: </span>{res.uses}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </SectionBg>
  );
}

// ── Section: Merchants ────────────────────────────────────────────────────────

const VENDOR_ICONS: Record<string, string> = {
  general:      '🛒',
  blacksmith:   '⚔️',
  bowyer:       '🏹',
  dye_house:    '🎨',
  ainu_trader:  '🌿',
  musician:     '🎵',
  mask_artisan: '🎭',
  food_vendor:  '🍱',
};

function MerchantsSection() {
  const color = '#B8860B';

  return (
    <SectionBg img={IMGS.blog3} overlay="rgba(8,6,4,0.90)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label={`Merchants · ${MERCHANT_TOTAL} Vendors`} color="rgba(184,134,11,0.2)" textColor={color} />
        <SectionTitle><span style={{ color: GOLD }}>Merchants</span> &amp; Traders</SectionTitle>
        <GoldLine />
        <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, marginBottom: 20, lineHeight: 1.5, maxWidth: 700 }}>
          All confirmed vendors and traders. Entries marked ⚠ have verified names but unconfirmed sub-area locations.
          Dye houses unlock unique cosmetic colours for all armour sets.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {MERCHANTS.map(merch => (
            <Card key={merch.id} style={{ padding: '14px 18px', borderColor: merch.placeholder ? 'rgba(184,134,11,0.2)' : `${color}40` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{VENDOR_ICONS[merch.vendorType] || '🛒'}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: WHITE }}>{merch.name}</span>
                    {merch.placeholder && <span style={{ fontSize: 9, color: '#B8860B' }}>⚠</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 10, color: DIM }}>
                      📍 {merch.region}{merch.subArea ? ` · ${merch.subArea}` : ''}
                    </span>
                  </div>
                  <span style={{
                    display: 'inline-block', marginTop: 4,
                    fontFamily: 'sans-serif', fontSize: 9, fontWeight: 700,
                    color, background: `${color}15`,
                    padding: '1px 6px', borderRadius: 3,
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>{VENDOR_TYPE_LABELS[merch.vendorType] || merch.vendorType}</span>
                </div>
              </div>
              {merch.inventory.length > 0 && (
                <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, lineHeight: 1.4, marginBottom: merch.notes ? 4 : 0 }}>
                  <span style={{ color: GOLD, fontWeight: 700 }}>Sells: </span>{merch.inventory.join(', ')}
                </p>
              )}
              {merch.unlockRequirement && (
                <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: 'rgba(240,237,232,0.5)', lineHeight: 1.3, marginTop: 4 }}>
                  🔒 {merch.unlockRequirement}
                </p>
              )}
              {merch.notes && (
                <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, lineHeight: 1.4, marginTop: 4 }}>{merch.notes}</p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </SectionBg>
  );
}

// ── Section: Missables ────────────────────────────────────────────────────────

function MissablesSection() {
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
    <SectionBg img={IMGS.blog4} overlay="rgba(6,4,14,0.88)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="Endgame Cleanup" color="rgba(139,26,26,0.2)" textColor="#ef4444" />
        <SectionTitle>Missables &amp; Endgame Cleanup</SectionTitle>
        <GoldLine />
        <div style={{ padding: '18px 28px', borderRadius: 12, marginBottom: 24, background: 'linear-gradient(135deg, rgba(74,155,142,0.12), rgba(74,155,142,0.06))', border: '2px solid rgba(74,155,142,0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 36 }}>✅</span>
            <div>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#4A9B8E' }}>0 Truly Missable Quests</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: DIM, marginTop: 4 }}>Ghost of Yōtei is fully free-roam friendly. Every quest, collectible, and trophy remains available after the story credits roll.</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <Card>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: GOLD, marginBottom: 16 }}>Post-Story Cleanup Checklist</h3>
              {cleanup.map((item, i) => (
                <StepCheckRow key={i} stepId={`post-story-cleanup-${i}`} label={item} />
              ))}
            </Card>
          </div>
          <div style={{ flex: '0 0 38%', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(139,26,26,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>⚠ KNOWN BUG WARNING</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.5 }}>
                <strong style={{ color: WHITE }}>Bounty Quest bnty_04 (Black Powder Ippei):</strong> Ippei may fail to appear if Oshima Coast was cleared in a specific order. Fast-travel away and back to reset the spawn.
              </p>
            </div>
            <Card>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD, marginBottom: 14 }}>Post-Story Quests</h3>
              {[
                { title: 'Embers of the Snake',   note: "Epilogue — confront the Snake's legacy" },
                { title: 'The Weight of Silence', note: 'Jubei companion quest conclusion' },
                { title: 'Yōtei at First Snow',   note: 'True ending — requires all Sensei Tales' },
              ].map((q, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <StepCheckRow stepId={`post-story-quest-${i}`} label={`${q.title} — ${q.note}`} />
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </SectionBg>
  );
}

// ── Section: Progress ─────────────────────────────────────────────────────────

// All quests grouped by region for the Progress section
const ALL_QUESTS_BY_REGION: Record<string, string[]> = (() => {
  const all = [...MAIN_STORY, ...SIDE_TALES, ...MYTHIC_TALES, ...SENSEI_TALES, ...BOUNTY_QUESTS, ...POST_STORY];
  const map: Record<string, string[]> = {};
  for (const q of all) {
    if (!map[q.region]) map[q.region] = [];
    map[q.region].push(q.id);
  }
  return map;
})();

function ProgressSection() {
  const { countChecked } = useProgress();
  const R = 28; const C = 2 * Math.PI * R;

  return (
    <SectionBg img={IMGS.ps2} overlay="rgba(4,6,18,0.88)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="Regional Progress" />
        <SectionTitle>Progress Tracking</SectionTitle>
        <GoldLine />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {REGIONS.map(r => {
            // All IDs derived from data — no hardcoded counts
            const questIds       = ALL_QUESTS_BY_REGION[r.name] || [];
            const collectibleIds = COLLECTIBLES_BY_REGION[r.name] || [];
            const activityIds    = ACTIVITIES_BY_REGION[r.name] || [];

            const questDone = countChecked(questIds);
            const collDone  = countChecked(collectibleIds);
            const actDone   = countChecked(activityIds);

            const questPct = questIds.length       > 0 ? (questDone / questIds.length)       * 100 : 0;
            const collPct  = collectibleIds.length  > 0 ? (collDone  / collectibleIds.length)  * 100 : 0;
            const actPct   = activityIds.length     > 0 ? (actDone   / activityIds.length)     * 100 : 0;

            // Ring = average of all three content types
            const ringPct    = (questPct + collPct + actPct) / 3;
            const ringOffset = C - (C * ringPct / 100);

            return (
              <Card key={r.abbr} style={{ borderColor: `${r.color}40` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <svg width={70} height={70} style={{ flexShrink: 0 }}>
                    <circle cx={35} cy={35} r={R} fill="none" strokeWidth={5} className="ring-track" />
                    <circle cx={35} cy={35} r={R} fill="none" strokeWidth={5} stroke={r.color} strokeDasharray={C} strokeDashoffset={ringOffset} transform="rotate(-90 35 35)" strokeLinecap="round" />
                    <text x={35} y={39} textAnchor="middle" fill={r.color} fontSize={13} fontFamily="sans-serif" fontWeight="bold">{Math.round(ringPct)}%</text>
                  </svg>
                  <div>
                    <div style={{ fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: r.color, fontWeight: 700, marginBottom: 4 }}>{r.abbr}</div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: WHITE, lineHeight: 1.3 }}>{r.name}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, width: 80 }}>Quests</span>
                    <div style={{ flex: 1 }}><MiniBar pct={questPct} color={GOLD} /></div>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, width: 40, textAlign: 'right' }}>{questDone}/{questIds.length}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, width: 80 }}>Collectibles</span>
                    <div style={{ flex: 1 }}><MiniBar pct={collPct} color={r.color} /></div>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: r.color, width: 40, textAlign: 'right' }}>{collDone}/{collectibleIds.length}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, width: 80 }}>Activities</span>
                    <div style={{ flex: 1 }}><MiniBar pct={actPct} color="#4A9B8E" /></div>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#4A9B8E', width: 40, textAlign: 'right' }}>{actDone}/{activityIds.length}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </SectionBg>
  );
}

// ── Section: Dashboard ────────────────────────────────────────────────────────

// ── Quest category IDs — derived from data arrays, never hardcoded ────────────
const QUEST_CATEGORIES = [
  { label: 'Main Story',    ids: MAIN_STORY.map(q => q.id),    color: '#C9A84C' },
  { label: 'Side Tales',    ids: SIDE_TALES.map(q => q.id),    color: '#4A9B8E' },
  { label: 'Mythic Tales',  ids: MYTHIC_TALES.map(q => q.id),  color: '#8B1A1A' },
  { label: 'Sensei Tales',  ids: SENSEI_TALES.map(q => q.id),  color: '#7B68EE' },
  { label: 'Bounty Quests', ids: BOUNTY_QUESTS.map(q => q.id), color: '#B8860B' },
  { label: 'Post-Story',    ids: POST_STORY.map(q => q.id),    color: '#9B59B6' },
];

const TOTAL_QUESTS = QUEST_CATEGORIES.reduce((s, c) => s + c.ids.length, 0);

function DashboardSection() {
  const { countChecked } = useProgress();

  const trophyTiers = [
    { tier: 'Platinum', icon: '🏅', count: 1,  color: '#E5E4E2' },
    { tier: 'Gold',     icon: '🥇', count: 7,  color: '#FFD700' },
    { tier: 'Silver',   icon: '🥈', count: 18, color: '#C0C0C0' },
    { tier: 'Bronze',   icon: '🥉', count: 28, color: '#CD7F32' },
  ];

  // All counts derived from data — no hardcoded totals
  const questsDone = QUEST_CATEGORIES.reduce((s, c) => s + countChecked(c.ids), 0);
  const questsPct  = TOTAL_QUESTS > 0 ? (questsDone / TOTAL_QUESTS) * 100 : 0;

  const collDone = countChecked(ALL_COLLECTIBLE_IDS);
  const collPct  = COLLECTIBLE_TOTAL > 0 ? (collDone / COLLECTIBLE_TOTAL) * 100 : 0;

  const actDone = countChecked(ALL_ACTIVITY_IDS);
  const actPct  = ACTIVITY_TOTAL > 0 ? (actDone / ACTIVITY_TOTAL) * 100 : 0;

  return (
    <SectionBg img={IMGS.mob5} overlay="rgba(4,6,16,0.90)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="Completion Dashboard" />
        <SectionTitle>Full Completion Overview</SectionTitle>
        <GoldLine />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}>
          {[
            { label: 'Quests',       done: questsDone, total: TOTAL_QUESTS, sub: '6 categories', color: GOLD,      pct: questsPct },
            { label: 'Collectibles', done: collDone,   total: COLLECTIBLE_TOTAL, sub: '13 categories', color: '#4A9B8E', pct: collPct  },
            { label: 'Activities',   done: actDone,    total: ACTIVITY_TOTAL,    sub: '8 types',       color: '#4682B4', pct: actPct   },
            { label: 'Trophies',     done: 0,          total: 54,           sub: '1 Platinum',   color: '#E5E4E2', pct: 0        },
          ].map(s => (
            <Card key={s.label} style={{ textAlign: 'center', padding: '18px 22px' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: s.color }}>{s.done} / {s.total}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, marginTop: 2 }}>{s.sub}</div>
              <MiniBar pct={s.pct} color={s.color} />
            </Card>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14 }}>
          <Card>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD, marginBottom: 16 }}>Quest Categories</h3>
            {QUEST_CATEGORIES.map(c => {
              const done = countChecked([...c.ids]);
              const pct = (done / c.ids.length) * 100;
              return (
                <div key={c.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: WHITE }}>{c.label}</span>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: c.color }}>{done} / {c.ids.length}</span>
                  </div>
                  <MiniBar pct={pct} color={c.color} />
                </div>
              );
            })}
          </Card>
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
    </SectionBg>
  );
}

// ── Section: Strategy ─────────────────────────────────────────────────────────

function StrategySection() {
  const steps = [
    { n: '01', title: 'Main Story',            hours: '~8–10h',  desc: 'Follow the 10 main story quests in order. Boss fights unlock stances and abilities critical for side content.' },
    { n: '02', title: 'Regional Side Quests',  hours: '~18–22h', desc: 'Clear Side Tales, Sensei Tales, and Bounty Quests region-by-region as you unlock each area through story progress.' },
    { n: '03', title: 'Collectibles by Region',hours: '~12–16h', desc: `Use the guide's regional hints to sweep each of the 6 regions for all ${COLLECTIBLE_TOTAL} collectibles. Fox Dens for charms, Shrine Climbs for charm slots first.` },
    { n: '04', title: 'Mythic Tales + Cleanup',hours: '~6–8h',   desc: 'Complete all 7 Mythic Tales (some require story completion). Then run the post-story cleanup checklist.' },
    { n: '05', title: 'Trophy Cleanup',        hours: '~2–4h',   desc: 'Cross-reference the trophy list against your progress. The Platinum unlocks automatically when all 53 other trophies are earned.' },
  ];

  return (
    <SectionBg img={IMGS.blog5} overlay="rgba(4,4,14,0.88)">
      <div style={{ padding: '60px 48px' }}>
        <Tag label="Completion Strategy" />
        <SectionTitle>Recommended 100% Order</SectionTitle>
        <GoldLine />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
          {steps.map((step, i) => (
            <Card key={i} style={{ display: 'flex', flexDirection: 'column', borderColor: i === 4 ? GOLD : GOLD40 }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 40, color: i === 4 ? GOLD : 'rgba(201,168,76,0.2)', marginBottom: 8, lineHeight: 1 }}>{step.n}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: WHITE, marginBottom: 6, lineHeight: 1.3 }}>{step.title}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: GOLD, fontWeight: 700, marginBottom: 10 }}>{step.hours}</div>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, lineHeight: 1.5, flex: 1 }}>{step.desc}</p>
              {i === 4 && <div style={{ marginTop: 12, padding: '8px', borderRadius: 6, background: GOLD20, textAlign: 'center' }}><span style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700 }}>🏅 Platinum</span></div>}
            </Card>
          ))}
        </div>
        <div style={{ padding: '24px 36px', borderRadius: 12, textAlign: 'center', background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.05))', border: `1px solid ${GOLD40}` }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 24, color: WHITE, letterSpacing: '0.04em' }}>You've Got This, <span style={{ color: GOLD }}>Atsu.</span></p>
          <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: DIM, marginTop: 10 }}>Total estimated time: <strong style={{ color: WHITE }}>46–60 hours</strong> · Zero missables · Free-roam friendly throughout</p>
        </div>
      </div>
    </SectionBg>
  );
}

// ── Reset Confirmation Dialog ─────────────────────────────────────────────────

function ResetDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div
      onClick={onCancel}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(4,4,12,0.80)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0f0f1a', border: `1px solid ${GOLD40}`,
          borderRadius: 14, padding: '32px 36px', maxWidth: 380, width: '90%',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
        }}
      >
        <div style={{ fontSize: 36, textAlign: 'center', marginBottom: 16 }}>⚠️</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: WHITE, textAlign: 'center', marginBottom: 10 }}>
          Start Fresh?
        </h2>
        <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: DIM, lineHeight: 1.6, textAlign: 'center', marginBottom: 28 }}>
          This will clear <span style={{ color: WHITE }}>all checked progress</span> — quests, collectibles, and activities — from this browser. This cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '10px', borderRadius: 8,
              border: `1px solid rgba(255,255,255,0.12)`,
              background: 'rgba(255,255,255,0.05)', color: DIM,
              fontFamily: 'sans-serif', fontSize: 13, cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '10px', borderRadius: 8,
              border: '1px solid rgba(239,68,68,0.5)',
              background: 'rgba(239,68,68,0.15)', color: '#ef4444',
              fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ activeSection, onNav, collapsed, onToggle }: { activeSection: string; onNav: (id: string) => void; collapsed: boolean; onToggle: () => void }) {
  const { reset } = useProgress();
  const [showResetDialog, setShowResetDialog] = useState(false);

  const groups = [
    { key: 'guide',  label: 'Guide' },
    { key: 'quests', label: 'Quests' },
    { key: 'world',  label: 'World' },
    { key: 'status', label: 'Completion' },
  ];

  function handleConfirmReset() {
    reset();
    setShowResetDialog(false);
  }

  return (
    <>
      {showResetDialog && (
        <ResetDialog
          onConfirm={handleConfirmReset}
          onCancel={() => setShowResetDialog(false)}
        />
      )}

      {/* Collapse toggle */}
      <button className="sidebar-toggle" onClick={onToggle} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        {collapsed ? '›' : '‹'}
      </button>

      {/* Logo header — hidden when collapsed */}
      <div className="sidebar-logo" style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${GOLD20}`, flexShrink: 0 }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase', marginBottom: 6, opacity: 0.8 }}>Complete Guide</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: WHITE, lineHeight: 1.25, letterSpacing: '0.04em' }}>Ghost of Yōtei</h1>
        <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: DIM, marginTop: 4, letterSpacing: '0.06em' }}>100% Completion</p>
      </div>

      {/* Mini logo shown when collapsed */}
      <div className="sidebar-logo-collapsed">鎧</div>

      {/* Navigation */}
      <nav style={{ padding: '12px 10px', flex: 1 }}>
        {groups.map(group => (
          <div key={group.key}>
            <p className="nav-group-label">{group.label}</p>
            {NAV.filter(n => n.group === group.key).map(item => (
              <button key={item.id} className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onNav(item.id)}
                title={collapsed ? item.label : undefined}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {'count' in item && item.count != null && (
                  <span style={{ fontFamily: 'sans-serif', fontSize: 10, opacity: 0.45 }}>{item.count}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '14px 16px', borderTop: `1px solid ${GOLD20}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
          {[['119','Quests'],[String(COLLECTIBLE_TOTAL),'Collectibles'],['54','Trophies']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD }}>{n}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 9, color: DIM, letterSpacing: '0.04em' }}>{l}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowResetDialog(true)}
          style={{
            width: '100%', padding: '7px 10px', borderRadius: 7,
            border: '1px solid rgba(239,68,68,0.25)',
            background: 'rgba(239,68,68,0.06)', color: 'rgba(239,68,68,0.6)',
            fontFamily: 'sans-serif', fontSize: 11, cursor: 'pointer',
            letterSpacing: '0.04em', transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,68,68,0.5)';
            (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.12)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,68,68,0.25)';
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(239,68,68,0.6)';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.06)';
          }}
        >
          ↺ Start Fresh
        </button>
      </div>
    </>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'overview',      Component: OverviewSection      },
  { id: 'main-story',    Component: MainStorySection     },
  { id: 'side-tales',    Component: SideTalesSection     },
  { id: 'mythic-tales',  Component: MythicTalesSection   },
  { id: 'sensei-tales',  Component: SenseiTalesSection   },
  { id: 'bounty-quests', Component: BountyQuestsSection  },
  { id: 'post-story',    Component: PostStorySection     },
  { id: 'collectibles',  Component: CollectiblesSection  },
  { id: 'activities',    Component: ActivitiesSection    },
  { id: 'equipment',     Component: EquipmentSection     },
  { id: 'items',         Component: ItemsSection         },
  { id: 'resources',     Component: ResourcesSection     },
  { id: 'merchants',     Component: MerchantsSection     },
  { id: 'missables',     Component: MissablesSection     },
  { id: 'progress',      Component: ProgressSection      },
  { id: 'dashboard',     Component: DashboardSection     },
  { id: 'strategy',      Component: StrategySection      },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const progressValue = useProgressState();

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: '-10% 0px -60% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (isMobile) setMobileOpen(false);
  }, [isMobile]);

  return (
    <ProgressContext.Provider value={progressValue}>
    <div style={{ display: 'flex', minHeight: '100vh', background: DARK }}>
      {/* Desktop fixed sidebar */}
      {!isMobile && (
        <aside className={`site-sidebar${sidebarCollapsed ? ' collapsed' : ''}`}>
          <Sidebar activeSection={activeSection} onNav={scrollTo} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
        </aside>
      )}

      {/* Mobile: overlay + drawer */}
      {isMobile && mobileOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
          <aside className="site-sidebar mobile-sidebar">
            <Sidebar activeSection={activeSection} onNav={scrollTo} collapsed={false} onToggle={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      {/* Main content */}
      <main className={`site-main${sidebarCollapsed && !isMobile ? ' collapsed' : ''}`}>
        {/* Mobile sticky header */}
        {isMobile && (
          <div className="mobile-header">
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>☰</button>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: WHITE, letterSpacing: '0.04em' }}>Ghost of Yōtei Guide</span>
          </div>
        )}

        {/* Hero */}
        <HeroSection />

        {/* All sections */}
        {SECTIONS.map(({ id, Component }) => (
          <section key={id} id={id} style={{ scrollMarginTop: isMobile ? 56 : 0 }}>
            <Component />
          </section>
        ))}
      </main>
    </div>
    </ProgressContext.Provider>
  );
}
