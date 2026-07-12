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
import Constants from 'expo-constants';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';

function formatBackupTime(iso: string | null): string {
  if (!iso) return 'Never';
  try {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60_000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay}d ago`;
  } catch {
    return 'Unknown';
  }
}

function SettingRow({
  icon,
  label,
  sublabel,
  onPress,
  danger,
  loading,
  rightElement,
}: {
  icon: string;
  label: string;
  sublabel?: string;
  onPress: () => void;
  danger?: boolean;
  loading?: boolean;
  rightElement?: React.ReactNode;
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
      ) : rightElement ? (
        rightElement
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
  const {
    resetProgress,
    exportProgress,
    importProgress,
    backupNow,
    restoreFromBackup,
    stats,
    lastBackupAt,
    hasPendingRestore,
    dismissRestorePrompt,
  } = useProgress();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isBacking, setIsBacking] = useState(false);

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

  const handleBackupNow = async () => {
    setIsBacking(true);
    try {
      const ok = await backupNow();
      if (ok) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Alert.alert('Backup Failed', 'Could not write backup. Please try again.');
      }
    } catch {
      Alert.alert('Backup Failed', 'Something went wrong.');
    } finally {
      setIsBacking(false);
    }
  };

  const handleCloudRestore = () => {
    Alert.alert(
      'Restore from Auto-Backup',
      'A backup from your previous install was found. Restore it now? Your current progress (if any) will be replaced.',
      [
        {
          text: 'Dismiss',
          style: 'cancel',
          onPress: dismissRestorePrompt,
        },
        {
          text: 'Restore',
          onPress: async () => {
            const result = await restoreFromBackup();
            if (result.success) {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              Alert.alert('Restored', result.message);
            } else {
              Alert.alert('Restore Failed', result.message);
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

  const backupTimeLabel = formatBackupTime(lastBackupAt);
  const showAutoBackup = Platform.OS !== 'web';

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

      {/* Restore banner — shown only when a backup exists from a prior install */}
      {hasPendingRestore && (
        <TouchableOpacity
          style={[
            styles.restoreBanner,
            { backgroundColor: colors.primary + '18', borderColor: colors.primary + '55' },
          ]}
          onPress={handleCloudRestore}
          activeOpacity={0.8}
        >
          <Ionicons name="cloud-download-outline" size={20} color={colors.primary} />
          <View style={styles.bannerText}>
            <Text style={[styles.bannerTitle, { color: colors.primary }]}>
              Previous backup found
            </Text>
            <Text style={[styles.bannerSub, { color: colors.mutedForeground }]}>
              Tap to restore your progress from a prior install
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={15} color={colors.primary} />
        </TouchableOpacity>
      )}

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
          v{Constants.expoConfig?.version ?? '1.0.0'} · {Platform.OS === 'ios' ? 'App Store' : Platform.OS === 'android' ? 'Google Play' : 'Web'}
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

      {/* Data */}
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

        {/* Auto-backup status row — iOS/Android only */}
        {showAutoBackup && (
          <SettingRow
            icon="cloud-outline"
            label="Auto Backup"
            sublabel={`Saved to device storage · Last backup: ${backupTimeLabel}`}
            onPress={handleBackupNow}
            loading={isBacking}
            rightElement={
              <Text style={[styles.backupNowLabel, { color: colors.primary }]}>
                Back Up Now
              </Text>
            }
          />
        )}

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
          progress through all quests, collectibles, and trophies. Available on
          iOS and Android.
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
        {showAutoBackup && (
          <Text
            style={[
              styles.aboutBody,
              { color: colors.mutedForeground, marginTop: 8 },
            ]}
          >
            Your progress is automatically backed up to your device's document
            storage, which iOS backs up to iCloud and Android backs up to
            Google Drive. If you reinstall the app, you'll be offered to restore
            your data on first launch.
          </Text>
        )}
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
  restoreBanner: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerText: { flex: 1, gap: 2 },
  bannerTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  bannerSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
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
  backupNowLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
});
