import React, { useContext } from 'react'
import AirlineStackedChart from '../components/AirlineStackedChart'
import AirlinePieChart1 from '../components/AirlinePieChart1'
import AirlinePieChart2 from '../components/AirlinePieChart2'
import { DatePickerContext } from '../context/DatePickerContext'
import { airlines } from '../../data/airlineData'

function Airline() {
  const {airline, setAirline} = useContext(DatePickerContext)
    const handleAirlineChange = (event) => {
        const selectedAirline= event.target.value;
        setAirline(selectedAirline);
      };
  return (
    <>
        <div className="flex flex-col space-y-2">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="state-select">
                Select a State:
              </label>
              <select
                id="state-select"
                className="block w-24 border border-gray-300 rounded p-2"
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
    </>
  )
}

export default Airline