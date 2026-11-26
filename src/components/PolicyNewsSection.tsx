import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Building2,
  Clock,
  Globe,
  Newspaper,
  RefreshCw,
  Search,
  X,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { NewsCategory, PolicyNewsResponse } from '../types/news';

const NEWS_CATEGORIES: { id: NewsCategory; label: string }[] = [
  { id: 'all', label: 'All Briefings' },
  { id: 'pib', label: 'PIB Official Releases' },
  { id: 'economy', label: 'Economy & RBI' },
  { id: 'infrastructure', label: 'Infrastructure & Rail' },
  { id: 'welfare', label: 'Welfare & Agriculture' },
  { id: 'energy-tech', label: 'Clean Energy & Tech' },
  { id: 'parliament', label: 'Parliament & Policy' },
];

const QUICK_TOPICS: string[] = [
  'Union Cabinet decisions',
  'RBI monetary policy',
  'Bharat Semiconductor Mission',
  'PM Surya Ghar',
  'National Highways & Railways',
  'GST collections',
];

function formatTimestamp(isoString: string): string {
  try {
    const dt = new Date(isoString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dt);
  } catch {
    return isoString;
  }
}

export default function PolicyNewsSection() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [searchDraft, setSearchDraft] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [data, setData] = useState<PolicyNewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const loadNews = useCallback(
    async (
      category: NewsCategory,
      query: string,
      lang: string,
      forceRefresh = false
    ) => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          category,
          lang,
        });
        if (query.trim()) {
          params.set('q', query.trim());
        }
        if (forceRefresh) {
          params.set('refresh', '1');
        }

        const response = await fetch(`/api/news?${params.toString()}`, {
          signal: controller.signal,
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          const message =
            payload && typeof payload.error === 'string'
              ? payload.error
              : `Unable to load live headlines (HTTP ${response.status}).`;
          throw new Error(message);
        }

        setData(payload as PolicyNewsResponse);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to connect to the live news service.'
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    void loadNews(activeCategory, submittedQuery, language, false);
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [activeCategory, submittedQuery, language, loadNews]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(searchDraft.trim());
  };

  const handleSelectQuickTopic = (topic: string) => {
    setSearchDraft(topic);
    setSubmittedQuery(topic);
  };

  const handleClearSearch = () => {
    setSearchDraft('');
    setSubmittedQuery('');
  };

  const handleSelectCategory = (cat: NewsCategory) => {
    setActiveCategory(cat);
    if (submittedQuery) {
      setSearchDraft('');
      setSubmittedQuery('');
    }
  };

  const leadHeadline = data?.headlines?.[0] ?? null;
  const secondaryHeadlines = data?.headlines?.slice(1) ?? [];

  return (
    <section
      id="policy-news"
      className="py-12 lg:py-16 bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-medium uppercase tracking-wider text-[#1E3A8A] dark:text-[#60A5FA] mb-2">
              {t.sections.policyNewsKicker}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
              {t.sections.policyNewsTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.sections.policyNewsSubtitle}
            </p>
          </div>

          {/* Refresh & Timestamp Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {data?.fetchedAt && !loading && (
              <div className="inline-flex items-center gap-1.5 text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Updated {formatTimestamp(data.fetchedAt)}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                void loadNews(activeCategory, submittedQuery, language, true)
              }
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] hover:bg-[#172E6E] dark:hover:bg-[#1D4ED8] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-offset-[#111827]"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>{loading ? 'Searching live...' : 'Refresh Live Feed'}</span>
            </button>
          </div>
        </div>

        {/* Filter & Live Search Toolbar */}
        <div className="bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 mb-6 space-y-4">
          {/* Category Segmented Tabs */}
          <div
            role="tablist"
            aria-label="Policy news categories"
            className="flex items-center gap-1.5 overflow-x-auto pb-1"
          >
            {NEWS_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id && !submittedQuery;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] dark:focus-visible:ring-[#60A5FA] ${
                    isSelected
                      ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white'
                      : 'bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Live Topic Search Bar + Quick Topics */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 pt-1 border-t border-slate-200 dark:border-slate-700/80">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 flex-1 max-w-xl"
            >
              <div className="relative flex-1">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                  placeholder="Search live PIB & economic headlines (e.g., Union Budget, RBI, ISRO)..."
                  aria-label="Search policy and economic news"
                  maxLength={100}
                  className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#60A5FA]"
                />
                {searchDraft && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Clear search query"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-xs font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60"
              >
                Search
              </button>
            </form>

            {/* Quick Policy Topics */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium mr-1">
                Quick queries:
              </span>
              {QUICK_TOPICS.map((topic) => {
                const isActive = submittedQuery === topic;
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleSelectQuickTopic(topic)}
                    className={`px-2 py-1 text-[11px] font-medium rounded border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100'
                        : 'bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-[#1E3A8A] dark:hover:text-[#60A5FA] hover:border-[#1E3A8A]/40 dark:hover:border-[#60A5FA]/40'
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Query Notice */}
        {submittedQuery && !loading && !error && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300">
            <div>
              Showing live search results for{' '}
              <span className="font-semibold text-slate-950 dark:text-slate-50">
                “{submittedQuery}”
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearSearch}
              className="font-medium text-[#1E3A8A] dark:text-[#60A5FA] hover:underline cursor-pointer"
            >
              Return to category feed
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div
            aria-busy="true"
            aria-label="Fetching live policy and economic news"
            className="space-y-4"
          >
            <div className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800/70 animate-pulse" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-36 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                  <div className="h-5 w-11/12 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-full bg-slate-200/80 dark:bg-slate-700/70 rounded" />
                  <div className="h-4 w-4/5 bg-slate-200/80 dark:bg-slate-700/70 rounded" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div
            role="alert"
            className="bg-[#F8FAFC] dark:bg-[#162033] border border-red-200 dark:border-red-900/60 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle
                className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                  Live news search unavailable
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {error}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                void loadNews(activeCategory, submittedQuery, language, true)
              }
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] hover:bg-[#172E6E] dark:hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Retry Live Search</span>
            </button>
          </div>
        )}

        {/* Loaded Briefing & Headlines */}
        {!loading && !error && data && (
          <div className="space-y-6">
            {/* Concise Editorial Pulse */}
            {data.briefingSummary && (
              <div className="bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 flex items-start gap-3.5">
                <Newspaper
                  className="w-4 h-4 text-[#1E3A8A] dark:text-[#60A5FA] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  <span className="font-semibold text-slate-950 dark:text-slate-50 mr-1.5">
                    Live Dispatch Brief:
                  </span>
                  {data.briefingSummary}
                </div>
              </div>
            )}

            {/* Lead Story Card */}
            {leadHeadline && (
              <article className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-7 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold uppercase tracking-wider text-[#1E3A8A] dark:text-[#60A5FA]">
                      Lead Dispatch
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">
                      {leadHeadline.sourceName}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{leadHeadline.sourceType}</span>
                  </div>
                  <span className="tabular-nums">{leadHeadline.publishedDate}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-slate-950 dark:text-slate-50 leading-snug">
                  {leadHeadline.title}
                </h3>

                <p className="mt-3 text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                  {leadHeadline.summary}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-3 text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      {leadHeadline.ministryOrAgency}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono uppercase text-[11px]">
                      {leadHeadline.categoryTag}
                    </span>
                  </div>

                  {leadHeadline.sourceUrl && (
                    <a
                      href={leadHeadline.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#1E3A8A] dark:text-[#60A5FA] hover:underline whitespace-nowrap"
                    >
                      <span>Read full dispatch</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            )}

            {/* Secondary Headlines Grid */}
            {secondaryHeadlines.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {secondaryHeadlines.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2.5">
                        <div className="flex items-center gap-1.5 truncate">
                          <span
                            className={`font-semibold ${
                              item.sourceType === 'Official Portal'
                                ? 'text-[#047857] dark:text-[#34D399]'
                                : item.sourceType === 'Policy Research'
                                  ? 'text-[#B45309] dark:text-[#FBBF24]'
                                  : 'text-[#1E3A8A] dark:text-[#60A5FA]'
                            }`}
                          >
                            {item.sourceName}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{item.sourceType}</span>
                        </div>
                        <span className="tabular-nums shrink-0">
                          {item.publishedDate}
                        </span>
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-semibold text-slate-950 dark:text-slate-50 leading-snug">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-[13.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                      <span className="text-slate-500 dark:text-slate-400 truncate">
                        {item.ministryOrAgency}
                      </span>

                      {item.sourceUrl && (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-[#1E3A8A] dark:text-[#60A5FA] hover:underline whitespace-nowrap shrink-0"
                        >
                          <span>Source</span>
                          <ArrowUpRight
                            className="w-3.5 h-3.5"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Empty Headlines Fallback (when valid response returned 0 items) */}
            {data.headlines.length === 0 && (
              <div className="bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  No recent matching announcements were returned for this query.
                </p>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="mt-3 text-xs font-semibold text-[#1E3A8A] dark:text-[#60A5FA] hover:underline cursor-pointer"
                >
                  Reset to latest PIB & economic briefings
                </button>
              </div>
            )}

            {/* Verified Google Search Grounding Sources Strip */}
            {data.groundingSources.length > 0 && (
              <div className="bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-800 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100">
                    <Globe
                      className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#60A5FA]"
                      aria-hidden="true"
                    />
                    <span>
                      Verified Live Sources ({data.groundingSources.length}) ·{' '}
                      <span className="font-normal text-slate-500 dark:text-slate-400">
                        {data.feedProvider === 'google-search'
                          ? 'Google Search Grounding'
                          : 'Live PIB, RBI & Economic News Feeds'}
                      </span>
                    </span>
                  </div>
                  {data.searchQueries.length > 0 && (
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                      Search queries: {data.searchQueries.slice(0, 3).join(' · ')}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {data.groundingSources.map((src) => (
                    <a
                      key={src.uri}
                      href={src.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-2 p-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700/80 hover:border-[#1E3A8A]/50 dark:hover:border-[#60A5FA]/50 rounded-lg transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-[#1E3A8A] dark:group-hover:text-[#60A5FA] truncate">
                          {src.title}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                          {src.domain}
                        </div>
                      </div>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1E3A8A] dark:group-hover:text-[#60A5FA] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
