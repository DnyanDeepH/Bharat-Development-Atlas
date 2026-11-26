import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Building2,
  Calculator,
  Compass,
  Cpu,
  Landmark,
  MapPin,
  Scale,
  Search,
  TrendingUp,
  X,
} from 'lucide-react';
import { INDICATOR_LEDGER } from '../data/developmentData';
import {
  CENTRAL_SCHEMES,
  LANDMARK_LAWS,
  STATE_PROFILES,
} from '../data/extendedModulesData';
import {
  DPI_PILLARS,
  MEGA_PROJECTS,
  STATE_SDG_SCORES,
} from '../data/advancedModulesData';
import type { WorkspaceView } from './WorkspaceBar';

export type SearchCategory =
  | 'all'
  | 'state'
  | 'indicator'
  | 'scheme'
  | 'law'
  | 'project'
  | 'tool';

export interface SearchHit {
  id: string;
  category: Exclude<SearchCategory, 'all'>;
  categoryLabel: string;
  title: string;
  subtitle: string;
  stat: string;
  keywords: string;
  view: WorkspaceView;
  subModuleId: string;
  stateId?: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateResult: (hit: SearchHit) => void;
}

const QUICK_TOOL_HITS: SearchHit[] = [
  {
    id: 'tool-state-comparator',
    category: 'tool',
    categoryLabel: 'Interactive Tool',
    title: 'Side-by-Side State & UT Comparator (2–3 States)',
    subtitle: 'Compare NSDP, tap water, highways, renewables, literacy & SDG scores',
    stat: '36 States/UTs',
    keywords: 'compare state ut radar maharashtra tamil nadu uttar pradesh sdg',
    view: 'states-budget',
    subModuleId: 'state-comparator',
  },
  {
    id: 'tool-tax-calculator',
    category: 'tool',
    categoryLabel: 'Calculator',
    title: 'Income Tax & Household Subsidy Calculator (FY 2025–26)',
    subtitle: 'Compare Old vs. New Tax Regime slabs + PM Surya Ghar, Ujjwala, PM-KISAN',
    stat: 'Budget FY26',
    keywords: 'income tax calculator old new regime 87a slab subsidy solar ujjwala',
    view: 'states-budget',
    subModuleId: 'tax-calculator',
  },
  {
    id: 'tool-fact-cards',
    category: 'tool',
    categoryLabel: 'Export Studio',
    title: 'Shareable Fact Cards & Printable Report Export',
    subtitle: 'Download PNG fact cards or print reports for states, indicators & budget',
    stat: 'PNG & Print PDF',
    keywords: 'fact card download png pdf export share report snapshot citation',
    view: 'fiscal-sources',
    subModuleId: 'fact-cards',
  },
  {
    id: 'tool-union-budget',
    category: 'tool',
    categoryLabel: 'Explorer',
    title: 'Union Budget Explorer (Where the Rupee Comes From & Goes)',
    subtitle: 'Ministry outlays, GST/Income Tax revenue & personal tax-rupee allocator',
    stat: '₹50.65L Cr',
    keywords: 'union budget finance ministry gst corporate tax rupee capex',
    view: 'states-budget',
    subModuleId: 'budget-explorer',
  },
  {
    id: 'tool-environment-ev',
    category: 'tool',
    categoryLabel: 'Tracker',
    title: 'Environment, Clean Energy & EV Tracker',
    subtitle: '500 GW 2030 target (MNRE), Vahan EV adoption, CPCB AQI & Forest Cover',
    stat: '256 GW Clean',
    keywords: 'environment solar wind 500 gw ev electric vehicle vahan aqi pollution forest ganga',
    view: 'defence-roadmap',
    subModuleId: 'environment-ev',
  },
  {
    id: 'tool-dpi-dashboard',
    category: 'tool',
    categoryLabel: 'Dashboard',
    title: 'Digital Public Infrastructure (Bharat Stack / DPI) Dashboard',
    subtitle: 'UPI volumes, Aadhaar DBT, DigiLocker, FASTag, ABHA Health ID & ONDC',
    stat: '24,162 Cr UPI',
    keywords: 'dpi digital stack upi npci aadhaar digilocker fastag abha ondc meity',
    view: 'indicators',
    subModuleId: 'dpi-dashboard',
  },
  {
    id: 'tool-mega-projects',
    category: 'tool',
    categoryLabel: 'Tracker',
    title: 'Mega Infrastructure & PM GatiShakti Project Tracker',
    subtitle: 'Expressways, Bullet Train, Vande Bharat, Metro, Semicon Fabs & Ports',
    stat: '13 Flagships',
    keywords: 'gatishakti expressway bullet train vande bharat metro dholera semicon port aiims',
    view: 'defence-roadmap',
    subModuleId: 'mega-projects',
  },
  {
    id: 'tool-policy-news',
    category: 'tool',
    categoryLabel: 'Live Feed',
    title: 'Live Policy & Development Newsroom',
    subtitle: 'Latest PIB press briefings, Cabinet decisions & economic policy headlines',
    stat: 'Live Search',
    keywords: 'news pib cabinet rbi headlines policy announcement latest',
    view: 'policy-news',
    subModuleId: 'policy-news',
  },
  {
    id: 'tool-civic-rti',
    category: 'tool',
    categoryLabel: 'Citizen Portal',
    title: 'Civic Action, RTI & Public Grievances Directory',
    subtitle: 'CPGRAMS grievance filing, RTI Online, PRS MP tracker & local works audit',
    stat: 'RTI / CPGRAMS',
    keywords: 'rti cpgrams grievance mp mla attendance sansad civic directory',
    view: 'schemes-laws',
    subModuleId: 'civic-action',
  },
];

