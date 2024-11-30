import FileViewer from "@/Components/FileViewer";
import React from "react";
import { useNavigate } from "@tanstack/react-router";
import MarginInputs from "@/Components/ConfigInputs";

const paperOptions = [
  "A4",
  "A3",
  "Letter",
  "Legal",
  "Tabloid",
  "Executive",
  "Ledger",
  "B5",
  "B4",
  "C5",
  "DL",
  "C6",
  "A5",
  "A6",
  "Postcard",
];

const pagesSheetOptions = [1, 2, 4, 6, 9, 16];

const ConfigPrintPage: React.FC = () => {
  const navigate = useNavigate();

  const [fileData, setFileData] = React.useState<ArrayBuffer | null>(null);
  const [selectedOption, setSelectedOption] = React.useState("Default");
  const [pagesPerSheet, setPagesPerSheet] = React.useState(
    pagesSheetOptions[0]
  );
  const [margins, setMargins] = React.useState({
    top: 25.2,
    bottom: 25.2,
    left: 25.2,
    right: 25.2,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFileData(event.target.result as ArrayBuffer);
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const handleMarginsChange = (newMargins: typeof margins) => {
    setMargins(newMargins);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate({ to: "/choose-printer" });
  };
  const onReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate({ to: "/print" });
  };

  return (
    <div className="flex-1 flex flex-row px-20 gap-x-20 flex-wrap max-md:grid max-md:grid-cols-1 max-md:gap-3">
      <FileViewer fileData={fileData} margins={margins} />

      <form
        className="w-[25vw] flex flex-col gap-4 max-md:w-full h-full"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <h3 className="text-2xl font-bold text-[#2196F3] select-none">
          Settings
        </h3>
        <div className="flex flex-col gap-4 flex-1 overscroll-y-auto">
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold select-none">Layout</h4>
            <div className="flex flex-row px-6 text-sm">
              <div className="flex flex-row gap-2 flex-1 items-center">
                <input
                  type="radio"
                  id="layout-portrait"
                  name="layout"
                  defaultChecked
                  className="form-radio w-4 h-4 text-[#0052B4] checked:ring-[#0052B4] bg-transparent"
                />
                <label htmlFor="layout-portrait" className="select-none">
                  Portrait
                </label>
              </div>
              <div className="flex flex-row gap-2 flex-1 items-center">
                <input
                  type="radio"
                  id="layout-landscape"
                  name="layout"
                  className="form-radio w-4 h-4 text-[#0052B4] checked:ring-[#0052B4] bg-transparent"
                />
                <label htmlFor="layout-landscape" className="select-none">
                  Landscape
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold select-none">Pages</h4>
            <div className="grid grid-cols-2 max-md:grid-cols-1 px-6 gap-y-3 text-sm">
              <div className="flex flex-row gap-2 flex-1 items-center">
                <input
                  type="radio"
                  id="pages-all"
                  name="pages"
                  className="form-radio w-4 h-4 text-[#0052B4] checked:ring-[#0052B4] bg-transparent"
                  defaultChecked
                />
                <label htmlFor="pages-all" className="select-none flex-1">
                  All
                </label>
              </div>
              <div className="flex flex-row gap-2 flex-1 items-center">
                <input
                  type="radio"
                  id="pages-even"
                  name="pages"
                  className="form-radio w-4 h-4 text-[#0052B4] checked:ring-[#0052B4] bg-transparent"
                />
                <label htmlFor="pages-even" className="select-none flex-1">
                  Even pages only
                </label>
              </div>
              <div className="flex flex-row gap-2 flex-1 items-center">
                <input
                  type="radio"
                  id="pages-odd"
                  name="pages"
                  className="form-radio w-4 h-4 text-[#0052B4] checked:ring-[#0052B4] bg-transparent"
                />
                <label htmlFor="pages-odd" className="select-none flex-1">
                  Odd pages only
                </label>
              </div>
              <div className="flex flex-row gap-2 flex-1 items-center">
                <input
                  type="radio"
                  id="pages-custom"
                  name="pages"
                  className="form-radio w-4 h-4 text-[#0052B4] checked:ring-[#0052B4] bg-transparent"
                />
                <label htmlFor="pages-custom" className="select-none flex-1">
                  <input
                    type="text"
                    className="form-input self-center h-8 px-3 border border-stone-500 focus:ring-[#0052B4] focus:border-[#0052B4] rounded-md bg-transparent w-full"
                    onFocus={() =>
                      document.getElementById("pages-custom")?.click()
                    }
                    onClick={() =>
                      document.getElementById("pages-custom")?.click()
                    }
                    placeholder="e.g. 1-5, 8, 11-13"
                  />
                  {/* Even pages only */}
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold select-none">Paper Size</h4>
            <select className="form-select rounded-md bg-transparent border border-stone-500 focus:ring-[#0052B4] focus:border-[#0052B4]">
              {paperOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold select-none">Pages per Sheet</h4>
            <select
              className="form-select rounded-md bg-transparent border border-stone-500 focus:ring-[#0052B4] focus:border-[#0052B4]"
              value={pagesPerSheet}
              onChange={(e) => setPagesPerSheet(Number(e.target.value))}
            >
              {pagesSheetOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold select-none">Margins</h4>
            <select
              className={`form-select rounded-md bg-transparent border border-stone-500 focus:ring-[#0052B4] focus:border-[#0052B4] 
                ${pagesPerSheet !== 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              disabled={pagesPerSheet !== 1}
            >
              <option>Default</option>
              <option>None</option>
              <option>Custom</option>
            </select>
            {selectedOption === "Custom" && pagesPerSheet === 1 && (
              <MarginInputs onMarginsChange={handleMarginsChange} />
            )}
          </div>
        </div>

        <h3>Upload File</h3>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <div className="flex flex-row justify-between">
          <button
            type="reset"
            className="bg-[#0052B4] px-6 py-3 rounded-xl text-white w-[150px] font-semibold"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-[#0052B4] px-6 py-3 rounded-xl text-white w-[150px] font-semibold"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfigPrintPage;
