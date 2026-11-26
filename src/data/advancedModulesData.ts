// Verified official datasets for:
// 1. NITI Aayog SDG Bharat Index 2023–24 scores (36 States & UTs)
// 2. Mega Infrastructure & PM GatiShakti Projects (PIB / MoRTH / Railways / MeitY / MoPSW)
// 3. Digital Public Infrastructure — Bharat Stack (NPCI / UIDAI / MeitY / NHA / ONDC)
// 4. Environment, Clean Energy & EV Adoption (MNRE / Vahan / CPCB / FSI / NMCG)
// 5. Official Union Budget FY 2025–26 Income Tax Slabs & Household Subsidy Parameters

// --- 1. NITI AAYOG SDG BHARAT INDEX 2023–24 COMPOSITE SCORES (0–100) ---
export const STATE_SDG_SCORES: Record<string, number> = {
  'andhra-pradesh': 74,
  'arunachal-pradesh': 65,
  assam: 65,
  bihar: 57,
  chhattisgarh: 67,
  goa: 77,
  gujarat: 74,
  haryana: 72,
  'himachal-pradesh': 77,
  jharkhand: 62,
  karnataka: 75,
  kerala: 79,
  'madhya-pradesh': 67,
  maharashtra: 73,
  manipur: 72,
  meghalaya: 63,
  mizoram: 72,
  nagaland: 63,
  odisha: 66,
  punjab: 76,
  rajasthan: 67,
  sikkim: 76,
  'tamil-nadu': 78,
  telangana: 74,
  tripura: 71,
  'uttar-pradesh': 67,
  uttarakhand: 79,
  'west-bengal': 70,
  'andaman-nicobar': 71,
  chandigarh: 77,
  'dadra-nagar-haveli-daman-diu': 65,
  delhi: 70,
  'jammu-kashmir': 74,
  ladakh: 68,
  lakshadweep: 72,
  puducherry: 74,
};

export const NATIONAL_SDG_AVERAGE = 71;

// --- 2. MEGA INFRASTRUCTURE & PM GATISHAKTI PROJECT TRACKER ---
export type ProjectSector =
  | 'Expressways'
  | 'Rail & Vande Bharat'
  | 'Metro & Urban Transit'
  | 'Semiconductors & Industry'
  | 'Ports & Institutions';

export type ProjectStatus =
  | 'Operational'
  | 'Partially Operational'
  | 'Under Construction';

export interface MegaProjectRecord {
  id: string;
  name: string;
  sector: ProjectSector;
  status: ProjectStatus;
  outlayDisplay: string;
  outlayCrore: number;
  completionPct: number;
  timeline: string;
  statesCovered: string;
  ministry: string;
  headlineSpec: string;
  summary: string;
  officialSource: string;
}

