// // import React, { useContext, useEffect, useState } from 'react';
// // import Plot from 'react-plotly.js';
// // import { DatePickerContext } from '../context/DatePickerContext';

// // const TaxiDataChart = () => {
// //     const [data, setData] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const { startDate, endDate, selectedAirport } = useContext(DatePickerContext);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 setLoading(true);
// //                 setError(null);
// //                 const response = await fetch(
// //                     `http://127.0.0.1:8000/charts/taxi-delays?airport=${selectedAirport}&start_date=${startDate}&end_date=${endDate}`
// //                 );
// //                 if (!response.ok) {
// //                     throw new Error(`HTTP error! Status: ${response.status}`);
// //                 }
// //                 const result = await response.json();
// //                 setData(Array.isArray(result) ? result : result.data || []);
// //             } catch (error) {
// //                 console.error('Error fetching data:', error);
// //                 setError('Failed to load data');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchData();
// //     }, [startDate, endDate, selectedAirport]);

// //     if (loading) {
// //         return <div>Loading...</div>;
// //     }

// //     if (error) {
// //         return <div>{error}</div>;
// //     }

// //     if (!data.length) {
// //         return <div>No data available for the selected parameters.</div>;
// //     }

// //     const dates = data.map(item => item.Date);
// //     const avgTaxiIn = data.map(item => item.avg_taxi_in);
// //     const avgTaxiOut = data.map(item => item.avg_taxi_out);
// //     const avgDep = data.map(item => item.avg_dep);
// //     const avgArr = data.map(item => item.avg_arr);

// //     return (
// //         <div style={{ width: '100%', height: '100%' }}>
// //             {/* <h1>Delay Types across Time - Daily Average </h1> */}
// //             <Plot
// //                 data={[
// //                     {
// //                         x: dates,
// //                         y: avgTaxiOut,
// //                         type: 'bar',
// //                         name: 'Average Taxi Out',
// //                         marker: { color: 'RED' }, // Tomato color for better readability
// //                     },
// //                     {
// //                         x: dates,
// //                         y: avgDep,
// //                         type: 'bar',
// //                         name: 'Average Departure',
// //                         marker: { color: 'BLUE' }, // Lime Green
// //                     },
// //                     {
// //                         x: dates,
// //                         y: avgArr,
// //                         type: 'bar',
// //                         name: 'Average Arrival',
// //                         marker: { color: 'GREEN' }, // Steel Blue
// //                     },
// //                     {
// //                         x: dates,
// //                         y: avgTaxiIn,
// //                         type: 'bar',
// //                         name: 'Average Taxi In',
// //                         marker: { color: 'BLACK' }, // Gold
// //                     },
// //                 ]}
// //                 layout={{
// //                     title: 'Delay Types across Time - Daily Average',

// //                     xaxis: {
// //                         title: 'Date',
// //                         tickangle: 45,
// //                     },
// //                     yaxis: {
// //                         title: 'Average Taxi Count',
// //                     },
// //                     barmode: 'stack',
// //                     bargap: 0.3,
// //                     showlegend: true,
// //                     margin: { t: 50, b: 50 },
// //                 }}
// //                 config={{
// //                     responsive: true,
                    
// //                 }}
// //                 style={{ width: '100%', height: '600px' }}
// //             />
// //         </div>
// //     );
// // };

// // export default TaxiDataChart;

// import React, { useContext, useEffect, useState } from 'react';
// import Plot from 'react-plotly.js';
// import { DatePickerContext } from '../context/DatePickerContext';

// const TaxiDataChart = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { startDate, endDate, selectedAirport } = useContext(DatePickerContext);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const response = await fetch(
//                     `http://127.0.0.1:8000/charts/taxi-delays?airport=${selectedAirport}&start_date=${startDate}&end_date=${endDate}`
//                 );
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const result = await response.json();
//                 setData(Array.isArray(result) ? result : result.data || []);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setError('Failed to load data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [startDate, endDate, selectedAirport]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     if (!data.length) {
//         return <div>No data available for the selected parameters.</div>;
//     }

//     const dates = data.map(item => item.Date);
//     const avgTaxiIn = data.map(item => item.avg_taxi_in);
//     const avgTaxiOut = data.map(item => item.avg_taxi_out);
//     const avgDep = data.map(item => item.avg_dep);
//     const avgArr = data.map(item => item.avg_arr);

