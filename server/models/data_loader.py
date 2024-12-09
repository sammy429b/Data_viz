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

    # # Merge airlines and airports
    # main_df = main_df.merge(airline_df, left_on='AIRLINE', right_on='AIRLINE_CODE', how='left')
    # main_df = main_df.merge(airport_df.rename(columns={'IATA_CODE': 'ORIGIN_AIRPORT'}), 
    #                         left_on='ORIGIN_AIRPORT', 
    #                         right_on='ORIGIN_AIRPORT', 
    #                         how='left')
    
    # main_df.fillna({'AIRLINE_NAME': 'Unknown Airline'}, inplace=True)
    # main_df.fillna(0, inplace=True)

    







# Step 1: Merging airport information
    # For origin airport
    main_df = main_df.merge(airport_df, left_on='ORIGIN_AIRPORT', right_on='IATA_CODE', how='left')
    main_df = main_df.rename(columns={
        'AIRPORT': 'origin_AIRPORT',
        'CITY': 'origin_CITY',
        'STATE': 'origin_STATE',
        'LATITUDE': 'origin_LATITUDE',
        'LONGITUDE': 'origin_LONGITUDE'
    })

    # For destination airport
    main_df = main_df.merge(airport_df, left_on='DESTINATION_AIRPORT', right_on='IATA_CODE', how='left', suffixes=('', '_dest'))
    main_df = main_df.rename(columns={
        'AIRPORT': 'dest_AIRPORT',
        'CITY': 'dest_CITY',
        'STATE': 'dest_STATE',
        'LATITUDE': 'dest_LATITUDE',
        'LONGITUDE': 'dest_LONGITUDE'
    })

    # Remove duplicate columns
    main_df = main_df.drop(['IATA_CODE', 'IATA_CODE_dest', 'COUNTRY', 'COUNTRY_dest'], axis=1)

    # Step 2: Merging airline information
    main_df = main_df.merge(airline_df, left_on='AIRLINE', right_on='AIRLINE_CODE', how='left')
    main_df = main_df.rename(columns={'AIRLINE_NAME': 'AIRLINE_NAME'})

    # Remove duplicate column
    main_df = main_df.drop('AIRLINE_CODE', axis=1)

    main_df.fillna({ 'dest_LATITUDE': 0.0}, inplace=True)
    main_df.fillna(0, inplace=True)
    main_df = main_df[main_df['dest_LATITUDE'] != 0.0]    
    main_df = main_df[main_df['Date'].dt.month != 10]










    return main_df, airport_df, airline_df

# Load data once for the app lifecycle
main_df, airport_df, airline_df = load_and_preprocess_data()


print(main_df)