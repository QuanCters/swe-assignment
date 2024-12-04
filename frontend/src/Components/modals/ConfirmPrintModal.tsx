import { printPages } from "@/api/printing";
import { Dialog, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

const ConfirmPrintModal: React.FC<{
  onClose: any;
  config: any;
  printer: any;
  fileName?: string;
  navigate?: any;
}> = ({ onClose, config, printer, fileName, navigate }) => {
  const mutation = useMutation({
    mutationFn: (e: any) => {
      e.preventDefault();
      const data = {
        documentId: config.documentId,
        config: {
          ...config.data,
          printCount: config.printCount,
          color: config.data.color === "color-true" ? true : false,
          duplex: config.data.duplex === "duplex-true" ? true : false,
        },
      };
      return printPages(printer.id, data);
    },
    onSuccess: () => {
      alert(
        "Successfully send confirm printing. We will navigate you back to print"
      );
      onClose();
      navigate();
    },
    onError: (error) => {
      alert(error);
    },
  });
  const stringlist = [
    `${fileName} - ${config.pageCount} ${config.data.pageType} pages \t ${config.printCount !== 1 ? "x" + config.printCount : ""}`,
  ];
  return (
    <Dialog open maxWidth={"md"} onClose={onClose}>
      <Stack p={3}>
        <div className="flex flex-col items-center gap-12 select-none h-[70vh] w-[25vw]">
          <h3 className="font-bold text-2xl">Confirm Printing?</h3>
          <p>You are about to print:</p>
          <div className="flex flex-col items-center gap-1 w-2/3">
            {stringlist.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            <p className="text-center mt-4">
              With printer id: {printer.id}, at location: {printer.location}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 w-2/3 font-bold">
            <p>
              Total:{" "}
              <span className="font-normal">
                {config.paymentAmount} A4 pages
              </span>
            </p>
            <p>
              You have:{" "}
              <span className="font-normal">{config.pageBalance} A4 pages</span>
            </p>
          </div>
          <div className="flex flex-row flex-1 items-end w-full px-10 justify-between max-lg:px-0 min-h-20">
            <button
              className="px-6 py-3 bg-stone-600 text-white rounded-xl font-semibold hover:bg-gradient-to-r hover:from-stone-500 hover:via-stone-400 hover:to-stone-500 duration-300 shadow-md transform hover:scale-105 transition"
              onClick={onClose}
            >
              Return
            </button>

            <div className="">
              <button
                className="bg-[#0052B4] text-white px-6 py-3 rounded-xl relative group overflow-hidden transition-all ease-in-out duration-500 font-semibold"
                onClick={mutation.mutate}
              >
                Confirm
                <span className="absolute top-0 left-[-200%] w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 transform skew-x-12 group-hover:left-[50%] transition-all duration-700 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>
      </Stack>
    </Dialog>
  );
};

export default ConfirmPrintModal;
