from pydantic import BaseModel
from typing import List

class StateAirportsResponse(BaseModel):
    state: str
    airports: List[str]

class FilteredDataResponse(BaseModel):
    data: List[dict]
