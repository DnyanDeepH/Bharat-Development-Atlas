import { useEffect, useMemo, useState } from 'react';
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
  STATE_PROFILES,
  type IndianRegion,
  type StateProfile,
} from '../data/extendedModulesData';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import IndiaChoroplethMap, { type MapMetricKey } from './IndiaChoroplethMap';

const REGIONS: ('All' | IndianRegion)[] = [
  'All',
  'North',
  'South',
  'West',
  'East',
  'Northeast',
  'Central',
  'UT',
];

interface StateExplorerSectionProps {
  initialStateId?: string;
}

export default function StateExplorerSection({
  initialStateId,
}: StateExplorerSectionProps) {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [regionFilter, setRegionFilter] = useState<'All' | IndianRegion>('All');
  const [primaryId, setPrimaryId] = useState<string>(
    initialStateId ?? 'maharashtra'
  );
  const [compareId, setCompareId] = useState<string>('gujarat');
  const [chartMetric, setChartMetric] = useState<MapMetricKey>('perCapita');
  const [clickTarget, setClickTarget] = useState<'primary' | 'compare'>(
    'primary'
  );

  useEffect(() => {
    if (initialStateId && STATE_PROFILES.some((s) => s.id === initialStateId)) {
      setPrimaryId(initialStateId);
      setRegionFilter('All');
    }
  }, [initialStateId]);

  const filteredStates = useMemo(() => {
    if (regionFilter === 'All') return STATE_PROFILES;
    return STATE_PROFILES.filter((s) => s.region === regionFilter);
  }, [regionFilter]);

  const primaryState: StateProfile =
    STATE_PROFILES.find((s) => s.id === primaryId) ?? STATE_PROFILES[0];
  const compareState: StateProfile =
    STATE_PROFILES.find((s) => s.id === compareId) ?? STATE_PROFILES[1];

  const handleMapSelect = (stateId: string) => {
    if (clickTarget === 'primary') {
      setPrimaryId(stateId);
    } else {
      setCompareId(stateId);
    }
  };

  const comparisonChartData = useMemo(() => {
    const getVal = (s: StateProfile): number | null => {
      switch (chartMetric) {
        case 'perCapita':
          return s.perCapitaNsdpLakhs;
        case 'renewable':
          return s.renewableGw;
        case 'tapWater':
          return s.tapWaterPct;
        case 'highways':
          return Number((s.highwaysKm / 1000).toFixed(2));
        case 'literacy':
          return s.literacyPct;
      }
    };

    return filteredStates
      .map((s) => ({
        name: s.name
          .replace(' (NCT)', '')
          .replace('Dadra & Nagar Haveli and Daman & Diu', 'DNH & DD')
          .replace('Andaman & Nicobar Islands', 'A&N Islands'),
        value: getVal(s),
      }))
      .filter((row): row is { name: string; value: number } => row.value !== null)
      .sort((a, b) => b.value - a.value)
      .slice(0, 12);
  }, [filteredStates, chartMetric]);

  const metricMeta: Record<
    MapMetricKey,
    { label: string; unit: string; source: string }
  > = {
    perCapita: {
      label: 'Per-Capita NSDP',
      unit: '₹ Lakh',
      source: 'MoSPI / RBI',
    },
    tapWater: {
      label: 'Rural Tap Water',
      unit: '%',
      source: 'Jal Jeevan Mission',
    },
    renewable: {
      label: 'Renewable Capacity',
      unit: 'GW',
      source: 'MNRE',
    },
    highways: {
      label: 'National Highways',
      unit: 'k km',
      source: 'MoRTH',
    },
    literacy: {
      label: 'Literacy Rate',
      unit: '%',
      source: 'NSO / PLFS',
    },
  };

  return (
    <section
      id="states-explorer"
      className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t.sections.statesKicker}
          </div>
          <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
            {t.sections.statesTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
            {t.sections.statesSubtitle}
          </p>
        </div>

        {/* Region Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter states by region"
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg w-fit"
        >
          {REGIONS.map((region) => {
            const isActive = regionFilter === region;
            return (
              <button
                key={region}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setRegionFilter(region)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shared Map & Chart Metric Selector Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Choose official state shading metric"
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg"
        >
          {(Object.keys(metricMeta) as MapMetricKey[]).map((key) => {
            const isActive = chartMetric === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setChartMetric(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {metricMeta[key].label}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          Active layer source:{' '}
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {metricMeta[chartMetric].source} ({metricMeta[chartMetric].unit})
          </span>
        </div>
      </div>

      {/* Row 1: Interactive India Choropleth Map (6 cols) + Side-by-Side State Comparator (6 cols) */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <IndiaChoroplethMap
            states={STATE_PROFILES}
            metric={chartMetric}
            regionFilter={regionFilter}
            primaryId={primaryState.id}
            compareId={compareState.id}
            clickTarget={clickTarget}
            onChangeClickTarget={setClickTarget}
            onSelectState={handleMapSelect}
          />
        </div>

        {/* Side-by-Side State Profile Comparison */}
        <div className="lg:col-span-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col">
          {/* Selectors Header */}
          <div className="p-5 bg-[#F8FAFC] dark:bg-[#162033] border-b border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="primary-state-select"
                className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
              >
                Primary State / UT
              </label>
              <select
                id="primary-state-select"
                value={primaryState.id}
                onChange={(e) => setPrimaryId(e.target.value)}
                className="w-full px-3 py-2 text-sm font-medium bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#60A5FA]"
              >
                {STATE_PROFILES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.region})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="compare-state-select"
                className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5"
              >
                Compare With
              </label>
              <select
                id="compare-state-select"
                value={compareState.id}
                onChange={(e) => setCompareId(e.target.value)}
                className="w-full px-3 py-2 text-sm font-medium bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#60A5FA]"
              >
                {STATE_PROFILES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.region})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparative Indicator Matrix */}
          <div className="flex-1 divide-y divide-slate-200 dark:divide-slate-800">
            <div className="grid grid-cols-12 px-5 py-3 bg-white dark:bg-[#111827] text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="col-span-5">Official Indicator</div>
              <div className="col-span-3 text-right text-[#1E3A8A] dark:text-[#60A5FA] truncate">
                {primaryState.name}
              </div>
              <div className="col-span-4 text-right text-[#0F766E] dark:text-[#2DD4BF] truncate">
                {compareState.name}
              </div>
            </div>

            {[
              {
                label: 'Per-Capita NSDP (MoSPI / RBI)',
                a: primaryState.perCapitaDisplay,
                b: compareState.perCapitaDisplay,
              },
              {
                label: 'Rural Tap Water (Jal Jeevan Mission)',
                a: primaryState.tapWaterDisplay,
                b: compareState.tapWaterDisplay,
              },
              {
                label: 'Installed Renewable Energy (MNRE)',
                a: `${primaryState.renewableGw} GW`,
                b: `${compareState.renewableGw} GW`,
              },
              {
                label: 'National Highway Length (MoRTH)',
                a: `${primaryState.highwaysKm.toLocaleString('en-IN')} km`,
                b: `${compareState.highwaysKm.toLocaleString('en-IN')} km`,
              },
              {
                label: 'Literacy Rate (NSO / PLFS)',
                a: `${primaryState.literacyPct}%`,
                b: `${compareState.literacyPct}%`,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-12 px-5 py-3.5 text-sm items-center hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="col-span-5 text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-300 pr-2">
                  {row.label}
                </div>
                <div className="col-span-3 text-right font-mono text-xs sm:text-[13px] font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
                  {row.a}
                </div>
                <div className="col-span-4 text-right font-mono text-xs sm:text-[13px] font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
                  {row.b}
                </div>
              </div>
            ))}
          </div>

          {/* Regional Development Notes */}
          <div className="p-5 bg-[#F8FAFC] dark:bg-[#162033] border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <div className="font-semibold text-[#1E3A8A] dark:text-[#60A5FA]">
                {primaryState.name} · {primaryState.region}
              </div>
              <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                {primaryState.keyFocus}
              </p>
              <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                Sources: {primaryState.officialNote}
              </div>
            </div>
            <div>
              <div className="font-semibold text-[#0F766E] dark:text-[#2DD4BF]">
                {compareState.name} · {compareState.region}
              </div>
              <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                {compareState.keyFocus}
              </p>
              <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                Sources: {compareState.officialNote}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Full-width Top States Ranking Bar Chart for Selected Metric & Region */}
      <div className="mt-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
              Top {comparisonChartData.length} States by {metricMeta[chartMetric].label} ({regionFilter} Region)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ranked official figures · Source: {metricMeta[chartMetric].source}
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
            Unit: {metricMeta[chartMetric].unit}
          </span>
        </div>

        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonChartData}
              margin={{ top: 8, right: 16, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? '#1E293B' : '#E2E8F0'}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                interval={0}
                angle={-22}
                textAnchor="end"
                height={54}
                tick={{ fill: isDark ? '#94A3B8' : '#334155', fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: isDark ? '#334155' : '#CBD5E1' }}
              />
              <YAxis
                tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={46}
              />
              <Tooltip
                cursor={{ fill: isDark ? '#1E293B' : '#F1F5F9' }}
                formatter={(val) => [
                  `${Number(val ?? 0).toLocaleString('en-IN')} ${metricMeta[chartMetric].unit}`,
                  metricMeta[chartMetric].label,
                ]}
                contentStyle={{
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#FFFFFF',
                }}
                itemStyle={{ color: '#FFFFFF' }}
                labelStyle={{ color: '#CBD5E1', marginBottom: '2px' }}
              />
              <Bar
                dataKey="value"
                fill={isDark ? '#3B82F6' : '#1E3A8A'}
                radius={[4, 4, 0, 0]}
                maxBarSize={38}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
