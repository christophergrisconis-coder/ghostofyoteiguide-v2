/**
 * Ghost of Yōtei — 100% Guide Dashboard
 * Self-contained Expo Snack demo
 *
 * Paste this into a new Snack as App.tsx (not App.js).
 * All imports come from packages Snack provides by default.
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  background:     '#0A0A0F',
  foreground:     '#F0EAD6',
  card:           '#14141E',
  primary:        '#C9A84C',
  mutedForeground:'#7A7A90',
  border:         '#2A2A3E',
  success:        '#4A9B6F',
  warning:        '#E8A838',
  teal:           '#4A9B8E',
  purple:         '#7B68EE',
  orange:         '#D4853A',
  red:            '#8B1A1A',
  blue:           '#4682B4',
  mauve:          '#9B7B8B',
  green:          '#4A9B6F',
};

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────
type QuestCategory = 'main_story' | 'side_tales' | 'sensei_arcs' | 'mythic_tales' | 'bounties';

interface Quest {
  id: string;
  title: string;
  category: QuestCategory;
  region: string;
  act: string;
  order: number;
  missable: boolean;
}

const QUESTS: Quest[] = [
  { id: 'q01', title: 'The Ghost of Yōtei', category: 'main_story', region: 'Yotei Grasslands', act: 'Act 1', order: 1, missable: false },
  { id: 'q02', title: 'Ashes on the Wind', category: 'main_story', region: 'Ishikari Plain', act: 'Act 1', order: 2, missable: false },
  { id: 'q03', title: 'A Debt of Blood', category: 'main_story', region: 'Tokachi Range', act: 'Act 2', order: 3, missable: false },
  { id: 'q04', title: 'The Weight of Iron', category: 'main_story', region: 'Nayoro Wilds', act: 'Act 2', order: 4, missable: false },
  { id: 'q05', title: 'Wolves at the Gate', category: 'main_story', region: 'Teshio Ridge', act: 'Act 3', order: 5, missable: false },
  { id: 'q06', title: 'The Blossom and the Blade', category: 'side_tales', region: 'Yotei Grasslands', act: 'Act 1', order: 1, missable: true },
  { id: 'q07', title: 'Smoke on Still Water', category: 'side_tales', region: 'Ishikari Plain', act: 'Act 1', order: 2, missable: false },
  { id: 'q08', title: 'A Merchant\'s Debt', category: 'side_tales', region: 'Tokachi Range', act: 'Act 2', order: 3, missable: false },
  { id: 'q09', title: 'The Wandering Blade', category: 'sensei_arcs', region: 'Nayoro Wilds', act: 'Act 1', order: 1, missable: false },
  { id: 'q10', title: 'Song of the Mountain', category: 'mythic_tales', region: 'Tokachi Range', act: 'Act 2', order: 1, missable: false },
  { id: 'q11', title: 'The Silverback Wolf', category: 'bounties', region: 'Yotei Grasslands', act: 'Act 1', order: 1, missable: false },
  { id: 'q12', title: 'Blood on the Pass', category: 'bounties', region: 'Teshio Ridge', act: 'Act 2', order: 2, missable: false },
];

interface Category {
  id: QuestCategory;
  label: string;
  description: string;
  color: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  { id: 'main_story',  label: 'Main Story',   description: 'Core narrative quests',          color: C.primary,  icon: 'bookmark' },
  { id: 'side_tales',  label: 'Side Tales',   description: 'Optional story quests',          color: C.teal,     icon: 'reader-outline' },
  { id: 'sensei_arcs', label: 'Sensei Arcs',  description: 'Companion storylines',           color: C.purple,   icon: 'people-outline' },
  { id: 'mythic_tales',label: 'Mythic Tales', description: 'Legendary weapon quests',        color: C.orange,   icon: 'flame-outline' },
  { id: 'bounties',    label: 'Bounties',     description: 'Tracked criminals & creatures',  color: C.red,      icon: 'skull-outline' },
];

const ACTIVITIES = [
  { id: 'camp',          label: 'Yōtei Six Camps',  icon: 'flag-outline',      color: C.red,    total: 22 },
  { id: 'dueling_tree',  label: 'Dueling Trees',    icon: 'flash-outline',     color: C.primary,total: 7  },
  { id: 'wolf_den',      label: 'Wolf Dens',        icon: 'paw-outline',       color: C.purple, total: 10 },
  { id: 'fox_den',       label: 'Fox Dens',         icon: 'footsteps-outline', color: C.orange, total: 11 },
  { id: 'bamboo_strike', label: 'Bamboo Strikes',   icon: 'leaf-outline',      color: C.green,  total: 15 },
  { id: 'shrine_climb',  label: 'Shrine Climbs',    icon: 'triangle-outline',  color: C.teal,   total: 13 },
  { id: 'hot_spring',    label: 'Hot Springs',      icon: 'water-outline',     color: C.blue,   total: 16 },
  { id: 'sumi_e',        label: 'Sumi-e Paintings', icon: 'brush-outline',     color: C.mauve,  total: 15 },
];

const TOTAL_COLLECTIBLES = 280;
const TOTAL_TROPHIES = 40;

// ─────────────────────────────────────────────────────────────────────────────
// GRID HELPER — picks column count to minimise orphan items
// ─────────────────────────────────────────────────────────────────────────────
function deriveGridCols(n: number, candidates = [3, 4, 5]): number {
  return candidates.reduce((best, cols) => {
    const orphans = n % cols;
    const bestOrphans = n % best;
    if (orphans < bestOrphans) return cols;
    if (orphans === bestOrphans && cols === 4) return cols;
    return best;
  }, 4);
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPLETION RING
// ─────────────────────────────────────────────────────────────────────────────
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function CompletionRing({ percentage, size = 128, strokeWidth = 10 }: { percentage: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const cx = size / 2;
  const cy = size / 2;
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(Math.min(100, Math.max(0, percentage)) / 100, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={cx} cy={cy} r={radius} stroke={C.border} strokeWidth={strokeWidth} fill="none" />
        <AnimatedCircle
          cx={cx} cy={cy} r={radius}
          stroke={C.primary} strokeWidth={strokeWidth} fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          rotation={-90}
          origin={`${cx}, ${cy}`}
        />
      </Svg>
      <Text style={{ fontSize: 26, fontWeight: '700', color: C.foreground, letterSpacing: -1 }}>
        {percentage}%
      </Text>
      <Text style={{ fontSize: 10, color: C.mutedForeground, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 2 }}>
        Complete
      </Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────
function ProgressBar({ percentage, height = 6, color = C.primary }: { percentage: number; height?: number; color?: string }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(Math.min(100, Math.max(0, percentage)) / 100, {
      duration: 700,
      easing: Easing.out(Easing.cubic),
    });
  }, [percentage]);

  const animStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` as any }));

  return (
    <View style={{ height, borderRadius: 100, overflow: 'hidden', width: '100%', backgroundColor: C.border }}>
      <Animated.View style={[{ height, borderRadius: 100, backgroundColor: color }, animStyle]} />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }: { label: string; value: number; icon: any; color: string }) {
  return (
    <View style={[ss.statCard, { backgroundColor: C.card, borderColor: C.border }]}>
      <Ionicons name={icon} size={20} color={color} />
      <Text style={{ fontSize: 22, fontWeight: '700', color }}>
        {value}
      </Text>
      <Text style={{ fontSize: 10, color: C.mutedForeground, letterSpacing: 0.5, textAlign: 'center', textTransform: 'uppercase' }}>
        {label}
      </Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  // Simple toggle state — in the real app this is persisted via AsyncStorage
  const [questDone, setQuestDone] = useState<Record<string, boolean>>({});
  const [activityDone, setActivityDone] = useState<Record<string, number>>({});

  const completedQuests = useMemo(() => Object.values(questDone).filter(Boolean).length, [questDone]);
  const totalActivities = ACTIVITIES.reduce((s, a) => s + a.total, 0);
  const completedActivities = useMemo(
    () => ACTIVITIES.reduce((s, a) => s + (activityDone[a.id] ?? 0), [activityDone]),
    [activityDone],
  );
  const overallPct = useMemo(() => {
    const totalItems = QUESTS.length + TOTAL_COLLECTIBLES + totalActivities;
    const completedItems = completedQuests + completedActivities;
    return Math.round((completedItems / totalItems) * 100);
  }, [completedQuests, completedActivities]);

  const actPct = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

  const ACT_COLS = deriveGridCols(ACTIVITIES.length);
  const ACT_W = `${Math.floor(100 / ACT_COLS) - 2}%` as const;

  const nextQuest = QUESTS
    .filter(q => q.category === 'main_story')
    .sort((a, b) => a.order - b.order)
    .find(q => !questDone[q.id]);

  const topPad = Platform.OS === 'ios' ? 54 : 24;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: C.background }}
      contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HERO */}
      <LinearGradient
        colors={['#1A0800', '#0D0A20', C.background]}
        locations={[0, 0.5, 1]}
        style={{ paddingHorizontal: 20, paddingBottom: 28, paddingTop: topPad }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, gap: 6, paddingRight: 14 }}>
            <Text style={{ fontSize: 10, fontWeight: '600', color: C.primary, letterSpacing: 2.5 }}>
              GHOST OF YŌTEI
            </Text>
            <Text style={{ fontSize: 32, fontWeight: '700', color: C.foreground, letterSpacing: -0.5, lineHeight: 36 }}>
              100% Guide
            </Text>
            <Text style={{ fontSize: 13, color: C.mutedForeground, lineHeight: 18 }}>
              {QUESTS.length} quests · {TOTAL_COLLECTIBLES} collectibles{'\n'}
              {TOTAL_TROPHIES} trophies · {QUESTS.filter(q => q.missable).length} missable
            </Text>
          </View>
          <CompletionRing percentage={overallPct} size={128} />
        </View>
      </LinearGradient>

      {/* STATS ROW */}
      <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 16 }}>
        <StatCard label="Complete"    value={completedQuests}              icon="checkmark-circle" color={C.success} />
        <StatCard label="In Progress" value={0}                            icon="time"             color={C.warning} />
        <StatCard label="Remaining"   value={QUESTS.length - completedQuests} icon="ellipse-outline" color={C.mutedForeground} />
      </View>

      {/* NEXT UP */}
      {nextQuest && (
        <View style={{ marginTop: 24, paddingHorizontal: 20, gap: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: C.foreground, letterSpacing: -0.3 }}>
            Next Up
          </Text>
          <TouchableOpacity
            style={[ss.nextCard, { backgroundColor: C.card, borderColor: C.primary + '40' }]}
            onPress={() => setQuestDone(d => ({ ...d, [nextQuest.id]: true }))}
            activeOpacity={0.8}
          >
            <View style={[ss.nextAccent, { backgroundColor: C.primary }]} />
            <View style={{ flex: 1, padding: 14, gap: 5 }}>
              <View style={[ss.chip, { backgroundColor: C.primary + '20' }]}>
                <Ionicons name="bookmark" size={10} color={C.primary} />
                <Text style={{ fontSize: 10, fontWeight: '600', color: C.primary, letterSpacing: 0.5 }}>
                  Main Story
                </Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: C.foreground, lineHeight: 20 }}>
                {nextQuest.title}
              </Text>
              <Text style={{ fontSize: 12, color: C.mutedForeground }}>
                {nextQuest.act} · {nextQuest.region}
              </Text>
            </View>
            <View style={{ paddingRight: 14 }}>
              <Ionicons name="chevron-forward" size={18} color={C.primary} />
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 11, color: C.mutedForeground, textAlign: 'center' }}>
            Tap the card to mark it complete and see the next quest
          </Text>
        </View>
      )}

      {/* BANNER ROW */}
      <View style={{ flexDirection: 'row', gap: 8, marginHorizontal: 20, marginTop: nextQuest ? 8 : 16 }}>
        {[
          { label: 'QUESTS',      value: completedQuests,     total: QUESTS.length,        color: C.primary, sub: `${QUESTS.length - completedQuests} remaining` },
          { label: 'COLLECTIBLES',value: 0,                   total: TOTAL_COLLECTIBLES,   color: C.teal,    sub: `${TOTAL_COLLECTIBLES} left` },
          { label: 'TROPHIES',    value: 0,                   total: TOTAL_TROPHIES,        color: C.primary, sub: '0% unlocked' },
          { label: 'ACTIVITIES',  value: completedActivities, total: totalActivities,       color: C.teal,    sub: `${totalActivities - completedActivities} left` },
        ].map(b => (
          <View key={b.label} style={[ss.bannerCard, { backgroundColor: C.card, borderColor: C.border }]}>
            <Text style={{ fontSize: 8, fontWeight: '600', color: C.mutedForeground, letterSpacing: 1.5 }}>
              {b.label}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: '700', letterSpacing: -0.5, color: b.color }}>
              {b.value}
              <Text style={{ fontSize: 11, fontWeight: '400', color: C.mutedForeground }}>
                /{b.total}
              </Text>
            </Text>
            <Text style={{ fontSize: 9, color: C.mutedForeground }}>{b.sub}</Text>
          </View>
        ))}
      </View>

      {/* ACTIVITIES CARD */}
      <View style={[ss.actCard, { backgroundColor: C.card, borderColor: C.border }]}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: C.teal + '20', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="flag-outline" size={16} color={C.teal} />
          </View>
          <Text style={{ flex: 1, fontSize: 10, fontWeight: '600', color: C.mutedForeground, letterSpacing: 1.5 }}>
            ACTIVITIES
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '700', letterSpacing: -0.3, color: C.teal }}>
            {completedActivities}
            <Text style={{ fontSize: 11, fontWeight: '400', color: C.mutedForeground }}>
              /{totalActivities}
            </Text>
          </Text>
          <Ionicons name="chevron-forward" size={14} color={C.mutedForeground} />
        </View>

        {/* Progress bar */}
        <ProgressBar percentage={actPct} height={4} color={C.teal} />

        {/* Per-category grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
          {ACTIVITIES.map(({ id, label, icon, color, total }) => {
            const done = activityDone[id] ?? 0;
            return (
              <TouchableOpacity
                key={id}
                style={{ width: ACT_W, alignItems: 'center', gap: 4 }}
                onPress={() => setActivityDone(d => ({ ...d, [id]: Math.min(total, (d[id] ?? 0) + 1) }))}
                activeOpacity={0.7}
              >
                <View style={{ width: 26, height: 26, borderRadius: 6, backgroundColor: color + '20', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={icon as any} size={12} color={color} />
                </View>
                <Text style={{ fontSize: 9, color: C.mutedForeground, letterSpacing: 0.3, textAlign: 'center' }} numberOfLines={1}>
                  {label}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: '700', color: done === total ? C.success : C.foreground }}>
                  {done}/{total}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={{ fontSize: 11, color: C.mutedForeground, textAlign: 'center' }}>
          Tap any category to increment its count
        </Text>
      </View>

      {/* CATEGORIES */}
      <View style={{ marginTop: 24, paddingHorizontal: 20, gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: C.foreground, letterSpacing: -0.3 }}>
          Categories
        </Text>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => {
            const total = QUESTS.filter(q => q.category === item.id).length;
            const completed = QUESTS.filter(q => q.category === item.id && questDone[q.id]).length;
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
            return (
              <View style={[ss.catCard, { backgroundColor: C.card, borderColor: C.border }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <View style={{ width: 30, height: 30, borderRadius: 7, backgroundColor: item.color + '20', alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name={item.icon as any} size={16} color={item.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: C.foreground }} numberOfLines={1}>
                      {item.label}
                    </Text>
                    <Text style={{ fontSize: 10, color: C.mutedForeground }}>{completed}/{total}</Text>
                  </View>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: item.color }}>{pct}%</Text>
                </View>
                <ProgressBar percentage={pct} height={3} color={item.color} />
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────────────────────────────────────
const ss = StyleSheet.create({
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  nextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  nextAccent: {
    width: 3,
    alignSelf: 'stretch',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  bannerCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 1,
  },
  actCard: {
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  catCard: {
    width: 160,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
});
