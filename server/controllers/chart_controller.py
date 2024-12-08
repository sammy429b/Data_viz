from fastapi import APIRouter, HTTPException
from models.data_loader import main_df
from models.response_schemas import FilteredDataResponse

router = APIRouter()

@router.get("/taxi-delays", response_model=FilteredDataResponse)
def get_taxi_delay_chart(airport: str, start_date: str, end_date: str):
    filtered_df = main_df[(main_df['ORIGIN_AIRPORT'] == airport) & 
                          (main_df['Date'] >= start_date) & 
                          (main_df['Date'] <= end_date)]
    
    if filtered_df.empty:
        raise HTTPException(status_code=404, detail="No data found for the given parameters")

    daily_delays = filtered_df.groupby('Date').agg(
        avg_taxi_in=('TAXI_IN', 'mean'),
        avg_taxi_out=('TAXI_OUT', 'mean'),
        avg_dep=('DEPARTURE_DELAY', 'mean'),
        avg_arr=('ARRIVAL_DELAY', 'mean')
    ).reset_index()

    result_data = daily_delays.to_dict(orient='records')
    return {"data": result_data}
