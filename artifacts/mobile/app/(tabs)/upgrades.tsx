import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

// ── Data ─────────────────────────────────────────────────────────────────────
// All specific values flagged for verification once the final game ships and
// official wikis / guides publish confirmed upgrade material requirements.

const WEAPON_TIERS = [
  {
    tier: 'T1',
    name: 'Base',
    materials: 'Crafting materials from early exploration', // verification needed
  },
  {
    tier: 'T2',
    name: 'Reinforced',
    materials: 'Iron Scraps + Leather', // verification needed
  },
  {
    tier: 'T3',
    name: 'Master',
    materials: 'Iron Ore + Silk + Lapis Lazuli', // verification needed
  },
  {
    tier: 'T4',
    name: 'Expert',
    materials: 'Refined Iron + Silk + Jade', // verification needed
  },
  {
    tier: 'T5',
    name: 'Legendary',
    materials: 'Legendary Steel + rare materials from late-game areas', // verification needed
  },
];

const ARMOUR_SETS = [
  {
    name: "Wanderer's Garb", // verification needed: exact name
    region: 'Yotei Grasslands',
    bonus: 'Starter set — moderate defence, balanced stats', // verification needed
  },
  {
    name: 'Ishikari Scout Armour', // verification needed: exact name
    region: 'Ishikari Plain',
    bonus: 'Increases draw speed and stealth movement', // verification needed
  },
  {
    name: 'Teshio Mountain Armour', // verification needed: exact name
    region: 'Teshio Ridge',
    bonus: 'Cold Resistance + increased health pool', // verification needed
  },
  {
    name: 'Tokachi Plains Armour', // verification needed: exact name
    region: 'Tokachi Range',
    bonus: 'Increases ranged damage and reload speed', // verification needed
  },
  {
    name: 'Nayoro Hunter Armour', // verification needed: exact name
    region: 'Nayoro Wilds',
    bonus: 'Stealth bonus + faster crouch movement in forests', // verification needed
  },
  {
    name: 'Oshima Coastal Armour', // verification needed: exact name
    region: 'Oshima Coast',
    bonus: 'Increases Resolve gain rate and Ghost Stance power', // verification needed
  },
];

// 13 charm slots confirmed — one per shrine climb (13 shrines total).
// Individual charm names and effects are estimates; verification needed.
const CHARM_SLOTS = 13; // confirmed via shrine count

const CHARMS = [
  {
    name: 'Charm of Resolve', // verification needed: exact name
    effect: 'Increases maximum Resolve by 1 segment',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of Fortitude', // verification needed: exact name
    effect: 'Increases maximum health',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of Shadows', // verification needed: exact name
    effect: 'Reduces enemy detection speed',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of the Wind', // verification needed: exact name
    effect: 'Increases Ghost Tool effectiveness',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of Kensei', // verification needed: exact name
    effect: 'Increases sword damage',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of Kage', // verification needed: exact name
    effect: 'Increases Assassination radius',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of Stone', // verification needed: exact name
    effect: 'Increases posture / guard strength',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of the Sea', // verification needed: exact name
    effect: 'Reduces damage taken while swimming',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of Courage', // verification needed: exact name
    effect: 'Increases damage in low-health states',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of the Hunt', // verification needed: exact name
    effect: 'Increases bow damage and range',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of the Mountain', // verification needed: exact name
    effect: 'Increases health regeneration from Resolve',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of Patience', // verification needed: exact name
    effect: 'Speeds up Resolve accumulation when still',
    source: 'Shrine climb reward',
  },
  {
    name: 'Charm of the Ghost', // verification needed: exact name
    effect: 'Amplifies Ghost Stance duration',
    source: 'Shrine climb reward',
  },
];

type Tab = 'weapons' | 'armour' | 'charms';

