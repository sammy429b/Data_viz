from fastapi import APIRouter, HTTPException
from models.data_loader import main_df


router = APIRouter()

@router.get("/", response_model=list[str])
def get_states():
    """Get unique states."""
    return main_df['AIRLINE'].unique().tolist()
