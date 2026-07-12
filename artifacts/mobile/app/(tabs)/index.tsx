import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';
import { CATEGORIES } from '@/data/categories';
import { getQuestById } from '@/data/quests';
import { CompletionRing } from '@/components/CompletionRing';
import { StatCard } from '@/components/StatCard';
import { CategoryCard } from '@/components/CategoryCard';
import { QuestCard } from '@/components/QuestCard';

export default function DashboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { stats, state } = useProgress();

  const notStarted =
    stats.totalQuests - stats.completedQuests - stats.inProgressQuests;

  const recentQuests = state.recentlyUpdated
    .map(id => getQuestById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getQuestById>>[];

  const topPadding =
    insets.top + (Platform.OS === 'web' ? 67 : 16);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'web' ? 118 : 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Hero Section ─────────────────────────────────────── */}
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
              119 quests · 319 collectibles{'\n'}54 trophies · 0 missable
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

      {/* ── Collectibles + Trophies Banner row ───────────────── */}
      <View style={styles.bannerRow}>
        <View
          style={[
            styles.bannerCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.bannerLabel, { color: colors.mutedForeground }]}>
            COLLECTIBLES
          </Text>
          <Text style={[styles.bannerCount, { color: colors.primary }]}>
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

      {/* ── Category Cards (horizontal) ──────────────────────── */}
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

      {/* ── Recently Updated ─────────────────────────────────── */}
      {recentQuests.length > 0 && (
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

      {/* ── Empty State ──────────────────────────────────────── */}
      {recentQuests.length === 0 && (
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
              119 quests, 319 collectibles and 54 trophies await.{'\n'}
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
  bannerRow: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 20,
    marginTop: 12,
  },
  bannerCard: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 2,
  },
  bannerLabel: {
    fontSize: 9,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 2,
  },
  bannerCount: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
  },
  bannerTotal: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  bannerSub: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
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
