export type IndianRegion =
  | 'North'
  | 'South'
  | 'West'
  | 'East'
  | 'Northeast'
  | 'Central'
  | 'UT';

export interface StateProfile {
  id: string;
  name: string;
  region: IndianRegion;
  perCapitaNsdpLakhs: number | null; // ₹ Lakh (Current Prices, MoSPI/RBI recent series)
  perCapitaDisplay: string;
  tapWaterPct: number | null; // null for predominantly urban Delhi NCT
  tapWaterDisplay: string;
  renewableGw: number; // Installed Renewable Energy GW (MNRE)
  highwaysKm: number; // National Highways km (MoRTH)
  literacyPct: number; // NSO / PLFS literacy %
  keyFocus: string;
  officialNote: string;
}

export const STATE_PROFILES: StateProfile[] = [
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    region: 'West',
    perCapitaNsdpLakhs: 3.45,
    perCapitaDisplay: '₹3.45 Lakh',
    tapWaterPct: 88,
    tapWaterDisplay: '88% rural',
    renewableGw: 21.5,
    highwaysKm: 18459,
    literacyPct: 84.8,
    keyFocus: 'Bharat’s largest state economy, manufacturing, ports, Samruddhi Expressway & urban metro expansion.',
    officialNote: 'MoSPI / MNRE / JJM / MoRTH',
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    region: 'West',
    perCapitaNsdpLakhs: 3.85,
    perCapitaDisplay: '₹3.85 Lakh',
    tapWaterPct: 100,
    tapWaterDisplay: '100% Har Ghar Jal',
    renewableGw: 55.2,
    highwaysKm: 7885,
    literacyPct: 82.4,
    keyFocus: 'Leads in installed renewable capacity (55+ GW), Har Ghar Jal 100% rural tap water, ports, and semiconductor fabs.',
    officialNote: 'MoSPI / MNRE / JJM / PIB',
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    region: 'South',
    perCapitaNsdpLakhs: 4.25,
    perCapitaDisplay: '₹4.25 Lakh',
    tapWaterPct: 86,
    tapWaterDisplay: '86% rural',
    renewableGw: 24.8,
    highwaysKm: 6858,
    literacyPct: 82.9,
    keyFocus: 'Electronics & automotive export hub, wind-solar hybrid grid leader, and high tertiary healthcare density.',
    officialNote: 'MoSPI / MNRE / JJM / MoRTH',
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    region: 'South',
    perCapitaNsdpLakhs: 4.30,
    perCapitaDisplay: '₹4.30 Lakh',
    tapWaterPct: 84,
    tapWaterDisplay: '84% rural',
    renewableGw: 28.4,
    highwaysKm: 8037,
    literacyPct: 77.2,
    keyFocus: 'Global software, R&D, and startup center with 28+ GW renewable capacity and Bengaluru–Mysuru / suburban transit.',
    officialNote: 'MoSPI / MNRE / JJM / MoRTH',
  },
  {
    id: 'telangana',
    name: 'Telangana',
    region: 'South',
    perCapitaNsdpLakhs: 4.55,
    perCapitaDisplay: '₹4.55 Lakh',
    tapWaterPct: 100,
    tapWaterDisplay: '100% Har Ghar Jal',
    renewableGw: 5.9,
    highwaysKm: 4996,
    literacyPct: 72.8,
    keyFocus: 'High per-capita output powered by IT, pharmaceuticals, aerospace, and 100% reported rural tap water connectivity.',
    officialNote: 'MoSPI / JJM / MNRE',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    region: 'South',
    perCapitaNsdpLakhs: 3.25,
    perCapitaDisplay: '₹3.25 Lakh',
    tapWaterPct: 74,
    tapWaterDisplay: '74% rural',
    renewableGw: 3.6,
    highwaysKm: 1858,
    literacyPct: 96.2,
    keyFocus: 'Highest literacy and strong primary health/human development indicators alongside Vizhinjam deep-water port.',
    officialNote: 'MoSPI / NSO / JJM / MNRE',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    region: 'West',
    perCapitaNsdpLakhs: 1.84,
    perCapitaDisplay: '₹1.84 Lakh',
    tapWaterPct: 58,
    tapWaterDisplay: '58% rural',
    renewableGw: 34.5,
    highwaysKm: 10706,
    literacyPct: 69.7,
    keyFocus: 'Major utility solar park hub (Bhadla & western arid grid) and major leg of Delhi–Mumbai Expressway & DFC.',
    officialNote: 'MoSPI / MNRE / JJM / MoRTH',
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    region: 'North',
    perCapitaNsdpLakhs: 1.05,
    perCapitaDisplay: '₹1.05 Lakh',
    tapWaterPct: 86,
    tapWaterDisplay: '86% rural',
    renewableGw: 7.4,
    highwaysKm: 12292,
    literacyPct: 73.0,
    keyFocus: 'Rapid expressway & airport expansion, Jewar International Airport, Defence Corridor, and multi-crore JJM tap rollout.',
    officialNote: 'MoSPI / JJM / MoRTH / PIB',
  },
  {
    id: 'bihar',
    name: 'Bihar',
    region: 'East',
    perCapitaNsdpLakhs: 0.67,
    perCapitaDisplay: '₹0.67 Lakh',
    tapWaterPct: 96,
    tapWaterDisplay: '96% rural',
    renewableGw: 0.6,
    highwaysKm: 6132,
    literacyPct: 70.9,
    keyFocus: 'Substantial rural tap water expansion and highway/bridge connectivity; industrial & per-capita catch-up remains key priority.',
    officialNote: 'MoSPI / JJM / MoRTH',
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    region: 'East',
    perCapitaNsdpLakhs: 1.65,
    perCapitaDisplay: '₹1.65 Lakh',
    tapWaterPct: 56,
    tapWaterDisplay: '56% rural',
    renewableGw: 2.3,
    highwaysKm: 3910,
    literacyPct: 80.5,
    keyFocus: 'Eastern freight gateway, Kolkata underwater metro corridor, MSME trade, and ongoing rural piped-water expansion.',
    officialNote: 'MoSPI / JJM / MoHUA',
  },
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    region: 'Central',
    perCapitaNsdpLakhs: 1.56,
    perCapitaDisplay: '₹1.56 Lakh',
    tapWaterPct: 68,
    tapWaterDisplay: '68% rural',
    renewableGw: 9.8,
    highwaysKm: 9105,
    literacyPct: 73.7,
    keyFocus: 'Central logistics hub, agricultural procurement growth, solar parks (Rewa/Neemuch), and Indore/Bhopal metro corridors.',
    officialNote: 'MoSPI / MNRE / JJM / MoRTH',
  },
  {
    id: 'odisha',
    name: 'Odisha',
    region: 'East',
    perCapitaNsdpLakhs: 1.82,
    perCapitaDisplay: '₹1.82 Lakh',
    tapWaterPct: 76,
    tapWaterDisplay: '76% rural',
    renewableGw: 3.1,
    highwaysKm: 5897,
    literacyPct: 77.3,
    keyFocus: 'Minerals, steel, port modernization (Paradip), disaster-resilience infrastructure, and steady fiscal surplus management.',
    officialNote: 'MoSPI / JJM / MoRTH',
  },
  {
    id: 'assam',
    name: 'Assam',
    region: 'Northeast',
    perCapitaNsdpLakhs: 1.54,
    perCapitaDisplay: '₹1.54 Lakh',
    tapWaterPct: 81,
    tapWaterDisplay: '81% rural',
    renewableGw: 0.5,
    highwaysKm: 4077,
    literacyPct: 85.9,
    keyFocus: 'Northeast gateway featuring major Brahmaputra bridges, broad-gauge rail links, and upcoming Jagiroad semiconductor OSAT plant.',
    officialNote: 'MoSPI / JJM / PIB / MeitY',
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    region: 'North',
    perCapitaNsdpLakhs: 2.58,
    perCapitaDisplay: '₹2.58 Lakh',
    tapWaterPct: 100,
    tapWaterDisplay: '100% Har Ghar Jal',
    renewableGw: 11.4,
    highwaysKm: 2607,
    literacyPct: 86.6,
    keyFocus: '100% Har Ghar Jal rural tap coverage, high hydropower capacity, and all-weather Himalayan tunnel infrastructure (Atal Tunnel).',
    officialNote: 'MoSPI / JJM / MNRE',
  },
  {
    id: 'punjab',
    name: 'Punjab',
    region: 'North',
    perCapitaNsdpLakhs: 2.15,
    perCapitaDisplay: '₹2.15 Lakh',
    tapWaterPct: 100,
    tapWaterDisplay: '100% Har Ghar Jal',
    renewableGw: 2.8,
    highwaysKm: 4239,
    literacyPct: 83.7,
    keyFocus: 'Universal rural tap water coverage and agricultural surplus; economists flag groundwater depletion and state debt sustainability.',
    officialNote: 'MoSPI / JJM / RBI',
  },
  {
    id: 'delhi',
    name: 'Delhi (NCT)',
    region: 'UT',
    perCapitaNsdpLakhs: 5.65,
    perCapitaDisplay: '₹5.65 Lakh',
    tapWaterPct: null,
    tapWaterDisplay: 'Predominantly Urban',
    renewableGw: 0.4,
    highwaysKm: 157,
    literacyPct: 88.7,
    keyFocus: 'Highest per-capita income among major territories, dense metro & RRTS transit; air quality and urban water supply remain key challenges.',
    officialNote: 'MoSPI / MoHUA',
  },
  {
    id: 'goa',
    name: 'Goa',
    region: 'West',
    perCapitaNsdpLakhs: 5.40,
    perCapitaDisplay: '₹5.40 Lakh',
    tapWaterPct: 100,
    tapWaterDisplay: '100% Certified',
    renewableGw: 0.1,
    highwaysKm: 299,
    literacyPct: 88.7,
    keyFocus: 'First Har Ghar Jal certified state in Bharat, Mopa International Airport, tourism, and pharmaceutical exports.',
    officialNote: 'MoSPI / JJM / PIB',
  },
  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    region: 'South',
    perCapitaNsdpLakhs: 2.68,
    perCapitaDisplay: '₹2.68 Lakh',
    tapWaterPct: 75,
    tapWaterDisplay: '75% rural',
    renewableGw: 11.2,
    highwaysKm: 8683,
    literacyPct: 67.4,
    keyFocus: 'East-coast port corridor (Visakhapatnam/Krishnapatnam), renewable energy parks, and industrial corridor development.',
    officialNote: 'MoSPI / MNRE / JJM',
  },
  {
    id: 'haryana',
    name: 'Haryana',
    region: 'North',
    perCapitaNsdpLakhs: 3.53,
    perCapitaDisplay: '₹3.53 Lakh',
    tapWaterPct: 100,
    tapWaterDisplay: '100% Har Ghar Jal',
    renewableGw: 3.4,
    highwaysKm: 3391,
    literacyPct: 80.4,
    keyFocus: 'Automotive & NCR logistics hub with 100% Har Ghar Jal rural tap coverage and high per-capita farm & services output.',
    officialNote: 'MoSPI / JJM / MNRE / MoRTH',
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    region: 'North',
    perCapitaNsdpLakhs: 2.74,
    perCapitaDisplay: '₹2.74 Lakh',
    tapWaterPct: 98,
    tapWaterDisplay: '98% rural',
    renewableGw: 2.9,
    highwaysKm: 3723,
    literacyPct: 87.6,
    keyFocus: 'Char Dham all-weather highway network, Rishikesh–Karnaprayag rail tunnel corridor, hydropower, and near-universal rural tap water.',
    officialNote: 'MoSPI / JJM / MoRTH',
  },
  {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    region: 'Central',
    perCapitaNsdpLakhs: 1.63,
    perCapitaDisplay: '₹1.63 Lakh',
    tapWaterPct: 75,
    tapWaterDisplay: '75% rural',
    renewableGw: 2.8,
    highwaysKm: 3620,
    literacyPct: 77.3,
    keyFocus: 'Power generation, steel & mineral corridor, paddy procurement infrastructure, and tribal-area connectivity.',
    officialNote: 'MoSPI / JJM / MNRE',
  },
  {
    id: 'jharkhand',
    name: 'Jharkhand',
    region: 'East',
    perCapitaNsdpLakhs: 1.17,
    perCapitaDisplay: '₹1.17 Lakh',
    tapWaterPct: 65,
    tapWaterDisplay: '65% rural',
    renewableGw: 0.7,
    highwaysKm: 3655,
    literacyPct: 74.3,
    keyFocus: 'Mineral-industrial belt, Deoghar Airport & AIIMS expansion, and ongoing rural piped drinking-water rollout.',
    officialNote: 'MoSPI / JJM / MoRTH',
  },
  {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir',
    region: 'UT',
    perCapitaNsdpLakhs: 1.55,
    perCapitaDisplay: '₹1.55 Lakh',
    tapWaterPct: 78,
    tapWaterDisplay: '78% rural',
    renewableGw: 3.8,
    highwaysKm: 2423,
    literacyPct: 77.3,
    keyFocus: 'USBRL Kashmir rail link (Chenab Bridge), Z-Morh / Zoji-La all-weather tunnels, AIIMS Jammu/Awantipora, and hydropower expansion.',
    officialNote: 'MoSPI / JJM / MNRE / PIB',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    region: 'UT',
    perCapitaNsdpLakhs: 2.10,
    perCapitaDisplay: '₹2.10 Lakh',
    tapWaterPct: 86,
    tapWaterDisplay: '86% rural',
    renewableGw: 0.2,
    highwaysKm: 1325,
    literacyPct: 77.2,
    keyFocus: 'High-altitude border roads, 13 GW planned Pang solar-grid green energy corridor, and cold-region tap water systems.',
    officialNote: 'JJM / MNRE / BRO / PIB',
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    region: 'Northeast',
    perCapitaNsdpLakhs: 7.64,
    perCapitaDisplay: '₹7.64 Lakh',
    tapWaterPct: 92,
    tapWaterDisplay: '92% rural',
    renewableGw: 0.3,
    highwaysKm: 709,
    literacyPct: 82.2,
    keyFocus: 'Bharat’s highest per-capita NSDP supported by pharmaceuticals, hydropower, organic farming, and Sivok–Rangpo rail link.',
    officialNote: 'MoSPI / JJM / MoRTH',
  },
  {
    id: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    region: 'Northeast',
    perCapitaNsdpLakhs: 2.08,
    perCapitaDisplay: '₹2.08 Lakh',
    tapWaterPct: 100,
    tapWaterDisplay: '100% Har Ghar Jal',
    renewableGw: 0.7,
    highwaysKm: 4285,
    literacyPct: 72.6,
    keyFocus: 'Sela Tunnel, Frontier Highway, Donyi Polo Airport, 100% reported Har Ghar Jal coverage, and major hydropower potential.',
    officialNote: 'MoSPI / JJM / MoRTH / PIB',
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    region: 'Northeast',
    perCapitaNsdpLakhs: 1.48,
    perCapitaDisplay: '₹1.48 Lakh',
    tapWaterPct: 81,
    tapWaterDisplay: '81% rural',
    renewableGw: 0.4,
    highwaysKm: 1156,
    literacyPct: 75.5,
    keyFocus: 'Shillong–Dawki international trade highway, rural JJM tap expansion, and ecotourism/horticulture value chains.',
    officialNote: 'MoSPI / JJM / MoRTH',
  },
  {
    id: 'nagaland',
    name: 'Nagaland',
    region: 'Northeast',
    perCapitaNsdpLakhs: 1.62,
    perCapitaDisplay: '₹1.62 Lakh',
    tapWaterPct: 91,
    tapWaterDisplay: '91% rural',
    renewableGw: 0.1,
    highwaysKm: 1670,
    literacyPct: 80.1,
    keyFocus: 'Dimapur–Kohima four-lane highway & railway line extension alongside rapid rural piped water connectivity.',
    officialNote: 'MoSPI / JJM / MoRTH',
  },
  {
    id: 'manipur',
    name: 'Manipur',
    region: 'Northeast',
    perCapitaNsdpLakhs: 1.28,
    perCapitaDisplay: '₹1.28 Lakh',
    tapWaterPct: 79,
    tapWaterDisplay: '79% rural',
    renewableGw: 0.1,
    highwaysKm: 1840,
    literacyPct: 79.8,
    keyFocus: 'Jiribam–Imphal broad-gauge rail project and cross-border Act East corridors; sustained peace & economic recovery remain priorities.',
    officialNote: 'MoSPI / JJM / MoRTH',
  },
  {
    id: 'mizoram',
    name: 'Mizoram',
    region: 'Northeast',
    perCapitaNsdpLakhs: 2.18,
    perCapitaDisplay: '₹2.18 Lakh',
    tapWaterPct: 100,
    tapWaterDisplay: '100% Har Ghar Jal',
    renewableGw: 0.2,
    highwaysKm: 1499,
    literacyPct: 91.6,
    keyFocus: 'Bairabi–Sairang (Aizawl) railway connection, Kaladan multimodal corridor, high literacy, and universal rural tap water.',
    officialNote: 'MoSPI / JJM / MoRTH',
  },
  {
    id: 'tripura',
    name: 'Tripura',
    region: 'Northeast',
    perCapitaNsdpLakhs: 1.78,
    perCapitaDisplay: '₹1.78 Lakh',
    tapWaterPct: 86,
    tapWaterDisplay: '86% rural',
    renewableGw: 0.1,
    highwaysKm: 889,
    literacyPct: 87.8,
    keyFocus: 'Agartala–Akhaura cross-border rail link, Sabroom ICP transit gateway, and expanded rural piped drinking water.',
    officialNote: 'MoSPI / JJM / PIB',
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh',
    region: 'UT',
    perCapitaNsdpLakhs: 4.94,
    perCapitaDisplay: '₹4.94 Lakh',
    tapWaterPct: null,
    tapWaterDisplay: 'Predominantly Urban',
    renewableGw: 0.1,
    highwaysKm: 15,
    literacyPct: 86.1,
    keyFocus: 'Planned Union Territory and joint capital with high per-capita income, rooftop solar adoption, and urban services.',
    officialNote: 'MoSPI / Economic Survey / MoRTH',
  },
  {
    id: 'puducherry',
    name: 'Puducherry',
    region: 'UT',
    perCapitaNsdpLakhs: 2.81,
    perCapitaDisplay: '₹2.81 Lakh',
    tapWaterPct: 100,
    tapWaterDisplay: '100% Har Ghar Jal',
    renewableGw: 0.1,
    highwaysKm: 64,
    literacyPct: 85.9,
    keyFocus: '100% Har Ghar Jal rural tap coverage, coastal tourism, port connectivity, and strong health and education indicators.',
    officialNote: 'MoSPI / JJM / MoRTH',
  },
  {
    id: 'andaman-nicobar',
    name: 'Andaman & Nicobar Islands',
    region: 'UT',
    perCapitaNsdpLakhs: 2.76,
    perCapitaDisplay: '₹2.76 Lakh',
    tapWaterPct: 100,
    tapWaterDisplay: '100% Har Ghar Jal',
    renewableGw: 0.05,
    highwaysKm: 331,
    literacyPct: 86.6,
    keyFocus: 'Submarine optical fibre link (CANI), Veer Savarkar Airport terminal, Great Nicobar maritime transshipment project, and 100% rural tap water.',
    officialNote: 'MoSPI / JJM / MoRTH / PIB',
  },
  {
    id: 'dnh-dd',
    name: 'Dadra & Nagar Haveli and Daman & Diu',
    region: 'UT',
    perCapitaNsdpLakhs: null,
    perCapitaDisplay: 'UT Series N/A',
    tapWaterPct: 100,
    tapWaterDisplay: '100% Har Ghar Jal',
    renewableGw: 0.1,
    highwaysKm: 54,
    literacyPct: 77.2,
    keyFocus: 'Merged western industrial & coastal Union Territory with 100% Har Ghar Jal rural saturation and dense MSME manufacturing clusters.',
    officialNote: 'JJM / MoRTH / Census-NSO',
  },
  {
    id: 'lakshadweep',
    name: 'Lakshadweep',
    region: 'UT',
    perCapitaNsdpLakhs: null,
    perCapitaDisplay: 'UT Series N/A',
    tapWaterPct: 83,
    tapWaterDisplay: '83% rural',
    renewableGw: 0.02,
    highwaysKm: 0,
    literacyPct: 91.9,
    keyFocus: 'Kochi–Lakshadweep Submarine Optical Fibre (KLI-SOFC), solar-plus-BESS island microgrids, desalination plants, and high literacy.',
    officialNote: 'JJM / MNRE / PIB',
  },
];

