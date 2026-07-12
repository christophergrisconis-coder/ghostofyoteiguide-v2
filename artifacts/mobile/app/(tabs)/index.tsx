import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';
import { CATEGORIES, getCategoryById } from '@/data/categories';
import { QUESTS, getQuestById } from '@/data/quests';
import {
  WORLD_ACTIVITIES,
  ACTIVITY_CATEGORY_LABELS,
  ACTIVITY_CATEGORY_ICONS,
  ACTIVITY_CATEGORY_COLORS,
  type ActivityCategory,
} from '@/data/activities';
import { CompletionRing } from '@/components/CompletionRing';
import { StatCard } from '@/components/StatCard';
import { CategoryCard } from '@/components/CategoryCard';
import { QuestCard } from '@/components/QuestCard';
import { ProgressBar } from '@/components/ProgressBar';

// Derived from WORLD_ACTIVITIES so dashboard always stays in sync with the dataset
const ACTIVITY_CATS: ActivityCategory[] = [
  ...new Set(WORLD_ACTIVITIES.map(a => a.category)),
] as ActivityCategory[];

export default function DashboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { stats, state } = useProgress();

  const notStarted =
    stats.totalQuests - stats.completedQuests - stats.inProgressQuests;

  // ── Next Up: lowest-order incomplete main story quest, fallback to first side tale ──
  const nextQuest = useMemo(() => {
    const mainStory = QUESTS
      .filter(q => q.category === 'main_story')
      .sort((a, b) => a.order - b.order);
    const nextMain = mainStory.find(q => !state.questCompletion[q.id]);
    if (nextMain) return nextMain;

    const sideTales = QUESTS
      .filter(q => q.category === 'side_tales')
      .sort((a, b) => a.order - b.order);
    return sideTales.find(q => !state.questCompletion[q.id]) ?? null;
  }, [state.questCompletion]);

  // ── In Progress: quests with ≥1 step checked but not fully marked complete ──
  const inProgressQuests = useMemo(() => {
    return QUESTS
      .filter(q => {
        if (state.questCompletion[q.id]) return false;
        const taskState = state.taskCompletion[q.id] ?? {};
        return Object.values(taskState).some(Boolean);
      })
      .slice(0, 3);
  }, [state]);

  // ── Activity stats (computed from collectibleCompletion, filtered to ACTIVITY_IDS) ──
  const activityStats = useMemo(() => {
    const byCat = ACTIVITY_CATS.map(catId => {
      const items = WORLD_ACTIVITIES.filter(a => a.category === catId);
      const completed = items.filter(a => !!state.collectibleCompletion[a.id]).length;
      return { catId, total: items.length, completed };
    });
    const total = byCat.reduce((s, c) => s + c.total, 0);
    const completed = byCat.reduce((s, c) => s + c.completed, 0);
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pct, byCat };
  }, [state.collectibleCompletion]);

  const recentQuests = state.recentlyUpdated
    .map(id => getQuestById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getQuestById>>[];

  const topPadding = insets.top + (Platform.OS === 'web' ? 67 : 16);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'web' ? 118 : 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Hero ─────────────────────────────────────────────── */}
      <LinearGradient
        colors={['#1A0800', '#0D0A20', colors.background as string]}
        locations={[0, 0.5, 1]}
        style={[styles.hero, { paddingTop: topPadding }]}
      >
        <View style={styles.heroInner}>
          <View style={styles.heroText}>
            <Text style={[styles.heroEyebrow, { color: colors.primary }]}>
              GHOST OF YOTEI
            </Text>
            <Text style={[styles.heroTitle, { color: colors.foreground }]}>
              100% Guide
            </Text>
            <Text style={[styles.heroDesc, { color: colors.mutedForeground }]}>
              {stats.totalQuests} quests · {stats.totalCollectibles} collectibles{'\n'}{stats.totalTrophies} trophies · {QUESTS.filter(q => q.missable).length} missable
            </Text>
          </View>
          <CompletionRing percentage={stats.overallPercentage} size={128} />
        </View>
      </LinearGradient>

      {/* ── Stats Row ────────────────────────────────────────── */}
      <View style={styles.statsRow}>
        <StatCard
          label="Complete"
          value={stats.completedQuests}
          icon="checkmark-circle"
          color={colors.success}
        />
        <StatCard
          label="In Progress"
          value={stats.inProgressQuests}
          icon="time"
          color={colors.warning}
        />
        <StatCard
          label="Remaining"
          value={notStarted}
          icon="ellipse-outline"
          color={colors.mutedForeground}
        />
      </View>

      {/* ── Next Up card ─────────────────────────────────────── */}
      {nextQuest && (
        <View style={[styles.section, { marginTop: 16 }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Next Up
          </Text>
          <TouchableOpacity
            style={[
              styles.nextUpCard,
              { backgroundColor: colors.card, borderColor: colors.primary + '40' },
            ]}
            onPress={() => router.push(`/quest/${nextQuest.id}`)}
            activeOpacity={0.8}
          >
            <View style={[styles.nextUpAccent, { backgroundColor: colors.primary }]} />
            <View style={styles.nextUpBody}>
              {/* Category chip */}
              {(() => {
                const cat = getCategoryById(nextQuest.category);
                return (
                  <View style={[styles.nextUpChip, { backgroundColor: (cat?.color ?? colors.primary) + '20' }]}>
                    <Ionicons
                      name={(cat?.icon ?? 'bookmark-outline') as any}
                      size={10}
                      color={cat?.color ?? colors.primary}
                    />
                    <Text style={[styles.nextUpChipText, { color: cat?.color ?? colors.primary }]}>
                      {cat?.label ?? nextQuest.category}
                    </Text>
                  </View>
                );
              })()}
              <Text style={[styles.nextUpTitle, { color: colors.foreground }]} numberOfLines={2}>
                {nextQuest.title}
              </Text>
              <Text style={[styles.nextUpMeta, { color: colors.mutedForeground }]} numberOfLines={1}>
                {nextQuest.act} · {nextQuest.region}
              </Text>
            </View>
            <View style={styles.nextUpArrow}>
              <Ionicons name="chevron-forward" size={18} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Collectibles + Trophies ───────────────────────────── */}
      <View style={[styles.bannerRow, { marginTop: nextQuest ? 8 : 16 }]}>
        <View
          style={[
            styles.bannerCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.bannerLabel, { color: colors.mutedForeground }]}>
            QUESTS
          </Text>
          <Text style={[styles.bannerCount, { color: colors.primary }]}>
            {stats.completedQuests}
            <Text style={[styles.bannerTotal, { color: colors.mutedForeground }]}>
              /{stats.totalQuests}
            </Text>
          </Text>
          <Text style={[styles.bannerSub, { color: colors.mutedForeground }]}>
            {stats.totalQuests - stats.completedQuests} remaining
          </Text>
        </View>

        <View
          style={[
            styles.bannerCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.bannerLabel, { color: colors.mutedForeground }]}>
            COLLECTIBLES
          </Text>
          <Text style={[styles.bannerCount, { color: '#4A9B8E' }]}>
            {stats.completedCollectibles}
            <Text style={[styles.bannerTotal, { color: colors.mutedForeground }]}>
              /{stats.totalCollectibles}
            </Text>
          </Text>
          <Text style={[styles.bannerSub, { color: colors.mutedForeground }]}>
            {stats.totalCollectibles - stats.completedCollectibles} left
          </Text>
        </View>

        <View
          style={[
            styles.bannerCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.bannerLabel, { color: colors.mutedForeground }]}>
            TROPHIES
          </Text>
          <Text style={[styles.bannerCount, { color: '#C9A84C' }]}>
            {stats.completedTrophies}
            <Text style={[styles.bannerTotal, { color: colors.mutedForeground }]}>
              /{stats.totalTrophies}
            </Text>
          </Text>
          <Text style={[styles.bannerSub, { color: colors.mutedForeground }]}>
            {stats.trophyStats.percentage}% unlocked
          </Text>
        </View>
      </View>

      {/* ── Activities summary card ──────────────────────────── */}
      <TouchableOpacity
        style={[
          styles.actCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
        onPress={() => router.push('/(tabs)/activities')}
        activeOpacity={0.8}
      >
        {/* Header row */}
        <View style={styles.actHeader}>
          <View style={[styles.actIconWrap, { backgroundColor: '#4A9B8E20' }]}>
            <Ionicons name="flag-outline" size={16} color="#4A9B8E" />
          </View>
          <Text style={[styles.actLabel, { color: colors.mutedForeground }]}>
            ACTIVITIES
          </Text>
          <Text style={[styles.actTotal, { color: '#4A9B8E' }]}>
            {activityStats.completed}
            <Text style={[styles.actTotalOf, { color: colors.mutedForeground }]}>
              /{activityStats.total}
            </Text>
          </Text>
          <Ionicons name="chevron-forward" size={14} color={colors.mutedForeground} />
        </View>

        {/* Overall progress bar */}
        <View style={styles.actBarWrap}>
          <ProgressBar percentage={activityStats.pct} height={4} color="#4A9B8E" />
        </View>

        {/* Per-category breakdown */}
        <View style={styles.actGrid}>
          {activityStats.byCat.map(({ catId, total, completed }) => {
            const color = ACTIVITY_CATEGORY_COLORS[catId];
            const icon = ACTIVITY_CATEGORY_ICONS[catId];
            const label = ACTIVITY_CATEGORY_LABELS[catId];
            return (
              <View key={catId} style={styles.actGridItem}>
                <View style={[styles.actCatIconWrap, { backgroundColor: color + '20' }]}>
                  <Ionicons name={icon as any} size={12} color={color} />
                </View>
                <Text style={[styles.actCatLabel, { color: colors.mutedForeground }]} numberOfLines={1}>
                  {label}
                </Text>
                <Text style={[styles.actCatCount, { color: colors.foreground }]}>
                  {completed}/{total}
                </Text>
              </View>
            );
          })}
        </View>
      </TouchableOpacity>

      {/* ── In Progress quests ───────────────────────────────── */}
      {inProgressQuests.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            In Progress
          </Text>
          {inProgressQuests.map(quest => {
            const taskState = state.taskCompletion[quest.id] ?? {};
            const completedSteps = quest.steps.filter((_, i) => !!taskState[i]).length;
            const stepProgress = quest.steps.length > 0
              ? (completedSteps / quest.steps.length) * 100
              : 0;
            const cat = getCategoryById(quest.category);
            return (
              <TouchableOpacity
                key={quest.id}
                style={[
                  styles.inProgressCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                onPress={() => router.push(`/quest/${quest.id}`)}
                activeOpacity={0.8}
              >
                <View style={styles.inProgressRow}>
                  <View style={styles.inProgressLeft}>
                    <View style={[styles.inProgressDot, { backgroundColor: cat?.color ?? colors.warning }]} />
                    <View style={styles.inProgressText}>
                      <Text
                        style={[styles.inProgressTitle, { color: colors.foreground }]}
                        numberOfLines={1}
                      >
                        {quest.title}
                      </Text>
                      <Text style={[styles.inProgressMeta, { color: colors.mutedForeground }]}>
                        {completedSteps}/{quest.steps.length} steps · {quest.region}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={14} color={colors.mutedForeground} />
                </View>
                {quest.steps.length > 0 && (
                  <View style={styles.inProgressBarWrap}>
                    <ProgressBar percentage={stepProgress} height={3} color={cat?.color ?? colors.warning} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* ── Category Cards ────────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Categories
        </Text>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              stats={
                stats.categoryStats[item.id] ?? {
                  total: 0,
                  completed: 0,
                  percentage: 0,
                }
              }
              compact
              onPress={() => router.push(`/category/${item.id}`)}
            />
          )}
        />
      </View>

      {/* ── Recently Updated ──────────────────────────────────── */}
      {recentQuests.length > 0 && inProgressQuests.length === 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Recently Updated
          </Text>
          {recentQuests.map(quest => {
            const isComplete = state.questCompletion[quest.id] === true;
            const taskState = state.taskCompletion[quest.id] ?? {};
            const isInProgress =
              !isComplete && Object.values(taskState).some(Boolean);
            return (
              <QuestCard
                key={quest.id}
                quest={quest}
                isComplete={isComplete}
                isInProgress={isInProgress}
                onPress={() => router.push(`/quest/${quest.id}`)}
              />
            );
          })}
        </View>
      )}

      {/* ── Empty State ───────────────────────────────────────── */}
      {recentQuests.length === 0 && inProgressQuests.length === 0 && !nextQuest && (
        <View style={styles.section}>
          <View
            style={[
              styles.emptyCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              Begin Your Journey
            </Text>
            <Text style={[styles.emptyBody, { color: colors.mutedForeground }]}>
              {stats.totalQuests} quests, {stats.totalCollectibles} collectibles and {stats.totalTrophies} trophies await.{'\n'}
              Navigate to Quests to start tracking.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  heroInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroText: { flex: 1, gap: 6, paddingRight: 14 },
  heroEyebrow: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 2.5,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  heroDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  // Next Up
  nextUpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  nextUpAccent: {
    width: 3,
    alignSelf: 'stretch',
  },
  nextUpBody: {
    flex: 1,
    padding: 14,
    gap: 5,
  },
  nextUpChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  nextUpChipText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
  },
  nextUpTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 20,
  },
  nextUpMeta: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  nextUpArrow: {
    paddingRight: 14,
  },
  // Banner row
  bannerRow: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 20,
  },
  bannerCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 1,
  },
  bannerLabel: {
    fontSize: 8,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },
  bannerCount: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
  },
  bannerTotal: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  bannerSub: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
  },
  // In Progress
  inProgressCard: {
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  inProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
  },
  inProgressLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inProgressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  inProgressText: {
    flex: 1,
    gap: 2,
  },
  inProgressTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  inProgressMeta: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  inProgressBarWrap: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  // Section
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.3,
  },
  categoryScroll: {
    gap: 10,
    paddingRight: 4,
  },
  // Activities summary card
  actCard: {
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  actHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actLabel: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },
  actTotal: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.3,
  },
  actTotalOf: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  actBarWrap: {
    marginTop: -2,
  },
  actGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  actGridItem: {
    width: '22%',
    alignItems: 'center',
    gap: 4,
  },
  actCatIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actCatLabel: {
    fontSize: 9,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  actCatCount: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  emptyCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  emptyBody: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
});
