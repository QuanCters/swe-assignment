import Tab from "./Tab";
import { useNavigate, useMatch } from "@tanstack/react-router";

export default function Header() {
  const navigate = useNavigate();
  const match = useMatch({ from: "/login", shouldThrow: false });

  return (
    <header className="sticky top-0 w-full flex items-center bg-primary h-[64px] text-justify drop-shadow-md justify-between px-8 z-50">
      <div className="left-sec flex items-center gap-8 h-full ">
        {/* Logo Section */}
        <div className="logo flex w-auto flex-row gap-4">
          <img
            src="src/assets/hcmut.png"
            alt="Logo"
            className="aspect-square w-11"
          />
          <h1 className="w-[154px] text-black text-[18px] font-bold font-['Roboto'] leading-tight select-none">
            Smart Printing <br /> Service
          </h1>
        </div>
        {/* Tab Group Section */}
        <nav className="tab-group relative flex flex-row justify-center h-full flex-1 items-stretch">
          {/* Tab with Lines */}
          <Tab page="Printing History" />
          <Tab page="Print" route="/_private/_print" />
        </nav>
      </div>
      {/* Right Section */}
      {false && (
        <div className="right-sec flex items-center flex-row h-2/3 divide-x-2 divide-gray-500">
          <h2 className="bold text-[15px] p-4">Student Name</h2>
          <div className="flex flex-end h-full items-center place-content-center flex-row gap-1 p-4">
            <img className="w-9 h-9 rounded-full border-black border-2" />
            <svg
              width="12"
              height="6"
              viewBox="0 0 10 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0L5 5L10 0H0Z" fill="black" fill-opacity="0.87" />
            </svg>
          </div>
        </div>
      )}{" "}
      {
        <div>
          <button
            type="button"
            className="px-6 py-3 bg-[#0052B4] text-white font-semibold rounded-xl hover:bg-gradient-to-r hover:from-[#0052B4] hover:to-[#0074E8] transition-all ease-in duration-300 hover:shadow-[0px_4px_15px_rgba(0,116,232,0.5)]"
            onClick={() => {
              if (!match) navigate({ to: "/login" });
              else window.location.reload();
            }}
          >
            Login
          </button>
        </div>
      }
    </header>
  );
}