// --- UNION BUDGET EXPLORER DATA ---
export interface BudgetSlice {
  label: string;
  paise: number;
  color: string;
  detail: string;
}

export interface BudgetYearData {
  fiscalYear: string;
  label: string;
  totalExpenditureLakhCr: number;
  nonDebtReceiptsLakhCr: number;
  fiscalDeficitPct: number;
  source: string;
  rupeeComesFrom: BudgetSlice[];
  rupeeGoesTo: BudgetSlice[];
}

export const UNION_BUDGET_YEARS: BudgetYearData[] = [
  {
    fiscalYear: '2026-27',
    label: 'FY 2026–27 (BE)',
    totalExpenditureLakhCr: 53.47,
    nonDebtReceiptsLakhCr: 36.52,
    fiscalDeficitPct: 4.3,
    source: 'Union Budget 2026–27 (Ministry of Finance / PIB / PRS)',
    rupeeComesFrom: [
      { label: 'Borrowings & Liabilities', paise: 24, color: '#64748B', detail: 'Market loans and other borrowings financing capital expenditure & deficit.' },
      { label: 'Income Tax (incl. STT)', paise: 21, color: '#1E3A8A', detail: 'Personal income tax and securities transaction tax collections.' },
      { label: 'Corporation Tax', paise: 18, color: '#2563EB', detail: 'Direct taxes paid by domestic and foreign corporate entities.' },
      { label: 'GST & Indirect Taxes', paise: 15, color: '#0F766E', detail: 'Central GST, IGST settlement, and compensation mechanisms.' },
      { label: 'Non-Tax Revenue', paise: 10, color: '#15803D', detail: 'RBI & PSU dividends, telecom spectrum, and interest receipts.' },
      { label: 'Union Excise Duties', paise: 6, color: '#B45309', detail: 'Duties primarily on petroleum products and specific excisable goods.' },
      { label: 'Customs', paise: 4, color: '#7C3AED', detail: 'Import and export duties collected at ports and airports.' },
      { label: 'Non-Debt Capital Receipts', paise: 2, color: '#94A3B8', detail: 'Asset monetization, disinvestment, and recovery of loans.' },
    ],
    rupeeGoesTo: [
      { label: 'States’ Share of Taxes', paise: 22, color: '#1E3A8A', detail: 'Constitutional devolution of central divisible tax pool to states of Bharat.' },
      { label: 'Interest Payments', paise: 20, color: '#64748B', detail: 'Servicing interest on past public debt and government securities.' },
      { label: 'Central Sector Schemes', paise: 17, color: '#0F766E', detail: 'Direct central funding for highways, railways, telecom, and national missions.' },
      { label: 'Defence', paise: 11, color: '#B45309', detail: 'Armed forces modernization, domestic procurement, DRDO R&D, and defence pensions.' },
      { label: 'Centrally Sponsored Schemes', paise: 8, color: '#15803D', detail: 'Joint Centre-State schemes like PMAY, Jal Jeevan Mission, Samagra Shiksha.' },
      { label: 'Finance Commission Transfers', paise: 7, color: '#2563EB', detail: 'Grants-in-aid to states and local municipal/panchayat bodies.' },
      { label: 'Major Subsidies', paise: 6, color: '#7C3AED', detail: 'Food security (PMGKAY), fertilizer, and targeted LPG subsidies.' },
      { label: 'Other Expenditure', paise: 7, color: '#475569', detail: 'Administration, judiciary, scientific research, and statutory agencies.' },
      { label: 'Civil Pensions', paise: 2, color: '#94A3B8', detail: 'Pension liabilities for retired central civil servants.' },
    ],
  },
  {
    fiscalYear: '2025-26',
    label: 'FY 2025–26 (BE)',
    totalExpenditureLakhCr: 50.65,
    nonDebtReceiptsLakhCr: 34.96,
    fiscalDeficitPct: 4.4,
    source: 'Union Budget 2025–26 (Ministry of Finance / PIB)',
    rupeeComesFrom: [
      { label: 'Borrowings & Liabilities', paise: 24, color: '#64748B', detail: 'Public borrowing bridging the 4.4% fiscal deficit gap.' },
      { label: 'Income Tax', paise: 22, color: '#1E3A8A', detail: 'Personal income tax receipts from salaried and non-corporate filers.' },
      { label: 'GST & Indirect Taxes', paise: 18, color: '#0F766E', detail: 'Central Goods and Services Tax and related indirect levies.' },
      { label: 'Corporation Tax', paise: 17, color: '#2563EB', detail: 'Corporate profit tax collections.' },
      { label: 'Non-Tax Revenue', paise: 9, color: '#15803D', detail: 'Dividends from RBI, public sector banks, and CPSEs.' },
      { label: 'Union Excise Duties', paise: 5, color: '#B45309', detail: 'Central excise collections.' },
      { label: 'Customs', paise: 4, color: '#7C3AED', detail: 'Customs tariff revenue.' },
      { label: 'Non-Debt Capital Receipts', paise: 1, color: '#94A3B8', detail: 'Disinvestment and loan recoveries.' },
    ],
    rupeeGoesTo: [
      { label: 'States’ Share of Taxes', paise: 22, color: '#1E3A8A', detail: 'Devolution to states per Finance Commission formula.' },
      { label: 'Interest Payments', paise: 20, color: '#64748B', detail: 'Debt service obligations.' },
      { label: 'Central Sector Schemes', paise: 16, color: '#0F766E', detail: 'National infrastructure and flagship central missions.' },
      { label: 'Centrally Sponsored Schemes', paise: 8, color: '#15803D', detail: 'Shared Centre-State welfare and development schemes.' },
      { label: 'Finance Commission Transfers', paise: 8, color: '#2563EB', detail: 'Grants for states and local bodies.' },
      { label: 'Defence', paise: 8, color: '#B45309', detail: 'Capital modernization and revenue outlay (excl. separate pension row).' },
      { label: 'Major Subsidies', paise: 6, color: '#7C3AED', detail: 'Food, fertilizer, and fuel subsidies.' },
      { label: 'Pension Payments', paise: 4, color: '#94A3B8', detail: 'Combined civil and defence pension allocations.' },
      { label: 'Other Expenditure', paise: 8, color: '#475569', detail: 'General services, ministries, and institutional expenses.' },
    ],
  },
];

