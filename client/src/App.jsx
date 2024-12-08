import React, { useContext, useState } from "react";
import { DatePickerContext } from "./context/DatePickerContext";
import { stateAirportData } from "../data/stateData";
import Main from "./pages/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Airline from "./pages/Airline";

function App() {
  const { startDate, endDate, setStartDate, setEndDate, state, airport, setState, setAirport } = useContext(DatePickerContext);
  
  // Flatten state data for easier processing
  
  

  

  

  console.log(startDate, endDate);

  return (
    <>
      <Router>
        <div className="w-full">
          <div className="w-full flex flex-wrap space-x-6 p-2 rounded-lg">
            {/* Start Date Picker */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-700">Start Date:</label>
              <input
                type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                min="2015-01-15"
                max="2015-03-30"
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
                min="2015-02-15"
                max="2015-03-31"
                pattern="\d{4}-\d{2}-\d{2}"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 leading-none rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>
          </div>

          

         
        </div>
        <div>
          <Routes>
            {/* Define routes */}
            <Route path="/" element={<Main />} />
            <Route path="/airline" element={<Airline />} />
            {/* <Route path="*" element={<NotFound />} /> Catch-all route */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
