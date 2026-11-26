import { useState } from 'react';
import {
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
  MINISTRY_OUTLAY_COMPARISON,
  UNION_BUDGET_YEARS,
  type BudgetSlice,
} from '../data/extendedModulesData';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const TAX_PRESETS = [50000, 100000, 250000, 500000];

export default function BudgetExplorerSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [selectedYear, setSelectedYear] = useState(
    UNION_BUDGET_YEARS[0].fiscalYear
  );
  const [activeFlow, setActiveFlow] = useState<'goesTo' | 'comesFrom'>(
    'goesTo'
  );
  const [selectedSliceLabel, setSelectedSliceLabel] = useState<string>(
    UNION_BUDGET_YEARS[0].rupeeGoesTo[0].label
  );
  const [taxInput, setTaxInput] = useState<number>(100000);

  const budget =
    UNION_BUDGET_YEARS.find((y) => y.fiscalYear === selectedYear) ??
    UNION_BUDGET_YEARS[0];

  const activeSlices: BudgetSlice[] =
    activeFlow === 'goesTo' ? budget.rupeeGoesTo : budget.rupeeComesFrom;

  const activeSlice =
    activeSlices.find((s) => s.label === selectedSliceLabel) ?? activeSlices[0];

  const handleFlowSwitch = (flow: 'goesTo' | 'comesFrom') => {
    setActiveFlow(flow);
    const nextList =
      flow === 'goesTo' ? budget.rupeeGoesTo : budget.rupeeComesFrom;
    setSelectedSliceLabel(nextList[0].label);
  };

  return (
    <section
      id="budget-explorer"
      className="py-14 lg:py-20 bg-white dark:bg-[#111827] border-t border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.sections.budgetKicker}
            </div>
            <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
              {t.sections.budgetTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {t.sections.budgetSubtitle}
            </p>
          </div>

          {/* Budget Fiscal Year Switcher */}
          <div
            role="tablist"
            aria-label="Select Union Budget year"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 w-fit"
          >
            {UNION_BUDGET_YEARS.map((item) => {
              const isSelected = item.fiscalYear === budget.fiscalYear;
              return (
                <button
                  key={item.fiscalYear}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedYear(item.fiscalYear);
                    const nextList =
                      activeFlow === 'goesTo'
                        ? item.rupeeGoesTo
                        : item.rupeeComesFrom;
                    setSelectedSliceLabel(nextList[0].label);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget Headline Strip */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl bg-[#F8FAFC] dark:bg-[#162033]">
          <div className="p-4 sm:p-5">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Total Union Expenditure
            </div>
            <div className="mt-1 font-mono text-2xl font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
              ₹{budget.totalExpenditureLakhCr.toFixed(2)} Lakh Cr
            </div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              {budget.label}
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Non-Debt Receipts
            </div>
            <div className="mt-1 font-mono text-2xl font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
              ₹{budget.nonDebtReceiptsLakhCr.toFixed(2)} Lakh Cr
            </div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Tax + Non-Tax + Non-Debt Capital
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Target Fiscal Deficit
            </div>
            <div className="mt-1 font-mono text-2xl font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
              {budget.fiscalDeficitPct.toFixed(1)}% of GDP
            </div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Source: Ministry of Finance / PIB
            </div>
          </div>
        </div>

        {/* Row 1: Rupee Comes From / Goes To + Personal Tax Rupee Breakdown */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Rupee Paise Explorer (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
                  {activeFlow === 'goesTo'
                    ? 'Where Every Rupee Goes (100 Paise)'
                    : 'Where Every Rupee Comes From (100 Paise)'}
                </h3>

                <div className="inline-flex items-center p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg">
                  <button
                    type="button"
                    onClick={() => handleFlowSwitch('goesTo')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeFlow === 'goesTo'
                        ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    Rupee Goes To
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFlowSwitch('comesFrom')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeFlow === 'comesFrom'
                        ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    Rupee Comes From
                  </button>
                </div>
              </div>

              {/* Interactive Paise Bars */}
              <div className="space-y-2.5">
                {activeSlices.map((slice) => {
                  const isSelected = slice.label === activeSlice.label;
                  const barColor =
                    isDark && slice.color === '#1E3A8A'
                      ? '#3B82F6'
                      : slice.color;
                  return (
                    <button
                      key={slice.label}
                      type="button"
                      onClick={() => setSelectedSliceLabel(slice.label)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-white dark:bg-[#111827] ring-1 ring-slate-300 dark:ring-slate-600 shadow-xs'
                          : 'hover:bg-white/70 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 text-xs mb-1.5">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {slice.label}
                        </span>
                        <span className="font-mono font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
                          {slice.paise} paise ({slice.paise}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700/80 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-transform duration-300 origin-left"
                          style={{
                            backgroundColor: barColor,
                            transform: `scaleX(${slice.paise / 28})`,
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                {activeSlice.label} — {activeSlice.paise} paise per ₹1
              </div>
              <p className="mt-1 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeSlice.detail}
              </p>
              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                Source: {budget.source}
              </div>
            </div>
          </div>

          {/* Personal Tax Rupee Calculator (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
                Your Tax Rupee Breakdown ({budget.label})
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Enter an annual tax contribution to see how every rupee maps to
                official Union Budget expenditure proportions.
              </p>

              <div className="mt-4">
                <label
                  htmlFor="tax-simulator-input"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Annual Tax Amount (₹)
                </label>
                <input
                  id="tax-simulator-input"
                  type="number"
                  min={1000}
                  max={100000000}
                  step={5000}
                  value={taxInput}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setTaxInput(Number.isFinite(val) && val >= 0 ? val : 0);
                  }}
                  className="w-full px-3.5 py-2 font-mono text-sm font-semibold tabular-nums bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#60A5FA] focus:bg-white dark:focus:bg-[#0F172A]"
                />

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {TAX_PRESETS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTaxInput(amt)}
                      className={`px-2.5 py-1 text-xs font-mono tabular-nums rounded-md border transition-colors cursor-pointer ${
                        taxInput === amt
                          ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white border-[#1E3A8A] dark:border-[#2563EB]'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 divide-y divide-slate-200 dark:divide-slate-800 border-t border-slate-200 dark:border-slate-800">
                {budget.rupeeGoesTo.slice(0, 7).map((item) => {
                  const rupees = Math.round((taxInput * item.paise) / 100);
                  return (
                    <div
                      key={item.label}
                      className="py-2.5 flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="text-slate-700 dark:text-slate-300">
                        {item.label}
                      </span>
                      <span className="font-mono font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
                        ₹{rupees.toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Proportional illustration calculated strictly from official Union
              Budget expenditure shares ({budget.label}).
            </div>
          </div>
        </div>

        {/* Row 2: Major Ministry Outlays FY15 vs FY26 vs FY27 */}
        <div className="mt-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
            <div>
              <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
                Key Ministry Budget Allocations: FY 2014–15 vs. FY 2025–26 vs. FY 2026–27 (₹ Lakh Crore)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Official Union Budget estimates (BE) across major defence,
                infrastructure, and social ministries.
              </p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Source: Ministry of Finance / PIB / PRS
            </span>
          </div>

          <div className="w-full h-[290px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MINISTRY_OUTLAY_COMPARISON}
                margin={{ top: 8, right: 16, left: 4, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#1E293B' : '#E2E8F0'}
                  vertical={false}
                />
                <XAxis
                  dataKey="ministry"
                  tick={{ fill: isDark ? '#94A3B8' : '#334155', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: isDark ? '#334155' : '#CBD5E1' }}
                />
                <YAxis
                  tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={48}
                />
                <Tooltip
                  formatter={(value) => [
                    `₹${Number(value ?? 0).toFixed(2)} Lakh Cr`,
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
                <Bar
                  dataKey="fy15"
                  name="FY 2014–15"
                  fill={isDark ? '#64748B' : '#94A3B8'}
                  radius={[3, 3, 0, 0]}
                  maxBarSize={24}
                />
                <Bar
                  dataKey="fy26"
                  name="FY 2025–26 (BE)"
                  fill={isDark ? '#14B8A6' : '#0F766E'}
                  radius={[3, 3, 0, 0]}
                  maxBarSize={24}
                />
                <Bar
                  dataKey="fy27"
                  name="FY 2026–27 (BE)"
                  fill={isDark ? '#3B82F6' : '#1E3A8A'}
                  radius={[3, 3, 0, 0]}
                  maxBarSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
