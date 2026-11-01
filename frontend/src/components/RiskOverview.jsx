export default function RiskOverview({ prediction }) {
  const risk = prediction?.risk || "SAFE";

  const color =
    risk === "DANGER"
      ? "#ef4444"
      : risk === "WARNING"
      ? "#f59e0b"
      : "#22c55e";

  return (
    <div style={{ ...cardStyle, border: `1px solid ${color}55` }}>
      <p style={eyebrowStyle}>RISK LEVEL OVERVIEW</p>

      <div style={contentStyle}>
        <div style={{ ...circleStyle, borderColor: color }}>
          <h2 style={{ color }}>{risk}</h2>
        </div>

        <div>
          <h2 style={{ color, marginBottom: "10px" }}>
            {risk === "DANGER"
              ? "Severe Flood Risk Detected"
              : risk === "WARNING"
              ? "Warning Level Detected"
              : "Safe Condition"}
          </h2>

          <p style={textStyle}>
            {risk === "DANGER"
              ? "AI has detected critical flood conditions from current sensor readings."
              : risk === "WARNING"
              ? "Sensor values indicate a developing flood-risk condition."
              : "All current sensor readings are within safe limits."}
          </p>

          <div
            style={{
              ...badgeStyle,
              color,
              border: `1px solid ${color}66`,
              backgroundColor: `${color}22`,
            }}
          >
            {risk === "DANGER"
              ? "Critical Conditions"
              : risk === "WARNING"
              ? "Monitor Closely"
              : "System Normal"}
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "linear-gradient(135deg, #1e293b, #0f172a)",
  borderRadius: "22px",
  padding: "26px",
  boxShadow: "0 0 30px rgba(0,0,0,0.3)",
};

const eyebrowStyle = {
  color: "#cbd5e1",
  letterSpacing: "2px",
  fontWeight: "900",
  margin: 0,
};

const contentStyle = {
  display: "flex",
  alignItems: "center",
  gap: "28px",
  marginTop: "25px",
};

const circleStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  border: "8px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const textStyle = {
  color: "#cbd5e1",
  fontSize: "17px",
  lineHeight: "1.6",
};

const badgeStyle = {
  display: "inline-block",
  padding: "10px 16px",
  borderRadius: "999px",
  fontWeight: "900",
  marginTop: "12px",
};