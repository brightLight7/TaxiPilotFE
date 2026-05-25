// global-functions.ts

/**
 * Check if a specific localStorage item exists.
 * @param {string} key - The key of the localStorage item.
 * @returns {boolean} - True if the item exists, false otherwise.
 */
export function localStorageExists(key: string): boolean {
  return localStorage.getItem(key) !== null;
}

/**
 * Create a localStorage item with a name, value, and expiry.
 * @param {string} key - The name of the localStorage item.
 * @param {any} value - The value to store (will be stringified).
 * @param {number} [expiryMinutes] - The expiry time in minutes (optional if expiryTime is provided).
 * @param {string} [expiryTime] - The specific expiry time (e.g., "23:59", "19:30"). Overrides expiryMinutes if provided.
 */
export function createLocalStorageItem(
  key: string,
  value: any,
  expiryMinutes?: number,
  expiryTime?: string
): void {
  let expiry: number;

  if (expiryTime) {
    // Parse expiryTime (e.g., "19:30") into a Date object
    const now = new Date();
    const [hours, minutes] = expiryTime.split(':').map(Number);
    const expiryDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

    // If the specified expiry time is in the past for today, set it for tomorrow
    if (expiryDate.getTime() < now.getTime()) {
      expiryDate.setDate(expiryDate.getDate() + 1);
    }

    expiry = expiryDate.getTime();
  } else if (expiryMinutes) {
    // Calculate expiry based on minutes from now
    expiry = new Date().getTime() + expiryMinutes * 60 * 1000;
  } else {
    throw new Error("Either expiryMinutes or expiryTime must be provided.");
  }

  // Store the value and expiry timestamp in localStorage
  const data = { value, expiry };
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Get a localStorage item, checking for expiry.
 * @param {string} key - The key of the localStorage item.
 * @returns {any | null} - The value if valid, or null if expired or not found.
 */
export function getLocalStorageItem(key: string): any | null {
  const item = localStorage.getItem(key);
  if (!item) return null;

  const data = JSON.parse(item);
  if (new Date().getTime() > data.expiry) {
    // If expired, remove the item and return null
    localStorage.removeItem(key);
    return null;
  }

  return data.value; // Return the value if not expired
}

/**
 * Remove a specific localStorage item.
 * @param {string} key - The key of the localStorage item to remove.
 */
export function removeLocalStorageItem(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Generate a unique identifier (UUID).
 * @returns {string} - A universally unique identifier.
 */
export function generateUniqueId(): string {
  return crypto.randomUUID();
}

/**
 * Format a Date object to a readable string.
 * @param {Date} date - The date to format.
 * @returns {string} - A formatted date string (e.g., "January 1, 2023").
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Check if a value is null or undefined.
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is null or undefined, false otherwise.
 */
export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}
