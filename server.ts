import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type NewsCategory =
  | 'all'
  | 'pib'
  | 'economy'
  | 'infrastructure'
  | 'welfare'
  | 'energy-tech'
  | 'parliament';

type LanguageCode = 'en' | 'hi' | 'mr' | 'ta' | 'bn';

interface NewsHeadline {
  id: string;
  title: string;
  summary: string;
  sourceName: string;
  sourceType: 'Official Portal' | 'Economic Press' | 'Policy Research';
  sourceUrl: string;
  publishedDate: string;
  ministryOrAgency: string;
  categoryTag: string;
}

interface GroundingSource {
  title: string;
  uri: string;
  domain: string;
}

interface PolicyNewsPayload {
  category: NewsCategory;
  query: string;
  lang: LanguageCode;
  fetchedAt: string;
  cached: boolean;
  feedProvider: 'google-search' | 'live-rss';
  briefingSummary: string;
  headlines: NewsHeadline[];
  groundingSources: GroundingSource[];
  searchQueries: string[];
}

interface CacheEntry {
  expiresAt: number;
  payload: Omit<PolicyNewsPayload, 'cached'>;
}

interface LiveFeedSpec {
  name: string;
  url: string;
  sourceType: 'Official Portal' | 'Economic Press' | 'Policy Research';
  defaultMinistry: string;
  defaultTag: string;
  categories: NewsCategory[];
}

const CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_CACHE_ENTRIES = 40;
const newsCache = new Map<string, CacheEntry>();

const ALLOWED_CATEGORIES = new Set<NewsCategory>([
  'all',
  'pib',
  'economy',
  'infrastructure',
  'welfare',
  'energy-tech',
  'parliament',
]);

const ALLOWED_LANGUAGES: Record<LanguageCode, string> = {
  en: 'English',
  hi: 'Hindi (Devanagari script)',
  mr: 'Marathi (Devanagari script)',
  ta: 'Tamil',
  bn: 'Bengali',
};

const CATEGORY_FOCUS: Record<NewsCategory, string> = {
  all: 'latest Union Cabinet decisions, PIB India (pib.gov.in) official releases, Reserve Bank of India updates, and top Indian economic & infrastructure policy announcements from Economic Times, Mint, Business Standard, and The Hindu BusinessLine',
  pib: 'latest official press releases from Press Information Bureau (PIB India, pib.gov.in), Prime Minister Office (PMO), and Union Cabinet approvals',
  economy:
    'latest Indian macroeconomic news, Ministry of Finance announcements, GST collections, RBI monetary policy, inflation, and trade updates from PIB, RBI, Mint, Business Standard, and Economic Times',
  infrastructure:
    'latest Indian infrastructure development announcements including National Highways (MoRTH), Indian Railways, Vande Bharat, ports, airports, metros, and PM Gati Shakti from PIB and major Indian economic portals',
  welfare:
    'latest central government social welfare, agriculture (PM-KISAN), healthcare (Ayushman Bharat), housing (PMAY), education, and rural development announcements from PIB and major Indian news portals',
  'energy-tech':
    'latest Indian clean energy, solar/green hydrogen (MNRE), India Semiconductor Mission, Digital Public Infrastructure (UPI/MeitY), ISRO space missions, and domestic defence manufacturing announcements from PIB and economic portals',
  parliament:
    'latest Indian Parliament bills, committee reports, regulatory policy reforms, and legislative briefings from PIB, Sansad, and PRS Legislative Research alongside major Indian economic dailies',
};

