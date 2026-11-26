// Verified official datasets for Cost-of-Living, Workforce/PLFS, Civic Action, and Global Peers

// --- 1. EVERYDAY COST-OF-LIVING & HOUSEHOLD TRACKER ---
export interface CostIndexPoint {
  year: string;
  incomeIndex: number; // MoSPI Per-Capita NNI (Current Prices), 2014-15 = 100
  foodBasketIndex: number; // Composite CPI retail food staples index, 2014 = 100
  fuelLpgIndex: number; // Delhi Retail Petrol/Diesel/LPG composite, 2014 = 100
  mobileDataIndex: number; // TRAI average tariff per GB, 2014 = 100
}

export const COST_OF_LIVING_INDEX_SERIES: CostIndexPoint[] = [
  { year: '2014', incomeIndex: 100, foodBasketIndex: 100, fuelLpgIndex: 100, mobileDataIndex: 100 },
  { year: '2016', incomeIndex: 119, foodBasketIndex: 112, fuelLpgIndex: 93, mobileDataIndex: 58 },
  { year: '2018', incomeIndex: 145, foodBasketIndex: 118, fuelLpgIndex: 112, mobileDataIndex: 7.4 },
  { year: '2020', incomeIndex: 153, foodBasketIndex: 132, fuelLpgIndex: 119, mobileDataIndex: 4.4 },
  { year: '2022', incomeIndex: 196, foodBasketIndex: 146, fuelLpgIndex: 142, mobileDataIndex: 3.7 },
  { year: '2024', incomeIndex: 218, foodBasketIndex: 159, fuelLpgIndex: 138, mobileDataIndex: 3.3 },
  { year: '2025', incomeIndex: 237, foodBasketIndex: 164, fuelLpgIndex: 141, mobileDataIndex: 3.2 },
  { year: '2026', incomeIndex: 244, foodBasketIndex: 169, fuelLpgIndex: 151, mobileDataIndex: 3.1 },
];

export interface EssentialPriceRecord {
  id: string;
  category: 'Food Staple' | 'Household Energy' | 'Telecom' | 'Household Income';
  item: string;
  unit: string;
  price2014: number;
  price2020: number;
  price2025: number;
  price2026: number;
  display2014: string;
  display2026: string;
  pctChange: string;
  source: string;
  note: string;
}