// ── Screen ────────────────────────────────────────────────────────────────────
export default function UpgradesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<Tab>('weapons');

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'weapons', label: 'Weapons', icon: 'cut-outline' },
    { id: 'armour', label: 'Armour', icon: 'shield-outline' },
    { id: 'charms', label: 'Charms', icon: 'sparkles-outline' },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 14),
          paddingBottom: Platform.OS === 'web' ? 118 : 100,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.heading, { color: colors.foreground }]}>
        Upgrades
      </Text>
      <Text style={[styles.subheading, { color: colors.mutedForeground }]}>
        Material costs and set bonuses are estimates — flagged for verification once the final game ships.
      </Text>

      {/* ── Tab switcher ─────────────────────────────────────── */}
      <View
        style={[
          styles.tabBar,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabBtn,
                active && { backgroundColor: colors.primary },
              ]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.75}
            >
              <Ionicons
                name={tab.icon as any}
                size={14}
                color={active ? colors.primaryForeground : colors.mutedForeground}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: active
                      ? colors.primaryForeground
                      : colors.mutedForeground,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Weapons ──────────────────────────────────────────── */}
      {activeTab === 'weapons' && (
        <View style={styles.section}>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={colors.primary}
            />
            <Text style={[styles.infoText, { color: colors.foreground }]}>
              All weapons share the same{' '}
              <Text style={{ fontFamily: 'Inter_600SemiBold' }}>
                5-tier upgrade path
              </Text>
              . Upgrade at a smith in any liberated settlement.
            </Text>
          </View>

          {WEAPON_TIERS.map((item, i) => (
            <View
              key={item.tier}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.cardRow}>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: colors.primary + '20' },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: colors.primary }]}>
                    {item.tier}
                  </Text>
                </View>
                <View style={styles.cardBody}>
                  <Text style={[styles.cardTitle, { color: colors.foreground }]}>
                    {item.name}
                  </Text>
                  <Text
                    style={[styles.cardSub, { color: colors.mutedForeground }]}
                  >
                    {item.materials}
                  </Text>
                </View>
                {i < WEAPON_TIERS.length - 1 && (
                  <Ionicons
                    name="arrow-forward-outline"
                    size={14}
                    color={colors.mutedForeground}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* ── Armour ───────────────────────────────────────────── */}
      {activeTab === 'armour' && (
        <View style={styles.section}>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={colors.primary}
            />
            <Text style={[styles.infoText, { color: colors.foreground }]}>
              One armour set per region. Each upgrades to{' '}
              <Text style={{ fontFamily: 'Inter_600SemiBold' }}>T5</Text> at
              the regional smith after liberation.
            </Text>
          </View>

          {ARMOUR_SETS.map(set => (
            <View
              key={set.name}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.cardRow}>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: '#4A9B8E20' },
                  ]}
                >
                  <Ionicons
                    name="shield-outline"
                    size={16}
                    color="#4A9B8E"
                  />
                </View>
                <View style={styles.cardBody}>
                  <Text style={[styles.cardTitle, { color: colors.foreground }]}>
                    {set.name}
                  </Text>
                  <Text
                    style={[styles.cardRegion, { color: colors.mutedForeground }]}
                  >
                    {set.region}
                  </Text>
                  <Text
                    style={[styles.cardBonus, { color: '#4A9B8E' }]}
                    numberOfLines={2}
                  >
                    {set.bonus}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* ── Charms ───────────────────────────────────────────── */}
      {activeTab === 'charms' && (
        <View style={styles.section}>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={colors.primary}
            />
            <Text style={[styles.infoText, { color: colors.foreground }]}>
              <Text style={{ fontFamily: 'Inter_600SemiBold' }}>
                {CHARM_SLOTS} charm slots
              </Text>{' '}
              — one unlocked per shrine climb. Find all 13 shrines to equip a
              full set.
            </Text>
          </View>

          {CHARMS.map(charm => (
            <View
              key={charm.name}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.cardRow}>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: '#C9A84C20' },
                  ]}
                >
                  <Ionicons
                    name="sparkles-outline"
                    size={16}
                    color="#C9A84C"
                  />
                </View>
                <View style={styles.cardBody}>
                  <Text style={[styles.cardTitle, { color: colors.foreground }]}>
                    {charm.name}
                  </Text>
                  <Text
                    style={[styles.cardSub, { color: colors.mutedForeground }]}
                  >
                    {charm.effect}
                  </Text>
                  <Text
                    style={[styles.cardRegion, { color: colors.mutedForeground }]}
                  >
                    {charm.source}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    gap: 12,
  },
  heading: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  subheading: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 17,
    marginBottom: 4,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
    borderRadius: 9,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  section: {
    gap: 10,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    width: 38,
    height: 38,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
  cardBody: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  cardSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 17,
  },
  cardRegion: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  cardBonus: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    lineHeight: 17,
  },
});
