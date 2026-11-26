import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGE_OPTIONS } from '../i18n/translations';

export type WorkspaceView =
  | 'overview'
  | 'policy-news'
  | 'indicators'
  | 'states-budget'
  | 'schemes-laws'
  | 'defence-roadmap'
  | 'fiscal-sources';

interface WorkspaceBarProps {
  activeView: WorkspaceView;
  onSelectView: (view: WorkspaceView) => void;
}

export default function WorkspaceBar({
  activeView,
  onSelectView,
}: WorkspaceBarProps) {
  const { language, setLanguage, t } = useLanguage();

  const tabs: { id: WorkspaceView; label: string }[] = [
    { id: 'overview', label: t.workspace.allModules },
    { id: 'policy-news', label: t.workspace.policyNews },
    { id: 'indicators', label: t.workspace.indicators },
    { id: 'states-budget', label: t.workspace.statesBudget },
    { id: 'schemes-laws', label: t.workspace.schemesLaws },
    { id: 'defence-roadmap', label: t.workspace.defenceRoadmap },
    { id: 'fiscal-sources', label: t.workspace.fiscalSources },
  ];

  return (
    <div
      id="workspace-toolbar"
      className="bg-[#F8FAFC] dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        {/* Left: Workspace Switcher */}
        <div
          role="tablist"
          aria-label="Switch portal workspace"
          className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg overflow-x-auto max-w-full"
        >
          {tabs.map((tab) => {
            const isSelected = activeView === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectView(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] ${
                  isSelected
                    ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right: Regional Language Switcher */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
              <Globe className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span>{t.workspace.languageLabel}:</span>
            </span>
            <div
              role="group"
              aria-label="Select display language"
              className="inline-flex items-center gap-0.5 p-1 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 rounded-lg"
            >
              {LANGUAGE_OPTIONS.map((opt) => {
                const isSelected = language === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLanguage(opt.code)}
                    title={opt.englishName}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] ${
                      isSelected
                        ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt.nativeLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
