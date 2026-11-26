import { useMemo, useState } from 'react';
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
  calculateNewRegimeFY26,
  calculateOldRegimeFY26,
} from '../data/advancedModulesData';
import { useTheme } from '../context/ThemeContext';

function formatInr(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export default function TaxSubsidyCalculatorSection() {
  const { isDark } = useTheme();

  // Income & Tax Inputs
  const [grossIncome, setGrossIncome] = useState<number>(1250000);
  const [isSalaried, setIsSalaried] = useState<boolean>(true);
  const [ageBracket, setAgeBracket] = useState<
    'below60' | 'senior' | 'superSenior'
  >('below60');
  const [sec80C, setSec80C] = useState<number>(150000);
  const [sec80D, setSec80D] = useState<number>(25000);
  const [hraOrHomeLoan, setHraOrHomeLoan] = useState<number>(120000);
  const [nps80CCD1B, setNps80CCD1B] = useState<number>(0);

  // Household Benefit / Subsidy Toggles
  const [solarKw, setSolarKw] = useState<0 | 1 | 2 | 3>(2);
  const [isFarmerPmKisan, setIsFarmerPmKisan] = useState<boolean>(false);
  const [isUjjwala, setIsUjjwala] = useState<boolean>(false);
  const [hasAyushman, setHasAyushman] = useState<boolean>(true);
  const [hasSenior70, setHasSenior70] = useState<boolean>(false);

  const newRegime = useMemo(
    () => calculateNewRegimeFY26(grossIncome, isSalaried),
    [grossIncome, isSalaried]
  );

  const oldRegime = useMemo(
    () =>
      calculateOldRegimeFY26(grossIncome, isSalaried, ageBracket, {
        sec80C,
        sec80D,
        hraOrHomeLoan,
        nps80CCD1B,
      }),
    [grossIncome, isSalaried, ageBracket, sec80C, sec80D, hraOrHomeLoan, nps80CCD1B]
  );

  const taxDifference = oldRegime.totalTax - newRegime.totalTax;
  const recommendedRegime =
    taxDifference > 0 ? 'New Tax Regime' : taxDifference < 0 ? 'Old Tax Regime' : 'Identical Liability';
  const savingsAmount = Math.abs(taxDifference);

  // Household Subsidies & Benefits Calculation
  const subsidies = useMemo(() => {
    const solarCapitalSubsidy =
      solarKw === 1 ? 30000 : solarKw === 2 ? 60000 : solarKw === 3 ? 78000 : 0;
    // Avg rooftop solar output ~1,300 kWh/kW/yr at ~₹7/unit saving
    const solarAnnualBillSaving = solarKw * 1300 * 7;
    const pmKisanAnnual = isFarmerPmKisan ? 6000 : 0;
    const ujjwalaAnnual = isUjjwala ? 3600 : 0; // ₹300 × up to 12 refills
    const annualDirectSavings =
      solarAnnualBillSaving + pmKisanAnnual + ujjwalaAnnual;
    const healthCoverCap =
      hasAyushman || hasSenior70 ? 500000 : 0;

    return {
      solarCapitalSubsidy,
      solarAnnualBillSaving,
      pmKisanAnnual,
      ujjwalaAnnual,
      annualDirectSavings,
      healthCoverCap,
    };
  }, [solarKw, isFarmerPmKisan, isUjjwala, hasAyushman, hasSenior70]);

  const chartData = [
    { name: 'New Regime (FY26)', tax: newRegime.totalTax },
    { name: 'Old Regime (with Deductions)', tax: oldRegime.totalTax },
  ];

  const incomePresets = [
    { label: '₹7.5L', value: 750000 },
    { label: '₹12.75L', value: 1275000 },
    { label: '₹18L', value: 1800000 },
    { label: '₹25L', value: 2500000 },
    { label: '₹35L', value: 3500000 },
  ];

  return (
    <section
      id="tax-calculator"
      className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Personal Finance & Direct Benefit Estimator · Union Budget FY 2025–26 (AY 2026–27) · MNRE · MoHFW
        </div>
        <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
          Income Tax Regime & Household Subsidy Calculator
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Compare your exact annual tax outgo under Bharat’s revised FY 2025–26 New Tax Regime (with zero tax up to ₹12.75 Lakh for salaried taxpayers via Section 87A rebate) against the Old Regime with deductions, and estimate household savings from central schemes.
        </p>
      </div>

      {/* Main 2-Column Interactive Layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Citizen Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <label
                  htmlFor="gross-income-input"
                  className="text-sm font-semibold text-slate-900 dark:text-slate-100"
                >
                  Annual Gross Income
                </label>
                <span className="font-mono text-base font-bold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                  {formatInr(grossIncome)}
                </span>
              </div>

              <input
                id="gross-income-slider"
                type="range"
                min={300000}
                max={5000000}
                step={25000}
                value={Math.min(5000000, grossIncome)}
                onChange={(e) => setGrossIncome(Number(e.target.value))}
                className="mt-3 w-full accent-[#1E3A8A] dark:accent-[#3B82F6] cursor-pointer"
              />

              <div className="mt-2 flex items-center gap-2">
                <input
                  id="gross-income-input"
                  type="number"
                  min={0}
                  max={100000000}
                  step={10000}
                  value={grossIncome}
                  onChange={(e) =>
                    setGrossIncome(Math.max(0, Number(e.target.value) || 0))
                  }
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50"
                />
              </div>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {incomePresets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setGrossIncome(p.value)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-colors cursor-pointer ${
                      grossIncome === p.value
                        ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white border-[#1E3A8A]'
                        : 'bg-[#F8FAFC] dark:bg-[#162033] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#1E3A8A]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Taxpayer Profile */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                  Employment Type
                </div>
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setIsSalaried(true)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      isSalaried
                        ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Salaried
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSalaried(false)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      !isSalaried
                        ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Business
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="age-bracket-select"
                  className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
                >
                  Age Bracket (Old Regime)
                </label>
                <select
                  id="age-bracket-select"
                  value={ageBracket}
                  onChange={(e) =>
                    setAgeBracket(
                      e.target.value as 'below60' | 'senior' | 'superSenior'
                    )
                  }
                  className="w-full px-2.5 py-2 text-xs font-medium bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50"
                >
                  <option value="below60">Below 60 Years</option>
                  <option value="senior">Senior (60–79 Yrs)</option>
                  <option value="superSenior">Super Senior (80+)</option>
                </select>
              </div>
            </div>

            {/* Old Regime Deductions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                Old Regime Deductions (Ignored under New Regime)
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="sec80c-input"
                    className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1"
                  >
                    Sec 80C (PF/ELSS, max ₹1.5L)
                  </label>
                  <input
                    id="sec80c-input"
                    type="number"
                    min={0}
                    max={150000}
                    step={10000}
                    value={sec80C}
                    onChange={(e) =>
                      setSec80C(Math.min(150000, Math.max(0, Number(e.target.value) || 0)))
                    }
                    className="w-full px-2.5 py-1.5 text-xs font-mono tabular-nums bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sec80d-input"
                    className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1"
                  >
                    Sec 80D Health Ins. (max ₹1L)
                  </label>
                  <input
                    id="sec80d-input"
                    type="number"
                    min={0}
                    max={100000}
                    step={5000}
                    value={sec80D}
                    onChange={(e) =>
                      setSec80D(Math.min(100000, Math.max(0, Number(e.target.value) || 0)))
                    }
                    className="w-full px-2.5 py-1.5 text-xs font-mono tabular-nums bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hra-loan-input"
                    className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1"
                  >
                    HRA + Home Loan Sec 24(b)
                  </label>
                  <input
                    id="hra-loan-input"
                    type="number"
                    min={0}
                    max={1000000}
                    step={10000}
                    value={hraOrHomeLoan}
                    onChange={(e) =>
                      setHraOrHomeLoan(Math.max(0, Number(e.target.value) || 0))
                    }
                    className="w-full px-2.5 py-1.5 text-xs font-mono tabular-nums bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="nps-input"
                    className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1"
                  >
                    NPS 80CCD(1B) (max ₹50k)
                  </label>
                  <input
                    id="nps-input"
                    type="number"
                    min={0}
                    max={50000}
                    step={5000}
                    value={nps80CCD1B}
                    onChange={(e) =>
                      setNps80CCD1B(
                        Math.min(50000, Math.max(0, Number(e.target.value) || 0))
                      )
                    }
                    className="w-full px-2.5 py-1.5 text-xs font-mono tabular-nums bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Household Scheme Benefit Selector */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                Household Scheme Benefit Estimator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Select applicable schemes to calculate direct subsidies & annual household savings
              </p>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                PM Surya Ghar Rooftop Solar Capacity
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {([0, 1, 2, 3] as const).map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => setSolarKw(kw)}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      solarKw === kw
                        ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white border-[#1E3A8A]'
                        : 'bg-[#F8FAFC] dark:bg-[#162033] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {kw === 0 ? 'None' : `${kw} kW${kw === 3 ? '+' : ''}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              {[
                {
                  id: 'pm-kisan',
                  checked: isFarmerPmKisan,
                  onChange: setIsFarmerPmKisan,
                  label: 'PM-KISAN Landholding Farmer Family',
                  detail: '₹6,000 / year direct bank transfer',
                },
                {
                  id: 'ujjwala',
                  checked: isUjjwala,
                  onChange: setIsUjjwala,
                  label: 'PMUY Ujjwala LPG Beneficiary',
                  detail: '₹300 / cylinder DBT (up to ₹3,600 / yr)',
                },
                {
                  id: 'ayushman',
                  checked: hasAyushman,
                  onChange: setHasAyushman,
                  label: 'Ayushman Bharat PM-JAY Eligible Family',
                  detail: '₹5 Lakh / year cashless hospital cover',
                },
                {
                  id: 'senior-70',
                  checked: hasSenior70,
                  onChange: setHasSenior70,
                  label: 'Senior Citizen Aged 70+ in Household',
                  detail: 'Universal ₹5 Lakh Ayushman Vaya Vandana cover',
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={opt.checked}
                    onChange={(e) => opt.onChange(e.target.checked)}
                    className="mt-0.5 accent-[#1E3A8A] dark:accent-[#3B82F6]"
                  />
                  <div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {opt.label}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {opt.detail}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Comparison Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Headline Verdict Strip */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Lower Tax Liability for {formatInr(grossIncome)} Annual Income
                </div>
                <div className="mt-1 font-serif text-xl sm:text-2xl font-semibold text-slate-950 dark:text-slate-50">
                  {recommendedRegime}
                  {savingsAmount > 0 && (
                    <span className="ml-2 font-mono text-lg text-emerald-700 dark:text-emerald-400 tabular-nums">
                      saves {formatInr(savingsAmount)}/yr
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Best Effective Tax Rate
                </div>
                <div className="font-mono text-xl font-bold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                  {Math.min(
                    newRegime.effectiveRatePct,
                    oldRegime.effectiveRatePct
                  )}
                  %
                </div>
              </div>
            </div>

            {/* Side-by-Side Tax Breakdown Table */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  title: 'New Tax Regime (FY 2025–26)',
                  subtitle: 'Section 115BAC · Default Regime',
                  data: newRegime,
                  isWinner: taxDifference >= 0,
                },
                {
                  title: 'Old Tax Regime',
                  subtitle: 'With 80C / 80D / HRA / NPS Deductions',
                  data: oldRegime,
                  isWinner: taxDifference < 0,
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`p-4 rounded-xl border ${
                    card.isWinner
                      ? 'bg-[#1E3A8A]/5 dark:bg-[#2563EB]/10 border-[#1E3A8A]/40 dark:border-[#60A5FA]/40'
                      : 'bg-[#F8FAFC] dark:bg-[#162033] border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                        {card.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {card.subtitle}
                      </div>
                    </div>
                    {card.isWinner && (
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                        Lower Tax
                      </span>
                    )}
                  </div>

                  <dl className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-slate-600 dark:text-slate-400">
                        Standard Deduction
                      </dt>
                      <dd className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                        −{formatInr(card.data.standardDeduction)}
                      </dd>
                    </div>
                    {card.data.otherDeductions > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-slate-600 dark:text-slate-400">
                          Chapter VI-A / HRA
                        </dt>
                        <dd className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                          −{formatInr(card.data.otherDeductions)}
                        </dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-slate-600 dark:text-slate-400">
                        Taxable Income
                      </dt>
                      <dd className="font-mono font-semibold tabular-nums text-slate-950 dark:text-slate-50">
                        {formatInr(card.data.taxableIncome)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-600 dark:text-slate-400">
                        Slab Tax
                      </dt>
                      <dd className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                        {formatInr(card.data.slabTax)}
                      </dd>
                    </div>
                    {card.data.rebate87A > 0 && (
                      <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                        <dt>Section 87A Rebate</dt>
                        <dd className="font-mono tabular-nums">
                          −{formatInr(card.data.rebate87A)}
                        </dd>
                      </div>
                    )}
                    {card.data.marginalRelief > 0 && (
                      <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                        <dt>Marginal Relief</dt>
                        <dd className="font-mono tabular-nums">
                          −{formatInr(card.data.marginalRelief)}
                        </dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-slate-600 dark:text-slate-400">
                        4% Health & Education Cess
                      </dt>
                      <dd className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                        {formatInr(card.data.cess)}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-2.5 border-t border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-950 dark:text-white">
                      <dt>Total Annual Tax</dt>
                      <dd className="font-mono tabular-nums">
                        {formatInr(card.data.totalTax)}
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            {/* Visual Tax Comparison Chart */}
            <div className="mt-6 h-[190px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 4, right: 28, left: 10, bottom: 4 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#1E293B' : '#E2E8F0'}
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tickFormatter={(v) => `₹${(Number(v) / 1000).toFixed(0)}k`}
                    tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={165}
                    tick={{ fill: isDark ? '#CBD5E1' : '#334155', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(val) => [formatInr(Number(val ?? 0)), 'Annual Tax']}
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#FFFFFF',
                    }}
                  />
                  <Bar
                    dataKey="tax"
                    fill={isDark ? '#3B82F6' : '#1E3A8A'}
                    radius={[0, 6, 6, 0]}
                    maxBarSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Household Subsidy & Welfare Value Summary */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
                Estimated Central Scheme Benefits & Direct Subsidies
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Indicative official norms · Subject to scheme eligibility
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  One-Time Capital Subsidy
                </div>
                <div className="mt-1 font-mono text-xl font-bold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                  {formatInr(subsidies.solarCapitalSubsidy)}
                </div>
                <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  PM Surya Ghar ({solarKw} kW rooftop solar)
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Recurring Annual Savings / DBT
                </div>
                <div className="mt-1 font-mono text-xl font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                  {formatInr(subsidies.annualDirectSavings)}/yr
                </div>
                <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Solar bills + PM-KISAN + Ujjwala DBT
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Annual Cashless Health Cover
                </div>
                <div className="mt-1 font-mono text-xl font-bold text-slate-950 dark:text-slate-50 tabular-nums">
                  {subsidies.healthCoverCap > 0
                    ? formatInr(subsidies.healthCoverCap)
                    : 'Not selected'}
                </div>
                <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Ayushman Bharat PM-JAY / Senior 70+
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Note: Tax figures apply standard FY 2025–26 Finance Act resident slabs excluding special-rate capital gains or surcharges above ₹50 Lakh. Verify exact filing obligations on{' '}
              <a
                href="https://www.incometax.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E3A8A] dark:text-[#60A5FA] hover:underline font-medium"
              >
                incometax.gov.in
              </a>{' '}
              and rooftop solar applications on{' '}
              <a
                href="https://pmsuryaghar.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E3A8A] dark:text-[#60A5FA] hover:underline font-medium"
              >
                pmsuryaghar.gov.in
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
