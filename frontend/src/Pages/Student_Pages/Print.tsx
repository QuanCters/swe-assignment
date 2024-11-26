import DragNDrop from "@/Components/Calendar/DragNDrop";

const PrintPage = () => {
  const handleFiles = (files: File[]) => {
    console.log("Selected files:", files);
  };

  return (
    <div className="flex justify-center w-full pt-10 pb-16 z-0">
      <DragNDrop onFilesSelected={handleFiles} width="400px" height="300px" />
    </div>
  );
};

export default PrintPage;
