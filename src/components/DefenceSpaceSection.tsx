import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  DEFENCE_EXPORTS_SERIES,
  GLOBAL_TRADE_PACTS,
  ISRO_MISSIONS,
} from '../data/extendedModulesData';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function DefenceSpaceSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [defenceMetric, setDefenceMetric] = useState<'exports' | 'production'>(
    'exports'
  );

  return (
    <section
      id="defence-space"
      className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {t.sections.defenceKicker}
        </div>
        <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
          {t.sections.defenceTitle}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          {t.sections.defenceSubtitle}
        </p>
      </div>

      {/* Headline Strategic Strip */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#111827]">
        <div className="p-5">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Defence Exports (FY26)
          </div>
          <div className="mt-1 font-mono text-2xl font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
            ₹38,424 Cr
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Up from ₹686 Cr (FY14) · 80+ nations
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Source: MoD / PIB
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Indigenous Production
          </div>
          <div className="mt-1 font-mono text-2xl font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
            ₹1.78 Lakh Cr
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Up from ₹46,429 Cr (FY15)
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Source: MoD / PIB
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            RBI Forex Reserves
          </div>
          <div className="mt-1 font-mono text-2xl font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
            $700B+
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            ~11 months import cover · &gt;94% ext. debt
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Source: RBI / PIB
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Total Exports (FY26)
          </div>
          <div className="mt-1 font-mono text-2xl font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
            $863.1B
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Merchandise + Services · $135.4B remittances
          </div>
          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Source: Ministry of Commerce / PIB
          </div>
        </div>
      </div>

      {/* Main Grid: Defence Chart (7 cols) + ISRO Space Missions (5 cols) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
                  {defenceMetric === 'exports'
                    ? 'Bharat Defence Exports Trajectory (₹ Crore)'
                    : 'Indigenous Defence Production (₹ Lakh Crore)'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  FY 2013–14 to FY 2025–26 · ~76% Public Sector / ~24% Private Sector
                </p>
              </div>

              <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => setDefenceMetric('exports')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    defenceMetric === 'exports'
                      ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Exports (₹ Cr)
                </button>
                <button
                  type="button"
                  onClick={() => setDefenceMetric('production')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    defenceMetric === 'production'
                      ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  Production (₹L Cr)
                </button>
              </div>
            </div>

            <div className="w-full h-[270px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={DEFENCE_EXPORTS_SERIES}
                  margin={{ top: 8, right: 16, left: 4, bottom: 4 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#1E293B' : '#E2E8F0'}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: isDark ? '#334155' : '#CBD5E1' }}
                  />
                  <YAxis
                    tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    width={54}
                  />
                  <Tooltip
                    formatter={(val) => {
                      const num = Number(val ?? 0);
                      return defenceMetric === 'exports'
                        ? [`₹${num.toLocaleString('en-IN')} Cr`, 'Defence Exports']
                        : [`₹${num.toFixed(2)} Lakh Cr`, 'Domestic Production'];
                    }}
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#FFFFFF',
                    }}
                    itemStyle={{ color: '#FFFFFF' }}
                    labelStyle={{ color: '#CBD5E1' }}
                  />
                  <Bar
                    dataKey={
                      defenceMetric === 'exports'
                        ? 'exportsCr'
                        : 'productionLakhCr'
                    }
                    fill={
                      defenceMetric === 'exports'
                        ? isDark
                          ? '#3B82F6'
                          : '#1E3A8A'
                        : '#D97706'
                    }
                    radius={[4, 4, 0, 0]}
                    maxBarSize={44}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trade Agreements Sub-band */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
              Major Trade Agreements (38 Partner Nations Covered)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {GLOBAL_TRADE_PACTS.map((item) => (
                <div key={item.pact} className="text-xs">
                  <div className="font-semibold text-slate-950 dark:text-slate-50">
                    {item.pact}
                  </div>
                  <div className="font-mono text-[11px] text-[#1E3A8A] dark:text-[#60A5FA] font-medium mt-0.5 tabular-nums">
                    {item.metric}
                  </div>
                  <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.summary}
                  </p>
                  <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    Effective {item.effective}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ISRO Missions Ledger (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
              ISRO &amp; Bharat Space Roadmap
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {ISRO_MISSIONS.map((mission) => (
                <div key={mission.name} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                      {mission.name}
                    </h3>
                    <span className="font-mono text-[11px] font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                      {mission.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {mission.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            Attributed to: Department of Space / ISRO / PIB
          </div>
        </div>
      </div>
    </section>
  );
}
