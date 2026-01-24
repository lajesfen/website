export function formatDate(date: Date): string {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  return dateObj.toLocaleDateString(undefined, options);
}
