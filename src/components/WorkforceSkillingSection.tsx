import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ExternalLink } from 'lucide-react';
import {
  EPFO_PAYROLL_SERIES,
  LABOUR_INDEPENDENT_REVIEWS,
  PLFS_ANNUAL_SERIES,
  SKILLING_OUTCOMES,
} from '../data/citizenModulesData';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function WorkforceSkillingSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [chartView, setChartView] = useState<'plfs' | 'epfo'>('plfs');

  return (
    <section
      id="workforce-skilling"
      className="py-14 lg:py-20 bg-white dark:bg-[#111827] border-t border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.sections.workforceKicker}
            </div>
            <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
              {t.sections.workforceTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {t.sections.workforceSubtitle}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Switch workforce dataset"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 w-fit"
          >
            <button
              type="button"
              role="tab"
              aria-selected={chartView === 'plfs'}
              onClick={() => setChartView('plfs')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                chartView === 'plfs'
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              PLFS Labour Trends
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={chartView === 'epfo'}
              onClick={() => setChartView('epfo')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                chartView === 'epfo'
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              EPFO Formal Payrolls
            </button>
          </div>
        </div>

        {/* 4-column Workforce Headline Strip */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl bg-[#F8FAFC] dark:bg-[#162033]">
          <div className="p-5">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Unemployment Rate (Usual Status)
            </div>
            <div className="mt-1 font-mono text-2xl font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
              3.2%
            </div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              Down from 6.1% (2017–18) · Age 15+
            </div>
            <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Source: MoSPI PLFS Annual
            </div>
          </div>

          <div className="p-5">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Female Labour Participation
            </div>
            <div className="mt-1 font-mono text-2xl font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
              41.7%
            </div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              Up from 23.3% (2017–18) · Rural-led
            </div>
            <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Source: MoSPI PLFS Annual
            </div>
          </div>

          <div className="p-5">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              EPFO Net Formal Additions
            </div>
            <div className="mt-1 font-mono text-2xl font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
              1.3–1.5 Cr/yr
            </div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              Up from 0.61 Cr (FY19) · Monthly peaks 20L+
            </div>
            <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Source: EPFO / Ministry of Labour
            </div>
          </div>

          <div className="p-5">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Skill Bharat / PMKVY Trained
            </div>
            <div className="mt-1 font-mono text-2xl font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
              1.42+ Cr
            </div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              PMKVY 1.0–4.0 · AI, Green &amp; ITI tracks
            </div>
            <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Source: MSDE / PIB
            </div>
          </div>
        </div>

        {/* Main Grid: Chart + Skilling (7 cols) & Independent Labour Assessments (5 cols) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="mb-5">
                <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
                  {chartView === 'plfs'
                    ? 'PLFS Annual Trends: Unemployment Rate, Female LFPR & WPR (%)'
                    : 'EPFO Annual Net Formal Payroll Additions (Crore Members)'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {chartView === 'plfs'
                    ? 'Usual status (ps+ss) for persons aged 15+; current weekly status (CWS) urban/monthly rates typically read higher (~5.1%–5.5%).'
                    : 'Formal provident-fund payroll net additions compiled from EPFO monthly releases (FY19–FY26 provisional).'}
                </p>
              </div>

              <div className="w-full h-[270px]">
                <ResponsiveContainer width="100%" height="100%">
                  {chartView === 'plfs' ? (
                    <LineChart
                      data={PLFS_ANNUAL_SERIES}
                      margin={{ top: 8, right: 16, left: 0, bottom: 4 }}
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
                        width={44}
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
                      <Line
                        type="monotone"
                        dataKey="wprPct"
                        name="Worker Population Ratio"
                        stroke={isDark ? '#60A5FA' : '#1E3A8A'}
                        strokeWidth={2.5}
                        dot={{ r: 3.5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="femaleLfprPct"
                        name="Female LFPR"
                        stroke={isDark ? '#2DD4BF' : '#0F766E'}
                        strokeWidth={2.5}
                        dot={{ r: 3.5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="unemploymentPct"
                        name="Unemployment Rate"
                        stroke="#DC2626"
                        strokeWidth={2.25}
                        dot={{ r: 3.5 }}
                      />
                    </LineChart>
                  ) : (
                    <BarChart
                      data={EPFO_PAYROLL_SERIES}
                      margin={{ top: 8, right: 16, left: 0, bottom: 4 }}
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
                        width={42}
                      />
                      <Tooltip
                        formatter={(val) => [
                          `${Number(val ?? 0).toFixed(2)} Crore`,
                          'Net Formal Additions',
                        ]}
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: '#FFFFFF',
                        }}
                      />
                      <Bar
                        dataKey="netAdditionsCrore"
                        name="EPFO Net Additions (Cr)"
                        fill={isDark ? '#3B82F6' : '#1E3A8A'}
                        radius={[4, 4, 0, 0]}
                        maxBarSize={42}
                      />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            {/* Skilling Highlights Band */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SKILLING_OUTCOMES.map((item) => (
                <div key={item.program} className="text-xs">
                  <div className="font-semibold text-slate-950 dark:text-slate-50">
                    {item.program}
                  </div>
                  <div className="font-mono text-[11px] font-semibold text-[#1E3A8A] dark:text-[#60A5FA] mt-0.5 tabular-nums">
                    {item.metric}
                  </div>
                  <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.detail}
                  </p>
                  <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    {item.agency}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Independent Labour Market Evaluations */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                Independent Labour &amp; Skilling Analysis (ILO / IMF / Audits)
              </div>

              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {LABOUR_INDEPENDENT_REVIEWS.map((review) => (
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
                        <span>Reference</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </div>
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                      {review.report}
                    </div>
                    <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {review.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              Methodology Note: PLFS Usual Status (ps+ss) counts anyone employed for ≥30 days in a year; quarterly CWS and ILO analyses provide complementary views on underemployment and youth job quality.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
