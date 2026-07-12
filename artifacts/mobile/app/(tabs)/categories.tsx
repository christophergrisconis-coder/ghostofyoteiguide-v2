import React from 'react';
import { FlatList, StyleSheet, Platform, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';
import { CATEGORIES } from '@/data/categories';
import { CategoryCard } from '@/components/CategoryCard';

export default function CategoriesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { stats } = useProgress();

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      data={CATEGORIES}
      keyExtractor={item => item.id}
      contentContainerStyle={[
        styles.list,
        {
          paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 14),
          paddingBottom: Platform.OS === 'web' ? 118 : 100,
        },
      ]}
      ListHeaderComponent={
        <Text style={[styles.heading, { color: colors.foreground }]}>
          Quest Categories
        </Text>
      }
      renderItem={({ item }) => (
        <CategoryCard
          category={item}
          stats={
            stats.categoryStats[item.id] ?? {
              total: 0,
              completed: 0,
              percentage: 0,
            }
          }
          onPress={() => router.push(`/category/${item.id}`)}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
    marginBottom: 16,
  },
});