const POPULAR_QUERIES = [
  'Maharashtra',
  'PM-KISAN',
  'Ayushman Bharat',
  'GST',
  'NEP 2020',
  'UPI',
  'Tax Calculator',
  'Bullet Train',
  '500 GW',
];

export default function GlobalSearchModal({
  isOpen,
  onClose,
  onNavigateResult,
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const allItems = useMemo<SearchHit[]>(() => {
    const stateHits: SearchHit[] = STATE_PROFILES.map((s) => ({
      id: `state-${s.id}`,
      category: 'state',
      categoryLabel: `State / UT · ${s.region}`,
      title: s.name,
      subtitle: s.keyFocus,
      stat: `${s.perCapitaDisplay} · SDG ${STATE_SDG_SCORES[s.id] ?? 70}`,
      keywords: `${s.name} ${s.region} ${s.keyFocus} state map nsdp tap water renewable highway literacy`,
      view: 'states-budget',
      subModuleId: 'states-explorer',
      stateId: s.id,
    }));

    const indicatorHits: SearchHit[] = INDICATOR_LEDGER.map((ind) => ({
      id: `ind-${ind.id}`,
      category: 'indicator',
      categoryLabel: ind.sectorLabel,
      title: ind.name,
      subtitle: `${ind.baselineYear}: ${ind.baselineDisplay} → ${ind.latestYear}: ${ind.latestDisplay} (${ind.officialSource})`,
      stat: ind.changeLabel,
      keywords: `${ind.name} ${ind.sectorLabel} ${ind.officialSource} ${ind.summary} gdp upi highway solar inflation`,
      view: 'indicators',
      subModuleId: 'indicator-ledger',
    }));

    const schemeHits: SearchHit[] = CENTRAL_SCHEMES.map((sch) => ({
      id: `scheme-${sch.id}`,
      category: 'scheme',
      categoryLabel: 'Central Scheme',
      title: sch.name,
      subtitle: `${sch.benefitSummary} · ${sch.ministry}`,
      stat: sch.portalName,
      keywords: `${sch.name} ${sch.ministry} ${sch.benefitSummary} ${sch.eligibilitySummary} ${sch.roles.join(' ')} scheme welfare`,
      view: 'schemes-laws',
      subModuleId: 'scheme-finder',
    }));

    const lawHits: SearchHit[] = LANDMARK_LAWS.map((law) => ({
      id: `law-${law.id}`,
      category: 'law',
      categoryLabel: `Landmark Law · ${law.year}`,
      title: law.title,
      subtitle: law.officialObjective,
      stat: law.category,
      keywords: `${law.title} ${law.year} ${law.category} ${law.officialObjective} ${law.parliamentaryDebate} act parliament bill`,
      view: 'schemes-laws',
      subModuleId: 'laws-timeline',
    }));

    const projectHits: SearchHit[] = MEGA_PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      category: 'project',
      categoryLabel: `Mega Project · ${proj.sector}`,
      title: proj.name,
      subtitle: `${proj.headlineSpec} · ${proj.statesCovered}`,
      stat: `${proj.outlayDisplay} · ${proj.completionPct}%`,
      keywords: `${proj.name} ${proj.sector} ${proj.statesCovered} ${proj.ministry} ${proj.headlineSpec} gatishakti infrastructure`,
      view: 'defence-roadmap',
      subModuleId: 'mega-projects',
    }));

    const dpiHits: SearchHit[] = DPI_PILLARS.map((dpi) => ({
      id: `dpi-${dpi.id}`,
      category: 'indicator',
      categoryLabel: `Bharat Stack · ${dpi.layer}`,
      title: dpi.name,
      subtitle: `${dpi.secondaryStat} · ${dpi.agency}`,
      stat: dpi.headlineStat,
      keywords: `${dpi.name} ${dpi.agency} ${dpi.layer} ${dpi.citizenImpact} dpi digital stack`,
      view: 'indicators',
      subModuleId: 'dpi-dashboard',
    }));

    return [
      ...QUICK_TOOL_HITS,
      ...stateHits,
      ...schemeHits,
      ...lawHits,
      ...indicatorHits,
      ...projectHits,
      ...dpiHits,
    ];
  }, []);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byCategory =
      category === 'all'
        ? allItems
        : allItems.filter((item) => item.category === category);

    if (!q) {
      if (category === 'all') {
        return QUICK_TOOL_HITS.slice(0, 8);
      }
      return byCategory.slice(0, 12);
    }

    const terms = q.split(/\s+/).filter(Boolean);
    const scored = byCategory
      .map((item) => {
        const titleLower = item.title.toLowerCase();
        const kwLower = item.keywords.toLowerCase();
        const subLower = item.subtitle.toLowerCase();

        const matchesAll = terms.every(
          (term) =>
            titleLower.includes(term) ||
            kwLower.includes(term) ||
            subLower.includes(term)
        );
        if (!matchesAll) return null;

        let score = 0;
        if (titleLower === q) score += 100;
        else if (titleLower.startsWith(q)) score += 60;
        else if (titleLower.includes(q)) score += 35;
        else score += 15;
        return { item, score };
      })
      .filter((entry): entry is { item: SearchHit; score: number } => entry !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 16)
      .map((entry) => entry.item);

    return scored;
  }, [allItems, category, query]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query, category, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 30);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((prev) =>
          filteredResults.length > 0 ? (prev + 1) % filteredResults.length : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((prev) =>
          filteredResults.length > 0
            ? (prev - 1 + filteredResults.length) % filteredResults.length
            : 0
        );
      } else if (e.key === 'Enter' && filteredResults[selectedIdx]) {
        e.preventDefault();
        onNavigateResult(filteredResults[selectedIdx]);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, filteredResults, selectedIdx, onNavigateResult, onClose]);

  if (!isOpen) return null;

  const renderIcon = (cat: SearchHit['category']) => {
    const cls = 'w-4 h-4 shrink-0 text-[#1E3A8A] dark:text-[#60A5FA]';
    switch (cat) {
      case 'state':
        return <MapPin className={cls} aria-hidden="true" />;
      case 'indicator':
        return <TrendingUp className={cls} aria-hidden="true" />;
      case 'scheme':
        return <Landmark className={cls} aria-hidden="true" />;
      case 'law':
        return <Scale className={cls} aria-hidden="true" />;
      case 'project':
        return <Building2 className={cls} aria-hidden="true" />;
      case 'tool':
        return <Calculator className={cls} aria-hidden="true" />;
    }
  };

  const categoryTabs: { id: SearchCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'state', label: 'States (36)' },
    { id: 'scheme', label: 'Schemes' },
    { id: 'law', label: 'Laws' },
    { id: 'indicator', label: 'Indicators & DPI' },
    { id: 'project', label: 'Projects' },
    { id: 'tool', label: 'Tools' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global instant search across Bharat Development Atlas"
      className="fixed inset-0 z-[70] flex items-start justify-center pt-16 sm:pt-24 px-4"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/55 backdrop-blur-xs"
        aria-hidden="true"
      />

      {/* Command Palette Container */}
      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[78vh]">
        {/* Search Input Row */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search
            className="w-5 h-5 text-slate-400 shrink-0"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any state, scheme (PM-KISAN), law (GST), indicator (UPI), or tool..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-950 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search query"
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 px-2 py-1 rounded-md cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search dialog"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="px-4 sm:px-5 py-2.5 bg-[#F8FAFC] dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 flex items-center gap-1 overflow-x-auto">
          {categoryTabs.map((tab) => {
            const active = category === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategory(tab.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Quick Suggestions when empty */}
        {!query.trim() && (
          <div className="px-4 sm:px-5 py-2.5 border-b border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 mr-1">Try:</span>
            {POPULAR_QUERIES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="px-2 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-[#1E3A8A] hover:text-white rounded transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
          {filteredResults.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Compass
                className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600"
                aria-hidden="true"
              />
              <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                No exact match for &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Try searching for a state (e.g. Gujarat, Kerala), scheme (PM-KISAN, Ujjwala), law (GST, IBC), or indicator (GDP, UPI, Solar).
              </p>
            </div>
          ) : (
            filteredResults.map((hit, idx) => {
              const isHighlighted = idx === selectedIdx;
              return (
                <button
                  key={hit.id}
                  type="button"
                  onMouseEnter={() => setSelectedIdx(idx)}
                  onClick={() => {
                    onNavigateResult(hit);
                    onClose();
                  }}
                  className={`w-full text-left px-4 sm:px-5 py-3 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                    isHighlighted
                      ? 'bg-[#1E3A8A]/8 dark:bg-[#2563EB]/15'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5">{renderIcon(hit.category)}</div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {hit.categoryLabel}
                      </div>
                      <div className="text-sm font-semibold text-slate-950 dark:text-slate-50 truncate">
                        {hit.title}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">
                        {hit.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="hidden sm:inline font-mono text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums">
                      {hit.stat}
                    </span>
                    <ArrowRight
                      className="w-4 h-4 text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Keyboard Hints */}
        <div className="px-4 sm:px-5 py-2.5 bg-[#F8FAFC] dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>·</span>
            <span>Enter Open</span>
            <span>·</span>
            <span>Esc Close</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{allItems.length} indexed records</span>
          </div>
        </div>
      </div>
    </div>
  );
}
