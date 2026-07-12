import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { ProgressBar } from '@/components/ProgressBar';
import type { Category } from '@/data/categories';
import type { CategoryStats } from '@/context/ProgressContext';

interface Props {
  category: Category;
  stats: CategoryStats;
  onPress: () => void;
  compact?: boolean;
}

export function CategoryCard({ category, stats, onPress, compact = false }: Props) {
  const colors = useColors();

  if (compact) {
    return (
      <TouchableOpacity
        style={[
          styles.compactCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
        onPress={onPress}
        activeOpacity={0.75}
      >
        <View
          style={[
            styles.compactIcon,
            { backgroundColor: category.color + '20' },
          ]}
        >
          <Ionicons
            name={category.icon as any}
            size={16}
            color={category.color}
          />
        </View>
        <View style={styles.compactInfo}>
          <Text
            style={[styles.compactLabel, { color: colors.foreground }]}
            numberOfLines={1}
          >
            {category.label}
          </Text>
          <ProgressBar
            percentage={stats.percentage}
            height={3}
            color={category.color}
          />
        </View>
        <Text style={[styles.compactPct, { color: category.color }]}>
          {stats.percentage}%
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.header}>
        <View
          style={[styles.iconBg, { backgroundColor: category.color + '20' }]}
        >
          <Ionicons
            name={category.icon as any}
            size={22}
            color={category.color}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.label, { color: colors.foreground }]}>
            {category.label}
          </Text>
          <Text
            style={[styles.subtitle, { color: colors.mutedForeground }]}
            numberOfLines={1}
          >
            {category.description}
          </Text>
        </View>
        <Text style={[styles.badgePct, { color: category.color }]}>
          {stats.percentage}%
        </Text>
      </View>
      <ProgressBar
        percentage={stats.percentage}
        height={5}
        color={category.color}
      />
      <View style={styles.counts}>
        <Text style={[styles.countText, { color: colors.mutedForeground }]}>
          {stats.completed} / {stats.total} complete
        </Text>
        <Text style={[styles.countText, { color: colors.mutedForeground }]}>
          {stats.total - stats.completed} remaining
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBg: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  badgePct: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    minWidth: 38,
    textAlign: 'right',
  },
  counts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  // Compact
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    width: 190,
  },
  compactIcon: {
    width: 30,
    height: 30,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactInfo: {
    flex: 1,
    gap: 5,
  },
  compactLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  compactPct: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    minWidth: 32,
    textAlign: 'right',
  },
});
