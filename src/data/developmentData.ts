export type SectorId =
  | 'economy'
  | 'infrastructure'
  | 'welfare'
  | 'digital'
  | 'energy';

export interface IndicatorRecord {
  id: string;
  name: string;
  sector: SectorId;
  sectorLabel: string;
  baselineYear: string;
  baselineDisplay: string;
  latestYear: string;
  latestDisplay: string;
  changeLabel: string;
  changeNumeric: number; // for sorting
  unit: string;
  officialSource: string;
  sourceUrl: string;
  summary: string;
  contextNote: string;
  trendUnit: string;
  trendSeries: { year: string; value: number }[];
}

export interface TimeSeriesPoint {
  period: string;
  value: number;
  secondary?: number;
  isProjection?: boolean;
}

export interface TimeSeriesDataset {
  id: string;
  title: string;
  shortLabel: string;
  sector: SectorId;
  unit: string;
  secondaryLabel?: string;
  secondaryUnit?: string;
  primaryLabel: string;
  source: string;
  sourceUrl: string;
  keyTakeaway: string;
  balancedContext: string;
  targetNote?: string;
  data: TimeSeriesPoint[];
  projectedData?: TimeSeriesPoint[];
}

export interface CitizenProfile {
  id: string;
  title: string;
  subtitle: string;
  headlineMetric: string;
  headlineLabel: string;
  flagshipSchemes: {
    name: string;
    launchYear: string;
    officialReach: string;
    source: string;
    description: string;
  }[];
  upcomingInitiatives: {
    title: string;
    horizon: string;
    detail: string;
  }[];
  independentContext: {
    source: string;
    observation: string;
  };
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  sector: SectorId;
  sectorLabel: string;
  horizon: '2030' | '2047';
  baseline2014: string;
  currentStatus: string;
  targetValue: string;
  progressPercent: number;
  agency: string;
  description: string;
  executionFactors: string;
}

export interface IndependentPerspective {
  id: string;
  topic: string;
  institution: string;
  reportReference: string;
  headlineFinding: string;
  whatDataShows: string;
  policyImplication: string;
}

export interface OfficialPortal {
  name: string;
  agency: string;
  category: 'Government of Bharat' | 'Multilateral & Independent';
  coverage: string;
  url: string;
}

export const SECTOR_META: Record<
  SectorId,
  { label: string; color: string; chartColor: string }
> = {
  economy: {
    label: 'Economy & Enterprise',
    color: '#1E3A8A',
    chartColor: '#1E3A8A',
  },
  infrastructure: {
    label: 'Infrastructure & Mobility',
    color: '#B45309',
    chartColor: '#B45309',
  },
  welfare: {
    label: 'Social Welfare & Human Capital',
    color: '#15803D',
    chartColor: '#15803D',
  },
  digital: {
    label: 'Digital Public Infrastructure',
    color: '#0F766E',
    chartColor: '#0F766E',
  },
  energy: {
    label: 'Clean Energy & Transition',
    color: '#4338CA',
    chartColor: '#4338CA',
  },
};

export const HERO_TRACKS = [
  {
    id: 'economy',
    label: 'Macroeconomy',
    metricTitle: 'Nominal GDP Scale',
    baselineYear: '2014',
    baselineValue: '$2.04 Trillion',
    latestYear: 'FY 2025–26 Est.',
    latestValue: '~$4.0 Trillion',
    baselineRatio: 51,
    latestRatio: 100,
    highlightStat: '7.4%–7.6% FY26 Real GDP Growth',
    source: 'Ministry of Finance (Economic Survey) · MoSPI · IMF',
    summary:
      'Bharat rose from the 10th to the 5th largest economy globally over the decade, supported by domestic consumption, services, and public capital expenditure.',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    metricTitle: 'National Highways & Airports',
    baselineYear: '2014',
    baselineValue: '91,287 km · 74 Airports',
    latestYear: '2025–26',
    latestValue: '1,46,572 km · 163+ Airports',
    baselineRatio: 62,
    latestRatio: 100,
    highlightStat: '+61% Highway Network · 2.2× Airports',
    source: 'Press Information Bureau (PIB) · MoRTH · MoCA',
    summary:
      'National Highway length expanded by over 55,000 km while operational airports more than doubled under regional connectivity (UDAN) and PM GatiShakti.',
  },
  {
    id: 'digital',
    label: 'Digital Rail',
    metricTitle: 'UPI Annual Transaction Volume',
    baselineYear: 'FY 2016–17',
    baselineValue: '1.8 Crore Txns',
    latestYear: 'FY 2025–26',
    latestValue: '24,162 Crore Txns',
    baselineRatio: 4,
    latestRatio: 100,
    highlightStat: '₹314 Lakh Crore Value · 55.49 Cr Users',
    source: 'National Payments Corporation of Bharat (NPCI) · PIB',
    summary:
      'Unified Payments Interface (UPI) became the world’s largest real-time payment rail, onboarding over 700 banks and expanding cross-border links.',
  },
  {
    id: 'energy',
    label: 'Clean Energy',
    metricTitle: 'Non-Fossil Installed Power Capacity',
    baselineYear: '2014',
    baselineValue: '~75 GW (Solar <3 GW)',
    latestYear: '2025–26',
    latestValue: '250+ GW (Solar 130+ GW)',
    baselineRatio: 30,
    latestRatio: 100,
    highlightStat: '>50% Non-Fossil Installed Share Achieved',
    source: 'Ministry of New & Renewable Energy (MNRE) · PIB',
    summary:
      'Non-fossil sources crossed 50% of Bharat’s cumulative installed electricity capacity ahead of schedule, placing Bharat 3rd globally in renewable capacity.',
  },
];

export const MACRO_PROOF_STRIP = [
  {
    label: 'National Highways',
    value: '1,46,572 km',
    delta: '+61% from 91,287 km (2014)',
    source: 'MoRTH / PIB',
  },
  {
    label: 'Rural Tap Water (JJM)',
    value: '15.91 Cr',
    delta: 'Up from 3.23 Cr households (2019)',
    source: 'Ministry of Jal Shakti',
  },
  {
    label: 'UPI Annual Volume',
    value: '24,162 Cr',
    delta: '₹314 Lakh Cr settled in FY 2025–26',
    source: 'NPCI / PIB',
  },
  {
    label: 'Non-Fossil Capacity',
    value: '250+ GW',
    delta: 'Crossed 50% of total power capacity',
    source: 'MNRE / PIB',
  },
];

