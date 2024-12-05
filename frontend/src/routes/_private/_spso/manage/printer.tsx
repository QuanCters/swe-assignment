import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Printer, PrinterType } from "@/models/printer";
import { useModal } from "@/context/ModalContext";
import { deletePrinterByID, getPrinters, updatePrinter } from "@/api/printer";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export const Route = createFileRoute("/_private/_spso/manage/printer")({
  component: ManagePrinter,
});

const fetchPrinters = async () => {
  const result = await getPrinters();
  const printerList: Printer[] = result.map((printer: Printer) => ({
    ...printer,
    isOn: PrinterType[printer.status],
    initialOn: PrinterType[printer.status],
    hasChanged: false,
    delete: false,
  }));
  return printerList;
};

function ManagePrinter() {
  const { modal, openModal } = useModal();
  const [anyChange, setAnyChange] = useState<boolean>(false);
  const [printers, setPrinters] = useState<Printer[]>([]);
  const { data, isLoading, error } = useQuery<Printer[], Error>({
    queryKey: ["getPrinter"],
    queryFn: fetchPrinters,
    enabled: printers.length === 0 || anyChange === false,
  });
  const updateMutation = useMutation({
    mutationFn: (printerData: any) => {
      return updatePrinter(printerData);
    },
    onError: (error) => {
      alert(error);
    },
    retry: 2,
  });

  const deleteMutation = useMutation({
    mutationFn: (printerData: any) => {
      return deletePrinterByID(printerData.id);
    },
    onError: (error) => {
      alert(error);
    },
    retry: 2,
  });

  const handleDisableChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => {
    const isChecked = event.target.checked;

    setPrinters((prev) => {
      const updatedPrinters = [...prev];

      updatedPrinters[index] = {
        ...updatedPrinters[index],
        status: isChecked ? "Online" : "Offline",
        isOn: isChecked,
        hasChanged: updatedPrinters[index].initialOn !== isChecked,
      };
      const hasChanges = updatedPrinters.some((printer) => printer.hasChanged);
      setAnyChange(hasChanges);

      return updatedPrinters;
    });
  };

  const handleSaveChanges = async () => {
    let promises: Promise<void>[] = [];
    printers.forEach((printer) => {
      if (printer.delete) {
        promises.push(deleteMutation.mutateAsync(printer));
      } else if (printer.hasChanged && !printer.delete) {
        promises.push(updateMutation.mutateAsync(printer));
      }
    });
    try {
      if (promises.length === 0) return;
      await Promise.all(promises);
      setAnyChange(false);
      alert("Successfully save changes");
    } catch (error) {
      alert(`Error in save changes, please try again. Error:${error}`);
    }
  };

  const handleDiscardChanges = () => {
    setPrinters((prev) => {
      const updatedPrinters: Printer[] = prev.map((printer) => {
        return {
          ...printer,
          status: printer.initialOn ? "Online" : "Offline",
          isOn: printer.initialOn,
          hasChanged: false,
          delete: false,
        };
      });
      setAnyChange(false);
      return updatedPrinters;
    });

    setAnyChange(false); // Cập nhật trạng thái anyChange
  };

  const handleDelete = (event: any, index: any) => {
    event.preventDefault();

    setPrinters((prev) => {
      const updatedPrinters = [...prev];

      updatedPrinters[index] = {
        ...updatedPrinters[index],
        delete: true,
        hasChanged: true,
      };
      const hasChanges = updatedPrinters.some((printer) => printer.hasChanged);
      setAnyChange(hasChanges);

      return updatedPrinters;
    });
  };

  useEffect(() => {
    if (data) {
      setPrinters(data);
    }
  }, [data]);

  return (
    <div className="flex justify-center w-full pt-7 pb-16">
      <div className="min-h-full shadow-lg w-[90vw] min-w-min h-full px-12 py-16 flex flex-col gap-10">
        <div className="flex flex-row flex-wrap justify-between">
          <div className="flex flex-row flex-wrap"></div>
          <div className="flex flex-row flex-wrap gap-3">
            {
              <button
                className={`text-sm font-semibold bg-green-500 px-3 py-3 rounded-xl text-white transition-all duration-300 transform hover:bg-green-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${anyChange ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none select-none"}`}
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            }
            <button
              className={`text-sm font-semibold bg-red-500 px-3 py-3 rounded-xl text-white transition-all duration-300 transform hover:bg-red-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${anyChange ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none select-none"}`}
              onClick={handleDiscardChanges}
            >
              Discard
            </button>

            <button
              className="bg-[#0052B4] text-white px-6 py-3 rounded-xl relative overflow-hidden transition-all ease-in-out duration-500 font-semibold text-sm group"
              onClick={() => {
                if (anyChange) {
                  alert("Please save unsaved changes before add a new printer");
                  return;
                }
                openModal("AddPrinterModal");
              }}
            >
              Add Printer
              <span className="absolute top-0 left-[-200%] w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 transform skew-x-12 group-hover:left-[50%] transition-all duration-700 ease-in-out"></span>
            </button>
          </div>
        </div>
        {isLoading && (
          <div className="w-full h-[40vh] flex justify-center items-center">
            <CircularProgress size={40} className="w-full h-full" />
          </div>
        )}
        {error && (
          <div className="w-full h-[40vh] flex justify-center items-center">
            <p className="text-red-600 font-semibold text-2xl">
              {error.message}
            </p>
          </div>
        )}
        <div className="grid grid-cols-4 gap-6 max-sm:grid-cols-1 max-lg:grid-cols-2 max-2xl:grid-cols-3 w-full overscroll-y-auto">
          {printers.map((printer, index) => {
            if (printer.delete) return;
            return (
              <div
                className="flex flex-col p-3 w-full border-dashed border-2 border-[#2196F3] rounded-md gap-4 select-none hover:shadow-[0_3px_10px_rgba(0,0,0,0.5)] duration-150 relative"
                id="index"
              >
                <div className="absolute right-1 top-1 flex flex-row-reverse gap-1">
                  <div
                    className="rounded-full hover:bg-red-500/25 p-1"
                    onClick={(e) => handleDelete(e, index)}
                  >
                    <FaTrash size={12} className="text-red-400" />
                  </div>
                  <div
                    className="rounded-full hover:bg-green-400/25 p-1"
                    onClick={(e) => {
                      e.preventDefault();
                      openModal("UpdatePrinterModal", { initialData: printer });
                    }}
                  >
                    <MdModeEdit size={12.5} color="green" />
                  </div>
                </div>
                <p className="text-center text-lg font-semibold text-[#0052B4]">
                  Printer ID: {printer.id}
                </p>
                <div className="flex flex-col gap-1 text-sm text-justify">
                  <p>
                    <span className="font-medium">Brand: </span>
                    {printer.brand}
                  </p>
                  <p>
                    <span className="font-medium">Model: </span>
                    {printer.model}
                  </p>
                  <p>
                    <span className="font-medium">Description: </span>
                    {printer.description}
                  </p>
                  <p>
                    <span className="font-medium">Condition: </span>
                    {printer.condition}
                  </p>
                  <p>
                    <span className="font-medium">Status: </span>
                    {printer.status}
                  </p>
                  <div className="font-bold text-center text-[#2196F3] text-sm flex-1 flex flex-col items-center justify-center mt-5 gap-2">
                    <p>
                      <span className="font-medium text-stone-600">
                        Location:&nbsp;
                      </span>
                      {printer.location}
                    </p>
                    <input
                      id="toggle_button"
                      type="checkbox"
                      checked={printer.isOn}
                      onChange={(event) => handleDisableChange(event, index)}
                      className="appearance-none scale-75 relative w-[50px] h-[20px] bg-stone-400 rounded-3xl duration-300 shadow- focus:ring-0 focus:ring-offset-0 shadow-[inset_0_0_5px_rgba(0,0,0,0.2)] 
                    before:w-[20px] before:h-[20px] before:scale-150 before:bg-white before:absolute before:rounded-2xl before:top-0 before:left-0 before:duration-300 before:content-[' '] before:shadow-[0_2px_5px_rgba(0,0,0,0.2)]
                    checked:before:left-[32px] checked:before:bg-[#0052B4] checked:before:shadow-[#0052B4] checked:before:shadow-[0_2px_5px_rgba(0,82,180,0.5)]
                    checked:bg-[#0051b46a] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {(deleteMutation.isLoading || updateMutation.isLoading) && (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-[999999999] bg-black/20 flex items-center justify-center">
          <CircularProgress size={40} />
        </div>
      )}
    </div>
  );
}
