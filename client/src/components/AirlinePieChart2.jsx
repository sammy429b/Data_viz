import React, { useContext, useEffect, useState } from 'react'
import { DatePickerContext } from '../context/DatePickerContext';
import Plot from 'react-plotly.js';

function AirlinePieChart2() {
    const [data, setData] = useState(null); // Data should be an object with labels and values
    const [loading, setLoading] = useState(true);
    const { startDate, endDate, airline } = useContext(DatePickerContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/airline/delay-pie-sub-airline?airline=${airline}&start_date=${startDate}&end_date=${endDate}`
                );
                const result = await response.json();

                console.log(result); // Check the structure of API response
                setData(result); // Store the result
            } catch (error) {
                console.error('Error fetching data:', error);
                setData(null); // Handle fetch error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate, airline]); // Run only once on mount

    // Check if data is still loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Check if data is in the correct format
    if (!data || !data.labels || !data.values) {
        return <div>Error: Invalid data format</div>;
    }

    // Destructure labels and values from the API response
    const { labels, values } = data;

    return (
        <div style={{ width: '50%', height : "60vh" }}>
            {/* <h1>Taxi Delay Types - Pie Chart</h1> */}
            <Plot
                data={[
                    {
                        values: values, // Values for pie chart
                        labels: labels, // Labels for pie chart
                        type: 'pie', // Pie chart type
                        textinfo: 'label+percent', // Display label and percentage
                        hoverinfo: 'label+percent+value', // Show label, percentage, and value on hover
                        marker: {
                            colors: ['green', 'green', 'green', 'green',"green"], // Colors for pie slices
                        },
                    },
                ]}
                layout={{
                    title: 'Breakdown of Taxi Delays', // Chart title
                    showlegend: true, // Enable legend
                }}
                config={{
                    responsive: true, // Make chart responsive
                    displayModeBar: true, // Display mode bar for downloading and zooming
                }}
            />
        </div>
    );
}

export default AirlinePieChart2