const LIVE_RSS_FEEDS: LiveFeedSpec[] = [
  {
    name: 'PIB Bharat (Official)',
    url: 'https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3',
    sourceType: 'Official Portal',
    defaultMinistry: 'Press Information Bureau, Govt. of Bharat',
    defaultTag: 'PIB Release',
    categories: ['all', 'pib', 'welfare', 'infrastructure', 'parliament'],
  },
  {
    name: 'Reserve Bank of Bharat',
    url: 'https://rbi.org.in/pressreleases_rss.xml',
    sourceType: 'Official Portal',
    defaultMinistry: 'Reserve Bank of Bharat (RBI)',
    defaultTag: 'Monetary Policy',
    categories: ['all', 'pib', 'economy'],
  },
  {
    name: 'The Economic Times',
    url: 'https://economictimes.indiatimes.com/news/economy/rssfeeds/1373380680.cms',
    sourceType: 'Economic Press',
    defaultMinistry: 'Macroeconomy & Policy',
    defaultTag: 'Economy',
    categories: ['all', 'economy', 'infrastructure', 'energy-tech', 'welfare'],
  },
  {
    name: 'Mint Economy',
    url: 'https://www.livemint.com/rss/economy',
    sourceType: 'Economic Press',
    defaultMinistry: 'Finance & Trade Desk',
    defaultTag: 'Economy & Trade',
    categories: ['all', 'economy', 'infrastructure', 'energy-tech', 'parliament'],
  },
  {
    name: 'The Hindu BusinessLine',
    url: 'https://www.thehindubusinessline.com/economy/feeder/default.rss',
    sourceType: 'Economic Press',
    defaultMinistry: 'Economic Policy Desk',
    defaultTag: 'Macro & Policy',
    categories: ['all', 'economy', 'infrastructure', 'welfare', 'energy-tech'],
  },
  {
    name: 'BusinessLine National',
    url: 'https://www.thehindubusinessline.com/news/national/feeder/default.rss',
    sourceType: 'Economic Press',
    defaultMinistry: 'Union Governance & States',
    defaultTag: 'National Policy',
    categories: ['all', 'pib', 'welfare', 'parliament', 'infrastructure'],
  },
];

const CATEGORY_KEYWORDS: Record<NewsCategory, string[]> = {
  all: [],
  pib: ['pib', 'cabinet', 'pm', 'prime minister', 'ministry', 'rbi', 'centre', 'government', 'union', 'प्रगति', 'प्रधानमंत्री', 'भारत'],
  economy: ['gdp', 'rbi', 'inflation', 'cpi', 'gst', 'tax', 'budget', 'fiscal', 'tariff', 'trade', 'export', 'import', 'rupee', 'forex', 'repo', 'bank', 'credit', 'economy', 'growth'],
  infrastructure: ['highway', 'rail', 'railway', 'metro', 'airport', 'port', 'road', 'expressway', 'gati shakti', 'vande bharat', 'logistics', 'infrastructure', 'bridge', 'corridor', 'ropeway', 'ring road', 'aviation'],
  welfare: ['farmer', 'agri', 'agriculture', 'crop', 'msp', 'kisan', 'health', 'ayushman', 'housing', 'pmay', 'rural', 'water', 'education', 'school', 'pension', 'welfare', 'subsidy', 'food', 'fssai', 'nutrition', 'women', 'employment', 'labour'],
  'energy-tech': ['solar', 'renewable', 'green', 'hydrogen', 'power', 'energy', 'grid', 'nuclear', 'ev', 'semiconductor', 'chip', 'ai', 'digital', 'upi', 'telecom', '5g', 'space', 'isro', 'defence', 'startup', 'tech', 'oil', 'gas', 'coal'],
  parliament: ['parliament', 'bill', 'act', 'law', 'supreme court', 'policy', 'regulator', 'sebi', 'trai', 'cabinet', 'commission', 'panel', 'state', 'reform', 'governance', 'election', 'directive', 'order'],
};

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

function sanitizeUrl(rawUrl: unknown): string {
  if (typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
    return '';
  } catch {
    return '';
  }
}

function extractDomain(rawUrl: string): string {
  try {
    return new URL(rawUrl).hostname.replace(/^www\./i, '');
  } catch {
    return '';
  }
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_m, dec) => {
      const code = Number(dec);
      return Number.isFinite(code) ? String.fromCodePoint(code) : '';
    })
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => {
      const code = Number.parseInt(hex, 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : '';
    })
    .replace(/\s+/g, ' ')
    .trim();
}

function formatRssDate(rawDate: string): string {
  if (!rawDate) {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date());
  }
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) {
    return rawDate.slice(0, 24);
  }
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

