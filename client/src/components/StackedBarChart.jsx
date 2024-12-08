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
            <h1>Taxi In and Out Data - Stacked Bar Chart</h1>
            <Plot
                data={[
                    {
                        x: dates,
                        y: avgTaxiOut,
                        type: 'bar',
                        name: 'Average Taxi Out',
                        marker: { color: 'RED' }, // Tomato color for better readability
                    },
                    {
                        x: dates,
                        y: avgDep,
                        type: 'bar',
                        name: 'Average Departure',
                        marker: { color: 'BLUE' }, // Lime Green
                    },
                    {
                        x: dates,
                        y: avgArr,
                        type: 'bar',
                        name: 'Average Arrival',
                        marker: { color: 'GREEN' }, // Steel Blue
                    },
                    {
                        x: dates,
                        y: avgTaxiIn,
                        type: 'bar',
                        name: 'Average Taxi In',
                        marker: { color: 'BLACK' }, // Gold
                    },
                ]}
                layout={{
                    title: 'Average Taxi In and Out (Stacked)',
                    xaxis: {
                        title: 'Date',
                        tickangle: 45,
                    },
                    yaxis: {
                        title: 'Average Taxi Count',
                    },
                    barmode: 'stack',
                    bargap: 0.3,
                    showlegend: true,
                    margin: { t: 50, b: 50 },
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
