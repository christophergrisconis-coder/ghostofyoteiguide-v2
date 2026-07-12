import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';
import {
  TROPHIES,
  TROPHY_TIER_ORDER,
  TROPHY_TIER_LABELS,
  TROPHY_TIER_COLORS,
  type TrophyTier,
} from '@/data/trophies';
import { ChecklistItem } from '@/components/ChecklistItem';
import { ProgressBar } from '@/components/ProgressBar';

export default function TrophiesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { state, stats, toggleTrophy } = useProgress();

  const trophiesByTier = useMemo(() => {
    return TROPHY_TIER_ORDER.map(tier => ({
      tier,
      trophies: TROPHIES.filter(t => t.tier === tier),
    }));
  }, []);

  const TIER_ICONS: Record<TrophyTier, string> = {
    platinum: '🏆',
    gold: '🥇',
    silver: '🥈',
    bronze: '🥉',
  };

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
        Trophies
      </Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        {stats.trophyStats.completed}/{stats.trophyStats.total} unlocked · 0 missable
      </Text>

      {/* ── Overall progress bar ──────────────────────────────── */}
      <View style={[styles.overallCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.overallRow}>
          <Text style={[styles.overallLabel, { color: colors.foreground }]}>Overall</Text>
          <Text style={[styles.overallPct, { color: colors.primary }]}>
            {stats.trophyStats.percentage}%
          </Text>
        </View>
        <ProgressBar percentage={stats.trophyStats.percentage} height={5} color={colors.primary} />

        <View style={styles.tierSummary}>
          {TROPHY_TIER_ORDER.map(tier => {
            const data = stats.trophyStats.byTier[tier] ?? { total: 0, completed: 0 };
            const tierColor = TROPHY_TIER_COLORS[tier];
            return (
              <View key={tier} style={styles.tierStat}>
                <Text style={styles.tierIcon}>{TIER_ICONS[tier]}</Text>
                <Text style={[styles.tierCount, { color: tierColor }]}>
                  {data.completed}/{data.total}
                </Text>
                <Text style={[styles.tierLabel, { color: colors.mutedForeground }]}>
                  {TROPHY_TIER_LABELS[tier]}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* ── Trophy sections by tier ───────────────────────────── */}
      {trophiesByTier.map(({ tier, trophies }) => {
        const data = stats.trophyStats.byTier[tier] ?? { total: 0, completed: 0 };
        const tierColor = TROPHY_TIER_COLORS[tier];
        const pct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;

        return (
          <View
            key={tier}
            style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            {/* Section header */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionLeft}>
                <Text style={styles.sectionIcon}>{TIER_ICONS[tier]}</Text>
                <Text style={[styles.sectionTitle, { color: tierColor }]}>
                  {TROPHY_TIER_LABELS[tier]}
                </Text>
              </View>
              <Text style={[styles.sectionCount, { color: colors.mutedForeground }]}>
                {data.completed}/{data.total}
              </Text>
            </View>

            <View style={styles.sectionBar}>
              <ProgressBar percentage={pct} height={3} color={tierColor} />
            </View>

            {/* Trophy checklist */}
            {trophies.map(trophy => {
              const isUnlocked = state.trophyCompletion[trophy.id] === true;
              return (
                <View key={trophy.id}>
                  <ChecklistItem
                    label={trophy.name}
                    checked={isUnlocked}
                    onToggle={() => toggleTrophy(trophy.id)}
                  />
                  {!isUnlocked && (
                    <Text
                      style={[styles.trophyDesc, { color: colors.mutedForeground }]}
                      numberOfLines={2}
                    >
                      {trophy.description}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        );
      })}

      {/* ── Info note ─────────────────────────────────────────── */}
      <View style={[styles.noteCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.noteText, { color: colors.mutedForeground }]}>
          ✓ No trophies are missable — all 54 are available in free-roam after completing the story.
          Estimated platinum time: 50–70 hours.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, gap: 14 },
  heading: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginBottom: 2,
  },
  overallCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  overallRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overallLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  overallPct: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  tierSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  tierStat: {
    alignItems: 'center',
    gap: 2,
  },
  tierIcon: {
    fontSize: 20,
  },
  tierCount: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
  },
  tierLabel: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
  },
  section: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.2,
  },
  sectionCount: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  sectionBar: {
    marginBottom: 8,
  },
  trophyDesc: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    lineHeight: 15,
    marginLeft: 32,
    marginTop: -4,
    marginBottom: 4,
  },
  noteCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  noteText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
});
