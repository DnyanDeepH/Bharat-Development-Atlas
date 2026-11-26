import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  LANDMARK_LAWS,
  type LawCategory,
} from '../data/extendedModulesData';
import { useLanguage } from '../i18n/LanguageContext';

const LAW_CATEGORIES: LawCategory[] = [
  'All',
  'Economy & Tax',
  'Governance & Justice',
  'Social & Digital',
];

export default function LawsTimelineSection() {
  const { t } = useLanguage();
  const [category, setCategory] = useState<LawCategory>('All');

  const items =
    category === 'All'
      ? LANDMARK_LAWS
      : LANDMARK_LAWS.filter((item) => item.category === category);

  return (
    <section
      id="laws-timeline"
      className="py-14 lg:py-20 bg-white dark:bg-[#111827] border-t border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.sections.lawsKicker}
            </div>
            <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
              {t.sections.lawsTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {t.sections.lawsSubtitle}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter legislation by domain"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit"
          >
            {LAW_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  category === cat
                    ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Chronological Balanced Ledger */}
        <div className="mt-8 space-y-5">
          {items.map((law) => (
            <article
              key={law.id}
              className="bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-4 bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-mono text-sm font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                    {law.year}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-slate-950 dark:text-slate-50">
                    {law.title}
                  </h3>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
                  <span>{law.category}</span>
                  <a
                    href={law.prsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#1E3A8A] dark:text-[#60A5FA] font-semibold hover:underline whitespace-nowrap"
                  >
                    <span>Legislative Brief</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
                <div className="p-5 sm:p-6">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Official Government Objective
                  </div>
                  <p className="mt-2 text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {law.officialObjective}
                  </p>
                  <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                    Attributed to: {law.officialSource}
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-white/60 dark:bg-[#0F172A]/60">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Parliamentary Scrutiny &amp; Expert Debate
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {law.parliamentaryDebate}
                  </p>
                  <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                    Attributed to: {law.debateSource}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
