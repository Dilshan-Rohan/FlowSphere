export default function StatCard({ title, value, icon, color, subtitle }) {
  return (
    <div
      className="stat-card"
      style={{
        border: `1px solid ${color}55`,
      }}
    >
      <p className="stat-card-header">{title}</p>

      <div className="stat-card-main">
        <h1 className="stat-card-value">{value}</h1>

        <div
          className="stat-card-icon"
          style={{
            backgroundColor: `${color}22`,
          }}
        >
          {icon}
        </div>
      </div>

      <p
        className="stat-card-subtitle"
        style={{
          color,
        }}
      >
        {subtitle}
      </p>

      <div
        className="stat-card-line"
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
}