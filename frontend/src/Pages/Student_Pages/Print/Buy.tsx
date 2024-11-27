import * as React from "react";
import minus from "@/assets/minus.svg";
import plus from "@/assets/plus.svg"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

function PageCounter({ value, onChange }: {
  value: number;
  onChange: (value: number) => void;
}) {
  const handleDecrement = () => {
    if (value > 1) onChange(value - 1);
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  return (
    <div
      role="spinbutton"
      aria-valuenow={value}
      aria-valuemin={1}
      aria-valuemax={100}
      className="flex overflow-hidden gap-4 justify-center items-center self-stretch px-4 py-2 my-auto text-2xl whitespace-nowrap rounded-3xl bg-black bg-opacity-10"
    >
      <button
        onClick={handleDecrement}
        aria-label="Decrease pages"
        disabled={value <= 1}
        className="focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
      >
        <img
          src={minus}
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
        />
      </button>
      <span className="select-none">{value}</span>
      <button
        onClick={handleIncrement}
        aria-label="Increase pages"
        className="focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <img
          src={plus}
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
        />
      </button>
    </div>
  );
}
function PageInfo({ currentPages, pricePerPage, recommendedPages }: {
  currentPages: number,
  pricePerPage: number,
  recommendedPages: number
}) {
  return (
    <section aria-labelledby="page-info-title">
      <h2 id="page-info-title" className="sr-only">Page Information</h2>
      <dl className="flex flex-col justify-center w-full text-gray-500 max-md:max-w-full space-y-2.5">
        <div>
          <dt className="inline text-2xl">You have: </dt>
          <dd className="inline font-bold text-2xl text-sky-500">{currentPages} A4 pages</dd>
        </div>
        <div>
          <div className="inline text-2xl text-gray-500">Price: </div>
          <div className="inline font-bold text-2xl text-sky-500">{pricePerPage} vnđ/page</div>
        </div>
        <div>
          <dt className="inline text-2xl">Recommended purchase: </dt>
          <dd className="inline font-bold text-2xl text-sky-500">{recommendedPages} A4 pages</dd>
        </div>
      </dl>
      <div className="mt-2.5 text-2xl text-black text-opacity-90 max-md:max-w-full">
        <strong>Note</strong>: printing pages with bigger sizes will cost an equal number of A4 pages.
        <br />
        (For example: a document with 16 A3 pages will cost 32 A4 pages)
      </div>
    </section>
  );
}

//TODO: FETCH THESE VARIABLES FROM BACKEND
export function BuyPage({ price = 220, currentPages = 48, recommendedPages = 10 }: {
  price: number;
  currentPages: number;
  recommendedPages?: number;
}) {

  const [pageCount, setPageCount] = React.useState(recommendedPages);
  //* REDIRECT TO BKPAY
  const handleConfirm = () => {
    //* MAKE SURE TO REMOVE ALERT WHEN FINAL
    alert('Confirmed');
    window.location.href = 'https://bkpay.hcmut.edu.vn/bkpay/home.action';
  };
  const totalPrice = pageCount * price;

  return (
    <main className="flex overflow-hidden flex-col flex-1 justify-center px-16 py-8 w-full max-md:px-5 max-md:max-w-full">
      <section className="flex flex-col flex-1 pr-1 pb-11 pl-8 w-full rounded-md max-md:pl-5 max-md:max-w-full">
        <h1 className="text-3xl font-bold leading-none text-sky-500 max-md:max-w-full">
          Buy pages
        </h1>
        <div className="flex flex-wrap flex-1 gap-7 mt-7 size-full max-md:max-w-full">
          <figure className="flex overflow-hidden flex-1 shrink gap-2.5 justify-center items-center h-full bg-blue-50 shadow-md basis-40 min-w-[240px] max-md:max-w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/0e6a670ed1ac0fc1d65fc6338c062f03fd232834bbc1117c6c2ad742f8394368?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&"
              alt="Page purchase illustration"
              className="object-contain self-stretch my-auto aspect-[0.74] min-w-[240px] w-[449px]"
            />
          </figure>
          <section className="flex overflow-hidden flex-col flex-1 shrink py-6 pr-8 pl-32 basis-0 min-w-[240px] max-md:px-5 max-md:max-w-full">
            <PageInfo
              currentPages={currentPages}
              pricePerPage={price}
              recommendedPages={recommendedPages}
            />
            <div className="flex overflow-hidden gap-10 justify-between items-center mt-2.5 w-full font-bold text-black text-opacity-90 max-md:max-w-full">
              <label className="self-stretch my-auto text-2xl">
                Number of pages to buy:
              </label>
              <PageCounter
                value={pageCount}
                onChange={setPageCount}
              />
            </div>
            <div className="flex overflow-hidden flex-col flex-1 items-end mt-16 w-full font-bold max-md:mt-10 max-md:max-w-full">
              <div className="flex overflow-hidden flex-col justify-between px-6 py-8 max-w-full min-h-[171px] w-[241px] max-md:px-5">
                <p className="self-end text-2xl text-black text-opacity-90">
                  Total: {totalPrice.toLocaleString()} vnđ
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="overflow-hidden gap-2.5 self-stretch px-6 py-4 mt-6 w-full text-2xl tracking-normal text-center text-white whitespace-nowrap bg-sky-700 rounded-2xl max-md:px-5 
                      hover:bg-sky-800 transition-colors"
                    >
                      Confirm
                    </button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl flex flex-col px-5 py-5 
                  bg-blue-100 shadow-md sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center gap-4 text-2xl">Confirm purchase?</DialogTitle>
                    </DialogHeader>

                    <div className="text-center mt-4 text-lg text-black">
                      <p>You are about to purchase:</p>
                      <p className="font-bold">{pageCount} A4 pages</p>
                      <p>You will be redirected to</p>
                      <p>BKPay to finish your purchase.</p>
                    </div>

                    <DialogFooter className="sm:justify-between">
                      <DialogClose asChild>
                        <button
                          className="gap-2.5 px-1 py-2 w-full text-xl text-center text-white whitespace-nowrap bg-gray-400 rounded-2xl max-md:px-5 hover:bg-gray-500  
                      transition-colors">
                          Close
                        </button>
                      </DialogClose>

                      <button
                        onClick={handleConfirm}
                        className="gap-2.5 px-1 py-2 w-full text-xl text-center text-white whitespace-nowrap bg-sky-700 rounded-2xl max-md:px-5 hover:bg-sky-800
                      transition-colors">
                        Confirm
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}