import { Dialog, Stack } from "@mui/material";
const ConfirmPrintModal: React.FC<{ onClose: any }> = ({ onClose }) => {
  return (
    <Dialog open maxWidth={"md"} onClose={onClose}>
      <Stack p={3}>
        <div className="flex flex-col items-center gap-12 select-none h-[70vh] w-[25vw]">
          <h3 className="font-bold text-2xl">Confirm Printing?</h3>
          <p>You are about to print:</p>
          <div className="flex flex-col items-center gap-1 w-2/3">
            Report3.pdf - 15 A4 pages.
          </div>
          <div className="flex flex-row flex-1 items-end w-full px-10 justify-between max-lg:px-0">
            <button
              className="px-6 py-3 bg-stone-600 text-white rounded-xl font-semibold hover:bg-gradient-to-r hover:from-stone-500 hover:via-stone-400 hover:to-stone-500 duration-300 shadow-md transform hover:scale-105 transition"
              onClick={onClose}
            >
              Return
            </button>

            <div className="relative group">
              <button className="bg-[#0052B4] text-white px-6 py-3 rounded-xl relative overflow-hidden transition-all ease-in-out duration-500">
                Confirm
                <span
                  className="absolute top-0 left-[-200%] w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 
      transform skew-x-12 group-hover:left-[50%] transition-all duration-700 ease-in-out"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </Stack>
    </Dialog>
  );
};

export default ConfirmPrintModal;
