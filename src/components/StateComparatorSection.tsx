import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowRight, Plus, X } from 'lucide-react';
import { STATE_PROFILES, type StateProfile } from '../data/extendedModulesData';
import {
  NATIONAL_SDG_AVERAGE,
  STATE_SDG_SCORES,
} from '../data/advancedModulesData';
import { useTheme } from '../context/ThemeContext';

interface StateComparatorSectionProps {
  onOpenFactCard?: (stateId: string) => void;
}

const COMPARE_PRESETS: { label: string; ids: string[] }[] = [
  {
    label: 'Maharashtra · Tamil Nadu · UP',
    ids: ['maharashtra', 'tamil-nadu', 'uttar-pradesh'],
  },
  {
    label: 'Gujarat · Karnataka · Telangana',
    ids: ['gujarat', 'karnataka', 'telangana'],
  },
  {
    label: 'Kerala · Himachal · Uttarakhand',
    ids: ['kerala', 'himachal-pradesh', 'uttarakhand'],
  },
  {
    label: 'Rajasthan · Gujarat · Tamil Nadu (Clean Energy)',
    ids: ['rajasthan', 'gujarat', 'tamil-nadu'],
  },
  {
    label: 'Bihar · Odisha · Assam',
    ids: ['bihar', 'odisha', 'assam'],
  },
];

const SERIES_COLORS = ['#1E3A8A', '#0F766E', '#B45309'];
const SERIES_COLORS_DARK = ['#60A5FA', '#2DD4BF', '#F59E0B'];

