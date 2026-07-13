/**
 * Ghost of Yōtei — 100% Completion Guide
 * Self-contained Expo Snack demo
 *
 * Paste this entire file into snack.expo.dev as App.tsx (NOT App.js).
 * Every import comes from packages Snack provides by default — no extras needed.
 */

import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  bg: "#0A0A0F",
  card: "#14141E",
  cardAlt: "#1A1A28",
  fg: "#F0EAD6",
  fgMuted: "#7A7A90",
  border: "#2A2A3E",
  gold: "#C9A84C",
  teal: "#4A9B8E",
  purple: "#7B68EE",
  orange: "#D4853A",
  red: "#C0392B",
  blue: "#4682B4",
  mauve: "#9B7B8B",
  green: "#4A9B6F",
  warn: "#E8A838",
};

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type QuestCat =
  | "main_story"
  | "side_tales"
  | "sensei_arcs"
  | "mythic_tales"
  | "bounties";

interface Quest {
  id: string;
  title: string;
  category: QuestCat;
  region: string;
  act: string;
  order: number;
  missable: boolean;
}

interface Activity {
  id: string;
  label: string;
  icon: string;
  color: string;
  total: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const QUESTS: Quest[] = [
  // Main Story
  { id: "ms1", title: "The Ghost of Yōtei",      category: "main_story", region: "Yōtei Grasslands", act: "Act 1", order: 1, missable: false },
  { id: "ms2", title: "Ashes on the Wind",        category: "main_story", region: "Ishikari Plain",   act: "Act 1", order: 2, missable: false },
  { id: "ms3", title: "A Debt of Blood",          category: "main_story", region: "Tokachi Range",    act: "Act 2", order: 3, missable: false },
  { id: "ms4", title: "The Weight of Iron",       category: "main_story", region: "Nayoro Wilds",     act: "Act 2", order: 4, missable: false },
  { id: "ms5", title: "Wolves at the Gate",       category: "main_story", region: "Teshio Ridge",     act: "Act 3", order: 5, missable: false },
  // Side Tales
  { id: "st1", title: "The Blossom and the Blade", category: "side_tales", region: "Yōtei Grasslands", act: "Act 1", order: 1, missable: true  },
  { id: "st2", title: "Smoke on Still Water",      category: "side_tales", region: "Ishikari Plain",   act: "Act 1", order: 2, missable: false },
  { id: "st3", title: "A Merchant's Debt",         category: "side_tales", region: "Tokachi Range",    act: "Act 2", order: 3, missable: false },
  { id: "st4", title: "The Last Lantern",          category: "side_tales", region: "Nayoro Wilds",     act: "Act 2", order: 4, missable: true  },
  // Sensei Arcs
  { id: "sa1", title: "The Wandering Blade",  category: "sensei_arcs", region: "Nayoro Wilds",   act: "Act 1", order: 1, missable: false },
  { id: "sa2", title: "Oaths in the Ashes",   category: "sensei_arcs", region: "Ishikari Plain", act: "Act 2", order: 2, missable: false },
  // Mythic Tales
  { id: "mt1", title: "Song of the Mountain", category: "mythic_tales", region: "Tokachi Range",    act: "Act 2", order: 1, missable: false },
  { id: "mt2", title: "The Frozen Blade",     category: "mythic_tales", region: "Teshio Ridge",     act: "Act 3", order: 2, missable: false },
  // Bounties
  { id: "bn1", title: "The Silverback Wolf",  category: "bounties", region: "Yōtei Grasslands", act: "Act 1", order: 1, missable: false },
  { id: "bn2", title: "Blood on the Pass",    category: "bounties", region: "Teshio Ridge",     act: "Act 2", order: 2, missable: false },
  { id: "bn3", title: "The Pale Ronin",       category: "bounties", region: "Nayoro Wilds",     act: "Act 3", order: 3, missable: false },
];

const CATEGORIES: { id: QuestCat; label: string; icon: string; color: string; desc: string }[] = [
  { id: "main_story",   label: "Main Story",   icon: "bookmark",       color: C.gold,   desc: "Core narrative quests" },
  { id: "side_tales",   label: "Side Tales",   icon: "reader-outline", color: C.teal,   desc: "Optional story quests" },
  { id: "sensei_arcs",  label: "Sensei Arcs",  icon: "people-outline", color: C.purple, desc: "Companion storylines" },
  { id: "mythic_tales", label: "Mythic Tales", icon: "flame-outline",  color: C.orange, desc: "Legendary weapon quests" },
  { id: "bounties",     label: "Bounties",     icon: "skull-outline",  color: C.red,    desc: "Criminals & creatures" },
];

const ACTIVITIES: Activity[] = [
  { id: "camp",         label: "Yōtei Six Camps",  icon: "flag-outline",     color: C.red,    total: 22 },
  { id: "dueling_tree", label: "Dueling Trees",    icon: "flash-outline",    color: C.gold,   total: 7  },
  { id: "wolf_den",     label: "Wolf Dens",        icon: "paw-outline",      color: C.purple, total: 10 },
  { id: "fox_den",      label: "Fox Dens",         icon: "footsteps-outline",color: C.orange, total: 11 },
  { id: "bamboo",       label: "Bamboo Strikes",   icon: "leaf-outline",     color: C.green,  total: 15 },
  { id: "shrine",       label: "Shrine Climbs",    icon: "triangle-outline", color: C.teal,   total: 13 },
  { id: "hot_spring",   label: "Hot Springs",      icon: "water-outline",    color: C.blue,   total: 16 },
  { id: "sumi_e",       label: "Sumi-e Paintings", icon: "brush-outline",    color: C.mauve,  total: 15 },
];

const TOTAL_COLLECTIBLES = 280;
const TOTAL_TROPHIES = 40;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
/** Pick column count (from candidates) that leaves fewest orphans; tie-break → 4 */
function gridCols(n: number, candidates = [3, 4, 5]): number {
  return candidates.reduce((best, cols) => {
    const o = n % cols, ob = n % best;
    if (o < ob) return cols;
    if (o === ob && cols === 4) return cols;
    return best;
  }, 4);
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED RING
// ─────────────────────────────────────────────────────────────────────────────
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function Ring({ pct, size = 120, sw = 9 }: { pct: number; size?: number; sw?: number }) {
  const r = (size - sw * 2) / 2;
  const circ = r * 2 * Math.PI;
  const cx = size / 2, cy = size / 2;
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(Math.min(1, Math.max(0, pct / 100)), {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [pct]);

  const aProps = useAnimatedProps(() => ({
    strokeDashoffset: circ * (1 - progress.value),
  }));

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={cx} cy={cy} r={r} stroke={C.border} strokeWidth={sw} fill="none" />
        <AnimatedCircle
          cx={cx} cy={cy} r={r}
          stroke={C.gold} strokeWidth={sw} fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          animatedProps={aProps}
          rotation={-90} origin={`${cx},${cy}`}
        />
      </Svg>
      <Text style={{ fontSize: 24, fontWeight: "700", color: C.fg, letterSpacing: -1 }}>{pct}%</Text>
      <Text style={{ fontSize: 9, color: C.fgMuted, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 1 }}>
        Complete
      </Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED BAR
// ─────────────────────────────────────────────────────────────────────────────
function Bar({ pct, h = 5, color = C.gold }: { pct: number; h?: number; color?: string }) {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(Math.min(1, Math.max(0, pct / 100)), {
      duration: 700, easing: Easing.out(Easing.cubic),
    });
  }, [pct]);
  const aStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` as any }));
  return (
    <View style={{ height: h, borderRadius: 100, overflow: "hidden", backgroundColor: C.border }}>
      <Animated.View style={[{ height: h, borderRadius: 100, backgroundColor: color }, aStyle]} />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SMALL STAT BOX
// ─────────────────────────────────────────────────────────────────────────────
function StatBox({ label, value, icon, color }: { label: string; value: number; icon: any; color: string }) {
  return (
    <View style={[ss.statBox, { backgroundColor: C.card, borderColor: C.border }]}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={{ fontSize: 20, fontWeight: "700", color, letterSpacing: -0.5 }}>{value}</Text>
      <Text style={{ fontSize: 9, color: C.fgMuted, letterSpacing: 0.5, textAlign: "center", textTransform: "uppercase" }}>
        {label}
      </Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADING
// ─────────────────────────────────────────────────────────────────────────────
function Section({ title, right }: { title: string; right?: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
      <Text style={{ fontSize: 17, fontWeight: "700", color: C.fg, letterSpacing: -0.3 }}>{title}</Text>
      {right ? <Text style={{ fontSize: 11, color: C.fgMuted }}>{right}</Text> : null}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [questDone, setQuestDone]       = useState<Record<string, boolean>>({});
  const [actDone,   setActDone]         = useState<Record<string, number>>({});
  const [activeTab, setActiveTab]       = useState<"dashboard" | "quests" | "activities">("dashboard");

  // ── derived counts ──────────────────────────────────────────────────────────
  const completedQuests = useMemo(() => Object.values(questDone).filter(Boolean).length, [questDone]);

  const totalActs = useMemo(() => ACTIVITIES.reduce((s, a) => s + a.total, 0), []);
  const completedActs = useMemo(
    () => ACTIVITIES.reduce((s, a) => s + (actDone[a.id] ?? 0), 0),
    [actDone],
  );

  const overallPct = useMemo(() => {
    const total = QUESTS.length + TOTAL_COLLECTIBLES + totalActs;
    return Math.round(((completedQuests + completedActs) / total) * 100);
  }, [completedQuests, completedActs, totalActs]);

  const actPct = totalActs > 0 ? Math.round((completedActs / totalActs) * 100) : 0;

  const nextMain = QUESTS
    .filter((q) => q.category === "main_story")
    .sort((a, b) => a.order - b.order)
    .find((q) => !questDone[q.id]);

  const missableLeft = QUESTS.filter((q) => q.missable && !questDone[q.id]).length;

  const topPad = Platform.OS === "ios" ? 54 : 28;
  const ACT_COLS = gridCols(ACTIVITIES.length);
  const ACT_W = `${Math.floor(100 / ACT_COLS) - 2}%` as const;

  // ── tab toggle helpers ──────────────────────────────────────────────────────
  function toggleQuest(id: string) {
    setQuestDone((d) => ({ ...d, [id]: !d[id] }));
  }
  function tickActivity(id: string, max: number) {
    setActDone((d) => ({ ...d, [id]: Math.min(max, (d[id] ?? 0) + 1) }));
  }
  function resetActivity(id: string) {
    setActDone((d) => ({ ...d, [id]: 0 }));
  }

  // ── screens ─────────────────────────────────────────────────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {/* ── CONTENT ────────────────────────────────────────────────────────── */}
      {activeTab === "dashboard" && (
        <DashboardScreen
          overallPct={overallPct}
          completedQuests={completedQuests}
          completedActs={completedActs}
          totalActs={totalActs}
          actPct={actPct}
          actDone={actDone}
          nextMain={nextMain}
          missableLeft={missableLeft}
          topPad={topPad}
          ACT_COLS={ACT_COLS}
          ACT_W={ACT_W}
          questDone={questDone}
          onTickActivity={tickActivity}
          onMarkMain={(id) => setQuestDone((d) => ({ ...d, [id]: true }))}
        />
      )}
      {activeTab === "quests" && (
        <QuestsScreen
          topPad={topPad}
          questDone={questDone}
          onToggle={toggleQuest}
        />
      )}
      {activeTab === "activities" && (
        <ActivitiesScreen
          topPad={topPad}
          actDone={actDone}
          actPct={actPct}
          completedActs={completedActs}
          totalActs={totalActs}
          onTick={tickActivity}
          onReset={resetActivity}
        />
      )}

      {/* ── TAB BAR ────────────────────────────────────────────────────────── */}
      <View style={[ss.tabBar, { borderColor: C.border, backgroundColor: C.card }]}>
        {(["dashboard", "quests", "activities"] as const).map((tab) => {
          const icon = tab === "dashboard" ? "grid-outline" : tab === "quests" ? "list-outline" : "flag-outline";
          const label = tab === "dashboard" ? "Dashboard" : tab === "quests" ? "Quests" : "Activities";
          const active = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={ss.tabItem}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Ionicons name={icon as any} size={22} color={active ? C.gold : C.fgMuted} />
              <Text style={{ fontSize: 10, color: active ? C.gold : C.fgMuted, marginTop: 2, fontWeight: active ? "600" : "400" }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function DashboardScreen({
  overallPct, completedQuests, completedActs, totalActs, actPct,
  actDone, nextMain, missableLeft, topPad, ACT_COLS, ACT_W,
  questDone, onTickActivity, onMarkMain,
}: {
  overallPct: number; completedQuests: number; completedActs: number;
  totalActs: number; actPct: number; actDone: Record<string, number>;
  nextMain?: Quest; missableLeft: number; topPad: number;
  ACT_COLS: number; ACT_W: string; questDone: Record<string, boolean>;
  onTickActivity(id: string, max: number): void;
  onMarkMain(id: string): void;
}) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO */}
      <View style={[ss.hero, { paddingTop: topPad, backgroundColor: "#0F0D1A" }]}>
        <View style={{ flex: 1, gap: 5, paddingRight: 16 }}>
          <Text style={{ fontSize: 10, fontWeight: "600", color: C.gold, letterSpacing: 2.5 }}>
            GHOST OF YŌTEI
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "700", color: C.fg, letterSpacing: -0.5, lineHeight: 34 }}>
            100%{"\n"}Guide
          </Text>
          <Text style={{ fontSize: 12, color: C.fgMuted, lineHeight: 18, marginTop: 2 }}>
            {QUESTS.length} quests · {TOTAL_COLLECTIBLES} collectibles{"\n"}
            {TOTAL_TROPHIES} trophies · {QUESTS.filter((q) => q.missable).length} missable
          </Text>
          {missableLeft > 0 && (
            <View style={[ss.chip, { backgroundColor: C.warn + "22", alignSelf: "flex-start", marginTop: 4 }]}>
              <Ionicons name="warning-outline" size={10} color={C.warn} />
              <Text style={{ fontSize: 10, color: C.warn, fontWeight: "600" }}>
                {missableLeft} missable left
              </Text>
            </View>
          )}
        </View>
        <Ring pct={overallPct} size={118} />
      </View>

      {/* STAT ROW */}
      <View style={{ flexDirection: "row", gap: 8, marginHorizontal: 16, marginTop: 16 }}>
        <StatBox label="Done"      value={completedQuests}              icon="checkmark-circle" color={C.green} />
        <StatBox label="Remaining" value={QUESTS.length - completedQuests} icon="ellipse-outline"  color={C.fgMuted} />
        <StatBox label="Missable"  value={missableLeft}                  icon="warning-outline"  color={C.warn} />
      </View>

      {/* NEXT UP */}
      {nextMain && (
        <View style={{ marginTop: 22, marginHorizontal: 16, gap: 8 }}>
          <Section title="Next Up" right="Main Story" />
          <TouchableOpacity
            style={[ss.nextCard, { backgroundColor: C.card, borderColor: C.gold + "44" }]}
            onPress={() => onMarkMain(nextMain.id)}
            activeOpacity={0.8}
          >
            <View style={[ss.accent, { backgroundColor: C.gold }]} />
            <View style={{ flex: 1, padding: 12, gap: 4 }}>
              <View style={[ss.chip, { backgroundColor: C.gold + "22" }]}>
                <Ionicons name="bookmark" size={9} color={C.gold} />
                <Text style={{ fontSize: 9, fontWeight: "600", color: C.gold, letterSpacing: 0.5 }}>
                  {nextMain.act} · {nextMain.region}
                </Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: "600", color: C.fg, lineHeight: 20 }}>
                {nextMain.title}
              </Text>
            </View>
            <View style={{ paddingRight: 12, justifyContent: "center" }}>
              <Ionicons name="checkmark-circle-outline" size={22} color={C.gold} />
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 11, color: C.fgMuted, textAlign: "center" }}>
            Tap to mark complete · see next quest automatically
          </Text>
        </View>
      )}

      {/* SUMMARY BANNERS */}
      <View style={{ flexDirection: "row", gap: 8, marginHorizontal: 16, marginTop: 20, flexWrap: "wrap" }}>
        {[
          { label: "QUESTS",       value: completedQuests, total: QUESTS.length,       color: C.gold,   sub: `${QUESTS.length - completedQuests} left` },
          { label: "COLLECTIBLES", value: 0,               total: TOTAL_COLLECTIBLES,   color: C.teal,   sub: `${TOTAL_COLLECTIBLES} left` },
          { label: "TROPHIES",     value: 0,               total: TOTAL_TROPHIES,       color: C.purple, sub: "0 unlocked" },
          { label: "ACTIVITIES",   value: completedActs,   total: totalActs,            color: C.teal,   sub: `${totalActs - completedActs} left` },
        ].map((b) => (
          <View key={b.label} style={[ss.banner, { backgroundColor: C.card, borderColor: C.border }]}>
            <Text style={{ fontSize: 8, fontWeight: "600", color: C.fgMuted, letterSpacing: 1.5 }}>{b.label}</Text>
            <Text style={{ fontSize: 17, fontWeight: "700", letterSpacing: -0.5, color: b.color }}>
              {b.value}
              <Text style={{ fontSize: 11, fontWeight: "400", color: C.fgMuted }}>/{b.total}</Text>
            </Text>
            <Text style={{ fontSize: 9, color: C.fgMuted }}>{b.sub}</Text>
          </View>
        ))}
      </View>

      {/* ACTIVITIES CARD */}
      <View style={[ss.actCard, { backgroundColor: C.card, borderColor: C.border }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View style={[ss.iconBox, { backgroundColor: C.teal + "22" }]}>
            <Ionicons name="flag-outline" size={15} color={C.teal} />
          </View>
          <Text style={{ flex: 1, fontSize: 11, fontWeight: "600", color: C.fgMuted, letterSpacing: 1.5 }}>
            ACTIVITIES
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "700", color: C.teal }}>
            {completedActs}
            <Text style={{ fontSize: 11, fontWeight: "400", color: C.fgMuted }}>/{totalActs}</Text>
          </Text>
        </View>
        <Bar pct={actPct} h={4} color={C.teal} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {ACTIVITIES.map(({ id, label, icon, color, total }) => {
            const done = actDone[id] ?? 0;
            const complete = done >= total;
            return (
              <TouchableOpacity
                key={id}
                style={{ width: ACT_W, alignItems: "center", gap: 3 }}
                onPress={() => onTickActivity(id, total)}
                activeOpacity={0.7}
              >
                <View style={[ss.iconBox, { backgroundColor: color + "22" }, complete && { backgroundColor: color + "44" }]}>
                  <Ionicons name={icon as any} size={13} color={complete ? color : color} />
                </View>
                <Text style={{ fontSize: 8, color: C.fgMuted, textAlign: "center" }} numberOfLines={1}>
                  {label}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: "700", color: complete ? C.green : C.fg }}>
                  {done}/{total}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={{ fontSize: 10, color: C.fgMuted, textAlign: "center" }}>
          Tap any category to tick up · visit Activities tab to reset
        </Text>
      </View>

      {/* CATEGORY CARDS */}
      <View style={{ marginTop: 24, paddingLeft: 16, gap: 10 }}>
        <View style={{ paddingRight: 16 }}>
          <Section title="Categories" />
        </View>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(c) => c.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingRight: 16 }}
          renderItem={({ item }) => {
            const total = QUESTS.filter((q) => q.category === item.id).length;
            const done  = QUESTS.filter((q) => q.category === item.id && questDone[q.id]).length;
            const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
            return (
              <View style={[ss.catCard, { backgroundColor: C.card, borderColor: C.border }]}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <View style={[ss.iconBox, { backgroundColor: item.color + "22" }]}>
                    <Ionicons name={item.icon as any} size={15} color={item.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: "600", color: C.fg }} numberOfLines={1}>
                      {item.label}
                    </Text>
                    <Text style={{ fontSize: 10, color: C.fgMuted }}>{done}/{total} quests</Text>
                  </View>
                  <Text style={{ fontSize: 13, fontWeight: "700", color: item.color }}>{pct}%</Text>
                </View>
                <Bar pct={pct} h={3} color={item.color} />
                <Text style={{ fontSize: 9, color: C.fgMuted, marginTop: 4 }}>{item.desc}</Text>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUESTS SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function QuestsScreen({
  topPad, questDone, onToggle,
}: {
  topPad: number;
  questDone: Record<string, boolean>;
  onToggle(id: string): void;
}) {
  const [filter, setFilter] = useState<QuestCat | "all">("all");

  const shown = filter === "all" ? QUESTS : QUESTS.filter((q) => q.category === filter);
  const cat = filter !== "all" ? CATEGORIES.find((c) => c.id === filter) : null;

  const done  = shown.filter((q) => questDone[q.id]).length;
  const total = shown.length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={[ss.screenHeader, { paddingTop: topPad, backgroundColor: C.card, borderColor: C.border }]}>
        <Text style={{ fontSize: 22, fontWeight: "700", color: C.fg, letterSpacing: -0.5 }}>Quests</Text>
        <Text style={{ fontSize: 13, color: C.fgMuted, marginTop: 2 }}>
          {done}/{total} complete · {pct}%
        </Text>
        <Bar pct={pct} h={3} color={cat?.color ?? C.gold} />
      </View>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: C.card, borderBottomWidth: 1, borderColor: C.border }}
        contentContainerStyle={{ gap: 6, padding: 10 }}
      >
        {[{ id: "all" as const, label: "All", color: C.gold }, ...CATEGORIES.map((c) => ({ id: c.id as QuestCat | "all", label: c.label, color: c.color }))].map((c) => {
          const active = filter === c.id;
          return (
            <TouchableOpacity
              key={c.id}
              style={[ss.filterChip, { backgroundColor: active ? c.color + "33" : C.cardAlt, borderColor: active ? c.color + "77" : C.border }]}
              onPress={() => setFilter(c.id)}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 11, fontWeight: "600", color: active ? c.color : C.fgMuted }}>
                {c.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Quest list */}
      <FlatList
        data={shown}
        keyExtractor={(q) => q.id}
        contentContainerStyle={{ padding: 14, gap: 8, paddingBottom: 100 }}
        renderItem={({ item }) => {
          const c = CATEGORIES.find((c) => c.id === item.category)!;
          const checked = !!questDone[item.id];
          return (
            <TouchableOpacity
              style={[ss.questRow, { backgroundColor: C.card, borderColor: checked ? c.color + "55" : C.border }]}
              onPress={() => onToggle(item.id)}
              activeOpacity={0.75}
            >
              <View style={[ss.accent, { backgroundColor: checked ? c.color : C.border }]} />
              <View style={{ flex: 1, padding: 11, gap: 3 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Text style={{ flex: 1, fontSize: 14, fontWeight: "600", color: checked ? C.fgMuted : C.fg, lineHeight: 18 }}
                    numberOfLines={2}>
                    {item.title}
                  </Text>
                  {item.missable && (
                    <View style={[ss.chip, { backgroundColor: C.warn + "22" }]}>
                      <Ionicons name="warning-outline" size={9} color={C.warn} />
                      <Text style={{ fontSize: 9, color: C.warn, fontWeight: "600" }}>Missable</Text>
                    </View>
                  )}
                </View>
                <Text style={{ fontSize: 11, color: C.fgMuted }}>
                  {item.act} · {item.region}
                </Text>
                <View style={[ss.chip, { backgroundColor: c.color + "18", alignSelf: "flex-start", marginTop: 2 }]}>
                  <Ionicons name={c.icon as any} size={9} color={c.color} />
                  <Text style={{ fontSize: 9, color: c.color, fontWeight: "600" }}>{c.label}</Text>
                </View>
              </View>
              <View style={{ paddingRight: 12, justifyContent: "center" }}>
                <View style={[ss.checkbox, { borderColor: checked ? c.color : C.border, backgroundColor: checked ? c.color : "transparent" }]}>
                  {checked && <Ionicons name="checkmark" size={13} color={C.bg} />}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITIES SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function ActivitiesScreen({
  topPad, actDone, actPct, completedActs, totalActs, onTick, onReset,
}: {
  topPad: number;
  actDone: Record<string, number>;
  actPct: number;
  completedActs: number;
  totalActs: number;
  onTick(id: string, max: number): void;
  onReset(id: string): void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={[ss.screenHeader, { paddingTop: topPad, backgroundColor: C.card, borderColor: C.border }]}>
        <Text style={{ fontSize: 22, fontWeight: "700", color: C.fg, letterSpacing: -0.5 }}>Activities</Text>
        <Text style={{ fontSize: 13, color: C.fgMuted, marginTop: 2 }}>
          {completedActs}/{totalActs} complete · {actPct}%
        </Text>
        <Bar pct={actPct} h={3} color={C.teal} />
      </View>

      <FlatList
        data={ACTIVITIES}
        keyExtractor={(a) => a.id}
        contentContainerStyle={{ padding: 14, gap: 10, paddingBottom: 100 }}
        renderItem={({ item }) => {
          const done = actDone[item.id] ?? 0;
          const complete = done >= item.total;
          const pct = Math.round((done / item.total) * 100);
          return (
            <View style={[ss.actRow, { backgroundColor: C.card, borderColor: complete ? item.color + "55" : C.border }]}>
              <View style={[ss.accent, { backgroundColor: complete ? item.color : C.border }]} />
              <View style={{ flex: 1, padding: 12, gap: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <View style={[ss.iconBox, { backgroundColor: item.color + "22" }]}>
                    <Ionicons name={item.icon as any} size={16} color={item.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: "600", color: complete ? C.fgMuted : C.fg }}>
                      {item.label}
                    </Text>
                    <Text style={{ fontSize: 11, color: C.fgMuted }}>{done}/{item.total} · {pct}%</Text>
                  </View>
                  {complete
                    ? <Ionicons name="checkmark-circle" size={22} color={C.green} />
                    : (
                      <TouchableOpacity
                        style={[ss.tickBtn, { backgroundColor: item.color + "22", borderColor: item.color + "55" }]}
                        onPress={() => onTick(item.id, item.total)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="add" size={18} color={item.color} />
                      </TouchableOpacity>
                    )
                  }
                </View>
                <Bar pct={pct} h={4} color={item.color} />
                {done > 0 && (
                  <TouchableOpacity onPress={() => onReset(item.id)} activeOpacity={0.7}>
                    <Text style={{ fontSize: 10, color: C.fgMuted, textAlign: "right" }}>Reset</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────
const ss = StyleSheet.create({
  hero: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 8,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 12,
    borderWidth: 1,
    gap: 3,
  },
  nextCard: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  accent: {
    width: 3,
    alignSelf: "stretch",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
  },
  banner: {
    flex: 1,
    minWidth: "40%",
    padding: 11,
    borderRadius: 12,
    borderWidth: 1,
    gap: 1,
  },
  actCard: {
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  catCard: {
    width: 158,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    borderTopWidth: 1,
    paddingBottom: Platform.OS === "ios" ? 24 : 8,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screenHeader: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    gap: 6,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  questRow: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  actRow: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  tickBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
