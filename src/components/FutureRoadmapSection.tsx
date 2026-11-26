import { useState } from 'react';
import { FUTURE_ROADMAP, SECTOR_META } from '../data/developmentData';
import { useTheme } from '../context/ThemeContext';

type HorizonFilter = 'all' | '2030' | '2047';

export default function FutureRoadmapSection() {
  const { isDark } = useTheme();
  const [horizon, setHorizon] = useState<HorizonFilter>('all');

  const items =
    horizon === 'all'
      ? FUTURE_ROADMAP
      : FUTURE_ROADMAP.filter((item) => item.horizon === horizon);

  return (
    <section
      id="roadmap"
      className="py-14 lg:py-20 bg-[#F8FAFC] dark:bg-[#0B1120] border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Forward Targets &amp; National Missions
            </div>
            <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
              What Is Planned Next: 2030 &amp; Viksit Bharat 2047
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Official multi-decade blueprints published by NITI Aayog, PIB,
              Ministry of Railways, MNRE, and MeitY—tracked against 2014
              baselines, current status, and key execution prerequisites.
            </p>
          </div>

          {/* Horizon Segmented Control */}
          <div
            role="tablist"
            aria-label="Filter future roadmap by target year"
            className="inline-flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg shrink-0 w-fit"
          >
            {(
              [
                { id: 'all', label: 'All Horizons' },
                { id: '2030', label: '2030 Interim' },
                { id: '2047', label: '2047 Vision' },
              ] as const
            ).map((tab) => {
              const isActive = horizon === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setHorizon(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] ${
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
        </div>

        {/* Roadmap Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((milestone) => {
            const baseColor = SECTOR_META[milestone.sector].color;
            const color = isDark
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
              <article
                key={milestone.id}
                className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium" style={{ color }}>
                      {milestone.sectorLabel}
                    </span>
                    <span className="font-mono font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                      Target {milestone.horizon}
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-serif text-lg font-semibold text-slate-950 dark:text-slate-50 leading-snug">
                    {milestone.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* 3-point trajectory metrics */}
                  <dl className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-slate-500 dark:text-slate-400">
                        2014 Baseline
                      </dt>
                      <dd className="font-mono text-slate-700 dark:text-slate-300 tabular-nums text-right">
                        {milestone.baseline2014}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-slate-500 dark:text-slate-400">
                        Current (2025–26)
                      </dt>
                      <dd className="font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums text-right">
                        {milestone.currentStatus}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-slate-500 dark:text-slate-400">
                        Official Target
                      </dt>
                      <dd className="font-mono font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums text-right">
                        {milestone.targetValue}
                      </dd>
                    </div>
                  </dl>

                  {/* Progress Track */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                      <span>Estimated Milestone Progress</span>
                      <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                        {milestone.progressPercent}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700/80 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-transform duration-300 origin-left"
                        style={{
                          backgroundColor: color,
                          transform: `scaleX(${milestone.progressPercent / 100})`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Execution factors:{' '}
                    </span>
                    {milestone.executionFactors}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Blueprint source: {milestone.agency}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
