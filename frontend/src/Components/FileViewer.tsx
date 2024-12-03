import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type FileViewerProps = {
  fileData: ArrayBuffer | null;
  margins: { top: number; bottom: number; left: number; right: number };
  file?: File | null;
  numPages: number;
  setNumPages: React.Dispatch<React.SetStateAction<number>>;
};

const FileViewer: React.FC<FileViewerProps> = ({
  fileData,
  margins,
  file,
  numPages,
  setNumPages,
}) => {
  return (
    <div className="flex flex-col flex-1 start gap-4 ">
      <h3 className="text-2xl font-bold text-[#2196F3]">File Preview</h3>
      <div className="h-[850px] border border-[#2196F3] relative overflow-hidden w-full self-center rounded-md bg-black/5">
        {fileData && (
          <Document
            className="flex flex-col justify-start items-center overflow-auto h-[850px] snap-y snap-mandatory scroll-smooth"
            file={fileData}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div
                key={index}
                className={`relative rounded my-2 border drop-shadow snap-always snap-center ${index === 0 ? "mt-7" : ""} ${index === numPages - 1 ? "mb-7" : ""}`}
              >
                <Page pageNumber={index + 1} />
                <div
                  style={{
                    position: "absolute",
                    top: margins.top,
                    bottom: margins.bottom,
                    left: margins.left,
                    right: margins.right,
                    border: "1.5px dashed red",
                    zIndex: 1,
                  }}
                ></div>
              </div>
            ))}
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
