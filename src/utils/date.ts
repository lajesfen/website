export function formatDate(date: Date): string {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  return dateObj.toLocaleDateString(undefined, options);
}

export function getToday() {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
