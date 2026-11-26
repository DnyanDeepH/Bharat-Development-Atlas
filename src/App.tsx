import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import type { WorkspaceView } from './components/WorkspaceBar';
import OverviewHub from './components/OverviewHub';
import GlobalSearchModal, { type SearchHit } from './components/GlobalSearchModal';
import PolicyNewsSection from './components/PolicyNewsSection';
import TimeSeriesExplorer from './components/TimeSeriesExplorer';
import IndicatorLedger from './components/IndicatorLedger';
import DpiDashboardSection from './components/DpiDashboardSection';
import StateExplorerSection from './components/StateExplorerSection';
import StateComparatorSection from './components/StateComparatorSection';
import BudgetExplorerSection from './components/BudgetExplorerSection';
import TaxSubsidyCalculatorSection from './components/TaxSubsidyCalculatorSection';
import CostOfLivingSection from './components/CostOfLivingSection';
import WorkforceSkillingSection from './components/WorkforceSkillingSection';
import SchemeFinderSection from './components/SchemeFinderSection';
import CitizenImpactSection from './components/CitizenImpactSection';
import LawsTimelineSection from './components/LawsTimelineSection';
import CivicActionSection from './components/CivicActionSection';
import MegaProjectsSection from './components/MegaProjectsSection';
import EnvironmentEnergySection from './components/EnvironmentEnergySection';
import DefenceSpaceSection from './components/DefenceSpaceSection';
import GlobalPeersSection from './components/GlobalPeersSection';
import FutureRoadmapSection from './components/FutureRoadmapSection';
import FiscalAccountabilitySection from './components/FiscalAccountabilitySection';
import FactCardStudioSection from './components/FactCardStudioSection';
import BalancedContextSection from './components/BalancedContextSection';
import Footer from './components/Footer';
import { INDICATOR_LEDGER } from './data/developmentData';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

interface SubModuleMeta {
  id: string;
  label: string;
}

const WORKSPACE_SUBMODULES: Record<
  Exclude<WorkspaceView, 'overview'>,
  { title: string; modules: SubModuleMeta[] }
> = {
  'policy-news': {
    title: 'Policy & Development Newsroom',
    modules: [{ id: 'policy-news', label: 'Live PIB & Economic Feed' }],
  },
  indicators: {
    title: 'National Data, Digital Stack (DPI) & Workforce',
    modules: [
      { id: 'time-series', label: 'Growth Trajectories' },
      { id: 'indicator-ledger', label: '22-Indicator Ledger' },
      { id: 'dpi-dashboard', label: 'Digital Stack (DPI)' },
      { id: 'cost-of-living', label: 'Cost of Living' },
      { id: 'workforce-skilling', label: 'Workforce & PLFS' },
    ],
  },
  'states-budget': {
    title: 'Bharat Map, State Comparator, Budget & Tax',
    modules: [
      { id: 'states-explorer', label: 'Bharat Map (36)' },
      { id: 'state-comparator', label: 'State Comparator (2–3)' },
      { id: 'budget-explorer', label: 'Union Budget Explorer' },
      { id: 'tax-calculator', label: 'Tax & Subsidy Calculator' },
    ],
  },
  'schemes-laws': {
    title: 'Citizen Schemes, Landmark Laws & Civic Rights',
    modules: [
      { id: 'scheme-finder', label: 'Scheme Eligibility Finder' },
      { id: 'citizen-impact', label: 'Citizen Impact Profiles' },
      { id: 'laws-timeline', label: 'Landmark Laws (2014–26)' },
      { id: 'civic-action', label: 'Civic Action & RTI' },
    ],
  },
  'defence-roadmap': {
    title: 'Mega Projects, Clean Energy, Defence & Vision 2047',
    modules: [
      { id: 'mega-projects', label: 'Mega Projects & GatiShakti' },
      { id: 'environment-ev', label: 'Clean Energy & EVs' },
      { id: 'defence-space', label: 'Defence & ISRO' },
      { id: 'global-peers', label: 'Bharat vs. Global Peers' },
      { id: 'future-roadmap', label: 'Viksit Bharat 2047' },
    ],
  },
  'fiscal-sources': {
    title: 'Fiscal Health, Fact Cards & Verified Portals',
    modules: [
      { id: 'fact-cards', label: 'Fact Cards & PDF Export' },
      { id: 'fiscal-accountability', label: 'Fiscal Deficit & Audits' },
      { id: 'context-sources', label: 'Independent Context & Portals' },
    ],
  },
};

