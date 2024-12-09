import React, { useContext, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { DatePickerContext } from '../context/DatePickerContext';
import Loader from './Loader';

const PieChart1 = () => {
    const [data, setData] = useState(null); // Data should be an object with labels and values
    const [loading, setLoading] = useState(false);
    const { startDate, endDate, selectedAirport } = useContext(DatePickerContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/charts/delay-pie?airport=${selectedAirport}&start_date=${startDate}&end_date=${endDate}`
                );
                const result = await response.json();

                // Log the API response to check its structure
                console.log(result);

                setData(result); // Store the result (which includes labels and values)
            } catch (error) {
                console.error('Error fetching data:', error);
                setData(null); // Handle fetch error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate, selectedAirport]); // Fetch data whenever dependencies change

    // Check if data is still loading
    if (loading) {
        return <Loader/>;
    }

    // Check if data is in the correct format
    if (!data || !data.labels || !data.values) {
        return <div>Error: Invalid data format</div>;
    }

    // Prepare data for Pie Chart
    const { labels, values } = data;

    return (
        <div style={{ width: '50%', height: '48vh' }}>
            <Plot
                data={[
                    {
                        values: values, // Values for pie chart
                        labels: labels, // Labels for pie chart
                        type: 'pie', // Pie chart type
                        textinfo: 'label+percent', // Display label and percentage
                        hoverinfo: 'label+percent', // Show label and percentage on hover
                        textfont: {
                            size: 14, // Increase the size of text outside the pie
                        },
                        insidetextfont: {
                            size: 14, 
                            family: 'Lora',
                            style: "bold",
                            // tickangle: 50,
                        },
                        marker: {
                            colors: [
                                '#52BE80', // TAXI-IN --> Light GREEN
                                '#AED6F1', // TAXI-OUT --> Light blue
                                '#5B2C6F', // ARRIVAL_DELAY --> Dark Purple
                                '#EB7AD1', // Departure delay --> Light pink
                            ], // Colors for the pie slices
                            line: {
                                color: 'black', // White border around each slice
                                width: 0.5, // Border thickness
                            },
                        },
                    },
                ]}
                layout={{
                    title: {
                        text: 'Total Delay Breakdown', // Chart title
                        font: {
                            size: 35, // Make the title bold and larger
                            family: 'Lora',
                            color: '#333333', // Dark gray for better contrast
                            style: "bold",
                        },
                        x: 0.28, // Center align title
                        y: 0.92,
                    },
                    showlegend: true, // Show legend
                    legend: {
                        x: 0.8,
                        y: 0.5,
                        size: 45,
                        font: {
                            size: 15,
                            family: 'Lora',
                            color: '#333333'

                        }
                    }
                    
                }}
                config={{
                    responsive: true, // Make the plot responsive
                    displayModeBar: true, // Show mode bar for zooming and downloading
                }}
            />
        </div>
    );
};

export default PieChart1;
