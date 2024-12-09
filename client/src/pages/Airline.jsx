import React, { useContext } from 'react'
import AirlineStackedChart from '../components/AirlineStackedChart'
import AirlinePieChart1 from '../components/AirlinePieChart1'
import AirlinePieChart2 from '../components/AirlinePieChart2'
import { DatePickerContext } from '../context/DatePickerContext'
import { airlines } from '../../data/airlineData'
import AirlineBarChart from '../components/AirlineBarChart'

function Airline() {
  const {airline, setAirline,  startDate, endDate, setEndDate, setStartDate} = useContext(DatePickerContext)
    const handleAirlineChange = (event) => {
        const selectedAirline= event.target.value;
        setAirline(selectedAirline);
      };
  return (
    <>
        <div className="flex flex-col justify-center items-center space-y-2">
        <div className="w-full flex justify-center items-center flex-wrap space-x-6 p-2 rounded-lg">
            {/* Start Date Picker */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">Start Date:</label>
              <input
                type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                min="2015-01-01"
                max="2015-12-30"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 leading-none rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>

            {/* End Date Picker */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">End Date:</label>
              <input
                type="date"
                min="2015-01-02"
                max="2015-12-31"
                pattern="\d{4}-\d{2}-\d{2}"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 leading-none rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>
          </div>
              <label className=" w-52 block text-gray-700 font-medium mb-2" htmlFor="state-select">
                Select a Airline:
              </label>
              <select
                id="state-select"
                className="block w-52 border border-gray-300 rounded p-2"
                value={airline}
                onChange={handleAirlineChange}
              >
                <option value="" disabled>
                  Choose a airline
                </option>
                {airlines.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            
        <AirlineStackedChart/>
        <div className="w-full flex justify-center items-center">
            <AirlinePieChart1 />
            <AirlinePieChart2 />
        </div>

        <AirlineBarChart/>
    </>
  )
}

export default Airline