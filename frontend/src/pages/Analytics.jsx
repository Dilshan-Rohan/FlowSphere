import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadHistory();
    const interval = setInterval(loadHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadHistory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/sensor-history");
      const data = await response.json();

      const formattedData = data.reverse().map((item, index) => ({
        time: `Record ${index + 1}`,
        waterLevel: item.waterLevel,
        rainfall: item.rainfall,
        temperature: item.temperature,
        humidity: item.humidity,
        waterFlow: item.waterFlow,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <div style={heroStyle}>
        <p style={eyebrowStyle}>SENSOR ANALYTICS</p>
        <h1 style={titleStyle}>Live Data Trends</h1>
        <p style={subtitleStyle}>
          Graphical analysis of readings received from ESP32 sensor nodes.
        </p>
      </div>

      <ChartCard title="Water Level Trend" dataKey="waterLevel" />
      <ChartCard title="Rainfall Trend" dataKey="rainfall" />
      <ChartCard title="Temperature Trend" dataKey="temperature" />
      <ChartCard title="Humidity Trend" dataKey="humidity" />
      <ChartCard title="Water Flow Trend" dataKey="waterFlow" />
    </div>
  );

  function ChartCard({ title, dataKey }) {
    return (
      <div style={cardStyle}>
        <h2>{title}</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke="#38bdf8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const heroStyle = {
  marginBottom: "30px",
  padding: "28px",
  borderRadius: "24px",
  background: "linear-gradient(135deg, rgba(56,189,248,0.16), rgba(37,99,235,0.08))",
  border: "1px solid rgba(56,189,248,0.3)",
};

const eyebrowStyle = {
  color: "#38bdf8",
  letterSpacing: "3px",
  fontSize: "13px",
  fontWeight: "800",
  margin: 0,
};

const titleStyle = {
  fontSize: "48px",
  margin: "8px 0",
  fontWeight: "900",
};

const subtitleStyle = {
  color: "#cbd5e1",
  fontSize: "17px",
};

const cardStyle = {
  background: "linear-gradient(135deg, #1e293b, #0f172a)",
  padding: "22px",
  borderRadius: "18px",
  marginTop: "22px",
  border: "1px solid #38bdf855",
  boxShadow: "0 0 25px #38bdf822",
};