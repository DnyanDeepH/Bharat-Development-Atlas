import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Download, Printer } from 'lucide-react';
import { INDICATOR_LEDGER } from '../data/developmentData';
import {
  STATE_PROFILES,
  UNION_BUDGET_YEARS,
} from '../data/extendedModulesData';
import {
  NATIONAL_SDG_AVERAGE,
  STATE_SDG_SCORES,
} from '../data/advancedModulesData';

type CardMode = 'state' | 'indicator' | 'budget';
type CardTheme = 'light' | 'dark';

interface FactCardStudioSectionProps {
  initialStateId?: string;
}

interface CardMetricCell {
  label: string;
  value: string;
  sub?: string;
}

interface FactCardModel {
  kicker: string;
  title: string;
  subtitle: string;
  metrics: CardMetricCell[];
  takeawayLabel: string;
  takeawayText: string;
  contextText?: string;
  sources: string;
  filenameSlug: string;
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
): number {
  const words = text.split(' ');
  let line = '';
  let linesDrawn = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + (line ? ' ' : '') + words[n];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      linesDrawn += 1;
      if (linesDrawn >= maxLines) {
        ctx.fillText(line.trim() + '…', x, y);
        return y + lineHeight;
      }
      ctx.fillText(line, x, y);
      line = words[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

export default function FactCardStudioSection({
  initialStateId,
}: FactCardStudioSectionProps) {
  const [mode, setMode] = useState<CardMode>('state');
  const [cardTheme, setCardTheme] = useState<CardTheme>('light');
  const [includeContext, setIncludeContext] = useState<boolean>(true);
  const [stateId, setStateId] = useState<string>(
    initialStateId ?? 'maharashtra'
  );

  useEffect(() => {
    if (initialStateId && STATE_PROFILES.some((s) => s.id === initialStateId)) {
      setStateId(initialStateId);
      setMode('state');
    }
  }, [initialStateId]);
  const [indicatorId, setIndicatorId] = useState<string>(
    INDICATOR_LEDGER[0].id
  );
  const [budgetYear, setBudgetYear] = useState<string>(
    UNION_BUDGET_YEARS[UNION_BUDGET_YEARS.length - 1].fiscalYear
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const cardModel = useMemo<FactCardModel>(() => {
    if (mode === 'state') {
      const st =
        STATE_PROFILES.find((s) => s.id === stateId) ?? STATE_PROFILES[0];
      const sdg = STATE_SDG_SCORES[st.id] ?? NATIONAL_SDG_AVERAGE;
      return {
        kicker: `BHARAT DEVELOPMENT ATLAS · STATE / UT FACT CARD (${st.region.toUpperCase()})`,
        title: st.name,
        subtitle: `Official State & UT Development Profile · NITI Aayog SDG Score ${sdg}/100 (All-Bharat Avg: ${NATIONAL_SDG_AVERAGE})`,
        metrics: [
          {
            label: 'Per-Capita NSDP',
            value: st.perCapitaDisplay,
            sub: 'MoSPI / RBI',
          },
          {
            label: 'Rural Tap Water',
            value: st.tapWaterDisplay,
            sub: 'Jal Jeevan Mission',
          },
          {
            label: 'Literacy Rate',
            value: `${st.literacyPct}%`,
            sub: 'NSO / PLFS',
          },
          {
            label: 'National Highways',
            value: `${st.highwaysKm.toLocaleString('en-IN')} km`,
            sub: 'MoRTH',
          },
          {
            label: 'Renewable Capacity',
            value: `${st.renewableGw} GW`,
            sub: 'MNRE',
          },
          {
            label: 'SDG Bharat Index',
            value: `${sdg} / 100`,
            sub: 'NITI Aayog 2023–24',
          },
        ],
        takeawayLabel: 'Development Highlights',
        takeawayText: st.keyFocus,
        contextText:
          'State indicators reflect official latest published reporting series from MoSPI, Jal Jeevan Mission, MNRE, MoRTH, and NITI Aayog.',
        sources: `${st.officialNote} · NITI Aayog SDG Index`,
        filenameSlug: `bharat-fact-card-${st.id}`,
      };
    }

    if (mode === 'indicator') {
      const ind =
        INDICATOR_LEDGER.find((i) => i.id === indicatorId) ??
        INDICATOR_LEDGER[0];
      return {
        kicker: `BHARAT DEVELOPMENT ATLAS · OFFICIAL INDICATOR (${ind.sectorLabel.toUpperCase()})`,
        title: ind.name,
        subtitle: `Decade-Scale Progress (${ind.baselineYear} to ${ind.latestYear}) · Unit: ${ind.unit}`,
        metrics: [
          {
            label: `Baseline (${ind.baselineYear})`,
            value: ind.baselineDisplay,
            sub: 'Reference period',
          },
          {
            label: `Latest (${ind.latestYear})`,
            value: ind.latestDisplay,
            sub: 'Latest official figure',
          },
          {
            label: 'Scale / Shift',
            value: ind.changeLabel,
            sub: ind.sectorLabel,
          },
        ],
        takeawayLabel: 'Official Summary',
        takeawayText: ind.summary,
        contextText: ind.contextNote,
        sources: ind.officialSource,
        filenameSlug: `bharat-indicator-${ind.id}`,
      };
    }

    const budget =
      UNION_BUDGET_YEARS.find((b) => b.fiscalYear === budgetYear) ??
      UNION_BUDGET_YEARS[0];
    const topRev = [...budget.rupeeComesFrom]
      .sort((a, b) => b.paise - a.paise)
      .slice(0, 3);
    const topExp = [...budget.rupeeGoesTo]
      .sort((a, b) => b.paise - a.paise)
      .slice(0, 3);

    return {
      kicker: `BHARAT DEVELOPMENT ATLAS · UNION BUDGET SNAPSHOT (${budget.label.toUpperCase()})`,
      title: `Union Budget ${budget.label}`,
      subtitle: `Total Expenditure: ₹${budget.totalExpenditureLakhCr} Lakh Crore · Non-Debt Receipts: ₹${budget.nonDebtReceiptsLakhCr} Lakh Crore`,
      metrics: [
        {
          label: 'Total Expenditure',
          value: `₹${budget.totalExpenditureLakhCr}L Cr`,
          sub: budget.label,
        },
        {
          label: 'Non-Debt Receipts',
          value: `₹${budget.nonDebtReceiptsLakhCr}L Cr`,
          sub: 'Tax & non-tax inflows',
        },
        {
          label: 'Fiscal Deficit',
          value: `${budget.fiscalDeficitPct}% GDP`,
          sub: 'Ministry of Finance',
        },
        ...topRev.map((r) => ({
          label: `Revenue: ${r.label}`,
          value: `${r.paise} paise`,
          sub: 'Per ₹1 collected',
        })),
      ],
      takeawayLabel: 'Top Expenditure Allocations (Per ₹1 Spent)',
      takeawayText: topExp
        .map((e) => `${e.label}: ${e.paise}p`)
        .join('  ·  '),
      contextText: `Fiscal deficit target stands at ${budget.fiscalDeficitPct}% of GDP with total expenditure of ₹${budget.totalExpenditureLakhCr} Lakh Crore. States’ tax devolution and interest payments represent the two largest shares of every rupee spent.`,
      sources: budget.source,
      filenameSlug: `bharat-union-budget-${budget.fiscalYear.replace(/[^a-zA-Z0-9]/g, '-')}`,
    };
  }, [mode, stateId, indicatorId, budgetYear]);

  const handleDownloadPng = () => {
    const canvas = document.createElement('canvas');
    const width = 1200;
    const height = 675;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dark = cardTheme === 'dark';
    const bg = dark ? '#0B1120' : '#FFFFFF';
    const surface = dark ? '#111827' : '#F8FAFC';
    const border = dark ? '#1E293B' : '#E2E8F0';
    const textPrimary = dark ? '#F8FAFC' : '#0F172A';
    const textSecondary = dark ? '#94A3B8' : '#475569';
    const accent = dark ? '#60A5FA' : '#1E3A8A';

    // Canvas Background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Outer frame border
    ctx.strokeStyle = border;
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, width - 48, height - 48);

    // Top Accent Line
    ctx.fillStyle = accent;
    ctx.fillRect(24, 24, width - 48, 6);

    // Kicker
    ctx.fillStyle = accent;
    ctx.font = '600 16px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(cardModel.kicker, 64, 78);

    // Title
    ctx.fillStyle = textPrimary;
    ctx.font = '700 40px Georgia, serif';
    ctx.fillText(cardModel.title.slice(0, 46), 64, 130);

    // Subtitle
    ctx.fillStyle = textSecondary;
    ctx.font = '400 18px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(cardModel.subtitle.slice(0, 96), 64, 164);

    // Metric Cells Grid (3 columns)
    const cols = 3;
    const cellW = 340;
    const cellH = cardModel.metrics.length > 3 ? 104 : 132;
    const gapX = 26;
    const gapY = 20;
    const startX = 64;
    const startY = 196;

    cardModel.metrics.forEach((m, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = startX + col * (cellW + gapX);
      const y = startY + row * (cellH + gapY);

      ctx.fillStyle = surface;
      ctx.fillRect(x, y, cellW, cellH);
      ctx.strokeStyle = border;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, cellW, cellH);

      ctx.fillStyle = textSecondary;
      ctx.font = '600 14px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText(m.label.slice(0, 32), x + 20, y + 30);

      ctx.fillStyle = accent;
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText(m.value.slice(0, 22), x + 20, y + 68);

      if (m.sub) {
        ctx.fillStyle = textSecondary;
        ctx.font = '400 13px "Plus Jakarta Sans", system-ui, sans-serif';
        ctx.fillText(m.sub.slice(0, 34), x + 20, y + 92);
      }
    });

    const rowsCount = Math.ceil(cardModel.metrics.length / cols);
    let textY = startY + rowsCount * (cellH + gapY) + 18;

    // Takeaway Section
    ctx.fillStyle = textPrimary;
    ctx.font = '700 15px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(cardModel.takeawayLabel, 64, textY);
    textY += 24;

    ctx.fillStyle = textSecondary;
    ctx.font = '400 16px "Plus Jakarta Sans", system-ui, sans-serif';
    textY = wrapCanvasText(
      ctx,
      cardModel.takeawayText,
      64,
      textY,
      width - 128,
      23,
      2
    );

    if (includeContext && cardModel.contextText) {
      textY += 8;
      ctx.fillStyle = textSecondary;
      ctx.font = 'italic 14px "Plus Jakarta Sans", system-ui, sans-serif';
      wrapCanvasText(
        ctx,
        `Context: ${cardModel.contextText}`,
        64,
        textY,
        width - 128,
        20,
        2
      );
    }

    // Footer Source Bar
    ctx.strokeStyle = border;
    ctx.beginPath();
    ctx.moveTo(64, height - 74);
    ctx.lineTo(width - 64, height - 74);
    ctx.stroke();

    ctx.fillStyle = textSecondary;
    ctx.font = '500 14px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText(`Sources: ${cardModel.sources}`, 64, height - 46);

    ctx.fillStyle = accent;
    ctx.font = '700 14px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('Bharat Development Atlas (2014–2026)', width - 64, height - 46);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${cardModel.filenameSlug}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadMsg(`Downloaded ${cardModel.filenameSlug}.png`);
    window.setTimeout(() => setDownloadMsg(null), 3000);
  };

  const handleCopyCitation = async () => {
    const lines = [
      `${cardModel.title} — Bharat Development Atlas`,
      cardModel.subtitle,
      '',
      ...cardModel.metrics.map((m) => `• ${m.label}: ${m.value}${m.sub ? ` (${m.sub})` : ''}`),
      '',
      `${cardModel.takeawayLabel}: ${cardModel.takeawayText}`,
      ...(includeContext && cardModel.contextText
        ? [`Context: ${cardModel.contextText}`]
        : []),
      `Sources: ${cardModel.sources}`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API blocked in sandbox
      setDownloadMsg('Select and copy the preview text directly.');
      window.setTimeout(() => setDownloadMsg(null), 2500);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const isDarkCard = cardTheme === 'dark';

  return (
    <section
      id="fact-cards"
      className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 print:hidden">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Shareable Data Briefings · Source-Cited 16:9 PNG Export · Printable PDF Layout
        </div>
        <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-tight">
          Shareable Fact Cards & Printable Report Studio
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Generate clean, official source-cited fact cards for any of Bharat’s 36 states/UTs, 22 national indicators, or Union Budget editions. Download a crisp 1200×675 PNG image for presentations and messaging, copy citation text, or print a clean PDF report.
        </p>
      </div>

      {/* Controls + Live Preview */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Controls (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-5 print:hidden">
          <div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
              1. Choose Briefing Type
            </div>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              {(
                [
                  { id: 'state', label: 'State / UT' },
                  { id: 'indicator', label: 'Indicator' },
                  { id: 'budget', label: 'Budget' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id)}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    mode === tab.id
                      ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dataset Picker */}
          <div>
            <label
              htmlFor="fact-card-dataset"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              2. Select Subject
            </label>
            {mode === 'state' && (
              <select
                id="fact-card-dataset"
                value={stateId}
                onChange={(e) => setStateId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50"
              >
                {STATE_PROFILES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.region})
                  </option>
                ))}
              </select>
            )}
            {mode === 'indicator' && (
              <select
                id="fact-card-dataset"
                value={indicatorId}
                onChange={(e) => setIndicatorId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50"
              >
                {INDICATOR_LEDGER.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            )}
            {mode === 'budget' && (
              <select
                id="fact-card-dataset"
                value={budgetYear}
                onChange={(e) => setBudgetYear(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-950 dark:text-slate-50"
              >
                {UNION_BUDGET_YEARS.map((b) => (
                  <option key={b.fiscalYear} value={b.fiscalYear}>
                    Union Budget {b.fiscalYear} (₹{b.totalExpenditureLakhCr}L Cr)
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Card Appearance */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              3. Card Style & Details
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setCardTheme('light')}
                className={`py-2 text-xs font-medium rounded-lg border cursor-pointer ${
                  cardTheme === 'light'
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                    : 'bg-[#F8FAFC] dark:bg-[#162033] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Institutional Light
              </button>
              <button
                type="button"
                onClick={() => setCardTheme('dark')}
                className={`py-2 text-xs font-medium rounded-lg border cursor-pointer ${
                  cardTheme === 'dark'
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                    : 'bg-[#F8FAFC] dark:bg-[#162033] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Midnight Slate
              </button>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={includeContext}
                onChange={(e) => setIncludeContext(e.target.checked)}
                className="accent-[#1E3A8A] dark:accent-[#3B82F6]"
              />
              <span>Include official / independent context note</span>
            </label>
          </div>

          {/* Export Buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
            <button
              type="button"
              onClick={handleDownloadPng}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1E3A8A] dark:bg-[#2563EB] hover:bg-[#172E6E] dark:hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download Fact Card (PNG · 1200×675)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handlePrintPdf}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-700 hover:border-[#1E3A8A] rounded-lg transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Print / Save PDF</span>
              </button>

              <button
                type="button"
                onClick={handleCopyCitation}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-700 hover:border-[#1E3A8A] rounded-lg transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>
            </div>

            {downloadMsg && (
              <div
                role="status"
                className="text-xs font-medium text-emerald-700 dark:text-emerald-400"
              >
                {downloadMsg}
              </div>
            )}
          </div>
        </div>

        {/* Live Fact Card Preview (8 cols) — Also serves as Printable Report Sheet */}
        <div className="lg:col-span-8">
          <div
            id="printable-fact-card"
            className={`rounded-2xl border overflow-hidden transition-colors ${
              isDarkCard
                ? 'bg-[#0B1120] border-slate-700 text-slate-50'
                : 'bg-white border-slate-200 text-slate-950'
            }`}
          >
            {/* Top Brand Accent Bar */}
            <div className="h-1.5 w-full bg-[#1E3A8A] dark:bg-[#3B82F6]" />

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div
                  className={`text-[11px] font-semibold tracking-wide ${
                    isDarkCard ? 'text-[#60A5FA]' : 'text-[#1E3A8A]'
                  }`}
                >
                  {cardModel.kicker}
                </div>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  {cardModel.title}
                </h3>
                <p
                  className={`mt-1.5 text-xs sm:text-sm ${
                    isDarkCard ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {cardModel.subtitle}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cardModel.metrics.map((m) => (
                  <div
                    key={m.label}
                    className={`p-4 rounded-xl border ${
                      isDarkCard
                        ? 'bg-[#111827] border-slate-800'
                        : 'bg-[#F8FAFC] border-slate-200'
                    }`}
                  >
                    <div
                      className={`text-xs font-medium ${
                        isDarkCard ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {m.label}
                    </div>
                    <div
                      className={`mt-1.5 font-mono text-xl font-bold tabular-nums ${
                        isDarkCard ? 'text-[#60A5FA]' : 'text-[#1E3A8A]'
                      }`}
                    >
                      {m.value}
                    </div>
                    {m.sub && (
                      <div
                        className={`mt-0.5 text-[11px] ${
                          isDarkCard ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {m.sub}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Summary & Context */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold">
                  {cardModel.takeawayLabel}
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkCard ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {cardModel.takeawayText}
                </p>
                {includeContext && cardModel.contextText && (
                  <p
                    className={`text-xs leading-relaxed italic ${
                      isDarkCard ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Context: {cardModel.contextText}
                  </p>
                )}
              </div>

              {/* Source Footer */}
              <div
                className={`pt-4 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
                  isDarkCard
                    ? 'border-slate-800 text-slate-400'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                <span>Sources: {cardModel.sources}</span>
                <span
                  className={`font-semibold ${
                    isDarkCard ? 'text-[#60A5FA]' : 'text-[#1E3A8A]'
                  }`}
                >
                  Bharat Development Atlas (2014–2026)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
