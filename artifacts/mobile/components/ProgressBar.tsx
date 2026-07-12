import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';

interface Props {
  percentage: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  animated?: boolean;
}

export function ProgressBar({
  percentage,
  height = 6,
  color,
  backgroundColor,
  animated = true,
}: Props) {
  const colors = useColors();
  const progress = useSharedValue(0);

  useEffect(() => {
    const target = Math.min(100, Math.max(0, percentage)) / 100;
    if (animated) {
      progress.value = withTiming(target, {
        duration: 700,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = target;
    }
  }, [percentage]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as any,
  }));

  return (
    <View
      style={[
        styles.track,
        { height, backgroundColor: backgroundColor ?? colors.border },
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          { height, backgroundColor: color ?? colors.primary },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: 100,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    borderRadius: 100,
  },
});
