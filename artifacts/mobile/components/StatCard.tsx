import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

interface Props {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
}

export function StatCard({ label, value, icon, color }: Props) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <Ionicons name={icon} size={20} color={color ?? colors.primary} />
      <Text style={[styles.value, { color: color ?? colors.foreground }]}>
        {value}
      </Text>
      <Text style={[styles.label, { color: colors.mutedForeground }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  value: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
  },
  label: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