export const MEGA_PROJECTS: MegaProjectRecord[] = [
  {
    id: 'delhi-mumbai-expressway',
    name: 'Delhi–Mumbai 8-Lane Greenfield Expressway',
    sector: 'Expressways',
    status: 'Partially Operational',
    outlayDisplay: '₹1,00,000 Cr',
    outlayCrore: 100000,
    completionPct: 84,
    timeline: '2019 – 2026',
    statesCovered: 'Delhi, Haryana, Rajasthan, MP, Gujarat, Maharashtra',
    ministry: 'MoRTH / NHAI',
    headlineSpec: '1,386 km · 8-lane access-controlled corridor',
    summary:
      'Longest access-controlled greenfield expressway in Bharat, designed to cut Delhi–Mumbai road freight travel time from ~24 hours to ~12 hours; major Rajasthan, Haryana, and MP stretches are open.',
    officialSource: 'NHAI / PIB',
  },
  {
    id: 'samruddhi-mahamarg',
    name: 'Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Mahamarg',
    sector: 'Expressways',
    status: 'Operational',
    outlayDisplay: '₹55,335 Cr',
    outlayCrore: 55335,
    completionPct: 100,
    timeline: '2019 – 2025',
    statesCovered: 'Maharashtra (Nagpur to Mumbai/Thane)',
    ministry: 'MSRDC / MoRTH',
    headlineSpec: '701 km · 6-lane greenfield expressway',
    summary:
      'High-speed corridor linking Nagpur in Vidarbha to Igatpuri–Amane near Mumbai, slashing transit times from 16 hours to ~8 hours and connecting 10 districts directly to JNPA and Vadhavan ports.',
    officialSource: 'MSRDC / PIB',
  },
  {
    id: 'ganga-expressway',
    name: 'Ganga Expressway (Meerut – Prayagraj)',
    sector: 'Expressways',
    status: 'Under Construction',
    outlayDisplay: '₹36,230 Cr',
    outlayCrore: 36230,
    completionPct: 86,
    timeline: '2021 – 2026',
    statesCovered: 'Uttar Pradesh (12 districts)',
    ministry: 'UPEIDA / MoRTH',
    headlineSpec: '594 km · 6-lane expandable to 8 lanes',
    summary:
      'Connects western and eastern Uttar Pradesh with an industrial corridor backbone and a 3.5 km emergency airstrip in Shahjahanpur.',
    officialSource: 'UPEIDA / PIB',
  },
  {
    id: 'mumbai-ahmedabad-hsr',
    name: 'Mumbai–Ahmedabad High-Speed Rail (Bullet Train)',
    sector: 'Rail & Vande Bharat',
    status: 'Under Construction',
    outlayDisplay: '₹1,08,000 Cr',
    outlayCrore: 108000,
    completionPct: 58,
    timeline: '2017 – 2027 (First Gujarat section)',
    statesCovered: 'Gujarat, Maharashtra, DNH',
    ministry: 'Ministry of Railways / NHSRCL',
    headlineSpec: '508 km · 320 km/h Shinkansen E5 tech · 21 km undersea tunnel',
    summary:
      'Bharat’s first high-speed rail corridor featuring 350+ km of completed viaduct piers in Gujarat and an undersea tunnel across Thane Creek; Surat–Bilimora trial section targeted first.',
    officialSource: 'NHSRCL / Ministry of Railways',
  },
  {
    id: 'dedicated-freight-corridors',
    name: 'Eastern & Western Dedicated Freight Corridors (EDFC & WDFC)',
    sector: 'Rail & Vande Bharat',
    status: 'Partially Operational',
    outlayDisplay: '₹1,24,000 Cr',
    outlayCrore: 124000,
    completionPct: 96,
    timeline: '2014 – 2026',
    statesCovered: 'Punjab to West Bengal & UP to Maharashtra (JNPA)',
    ministry: 'Ministry of Railways / DFCCIL',
    headlineSpec: '2,843 km · Double-stack electrified freight backbone',
    summary:
      'Over 96% commissioned; Eastern DFC (1,337 km) is 100% operational while final Maharashtra JNPA connectivity completes the Western DFC, raising average freight speeds above 50 km/h.',
    officialSource: 'DFCCIL / PIB',
  },
  {
    id: 'vande-bharat-expansion',
    name: 'Vande Bharat Semi-High-Speed Train Network',
    sector: 'Rail & Vande Bharat',
    status: 'Operational',
    outlayDisplay: '₹40,000+ Cr (Rolling Stock)',
    outlayCrore: 40000,
    completionPct: 100,
    timeline: '2019 – Ongoing',
    statesCovered: 'Pan-Bharat (24+ States & UTs)',
    ministry: 'Ministry of Railways / ICF Chennai',
    headlineSpec: '136+ operational train services · Sleeper variant in trials',
    summary:
      'Indigenously designed semi-high-speed trainsets with KAVACH anti-collision readiness, regenerative braking, and rapid inter-city acceleration; Vande Bharat Sleeper expands overnight routes.',
    officialSource: 'Ministry of Railways / PIB',
  },
  {
    id: 'usbrl-chenab-bridge',
    name: 'Udhampur–Srinagar–Baramulla Rail Link (USBRL) & Chenab Bridge',
    sector: 'Rail & Vande Bharat',
    status: 'Operational',
    outlayDisplay: '₹43,780 Cr',
    outlayCrore: 43780,
    completionPct: 100,
    timeline: '2002 – 2025',
    statesCovered: 'Jammu & Kashmir',
    ministry: 'Ministry of Railways / Northern Railway',
    headlineSpec: '272 km · World’s highest railway arch bridge (359 m)',
    summary:
      'All-weather broad-gauge rail connectivity integrating Kashmir Valley with the national rail grid across 36 tunnels and the iconic Chenab steel arch and Anji Khad cable-stayed bridges.',
    officialSource: 'Ministry of Railways / PIB',
  },
  {
    id: 'metro-rail-network',
    name: 'National Metro & RRTS Rapid Transit Expansion',
    sector: 'Metro & Urban Transit',
    status: 'Operational',
    outlayDisplay: '₹2,50,000+ Cr (Combined)',
    outlayCrore: 250000,
    completionPct: 92,
    timeline: '2014 – Ongoing',
    statesCovered: '23 Cities across 11+ States (incl. Delhi–Meerut Namo Bharat)',
    ministry: 'MoHUA / NCRTC',
    headlineSpec: '1,000+ km operational (3rd largest metro network globally)',
    summary:
      'Expanded from 248 km across 5 cities in 2014 to over 1,000 km across 23 cities by 2025–26, alongside Bharat’s first 160 km/h Regional Rapid Transit System (Namo Bharat).',
    officialSource: 'MoHUA / PIB',
  },
  {
    id: 'tata-dholera-semicon',
    name: 'Tata Electronics–PSMC Dholera Semiconductor Fab',
    sector: 'Semiconductors & Industry',
    status: 'Under Construction',
    outlayDisplay: '₹91,000 Cr',
    outlayCrore: 91000,
    completionPct: 38,
    timeline: '2024 – 2027',
    statesCovered: 'Gujarat (Dholera SIR)',
    ministry: 'MeitY / Bharat Semiconductor Mission',
    headlineSpec: '50,000 wafer starts/month · 28nm–110nm chips',
    summary:
      'Bharat’s first commercial silicon wafer fabrication facility backed by the Bharat Semiconductor Mission, targeting automotive, power management, display driver, and telecom chips.',
    officialSource: 'MeitY / ISM / PIB',
  },
  {
    id: 'micron-sanand-atmp',
    name: 'Micron Sanand & Tata Jagiroad Semiconductor Assembly (ATMP/OSAT)',
    sector: 'Semiconductors & Industry',
    status: 'Under Construction',
    outlayDisplay: '₹49,516 Cr (Combined)',
    outlayCrore: 49516,
    completionPct: 68,
    timeline: '2023 – 2026',
    statesCovered: 'Gujarat (Sanand) & Assam (Morigaon)',
    ministry: 'MeitY / ISM',
    headlineSpec: 'DRAM/NAND packaging (Sanand) + 4.8 Cr chips/day (Assam)',
    summary:
      'Establishes commercial chip assembly, testing, and packaging capacity in both Western and Northeastern Bharat, supported by central and state fiscal incentives.',
    officialSource: 'MeitY / PIB',
  },
  {
    id: 'vizhinjam-vadhavan-ports',
    name: 'Vizhinjam Transshipment Port & Vadhavan Deep-Water Port',
    sector: 'Ports & Institutions',
    status: 'Partially Operational',
    outlayDisplay: '₹85,087 Cr (Combined)',
    outlayCrore: 85087,
    completionPct: 52,
    timeline: '2015 – 2030',
    statesCovered: 'Kerala (Vizhinjam) & Maharashtra (Vadhavan)',
    ministry: 'MoPSW / Sagarmala',
    headlineSpec: '20 m natural draft · 23.2M TEU Vadhavan ultimate capacity',
    summary:
      'Vizhinjam began commercial transshipment operations in 2024–25 to recapture container cargo previously routed via foreign hubs; Vadhavan Port (₹76,220 Cr) is designed to enter global top-10 container ports.',
    officialSource: 'MoPSW / PIB',
  },
  {
    id: 'greenfield-airports',
    name: 'Noida (Jewar) & Navi Mumbai International Airports',
    sector: 'Ports & Institutions',
    status: 'Partially Operational',
    outlayDisplay: '₹47,200 Cr (Combined)',
    outlayCrore: 47200,
    completionPct: 90,
    timeline: '2018 – 2026',
    statesCovered: 'Uttar Pradesh (NCR) & Maharashtra (MMR)',
    ministry: 'Ministry of Civil Aviation / AAI',
    headlineSpec: 'Dual-hub decongestion · 160M+ combined ultimate passenger capacity',
    summary:
      'Twin greenfield mega-airports built to relieve Delhi IGI and Mumbai CSMIA congestion, integrated with expressways, metro extensions, and multi-modal cargo parks.',
    officialSource: 'MoCA / PIB',
  },
  {
    id: 'aiims-iit-expansion',
    name: 'AIIMS & Premier Higher Education Institutional Expansion',
    sector: 'Ports & Institutions',
    status: 'Partially Operational',
    outlayDisplay: '₹35,000+ Cr',
    outlayCrore: 35000,
    completionPct: 82,
    timeline: '2014 – 2027',
    statesCovered: 'Pan-Bharat (23 AIIMS, 23 IITs, 21 IIMs)',
    ministry: 'MoHFW & Ministry of Education',
    headlineSpec: 'AIIMS expanded from 7 (2014) to 23 sanctioned · MBBS seats >1.18L',
    summary:
      'Broadened tertiary medical education and engineering capacity into underserved regions including Bihar, Assam, Jammu, Himachal Pradesh, Telangana, and Tamil Nadu.',
    officialSource: 'MoHFW / MoE / PIB',
  },
];

