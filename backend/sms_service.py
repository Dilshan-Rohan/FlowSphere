import os
import requests
from dotenv import load_dotenv

load_dotenv()

# ---------- SMS GATEWAY CONFIG ----------

SMS_GATEWAY = os.getenv("SMS_GATEWAY")
USERNAME = os.getenv("SMS_USERNAME")
PASSWORD = os.getenv("SMS_PASSWORD")
PHONE_NUMBER = os.getenv("SMS_PHONE_NUMBER")

# ---------- GET ACCESS TOKEN ----------

def get_access_token():

    response = requests.post(
        f"{SMS_GATEWAY}/auth/token",
        auth=(USERNAME, PASSWORD),
        json={
            "scopes": [
                "messages:send",
                "messages:read"
            ],
            "ttl": 3600
        },
        timeout=10
    )

    response.raise_for_status()

    return response.json()["access_token"]

# ---------- SEND SMS ----------

def send_sms(message):
    try:
        token = get_access_token()

        headers = {
            "Authorization": f"Bearer {token}"
        }

        body = {
            "phoneNumbers": [
                PHONE_NUMBER
            ],
            "message": message
        }

        response = requests.post(
            f"{SMS_GATEWAY}/messages",
            headers=headers,
            json=body,
            timeout=15
        )

        print("SMS Status:", response.status_code)
        print("SMS Response:", response.text)

        return response.text

    except Exception as e:
        print("SMS Error:", e)
        return str(e)