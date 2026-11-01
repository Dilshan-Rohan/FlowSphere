export default function About() {
  return (
    <div style={{ padding: "30px" }}>
      <div style={heroStyle}>
        <p style={eyebrowStyle}>PROJECT OVERVIEW</p>
        <h1 style={titleStyle}>FlowSphere</h1>
        <p style={subtitleStyle}>
          An AI-based smart flood monitoring and early warning system designed
          to collect sensor data, predict flood risk, visualize trends, and send
          emergency alerts through Telegram.
        </p>
      </div>

      <div style={gridStyle}>
        <InfoCard
          title="Project Purpose"
          text="FlowSphere helps monitor rainfall, water level, river flow, and drainage overflow to identify possible flood-risk situations early."
        />

        <InfoCard
          title="AI Prediction"
          text="A Random Forest machine learning model predicts flood risk as LOW, MODERATE, or HIGH using live environmental parameters."
        />

        <InfoCard
          title="IoT Integration"
          text="The backend is ready to receive ESP32 sensor readings through FastAPI and store them directly in MongoDB."
        />
      </div>

      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Core Features</h2>

        <div style={featureGrid}>
          <Feature text="Real-time water level monitoring" />
          <Feature text="Rainfall intensity tracking" />
          <Feature text="MongoDB sensor history storage" />
          <Feature text="Random Forest flood risk prediction" />
          <Feature text="Live analytics dashboard" />
          <Feature text="Telegram emergency alerts" />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitle}>System Architecture</h2>

        <div style={flowStyle}>
          <FlowBox text="ESP32 Sensors" />
          <Arrow />
          <FlowBox text="FastAPI Backend" />
          <Arrow />
          <FlowBox text="MongoDB" />
          <Arrow />
          <FlowBox text="Random Forest AI" />
          <Arrow />
          <FlowBox text="React Dashboard" />
          <Arrow />
          <FlowBox text="Telegram Alerts" />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Technology Stack</h2>

        <div style={stackGrid}>
          <Stack name="React.js" />
          <Stack name="FastAPI" />
          <Stack name="MongoDB" />
          <Stack name="Python" />
          <Stack name="Random Forest" />
          <Stack name="Telegram Bot API" />
          <Stack name="ESP32" />
          <Stack name="Recharts" />
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div style={infoCard}>
      <h2>{title}</h2>
      <p style={{ color: "#cbd5e1", lineHeight: "1.6" }}>{text}</p>
    </div>
  );
}

function Feature({ text }) {
  return <div style={featureStyle}>✓ {text}</div>;
}

function FlowBox({ text }) {
  return <div style={flowBox}>{text}</div>;
}

function Arrow() {
  return <span style={arrowStyle}>→</span>;
}

function Stack({ name }) {
  return <div style={stackStyle}>{name}</div>;
}

const heroStyle = {
  marginBottom: "30px",
  padding: "30px",
  borderRadius: "24px",
  background:
    "linear-gradient(135deg, rgba(56,189,248,0.16), rgba(37,99,235,0.08))",
  border: "1px solid rgba(56,189,248,0.3)",
  boxShadow: "0 0 35px rgba(56,189,248,0.15)",
};

const eyebrowStyle = {
  color: "#38bdf8",
  letterSpacing: "3px",
  fontSize: "13px",
  fontWeight: "800",
  margin: 0,
};

const titleStyle = {
  fontSize: "56px",
  margin: "8px 0",
  fontWeight: "900",
  letterSpacing: "-1px",
  color: "#38bdf8",
  textShadow: "0 0 18px rgba(56,189,248,0.45)",
};

const subtitleStyle = {
  color: "#cbd5e1",
  fontSize: "18px",
  lineHeight: "1.7",
  maxWidth: "950px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "22px",
};

const infoCard = {
  background: "linear-gradient(135deg, #1e293b, #0f172a)",
  border: "1px solid #38bdf855",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 0 25px #38bdf822",
};

const sectionStyle = {
  background: "linear-gradient(135deg, #1e293b, #0f172a)",
  border: "1px solid #334155",
  borderRadius: "20px",
  padding: "24px",
  marginTop: "24px",
};

const sectionTitle = {
  marginTop: 0,
  marginBottom: "18px",
};

const featureGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "14px",
};

const featureStyle = {
  backgroundColor: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "14px",
  padding: "15px",
  color: "#dbeafe",
  fontWeight: "700",
};

const flowStyle = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
};

const flowBox = {
  backgroundColor: "#0f172a",
  border: "1px solid #38bdf855",
  color: "#e0f2fe",
  padding: "14px 16px",
  borderRadius: "14px",
  fontWeight: "800",
};

const arrowStyle = {
  color: "#38bdf8",
  fontSize: "24px",
  fontWeight: "900",
};

const stackGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "14px",
};

const stackStyle = {
  backgroundColor: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "14px",
  padding: "16px",
  textAlign: "center",
  fontWeight: "800",
  color: "#bfdbfe",
};