import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { getCategoryById } from '@/data/categories';
import type { Quest } from '@/data/quests';

interface Props {
  quest: Quest;
  isComplete: boolean;
  isInProgress: boolean;
  onPress: () => void;
}

export function QuestCard({ quest, isComplete, isInProgress, onPress }: Props) {
  const colors = useColors();
  const category = getCategoryById(quest.category);

  const statusColor = isComplete
    ? colors.success
    : isInProgress
    ? colors.warning
    : colors.mutedForeground;

  const statusIcon: keyof typeof Ionicons.glyphMap = isComplete
    ? 'checkmark-circle'
    : isInProgress
    ? 'time'
    : 'ellipse-outline';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View
        style={[
          styles.stripe,
          { backgroundColor: category?.color ?? colors.primary },
        ]}
      />
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              { color: isComplete ? colors.mutedForeground : colors.foreground },
              isComplete && styles.completedText,
            ]}
            numberOfLines={1}
          >
            {quest.title}
          </Text>
          {quest.missable && (
            <View
              style={[
                styles.missableBadge,
                { backgroundColor: '#FF6B3520' },
              ]}
            >
              <Text style={styles.missableChar}>!</Text>
            </View>
          )}
        </View>
        <Text
          style={[styles.meta, { color: colors.mutedForeground }]}
          numberOfLines={1}
        >
          {quest.region} · {quest.act} · {quest.estimatedTime}
        </Text>
      </View>
      <Ionicons name={statusIcon} size={20} color={statusColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 13,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  stripe: {
    width: 3,
    height: 34,
    borderRadius: 2,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  meta: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  missableBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missableChar: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    color: '#FF6B35',
  },
});
