// function to make date object into yyyy-mm-dd
export function getDateString(date: Date) {
  return date.toISOString().split('T')[0];
}