export const INDICATOR_LEDGER: IndicatorRecord[] = [
  {
    id: 'nominal-gdp',
    name: 'Nominal GDP Size',
    sector: 'economy',
    sectorLabel: 'Economy & Enterprise',
    baselineYear: '2014',
    baselineDisplay: '$2.04 Trillion',
    latestYear: '2025–26 Est.',
    latestDisplay: '~$4.0 Trillion',
    changeLabel: '~2.0× scale',
    changeNumeric: 96,
    unit: 'USD Trillion',
    officialSource: 'Ministry of Finance / IMF',
    sourceUrl: 'https://www.indiabudget.gov.in/',
    summary:
      'Bharat moved from 10th to 5th largest economy in nominal USD terms, averaging 6%–8% real growth outside the 2020–21 pandemic contraction.',
    contextNote:
      'Independent economists note per-capita GDP (~$2,700–$2,900) remains lower-middle-income, making sustained productivity and job creation essential.',
    trendUnit: '$T',
    trendSeries: [
      { year: '2014', value: 2.04 },
      { year: '2016', value: 2.29 },
      { year: '2018', value: 2.70 },
      { year: '2020', value: 2.67 },
      { year: '2022', value: 3.35 },
      { year: '2024', value: 3.75 },
      { year: '2026', value: 4.02 },
    ],
  },
  {
    id: 'real-gdp-growth',
    name: 'Real GDP Annual Growth',
    sector: 'economy',
    sectorLabel: 'Economy & Enterprise',
    baselineYear: 'FY 2014–15',
    baselineDisplay: '7.4%',
    latestYear: 'FY 2025–26',
    latestDisplay: '7.4%–7.6%',
    changeLabel: 'Q1 FY27: 7.8%',
    changeNumeric: 76,
    unit: 'Annual %',
    officialSource: 'MoSPI / Economic Survey',
    sourceUrl: 'https://www.mospi.gov.in/',
    summary:
      'Official provisional estimates place FY 2025–26 real GDP growth between 7.4% and 7.6%, with Q1 FY 2026–27 registering 7.8%.',
    contextNote:
      'IMF and World Bank highlight strong public investment and services while noting the need to broaden private corporate capital expenditure.',
    trendUnit: '%',
    trendSeries: [
      { year: 'FY15', value: 7.4 },
      { year: 'FY17', value: 8.3 },
      { year: 'FY19', value: 6.5 },
      { year: 'FY21', value: -5.8 },
      { year: 'FY23', value: 7.0 },
      { year: 'FY25', value: 6.5 },
      { year: 'FY26', value: 7.5 },
    ],
  },
  {
    id: 'public-capex',
    name: 'Central Public Capital Expenditure',
    sector: 'economy',
    sectorLabel: 'Economy & Enterprise',
    baselineYear: 'FY 2014–15',
    baselineDisplay: '₹1.97 Lakh Cr',
    latestYear: 'FY 2025–26+',
    latestDisplay: '₹12+ Lakh Cr',
    changeLabel: '6.0× outlay',
    changeNumeric: 509,
    unit: 'INR Lakh Crore',
    officialSource: 'Union Budget / PIB',
    sourceUrl: 'https://www.indiabudget.gov.in/',
    summary:
      'Central government capital expenditure expanded six-fold to fund highways, rail modernization, ports, and urban infrastructure.',
    contextNote:
      'Fiscal analysts track debt-to-GDP consolidation alongside CapEx efficiency to ensure long-term crowding-in of private investment.',
    trendUnit: '₹L Cr',
    trendSeries: [
      { year: 'FY15', value: 1.97 },
      { year: 'FY17', value: 2.85 },
      { year: 'FY19', value: 3.08 },
      { year: 'FY21', value: 4.26 },
      { year: 'FY23', value: 7.40 },
      { year: 'FY25', value: 11.11 },
      { year: 'FY26', value: 12.10 },
    ],
  },
  {
    id: 'dpiit-startups',
    name: 'DPIIT-Recognized Startups',
    sector: 'economy',
    sectorLabel: 'Economy & Enterprise',
    baselineYear: '2014–16',
    baselineDisplay: '<500 Entities',
    latestYear: '2025',
    latestDisplay: '1.50+ Lakh',
    changeLabel: '3rd largest globally',
    changeNumeric: 30000,
    unit: 'Registered Startups',
    officialSource: 'DPIIT / PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    summary:
      'Bharat scaled into the world’s 3rd largest startup ecosystem with over 100 unicorns spanning fintech, SaaS, deep-tech, and agritech.',
    contextNote:
      'Ecosystem analysts point to funding cyclicality and the gap between registered entities and profitable, large-scale employers.',
    trendUnit: 'k',
    trendSeries: [
      { year: '2016', value: 0.5 },
      { year: '2018', value: 14 },
      { year: '2020', value: 41 },
      { year: '2022', value: 84 },
      { year: '2024', value: 128 },
      { year: '2026', value: 155 },
    ],
  },
  {
    id: 'national-highways',
    name: 'National Highway Network',
    sector: 'infrastructure',
    sectorLabel: 'Infrastructure & Mobility',
    baselineYear: '2014',
    baselineDisplay: '91,287 km',
    latestYear: '2025–26',
    latestDisplay: '1,46,572 km',
    changeLabel: '+61% length',
    changeNumeric: 61,
    unit: 'Kilometers',
    officialSource: 'MoRTH / PIB',
    sourceUrl: 'https://morth.nic.in/',
    summary:
      'Four-lane and wider highway corridors more than doubled to over 45,000 km, with peak construction pacing exceeding 28 km/day.',
    contextNote:
      'Transport planners emphasize pairing highway expansion with road safety audits, last-mile feeder roads, and sustainable toll models.',
    trendUnit: 'k km',
    trendSeries: [
      { year: '2014', value: 91.3 },
      { year: '2016', value: 101.0 },
      { year: '2018', value: 126.4 },
      { year: '2020', value: 132.5 },
      { year: '2022', value: 141.0 },
      { year: '2024', value: 146.1 },
      { year: '2026', value: 146.6 },
    ],
  },
  {
    id: 'high-speed-corridors',
    name: 'Operational Expressways & High-Speed Corridors',
    sector: 'infrastructure',
    sectorLabel: 'Infrastructure & Mobility',
    baselineYear: '2014',
    baselineDisplay: '93 km',
    latestYear: '2025–26',
    latestDisplay: '4,000+ km',
    changeLabel: '40×+ expansion',
    changeNumeric: 4200,
    unit: 'Kilometers',
    officialSource: 'MoRTH / PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    summary:
      'Access-controlled corridors such as the Delhi–Mumbai, Purvanchal, and Samruddhi corridors have cut inter-city freight transit times.',
    contextNote:
      'Logistics cost reduction depends equally on multimodal warehousing and urban freight interchange integration.',
    trendUnit: 'km',
    trendSeries: [
      { year: '2014', value: 93 },
      { year: '2016', value: 260 },
      { year: '2018', value: 650 },
      { year: '2020', value: 1400 },
      { year: '2022', value: 2450 },
      { year: '2024', value: 3400 },
      { year: '2026', value: 4200 },
    ],
  },
  {
    id: 'operational-airports',
    name: 'Operational Airports',
    sector: 'infrastructure',
    sectorLabel: 'Infrastructure & Mobility',
    baselineYear: '2014',
    baselineDisplay: '74 Airports',
    latestYear: '2025–26',
    latestDisplay: '163+ Airports',
    changeLabel: '2.2× network',
    changeNumeric: 120,
    unit: 'Airports',
    officialSource: 'Ministry of Civil Aviation / PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    summary:
      'Bharat became the 3rd largest domestic aviation market globally, with UDAN connecting Tier-2 and Tier-3 cities alongside Digi Yatra rollout.',
    contextNote:
      'Aviation analysts note regional route viability after subsidy expiry and airport slot congestion in major metros as ongoing challenges.',
    trendUnit: '',
    trendSeries: [
      { year: '2014', value: 74 },
      { year: '2016', value: 82 },
      { year: '2018', value: 100 },
      { year: '2020', value: 123 },
      { year: '2022', value: 140 },
      { year: '2024', value: 157 },
      { year: '2026', value: 164 },
    ],
  },
  {
    id: 'metro-rail',
    name: 'Operational Metro Rail Network',
    sector: 'infrastructure',
    sectorLabel: 'Infrastructure & Mobility',
    baselineYear: '2014',
    baselineDisplay: '~250 km',
    latestYear: '2025–26',
    latestDisplay: '1,000+ km',
    changeLabel: '4.0× network',
    changeNumeric: 300,
    unit: 'Kilometers',
    officialSource: 'MoHUA / PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    summary:
      'Urban metro and RRTS networks expanded across 20+ cities, placing Bharat among the top three countries globally by operational metro length.',
    contextNote:
      'Urban mobility researchers note that ridership maximization requires better bus feeder integration and pedestrian last-mile access.',
    trendUnit: 'km',
    trendSeries: [
      { year: '2014', value: 248 },
      { year: '2016', value: 330 },
      { year: '2018', value: 515 },
      { year: '2020', value: 702 },
      { year: '2022', value: 810 },
      { year: '2024', value: 945 },
      { year: '2026', value: 1015 },
    ],
  },
  {
    id: 'railway-electrification',
    name: 'Broad-Gauge Railway Electrification',
    sector: 'infrastructure',
    sectorLabel: 'Infrastructure & Mobility',
    baselineYear: '2014',
    baselineDisplay: '34% (21,413 km)',
    latestYear: '2025',
    latestDisplay: '95%+ (63,000+ km)',
    changeLabel: '+61 pp coverage',
    changeNumeric: 194,
    unit: '% Broad-Gauge Network',
    officialSource: 'Ministry of Railways / PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    summary:
      'Near-total broad-gauge electrification reduces diesel import dependency and supports Bharat Railways’ net-zero carbon target.',
    contextNote:
      'Rail safety modernization (Kavach deployment) and unreserved passenger coach capacity remain high-priority operational focus areas.',
    trendUnit: '%',
    trendSeries: [
      { year: '2014', value: 34 },
      { year: '2016', value: 40 },
      { year: '2018', value: 49 },
      { year: '2020', value: 64 },
      { year: '2022', value: 81 },
      { year: '2024', value: 94 },
      { year: '2026', value: 97 },
    ],
  },
  {
    id: 'jan-dhan-accounts',
    name: 'PM Jan Dhan Bank Accounts',
    sector: 'welfare',
    sectorLabel: 'Social Welfare & Human Capital',
    baselineYear: 'Aug 2014',
    baselineDisplay: 'Scheme Launch',
    latestYear: 'Mar 2025',
    latestDisplay: '55.02 Crore',
    changeLabel: '66% rural/semi-urban',
    changeNumeric: 550,
    unit: 'Bank Accounts',
    officialSource: 'Dept. of Financial Services / PIB',
    sourceUrl: 'https://pmjdy.gov.in/',
    summary:
      'Zero-balance accounts anchored Direct Benefit Transfers (DBT), expanding formal banking access across rural households and women account holders.',
    contextNote:
      'Financial inclusion studies track account activity rates, digital literacy, and access to formal affordable credit beyond basic savings.',
    trendUnit: 'Cr',
    trendSeries: [
      { year: '2014', value: 1.5 },
      { year: '2016', value: 21.4 },
      { year: '2018', value: 31.4 },
      { year: '2020', value: 38.3 },
      { year: '2022', value: 45.1 },
      { year: '2024', value: 52.0 },
      { year: '2026', value: 55.0 },
    ],
  },
  {
    id: 'jal-jeevan-mission',
    name: 'Rural Tap Water Connections (JJM)',
    sector: 'welfare',
    sectorLabel: 'Social Welfare & Human Capital',
    baselineYear: 'Aug 2019',
    baselineDisplay: '3.23 Crore (16%)',
    latestYear: '2026',
    latestDisplay: '15.91 Crore',
    changeLabel: '4.9× households',
    changeNumeric: 392,
    unit: 'Rural Households',
    officialSource: 'Ministry of Jal Shakti / PIB',
    sourceUrl: 'https://jaljeevanmission.gov.in/',
    summary:
      'Har Ghar Jal scaled piped potable water connections to a substantial majority of rural Bharat, reducing water-collection burdens on women.',
    contextNote:
      'Long-term sustainability assessments emphasize groundwater source recharge, water quality testing, and village-level O&M funding.',
    trendUnit: 'Cr',
    trendSeries: [
      { year: '2019', value: 3.23 },
      { year: '2020', value: 5.50 },
      { year: '2021', value: 8.60 },
      { year: '2022', value: 10.80 },
      { year: '2023', value: 13.80 },
      { year: '2024', value: 15.20 },
      { year: '2026', value: 15.91 },
    ],
  },
  {
    id: 'pmay-housing',
    name: 'PMAY Affordable Pucca Houses',
    sector: 'welfare',
    sectorLabel: 'Social Welfare & Human Capital',
    baselineYear: '2015–16',
    baselineDisplay: 'Scheme Launch',
    latestYear: '2025',
    latestDisplay: '~4.0 Crore',
    changeLabel: 'Rural + Urban',
    changeNumeric: 400,
    unit: 'Sanctioned / Completed Houses',
    officialSource: 'MoRD & MoHUA / PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    summary:
      'Convergent housing delivery under PMAY-Gramin and PMAY-Urban integrated electricity, LPG, and sanitation connections.',
    contextNote:
      'Urban housing analysts note continued affordable rental shortages for migrant workers in high-density metropolitan corridors.',
    trendUnit: 'Cr',
    trendSeries: [
      { year: '2015', value: 0.1 },
      { year: '2017', value: 0.6 },
      { year: '2019', value: 1.4 },
      { year: '2021', value: 2.3 },
      { year: '2023', value: 3.3 },
      { year: '2025', value: 4.0 },
    ],
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat (PM-JAY) Cards',
    sector: 'welfare',
    sectorLabel: 'Social Welfare & Human Capital',
    baselineYear: 'Sep 2018',
    baselineDisplay: 'Scheme Launch',
    latestYear: '2025–26',
    latestDisplay: '43.9+ Crore',
    changeLabel: '₹5 Lakh family cover',
    changeNumeric: 439,
    unit: 'Health Cards Issued',
    officialSource: 'National Health Authority / PIB',
    sourceUrl: 'https://pmjay.gov.in/',
    summary:
      'Provides cashless secondary and tertiary hospitalization coverage across empanelled public and private hospitals, recently expanded to senior citizens 70+.',
    contextNote:
      'Public health economists emphasize also increasing primary care investment and addressing out-of-pocket outpatient medicine expenses.',
    trendUnit: 'Cr',
    trendSeries: [
      { year: '2018', value: 1.0 },
      { year: '2020', value: 12.5 },
      { year: '2022', value: 21.8 },
      { year: '2024', value: 34.5 },
      { year: '2026', value: 43.9 },
    ],
  },
  {
    id: 'ujjwala-lpg',
    name: 'PM Ujjwala Clean Cooking LPG Connections',
    sector: 'welfare',
    sectorLabel: 'Social Welfare & Human Capital',
    baselineYear: 'May 2016',
    baselineDisplay: 'Scheme Launch',
    latestYear: '2025–26',
    latestDisplay: '10.57 Crore',
    changeLabel: 'Clean fuel access',
    changeNumeric: 105,
    unit: 'LPG Connections',
    officialSource: 'MoPNG / PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    summary:
      'Expanded deposit-free LPG connections to low-income households to mitigate indoor biomass smoke exposure for women and children.',
    contextNote:
      'Independent household surveys monitor annual cylinder refill affordability and subsidy sensitivity among rural lower-income families.',
    trendUnit: 'Cr',
    trendSeries: [
      { year: '2016', value: 1.5 },
      { year: '2018', value: 5.0 },
      { year: '2020', value: 8.0 },
      { year: '2022', value: 9.5 },
      { year: '2024', value: 10.3 },
      { year: '2026', value: 10.57 },
    ],
  },
  {
    id: 'swachh-bharat-toilets',
    name: 'Swachh Bharat Individual Household Toilets',
    sector: 'welfare',
    sectorLabel: 'Social Welfare & Human Capital',
    baselineYear: '2014',
    baselineDisplay: '~39% Rural Coverage',
    latestYear: '2025–26',
    latestDisplay: '12.19 Crore Built',
    changeLabel: 'ODF Plus Phase II',
    changeNumeric: 156,
    unit: 'Toilets Constructed',
    officialSource: 'Dept. of Drinking Water & Sanitation / PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    summary:
      'Expanded universal household sanitation infrastructure alongside Phase II solid/liquid waste management and GOBARdhan biogas initiatives.',
    contextNote:
      'Sanitation audits focus on consistent usage behavior, water availability in toilets, and faecal sludge treatment capacity.',
    trendUnit: 'Cr',
    trendSeries: [
      { year: '2014', value: 0.5 },
      { year: '2016', value: 2.8 },
      { year: '2018', value: 8.4 },
      { year: '2020', value: 10.7 },
      { year: '2023', value: 11.4 },
      { year: '2026', value: 12.19 },
    ],
  },
  {
    id: 'multidimensional-poverty',
    name: 'Multidimensional Poverty Reduction',
    sector: 'welfare',
    sectorLabel: 'Social Welfare & Human Capital',
    baselineYear: '2013–14',
    baselineDisplay: '29.17% Headcount',
    latestYear: '2022–23',
    latestDisplay: '11.28% Headcount',
    changeLabel: '~25 Cr lifted out',
    changeNumeric: 179,
    unit: '% Population (MPI)',
    officialSource: 'NITI Aayog Discussion Paper',
    sourceUrl: 'https://www.niti.gov.in/',
    summary:
      'NITI Aayog’s Multidimensional Poverty Index reports steep declines across health, education, and standard-of-living deprivations.',
    contextNote:
      'Economists debate MPI projection methodology between NFHS rounds and highlight ongoing child nutrition (stunting/anaemia) indicators.',
    trendUnit: '%',
    trendSeries: [
      { year: '2014', value: 29.17 },
      { year: '2016', value: 24.85 },
      { year: '2018', value: 19.90 },
      { year: '2020', value: 14.96 },
      { year: '2023', value: 11.28 },
    ],
  },
  {
    id: 'medical-education',
    name: 'AIIMS & Medical Colleges',
    sector: 'welfare',
    sectorLabel: 'Social Welfare & Human Capital',
    baselineYear: '2014',
    baselineDisplay: '7 AIIMS · 387 Colleges',
    latestYear: '2025',
    latestDisplay: '22+ AIIMS · 700+ Colleges',
    changeLabel: '3.1× AIIMS · 1.8× Colleges',
    changeNumeric: 214,
    unit: 'Institutions',
    officialSource: 'MoHFW / PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    summary:
      'Significantly scaled tertiary public medical campuses and MBBS/PG seats alongside expansion of IITs (16 to 23) and IIMs.',
    contextNote:
      'Health workforce planners highlight faculty recruitment in newer institutions and rural specialist doctor retention.',
    trendUnit: 'colleges',
    trendSeries: [
      { year: '2014', value: 387 },
      { year: '2016', value: 422 },
      { year: '2018', value: 499 },
      { year: '2020', value: 558 },
      { year: '2022', value: 648 },
      { year: '2025', value: 731 },
    ],
  },
  {
    id: 'upi-volume',
    name: 'UPI Annual Transaction Volume',
    sector: 'digital',
    sectorLabel: 'Digital Public Infrastructure',
    baselineYear: 'FY 2016–17',
    baselineDisplay: '1.8 Crore',
    latestYear: 'FY 2025–26',
    latestDisplay: '24,162 Crore',
    changeLabel: 'World #1 real-time rail',
    changeNumeric: 13400,
    unit: 'Transactions / Year',
    officialSource: 'NPCI / PIB',
    sourceUrl: 'https://www.npci.org.in/',
    summary:
      'UPI processed ₹314 lakh crore in value across 55.49 crore unique users and 700+ banks in FY 2025–26, with growing international corridors.',
    contextNote:
      'Payments regulators focus on zero-MDR infrastructure sustainability, cybersecurity, and reducing digital fraud for first-time users.',
    trendUnit: 'Cr',
    trendSeries: [
      { year: 'FY17', value: 1.8 },
      { year: 'FY19', value: 539 },
      { year: 'FY21', value: 2233 },
      { year: 'FY23', value: 8375 },
      { year: 'FY25', value: 18580 },
      { year: 'FY26', value: 24162 },
    ],
  },
  {
    id: 'digital-economy-share',
    name: 'Digital Economy Share of GDP',
    sector: 'digital',
    sectorLabel: 'Digital Public Infrastructure',
    baselineYear: '2014',
    baselineDisplay: '~4.5% of GDP',
    latestYear: '2025–26',
    latestDisplay: '12%–14% of GDP',
    changeLabel: '~3× GDP share',
    changeNumeric: 190,
    unit: '% of National GDP',
    officialSource: 'MeitY / PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    summary:
      'Powered by Bharat Stack (Aadhaar, UPI, DigiLocker, ONDC) and affordable 4G/5G mobile broadband, digital services now anchor economic formalization.',
    contextNote:
      'Policy researchers track rural-urban digital divide, data privacy enforcement (DPDP Act), and AI workforce upskilling.',
    trendUnit: '%',
    trendSeries: [
      { year: '2014', value: 4.5 },
      { year: '2016', value: 5.8 },
      { year: '2018', value: 7.4 },
      { year: '2020', value: 8.8 },
      { year: '2023', value: 11.7 },
      { year: '2026', value: 13.4 },
    ],
  },
  {
    id: 'non-fossil-power',
    name: 'Non-Fossil Installed Power Capacity',
    sector: 'energy',
    sectorLabel: 'Clean Energy & Transition',
    baselineYear: '2014',
    baselineDisplay: '~75 GW',
    latestYear: '2025–26',
    latestDisplay: '250+ GW (>50% share)',
    changeLabel: '3.3× capacity',
    changeNumeric: 233,
    unit: 'Gigawatts (GW)',
    officialSource: 'MNRE / PIB',
    sourceUrl: 'https://mnre.gov.in/',
    summary:
      'Bharat crossed 50% non-fossil installed electricity generation capacity years ahead of its 2030 Paris Agreement NDC commitment.',
    contextNote:
      'Energy grid analysts note coal still supplies a majority of actual electricity generation (MWh), making grid storage and transmission expansion critical.',
    trendUnit: 'GW',
    trendSeries: [
      { year: '2014', value: 75 },
      { year: '2016', value: 96 },
      { year: '2018', value: 118 },
      { year: '2020', value: 141 },
      { year: '2022', value: 168 },
      { year: '2024', value: 205 },
      { year: '2026', value: 254 },
    ],
  },
  {
    id: 'solar-capacity',
    name: 'Installed Solar Power Capacity',
    sector: 'energy',
    sectorLabel: 'Clean Energy & Transition',
    baselineYear: '2014',
    baselineDisplay: '<3 GW',
    latestYear: '2025–26',
    latestDisplay: '130+ GW',
    changeLabel: '45×+ expansion',
    changeNumeric: 4400,
    unit: 'Gigawatts (GW)',
    officialSource: 'MNRE / PIB',
    sourceUrl: 'https://mnre.gov.in/',
    summary:
      'Utility-scale solar parks and PM Surya Ghar rooftop solar drives propelled Bharat to 3rd globally in overall renewable energy capacity.',
    contextNote:
      'Industry observers highlight domestic solar cell/wafer manufacturing scale-up and DISCOM financial health as key enablers.',
    trendUnit: 'GW',
    trendSeries: [
      { year: '2014', value: 2.8 },
      { year: '2016', value: 9.0 },
      { year: '2018', value: 25.2 },
      { year: '2020', value: 37.5 },
      { year: '2022', value: 63.3 },
      { year: '2024', value: 94.0 },
      { year: '2026', value: 135.0 },
    ],
  },
  {
    id: 'food-security-pmgkay',
    name: 'National Food Security Coverage (PMGKAY)',
    sector: 'welfare',
    sectorLabel: 'Social Welfare & Human Capital',
    baselineYear: '2014',
    baselineDisplay: 'NFSA Rollout',
    latestYear: '2025',
    latestDisplay: '81+ Crore Citizens',
    changeLabel: 'Extended free grains',
    changeNumeric: 81,
    unit: 'Beneficiaries',
    officialSource: 'Dept. of Food & Public Distribution / PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    summary:
      'One Nation One Ration Card portability and digitized PDS provide free foodgrain entitlements to over 81 crore eligible beneficiaries.',
    contextNote:
      'Economists note that continued scale of foodgrain assistance reflects both social safety-net reach and persistent low-income vulnerability.',
    trendUnit: 'Cr',
    trendSeries: [
      { year: '2014', value: 52 },
      { year: '2016', value: 72 },
      { year: '2018', value: 80 },
      { year: '2020', value: 80.5 },
      { year: '2023', value: 81.3 },
      { year: '2026', value: 81.4 },
    ],
  },
];

