// import React, { useContext, useEffect, useState } from 'react'
// import { DatePickerContext } from '../context/DatePickerContext';
// import Plot from 'react-plotly.js';

// function AirlineStackedChart() {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { startDate, endDate,airline } = useContext(DatePickerContext);


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(
//                     `http://127.0.0.1:8000/airline/taxi-delays-airline?airline=${airline}&start_date=${startDate}&end_date=${endDate}`
//                 );
//                 const result = await response.json();

//                 // Log the API response to check its structure
//                 console.log(result);

//                 // Check if the result is an array, otherwise access the correct field
//                 if (Array.isArray(result)) {
//                     setData(result); // Set data if it's an array
//                 } else if (result.data && Array.isArray(result.data)) {
//                     setData(result.data); // Access 'data' if it's nested
//                 } else {
//                     console.error('Invalid data format', result);
//                     setData([]); // Handle the error case (or show a fallback state)
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setData([]); // Handle fetch error
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [startDate, endDate, airline]); // Empty dependency array to run once when the component mounts

//     // Check if data is still loading
//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     // Ensure the data has been fetched before attempting to map
//     const dates = data.map(item => item.Date);
//     const avgTaxiIn = data.map(item => item.avg_taxi_in);
//     const avgTaxiOut = data.map(item => item.avg_taxi_out);
//     const avgDep = data.map(item => item.avg_dep);
//     const avgArr = data.map(item => item.avg_arr);

//     return (
//         <div style={{ width: '100%', height: "100%" }}>
//             <h1>Taxi In and Out Data - Stacked Bar Chart</h1>

//             <Plot
//                 data={[
//                     {
//                         x: dates,
//                         y: avgTaxiOut,
//                         type: 'bar',
//                         name: 'Average Taxi Out',
//                         marker: { color: 'RED' }, // Tomato color for better readability
//                     },
//                     {
//                         x: dates,
//                         y: avgDep,
//                         type: 'bar',
//                         name: 'Average Departure',
//                         marker: { color: 'BLUE' }, // Lime Green
//                     },
//                     {
//                         x: dates,
//                         y: avgArr,
//                         type: 'bar',
//                         name: 'Average Arrival',
//                         marker: { color: 'GREEN' }, // Steel Blue
//                     },
//                     {
//                         x: dates,
//                         y: avgTaxiIn,
//                         type: 'bar',
//                         name: 'Average Taxi In',
//                         marker: { color: 'BLACK' }, // Gold
//                     },
//                 ]}
//                 layout={{
//                     title: 'Average Taxi In and Out (Stacked)',
//                     xaxis: {
//                         title: 'Date',
//                         tickangle: 45,
//                     },
//                     yaxis: {
//                         title: 'Average Taxi Count',
//                     },
//                     barmode: 'stack',
//                     bargap: 0.3,
//                     showlegend: true,
//                     margin: { t: 50, b: 50 },
//                 }}
//                 config={{
//                     responsive: true,
//                 }}
//                 style={{ width: '100%', height: '600px' }}
//             />
//         </div>
//     );
// }

// export default AirlineStackedChart


import React, { useContext, useEffect, useState } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';
import Plot from 'react-plotly.js';

function AirlineStackedChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { startDate, endDate, airline } = useContext(DatePickerContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/airline/taxi-delays-airline?airline=${airline}&start_date=${startDate}&end_date=${endDate}`
                );
                const result = await response.json();
                if (Array.isArray(result)) {
                    setData(result);
                } else if (result.data && Array.isArray(result.data)) {
                    setData(result.data);
                } else {
                    console.error('Invalid data format', result);
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate, airline]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const dates = data.map(item => item.Date);
    const avgTaxiIn = data.map(item => item.avg_taxi_in);
    const avgTaxiOut = data.map(item => item.avg_taxi_out);
    const avgDep = data.map(item => item.avg_dep);
    const avgArr = data.map(item => item.avg_arr);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Plot
                data={[
                    {
                        x: dates,
                        y: avgTaxiOut,
                        type: 'bar',
                        name: 'Average Taxi Out Delay',
                        marker: { color: '#AED6F1' },
                        hovertemplate: 'Average Taxi Out Delay: %{y}<extra></extra>',
                    },
                    {
                        x: dates,
                        y: avgDep,
                        type: 'bar',
                        name: 'Average Departure Delay',
                        marker: { color: '#EB7AD1' },
                        hovertemplate: 'Average Departure Delay: %{y}<extra></extra>',
                    },
                    {
                        x: dates,
                        y: avgArr,
                        type: 'bar',
                        name: 'Average Arrival Delay',
                        marker: { color: '#5B2C6F' },
                        hovertemplate: 'Average Arrival Delay: %{y}<extra></extra>',
                    },
                    {
                        x: dates,
                        y: avgTaxiIn,
                        type: 'bar',
                        name: 'Average Taxi In Delay',
                        marker: { color: '#52BE80' },
                        hovertemplate: 'Average Taxi In Delay: %{y}<extra></extra>',
                    },
                ]}
                layout={{
                    title: {
                        text: 'Daily Average of Delays across Airports',
                        font: {
                            family: 'Lora',
                            size: 45,
                            color: '#333333',
                        },
                        x: 0.5,
                    },
                    xaxis: {
                        title: {
                            text: 'Date',
                            font: {
                                family: 'Lora',
                                size: 20,
                            },
                            standoff: 18,
                        },
                        tickangle: 0,
                        tickfont: {
                            family: 'Lora',
                            size: 14,
                        },
                    },
                    yaxis: {
                        title: {
                            text: 'Delay in Minutes',
                            font: {
                                family: 'Lora',
                                size: 20,
                            },
                            standoff: 18,
                        },
                        tickfont: {
                            family: 'Lora',
                            size: 14,
                        },
                    },
                    barmode: 'stack',
                    bargap: 0.3,
                    showlegend: true,
                    legend: {
                        x: 0.95,
                        y: 1,
                        font: {
                            family: 'Lora',
                            size: 15,
                        },
                    },
                    margin: { t: 110, b: 70 },
                }}
                config={{
                    responsive: true,
                }}
                style={{ width: '100%', height: '600px' }}
            />
        </div>
    );
}

export default AirlineStackedChart;
