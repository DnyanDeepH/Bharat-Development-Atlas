import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import {
  MEGA_PROJECTS,
  type ProjectSector,
  type ProjectStatus,
} from '../data/advancedModulesData';

const SECTORS: ('All' | ProjectSector)[] = [
  'All',
  'Expressways',
  'Rail & Vande Bharat',
  'Metro & Urban Transit',
  'Semiconductors & Industry',
  'Ports & Institutions',
];

const STATUSES: ('All' | ProjectStatus)[] = [
  'All',
  'Operational',
  'Partially Operational',
  'Under Construction',
];

export default function MegaProjectsSection() {
  const [sector, setSector] = useState<'All' | ProjectSector>('All');
  const [status, setStatus] = useState<'All' | ProjectStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return MEGA_PROJECTS.filter((proj) => {
      if (sector !== 'All' && proj.sector !== sector) return false;
      if (status !== 'All' && proj.status !== status) return false;
      if (q) {
        const hay =
          `${proj.name} ${proj.statesCovered} ${proj.ministry} ${proj.headlineSpec} ${proj.summary}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [sector, status, searchTerm]);

  const totals = useMemo(() => {
    const totalOutlayLakhCr =
      filtered.reduce((acc, p) => acc + p.outlayCrore, 0) / 100000;
    const operationalCount = filtered.filter(
      (p) => p.status === 'Operational'
    ).length;
    const partialCount = filtered.filter(
      (p) => p.status === 'Partially Operational'
    ).length;
    const avgProgress =
      filtered.length > 0
        ? Math.round(
            filtered.reduce((acc, p) => acc + p.completionPct, 0) /
              filtered.length
          )
        : 0;
    return {
      totalOutlayLakhCr,
      operationalCount,
      partialCount,
      avgProgress,
    };
  }, [filtered]);

  const getStatusTextClass = (s: ProjectStatus) => {
    switch (s) {
      case 'Operational':
        return 'text-emerald-700 dark:text-emerald-400';
      case 'Partially Operational':
        return 'text-amber-700 dark:text-amber-400';
      case 'Under Construction':
        return 'text-[#1E3A8A] dark:text-[#60A5FA]';
    }
  };

  return (
    <section
      id="mega-projects"
      className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            PM GatiShakti & National Infrastructure Pipeline · PIB · MoRTH · Railways · MeitY · MoPSW
          </div>
          <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
            Mega Infrastructure & Flagship Projects Tracker
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Filter Bharat’s highest-value completed and under-construction corridors—expressways, Vande Bharat rail networks, high-speed rail, metros, semiconductor fabs, deep-water ports, and premier institutions.
          </p>
        </div>

        <div className="relative w-full lg:w-72 shrink-0">
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by project, state, or agency..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#60A5FA]"
          />
        </div>
      </div>

      {/* KPI Summary Strip */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Tracked Outlay (Filtered)
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-950 dark:text-slate-50 tabular-nums">
            ₹{totals.totalOutlayLakhCr.toFixed(2)}L Cr
          </div>
          <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            {filtered.length} flagship programs
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Operational / Commissioned
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
            {totals.operationalCount} full · {totals.partialCount} partial
          </div>
          <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            Active public & freight usage
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Mean Execution Progress
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
            {totals.avgProgress}%
          </div>
          <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            Across selected infrastructure set
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Union Budget FY26 Capex
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-950 dark:text-slate-50 tabular-nums">
            ₹11.21L Cr
          </div>
          <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            3.1% of GDP · Ministry of Finance
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Filter projects by sector"
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg"
        >
          {SECTORS.map((sec) => (
            <button
              key={sec}
              type="button"
              role="tab"
              aria-selected={sector === sec}
              onClick={() => setSector(sec)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                sector === sec
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        <div
          role="tablist"
          aria-label="Filter projects by status"
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg w-fit"
        >
          {STATUSES.map((st) => (
            <button
              key={st}
              type="button"
              role="tab"
              aria-selected={status === st}
              onClick={() => setStatus(st)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                status === st
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      {filtered.length === 0 ? (
        <div className="mt-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            No infrastructure projects match your current filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSector('All');
              setStatus('All');
              setSearchTerm('');
            }}
            className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((proj) => (
            <article
              key={proj.id}
              className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {proj.sector} · {proj.timeline}
                  </span>
                  <span className={`font-semibold ${getStatusTextClass(proj.status)}`}>
                    {proj.status}
                  </span>
                </div>

                <h3 className="mt-2 font-serif text-lg font-semibold text-slate-950 dark:text-slate-50 leading-snug">
                  {proj.name}
                </h3>

                <div className="mt-1.5 text-xs font-medium text-[#1E3A8A] dark:text-[#60A5FA]">
                  {proj.headlineSpec}
                </div>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {proj.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                {/* Completion Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500 dark:text-slate-400">
                      Physical / Operational Progress
                    </span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                      {proj.completionPct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1E3A8A] dark:bg-[#3B82F6] rounded-full"
                      style={{ width: `${proj.completionPct}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Estimated Outlay
                    </div>
                    <div className="font-mono font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
                      {proj.outlayDisplay}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      States / Coverage
                    </div>
                    <div className="font-medium text-slate-800 dark:text-slate-200 truncate" title={proj.statesCovered}>
                      {proj.statesCovered}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span>Agency: {proj.ministry}</span>
                  <span>Source: {proj.officialSource}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
