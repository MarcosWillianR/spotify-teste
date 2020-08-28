export default function formatMiliseconds(millis: number): string {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return `${minutes}:${seconds.padEnd(2, '0')}`;
}
