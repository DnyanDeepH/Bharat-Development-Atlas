import { useState } from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { HERO_TRACKS, MACRO_PROOF_STRIP } from '../data/developmentData';
import { useLanguage } from '../i18n/LanguageContext';
import type { WorkspaceView } from './WorkspaceBar';

interface HeroSectionProps {
  onNavigateView: (view: WorkspaceView, subModuleId?: string) => void;
}

export default function HeroSection({ onNavigateView }: HeroSectionProps) {
  const [selectedTrackId, setSelectedTrackId] = useState(HERO_TRACKS[0].id);
  const { t } = useLanguage();
  const activeTrack =
    HERO_TRACKS.find((track) => track.id === selectedTrackId) ?? HERO_TRACKS[0];

  return (
    <section
      className="bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:pt-10 lg:pb-14">
        {/* Two-column editorial split with equal stretched height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Authoritative Editorial Framing */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
                <span>{t.hero.kicker1}</span>
                <span aria-hidden="true">·</span>
                <span>{t.hero.kicker2}</span>
                <span aria-hidden="true">·</span>
                <span>{t.hero.kicker3}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[3.05rem] font-semibold tracking-tight text-slate-950 dark:text-slate-50 leading-[1.14] max-w-2xl">
                {t.hero.headline}
              </h1>

              <p className="mt-5 text-base sm:text-[17px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {t.hero.deck}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigateView('indicators', 'indicator-ledger')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] hover:bg-[#172E6E] dark:hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-offset-[#111827]"
              >
                <span>{t.actions.exploreIndicators}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() =>
                  onNavigateView('fiscal-sources', 'context-sources')
                }
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#1E3A8A] dark:hover:text-[#60A5FA] transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] rounded-lg"
              >
                <span>{t.actions.readContext}</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right: Interactive Decade Snapshot Comparator */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h2 className="font-sans text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {t.hero.comparatorTitle}
                  </h2>
                  <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    2014 vs. 2025–26
                  </span>
                </div>

                {/* Interactive Segmented Control */}
                <div
                  role="tablist"
                  aria-label="Headline growth sectors"
                  className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg mb-6"
                >
                  {HERO_TRACKS.map((track) => {
                    const isActive = track.id === activeTrack.id;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedTrackId(track.id)}
                        className={`px-2.5 py-2 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap truncate cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] ${
                          isActive
                            ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {track.label}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Track Comparison Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {activeTrack.metricTitle}
                    </div>
                    <div className="mt-1 font-mono text-lg sm:text-xl font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                      {activeTrack.highlightStat}
                    </div>
                  </div>

                  {/* Baseline Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2 text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        Baseline ({activeTrack.baselineYear})
                      </span>
                      <span className="font-mono font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                        {activeTrack.baselineValue}
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-400 dark:bg-slate-500 rounded-full transition-transform duration-300 origin-left"
                        style={{
                          transform: `scaleX(${activeTrack.baselineRatio / 100})`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Latest Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2 text-xs">
                      <span className="text-slate-900 dark:text-slate-100 font-semibold">
                        Latest ({activeTrack.latestYear})
                      </span>
                      <span className="font-mono font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
                        {activeTrack.latestValue}
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1E3A8A] dark:bg-[#3B82F6] rounded-full transition-transform duration-300 origin-left"
                        style={{
                          transform: `scaleX(${activeTrack.latestRatio / 100})`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                    {activeTrack.summary}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                Source:{' '}
                <span className="text-slate-700 dark:text-slate-200">
                  {activeTrack.source}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-column Macro Proof Strip below hero split */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
            {MACRO_PROOF_STRIP.map((item) => (
              <div
                key={item.label}
                className="py-5 sm:px-6 first:sm:pl-0 last:sm:pr-0"
              >
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {item.label}
                </div>
                <div className="mt-1 font-mono text-2xl sm:text-[26px] font-semibold text-slate-950 dark:text-slate-50 tabular-nums tracking-tight">
                  {item.value}
                </div>
                <div className="mt-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {item.delta}
                </div>
                <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  Source: {item.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
