from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")

db = client["flowsphere"]

print("Connected Successfully!")

print("Database Name:", db.name)