from fastapi import APIRouter, HTTPException
from models.data_loader import main_df

router = APIRouter()


@router.get("/delay-pie-sub-airline", response_model=dict)
def get_delay_pie_chart(airline: str, start_date: str, end_date: str):
    """
    Get data for a pie chart representing the proportions of delay types.
    """
    # Filter the data based on the provided parameters
    filtered_df = main_df[(main_df['AIRLINE'] == airline) &
                          (main_df['Date'] >= start_date) &
                          (main_df['Date'] <= end_date)]

    if filtered_df.empty:
        raise HTTPException(status_code=404, detail="No data found for the given parameters")

    # Calculate total delay for each type
    total_air_system = filtered_df['AIR_SYSTEM_DELAY'].sum()
    total_security_out = filtered_df['SECURITY_DELAY'].sum()
    total_airline = filtered_df['AIRLINE_DELAY'].sum()
    total_weather = filtered_df['WEATHER_DELAY'].sum()

    # Prepare the response data for the pie chart
    delay_data = {
        "labels": ["AIR_SYSTEM_DELAY", "SECURITY_DELAY", "AIRLINE_DELAY", "WEATHER_DELAY"],
        "values": [total_air_system, total_security_out, total_airline, total_weather]
    }

    return delay_data