function inferMinistryAndTag(
  text: string,
  fallbackMinistry: string,
  fallbackTag: string
): { ministry: string; tag: string } {
  const lower = text.toLowerCase();
  if (lower.includes('rbi') || lower.includes('repo') || lower.includes('bank of india') || lower.includes('bank of bharat') || lower.includes('laf')) {
    return { ministry: 'Reserve Bank of Bharat (RBI)', tag: 'Monetary Policy' };
  }
  if (lower.includes('gst') || lower.includes('tax') || lower.includes('budget') || lower.includes('fiscal') || lower.includes('finance ministry')) {
    return { ministry: 'Ministry of Finance', tag: 'Fiscal & Tax' };
  }
  if (lower.includes('tariff') || lower.includes('trade') || lower.includes('export') || lower.includes('import') || lower.includes('commerce')) {
    return { ministry: 'Ministry of Commerce & Industry', tag: 'Trade & Exports' };
  }
  if (lower.includes('railway') || lower.includes('vande bharat') || lower.includes('train')) {
    return { ministry: 'Ministry of Railways', tag: 'Railways' };
  }
  if (lower.includes('highway') || lower.includes('road') || lower.includes('nhai') || lower.includes('port') || lower.includes('airport') || lower.includes('infrastructure') || lower.includes('ropeway')) {
    return { ministry: 'Infrastructure & Transport (MoRTH / Ports)', tag: 'Infrastructure' };
  }
  if (lower.includes('solar') || lower.includes('renewable') || lower.includes('power') || lower.includes('energy') || lower.includes('hydrogen')) {
    return { ministry: 'Ministry of Power / MNRE', tag: 'Clean Energy' };
  }
  if (lower.includes('semiconductor') || lower.includes('upi') || lower.includes('digital') || lower.includes('telecom') || lower.includes('ai ')) {
    return { ministry: 'MeitY & Telecom', tag: 'Digital & Tech' };
  }
  if (lower.includes('isro') || lower.includes('space') || lower.includes('defence') || lower.includes('drdo')) {
    return { ministry: 'MoD / ISRO', tag: 'Defence & Space' };
  }
  if (lower.includes('farmer') || lower.includes('agri') || lower.includes('crop') || lower.includes('food') || lower.includes('fssai') || lower.includes('rural')) {
    return { ministry: 'Agriculture & Consumer Affairs', tag: 'Welfare & Agri' };
  }
  if (lower.includes('प्रगति') || lower.includes('प्रधानमंत्री') || lower.includes('prime minister') || lower.includes('cabinet')) {
    return { ministry: "Prime Minister's Office / PIB", tag: 'Cabinet & PMO' };
  }
  return { ministry: fallbackMinistry, tag: fallbackTag };
}

function extractXmlTag(itemXml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = itemXml.match(regex);
  return match ? decodeHtmlEntities(match[1]) : '';
}

async function fetchSingleRssFeed(spec: LiveFeedSpec): Promise<
  Array<{
    headline: NewsHeadline;
    publishedMs: number;
    feedTitle: string;
    feedUrl: string;
  }>
> {
  try {
    const response = await fetch(spec.url, {
      signal: AbortSignal.timeout(6500),
    });
    if (!response.ok) return [];
    const xml = await response.text();
    if (!xml.includes('<item')) return [];

    const matches = [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)];
    const results: Array<{
      headline: NewsHeadline;
      publishedMs: number;
      feedTitle: string;
      feedUrl: string;
    }> = [];

    for (let i = 0; i < Math.min(matches.length, 18); i += 1) {
      const block = matches[i][0];
      const title = extractXmlTag(block, 'title');
      const link = sanitizeUrl(extractXmlTag(block, 'link'));
      const rawDesc = extractXmlTag(block, 'description');
      const rawPubDate = extractXmlTag(block, 'pubDate');
      if (!title || !link) continue;

      const parsedTime = rawPubDate ? Date.parse(rawPubDate) : NaN;
      const publishedMs = Number.isNaN(parsedTime) ? Date.now() - i * 60000 : parsedTime;

      const summary =
        rawDesc && rawDesc.length >= 24 && rawDesc.toLowerCase() !== title.toLowerCase()
          ? rawDesc.slice(0, 260) + (rawDesc.length > 260 ? '…' : '')
          : spec.sourceType === 'Official Portal'
            ? `Official release published by ${spec.name}. Open the verified portal link below to inspect the full text and annexures.`
            : `Live economic and policy dispatch from ${spec.name}. Open the source link to read the complete report.`;

      const inferred = inferMinistryAndTag(
        `${title} ${summary}`,
        spec.defaultMinistry,
        spec.defaultTag
      );

      results.push({
        headline: {
          id: `rss-${spec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}-${publishedMs}`,
          title,
          summary,
          sourceName: spec.name,
          sourceType: spec.sourceType,
          sourceUrl: link,
          publishedDate: formatRssDate(rawPubDate),
          ministryOrAgency: inferred.ministry,
          categoryTag: inferred.tag,
        },
        publishedMs,
        feedTitle: spec.name,
        feedUrl: spec.url,
      });
    }

    return results;
  } catch {
    return [];
  }
}

