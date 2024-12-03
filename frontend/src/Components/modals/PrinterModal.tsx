import { addPrinter, updatePrinter } from "@/api/printer";
import { Dialog, DialogContent } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const style = {
  height: "full",
  "margin-bottom": "24px",
};

export const AddPrinterModal: React.FC<{
  onClose: any;
}> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    description: "",
    condition: "",
    location: "",
  });
  const mutation = useMutation({
    mutationFn: (printerData: any) => {
      printerData["status"] = "Offline";
      console.log(printerData, "12345");
      return addPrinter(printerData);
    },
    onError: (error) => {
      alert(error);
    },
    onSuccess: () => {
      alert("Successfully add printer");
      onClose();
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.brand ||
      !formData.model ||
      !formData.location
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <PrinterModal
      title={"Add Printer"}
      onClose={onClose}
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

export const UpdatePrinterModal: React.FC<{
  onClose: any;
  initialData?: any;
}> = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const mutation = useMutation({
    mutationFn: (printerData: any) => {
      return updatePrinter(printerData);
    },
    onError: (error) => {
      alert(error);
    },
    onSuccess: () => {
      alert("Successfully updated printer");
      onClose();
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    mutation.mutate(formData);
  };

  return (
    <PrinterModal
      title={"Update Printer"}
      onClose={onClose}
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      detectChange={true}
    />
  );
};

const PrinterModal: React.FC<{
  title: any;
  onClose: any;
  handleSubmit: any;
  formData: any;
  setFormData: any;
  detectChange?: any;
  initialData?: any;
}> = ({
  title,
  onClose,
  handleSubmit,
  formData,
  setFormData,
  detectChange,
  initialData,
}) => {
  const [isChanged, setIsChanged] = useState(detectChange ? false : true);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Kiểm tra sự thay đổi giữa dữ liệu hiện tại và ban đầu
    if (detectChange)
      setIsChanged(
        JSON.stringify(updatedFormData) !== JSON.stringify(initialData)
      );
  };

  return (
    <Dialog open fullWidth maxWidth="sm" onClose={onClose} keepMounted>
      <DialogContent sx={style}>
        <div className="flex flex-col items-center gap-10 select-none h-[70vh] py-6 w-full px-4">
          <h3 className="font-bold text-2xl">{title}</h3>
          <form
            className="flex flex-col items-center gap-4 w-full px-3"
            id="form-printer"
            onSubmit={handleSubmit}
          >
            {[
              ["name", "*"],
              ["brand", "*"],
              ["model", "*"],
              ["description"],
              ["condition", "*"],
              ["location", "*"],
            ].map((field) => (
              <div className="flex flex-col flex-1 gap-1 w-full">
                <label
                  key={field[0]}
                  htmlFor={`${field[0]}`}
                  className="text-base font-bold"
                >
                  {`${field[0].charAt(0).toUpperCase() + field[0].slice(1)} `}
                  <span className="text-red-500">{field[1]}</span>
                </label>
                <input
                  required
                  type="text"
                  id={`${field[0]}`}
                  name={field[0]}
                  value={formData[field[0]] || ""}
                  onChange={handleInputChange}
                  className="form-input rounded-md bg-transparent border border-stone-500 focus:ring-[#0052B4] focus:border-[#0052B4]"
                />
              </div>
            ))}
          </form>
          <div className="flex flex-row flex-1 items-end w-full px-10 justify-between max-lg:px-0 min-h-20">
            <button
              className="px-6 py-3 bg-stone-600 text-white rounded-xl font-semibold hover:bg-gradient-to-r hover:from-stone-500 hover:via-stone-400 hover:to-stone-500 duration-300 shadow-md transform hover:scale-105 transition"
              onClick={onClose}
            >
              Return
            </button>

            {isChanged && (
              <button
                type="submit"
                form="form-printer"
                className="bg-[#0052B4] text-white px-6 py-3 rounded-xl font-semibold group relative overflow-hidden transition-all ease-in-out duration-500"
                onClick={handleSubmit}
              >
                Confirm
                <span className="absolute top-0 left-[-200%] w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40       transform skew-x-12 group-hover:left-[50%] transition-all duration-700 ease-in-out"></span>
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
