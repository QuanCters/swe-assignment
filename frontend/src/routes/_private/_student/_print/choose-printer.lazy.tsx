import { useState } from "react";
import {
  createLazyFileRoute,
  useBlocker,
  useRouterState,
  useNavigate,
} from "@tanstack/react-router";
import { useModal } from "@/context/ModalContext";
import { Printer } from "@/models/printer";
import { getPrinters } from "@/api/printer";
import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteDocumentByID, printPagesCheck } from "@/api/printing";
import { CircularProgress } from "@mui/material";

export const Route = createLazyFileRoute(
  "/_private/_student/_print/choose-printer"
)({
  component: ChoosePrinter,
});

function ChoosePrinter() {
  const navigate = useNavigate();
  const { data } = useQuery<Printer[], Error>({
    queryKey: ["fetchPrinters"],
    queryFn: fetchPrinters,
  });

  const routerState = useRouterState();
  const config = routerState.location.state.config;
  const { openModal } = useModal();

  const mutation = useMutation({
    mutationFn: (printer: any) => {
      const data = {
        documentId: config.documentId,
        config: {
          ...config.data,
          printCount: config.printCount,
          color: config.data.color === "color-true" ? true : false,
          duplex: config.data.duplex === "duplex-true" ? true : false,
        },
      };
      return printPagesCheck(printer.id, data);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const deletemutation = useMutation({
    mutationFn: () => {
      return deleteDocumentByID(config.documentId);
    },
    retry: 3,
  });
  const [block, setBlock] = useState(true);

  useBlocker({
    blockerFn: () => {
      if (block) {
        const userConfirmed = window.confirm("Are you sure you want to leave?");

        if (userConfirmed) {
          deletemutation.mutate();
        }
        return userConfirmed;
      }
      return true;
    },
    condition: true,
  });

  const onSubmit = async () => {
    const selectedPrinter = document.querySelector(
      'input[name="printer"]:checked'
    ) as HTMLInputElement;

    if (!selectedPrinter) {
      alert("Please select a printer before proceeding.");
      return;
    }
    if (!data) return;
    const printerIndex = parseInt(selectedPrinter.value, 10);
    // Sử dụng chỉ số để lấy thông tin máy in từ mảng data
    const printerData = data[printerIndex];

    try {
      const data = await mutation.mutateAsync(printerData);

      if (Number(data.paymentAmount) < Number(data.pageBalance)) {
        openModal("ConfirmPrintModal", {
          config: {
            ...config,
            paymentAmount: Number(data.paymentAmount),
            pageBalance: Number(data.pageBalance),
          },

          fileName: routerState.location.state.file?.name,
          printer: printerData,
          navigate: function () {
            setBlock(false);
            setTimeout(() => navigate({ to: "/print" }), 0);
          },
        });
      } else {
        openModal("InsufficientPagesModal", {
          config: {
            ...config,
            paymentAmount: Number(data.paymentAmount),
            pageBalance: Number(data.pageBalance),
          },
          fileName: routerState.location.state.file?.name,
          printer: printerData,
          navigate: function () {
            setBlock(false);
            setTimeout(
              () =>
                navigate({
                  to: "/buy-page",
                  state: {
                    config: {
                      ...config,
                      printer: printerData.id,
                      fileName: routerState.location.state.file?.name,
                      paymentAmount: Number(data.paymentAmount),
                      pageBalance: Number(data.pageBalance),
                    },
                  },
                }),
              0
            );
          },
        });
      }
    } catch (error) {
      alert("Cannot get pages balance. Please try again");
    }
  };

  if (deletemutation.isLoading)
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <CircularProgress size={40} />
      </div>
    );

  return (
    <div
      className={`flex flex-col w-full pt-5 pb-10 z-0 px-16 max-md:px-10 gap-5 select-none ${data ? "" : "h-[92vh]"}`}
    >
      <h2 className="text-2xl font-bold text-[#2196F3]">Choose Printer</h2>

      {data && (
        <form
          className={`grid grid-cols-4 w-full ${data.length >= 9 ? "h-[80vh]" : "h-fit"} px-7 gap-6 max-sm:grid-cols-1 max-lg:grid-cols-2 max-2xl:grid-cols-3 overflow-y-auto`}
        >
          {data.map((printer, index) => {
            if (printer.status === "Offline") return;
            return (
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
            );
          })}
        </form>
      )}
      {!data && (
        <div className="flex-1 flex items-center justify-center text-center text-lg font-medium h-full">
          No printers are available at the moment
        </div>
      )}
      <div className="flex flex-row items-center justify-end w-full px-5 gap-7 mt-4">
        <button
          className="bg-[#0052B4] px-6 py-3 rounded-xl text-white w-[150px] font-semibold hidden"
          onClick={() =>
            navigate({
              to: "/config-page",
              state: { config: config, file: routerState.location.state.file },
            })
          }
        >
          Back
        </button>
        <button
          className={`bg-[#0052B4] text-white px-6 py-3 rounded-xl w-[150px] font-semibold relative overflow-hidden transition-all ease-in-out duration-500 group ${data ? "" : "hidden"}`}
          onClick={onSubmit}
        >
          Confirm
          <span
            className="absolute top-0 left-[-200%] w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 
      transform skew-x-12 group-hover:left-[50%] transition-all duration-700 ease-in-out"
          ></span>
        </button>
      </div>
    </div>
  );
}

const fetchPrinters = async () => {
  const result = await getPrinters();

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
    brand: printer.brand,
    model: printer.model,
    description: printer.description,
  }));
  return formattedPrinters;
};
