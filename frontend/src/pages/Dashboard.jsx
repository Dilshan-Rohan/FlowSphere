import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import LiveSensorPanel from "../components/LiveSensorPanel";
import AIPredictionCard from "../components/AIPredictionCard";
import AlertHistory from "../components/AlertHistory";
import SensorHistoryTable from "../components/SensorHistoryTable";
import RiskOverview from "../components/RiskOverview";
import BottomAlert from "../components/BottomAlert";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [sensorData, setSensorData] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const sensorResponse = await fetch("http://127.0.0.1:8000/sensor-data");
      const sensorResult = await sensorResponse.json();
      setSensorData(sensorResult);

      const predictionResponse = await fetch("http://127.0.0.1:8000/prediction");
      const predictionResult = await predictionResponse.json();
      setPrediction(predictionResult);
    } catch (error) {
      console.error(error);
    }
  };

  if (!sensorData || !prediction) {
    return (
      <div className="dashboard-page">
        <h1>FlowSphere</h1>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <div>
          <h1 className="dashboard-title">FlowSphere</h1>
          <p className="dashboard-subtitle">
            AI Flood Monitoring & Prediction System
          </p>
        </div>

        <div className="live-badge">
          <span className="live-dot"></span>
          LIVE
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          icon="⚡"
          title="Flood Risk"
          value={`${prediction.probability}%`}
          subtitle="AI Predicted"
          color="#3b82f6"
        />

        <StatCard
          icon="🌊"
          title="Water Level"
          value={`${sensorData.waterLevel} cm`}
          subtitle="Ultrasonic Sensor"
          color="#06b6d4"
        />

        <StatCard
          icon="🌧️"
          title="Rainfall"
          value={`${sensorData.rainfall} mm`}
          subtitle="Rain Drop Sensor"
          color="#8b5cf6"
        />

        <StatCard
          icon="🌡️"
          title="Temperature"
          value={`${sensorData.temperature} °C`}
          subtitle="DHT11 Sensor"
          color="#f97316"
        />

        <StatCard
          icon="💧"
          title="Humidity"
          value={`${sensorData.humidity}%`}
          subtitle="DHT11 Sensor"
          color="#22c55e"
        />

        <StatCard
          icon="🚿"
          title="Water Flow"
          value={`${sensorData.waterFlow} L/min`}
          subtitle="Flow Sensor"
          color="#38bdf8"
        />
      </div>

      <div className="dashboard-middle-grid">
        <RiskOverview prediction={prediction} />
        <LiveSensorPanel />
      </div>

      <BottomAlert prediction={prediction} />

      <AIPredictionCard />

      <SensorHistoryTable />

      <AlertHistory />
    </div>
  );
}