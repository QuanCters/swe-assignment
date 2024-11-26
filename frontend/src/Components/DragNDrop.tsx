import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
} from "react-icons/fa";

const FileIcon: React.FC<
  {
    extension: string | undefined;
    size?: string;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ extension, size = 15, ...props }) => {
  switch (extension) {
    case "pdf":
      return (
        <FaFilePdf size={size} className={`text-red-500 ${props.className}`} />
      );
    case "docx":
    case "doc":
      return (
        <FaFileWord
          size={size}
          className={`text-blue-500 ${props.className}`}
        />
      );
    case "xlsx":
    case "xls":
      return (
        <FaFileExcel
          size={size}
          className={`text-green-500 ${props.className}`}
        />
      );
    case "png":
    case "jpg":
    case "jpeg":
      return (
        <FaFileImage
          size={size}
          className={`text-purple-500 ${props.className}`}
        />
      );
    default:
      return (
        <FaFileAlt size={size} className={`text-gray-500 ${props.className}`} />
      ); // Default icon
  }
};

interface DragNDropProps {
  onFilesSelected: (files: File[]) => void;
  width?: string;
  height?: string;
}

const DragNDrop: React.FC<DragNDropProps> = ({ onFilesSelected }) => {
  const navigate = useNavigate();

  const inputFile = React.useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = React.useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  console.log("file", files);
  React.useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  const onOpenFileSelect = () => {
    // `current` points to the mounted file input element
    if (inputFile.current === null) return;
    inputFile.current?.click();
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate({ to: "/config-page" });
  };

  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-x-12 gap-y-4 max-md:grid-cols-1 px-12">
      <h2 className="row-end-1 col-start-1 hidden"></h2>
      <div
        className="col-start-1 row-end-2 col-span-2 h-[576px] py-6 rounded-lg border-2 border-sky-700 flex-col justify-center items-center gap-3 inline-flex border-dashed max-md:col-span-1"
        onDrop={files.length === 1 ? undefined : handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {/* <div className="w-[42px] h-[42px] relative" /> */}
        <img className="w-[42px] h-[42px]" />
        <div className="self-stretch h-[84px] flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch justify-center items-start gap-1 inline-flex">
            <div className="text-black/90 text-sm font-normal font-['Inter'] leading-tight">
              Drag your file(s) to start uploading
            </div>
          </div>
          <div className="w-[201px] justify-start items-center gap-3 inline-flex">
            <div className="grow shrink basis-0 h-px bg-black/30" />
            <div className="text-center text-gray-500 text-xs font-normal font-['Inter'] leading-[18px]">
              OR
            </div>
            <div className="grow shrink basis-0 h-px bg-black/30" />
          </div>
          <form
            className="justify-start items-start inline-flex"
            onSubmit={onSubmit}
            id="file-form"
          >
            <div
              className="text-blue-700 text-xs font-semibold font-['Inter'] leading-[18px] px-3 py-1.5 bg-white rounded-lg border border-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-500 cursor-pointer"
              onClick={onOpenFileSelect}
            >
              Browse file
              <input
                hidden
                type="file"
                ref={inputFile}
                onChange={handleFileChange}
              />
            </div>
          </form>
        </div>
      </div>
      <h2 className="row-end-1 col-start-3 font-bold text-xl text-[#2196F3] w-[25vw] min-w-[10vw]">
        Upload file
      </h2>
      <div
        className={`document-uploader row-end-2 col-start-3 h-full flex flex-col ${
          files.length > 0 ? "upload-box active" : "upload-box"
        }`}
      >
        {files.length > 0 && (
          <div className="file-list__container flex flex-col gap-4 overflow-auto scroll-smooth flex-1">
            {files.map((file, index) => (
              <div
                className="file-item flex flex-row p-4 bg-white rounded-xl border border-gray-200 gap-3"
                key={index}
              >
                <FileIcon
                  size="36"
                  extension={file.name.split(".").pop()}
                  className="self-center"
                />
                <div className="file-info flex flex-col flex-1 self-center gap-1">
                  <p className="font-semibold text-sm">{file.name}</p>
                  <p className="font-normal text-sm text-gray-700">
                    {file.size}
                  </p>
                </div>
                <div className="file-actions self-center rounded-full bg-gray-300 p-1 border-2 border-gray-600">
                  <MdClear
                    size={18}
                    onClick={() => handleRemoveFile(index)}
                    className="cursor-pointer hover:text-red-500 text-gray-600"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="success-file ">
            <AiOutlineCheckCircle
              size={20}
              style={{ color: "#6DC24B", marginRight: 8 }}
            />
            <p>{files.length} file(s) selected</p>
          </div>
        )}
        <div
          className={`flex flex-row justify-end ${files.length <= 0 ? "flex-1 items-end" : ""}`}
        >
          <button
            type="submit"
            form="file-form"
            // disabled={files.length <= 0}
            className="bg-[#0052B4] px-6 py-3 rounded-xl text-white w-[150px]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DragNDrop;