// --- 3. DIGITAL PUBLIC INFRASTRUCTURE (BHARAT STACK) ---
export interface DpiAnnualPoint {
  year: string;
  upiVolumeCr: number; // Annual UPI transactions in Crore
  upiValueLakhCr: number; // Annual UPI value in ₹ Lakh Crore
  fastagTxnsCr: number; // Annual FASTag toll transactions in Crore
}

export const DPI_TRAJECTORY_SERIES: DpiAnnualPoint[] = [
  { year: 'FY18', upiVolumeCr: 91.5, upiValueLakhCr: 1.1, fastagTxnsCr: 15 },
  { year: 'FY19', upiVolumeCr: 539, upiValueLakhCr: 8.8, fastagTxnsCr: 28 },
  { year: 'FY20', upiVolumeCr: 1252, upiValueLakhCr: 21.3, fastagTxnsCr: 66 },
  { year: 'FY21', upiVolumeCr: 2233, upiValueLakhCr: 41.0, fastagTxnsCr: 147 },
  { year: 'FY22', upiVolumeCr: 4596, upiValueLakhCr: 84.2, fastagTxnsCr: 243 },
  { year: 'FY23', upiVolumeCr: 8375, upiValueLakhCr: 139.2, fastagTxnsCr: 346 },
  { year: 'FY24', upiVolumeCr: 13116, upiValueLakhCr: 200.0, fastagTxnsCr: 382 },
  { year: 'FY25', upiVolumeCr: 18587, upiValueLakhCr: 260.6, fastagTxnsCr: 415 },
  { year: 'FY26', upiVolumeCr: 24162, upiValueLakhCr: 314.0, fastagTxnsCr: 448 },
];