export const ESSENTIAL_ITEMS_LEDGER: EssentialPriceRecord[] = [
  {
    id: 'per-capita-nni',
    category: 'Household Income',
    item: 'Per-Capita Net National Income (Nominal)',
    unit: '₹ / year',
    price2014: 86647,
    price2020: 132341,
    price2025: 205324,
    price2026: 211500,
    display2014: '₹86,647',
    display2026: '₹2,11,500*',
    pctChange: '+144% nominal',
    source: 'MoSPI / NSO',
    note: 'Current-price annual per-capita NNI (provisional 2025–26 series exceeds ₹2.08–2.15 lakh; real constant-price per-capita income rose ~58% over the decade).',
  },
  {
    id: 'rice',
    category: 'Food Staple',
    item: 'Rice (All-Bharat Retail Average)',
    unit: '₹ / kg',
    price2014: 27.5,
    price2020: 34.8,
    price2025: 43.5,
    price2026: 48.25,
    display2014: '₹27.50',
    display2026: '₹48.25',
    pctChange: '+75%',
    source: 'Dept. of Consumer Affairs (PMD)',
    note: 'Open-market retail average; ~81 crore NFSA beneficiaries also receive free monthly foodgrain allocations under PMGKAY.',
  },
  {
    id: 'atta',
    category: 'Food Staple',
    item: 'Wheat Flour / Atta',
    unit: '₹ / kg',
    price2014: 24.0,
    price2020: 30.2,
    price2025: 36.8,
    price2026: 38.28,
    display2014: '₹24.00',
    display2026: '₹38.28',
    pctChange: '+60%',
    source: 'Dept. of Consumer Affairs (PMD)',
    note: 'Tracked daily across 550+ official retail price monitoring centres.',
  },
  {
    id: 'tur-dal',
    category: 'Food Staple',
    item: 'Tur / Arhar Dal',
    unit: '₹ / kg',
    price2014: 78.0,
    price2020: 96.0,
    price2025: 138.0,
    price2026: 136.66,
    display2014: '₹78.00',
    display2026: '₹136.66',
    pctChange: '+75%',
    source: 'Dept. of Consumer Affairs (PMD)',
    note: 'Pulses exhibit strong monsoon sensitivity and cyclical supply spikes relative to headline CPI.',
  },
  {
    id: 'milk',
    category: 'Food Staple',
    item: 'Liquid Milk',
    unit: '₹ / litre',
    price2014: 40.0,
    price2020: 47.0,
    price2025: 59.0,
    price2026: 62.39,
    display2014: '₹40.00',
    display2026: '₹62.39',
    pctChange: '+56%',
    source: 'Dept. of Consumer Affairs (PMD)',
    note: 'Steady annual increases reflecting dairy fodder costs and cooperative procurement revisions.',
  },
  {
    id: 'lpg-cylinder',
    category: 'Household Energy',
    item: 'Domestic LPG Cylinder (14.2 kg, Delhi)',
    unit: '₹ / cylinder',
    price2014: 414,
    price2020: 694,
    price2025: 853,
    price2026: 942,
    display2014: '₹414 (sub.)',
    display2026: '₹942 (non-sub.)',
    pctChange: '+128% vs sub.',
    source: 'PPAC / IOCL',
    note: '2014 subsidized Delhi quota rate (~₹414; non-subsidized averaged ~₹880–1,241). In 2026, general retail is ₹942 while 10+ Cr PMUY Ujjwala households receive ₹300/cylinder DBT subsidy.',
  },
  {
    id: 'petrol',
    category: 'Household Energy',
    item: 'Petrol (Delhi Retail Selling Price)',
    unit: '₹ / litre',
    price2014: 71.5,
    price2020: 81.0,
    price2025: 94.72,
    price2026: 102.12,
    display2014: '₹71.50',
    display2026: '₹102.12',
    pctChange: '+43%',
    source: 'PPAC / IOCL',
    note: 'Reflects global crude movements alongside central excise duty and state VAT components.',
  },
  {
    id: 'diesel',
    category: 'Household Energy',
    item: 'Diesel (Delhi Retail Selling Price)',
    unit: '₹ / litre',
    price2014: 55.5,
    price2020: 73.5,
    price2025: 87.62,
    price2026: 95.2,
    display2014: '₹55.50',
    display2026: '₹95.20',
    pctChange: '+72%',
    source: 'PPAC / IOCL',
    note: 'Diesel was fully market-deregulated in October 2014; freight costs closely track diesel prices.',
  },
  {
    id: 'mobile-data',
    category: 'Telecom',
    item: 'Wireless Mobile Data Tariff',
    unit: '₹ / GB',
    price2014: 269,
    price2020: 11.8,
    price2025: 8.6,
    price2026: 8.4,
    display2014: '₹269.00',
    display2026: '₹8.40',
    pctChange: '-97%',
    source: 'TRAI Performance Indicators',
    note: 'Average realization per GB collapsed by ~97% as 4G/5G expanded; monthly usage rose past 25 GB/subscriber.',
  },
];

export interface HouseholdProfilePreset {
  id: 'rural' | 'tier2' | 'metro';
  label: string;
  riceKg: number;
  attaKg: number;
  dalKg: number;
  milkLitres: number;
  lpgCylinders: number;
  petrolLitres: number;
  mobileDataGb: number;
  isUjjwala: boolean;
}

