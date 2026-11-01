import { useEffect, useState } from "react";

export default function SystemStatusCard() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadStatus = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/system-status");
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!status) {
    return (
      <div style={cardStyle}>
        <h2>🖥️ System Status</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <h2>🖥️ System Status</h2>

      <StatusRow label="Backend Server" value={status.backend} />
      <StatusRow label="Database MongoDB" value={status.database} />
      <StatusRow label="AI Model" value={status.aiModel} />
      <StatusRow label="Telegram Alerts" value={status.telegram} />

      <div style={healthyBox}>✅ All systems operational</div>
    </div>
  );
}

function StatusRow({ label, value }) {
  return (
    <div style={rowStyle}>
      <span>🟢 {label}</span>
      <strong style={{ color: "#22c55e" }}>{value}</strong>
    </div>
  );
}

const cardStyle = {
  background: "linear-gradient(135deg, #1e293b, #0f172a)",
  border: "1px solid #22c55e55",
  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 0 25px #22c55e22",
};

const rowStyle = {
  backgroundColor: "#0f172a",
  borderRadius: "12px",
  padding: "13px",
  marginTop: "12px",
  display: "flex",
  justifyContent: "space-between",
};

const healthyBox = {
  marginTop: "16px",
  backgroundColor: "#064e3b",
  color: "#86efac",
  padding: "14px",
  borderRadius: "12px",
  fontWeight: "bold",
};