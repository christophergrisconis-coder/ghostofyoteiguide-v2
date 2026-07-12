import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';
import type { QuestStep } from '@/data/quests';

interface Props {
  step: QuestStep;
  index: number;
  checked: boolean;
  onToggle: () => void;
}

interface ChipProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  text: string;
  bg: string;
  color: string;
}

function Chip({ icon, label, text, bg, color }: ChipProps) {
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <View style={styles.chipHeader}>
        <Ionicons name={icon} size={11} color={color} />
        <Text style={[styles.chipLabel, { color }]}>{label}</Text>
      </View>
      <Text style={[styles.chipText, { color }]}>{text}</Text>
    </View>
  );
}

export function StepCard({ step, index, checked, onToggle }: Props) {
  const colors = useColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.9, { damping: 12, stiffness: 300 }),
      withSpring(1, { damping: 10, stiffness: 200 }),
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };

  const hasChips = step.warning || step.tip || step.rewardNote || step.beforeLeaving;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: checked ? colors.secondary : colors.card,
          borderColor: checked ? colors.border : colors.border,
          opacity: checked ? 0.7 : 1,
        },
      ]}
    >
      {/* ── Top row: number + checkbox + title ── */}
      <TouchableOpacity
        style={styles.topRow}
        onPress={handlePress}
        activeOpacity={0.75}
      >
        {/* Step number badge */}
        <View
          style={[
            styles.numberBadge,
            { backgroundColor: checked ? colors.border : colors.primary + '20' },
          ]}
        >
          <Text
            style={[
              styles.numberText,
              { color: checked ? colors.mutedForeground : colors.primary },
            ]}
          >
            {index + 1}
          </Text>
        </View>

        {/* Animated checkbox */}
        <Animated.View
          style={[
            styles.checkbox,
            {
              borderColor: checked ? colors.primary : colors.border,
              backgroundColor: checked ? colors.primary : 'transparent',
            },
            animatedStyle,
          ]}
        >
          {checked && (
            <Ionicons
              name="checkmark"
              size={13}
              color={colors.primaryForeground}
            />
          )}
        </Animated.View>

        {/* Title */}
        <Text
          style={[
            styles.title,
            {
              color: checked ? colors.mutedForeground : colors.foreground,
              textDecorationLine: checked ? 'line-through' : 'none',
              flex: 1,
            },
          ]}
        >
          {step.title}
        </Text>
      </TouchableOpacity>

      {/* ── Detail paragraph ── */}
      {!!step.detail && (
        <Text style={[styles.detail, { color: colors.foreground }]}>
          {step.detail}
        </Text>
      )}

      {/* ── Chips ── */}
      {hasChips && (
        <View style={styles.chips}>
          {step.warning && (
            <Chip
              icon="warning-outline"
              label="WARNING"
              text={step.warning}
              bg="#FF4D4D14"
              color="#FF6B6B"
            />
          )}
          {step.tip && (
            <Chip
              icon="bulb-outline"
              label="TIP"
              text={step.tip}
              bg="#4A90D914"
              color="#4A90D9"
            />
          )}
          {step.rewardNote && (
            <Chip
              icon="gift-outline"
              label="REWARD"
              text={step.rewardNote}
              bg="#C9A84C14"
              color="#C9A84C"
            />
          )}
          {step.beforeLeaving && (
            <Chip
              icon="checkmark-circle-outline"
              label="BEFORE LEAVING"
              text={step.beforeLeaving}
              bg="#4CAF5014"
              color="#66BB6A"
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 10,
    marginBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  numberText: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 20,
  },
  detail: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
    paddingLeft: 34,
  },
  chips: {
    gap: 8,
    paddingLeft: 34,
  },
  chip: {
    borderRadius: 8,
    padding: 10,
    gap: 4,
  },
  chipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  chipLabel: {
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.2,
  },
  chipText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 19,
  },
});
