import { useEffect, useState } from "react";

export default function LiveSensorPanel() {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    loadSensorData();
    const interval = setInterval(loadSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadSensorData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/sensor-data");
      const data = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!sensorData) {
    return (
      <div style={cardStyle}>
        <h2>Sensor Control Panel</h2>
        <p>Loading sensor values...</p>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div>
          <p style={eyebrowStyle}>SENSOR CONTROL PANEL</p>

          <h2 style={titleStyle}>
            Real-time Flood Monitoring Network
          </h2>

          <p style={subtitleStyle}>
            Live environmental sensor monitoring for AI flood prediction
          </p>
        </div>

        <div style={liveBadge}>
          <span style={liveDot}></span>
          LIVE
        </div>
      </div>

      <div style={panelStyle}>
        <SensorRow
          label="Water Level"
          value={sensorData.waterLevel}
          unit="cm"
          max={500}
          warning={150}
          danger={250}
        />

        <SensorRow
          label="Rainfall"
          value={sensorData.rainfall}
          unit="mm"
          max={200}
          warning={60}
          danger={120}
        />

        <SensorRow
          label="Temperature"
          value={sensorData.temperature}
          unit="°C"
          max={45}
          warning={35}
          danger={40}
        />

        <SensorRow
          label="Humidity"
          value={sensorData.humidity}
          unit="%"
          max={100}
          warning={70}
          danger={85}
        />

        <SensorRow
          label="Water Flow"
          value={sensorData.waterFlow}
          unit="L/min"
          max={300}
          warning={90}
          danger={180}
        />
      </div>
    </div>
  );
}

function SensorRow({ label, value, unit, max, warning, danger }) {
  const numericValue = Number(value || 0);
  const percentage = Math.min((numericValue / max) * 100, 100);

  let status = "SAFE";
  let color = "#22c55e";

  if (numericValue >= warning) {
    status = "WARNING";
    color = "#f59e0b";
  }

  if (numericValue >= danger) {
    status = "DANGER";
    color = "#ef4444";
  }

  return (
    <div style={rowStyle}>
      <div style={leftSection}>
        <div
          style={{
            ...indicatorStyle,
            backgroundColor: `${color}22`,
            border: `1px solid ${color}66`,
            boxShadow: `0 0 18px ${color}33`,
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: color,
              boxShadow: `0 0 12px ${color}`,
              display: "block",
            }}
          ></span>
        </div>

        <div>
          <p style={labelStyle}>{label}</p>
          <h3 style={valueStyle}>
            {numericValue} <span style={unitStyle}>{unit}</span>
          </h3>
        </div>
      </div>

      <div style={barSection}>
        <div style={barBackground}>
          <div
            style={{
              ...barFill,
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${color}, ${color}aa)`,
              boxShadow: `0 0 16px ${color}66`,
            }}
          ></div>
        </div>
      </div>

      <div
        style={{
          ...statusBadge,
          backgroundColor: `${color}22`,
          color,
          border: `1px solid ${color}66`,
        }}
      >
        {status}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "linear-gradient(135deg, #1e293b, #0f172a)",
  border: "1px solid #38bdf855",
  borderRadius: "22px",
  padding: "26px",
  boxShadow: "0 0 30px #38bdf822",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  marginBottom: "24px",
};

const eyebrowStyle = {
  margin: 0,
  color: "#38bdf8",
  fontSize: "12px",
  letterSpacing: "3px",
  fontWeight: "800",
};

const titleStyle = {
  margin: "6px 0",
  fontSize: "30px",
  fontWeight: "900",
  color: "#ffffff",
};

const subtitleStyle = {
  margin: 0,
  color: "#94a3b8",
  fontSize: "15px",
};

const liveBadge = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "#052e16",
  border: "1px solid #22c55e55",
  padding: "10px 18px",
  borderRadius: "999px",
  color: "#22c55e",
  fontWeight: "800",
  boxShadow: "0 0 15px rgba(34,197,94,.25)",
};

const liveDot = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  background: "#22c55e",
  boxShadow: "0 0 10px #22c55e",
};

const panelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "220px 1fr 110px",
  alignItems: "center",
  gap: "18px",
  backgroundColor: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "16px",
  padding: "16px",
};

const leftSection = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const indicatorStyle = {
  width: "44px",
  height: "44px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const labelStyle = {
  margin: 0,
  color: "#94a3b8",
  fontSize: "14px",
  fontWeight: "700",
};

const valueStyle = {
  margin: "4px 0 0",
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "900",
};

const unitStyle = {
  color: "#94a3b8",
  fontSize: "15px",
};

const barSection = {
  width: "100%",
};

const barBackground = {
  width: "100%",
  height: "12px",
  backgroundColor: "#334155",
  borderRadius: "999px",
  overflow: "hidden",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
  transition: "width 0.5s ease",
};

const statusBadge = {
  textAlign: "center",
  padding: "8px 12px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "900",
};