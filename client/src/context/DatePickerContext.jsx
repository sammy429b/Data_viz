import React, { createContext, useState } from 'react';

// Create the context
export const DatePickerContext = createContext();

// Provider component
export const DatePickerProvider = ({ children }) => {
    const [startDate, setStartDate] = useState("2015-01-01");
    const [endDate, setEndDate] = useState("2015-12-31");
    const [selectedAirport, setSelectedAirport] = useState("");
    const [airport, setAirport] = useState("");
    const [state, setState] = useState("");
    const [airline, setAirline] = useState("");

    return (
        <DatePickerContext.Provider value={{ startDate, endDate,airport, state, setStartDate, setEndDate, setAirport, setState, selectedAirport, setSelectedAirport,airline, setAirline}}>
            {children}
        </DatePickerContext.Provider>
    );
};
