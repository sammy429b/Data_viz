// import React, { useContext, useEffect, useState } from 'react'
// import { DatePickerContext } from '../context/DatePickerContext';
// import Plot from 'react-plotly.js';

// function AirlinePieChart1() {
//   const [data, setData] = useState(null); // Data should be an object with labels and values
//   const [loading, setLoading] = useState(true);
//   const { startDate, endDate, airline } = useContext(DatePickerContext);

//   useEffect(() => {
//       const fetchData = async () => {
//           try {
//               const response = await fetch(
//                   `http://127.0.0.1:8000/airline/delay-pie-airline?airline=${airline}&start_date=${startDate}&end_date=${endDate}`
//               );
//               const result = await response.json();

//               // Log the API response to check its structure
//               console.log(result);

//               setData(result); // Store the result (which includes labels and values)
//           } catch (error) {
//               console.error('Error fetching data:', error);
//               setData(null); // Handle fetch error
//           } finally {
//               setLoading(false);
//           }
//       };

//       fetchData();
//   }, [startDate, endDate, airline]); // Empty dependency array to run once when the component mounts

//   // Check if data is still loading
//   if (loading) {
//       return <div>Loading...</div>;
//   }

//   // Check if data is in the correct format
//   if (!data || !data.labels || !data.values) {
//       return <div>Error: Invalid data format</div>;
//   }

//   // Prepare data for Pie Chart
//   const { labels, values } = data;

//   return (
//       <div style={{ width: '50%', height : "60vh" }}>
//           {/* <h1>Taxi Delays Breakdown - Pie Chart</h1> */}
//           <Plot
//               data={[
//                   {
//                       values: values, // Values for pie chart
//                       labels: labels, // Labels for pie chart
//                       type: 'pie', // Pie chart type
//                       textinfo: 'label+percent', // Display label and percentage
//                       hoverinfo: 'label+percent', // Show label and percentage on hover
//                       marker: {
//                           colors: ['BLACK', 'RED', 'GREEN', 'BLUE'], // Colors for the pie slices
//                       },
//                   },
//               ]}
//               layout={{
//                   title: 'Taxi Delays Breakdown (Pie Chart)', // Chart title
//                   showlegend: true, // Show legend
//               }}
//               config={{
//                   responsive: true, // Make the plot responsive
//                   displayModeBar: true, // Show mode bar for zooming and downloading
//               }}
//           />
//       </div>
//   );
// }

// export default AirlinePieChart1


import React, { useContext, useEffect, useState } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';
import Plot from 'react-plotly.js';

function AirlinePieChart1() {
    const [data, setData] = useState(null); // Data should be an object with labels and values
    const [loading, setLoading] = useState(true);
    const { startDate, endDate, airline } = useContext(DatePickerContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/airline/delay-pie-airline?airline=${airline}&start_date=${startDate}&end_date=${endDate}`
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
    }, [startDate, endDate, airline]); // Fetch data whenever dependencies change

    // Check if data is still loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Check if data is in the correct format
    if (!data || !data.labels || !data.values) {
        return <div>Error: Invalid data format</div>;
    }

    // Prepare data for Pie Chart
    const { labels, values } = data;

    return (
        <div style={{ width: '50%', height: '50vh' }}>
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
                            style: 'bold',
                        },
                        marker: {
                            colors: [
                                '#52BE80', // Light green
                                '#AED6F1', // Light blue
                                '#5B2C6F', // Dark purple
                                '#EB7AD1', // Light pink
                            ], // Colors for the pie slices
                            line: {
                                color: 'black', // Black border around each slice
                                width: 0.5, // Border thickness
                            },
                        },
                    },
                ]}
                layout={{
                    title: {
                        text: 'Delay Breakdown Across Airports', // Chart title
                        font: {
                            size: 35, // Make the title bold and larger
                            family: 'Lora',
                            color: '#333333', // Dark gray for better contrast
                            style: 'bold',
                        },
                        x: 0.22, // Center align title
                        y: 0.92,
                    },
                    showlegend: true, // Show legend
                    legend: {
                        x: 0.8,
                        y: 0.5,
                        font: {
                            size: 15,
                            family: 'Lora',
                            color: '#333333',
                        },
                    },
                }}
                config={{
                    responsive: true, // Make the plot responsive
                    displayModeBar: true, // Show mode bar for zooming and downloading
                }}
            />
        </div>
    );
}

export default AirlinePieChart1;