export const TIME_SERIES_DATASETS: TimeSeriesDataset[] = [
  {
    id: 'gdp-capex',
    title: 'Nominal GDP Scale & Central Public CapEx',
    shortLabel: 'GDP & CapEx',
    sector: 'economy',
    primaryLabel: 'Nominal GDP (USD Trillion)',
    unit: '$T',
    secondaryLabel: 'Central CapEx (₹ Lakh Cr)',
    secondaryUnit: '₹L Cr',
    source: 'Ministry of Finance (Economic Survey) · MoSPI · IMF',
    sourceUrl: 'https://www.indiabudget.gov.in/',
    keyTakeaway:
      'Bharat’s nominal GDP nearly doubled from $2.04T (2014) to ~$4.0T (FY26 Est.) while central capital expenditure scaled six-fold past ₹12 lakh crore.',
    balancedContext:
      'World Bank and IMF highlight public CapEx as a key post-pandemic stabilizer, while noting that durable 8%+ growth requires stronger private corporate investment.',
    targetNote: 'Official Viksit Bharat horizon aims for $30T+ developed economy status by 2047.',
    data: [
      { period: 'FY15', value: 2.04, secondary: 1.97 },
      { period: 'FY17', value: 2.29, secondary: 2.85 },
      { period: 'FY19', value: 2.70, secondary: 3.08 },
      { period: 'FY21', value: 2.67, secondary: 4.26 },
      { period: 'FY23', value: 3.35, secondary: 7.40 },
      { period: 'FY25', value: 3.75, secondary: 11.11 },
      { period: 'FY26E', value: 4.02, secondary: 12.10 },
    ],
    projectedData: [
      { period: 'FY15', value: 2.04, secondary: 1.97 },
      { period: 'FY17', value: 2.29, secondary: 2.85 },
      { period: 'FY19', value: 2.70, secondary: 3.08 },
      { period: 'FY21', value: 2.67, secondary: 4.26 },
      { period: 'FY23', value: 3.35, secondary: 7.40 },
      { period: 'FY25', value: 3.75, secondary: 11.11 },
      { period: 'FY26E', value: 4.02, secondary: 12.10 },
      { period: '2030P', value: 6.50, secondary: 18.00, isProjection: true },
    ],
  },
  {
    id: 'upi-growth',
    title: 'UPI Digital Payments Scale (FY 2017–FY 2026)',
    shortLabel: 'UPI Payments',
    sector: 'digital',
    primaryLabel: 'Annual Transactions (Crore)',
    unit: 'Cr',
    secondaryLabel: 'Annual Value (₹ Lakh Cr)',
    secondaryUnit: '₹L Cr',
    source: 'National Payments Corporation of Bharat (NPCI) · PIB',
    sourceUrl: 'https://www.npci.org.in/',
    keyTakeaway:
      'UPI expanded from 1.8 crore transactions in FY 2016–17 to 24,162 crore transactions worth ₹314 lakh crore in FY 2025–26.',
    balancedContext:
      'World Bank praises Bharat Stack for lowering transaction costs and formalizing micro-merchants; analysts also highlight cybersecurity and digital fraud vigilance.',
    data: [
      { period: 'FY17', value: 1.8, secondary: 0.07 },
      { period: 'FY19', value: 539, secondary: 8.77 },
      { period: 'FY21', value: 2233, secondary: 41.04 },
      { period: 'FY22', value: 4597, secondary: 84.16 },
      { period: 'FY23', value: 8375, secondary: 139.20 },
      { period: 'FY24', value: 13116, secondary: 199.95 },
      { period: 'FY25', value: 18580, secondary: 260.50 },
      { period: 'FY26', value: 24162, secondary: 314.00 },
    ],
  },
  {
    id: 'highways-airports',
    title: 'National Highways & Operational Airports',
    shortLabel: 'Transport Infra',
    sector: 'infrastructure',
    primaryLabel: 'National Highways (Thousand km)',
    unit: 'k km',
    secondaryLabel: 'Operational Airports (Count)',
    secondaryUnit: 'Airports',
    source: 'Ministry of Road Transport & Highways · MoCA · PIB',
    sourceUrl: 'https://www.pib.gov.in/',
    keyTakeaway:
      'National Highways grew 61% from 91.3k km (2014) to 146.6k km (2025–26), while operational airports more than doubled from 74 to 163+.',
    balancedContext:
      'Transport economists highlight faster inter-state logistics while recommending sustained investment in state/rural feeder roads and urban public transit.',
    data: [
      { period: '2014', value: 91.3, secondary: 74 },
      { period: '2016', value: 101.0, secondary: 82 },
      { period: '2018', value: 126.4, secondary: 100 },
      { period: '2020', value: 132.5, secondary: 123 },
      { period: '2022', value: 141.0, secondary: 140 },
      { period: '2024', value: 146.1, secondary: 157 },
      { period: '2026', value: 146.6, secondary: 164 },
    ],
  },
  {
    id: 'renewable-capacity',
    title: 'Non-Fossil & Solar Power Capacity (GW)',
    shortLabel: 'Clean Energy',
    sector: 'energy',
    primaryLabel: 'Non-Fossil Capacity (GW)',
    unit: 'GW',
    secondaryLabel: 'Solar Capacity (GW)',
    secondaryUnit: 'GW',
    source: 'Ministry of New & Renewable Energy (MNRE) · PIB',
    sourceUrl: 'https://mnre.gov.in/',
    keyTakeaway:
      'Non-fossil capacity expanded from ~75 GW in 2014 to 250+ GW in 2025–26, crossing 50% of total installed power capacity ahead of the 2030 target.',
    balancedContext:
      'Energy researchers note that integrating 500 GW by 2030 requires rapid battery/pumped-hydro storage expansion and distribution utility (DISCOM) reform.',
    targetNote: 'Official interim target: 500 GW non-fossil electricity capacity by 2030.',
    data: [
      { period: '2014', value: 75, secondary: 2.8 },
      { period: '2017', value: 108, secondary: 12.3 },
      { period: '2019', value: 131, secondary: 28.2 },
      { period: '2021', value: 151, secondary: 40.1 },
      { period: '2023', value: 179, secondary: 66.8 },
      { period: '2025', value: 226, secondary: 105.0 },
      { period: '2026', value: 254, secondary: 135.0 },
    ],
    projectedData: [
      { period: '2014', value: 75, secondary: 2.8 },
      { period: '2017', value: 108, secondary: 12.3 },
      { period: '2019', value: 131, secondary: 28.2 },
      { period: '2021', value: 151, secondary: 40.1 },
      { period: '2023', value: 179, secondary: 66.8 },
      { period: '2025', value: 226, secondary: 105.0 },
      { period: '2026', value: 254, secondary: 135.0 },
      { period: '2030T', value: 500, secondary: 292.0, isProjection: true },
    ],
  },
  {
    id: 'jal-jeevan',
    title: 'Rural Tap Water Coverage — Jal Jeevan Mission',
    shortLabel: 'Rural Water',
    sector: 'welfare',
    primaryLabel: 'Rural Households with Tap Water (Crore)',
    unit: 'Cr',
    source: 'Ministry of Jal Shakti (JJM Dashboard) · PIB',
    sourceUrl: 'https://jaljeevanmission.gov.in/',
    keyTakeaway:
      'Rural piped water coverage rose from 3.23 crore households (~16%) at launch in August 2019 to 15.91 crore households by 2026.',
    balancedContext:
      'Independent field reviews highlight substantial time savings for rural women alongside the need for continuous water source sustainability and chlorination testing.',
    data: [
      { period: 'Aug 2019', value: 3.23 },
      { period: '2020', value: 5.50 },
      { period: '2021', value: 8.60 },
      { period: '2022', value: 10.80 },
      { period: '2023', value: 13.80 },
      { period: '2024', value: 15.20 },
      { period: '2026', value: 15.91 },
    ],
  },
];