export interface DpiPillarRecord {
  id: string;
  name: string;
  agency: string;
  layer: 'Payments' | 'Identity & Consent' | 'Commerce & Mobility' | 'Health';
  headlineStat: string;
  secondaryStat: string;
  launchYear: string;
  citizenImpact: string;
  scaleDetail: string;
  independentContext: string;
  portalUrl: string;
}

export const DPI_PILLARS: DpiPillarRecord[] = [
  {
    id: 'upi',
    name: 'Unified Payments Interface (UPI)',
    agency: 'NPCI / RBI',
    layer: 'Payments',
    headlineStat: '24,162 Cr txns / yr',
    secondaryStat: '₹314 Lakh Cr value (FY26) · 55.49 Cr active users',
    launchYear: '2016',
    citizenImpact:
      'Instant zero-MDR bank-to-bank QR transfers from street vendors to utility bills, plus live cross-border links in 7+ countries including Singapore, UAE, France, and Sri Lanka.',
    scaleDetail:
      'Processes nearly half of the world’s real-time digital payment volume across 700+ participating banks, with UPI Lite and Conversational UPI expanding offline/feature-phone reach.',
    independentContext:
      'Zero MDR keeps merchant adoption frictionless, though banks and fintechs debate long-term infrastructure cost recovery and rising social-engineering cyber-fraud awareness.',
    portalUrl: 'https://www.npci.org.in/what-we-do/upi/product-overview',
  },
  {
    id: 'aadhaar',
    name: 'Aadhaar & Direct Benefit Transfer (DBT)',
    agency: 'UIDAI / DBT Mission',
    layer: 'Identity & Consent',
    headlineStat: '140+ Cr IDs issued',
    secondaryStat: '₹44+ Lakh Cr cumulative DBT transfers',
    launchYear: '2010 (Statutory 2016)',
    citizenImpact:
      'Enables instant paperless eKYC for bank accounts, SIM cards, scholarships, pensions, and LPG/fertilizer direct bank transfers without intermediaries.',
    scaleDetail:
      'Over 13,500 crore cumulative authentications and 2,000+ crore eKYC checks; official DBT portal estimates ₹3.48+ lakh crore in cumulative leakage savings from deduplication.',
    independentContext:
      'Audits and field researchers note that biometric failures among manual labourers and elderly beneficiaries require seamless offline/OTP fallback safeguards to avoid welfare exclusion.',
    portalUrl: 'https://uidai.gov.in/',
  },
  {
    id: 'digilocker',
    name: 'DigiLocker Document Wallet',
    agency: 'MeitY / NeGD',
    layer: 'Identity & Consent',
    headlineStat: '42+ Cr users',
    secondaryStat: '780+ Cr legally valid authentic documents',
    launchYear: '2015',
    citizenImpact:
      'Paperless legal storage for Driving Licenses, PAN, CBSE/university degrees, vehicle RC, and insurance certificates accepted at airports, traffic checks, and admissions.',
    scaleDetail:
      'Integrated with 2,300+ government issuer organizations and 1,600+ requester agencies, eliminating physical notarization and document loss.',
    independentContext:
      'Adoption is high among urban youth and students; integration with older municipal land and state legacy registries continues progressively.',
    portalUrl: 'https://www.digilocker.gov.in/',
  },
  {
    id: 'abha',
    name: 'Ayushman Bharat Digital Mission (ABHA)',
    agency: 'National Health Authority (NHA)',
    layer: 'Health',
    headlineStat: '74+ Cr ABHA Health IDs',
    secondaryStat: '50+ Cr health records digitally linked',
    launchYear: '2021',
    citizenImpact:
      'Consent-based digital health identifier letting patients share prescriptions, lab reports, and discharge summaries across public and private hospitals without repeating tests.',
    scaleDetail:
      'Over 3.7 lakh health facilities and 5.7 lakh healthcare professionals registered in national HFR/HPR registries, with QR-based Scan & Share cutting OPD queues.',
    independentContext:
      'Interoperability across smaller private clinics and strict enforcement of medical data privacy under the DPDP framework remain active rollout priorities.',
    portalUrl: 'https://abdm.gov.in/',
  },
  {
    id: 'fastag',
    name: 'FASTag Electronic Toll Collection',
    agency: 'NHAI / IHMCL / NPCI',
    layer: 'Commerce & Mobility',
    headlineStat: '9.8+ Cr tags issued',
    secondaryStat: '98% electronic toll share · ₹68,000+ Cr/yr',
    launchYear: '2016 (Mandatory 2021)',
    citizenImpact:
      'RFID windshield tags cut average highway toll plaza waiting times from 7–12 minutes to under 47 seconds, saving fuel and commercial freight turnaround hours.',
    scaleDetail:
      'Active across 1,600+ national and state highway plazas; transitioning next toward GNSS satellite-based barrier-free tolling pilots.',
    independentContext:
      'Occasional scanner misreads and duplicate deduction disputes require quicker NHAI helpline resolution as traffic density climbs.',
    portalUrl: 'https://www.ihmcl.co.in/',
  },
  {
    id: 'ondc',
    name: 'Open Network for Digital Commerce (ONDC)',
    agency: 'DPIIT / Ministry of Commerce',
    layer: 'Commerce & Mobility',
    headlineStat: '7+ Lakh sellers',
    secondaryStat: '1,200+ cities · 1.5+ Cr monthly orders',
    launchYear: '2022',
    citizenImpact:
      'Open-protocol unbundled e-commerce network allowing kirana stores, FPO farmers, artisans, and metro transit tickets to be discovered across multiple buyer apps without platform lock-in.',
    scaleDetail:
      'Covers mobility (auto/metro ticketing), food & grocery, retail, logistics, and financial services on open Beckn specifications.',
    independentContext:
      'Strong traction in transit ticketing and grocery, while customer return/dispute standardization across unbundled seller apps is still maturing.',
    portalUrl: 'https://ondc.org/',
  },
];

