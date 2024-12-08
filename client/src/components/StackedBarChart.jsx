import React, { useContext, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { DatePickerContext } from '../context/DatePickerContext';

const TaxiDataChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { startDate, endDate, selectedAirport } = useContext(DatePickerContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/charts/taxi-delays?airport=${selectedAirport}&start_date=${startDate}&end_date=${endDate}`
                );
                const result = await response.json();

                // Log the API response to check its structure
                console.log(result);

                // Check if the result is an array, otherwise access the correct field
                if (Array.isArray(result)) {
                    setData(result); // Set data if it's an array
                } else if (result.data && Array.isArray(result.data)) {
                    setData(result.data); // Access 'data' if it's nested
                } else {
                    console.error('Invalid data format', result);
                    setData([]); // Handle the error case (or show a fallback state)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]); // Handle fetch error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate, selectedAirport]); // Empty dependency array to run once when the component mounts

    // Check if data is still loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Ensure the data has been fetched before attempting to map
    const dates = data.map(item => item.Date);
    const avgTaxiIn = data.map(item => item.avg_taxi_in);
    const avgTaxiOut = data.map(item => item.avg_taxi_out);
    const avgDep = data.map(item => item.avg_dep);
    const avgArr = data.map(item => item.avg_arr);

    return (
        <div style={{ width: '100%', height: "140vh" }}>
            <h1>Taxi In and Out Data - Stacked Bar Chart</h1>

            <Plot
                data={[
                    {
                        x: dates, // Dates on the x-axis
                        y: avgTaxiIn, // Average taxi in values on the y-axis
                        width: 100,
                        type: 'bar', // Bar chart
                        name: 'Average Taxi In', // Name for the first segment
                        marker: { color: 'blue' }, // Color for Taxi In bars
                    },
                    {
                        x: dates, // Dates on the x-axis
                        y: avgTaxiOut, // Average taxi out values on the y-axis
                        type: 'bar', // Bar chart
                        name: 'Average Taxi Out', // Name for the second segment
                        marker: { color: 'red' }, // Color for Taxi Out bars
                    },
                    {
                        x: dates, // Dates on the x-axis
                        y: avgDep, // Average taxi out values on the y-axis
                        type: 'bar', // Bar chart
                        name: 'Average Taxi Out', // Name for the second segment
                        marker: { color: 'green' }, // Color for Taxi Out bars
                    },
                    {
                        x: dates, // Dates on the x-axis
                        y: avgArr, // Average taxi out values on the y-axis
                        type: 'bar', // Bar chart
                        name: 'Average Taxi Out', // Name for the second segment
                        marker: { color: 'black' }, // Color for Taxi Out bars
                    },
                ]}
                layout={{
                    title: 'Average Taxi In and Out (Stacked)', // Title of the graph
                    xaxis: {
                        title: 'Date', // Label for x-axis
                        tickangle: 45, // Rotate x-axis labels for better visibility
                    },
                    yaxis: {
                        title: 'Average Taxi Count', // Label for y-axis
                    },
                    barmode: 'stack', // Stack the bars
                    bargap: 0.4, // Adjust the gap between bars (0 to 1)
                    // bargroupgap: , // Adjust the gap between grouped bars (0 to 1)
                    showlegend: true, // Show legend for the graph
                    margin: { t: 40, b: 50 }, // Adjust margins to avoid label cutoff
                }}
                config={{
                    responsive: true, // Make the plot responsive
                    displayModeBar: true, // Show mode bar for zooming and downloading
                }}
                style={{ width: '100%', height: '100vh' }}
            />
        </div>
    );
};

export default TaxiDataChart;
