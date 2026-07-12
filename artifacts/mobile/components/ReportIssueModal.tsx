import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';
import { getApiUrl } from '@/lib/api';

type Category = 'wrong_info' | 'missing_item' | 'other';

const CATEGORIES: { value: Category; label: string; description: string; icon: string }[] = [
  {
    value: 'wrong_info',
    label: 'Wrong information',
    description: 'A quest, collectible or fact is incorrect',
    icon: 'alert-circle-outline',
  },
  {
    value: 'missing_item',
    label: 'Missing item',
    description: 'Something is not listed that should be',
    icon: 'add-circle-outline',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Something else looks off',
    icon: 'help-circle-outline',
  },
];

interface Props {
  visible: boolean;
  onClose: () => void;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function ReportIssueModal({ visible, onClose }: Props) {
  const colors = useColors();
  const [category, setCategory] = useState<Category | null>(null);
  const [note, setNote] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const reset = () => {
    setCategory(null);
    setNote('');
    setSubmitState('idle');
    setErrorMsg('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!category) return;
    setSubmitState('submitting');
    setErrorMsg('');
    try {
      const url = getApiUrl('/api/reports');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, note: note.trim() || null }),
      });
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setSubmitState('success');
    } catch (err) {
      setSubmitState('error');
      setErrorMsg('Could not send your report. Please try again.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.foreground }]}>
            Report an issue
          </Text>
          <TouchableOpacity onPress={handleClose} hitSlop={12}>
            <Ionicons name="close" size={22} color={colors.mutedForeground} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {submitState === 'success' ? (
            <View style={styles.successContainer}>
              <View
                style={[
                  styles.successIcon,
                  { backgroundColor: colors.primary + '20' },
                ]}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={48}
                  color={colors.primary}
                />
              </View>
              <Text style={[styles.successTitle, { color: colors.foreground }]}>
                Report sent
              </Text>
              <Text
                style={[styles.successSub, { color: colors.mutedForeground }]}
              >
                Thanks for helping keep the guide accurate. We'll look into it.
              </Text>
              <TouchableOpacity
                style={[styles.doneBtn, { backgroundColor: colors.primary }]}
                onPress={handleClose}
                activeOpacity={0.8}
              >
                <Text style={[styles.doneBtnText, { color: '#fff' }]}>Done</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={[styles.prompt, { color: colors.mutedForeground }]}>
                What kind of issue did you spot?
              </Text>

              {/* Category chips */}
              <View style={styles.categories}>
                {CATEGORIES.map((cat) => {
                  const selected = category === cat.value;
                  return (
                    <TouchableOpacity
                      key={cat.value}
                      style={[
                        styles.categoryCard,
                        {
                          backgroundColor: colors.card,
                          borderColor: selected
                            ? colors.primary
                            : colors.border,
                          borderWidth: selected ? 2 : 1,
                        },
                      ]}
                      onPress={() => {
                        setCategory(cat.value);
                        Haptics.selectionAsync();
                      }}
                      activeOpacity={0.75}
                    >
                      <View
                        style={[
                          styles.catIconWrap,
                          {
                            backgroundColor: selected
                              ? colors.primary + '20'
                              : colors.border + '60',
                          },
                        ]}
                      >
                        <Ionicons
                          name={cat.icon as any}
                          size={18}
                          color={selected ? colors.primary : colors.mutedForeground}
                        />
                      </View>
                      <View style={styles.catText}>
                        <Text
                          style={[
                            styles.catLabel,
                            {
                              color: selected
                                ? colors.primary
                                : colors.foreground,
                            },
                          ]}
                        >
                          {cat.label}
                        </Text>
                        <Text
                          style={[
                            styles.catDesc,
                            { color: colors.mutedForeground },
                          ]}
                        >
                          {cat.description}
                        </Text>
                      </View>
                      {selected && (
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color={colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Optional note */}
              <Text
                style={[styles.noteLabel, { color: colors.mutedForeground }]}
              >
                Additional details{' '}
                <Text style={[styles.optional, { color: colors.mutedForeground + '80' }]}>
                  (optional)
                </Text>
              </Text>
              <TextInput
                style={[
                  styles.noteInput,
                  {
                    color: colors.foreground,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                placeholder={'e.g. \u201cThe Tanuki count is 4, not 5\u201d'}
                placeholderTextColor={colors.mutedForeground + '80'}
                multiline
                numberOfLines={3}
                maxLength={500}
                value={note}
                onChangeText={setNote}
                textAlignVertical="top"
              />

              {errorMsg !== '' && (
                <Text style={[styles.errorText, { color: colors.destructive }]}>
                  {errorMsg}
                </Text>
              )}

              {/* Submit */}
              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  {
                    backgroundColor: category
                      ? colors.primary
                      : colors.muted,
                    opacity: category ? 1 : 0.5,
                  },
                ]}
                onPress={handleSubmit}
                disabled={!category || submitState === 'submitting'}
                activeOpacity={0.8}
              >
                {submitState === 'submitting' ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.submitBtnText}>Send report</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
  },
  body: {
    padding: 20,
    gap: 14,
    paddingBottom: 40,
  },
  prompt: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 2,
  },
  categories: {
    gap: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    padding: 14,
  },
  catIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catText: { flex: 1, gap: 2 },
  catLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  catDesc: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  noteLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    marginTop: 4,
  },
  optional: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  noteInput: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    minHeight: 90,
  },
  errorText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  submitBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  submitBtnText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },
  successContainer: {
    alignItems: 'center',
    paddingTop: 40,
    gap: 14,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  successSub: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 20,
  },
  doneBtn: {
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 48,
    marginTop: 12,
  },
  doneBtnText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
});
