import React, { useContext, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { DatePickerContext } from "../context/DatePickerContext";
import Loader from "./Loader";

const categoryData = [
    { value: "least_delay", label: "Least Delay" },
    { value: "highest_delay", label: "Highest Delay" },
    { value: "most_cancelled", label: "Most Cancelled" },
    { value: "most_diverted", label: "Most Diverted" },
];

const AirlineBarChart = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { startDate, endDate, airline } = useContext(DatePickerContext);
    const [selectedCategory, setSelectedCategory] = useState("least_delay");

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Safely handle data, only map if it's an array
    const airlines = data && Array.isArray(data) ? data.map((items) => items.AIRLINE_NAME) : [];
    const values = data && Array.isArray(data) ? data.map((items) => items.TOTAL_DELAY) : [];

    console.log(airlines)
    console.log(values)

    const chartData = [
        {
            x: airlines,
            y: values,
            type: "bar",
            marker: {
                color: "rgb(26, 118, 255)",
            },
        },
    ];

    const layout = {
        title: "Airline Delays",
        xaxis: { title: "Airlines" },
        yaxis: { title: "Delays" },
        margin: { t: 40, l: 50, r: 50, b: 50 },
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/top/airline-delays?selected_category=${selectedCategory}&start_date=${startDate}&end_date=${endDate}`
                );
                const result = await response.json();
                console.log('API Response:', result); // Log the result to inspect its structure

                // Ensure the response is an array before setting it
                if (Array.isArray(result.data)) {
                    setData(result.data);
                } else {
                    console.error('API response is not an array');
                    setData([]); // Handle the error or empty data response
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]); // Handle error by setting empty array
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate, selectedCategory]);

    if (loading) {
        return <Loader/>;
    }

    if (!data || data.length === 0) {
        return <div>No data available for the selected criteria.</div>;
    }

    return (
        <div className="mt-24 w-full h-[100vh]">
            {/* <h1>Airline Delays Data</h1> */}
            <form style={{ marginBottom: "20px" }}>
                <div className="flex flex-col space-y-2">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="category-select">
                        Select a Category:
                    </label>
                    <select
                        id="category-select"
                        className="block w-24 border border-gray-300 rounded p-2"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        {categoryData.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </form>

            <Plot
                data={
                    [{
                        x: airlines,
                        y: values,
                        type: 'bar',
                        marker: { color: '#5C2751' },
                    }]
                }
                layout={{
                    title: {
                        text: 'Airline',
                        font: {
                            family: 'Lora',
                            size: 45,
                            color: '#333333',
                        },
                        x: 0.5,
                    },
                    xaxis: {
                        title: {
                            text: 'Airline Name',
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
                    barmode: 'bar',
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
};

export default AirlineBarChart;
