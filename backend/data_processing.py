import pandas as pd
import json

# Load CSV data
def load_csv(file_path):
    return pd.read_csv(file_path)

# Convert DataFrame to JSON
def convert_to_json(df, output_path):
    df.to_json(output_path, orient='records', lines=True)

# Main function
def main():
    # Load CSV data
    df = load_csv('Data/OpenDataHrefsBases.csv')
    
    # Convert to JSON
    convert_to_json(df, 'frontend/data.json')

if __name__ == "__main__":
    main()