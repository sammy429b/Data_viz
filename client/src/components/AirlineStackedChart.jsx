import React, { useContext, useEffect, useState } from 'react';
import { DatePickerContext } from '../context/DatePickerContext';
import Plot from 'react-plotly.js';
import Loader from './Loader';

function AirlineStackedChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { startDate, endDate, airline } = useContext(DatePickerContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
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
        return <Loader/>;
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
