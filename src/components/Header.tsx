import { useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  Download,
  Globe,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGE_OPTIONS } from '../i18n/translations';
import { useTheme } from '../context/ThemeContext';
import type { WorkspaceView } from './WorkspaceBar';

interface HeaderProps {
  activeView: WorkspaceView;
  onExportCsv: () => void;
  onOpenSearch: () => void;
  onNavigateView: (view: WorkspaceView, subModuleId?: string) => void;
}

export default function Header({
  activeView,
  onExportCsv,
  onOpenSearch,
  onNavigateView,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close language dropdown on outside click or Escape
  useEffect(() => {
    if (!langOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(e.target as Node)
      ) {
        setLangOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [langOpen]);

  // Unified 7-workspace navigation — single navbar, zero duplicate bars
  const navLinks: { label: string; view: WorkspaceView }[] = [
    { label: t.nav.overview, view: 'overview' },
    { label: t.workspace.policyNews, view: 'policy-news' },
    { label: t.nav.indicators, view: 'indicators' },
    { label: t.nav.statesBudget, view: 'states-budget' },
    { label: t.nav.schemesLaws, view: 'schemes-laws' },
    { label: t.nav.defenceRoadmap, view: 'defence-roadmap' },
    { label: t.nav.fiscalSources, view: 'fiscal-sources' },
  ];

  const currentLangOption =
    LANGUAGE_OPTIONS.find((opt) => opt.code === language) ??
    LANGUAGE_OPTIONS[0];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    view: WorkspaceView
  ) => {
    e.preventDefault();
    onNavigateView(view);
    setMobileOpen(false);
    setLangOpen(false);
  };

  return (
    <div className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-5 pointer-events-none">
      <header
        className={`pointer-events-auto max-w-7xl mx-auto rounded-2xl border backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-200 ${
          isScrolled
            ? 'bg-white/84 dark:bg-[#0F172A]/84 border-slate-200/85 dark:border-slate-700/75 shadow-[0_12px_36px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.52),inset_0_1px_0_rgba(255,255,255,0.1)]'
            : 'bg-white/72 dark:bg-[#0F172A]/70 border-white/70 dark:border-slate-700/55 shadow-[0_8px_28px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)]'
        }`}
      >
        <div className="px-3.5 sm:px-5 h-14 flex items-center justify-between gap-4">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => handleLinkClick(e, 'overview')}
            className="font-serif text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] rounded"
          >
            {t.brand}
          </a>

          {/* Zone 2: Single Unified Navigation Bar (all 7 workspaces on desktop) */}
          <nav
            aria-label="Primary navigation"
            className="hidden xl:flex items-center gap-4 2xl:gap-5 text-xs 2xl:text-[13px] font-medium"
          >
            {navLinks.map((link) => {
              const isActive = activeView === link.view;
              return (
                <a
                  key={link.view}
                  href={`#${link.view}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, link.view)}
                  className={`py-1.5 border-b-2 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] rounded-xs ${
                    isActive
                      ? 'text-[#1E3A8A] dark:text-[#60A5FA] border-[#1E3A8A] dark:border-[#60A5FA] font-semibold'
                      : 'text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Search (Ctrl+K) + Language Selector + Theme Toggle + Export CSV + Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Global Search Trigger */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Open global instant search (Ctrl+K)"
              title="Search states, schemes, laws, indicators (Ctrl+K)"
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/65 dark:bg-slate-800/65 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA]"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Compact Language Selector Dropdown inside Main Navbar */}
            <div ref={langMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((prev) => !prev)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label={`Select language (current: ${currentLangOption.englishName})`}
                title={`${t.workspace.languageLabel}: ${currentLangOption.englishName}`}
                className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/65 dark:bg-slate-800/65 hover:bg-white dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA]"
              >
                <Globe className="w-3.5 h-3.5 shrink-0 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                <span className="hidden sm:inline">
                  {language === 'en' ? 'EN' : currentLangOption.nativeLabel}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${
                    langOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {langOpen && (
                <div
                  role="listbox"
                  aria-label="Choose display language"
                  className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl shadow-xl py-1.5 z-50"
                >
                  {LANGUAGE_OPTIONS.map((opt) => {
                    const isSelected = language === opt.code;
                    return (
                      <button
                        key={opt.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setLanguage(opt.code);
                          setLangOpen(false);
                        }}
                        className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#1E3A8A]/10 dark:bg-[#2563EB]/20 text-[#1E3A8A] dark:text-[#60A5FA] font-semibold'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>
                          {opt.nativeLabel}
                          {opt.code !== 'en' && (
                            <span className="ml-1.5 text-[11px] text-slate-400 font-normal">
                              {opt.englishName}
                            </span>
                          )}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label={
                isDark
                  ? `Switch to ${t.workspace.lightMode} mode`
                  : `Switch to ${t.workspace.darkMode} mode`
              }
              title={isDark ? t.workspace.lightMode : t.workspace.darkMode}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/65 dark:bg-slate-800/65 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-amber-300 transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA]"
            >
              {isDark ? (
                <Sun className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            {/* Primary Action: Export CSV */}
            <button
              type="button"
              onClick={onExportCsv}
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 text-xs font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] hover:bg-[#172E6E] dark:hover:bg-[#1D4ED8] rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-offset-[#0F172A]"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.actions.exportCsv}</span>
            </button>

            {/* Mobile & Tablet Navigation Drawer Toggle */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen((prev) => !prev);
                setLangOpen(false);
              }}
              aria-expanded={mobileOpen}
              aria-label={
                mobileOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              className="xl:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Floating Glass Drawer */}
        {mobileOpen && (
          <div className="xl:hidden border-t border-slate-200/70 dark:border-slate-700/70 px-4 py-3.5 space-y-3 rounded-b-2xl bg-white/90 dark:bg-[#0F172A]/92 backdrop-blur-xl">
            <nav
              aria-label="Mobile navigation"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1"
            >
              {navLinks.map((link) => {
                const isActive = activeView === link.view;
                return (
                  <a
                    key={link.view}
                    href={`#${link.view}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => handleLinkClick(e, link.view)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#1E3A8A]/10 dark:bg-[#60A5FA]/15 text-[#1E3A8A] dark:text-[#60A5FA] font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="pt-2.5 border-t border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenSearch();
                }}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800/90 rounded-lg cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Quick Search (Ctrl + K)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onExportCsv();
                  setMobileOpen(false);
                }}
                className="sm:hidden w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] hover:bg-[#172E6E] dark:hover:bg-[#1D4ED8] rounded-xl transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.actions.exportCsv}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
