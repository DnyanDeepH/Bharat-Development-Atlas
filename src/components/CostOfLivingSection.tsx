import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  COST_OF_LIVING_INDEX_SERIES,
  ESSENTIAL_ITEMS_LEDGER,
  HOUSEHOLD_PRESETS,
} from '../data/citizenModulesData';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function CostOfLivingSection() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [presetId, setPresetId] = useState<'rural' | 'tier2' | 'metro'>('tier2');
  const [petrolLitres, setPetrolLitres] = useState<number>(25);
  const [dataGb, setDataGb] = useState<number>(60);
  const [useUjjwalaSubsidy, setUseUjjwalaSubsidy] = useState<boolean>(false);

  const preset =
    HOUSEHOLD_PRESETS.find((p) => p.id === presetId) ?? HOUSEHOLD_PRESETS[1];

  const handlePresetChange = (id: 'rural' | 'tier2' | 'metro') => {
    const next = HOUSEHOLD_PRESETS.find((p) => p.id === id) ?? HOUSEHOLD_PRESETS[1];
    setPresetId(id);
    setPetrolLitres(next.petrolLitres);
    setDataGb(next.mobileDataGb);
    setUseUjjwalaSubsidy(next.isUjjwala);
  };

  // Compute monthly essential basket outlay in 2014 vs 2026
  const basketSummary = useMemo(() => {
    const food2014 =
      preset.riceKg * 27.5 +
      preset.attaKg * 24.0 +
      preset.dalKg * 78.0 +
      preset.milkLitres * 40.0;
    const food2026 =
      preset.riceKg * 48.25 +
      preset.attaKg * 38.28 +
      preset.dalKg * 136.66 +
      preset.milkLitres * 62.39;

    const lpgRate2026 = useUjjwalaSubsidy ? 642 : 942;
    const energy2014 = preset.lpgCylinders * 414 + petrolLitres * 71.5;
    const energy2026 = preset.lpgCylinders * lpgRate2026 + petrolLitres * 102.12;

    // In 2014 households used much less mobile data (~2 GB/mo) at ₹269/GB vs 2026 usage at ₹8.4/GB
    const telecom2014 = Math.min(dataGb, 2.5) * 269;
    const telecom2026 = dataGb * 8.4;

    const total2014 = Math.round(food2014 + energy2014 + telecom2014);
    const total2026 = Math.round(food2026 + energy2026 + telecom2026);

    // Monthly average per-capita NNI (MoSPI nominal)
    const monthlyPerCapita2014 = 86647 / 12;
    const monthlyPerCapita2026 = 211500 / 12;

    return {
      food2014: Math.round(food2014),
      food2026: Math.round(food2026),
      energy2014: Math.round(energy2014),
      energy2026: Math.round(energy2026),
      telecom2014: Math.round(telecom2014),
      telecom2026: Math.round(telecom2026),
      total2014,
      total2026,
      pctOfMonthlyNni2014: ((total2014 / monthlyPerCapita2014) * 100).toFixed(0),
      pctOfMonthlyNni2026: ((total2026 / monthlyPerCapita2026) * 100).toFixed(0),
    };
  }, [preset, petrolLitres, dataGb, useUjjwalaSubsidy]);

  return (
    <section
      id="cost-of-living"
      className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {t.sections.costLivingKicker}
        </div>
        <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
          {t.sections.costLivingTitle}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          {t.sections.costLivingSubtitle}
        </p>
      </div>

      {/* Top Row: Indexed Trajectory Chart (7 cols) + Interactive Monthly Basket Estimator (5 cols) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="mb-5">
              <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
                Purchasing Power vs. Everyday Prices (Index: 2014 = 100)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tracks nominal per-capita income growth against official food staples, retail fuel/LPG, and mobile data tariff per GB.
              </p>
            </div>

            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={COST_OF_LIVING_INDEX_SERIES}
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
                    tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    width={44}
                  />
                  <Tooltip
                    formatter={(val, name) => [
                      `${Number(val ?? 0).toFixed(1)} (2014 = 100)`,
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
                    dataKey="incomeIndex"
                    name="Per-Capita Income (MoSPI)"
                    stroke={isDark ? '#60A5FA' : '#1E3A8A'}
                    strokeWidth={2.75}
                    dot={{ r: 3.5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="foodBasketIndex"
                    name="Food Staples Basket (PMD)"
                    stroke="#D97706"
                    strokeWidth={2.25}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="fuelLpgIndex"
                    name="Fuel & LPG Composite (PPAC)"
                    stroke="#DC2626"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mobileDataIndex"
                    name="Mobile Data / GB (TRAI)"
                    stroke={isDark ? '#2DD4BF' : '#0F766E'}
                    strokeWidth={2.25}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            Note: While nominal per-capita income rose ~144% (index 244) and mobile data fell 97% (index 3.1), food staples (+69%) and unsubsidized LPG/fuel remain major household budget pressures for lower-income families.
          </div>
        </div>

        {/* Interactive Monthly Household Basket Estimator */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
              Interactive Monthly Essentials Estimator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Compare estimated monthly spend on staples, fuel, LPG &amp; mobile data (2014 vs. 2026 official averages).
            </p>

            {/* Household Preset Switcher */}
            <div className="mt-4 flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              {HOUSEHOLD_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePresetChange(p.id)}
                  className={`flex-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    presetId === p.id
                      ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {p.id === 'rural'
                    ? 'Rural'
                    : p.id === 'tier2'
                      ? 'Tier-2 City'
                      : 'Metro'}
                </button>
              ))}
            </div>

            {/* Sliders */}
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <label
                    htmlFor="petrol-slider"
                    className="font-medium text-slate-700 dark:text-slate-300"
                  >
                    Monthly Petrol Usage
                  </label>
                  <span className="font-mono font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
                    {petrolLitres} litres
                  </span>
                </div>
                <input
                  id="petrol-slider"
                  type="range"
                  min={5}
                  max={80}
                  step={5}
                  value={petrolLitres}
                  onChange={(e) => setPetrolLitres(Number(e.target.value))}
                  className="w-full accent-[#1E3A8A] dark:accent-[#60A5FA] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label
                    htmlFor="data-slider"
                    className="font-medium text-slate-700 dark:text-slate-300"
                  >
                    Monthly Family Mobile Data (2026)
                  </label>
                  <span className="font-mono font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
                    {dataGb} GB
                  </span>
                </div>
                <input
                  id="data-slider"
                  type="range"
                  min={15}
                  max={150}
                  step={15}
                  value={dataGb}
                  onChange={(e) => setDataGb(Number(e.target.value))}
                  className="w-full accent-[#1E3A8A] dark:accent-[#60A5FA] cursor-pointer"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={useUjjwalaSubsidy}
                  onChange={(e) => setUseUjjwalaSubsidy(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600 accent-[#1E3A8A]"
                />
                <span className="text-slate-700 dark:text-slate-300">
                  Apply PMUY Ujjwala LPG subsidy (₹300/cylinder in 2026)
                </span>
              </label>
            </div>

            {/* Comparison Breakdown */}
            <div className="mt-5 border-t border-slate-200 dark:border-slate-800 pt-4 divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              <div className="pb-2 flex justify-between font-semibold text-slate-500 dark:text-slate-400">
                <span>Monthly Basket Item</span>
                <div className="flex gap-6 font-mono">
                  <span className="w-16 text-right">2014</span>
                  <span className="w-16 text-right text-slate-950 dark:text-slate-50">
                    2026
                  </span>
                </div>
              </div>
              {[
                {
                  label: `Food Staples (${preset.riceKg}kg rice, ${preset.attaKg}kg atta, ${preset.dalKg}kg dal, ${preset.milkLitres}L milk)`,
                  v14: basketSummary.food2014,
                  v26: basketSummary.food2026,
                },
                {
                  label: `LPG & Petrol (${preset.lpgCylinders} cyl, ${petrolLitres}L)`,
                  v14: basketSummary.energy2014,
                  v26: basketSummary.energy2026,
                },
                {
                  label: 'Mobile Data (2.5 GB in 2014 vs selected GB)',
                  v14: basketSummary.telecom2014,
                  v26: basketSummary.telecom2026,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="py-2.5 flex items-center justify-between gap-2"
                >
                  <span className="text-slate-700 dark:text-slate-300">
                    {row.label}
                  </span>
                  <div className="flex gap-6 font-mono tabular-nums shrink-0">
                    <span className="w-16 text-right text-slate-600 dark:text-slate-400">
                      ₹{row.v14.toLocaleString('en-IN')}
                    </span>
                    <span className="w-16 text-right font-semibold text-slate-950 dark:text-slate-50">
                      ₹{row.v26.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-3 flex items-center justify-between font-semibold">
                <span className="text-slate-950 dark:text-slate-50">
                  Estimated Monthly Total
                </span>
                <div className="flex gap-6 font-mono tabular-nums">
                  <span className="w-16 text-right text-slate-700 dark:text-slate-300">
                    ₹{basketSummary.total2014.toLocaleString('en-IN')}
                  </span>
                  <span className="w-16 text-right text-[#1E3A8A] dark:text-[#60A5FA]">
                    ₹{basketSummary.total2026.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            Share of 1 earner’s average monthly per-capita NNI: ~
            <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
              {basketSummary.pctOfMonthlyNni2014}%
            </span>{' '}
            (2014) vs. ~
            <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
              {basketSummary.pctOfMonthlyNni2026}%
            </span>{' '}
            (2026). Illustrative average; actual rents &amp; state taxes vary.
          </div>
        </div>
      </div>

      {/* Bottom: Official Retail Price & Income Reference Table */}
      <div className="mt-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 bg-[#F8FAFC] dark:bg-[#162033] border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-50">
            Official Commodity, Energy, Telecom &amp; Income Ledger (2014–2026)
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Sources: Dept. of Consumer Affairs (PMD), PPAC, TRAI, MoSPI
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px] text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 bg-white dark:bg-[#111827]">
                <th className="py-3 pl-5 pr-3 font-semibold">Item &amp; Category</th>
                <th className="py-3 px-3 text-right font-semibold">2014</th>
                <th className="py-3 px-3 text-right font-semibold">2026 Latest</th>
                <th className="py-3 px-3 text-right font-semibold">Shift</th>
                <th className="py-3 px-3 font-semibold">Official Source &amp; Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {ESSENTIAL_ITEMS_LEDGER.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 pl-5 pr-3">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {row.item}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {row.category} · {row.unit}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {row.display2014}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-slate-950 dark:text-slate-50 whitespace-nowrap">
                    {row.display2026}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-[#1E3A8A] dark:text-[#60A5FA] whitespace-nowrap">
                    {row.pctChange}
                  </td>
                  <td className="py-3 px-3 pr-5 text-slate-600 dark:text-slate-300 max-w-md">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {row.source}:
                    </span>{' '}
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