async function fetchLiveRssAggregation(
  category: NewsCategory,
  query: string,
  lang: LanguageCode
): Promise<Omit<PolicyNewsPayload, 'cached'>> {
  const feedsToFetch = query
    ? LIVE_RSS_FEEDS
    : LIVE_RSS_FEEDS.filter((f) => f.categories.includes(category));

  const batches = await Promise.all(feedsToFetch.map((spec) => fetchSingleRssFeed(spec)));
  const allEntries = batches.flat();

  if (allEntries.length === 0) {
    throw new Error('Unable to retrieve live headlines from official PIB and economic news feeds.');
  }

  const queryTokens = query
    .toLowerCase()
    .split(/[^a-z0-9\u0900-\u097f\u0980-\u09ff\u0b80-\u0bff]+/i)
    .filter((t) => t.length >= 2);
  const categoryKeywords = CATEGORY_KEYWORDS[category] ?? [];

  const scored = allEntries.map((entry) => {
    const text =
      `${entry.headline.title} ${entry.headline.summary} ${entry.headline.sourceName} ${entry.headline.ministryOrAgency}`.toLowerCase();
    let score = 0;

    if (queryTokens.length > 0) {
      let matchedTokens = 0;
      for (const tok of queryTokens) {
        if (text.includes(tok)) {
          score += 10;
          matchedTokens += 1;
        }
      }
      if (matchedTokens === 0) {
        score = -1;
      }
    } else if (category !== 'all') {
      for (const kw of categoryKeywords) {
        if (text.includes(kw)) score += 4;
      }
      if (category === 'pib' && entry.headline.sourceType === 'Official Portal') {
        score += 12;
      }
    } else {
      if (entry.headline.sourceType === 'Official Portal') {
        score += 5;
      }
    }

    return { entry, score };
  });

  const filtered =
    queryTokens.length > 0
      ? scored.filter((item) => item.score > 0)
      : scored.filter((item) => item.score >= 0);

  filtered.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.entry.publishedMs - a.entry.publishedMs;
  });

  // Ensure balanced source diversity across PIB, RBI, ET, Mint, and BusinessLine
  const selected: NewsHeadline[] = [];
  const seenTitles = new Set<string>();
  const sourceCounts = new Map<string, number>();
  const maxPerSource = category === 'pib' ? 4 : 2;

  for (const { entry } of filtered) {
    if (selected.length >= 8) break;
    const normTitle = entry.headline.title.toLowerCase().slice(0, 72);
    if (seenTitles.has(normTitle)) continue;
    const count = sourceCounts.get(entry.headline.sourceName) ?? 0;
    if (count >= maxPerSource && filtered.length > 8) continue;

    seenTitles.add(normTitle);
    sourceCounts.set(entry.headline.sourceName, count + 1);
    selected.push(entry.headline);
  }

  // If diversity cap left fewer than 6 items, fill from remaining scored entries
  if (selected.length < 6) {
    for (const { entry } of filtered) {
      if (selected.length >= 8) break;
      const normTitle = entry.headline.title.toLowerCase().slice(0, 72);
      if (seenTitles.has(normTitle)) continue;
      seenTitles.add(normTitle);
      selected.push(entry.headline);
    }
  }

  const groundingSources: GroundingSource[] = [];
  const seenUris = new Set<string>();
  for (const h of selected) {
    if (h.sourceUrl && !seenUris.has(h.sourceUrl)) {
      seenUris.add(h.sourceUrl);
      groundingSources.push({
        title: `${h.sourceName}: ${h.title.slice(0, 70)}`,
        uri: h.sourceUrl,
        domain: extractDomain(h.sourceUrl),
      });
    }
  }

  const uniqueSourceNames = Array.from(new Set(selected.map((s) => s.sourceName)));
  const briefingSummary =
    selected.length > 0
      ? query
        ? `Retrieved ${selected.length} live policy and economic dispatches matching “${query}” across ${uniqueSourceNames.join(', ')}.`
        : `Live feed aggregated ${selected.length} current headlines directly from ${uniqueSourceNames.join(', ')}.`
      : `No current live RSS dispatches matched “${query}” across PIB, RBI, Economic Times, Mint, and BusinessLine.`;

  return {
    category,
    query,
    lang,
    fetchedAt: new Date().toISOString(),
    feedProvider: 'live-rss',
    briefingSummary,
    headlines: selected,
    groundingSources,
    searchQueries: query
      ? [query, `PIB Bharat ${query}`, `Bharat economy ${query}`]
      : ['PIB Bharat press releases', 'RBI press releases', 'Bharat economy policy'],
  };
}

