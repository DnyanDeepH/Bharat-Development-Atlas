import { useState } from 'react';
import { CITIZEN_PROFILES } from '../data/developmentData';

export default function CitizenImpactSection() {
  const [selectedId, setSelectedId] = useState(CITIZEN_PROFILES[0].id);
  const activeProfile =
    CITIZEN_PROFILES.find((item) => item.id === selectedId) ??
    CITIZEN_PROFILES[0];

  return (
    <section
      id="citizen-lens"
      className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Citizen Profile Lens · Official Reach &amp; Context
        </div>
        <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
          How Public Programs Reach Different Citizens
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Select a citizen profile to inspect official scheme reach (2014–2026),
          upcoming national initiatives, and independent policy observations for
          that segment.
        </p>

        {/* Profile Selector Tabs */}
        <div
          role="tablist"
          aria-label="Select citizen profile"
          className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg w-fit"
        >
          {CITIZEN_PROFILES.map((profile) => {
            const isActive = profile.id === activeProfile.id;
            return (
              <button
                key={profile.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedId(profile.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {profile.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric 2-column Briefing */}
      <div className="mt-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        {/* Profile Summary Strip */}
        <div className="px-6 py-5 bg-[#F8FAFC] dark:bg-[#162033] border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-semibold text-slate-950 dark:text-slate-50">
              {activeProfile.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              {activeProfile.subtitle}
            </p>
          </div>
          <div className="sm:text-right">
            <div className="font-mono text-2xl font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
              {activeProfile.headlineMetric}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              {activeProfile.headlineLabel}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
          {/* Left: Flagship Official Programs (7 cols) */}
          <div className="lg:col-span-7 p-6">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
              Flagship Official Programs (2014–2026)
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {activeProfile.flagshipSchemes.map((scheme) => (
                <div
                  key={scheme.name}
                  className="py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                      {scheme.name}
                    </h4>
                    <span className="font-mono text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                      {scheme.officialReach}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {scheme.description}
                  </p>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
                    <span>Launched {scheme.launchYear}</span>
                    <span aria-hidden="true">·</span>
                    <span>Source: {scheme.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Upcoming Pipeline & Balanced Policy Context (5 cols) */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6 bg-[#F8FAFC]/50 dark:bg-[#0F172A]/50">
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                Planned &amp; Ongoing Pipeline (2026–2047)
              </div>
              <div className="space-y-4">
                {activeProfile.upcomingInitiatives.map((item) => (
                  <div
                    key={item.title}
                    className="pb-4 border-b border-slate-200 dark:border-slate-800 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </h4>
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {item.horizon}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Independent Context &amp; Policy Considerations
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeProfile.independentContext.observation}
              </p>
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Attributed to: {activeProfile.independentContext.source}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
