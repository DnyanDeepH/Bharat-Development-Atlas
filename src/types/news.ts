export type NewsCategory =
  | 'all'
  | 'pib'
  | 'economy'
  | 'infrastructure'
  | 'welfare'
  | 'energy-tech'
  | 'parliament';

export interface NewsHeadline {
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

export interface GroundingSource {
  title: string;
  uri: string;
  domain: string;
}

export interface PolicyNewsResponse {
  category: NewsCategory;
  query: string;
  lang: string;
  fetchedAt: string;
  cached: boolean;
  feedProvider: 'google-search' | 'live-rss';
  briefingSummary: string;
  headlines: NewsHeadline[];
  groundingSources: GroundingSource[];
  searchQueries: string[];
}
