export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta' | 'bn';

export interface LanguageOption {
  code: LanguageCode;
  nativeLabel: string;
  englishName: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', nativeLabel: 'English', englishName: 'English' },
  { code: 'hi', nativeLabel: 'हिन्दी', englishName: 'Hindi' },
  { code: 'mr', nativeLabel: 'मराठी', englishName: 'Marathi' },
  { code: 'ta', nativeLabel: 'தமிழ்', englishName: 'Tamil' },
  { code: 'bn', nativeLabel: 'বাংলা', englishName: 'Bengali' },
];

export interface UITranslations {
  brand: string;
  nav: {
    overview: string;
    indicators: string;
    statesBudget: string;
    schemesLaws: string;
    defenceRoadmap: string;
    fiscalSources: string;
  };
  actions: {
    exportCsv: string;
    exploreIndicators: string;
    readContext: string;
    backToTop: string;
    downloadDataset: string;
    resetFilters: string;
  };
  workspace: {
    allModules: string;
    policyNews: string;
    indicators: string;
    statesBudget: string;
    schemesLaws: string;
    defenceRoadmap: string;
    fiscalSources: string;
    languageLabel: string;
    themeLabel: string;
    lightMode: string;
    darkMode: string;
  };
  hero: {
    kicker1: string;
    kicker2: string;
    kicker3: string;
    headline: string;
    deck: string;
    comparatorTitle: string;
  };
  sections: {
    policyNewsKicker: string;
    policyNewsTitle: string;
    policyNewsSubtitle: string;
    timeSeriesKicker: string;
    timeSeriesTitle: string;
    ledgerKicker: string;
    ledgerTitle: string;
    statesKicker: string;
    statesTitle: string;
    statesSubtitle: string;
    budgetKicker: string;
    budgetTitle: string;
    budgetSubtitle: string;
    costLivingKicker: string;
    costLivingTitle: string;
    costLivingSubtitle: string;
    workforceKicker: string;
    workforceTitle: string;
    workforceSubtitle: string;
    schemesKicker: string;
    schemesTitle: string;
    schemesSubtitle: string;
    lawsKicker: string;
    lawsTitle: string;
    lawsSubtitle: string;
    civicKicker: string;
    civicTitle: string;
    civicSubtitle: string;
    defenceKicker: string;
    defenceTitle: string;
    defenceSubtitle: string;
    globalPeersKicker: string;
    globalPeersTitle: string;
    globalPeersSubtitle: string;
    fiscalKicker: string;
    fiscalTitle: string;
    fiscalSubtitle: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, UITranslations> = {
  en: {
    brand: 'Bharat Development Atlas',
    nav: {
      overview: 'Overview',
      indicators: 'National Data',
      statesBudget: 'States & Budget',
      schemesLaws: 'Schemes & Laws',
      defenceRoadmap: 'Defence & 2047',
      fiscalSources: 'Fiscal & Sources',
    },
    actions: {
      exportCsv: 'Export CSV',
      exploreIndicators: 'Explore 22 Official Indicators',
      readContext: 'Read Independent Context',
      backToTop: 'Back to Top',
      downloadDataset: 'Download Full Dataset (CSV)',
      resetFilters: 'Reset Filters',
    },
    workspace: {
      allModules: 'Overview',
      policyNews: 'Policy News',
      indicators: 'National Data',
      statesBudget: 'States & Budget',
      schemesLaws: 'Schemes & Laws',
      defenceRoadmap: 'Defence & 2047',
      fiscalSources: 'Fiscal & Sources',
      languageLabel: 'Language',
      themeLabel: 'Theme',
      lightMode: 'Light',
      darkMode: 'Dark',
    },
    hero: {
      kicker1: 'Government of Bharat Official Data',
      kicker2: '2014–2026 & Vision 2047',
      kicker3: 'Independent Institutional Context',
      headline: 'Bharat’s Economic, Social, and Infrastructure Record — 2014 to 2047',
      deck: 'An interactive public-data ledger compiling verified indicators from the Press Information Bureau (PIB), Ministry of Finance (Union Budget & Economic Survey), MoSPI, NPCI, and NITI Aayog—paired side-by-side with independent analyses from PRS Legislative Research, CAG, IMF, World Bank, and RBI.',
      comparatorTitle: 'Interactive Baseline Comparator',
    },
    sections: {
      policyNewsKicker: 'Live Feed · PIB & Economic Newsroom',
      policyNewsTitle: 'Policy & Development News',
      policyNewsSubtitle:
        'Live search-grounded headlines from the Press Information Bureau (PIB), Reserve Bank of Bharat (RBI), and major economic portals of Bharat covering current Cabinet decisions, reforms, and macro announcements.',
      timeSeriesKicker: '01. Interactive Longitudinal Data',
      timeSeriesTitle: 'Multi-Year Growth Trajectories (2014–2026)',
      ledgerKicker: '02. Comprehensive Official Indicator Ledger',
      ledgerTitle: '2014 Baseline vs. Latest Official Milestones',
      statesKicker: '03. Interactive Bharat Map & State Explorer',
      statesTitle: 'Regional Progress Across States & UTs of Bharat',
      statesSubtitle:
        'Click any state or UT on the official Bharat choropleth map or compare two side-by-side using official MoSPI, Jal Jeevan Mission, MNRE, and MoRTH figures.',
      budgetKicker: '04. Union Budget Explorer',
      budgetTitle: 'Where Every Rupee Comes From & Goes (FY 2025–27)',
      budgetSubtitle:
        'Explore official Ministry of Finance revenue sources, expenditure priorities, ministry outlays, and an interactive tax-rupee calculator.',
      costLivingKicker: '05. Everyday Cost-of-Living & Household Tracker',
      costLivingTitle: 'Household Prices, Fuel, Data & Per-Capita Income (2014–2026)',
      costLivingSubtitle:
        'Compare official retail food staples (Dept. of Consumer Affairs), LPG and fuel rates (PPAC), and mobile data tariffs (TRAI) directly against MoSPI per-capita income.',
      workforceKicker: '06. Employment, Skilling & Workforce Dashboard',
      workforceTitle: 'Labour Force, Formal Payrolls & Skilling Outcomes',
      workforceSubtitle:
        'Official MoSPI Periodic Labour Force Survey (PLFS), EPFO net payroll additions, and Skill Bharat outcomes paired with ILO, IMF, and parliamentary reviews.',
      schemesKicker: '07. Citizen Scheme Eligibility Finder',
      schemesTitle: 'Find Central Government Schemes for Your Profile',
      schemesSubtitle:
        'Filter official welfare, credit, education, and clean-energy schemes modeled on the Government of Bharat’s myScheme portal with direct .gov.in links.',
      lawsKicker: '08. Landmark Laws & Policy Reforms Timeline',
      lawsTitle: 'Major Legislation & Structural Reforms (2014–2026)',
      lawsSubtitle:
        'Chronological review pairing official PIB policy objectives alongside parliamentary scrutiny and expert debate summaries from PRS Legislative Research.',
      civicKicker: '09. Civic Action & Public Services Directory',
      civicTitle: 'Track Your MP, File Grievances & Use Official Citizen Rights',
      civicSubtitle:
        'Direct official tools and practical step-by-step guides to check MP attendance, submit online RTIs, lodge CPGRAMS complaints, and audit local works.',
      defenceKicker: '10. Defence, Space & Global Standing',
      defenceTitle: 'Strategic Self-Reliance, ISRO Missions & Global Trade',
      defenceSubtitle:
        'Official milestones in domestic defence manufacturing and exports (MoD), space exploration (ISRO), foreign exchange reserves (RBI), and trade pacts.',
      globalPeersKicker: '11. Bharat vs. Global Peers Benchmark',
      globalPeersTitle: 'How Bharat Compares Against Major Global Economies',
      globalPeersSubtitle:
        'Benchmark Bharat against China, Vietnam, Indonesia, the United States, and the European Union using IMF WEO, World Bank, Ember/IRENA, and UNDP HDI datasets.',
      fiscalKicker: '12. Fiscal Health & Public Accountability',
      fiscalTitle: 'Deficit, Debt, Inflation & Institutional Oversight',
      fiscalSubtitle:
        'Track central fiscal consolidation, public debt-to-GDP, headline vs. food inflation against the RBI mandate, and CAG/PRS governance reviews.',
    },
  },
  hi: {
    brand: 'भारत विकास एटलस',
    nav: {
      overview: 'मुख्य पृष्ठ',
      indicators: 'राष्ट्रीय सूचकांक',
      statesBudget: 'राज्य और बजट',
      schemesLaws: 'योजनाएं और कानून',
      defenceRoadmap: 'रक्षा और 2047',
      fiscalSources: 'राजकोषीय और स्रोत',
    },
    actions: {
      exportCsv: 'CSV डाउनलोड',
      exploreIndicators: '22 आधिकारिक सूचकांक देखें',
      readContext: 'स्वतंत्र विश्लेषण पढ़ें',
      backToTop: 'ऊपर जाएं',
      downloadDataset: 'पूर्ण डेटासेट डाउनलोड करें (CSV)',
      resetFilters: 'फ़िल्टर रीसेट करें',
    },
    workspace: {
      allModules: 'मुख्य पृष्ठ',
      policyNews: 'ताज़ा नीति समाचार',
      indicators: 'राष्ट्रीय डेटा',
      statesBudget: 'राज्य और बजट',
      schemesLaws: 'योजनाएं और कानून',
      defenceRoadmap: 'रक्षा और 2047',
      fiscalSources: 'राजकोषीय और स्रोत',
      languageLabel: 'भाषा',
      themeLabel: 'थीम',
      lightMode: 'लाइट',
      darkMode: 'डार्क',
    },
    hero: {
      kicker1: 'भारत सरकार का आधिकारिक डेटा',
      kicker2: '2014–2026 और विज़न 2047',
      kicker3: 'स्वतंत्र संस्थागत संदर्भ',
      headline: 'भारत का आर्थिक, सामाजिक और बुनियादी ढांचा रिकॉर्ड — 2014 से 2047',
      deck: 'प्रेस सूचना ब्यूरो (PIB), वित्त मंत्रालय (केंद्रीय बजट और आर्थिक सर्वेक्षण), MoSPI, NPCI और नीति आयोग के सत्यापित आंकड़ों का इंटरैक्टिव पोर्टल — PRS, CAG, IMF, विश्व बैंक और RBI के स्वतंत्र विश्लेषण के साथ।',
      comparatorTitle: 'इंटरैक्टिव तुलना (2014 बनाम 2026)',
    },
    sections: {
      policyNewsKicker: 'लाइव फ़ीड · PIB और आर्थिक समाचार',
      policyNewsTitle: 'नीति और विकास समाचार',
      policyNewsSubtitle:
        'प्रेस सूचना ब्यूरो (PIB), भारतीय रिज़र्व बैंक और प्रमुख आर्थिक पोर्टलों से वर्तमान सरकारी घोषणाओं, कैबिनेट फैसलों और आर्थिक नीतियों के ताज़ा समाचार।',
      timeSeriesKicker: '01. बहु-वर्षीय आंकड़े',
      timeSeriesTitle: 'विकास की दीर्घकालिक प्रवृत्तियां (2014–2026)',
      ledgerKicker: '02. आधिकारिक सूचकांक तालिका',
      ledgerTitle: '2014 आधार वर्ष बनाम नवीनतम आधिकारिक आंकड़े',
      statesKicker: '03. इंटरैक्टिव भारत मानचित्र और राज्य एक्सप्लोरर',
      statesTitle: 'भारत के राज्यों और केंद्र शासित प्रदेशों की प्रगति',
      statesSubtitle:
        'भारत के मानचित्र पर किसी भी राज्य पर क्लिक करें या MoSPI, जल जीवन मिशन, MNRE और MoRTH के आंकड़ों की तुलना करें।',
      budgetKicker: '04. केंद्रीय बजट एक्सप्लोरर',
      budgetTitle: 'रुपया कहाँ से आता है और कहाँ जाता है (2025–27)',
      budgetSubtitle:
        'वित्त मंत्रालय के राजस्व स्रोतों, प्रमुख व्यय मदों, मंत्रालय आवंटन और अपने कर-रुपये के उपयोग की गणना देखें।',
      costLivingKicker: '05. दैनिक जीवन-यापन लागत और घरेलू बजट ट्रैकर',
      costLivingTitle: 'खाद्य कीमतें, ईंधन, डेटा और प्रति व्यक्ति आय (2014–2026)',
      costLivingSubtitle:
        'उपभोक्ता मामलों के विभाग के खुदरा खाद्य मूल्य, PPAC एलपीजी/पेट्रोल दरें और TRAI मोबाइल डेटा लागत की प्रति व्यक्ति आय से तुलना।',
      workforceKicker: '06. रोजगार, कौशल विकास और कार्यबल डैशबोर्ड',
      workforceTitle: 'श्रम बल (PLFS), EPFO औपचारिक रोजगार और कौशल परिणाम',
      workforceSubtitle:
        'MoSPI पीरियोडिक लेबर फोर्स सर्वे, EPFO पेरोल जोड़ और स्किल भारत के आंकड़े — ILO और IMF के स्वतंत्र विश्लेषण के साथ।',
      schemesKicker: '07. नागरिक योजना पात्रता खोजक',
      schemesTitle: 'अपनी श्रेणी के अनुसार सरकारी योजनाएं खोजें',
      schemesSubtitle:
        'भारत सरकार के myScheme पोर्टल की तर्ज पर छात्र, किसान, महिला, वरिष्ठ नागरिक और उद्यमियों के लिए प्रमुख योजनाओं व आधिकारिक लिंक की सूची।',
      lawsKicker: '08. प्रमुख कानून और नीतिगत सुधार',
      lawsTitle: 'महत्वपूर्ण अधिनियम और संरचनात्मक सुधार (2014–2026)',
      lawsSubtitle:
        'PIB के आधिकारिक उद्देश्यों के साथ-साथ PRS लेजिस्लेटिव रिसर्च की संसदीय चर्चा और विशेषज्ञ समीक्षाओं का संतुलित विवरण।',
      civicKicker: '09. नागरिक अधिकार और सार्वजनिक सेवा निर्देशिका',
      civicTitle: 'सांसद रिकॉर्ड, जन-शिकायत (CPGRAMS) और ऑनलाइन RTI',
      civicSubtitle:
        'सांसद उपस्थिति जांचने, ऑनलाइन RTI दाखिल करने, CPGRAMS पर शिकायत दर्ज करने और स्थानीय विकास कार्यों को देखने के सीधे लिंक।',
      defenceKicker: '10. रक्षा, अंतरिक्ष और वैश्विक स्थिति',
      defenceTitle: 'रक्षा आत्मनिर्भरता, इसरो मिशन और वैश्विक व्यापार',
      defenceSubtitle:
        'घरेलू रक्षा उत्पादन व निर्यात (रक्षा मंत्रालय), इसरो के प्रमुख मिशन, RBI विदेशी मुद्रा भंडार और अंतर्राष्ट्रीय व्यापार समझौते।',
      globalPeersKicker: '11. भारत बनाम प्रमुख वैश्विक अर्थव्यवस्थाएं',
      globalPeersTitle: 'प्रमुख वैश्विक अर्थव्यवस्थाओं की तुलना में भारत',
      globalPeersSubtitle:
        'IMF, विश्व बैंक, Ember और UNDP HDI आंकड़ों के आधार पर चीन, वियतनाम, इंडोनेशिया, अमेरिका और यूरोपीय संघ से भारत की तुलना।',
      fiscalKicker: '12. राजकोषीय स्वास्थ्य और सार्वजनिक जवाबदेही',
      fiscalTitle: 'राजकोषीय घाटा, ऋण, महंगाई और ऑडिट निगरानी',
      fiscalSubtitle:
        'राजकोषीय घाटा, ऋण-से-GDP अनुपात, RBI के दायरे में खुदरा व खाद्य महंगाई, तथा CAG और संसदीय समितियों के प्रमुख अवलोकन।',
    },
  },
  mr: {
    brand: 'भारत विकास अ‍ॅटलस',
    nav: {
      overview: 'मुख्यपृष्ठ',
      indicators: 'निर्देशांक',
      statesBudget: 'राज्ये आणि अर्थसंकल्प',
      schemesLaws: 'योजना आणि कायदे',
      defenceRoadmap: 'संरक्षण आणि 2047',
      fiscalSources: 'वित्तीय आणि स्रोत',
    },
    actions: {
      exportCsv: 'CSV निर्यात',
      exploreIndicators: '22 अधिकृत निर्देशांक पहा',
      readContext: 'स्वतंत्र विश्लेषण वाचा',
      backToTop: 'वर जा',
      downloadDataset: 'संपूर्ण डेटासेट डाउनलोड करा (CSV)',
      resetFilters: 'फिल्टर रीसेट करा',
    },
    workspace: {
      allModules: 'मुख्यपृष्ठ',
      policyNews: 'ताज्या धोरण बातम्या',
      indicators: 'राष्ट्रीय डेटा',
      statesBudget: 'राज्ये आणि अर्थसंकल्प',
      schemesLaws: 'योजना आणि कायदे',
      defenceRoadmap: 'संरक्षण आणि 2047',
      fiscalSources: 'वित्तीय आणि स्रोत',
      languageLabel: 'भाषा',
      themeLabel: 'थीम',
      lightMode: 'लाइट',
      darkMode: 'डार्क',
    },
    hero: {
      kicker1: 'भारत सरकारचा अधिकृत डेटा',
      kicker2: '2014–2026 आणि व्हिजन 2047',
      kicker3: 'स्वतंत्र संस्थात्मक संदर्भ',
      headline: 'भारताचा आर्थिक, सामाजिक आणि पायाभूत सुविधांचा आलेख — 2014 ते 2047',
      deck: 'PIB, वित्त मंत्रालय (केंद्रीय अर्थसंकल्प व आर्थिक पाहणी), MoSPI, NPCI आणि नीती आयोगाची अधिकृत आकडेवारी — PRS, CAG, IMF, जागतिक बँक आणि RBI यांच्या स्वतंत्र विश्लेषणासह.',
      comparatorTitle: 'परस्परसंवादी तुलना (2014 विरुद्ध 2026)',
    },
    sections: {
      policyNewsKicker: 'थेट फीड · PIB आणि आर्थिक बातम्या',
      policyNewsTitle: 'धोरण आणि विकास बातम्या',
      policyNewsSubtitle:
        'PIB, भारतीय रिझर्व्ह बँक आणि प्रमुख भारतीय आर्थिक पोर्टल्सवरील ताज्या सरकारी घोषणा, मंत्रिमंडळ निर्णय आणि आर्थिक घडामोडी.',
      timeSeriesKicker: '01. दीर्घकालीन आकडेवारी',
      timeSeriesTitle: 'बहु-वर्षीय विकास प्रवास (2014–2026)',
      ledgerKicker: '02. अधिकृत निर्देशांक तक्ता',
      ledgerTitle: '2014 पायाभूत वर्ष विरुद्ध नवीनतम अधिकृत टप्पे',
      statesKicker: '03. इंटरअ‍ॅक्टिव्ह भारत नकाशा आणि राज्य एक्सप्लोरर',
      statesTitle: 'भारतातील राज्ये आणि केंद्रशासित प्रदेशांची प्रगती',
      statesSubtitle:
        'भारताच्या नकाशावर कोणत्याही राज्यावर क्लिक करा किंवा MoSPI, जल जीवन मिशन आणि MNRE आकडेवारीची तुलना करा.',
      budgetKicker: '04. केंद्रीय अर्थसंकल्प एक्सप्लोरर',
      budgetTitle: 'रुपया कोठून येतो आणि कोठे जातो (2025–27)',
      budgetSubtitle:
        'वित्त मंत्रालयाचे महसूल स्रोत, खर्च विभागणी, मंत्रालय निधी आणि वैयक्तिक कर-रुपया गणकयंत्र पहा.',
      costLivingKicker: '05. दैनंदिन जीवनमान खर्च आणि घरगुती बजेट ट्रॅकर',
      costLivingTitle: 'अन्नधान्य किमती, इंधन, डेटा आणि दरडोई उत्पन्न (2014–2026)',
      costLivingSubtitle:
        'अधिकृत किरकोळ अन्नधान्य दर, PPAC एलपीजी/पेट्रोल किमती आणि TRAI डेटा खर्चाची दरडोई उत्पन्नाशी तुलना.',
      workforceKicker: '06. रोजगार, कौशल्य विकास आणि कार्यबल डॅशबोर्ड',
      workforceTitle: 'श्रम दल (PLFS), EPFO औपचारिक रोजगार आणि कौशल्य परिणाम',
      workforceSubtitle:
        'MoSPI PLFS सर्वेक्षण, EPFO पेरोल वाढ आणि स्किल भारत आकडेवारी — ILO व IMF विश्लेषणासह.',
      schemesKicker: '07. नागरिक योजना पात्रता शोधक',
      schemesTitle: 'तुमच्या प्रोफाइलनुसार केंद्र सरकारी योजना शोधा',
      schemesSubtitle:
        'भारत सरकारच्या myScheme पोर्टलच्या धर्तीवर पात्रता, फायदे आणि थेट .gov.in अर्ज दुवे पहा.',
      lawsKicker: '08. प्रमुख कायदे आणि धोरणात्मक सुधारणा',
      lawsTitle: 'महत्त्वाचे कायदे आणि संरचनात्मक बदल (2014–2026)',
      lawsSubtitle:
        'PIB चे अधिकृत उद्दिष्टे आणि PRS लेजिस्लेटिव्ह रिसर्चच्या संसदीय चर्चेचा संतुलित आढावा.',
      civicKicker: '09. नागरिक कृती आणि सार्वजनिक सेवा निर्देशिका',
      civicTitle: 'खासदार कामगिरी, CPGRAMS तक्रारी आणि ऑनलाइन RTI',
      civicSubtitle:
        'खासदारांची उपस्थिती तपासण्यासाठी, ऑनलाइन RTI दाखल करण्यासाठी आणि स्थानिक कामे पाहण्यासाठी थेट अधिकृत पोर्टल.',
      defenceKicker: '10. संरक्षण, अंतराळ आणि जागतिक स्थान',
      defenceTitle: 'संरक्षण स्वावलंबन, इस्रो मोहिमा आणि जागतिक व्यापार',
      defenceSubtitle:
        'देशांतर्गत संरक्षण उत्पादन व निर्यात, इस्रोची मोहीम प्रगती, RBI परकीय चलन साठा आणि व्यापार करार.',
      globalPeersKicker: '11. भारत विरुद्ध प्रमुख जागतिक अर्थव्यवस्था',
      globalPeersTitle: 'प्रमुख जागतिक अर्थव्यवस्थांच्या तुलनेत भारत',
      globalPeersSubtitle:
        'IMF, जागतिक बँक आणि UNDP HDI आकडेवारीनुसार चीन, व्हिएतनाम, इंडोनेशिया, अमेरिका आणि युरोपियन महासंघाशी तुलना.',
      fiscalKicker: '12. वित्तीय आरोग्य आणि सार्वजनिक उत्तरदायित्व',
      fiscalTitle: 'वित्तीय तूट, कर्ज, महागाई आणि लेखापरीक्षण',
      fiscalSubtitle:
        'केंद्रीय वित्तीय तूट, कर्ज-ते-GDP प्रमाण, अन्न महागाई आणि CAG/PRS निरीक्षणे तपासा.',
    },
  },
  ta: {
    brand: 'பாரத் வளர்ச்சி அட்லஸ்',
    nav: {
      overview: 'முகப்பு',
      indicators: 'குறியீடுகள்',
      statesBudget: 'மாநிலங்கள் & பட்ஜெட்',
      schemesLaws: 'திட்டங்கள் & சட்டங்கள்',
      defenceRoadmap: 'பாதுகாப்பு & 2047',
      fiscalSources: 'நிதி & ஆதாரங்கள்',
    },
    actions: {
      exportCsv: 'CSV பதிவிறக்கம்',
      exploreIndicators: '22 அதிகாரப்பூர்வ குறியீடுகள்',
      readContext: 'சுயாதீன பகுப்பாய்வு',
      backToTop: 'மேலே செல்லவும்',
      downloadDataset: 'முழு தரவைப் பதிவிறக்கவும் (CSV)',
      resetFilters: 'வடிப்பான்களை மீட்டமை',
    },
    workspace: {
      allModules: 'முகப்பு',
      policyNews: 'கொள்கை செய்திகள்',
      indicators: 'தேசிய தரவு',
      statesBudget: 'மாநிலங்கள் & பட்ஜெட்',
      schemesLaws: 'திட்டங்கள் & சட்டங்கள்',
      defenceRoadmap: 'பாதுகாப்பு & 2047',
      fiscalSources: 'நிதி & ஆதாரங்கள்',
      languageLabel: 'மொழி',
      themeLabel: 'தீம்',
      lightMode: 'ஒளி',
      darkMode: 'இருள்',
    },
    hero: {
      kicker1: 'பாரத அரசு அதிகாரப்பூர்வ தரவு',
      kicker2: '2014–2026 & விஷன் 2047',
      kicker3: 'சுயாதீன நிறுவனப் பார்வை',
      headline: 'பாரதத்தின் பொருளாதார, சமூக மற்றும் உள்கட்டமைப்புப் பதிவு — 2014 முதல் 2047 வரை',
      deck: 'PIB, நிதி அமைச்சகம் (மத்திய பட்ஜெட் & பொருளாதார ஆய்வறிக்கை), MoSPI, NPCI மற்றும் நிதி ஆயோக் ஆகியவற்றின் சரிபார்க்கப்பட்ட தரவுகள் — PRS, CAG, IMF, உலக வங்கி மற்றும் RBI பகுப்பாய்வுகளுடன்.',
      comparatorTitle: 'ஒப்பீட்டுத் திரை (2014 vs 2026)',
    },
    sections: {
      policyNewsKicker: 'நேரடி செய்திகள் · PIB & பொருளாதாரம்',
      policyNewsTitle: 'கொள்கை மற்றும் வளர்ச்சிச் செய்திகள்',
      policyNewsSubtitle:
        'PIB, பாரத ரிசர்வ் வங்கி மற்றும் முக்கிய பொருளாதார இணையதளங்களில் வெளியாகும் சமீபத்திய அரசு அறிவிப்புகள் மற்றும் பொருளாதாரத் தகவல்கள்.',
      timeSeriesKicker: '01. பல ஆண்டு வளர்ச்சித் தரவு',
      timeSeriesTitle: 'பல ஆண்டு வளர்ச்சிப் பாதைகள் (2014–2026)',
      ledgerKicker: '02. அதிகாரப்பூர்வ குறியீட்டு அட்டவணை',
      ledgerTitle: '2014 அடிப்படை vs சமீபத்திய அதிகாரப்பூர்வ மைல்கற்கள்',
      statesKicker: '03. பாரத் வரைபடம் & மாநில ஆய்வு',
      statesTitle: 'பாரத மாநிலங்கள் மற்றும் யூனியன் பிரதேசங்களின் முன்னேற்றம்',
      statesSubtitle:
        'பாரத் வரைபடத்தில் எந்த மாநிலத்தையும் சொடுக்கி MoSPI, ஜல் ஜீவன் மிஷன் மற்றும் MNRE தரவுகளை ஒப்பிடவும்.',
      budgetKicker: '04. மத்திய பட்ஜெட் ஆய்வு',
      budgetTitle: 'ஒவ்வொரு ரூபாயும் எங்கிருந்து வருகிறது, எங்கே செல்கிறது (2025–27)',
      budgetSubtitle:
        'நிதி அமைச்சக வருவாய் ஆதாரங்கள், செலவினப் பகிர்வு, அமைச்சக ஒதுக்கீடுகள் மற்றும் வரி-ரூபாய் கணிப்பான்.',
      costLivingKicker: '05. அன்றாட வாழ்க்கைச் செலவு & குடும்ப பட்ஜெட்',
      costLivingTitle: 'உணவு விலை, எரிபொருள், டேட்டா & தனிநபர் வருமானம் (2014–2026)',
      costLivingSubtitle:
        'அதிகாரப்பூர்வ அத்தியாவசிய உணவு விலைகள், LPG/பெட்ரோல் மற்றும் TRAI மொபைல் டேட்டா கட்டணங்களை வருமானத்துடன் ஒப்பிடுக.',
      workforceKicker: '06. வேலைவாய்ப்பு, திறன் & பணியாளர் தரவு',
      workforceTitle: 'தொழிலாளர் பங்கேற்பு (PLFS), EPFO & திறன் பாரத்',
      workforceSubtitle:
        'MoSPI PLFS, EPFO முறையான வேலைவாய்ப்பு மற்றும் Skill Bharat முடிவுகள் — ILO மற்றும் IMF பகுப்பாய்வுகளுடன்.',
      schemesKicker: '07. குடிமக்கள் திட்ட தகுதித் தேடல்',
      schemesTitle: 'உங்கள் சுயவிவரத்திற்கான மத்திய அரசுத் திட்டங்களைக் கண்டறியவும்',
      schemesSubtitle:
        'பாரத அரசின் myScheme இணையதள மாதிரியில் தகுதி, பயன்கள் மற்றும் நேரடி .gov.in இணைப்புகளைப் பார்க்கவும்.',
      lawsKicker: '08. முக்கிய சட்டங்கள் & கொள்கைச் சீர்திருத்தங்கள்',
      lawsTitle: 'முக்கிய சட்டங்கள் மற்றும் கட்டமைப்பு சீர்திருத்தங்கள் (2014–2026)',
      lawsSubtitle:
        'PIB அதிகாரப்பூர்வ நோக்கங்களுடன் PRS Legislative Research நாடாளுமன்ற விவாதச் சுருக்கங்கள்.',
      civicKicker: '09. குடிமக்கள் சேவை & பொதுப் புகார் வழிகாட்டி',
      civicTitle: 'எம்.பி. செயல்பாடு, CPGRAMS புகார் & ஆன்லைன் RTI',
      civicSubtitle:
        'எம்.பி. வருகையைச் சரிபார்க்க, ஆன்லைனில் RTI தாக்கல் செய்ய மற்றும் உள்ளூர் பணிகளைப் பார்க்க அதிகாரப்பூர்வ கருவிகள்.',
      defenceKicker: '10. பாதுகாப்பு, விண்வெளி & உலகளாவிய நிலை',
      defenceTitle: 'பாதுகாப்புத் தன்னிறைவு, இஸ்ரோ திட்டங்கள் & உலகளாவிய வர்த்தகம்',
      defenceSubtitle:
        'உள்நாட்டு பாதுகாப்பு உற்பத்தி & ஏற்றுமதி, இஸ்ரோ பயணங்கள், RBI அந்நியச் செலாவணி மற்றும் வர்த்தக ஒப்பந்தங்கள்.',
      globalPeersKicker: '11. பாரத் vs உலகப் பொருளாதாரங்கள்',
      globalPeersTitle: 'முக்கிய உலகப் பொருளாதாரங்களுடன் பாரத் ஒப்பீடு',
      globalPeersSubtitle:
        'IMF, உலக வங்கி மற்றும் UNDP HDI தரவுகளின்படி சீனா, வியட்நாம், இந்தோனேசியா, அமெரிக்கா மற்றும் ஐரோப்பிய ஒன்றியத்துடன் ஒப்பீடு.',
      fiscalKicker: '12. நிதி ஆரோக்கியம் & பொதுப் பொறுப்புணர்வு',
      fiscalTitle: 'நிதிப் பற்றாக்குறை, கடன், பணவீக்கம் & தணிக்கை பார்வை',
      fiscalSubtitle:
        'மத்திய நிதிப் பற்றாக்குறை, கடன்-GDP விகிதம், உணவுப் பணவீக்கம் மற்றும் CAG/PRS மதிப்பீடுகள்.',
    },
  },
  bn: {
    brand: 'ভারত উন্নয়ন অ্যাটলাস',
    nav: {
      overview: 'মূল পাতা',
      indicators: 'সূচকসমূহ',
      statesBudget: 'রাজ্য ও বাজেট',
      schemesLaws: 'প্রকল্প ও আইন',
      defenceRoadmap: 'প্রতিরক্ষা ও ২০৪৭',
      fiscalSources: 'রাজস্ব ও উৎস',
    },
    actions: {
      exportCsv: 'CSV ডাউনলোড',
      exploreIndicators: '২২টি সরকারি সূচক দেখুন',
      readContext: 'স্বাধীন বিশ্লেষণ পড়ুন',
      backToTop: 'উপরে যান',
      downloadDataset: 'সম্পূর্ণ ডেটাসেট ডাউনলোড (CSV)',
      resetFilters: 'ফিল্টার রিসেট করুন',
    },
    workspace: {
      allModules: 'মূল পাতা',
      policyNews: 'নীতি ও খবর',
      indicators: 'জাতীয় তথ্য',
      statesBudget: 'রাজ্য ও বাজেট',
      schemesLaws: 'প্রকল্প ও আইন',
      defenceRoadmap: 'প্রতিরক্ষা ও ২০৪৭',
      fiscalSources: 'রাজস্ব ও উৎস',
      languageLabel: 'ভাষা',
      themeLabel: 'থিম',
      lightMode: 'হালকা',
      darkMode: 'গাঢ়',
    },
    hero: {
      kicker1: 'ভারত সরকারের সরকারি তথ্য',
      kicker2: '২০১৪–২০২৬ ও ভিশন ২০৪৭',
      kicker3: 'স্বাধীন প্রাতিষ্ঠানিক বিশ্লেষণ',
      headline: 'ভারতের অর্থনৈতিক, সামাজিক ও পরিকাঠামো খতিয়ান — ২০১৪ থেকে ২০৪৭',
      deck: 'PIB, অর্থ মন্ত্রক (কেন্দ্রীয় বাজেট ও অর্থনৈতিক সমীক্ষা), MoSPI, NPCI এবং নীতি আয়োগের সরকারি পরিসংখ্যান — PRS, CAG, IMF, বিশ্বব্যাংক ও RBI-এর স্বাধীন মূল্যায়নের পাশাপাশি।',
      comparatorTitle: 'তুলনামূলক চিত্র (২০১৪ বনাম ২০২৬)',
    },
    sections: {
      policyNewsKicker: 'লাইভ ফিড · PIB ও অর্থনৈতিক সংবাদ',
      policyNewsTitle: 'নীতি ও উন্নয়ন সংবাদ',
      policyNewsSubtitle:
        'PIB, ভারতীয় রিজার্ভ ব্যাংক এবং প্রধান ভারতীয় অর্থনৈতিক পোর্টাল থেকে সাম্প্রতিক সরকারি ঘোষণা, মন্ত্রিসভার সিদ্ধান্ত ও অর্থনৈতিক সংবাদ।',
      timeSeriesKicker: '০১. দীর্ঘমেয়াদী তথ্য',
      timeSeriesTitle: 'বহু-বছরের বৃদ্ধির গতিপথ (২০১৪–২০২৬)',
      ledgerKicker: '০২. সরকারি সূচক তালিকা',
      ledgerTitle: '২০১৪ ভিত্তিবর্ষ বনাম সাম্প্রতিক সরকারি মাইলফলক',
      statesKicker: '০৩. ইন্টারঅ্যাক্টিভ ভারত মানচিত্র ও রাজ্য এক্সপ্লোরার',
      statesTitle: 'ভারতের রাজ্য ও কেন্দ্রশাসিত অঞ্চলের আঞ্চলিক অগ্রগতি',
      statesSubtitle:
        'ভারতের মানচিত্রে যেকোনো রাজ্যে ক্লিক করুন অথবা MoSPI, জল জীবন মিশন ও MNRE তথ্যের তুলনা দেখুন।',
      budgetKicker: '০৪. কেন্দ্রীয় বাজেট এক্সপ্লোরার',
      budgetTitle: 'প্রতিটি টাকা কোথা থেকে আসে এবং কোথায় যায় (২০২৫–২৭)',
      budgetSubtitle:
        'অর্থ মন্ত্রকের রাজস্ব উৎস, ব্যয় বণ্টন, মন্ত্রকভিত্তিক বরাদ্দ এবং ব্যক্তিগত কর-টাকা ক্যালকুলেটর।',
      costLivingKicker: '০৫. দৈনন্দিন জীবনযাত্রার ব্যয় ও পারিবারিক বাজেট',
      costLivingTitle: 'খাদ্যদ্রব্য, জ্বালানি, ডেটা ও মাথাপিছু আয় (২০১৪–২০২৬)',
      costLivingSubtitle:
        'সরকারি খুচরা খাদ্যমূল্য, PPAC এলপিজি/পেট্রোল দর এবং TRAI মোবাইল ডেটা ব্যয়ের সাথে মাথাপিছু আয়ের তুলনা।',
      workforceKicker: '০৬. কর্মসংস্থান, দক্ষতা ও শ্রমশক্তি ড্যাশবোর্ড',
      workforceTitle: 'শ্রমশক্তি (PLFS), EPFO পেরোল ও স্কিল ভারত',
      workforceSubtitle:
        'MoSPI PLFS সমীক্ষা, EPFO আনুষ্ঠানিক কর্মসংস্থান এবং Skill Bharat ফলাফল — ILO ও IMF বিশ্লেষণসহ।',
      schemesKicker: '০৭. নাগরিক প্রকল্প যোগ্যতা সন্ধানকারী',
      schemesTitle: 'আপনার প্রোফাইল অনুযায়ী কেন্দ্রীয় সরকারি প্রকল্প খুঁজুন',
      schemesSubtitle:
        'ভারত সরকারের myScheme পোর্টালের আদলে যোগ্যতা, সুবিধা এবং সরাসরি .gov.in আবেদন লিঙ্ক দেখুন।',
      lawsKicker: '০৮. উল্লেখযোগ্য আইন ও নীতি সংস্কার',
      lawsTitle: 'প্রধান আইন ও কাঠামোগত সংস্কার (২০১৪–২০২৬)',
      lawsSubtitle:
        'PIB-এর সরকারি উদ্দেশ্যের পাশাপাশি PRS Legislative Research-এর সংসদীয় বিতর্ক ও বিশেষজ্ঞ মতামত।',
      civicKicker: '০৯. নাগরিক অধিকার ও জনপরিষেবা নির্দেশিকা',
      civicTitle: 'সাংসদ রেকর্ড, CPGRAMS অভিযোগ ও অনলাইন RTI',
      civicSubtitle:
        'সাংসদের উপস্থিতি যাচাই, অনলাইন RTI আবেদন, CPGRAMS অভিযোগ ও স্থানীয় উন্নয়ন কাজ দেখার সরকারি পোর্টাল।',
      defenceKicker: '১০. প্রতিরক্ষা, মহাকাশ ও বৈশ্বিক অবস্থান',
      defenceTitle: 'প্রতিরক্ষা স্বনির্ভরতা, ইসরো অভিযান ও আন্তর্জাতিক বাণিজ্য',
      defenceSubtitle:
        'দেশীয় প্রতিরক্ষা উৎপাদন ও রপ্তানি, ইসরো মহাকাশ অভিযান, RBI বৈদেশিক মুদ্রা ভাণ্ডার এবং বাণিজ্য চুক্তি।',
      globalPeersKicker: '১১. ভারত বনাম প্রধান বৈশ্বিক অর্থনীতি',
      globalPeersTitle: 'বৈশ্বিক প্রধান অর্থনীতিগুলোর তুলনায় ভারত',
      globalPeersSubtitle:
        'IMF, বিশ্বব্যাংক ও UNDP HDI তথ্য অনুযায়ী চীন, ভিয়েতনাম, ইন্দোনেশিয়া, যুক্তরাষ্ট্র ও ইউরোপীয় ইউনিয়নের সাথে তুলনা।',
      fiscalKicker: '১২. রাজস্ব স্বাস্থ্য ও জনদায়বদ্ধতা',
      fiscalTitle: 'রাজস্ব ঘাটতি, ঋণ, মুদ্রাস্ফীতি ও নিরীক্ষা পর্যবেক্ষণ',
      fiscalSubtitle:
        'কেন্দ্রীয় রাজস্ব ঘাটতি, ঋণ-জিডিপি অনুপাত, খাদ্য মুদ্রাস্ফীতি এবং CAG/PRS প্রাতিষ্ঠানিক পর্যালোচনা।',
    },
  },
};
