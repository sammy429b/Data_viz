import React, { useContext, useState } from "react";
import { DatePickerContext } from "./context/DatePickerContext";
import { stateAirportData } from "../data/stateData";
import Main from "./pages/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Airline from "./pages/Airline";

function App() {
  const { startDate, endDate, setStartDate, setEndDate, state, airport, setState, setAirport } = useContext(DatePickerContext);

  return (
    <>
      <Router>
        <div className="w-full ">
          
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
