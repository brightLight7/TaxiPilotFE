interface StoredItem {
  value: unknown;
  expiresAt?: string;
}

export function setLocalItem(key: string, value: unknown): void {
  try {
    const item: StoredItem = { value };
    localStorage.setItem(key, JSON.stringify(item));
  } catch { /* ignore */ }
}

export function getLocalItem<T = unknown>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const item = JSON.parse(raw) as StoredItem;
    return item.value as T;
  } catch {
    return null;
  }
}

export function removeLocalItem(key: string): void {
  localStorage.removeItem(key);
}