export const CITIZEN_PROFILES: CitizenProfile[] = [
  {
    id: 'rural-household',
    title: 'Rural Household',
    subtitle: 'Basic amenities, financial inclusion & direct transfers',
    headlineMetric: '15.91 Cr',
    headlineLabel: 'Rural tap water connections reached under Jal Jeevan Mission',
    flagshipSchemes: [
      {
        name: 'Jal Jeevan Mission (Har Ghar Jal)',
        launchYear: '2019',
        officialReach: '15.91 Cr rural households (up from 3.23 Cr)',
        source: 'Ministry of Jal Shakti / PIB',
        description: 'Functional household tap connections providing safe drinking water across hundreds of thousands of villages.',
      },
      {
        name: 'PM Awas Yojana — Gramin & Swachh Bharat',
        launchYear: '2014–2016',
        officialReach: '~4 Cr total PMAY houses · 12.19 Cr toilets',
        source: 'MoRD / DDWS / PIB',
        description: 'Pucca housing convergence with individual household sanitation, electricity access, and clean cooking LPG (10.57 Cr Ujjwala connections).',
      },
      {
        name: 'PM Jan Dhan Yojana & Direct Benefit Transfer',
        launchYear: '2014',
        officialReach: '55.02 Cr accounts (66% rural/semi-urban)',
        source: 'Dept. of Financial Services / PIB',
        description: 'Formal bank accounts enabling direct transfer of subsidies, crop support, and rural welfare benefits with reduced leakages.',
      },
    ],
    upcomingInitiatives: [
      {
        title: 'ODF Plus Model Villages & GOBARdhan',
        horizon: '2026–2030',
        detail: 'Scaling rural solid/liquid waste management and community biogas infrastructure.',
      },
      {
        title: 'Rural Solar Micro-Grids & KUSUM',
        horizon: '2026–2030',
        detail: 'Solarized agricultural feeders and pumps to lower irrigation costs and enable daytime farm power.',
      },
    ],
    independentContext: {
      source: 'World Bank · RBI · Independent Rural Surveys',
      observation:
        'While physical asset delivery (toilets, bank accounts, tap connections, housing) expanded rapidly, economists emphasize rural wage growth, non-farm job creation, and resilience against food inflation and erratic monsoons.',
    },
  },
  {
    id: 'urban-commuter',
    title: 'Urban Commuter & Traveler',
    subtitle: 'Highways, metro transit, railways & regional aviation',
    headlineMetric: '1,000+ km',
    headlineLabel: 'Operational metro rail network across 20+ cities across Bharat',
    flagshipSchemes: [
      {
        name: 'National Highway & Expressway Expansion',
        launchYear: '2014–Ongoing',
        officialReach: '1,46,572 km NH · 4,000+ km Expressways',
        source: 'MoRTH / PIB',
        description: 'Multi-lane corridors and FASTag electronic tolling significantly cut highway transit delays.',
      },
      {
        name: 'Metro Rail, Vande Bharat & Rail Electrification',
        launchYear: '2014–Ongoing',
        officialReach: '1,000+ km Metro · 95%+ Broad-Gauge Electrified',
        source: 'MoHUA / Ministry of Railways / PIB',
        description: 'Semi-high-speed Vande Bharat corridors, Amrit Bharat station upgrades, and expanded urban metro networks.',
      },
      {
        name: 'UDAN Regional Aviation & Digi Yatra',
        launchYear: '2016–Ongoing',
        officialReach: '163+ Operational Airports (up from 74)',
        source: 'Ministry of Civil Aviation / PIB',
        description: 'Expanded commercial flights to Tier-2 and Tier-3 cities alongside biometric paperless boarding.',
      },
    ],
    upcomingInitiatives: [
      {
        title: '7,000 km High-Speed Rail Corridors',
        horizon: 'Vision 2047',
        detail: 'Dedicated passenger high-speed rail corridors designed for 320–350 km/h operations, starting with Mumbai–Ahmedabad.',
      },
      {
        title: 'Indigenous Kavach Rail Safety Rollout',
        horizon: '2026–2030',
        detail: 'Nationwide expansion of automatic train protection across high-density rail routes.',
      },
    ],
    independentContext: {
      source: 'Urban Mobility Institutes · Policy Analysts',
      observation:
        'Rapid metro and expressway expansion is transforming inter-city and core-city transit; urban planners note municipal bus capacity, air quality, and pedestrian last-mile links remain key priorities.',
    },
  },
  {
    id: 'health-education',
    title: 'Healthcare & Higher Education',
    subtitle: 'Public health protection, medical capacity & premier institutes',
    headlineMetric: '43.9+ Cr',
    headlineLabel: 'Ayushman Bharat health cards issued nationwide',
    flagshipSchemes: [
      {
        name: 'Ayushman Bharat (PM-JAY)',
        launchYear: '2018',
        officialReach: '43.9+ Cr cards · ₹5 Lakh family cover/yr',
        source: 'National Health Authority / PIB',
        description: 'Cashless secondary and tertiary hospitalization coverage across public and private empanelled hospitals.',
      },
      {
        name: 'Medical Colleges & AIIMS Expansion',
        launchYear: '2014–Ongoing',
        officialReach: '22+ AIIMS (up from 7) · 700+ Medical Colleges',
        source: 'MoHFW / PIB',
        description: 'Near-doubling of medical colleges from 387 in 2014 expanded regional tertiary healthcare and MBBS/PG training seats.',
      },
      {
        name: 'Premier Technical & Management Campuses',
        launchYear: '2014–Ongoing',
        officialReach: '23 IITs (up from 16) + expanded IIMs & IIITs',
        source: 'Ministry of Education / PIB',
        description: 'Established new national institutes in underserved states alongside National Education Policy (NEP 2020) reforms.',
      },
    ],
    upcomingInitiatives: [
      {
        title: 'ABDM Digital Health Records & Telemedicine',
        horizon: '2026–2030',
        detail: 'Interoperable citizen health IDs and e-Sanjeevani tele-consultations linking district hospitals with rural clinics.',
      },
      {
        title: 'AI & Semiconductor Academic Talent Pipelines',
        horizon: '2026–2035',
        detail: 'Specialized university curricula and labs aligned with Bharat Semiconductor Mission and BharatAI initiatives.',
      },
    ],
    independentContext: {
      source: 'World Bank · Public Health & Education Economists',
      observation:
        'Independent analyses note that while hospital insurance and college counts grew substantially, foundational primary school learning outcomes, youth employability skills, and public health spend as a % of GDP require continued elevation.',
    },
  },
  {
    id: 'msme-startup',
    title: 'Startup Founder & MSME',
    subtitle: 'Digital payments, formalization & domestic manufacturing',
    headlineMetric: '1.50+ Lakh',
    headlineLabel: 'DPIIT-recognized startups across Bharat’s innovation ecosystem',
    flagshipSchemes: [
      {
        name: 'UPI & Bharat Stack Open Digital Rails',
        launchYear: '2016–Ongoing',
        officialReach: '24,162 Cr txns · ₹314 Lakh Cr in FY26',
        source: 'NPCI / PIB',
        description: 'Near-zero-cost instant digital settlement empowering street vendors, small retailers, and SaaS/fintech innovators.',
      },
      {
        name: 'Startup Bharat & Production-Linked Incentives (PLI)',
        launchYear: '2016–2020',
        officialReach: '1.50+ Lakh startups · 14 PLI manufacturing sectors',
        source: 'DPIIT / PIB',
        description: 'Tax incentives, compliance simplification, and electronics/mobile manufacturing scale-up.',
      },
      {
        name: 'PM GatiShakti National Master Plan',
        launchYear: '2021',
        officialReach: 'GIS-integrated multimodal logistics planning',
        source: 'Ministry of Commerce & Industry / PIB',
        description: 'Coordinated rail, road, port, and industrial corridor planning to lower business logistics costs.',
      },
    ],
    upcomingInitiatives: [
      {
        title: 'Bharat Semiconductor Mission (ISM 2.0)',
        horizon: '2026–2035',
        detail: 'Fabrication units, OSAT packaging ecosystems, compound semiconductors, and indigenous chip design.',
      },
      {
        title: 'Deep-Tech & Electronics Component Ecosystem',
        horizon: '2026–2047',
        detail: 'Moving up the global value chain from assembly toward high-value components, AI hardware, and defence exports.',
      },
    ],
    independentContext: {
      source: 'IMF Article IV · World Bank · Industry Bodies',
      observation:
        'Global institutions commend digital formalization and infrastructure CapEx, while stressing land/labor regulatory streamlining, judicial contract enforcement, and MSME working-capital access to unlock labor-intensive manufacturing jobs.',
    },
  },
  {
    id: 'clean-energy',
    title: 'Clean Energy & Climate Transition',
    subtitle: 'Solar expansion, grid modernization & net-zero pathway',
    headlineMetric: '250+ GW',
    headlineLabel: 'Non-fossil installed capacity (>50% of national capacity)',
    flagshipSchemes: [
      {
        name: 'National Solar & Renewable Energy Mission',
        launchYear: '2014–Ongoing',
        officialReach: '130+ GW Solar (up from <3 GW in 2014)',
        source: 'MNRE / PIB',
        description: 'World’s 3rd largest renewable energy capacity, achieving the 50% non-fossil installed capacity milestone ahead of schedule.',
      },
      {
        name: 'PM Surya Ghar & Rooftop Solar',
        launchYear: '2024–Ongoing',
        officialReach: 'Subsidized residential rooftop solar rollout',
        source: 'MNRE / PIB',
        description: 'Direct capital subsidies helping households generate clean electricity and lower monthly utility bills.',
      },
      {
        name: '100% Village Electrification & Green Mobility',
        launchYear: '2014–Ongoing',
        officialReach: 'Universal grid reach + EV & Rail electrification',
        source: 'Ministry of Power / Railways / PIB',
        description: 'Expanded household grid connectivity alongside 95%+ railway electrification and electric transit adoption.',
      },
    ],
    upcomingInitiatives: [
      {
        title: '500 GW Non-Fossil Capacity by 2030',
        horizon: '2030 Target',
        detail: 'Scaling solar, wind, hydro, and green hydrogen electrolyzers with high-voltage green energy transmission corridors.',
      },
      {
        title: '100 GW Nuclear Power & 1,200+ GW Solar',
        horizon: 'Vision 2047',
        detail: 'NITI Aayog blueprint incorporating Small Modular Reactors (SMRs) for reliable clean baseload power toward 2070 Net Zero.',
      },
    ],
    independentContext: {
      source: 'IEA · Energy Policy Analysts',
      observation:
        'Bharat’s renewable installation pace is globally notable; energy experts emphasize scaling battery/pumped-hydro storage and reforming state power distribution utilities so clean capacity translates into clean baseload generation.',
    },
  },
];

