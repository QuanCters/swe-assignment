import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { FilterFn } from "@tanstack/react-table";

// Kích hoạt plugin cần thiết
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const inDateRange: FilterFn<any> = (row, columnId, value) => {
  const date = dayjs(row.getValue(columnId));
  const [start, end] = value as [Date, Date | undefined];

  if (!date.isValid()) return false;

  const startDate = dayjs(start);
  const endDate = end ? dayjs(end) : undefined;

  // Nếu không có end date, kiểm tra xem ngày có nằm trong phạm vi 1 ngày từ start không
  if (!endDate) {
    return (
      date.isSameOrAfter(startDate, "day") &&
      date.isSameOrBefore(startDate, "day")
    );
  }

  // Kiểm tra date nằm trong khoảng từ start đến end
  return (
    date.isSameOrAfter(startDate, "day") && date.isSameOrBefore(endDate, "day")
  );
};

inDateRange.autoRemove = (val: any) =>
  !Array.isArray(val) ||
  !val.length ||
  !val.every((item) => dayjs(item).isValid());
