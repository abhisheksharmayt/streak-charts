export function getUnixTimestampsForYear(year: number) {
  const unixTimestamps = [];
  const startDate = new Date(`${year}-01-01T00:00:00Z`);
  const endDate = new Date(`${year + 1}-01-01T00:00:00Z`);

  const startDayOfWeek = startDate.getDay();
  console.log(startDate);
  for (let i = 0; i < startDayOfWeek; i++) {
    unixTimestamps.push("0");
  }

  for (
    let date = startDate;
    date < endDate;
    date.setDate(date.getDate() + 1)
  ) {
    unixTimestamps.push(Math.floor(date.getTime() / 1000).toString());
  }

  return unixTimestamps;
}

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export function getDaysInMonthFromUnixTimestamp(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000);
  const month = date.getMonth(); // 0 for January, 1 for February, etc.
  const year = date.getFullYear();

  return getDaysInMonth(month + 1, year);
}

export function checkDateMonthYearMatch(
  timestamp1: number,
  timestamp2: number
) {
  // Convert timestamps to Date objects
  const date1 = new Date(timestamp1 * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const date2 = new Date(timestamp2 * 1000); // Multiply by 1000 to convert seconds to milliseconds

  // Extract date, month, and year from the Date objects
  const date1Formatted = date1.toISOString().substring(0, 10); // Extract YYYY-MM-DD format
  const date2Formatted = date2.toISOString().substring(0, 10); // Extract YYYY-MM-DD format

  // Compare formatted dates
  return date1Formatted === date2Formatted;
}

export function dateWithoutTime(timeStamp: number) {
  const date = new Date(timeStamp * 1000);
  return date.toISOString().substring(0, 10);
}

export function convertToMidnight(timestamp: number) {
  // Convert timestamp to Date object
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  // Set hours, minutes, and seconds to 0
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);

  // Return the new timestamp
  return Math.floor(date.getTime() / 1000);
}
