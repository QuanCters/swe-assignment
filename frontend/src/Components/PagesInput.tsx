type Props = {
  formState: any;
  setFormState: any;
};

export const PagesInput: React.FC<Props> = ({ formState, setFormState }) => {
  const options = [
    { id: "all", label: "All" },
    { id: "even", label: "Even pages only" },
    { id: "odd", label: "Odd pages only" },
    { id: "custom", label: "Custom" },
  ];

  const handleOptionChange = (id: string) => {
    setFormState((prevState: any) => ({
      ...prevState,
      pages: id,
    }));
  };

  const handleCustomInputChange = (e: any) => {
    setFormState((prevState: any) => ({
      ...prevState,
      customPages: e.target.value,
    }));
  };

  const regex = /^(\d+(-\d+)?(,\s*\d+(-\d+)?)*|\s*)$/;
  const isError = !regex.test(formState.customPages);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg font-bold select-none">Pages</h4>
      <div className="grid grid-cols-2 max-md:grid-cols-1 px-6 gap-y-3 text-sm">
        {options.map(({ id, label }) => (
          <div className="flex flex-row gap-2 flex-1 items-center" key={id}>
            <input
              type="radio"
              id={id}
              name="pages"
              className={`form-radio w-4 h-4  text-[#0052B4] checked:ring-[#0052B4] bg-transparent`}
              checked={formState.pages === id}
              onChange={() => handleOptionChange(id)}
            />
            <label htmlFor={id} className="select-none flex-1">
              {id === "custom" ? (
                <input
                  type="text"
                  className={`form-input self-center h-8 px-3 border  rounded-md bg-transparent w-full ${
                    isError
                      ? "border-red-500 border-2 focus:ring-red-500  focus:border-red-500 "
                      : "border-stone-500 focus:ring-[#0052B4] focus:border-[#0052B4]"
                  }`}
                  onFocus={() => document.getElementById("custom")?.click()}
                  onClick={() => document.getElementById("custom")?.click()}
                  onChange={handleCustomInputChange}
                  placeholder="e.g. 1-5, 8, 11-13"
                  value={formState.customPages || ""}
                  pattern="^(\d+(-\d+)?(,\s*\d+(-\d+)?)*|\s*)$"
                />
              ) : (
                label
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
