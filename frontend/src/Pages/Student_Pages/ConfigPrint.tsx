import FileViewer from "@/Components/FileViewer";
import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import MarginInputs from "@/Components/ConfigInputs";
import { useMutation } from "@tanstack/react-query";
import { saveDocument } from "@/api/printing";
import { RadioGroup } from "@/Components/RadioGroup";
import { PagesInput } from "@/Components/PagesInput";
import { Dropdown } from "@/Components/Dropdown";
import { pageCount } from "@/utils/pageCount";
import { CircularProgress } from "@mui/material";

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
  const routerState = useRouterState();
  const file = routerState.location.state.file;

  const [fileData, setFileData] = useState<ArrayBuffer | null>(null);
  const [margins, setMargins] = useState({
    top: 25.2,
    bottom: 25.2,
    left: 25.2,
    right: 25.2,
  });
  const [formState, setFormState] = useState({
    duplex: "duplex-true",
    color: "color-false",
    layout: "portrait",
    pages: "all",
    customPages: "",
    pageType: "A4",
    pagesPerSheet: 1,
    margins: "Default",
    customMargins: margins,
  });

  const [numPages, setNumPages] = useState(0);
  
  const mutation = useMutation({
    mutationFn: () => {
      if (!file)
        throw new Error(
          "The file is missing. Please try uploading a file from Print."
        );
      return saveDocument({
        pageCount: pageCount(numPages, formState),
        fileName: file.name,
        file: file,
      });
    },
    onError: (error) => {
      alert(error);
    },
  });

  useEffect(() => {
    if (file && file.name.endsWith(".pdf")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFileData(event.target.result as ArrayBuffer);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  const handleMarginsChange = (newMargins: typeof margins) => {
    setMargins(newMargins);
    setFormState((prevState) => ({
      ...prevState,
      customMargins: margins,
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to continue? You can't return to this page once you have confirmed."
    );
    if (!userConfirmed) return;
    const printCount = getCopiesValue();

    mutation.mutate(undefined, {
      onSuccess(data) {
        navigate({
          to: "/choose-printer",
          state: {
            config: {
              documentId: data.id,
              data: formState,
              pageCount: pageCount(numPages, formState),
              printCount: printCount,
            },
            file: file,
          },
        });
      },
    });
  };
  if (mutation.isLoading)
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <CircularProgress size={40} className="w-full h-[90vw]" />
      </div>
    );

  return (
    <div className="flex-1 flex flex-row px-20 gap-x-20 flex-wrap max-lg:grid max-lg:grid-cols-1 max-lg:gap-3">
      <FileViewer
        fileData={fileData}
        margins={margins}
        file={file}
        numPages={numPages}
        setNumPages={setNumPages}
      />

      <form
        className="w-[25vw] flex flex-col gap-4 max-lg:w-full h-full"
        onSubmit={onSubmit}
      >
        <h3 className="text-2xl font-bold text-[#2196F3] select-none">
          Settings
        </h3>
        <div className="flex flex-col gap-4 flex-1 overscroll-y-auto">
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold select-none">Number of Copies</h4>
            <input
              id="copies"
              type="number"
              className="form-input self-center border border-stone-500 focus:ring-[#0052B4] focus:border-[#0052B4] rounded-md bg-transparent w-full"
              defaultValue={1}
              min={1}
            />
          </div>
          <RadioGroup
            title="Printing on Both side ?"
            name="duplex"
            options={[
              { id: "duplex-true", label: "True" },
              { id: "duplex-false", label: "False" },
            ]}
            formState={formState}
            setFormState={setFormState}
          />
          <RadioGroup
            title="Color"
            name="color"
            options={[
              { id: "color-false", label: "Black & White" },
              { id: "color-true", label: "Colored" },
            ]}
            formState={formState}
            setFormState={setFormState}
          />
          <RadioGroup
            title="Layout"
            name="layout"
            options={[
              { id: "portrait", label: "Portrait" },
              { id: "landscape", label: "Landscape" },
            ]}
            formState={formState}
            setFormState={setFormState}
          />
          <PagesInput formState={formState} setFormState={setFormState} />

          <Dropdown
            title="Paper Size"
            options={paperOptions}
            name="pageType"
            formState={formState}
            setFormState={setFormState}
            disabled={false}
          />
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold select-none">Pages per Sheet</h4>
            <select
              className="form-select rounded-md bg-transparent border border-stone-500 focus:ring-[#0052B4] focus:border-[#0052B4]"
              value={formState.pagesPerSheet}
              onChange={(e) => {
                setFormState((prevState) => ({
                  ...prevState,
                  pagesPerSheet: Number(e.target.value),
                }));
              }}
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
                ${formState.pagesPerSheet !== 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              value={formState.margins}
              onChange={(e) => {
                setFormState((prevState) => ({
                  ...prevState,
                  margins: e.target.value,
                }));
              }}
              disabled={formState.pagesPerSheet !== 1}
            >
              <option>Default</option>
              <option>None</option>
              <option>Custom</option>
            </select>
            {formState.margins === "Custom" &&
              formState.pagesPerSheet === 1 && (
                <MarginInputs onMarginsChange={handleMarginsChange} />
              )}
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <button
            type="reset"
            className="navigateBtn bg-[#0052B4] px-6 py-3 rounded-xl text-white w-[150px] font-semibold"
            onClick={(event) => {
              event.preventDefault();
              navigate({ to: "/print", state: { file: file } });
            }}
          >
            Back
          </button>
          <button
            type="submit"
            className="navigateBtn bg-[#0052B4] text-white px-6 py-3 rounded-xl w-[150px] relative group overflow-hidden transition-all ease-in-out duration-500 font-semibold"
          >
            Next
            <span className="absolute top-0 left-[-200%] w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 transform skew-x-12 group-hover:left-[50%] transition-all duration-700 ease-in-out"></span>
          </button>
        </div>
      </form>
    </div>
  );
};

const getCopiesValue = () => {
  const inputElement = document.getElementById("copies") as HTMLInputElement;
  if (inputElement) {
    const value = parseInt(inputElement.value, 10);
    return value;
  }
  return 1;
};

export default ConfigPrintPage;
