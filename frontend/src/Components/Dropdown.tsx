type Props = {
  title: string;
  options: string[];
  name: string;
  formState: any;
  setFormState: any;
  disabled: any;
};

export const Dropdown: React.FC<Props> = ({
  title,
  options,
  name,
  formState,
  setFormState,
  disabled,
}) => {
  const handleChange = (e: any) => {
    const { value } = e.target;
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg font-bold select-none">{title}</h4>
      <select
        className={`form-select rounded-md bg-transparent border border-stone-500 focus:ring-[#0052B4] focus:border-[#0052B4] ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value={formState[name] || ""}
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
