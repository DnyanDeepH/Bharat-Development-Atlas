import { useMemo, useState } from 'react';
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Search,
} from 'lucide-react';
import { Area, AreaChart, Tooltip, YAxis } from 'recharts';
import {
  INDICATOR_LEDGER,
  SECTOR_META,
  type IndicatorRecord,
  type SectorId,
} from '../data/developmentData';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';

type FilterOption = 'all' | SectorId;
type SortField = 'sector' | 'name' | 'change';

const FILTER_TABS: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'All Sectors' },
  { id: 'economy', label: 'Economy' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'welfare', label: 'Social Welfare' },
  { id: 'digital', label: 'Digital' },
  { id: 'energy', label: 'Clean Energy' },
];

interface SparklineTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { year: string; value: number };
  }>;
  unit: string;
}

function SparklineTooltip({ active, payload, unit }: SparklineTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0].payload;
  const formattedVal = point.value.toLocaleString('en-IN');

  return (
    <div className="bg-slate-950 text-white px-2 py-1 rounded text-[11px] font-mono tabular-nums shadow-md border border-slate-800 whitespace-nowrap">
      <span className="text-slate-400 mr-1.5">{point.year}</span>
      <span className="font-semibold text-white">
        {formattedVal}
        {unit ? ` ${unit}` : ''}
      </span>
    </div>
  );
}

function IndicatorSparkline({
  record,
  color,
}: {
  record: IndicatorRecord;
  color: string;
}) {
  const gradientId = `spark-${record.id}`;

  return (
    <div
      className="flex justify-center"
      aria-label={`${record.name} trend from ${record.trendSeries[0]?.year} to ${record.trendSeries[record.trendSeries.length - 1]?.year}`}
    >
      <AreaChart
        width={112}
        height={32}
        data={record.trendSeries}
        margin={{ top: 4, right: 3, bottom: 2, left: 3 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <YAxis hide domain={['dataMin', 'dataMax']} />
        <Tooltip
          cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '2 2' }}
          wrapperStyle={{ zIndex: 30, pointerEvents: 'none' }}
          content={<SparklineTooltip unit={record.trendUnit} />}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.75}
          fill={`url(#${gradientId})`}
          isAnimationActive={false}
          dot={false}
          activeDot={{ r: 2.75, fill: color, stroke: '#FFFFFF', strokeWidth: 1.5 }}
        />
      </AreaChart>
    </div>
  );
}

