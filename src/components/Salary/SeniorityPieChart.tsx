import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

export interface SeniorityDistData {
  name: string;
  value: number;
}

const COLORS = ["#14b8a6", "#60a5fa", "#eab308", "#f472b6"];

interface SeniorityPieChartProps {
  data: SeniorityDistData[];
}

export function SeniorityPieChart({ data }: SeniorityPieChartProps) {
  return (
    <>
      <h3 className="font-black mb-2 text-yellow-300 text-center uppercase text-sm tracking-widest">
        Distribución de seniorities
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, percent }) => (
              <text
                x={0}
                y={0}
                fill="#fff"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: 12, fontWeight: "bold" }}
              >
                {name} {percent ? `(${(percent * 100).toFixed(0)}%)` : ""}
              </text>
            )}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: "#fff" }} />
          <Tooltip
            wrapperClassName="!rounded !shadow-none"
            contentStyle={{
              borderRadius: 0,
              fontSize: 13,
              background: "#232326",
              color: "#fff",
              border: "none"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}