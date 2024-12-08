from fastapi import APIRouter, HTTPException
from models.data_loader import main_df
from models.response_schemas import FilteredDataResponse

router = APIRouter()

@router.get("/taxi-delays-airline", response_model=FilteredDataResponse)
def get_taxi_delay_chart(airline: str, start_date: str, end_date: str):
    
    # Filter the data based on the provided parameters
    filtered_df = main_df[(main_df['AIRLINE'] == airline) & 
                          (main_df['Date'] >= start_date) & 
                          (main_df['Date'] <= end_date)]
    
    if filtered_df.empty:
        raise HTTPException(status_code=404, detail="No data found for the given parameters")

    # Aggregate the data to calculate average taxi-in and taxi-out delays per day
    daily_delays = filtered_df.groupby('Date').agg(
        avg_taxi_in=('TAXI_IN', 'mean'),
        avg_taxi_out=('TAXI_OUT', 'mean'),
        avg_dep=('DEPARTURE_DELAY', 'mean'),
        avg_arr=('ARRIVAL_DELAY', 'mean')
    ).reset_index()

    # print(daily_delays)

    # Convert the aggregated data to a list of dictionaries for JSON response
    result_data = daily_delays.to_dict(orient='records')

    # Return the aggregated data as the response
    return {"data": result_data}