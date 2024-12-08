from fastapi import APIRouter, HTTPException
from models.data_loader import main_df

router = APIRouter()

@router.get("/delay-pie", response_model=dict)
def get_delay_pie_chart(airport: str, start_date: str, end_date: str):
    """
    Get data for a pie chart representing the proportions of delay types.
    """
    # Filter the data based on the provided parameters
    print(main_df)
    filtered_df = main_df[(main_df['ORIGIN_AIRPORT'] == airport) &
                          (main_df['Date'] >= start_date) &
                          (main_df['Date'] <= end_date)]

    if filtered_df.empty:
        raise HTTPException(status_code=404, detail="No data found for the given parameters")

    # Calculate total delay for each type
    total_taxi_in = filtered_df['TAXI_IN'].sum()
    total_taxi_out = filtered_df['TAXI_OUT'].sum()
    total_arrival = filtered_df['ARRIVAL_DELAY'].sum()
    total_departure = filtered_df['DEPARTURE_DELAY'].sum()

    # Prepare the response data for the pie chart
    delay_data = {
        "labels": ["Taxi In Delay", "Taxi Out Delay", "Arrival Delay", "Departure Delay"],
        "values": [total_taxi_in, total_taxi_out, total_arrival, total_departure]
    }

    return delay_data

