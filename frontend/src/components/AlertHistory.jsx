export default function AlertHistory() {
  return (
    <div style={cardStyle}>
      <h2>🚨 Recent Alerts</h2>

      <AlertRow type="HIGH RISK" message="Flood Warning Issued" color="#ef4444" />
      <AlertRow type="HIGH RISK" message="River levels are critically high" color="#f97316" />
      <AlertRow type="MODERATE RISK" message="Rainfall intensity increasing" color="#f59e0b" />
      <AlertRow type="LOW RISK" message="Conditions normal" color="#22c55e" />
    </div>
  );
}

function AlertRow({ type, message, color }) {
  return (
    <div
      style={{
        ...rowStyle,
        borderLeft: `5px solid ${color}`,
      }}
    >
      <div>
        <h3 style={{ color, margin: 0 }}>{type}</h3>
        <p style={{ margin: "6px 0 0", color: "#cbd5e1" }}>{message}</p>
      </div>
      <span style={{ color: "#94a3b8" }}>Now</span>
    </div>
  );
}

const cardStyle = {
  background: "linear-gradient(135deg, #1e293b, #0f172a)",
  border: "1px solid #f9731655",
  borderRadius: "18px",
  padding: "22px",
  marginTop: "22px",
  boxShadow: "0 0 25px #f9731622",
};

const rowStyle = {
  backgroundColor: "#0f172a",
  borderRadius: "12px",
  padding: "15px",
  marginTop: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};