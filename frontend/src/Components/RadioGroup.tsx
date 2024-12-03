type Option = {
  id: string;
  label: string;
};

type Props = {
  title: string;
  options: Option[];
  name: string;
  defaultChecked?: string;
  formState: any;
  setFormState: any;
};

export const RadioGroup: React.FC<Props> = ({
  title,
  options,
  name,
  formState,
  setFormState,
}) => {
  const handleOptionChange = (id: any) => {
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: id, // Cập nhật trạng thái dựa trên tên của radio group
    }));
  };
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg font-bold select-none">{title}</h4>
      <div className="flex flex-row px-6 text-sm">
        {options.map(({ id, label }) => (
          <div className="flex flex-row gap-2 flex-1 items-center" key={id}>
            <input
              type="radio"
              id={id}
              name={name}
              checked={formState[name] === id}
              onChange={() => handleOptionChange(id)}
              className="form-radio w-4 h-4 text-[#0052B4] checked:ring-[#0052B4] bg-transparent"
            />
            <label htmlFor={id} className="select-none">
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
