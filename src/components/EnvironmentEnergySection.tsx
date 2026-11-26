import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  CITY_AIR_QUALITY_DATA,
  CLEAN_ENERGY_MIX_SERIES,
  CLIMATE_INDEPENDENT_CONTEXT,
  ENVIRONMENT_PILLARS,
  EV_VAHAN_SERIES,
} from '../data/advancedModulesData';
import { useTheme } from '../context/ThemeContext';

export default function EnvironmentEnergySection() {
  const { isDark } = useTheme();
  const currentNonFossilGw = 256;
  const target2030Gw = 500;
  const targetProgressPct = Number(
    ((currentNonFossilGw / target2030Gw) * 100).toFixed(1)
  );

  return (
    <section
      id="environment-ev"
      className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Energy Transition & Ecological Benchmarks · MNRE · Vahan Portal · CPCB · Forest Survey of Bharat · NMCG
        </div>
        <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
          Environment, Clean Energy & EV Transition Tracker
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Monitor Bharat’s buildout toward 500 GW of non-fossil electricity by 2030, electric vehicle sales registered on the Vahan portal, urban PM2.5 air quality under NCAP, forest cover, and river basin rejuvenation alongside independent climate assessments.
        </p>
      </div>

      {/* 500 GW 2030 Progress Banner */}
      <div className="mt-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Panchamrit 2030 Non-Fossil Capacity Pledge (MNRE / CEA)
            </div>
            <div className="mt-1 font-serif text-xl font-semibold text-slate-950 dark:text-slate-50">
              256 GW Installed out of 500 GW 2030 Target
            </div>
          </div>
          <div className="font-mono text-lg font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
            {targetProgressPct}% Achieved · 244 GW Remaining
          </div>
        </div>
        <div className="mt-4 h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full"
            style={{ width: `${targetProgressPct}%` }}
          />
        </div>
        <div className="mt-2 flex flex-wrap justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>2014 Baseline: 75.5 GW (Solar 2.6 GW)</span>
          <span>2026 Current: Solar 132 GW · Wind 53.5 GW · Hydro/Nuclear/Bio 70.5 GW</span>
          <span>2030 Target: 500 GW</span>
        </div>
      </div>

      {/* 4 Environment Pillar Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ENVIRONMENT_PILLARS.map((item) => (
          <div
            key={item.title}
            className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {item.source}
              </div>
              <h3 className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-50">
                {item.title}
              </h3>
              <div className="mt-2 font-mono text-base font-bold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                {item.current}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Baseline: {item.baseline}
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row: Clean Energy Stacked Area + Vahan EV Adoption */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
              Non-Fossil Installed Capacity Mix (2014–2026, GW)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Source: Ministry of New & Renewable Energy (MNRE) & Central Electricity Authority
            </p>
          </div>
          <div className="w-full h-[270px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={CLEAN_ENERGY_MIX_SERIES}
                margin={{ top: 8, right: 14, left: 0, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#1E293B' : '#E2E8F0'}
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  tick={{ fill: isDark ? '#94A3B8' : '#334155', fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#FFFFFF',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area
                  type="monotone"
                  dataKey="hydroBioNuclearGw"
                  name="Hydro / Bio / Nuclear (GW)"
                  stackId="1"
                  stroke="#0F766E"
                  fill="#0F766E"
                  fillOpacity={0.35}
                />
                <Area
                  type="monotone"
                  dataKey="windGw"
                  name="Wind (GW)"
                  stackId="1"
                  stroke="#1E3A8A"
                  fill="#1E3A8A"
                  fillOpacity={0.45}
                />
                <Area
                  type="monotone"
                  dataKey="solarGw"
                  name="Solar (GW)"
                  stackId="1"
                  stroke="#D97706"
                  fill="#D97706"
                  fillOpacity={0.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
              Annual Electric Vehicle Registrations (Lakh Units)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Source: MoRTH Vahan Dashboard · Share of all vehicle sales rose from 0.5% to 8.2%
            </p>
          </div>
          <div className="w-full h-[270px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={EV_VAHAN_SERIES}
                margin={{ top: 8, right: 14, left: 0, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#1E293B' : '#E2E8F0'}
                  vertical={false}
                />
                <XAxis
                  dataKey="year"
                  tick={{ fill: isDark ? '#94A3B8' : '#334155', fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={42}
                />
                <Tooltip
                  formatter={(val) => [`${val} Lakh EVs`, 'Registrations']}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#FFFFFF',
                  }}
                />
                <Bar
                  dataKey="evRegistrationsLakh"
                  name="EV Sales (Lakh)"
                  fill={isDark ? '#10B981' : '#15803D'}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={38}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* City Air Quality (CPCB / NCAP) Table + Independent Context */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
              Major Metro Annual PM2.5 Trends (CPCB / NCAP)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Annual mean PM2.5 in µg/m³ · Bharat NAAQS annual safe limit: 40 µg/m³
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-[#162033] border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4 text-right">2018–19</th>
                  <th className="py-3 px-4 text-right">Recent Avg</th>
                  <th className="py-3 px-4 text-right">Shift</th>
                  <th className="py-3 px-4">Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {CITY_AIR_QUALITY_DATA.map((row) => (
                  <tr
                    key={row.city}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
                  >
                    <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {row.city}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                      {row.pm25Baseline2018}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold tabular-nums text-slate-950 dark:text-slate-50">
                      {row.pm25Recent}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                      {row.changePct}
                    </td>
                    <td className="py-2.5 px-4 text-xs text-slate-600 dark:text-slate-300">
                      {row.ncapStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
              Independent Climate & Transition Context
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Balanced scientific & energy-system caveats alongside official progress
            </p>
            <div className="mt-4 space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
              {CLIMATE_INDEPENDENT_CONTEXT.map((ctx) => (
                <div key={ctx.institution} className="pt-4 first:pt-0">
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {ctx.institution}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {ctx.finding}
                  </div>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ctx.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
