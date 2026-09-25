export function generateTrackingNumber(sequence: number): string {
  const year = new Date().getFullYear();
  const padded = String(sequence).padStart(6, '0');
  return `MC-${year}-${padded}`;
}

export function isValidTrackingNumber(value: string): boolean {
  return /^MC-\d{4}-\d{6}$/.test(value);
}

export function generateDeliveryPin(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}
