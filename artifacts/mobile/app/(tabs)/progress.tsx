import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';
import { CATEGORIES } from '@/data/categories';
import { TROPHY_TIER_COLORS, TROPHY_TIER_LABELS, TROPHY_TIER_ORDER } from '@/data/trophies';
import {
  WORLD_ACTIVITIES,
  ACTIVITY_CATEGORY_LABELS,
  ACTIVITY_CATEGORY_COLORS,
  type ActivityCategory,
} from '@/data/activities';
import { ProgressBar } from '@/components/ProgressBar';
import { CompletionRing } from '@/components/CompletionRing';
import { PreReleaseNotice } from '@/components/PreReleaseNotice';
import { CLEANUP_ROADMAP, NG_PLUS_INFO } from '@/data/endgame';

// Summary-only: full checklist lives in the Activities tab
const ACTIVITY_CATEGORIES: ActivityCategory[] = ['liberation', 'duel', 'haiku', 'vanity'];

const ROADMAP_PREVIEW = 4; // steps shown before "Show all"

export default function ProgressScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { stats, state } = useProgress();
  const [roadmapExpanded, setRoadmapExpanded] = useState(false);

  const questPct =
    stats.totalQuests > 0
      ? Math.round((stats.completedQuests / stats.totalQuests) * 100)
      : 0;
  const collectPct =
    stats.totalCollectibles > 0
      ? Math.round((stats.completedCollectibles / stats.totalCollectibles) * 100)
      : 0;
  const trophyPct = stats.trophyStats.percentage;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 14),
          paddingBottom: Platform.OS === 'web' ? 118 : 100,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.heading, { color: colors.foreground }]}>
        Progress
      </Text>

      {/* ── Overall Ring ────────────────────────────────── */}
      <View
        style={[
          styles.overallCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.ringRow}>
          <CompletionRing percentage={stats.overallPercentage} size={120} />
          <View style={styles.overallList}>
            <Text style={[styles.overallTitle, { color: colors.foreground }]}>
              Overall Completion
            </Text>
            {[
              { label: 'Quests done', value: `${stats.completedQuests}/${stats.totalQuests}`, color: colors.primary },
              { label: 'Collectibles', value: `${stats.completedCollectibles}/${stats.totalCollectibles}`, color: colors.primary },
              { label: 'Trophies', value: `${stats.completedTrophies}/${stats.totalTrophies}`, color: '#C9A84C' },
              { label: 'In progress', value: String(stats.inProgressQuests), color: colors.warning },
            ].map(row => (
              <View key={row.label} style={styles.overallRow}>
                <Text style={[styles.overallLabel, { color: colors.mutedForeground }]}>
                  {row.label}
                </Text>
                <Text style={[styles.overallValue, { color: row.color }]}>
                  {row.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* ── Three-way split bars ─────────────────────────── */}
      <View
        style={[
          styles.splitCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
          Quests · Collectibles · Trophies
        </Text>
        {[
          { label: 'Quests', pct: questPct, color: colors.primary },
          { label: 'Collectibles', pct: collectPct, color: colors.accent },
          { label: 'Trophies', pct: trophyPct, color: '#C9A84C' },
        ].map(row => (
          <View key={row.label} style={styles.splitRow}>
            <Text style={[styles.splitLabel, { color: colors.mutedForeground }]}>
              {row.label}
            </Text>
            <View style={styles.splitBar}>
              <ProgressBar percentage={row.pct} height={5} color={row.color} />
            </View>
            <Text style={[styles.splitPct, { color: row.color }]}>
              {row.pct}%
            </Text>
          </View>
        ))}
      </View>

      {/* ── Trophy tier breakdown ────────────────────────── */}
      <View
        style={[
          styles.splitCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
          Trophies by Tier
        </Text>
        {TROPHY_TIER_ORDER.map(tier => {
          const data = stats.trophyStats.byTier[tier] ?? { total: 0, completed: 0 };
          const pct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
          const tierColor = TROPHY_TIER_COLORS[tier];
          return (
            <View key={tier} style={styles.splitRow}>
              <Text style={[styles.splitLabel, { color: colors.mutedForeground }]}>
                {TROPHY_TIER_LABELS[tier]}
              </Text>
              <View style={styles.splitBar}>
                <ProgressBar percentage={pct} height={5} color={tierColor} />
              </View>
              <Text style={[styles.splitPct, { color: tierColor }]}>
                {data.completed}/{data.total}
              </Text>
            </View>
          );
        })}
      </View>

      {/* ── Per-category breakdown ──────────────────────── */}
      <View
        style={[
          styles.catCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
          Quests by Category
        </Text>
        {CATEGORIES.map(cat => {
          const cs = stats.categoryStats[cat.id] ?? {
            total: 0,
            completed: 0,
            percentage: 0,
          };
          return (
            <View key={cat.id} style={styles.catRow}>
              <Text
                style={[styles.catLabel, { color: colors.foreground }]}
                numberOfLines={1}
              >
                {cat.label}
              </Text>
              <View style={styles.catBar}>
                <ProgressBar
                  percentage={cs.percentage}
                  height={4}
                  color={cat.color}
                />
              </View>
              <Text style={[styles.catCount, { color: colors.mutedForeground }]}>
                {cs.completed}/{cs.total}
              </Text>
            </View>
          );
        })}
      </View>

      {/* ── Cleanup Roadmap ──────────────────────────────── */}
      <View
        style={[
          styles.endgameCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.endgameHeader}>
          <View style={[styles.endgameIconWrap, { backgroundColor: '#9B59B620' }]}>
            <Ionicons name="list-outline" size={16} color="#9B59B6" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>
              100% Cleanup Roadmap
            </Text>
            <Text style={[styles.endgameSub, { color: colors.mutedForeground }]}>
              Recommended completion order
            </Text>
          </View>
        </View>

        {(roadmapExpanded ? CLEANUP_ROADMAP : CLEANUP_ROADMAP.slice(0, ROADMAP_PREVIEW)).map(step => (
          <View key={step.order} style={[styles.roadmapStep, { borderTopColor: colors.border }]}>
            <View style={[styles.roadmapNum, { backgroundColor: '#9B59B620' }]}>
              <Text style={[styles.roadmapNumText, { color: '#9B59B6' }]}>
                {step.order}
              </Text>
            </View>
            <View style={{ flex: 1, gap: 3 }}>
              <View style={styles.roadmapTitleRow}>
                <Text style={[styles.roadmapTitle, { color: colors.foreground }]} numberOfLines={2}>
                  {step.title}
                </Text>
                <Text style={[styles.roadmapEffort, { color: colors.mutedForeground }]}>
                  {step.effort}
                </Text>
              </View>
              <Text style={[styles.roadmapDesc, { color: colors.mutedForeground }]}>
                {step.description}
              </Text>
              {step.warning && (
                <View style={styles.roadmapWarningRow}>
                  <Ionicons name="warning-outline" size={11} color="#C9A84C" />
                  <Text style={[styles.roadmapWarning, { color: '#C9A84C' }]}>
                    {step.warning}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.roadmapToggle, { borderTopColor: colors.border }]}
          onPress={() => setRoadmapExpanded(e => !e)}
          activeOpacity={0.7}
        >
          <Text style={[styles.roadmapToggleText, { color: '#9B59B6' }]}>
            {roadmapExpanded
              ? 'Show less'
              : `Show all ${CLEANUP_ROADMAP.length} steps`}
          </Text>
          <Ionicons
            name={roadmapExpanded ? 'chevron-up' : 'chevron-down'}
            size={14}
            color="#9B59B6"
          />
        </TouchableOpacity>
      </View>

      {/* ── New Game Plus Overview ────────────────────────── */}
      <View
        style={[
          styles.endgameCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.endgameHeader}>
          <View style={[styles.endgameIconWrap, { backgroundColor: '#9B59B620' }]}>
            <Ionicons name="refresh-outline" size={16} color="#9B59B6" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>
              New Game Plus
            </Text>
            <Text style={[styles.endgameSub, { color: colors.mutedForeground }]}>
              Expected based on franchise pattern
            </Text>
          </View>
        </View>

        <PreReleaseNotice message="NG+ has not been confirmed for Ghost of Yōtei. All details below are estimates based on Ghost of Tsushima." />

        {/* Carries over */}
        <Text style={[styles.ngPlusSection, { color: colors.foreground }]}>
          Likely carries over
        </Text>
        {NG_PLUS_INFO.carriesOver.map(item => (
          <View key={item.label} style={styles.ngPlusRow}>
            <Ionicons name="checkmark-circle-outline" size={14} color={colors.success ?? '#4A9B8E'} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.ngPlusLabel, { color: colors.foreground }]}>
                {item.label}
              </Text>
              {item.detail && (
                <Text style={[styles.ngPlusDetail, { color: colors.mutedForeground }]}>
                  {item.detail}
                </Text>
              )}
            </View>
          </View>
        ))}

        {/* Resets */}
        <Text style={[styles.ngPlusSection, { color: colors.foreground, marginTop: 10 }]}>
          Likely resets
        </Text>
        {NG_PLUS_INFO.resets.map(item => (
          <View key={item.label} style={styles.ngPlusRow}>
            <Ionicons name="close-circle-outline" size={14} color={colors.warning ?? '#C9A84C'} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.ngPlusLabel, { color: colors.foreground }]}>
                {item.label}
              </Text>
              {item.detail && (
                <Text style={[styles.ngPlusDetail, { color: colors.mutedForeground }]}>
                  {item.detail}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* ── World Activities summary (full checklist in Activities tab) ── */}
      <View
        style={[
          styles.splitCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
          World Activities
        </Text>
        <PreReleaseNotice message="World activity names and locations are pre-release estimates — counts and names will be verified once the game ships." />
        {ACTIVITY_CATEGORIES.map(catId => {
          const items = WORLD_ACTIVITIES.filter(a => a.category === catId);
          if (items.length === 0) return null;
          const completed = items.filter(
            a => state.collectibleCompletion[a.id],
          ).length;
          const pct = items.length > 0 ? Math.round((completed / items.length) * 100) : 0;
          const catColor = ACTIVITY_CATEGORY_COLORS[catId];
          const catLabel = ACTIVITY_CATEGORY_LABELS[catId];
          return (
            <View key={catId} style={styles.splitRow}>
              <Text style={[styles.splitLabel, { color: colors.mutedForeground }]} numberOfLines={1}>
                {catLabel}
              </Text>
              <View style={styles.splitBar}>
                <ProgressBar percentage={pct} height={5} color={catColor} />
              </View>
              <Text style={[styles.splitPct, { color: catColor }]}>
                {completed}/{items.length}
              </Text>
            </View>
          );
        })}
        <Text style={[styles.actHint, { color: colors.mutedForeground }]}>
          Open the Activities tab to track individual items
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, gap: 14 },
  heading: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  overallCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
  },
  ringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  overallList: {
    flex: 1,
    gap: 8,
  },
  overallTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  overallRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overallLabel: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  overallValue: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  splitCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  splitLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    width: 84,
  },
  splitBar: { flex: 1 },
  splitPct: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    width: 40,
    textAlign: 'right',
  },
  catCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    gap: 12,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  catLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    width: 108,
  },
  catBar: { flex: 1 },
  catCount: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    width: 36,
    textAlign: 'right',
  },
  // Endgame / NG+
  endgameCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    gap: 0,
  },
  endgameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  endgameIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  endgameSub: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    marginTop: 1,
  },
  // Roadmap
  roadmapStep: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'flex-start',
  },
  roadmapNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  roadmapNumText: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  roadmapTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  roadmapTitle: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 18,
  },
  roadmapEffort: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    flexShrink: 0,
  },
  roadmapDesc: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 17,
  },
  roadmapWarningRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 2,
  },
  roadmapWarning: {
    flex: 1,
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
  },
  roadmapToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 2,
  },
  roadmapToggleText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  // NG+
  ngPlusSection: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  ngPlusRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  ngPlusLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    lineHeight: 18,
  },
  ngPlusDetail: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
  },
  // World activities hint
  actHint: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: 4,
  },
});
