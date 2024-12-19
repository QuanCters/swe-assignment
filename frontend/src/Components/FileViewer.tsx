import { Document, Page, pdfjs } from "react-pdf";
import { useState, useRef } from "react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import usePreventZoom from "@/hooks/usePreventZoom";
import { parseCustomPages } from "@/utils/pageCount";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type FileViewerProps = {
  fileData: ArrayBuffer | null;
  display: {
    pages: string;
    customPages: string;
    margins: { top: number; bottom: number; left: number; right: number };
  };
  file?: File | null;
  numPages: number;
  setNumPages: React.Dispatch<React.SetStateAction<number>>;
};

const FileViewer: React.FC<FileViewerProps> = ({
  fileData,
  display,
  file,
  numPages,
  setNumPages,
}) => {
  const [zoom, setZoom] = useState(1);
  const divRef = useRef(null);
  const handleZoom = (e: WheelEvent) => {
    const delta = e.deltaY;
    const zoomChange = delta < 0 ? 0.05 : -0.05;
    setZoom((prevZoom) => {
      const newZoom = prevZoom + zoomChange;
      return Math.min(Math.max(newZoom, 0.5), 1.05);
    });
  };
  usePreventZoom(true, true, divRef, handleZoom);

  return (
    <div className="flex flex-col flex-1 start gap-4 flex-grow">
      <h3 className="text-2xl font-bold text-[#2196F3]">File Preview</h3>
      <div
        ref={divRef}
        className="h-[90vh] border border-[#2196F3] relative overflow-hidden w-full self-center rounded-md bg-black/5"
      >
        {fileData && (
          <Document
            className="flex flex-col justify-start items-center overflow-auto h-[90vh] w-full snap-y snap-mandatory scroll-smooth gap-10"
            file={fileData}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from({ length: numPages }, (_, index) => {
              const isPageVisible =
                display.pages === "all" ||
                (display.pages === "odd" && (index + 1) % 2 !== 0) ||
                (display.pages === "even" && (index + 1) % 2 === 0) ||
                (display.pages === "custom" &&
                  (display.customPages === "" ||
                    parseCustomPages(display.customPages, numPages).includes(
                      index + 1
                    )));

              if (!isPageVisible) return null;
              return (
                <div
                  key={index}
                  className={`relative rounded my-2 border drop-shadow snap-always snap-center ${index === 0 ? "mt-7" : ""} ${index === numPages - 1 ? "mb-7" : ""}`}
                  style={{
                    transform: `scale(${zoom})`, // Áp dụng tỷ lệ zoom
                    transformOrigin: "center", // Điểm gốc của zoom
                  }}
                >
                  <Page pageNumber={index + 1} />
                  <div
                    style={{
                      position: "absolute",
                      top: display.margins.top,
                      bottom: display.margins.bottom,
                      left: display.margins.left,
                      right: display.margins.right,
                      border: "1.5px dashed red",
                      zIndex: 1,
                      visibility:
                        display.margins.top === 0 &&
                        display.margins.bottom === 0 &&
                        display.margins.left === 0 &&
                        display.margins.right === 0
                          ? "hidden"
                          : "visible",
                    }}
                  ></div>
                </div>
              );
            })}
          </Document>
        )}
        {!fileData && (
          <div className="h-full flex justify-center items-center flex-col gap-3">
            <p className="font-medium"> Preview only support for .pdf</p>
            {file && (
              <>
                <p className="font-medium">File: {file.name}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
