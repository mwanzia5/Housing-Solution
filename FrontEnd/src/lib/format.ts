/**
 * Format number as Kenyan Shillings (KES).
 * Uses Intl.NumberFormat with en-KE, no decimals.
 */
export function formatKES(value: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Same as formatKES but returns "KSh X" for display where currency code is preferred. */
export function formatKESShort(value: number): string {
  const formatted = new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
  return `KSh ${formatted}`;
}
