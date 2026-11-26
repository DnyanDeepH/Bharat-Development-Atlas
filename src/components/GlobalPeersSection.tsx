import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GLOBAL_PEER_BENCHMARKS } from '../data/citizenModulesData';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';

type PeerMetricKey =
  | 'realGdpGrowthPct'
  | 'gdpPerCapitaNominalUsd'
  | 'gdpPerCapitaPppUsd'
  | 'cleanElectricitySharePct'
  | 'hdiScore';

const METRIC_META: Record<
  PeerMetricKey,
  {
    label: string;
    shortLabel: string;
    unit: string;
    source: string;
    format: (v: number) => string;
  }
> = {
  realGdpGrowthPct: {
    label: 'Projected Real GDP Growth (2025–26)',
    shortLabel: 'GDP Growth %',
    unit: '%',
    source: 'IMF World Economic Outlook (WEO)',
    format: (v) => `${v.toFixed(1)}%`,
  },
  gdpPerCapitaNominalUsd: {
    label: 'GDP per Capita (Nominal USD)',
    shortLabel: 'Per Capita (USD)',
    unit: 'USD',
    source: 'IMF WEO / World Bank (2026 est.)',
    format: (v) => `$${v.toLocaleString('en-US')}`,
  },
  gdpPerCapitaPppUsd: {
    label: 'GDP per Capita (PPP Intl. $)',
    shortLabel: 'Per Capita (PPP)',
    unit: 'Intl. $',
    source: 'IMF WEO / World Bank (2026 est.)',
    format: (v) => `$${v.toLocaleString('en-US')}`,
  },
  cleanElectricitySharePct: {
    label: 'Clean & Renewable Electricity Share',
    shortLabel: 'Clean Power %',
    unit: '%',
    source: 'Ember Global Electricity Review / IRENA',
    format: (v) => `${v}%`,
  },
  hdiScore: {
    label: 'Human Development Index (0–1 Scale)',
    shortLabel: 'UNDP HDI',
    unit: 'Index',
    source: 'UNDP Human Development Report 2025',
    format: (v) => v.toFixed(3),
  },
};

export default function GlobalPeersSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [metric, setMetric] = useState<PeerMetricKey>('realGdpGrowthPct');

  const meta = METRIC_META[metric];

  const chartData = [...GLOBAL_PEER_BENCHMARKS]
    .sort((a, b) => b[metric] - a[metric])
    .map((item) => ({
      id: item.id,
      economy: item.economy,
      value: item[metric],
    }));

  return (
    <section
      id="global-peers"
      className="py-14 lg:py-20 bg-white dark:bg-[#111827] border-t border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.sections.globalPeersKicker}
            </div>
            <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
              {t.sections.globalPeersTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {t.sections.globalPeersSubtitle}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Select global comparison metric"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit"
          >
            {(Object.keys(METRIC_META) as PeerMetricKey[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={metric === key}
                onClick={() => setMetric(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  metric === key
                    ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {METRIC_META[key].shortLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Chart (6 cols) + Balanced Comparative Reading (6 cols) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between gap-2 mb-5">
                <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
                  {meta.label}
                </h3>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Bharat highlighted
                </span>
              </div>

              <div className="w-full h-[290px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 4, right: 24, left: 6, bottom: 4 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? '#1E293B' : '#E2E8F0'}
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 11 }}
                      tickLine={false}
                      axisLine={{ stroke: isDark ? '#334155' : '#CBD5E1' }}
                    />
                    <YAxis
                      type="category"
                      dataKey="economy"
                      width={108}
                      tick={{ fill: isDark ? '#E2E8F0' : '#334155', fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: isDark ? '#1E293B' : '#E2E8F0' }}
                      formatter={(val) => [
                        meta.format(Number(val ?? 0)),
                        meta.shortLabel,
                      ]}
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
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                      {chartData.map((entry) => (
                        <Cell
                          key={entry.id}
                          fill={
                            entry.id === 'india'
                              ? isDark
                                ? '#60A5FA'
                                : '#1E3A8A'
                              : isDark
                                ? '#475569'
                                : '#94A3B8'
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
              Source: <span className="font-medium text-slate-700 dark:text-slate-200">{meta.source}</span>
            </div>
          </div>

          {/* Right: 6-Economy Comparative Matrix */}
          <div className="lg:col-span-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[520px] text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] dark:bg-[#162033] border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <th className="py-3 pl-5 pr-2 font-semibold">Economy</th>
                    <th className="py-3 px-2 text-right font-semibold">Growth</th>
                    <th className="py-3 px-2 text-right font-semibold">Per Capita</th>
                    <th className="py-3 px-2 text-right font-semibold">Clean Power</th>
                    <th className="py-3 pl-2 pr-5 text-right font-semibold">HDI (2025)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {GLOBAL_PEER_BENCHMARKS.map((row) => {
                    const isIndia = row.id === 'india';
                    return (
                      <tr
                        key={row.id}
                        className={
                          isIndia
                            ? 'bg-blue-50/70 dark:bg-blue-950/30 font-semibold'
                            : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                        }
                      >
                        <td className="py-3 pl-5 pr-2 text-slate-950 dark:text-slate-50">
                          <div>{row.economy}</div>
                          <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                            ${row.nominalGdpTrillionUsd}T GDP
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right font-mono tabular-nums text-[#1E3A8A] dark:text-[#60A5FA]">
                          {row.realGdpGrowthPct.toFixed(1)}%
                        </td>
                        <td className="py-3 px-2 text-right font-mono tabular-nums text-slate-900 dark:text-slate-100">
                          ${row.gdpPerCapitaNominalUsd.toLocaleString('en-US')}
                        </td>
                        <td className="py-3 px-2 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                          {row.cleanElectricitySharePct}%
                        </td>
                        <td className="py-3 pl-2 pr-5 text-right font-mono tabular-nums text-slate-900 dark:text-slate-100">
                          <div>{row.hdiScore.toFixed(3)}</div>
                          <div className="text-[10px] font-sans font-normal text-slate-500 dark:text-slate-400">
                            {row.hdiTier}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-[#F8FAFC] dark:bg-[#162033] border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Global Benchmark Takeaway:{' '}
              </span>
              Bharat leads all major economies in headline GDP expansion (~7.0% IMF WEO) and total GDP scale ($4.06T), while Vietnam ($5,259), Indonesia ($5,153), and China ($15,371) illustrate the multi-decade per-capita income and HDI climb required to achieve upper-middle and high-income benchmarks by 2047.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
