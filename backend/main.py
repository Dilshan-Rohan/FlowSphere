import os
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
CHAT_ID = os.getenv("CHAT_ID")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
import joblib
import requests
from sms_service import send_sms

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient("mongodb://localhost:27017/")
db = client["flowsphere"]
sensor_collection = db["sensor_data"]

model = joblib.load("flood_model.pkl")
last_alert_risk = None
last_sms_risk = None


class SensorData(BaseModel):
    waterLevel: int
    rainfall: int
    temperature: float
    humidity: float
    waterFlow: float


def send_telegram_alert(message):
    url = f"https://api.telegram.org/bot{9293034390:AAFBLKwjAlJ1DZu8qQvDAu1k2npbM1D-brg}/sendMessage"

    payload = {
        "chat_id": CHAT_ID,
        "text": message
    }

    try:
        response = requests.post(url, data=payload, timeout=10)

        print("Telegram Response:")
        print(response.text)

        return response.json()

    except Exception as e:
        print("Telegram Error:", e)
        return {"ok": False, "error": str(e)}


def predict_from_latest():
    latest = sensor_collection.find_one(sort=[("_id", -1)])

    if not latest:
        return None, 0, "SAFE", 0

    features = [[
        latest["waterLevel"],
        latest["rainfall"],
        latest["temperature"],
        latest["humidity"],
        latest["waterFlow"]
    ]]

    prediction_result = model.predict(features)[0]

    if prediction_result == 0:
        return latest, 20, "SAFE", prediction_result

    if prediction_result == 1:
        return latest, 60, "WARNING", prediction_result

    return latest, 95, "DANGER", prediction_result


@app.get("/")
def root():
    return {
        "message": "FlowSphere Backend Running"
    }


@app.get("/seed-data")
def seed_data():
    sample_data = {
        "waterLevel": 180,
        "rainfall": 65,
        "temperature": 28,
        "humidity": 82,
        "waterFlow": 140
    }

    sensor_collection.insert_one(sample_data)

    return {
        "message": "Sample sensor data inserted successfully"
    }


@app.post("/sensor-data")
def add_sensor_data(data: SensorData):
    sensor_collection.insert_one(data.dict())

    return {
        "message": "Sensor data stored successfully"
    }


@app.get("/sensor-data")
def get_sensor_data():
    latest = sensor_collection.find_one(sort=[("_id", -1)])

    if not latest:
        return {
            "waterLevel": 0,
            "rainfall": 0,
            "temperature": 0,
            "humidity": 0,
            "waterFlow": 0
        }

    latest.pop("_id", None)
    return latest


@app.get("/sensor-history")
def get_sensor_history():
    history = []

    records = sensor_collection.find().sort("_id", -1).limit(20)

    for record in records:
        record["_id"] = str(record["_id"])
        history.append(record)

    return history


@app.get("/prediction")
def prediction():
    global last_alert_risk, last_sms_risk

    latest, probability, risk, prediction_result = predict_from_latest()

    if latest is None:
        return {
            "probability": 0,
            "risk": "SAFE"
        }

    print(f"\nCurrent Risk : {risk}")
    print(f"Last SMS Risk: {last_sms_risk}")
    print(f"Last TG Risk : {last_alert_risk}")

    # ---------------- TELEGRAM ----------------

    if risk == "DANGER":
        if last_alert_risk != "DANGER":

            send_telegram_alert(
                f"🚨 FLOOD ALERT 🚨\n\n"
                f"Status: DANGER\n"
                f"Flood Risk: {probability}%\n\n"
                f"Water Level: {latest['waterLevel']} cm\n"
                f"Rainfall: {latest['rainfall']} mm\n"
                f"Temperature: {latest['temperature']} °C\n"
                f"Humidity: {latest['humidity']}%\n"
                f"Water Flow: {latest['waterFlow']} L/min"
            )

            print("Telegram Alert Sent")
            last_alert_risk = "DANGER"

    else:
        last_alert_risk = risk

    # ---------------- SMS ----------------

    if risk in ["WARNING", "DANGER"]:

        if last_sms_risk != risk:

            sms_message = (
                f"FlowSphere Alert\n\n"
                f"Status: {risk}\n"
                f"Flood Risk: {probability}%\n"
                f"Water Level: {latest['waterLevel']} cm\n"
                f"Rainfall: {latest['rainfall']} mm\n"
                f"Temperature: {latest['temperature']} °C\n"
                f"Humidity: {latest['humidity']}%\n"
                f"Water Flow: {latest['waterFlow']} L/min"
            )

            send_sms(sms_message)

            print("SMS Sent")

            last_sms_risk = risk

        else:
            print("SMS Skipped (Already Sent)")

    else:
        last_sms_risk = "SAFE"

    return {
        "probability": probability,
        "risk": risk
    }

@app.get("/alerts")
def alerts():
    latest, probability, risk, prediction_result = predict_from_latest()

    if latest is None:
        return [
            {
                "risk": "SAFE",
                "message": "No sensor data available"
            }
        ]

    if risk == "DANGER":
        return [
            {
                "risk": "DANGER",
                "message": "🚨 Dangerous flood condition detected"
            },
            {
                "risk": "DANGER",
                "message": "Water level and flow rate are critically high"
            }
        ]

    if risk == "WARNING":
        return [
            {
                "risk": "WARNING",
                "message": "⚠️ Warning condition detected. Monitor water level closely"
            }
        ]

    return [
        {
            "risk": "SAFE",
            "message": "✅ Situation is safe. System monitoring normally"
        }
    ]


@app.get("/system-status")
def system_status():
    return {
        "database": "Connected",
        "aiModel": "Active",
        "telegram": "Connected",
        "backend": "Online"
    }


@app.get("/test-sms")
def test_sms():
    result = send_sms(
        "FlowSphere SMS Test\n\nThis is a test SMS from FlowSphere backend."
    )

    return {
        "message": "SMS test triggered",
        "sms_result": result
    }

@app.get("/test-telegram")
def test_telegram():
    result = send_telegram_alert(
        "FlowSphere Telegram Test\n\n"
        "Your new Telegram bot is connected successfully!"
    )

    return {
        "message": "Telegram test triggered",
        "telegram_result": result
    }