export const MINISTRY_OUTLAY_COMPARISON = [
  { ministry: 'Defence', fy15: 2.53, fy26: 6.81, fy27: 7.85, unit: '₹ Lakh Cr' },
  { ministry: 'Road Transport', fy15: 0.37, fy26: 2.87, fy27: 3.10, unit: '₹ Lakh Cr' },
  { ministry: 'Railways (CapEx)', fy15: 0.58, fy26: 2.55, fy27: 2.65, unit: '₹ Lakh Cr' },
  { ministry: 'Food & Consumer', fy15: 1.22, fy26: 2.16, fy27: 2.24, unit: '₹ Lakh Cr' },
  { ministry: 'Rural Dev.', fy15: 0.70, fy26: 1.90, fy27: 1.98, unit: '₹ Lakh Cr' },
  { ministry: 'Education', fy15: 0.69, fy26: 1.29, fy27: 1.39, unit: '₹ Lakh Cr' },
  { ministry: 'Health & FW', fy15: 0.31, fy26: 0.99, fy27: 1.06, unit: '₹ Lakh Cr' },
];

// --- CITIZEN SCHEME ELIGIBILITY FINDER DATA (myScheme inspired) ---
export type SchemeRole =
  | 'all'
  | 'student'
  | 'farmer'
  | 'woman'
  | 'senior'
  | 'worker'
  | 'household';

