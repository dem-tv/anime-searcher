export function getFormattedTime(date: Date) {
  return new Intl.DateTimeFormat().format(date);
}
