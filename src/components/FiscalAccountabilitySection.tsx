import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ExternalLink } from 'lucide-react';
import {
  ACCOUNTABILITY_REVIEWS,
  FISCAL_DEFICIT_SERIES,
  INFLATION_SERIES,
} from '../data/extendedModulesData';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function FiscalAccountabilitySection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [activeChart, setActiveChart] = useState<'fiscal' | 'inflation'>(
    'fiscal'
  );

  return (
    <section
      id="fiscal-accountability"
      className="py-14 lg:py-20 bg-white dark:bg-[#111827] border-t border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.sections.fiscalKicker}
            </div>
            <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
              {t.sections.fiscalTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {t.sections.fiscalSubtitle}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Switch macroeconomic oversight view"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 w-fit"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeChart === 'fiscal'}
              onClick={() => setActiveChart('fiscal')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeChart === 'fiscal'
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Fiscal Deficit &amp; Debt
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeChart === 'inflation'}
              onClick={() => setActiveChart('inflation')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeChart === 'inflation'
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Headline vs. Food Inflation
            </button>
          </div>
        </div>

        {/* Main Row: Interactive Fiscal/Inflation Chart (7 cols) + Key Fiscal Targets (5 cols) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="mb-5">
                <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
                  {activeChart === 'fiscal'
                    ? 'Central Fiscal Deficit (% of GDP) — FY15 to FY27 BE'
                    : 'Retail CPI vs. Food Inflation (CFPI %) vs. RBI 6% Upper Limit'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {activeChart === 'fiscal'
                    ? 'Post-pandemic fiscal consolidation from 9.2% (FY21) toward 4.3% (FY27 BE); general govt debt hovers near 81%–84% of GDP.'
                    : 'RBI’s statutory flexible inflation target is 4% (±2%). Food price volatility periodically exceeds headline CPI.'}
                </p>
              </div>

              <div className="w-full h-[290px]">
                <ResponsiveContainer width="100%" height="100%">
                  {activeChart === 'fiscal' ? (
                    <AreaChart
                      data={FISCAL_DEFICIT_SERIES}
                      margin={{ top: 10, right: 16, left: 0, bottom: 4 }}
                    >
                      <defs>
                        <linearGradient
                          id="grad-fiscal"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={isDark ? '#60A5FA' : '#1E3A8A'}
                            stopOpacity={0.26}
                          />
                          <stop
                            offset="95%"
                            stopColor={isDark ? '#60A5FA' : '#1E3A8A'}
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                      </defs>
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
                        unit="%"
                        tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        width={46}
                      />
                      <Tooltip
                        formatter={(val, name) => [
                          `${Number(val ?? 0).toFixed(1)}% of GDP`,
                          String(name ?? ''),
                        ]}
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: '#FFFFFF',
                        }}
                      />
                      <ReferenceLine
                        y={4.5}
                        stroke="#64748B"
                        strokeDasharray="4 4"
                        label={{
                          value: '4.5% Benchmark',
                          position: 'insideTopRight',
                          fill: isDark ? '#94A3B8' : '#475569',
                          fontSize: 11,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="fiscalDeficitPct"
                        name="Central Fiscal Deficit"
                        stroke={isDark ? '#60A5FA' : '#1E3A8A'}
                        strokeWidth={2.5}
                        fill="url(#grad-fiscal)"
                      />
                    </AreaChart>
                  ) : (
                    <LineChart
                      data={INFLATION_SERIES}
                      margin={{ top: 10, right: 16, left: 0, bottom: 4 }}
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
                        unit="%"
                        tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        width={46}
                      />
                      <Tooltip
                        formatter={(val, name) => [
                          `${Number(val ?? 0).toFixed(1)}%`,
                          String(name ?? ''),
                        ]}
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: '#FFFFFF',
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <ReferenceLine
                        y={6}
                        stroke="#EF4444"
                        strokeDasharray="4 4"
                        label={{
                          value: 'RBI 6% Upper Band',
                          position: 'insideTopRight',
                          fill: isDark ? '#F87171' : '#B91C1C',
                          fontSize: 11,
                        }}
                      />
                      <ReferenceLine
                        y={4}
                        stroke="#64748B"
                        strokeDasharray="3 3"
                      />
                      <Line
                        type="monotone"
                        dataKey="headlineCpi"
                        name="Headline CPI"
                        stroke={isDark ? '#60A5FA' : '#1E3A8A'}
                        strokeWidth={2.5}
                        dot={{ r: 3.5, fill: isDark ? '#60A5FA' : '#1E3A8A' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="foodInflation"
                        name="Food Inflation (CFPI)"
                        stroke="#F59E0B"
                        strokeWidth={2.25}
                        dot={{ r: 3.5, fill: '#F59E0B' }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
              Sources: Ministry of Finance (Union Budget), Reserve Bank of Bharat
              (RBI), MoSPI
            </div>
          </div>

          {/* Right: Institutional Audit & Oversight Observations (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                Public Audit &amp; Parliamentary Oversight
              </div>

              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {ACCOUNTABILITY_REVIEWS.map((review) => (
                  <div
                    key={review.institution}
                    className="py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                        {review.institution}
                      </h3>
                      <a
                        href={review.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E3A8A] dark:text-[#60A5FA] hover:underline whitespace-nowrap"
                      >
                        <span>Reports</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </div>
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                      {review.topic}
                    </div>
                    <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {review.finding}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-slate-500 dark:text-slate-400">
                  General Govt. Debt
                </div>
                <div className="font-mono text-base font-semibold text-slate-950 dark:text-slate-50 tabular-nums mt-0.5">
                  ~81%–84% GDP
                </div>
              </div>
              <div>
                <div className="text-slate-500 dark:text-slate-400">
                  FY31 Central Debt Goal
                </div>
                <div className="font-mono text-base font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums mt-0.5">
                  50% (±1%) GDP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
