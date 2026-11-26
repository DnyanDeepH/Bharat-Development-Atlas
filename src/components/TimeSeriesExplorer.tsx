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
  SECTOR_META,
  TIME_SERIES_DATASETS,
  type TimeSeriesPoint,
} from '../data/developmentData';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';

type ChartStyle = 'area' | 'bar';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
    payload: TimeSeriesPoint;
  }>;
  label?: string;
  primaryUnit: string;
  secondaryUnit?: string;
}

function CustomChartTooltip({
  active,
  payload,
  label,
  primaryUnit,
  secondaryUnit,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const point = payload[0]?.payload;

  return (
    <div className="bg-slate-950 text-white px-3.5 py-2.5 rounded-lg shadow-md border border-slate-800 text-xs">
      <div className="font-mono font-semibold text-slate-200 mb-1.5 flex items-center justify-between gap-4">
        <span>{label}</span>
        {point?.isProjection && (
          <span className="text-amber-300 font-sans font-medium">
            Official Target
          </span>
        )}
      </div>
      <div className="space-y-1">
        {payload.map((entry, idx) => (
          <div
            key={entry.name}
            className="flex items-center justify-between gap-4 font-mono tabular-nums"
          >
            <span className="text-slate-300 font-sans">{entry.name}:</span>
            <span className="font-semibold text-white">
              {entry.value.toLocaleString('en-IN')}{' '}
              {idx === 0 ? primaryUnit : secondaryUnit ?? ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TimeSeriesExplorer() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [selectedDatasetId, setSelectedDatasetId] = useState(
    TIME_SERIES_DATASETS[0].id
  );
  const [chartStyle, setChartStyle] = useState<ChartStyle>('area');
  const [showProjection, setShowProjection] = useState(false);
  const [metricView, setMetricView] = useState<'primary' | 'secondary'>(
    'primary'
  );

  const dataset =
    TIME_SERIES_DATASETS.find((item) => item.id === selectedDatasetId) ??
    TIME_SERIES_DATASETS[0];

  const hasSecondary = Boolean(dataset.secondaryLabel);
  const hasProjection = Boolean(dataset.projectedData);
  const activeMetricView = hasSecondary ? metricView : 'primary';

  const chartData =
    showProjection && dataset.projectedData
      ? dataset.projectedData
      : dataset.data;

  const rawColor = SECTOR_META[dataset.sector].chartColor;
  const activeColor = isDark && rawColor === '#1E3A8A' ? '#60A5FA' : rawColor;
  const activeDataKey =
    activeMetricView === 'secondary' ? 'secondary' : 'value';
  const activeLabel =
    activeMetricView === 'secondary' && dataset.secondaryLabel
      ? dataset.secondaryLabel
      : dataset.primaryLabel;
  const activeUnit =
    activeMetricView === 'secondary' && dataset.secondaryUnit
      ? dataset.secondaryUnit
      : dataset.unit;

  const handleSelectDataset = (id: string) => {
    setSelectedDatasetId(id);
    setMetricView('primary');
    setShowProjection(false);
  };

  return (
    <section
      id="time-series"
      className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t.sections.timeSeriesKicker}
          </div>
          <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
            {t.sections.timeSeriesTitle}
          </h2>
        </div>

        {/* Dataset selector buttons */}
        <div
          role="tablist"
          aria-label="Select time-series indicator"
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg"
        >
          {TIME_SERIES_DATASETS.map((item) => {
            const isSelected = item.id === dataset.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectDataset(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] ${
                  isSelected
                    ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {item.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chart + Editorial Side Panel */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Chart Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-950 dark:text-slate-50">
                {dataset.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Active series:{' '}
                <span className="text-slate-700 dark:text-slate-200 font-medium">
                  {activeLabel}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {hasSecondary && (
                <div className="inline-flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setMetricView('primary')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeMetricView === 'primary'
                        ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Primary
                  </button>
                  <button
                    type="button"
                    onClick={() => setMetricView('secondary')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeMetricView === 'secondary'
                        ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Secondary
                  </button>
                </div>
              )}

              {hasProjection && (
                <button
                  type="button"
                  onClick={() => setShowProjection((prev) => !prev)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                    showProjection
                      ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white border-[#1E3A8A] dark:border-[#2563EB]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {showProjection ? 'Showing 2030 Target' : '+ Include 2030 Target'}
                </button>
              )}

              <div className="inline-flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                <button
                  type="button"
                  onClick={() => setChartStyle('area')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    chartStyle === 'area'
                      ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Trend
                </button>
                <button
                  type="button"
                  onClick={() => setChartStyle('bar')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    chartStyle === 'bar'
                      ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Bars
                </button>
              </div>
            </div>
          </div>

          {/* Chart Viewport */}
          <div className="w-full h-[300px] sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartStyle === 'area' ? (
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 16, left: 4, bottom: 4 }}
                >
                  <defs>
                    <linearGradient
                      id={`grad-${dataset.id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={activeColor}
                        stopOpacity={0.26}
                      />
                      <stop
                        offset="95%"
                        stopColor={activeColor}
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
                    dataKey="period"
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
                    content={
                      <CustomChartTooltip
                        primaryUnit={activeUnit}
                        secondaryUnit={dataset.secondaryUnit}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey={activeDataKey}
                    name={activeLabel}
                    stroke={activeColor}
                    strokeWidth={2.5}
                    fill={`url(#grad-${dataset.id})`}
                    activeDot={{
                      r: 5,
                      fill: activeColor,
                      stroke: isDark ? '#0B1120' : '#FFFFFF',
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              ) : (
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 16, left: 4, bottom: 4 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#1E293B' : '#E2E8F0'}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="period"
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
                    content={
                      <CustomChartTooltip
                        primaryUnit={activeUnit}
                        secondaryUnit={dataset.secondaryUnit}
                      />
                    }
                  />
                  <Bar
                    dataKey={activeDataKey}
                    name={activeLabel}
                    fill={activeColor}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>
              Primary source:{' '}
              <span className="text-slate-700 dark:text-slate-200 font-medium">
                {dataset.source}
              </span>
            </span>
            <a
              href={dataset.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#1E3A8A] dark:text-[#60A5FA] hover:underline font-medium"
            >
              <span>Official Portal</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right Side: Analytical Reading Panel (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Official Data Summary
              </div>
              <p className="mt-2 text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {dataset.keyTakeaway}
              </p>
            </div>

            {dataset.targetNote && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA]">
                  Forward Roadmap Target
                </div>
                <p className="mt-1.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {dataset.targetNote}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Independent Analytical Context
              </div>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {dataset.balancedContext}
              </p>
            </div>
          </div>

          {/* Quick tabular summary of first vs latest data point */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Start ({dataset.data[0].period})
              </div>
              <div className="mt-1 font-mono text-lg font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                {(activeMetricView === 'secondary'
                  ? dataset.data[0].secondary ?? 0
                  : dataset.data[0].value
                ).toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  {activeUnit}
                </span>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Latest ({dataset.data[dataset.data.length - 1].period})
              </div>
              <div className="mt-1 font-mono text-lg font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
                {(activeMetricView === 'secondary'
                  ? dataset.data[dataset.data.length - 1].secondary ?? 0
                  : dataset.data[dataset.data.length - 1].value
                ).toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  {activeUnit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
