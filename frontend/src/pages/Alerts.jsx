import { useEffect, useState } from "react";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadAlerts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/alerts");
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <div style={heroStyle}>
        <p style={eyebrowStyle}>REAL-TIME WARNING CENTER</p>
        <h1 style={titleStyle}>Flood Alert Console</h1>
        <p style={subtitleStyle}>
          Alerts generated from AI prediction using ultrasonic water level, rain sensor,
          DHT11 temperature/humidity, and water flow sensor values.
        </p>
      </div>

      {alerts.length === 0 ? (
        <div style={emptyCard}>Loading alerts...</div>
      ) : (
        <div style={gridStyle}>
          {alerts.map((alert, index) => {
            const color = getRiskColor(alert.risk);

            return (
              <div
                key={index}
                style={{
                  ...alertCard,
                  border: `1px solid ${color}77`,
                  boxShadow: `0 0 28px ${color}22`,
                }}
              >
                <span style={{ ...riskBadge, backgroundColor: `${color}22`, color }}>
                  {alert.risk}
                </span>

                <h2 style={{ color, marginTop: "22px" }}>
                  {getAlertTitle(alert.risk)}
                </h2>

                <p style={messageStyle}>{alert.message}</p>

                <div style={footerStyle}>
                  <span>Source: Random Forest AI</span>
                  <span>Auto Updated</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getRiskColor(risk) {
  if (risk === "DANGER") return "#ef4444";
  if (risk === "WARNING") return "#f59e0b";
  return "#22c55e";
}

function getAlertTitle(risk) {
  if (risk === "DANGER") return "Danger Condition";
  if (risk === "WARNING") return "Warning Condition";
  return "Safe Condition";
}

const heroStyle = {
  marginBottom: "30px",
  padding: "28px",
  borderRadius: "24px",
  background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(14,165,233,0.08))",
  border: "1px solid rgba(239,68,68,0.28)",
};

const eyebrowStyle = {
  color: "#38bdf8",
  letterSpacing: "3px",
  fontSize: "13px",
  fontWeight: "800",
  margin: 0,
};

const titleStyle = {
  fontSize: "48px",
  margin: "8px 0",
  fontWeight: "900",
};

const subtitleStyle = {
  color: "#cbd5e1",
  fontSize: "17px",
  maxWidth: "900px",
};

const emptyCard = {
  background: "#1e293b",
  padding: "22px",
  borderRadius: "18px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "22px",
};

const alertCard = {
  background: "linear-gradient(135deg, #1e293b, #0f172a)",
  borderRadius: "22px",
  padding: "24px",
};

const riskBadge = {
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "900",
};

const messageStyle = {
  color: "#cbd5e1",
  lineHeight: "1.6",
  fontSize: "16px",
};

const footerStyle = {
  borderTop: "1px solid #334155",
  marginTop: "20px",
  paddingTop: "14px",
  display: "flex",
  justifyContent: "space-between",
  color: "#94a3b8",
  fontSize: "13px",
};