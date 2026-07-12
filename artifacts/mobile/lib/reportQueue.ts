import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from './api';

const QUEUE_KEY = 'report_offline_queue';

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
  await saveQueue(queue);
}

/**
 * Attempt to send every queued report.
 * Removes successful ones; leaves failed ones for the next attempt.
 * Returns the number of reports successfully sent.
 */
export async function flushReportQueue(): Promise<number> {
  const queue = await loadQueue();
  if (queue.length === 0) return 0;

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
      } else {
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
