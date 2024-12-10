import * as React from "react";
import minus from "@/assets/minus.svg";
import plus from "@/assets/plus.svg";
import { useRouterState, useNavigate } from "@tanstack/react-router";

import { createFileRoute } from "@tanstack/react-router";
import { useModal } from "@/context/ModalContext";

export const Route = createFileRoute("/_private/_student/buy-page")({
  component: BuyPage,
});

function BuyPage() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const routerState = useRouterState();
  const config = routerState.location.state.config;

  console.log("Config at buy-page:", config);
  const price = 220;
  const pageBalance = config.pageBalance;
  const recommendedPages = config.paymentAmount - pageBalance;

  const [pageCount, setPageCount] = React.useState(recommendedPages);
  const handleConfirm = () => {
    openModal("ConfirmBuyModal", {
      config: {
        ...config,
      },
      pageCount: pageCount,
      totalPrice: totalPrice,
      navigate: () => {
        setTimeout(() => {
          navigate({
            to: "/print",
          });
        }, 100);
      },
    });
  };
  const totalPrice = pageCount * price;
  const handleDecrement = () => {
    setPageCount((prevValue) => prevValue - 1);
  };

  const handleIncrement = () => {
    setPageCount((prevValue) => prevValue + 1);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(e.target.value) && Number(e.target.value))
      setPageCount(Number(e.target.value));
  };

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
              pageBalance={pageBalance}
              pricePerPage={price}
              recommendedPages={recommendedPages}
            />
            <div className="flex overflow-hidden justify-between items-center mt-2.5 w-full font-bold text-black text-opacity-90 max-md:max-w-full">
              <label className="self-stretch my-auto text-2xl">
                Number of pages to buy:
              </label>
              {/* <PageCounter value={pageCount} onChange={setPageCount} /> */}
              <div
                role="spinbutton"
                aria-valuenow={pageCount}
                aria-valuemin={1}
                aria-valuemax={100}
                className="flex flex-wrap overflow-hidden gap-6 justify-center items-center self-stretch px-4 py-2 my-auto text-2xl whitespace-nowrap rounded-3xl bg-black bg-opacity-10"
              >
                <button
                  onClick={handleDecrement}
                  aria-label="Decrease pages"
                  disabled={pageCount <= 1}
                  className="focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
                >
                  <img
                    src={minus}
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                  />
                </button>
                <span className="select-none">
                  <input
                    type="text"
                    className="select-none overflow-hidden border rounded w-[40px]"
                    value={pageCount}
                    onChange={handleChange}
                  ></input>
                </span>

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
            </div>
            <div className="flex overflow-hidden flex-col flex-1 items-end mt-16 w-full font-bold max-md:mt-10 max-md:max-w-full">
              <div className="flex overflow-hidden flex-col justify-between px-6 py-8 max-w-full min-h-[171px] w-[241px] max-md:px-5">
                <p className="self-end text-2xl text-black text-opacity-90">
                  Total price: {totalPrice.toLocaleString()} vnđ
                </p>
              </div>

              <button
                onClick={handleConfirm}
                className="bg-[#0052B4] px-6 py-3 rounded-xl text-white w-[150px] font-semibold"
              >
                Confirm
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function PageInfo({
  pageBalance,
  pricePerPage,
  recommendedPages,
}: {
  pageBalance: number;
  pricePerPage: number;
  recommendedPages: number;
}) {
  return (
    <section aria-labelledby="page-info-title">
      <h2 id="page-info-title" className="sr-only">
        Page Information
      </h2>
      <dl className="flex flex-col justify-center w-full text-gray-500 max-md:max-w-full space-y-2.5">
        <div>
          <dt className="inline text-2xl">You have: </dt>
          <dd className="inline font-bold text-2xl text-sky-500">
            {pageBalance} A4 pages
          </dd>
        </div>
        <div>
          <div className="inline text-2xl text-gray-500">Price: </div>
          <div className="inline font-bold text-2xl text-sky-500">
            {pricePerPage} vnđ/page
          </div>
        </div>
        <div>
          <dt className="inline text-2xl">Recommended purchase: </dt>
          <dd className="inline font-bold text-2xl text-sky-500">
            {recommendedPages} A4 pages
          </dd>
        </div>
      </dl>
      <div className="mt-2.5 text-2xl text-black text-opacity-90 max-md:max-w-full">
        <strong>Note</strong>: printing pages with bigger sizes will cost an
        equal number of A4 pages.
        <br />
        (For example: a document with 16 A3 pages will cost 32 A4 pages)
      </div>
    </section>
  );
}
