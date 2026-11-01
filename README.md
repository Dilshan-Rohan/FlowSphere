# 🌊 FlowSphere – Smart Flood Monitoring and Early Warning System

**An IoT-powered flood monitoring system with AI-based risk classification and real-time alerts.**

## 📌 Overview

FlowSphere is a smart flood monitoring and early warning system designed to monitor environmental conditions and identify potential flood risks.

The system collects sensor data using ESP32-based IoT hardware, processes the readings through a FastAPI backend, and uses a Machine Learning model to classify flood risk into three levels: **SAFE, WARNING, and DANGER**.

When critical conditions are detected, FlowSphere can notify users through Telegram and SMS alerts while displaying sensor information and risk status on a web dashboard.

## ✨ Key Features

- 🌧️ Real-time environmental monitoring
- 📡 Wireless communication using ESP32 and LoRa
- 🤖 Machine Learning-based flood risk classification
- 📊 Interactive React dashboard
- 🗄️ MongoDB sensor data storage
- 🚨 Telegram flood notifications
- 📱 SMS alerts through SMSGate
- 📈 Sensor history and risk monitoring

## 🏗️ System Architecture

The system follows this workflow:

1. **Sensor Layer:** Environmental sensors collect water-level, rainfall, temperature, humidity and water-flow readings.
2. **Communication Layer:** ESP32 controllers and LoRa modules transmit sensor information.
3. **Backend Layer:** FastAPI receives sensor data and stores it in MongoDB.
4. **AI Layer:** A Random Forest model classifies the flood risk.
5. **Alert Layer:** Telegram and SMS notifications are triggered based on risk conditions.
6. **Frontend Layer:** A React dashboard displays sensor readings, predictions and alerts.

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Programming | Python, C++, JavaScript |
| Hardware | ESP32, LoRa SX1278 |
| Sensors | Ultrasonic, Rain, DHT11, Water Flow |
| Backend | FastAPI |
| Frontend | React, Vite |
| Database | MongoDB |
| Machine Learning | Scikit-learn, Random Forest |
| Notifications | Telegram Bot API, SMSGate |
| Communication | Wi-Fi, LoRa, HTTP/JSON |

## 🧠 Flood Risk Classification

FlowSphere uses a trained Random Forest model to classify sensor conditions into three categories:

| Risk Level | Description |
|---|---|
| SAFE | Normal monitored conditions |
| WARNING | Conditions requiring attention |
| DANGER | Critical conditions requiring immediate alerts |

The backend generates a risk classification and triggers notifications according to the configured alert logic.

## 📁 Project Structure

```text
FlowSphere/
│
├── backend/
│   ├── main.py
│   ├── sms_service.py
│   ├── train_model.py
│   ├── test_mongo.py
│   ├── flood_model.pkl
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md
```

*The structure above is a simplified overview of the repository.*

## ⚙️ Installation and Setup

### Prerequisites

- Python 3.10 or later
- Node.js and npm
- MongoDB
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Dilshan-Rohan/FlowSphere.git
cd FlowSphere
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the backend folder and configure the required environment variables:

```env
BOT_TOKEN=your_telegram_bot_token
CHAT_ID=your_telegram_chat_id

SMS_GATEWAY=https://api.sms-gate.app/3rdparty/v1
SMS_USERNAME=your_sms_username
SMS_PASSWORD=your_sms_password
SMS_PHONE_NUMBER=your_phone_number
```

Start the backend:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

API documentation:

`http://127.0.0.1:8000/docs`

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend status |
| GET | `/sensor-data` | Retrieve latest readings |
| POST | `/sensor-data` | Submit sensor readings |
| GET | `/sensor-history` | Retrieve sensor history |
| GET | `/prediction` | Get flood risk prediction |
| GET | `/alerts` | Retrieve alert information |
| GET | `/system-status` | Check system status |
| GET | `/test-sms` | Test SMS notification |

## 🔐 Security

- Sensitive credentials are stored in environment variables.
- `.env` and hardware secret files are excluded from version control.
- API tokens and passwords should never be committed to the public repository.

## 🚀 Future Improvements

- Improve model accuracy using larger and more realistic datasets.
- Implement calibrated rainfall measurement.
- Improve real-time sensor data visualisation.
- Add more advanced flood forecasting capabilities.
- Enhance hardware reliability and field testing.
- Deploy the application to a cloud environment.

## 👨‍💻 Developer

**Dilshan Rohan**

GitHub: [Dilshan-Rohan](https://github.com/Dilshan-Rohan)

---

⭐ If you find this project interesting, consider giving the repository a star!

**FlowSphere – Monitor. Predict. Alert.**