export const FUTURE_ROADMAP: RoadmapMilestone[] = [
  {
    id: 'non-fossil-500gw',
    title: '500 GW Non-Fossil Electricity Capacity',
    sector: 'energy',
    sectorLabel: 'Clean Energy',
    horizon: '2030',
    baseline2014: '~75 GW',
    currentStatus: '250+ GW (50%+ share)',
    targetValue: '500 GW by 2030',
    progressPercent: 51,
    agency: 'Ministry of New & Renewable Energy (MNRE) / PIB',
    description:
      'Doubling non-fossil installed generation capacity within five years through utility solar parks, offshore wind, and interstate green transmission corridors.',
    executionFactors:
      'Requires rapid expansion of battery energy storage systems (BESS), pumped hydro, and financially healthy state DISCOMs.',
  },
  {
    id: 'semiconductor-hub',
    title: 'Bharat Semiconductor Mission (ISM 2.0) & Chip Ecosystem',
    sector: 'digital',
    sectorLabel: 'Technology & Manufacturing',
    horizon: '2030',
    baseline2014: 'Nascent Design Only',
    currentStatus: 'Approved Fabs & OSAT Plants Under Construction',
    targetValue: 'Integrated Fab + OSAT + Component Hub',
    progressPercent: 32,
    agency: 'MeitY / NITI Aayog / PIB',
    description:
      'Establishing domestic wafer fabrication, outsourced assembly/testing (OSAT), compound semiconductors, and AI-native chip design capabilities.',
    executionFactors:
      'Dependent on ultra-pure water/power reliability, global supply-chain partnerships, and specialized semiconductor engineering talent.',
  },
  {
    id: 'net-zero-railways-kavach',
    title: 'Net-Zero Carbon Railways & Kavach Modernization',
    sector: 'infrastructure',
    sectorLabel: 'Railways & Mobility',
    horizon: '2030',
    baseline2014: '34% Electrified',
    currentStatus: '95%+ Broad-Gauge Electrified',
    targetValue: 'Net-Zero Rail + Nationwide Kavach',
    progressPercent: 78,
    agency: 'Ministry of Railways / PIB',
    description:
      'Completing 100% rail electrification, pairing traction power with renewables, deploying indigenous Kavach anti-collision tech, and expanding Vande Bharat Sleeper fleets.',
    executionFactors:
      'Dedicated renewable procurement for railway traction and accelerated trackside Kavach installation across dense trunk routes.',
  },
  {
    id: 'high-speed-rail-7000',
    title: '7,000 km High-Speed Passenger Rail Corridors',
    sector: 'infrastructure',
    sectorLabel: 'Railways & Mobility',
    horizon: '2047',
    baseline2014: '0 km Operational',
    currentStatus: 'Mumbai–Ahmedabad Corridor Under Construction',
    targetValue: '7,000 km (up to 350 km/h) by 2047',
    progressPercent: 14,
    agency: 'Ministry of Railways / PIB',
    description:
      'Dedicated high-speed passenger corridors connecting Bharat’s major economic clusters at operational speeds around 320 km/h under the Viksit Bharat blueprint.',
    executionFactors:
      'Long-term capital financing, land acquisition coordination across states, and domestic manufacturing of high-speed rolling stock.',
  },
  {
    id: 'nuclear-100gw',
    title: '100 GW Nuclear Power & 1,200+ GW Solar Vision',
    sector: 'energy',
    sectorLabel: 'Clean Energy',
    horizon: '2047',
    baseline2014: '4.8 GW Nuclear',
    currentStatus: '~8.2 GW Nuclear · 130+ GW Solar',
    targetValue: '100 GW Nuclear · 1,200+ GW Solar by 2047',
    progressPercent: 12,
    agency: 'NITI Aayog / Dept. of Atomic Energy / PIB',
    description:
      'NITI Aayog energy pathways outline Small Modular Reactors (SMRs) and advanced pressurized heavy-water reactors alongside massive solar and wind expansion.',
    executionFactors:
      'Regulatory frameworks for SMRs, private/international technology collaboration, and long-horizon capital mobilization.',
  },
  {
    id: 'viksit-bharat-economy',
    title: 'Viksit Bharat 2047 — Developed Economy Transformation',
    sector: 'economy',
    sectorLabel: 'Macroeconomy',
    horizon: '2047',
    baseline2014: '$2.04 Trillion GDP',
    currentStatus: '~$4.0 Trillion GDP (5th Globally)',
    targetValue: 'High-Income Developed Nation by 2047',
    progressPercent: 26,
    agency: 'NITI Aayog / Ministry of Finance',
    description:
      'Sustaining high productivity growth through PM GatiShakti multi-modal infrastructure, manufacturing competitiveness, human capital, and digital public infrastructure.',
    executionFactors:
      'IMF and economists calculate Bharat needs sustained ~7.5%–8%+ real growth, higher female workforce participation, and broad-based formal job creation.',
  },
];