export const HOUSEHOLD_PRESETS: HouseholdProfilePreset[] = [
  {
    id: 'rural',
    label: 'Rural Household (4 members)',
    riceKg: 15,
    attaKg: 15,
    dalKg: 3,
    milkLitres: 20,
    lpgCylinders: 0.7,
    petrolLitres: 12,
    mobileDataGb: 30,
    isUjjwala: true,
  },
  {
    id: 'tier2',
    label: 'Tier-2 Urban Family',
    riceKg: 12,
    attaKg: 14,
    dalKg: 4,
    milkLitres: 30,
    lpgCylinders: 1.0,
    petrolLitres: 25,
    mobileDataGb: 60,
    isUjjwala: false,
  },
  {
    id: 'metro',
    label: 'Metro Commuter Family',
    riceKg: 10,
    attaKg: 12,
    dalKg: 4,
    milkLitres: 40,
    lpgCylinders: 1.0,
    petrolLitres: 45,
    mobileDataGb: 90,
    isUjjwala: false,
  },
];

// --- 2. EMPLOYMENT, SKILLING & WORKFORCE DASHBOARD ---
export interface PlfsAnnualPoint {
  year: string;
  unemploymentPct: number; // Usual Status (ps+ss), Age 15+
  femaleLfprPct: number; // Female LFPR (ps+ss), Age 15+
  wprPct: number; // Worker Population Ratio (ps+ss), Age 15+
}

export const PLFS_ANNUAL_SERIES: PlfsAnnualPoint[] = [
  { year: '2017–18', unemploymentPct: 6.1, femaleLfprPct: 23.3, wprPct: 46.8 },
  { year: '2018–19', unemploymentPct: 5.8, femaleLfprPct: 24.5, wprPct: 47.3 },
  { year: '2019–20', unemploymentPct: 4.8, femaleLfprPct: 30.0, wprPct: 50.9 },
  { year: '2020–21', unemploymentPct: 4.2, femaleLfprPct: 32.5, wprPct: 52.6 },
  { year: '2021–22', unemploymentPct: 4.1, femaleLfprPct: 32.8, wprPct: 52.9 },
  { year: '2022–23', unemploymentPct: 3.2, femaleLfprPct: 37.0, wprPct: 56.0 },
  { year: '2023–24', unemploymentPct: 3.2, femaleLfprPct: 41.7, wprPct: 58.2 },
];

export interface EpfoPayrollPoint {
  year: string;
  netAdditionsCrore: number;
}

export const EPFO_PAYROLL_SERIES: EpfoPayrollPoint[] = [
  { year: 'FY19', netAdditionsCrore: 0.61 },
  { year: 'FY20', netAdditionsCrore: 0.79 },
  { year: 'FY21', netAdditionsCrore: 0.77 },
  { year: 'FY22', netAdditionsCrore: 1.22 },
  { year: 'FY23', netAdditionsCrore: 1.39 },
  { year: 'FY24', netAdditionsCrore: 1.31 },
  { year: 'FY25', netAdditionsCrore: 1.42 },
  { year: 'FY26*', netAdditionsCrore: 1.48 },
];

export const SKILLING_OUTCOMES = [
  {
    program: 'PM Kaushal Vikas Yojana (PMKVY 1.0–4.0)',
    metric: '1.42+ Crore trained',
    agency: 'Ministry of Skill Dev. (MSDE)',
    detail: 'Short-term industry-aligned training, Recognition of Prior Learning (RPL), and future-skills courses including AI, green energy, and drone operation.',
  },
  {
    program: 'Employment Linked Incentive (ELI) & EPFO Formalization',
    metric: '1.3–1.5 Cr/yr net additions',
    agency: 'EPFO / Ministry of Labour',
    detail: 'Direct wage and provident-fund support for first-time formal employees and manufacturing employers expanding formal payrolls.',
  },
  {
    program: 'National Apprenticeship & PM Vishwakarma',
    metric: '35+ Lakh apprentices & artisans',
    agency: 'MSDE / Ministry of MSME',
    detail: 'On-the-job industrial apprenticeships (NAPS) paired with skill stipends and toolkit grants for traditional craftspeople.',
  },
];