export type SchemeResidence = 'any' | 'rural' | 'urban';
export type SchemeNeed =
  | 'all'
  | 'health'
  | 'housing'
  | 'finance'
  | 'education'
  | 'energy';

export interface CentralScheme {
  id: string;
  name: string;
  ministry: string;
  roles: SchemeRole[];
  residence: ('rural' | 'urban')[];
  need: Exclude<SchemeNeed, 'all'>;
  benefitSummary: string;
  eligibilitySummary: string;
  portalUrl: string;
  portalName: string;
}

export const CENTRAL_SCHEMES: CentralScheme[] = [
  {
    id: 'ayushman-pmjay',
    name: 'Ayushman Bharat — PM-JAY (incl. 70+ Senior Expansion)',
    ministry: 'Ministry of Health & Family Welfare',
    roles: ['household', 'senior', 'worker', 'farmer'],
    residence: ['rural', 'urban'],
    need: 'health',
    benefitSummary: 'Up to ₹5 lakh/year cashless secondary and tertiary hospitalization cover per eligible family; universal cover extended to all citizens aged 70+ regardless of income.',
    eligibilitySummary: 'Eligible SECC / vulnerable households and all senior citizens of Bharat aged 70 years and above.',
    portalUrl: 'https://pmjay.gov.in/',
    portalName: 'pmjay.gov.in',
  },
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    roles: ['farmer'],
    residence: ['rural'],
    need: 'finance',
    benefitSummary: 'Direct income support of ₹6,000 per year transferred in three equal ₹2,000 installments directly into farmer bank accounts.',
    eligibilitySummary: 'Landholding farmer families subject to institutional and income-tax exclusion criteria.',
    portalUrl: 'https://pmkisan.gov.in/',
    portalName: 'pmkisan.gov.in',
  },
  {
    id: 'pm-surya-ghar',
    name: 'PM Surya Ghar: Muft Bijli Yojana',
    ministry: 'Ministry of New & Renewable Energy',
    roles: ['household', 'senior', 'worker'],
    residence: ['rural', 'urban'],
    need: 'energy',
    benefitSummary: 'Direct capital subsidy up to ₹78,000 for 3 kW residential rooftop solar installations, supporting up to 300 units/month of free solar electricity.',
    eligibilitySummary: 'Residential households across Bharat with a suitable roof and valid electricity connection.',
    portalUrl: 'https://pmsuryaghar.gov.in/',
    portalName: 'pmsuryaghar.gov.in',
  },
  {
    id: 'pmay-housing-scheme',
    name: 'Pradhan Mantri Awas Yojana (Gramin & Urban 2.0)',
    ministry: 'MoRD / MoHUA',
    roles: ['household', 'woman', 'worker', 'farmer'],
    residence: ['rural', 'urban'],
    need: 'housing',
    benefitSummary: 'Financial assistance and interest subsidies to construct or acquire pucca houses with convergence of tap water, LPG, and power.',
    eligibilitySummary: 'Homeless or kutcha-house rural households (PMAY-G) and EWS/LIG/MIG urban families without a pucca home (PMAY-U).',
    portalUrl: 'https://pmaymis.gov.in/',
    portalName: 'pmaymis.gov.in',
  },
  {
    id: 'pm-mudra',
    name: 'Pradhan Mantri MUDRA Yojana (Shishu / Kishore / Tarun Plus)',
    ministry: 'Department of Financial Services',
    roles: ['woman', 'worker', 'student'],
    residence: ['rural', 'urban'],
    need: 'finance',
    benefitSummary: 'Collateral-free micro and small enterprise loans up to ₹20 lakh (Tarun Plus for repeat borrowers) via commercial banks, RRBs, and MFIs.',
    eligibilitySummary: 'Non-corporate, non-farm small/micro enterprises, artisans, shopkeepers, and women entrepreneurs.',
    portalUrl: 'https://www.mudra.org.in/',
    portalName: 'mudra.org.in',
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Scheme',
    ministry: 'Ministry of MSME',
    roles: ['worker', 'woman'],
    residence: ['rural', 'urban'],
    need: 'education',
    benefitSummary: 'Skill training stipend, ₹15,000 toolkit e-voucher, and collateral-free enterprise credit at 5% concessional interest across 18 traditional trades.',
    eligibilitySummary: 'Self-employed traditional artisans and craftspeople (carpenters, tailors, goldsmiths, potters, etc.) aged 18+.',
    portalUrl: 'https://pmvishwakarma.gov.in/',
    portalName: 'pmvishwakarma.gov.in',
  },
  {
    id: 'national-scholarship-portal',
    name: 'National Scholarship Portal (NSP) & PM-Vidyalaxmi',
    ministry: 'Ministry of Education',
    roles: ['student'],
    residence: ['rural', 'urban'],
    need: 'education',
    benefitSummary: 'Centralized pre-matric, post-matric, and merit-cum-means scholarships plus collateral-free higher education loans with interest subvention.',
    eligibilitySummary: 'Students enrolled in recognized schools and top higher education institutions meeting merit and family-income thresholds.',
    portalUrl: 'https://scholarships.gov.in/',
    portalName: 'scholarships.gov.in',
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana (Beti Bachao Beti Padhao)',
    ministry: 'Ministry of Finance / Bharat Post',
    roles: ['woman', 'student', 'household'],
    residence: ['rural', 'urban'],
    need: 'education',
    benefitSummary: 'High-interest sovereign-backed tax-exempt savings account dedicated to a girl child’s higher education and long-term financial security.',
    eligibilitySummary: 'Parents or legal guardians of a girl child below 10 years of age.',
    portalUrl: 'https://www.nsiindia.gov.in/',
    portalName: 'nsiindia.gov.in',
  },
  {
    id: 'ujjwala-scheme',
    name: 'Pradhan Mantri Ujjwala Yojana (PMUY)',
    ministry: 'Ministry of Petroleum & Natural Gas',
    roles: ['woman', 'household', 'farmer'],
    residence: ['rural', 'urban'],
    need: 'energy',
    benefitSummary: 'Deposit-free LPG connection, first refill & stove assistance, plus targeted per-cylinder subsidy for clean household cooking.',
    eligibilitySummary: 'Adult women from BPL / SECC / Priority Household categories without an existing LPG connection.',
    portalUrl: 'https://www.pmuy.gov.in/',
    portalName: 'pmuy.gov.in',
  },
  {
    id: 'atal-pension',
    name: 'Atal Pension Yojana (APY)',
    ministry: 'PFRDA / Ministry of Finance',
    roles: ['worker', 'senior', 'woman', 'farmer'],
    residence: ['rural', 'urban'],
    need: 'finance',
    benefitSummary: 'Guaranteed monthly pension between ₹1,000 and ₹5,000 after age 60 backed by the Government of Bharat.',
    eligibilitySummary: 'Unorganized-sector citizens of Bharat aged 18–40 with a savings bank account (non-income-taxpayers).',
    portalUrl: 'https://www.npscra.nsdl.co.in/',
    portalName: 'npscra.nsdl.co.in',
  },
  {
    id: 'pm-svanidhi',
    name: 'PM SVANidhi (Street Vendors Micro-Credit)',
    ministry: 'Ministry of Housing & Urban Affairs',
    roles: ['worker', 'woman'],
    residence: ['urban'],
    need: 'finance',
    benefitSummary: 'Collateral-free working capital loans scaling from ₹10,000 to ₹50,000 with 7% interest subsidy and digital cashback rewards.',
    eligibilitySummary: 'Urban street vendors operating in towns and cities with a vending certificate or recommendation letter.',
    portalUrl: 'https://pmsvanidhi.mohua.gov.in/',
    portalName: 'pmsvanidhi.mohua.gov.in',
  },
  {
    id: 'pm-kusum',
    name: 'PM-KUSUM Solar Agriculture Scheme',
    ministry: 'Ministry of New & Renewable Energy',
    roles: ['farmer'],
    residence: ['rural'],
    need: 'energy',
    benefitSummary: 'Subsidies for standalone solar irrigation pumps and solarized agricultural feeders, enabling farmers to sell surplus solar power to the grid.',
    eligibilitySummary: 'Individual farmers, farmer cooperatives, and panchayats.',
    portalUrl: 'https://pmkusum.mnre.gov.in/',
    portalName: 'pmkusum.mnre.gov.in',
  },
  {
    id: 'jal-jeevan-scheme',
    name: 'Jal Jeevan Mission — Har Ghar Jal',
    ministry: 'Ministry of Jal Shakti',
    roles: ['household', 'farmer', 'woman'],
    residence: ['rural'],
    need: 'housing',
    benefitSummary: 'Functional household tap water connection supplying potable drinking water at 55 litres per capita per day in rural habitations.',
    eligibilitySummary: 'All rural households across villages covered under state/district JJM water supply schemes.',
    portalUrl: 'https://jaljeevanmission.gov.in/',
    portalName: 'jaljeevanmission.gov.in',
  },
  {
    id: 'myscheme-master',
    name: 'myScheme National Eligibility Portal',
    ministry: 'MeitY / National e-Governance Division',
    roles: ['all', 'student', 'farmer', 'woman', 'senior', 'worker', 'household'],
    residence: ['rural', 'urban'],
    need: 'finance',
    benefitSummary: 'Official Government of Bharat discovery platform indexing 2,500+ Central and State welfare schemes by state, age, gender, and income.',
    eligibilitySummary: 'Open to all citizens of Bharat for personalized end-to-end eligibility checks.',
    portalUrl: 'https://www.myscheme.gov.in/',
    portalName: 'myscheme.gov.in',
  },
];

