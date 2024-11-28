import { useState } from "react";

type MarginInputsProps = {
  onMarginsChange: (newMargins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  }) => void;
};

const MarginInputs: React.FC<MarginInputsProps> = ({ onMarginsChange }) => {
  const [tempMargins, setTempMargins] = useState({
    top: "0.35",
    bottom: "0.35",
    left: "0.35",
    right: "0.35",
  });

  const handleMarginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTempMargins((prev) => ({
      ...prev,
      [name]: value,
    }));

    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      const newMargins = {
        ...tempMargins,
        [name]: Math.max(
          0,
          Math.min(
            72 * (name === "top" || name === "bottom" ? 11 : 8.5),
            parsedValue * 72
          )
        ),
      };
      onMarginsChange(newMargins as any);
    }
  };

  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 flex-1 gap-x-10 gap-y-2">
      {["top", "bottom", "left", "right"].map((margin, index) => (
        <div className="flex flex-col flex-1 gap-1">
          <label
            key={margin}
            htmlFor={`margin-${margin}`}
            className="text-base font-bold"
          >
            {`${margin.charAt(0).toUpperCase() + margin.slice(1)}`}
          </label>
          <input
            type="number"
            id={`margin-${margin}`}
            name={margin}
            value={tempMargins[margin as keyof typeof tempMargins]}
            className="rounded-md bg-transparent border border-stone-500 focus:ring-[#0052B4] focus:border-[#0052B4]"
            onChange={handleMarginChange}
            step={0.01}
            min={0}
            max={margin === "top" || margin === "bottom" ? 11 : 8.5}
          />
        </div>
      ))}
    </div>
  );
};

export default MarginInputs;
