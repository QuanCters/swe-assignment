import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useModal } from "@/context/ModalContext";
import { printers as MockPrinter } from "@/mocks/printers";
import { Printer } from "@/models/printer";
import { fetchPrinters } from "@/api/printer";

export const Route = createLazyFileRoute("/_private/_print/choose-printer")({
  component: ChoosePrinter,
});

function ChoosePrinter() {
  const [printers, setPrinters] = React.useState<Printer[]>(MockPrinter);
  const { modal, openModal } = useModal();

  const onSubmit = () => {
    console.log("submit");
    // openModal("ConfirmPrintModal");
    openModal("InsufficientPagesModal");
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPrinters();
        console.log(result);
        const formattedPrinters: Printer[] = result.map((printer: any) => ({
          id: printer.id,
          name: printer.name,
          img: printer.img ? printer.img : "",
          color: printer.color ? printer.color : "",
          function: printer.function ? printer.function : "",
          speed: printer.speed ? printer.speed : "",
          paperSize: printer.paperSize ? printer.ipaperSize : "",
          location: printer.location,
          status: printer.status,
        }));
        setPrinters(formattedPrinters);
      } catch (err) {
        // setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    // fetchData();
  }, []);
  return (
    <div
      className={`flex flex-col w-full pt-5 pb-10 z-0 px-16 max-md:px-10 gap-5 select-none ${printers ? "" : "h-[92vh]"}`}
    >
      <h2 className="text-2xl font-bold text-[#2196F3]">Choose Printer</h2>

      {printers && (
        <form
          // id="printer-form"
          // onSubmit={onSubmit}
          className={`grid grid-cols-4 w-full ${printers.length >= 9 ? "h-[80vh]" : "h-fit"} px-7 gap-6 max-sm:grid-cols-1 max-lg:grid-cols-2 max-2xl:grid-cols-3 overflow-y-auto`}
        >
          {printers.map((printer, index) => (
            <label
              className="cursor-pointer justify-self-center w-full"
              htmlFor={`printer-${index}`}
              key={index}
            >
              <input
                id={`printer-${index}`}
                type="radio"
                name="printer"
                value={index}
                className="hidden peer"
              />
              <div className="w-full h-[200px] min-h-fit flex flex-row p-3 border-2 border-dashed border-[#2196F3] rounded-md gap-4 min-w-fit hover:bg-black/5 duration-300 hover:shadow-xl peer-checked:border-green-500 peer-checked:bg-green-500/5  self-center">
                <div className="flex-1 flex flex-col text-sm select-none gap-1 min-h-fit w-full">
                  <h3 className="self-center text-base font-medium text-[#0052B4] mb-1">
                    {printer.name}
                  </h3>
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
                    <span className="font-medium">Status: </span>
                    {printer.status}
                  </p>
                  <div className="font-bold text-center text-[#2196F3] text-sm flex-1 flex items-center justify-center mt-3">
                    <p>
                      <span className="font-medium text-stone-600">
                        Location:&nbsp;
                      </span>
                      {printer.location}
                    </p>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </form>
      )}
      {!printers && (
        <div className="flex-1 flex items-center justify-center text-center text-lg font-medium h-full">
          No printers are available at the moment
        </div>
      )}
      <div className="flex flex-row items-center justify-end w-full px-5 gap-7 mt-4">
        <button className="bg-[#0052B4] px-6 py-3 rounded-xl text-white w-[150px] font-semibold">
          Back
        </button>
        <button
          // form="printer-form"
          onClick={onSubmit}
          className={`bg-[#0052B4] px-6 py-3 rounded-xl text-white w-[150px] font-semibold ${printers ? "" : "hidden"}`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
