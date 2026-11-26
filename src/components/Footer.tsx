import { ArrowUp, Download } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface FooterProps {
  onExportCsv: () => void;
}

export default function Footer({ onExportCsv }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="md:col-span-7">
            <div className="font-serif text-lg font-semibold text-slate-950 dark:text-slate-50">
              {t.brand}
            </div>
            <p className="mt-2 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Methodology &amp; Neutrality Note: Figures reflect published
              releases from official Government of Bharat sources (PIB, MoSPI,
              Ministry of Finance Union Budget &amp; Economic Survey, NPCI,
              MNRE, MoRTH, Ministry of Jal Shakti, Ministry of Defence, ISRO,
              PPAC, TRAI, Dept. of Consumer Affairs, EPFO, NITI Aayog, and RBI)
              for the 2014–2026 period and official 2030/2047 roadmap documents,
              presented alongside independent institutional reviews from PRS
              Legislative Research, CAG, ILO, IMF, UNDP, and the World Bank.
              Provisional estimates are subject to official revision by
              statistical agencies.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row md:justify-end items-start sm:items-center gap-3">
            <button
              type="button"
              onClick={onExportCsv}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-[#F8FAFC] dark:bg-[#162033] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.actions.downloadDataset}</span>
            </button>

            <a
              href="#top"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              <span>{t.actions.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Public Data Reference Portal · Compiled 2026</span>
          <span>
            Sources attributed inline per indicator · No partisan scoring or
            unverified estimates
          </span>
        </div>
      </div>
    </footer>
  );
}
