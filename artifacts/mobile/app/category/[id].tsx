import React, { useMemo, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';
import { getCategoryById } from '@/data/categories';
import { getQuestsByCategory } from '@/data/quests';
import { QuestCard } from '@/components/QuestCard';
import { SearchBar } from '@/components/SearchBar';

type FilterType = 'all' | 'complete' | 'in_progress' | 'not_started';

const FILTERS: { id: FilterType; label: string }[] = [
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
  const [filter, setFilter] = useState<FilterType>('all');

  const category = getCategoryById(id ?? '');
  const allQuests = useMemo(
    () => getQuestsByCategory((id ?? '') as import('@/data/categories').CategoryId),
    [id],
  );

  const quests = useMemo(() => {
    return allQuests.filter(quest => {
      const isComplete = state.questCompletion[quest.id] === true;
      const taskState = state.taskCompletion[quest.id] ?? {};
      const isInProgress =
        !isComplete && Object.values(taskState).some(Boolean);

      if (filter === 'complete' && !isComplete) return false;
      if (filter === 'in_progress' && !isInProgress) return false;
      if (filter === 'not_started' && (isComplete || isInProgress))
        return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          quest.title.toLowerCase().includes(q) ||
          quest.region.toLowerCase().includes(q) ||
          quest.walkthrough.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allQuests, state, filter, search]);

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
            <View style={styles.filters}>
              {FILTERS.map(f => (
                <TouchableOpacity
                  key={f.id}
                  style={[
                    styles.pill,
                    {
                      backgroundColor:
                        filter === f.id ? colors.primary : colors.card,
                      borderColor:
                        filter === f.id ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => setFilter(f.id)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[
                      styles.pillText,
                      {
                        color:
                          filter === f.id
                            ? colors.primaryForeground
                            : colors.mutedForeground,
                      },
                    ]}
                  >
                    {f.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
              No quests match your filter
            </Text>
          </View>
        }
      />
    </>
  );
}

// Ionicons import needed for empty state
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    paddingVertical: 16,
    gap: 12,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  empty: {
    paddingVertical: 48,
    alignItems: 'center',
    gap: 10,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});
