const KEY = 'kairos_admin_session';
const IDLE_TIMEOUT_MS = 60 * 60 * 1000;

export function startSession() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify({ lastActivity: Date.now() }));
}

export function endSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}

export function touchSession() {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem(KEY);
  if (!raw) return;
  localStorage.setItem(KEY, JSON.stringify({ lastActivity: Date.now() }));
}

export function isSessionValid() {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem(KEY);
  if (!raw) return false;
  try {
    const { lastActivity } = JSON.parse(raw);
    if (typeof lastActivity !== 'number') return false;
    return Date.now() - lastActivity < IDLE_TIMEOUT_MS;
  } catch {
    return false;
  }
}

export { IDLE_TIMEOUT_MS };
