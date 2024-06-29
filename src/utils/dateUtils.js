import { format, subWeeks, subMonths } from "date-fns";

export const getDateBasedOnPeriod = (period) => {
  let date;
  const today = new Date();
  switch (period) {
    case "1_week":
      date = subWeeks(today, 1);
      break;
    case "2_weeks":
      date = subWeeks(today, 2);
      break;
    case "1_month":
      date = subMonths(today, 1);
      break;
    default:
      date = subWeeks(today, 1);
  }
  return format(date, "yyyy-MM-dd");
};
