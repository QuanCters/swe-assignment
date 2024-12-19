import { useState, useEffect } from 'react'
import { Select, SelectChangeEvent } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import { BarChart } from '@mui/x-charts'

export const Route = createFileRoute("/_private/_spso/report")({
  component: ManageReportPage
});


function ManageReportPage() {
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [dayLimit, setDayLimit] = useState(31);
  const [printRequestData, setPrintRequestData] = useState<any>([]);

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value)
  }
  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value)
  }
  //logic to change number of days
  const handleDayLimit = () => {
    const daysInMonth = getDaysInMonth(year, month);
    setDayLimit(daysInMonth);
  };
  const getDaysInMonth = (year: string, month: string): number => {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    return new Date(parseInt(year), monthIndex + 1, 0).getDate();
  };
  useEffect(() => {
    handleDayLimit();
  }, [year, month]); 
  
  useEffect(() => {
    generatePrintRequestData();
  }, [dayLimit]);

  //mapping for buttons
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const years = [2024, 2023, 2022]

  const StatCard: React.FC<{
    title: string
    value: string | number | string[]
    className?: string
    type: string
  }> = ({ title, value, className = '', type = 'col' }) => (
    <section
      className={`flex flex-${type} px-4 pt-2.5 pb-10 bg-blue-200 bg-opacity-50 w-[200px] h-auto ${className}`}
    >
      <h3 className="text-base leading-none text-black">{title}</h3>
      {Array.isArray(value) ? (
        <ul className="mt-4 text-xl font-medium leading-none text-black">
          {value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-xl font-medium leading-none text-black">
          {value}
        </p>
      )}
    </section>
  )

  //Fake hardcoded data
  const generatePrintRequestData = () => {
    const data: any = Array.from({ length: dayLimit }, (_, index) => ({
      day: `Day ${index + 1}`,
      request: Math.floor(Math.random() * 100) + 1, // Random number between 1 and 100
    }));
    setPrintRequestData(data);
  };

  const totalPrintRequest = printRequestData.reduce((total: any, item: any) => total + item.request, 0);

  const statCardData = [
    { title: 'Total pages purchased', value: Math.floor(Math.random() * 10000) + 1000 },
    { title: 'Total pages used', value: Math.floor(Math.random() * 10000) + 1000 },
    { title: 'Total print requests', value: totalPrintRequest },
    {
      title: 'Top 3 periods with the most requests',
      value: ['9-10am', '11-12am', '3-4pm'],
    },
  ]

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <main className="flex overflow-hidden flex-col flex-1 justify-center px-16 py-8 w-full max-md:px-5 max-md:max-w-full">
      <section className="flex flex-col pt-5 pr-7 pb-20 pl-8 w-full bg-blue-50 rounded-md shadow-md min-h-[868px] max-md:px-5 max-md:max-w-full">
        <header className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
          {month != '' && year != '' ? (
            <h1 className="self-stretch my-auto text-3xl font-bold text-sky-500 max-md:max-w-full">
              View reports for {capitalizeFirstLetter(month)} {year}
            </h1>
          ) : (
            <h1 className="self-stretch my-auto text-2xl font-bold text-sky-500 max-md:max-w-full">
              Select date to view reports
            </h1>
          )}

          <div className="flex gap-9 justify-between items-center self-stretch px-4 my-auto leading-6 whitespace-nowrap min-w-[240px] w-[363px]">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select value={year} label="Year" onChange={handleChangeYear}>
                  {years.map((year, index) => (
                    <MenuItem key={index} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  value={month}
                  label="Month"
                  onChange={handleChangeMonth}
                >
                  {months.map((month, index) => (
                    <MenuItem key={index} value={month.toLowerCase()}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </header>

        {month != '' && year != '' && (
          <div>
            <section className="grid grid-cols-5 grid-flow-col gap-10 justify-between items-center mt-4 w-full min-h-[561px] max-md:max-w-full">
              <article
                className="col-span-4 justify-center items-center gap-2
         self-stretch my-auto max-md:max-w-full"
              >
                <h2 className="text-2xl px-[360px] font-bold leading-none text-black">
                  Print requests per day
                </h2>
                <div className="flex flex-col mt-16 w-full max-w-[1200px] max-md:mt-10 max-md:max-w-full">
                  <BarChart
                    dataset={printRequestData}
                    xAxis={[{ scaleType: 'band', dataKey: 'day'}]}
                    series={[{ dataKey: 'request', label: 'Print requests', color: '#3498db' }]}
                    slotProps={{ legend: { hidden: true } }}
                    height={500}
                  />
                </div>
              </article>

              
            <section className="col-span-1 flex flex-wrap flex-col gap-4 items-start mt-4 max-w-full min-h-[122px] w-[1262px]">
              {statCardData.slice(0, 4).map((card, index) => (
                <StatCard
                  type="col"
                  key={index}
                  title={card.title}
                  value={card.value}
                />
              ))}
            </section>

            </section>
          </div>
        )}
      </section>
    </main>
  )
}