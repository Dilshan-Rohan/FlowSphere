import { useEffect, useState } from "react";

export default function AIPredictionCard() {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    loadPrediction();
    const interval = setInterval(loadPrediction, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadPrediction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/prediction");
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!prediction) {
    return (
      <div style={cardStyle}>
        <h2>AI Flood Risk Engine</h2>
        <p>Loading prediction...</p>
      </div>
    );
  }

  const riskColor =
    prediction.risk === "DANGER"
      ? "#ef4444"
      : prediction.risk === "WARNING"
      ? "#f59e0b"
      : "#22c55e";

  const dashOffset = 283 - (283 * prediction.probability) / 100;

  return (
    <div style={{ ...cardStyle, border: `1px solid ${riskColor}88` }}>
      <h2>AI Flood Risk Engine</h2>

      <div style={gaugeWrapper}>
        <svg width="260" height="160" viewBox="0 0 260 160">
          <path
            d="M40 130 A90 90 0 0 1 220 130"
            fill="none"
            stroke="#334155"
            strokeWidth="18"
            strokeLinecap="round"
          />

          <path
            d="M40 130 A90 90 0 0 1 220 130"
            fill="none"
            stroke={riskColor}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={dashOffset}
          />
        </svg>

        <div style={gaugeText}>
          <h1 style={{ color: riskColor }}>{prediction.probability}%</h1>
          <h3 style={{ color: riskColor }}>{prediction.risk}</h3>
        </div>
      </div>

      <p style={{ color: "#cbd5e1", textAlign: "center" }}>
        Prediction based on water level, rainfall, temperature, humidity and water flow
      </p>

      <div
        style={{
          ...alertBox,
          border: `1px solid ${riskColor}55`,
          backgroundColor:
            prediction.risk === "DANGER"
              ? "#450a0a"
              : prediction.risk === "WARNING"
              ? "#451a03"
              : "#052e16",
        }}
      >
        {prediction.risk === "DANGER"
          ? "🚨 Dangerous flood condition detected! Red LED alert is activated."
          : prediction.risk === "WARNING"
          ? "⚠️ Warning condition detected. Yellow LED alert is activated."
          : "✅ Situation is safe. Green LED status is active."}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "linear-gradient(135deg, #1e293b, #0f172a)",
  borderRadius: "18px",
  padding: "24px",
  marginTop: "22px",
  boxShadow: "0 0 30px #38bdf822",
};

const gaugeWrapper = {
  position: "relative",
  width: "260px",
  height: "160px",
  margin: "20px auto 0",
};

const gaugeText = {
  position: "absolute",
  top: "55px",
  left: 0,
  right: 0,
  textAlign: "center",
};

const alertBox = {
  marginTop: "18px",
  padding: "15px",
  borderRadius: "14px",
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
};