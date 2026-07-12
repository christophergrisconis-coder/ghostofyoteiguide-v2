import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ProgressProvider, useProgress } from '@/context/ProgressContext';
import { flushReportQueue } from '@/lib/reportQueue';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * Shows a one-time alert on first launch when a backup exists from a prior
 * install. Lives inside ProgressProvider so it can read context.
 */
function RestorePrompt() {
  const { isLoaded, hasPendingRestore, restoreFromBackup, dismissRestorePrompt } = useProgress();
  const prompted = useRef(false);

  useEffect(() => {
    if (!isLoaded || !hasPendingRestore || prompted.current) return;
    prompted.current = true;

    Alert.alert(
      'Previous Backup Found',
      'A backup of your progress was found from a previous install. Would you like to restore it?',
      [
        {
          text: 'Not Now',
          style: 'cancel',
          onPress: dismissRestorePrompt,
        },
        {
          text: 'Restore',
          onPress: async () => {
            const result = await restoreFromBackup();
            if (!result.success) {
              Alert.alert('Restore Failed', result.message);
            }
          },
        },
      ],
      { cancelable: false },
    );
  }, [isLoaded, hasPendingRestore, restoreFromBackup, dismissRestorePrompt]);

  return null;
}

function RootLayoutNav() {
  return (
    <>
      <RestorePrompt />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0A0A0F' },
          headerTintColor: '#C9A84C',
          headerTitleStyle: { fontFamily: 'Inter_600SemiBold', color: '#F5EDD3' },
          headerBackTitle: 'Back',
          contentStyle: { backgroundColor: '#0A0A0F' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="quest/[id]"
          options={{
            title: 'Quest',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="category/[id]"
          options={{
            title: 'Category',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      // Silently retry any reports that were queued while offline.
      flushReportQueue().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <ProgressProvider>
              <RootLayoutNav />
            </ProgressProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