// --- 4. ENVIRONMENT, CLEAN ENERGY & EV TRACKER ---
export interface CleanEnergyMixPoint {
  year: string;
  solarGw: number;
  windGw: number;
  hydroBioNuclearGw: number;
  totalNonFossilGw: number;
}

export const CLEAN_ENERGY_MIX_SERIES: CleanEnergyMixPoint[] = [
  { year: '2014', solarGw: 2.6, windGw: 21.0, hydroBioNuclearGw: 51.9, totalNonFossilGw: 75.5 },
  { year: '2016', solarGw: 6.8, windGw: 26.8, hydroBioNuclearGw: 54.4, totalNonFossilGw: 88.0 },
  { year: '2018', solarGw: 21.7, windGw: 34.0, hydroBioNuclearGw: 58.1, totalNonFossilGw: 113.8 },
  { year: '2020', solarGw: 34.6, windGw: 37.7, hydroBioNuclearGw: 62.5, totalNonFossilGw: 134.8 },
  { year: '2022', solarGw: 54.0, windGw: 40.4, hydroBioNuclearGw: 64.9, totalNonFossilGw: 159.3 },
  { year: '2024', solarGw: 81.8, windGw: 45.9, hydroBioNuclearGw: 66.2, totalNonFossilGw: 193.9 },
  { year: '2025', solarGw: 105.6, windGw: 50.0, hydroBioNuclearGw: 68.4, totalNonFossilGw: 224.0 },
  { year: '2026', solarGw: 132.0, windGw: 53.5, hydroBioNuclearGw: 70.5, totalNonFossilGw: 256.0 },
];

