import { useMutation } from "@tanstack/react-query";
import { updatePageBalance } from "@/api/buy";
import React, { useState } from "react";
import { useDialog } from "@/hooks/useDialog";

const ConfirmBuyModal: React.FC<{
  config: any;
  onClose: any;
  navigate: any;
  totalPrice: any;
  pageCount: any;
}> = ({ config, onClose, navigate, totalPrice, pageCount }) => {

  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: (pass: any) => {
      const data = {
        pageCount: pageCount,
      };
      const password = {
        password: pass,
      };
      return updatePageBalance(data, password);
    },
    onSuccess: () => {
      alert(
        "Successfully bought pages."
      );
      onClose();
      navigate();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Password: ', password);

    mutation.mutate(password);
  };

  const { dialogRef, handleOutsideClick } = useDialog(onClose);

  return (
    <dialog
      open
      ref={dialogRef}
      onClick={handleOutsideClick} // Handle clicks outside of modal
      className="fixed inset-0 z-[999999999] flex items-center justify-center bg-gray-800/50 backdrop:bg-gray-800/50 backdrop-blur-sm w-screen h-screen overflow-y-auto"
    >
        <form onSubmit={handleSubmit} className="bg-white flex flex-col items-center gap-10 select-none h-fit py-6 w-[25vw] px-4 body overflow-y-auto rounded-xl max-lg:min-w-60">
          <h3 className="text-2xl font-medium">Confirm Purchase?</h3>
          <div className="flex flex-col items-center gap-1 w-2/3 text-center mt-4">
            <p>
              You are about to buy:
            </p>
            <p>
              {pageCount} page{pageCount >= 2 ? <>s</> : <></>}
            </p>
            <p className="font-bold">
              Total price: {totalPrice} vnđ
            </p>
          </div>

          <div className="flex flex-col gap-1 w-[200px]">
              <div className="font-bold text-center">Enter your password to confirm: </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="form-input bg-transparent rounded-md"
                />
          </div>

          <div className="flex flex-row flex-1 items-end w-full px-10 justify-between max-lg:px-0 min-h-20">
            <button
              type="reset"
              onClick={onClose}
              className="px-6 py-3 bg-stone-600 text-white rounded-xl font-semibold hover:bg-gradient-to-r hover:from-stone-500 hover:via-stone-400 hover:to-stone-500 duration-300 shadow-md transform hover:scale-105 transition"
            >
              Return
            </button>

            <div className="">
              <button
                type="submit"
                className="bg-[#0052B4] text-white px-6 py-3 rounded-xl relative group overflow-hidden transition-all ease-in-out duration-500 font-semibold"
              >
                Confirm
                <span className="absolute top-0 left-[-200%] w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 transform skew-x-12 group-hover:left-[50%] transition-all duration-700 ease-in-out"></span>
              </button>
            </div>
          </div>
        </form>
    </dialog>
  );
};

export default ConfirmBuyModal;
