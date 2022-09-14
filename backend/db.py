import os
from pymongo import MongoClient

class MongoDB(object):

    def __init__(self, db_name):
         super().__init__()
         self.db_name  = db_name
         self.client     = None
         self.db         = None
         self.collection = None

    MONGO_USER    = os.environ.get("MONGO_USER")
    MONGO_PASS    = os.environ.get("MONGO_PASS")
    MONGO_URL     = os.environ.get("MONGO_URL")
    DB_CONNECTION = f"mongodb+srv://{MONGO_USER}:{MONGO_PASS}@{MONGO_URL}/?retryWrites=true&w=majority"
    DB_PORT       = 27017

    def connect(self):
        self.client = MongoClient(self.DB_CONNECTION, self.DB_PORT, maxPoolSize=50)
        self.db = self.client[self.db_name]

    def get_one(self, collection: str, query: dict) -> dict:
        return self.db[collection].find_one(query)