import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import type { BossInfo } from '@/data/quests';

interface Props {
  bossInfo: BossInfo;
}

export function BossInfoCard({ bossInfo }: Props) {
  const colors = useColors();
  const [expanded, setExpanded] = useState(true);

  const BOSS_RED = '#C0392B';
  const BOSS_BG = '#C0392B12';
  const BOSS_BORDER = '#C0392B40';

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: BOSS_BG, borderColor: BOSS_BORDER },
      ]}
    >
      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(e => !e)}
        activeOpacity={0.75}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="skull-outline" size={16} color={BOSS_RED} />
          <Text style={[styles.headerLabel, { color: BOSS_RED }]}>
            BOSS ENCOUNTER
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.bossName, { color: colors.foreground }]}>
            {bossInfo.name}
          </Text>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={14}
            color={colors.mutedForeground}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <>
          {/* Description */}
          <Text style={[styles.description, { color: colors.foreground }]}>
            {bossInfo.description}
          </Text>

          {/* Phases */}
          {bossInfo.phases && bossInfo.phases.length > 0 && (
            <View style={styles.phases}>
              {bossInfo.phases.map((phase, i) => (
                <View
                  key={i}
                  style={[
                    styles.phase,
                    {
                      borderLeftColor: BOSS_RED,
                      backgroundColor: colors.card,
                    },
                  ]}
                >
                  <Text style={[styles.phaseLabel, { color: BOSS_RED }]}>
                    {phase.phase.toUpperCase()}
                  </Text>
                  <Text
                    style={[styles.phaseDesc, { color: colors.foreground }]}
                  >
                    {phase.description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerLabel: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  bossName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 21,
  },
  phases: {
    gap: 8,
  },
  phase: {
    borderLeftWidth: 3,
    paddingLeft: 12,
    paddingVertical: 8,
    paddingRight: 10,
    borderRadius: 6,
    gap: 3,
  },
  phaseLabel: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.2,
  },
  phaseDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 19,
  },
});
