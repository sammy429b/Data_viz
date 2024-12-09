from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import state_controller, airport_controller, chart_controller, stack_chart_controller, pie_chart_1_controlller, pie_chart_2_controlller, airline_stack_chart_controller, airline_pie_chart_1_controlller, airline_pie_chart_2_controlller, top_10_airline_based_category_controller

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to your frontend's origin for security
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(state_controller.router, prefix="/states", tags=["States"])
app.include_router(airport_controller.router, prefix="/airports", tags=["Airports"])
app.include_router(chart_controller.router, prefix="/charts", tags=["Charts"])
app.include_router(stack_chart_controller.router, prefix="/charts", tags=["Stack"])
app.include_router(pie_chart_1_controlller.router, prefix="/charts", tags=["Pie1"])
app.include_router(pie_chart_2_controlller.router, prefix="/charts", tags=["Pie2"])
app.include_router(airline_stack_chart_controller.router, prefix="/airline", tags=["AirlineStack"])
app.include_router(airline_pie_chart_1_controlller.router, prefix="/airline", tags=["AirlinePie1"])
app.include_router(airline_pie_chart_2_controlller.router, prefix="/airline", tags=["AirlinePie2"])
app.include_router(top_10_airline_based_category_controller.router, prefix="/top", tags=["BAR"])


# To run the application use:
# uvicorn main:app --reload

