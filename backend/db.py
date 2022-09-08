import os
from pymongo import MongoClient

class MongoDB(object):

    def __init__(self):
         super().__init__()
         self.client     = None
         self.collection = None

    DB_USER       = os.environ.get("MONGO_USER")
    DB_PASS       = os.environ.get("MONGO_PASS")
    DB_CONNECTION = f"mongodb+srv://{DB_USER}:{DB_PASS}@mongocluster.v8xuwmi.mongodb.net/?retryWrites=true&w=majority"
    DB_PORT       = 27017

    def connect(self):
        self.client = MongoClient(self.DB_CONNECTION, self.DB_PORT, maxPoolSize=50)

if __name__ == '__main__':
    db = MongoDB()
    db.connect()
    db = db.client["main_db"]
    collection = db['users']
    cursor = collection.find({})
    for document in cursor:
          print(document)
