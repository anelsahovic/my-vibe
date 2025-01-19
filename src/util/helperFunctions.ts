export function calculateDaysUntilStart(startDate: string): number {
  const currentDate = new Date();
  const start = new Date(startDate);

  if (currentDate < start) {
    const timeDifference = start.getTime() - currentDate.getTime();
    const daysUntilStart = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysUntilStart + 1;
  } else {
    return 0;
  }
}
