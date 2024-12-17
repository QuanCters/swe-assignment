import { useDialog } from "@/hooks/useDialog";

const InsufficientPagesModal: React.FC<{
  onClose: any;
  config: any;
  printer: any;
  fileName?: string;
  navigate?: any;
}> = ({ onClose, config, printer, fileName, navigate }) => {
  const stringlist = [
    `${fileName} - ${config.pageCount} ${config.data.pageType} pages \t ${config.printCount !== 1 ? "x" + config.printCount : ""}`,
  ];

  const { dialogRef, handleOutsideClick } = useDialog(onClose);

  return (
    <dialog
      open
      ref={dialogRef}
      onClick={handleOutsideClick} // Handle clicks outside of modal
      className="fixed inset-0 z-[999999999] flex items-center justify-center bg-gray-800/50 backdrop:bg-gray-800/50 backdrop-blur-sm w-screen h-screen overflow-y-auto"
    >
      <div className="flex flex-col items-center gap-10 select-none h-fit py-6 w-[35vw] px-4 body overflow-y-auto rounded-xl max-lg:min-w-60">
        <h3 className="font-bold text-2xl">Not enough page</h3>
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
            <span className="font-normal">{config.paymentAmount} A4 pages</span>
          </p>
          <p>
            You have:{" "}
            <span className="font-normal text-red-500">
              {config.pageBalance} A4 pages
            </span>
          </p>
          <p className="text-center text-red-500">
            Please adjust your settings or buy more pages.
          </p>
        </div>
        <div className="flex flex-row flex-1 items-end w-full px-10 justify-between max-lg:px-0 min-h-20">
          <button
            className="navigateBtn px-6 py-3 bg-stone-600 text-white rounded-xl font-semibold hover:bg-gradient-to-r hover:from-stone-500 hover:via-stone-400 hover:to-stone-500 duration-300 shadow-md transform hover:scale-105 transition"
            onClick={onClose}
          >
            Return
          </button>

          <button
            className="bg-[#0052B4] text-white px-6 py-3 rounded-xl group relative overflow-hidden transition-all ease-in-out duration-500"
            onClick={() => {
              onClose();
              navigate();
            }}
          >
            Buy Pages
            <span
              className="absolute top-0 left-[-200%] w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 
      transform skew-x-12 group-hover:left-[50%] transition-all duration-700 ease-in-out"
            ></span>
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default InsufficientPagesModal;