// --- LANDMARK LAWS & POLICY REFORMS TIMELINE ---
export type LawCategory = 'All' | 'Economy & Tax' | 'Governance & Justice' | 'Social & Digital';

export interface LandmarkLaw {
  id: string;
  year: string;
  title: string;
  category: Exclude<LawCategory, 'All'>;
  officialObjective: string;
  officialSource: string;
  parliamentaryDebate: string;
  debateSource: string;
  prsUrl: string;
}

export const LANDMARK_LAWS: LandmarkLaw[] = [
  {
    id: 'ibc-2016',
    year: '2016',
    title: 'Insolvency and Bankruptcy Code (IBC)',
    category: 'Economy & Tax',
    officialObjective:
      'Consolidated fragmented insolvency laws into a time-bound, creditor-driven corporate resolution framework to clean up stressed banking assets and improve credit discipline.',
    officialSource: 'Ministry of Corporate Affairs / PIB',
    parliamentaryDebate:
      'PRS & economic reviews note stronger recovery behavior and lower bank NPAs, while highlighting NCLT bench vacancies, resolution delays beyond statutory 330-day timelines, and high haircuts in legacy cases.',
    debateSource: 'PRS Legislative Research / RBI Studies',
    prsUrl: 'https://prsindia.org/',
  },
  {
    id: 'rera-2016',
    year: '2016',
    title: 'Real Estate (Regulation & Development) Act (RERA)',
    category: 'Economy & Tax',
    officialObjective:
      'Created state-level real estate regulators mandating project escrow accounts (70% funds ring-fenced), standardized carpet-area disclosures, and homebuyer grievance redressal.',
    officialSource: 'MoHUA / PIB',
    parliamentaryDebate:
      'Consumer groups commend greater builder accountability, while policy trackers note uneven enforcement of recovery warrants across states and long adjudication queues.',
    debateSource: 'PRS Legislative Research / Urban Policy Reviews',
    prsUrl: 'https://prsindia.org/',
  },
  {
    id: 'gst-2017',
    year: '2017',
    title: 'Goods and Services Tax (101st Constitutional Amendment)',
    category: 'Economy & Tax',
    officialObjective:
      'Replaced over a dozen cascading central and state indirect taxes with a unified national market governed cooperatively by the Centre-State GST Council, expanding formal tax compliance.',
    officialSource: 'Ministry of Finance / PIB',
    parliamentaryDebate:
      'Economists highlight logistics gains and rising GST collections; states and MSME analysts continue debating rate-slab simplification, compliance load for small businesses, and exclusion of petroleum/electricity.',
    debateSource: 'PRS Legislative Research / State Finance Reviews',
    prsUrl: 'https://prsindia.org/',
  },
  {
    id: 'nep-2020',
    year: '2020',
    title: 'National Education Policy (NEP 2020)',
    category: 'Social & Digital',
    officialObjective:
      'Replaced the 1986 education policy with a 5+3+3+4 curricular structure, foundational literacy & numeracy focus, multidisciplinary higher education, vocational pathways, and mother-tongue early learning.',
    officialSource: 'Ministry of Education / PIB',
    parliamentaryDebate:
      'Educationists support multidisciplinary flexibility and early-childhood integration, while states and analysts debate fiscal funding toward the 6% of GDP education target, teacher training capacity, and federal curriculum autonomy.',
    debateSource: 'PRS Legislative Research / Education Economists',
    prsUrl: 'https://prsindia.org/',
  },
  {
    id: 'dpdp-2023',
    year: '2023',
    title: 'Digital Personal Data Protection (DPDP) Act',
    category: 'Social & Digital',
    officialObjective:
      'Established Bharat’s statutory digital privacy framework requiring clear user consent, data fiduciary accountability, child-data safeguards, and financial penalties up to ₹250 crore for breaches.',
    officialSource: 'MeitY / PIB',
    parliamentaryDebate:
      'PRS and digital-rights analysts welcome statutory breach penalties and consent rules, while raising scrutiny over broad government exemptions, Data Protection Board independence, and amendments interacting with the RTI Act.',
    debateSource: 'PRS Legislative Research / Digital Policy Analysts',
    prsUrl: 'https://prsindia.org/',
  },
  {
    id: 'womens-reservation-2023',
    year: '2023',
    title: 'Nari Shakti Vandan Adhiniyam (106th Amendment)',
    category: 'Governance & Justice',
    officialObjective:
      'Mandated 33% reservation of seats for women in the Lok Sabha, state legislative assemblies, and the Delhi assembly to expand women’s legislative representation.',
    officialSource: 'Ministry of Law & Justice / PIB',
    parliamentaryDebate:
      'Passed with near-unanimous parliamentary backing; opposition and civic researchers debated linking implementation to the next Census and delimitation exercise as well as sub-quotas for OBC women.',
    debateSource: 'PRS Legislative Research',
    prsUrl: 'https://prsindia.org/',
  },
  {
    id: 'bns-criminal-laws-2024',
    year: '2023–24',
    title: 'Bharatiya Nyaya Sanhita (BNS), BNSS & BSA',
    category: 'Governance & Justice',
    officialObjective:
      'Replaced colonial-era IPC (1860), CrPC, and Evidence Act with modernized statutes integrating electronic evidence, Zero FIR, mandatory forensics for serious crimes, community service, and trial timelines.',
    officialSource: 'Ministry of Home Affairs / PIB',
    parliamentaryDebate:
      'Legal scholars and PRS analyses examine expanded police custody flexibility, re-worded national-security provisions replacing sedition, and the nationwide forensic/court infrastructure needed to meet new statutory timelines.',
    debateSource: 'PRS Legislative Research / Legal Scholars',
    prsUrl: 'https://prsindia.org/',
  },
  {
    id: 'mospi-rebasing-2026',
    year: '2025–26',
    title: 'Statistical Base-Year Modernization & Fiscal Glide Path',
    category: 'Economy & Tax',
    officialObjective:
      'MoSPI initiated base-year updates for GDP (to 2022–23), CPI, and IIP to capture digital/modern consumption baskets alongside the Union Budget’s shift toward anchoring central debt-to-GDP near 50±1% by 2030–31.',
    officialSource: 'MoSPI / Ministry of Finance / PIB',
    parliamentaryDebate:
      'Economists and IMF reviews welcome modernized statistical weights and explicit debt anchoring while stressing timely publication of Census and back-series data for transparent cross-decade comparisons.',
    debateSource: 'IMF / Independent Statisticians',
    prsUrl: 'https://www.mospi.gov.in/',
  },
];

