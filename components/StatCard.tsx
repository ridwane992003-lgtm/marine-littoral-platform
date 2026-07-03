type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
};

function StatCard({ title, value, subtitle, change }: StatCardProps) {
  return (
    <div className="p-4 border rounded shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      {change && (
        <span
          className={`text-xs ${
            change.startsWith("+") ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>
      )}
    </div>
  );
}

export default StatCard;
