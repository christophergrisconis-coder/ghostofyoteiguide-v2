import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from './api';

const QUEUE_KEY = 'report_offline_queue';

/** Maximum number of reports to keep in the queue. Oldest are evicted first. */
const MAX_QUEUE_SIZE = 20;

/** Reports older than this many milliseconds are silently dropped. */
const REPORT_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface QueuedReport {
  id: string;
  category: string;
  note: string | null;
  queuedAt: string;
}

/** Load the current queue from storage. */
async function loadQueue(): Promise<QueuedReport[]> {
  try {
    const raw = await AsyncStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as QueuedReport[];
  } catch {
    return [];
  }
}

/** Persist the queue back to storage. */
async function saveQueue(queue: QueuedReport[]): Promise<void> {
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

/**
 * Evict reports that have exceeded the TTL or push the queue over the size cap.
 * Oldest entries are evicted first when trimming by size.
 */
function pruneQueue(queue: QueuedReport[]): QueuedReport[] {
  const cutoff = Date.now() - REPORT_TTL_MS;

  // Drop expired entries
  const fresh = queue.filter(
    (r) => new Date(r.queuedAt).getTime() > cutoff,
  );

  // Trim to size cap — queue is ordered oldest-first, so slice from the end
  if (fresh.length > MAX_QUEUE_SIZE) {
    return fresh.slice(fresh.length - MAX_QUEUE_SIZE);
  }
  return fresh;
}

/** Add a report to the offline queue. */
export async function enqueueReport(
  category: string,
  note: string | null,
): Promise<void> {
  const queue = await loadQueue();
  queue.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    category,
    note,
    queuedAt: new Date().toISOString(),
  });
  await saveQueue(pruneQueue(queue));
}

/**
 * Attempt to send every queued report.
 * - Removes successful ones.
 * - Drops reports that receive a permanent server error (4xx) — they will never succeed.
 * - Keeps reports that fail with a network error or 5xx for the next attempt.
 * - Prunes expired / over-limit entries before flushing.
 * Returns the number of reports successfully sent.
 */
export async function flushReportQueue(): Promise<number> {
  const raw = await loadQueue();
  const queue = pruneQueue(raw);

  if (queue.length === 0) {
    // Save in case pruning removed stale entries from storage
    await saveQueue(queue);
    return 0;
  }

  const remaining: QueuedReport[] = [];
  let sent = 0;

  for (const report of queue) {
    try {
      const url = getApiUrl('/api/reports');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: report.category, note: report.note }),
      });
      if (res.ok) {
        sent++;
      } else if (res.status >= 400 && res.status < 500) {
        // Permanent client/server error — discard rather than retry forever
      } else {
        // 5xx or unexpected status — keep for next attempt
        remaining.push(report);
      }
    } catch {
      // Network still unavailable — keep in queue
      remaining.push(report);
    }
  }

  await saveQueue(remaining);
  return sent;
}