export interface EvAdoptionPoint {
  year: string;
  evRegistrationsLakh: number;
  evSharePct: number;
}

export const EV_VAHAN_SERIES: EvAdoptionPoint[] = [
  { year: 'FY19', evRegistrationsLakh: 1.3, evSharePct: 0.5 },
  { year: 'FY20', evRegistrationsLakh: 1.7, evSharePct: 0.8 },
  { year: 'FY21', evRegistrationsLakh: 1.4, evSharePct: 0.9 },
  { year: 'FY22', evRegistrationsLakh: 4.6, evSharePct: 2.6 },
  { year: 'FY23', evRegistrationsLakh: 11.8, evSharePct: 5.3 },
  { year: 'FY24', evRegistrationsLakh: 16.8, evSharePct: 6.8 },
  { year: 'FY25', evRegistrationsLakh: 19.6, evSharePct: 7.5 },
  { year: 'FY26E', evRegistrationsLakh: 22.8, evSharePct: 8.2 },
];

export interface CityAirQualityRecord {
  city: string;
  state: string;
  pm25Baseline2018: number; // µg/m³ annual average
  pm25Recent: number; // µg/m³ annual average (CPCB / NCAP)
  changePct: string;
  ncapStatus: string;
}

export const CITY_AIR_QUALITY_DATA: CityAirQualityRecord[] = [
  { city: 'Delhi (NCT)', state: 'Delhi', pm25Baseline2018: 115, pm25Recent: 98, changePct: '-15%', ncapStatus: 'Severe winter episodes persist' },
  { city: 'Mumbai', state: 'Maharashtra', pm25Baseline2018: 44, pm25Recent: 41, changePct: '-7%', ncapStatus: 'Moderate; construction dust focus' },
  { city: 'Bengaluru', state: 'Karnataka', pm25Baseline2018: 33, pm25Recent: 29, changePct: '-12%', ncapStatus: 'Within Indian NAAQS (40 µg/m³)' },
  { city: 'Chennai', state: 'Tamil Nadu', pm25Baseline2018: 32, pm25Recent: 27, changePct: '-16%', ncapStatus: 'Within Indian NAAQS (40 µg/m³)' },
  { city: 'Hyderabad', state: 'Telangana', pm25Baseline2018: 41, pm25Recent: 36, changePct: '-12%', ncapStatus: 'Improved under NCAP' },
  { city: 'Kolkata', state: 'West Bengal', pm25Baseline2018: 68, pm25Recent: 52, changePct: '-24%', ncapStatus: 'Improved; above 40 µg/m³ norm' },
  { city: 'Ahmedabad', state: 'Gujarat', pm25Baseline2018: 55, pm25Recent: 46, changePct: '-16%', ncapStatus: 'Steady reduction; industrial focus' },
  { city: 'Pune', state: 'Maharashtra', pm25Baseline2018: 42, pm25Recent: 37, changePct: '-12%', ncapStatus: 'Within Indian NAAQS (40 µg/m³)' },
];

