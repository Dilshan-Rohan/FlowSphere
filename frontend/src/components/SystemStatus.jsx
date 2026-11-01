export default function SystemStatus() {
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <h2>🖥️ System Status</h2>

      <p>🟢 Backend API: Online</p>
      <p>🟢 AI Model: Active</p>
      <p>🟡 Sensors: Waiting for Connection</p>
      <p>🟢 Database: Connected</p>
      <p>🕒 Last Update: 10:45 AM</p>
    </div>
  );
}