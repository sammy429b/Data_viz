import pandas as pd

def load_and_preprocess_data():
    main_df = pd.read_csv('./data/flights.csv', low_memory=False)
    airport_df = pd.read_csv("./data/airports.csv")
    airline_df = pd.read_csv("./data/airlines.csv").iloc[:, :2].rename(columns={
        'IATA_CODE': 'AIRLINE_CODE',
        'AIRLINE': 'AIRLINE_NAME'
    })

    main_df['Date'] = pd.to_datetime(main_df[['YEAR', 'MONTH', 'DAY']])
    main_df = main_df.sort_values(by=['Date'])

    # Merge airlines and airports
    main_df = main_df.merge(airline_df, left_on='AIRLINE', right_on='AIRLINE_CODE', how='left')
    main_df = main_df.merge(airport_df.rename(columns={'IATA_CODE': 'ORIGIN_AIRPORT'}), 
                            left_on='ORIGIN_AIRPORT', 
                            right_on='ORIGIN_AIRPORT', 
                            how='left')
    
    main_df.fillna({'AIRLINE_NAME': 'Unknown Airline'}, inplace=True)
    main_df.fillna(0, inplace=True)
    return main_df, airport_df, airline_df

# Load data once for the app lifecycle
main_df, airport_df, airline_df = load_and_preprocess_data()
