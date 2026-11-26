import { useMemo, useState } from 'react';
import { ExternalLink, RotateCcw } from 'lucide-react';
import {
  CENTRAL_SCHEMES,
  type SchemeNeed,
  type SchemeResidence,
  type SchemeRole,
} from '../data/extendedModulesData';
import { useLanguage } from '../i18n/LanguageContext';

const ROLE_OPTIONS: { id: SchemeRole; label: string }[] = [
  { id: 'all', label: 'All Profiles' },
  { id: 'student', label: 'Student / Youth' },
  { id: 'farmer', label: 'Farmer / Rural' },
  { id: 'woman', label: 'Woman / Entrepreneur' },
  { id: 'senior', label: 'Senior Citizen' },
  { id: 'worker', label: 'Worker / MSME' },
  { id: 'household', label: 'Household' },
];

const RESIDENCE_OPTIONS: { id: SchemeResidence; label: string }[] = [
  { id: 'any', label: 'Rural & Urban' },
  { id: 'rural', label: 'Rural' },
  { id: 'urban', label: 'Urban' },
];

const NEED_OPTIONS: { id: SchemeNeed; label: string }[] = [
  { id: 'all', label: 'All Needs' },
  { id: 'health', label: 'Healthcare' },
  { id: 'housing', label: 'Housing & Water' },
  { id: 'finance', label: 'Finance & Credit' },
  { id: 'education', label: 'Education & Skills' },
  { id: 'energy', label: 'Clean Energy & Agri' },
];

export default function SchemeFinderSection() {
  const { t } = useLanguage();
  const [role, setRole] = useState<SchemeRole>('all');
  const [residence, setResidence] = useState<SchemeResidence>('any');
  const [need, setNeed] = useState<SchemeNeed>('all');

  const matchedSchemes = useMemo(() => {
    return CENTRAL_SCHEMES.filter((scheme) => {
      const roleMatch =
        role === 'all' ||
        scheme.roles.includes(role) ||
        scheme.roles.includes('all');
      const resMatch =
        residence === 'any' || scheme.residence.includes(residence);
      const needMatch = need === 'all' || scheme.need === need;
      return roleMatch && resMatch && needMatch;
    });
  }, [role, residence, need]);

  const resetAll = () => {
    setRole('all');
    setResidence('any');
    setNeed('all');
  };

  return (
    <section
      id="scheme-finder"
      className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t.sections.schemesKicker}
          </div>
          <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
            {t.sections.schemesTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
            {t.sections.schemesSubtitle}
          </p>
        </div>

        <a
          href="https://www.myscheme.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
        >
          <span>Official myScheme Portal</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* Interactive Questionnaire Filter Panel */}
      <div className="mt-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Step 1: Role / Demographic */}
          <div className="lg:col-span-6">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              1. Who are you checking schemes for?
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ROLE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRole(opt.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                    role === opt.id
                      ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white border-[#1E3A8A] dark:border-[#2563EB]'
                      : 'bg-[#F8FAFC] dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Area */}
          <div className="lg:col-span-3">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              2. Residence Type
            </div>
            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              {RESIDENCE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setResidence(opt.id)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    residence === opt.id
                      ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-slate-50 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Priority Need */}
          <div className="lg:col-span-3">
            <label
              htmlFor="scheme-need-select"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              3. Priority Area
            </label>
            <select
              id="scheme-need-select"
              value={need}
              onChange={(e) => setNeed(e.target.value as SchemeNeed)}
              className="w-full px-3 py-2 text-xs font-medium bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#60A5FA] focus:bg-white dark:focus:bg-[#0F172A]"
            >
              {NEED_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-mono tabular-nums text-slate-600 dark:text-slate-300">
            Matching schemes:{' '}
            <strong className="text-slate-950 dark:text-slate-50">
              {matchedSchemes.length}
            </strong>{' '}
            of {CENTRAL_SCHEMES.length}
          </span>
          {(role !== 'all' || residence !== 'any' || need !== 'all') && (
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 text-[#1E3A8A] dark:text-[#60A5FA] font-semibold hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.actions.resetFilters}</span>
            </button>
          )}
        </div>
      </div>

      {/* Matched Schemes Grid */}
      {matchedSchemes.length === 0 ? (
        <div className="mt-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl py-12 px-6 text-center">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            No schemes matched that exact combination.
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Broaden your priority area or residence filter to inspect more
            Central schemes.
          </p>
          <button
            type="button"
            onClick={resetAll}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] hover:bg-[#172E6E] dark:hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
          >
            {t.actions.resetFilters}
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {matchedSchemes.map((scheme) => (
            <article
              key={scheme.id}
              className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {scheme.ministry}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {scheme.residence.length === 2
                      ? 'Rural & Urban'
                      : scheme.residence[0] === 'rural'
                        ? 'Rural'
                        : 'Urban'}
                  </span>
                </div>

                <h3 className="mt-2 font-serif text-lg font-semibold text-slate-950 dark:text-slate-50 leading-snug">
                  {scheme.name}
                </h3>

                <p className="mt-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {scheme.benefitSummary}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Eligibility:{' '}
                  </span>
                  {scheme.eligibilitySummary}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {scheme.portalName}
                </span>
                <a
                  href={scheme.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] hover:underline whitespace-nowrap"
                >
                  <span>Verify &amp; Apply</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
