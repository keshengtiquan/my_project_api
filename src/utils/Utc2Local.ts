import * as dayjs from 'dayjs';
import * as utcPlugin from 'dayjs/plugin/utc';
dayjs.extend(utcPlugin);

export function Utc2Local(utcTimeString: string): string {
  const utcDate = dayjs.utc(utcTimeString);
  const localDate = utcDate.local();
  const localTimeString = localDate.format('YYYY-MM-DD HH:mm:ss');
  return localTimeString;
}