export const ENVIRONMENT_PILLARS = [
  {
    title: '500 GW Non-Fossil Target (2030)',
    current: '256 GW (51.2% of target)',
    baseline: '75.5 GW in 2014',
    source: 'MNRE / CEA',
    detail: 'Non-fossil installed share crossed 50% of total power capacity five years ahead of Bharat’s 2030 Paris NDC pledge.',
  },
  {
    title: 'Forest & Tree Cover (ISFR)',
    current: '25.17% of geographic area',
    baseline: '24.01% (ISFR 2013)',
    source: 'Forest Survey of Bharat (ISFR 2023)',
    detail: 'Total forest and tree cover reached 8,27,357 sq km, creating an additional carbon sink of 2.29 billion tonnes CO₂ eq since 2005.',
  },
  {
    title: 'Namami Gange River Basin',
    current: '6,200+ MLD STP capacity sanctioned',
    baseline: '~1,100 MLD operational (2014)',
    source: 'NMCG / Jal Shakti',
    detail: 'Over 200 sewerage infrastructure projects sanctioned across Ganga basin states; dissolved oxygen improved across key main-stem monitoring stations.',
  },
  {
    title: 'EV Charging & PM E-DRIVE',
    current: '26,000+ public chargers · 65L+ cumulative EVs',
    baseline: '<500 public chargers (2019)',
    source: 'MoHI / Vahan Portal',
    detail: 'Over 55% of three-wheeler sales are now electric; PM E-DRIVE (₹10,900 Cr) funds e-buses, e-ambulances, and highway fast chargers.',
  },
];

export const CLIMATE_INDEPENDENT_CONTEXT = [
  {
    institution: 'International Energy Agency (IEA) & CEA',
    finding: 'Coal still supplies ~70% of actual electricity generation',
    detail: 'While renewable installed capacity exceeded 50%, solar and wind run at lower plant load factors than thermal stations. Scaling battery storage (BESS) and pumped hydro is essential to meet evening peak demand cleanly.',
  },
  {
    institution: 'Centre for Science & Environment (CSE) / CPCB',
    finding: 'Indo-Gangetic winter PM2.5 remains well above WHO guidelines',
    detail: 'Despite NCAP gains across 95+ non-attainment cities, winter smog in Delhi-NCR and northern river plains still exceeds both national (40 µg/m³) and WHO (5 µg/m³) thresholds, requiring regional airshed governance.',
  },
];

// --- 5. INCOME TAX & HOUSEHOLD SUBSIDY CALCULATOR (FY 2025–26 / UNION BUDGET 2025) ---
export interface TaxCalculationResult {
  grossIncome: number;
  standardDeduction: number;
  otherDeductions: number;
  taxableIncome: number;
  slabTax: number;
  rebate87A: number;
  marginalRelief: number;
  taxAfterRebate: number;
  cess: number;
  totalTax: number;
  effectiveRatePct: number;
  slabBreakdown: { slab: string; rate: string; tax: number }[];
}

export function calculateNewRegimeFY26(
  grossIncome: number,
  isSalaried: boolean
): TaxCalculationResult {
  const standardDeduction = isSalaried ? Math.min(75000, grossIncome) : 0;
  const taxableIncome = Math.max(0, grossIncome - standardDeduction);

  const slabs: { limit: number; rate: number; label: string }[] = [
    { limit: 400000, rate: 0, label: 'Up to ₹4 Lakh' },
    { limit: 800000, rate: 0.05, label: '₹4L – ₹8L' },
    { limit: 1200000, rate: 0.1, label: '₹8L – ₹12L' },
    { limit: 1600000, rate: 0.15, label: '₹12L – ₹16L' },
    { limit: 2000000, rate: 0.2, label: '₹16L – ₹20L' },
    { limit: 2400000, rate: 0.25, label: '₹20L – ₹24L' },
    { limit: Infinity, rate: 0.3, label: 'Above ₹24 Lakh' },
  ];

  let prevLimit = 0;
  let slabTax = 0;
  const slabBreakdown: { slab: string; rate: string; tax: number }[] = [];

  for (const s of slabs) {
    if (taxableIncome > prevLimit) {
      const taxableSlice = Math.min(taxableIncome, s.limit) - prevLimit;
      const sliceTax = Math.round(taxableSlice * s.rate);
      slabTax += sliceTax;
      slabBreakdown.push({
        slab: s.label,
        rate: `${Math.round(s.rate * 100)}%`,
        tax: sliceTax,
      });
    }
    prevLimit = s.limit;
  }

  // Budget FY 2025-26 Section 87A Rebate: Up to ₹60,000 for taxable income <= ₹12,00,000
  // Plus statutory marginal relief just above ₹12,00,000 (tax cannot exceed income over ₹12L)
  let rebate87A = 0;
  let marginalRelief = 0;
  if (taxableIncome <= 1200000) {
    rebate87A = Math.min(slabTax, 60000);
  } else {
    const excessOver12L = taxableIncome - 1200000;
    if (slabTax > excessOver12L) {
      marginalRelief = slabTax - excessOver12L;
    }
  }

  const taxAfterRebate = Math.max(0, slabTax - rebate87A - marginalRelief);
  const cess = Math.round(taxAfterRebate * 0.04);
  const totalTax = taxAfterRebate + cess;
  const effectiveRatePct =
    grossIncome > 0 ? Number(((totalTax / grossIncome) * 100).toFixed(2)) : 0;

  return {
    grossIncome,
    standardDeduction,
    otherDeductions: 0,
    taxableIncome,
    slabTax,
    rebate87A,
    marginalRelief,
    taxAfterRebate,
    cess,
    totalTax,
    effectiveRatePct,
    slabBreakdown,
  };
}

