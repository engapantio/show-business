export function formatTime(dateStr?: string): string {
  if (!dateStr) return '10:00 AM';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
