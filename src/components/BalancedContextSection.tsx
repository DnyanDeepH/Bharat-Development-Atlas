import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  INDEPENDENT_PERSPECTIVES,
  OFFICIAL_PORTALS,
} from '../data/developmentData';

type PortalFilter = 'all' | 'Government of Bharat' | 'Multilateral & Independent';

export default function BalancedContextSection() {
  const [portalFilter, setPortalFilter] = useState<PortalFilter>('all');

  const filteredPortals =
    portalFilter === 'all'
      ? OFFICIAL_PORTALS
      : OFFICIAL_PORTALS.filter((p) => p.category === portalFilter);

  return (
    <section
      id="context-sources"
      className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Part A: Independent Institutional Assessments & Structural Context */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Balanced Analytical Context
        </div>
        <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
          Independent Assessments &amp; Ongoing Structural Challenges
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Macroeconomic expansion and public infrastructure delivery coexist with
          structural policy debates. Global institutions and independent
          economists—including the{' '}
          <span className="text-slate-900 dark:text-slate-100 font-medium">
            IMF
          </span>
          ,{' '}
          <span className="text-slate-900 dark:text-slate-100 font-medium">
            World Bank
          </span>
          ,{' '}
          <span className="text-slate-900 dark:text-slate-100 font-medium">
            RBI
          </span>
          , and{' '}
          <span className="text-slate-900 dark:text-slate-100 font-medium">
            World Inequality Lab / NIPFP
          </span>
          —highlight four core areas shaping Bharat’s long-term trajectory.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {INDEPENDENT_PERSPECTIVES.map((item) => (
          <article
            key={item.id}
            className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {item.institution}
                </span>
                <span aria-hidden="true">·</span>
                <span>{item.reportReference}</span>
              </div>

              <h3 className="mt-2.5 font-serif text-lg sm:text-xl font-semibold text-slate-950 dark:text-slate-50 leading-snug">
                {item.topic}
              </h3>

              <p className="mt-2 text-sm font-medium text-[#1E3A8A] dark:text-[#60A5FA] leading-relaxed">
                {item.headlineFinding}
              </p>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.whatDataShows}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Policy focus ahead:{' '}
              </span>
              {item.policyImplication}
            </div>
          </article>
        ))}
      </div>

      {/* Part B: Official Data Source Directory */}
      <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Primary Verification Directory
            </div>
            <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
              Official Government &amp; Multilateral Data Portals
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Verify statistics directly from primary Government of Bharat
              ministries, statistical agencies, and multilateral economic
              repositories.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter source portals"
            className="inline-flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg shrink-0 w-fit"
          >
            {(
              [
                { id: 'all', label: 'All Portals' },
                { id: 'Government of Bharat', label: 'Govt. of Bharat' },
                { id: 'Multilateral & Independent', label: 'Multilateral' },
              ] as const
            ).map((tab) => {
              const isActive = portalFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setPortalFilter(tab.id)}
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
        </div>

        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800">
          {filteredPortals.map((portal) => (
            <div
              key={portal.name}
              className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                    {portal.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-slate-300 dark:text-slate-600"
                  >
                    ·
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {portal.category}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {portal.agency}
                </div>
                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 mt-1.5">
                  {portal.coverage}
                </p>
              </div>

              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#162033] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
              >
                <span>Open Portal</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
