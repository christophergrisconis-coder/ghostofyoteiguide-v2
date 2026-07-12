import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SectionList, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';
import {
  COLLECTIBLES,
  COLLECTIBLE_GROUPS,
  type CollectibleGroup,
} from '@/data/collectibles';
import { ChecklistItem } from '@/components/ChecklistItem';
import { ProgressBar } from '@/components/ProgressBar';

type Section = {
  groupId: CollectibleGroup;
  label: string;
  icon: string;
  color: string;
  description: string;
  total: number;
  completed: number;
  data: (typeof COLLECTIBLES)[number][];
};

export default function CollectiblesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { state, toggleCollectible } = useProgress();

  const sections: Section[] = useMemo(() => {
    return COLLECTIBLE_GROUPS.map(group => {
      const items = COLLECTIBLES.filter(c => c.group === group.id);
      const completed = items.filter(
        c => state.collectibleCompletion[c.id],
      ).length;
      return {
        groupId: group.id,
        label: group.label,
        icon: group.icon,
        color: group.color,
        description: group.description,
        total: group.total,
        completed,
        data: items,
      };
    });
  }, [state.collectibleCompletion]);

  return (
    <SectionList
      style={{ backgroundColor: colors.background }}
      sections={sections}
      keyExtractor={item => item.id}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 14),
        paddingBottom: Platform.OS === 'web' ? 118 : 100,
      }}
      ListHeaderComponent={
        <Text style={[styles.heading, { color: colors.foreground }]}>
          Collectibles
        </Text>
      }
      renderSectionHeader={({ section }) => {
        const s = section as unknown as Section;
        const pct =
          s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0;
        return (
          <View
            style={[
              styles.groupHeader,
              { backgroundColor: colors.background },
            ]}
          >
            <View style={styles.groupTop}>
              <View
                style={[
                  styles.groupIconWrap,
                  { backgroundColor: s.color + '20' },
                ]}
              >
                <Ionicons
                  name={s.icon as any}
                  size={18}
                  color={s.color}
                />
              </View>
              <View style={styles.groupInfo}>
                <Text
                  style={[styles.groupLabel, { color: colors.foreground }]}
                >
                  {s.label}
                </Text>
                <Text
                  style={[
                    styles.groupDesc,
                    { color: colors.mutedForeground },
                  ]}
                  numberOfLines={1}
                >
                  {s.description}
                </Text>
              </View>
              <Text style={[styles.groupCount, { color: s.color }]}>
                {s.completed}/{s.total}
              </Text>
            </View>
            <ProgressBar
              percentage={pct}
              height={3}
              color={s.color}
            />
          </View>
        );
      }}
      renderItem={({ item }) => (
        <View
          style={[
            styles.itemWrap,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <ChecklistItem
            label={`${item.name} — ${item.hint}`}
            checked={!!state.collectibleCompletion[item.id]}
            onToggle={() => toggleCollectible(item.id)}
          />
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  groupHeader: {
    paddingTop: 20,
    paddingBottom: 10,
    gap: 8,
  },
  groupTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  groupIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupInfo: {
    flex: 1,
    gap: 2,
  },
  groupLabel: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  groupDesc: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  groupCount: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
  itemWrap: {
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 6,
  },
});
