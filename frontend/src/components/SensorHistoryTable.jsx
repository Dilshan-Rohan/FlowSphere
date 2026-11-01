import { useEffect, useState } from "react";

export default function SensorHistoryTable() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
    const interval = setInterval(loadHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadHistory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/sensor-history");
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h2>Recent Sensor Records</h2>
        <span style={badgeStyle}>Live Data</span>
      </div>

      {history.length === 0 ? (
        <p>No sensor history available</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Water Level</th>
                <th style={thStyle}>Rainfall</th>
                <th style={thStyle}>Temperature</th>
                <th style={thStyle}>Humidity</th>
                <th style={thStyle}>Water Flow</th>
              </tr>
            </thead>

            <tbody>
              {history.slice(0, 8).map((item) => (
                <tr key={item._id}>
                  <td style={{ ...tdStyle, color: getValueColor(item.waterLevel, "water") }}>
                    {item.waterLevel} cm
                  </td>

                  <td style={{ ...tdStyle, color: getValueColor(item.rainfall, "rain") }}>
                    {item.rainfall} mm
                  </td>

                  <td style={{ ...tdStyle, color: getValueColor(item.temperature, "temp") }}>
                    {item.temperature} °C
                  </td>

                  <td style={{ ...tdStyle, color: getValueColor(item.humidity, "humidity") }}>
                    {item.humidity}%
                  </td>

                  <td style={{ ...tdStyle, color: getValueColor(item.waterFlow, "flow") }}>
                    {item.waterFlow} L/min
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function getValueColor(value, type) {
  if (value === undefined || value === null) return "#94a3b8";

  if (type === "water") {
    if (value >= 250) return "#ef4444";
    if (value >= 150) return "#f59e0b";
    return "#22c55e";
  }

  if (type === "rain") {
    if (value >= 120) return "#ef4444";
    if (value >= 60) return "#f59e0b";
    return "#22c55e";
  }

  if (type === "flow") {
    if (value >= 180) return "#ef4444";
    if (value >= 90) return "#f59e0b";
    return "#22c55e";
  }

  if (type === "humidity") {
    if (value >= 85) return "#ef4444";
    if (value >= 70) return "#f59e0b";
    return "#22c55e";
  }

  if (type === "temp") {
    if (value <= 24 && value > 0) return "#f59e0b";
    return "#38bdf8";
  }

  return "#ffffff";
}

const cardStyle = {
  background: "linear-gradient(135deg, #1e293b, #0f172a)",
  border: "1px solid #8b5cf655",
  borderRadius: "18px",
  padding: "22px",
  marginTop: "22px",
  boxShadow: "0 0 25px #8b5cf622",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const badgeStyle = {
  backgroundColor: "#1e40af",
  color: "#bfdbfe",
  padding: "7px 12px",
  borderRadius: "999px",
  fontWeight: "bold",
  fontSize: "13px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "16px",
};

const thStyle = {
  textAlign: "left",
  padding: "13px",
  color: "#cbd5e1",
  borderBottom: "1px solid #334155",
};

const tdStyle = {
  padding: "13px",
  borderBottom: "1px solid #334155",
  fontWeight: "bold",
};