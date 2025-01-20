export function calculateDaysUntilStart(startDate: string): string {
  const currentDate = new Date();
  const start = new Date(startDate);

  if (currentDate < start) {
    const timeDifference = start.getTime() - currentDate.getTime();
    const daysUntilStart = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysUntilStart > 1) {
      return `${daysUntilStart + 1} days left`;
    } else {
      return `${daysUntilStart + 1} day left`;
    }
  } else {
    return 'Passed';
  }
}
