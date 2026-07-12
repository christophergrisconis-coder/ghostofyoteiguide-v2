import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';

interface Props {
  label: string;
  checked: boolean;
  onToggle: () => void;
  number?: number;
  /** Optional secondary line shown beneath the label (e.g. region name) */
  subtitle?: string;
  /** Optional hint shown as a third, muted line */
  hint?: string;
}

export function ChecklistItem({ label, checked, onToggle, number, subtitle, hint }: Props) {
  const colors = useColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.88, { damping: 12, stiffness: 300 }),
      withSpring(1, { damping: 10, stiffness: 200 }),
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };

  return (
    <TouchableOpacity
      style={[styles.item, { borderBottomColor: colors.border }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {number !== undefined && (
        <Text style={[styles.number, { color: colors.mutedForeground }]}>
          {number}
        </Text>
      )}
      <Animated.View
        style={[
          styles.checkbox,
          {
            borderColor: checked ? colors.primary : colors.border,
            backgroundColor: checked ? colors.primary + '20' : 'transparent',
          },
          animatedStyle,
        ]}
      >
        {checked && (
          <Ionicons name="checkmark" size={13} color={colors.primary} />
        )}
      </Animated.View>
      <View style={styles.textStack}>
        <Text
          style={[
            styles.label,
            {
              color: checked ? colors.mutedForeground : colors.foreground,
              textDecorationLine: checked ? 'line-through' : 'none',
              opacity: checked ? 0.65 : 1,
            },
          ]}
          numberOfLines={3}
        >
          {label}
        </Text>
        {subtitle ? (
          <Text
            style={[styles.subtitle, { color: colors.mutedForeground }]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
        {hint ? (
          <Text
            style={[styles.hint, { color: colors.mutedForeground }]}
            numberOfLines={2}
          >
            {hint}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 11,
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  number: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    minWidth: 18,
    paddingTop: 3,
    textAlign: 'right',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  textStack: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    opacity: 0.7,
  },
  hint: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    opacity: 0.55,
    fontStyle: 'italic',
  },
});
