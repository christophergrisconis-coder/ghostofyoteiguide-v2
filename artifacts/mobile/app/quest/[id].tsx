import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';
import { getQuestById, QUESTS } from '@/data/quests';
import { getCategoryById } from '@/data/categories';
import { ProgressBar } from '@/components/ProgressBar';
import { StepCard } from '@/components/StepCard';
import { BossInfoCard } from '@/components/BossInfoCard';

export default function QuestDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const { state, toggleQuest, toggleTask, updateNotes } = useProgress();

  const quest = getQuestById(id ?? '');

  if (!quest) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: 'Quest Detail' }} />
        <Ionicons name="alert-circle-outline" size={48} color={colors.mutedForeground} />
        <Text style={[styles.notFoundText, { color: colors.mutedForeground }]}>
          Quest not found
        </Text>
      </View>
    );
  }

  const category = getCategoryById(quest.category);
  const isComplete = state.questCompletion[quest.id] === true;
  const taskState = state.taskCompletion[quest.id] ?? {};
  const completedSteps = quest.steps.filter((_, i) => !!taskState[i]).length;
  const stepProgress =
    quest.steps.length > 0 ? (completedSteps / quest.steps.length) * 100 : 0;
  const playerNotes = state.playerNotes[quest.id] ?? '';

  const relatedQuests = quest.relatedQuests
    .map(rId => QUESTS.find(q => q.id === rId))
    .filter(Boolean) as NonNullable<ReturnType<typeof getQuestById>>[];

  const handleToggleQuest = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleQuest(quest.id);
  };

  const accentColor = category?.color ?? colors.primary;

  return (
    <>
      <Stack.Screen
        options={{
          title: quest.title,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.foreground,
          headerShadowVisible: false,
          headerBackTitle: 'Back',
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 1. Header card ───────────────────────────────── */}
        <View
          style={[
            styles.headerCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderLeftColor: accentColor,
              borderLeftWidth: 3,
            },
          ]}
        >
          {/* Category badge + act */}
          <View style={styles.badgeRow}>
            <View style={[styles.catBadge, { backgroundColor: accentColor + '20' }]}>
              <Ionicons
                name={(category?.icon ?? 'bookmark-outline') as any}
                size={13}
                color={accentColor}
              />
              <Text style={[styles.catBadgeText, { color: accentColor }]}>
                {category?.label}
              </Text>
            </View>
            <Text style={[styles.actText, { color: colors.mutedForeground }]}>
              {quest.act}
            </Text>
          </View>

          {/* Meta grid */}
          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={13} color={colors.mutedForeground} />
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>Region</Text>
              <Text style={[styles.metaValue, { color: colors.foreground }]} numberOfLines={1}>
                {quest.region}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={13} color={colors.mutedForeground} />
              <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>Est. time</Text>
              <Text style={[styles.metaValue, { color: colors.foreground }]}>
                {quest.estimatedTime}
              </Text>
            </View>
          </View>

          {/* Unlock requirements */}
          {quest.unlockRequirements && (
            <View style={styles.prereqRow}>
              <Ionicons name="lock-open-outline" size={13} color={colors.mutedForeground} />
              <Text style={[styles.prereqLabel, { color: colors.mutedForeground }]}>
                Unlock:
              </Text>
              <Text style={[styles.prereqVal, { color: colors.foreground }]} numberOfLines={2}>
                {quest.unlockRequirements}
              </Text>
            </View>
          )}

          {/* Prerequisites */}
          {quest.prerequisites.length > 0 && (
            <View style={styles.prereqRow}>
              <Ionicons name="git-merge-outline" size={13} color={colors.mutedForeground} />
              <Text style={[styles.prereqLabel, { color: colors.mutedForeground }]}>
                Requires:
              </Text>
              <Text style={[styles.prereqVal, { color: colors.foreground }]} numberOfLines={2}>
                {quest.prerequisites.join(' · ')}
              </Text>
            </View>
          )}
        </View>

        {/* ── 2. Overview ───────────────────────────────────── */}
        {!!quest.overview && (
          <View
            style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.sectionHeader}>
              <Ionicons name="book-outline" size={15} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Overview</Text>
            </View>
            <Text style={[styles.overviewText, { color: colors.foreground }]}>
              {quest.overview}
            </Text>
          </View>
        )}

        {/* ── 3. Rewards ────────────────────────────────────── */}
        {quest.rewards.length > 0 && (
          <View
            style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={[styles.sectionLabelSmall, { color: colors.mutedForeground }]}>
              REWARDS
            </Text>
            <View style={styles.rewardsList}>
              {quest.rewards.map((r, i) => (
                <View
                  key={i}
                  style={[
                    styles.rewardBadge,
                    { backgroundColor: '#C9A84C14', borderColor: '#C9A84C40' },
                  ]}
                >
                  <Ionicons name="gift-outline" size={11} color="#C9A84C" />
                  <Text style={[styles.rewardText, { color: colors.foreground }]}>{r}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── 4. Missable warning ───────────────────────────── */}
        {quest.missable && (
          <View
            style={[
              styles.alertBox,
              { backgroundColor: '#FF6B3514', borderColor: '#FF6B3560' },
            ]}
          >
            <Ionicons name="warning" size={16} color="#FF6B35" />
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={styles.alertTitle}>MISSABLE CONTENT</Text>
              {quest.missableNote ? (
                <Text style={[styles.alertBody, { color: colors.foreground }]}>
                  {quest.missableNote}
                </Text>
              ) : (
                <Text style={[styles.alertBody, { color: colors.foreground }]}>
                  This content may be permanently unavailable if certain conditions are not met.
                </Text>
              )}
            </View>
          </View>
        )}

        {/* ── 5. Boss info card ─────────────────────────────── */}
        {quest.bossInfo && <BossInfoCard bossInfo={quest.bossInfo} />}

        {/* ── 6. Step progress + overall toggle ────────────── */}
        <TouchableOpacity
          style={[
            styles.completionBtn,
            {
              backgroundColor: isComplete ? colors.primary + '18' : colors.card,
              borderColor: isComplete ? colors.primary : colors.border,
            },
          ]}
          onPress={handleToggleQuest}
          activeOpacity={0.75}
        >
          <View
            style={[
              styles.completionCheck,
              {
                backgroundColor: isComplete ? colors.primary : 'transparent',
                borderColor: isComplete ? colors.primary : colors.border,
              },
            ]}
          >
            {isComplete && (
              <Ionicons name="checkmark" size={17} color={colors.primaryForeground} />
            )}
          </View>
          <View style={styles.completionText}>
            <Text
              style={[
                styles.completionTitle,
                { color: isComplete ? colors.primary : colors.foreground },
              ]}
            >
              {isComplete ? 'Quest Complete' : 'Mark Quest Complete'}
            </Text>
            {!isComplete && quest.steps.length > 0 && (
              <Text style={[styles.completionSub, { color: colors.mutedForeground }]}>
                {completedSteps}/{quest.steps.length} steps done
              </Text>
            )}
          </View>
          {!isComplete && quest.steps.length > 0 && (
            <View style={{ width: 56 }}>
              <ProgressBar percentage={stepProgress} height={4} />
            </View>
          )}
        </TouchableOpacity>

        {/* ── 7. Step cards ─────────────────────────────────── */}
        {quest.steps.length > 0 && (
          <View style={styles.stepsContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="list-outline" size={15} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Walkthrough Steps
              </Text>
              <Text style={[styles.stepCount, { color: colors.mutedForeground }]}>
                {completedSteps}/{quest.steps.length}
              </Text>
            </View>
            {quest.steps.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                checked={!!taskState[i]}
                onToggle={() => toggleTask(quest.id, i)}
              />
            ))}
          </View>
        )}

        {/* ── 8. Cleanup notes ──────────────────────────────── */}
        {quest.cleanupNotes && (
          <View
            style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.sectionHeader}>
              <Ionicons name="checkmark-done-outline" size={15} color="#66BB6A" />
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Tips & Cleanup
              </Text>
            </View>
            <Text style={[styles.cleanupText, { color: colors.foreground }]}>
              {quest.cleanupNotes}
            </Text>
          </View>
        )}

        {/* ── 9. Related quests ─────────────────────────────── */}
        {relatedQuests.length > 0 && (
          <View
            style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Related</Text>
            {relatedQuests.map(rq => {
              const rCat = getCategoryById(rq.category);
              return (
                <TouchableOpacity
                  key={rq.id}
                  style={[styles.relatedRow, { borderBottomColor: colors.border }]}
                  onPress={() => router.push(`/quest/${rq.id}`)}
                >
                  <View
                    style={[
                      styles.relatedDot,
                      { backgroundColor: rCat?.color ?? colors.primary },
                    ]}
                  />
                  <Text
                    style={[styles.relatedTitle, { color: colors.foreground }]}
                    numberOfLines={1}
                  >
                    {rq.title}
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.mutedForeground} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* ── 10. Player notes ─────────────────────────────── */}
        <View
          style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name="create-outline" size={15} color={colors.mutedForeground} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>My Notes</Text>
          </View>
          <TextInput
            style={[
              styles.notesInput,
              {
                color: colors.foreground,
                borderColor: colors.border,
                backgroundColor: colors.secondary,
              },
            ]}
            value={playerNotes}
            onChangeText={text => updateNotes(quest.id, text)}
            placeholder="Add personal notes, reminders, or strategies..."
            placeholderTextColor={colors.mutedForeground}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
    gap: 12,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  notFoundText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  // Header card
  headerCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  catBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  actText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.3,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    minWidth: 140,
  },
  metaLabel: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  metaValue: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    flex: 1,
  },
  prereqRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  prereqLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  prereqVal: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  // Sections
  section: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  sectionLabelSmall: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },
  stepCount: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  overviewText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
  },
  cleanupText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
  },
  // Rewards
  rewardsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  rewardText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  // Alert box (missable)
  alertBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  alertTitle: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    color: '#FF6B35',
    letterSpacing: 1.2,
  },
  alertBody: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 19,
  },
  // Completion toggle
  completionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  completionCheck: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionText: {
    flex: 1,
    gap: 3,
  },
  completionTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  completionSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  // Steps
  stepsContainer: {
    gap: 0,
  },
  // Related
  relatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  relatedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  relatedTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  // Notes
  notesInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
});
