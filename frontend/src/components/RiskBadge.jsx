export default function RiskBadge({ risk }) {
  let color = "#22c55e";
  let icon = "🟢";
  let message = "All sensor readings are within the safe operating range.";

  if (risk === "WARNING") {
    color = "#f59e0b";
    icon = "🟡";
    message =
      "Abnormal sensor values detected. Continue monitoring the situation.";
  }

  if (risk === "DANGER") {
    color = "#ef4444";
    icon = "🔴";
    message =
      "Critical flood conditions detected. Immediate action is recommended.";
  }

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        borderRadius: "18px",
        padding: "18px 24px",
        color: "white",
        boxShadow: `0 0 20px ${color}55`,
        border: `1px solid ${color}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div style={{ fontSize: "34px" }}>{icon}</div>

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "800",
            }}
          >
            {risk}
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#f8fafc",
              opacity: 0.95,
            }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}