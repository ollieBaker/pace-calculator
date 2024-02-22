export function paceToSeconds(pace: string): number {
  return parseFloat(pace);
}

export function secondsToTime(secs: number) {
  const hours = Math.floor(secs / (60 * 60));

  const divisor_for_minutes = secs % (60 * 60);

  const minutes = Math.floor(divisor_for_minutes / 60);
  const seconds = Math.ceil(divisor_for_minutes % 60);

  return { hours, minutes, seconds };
}

export function formatPace(pace: string) {
  const secs = paceToSeconds(pace);

  const { minutes, seconds } = secondsToTime(secs);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function calcTime(distance: number, pace: string): string {
  const secs = paceToSeconds(pace) * distance;

  const { hours, minutes, seconds } = secondsToTime(secs);

  // https://www.strava.com/running-pace-calculator
  return [hours, minutes, seconds]
    .map((item) => (item === 60 ? "0" : item.toString()).padStart(2, "0"))
    .join(":");
}
