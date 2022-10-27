import os
from pymongo import MongoClient
import typing


class MongoDB():

    MONGO_USER = os.environ.get("MONGO_USER")
    MONGO_PASS = os.environ.get("MONGO_PASS")
    MONGO_URL = os.environ.get("MONGO_URL")
    DB_CONNECTION = f"mongodb+srv://{MONGO_USER}:{MONGO_PASS}@{MONGO_URL}/?retryWrites=true&w=majority"
    DB_PORT = 27017

    def __init__(self, db_name):
        self.db_name = db_name
        self.client = None
        self._db = None
        self.collection = None

    @property
    def db(self):
        return self._connect() if self._db is None else self._db

    def _connect(self) -> None:
        self.client = MongoClient(
            self.DB_CONNECTION, self.DB_PORT, maxPoolSize=50)
        self._db = self.client[self.db_name]
        return self._db

    def get_one(self, collection: str, query: dict, project: typing.Optional[dict] = None) -> dict:
        return self.db[collection].find_one(query, project)

    def get_first_one(self, collection, query):
        cur = self.db[collection].find(query)
        for x in cur:
            return x
