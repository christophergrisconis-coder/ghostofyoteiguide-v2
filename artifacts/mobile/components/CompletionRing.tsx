import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export function CompletionRing({ percentage, size = 140, strokeWidth = 10 }: Props) {
  const colors = useColors();
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const cx = size / 2;
  const cy = size / 2;
  const progress = useSharedValue(0);

  useEffect(() => {
    const target = Math.min(100, Math.max(0, percentage)) / 100;
    progress.value = withTiming(target, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg
        width={size}
        height={size}
        style={StyleSheet.absoluteFill}
      >
        {/* Track ring */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress ring — rotated to start from top (12 o'clock) */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          rotation={-90}
          origin={`${cx}, ${cy}`}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={[styles.percentage, { color: colors.foreground }]}>
          {percentage}%
        </Text>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>
          Complete
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  percentage: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -1,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 2,
  },
});
