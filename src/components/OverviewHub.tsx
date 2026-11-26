import { ArrowRight } from 'lucide-react';
import type { WorkspaceView } from './WorkspaceBar';
import { useLanguage } from '../i18n/LanguageContext';

interface OverviewHubProps {
  onNavigateView: (view: WorkspaceView, subModuleId?: string) => void;
}

interface HubWorkspaceCard {
  index: string;
  view: WorkspaceView;
  title: string;
  statValue: string;
  statCaption: string;
  description: string;
  sources: string;
  quickJumps: { label: string; subModuleId: string }[];
}

const HUB_WORKSPACES: HubWorkspaceCard[] = [
  {
    index: '01',
    view: 'states-budget',
    title: 'Bharat Map, State Comparator & Tax/Budget Tools',
    statValue: '36 States & UTs',
    statCaption: 'BharatMaps choropleth · 2–3 state radar · Union Budget & FY26 Tax Calculator',
    description:
      'Explore local state data on the official Bharat map, compare up to 3 states head-to-head with NITI Aayog SDG scores, inspect where every budget rupee goes, and calculate Old vs. New Tax Regime savings.',
    sources: 'BharatMaps · MoSPI · NITI Aayog · Ministry of Finance',
    quickJumps: [
      { label: 'Bharat Map (36)', subModuleId: 'states-explorer' },
      { label: 'State Comparator', subModuleId: 'state-comparator' },
      { label: 'Union Budget', subModuleId: 'budget-explorer' },
      { label: 'Tax & Subsidies', subModuleId: 'tax-calculator' },
    ],
  },
  {
    index: '02',
    view: 'indicators',
    title: 'National Data, Digital Stack (DPI) & Workforce',
    statValue: '22 Indicators + DPI',
    statCaption: '2014–2026 charts · Bharat Stack (UPI/ABHA/ONDC) · CPI & PLFS',
    description:
      'Inspect multi-year growth trajectories, sortable official milestones with mini sparklines, population-scale Digital Public Infrastructure metrics, everyday household prices, and formal payroll trends.',
    sources: 'MoSPI · NPCI · MeitY · PPAC · TRAI · EPFO',
    quickJumps: [
      { label: 'Growth Charts', subModuleId: 'time-series' },
      { label: '22 Indicators', subModuleId: 'indicator-ledger' },
      { label: 'Digital Stack (DPI)', subModuleId: 'dpi-dashboard' },
      { label: 'Cost of Living', subModuleId: 'cost-of-living' },
      { label: 'Workforce & PLFS', subModuleId: 'workforce-skilling' },
    ],
  },
  {
    index: '03',
    view: 'schemes-laws',
    title: 'Citizen Schemes, Landmark Laws & Civic Rights',
    statValue: 'myScheme + RTI',
    statCaption: 'Eligibility finder · 2014–2026 Acts · CPGRAMS & MP Track',
    description:
      'Filter central welfare and credit schemes by demographic profile, review major reforms paired with PRS parliamentary scrutiny, and access direct RTI, CPGRAMS, and MP audit portals.',
    sources: 'myScheme · PIB · PRS Legislative Research · DARPG',
    quickJumps: [
      { label: 'Scheme Finder', subModuleId: 'scheme-finder' },
      { label: 'Citizen Impact', subModuleId: 'citizen-impact' },
      { label: 'Laws Timeline', subModuleId: 'laws-timeline' },
      { label: 'Civic Action', subModuleId: 'civic-action' },
    ],
  },
  {
    index: '04',
    view: 'policy-news',
    title: 'Live Policy & Development Newsroom',
    statValue: 'Live Feed',
    statCaption: 'Real-time PIB, RBI & economic press briefings',
    description:
      'Stay updated with live search-grounded government announcements, Union Cabinet decisions, RBI monetary updates, and macroeconomic coverage filtered by ministry or custom topic.',
    sources: 'PIB Bharat · RBI · Economic Times · Mint · BusinessLine',
    quickJumps: [
      { label: 'Open Live Newsroom', subModuleId: 'policy-news' },
    ],
  },
  {
    index: '05',
    view: 'defence-roadmap',
    title: 'Mega Projects, Clean Energy, Defence & 2047',
    statValue: '256 GW · 13 Flagships',
    statCaption: 'PM GatiShakti · 500 GW & EVs · Defence/ISRO · Global Peers',
    description:
      'Track expressways, Bullet Train, semiconductor fabs, progress toward 500 GW clean energy & Vahan EV adoption, indigenous defence/ISRO missions, global peer benchmarks, and Viksit Bharat 2047 targets.',
    sources: 'PM GatiShakti · MNRE · MoD · ISRO · IMF · CPCB',
    quickJumps: [
      { label: 'Mega Projects', subModuleId: 'mega-projects' },
      { label: 'Clean Energy & EVs', subModuleId: 'environment-ev' },
      { label: 'Defence & ISRO', subModuleId: 'defence-space' },
      { label: 'Global Peers', subModuleId: 'global-peers' },
      { label: 'Vision 2047', subModuleId: 'future-roadmap' },
    ],
  },
  {
    index: '06',
    view: 'fiscal-sources',
    title: 'Fiscal Health, Fact Cards & Verified Portals',
    statValue: 'PNG & Print PDF',
    statCaption: '4.3% FY27 BE · CAG/PRS oversight · Shareable Fact Card Studio',
    description:
      'Evaluate fiscal consolidation, inflation trends, and independent audits, or generate clean source-cited 16:9 PNG fact cards and printable PDF reports for any state, indicator, or budget.',
    sources: 'Ministry of Finance · RBI · CAG · IMF · World Bank',
    quickJumps: [
      { label: 'Fact Cards & PDF', subModuleId: 'fact-cards' },
      { label: 'Fiscal & Audits', subModuleId: 'fiscal-accountability' },
      { label: 'Context & Portals', subModuleId: 'context-sources' },
    ],
  },
];