export default function StateComparatorSection({
  onOpenFactCard,
}: StateComparatorSectionProps) {
  const { isDark } = useTheme();
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'maharashtra',
    'tamil-nadu',
    'uttar-pradesh',
  ]);
  const [barMetric, setBarMetric] = useState<
    'perCapita' | 'tapWater' | 'literacy' | 'highways' | 'renewable' | 'sdg'
  >('perCapita');

  const colors = isDark ? SERIES_COLORS_DARK : SERIES_COLORS;

  const selectedStates = useMemo<StateProfile[]>(() => {
    return selectedIds
      .map((id) => STATE_PROFILES.find((s) => s.id === id))
      .filter((s): s is StateProfile => Boolean(s));
  }, [selectedIds]);

  const handleChangeSlot = (index: number, newId: string) => {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[index] = newId;
      return next;
    });
  };

  const handleAddThird = () => {
    if (selectedIds.length >= 3) return;
    const candidate = STATE_PROFILES.find((s) => !selectedIds.includes(s.id));
    if (candidate) {
      setSelectedIds((prev) => [...prev, candidate.id]);
    }
  };

  const handleRemoveThird = () => {
    if (selectedIds.length <= 2) return;
    setSelectedIds((prev) => prev.slice(0, 2));
  };

  // Compute maximums across all 36 states/UTs for fair 0–100 radar normalization
  const nationalMax = useMemo(() => {
    const maxPerCapita = Math.max(
      ...STATE_PROFILES.map((s) => s.perCapitaNsdpLakhs ?? 0)
    );
    const maxRenewable = Math.max(...STATE_PROFILES.map((s) => s.renewableGw));
    const maxHighways = Math.max(...STATE_PROFILES.map((s) => s.highwaysKm));
    return { maxPerCapita, maxRenewable, maxHighways };
  }, []);

  const radarData = useMemo(() => {
    const dims = [
      {
        axis: 'Per-Capita NSDP',
        getNorm: (s: StateProfile) =>
          Math.round(((s.perCapitaNsdpLakhs ?? 0) / nationalMax.maxPerCapita) * 100),
      },
      {
        axis: 'Tap Water %',
        getNorm: (s: StateProfile) => Math.round(s.tapWaterPct ?? 100),
      },
      {
        axis: 'Literacy %',
        getNorm: (s: StateProfile) => Math.round(s.literacyPct),
      },
      {
        axis: 'Highways Scale',
        getNorm: (s: StateProfile) =>
          Math.round((s.highwaysKm / nationalMax.maxHighways) * 100),
      },
      {
        axis: 'Renewables Scale',
        getNorm: (s: StateProfile) =>
          Math.round((s.renewableGw / nationalMax.maxRenewable) * 100),
      },
      {
        axis: 'SDG Index',
        getNorm: (s: StateProfile) => STATE_SDG_SCORES[s.id] ?? NATIONAL_SDG_AVERAGE,
      },
    ];

    return dims.map((d) => {
      const point: Record<string, string | number> = { axis: d.axis };
      selectedStates.forEach((st, idx) => {
        point[`s${idx}`] = d.getNorm(st);
      });
      return point;
    });
  }, [selectedStates, nationalMax]);

  const metricDefs: Record<
    typeof barMetric,
    {
      label: string;
      unit: string;
      source: string;
      getValue: (s: StateProfile) => number;
      format: (s: StateProfile) => string;
    }
  > = {
    perCapita: {
      label: 'Per-Capita NSDP',
      unit: '₹ Lakh',
      source: 'MoSPI / RBI',
      getValue: (s) => s.perCapitaNsdpLakhs ?? 0,
      format: (s) => s.perCapitaDisplay,
    },
    tapWater: {
      label: 'Rural Tap Water',
      unit: '%',
      source: 'Jal Jeevan Mission',
      getValue: (s) => s.tapWaterPct ?? 100,
      format: (s) => s.tapWaterDisplay,
    },
    literacy: {
      label: 'Literacy Rate',
      unit: '%',
      source: 'NSO / PLFS',
      getValue: (s) => s.literacyPct,
      format: (s) => `${s.literacyPct}%`,
    },
    highways: {
      label: 'National Highways',
      unit: 'km',
      source: 'MoRTH',
      getValue: (s) => s.highwaysKm,
      format: (s) => `${s.highwaysKm.toLocaleString('en-IN')} km`,
    },
    renewable: {
      label: 'Renewable Capacity',
      unit: 'GW',
      source: 'MNRE',
      getValue: (s) => s.renewableGw,
      format: (s) => `${s.renewableGw} GW`,
    },
    sdg: {
      label: 'SDG Bharat Index',
      unit: '/ 100',
      source: 'NITI Aayog (2023–24)',
      getValue: (s) => STATE_SDG_SCORES[s.id] ?? NATIONAL_SDG_AVERAGE,
      format: (s) => `${STATE_SDG_SCORES[s.id] ?? NATIONAL_SDG_AVERAGE} / 100`,
    },
  };

  const barData = useMemo(() => {
    const def = metricDefs[barMetric];
    return selectedStates.map((s) => ({
      name: s.name.replace(' (NCT)', ''),
      value: def.getValue(s),
    }));
  }, [selectedStates, barMetric]);

  const comparisonRows = [
    {
      key: 'perCapita' as const,
      label: 'Per-Capita NSDP (Current Prices)',
      source: 'MoSPI / RBI',
      getNum: (s: StateProfile) => s.perCapitaNsdpLakhs ?? -1,
      format: (s: StateProfile) => s.perCapitaDisplay,
    },
    {
      key: 'tapWater' as const,
      label: 'Rural Tap Water Coverage',
      source: 'Jal Jeevan Mission',
      getNum: (s: StateProfile) => s.tapWaterPct ?? -1,
      format: (s: StateProfile) => s.tapWaterDisplay,
    },
    {
      key: 'literacy' as const,
      label: 'Literacy Rate (Age 7+)',
      source: 'NSO / PLFS',
      getNum: (s: StateProfile) => s.literacyPct,
      format: (s: StateProfile) => `${s.literacyPct}%`,
    },
    {
      key: 'highways' as const,
      label: 'National Highways Network',
      source: 'MoRTH',
      getNum: (s: StateProfile) => s.highwaysKm,
      format: (s: StateProfile) => `${s.highwaysKm.toLocaleString('en-IN')} km`,
    },
    {
      key: 'renewable' as const,
      label: 'Installed Renewable Capacity',
      source: 'MNRE',
      getNum: (s: StateProfile) => s.renewableGw,
      format: (s: StateProfile) => `${s.renewableGw} GW`,
    },
    {
      key: 'sdg' as const,
      label: 'NITI Aayog SDG Bharat Index (2023–24)',
      source: `All-Bharat Avg: ${NATIONAL_SDG_AVERAGE}`,
      getNum: (s: StateProfile) => STATE_SDG_SCORES[s.id] ?? NATIONAL_SDG_AVERAGE,
      format: (s: StateProfile) =>
        `${STATE_SDG_SCORES[s.id] ?? NATIONAL_SDG_AVERAGE} / 100`,
    },
  ];

  return (
    <section
      id="state-comparator"
      className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Side-by-Side State & UT Benchmark · MoSPI · NITI Aayog SDG · JJM · MNRE · MoRTH
          </div>
          <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
            Compare 2 or 3 States & Union Territories Head-to-Head
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Pick any combination of Bharat’s 36 states and union territories to benchmark per-capita income, tap water reach, literacy, highway corridors, clean energy, and NITI Aayog SDG composite scores side-by-side.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {selectedIds.length < 3 ? (
            <button
              type="button"
              onClick={handleAddThird}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] hover:bg-[#172E6E] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Add 3rd State</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRemoveThird}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 hover:border-slate-400 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Compare 2 States</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Quick benchmarks:
        </span>
        {COMPARE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => setSelectedIds(preset.ids)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 hover:border-[#1E3A8A] dark:hover:border-[#60A5FA] hover:text-[#1E3A8A] dark:hover:text-[#60A5FA] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* State Selectors Strip */}
      <div
        className={`mt-6 grid grid-cols-1 gap-4 ${
          selectedStates.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
        }`}
      >
        {selectedStates.map((st, idx) => (
          <div
            key={`slot-${idx}`}
            className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <label
                htmlFor={`cmp-state-${idx}`}
                className="text-xs font-semibold flex items-center gap-2"
                style={{ color: colors[idx] }}
              >
                <span
                  className="inline-block w-2.5 h-2.5 rounded-xs shrink-0"
                  style={{ backgroundColor: colors[idx] }}
                  aria-hidden="true"
                />
                <span>State / UT {idx + 1}</span>
              </label>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {st.region} · SDG {STATE_SDG_SCORES[st.id] ?? NATIONAL_SDG_AVERAGE}
              </span>
            </div>
            <select
              id={`cmp-state-${idx}`}
              value={st.id}
              onChange={(e) => handleChangeSlot(idx, e.target.value)}
              className="w-full px-3 py-2 text-sm font-medium bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#60A5FA]"
            >
              {STATE_PROFILES.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name} ({opt.region})
                </option>
              ))}
            </select>
            <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
              {st.keyFocus}
            </p>
            {onOpenFactCard && (
              <button
                type="button"
                onClick={() => onOpenFactCard(st.id)}
                className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] hover:underline cursor-pointer"
              >
                <span>Export {st.name.replace(' (NCT)', '')} Fact Card</span>
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Head-to-Head Matrix Table */}
      <div className="mt-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#162033] border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <th className="py-3.5 px-5">Official Metric & Source</th>
                {selectedStates.map((st, idx) => (
                  <th
                    key={`th-${st.id}-${idx}`}
                    className="py-3.5 px-5 text-right whitespace-nowrap"
                    style={{ color: colors[idx] }}
                  >
                    {st.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              {comparisonRows.map((row) => {
                const nums = selectedStates.map((s) => row.getNum(s));
                const maxVal = Math.max(...nums);
                return (
                  <tr
                    key={row.key}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {row.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {row.source}
                      </div>
                    </td>
                    {selectedStates.map((st, idx) => {
                      const val = row.getNum(st);
                      const isLeader =
                        maxVal > 0 &&
                        val === maxVal &&
                        nums.filter((n) => n === maxVal).length < nums.length;
                      return (
                        <td
                          key={`cell-${row.key}-${idx}`}
                          className="py-3.5 px-5 text-right font-mono tabular-nums whitespace-nowrap"
                        >
                          <div className="font-semibold text-slate-950 dark:text-slate-50">
                            {row.format(st)}
                          </div>
                          {isLeader && (
                            <div className="text-[11px] font-sans font-medium text-emerald-700 dark:text-emerald-400">
                              Highest of {selectedStates.length}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Charts: Multi-Dimensional Radar + Focused Bar Comparison */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="mb-3">
            <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
              6-Dimension Normalized Profile Radar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Each axis is scaled 0–100 relative to the highest-performing state or 100% ceiling across Bharat
            </p>
          </div>
          <div className="w-full h-[310px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke={isDark ? '#334155' : '#CBD5E1'} />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: isDark ? '#CBD5E1' : '#334155', fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: isDark ? '#94A3B8' : '#64748B', fontSize: 10 }}
                />
                {selectedStates.map((st, idx) => (
                  <Radar
                    key={`radar-${idx}`}
                    name={st.name.replace(' (NCT)', '')}
                    dataKey={`s${idx}`}
                    stroke={colors[idx]}
                    fill={colors[idx]}
                    fillOpacity={0.18}
                    strokeWidth={2}
                  />
                ))}
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#FFFFFF',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
                Direct Metric Comparison
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {metricDefs[barMetric].label} ({metricDefs[barMetric].unit}) ·{' '}
                {metricDefs[barMetric].source}
              </p>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Choose metric for bar comparison"
            className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4"
          >
            {(Object.keys(metricDefs) as (keyof typeof metricDefs)[]).map(
              (key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={barMetric === key}
                  onClick={() => setBarMetric(key)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    barMetric === key
                      ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {metricDefs[key].label}
                </button>
              )
            )}
          </div>

          <div className="w-full h-[250px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#1E293B' : '#E2E8F0'}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: isDark ? '#CBD5E1' : '#334155', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: isDark ? '#334155' : '#CBD5E1' }}
                />
                <YAxis
                  tick={{ fill: isDark ? '#94A3B8' : '#475569', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={54}
                />
                <Tooltip
                  formatter={(v) => [
                    `${Number(v ?? 0).toLocaleString('en-IN')} ${metricDefs[barMetric].unit}`,
                    metricDefs[barMetric].label,
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
                  dataKey="value"
                  fill={isDark ? '#3B82F6' : '#1E3A8A'}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={64}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
