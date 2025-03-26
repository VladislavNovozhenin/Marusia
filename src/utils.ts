export function formatTime(minutes: number): string {
  if (minutes < 0) return 'Некорректное значение';

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}ч ${remainingMinutes}мин`;
}
