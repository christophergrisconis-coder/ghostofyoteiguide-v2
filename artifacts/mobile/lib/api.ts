import { Platform } from 'react-native';

/**
 * Returns the full URL for an API path.
 *
 * - On web the dev server shares the same origin as the Expo web bundle,
 *   so we just use the path directly (the proxy routes `/api` to the API
 *   server artifact).
 * - On native (iOS / Android) the bundle is served from the Expo packager
 *   origin, so we prefix with the Replit dev domain injected at build time
 *   via EXPO_PUBLIC_DOMAIN.  In a production build this should be replaced
 *   with the real server hostname.
 */
export function getApiUrl(path: string): string {
  if (Platform.OS === 'web') {
    // Relative – works both in the Replit proxy iframe and in a deployed PWA.
    return path;
  }
  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  if (domain) {
    return `https://${domain}${path}`;
  }
  // Fallback: try localhost (useful for local simulators with the dev server
  // running on the same machine).
  return `http://localhost:8080${path}`;
}
