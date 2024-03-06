import json
import pandas as pd
from pymongo import MongoClient 
from datetime import datetime, timedelta
class PreProcessing:
    def __init__(self):
        self.DEFAULT_DATABASE = "sourceOne"
        self.DEFAULT_CUSTOMERS_TABLE_NAME = "customers"
        self.DEFAULT_BOOKS_TABLE_NAME = "books"
        self.DEFAULT_CUSTOMER_BOOK_TABLE_NAME = "rental"
        self.MONGO_DB_PORT = 23000
        self.customer_books_map = []
        self.books = []
        self.customers = []
        self.client = self.connect_to_mongodb()
    
    def process(self,file_path):
        print("Loading csv", file_path)
        data = pd.read_csv(file_path)
        print("Processing Data with total rows", data.shape[0])
        for index, row in data.iterrows():
            self.customers.append({"customer_id":row["customer_id"], "customer_name":row["customer_name"]})
            self.process_books(row["customer_id"],json.loads(row["books"]))
        self.get_stats()
        self.push_to_mongodb()
        print("Done processing!")
        return
    def process_books(self,customer_id,books_array):
        global books, customer_books_map
        for book in books_array:
            processed_lend_date, expected_return_date = self.process_dates(book)
            self.customer_books_map.append({
                "customer_id":customer_id,
                "book_id":book["book_id"],
                "lend_date":processed_lend_date,
                "expected_return_date":expected_return_date
            })
            self.books.append({
                "book_id":book["book_id"],
                "author_name":book["author_name"],
                "book_name":book["book_name"]
            })
            return
    def remove_duplicates(self):
        print("Removing Duplicates")
        books_id_map = {}
        for book in self.books:
            books_id_map[book["book_id"]] = book
        self.books=list(books_id_map.values())
        return 
    
    def get_stats(self):
        print("Total Number of Customers in the Dataset",len(self.customers))
        print("Total Books with Duplicates",len(self.books))
        self.remove_duplicates()
        print("Total Number of Unique Books in the Dataset",len(self.books))
        return {
            "totalCustomers": len(self.customers),
            "totalBooks": len(self.books)
        }
    def connect_to_mongodb(self):
        mongo_config= f"mongodb://localhost:{self.MONGO_DB_PORT}/".format(self.MONGO_DB_PORT)
        client = MongoClient(mongo_config)
        return client
    def process_dates(self,input_data):
        """
        input_data: 
        """
        lend_date_str = input_data["lend_date"]
        lend_date_converted = datetime.strptime(lend_date_str, "%Y-%m-%d")
        days_to_return = input_data["days_to_return"]
        expected_return_date = lend_date_converted + timedelta(days=days_to_return)

        return lend_date_converted, expected_return_date
    def push_to_mongodb(self):
        database = self.client[self.DEFAULT_DATABASE]
        print("Pushing Books Data into Database")
        database[self.DEFAULT_BOOKS_TABLE_NAME].insert_many(self.books)
        print("Pushing Customer Data into Database")
        database[self.DEFAULT_CUSTOMERS_TABLE_NAME].insert_many(self.customers)
        print("Pushing Customer Books Maps Data into Database")
        database[self.DEFAULT_CUSTOMER_BOOK_TABLE_NAME].insert_many(self.customer_books_map)
        print("All Data Pushed to Database")
        return 
if __name__ == "__main__":
    try:
        PreProcessing().process("customer_data.csv")
    except Exception as e:
        print("Something Went Wrong", e)