//     return (
//         <div style={{ width: '100%', height: '100%' }}>
//             <Plot
//                 data={[
//                     {
//                         x: dates,
//                         y: avgTaxiOut,
//                         type: 'bar',
//                         name: 'Average Taxi Out',
//                         marker: { color: '#AED6F1' }, // Light Blue
//                     },
//                     {
//                         x: dates,
//                         y: avgDep,
//                         type: 'bar',
//                         name: 'Average Departure',
//                         marker: { color: '#EB7AD1' }, // Light Pink
//                     },
//                     {
//                         x: dates,
//                         y: avgArr,
//                         type: 'bar',
//                         name: 'Average Arrival',
//                         marker: { color: '#5B2C6F' }, // Dark Purple
//                     },
//                     {
//                         x: dates,
//                         y: avgTaxiIn,
//                         type: 'bar',
//                         name: 'Average Taxi In',
//                         marker: { color: '#52BE80' }, // Light Green
//                     },
//                 ]}
//                 layout={{
//                     title: {
//                         text: 'Delay Types across Time - Daily Average',
//                         font: {
//                             family: 'Lora',
//                             size: 45,
//                             color: '#333333',
//                         },
//                         x: 0.5,
//                         y: 0.95,
//                     },
//                     xaxis: {
//                         title: {
//                             text: 'Date',
//                             font: {
//                                 family: 'Lora',
//                                 size: 20,
//                             },
//                             standoff: 18, // Push x-axis label away
//                         },
//                         tickangle: 0, // Horizontal ticks
//                         tickfont: {
//                             family: 'Lora',
//                             size: 14,
//                         },
//                     },
//                     yaxis: {
//                         title: {
//                             text: 'Delay in Minutes',
//                             font: {
//                                 family: 'Lora',
//                                 size: 20,
//                             },
//                             standoff: 18, // Push y-axis label away
//                         },
//                         tickfont: {
//                             family: 'Lora',
//                             size: 14,
//                         },
//                     },
//                     barmode: 'stack',
//                     bargap: 0.3,
//                     showlegend: true,
//                     legend: {
//                         x: 0.95,
//                         y: 1,
//                         font: {
//                             family: 'Lora',
//                             size: 15,
//                         },
//                     },
//                     margin: { t: 50, b: 50 },
//                 }}
//                 config={{
//                     responsive: true,
                    
//                 }}
//                 style={{ width: '100%', height: '600px' }}
//             />
//         </div>
//     );
// };

// export default TaxiDataChart;



import React, { useContext, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { DatePickerContext } from '../context/DatePickerContext';

const TaxiDataChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { startDate, endDate, selectedAirport } = useContext(DatePickerContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(
                    `http://127.0.0.1:8000/charts/taxi-delays?airport=${selectedAirport}&start_date=${startDate}&end_date=${endDate}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(Array.isArray(result) ? result : result.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate, selectedAirport]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!data.length) {
        return <div>No data available for the selected parameters.</div>;
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
                        marker: { color: '#AED6F1' }, // Light Blue
                        hovertemplate: 'Average Taxi Out Delay: %{y}<extra></extra>',
                    },
                    {
                        x: dates,
                        y: avgDep,
                        type: 'bar',
                        name: 'Average Departure Delay',
                        marker: { color: '#EB7AD1' }, // Light Pink
                        hovertemplate: 'Average Departure Delay: %{y}<extra></extra>',
                    },
                    {
                        x: dates,
                        y: avgArr,
                        type: 'bar',
                        name: 'Average Arrival Delay',
                        marker: { color: '#5B2C6F' }, // Dark Purple
                        hovertemplate: 'Average Arrival Delay: %{y}<extra></extra>',
                    },
                    {
                        x: dates,
                        y: avgTaxiIn,
                        type: 'bar',
                        name: 'Average Taxi In Delay',
                        marker: { color: '#52BE80' }, // Light Green
                        hovertemplate: 'Average Taxi In Delay: %{y}<extra></extra>',
                    },
                ]}
                layout={{
                    title: {
                        text: 'Daily Average of Different Delays',
                        font: {
                            family: 'Lora',
                            size: 45,
                            color: '#333333',
                        },
                        x: 0.5,
                        y: 0.95,
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
                    margin: { t: 50, b: 70 },
                }}
                config={{
                    responsive: true,
                }}
                style={{ width: '100%', height: '600px' }}
            />
        </div>
    );
};

export default TaxiDataChart;
