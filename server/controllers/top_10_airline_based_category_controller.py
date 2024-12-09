from fastapi import APIRouter, HTTPException, Query
from typing import List
from pydantic import BaseModel
import pandas as pd
from models.data_loader import main_df

# Define response schema
class FilteredDataResponse(BaseModel):
    data: List[dict]

# Initialize APIRouter
router = APIRouter()

@router.get("/airline-delays", response_model=FilteredDataResponse)
def get_airline_delay_chart(
    start_date: str ,
    end_date: str ,
    selected_category: str
):
    """
    Generate data based on airline delays for the specified category and date range.
    """
    # Filter the data based on the provided parameters
    filtered_df = main_df[
        (main_df['Date'] >= start_date) & (main_df['Date'] <= end_date)
    ]

    if filtered_df.empty:
        raise HTTPException(status_code=404, detail="No data found for the given parameters")

    # Process the data based on the selected category
    if selected_category in ["least_delay", "highest_delay"]:
        filtered_df['TOTAL_DELAY'] = filtered_df['DEPARTURE_DELAY'] + filtered_df['ARRIVAL_DELAY']
        agg_df = (
            filtered_df.groupby('AIRLINE_NAME')['TOTAL_DELAY']
            .sum()
            .reset_index()
            .sort_values('TOTAL_DELAY', ascending=(selected_category == "least_delay"))
            .head(10)
        )
    elif selected_category in ["most_cancelled", "most_diverted"]:
        col = "CANCELLED" if selected_category == "most_cancelled" else "DIVERTED"
        agg_df = (
            filtered_df.groupby('AIRLINE_NAME')[col]
            .sum()
            .reset_index()
            .sort_values(col, ascending=False)
            .head(10)
        )
    else:
        raise HTTPException(status_code=400, detail="Invalid category selected")

    # Prepare the result data
    result_data = agg_df.to_dict(orient="records")

    return {"data": result_data}