export const INDEPENDENT_PERSPECTIVES: IndependentPerspective[] = [
  {
    id: 'jobs-lfpr',
    topic: 'Formal Job Creation & Youth Employment',
    institution: 'International Monetary Fund (IMF) & World Bank',
    reportReference: 'IMF Article IV Consultations · World Bank Economic Updates',
    headlineFinding:
      'Headline GDP growth outpaces formal salaried manufacturing job creation.',
    whatDataShows:
      'While modeled headline unemployment hovers near 4%–5%, independent labor economists point to elevated youth unemployment, a high share of informal or agricultural work, and female labor force participation rates that remain below global peer averages.',
    policyImplication:
      'Sustaining Bharat’s demographic dividend requires scaling labor-intensive manufacturing, vocational skilling, and urban childcare/safety infrastructure to bring more women into formal employment.',
  },
  {
    id: 'inequality',
    topic: 'Income & Wealth Distribution Dynamics',
    institution: 'World Inequality Lab & NIPFP Research',
    reportReference: 'Income & Wealth Inequality Studies (2024–2025)',
    headlineFinding:
      'Rapid aggregate growth has coincided with rising top-end income and wealth concentration.',
    whatDataShows:
      'Researchers analyzing tax and household survey data observe a disproportionate share of national income accruing to top percentiles, prompting debates around "K-shaped" consumption where premium urban segments expand faster than rural and lower-income real wages.',
    policyImplication:
      'Expanding direct welfare assets (housing, tap water, health insurance) helps lift basic living standards, while economists emphasize broad wage growth and public education/health quality to narrow structural disparities.',
  },
  {
    id: 'inflation-food',
    topic: 'Food Inflation Volatility & Household Budgets',
    institution: 'Reserve Bank of Bharat (RBI) & IMF',
    reportReference: 'RBI Monetary Policy Reports · IMF Country Assessments',
    headlineFinding:
      'Core inflation has moderated, but recurrent food price spikes strain lower-income households.',
    whatDataShows:
      'Although headline CPI largely stayed within the RBI’s 2%–6% tolerance band across recent years, weather-driven vegetable, cereal, and pulse price surges periodically erode real disposable incomes for households spending a larger budget share on food.',
    policyImplication:
      'Cold-chain logistics, climate-resilient agriculture, and storage modernization are critical to stabilizing food supply chains over the next decade.',
  },
  {
    id: 'private-capex',
    topic: 'Public CapEx Leadership vs. Private Corporate Investment',
    institution: 'World Bank & Independent Macroeconomists',
    reportReference: 'Global Economic Prospects · Domestic Economic Reviews',
    headlineFinding:
      'Central public CapEx (₹12+ lakh crore) carried growth momentum while private CapEx recovered gradually.',
    whatDataShows:
      'Public infrastructure spending successfully bridged investment gaps post-2020 and cleaned up bank balance sheets, but private corporate fixed capital formation has been selective across sectors.',
    policyImplication:
      'Transitioning from public-led CapEx to a broad private investment cycle requires predictable trade/tax policy, deeper domestic consumption demand, and factor-market (land, power, logistics) reforms.',
  },
];