// --- DEFENCE, SPACE & GLOBAL STANDING DATA ---
export const DEFENCE_EXPORTS_SERIES = [
  { year: 'FY14', exportsCr: 686, productionLakhCr: 0.46 },
  { year: 'FY17', exportsCr: 1521, productionLakhCr: 0.74 },
  { year: 'FY19', exportsCr: 10745, productionLakhCr: 0.81 },
  { year: 'FY22', exportsCr: 12815, productionLakhCr: 0.95 },
  { year: 'FY24', exportsCr: 21083, productionLakhCr: 1.27 },
  { year: 'FY25', exportsCr: 23622, productionLakhCr: 1.54 },
  { year: 'FY26', exportsCr: 38424, productionLakhCr: 1.78 },
];

export const ISRO_MISSIONS = [
  {
    name: 'Chandrayaan-3',
    status: 'Completed (2023)',
    detail: 'First spacecraft to achieve a soft landing near the lunar south pole, deploying the Pragyan rover and confirming lunar surface sulphur.',
    source: 'ISRO / PIB',
  },
  {
    name: 'Aditya-L1 Solar Observatory',
    status: 'Operational at L1',
    detail: 'Bharat’s maiden space-based solar observatory stationed at Lagrange Point L1 monitoring coronal mass ejections and space weather.',
    source: 'ISRO / PIB',
  },
  {
    name: 'Gaganyaan Human Spaceflight',
    status: 'Active Flight Testing',
    detail: 'Indigenous human-rated HLVM3 precursor missions plus international astronaut training collaborations (Axiom-4) toward crewed orbital flight.',
    source: 'ISRO / PIB',
  },
  {
    name: 'Chandrayaan-4 & LUPEX (Chandrayaan-5)',
    status: 'Target 2027–2029',
    detail: 'Lunar sample-return architecture (Chandrayaan-4) and joint lunar polar water-ice exploration mission with Japan’s JAXA.',
    source: 'ISRO / PIB',
  },
  {
    name: 'Bharatiya Antariksh Station (BAS)',
    status: 'First Module 2028 · Full 2035',
    detail: 'Planned indigenous modular orbital space station anchoring Bharat’s long-term microgravity research and commercial space economy.',
    source: 'Dept. of Space / PIB',
  },
];

