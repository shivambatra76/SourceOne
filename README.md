## Preprocessing Customer Data for MongoDB

This repository contains Python code for preprocessing customer data from a CSV file and storing it in MongoDB.

### Prerequisites
1. **MongoDB**: Ensure that MongoDB is installed and running on your system. The default port for MongoDB is set to 23000. If your MongoDB is running on a different port, please update the port configuration in the code.
2. **CSV File**: Prepare a CSV file containing the customer data to be processed.

### Instructions
1. **Install Python Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

2. **Execute the Python Code:**
    - To create a log file:
        ```bash
        python ProcessCustomerData.py > logs.txt
        ```
    - To run without creating a log file:
        ```bash
        python ProcessCustomerData.py
        ```

### Code Overview
- The Python script `ProcessCustomerData.py` performs the following tasks:
    - Loads customer data from a CSV file.
    - Processes the data to extract customer information along with their associated books.
    - Removes duplicate books.
    - Establishes a connection to MongoDB and pushes the processed data into respective collections.

- **Explanation of Python Code:**
    - `PreProcessing` class: Initializes MongoDB connection and defines methods for data processing.
    - `process`: Loads CSV data, processes it, and pushes it to MongoDB.
    - `process_books`: Extracts book information from the dataset.
    - `remove_duplicates`: Eliminates duplicate books from the dataset.
    - `get_stats`: Provides statistics on the processed data.
    - `connect_to_mongodb`: Establishes a connection to MongoDB.
    - `process_dates`: Handles date processing for book lending.

### Usage
Execute the Python script with the path to your CSV file as an argument. For example:
```bash
python ProcessCustomerData.py customer_data.csv

