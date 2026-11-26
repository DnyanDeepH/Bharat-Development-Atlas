import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  CITIZEN_HOWTO_GUIDES,
  CIVIC_TOOLS,
  type CivicCategory,
} from '../data/citizenModulesData';
import { useLanguage } from '../i18n/LanguageContext';

const CIVIC_CATEGORIES: CivicCategory[] = [
  'All',
  'Parliament & MPs',
  'Grievances & RTI',
  'Local Works & Audits',
  'Digital Services',
];

export default function CivicActionSection() {
  const { t } = useLanguage();
  const [category, setCategory] = useState<CivicCategory>('All');
  const [guideId, setGuideId] = useState<string>(CITIZEN_HOWTO_GUIDES[0].id);

  const visibleTools =
    category === 'All'
      ? CIVIC_TOOLS
      : CIVIC_TOOLS.filter((tool) => tool.category === category);

  const activeGuide =
    CITIZEN_HOWTO_GUIDES.find((g) => g.id === guideId) ??
    CITIZEN_HOWTO_GUIDES[0];

  return (
    <section
      id="civic-action"
      className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t.sections.civicKicker}
          </div>
          <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
            {t.sections.civicTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
            {t.sections.civicSubtitle}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter civic action portals"
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg w-fit"
        >
          {CIVIC_CATEGORIES.map((cat) => (
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

      {/* Main Split: Official Civic Portals Directory (7 cols) + Step-by-Step Citizen Action Guides (5 cols) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Directory List */}
        <div className="lg:col-span-7 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800">
          {visibleTools.map((tool) => (
            <div
              key={tool.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {tool.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{tool.operator}</span>
                </div>
                <h3 className="text-sm sm:text-[15px] font-semibold text-slate-950 dark:text-slate-50">
                  {tool.name}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tool.whatYouCanDo}
                </p>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {tool.typicalTimeline}
                </div>
              </div>

              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
              >
                <span>{tool.domain}</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>

        {/* Step-by-Step Practical Citizen Guide */}
        <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Practical Citizen Walkthrough
          </div>
          <h3 className="mt-1 font-serif text-lg font-semibold text-slate-950 dark:text-slate-50">
            Step-by-Step Action Guides
          </h3>

          {/* Guide Switcher */}
          <div className="mt-4 flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {CITIZEN_HOWTO_GUIDES.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGuideId(g.id)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeGuide.id === g.id
                    ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {g.id === 'guide-rti'
                  ? 'File RTI'
                  : g.id === 'guide-cpgrams'
                    ? 'CPGRAMS'
                    : 'Check MP'}
              </button>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              {activeGuide.title}
            </h4>
            <div className="mt-1 font-mono text-xs text-[#1E3A8A] dark:text-[#60A5FA]">
              {activeGuide.feeAndTime}
            </div>

            <ol className="mt-4 space-y-3">
              {activeGuide.steps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed"
                >
                  <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums shrink-0 mt-0.5">
                    0{index + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <a
                href={activeGuide.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] hover:bg-[#172E6E] dark:hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>{activeGuide.officialLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