export const GLOBAL_TRADE_PACTS = [
  {
    pact: 'Bharat–UAE CEPA',
    effective: 'May 2022',
    metric: '$37B+ merchandise exports from Bharat (FY26)',
    summary: 'Comprehensive economic partnership driving bilateral trade toward a $200B target by 2032.',
  },
  {
    pact: 'Bharat–Australia ECTA',
    effective: 'Dec 2022',
    metric: '$7.28B+ exports to Australia (FY26)',
    summary: 'Zero-duty market access across major labour-intensive tariff lines with a developed economy.',
  },
  {
    pact: 'Bharat–EFTA TEPA',
    effective: 'Oct 2025',
    metric: '$100B investment commitment (15 yrs)',
    summary: 'Trade pact with Switzerland, Norway, Iceland, and Liechtenstein binding a targeted $100B FDI & 1 million direct jobs framework.',
  },
];

// --- FISCAL HEALTH & PUBLIC ACCOUNTABILITY DATA ---
export const FISCAL_DEFICIT_SERIES = [
  { year: 'FY15', fiscalDeficitPct: 4.1, generalDebtPct: 67.1 },
  { year: 'FY17', fiscalDeficitPct: 3.5, generalDebtPct: 68.9 },
  { year: 'FY19', fiscalDeficitPct: 3.4, generalDebtPct: 70.4 },
  { year: 'FY21', fiscalDeficitPct: 9.2, generalDebtPct: 88.4 },
  { year: 'FY23', fiscalDeficitPct: 6.4, generalDebtPct: 82.6 },
  { year: 'FY25', fiscalDeficitPct: 4.8, generalDebtPct: 82.1 },
  { year: 'FY26 RE', fiscalDeficitPct: 4.4, generalDebtPct: 81.8 },
  { year: 'FY27 BE', fiscalDeficitPct: 4.3, generalDebtPct: 81.2 },
];

