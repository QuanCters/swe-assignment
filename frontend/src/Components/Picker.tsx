export const Picker: React.FC <{
    value: string,
    icon: string,
    label: string
    onClick?: () => void;
}
> = ({ label, value, icon, onClick }) => {
    return (
      <button 
       onClick = {onClick}
       className="flex overflow-hidden justify-between self-stretch px-2.5 py-1 my-auto rounded-xl border-2 border-sky-700 border-solid min-h-[50px] w-[149px]">
          <div className="flex overflow-hidden flex-col flex-1 shrink justify-between basis-0">
            <div className="text-xs text-gray-500">{label}</div>
            <div className="text-sm font-medium text-black text-opacity-90">{value}</div>
          </div>
          <img loading="lazy" src={icon} className="object-contain shrink-0 my-auto w-6 aspect-square" />
      </button>
    );
  };