export const LABOUR_INDEPENDENT_REVIEWS = [
  {
    institution: 'ILO & Institute for Human Development (IHD)',
    report: 'Bharat Employment Report 2024',
    summary:
      'Notes rising overall employment and female participation, while flagging that youth account for over 80% of the unemployed—with unemployment rates significantly higher among secondary and graduate-level educated youth due to a skills-to-formal-jobs mismatch.',
    url: 'https://www.ilo.org/',
  },
  {
    institution: 'IMF & Labour Economists',
    report: 'Article IV & PLFS Structural Reviews',
    summary:
      'Points out that much of the post-2019 surge in Female LFPR (23.3% → 41.7%) reflects rural self-employment and unpaid family farm work rather than regular salaried jobs; urban female participation (~28%) and manufacturing absorption remain top policy priorities.',
    url: 'https://www.imf.org/en/Countries/IND',
  },
  {
    institution: 'Parliamentary Committees & CAG',
    report: 'Skill Bharat & PMKVY Evaluations',
    summary:
      'While millions have been certified under PMKVY, independent and parliamentary audits highlight uneven placement tracking, gaps between short-term certificates and employer demand, and the need to upgrade ITI equipment and industry linkage.',
    url: 'https://prsindia.org/',
  },
];

// --- 3. CIVIC ACTION & PUBLIC SERVICES DIRECTORY ---
export type CivicCategory =
  | 'All'
  | 'Parliament & MPs'
  | 'Grievances & RTI'
  | 'Local Works & Audits'
  | 'Digital Services';

export interface CivicToolRecord {
  id: string;
  name: string;
  category: Exclude<CivicCategory, 'All'>;
  operator: string;
  whatYouCanDo: string;
  typicalTimeline: string;
  url: string;
  domain: string;
}

export const CIVIC_TOOLS: CivicToolRecord[] = [
  {
    id: 'prs-mptrack',
    name: 'PRS MP & MLA Performance Track',
    category: 'Parliament & MPs',
    operator: 'PRS Legislative Research (Independent)',
    whatYouCanDo:
      'Look up your Lok Sabha or Rajya Sabha MP by constituency to check attendance %, debates participated in, questions asked, and private member bills introduced.',
    typicalTimeline: 'Updated every parliamentary session',
    url: 'https://prsindia.org/mptrack',
    domain: 'prsindia.org/mptrack',
  },
  {
    id: 'digital-sansad',
    name: 'Digital Sansad (Parliament of Bharat)',
    category: 'Parliament & MPs',
    operator: 'Lok Sabha & Rajya Sabha Secretariats',
    whatYouCanDo:
      'Read verbatim parliamentary debates, pending bills, Standing Committee reports, and official ministry replies to starred/unstarred questions.',
    typicalTimeline: 'Live during sessions & full archives',
    url: 'https://sansad.in/',
    domain: 'sansad.in',
  },
  {
    id: 'cpgrams',
    name: 'CPGRAMS Public Grievance Portal',
    category: 'Grievances & RTI',
    operator: 'DARPG, Government of Bharat',
    whatYouCanDo:
      'Lodge formal complaints online against Central or State government departments (railways, banking, pensions, telecom, civic offices) and track resolution status.',
    typicalTimeline: 'Target disposal within 21–30 days',
    url: 'https://pgportal.gov.in/',
    domain: 'pgportal.gov.in',
  },
  {
    id: 'rti-online',
    name: 'RTI Online Filing Portal',
    category: 'Grievances & RTI',
    operator: 'Department of Personnel & Training (DoPT)',
    whatYouCanDo:
      'File a Right to Information application to any Central Public Authority for ₹10 (exempt for BPL citizens) to obtain official records, contracts, or file notings.',
    typicalTimeline: 'Statutory reply within 30 days (48 hrs life/liberty)',
    url: 'https://rtionline.gov.in/',
    domain: 'rtionline.gov.in',
  },
  {
    id: 'egramswaraj',
    name: 'e-GramSwaraj & Gram Panchayat Works',
    category: 'Local Works & Audits',
    operator: 'Ministry of Panchayati Raj',
    whatYouCanDo:
      'Inspect approved village development plans (GPDP), fund releases, contractor payments, and geo-tagged physical progress of local panchayat works.',
    typicalTimeline: 'Real-time financial year tracking',
    url: 'https://egramswaraj.gov.in/',
    domain: 'egramswaraj.gov.in',
  },
  {
    id: 'mplads',
    name: 'MPLADS e-SAKSHI Constituency Fund Tracker',
    category: 'Local Works & Audits',
    operator: 'MoSPI',
    whatYouCanDo:
      'Verify how your MP allocates their ₹5 crore annual constituency development fund across roads, schools, water tanks, and community facilities.',
    typicalTimeline: 'Ongoing project-stage updates',
    url: 'https://mplads.gov.in/',
    domain: 'mplads.gov.in',
  },
  {
    id: 'digilocker-umang',
    name: 'DigiLocker & UMANG Unified Services',
    category: 'Digital Services',
    operator: 'MeitY / NeGD',
    whatYouCanDo:
      'Access legally valid digital copies of Aadhaar, PAN, Driving Licence, CBSE/State marksheets, vehicle RC, and 1,500+ Central/State citizen services in one place.',
    typicalTimeline: 'Instant paperless issuance',
    url: 'https://www.digilocker.gov.in/',
    domain: 'digilocker.gov.in',
  },
  {
    id: 'mygov-consult',
    name: 'MyGov Draft Policy Consultations',
    category: 'Digital Services',
    operator: 'Government of Bharat',
    whatYouCanDo:
      'Read draft legislation, regulatory proposals, and national missions open for public consultation and submit citizen feedback directly to ministries.',
    typicalTimeline: 'Open during ministry comment windows',
    url: 'https://www.mygov.in/',
    domain: 'mygov.in',
  },
];

