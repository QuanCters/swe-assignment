export const StatCard: React.FC<{
    title: string;
    value: string | number | string[];
    className?: string;
    type: string;
}> = ({ title, value, className = '', type = "col" }) => (
    <section className={`flex flex-${type} px-4 pt-2.5 pb-10 bg-blue-200 bg-opacity-50 min-h-[122px] ${className}`}>
      <h3 className="text-2xl leading-none text-black">{title}</h3>
      {Array.isArray(value) ? (
        <ul className="mt-4 text-3xl font-medium leading-none text-black">
          {value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-4xl font-medium leading-none text-black">{value}</p>
      )}
    </section>
  );