function extractJsonBlock(rawText: string): Record<string, unknown> | null {
  const trimmed = rawText.trim();
  if (!trimmed) return null;

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fencedMatch ? fencedMatch[1].trim() : trimmed;

  const firstBrace = candidate.indexOf('{');
  const lastBrace = candidate.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null;
  }

  const slice = candidate.slice(firstBrace, lastBrace + 1);
  try {
    const parsed: unknown = JSON.parse(slice);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
    return null;
  } catch {
    return null;
  }
}

function normalizeSourceType(
  rawType: unknown,
  sourceName: string,
  sourceUrl: string
): 'Official Portal' | 'Economic Press' | 'Policy Research' {
  const combined = `${String(rawType ?? '')} ${sourceName} ${sourceUrl}`.toLowerCase();
  if (
    combined.includes('pib') ||
    combined.includes('.gov.in') ||
    combined.includes('.nic.in') ||
    combined.includes('rbi.org') ||
    combined.includes('official')
  ) {
    return 'Official Portal';
  }
  if (
    combined.includes('prs') ||
    combined.includes('research') ||
    combined.includes('imf') ||
    combined.includes('world bank') ||
    combined.includes('cag')
  ) {
    return 'Policy Research';
  }
  return 'Economic Press';
}

function findMatchingGroundingUrl(
  headline: { title: string; sourceName: string },
  sources: GroundingSource[]
): string {
  if (sources.length === 0) return '';

  const sourceTokens = headline.sourceName
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 3);
  const titleTokens = headline.title
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 4);

  let bestUri = '';
  let bestScore = 0;

  for (const src of sources) {
    const haystack = `${src.title} ${src.domain} ${src.uri}`.toLowerCase();
    let score = 0;
    for (const token of sourceTokens) {
      if (haystack.includes(token)) score += 3;
    }
    for (const token of titleTokens) {
      if (haystack.includes(token)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestUri = src.uri;
    }
  }

  return bestScore >= 2 ? bestUri : sources[0].uri;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientError(err: unknown): boolean {
  const status =
    typeof err === 'object' && err !== null && 'status' in err
      ? Number((err as { status?: unknown }).status)
      : 0;
  if (status === 500 || status === 502 || status === 503 || status === 504) {
    return true;
  }
  const msg = err instanceof Error ? err.message.toLowerCase() : '';
  return (
    msg.includes('econnreset') ||
    msg.includes('etimedout') ||
    msg.includes('fetch failed') ||
    msg.includes('temporarily unavailable')
  );
}

async function fetchGeminiSearchNews(
  category: NewsCategory,
  query: string,
  lang: LanguageCode
): Promise<Omit<PolicyNewsPayload, 'cached'>> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const todayIso = new Date().toISOString().slice(0, 10);
  const languageInstruction = ALLOWED_LANGUAGES[lang];
  const focusDescription = query
    ? `latest official Government of India announcements (PIB, pib.gov.in) and Indian economic news specifically about "${query}"`
    : CATEGORY_FOCUS[category];

  const prompt = [
    `Today's date is ${todayIso}.`,
    `Use Google Search to retrieve the most recent, verified Indian government policy, development, and economic announcements covering: ${focusDescription}.`,
    `Prioritize Press Information Bureau (PIB India / pib.gov.in), Reserve Bank of India (RBI), Ministry portals, PRS Legislative Research, and major Indian economic news portals (The Economic Times, Mint, Business Standard, The Hindu BusinessLine, Financial Express).`,
    `Write all headline titles, summaries, briefingSummary, and categoryTag values in ${languageInstruction}. Always refer to the country as Bharat in your written text, while keeping official portal names (e.g., PIB Bharat, RBI, Mint, Economic Times) recognizable.`,
    `Return ONLY a valid JSON object (no introductory prose) with this exact structure:`,
    `{`,
    `  "briefingSummary": "A concise 2-sentence factual overview of the biggest verified announcements found right now.",`,
    `  "headlines": [`,
    `    {`,
    `      "title": "Factual, non-partisan headline",`,
    `      "summary": "2 concise factual sentences citing concrete numbers, schemes, or policy scope from the search results.",`,
    `      "sourceName": "Name of publication or portal (e.g., PIB Bharat, Mint, Economic Times, Business Standard, RBI)",`,
    `      "sourceType": "Official Portal" | "Economic Press" | "Policy Research",`,
    `      "sourceUrl": "Direct https URL from search results if known, otherwise empty string",`,
    `      "publishedDate": "Publication date (e.g., Nov 2026 or DD MMM YYYY)",`,
    `      "ministryOrAgency": "Relevant Union Ministry, RBI, NITI Aayog, ISRO, or Parliament",`,
    `      "categoryTag": "Short 1-2 word topic label"`,
    `    }`,
    `  ]`,
    `}`,
    `Include 6 to 8 distinct, non-duplicate headlines grounded strictly in the Google Search results. Never fabricate URLs or unverified statistics.`,
  ].join('\n');

  const candidateModels = ['gemini-4-hydrogen', 'gemini-3.1-flash-lite'] as const;
  let response: Awaited<ReturnType<typeof ai.models.generateContent>> | null = null;
  let lastError: unknown = null;

  for (const modelName of candidateModels) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
            ...(modelName === 'gemini-4-hydrogen'
              ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
              : {}),
            systemInstruction:
              'You are a neutral Indian public-policy and economic news desk editor. Ground every headline strictly in the Google Search tool results. Never fabricate URLs, dates, or figures. Output valid JSON only.',
          },
        });
        break;
      } catch (err) {
        lastError = err;
        if (attempt === 0 && isTransientError(err)) {
          await sleep(400);
          continue;
        }
        break;
      }
    }
    if (response) break;
  }

  if (!response) {
    throw lastError ?? new Error('Empty response from search grounding');
  }

  const rawText = response.text ?? '';
  const metadata = response.candidates?.[0]?.groundingMetadata;
  const rawChunks = metadata?.groundingChunks ?? [];
  const rawSearchQueries = metadata?.webSearchQueries ?? [];

  const seenUris = new Set<string>();
  const groundingSources: GroundingSource[] = [];
  for (const chunk of rawChunks) {
    const uri = sanitizeUrl(chunk?.web?.uri);
    if (!uri || seenUris.has(uri)) continue;
    seenUris.add(uri);
    const domain = extractDomain(uri);
    const title =
      typeof chunk?.web?.title === 'string' && chunk.web.title.trim()
        ? chunk.web.title.trim()
        : domain || 'Verified Web Source';
    groundingSources.push({ title, uri, domain });
  }

  const searchQueries = Array.from(
    new Set(
      rawSearchQueries
        .filter((q): q is string => typeof q === 'string' && q.trim().length > 0)
        .map((q) => q.trim())
    )
  ).slice(0, 6);

  const parsed = extractJsonBlock(rawText);
  const rawHeadlines = Array.isArray(parsed?.headlines) ? parsed.headlines : [];

  const headlines: NewsHeadline[] = [];
  const seenTitles = new Set<string>();

  for (let i = 0; i < rawHeadlines.length; i += 1) {
    const item = rawHeadlines[i];
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    const title = typeof record.title === 'string' ? record.title.trim() : '';
    const summary =
      typeof record.summary === 'string' ? record.summary.trim() : '';
    if (!title || !summary) continue;

    const dedupeKey = title.toLowerCase();
    if (seenTitles.has(dedupeKey)) continue;
    seenTitles.add(dedupeKey);

    const sourceName =
      typeof record.sourceName === 'string' && record.sourceName.trim()
        ? record.sourceName.trim()
        : 'PIB / Economic News';
    const directUrl = sanitizeUrl(record.sourceUrl);
    const verifiedUrl =
      directUrl || findMatchingGroundingUrl({ title, sourceName }, groundingSources);

    headlines.push({
      id: `news-${Date.now()}-${i}`,
      title,
      summary,
      sourceName,
      sourceType: normalizeSourceType(record.sourceType, sourceName, verifiedUrl),
      sourceUrl: verifiedUrl,
      publishedDate:
        typeof record.publishedDate === 'string' && record.publishedDate.trim()
          ? record.publishedDate.trim()
          : todayIso,
      ministryOrAgency:
        typeof record.ministryOrAgency === 'string' &&
        record.ministryOrAgency.trim()
          ? record.ministryOrAgency.trim()
          : 'Government of Bharat',
      categoryTag:
        typeof record.categoryTag === 'string' && record.categoryTag.trim()
          ? record.categoryTag.trim()
          : 'Policy',
    });
  }

  const briefingSummary =
    typeof parsed?.briefingSummary === 'string' && parsed.briefingSummary.trim()
      ? parsed.briefingSummary.trim()
      : headlines.length > 0
        ? `Live search briefing compiled ${headlines.length} recent policy and economic updates from official Bharat portals and business dailies.`
        : rawText.slice(0, 320).trim();

  if (headlines.length === 0 && groundingSources.length > 0) {
    for (let i = 0; i < Math.min(groundingSources.length, 6); i += 1) {
      const src = groundingSources[i];
      headlines.push({
        id: `grounding-${Date.now()}-${i}`,
        title: src.title,
        summary:
          'Verified recent policy or economic report retrieved via live search grounding. Open the source link to read the full release.',
        sourceName: src.domain || 'Verified Portal',
        sourceType: normalizeSourceType('', src.domain, src.uri),
        sourceUrl: src.uri,
        publishedDate: todayIso,
        ministryOrAgency: 'Public Policy & Economy',
        categoryTag: 'Live Dispatch',
      });
    }
  }

  return {
    category,
    query,
    lang,
    fetchedAt: new Date().toISOString(),
    feedProvider: 'google-search',
    briefingSummary,
    headlines: headlines.slice(0, 8),
    groundingSources: groundingSources.slice(0, 12),
    searchQueries,
  };
}