export default function IndicatorLedger() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [sectorFilter, setSectorFilter] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('sector');
  const [sortAsc, setSortAsc] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(
    INDICATOR_LEDGER[0].id
  );

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = INDICATOR_LEDGER.filter((row) => {
      const matchesSector =
        sectorFilter === 'all' || row.sector === sectorFilter;
      if (!matchesSector) return false;
      if (!query) return true;
      return (
        row.name.toLowerCase().includes(query) ||
        row.sectorLabel.toLowerCase().includes(query) ||
        row.officialSource.toLowerCase().includes(query) ||
        row.summary.toLowerCase().includes(query)
      );
    });

    return [...list].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') {
        cmp = a.name.localeCompare(b.name);
      } else if (sortField === 'sector') {
        cmp = a.sectorLabel.localeCompare(b.sectorLabel);
      } else {
        cmp = a.changeNumeric - b.changeNumeric;
      }
      return sortAsc ? cmp : -cmp;
    });
  }, [sectorFilter, searchQuery, sortField, sortAsc]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(field !== 'change');
    }
  };

  const resetFilters = () => {
    setSectorFilter('all');
    setSearchQuery('');
  };

  const gridColumns =
    'grid-cols-[minmax(220px,2fr)_minmax(105px,0.9fr)_minmax(118px,0.95fr)_128px_minmax(115px,0.95fr)_minmax(135px,1.05fr)_40px]';

  return (
    <section
      id="indicators"
      className="py-14 lg:py-20 bg-white dark:bg-[#111827] border-t border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.sections.ledgerKicker}
            </div>
            <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
              {t.sections.ledgerTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Hover any sparkline to inspect milestone points from 2014 to 2026,
              or select a row for official ministry context and independent
              policy notes.
            </p>
          </div>

          {/* Search input */}
          <div className="relative w-full lg:w-72">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search indicators or ministries..."
              aria-label="Search indicators or ministries"
              className="w-full pl-9 pr-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#60A5FA] focus:bg-white dark:focus:bg-[#0F172A]"
            />
          </div>
        </div>

        {/* Sector Filter Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter indicators by sector"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = sectorFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSectorFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] ${
                    isActive
                      ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
            Showing {filteredRows.length} of {INDICATOR_LEDGER.length} indicators
          </div>
        </div>

        {/* Data Table */}
        <div className="mt-5 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-[#111827]">
          {filteredRows.length === 0 ? (
            <div className="py-14 px-6 text-center">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                No official indicators match “{searchQuery}”.
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Try clearing your search term or switching back to all sectors.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] hover:bg-[#172E6E] dark:hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr
                    className={`bg-[#F8FAFC] dark:bg-[#162033] border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 grid ${gridColumns} items-center`}
                  >
                    <th className="py-3 pl-5 pr-3">
                      <button
                        type="button"
                        onClick={() => handleSort('name')}
                        className="inline-flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                      >
                        <span>Indicator &amp; Sector</span>
                        <ArrowUpDown
                          className="w-3.5 h-3.5 text-slate-400"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                    <th className="py-3 px-3 text-right">Baseline</th>
                    <th className="py-3 px-3 text-right">Latest Official</th>
                    <th className="py-3 px-2 text-center">Trend (2014–26)</th>
                    <th className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleSort('change')}
                        className="inline-flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white cursor-pointer ml-auto"
                      >
                        <span>Scale / Shift</span>
                        <ArrowUpDown
                          className="w-3.5 h-3.5 text-slate-400"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                    <th className="py-3 px-3">Official Source</th>
                    <th className="py-3 pl-2 pr-4 text-right">
                      <span className="sr-only">Expand details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                  {filteredRows.map((row) => {
                    const isExpanded = expandedId === row.id;
                    const baseColor = SECTOR_META[row.sector].color;
                    const sectorColor = isDark
                      ? baseColor === '#1E3A8A'
                        ? '#60A5FA'
                        : baseColor === '#0F766E'
                          ? '#2DD4BF'
                          : baseColor === '#15803D'
                            ? '#4ADE80'
                            : baseColor === '#B45309'
                              ? '#FBBF24'
                              : '#A78BFA'
                      : baseColor;
                    return (
                      <tr
                        key={row.id}
                        className="group transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 block"
                      >
                        <td className="p-0 block">
                          <div
                            role="button"
                            tabIndex={0}
                            aria-expanded={isExpanded}
                            onClick={() =>
                              setExpandedId(isExpanded ? null : row.id)
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setExpandedId(isExpanded ? null : row.id);
                              }
                            }}
                            className={`w-full text-left grid ${gridColumns} items-center py-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA]`}
                          >
                            <div className="pl-5 pr-3">
                              <div className="font-semibold text-slate-900 dark:text-slate-100">
                                {row.name}
                              </div>
                              <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                <span
                                  style={{ color: sectorColor }}
                                  className="font-medium"
                                >
                                  {row.sectorLabel}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span>{row.unit}</span>
                              </div>
                            </div>

                            <div className="px-3 text-right">
                              <div className="font-mono text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 tabular-nums">
                                {row.baselineDisplay}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                                {row.baselineYear}
                              </div>
                            </div>

                            <div className="px-3 text-right">
                              <div className="font-mono text-xs sm:text-[13px] font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
                                {row.latestDisplay}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                                {row.latestYear}
                              </div>
                            </div>

                            <div className="px-2">
                              <IndicatorSparkline
                                record={row}
                                color={sectorColor}
                              />
                            </div>

                            <div className="px-3 text-right font-mono text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                              {row.changeLabel}
                            </div>

                            <div className="px-3 text-xs text-slate-600 dark:text-slate-300 truncate">
                              {row.officialSource}
                            </div>

                            <div className="pr-4 flex justify-end text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                              {isExpanded ? (
                                <ChevronUp
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDown
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="px-5 pb-5 pt-3 bg-[#F8FAFC] dark:bg-[#162033] border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                  Official Record &amp; Policy Context
                                </div>
                                <p className="mt-1.5 text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                                  {row.summary}
                                </p>
                                <div className="mt-3">
                                  <a
                                    href={row.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] hover:underline"
                                  >
                                    <span>Verify on {row.officialSource}</span>
                                    <ExternalLink
                                      className="w-3.5 h-3.5"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </div>
                              </div>

                              <div>
                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                  Independent Context &amp; Key Considerations
                                </div>
                                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {row.contextNote}
                                </p>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
