from fastapi import APIRouter, HTTPException
from models.data_loader import main_df
from models.response_schemas import StateAirportsResponse


router = APIRouter()

@router.get("/", response_model=StateAirportsResponse)
def get_airports_by_state(state: str):
    """Get airports for a specific state."""
    if state not in main_df['STATE'].unique():
        raise HTTPException(status_code=404, detail="State not found")
    
    airports = main_df[main_df['STATE'] == state]['ORIGIN_AIRPORT'].unique().tolist()
    return {"state": state, "airports": airports}
