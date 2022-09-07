
from pymongo import MongoClient

import consts

if __name__ == '__main__':
    client = MongoClient(consts.DB_URL, consts.DB_PORT, maxPoolSize=50)
    print(client)
    db = client["main_db"]
    collection = db['users']
    cursor = collection.find({})
    for document in cursor:
          print(document)