import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Picker } from "@/Components/Picker"
import { StatCard } from "@/Components/StatCard"
import { ChartConfig, ChartContainer } from "@/Components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart"
import { useState } from "react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import calendar from "@/assets/calendar.svg"

const chartConfig = {
  usage: {
    label: "Requests",
    color: "#2563eb",
  }
} satisfies ChartConfig


//Sample dataset for view
const chartData = Array.from({ length: 25 }, (_, index) => ({
  day: (index + 1).toString(),
  usage: Math.floor(Math.random() * 50) + 1, // Random usage between 1 and 50
}));

const statCardData = [
  { title: "Total pages purchased", value: 2345 },
  { title: "Total pages used", value: 6969 },
  { title: "Printers available", value: 32 },
  { title: "Printers added", value: 16 },
  { title: "Total print requests", value: 6969 },
  { title: "Top 3 periods with the most requests", value: ["9-10am", "11-12am", "3-4pm"] }
];

// const handleClick = () => {
//   alert('hi')
// }

const ManageReportPage = () => {
  const [year, setYear] = useState("select");
  const [month, setMonth] = useState("select");

  return (
    <main className="flex overflow-hidden flex-col flex-1 justify-center px-16 py-8 w-full max-md:px-5 max-md:max-w-full">
      <section className="flex flex-col pt-5 pr-7 pb-20 pl-8 w-full bg-blue-50 rounded-md shadow-md min-h-[868px] max-md:px-5 max-md:max-w-full">
        <header className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
          {month != "select" && year != "select" ? 
            (<h1 className="self-stretch my-auto text-3xl font-bold text-sky-500 max-md:max-w-full">
            View reports for {month} {year}
            </h1>) 
          : (<h1 className="self-stretch my-auto text-3xl font-bold text-sky-500 max-md:max-w-full">
            Select month and year to view reports
            </h1>)     
          }
          
          <div className="flex gap-9 justify-between items-center self-stretch px-4 my-auto leading-6 whitespace-nowrap min-w-[240px] w-[363px]">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Picker label="year" value={year} icon={calendar} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-35">
                <DropdownMenuRadioGroup value={year} onValueChange={setYear}>
                  <DropdownMenuRadioItem value="select">Select</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2024">2024</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2023">2023</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2022">2022</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>


            <DropdownMenu>
              <DropdownMenuTrigger>
                <Picker label="month" value={month} icon={calendar}/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-35">
                <DropdownMenuRadioGroup value={month} onValueChange={setMonth}>
                  <DropdownMenuRadioItem value="select">Select</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="January">January</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="February">February</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="March">March</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="April">April</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="May">May</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="June">June</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="July">July</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="August">August</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="September">September</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="October">October</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="November">November</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="December">December</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        

        {month != "select" && year != "select"? 
         (<div>
        <section className="grid grid-cols-3 grid-flow-col gap-10 justify-between items-center mt-4 w-full min-h-[561px] max-md:max-w-full">
          <article className="col-span-2 justify-center items-center gap-2
         self-stretch my-auto max-md:max-w-full">
            <h2 className="text-3xl font-bold leading-none text-black">Print requests per day</h2>
            <div className="flex flex-col mt-16 w-full max-w-[1200px] max-md:mt-10 max-md:max-w-full">
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    //* Chia don vi theo cot doc
                    tickFormatter={(value) => value.slice(0, 6)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="usage" fill="var(--color-usage)" radius={6} />
                </BarChart>
              </ChartContainer>
            </div>
          </article>

          <div className="col-span-1 justify-center gap-4 items-stretch p-4 max-w-full min-h-[122px] w-[1262px]">
            {statCardData.slice(4, 6).map((card, index) => (
              <StatCard type="col" className="gap-2 items-stretch" key={index} title={card.title} value={card.value} />
            ))}
          </div>
        </section>


        <section className="flex flex-wrap gap-4 items-start mt-4 max-w-full min-h-[122px] w-[1262px]">
          {statCardData.slice(0, 4).map((card, index) => (
            <StatCard type="col" key={index} title={card.title} value={card.value} />
          ))}
        </section>
        
         </div>)
      : null
      }
      </section>
    </main>
  )
}
export default ManageReportPage