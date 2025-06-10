import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";
import { SeniorityDist } from "./types";
import { useTranslations } from "next-intl";

const COLORS = ["#14b8a6", "#60a5fa", "#eab308", "#f472b6", "#f87171", "#4ade80", "#a78bfa", "#facc15"];

interface AvgRole {
  role: string;
  avg: number;
  currency: string;
}
interface AvgCountry {
  country: string;
  avg: number;
  currency: string;
}

const chartTabs = [
  { key: "role", labelKey: "charts.avgByRole" },
  { key: "country", labelKey: "charts.avgByCountry" },
  { key: "seniority", labelKey: "charts.seniorityDist" },
] as const;

type TabKey = typeof chartTabs[number]["key"];

interface ChartTabsProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  avgPerRole: AvgRole[];
  avgPerCountry: AvgCountry[];
  seniorityDist: SeniorityDist[];
  currency: string;
}

function CustomBarChart({
  data,
  xKey,
  label,
  barColor,
  currency,
}: {
  data: AvgRole[] | AvgCountry[];
  xKey: string;
  label: string;
  barColor: string;
  currency: string;
}) {
  const t = useTranslations();
  if (!currency) {
    return (
      <div className="flex flex-1 items-center justify-center text-center text-gray-500 font-bold text-lg">
        {t("charts.selectCurrency")}
      </div>
    );
  }
  if (!data.length) {
    return (
      <div className="flex flex-1 items-center justify-center text-center text-gray-500 font-bold text-lg">
        {t("charts.noData")}
      </div>
    );
  }
  return (
    <>
      <h3 className="font-bold mb-2 text-gray-200 text-center uppercase text-sm tracking-widest">{label}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#232326" />
          <XAxis dataKey={xKey} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            wrapperClassName="!rounded-none !shadow-none"
            contentStyle={{ borderRadius: 0, fontSize: 13, background: "#232326", color: "#fff", border: "none" }}
            formatter={(value: string | number, _name: string, item: { payload?: { currency: string } }) =>
              `${value} ${item?.payload?.currency ?? 'USD'}`}
          />
          <Bar dataKey="avg" fill={barColor} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

function SeniorityChart({ data }: { data: SeniorityDist[] }) {
  const t = useTranslations();
  if (!data.length) {
    return (
      <div className="flex flex-1 items-center justify-center text-center text-gray-500 font-bold text-lg">
        {t('charts.noSeniority')}
      </div>
    );
  }
  return (
    <>
      <h3 className="font-bold mb-2 text-gray-200 text-center uppercase text-sm tracking-widest">{t('charts.seniorityDist')}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: "#fff" }} />
          <Tooltip
            wrapperClassName="!rounded-none !shadow-none"
            contentStyle={{ borderRadius: 0, fontSize: 13, background: "#232326", color: "#fff", border: "none" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export function ChartTabs({
  activeTab,
  setActiveTab,
  avgPerRole,
  avgPerCountry,
  seniorityDist,
  currency,
}: ChartTabsProps) {
  const t = useTranslations();
  return (
    <div className="w-full flex flex-col gap-3 mt-8">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10">
        {chartTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 font-bold border-b-2
              ${activeTab === tab.key
                ? "border-teal-400 text-white"
                : "border-transparent text-gray-500 hover:text-teal-400"}`}
            style={{ fontSize: 15, background: "none" }}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="bg-black/100 border border-white/10 rounded-none-2xl p-6 min-h-[350px] flex flex-col justify-between">
        {activeTab === "role" && (
          <CustomBarChart
            data={avgPerRole}
            xKey="role"
            label={t('charts.avgByRole')}
            barColor="#14b8a6"
            currency={currency}
          />
        )}
        {activeTab === "country" && (
          <CustomBarChart
            data={avgPerCountry}
            xKey="country"
            label={t('charts.avgByCountry')}
            barColor="#60a5fa"
            currency={currency}
          />
        )}
        {activeTab === "seniority" && <SeniorityChart data={seniorityDist} />}
      </div>
    </div>
  );
}