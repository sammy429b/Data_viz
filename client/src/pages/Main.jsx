import React, { useContext } from 'react'
import TaxiDataChart from '../components/StackedBarChart'
import PieChart2 from '../components/PieChart2'
import PieChart1 from '../components/PieChart1'
import { DatePickerContext } from '../context/DatePickerContext'
import { stateAirportData } from '../../data/stateData'

function Main() {
  const states = stateAirportData.map((stateObj) => Object.keys(stateObj)[0]);
  const airportByState = Object.assign({}, ...stateAirportData);
  const { airport, state, setState, setAirport, selectedAirport, setSelectedAirport, startDate, endDate, setEndDate, setStartDate } = useContext(DatePickerContext)
  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    setAirport(airportByState[selectedState] || []); // Set airports based on selected state
  };
  const handleAirportChange = (event) => {
    setSelectedAirport(event.target.value);
  };
  return (
    <>
      <div className="w-full flex flex-wrap space-x-6 p-2 rounded-lg">
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
              className="px-6 py-2 leading-none rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
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
              className="px-6 py-2 leading-none rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center flex-wrap space-x-6 p-2 rounded-lg">
          {/* State Selection */}
          <div className="flex flex-col space-y-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="state-select">
              Select a State:
            </label>
            <select
              id="state-select"
              className="block w-full border border-gray-300 rounded py-2 px-6"
              value={state}
              onChange={handleStateChange}
            >
              <option value="" disabled>
                Choose a state
              </option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Airport Dropdown */}
          <div className="flex flex-col space-y-2">
            {state && airport.length > 0 && (
              <>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="airport-select">
                  Select an Airport:
                </label>
                <select
                  id="airport-select"
                  className="block w-full border border-gray-300 rounded py-2 px-4"
                  value={selectedAirport}
                  onChange={handleAirportChange}
                >
                  <option value="" disabled>
                    Choose an airport
                  </option>
                  {airport.map((airportItem) => (
                    <option key={airportItem} value={airportItem}>
                      {airportItem}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>
      </div>
      <TaxiDataChart />
      <div className="w-full flex justify-center items-center">
        <PieChart1 />
        <PieChart2 />
      </div>
    </>
  )
}

export default Main