export default function OverviewHub({ onNavigateView }: OverviewHubProps) {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="overview-hub-heading"
      className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Interactive Workspace Navigator · 22 Official Modules Across 6 Sections · Press Ctrl+K to Search Anything
          </div>
          <h2
            id="overview-hub-heading"
            className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight"
          >
            Choose a Workspace to Explore — Zero Endless Scrolling
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Every section opens as a focused interactive view with built-in sub-module tabs. Select any workspace card below, jump straight to a specific dataset, or press Ctrl + K to search states, schemes, laws, and indicators instantly.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateView('states-budget', 'states-explorer')}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 hover:border-[#1E3A8A]/40 dark:hover:border-[#60A5FA]/40 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
        >
          <span>Open {t.nav.statesBudget}</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* 6 Focused Workspace Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HUB_WORKSPACES.map((card) => (
          <article
            key={card.view}
            className="group bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-[#1E3A8A]/45 dark:hover:border-[#60A5FA]/45 rounded-xl p-6 flex flex-col justify-between transition-colors duration-150"
          >
            <div>
              {/* Quiet metadata header — zero pill boxes */}
              <div className="flex items-baseline justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono font-medium">
                  Section {card.index}
                </span>
                <span className="font-mono font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                  {card.statValue}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onNavigateView(card.view)}
                className="mt-2.5 text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] rounded"
              >
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-slate-950 dark:text-slate-50 group-hover:text-[#1E3A8A] dark:group-hover:text-[#60A5FA] transition-colors leading-snug">
                  {card.title}
                </h3>
              </button>

              <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                {card.statCaption}
              </div>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              {/* Direct Sub-Module Jump Controls */}
              <div className="flex flex-wrap items-center gap-1.5">
                {card.quickJumps.map((jump) => (
                  <button
                    key={jump.subModuleId}
                    type="button"
                    onClick={() => onNavigateView(card.view, jump.subModuleId)}
                    className="px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-200 bg-[#F8FAFC] dark:bg-[#162033] hover:bg-[#1E3A8A] dark:hover:bg-[#2563EB] hover:text-white border border-slate-200 dark:border-slate-700 hover:border-[#1E3A8A] dark:hover:border-[#2563EB] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {jump.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="truncate">{card.sources}</span>
                <button
                  type="button"
                  onClick={() => onNavigateView(card.view)}
                  className="inline-flex items-center gap-1 font-semibold text-[#1E3A8A] dark:text-[#60A5FA] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
