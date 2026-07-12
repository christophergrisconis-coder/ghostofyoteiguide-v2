import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Platform,
  TextInput,
} from 'react-native';
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
  const [query, setQuery] = useState('');

  const sections: Section[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COLLECTIBLE_GROUPS.map(group => {
      const allItems = COLLECTIBLES.filter(c => c.group === group.id);
      const completed = allItems.filter(
        c => state.collectibleCompletion[c.id],
      ).length;
      const items = q
        ? allItems.filter(
            c =>
              c.name.toLowerCase().includes(q) ||
              c.region.toLowerCase().includes(q),
          )
        : allItems;
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
    }).filter(s => s.data.length > 0);
  }, [state.collectibleCompletion, query]);

  const isFiltering = query.trim().length > 0;

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
        <View>
          <Text style={[styles.heading, { color: colors.foreground }]}>
            Collectibles
          </Text>
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={16}
              color={colors.mutedForeground}
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, { color: colors.foreground }]}
              placeholder="Search by name or region…"
              placeholderTextColor={colors.mutedForeground}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              clearButtonMode="while-editing"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
          {isFiltering && sections.length === 0 && (
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No collectibles match "{query}"
            </Text>
          )}
        </View>
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
                {!isFiltering && (
                  <Text
                    style={[
                      styles.groupDesc,
                      { color: colors.mutedForeground },
                    ]}
                    numberOfLines={1}
                  >
                    {s.description}
                  </Text>
                )}
              </View>
              <Text style={[styles.groupCount, { color: s.color }]}>
                {s.completed}/{s.total}
              </Text>
            </View>
            {!isFiltering && (
              <ProgressBar
                percentage={pct}
                height={3}
                color={s.color}
              />
            )}
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
            label={item.name}
            subtitle={item.region}
            hint={item.hint}
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
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 4,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    paddingVertical: 0,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: 32,
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
