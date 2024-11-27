import Tab from "./Tab";

export default function Header() {
  return (
    <header className="sticky top-0 w-full flex items-center bg-primary h-[64px] text-justify drop-shadow-md justify-between px-8">
      <div className="left-sec flex items-center gap-8 h-full ">
        {/* Logo Section */}
        <div className="logo flex w-auto">
          <img src="" alt="Logo" />
          <h1 className="w-[154px] text-black text-[18px] font-bold font-['Roboto'] leading-tight">
            Smart Printing <br /> Service
          </h1>
        </div>
        {/* Tab Group Section */}
        <nav className="tab-group relative flex flex-row justify-center h-full flex-1 items-stretch">
          {/* Tab with Lines */}
          <Tab page="Printing History" />
          <Tab page="Print" />
        </nav>
      </div>

      {/* Right Section */}
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
    </header>
  );
}
