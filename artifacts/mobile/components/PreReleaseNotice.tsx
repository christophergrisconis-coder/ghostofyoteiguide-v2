import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

interface Props {
  message?: string;
}

/**
 * Amber banner shown on screens whose data is AI-generated pre-release content.
 * Prevents players from following fake collectible locations or upgrade costs as facts.
 */
export function PreReleaseNotice({ message }: Props) {
  const colors = useColors();
  return (
    <View style={[styles.container, { backgroundColor: '#7C4D0015', borderColor: '#C9A84C50' }]}>
      <Ionicons name="warning-outline" size={15} color="#C9A84C" style={styles.icon} />
      <Text style={[styles.text, { color: '#C9A84C' }]}>
        {message ??
          'Pre-release data — names, locations, and values are estimates that will be updated once the game ships.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  icon: {
    marginTop: 1,
    flexShrink: 0,
  },
  text: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 17,
  },
});
