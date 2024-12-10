import { useEffect, useRef, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
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

const DragNDrop: React.FC = () => {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const file = routerState.location.state.file;

  const inputFile = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (file) setFiles([file]);
  }, [file]);
  useEffect(() => {
    var div1 = document.getElementById("document-uploader");
    var div2 = document.getElementById("document-uploaded");
    if (div1 && div2) {
      const div2Height = div2.offsetHeight;
      div1.style.height = `${div2Height}px`;
    }
  }, []);

  const getAcceptedFileTypes = (): string[] => {
    if (inputFile.current && inputFile.current.accept) {
      // Lọc các kiểu tệp từ chuỗi accept
      return inputFile.current.accept
        .split(",")
        .map((type) => type.trim())
        .filter((type) => type.length > 0);
    }
    return [];
  };

  const handleFile = (droppedFiles: FileList | null) => {
    const acceptedFileTypes = getAcceptedFileTypes();

    if (droppedFiles && droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);

      const validFiles = newFiles.filter((file) => {
        const fileType = file.name;

        if (acceptedFileTypes.length === 0) return true;
        return acceptedFileTypes.some((type) => fileType.endsWith(type));
      });

      if (validFiles[0].size / (1024 * 1024) > 5) {
        alert("File size must be less than 5MB.");
        return;
      }

      if (validFiles.length > 0) {
        setFiles([...validFiles]);
      } else {
        alert(
          `Only the specified file types are allowed: ${acceptedFileTypes}`
        );
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (files.length > 0) {
      navigate({
        to: "/config-page",
        state: { file: files[0] }, // Dữ liệu File
      });
    }
  };

  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-x-12 gap-y-10 w-[80vw] max-lg:grid-cols-2 max-sm:grid-cols-1">
      <div className="max-lg:col-span-1 col-start-1 row-end-2 col-span-2 flex flex-row justify-end items-end">
        <div
          className="document-uploader w-full h-[576px] py-6 rounded-lg border-2 border-sky-700 flex-col justify-center items-center gap-3 inline-flex border-dashed "
          onDrop={(event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const droppedFiles = event.dataTransfer.files;
            return handleFile(droppedFiles);
          }}
          onDragOver={(event) => event.preventDefault()}
          id="document-uploader"
        >
          <img src="./src/assets/upload.svg" className="w-[42px] h-[42px]" />
          {/* <object data="./assets/upload.svg"> </object> */}
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
                onClick={() => {
                  if (inputFile.current === null) return;
                  inputFile.current?.click();
                }}
              >
                Browse file
                <input
                  hidden
                  type="file"
                  ref={inputFile}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    event.preventDefault();
                    const selectedFiles = event.target.files;
                    return handleFile(selectedFiles);
                  }}
                  accept=".pdf"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-start-3 flex flex-col gap-5 max-lg:col-start-2 max-sm:row-start-2 max-sm:col-start-1">
        <h2 className="font-bold text-xl text-[#2196F3] w-[25vw] min-w-[10vw]">
          Upload file
        </h2>
        <div
          id="document-uploaded"
          className={`document-uploaded  h-full flex flex-col min-h-[600px] ${
            files.length > 0 ? "upload-box active" : "upload-box"
          }`}
        >
          {files.length > 0 && (
            <div className="file-list__container flex flex-col gap-4 overflow-auto scroll-smooth flex-1">
              {files.map((file, index) => (
                <div
                  className="file-item flex flex-row p-4 bg-white rounded-xl border border-gray-200 gap-3 min-w-fit"
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
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
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
              className={`navigateBtn bg-[#0052B4] text-white px-6 py-3 rounded-xl w-[150px] relative group overflow-hidden transition-all ease-in-out duration-500 font-semibold ${files.length > 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none select-none"}`}
            >
              Next
              <span className="absolute top-0 left-[-200%] w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 transform skew-x-12 group-hover:left-[50%] transition-all duration-700 ease-in-out"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragNDrop;
