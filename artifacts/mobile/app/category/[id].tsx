import React, { useMemo, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';
import { getCategoryById } from '@/data/categories';
import { getQuestsByCategory } from '@/data/quests';
import { QuestCard } from '@/components/QuestCard';
import { SearchBar } from '@/components/SearchBar';

type FilterType = 'all' | 'complete' | 'in_progress' | 'not_started';

const STATUS_FILTERS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'complete', label: 'Done' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'not_started', label: 'Remaining' },
];

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const { state } = useProgress();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterType>('all');
  const [regionFilter, setRegionFilter] = useState<string>('');

  const category = getCategoryById(id ?? '');
  const allQuests = useMemo(
    () => getQuestsByCategory((id ?? '') as import('@/data/categories').CategoryId),
    [id],
  );

  // Derive sorted unique regions from this category's quests
  const regions = useMemo(() => {
    const set = new Set(allQuests.map(q => q.region));
    return Array.from(set).sort();
  }, [allQuests]);

  const showRegionFilter = regions.length > 1;

  const quests = useMemo(() => {
    return allQuests.filter(quest => {
      const isComplete = state.questCompletion[quest.id] === true;
      const taskState = state.taskCompletion[quest.id] ?? {};
      const isInProgress =
        !isComplete && Object.values(taskState).some(Boolean);

      if (statusFilter === 'complete' && !isComplete) return false;
      if (statusFilter === 'in_progress' && !isInProgress) return false;
      if (statusFilter === 'not_started' && (isComplete || isInProgress))
        return false;

      if (regionFilter && quest.region !== regionFilter) return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          quest.title.toLowerCase().includes(q) ||
          quest.region.toLowerCase().includes(q) ||
          quest.overview.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allQuests, state, statusFilter, regionFilter, search]);

  const activeFilterCount =
    (statusFilter !== 'all' ? 1 : 0) + (regionFilter ? 1 : 0);

  return (
    <>
      <Stack.Screen
        options={{
          title: category?.label ?? 'Category',
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.foreground,
          headerShadowVisible: false,
          headerBackTitle: 'Back',
        }}
      />
      <FlatList
        style={{ backgroundColor: colors.background }}
        data={quests}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search quests..."
            />

            {/* Status filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: colors.mutedForeground }]}>
                Status
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

            {/* Region filter — only shown when the category spans multiple regions */}
            {showRegionFilter && (
              <View style={styles.filterSection}>
                <Text style={[styles.filterLabel, { color: colors.mutedForeground }]}>
                  Region
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipRow}
                >
                  {/* "All regions" chip */}
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

                  {regions.map(region => {
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
                        onPress={() =>
                          setRegionFilter(active ? '' : region)
                        }
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
                          {region}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {/* Active filter summary */}
            {activeFilterCount > 0 && (
              <TouchableOpacity
                style={styles.clearRow}
                onPress={() => {
                  setStatusFilter('all');
                  setRegionFilter('');
                }}
                activeOpacity={0.7}
              >
                <Ionicons name="close-circle" size={14} color={colors.mutedForeground} />
                <Text style={[styles.clearText, { color: colors.mutedForeground }]}>
                  Clear {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
                  {'  ·  '}
                  {quests.length} of {allQuests.length} quests
                </Text>
              </TouchableOpacity>
            )}

            {activeFilterCount === 0 && (
              <Text style={[styles.countText, { color: colors.mutedForeground }]}>
                {allQuests.length} quest{allQuests.length !== 1 ? 's' : ''}
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => {
          const isComplete = state.questCompletion[item.id] === true;
          const taskState = state.taskCompletion[item.id] ?? {};
          const isInProgress =
            !isComplete && Object.values(taskState).some(Boolean);
          return (
            <QuestCard
              quest={item}
              isComplete={isComplete}
              isInProgress={isInProgress}
              onPress={() => router.push(`/quest/${item.id}`)}
            />
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="search-outline"
              size={32}
              color={colors.mutedForeground}
            />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No quests match your filters
            </Text>
            {(activeFilterCount > 0 || search.trim()) && (
              <TouchableOpacity
                onPress={() => {
                  setStatusFilter('all');
                  setRegionFilter('');
                  setSearch('');
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.emptyLink, { color: colors.primary }]}>
                  Clear all filters
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    paddingVertical: 16,
    gap: 10,
  },
  filterSection: {
    gap: 6,
  },
  filterLabel: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 4,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  clearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop: 2,
  },
  clearText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  countText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    paddingTop: 2,
  },
  empty: {
    paddingVertical: 48,
    alignItems: 'center',
    gap: 10,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  emptyLink: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginTop: 4,
  },
});