const ORDERED_MODULES: {
  view: Exclude<WorkspaceView, 'overview'>;
  subModuleId: string;
  label: string;
}[] = (
  [
    'states-budget',
    'indicators',
    'schemes-laws',
    'policy-news',
    'defence-roadmap',
    'fiscal-sources',
  ] as const
).flatMap((view) =>
  WORKSPACE_SUBMODULES[view].modules.map((mod) => ({
    view,
    subModuleId: mod.id,
    label: mod.label,
  }))
);

function escapeCsvCell(value: string): string {
  const escaped = value.replace(/"/g, '""');
  return `"${escaped}"`;
}

function AtlasContent() {
  const [activeView, setActiveView] = useState<WorkspaceView>('overview');
  const [subModulesByView, setSubModulesByView] = useState<
    Record<Exclude<WorkspaceView, 'overview'>, string>
  >({
    'policy-news': 'policy-news',
    indicators: 'time-series',
    'states-budget': 'states-explorer',
    'schemes-laws': 'scheme-finder',
    'defence-roadmap': 'mega-projects',
    'fiscal-sources': 'fact-cards',
  });
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [focusedStateId, setFocusedStateId] = useState<string | undefined>(
    undefined
  );
  const [factCardStateId, setFactCardStateId] = useState<string | undefined>(
    undefined
  );
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const scrollToTopSmooth = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateView = (view: WorkspaceView, subModuleId?: string) => {
    setActiveView(view);
    if (view !== 'overview' && subModuleId) {
      const validIds = WORKSPACE_SUBMODULES[view].modules.map((m) => m.id);
      if (validIds.includes(subModuleId)) {
        setSubModulesByView((prev) => ({ ...prev, [view]: subModuleId }));
      }
    }
    scrollToTopSmooth();
  };

  const handleSearchNavigate = (hit: SearchHit) => {
    if (hit.stateId) {
      setFocusedStateId(hit.stateId);
    }
    handleNavigateView(hit.view, hit.subModuleId);
  };

  const handleOpenStateFactCard = (stateId: string) => {
    setFactCardStateId(stateId);
    handleNavigateView('fiscal-sources', 'fact-cards');
  };

  const handleSelectSubModule = (
    view: Exclude<WorkspaceView, 'overview'>,
    subModuleId: string
  ) => {
    setSubModulesByView((prev) => ({ ...prev, [view]: subModuleId }));
    scrollToTopSmooth();
  };

  const handleExportCsv = () => {
    const headers = [
      'Indicator',
      'Sector',
      'Baseline Year',
      'Baseline Value',
      'Latest Period',
      'Latest Official Value',
      'Scale / Shift',
      'Unit',
      'Official Source',
      'Official Summary',
      'Independent Context',
    ];

    const rows = INDICATOR_LEDGER.map((row) =>
      [
        row.name,
        row.sectorLabel,
        row.baselineYear,
        row.baselineDisplay,
        row.latestYear,
        row.latestDisplay,
        row.changeLabel,
        row.unit,
        row.officialSource,
        row.summary,
        row.contextNote,
      ]
        .map(escapeCsvCell)
        .join(',')
    );

    const csvContent = [headers.map(escapeCsvCell).join(','), ...rows].join(
      '\n'
    );
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'bharat-development-atlas-2014-2026.csv';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);

    setExportNotice('Exported 22 official indicators to CSV.');
    window.setTimeout(() => {
      setExportNotice(null);
    }, 3200);
  };

  const currentSubModule =
    activeView === 'overview' ? null : subModulesByView[activeView];

  const currentFlatIdx =
    activeView === 'overview'
      ? -1
      : ORDERED_MODULES.findIndex(
          (m) => m.view === activeView && m.subModuleId === currentSubModule
        );
  const prevStep =
    currentFlatIdx > 0 ? ORDERED_MODULES[currentFlatIdx - 1] : null;
  const nextStep =
    currentFlatIdx >= 0 && currentFlatIdx < ORDERED_MODULES.length - 1
      ? ORDERED_MODULES[currentFlatIdx + 1]
      : null;

  const renderFocusedModule = () => {
    if (activeView === 'overview') return null;

    switch (currentSubModule) {
      case 'policy-news':
        return <PolicyNewsSection />;
      case 'time-series':
        return <TimeSeriesExplorer />;
      case 'indicator-ledger':
        return <IndicatorLedger />;
      case 'dpi-dashboard':
        return <DpiDashboardSection />;
      case 'cost-of-living':
        return <CostOfLivingSection />;
      case 'workforce-skilling':
        return <WorkforceSkillingSection />;
      case 'states-explorer':
        return <StateExplorerSection initialStateId={focusedStateId} />;
      case 'state-comparator':
        return (
          <StateComparatorSection onOpenFactCard={handleOpenStateFactCard} />
        );
      case 'budget-explorer':
        return <BudgetExplorerSection />;
      case 'tax-calculator':
        return <TaxSubsidyCalculatorSection />;
      case 'scheme-finder':
        return <SchemeFinderSection />;
      case 'citizen-impact':
        return <CitizenImpactSection />;
      case 'laws-timeline':
        return <LawsTimelineSection />;
      case 'civic-action':
        return <CivicActionSection />;
      case 'mega-projects':
        return <MegaProjectsSection />;
      case 'environment-ev':
        return <EnvironmentEnergySection />;
      case 'defence-space':
        return <DefenceSpaceSection />;
      case 'global-peers':
        return <GlobalPeersSection />;
      case 'future-roadmap':
        return <FutureRoadmapSection />;
      case 'fact-cards':
        return <FactCardStudioSection initialStateId={factCardStateId} />;
      case 'fiscal-accountability':
        return <FiscalAccountabilitySection />;
      case 'context-sources':
        return <BalancedContextSection />;
      default:
        return null;
    }
  };

  return (
    <div
      id="top"
      className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-slate-100 transition-colors duration-200"
    >
      <Header
        activeView={activeView}
        onExportCsv={handleExportCsv}
        onOpenSearch={() => setSearchOpen(true)}
        onNavigateView={handleNavigateView}
      />

      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateResult={handleSearchNavigate}
      />

      {/* Top padding leaves clean breathing room for the floating glassmorphism navbar */}
      <main className="flex-1 pt-20 sm:pt-[84px]">
        {activeView === 'overview' ? (
          <>
            <HeroSection onNavigateView={handleNavigateView} />
            <OverviewHub onNavigateView={handleNavigateView} />
          </>
        ) : (
          <>
            {/* Contextual Breadcrumb & Interactive Sub-Module Switcher */}
            <div className="bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleNavigateView('overview')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-[#1E3A8A] dark:hover:text-[#60A5FA] bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Overview</span>
                  </button>
                  <span
                    aria-hidden="true"
                    className="text-slate-300 dark:text-slate-600 text-xs"
                  >
                    /
                  </span>
                  <h1 className="font-serif text-base sm:text-lg font-semibold text-slate-950 dark:text-slate-50 truncate">
                    {WORKSPACE_SUBMODULES[activeView].title}
                  </h1>
                </div>

                {WORKSPACE_SUBMODULES[activeView].modules.length > 1 && (
                  <div
                    role="tablist"
                    aria-label="Select module inside workspace"
                    className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto max-w-full"
                  >
                    {WORKSPACE_SUBMODULES[activeView].modules.map((mod) => {
                      const isSelected = currentSubModule === mod.id;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() =>
                            handleSelectSubModule(activeView, mod.id)
                          }
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] ${
                            isSelected
                              ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white font-semibold'
                              : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                          }`}
                        >
                          {mod.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Single Focused Interactive Module — Zero Infinite Scroll */}
            <div key={`${activeView}-${currentSubModule}`}>
              {renderFocusedModule()}
            </div>

            {/* Clean Previous / Next Module Stepper Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1120]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
                {prevStep ? (
                  <button
                    type="button"
                    onClick={() =>
                      handleNavigateView(prevStep.view, prevStep.subModuleId)
                    }
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 text-left bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-[#1E3A8A]/45 dark:hover:border-[#60A5FA]/45 rounded-xl transition-colors cursor-pointer"
                  >
                    <ArrowLeft
                      className="w-4 h-4 text-slate-400 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Previous Module
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {prevStep.label}
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavigateView('overview')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-[#1E3A8A]/45 dark:hover:border-[#60A5FA]/45 rounded-xl transition-colors cursor-pointer"
                  >
                    <LayoutGrid className="w-4 h-4" aria-hidden="true" />
                    <span>Back to Overview</span>
                  </button>
                )}

                <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  Module {currentFlatIdx + 1} of {ORDERED_MODULES.length}
                </span>

                {nextStep ? (
                  <button
                    type="button"
                    onClick={() =>
                      handleNavigateView(nextStep.view, nextStep.subModuleId)
                    }
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 text-right bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-[#1E3A8A]/45 dark:hover:border-[#60A5FA]/45 rounded-xl transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Next Module
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {nextStep.label}
                      </div>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 text-[#1E3A8A] dark:text-[#60A5FA] shrink-0"
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavigateView('overview')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] hover:bg-[#172E6E] dark:hover:bg-[#1D4ED8] rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Return to Overview</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <Footer onExportCsv={handleExportCsv} />

      {exportNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-slate-950 dark:bg-slate-800 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-lg border border-slate-800 dark:border-slate-700"
        >
          {exportNotice}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AtlasContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