export interface CitizenHowToGuide {
  id: string;
  title: string;
  feeAndTime: string;
  steps: string[];
  officialUrl: string;
  officialLabel: string;
}

export const CITIZEN_HOWTO_GUIDES: CitizenHowToGuide[] = [
  {
    id: 'guide-rti',
    title: 'How to File an Online RTI Request',
    feeAndTime: 'Fee: ₹10 (Free for BPL) · Statutory Reply: 30 Days',
    steps: [
      'Visit rtionline.gov.in and select “Submit Request” after reviewing the portal guidelines.',
      'Choose the relevant Central Ministry or Public Authority from the dropdown menu.',
      'Write concise, specific questions asking for existing official records, dates, or expenditure documents (avoid open-ended opinions).',
      'Pay ₹10 via UPI, NetBanking, or card (or upload a BPL card for exemption) and save your Registration Number.',
      'If no reply arrives within 30 days—or the reply is incomplete—file a free First Appeal on the same portal within 30 days.',
    ],
    officialUrl: 'https://rtionline.gov.in/',
    officialLabel: 'Open rtionline.gov.in',
  },
  {
    id: 'guide-cpgrams',
    title: 'How to Lodge & Escalate a CPGRAMS Grievance',
    feeAndTime: 'Fee: Free · Target Resolution: 21–30 Days',
    steps: [
      'Register using your mobile number or email on pgportal.gov.in (also accessible via the UMANG app).',
      'Select “Lodge Public Grievance”, pick the Central Ministry or State Government, and choose the exact sub-category.',
      'Attach supporting PDF proof (receipt, application ID, or earlier correspondence) under 4 MB.',
      'Track officer movement in real time using the generated Grievance Registration Number.',
      'If closed unsatisfactorily, submit a formal rating and file an online Appeal to the designated Appellate Authority.',
    ],
    officialUrl: 'https://pgportal.gov.in/',
    officialLabel: 'Open pgportal.gov.in',
  },
  {
    id: 'guide-mp',
    title: 'How to Check Your MP’s Parliamentary Record',
    feeAndTime: 'Fee: Free · Open Independent & Official Records',
    steps: [
      'Open PRS MP Track (prsindia.org/mptrack) and search by your parliamentary constituency name or MP’s name.',
      'Compare their session attendance, debates, and questions asked against the national and state average.',
      'Cross-verify full transcripts of their spoken debates and tabled ministry replies on Digital Sansad (sansad.in).',
      'Check local constituency spending on roads, water, and public halls via the MPLADS e-SAKSHI portal (mplads.gov.in).',
    ],
    officialUrl: 'https://prsindia.org/mptrack',
    officialLabel: 'Open PRS MP Track',
  },
];

