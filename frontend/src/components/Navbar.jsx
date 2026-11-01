import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={navStyle}>
        <button onClick={() => setOpen(true)} style={menuButton}>
          ☰
        </button>

        <div style={brandStyle}>
          <div style={logoStyle}>
            <span style={logoWave}>∿</span>
          </div>
          <h2 style={brandText}>FlowSphere</h2>
        </div>
      </nav>

      <div
        onClick={() => setOpen(false)}
        style={{
          ...overlayStyle,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      <div
        style={{
          ...sidebarStyle,
          transform: open ? "translateX(0)" : "translateX(-110%)",
        }}
      >
        <div style={sidebarHeader}>
          <div style={brandStyle}>
            <div style={logoStyle}>
              <span style={logoWave}>∿</span>
            </div>
            <h2 style={brandText}>FlowSphere</h2>
          </div>

          <button onClick={() => setOpen(false)} style={closeButton}>
            ✕
          </button>
        </div>

        <div style={linkContainer}>
          <Link to="/" onClick={() => setOpen(false)} style={linkStyle}>
            Dashboard
          </Link>
          <Link to="/analytics" onClick={() => setOpen(false)} style={linkStyle}>
            Analytics
          </Link>
          <Link to="/alerts" onClick={() => setOpen(false)} style={linkStyle}>
            Alerts
          </Link>
          <Link to="/about" onClick={() => setOpen(false)} style={linkStyle}>
            About
          </Link>
        </div>
      </div>
    </>
  );
}

const navStyle = {
  backgroundColor: "#0f172a",
  padding: "18px 25px",
  display: "flex",
  alignItems: "center",
  gap: "18px",
  borderBottom: "1px solid #334155",
};

const menuButton = {
  background: "#1e293b",
  border: "1px solid #334155",
  color: "white",
  fontSize: "24px",
  cursor: "pointer",
  width: "46px",
  height: "46px",
  borderRadius: "14px",
};

const brandStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const logoStyle = {
  width: "46px",
  height: "46px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #38bdf8, #2563eb)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 25px rgba(56, 189, 248, 0.35)",
};

const logoWave = {
  color: "white",
  fontSize: "34px",
  fontWeight: "900",
  transform: "rotate(-12deg)",
};

const brandText = {
  margin: 0,
  fontSize: "30px",
  fontWeight: "900",
  letterSpacing: "0.5px",
  color: "#ffffff",
  fontFamily: "'Trebuchet MS', 'Arial Rounded MT Bold', 'Arial', sans-serif",
  textShadow: "0 0 18px rgba(56, 189, 248, 0.35)",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.55)",
  zIndex: 998,
  transition: "opacity 0.3s ease",
};

const sidebarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "300px",
  height: "100vh",
  background: "linear-gradient(180deg, #0f172a, #020617)",
  padding: "25px",
  zIndex: 999,
  boxShadow: "8px 0 30px rgba(0,0,0,0.45)",
  borderRight: "1px solid #334155",
  transition: "transform 0.35s ease",
};

const sidebarHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "35px",
};

const closeButton = {
  background: "#1e293b",
  border: "1px solid #334155",
  color: "white",
  fontSize: "20px",
  cursor: "pointer",
  width: "42px",
  height: "42px",
  borderRadius: "12px",
};

const linkContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "700",
  padding: "15px 16px",
  borderRadius: "14px",
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
};