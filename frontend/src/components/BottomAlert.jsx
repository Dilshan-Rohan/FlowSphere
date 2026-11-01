export default function BottomAlert({ prediction }) {
  const risk = prediction?.risk || "SAFE";

  const color =
    risk === "DANGER"
      ? "#ef4444"
      : risk === "WARNING"
      ? "#f59e0b"
      : "#22c55e";

  return (
    <div style={{ ...alertStyle, border: `1px solid ${color}88` }}>
      <div style={leftStyle}>
        <div
          style={{
            ...iconStyle,
            color,
            border: `1px solid ${color}66`,
            boxShadow: `0 0 30px ${color}44`,
          }}
        >
          !
        </div>

        <div>
          <h2 style={{ color, margin: 0 }}>
            {risk === "DANGER"
              ? "DANGER: SEVERE FLOOD RISK"
              : risk === "WARNING"
              ? "WARNING: RISING FLOOD RISK"
              : "SAFE: NORMAL CONDITION"}
          </h2>

          <p style={descStyle}>
            {risk === "DANGER"
              ? "Critical flood conditions detected based on live sensor readings and AI analysis."
              : risk === "WARNING"
              ? "Sensor readings indicate abnormal conditions. Continue monitoring the system."
              : "All monitored parameters are currently within safe limits."}
          </p>
        </div>
      </div>

      <div style={actionsStyle}>
        <Action title="Stay Informed" text="Monitor live data and alerts." />
        <Action title="Prepare" text="Review safety plans." />
        <Action title="Take Action" text="Respond based on risk level." />
      </div>
    </div>
  );
}

function Action({ title, text }) {
  return (
    <div style={actionCard}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ margin: "8px 0 0", color: "#cbd5e1" }}>{text}</p>
    </div>
  );
}

const alertStyle = {
  marginTop: "24px",
  borderRadius: "22px",
  padding: "26px",
  background: "linear-gradient(135deg, rgba(127,29,29,0.35), #0f172a)",
  display: "grid",
  gridTemplateColumns: "1.1fr 1fr",
  gap: "25px",
  boxShadow: "0 0 35px rgba(239,68,68,0.16)",
};

const leftStyle = {
  display: "flex",
  gap: "22px",
  alignItems: "center",
};

const iconStyle = {
  width: "90px",
  height: "90px",
  borderRadius: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "52px",
  fontWeight: "900",
};

const descStyle = {
  color: "#cbd5e1",
  lineHeight: "1.6",
  fontSize: "16px",
};

const actionsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "14px",
};

const actionCard = {
  backgroundColor: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "16px",
  padding: "18px",
};