// --- 4. BHARAT VS. GLOBAL PEERS BENCHMARK ---
export interface GlobalPeerRecord {
  id: string;
  economy: string;
  realGdpGrowthPct: number; // IMF WEO 2025-26 projected annual %
  gdpPerCapitaNominalUsd: number; // IMF WEO 2026 est. USD
  gdpPerCapitaPppUsd: number; // IMF WEO 2026 est. International $ (PPP)
  cleanElectricitySharePct: number; // Ember / IRENA clean electricity share %
  hdiScore: number; // UNDP Human Development Report 2025 (0–1 scale)
  hdiTier: string;
  nominalGdpTrillionUsd: number;
  highlightNote: string;
}

export const GLOBAL_PEER_BENCHMARKS: GlobalPeerRecord[] = [
  {
    id: 'india',
    economy: 'Bharat',
    realGdpGrowthPct: 7.0,
    gdpPerCapitaNominalUsd: 2750,
    gdpPerCapitaPppUsd: 11900,
    cleanElectricitySharePct: 23,
    hdiScore: 0.685,
    hdiTier: 'Medium (Rank 130/193)',
    nominalGdpTrillionUsd: 4.06,
    highlightNote: 'Fastest-growing major economy with rapid solar/digital buildout; bridging per-capita income & HDI gaps remains the central 2047 challenge.',
  },
  {
    id: 'vietnam',
    economy: 'Vietnam',
    realGdpGrowthPct: 6.1,
    gdpPerCapitaNominalUsd: 5259,
    gdpPerCapitaPppUsd: 16800,
    cleanElectricitySharePct: 35,
    hdiScore: 0.766,
    hdiTier: 'High Human Dev.',
    nominalGdpTrillionUsd: 0.51,
    highlightNote: 'Export-intensive electronics & manufacturing hub; strong schooling and life expectancy lift HDI above its income tier.',
  },
  {
    id: 'indonesia',
    economy: 'Indonesia',
    realGdpGrowthPct: 5.1,
    gdpPerCapitaNominalUsd: 5153,
    gdpPerCapitaPppUsd: 17100,
    cleanElectricitySharePct: 15,
    hdiScore: 0.728,
    hdiTier: 'High Human Dev.',
    nominalGdpTrillionUsd: 1.48,
    highlightNote: 'ASEAN’s largest economy anchored in domestic consumption and downstream minerals; coal remains dominant in power generation.',
  },
  {
    id: 'china',
    economy: 'China',
    realGdpGrowthPct: 4.5,
    gdpPerCapitaNominalUsd: 15371,
    gdpPerCapitaPppUsd: 27100,
    cleanElectricitySharePct: 38,
    hdiScore: 0.797,
    hdiTier: 'High Human Dev.',
    nominalGdpTrillionUsd: 21.5,
    highlightNote: 'Upper-middle-income manufacturing powerhouse leading global renewable installations, now moderating amid demographic & property shifts.',
  },
  {
    id: 'usa',
    economy: 'United States',
    realGdpGrowthPct: 2.3,
    gdpPerCapitaNominalUsd: 95212,
    gdpPerCapitaPppUsd: 95212,
    cleanElectricitySharePct: 42,
    hdiScore: 0.938,
    hdiTier: 'Very High',
    nominalGdpTrillionUsd: 32.6,
    highlightNote: 'World’s largest advanced economy backed by high productivity, capital markets, and AI/technology investment.',
  },
  {
    id: 'eu',
    economy: 'European Union',
    realGdpGrowthPct: 1.3,
    gdpPerCapitaNominalUsd: 43500,
    gdpPerCapitaPppUsd: 62500,
    cleanElectricitySharePct: 71,
    hdiScore: 0.915,
    hdiTier: 'Very High',
    nominalGdpTrillionUsd: 19.6,
    highlightNote: 'Leads major blocs in clean electricity share (~71%) and social indicators, while facing slower demographic & GDP growth.',
  },
];
