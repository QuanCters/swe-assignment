import { useState, useEffect } from "react";
import { Column } from "@tanstack/react-table";

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
        className="border-2 p-2 m-2 border-[#0052B4] rounded-xl bg-transparent focus:ring-0 focus:border-[#2196F3]"
      />
      <DebouncedInput
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        placeholder={`Max ${placeholder}`}
        className="border-2 p-2 m-2 border-[#0052B4] rounded-xl bg-transparent focus:ring-0 focus:border-[#2196F3]"
      />
    </div>
  ) : filterVariant === "range-date" ? (
    <div className="flex flex-wrap">
      {/* See faceted column filters example for min max values functionality */}
      <DebouncedInput
        type="date"
        id="min"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        placeholder={`From ${placeholder}`}
        className="border-2 py-1 px-2 m-2 border-[#0052B4] rounded-xl bg-transparent focus-within:border-[#2196F3] focus-within:text-[#2196F3]"
      />
      <DebouncedInput
        type="date"
        id="max"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        placeholder={`To ${placeholder}`}
        className="border-2 py-1 px-2 m-2 border-[#0052B4] rounded-xl bg-transparent focus-within:border-[#2196F3] focus-within:text-[#2196F3]"
      />
    </div>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="border-2 p-2 m-2 border-[#0052B4] rounded-xl bg-transparent self-stretch focus:ring-0 focus:border-[#2196F3]"
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option>
    </select>
  ) : (
    <DebouncedInput
      className="form-input border-2 p-2 m-2 border-[#0052B4] rounded-xl bg-transparent self-stretch focus:ring-0 focus:border-[#2196F3]"
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
  value: string | number | Date;
  onChange: (value: string | number | Date) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);
  if (props.type === "date") {
    return (
      <div className={` ${props.className} flex flex-col gap-[11px]`}>
        <label
          className="text-xs font-medium transform translate-y-1 select-none"
          htmlFor={props.id}
        >
          {props.placeholder}
        </label>
        <input
          id={props.id}
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder=" "
          className={`w-full bg-transparent outline-none placeholder-transparent text-black p-0 -mt-2 focus:ring-0 border-0`}
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

export default Filter;
