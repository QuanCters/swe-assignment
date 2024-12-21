import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import Table from "@/Components/Table";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Filter from "@/Components/Filter";
import { Printing } from "@/models/printing";
import { getAllHistory, getHistoryByStudentID } from "@/api/printing";
import { printing_columns } from "@/utils/printingColumn";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { CircularProgress } from "@mui/material";

export const Route = createLazyFileRoute("/_private/printing-history")({
  component: PrintingHistoryPage,
});

function PrintingHistoryPage() {
  const { isSPSO } = useAuth();

  const { data, isLoading, error } = useQuery<Printing[], Error>({
    queryKey: ["getHistory"],
    queryFn: () => fetchHistory(isSPSO),
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo<ColumnDef<Printing, any>[]>(() => {
    const additionalColumn: ColumnDef<Printing, any> = {
      accessorKey: "studentId",
      header: "Student ID",
      cell: (info) => info.getValue(),
      enableResizing: false,
      size: 60,
      meta: {
        filterVariant: "text",
      },
    };

    // Nếu không phải SPSO, thêm cột bổ sung
    return isSPSO()
      ? [...printing_columns, additionalColumn]
      : printing_columns;
  }, []);

  const table = useReactTable({
    data: data ?? [],
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  if (error)
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <div className="text-red-500 mt-4">{error.message}</div>
      </div>
    );
  if (isLoading)
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <CircularProgress size={40} className="w-full h-[90vw]" />
      </div>
    );

  return (
    <div className="body flex flex-col items-center justify-center w-full bg-[#F0F7FF] pb-16 pt-10 min-w-fit px-5 flex-grow">
      <div className="shadow-lg w-[18\/25] min-w-min h-full px-12 py-16 flex-grow flex flex-col">
        <div className="filters flex items-stretch flex-wrap">
          {/* <DateRangePicker /> */}
          <Filter column={table.getColumn("date")} placeholder="Date" />
          {!isSPSO() && (
            <Filter
              column={table.getColumn("documentName")}
              placeholder="Filter by file"
            />
          )}
          {isSPSO() && (
            <Filter
              column={table.getColumn("studentId")}
              placeholder="Filter by studentId"
            />
          )}
        </div>
        <Table table={table} />
      </div>
    </div>
  );
}

const fetchHistory = async (isSPSO: any) => {
  const result = isSPSO()
    ? await getAllHistory()
    : await getHistoryByStudentID();
  const printings: Printing[] = result?.map((item: any) => ({
    id: item.id,
    timestamp: new Date(item.timestamp), // Chuyển timestamp sang Date
    printerName: item.printerName,
    printerId: item.printerId, // Có thể undefined nếu không có
    documentName: item.documentName,
    documentId: item.documentId, // Có thể undefined nếu không có
    pageType: item.pageType,
    paperCount: item.paperCount, // Có thể undefined nếu không có
    studentId: item.studentID, // Có thể undefined nếu không có
    paymentAmount: item.paymentAmount,
  }));
  return printings ?? [];
};