export function calculateOldRegimeFY26(
  grossIncome: number,
  isSalaried: boolean,
  ageBracket: 'below60' | 'senior' | 'superSenior',
  deductions: {
    sec80C: number;
    sec80D: number;
    hraOrHomeLoan: number;
    nps80CCD1B: number;
  }
): TaxCalculationResult {
  const standardDeduction = isSalaried ? Math.min(50000, grossIncome) : 0;
  const capped80C = Math.min(150000, Math.max(0, deductions.sec80C));
  const capped80D = Math.min(100000, Math.max(0, deductions.sec80D));
  const cappedHraLoan = Math.max(0, deductions.hraOrHomeLoan);
  const cappedNps = Math.min(50000, Math.max(0, deductions.nps80CCD1B));
  const otherDeductions = capped80C + capped80D + cappedHraLoan + cappedNps;

  const taxableIncome = Math.max(
    0,
    grossIncome - standardDeduction - otherDeductions
  );

  const basicExemption =
    ageBracket === 'superSenior'
      ? 500000
      : ageBracket === 'senior'
        ? 300000
        : 250000;

  const slabs: { limit: number; rate: number; label: string }[] =
    ageBracket === 'superSenior'
      ? [
          { limit: 500000, rate: 0, label: 'Up to ₹5 Lakh' },
          { limit: 1000000, rate: 0.2, label: '₹5L – ₹10L' },
          { limit: Infinity, rate: 0.3, label: 'Above ₹10 Lakh' },
        ]
      : [
          {
            limit: basicExemption,
            rate: 0,
            label: `Up to ₹${(basicExemption / 100000).toFixed(1)}L`,
          },
          {
            limit: 500000,
            rate: 0.05,
            label: `₹${(basicExemption / 100000).toFixed(1)}L – ₹5L`,
          },
          { limit: 1000000, rate: 0.2, label: '₹5L – ₹10L' },
          { limit: Infinity, rate: 0.3, label: 'Above ₹10 Lakh' },
        ];

  let prevLimit = 0;
  let slabTax = 0;
  const slabBreakdown: { slab: string; rate: string; tax: number }[] = [];

  for (const s of slabs) {
    if (taxableIncome > prevLimit) {
      const taxableSlice = Math.min(taxableIncome, s.limit) - prevLimit;
      const sliceTax = Math.round(taxableSlice * s.rate);
      slabTax += sliceTax;
      slabBreakdown.push({
        slab: s.label,
        rate: `${Math.round(s.rate * 100)}%`,
        tax: sliceTax,
      });
    }
    prevLimit = s.limit;
  }

  const rebate87A = taxableIncome <= 500000 ? Math.min(slabTax, 12500) : 0;
  const taxAfterRebate = Math.max(0, slabTax - rebate87A);
  const cess = Math.round(taxAfterRebate * 0.04);
  const totalTax = taxAfterRebate + cess;
  const effectiveRatePct =
    grossIncome > 0 ? Number(((totalTax / grossIncome) * 100).toFixed(2)) : 0;

  return {
    grossIncome,
    standardDeduction,
    otherDeductions,
    taxableIncome,
    slabTax,
    rebate87A,
    marginalRelief: 0,
    taxAfterRebate,
    cess,
    totalTax,
    effectiveRatePct,
    slabBreakdown,
  };
}
