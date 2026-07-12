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
import { ChecklistItem } from '@/components/ChecklistItem';
import { ProgressBar } from '@/components/ProgressBar';

export default function QuestDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const { state, toggleQuest, toggleTask, updateNotes } = useProgress();

  const quest = getQuestById(id ?? '');

  if (!quest) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: 'Quest Detail' }} />
        <Ionicons
          name="alert-circle-outline"
          size={48}
          color={colors.mutedForeground}
        />
        <Text style={[styles.notFoundText, { color: colors.mutedForeground }]}>
          Quest not found
        </Text>
      </View>
    );
  }

  const category = getCategoryById(quest.category);
  const isComplete = state.questCompletion[quest.id] === true;
  const taskState = state.taskCompletion[quest.id] ?? {};
  const completedTasks = quest.tasks.filter((_, i) => !!taskState[i]).length;
  const taskProgress =
    quest.tasks.length > 0 ? (completedTasks / quest.tasks.length) * 100 : 0;
  const playerNotes = state.playerNotes[quest.id] ?? '';

  const relatedQuests = quest.relatedQuests
    .map(rId => QUESTS.find(q => q.id === rId))
    .filter(Boolean) as NonNullable<ReturnType<typeof getQuestById>>[];

  const handleToggleQuest = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleQuest(quest.id);
  };

  const headerBg = colors.card;
  const accentColor = category?.color ?? colors.primary;

  return (
    <>
      <Stack.Screen
        options={{
          title: quest.title,
          headerStyle: { backgroundColor: headerBg },
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
        {/* ── Quest header card ─────────────────────────── */}
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
          {/* Missable warning */}
          {quest.missable && (
            <View
              style={[
                styles.missableRow,
                { backgroundColor: '#FF6B3518', borderColor: '#FF6B35' },
              ]}
            >
              <Ionicons
                name="warning-outline"
                size={15}
                color="#FF6B35"
              />
              <Text style={styles.missableText}>
                MISSABLE — may be permanently unavailable
              </Text>
            </View>
          )}

          {/* Category badge + act */}
          <View style={styles.badgeRow}>
            <View
              style={[
                styles.catBadge,
                { backgroundColor: accentColor + '20' },
              ]}
            >
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

          {/* Meta row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons
                name="location-outline"
                size={13}
                color={colors.mutedForeground}
              />
              <Text
                style={[styles.metaLabel, { color: colors.mutedForeground }]}
              >
                Region
              </Text>
              <Text
                style={[styles.metaValue, { color: colors.foreground }]}
                numberOfLines={1}
              >
                {quest.region}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons
                name="time-outline"
                size={13}
                color={colors.mutedForeground}
              />
              <Text
                style={[styles.metaLabel, { color: colors.mutedForeground }]}
              >
                Est. time
              </Text>
              <Text style={[styles.metaValue, { color: colors.foreground }]}>
                {quest.estimatedTime}
              </Text>
            </View>
          </View>

          {/* Prerequisites */}
          {quest.prerequisites.length > 0 && (
            <View style={styles.prereqRow}>
              <Text
                style={[
                  styles.prereqLabel,
                  { color: colors.mutedForeground },
                ]}
              >
                Requires:
              </Text>
              <Text
                style={[styles.prereqVal, { color: colors.foreground }]}
                numberOfLines={2}
              >
                {quest.prerequisites.join(' · ')}
              </Text>
            </View>
          )}

          {/* Rewards */}
          {quest.rewards.length > 0 && (
            <View style={styles.rewardsWrap}>
              <Text
                style={[
                  styles.rewardsTitle,
                  { color: colors.mutedForeground },
                ]}
              >
                REWARDS
              </Text>
              <View style={styles.rewardsList}>
                {quest.rewards.map((r, i) => (
                  <View
                    key={i}
                    style={[
                      styles.rewardBadge,
                      {
                        backgroundColor: colors.secondary,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name="gift-outline"
                      size={11}
                      color={colors.primary}
                    />
                    <Text
                      style={[
                        styles.rewardText,
                        { color: colors.foreground },
                      ]}
                    >
                      {r}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* ── Overall completion toggle ─────────────────── */}
        <TouchableOpacity
          style={[
            styles.completionBtn,
            {
              backgroundColor: isComplete
                ? colors.primary + '18'
                : colors.card,
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
              <Ionicons
                name="checkmark"
                size={17}
                color={colors.primaryForeground}
              />
            )}
          </View>
          <View style={styles.completionText}>
            <Text
              style={[
                styles.completionTitle,
                {
                  color: isComplete ? colors.primary : colors.foreground,
                },
              ]}
            >
              {isComplete ? 'Quest Complete' : 'Mark Quest Complete'}
            </Text>
            {!isComplete && quest.tasks.length > 0 && (
              <Text
                style={[styles.completionSub, { color: colors.mutedForeground }]}
              >
                {completedTasks}/{quest.tasks.length} tasks done
              </Text>
            )}
          </View>
          {!isComplete && quest.tasks.length > 0 && (
            <View style={{ width: 56 }}>
              <ProgressBar percentage={taskProgress} height={4} />
            </View>
          )}
        </TouchableOpacity>

        {/* ── Task checklist ────────────────────────────── */}
        {quest.tasks.length > 0 && (
          <View
            style={[
              styles.section,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Checklist
            </Text>
            {quest.tasks.map((task, i) => (
              <ChecklistItem
                key={i}
                label={task.description}
                checked={!!taskState[i]}
                onToggle={() => toggleTask(quest.id, i)}
                number={i + 1}
              />
            ))}
          </View>
        )}

        {/* ── Walkthrough ───────────────────────────────── */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Walkthrough
          </Text>
          <Text style={[styles.walkthrough, { color: colors.foreground }]}>
            {quest.walkthrough}
          </Text>
        </View>

        {/* ── Tips ─────────────────────────────────────── */}
        {quest.tips.length > 0 && (
          <View
            style={[
              styles.section,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.tipsHeader}>
              <Ionicons
                name="bulb-outline"
                size={16}
                color={colors.primary}
              />
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Tips
              </Text>
            </View>
            {quest.tips.map((tip, i) => (
              <View key={i} style={styles.tipRow}>
                <View
                  style={[
                    styles.tipDot,
                    { backgroundColor: colors.primary },
                  ]}
                />
                <Text
                  style={[styles.tipText, { color: colors.foreground }]}
                >
                  {tip}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ── Related quests ────────────────────────────── */}
        {relatedQuests.length > 0 && (
          <View
            style={[
              styles.section,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Related
            </Text>
            {relatedQuests.map(rq => {
              const rCat = getCategoryById(rq.category);
              return (
                <TouchableOpacity
                  key={rq.id}
                  style={[
                    styles.relatedRow,
                    { borderBottomColor: colors.border },
                  ]}
                  onPress={() => router.push(`/quest/${rq.id}`)}
                >
                  <View
                    style={[
                      styles.relatedDot,
                      { backgroundColor: rCat?.color ?? colors.primary },
                    ]}
                  />
                  <Text
                    style={[
                      styles.relatedTitle,
                      { color: colors.foreground },
                    ]}
                    numberOfLines={1}
                  >
                    {rq.title}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={14}
                    color={colors.mutedForeground}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* ── Player notes ─────────────────────────────── */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.notesHeader}>
            <Ionicons
              name="create-outline"
              size={16}
              color={colors.mutedForeground}
            />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              My Notes
            </Text>
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
  headerCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  missableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  missableText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: '#FF6B35',
    letterSpacing: 0.3,
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
  metaRow: {
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
  rewardsWrap: { gap: 8 },
  rewardsTitle: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },
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
  section: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  walkthrough: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  tipDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 7,
    flexShrink: 0,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
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
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
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