export const INFLATION_SERIES = [
  { year: 'FY15', headlineCpi: 5.9, foodInflation: 6.4 },
  { year: 'FY17', headlineCpi: 4.5, foodInflation: 4.2 },
  { year: 'FY19', headlineCpi: 3.4, foodInflation: 0.1 },
  { year: 'FY21', headlineCpi: 6.2, foodInflation: 7.7 },
  { year: 'FY23', headlineCpi: 6.7, foodInflation: 6.6 },
  { year: 'FY25', headlineCpi: 4.9, foodInflation: 7.4 },
  { year: 'FY26', headlineCpi: 5.4, foodInflation: 7.9 },
];

export const ACCOUNTABILITY_REVIEWS = [
  {
    institution: 'Comptroller and Auditor General (CAG)',
    topic: 'Budget Transparency & Scheme Execution Audits',
    finding:
      'CAG compliance and performance audits evaluate whether budgeted funds match on-ground delivery, reviewing extra-budgetary borrowings, GST reconciliation systems, highway cost-per-km variations, and state-level utilization certificates.',
    reference: 'cag.gov.in — Union & State Audit Reports',
    url: 'https://cag.gov.in/',
  },
  {
    institution: 'PRS Legislative Research',
    topic: 'Parliamentary Scrutiny & State Fiscal Health',
    finding:
      'PRS tracks bill referral rates to Standing Committees, parliamentary sitting days, and state budgets—noting that combined Centre + State debt hovers near 81%–84% of GDP while states shoulder roughly 60% of social-sector expenditure.',
    reference: 'prsindia.org — Vital Stats & Budget Analysis',
    url: 'https://prsindia.org/',
  },
  {
    institution: 'Reserve Bank of Bharat (RBI)',
    topic: 'Inflation Band & Interest Burden',
    finding:
      'Interest payments account for ~20 paise of every Union Budget rupee (FY26–27). RBI Monetary Policy Reports emphasize anchoring headline CPI near 4% (within its legal 2%–6% band) while managing recurrent vegetable and food-price spikes.',
    reference: 'rbi.org.in — Monetary Policy & State Finances',
    url: 'https://www.rbi.org.in/',
  },
];
