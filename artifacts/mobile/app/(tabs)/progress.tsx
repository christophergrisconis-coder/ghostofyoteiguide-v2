import React from 'react';
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
import { CATEGORIES } from '@/data/categories';
import { TROPHY_TIER_COLORS, TROPHY_TIER_LABELS, TROPHY_TIER_ORDER } from '@/data/trophies';
import { ProgressBar } from '@/components/ProgressBar';
import { CompletionRing } from '@/components/CompletionRing';

export default function ProgressScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { stats } = useProgress();

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
});
