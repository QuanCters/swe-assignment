import React from "react";
import Table from "@/Components/Table";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

const PrintingHistoryPage = () => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // Sample data created manually
  const columns = React.useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: "fullName",
        header: "Full Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "age",
        header: () => "Age",
        meta: {
          filterVariant: "range",
        },
        // cell: (info) => info.getValue(),
        // meta: {
        //   filterVariant: "range",
        // },
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        meta: {
          filterVariant: "range-date",
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        meta: {
          filterVariant: "range",
        },
      },
    ],
    []
  );

  // Manually defined sample data
  const [data, setData] = React.useState<Person[]>([
    {
      firstName: "John",
      lastName: "Doe",
      age: 30,
      visits: 10,
      status: "single",
      progress: 70,
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      age: 25,
      visits: 5,
      status: "complicated",
      progress: 50,
    },
    {
      firstName: "Tom",
      lastName: "Smith",
      age: 40,
      visits: 20,
      status: "relationship",
      progress: 90,
    },
    {
      firstName: "Emily",
      lastName: "Jones",
      age: 35,
      visits: 15,
      status: "single",
      progress: 80,
    },
    {
      firstName: "Michael",
      lastName: "Brown",
      age: 50,
      visits: 25,
      status: "complicated",
      progress: 60,
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      age: 25,
      visits: 5,
      status: "complicated",
      progress: 50,
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      age: 4,
      visits: 5,
      status: "complicated",
      progress: 50,
    },
    {
      firstName: "Jane",
      lastName: "Minion",
      age: 4,
      visits: 5,
      status: "complicated",
      progress: 50,
    },
    {
      firstName: "Jane",
      lastName: "Minion",
      age: 4,
      visits: 4,
      status: "complicated",
      progress: 50,
    },
    {
      firstName: "Jane",
      lastName: "Minion",
      age: 3,
      visits: 4,
      status: "complicated",
      progress: 50,
    },
  ]);

  const table = useReactTable({
    data,
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
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <>
      <div className="body flex justify-center w-full min-h-screen bg-[#F0F7FF] pt-32 pb-16">
        <div className="shadow-lg w-[18\/25] min-w-min h-full px-12 py-16">
          <div className="filters flex items-stretch flex-wrap">
            {/* <DateRangePicker /> */}
            {/* <Calendar disableFuture={true} /> */}
            <Filter
              column={table.getColumn("firstName")}
              placeholder="Filter by First Name"
            />
            <Filter
              column={table.getColumn("lastName")}
              placeholder="Filter by Last Name"
            />
            {/* <Filter column={table.getColumn("age")} placeholder="Age" /> */}
            <Filter column={table.getColumn("visits")} placeholder="Age" />
          </div>
          <Table setData={setData} table={table} />
        </div>
      </div>
    </>
  );
};

type FilterProps = {
  column: Column<any, unknown> | undefined;
  placeholder: string;
};

function Filter({ column, placeholder }: FilterProps) {
  if (column == undefined) {
    return undefined;
  }
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div className="flex space-x-2">
      {/* See faceted column filters example for min max values functionality */}
      <DebouncedInput
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        placeholder={`Min ${placeholder}`}
        className="border-2 p-2 m-2 border-[#0052B4] rounded-xl bg-transparent"
      />
      <DebouncedInput
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        placeholder={`Max ${placeholder}`}
        className="border-2 p-2 m-2 border-[#0052B4] rounded-xl bg-transparent"
      />
    </div>
  ) : filterVariant === "range-date" ? (
    <div className="flex space-x-2">
      {/* See faceted column filters example for min max values functionality */}
      <DebouncedInput
        type="date"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        placeholder={`Min ${placeholder}`}
        className="border-2 py-1 px-2 m-2 border-[#0052B4] rounded-xl bg-transparent focus-within:border-[#2196F3] focus-within:text-[#2196F3]"
      />
      <DebouncedInput
        type="date"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        placeholder={`Max ${placeholder}`}
        className="border-2 py-1 px-2 m-2 border-[#0052B4] rounded-xl bg-transparent focus-within:border-[#2196F3] focus-within:text-[#2196F3]flex gap-0"
      />
    </div>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="border-2 p-2 m-2 border-[#0052B4] rounded-xl bg-transparent self-stretch"
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option>
    </select>
  ) : (
    <DebouncedInput
      className="border-2 p-2 m-2 border-[#0052B4] rounded-xl bg-transparent self-stretch"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={placeholder}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);
  if (props.type === "date") {
    return (
      <div className={` ${props.className}`}>
        <label
          className="text-xs font-medium transform translate-y-1 pointer-events-none"
          htmlFor="input"
        >
          {props.placeholder}
        </label>
        <input
          id="input"
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder=" "
          className={`w-full bg-transparent outline-none placeholder-transparent text-black p-0 -mt-2`}
        />
      </div>
    );
  }
  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default PrintingHistoryPage;
