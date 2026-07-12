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
  WORLD_ACTIVITIES,
  ACTIVITY_CATEGORY_LABELS,
  ACTIVITY_CATEGORY_ICONS,
  ACTIVITY_CATEGORY_COLORS,
  type ActivityCategory,
} from '@/data/activities';
import { ChecklistItem } from '@/components/ChecklistItem';
import { ProgressBar } from '@/components/ProgressBar';

// Only show categories that have items in the dataset
const ACTIVE_CATEGORIES: ActivityCategory[] = ['liberation', 'duel', 'haiku', 'vanity'];

type Section = {
  catId: ActivityCategory;
  label: string;
  icon: string;
  color: string;
  total: number;
  completed: number;
  data: (typeof WORLD_ACTIVITIES)[number][];
};

// Derive region list from actual activity data
const ALL_REGIONS = [...new Set(WORLD_ACTIVITIES.map(a => a.region))].sort();

type StatusFilter = 'all' | 'remaining' | 'done';

const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'remaining', label: 'Remaining' },
  { id: 'done', label: 'Done' },
];

export default function ActivitiesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { state, toggleCollectible } = useProgress();
  const [query, setQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const sections: Section[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ACTIVE_CATEGORIES.map(catId => {
      const allItems = WORLD_ACTIVITIES.filter(a => a.category === catId);
      const completed = allItems.filter(
        a => state.collectibleCompletion[a.id],
      ).length;

      let items = allItems;
      if (regionFilter) {
        items = items.filter(a => a.region === regionFilter);
      }
      if (statusFilter === 'remaining') {
        items = items.filter(a => !state.collectibleCompletion[a.id]);
      } else if (statusFilter === 'done') {
        items = items.filter(a => !!state.collectibleCompletion[a.id]);
      }
      if (q) {
        items = items.filter(
          a =>
            a.name.toLowerCase().includes(q) ||
            a.region.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q),
        );
      }
      return {
        catId,
        label: ACTIVITY_CATEGORY_LABELS[catId],
        icon: ACTIVITY_CATEGORY_ICONS[catId],
        color: ACTIVITY_CATEGORY_COLORS[catId],
        total: allItems.length,
        completed,
        data: items,
      };
    }).filter(s => s.data.length > 0);
  }, [state.collectibleCompletion, query, regionFilter, statusFilter]);

  const isFiltering = query.trim().length > 0 || !!regionFilter || statusFilter !== 'all';

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
            Activities
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
              placeholder="Search by name, region, or description…"
              placeholderTextColor={colors.mutedForeground}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              clearButtonMode="while-editing"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          {/* Status filter */}
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: colors.mutedForeground }]}>
              STATUS
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              {STATUS_FILTERS.map(f => {
                const active = statusFilter === f.id;
                return (
                  <TouchableOpacity
                    key={f.id}
                    style={[
                      styles.pill,
                      {
                        backgroundColor: active ? colors.primary : colors.card,
                        borderColor: active ? colors.primary : colors.border,
                      },
                    ]}
                    onPress={() => setStatusFilter(f.id)}
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
                    >
                      {f.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
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
                      {region
                        .replace(' Plain', '')
                        .replace(' Grasslands', '')
                        .replace(' Range', '')
                        .replace(' Wilds', '')
                        .replace(' Ridge', '')
                        .replace(' Coast', '')}
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
                setStatusFilter('all');
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
              No activities match your filters
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
                    {s.completed} of {s.total} completed
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
            hint={item.description}
            checked={!!state.collectibleCompletion[item.id]}
            onToggle={() => toggleCollectible(item.id)}
          />
          {item.tips && (
            <View style={[styles.tipNote, { borderTopColor: colors.border }]}>
              <Ionicons name="bulb-outline" size={11} color={colors.mutedForeground} />
              <Text style={[styles.tipNoteText, { color: colors.mutedForeground }]}>
                {item.tips}
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
  tipNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tipNoteText: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
    flex: 1,
  },
});
