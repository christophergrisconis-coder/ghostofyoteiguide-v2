import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
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

const ALL_REGIONS = [
  'Yotei Grasslands',
  'Ishikari Plain',
  'Teshio Ridge',
  'Tokachi Range',
  'Nayoro Wilds',
  'Oshima Coast',
];

export default function CollectiblesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { state, toggleCollectible } = useProgress();
  const [query, setQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  const sections: Section[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COLLECTIBLE_GROUPS.map(group => {
      const allItems = COLLECTIBLES.filter(c => c.group === group.id);
      const completed = allItems.filter(
        c => state.collectibleCompletion[c.id],
      ).length;

      let items = allItems;
      if (regionFilter) {
        items = items.filter(c => c.region === regionFilter);
      }
      if (q) {
        items = items.filter(
          c =>
            c.name.toLowerCase().includes(q) ||
            c.region.toLowerCase().includes(q) ||
            c.hint.toLowerCase().includes(q),
        );
      }
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
  }, [state.collectibleCompletion, query, regionFilter]);

  const isFiltering = query.trim().length > 0 || !!regionFilter;

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

          {/* Search */}
          <View
            style={[
              styles.searchBar,
              { backgroundColor: colors.card, borderColor: colors.border },
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
              placeholder="Search by name, region, or location…"
              placeholderTextColor={colors.mutedForeground}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              clearButtonMode="while-editing"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          {/* Region filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: colors.mutedForeground }]}>
              REGION
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              {/* All */}
              <TouchableOpacity
                style={[
                  styles.pill,
                  {
                    backgroundColor: !regionFilter ? colors.primary : colors.card,
                    borderColor: !regionFilter ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setRegionFilter('')}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.pillText,
                    {
                      color: !regionFilter
                        ? colors.primaryForeground
                        : colors.mutedForeground,
                    },
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>

              {ALL_REGIONS.map(region => {
                const active = regionFilter === region;
                return (
                  <TouchableOpacity
                    key={region}
                    style={[
                      styles.pill,
                      {
                        backgroundColor: active ? colors.primary : colors.card,
                        borderColor: active ? colors.primary : colors.border,
                      },
                    ]}
                    onPress={() => setRegionFilter(active ? '' : region)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        {
                          color: active
                            ? colors.primaryForeground
                            : colors.mutedForeground,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {region.replace(' Plain', '').replace(' Grasslands', '').replace(' Range', '').replace(' Wilds', '').replace(' Ridge', '').replace(' Coast', '')}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Clear / count summary */}
          {isFiltering && (
            <TouchableOpacity
              style={styles.clearRow}
              onPress={() => {
                setQuery('');
                setRegionFilter('');
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle" size={14} color={colors.mutedForeground} />
              <Text style={[styles.clearText, { color: colors.mutedForeground }]}>
                Clear filters · {sections.reduce((n, s) => n + s.data.length, 0)} shown
              </Text>
            </TouchableOpacity>
          )}

          {isFiltering && sections.length === 0 && (
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No collectibles match your filters
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
          {item.mapNote && (
            <View style={[styles.mapNote, { borderTopColor: colors.border }]}>
              <Ionicons name="navigate-outline" size={11} color={colors.mutedForeground} />
              <Text style={[styles.mapNoteText, { color: colors.mutedForeground }]}>
                {item.mapNote}
              </Text>
            </View>
          )}
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
    marginBottom: 12,
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
  filterSection: {
    gap: 6,
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 4,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  clearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop: 4,
    marginBottom: 4,
  },
  clearText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
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
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 6,
    overflow: 'hidden',
  },
  mapNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  mapNoteText: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
    flex: 1,
  },
});
