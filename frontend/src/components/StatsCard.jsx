function StatsCard({ stats }) {
  const cards = [
    {
      label: "Total Tasks",
      value: stats.total || 0,
      variant: "info",
      icon: "◈",
    },
    {
      label: "Completed",
      value: stats.completed || 0,
      variant: "success",
      icon: "✓",
    },
    {
      label: "Pending",
      value: stats.pending || 0,
      variant: "warning",
      icon: "◷",
    },
    {
      label: "Overdue",
      value: stats.overdue || 0,
      variant: "danger",
      icon: "!",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map(({ label, value, variant, icon }) => (
        <div key={label} className={`stat-card ${variant}`}>
          <div className="stat-label">{label}</div>
          <div className="stat-value">{value}</div>
          <div className="stat-icon" aria-hidden="true">
            {icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCard;
