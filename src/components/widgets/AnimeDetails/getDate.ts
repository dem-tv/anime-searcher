import { getFormattedTime } from '../../../utils/getFormattedTime.ts';
import type { MediaDate } from '../../../api/types/anime.types.ts';

export function getDate(startDate: MediaDate, endDate: MediaDate) {
  const dateStart = startDate
    ? new Date(startDate.year, startDate.month, startDate.day)
    : null;
  const dateEnd = endDate
    ? new Date(endDate.year, endDate.month, endDate.day)
    : null;

  const startDateFormatted = dateStart ? getFormattedTime(dateStart) : '-';
  const endDateFormatted = dateEnd ? getFormattedTime(dateEnd) : '-';

  return {
    startDateFormatted,
    endDateFormatted,
  };
}