function setCacheEntry(key: string, payload: Omit<PolicyNewsPayload, 'cached'>) {
  if (newsCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = newsCache.keys().next().value;
    if (oldestKey) {
      newsCache.delete(oldestKey);
    }
  }
  newsCache.set(key, {
    expiresAt: Date.now() + CACHE_TTL_MS,
    payload,
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, timestamp: new Date().toISOString() });
  });

  app.get('/api/news', async (req: Request, res: Response) => {
    const rawCategory =
      typeof req.query.category === 'string'
        ? req.query.category.trim().toLowerCase()
        : 'all';
    const category: NewsCategory = ALLOWED_CATEGORIES.has(
      rawCategory as NewsCategory
    )
      ? (rawCategory as NewsCategory)
      : 'all';

    const rawLang =
      typeof req.query.lang === 'string'
        ? req.query.lang.trim().toLowerCase()
        : 'en';
    const lang: LanguageCode =
      rawLang in ALLOWED_LANGUAGES ? (rawLang as LanguageCode) : 'en';

    const rawQuery =
      typeof req.query.q === 'string'
        ? req.query.q
            .replace(/[\r\n\t]+/g, ' ')
            .trim()
            .slice(0, 100)
        : '';

    const bypassCache =
      req.query.refresh === '1' || req.query.refresh === 'true';
    const cacheKey = `${category}::${lang}::${rawQuery.toLowerCase()}`;

    if (!bypassCache) {
      const hit = newsCache.get(cacheKey);
      if (hit && hit.expiresAt > Date.now()) {
        res.json({ ...hit.payload, cached: true });
        return;
      }
    }

    try {
      const payload = await fetchGeminiSearchNews(category, rawQuery, lang);
      setCacheEntry(cacheKey, payload);
      res.json({ ...payload, cached: false });
      return;
    } catch (geminiErr) {
      console.warn(
        '[PolicyNews] Gemini search grounding unavailable, falling back to live PIB/RBI/Economic RSS feeds:',
        geminiErr instanceof Error ? geminiErr.message.slice(0, 180) : String(geminiErr)
      );
      try {
        const liveRssPayload = await fetchLiveRssAggregation(category, rawQuery, lang);
        setCacheEntry(cacheKey, liveRssPayload);
        res.json({ ...liveRssPayload, cached: false });
        return;
      } catch (rssErr) {
        console.error('[PolicyNews] Both live search and live RSS feeds failed:', rssErr);
        res.status(502).json({
          error:
            'Unable to fetch live headlines from Google Search or official PIB/economic RSS feeds right now. Please try refreshing again.',
        });
      }
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (req: Request, res: Response) => {
      if (req.path.startsWith('/api/')) {
        res.status(404).json({ error: 'API route not found' });
        return;
      }
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Build output not found. Run npm run build first.');
      }
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Bharat Development Atlas server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
