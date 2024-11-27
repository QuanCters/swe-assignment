import { Dialog, Stack } from "@mui/material";
const InsufficientPagesModal: React.FC<{ onClose: any }> = ({ onClose }) => {
  const stringlist = [
    "Report3.pdf - 15 A4 pages.",
    "Report3.pdf - 15 A4 pages.",
    "Report3.pdf - 15 A4 pages.",
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
          </div>
          <div className="flex flex-col items-center gap-1 w-2/3 font-bold">
            <p>
              Total: <span className="font-normal">51 A4 pages</span>
            </p>
            <p>
              You have: <span className="font-normal">51 A4 pages</span>
            </p>
            <p className="text-center">
              Please adjust your settings or buy more pages.
            </p>
          </div>
          <div className="flex flex-row flex-1 items-end w-full px-10 justify-between max-lg:px-0 min-h-20">
            <button
              className="px-6 py-3 bg-stone-600 text-white rounded-xl font-semibold hover:bg-gradient-to-r hover:from-stone-500 hover:via-stone-400 hover:to-stone-500 duration-300 shadow-md transform hover:scale-105 transition"
              onClick={onClose}
            >
              Return
            </button>

            <div className="relative group">
              <button className="bg-[#0052B4] text-white px-6 py-3 rounded-xl relative overflow-hidden transition-all ease-in-out duration-500">
                Buy Pages
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

export default InsufficientPagesModal;
