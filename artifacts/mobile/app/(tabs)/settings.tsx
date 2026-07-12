import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';

function SettingRow({
  icon,
  label,
  sublabel,
  onPress,
  danger,
  loading,
}: {
  icon: string;
  label: string;
  sublabel?: string;
  onPress: () => void;
  danger?: boolean;
  loading?: boolean;
}) {
  const colors = useColors();
  const iconColor = danger ? colors.destructive : colors.primary;
  const iconBg = iconColor + '20';
  return (
    <TouchableOpacity
      style={[styles.row, { borderBottomColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={loading}
    >
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon as any} size={17} color={iconColor} />
      </View>
      <View style={styles.rowText}>
        <Text
          style={[
            styles.rowLabel,
            { color: danger ? colors.destructive : colors.foreground },
          ]}
        >
          {label}
        </Text>
        {sublabel && (
          <Text style={[styles.rowSub, { color: colors.mutedForeground }]}>
            {sublabel}
          </Text>
        )}
      </View>
      {loading ? (
        <ActivityIndicator size="small" color={colors.mutedForeground} />
      ) : (
        <Ionicons
          name="chevron-forward"
          size={15}
          color={colors.mutedForeground}
        />
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { resetProgress, exportProgress, importProgress, stats } = useProgress();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportProgress();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      Alert.alert('Export Failed', 'Could not export your progress. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = () => {
    Alert.alert(
      'Restore Progress',
      'This will replace your current progress with the data from the backup file. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Choose File',
          onPress: async () => {
            setIsImporting(true);
            try {
              const result = await importProgress();
              if (result.success) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                Alert.alert('Restored', result.message);
              } else if (result.message !== 'Import cancelled.') {
                Alert.alert('Import Failed', result.message);
              }
            } catch {
              Alert.alert('Import Failed', 'Something went wrong. Please try again.');
            } finally {
              setIsImporting(false);
            }
          },
        },
      ],
    );
  };

  const handleReset = () => {
    Alert.alert(
      'Reset All Progress',
      'This will permanently erase all your completion data, notes, and progress. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Everything',
          style: 'destructive',
          onPress: () => {
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Warning,
            );
            resetProgress();
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 14),
          paddingBottom:
            insets.bottom + (Platform.OS === 'web' ? 34 : 0) + 100,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.heading, { color: colors.foreground }]}>
        Settings
      </Text>

      {/* App identity */}
      <View
        style={[
          styles.heroCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.appName, { color: colors.primary }]}>
          Ghost of Yotei
        </Text>
        <Text style={[styles.appSub, { color: colors.foreground }]}>
          100% Completion Guide
        </Text>
        <Text style={[styles.appVer, { color: colors.mutedForeground }]}>
          v1.0.0 · For Expo Go
        </Text>
      </View>

      {/* Progress summary */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text
          style={[styles.sectionLabel, { color: colors.mutedForeground }]}
        >
          YOUR PROGRESS
        </Text>
        {[
          { label: 'Overall completion', value: `${stats.overallPercentage}%`, color: colors.primary },
          { label: 'Quests completed', value: `${stats.completedQuests}/${stats.totalQuests}`, color: colors.foreground },
          { label: 'Collectibles found', value: `${stats.completedCollectibles}/${stats.totalCollectibles}`, color: colors.foreground },
          { label: 'In progress', value: String(stats.inProgressQuests), color: colors.warning },
        ].map(item => (
          <View key={item.label} style={styles.summaryRow}>
            <Text
              style={[styles.summaryLabel, { color: colors.foreground }]}
            >
              {item.label}
            </Text>
            <Text
              style={[styles.summaryValue, { color: item.color }]}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Actions */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text
          style={[styles.sectionLabel, { color: colors.mutedForeground }]}
        >
          DATA
        </Text>
        <SettingRow
          icon="share-outline"
          label="Export Progress"
          sublabel="Save a backup of your completion data as a JSON file"
          onPress={handleExport}
          loading={isExporting}
        />
        <SettingRow
          icon="download-outline"
          label="Import Progress"
          sublabel="Restore from a previously exported backup file"
          onPress={handleImport}
          loading={isImporting}
        />
        <SettingRow
          icon="trash-outline"
          label="Reset All Progress"
          sublabel="Erase all completion data, notes and tracked progress"
          onPress={handleReset}
          danger
        />
      </View>

      {/* About */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text
          style={[styles.sectionLabel, { color: colors.mutedForeground }]}
        >
          ABOUT
        </Text>
        <Text style={[styles.aboutBody, { color: colors.mutedForeground }]}>
          A data-first 100% completion guide for Ghost of Yotei. Track your
          progress through all quests, collectibles, and trophies. Built for
          Expo Go on iOS and Android.
        </Text>
        <Text
          style={[
            styles.aboutBody,
            { color: colors.mutedForeground, marginTop: 8 },
          ]}
        >
          Content references are based on pre-release information and may be
          updated after the game launches.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, gap: 16 },
  heading: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  heroCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    gap: 4,
  },
  appName: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.3,
  },
  appSub: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  appVer: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 2,
    marginBottom: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1, gap: 2 },
  rowLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  rowSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  aboutBody: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 19,
  },
});
