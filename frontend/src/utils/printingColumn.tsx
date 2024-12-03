import { Person, Printing } from "@/models/printing";
import { ColumnDef, RowData } from "@tanstack/react-table";
import dayjs from "dayjs";
import { inDateRange } from "./dateFilters";
declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select" | "range-date";
  }
}
export const printing_columns: ColumnDef<Printing, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info) => info.getValue(),
    enableResizing: false,
    size: 60,
  },
  {
    accessorFn: (row) => row.timestamp,
    id: "date",
    filterFn: inDateRange,
    cell: (info) => {
      return (
        <div>
          {dayjs(info.getValue()).format("hh:mm A")} <br />
          {dayjs(info.getValue()).format("MMMM DD, YYYY")}
        </div>
      );
    },
    size: 130,
    header: () => "Printing Date",
    meta: {
      filterVariant: "range-date",
    },
  },
  {
    accessorFn: (row) => row.printerName,
    id: "printer",
    cell: (info) => info.getValue(),
    header: () => "Printer",
  },
  {
    accessorKey: "documentName",
    cell: (info) => info.getValue(),
    header: () => "File",
    meta: {
      filterVariant: "text",
    },
  },
  {
    accessorFn: (row) => row.pageType,
    id: "paperSize",
    cell: (info) => info.getValue(),
    header: () => "Paper Size",
    enableResizing: true,
    size: 120,
  },
  {
    accessorKey: "paymentAmount",
    // id: "pageCount",
    cell: (info) => {
      return info.getValue();
    },
    header: "Page Payment Amount",
    enableResizing: false,
    size: 100,
    meta: {
      filterVariant: "range",
    },
  },
];
