// import React, { useContext, useEffect, useState } from 'react'
// import { DatePickerContext } from '../context/DatePickerContext';
// import Plot from 'react-plotly.js';

// function AirlinePieChart2() {
//     const [data, setData] = useState(null); // Data should be an object with labels and values
//     const [loading, setLoading] = useState(true);
//     const { startDate, endDate, airline } = useContext(DatePickerContext);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(
//                     `http://127.0.0.1:8000/airline/delay-pie-sub-airline?airline=${airline}&start_date=${startDate}&end_date=${endDate}`
//                 );
//                 const result = await response.json();

//                 console.log(result); // Check the structure of API response
//                 setData(result); // Store the result
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setData(null); // Handle fetch error
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [startDate, endDate, airline]); // Run only once on mount

//     // Check if data is still loading
//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     // Check if data is in the correct format
//     if (!data || !data.labels || !data.values) {
//         return <div>Error: Invalid data format</div>;
//     }

//     // Destructure labels and values from the API response
//     const { labels, values } = data;

//     return (
//         <div style={{ width: '50%', height : "60vh" }}>
//             {/* <h1>Taxi Delay Types - Pie Chart</h1> */}
//             <Plot
//                 data={[
//                     {
//                         values: values, // Values for pie chart
//                         labels: labels, // Labels for pie chart
//                         type: 'pie', // Pie chart type
//                         textinfo: 'label+percent', // Display label and percentage
//                         hoverinfo: 'label+percent+value', // Show label, percentage, and value on hover
//                         marker: {
//                             colors: ['#41AE76', '66C2A4', '2CA25F', '#99D8C9', "006D2C"], // Colors for pie slices
//                         },
//                     },
//                 ]}
//                 layout={{
//                     title: 'Breakdown of Taxi Delays', // Chart title
//                     showlegend: true, // Enable legend
//                 }}
//                 config={{
//                     responsive: true, // Make chart responsive
//                     displayModeBar: true, // Display mode bar for downloading and zooming
//                 }}
//             />
//         </div>
//     );
// }

// export default AirlinePieChart2


import React, { useContext, useEffect, useState } from 'react';
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
        <div style={{ width: '50%', height: '45vh' }}>
            <Plot
                data={[
                    {
                        values: values, // Values for pie chart
                        labels: labels, // Labels for pie chart
                        type: 'pie', // Pie chart type
                        textinfo: 'label+percent', // Display label and percentage
                        hoverinfo: 'label+percent+value', // Show label, percentage, and value on hover
                        textfont: {
                            size: 14, // Text size for the labels outside the pie
                        },
                        insidetextfont: {
                            size: 14, 
                            family: 'Lora',
                            style: "bold",
                        },
                        marker: {
                            colors: [
                                '#9B59B6', // Light Purple
                                'Black', // Purple
                                '#CC86E2', // Dark Purple
                                '#9D16C8', // Very Dark Purple
                                '#6A1F9C', // Deep Purple
                            ], // Shades of purple for the pie slices
                            line: {
                                color: 'black', // White border around each slice
                                width: 0.5, // Border thickness
                            },
                        },
                    },
                ]}
                layout={{
                    title: {
                        text: 'Arrival Delay Breakdown', // Chart title
                        font: {
                            size: 35, // Title size
                            family: 'Lora',
                            color: '#333333', // Dark gray for better contrast
                            style: "bold",
                        },
                        x: 0.28, // Center align title
                        y: 0.92,
                    },
                    showlegend: true, // Enable legend
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
                    responsive: true, // Make chart responsive
                    displayModeBar: true, // Display mode bar for downloading and zooming
                }}
            />
        </div>
    );
}

export default AirlinePieChart2;
