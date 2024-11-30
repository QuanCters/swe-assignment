import { Link, useChildMatches } from "@tanstack/react-router";

type Props = {
  page: string;
  route?: string;
};
function toKebabCase(str: string) {
  return str
    .toLowerCase() // Đưa toàn bộ chữ về dạng chữ thường
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu "-"
    .trim(); // Loại bỏ khoảng trắng thừa ở đầu và cuối (nếu có)
}

export const Tab = ({ page, route = "" }: Props): JSX.Element => {
  const routePath = `/${toKebabCase(page)}`;
  const isActive = useChildMatches({
    select: (matches) =>
      matches.some((match) => {
        const targetRoute = route === "" ? routePath : route;
        return (
          match.routeId.startsWith(targetRoute) ||
          match.routeId.includes(targetRoute)
        );
      }),
  });
  console.log(isActive, "isActive");
  return (
    <Link
      to={`/${toKebabCase(page)}`}
      className="tab items-center inline-flex justify-center relative h-full"
    >
      <div
        className={`div flex-col inline-flex relative h-full items-center  ${isActive === null || isActive === false ? "justify-center" : "justify-between"}`}
      >
        <div
          className={`self-stretch relative bg-transparent h-[3px] ${isActive === null || isActive === false ? "hidden" : ""}`}
        ></div>
        <div className={`text inline-flex relative `}>
          <div className="home font-bold font-['Roboto'] px-5 py-[10px] text-center transition ease-in delay-100 hover:bg-black/10 rounded-xl">
            {page}
          </div>
        </div>
        {isActive && (
          <div className="self-stretch relative bg-[#2196F3] h-[3px] rounded-full"></div>
        )}
        {/* <img className="img" alt="Line" src={line1} /> */}
      </div>
    </Link>
  );
};

export default Tab;