export const OFFICIAL_PORTALS: OfficialPortal[] = [
  {
    name: 'Press Information Bureau (PIB)',
    agency: 'Ministry of Information & Broadcasting, Govt. of Bharat',
    category: 'Government of Bharat',
    coverage: 'Official year-end ministry reviews, scheme milestones, and Cabinet releases.',
    url: 'https://www.pib.gov.in/',
  },
  {
    name: 'Ministry of Statistics & Programme Implementation (MoSPI)',
    agency: 'National Statistical Office (NSO), Govt. of Bharat',
    category: 'Government of Bharat',
    coverage: 'Official quarterly & annual GDP estimates, CPI inflation, IIP, and PLFS labor surveys.',
    url: 'https://www.mospi.gov.in/',
  },
  {
    name: 'Union Budget & Economic Survey Portal',
    agency: 'Ministry of Finance, Govt. of Bharat',
    category: 'Government of Bharat',
    coverage: 'Annual Economic Survey volumes, central capital expenditure outlays, and fiscal accounts.',
    url: 'https://www.indiabudget.gov.in/',
  },
  {
    name: 'NITI Aayog',
    agency: 'National Institution for Transforming Bharat',
    category: 'Government of Bharat',
    coverage: 'Multidimensional Poverty Index (MPI), Viksit Bharat 2047 energy/economic scenarios, and state indices.',
    url: 'https://www.niti.gov.in/',
  },
  {
    name: 'NPCI Product Statistics',
    agency: 'National Payments Corporation of Bharat',
    category: 'Government of Bharat',
    coverage: 'Monthly and annual UPI transaction volumes, settlement values, and participating banks.',
    url: 'https://www.npci.org.in/',
  },
  {
    name: 'Ministry of New & Renewable Energy (MNRE)',
    agency: 'Government of Bharat',
    category: 'Government of Bharat',
    coverage: 'Installed solar, wind, hydro, and non-fossil capacity dashboards and 500 GW 2030 tracking.',
    url: 'https://mnre.gov.in/',
  },
  {
    name: 'Jal Jeevan Mission Dashboard',
    agency: 'Ministry of Jal Shakti, Govt. of Bharat',
    category: 'Government of Bharat',
    coverage: 'District- and village-level rural household tap water connection coverage.',
    url: 'https://jaljeevanmission.gov.in/',
  },
  {
    name: 'Reserve Bank of Bharat (DBIE)',
    agency: 'Central Bank of Bharat',
    category: 'Government of Bharat',
    coverage: 'Database on Bharat Economy: monetary policy, inflation, forex reserves, and banking indicators.',
    url: 'https://www.rbi.org.in/',
  },
  {
    name: 'International Monetary Fund — Bharat Portal',
    agency: 'IMF',
    category: 'Multilateral & Independent',
    coverage: 'Article IV consultations, World Economic Outlook projections, and structural policy reviews.',
    url: 'https://www.imf.org/en/Countries/IND',
  },
  {
    name: 'World Bank — Bharat Data & Research',
    agency: 'World Bank Group',
    category: 'Multilateral & Independent',
    coverage: 'Global Economic Prospects, Bharat Development Updates, and comparative development indicators.',
    url: 'https://www.worldbank.org/en/country/india',
  },
];
