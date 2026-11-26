import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ExternalLink } from 'lucide-react';
import {
  DPI_PILLARS,
  DPI_TRAJECTORY_SERIES,
} from '../data/advancedModulesData';
import { useTheme } from '../context/ThemeContext';

export default function DpiDashboardSection() {
  const { isDark } = useTheme();
  const [activePillarId, setActivePillarId] = useState<string>(DPI_PILLARS[0].id);
  const [chartMode, setChartMode] = useState<'upiVolume' | 'upiValue' | 'fastag'>(
    'upiVolume'
  );

  const activePillar =
    DPI_PILLARS.find((p) => p.id === activePillarId) ?? DPI_PILLARS[0];

  const chartConfig = {
    upiVolume: {
      title: 'UPI Annual Transaction Volume (Crore Transactions)',
      unit: 'Cr txns',
      dataKey: 'upiVolumeCr' as const,
      color: isDark ? '#60A5FA' : '#1E3A8A',
      source: 'NPCI Product Statistics (FY18 – FY26)',
    },
    upiValue: {
      title: 'UPI Annual Settlement Value (₹ Lakh Crore)',
      unit: '₹ Lakh Cr',
      dataKey: 'upiValueLakhCr' as const,
      color: isDark ? '#2DD4BF' : '#0F766E',
      source: 'NPCI / RBI Payment System Indicators',
    },
    fastag: {
      title: 'FASTag Annual Electronic Toll Transactions (Crore)',
      unit: 'Cr tolls',
      dataKey: 'fastagTxnsCr' as const,
      color: isDark ? '#F59E0B' : '#B45309',
      source: 'NPCI NETC / NHAI IHMCL',
    },
  };

  const activeChart = chartConfig[chartMode];

  return (
    <section
      id="dpi-dashboard"
      className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Bharat Stack & Open Digital Public Infrastructure · NPCI · UIDAI · MeitY · NHA · DPIIT
        </div>
        <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
          Digital Public Infrastructure (DPI) Scale Dashboard
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Explore the open, interoperable population-scale digital rails powering everyday payments, identity verification, paperless credentials, electronic tolling, health records, and open commerce across Bharat.
        </p>
      </div>

      {/* 6-Pillar KPI Grid (Interactive Selector) */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DPI_PILLARS.map((pillar) => {
          const isSelected = pillar.id === activePillar.id;
          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => setActivePillarId(pillar.id)}
              className={`text-left p-5 rounded-xl border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] ${
                isSelected
                  ? 'bg-[#1E3A8A]/6 dark:bg-[#2563EB]/14 border-[#1E3A8A] dark:border-[#60A5FA]'
                  : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{pillar.layer}</span>
                <span className="font-mono">Since {pillar.launchYear}</span>
              </div>
              <div className="mt-1.5 font-serif text-base font-semibold text-slate-950 dark:text-slate-50">
                {pillar.name}
              </div>
              <div className="mt-2 font-mono text-xl font-bold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                {pillar.headlineStat}
              </div>
              <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                {pillar.secondaryStat}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Split: Trajectory Chart + Selected Pillar Deep-Dive */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Chart Panel (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
                {activeChart.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Official Source: {activeChart.source}
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Select DPI trajectory chart"
              className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit shrink-0"
            >
              {(
                [
                  { id: 'upiVolume', label: 'UPI Volume' },
                  { id: 'upiValue', label: 'UPI Value' },
                  { id: 'fastag', label: 'FASTag Tolls' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={chartMode === tab.id}
                  onClick={() => setChartMode(tab.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    chartMode === tab.id
                      ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-[300px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              {chartMode === 'fastag' ? (
                <BarChart
                  data={DPI_TRAJECTORY_SERIES}
                  margin={{ top: 10, right: 16, left: 0, bottom: 8 }}
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
                    width={52}
                  />
                  <Tooltip
                    formatter={(val) => [
                      `${Number(val ?? 0).toLocaleString('en-IN')} ${activeChart.unit}`,
                      'Annual Total',
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
                    dataKey={activeChart.dataKey}
                    fill={activeChart.color}
                    radius={[5, 5, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              ) : (
                <AreaChart
                  data={DPI_TRAJECTORY_SERIES}
                  margin={{ top: 10, right: 16, left: 0, bottom: 8 }}
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
                    width={56}
                  />
                  <Tooltip
                    formatter={(val) => [
                      `${Number(val ?? 0).toLocaleString('en-IN')} ${activeChart.unit}`,
                      chartMode === 'upiVolume' ? 'Transactions' : 'Value',
                    ]}
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#FFFFFF',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={activeChart.dataKey}
                    stroke={activeChart.color}
                    strokeWidth={2.5}
                    fill={activeChart.color}
                    fillOpacity={0.14}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Selected Platform Detail Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Selected Rail · {activePillar.agency}
            </div>
            <h3 className="mt-1.5 font-serif text-xl font-semibold text-slate-950 dark:text-slate-50">
              {activePillar.name}
            </h3>
            <div className="mt-2 font-mono text-lg font-bold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
              {activePillar.headlineStat}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {activePillar.secondaryStat}
            </div>

            <div className="mt-5 space-y-4 text-xs sm:text-sm">
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Everyday Citizen Utility
                </div>
                <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activePillar.citizenImpact}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  National Adoption & Scale
                </div>
                <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activePillar.scaleDetail}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Independent Governance & Operational Context
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activePillar.independentContext}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <a
              href={activePillar.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] hover:underline"
            >
              <span>Visit Official {activePillar.agency} Portal</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
