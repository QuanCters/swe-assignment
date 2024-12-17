import { useMutation } from "@tanstack/react-query";
import { updatePageBalance } from "@/api/buy";
import { useDialog } from "@/hooks/useDialog";

const ConfirmBuyModal: React.FC<{
  config: any;
  onClose: any;
  navigate: any;
  totalPrice: any;
  pageCount: any;
}> = ({ config, onClose, navigate, totalPrice, pageCount }) => {
  console.log("Config:", config);
  const mutation = useMutation({
    mutationFn: (e: any) => {
      e.preventDefault();
      console.log("about to buy");
      const data = {
        pageCount: pageCount,
      };
      return updatePageBalance(data);
    },
    onSuccess: () => {
      alert(
        "Successfully bought pages. We will navigate you back to choose printer."
      );
      onClose();
      navigate();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const { dialogRef, handleOutsideClick } = useDialog(onClose);

  return (
    <dialog
      open
      ref={dialogRef}
      onClick={handleOutsideClick} // Handle clicks outside of modal
      className="fixed inset-0 z-[999999999] flex items-center justify-center bg-gray-800/50 backdrop:bg-gray-800/50 backdrop-blur-sm w-screen h-screen overflow-y-auto"
    >
      <div className="flex flex-col items-center gap-12 select-none h-[70vh] w-[20vw]">
        <h3 className="font-bold text-2xl">Confirm Purchase?</h3>
        <p>You are about to buy: {pageCount} pages</p>
        <div className="flex flex-col items-center gap-1 w-2/3">
          <p className="text-center mt-4 text-bold">
            Total price: {totalPrice} vnđ
          </p>
          <p className="text-center mt-4 text-bold">
            You will be redirected to BKPay to finish your purchase.
          </p>
        </div>

        <div className="flex flex-row flex-1 items-end w-full px-10 justify-between max-lg:px-0 min-h-20">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-stone-600 text-white rounded-xl font-semibold hover:bg-gradient-to-r hover:from-stone-500 hover:via-stone-400 hover:to-stone-500 duration-300 shadow-md transform hover:scale-105 transition"
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
    </dialog>
  );
};

export default ConfirmBuyModal;
