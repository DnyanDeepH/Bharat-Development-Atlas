import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Crosshair,
  ExternalLink,
  Grid3X3,
  Maximize2,
  RotateCcw,
  Tag,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  ANDAMAN_BOX,
  BHARAT_MAP_SHAPES,
  GRATICULE_LATS,
  GRATICULE_LONS,
  LAKSHADWEEP_BOX,
  TROPIC_OF_CANCER_Y,
  type BharatMapShape,
} from '../data/indiaMapGeo';
import type { IndianRegion, StateProfile } from '../data/extendedModulesData';
import { useTheme } from '../context/ThemeContext';

export type MapMetricKey =
  | 'perCapita'
  | 'tapWater'
  | 'renewable'
  | 'highways'
  | 'literacy';

interface IndiaChoroplethMapProps {
  states: StateProfile[];
  metric: MapMetricKey;
  regionFilter: 'All' | IndianRegion;
  primaryId: string;
  compareId: string;
  clickTarget: 'primary' | 'compare';
  onChangeClickTarget: (target: 'primary' | 'compare') => void;
  onSelectState: (stateId: string) => void;
}

interface ViewBoxRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const BASE_W = 600;
const BASE_H = 680;
const ASPECT = BASE_W / BASE_H;
const FULL_VIEWBOX: ViewBoxRect = { x: 0, y: 0, w: BASE_W, h: BASE_H };
const MIN_FOCUS_W = 124; // ~4.8x zoom ceiling for compact territories
const MIN_MANUAL_W = 96; // ~6.25x max manual zoom

const LIGHT_RAMP = ['#DBEAFE', '#93C5FD', '#3B82F6', '#1D4ED8', '#1E3A8A'];
const DARK_RAMP = ['#172554', '#1E3A8A', '#1D4ED8', '#3B82F6', '#60A5FA'];

const TEAL_LIGHT_RAMP = ['#CCFBF1', '#5EEAD4', '#14B8A6', '#0F766E', '#115E59'];
const TEAL_DARK_RAMP = ['#042F2E', '#115E59', '#0F766E', '#14B8A6', '#2DD4BF'];

const COMPACT_TERRITORY_IDS = [
  'delhi',
  'chandigarh',
  'goa',
  'sikkim',
  'puducherry',
  'dnh-dd',
  'lakshadweep',
  'andaman-nicobar',
] as const;

const DOT_MARKER_IDS = new Set([
  'delhi',
  'chandigarh',
  'dnh-dd',
  'puducherry',
  'lakshadweep',
]);

function clampViewBox(rect: ViewBoxRect): ViewBoxRect {
  const w = Math.max(MIN_MANUAL_W, Math.min(BASE_W, rect.w));
  const h = w / ASPECT;
  const maxX = Math.max(0, BASE_W - w);
  const maxY = Math.max(0, BASE_H - h);
  const x = Math.max(0, Math.min(maxX, rect.x));
  const y = Math.max(0, Math.min(maxY, rect.y));
  return { x, y, w, h };
}

function computeShapeFocusViewBox(shape: BharatMapShape): ViewBoxRect {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  if (shape.id === 'lakshadweep') {
    minX = LAKSHADWEEP_BOX.x1;
    maxX = LAKSHADWEEP_BOX.x2;
    minY = LAKSHADWEEP_BOX.y1;
    maxY = LAKSHADWEEP_BOX.y2;
  } else if (shape.id === 'andaman-nicobar') {
    minX = ANDAMAN_BOX.x1;
    maxX = ANDAMAN_BOX.x2;
    minY = ANDAMAN_BOX.y1;
    maxY = ANDAMAN_BOX.y2;
  } else {
    const regex = /(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(shape.path)) !== null) {
      const x = Number.parseFloat(match[1]);
      const y = Number.parseFloat(match[2]);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (!Number.isFinite(minX) || !Number.isFinite(minY)) {
    minX = shape.labelX - 20;
    maxX = shape.labelX + 20;
    minY = shape.labelY - 20;
    maxY = shape.labelY + 20;
  }

  const bboxW = Math.max(4, maxX - minX);
  const bboxH = Math.max(4, maxY - minY);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  // Frame state with surrounding neighboring border context
  const padFactor = 1.75;
  const neededWFromWidth = bboxW * padFactor;
  const neededWFromHeight = bboxH * padFactor * ASPECT;
  const targetW = Math.max(
    MIN_FOCUS_W,
    Math.min(BASE_W * 0.62, Math.max(neededWFromWidth, neededWFromHeight))
  );
  const targetH = targetW / ASPECT;

  return clampViewBox({
    x: cx - targetW / 2,
    y: cy - targetH / 2,
    w: targetW,
    h: targetH,
  });
}

function getMetricNumeric(
  state: StateProfile,
  metric: MapMetricKey
): number | null {
  switch (metric) {
    case 'perCapita':
      return state.perCapitaNsdpLakhs;
    case 'tapWater':
      return state.tapWaterPct;
    case 'renewable':
      return state.renewableGw;
    case 'highways':
      return state.highwaysKm;
    case 'literacy':
      return state.literacyPct;
  }
}

function formatMetricValue(state: StateProfile, metric: MapMetricKey): string {
  switch (metric) {
    case 'perCapita':
      return state.perCapitaDisplay;
    case 'tapWater':
      return state.tapWaterDisplay;
    case 'renewable':
      return `${state.renewableGw} GW`;
    case 'highways':
      return `${state.highwaysKm.toLocaleString('en-IN')} km`;
    case 'literacy':
      return `${state.literacyPct}%`;
  }
}

function getNationalRank(
  states: StateProfile[],
  stateId: string,
  metric: MapMetricKey
): { rank: number; total: number } | null {
  const valid = states
    .map((s) => ({ id: s.id, val: getMetricNumeric(s, metric) }))
    .filter((entry): entry is { id: string; val: number } => entry.val !== null)
    .sort((a, b) => b.val - a.val);

  const idx = valid.findIndex((entry) => entry.id === stateId);
  if (idx === -1) return null;
  return { rank: idx + 1, total: valid.length };
}

export default function IndiaChoroplethMap({
  states,
  metric,
  regionFilter,
  primaryId,
  compareId,
  clickTarget,
  onChangeClickTarget,
  onSelectState,
}: IndiaChoroplethMapProps) {
  const { isDark } = useTheme();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [viewBox, setViewBox] = useState<ViewBoxRect>(FULL_VIEWBOX);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showGraticule, setShowGraticule] = useState<boolean>(true);

  const viewBoxRef = useRef<ViewBoxRect>(FULL_VIEWBOX);
  const animFrameRef = useRef<number | null>(null);

  const animateViewBoxTo = useCallback((targetRaw: ViewBoxRect) => {
    const target = clampViewBox(targetRaw);
    if (animFrameRef.current !== null) {
      window.cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const start = viewBoxRef.current;
    const dx = target.x - start.x;
    const dy = target.y - start.y;
    const dw = target.w - start.w;
    const dh = target.h - start.h;

    if (
      Math.abs(dx) < 0.25 &&
      Math.abs(dy) < 0.25 &&
      Math.abs(dw) < 0.25 &&
      Math.abs(dh) < 0.25
    ) {
      viewBoxRef.current = target;
      setViewBox(target);
      return;
    }

    const durationMs = 360;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      // Cubic ease-out for crisp cartographic camera motion
      const eased = 1 - Math.pow(1 - t, 3);

      const next: ViewBoxRect = {
        x: start.x + dx * eased,
        y: start.y + dy * eased,
        w: start.w + dw * eased,
        h: start.h + dh * eased,
      };
      viewBoxRef.current = next;
      setViewBox(next);

      if (t < 1) {
        animFrameRef.current = window.requestAnimationFrame(step);
      } else {
        viewBoxRef.current = target;
        setViewBox(target);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = window.requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    return () => {
      if (animFrameRef.current !== null) {
        window.cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const stateMap = useMemo(() => {
    const map = new Map<string, StateProfile>();
    states.forEach((s) => map.set(s.id, s));
    return map;
  }, [states]);

  const focusBoxMap = useMemo(() => {
    const map = new Map<string, ViewBoxRect>();
    BHARAT_MAP_SHAPES.forEach((shape) => {
      map.set(shape.id, computeShapeFocusViewBox(shape));
    });
    return map;
  }, []);

  const nationalBenchmarks = useMemo(() => {
    const validPerCapita = states
      .map((s) => s.perCapitaNsdpLakhs)
      .filter((v): v is number => v !== null);
    const validTapWater = states
      .map((s) => s.tapWaterPct)
      .filter((v): v is number => v !== null);
    const totalRenewable = states.reduce((acc, s) => acc + s.renewableGw, 0);
    const maxHighways = Math.max(...states.map((s) => s.highwaysKm));
    const maxPerCapita = Math.max(...validPerCapita);
    const maxRenewable = Math.max(...states.map((s) => s.renewableGw));
    const avgPerCapita =
      validPerCapita.reduce((a, b) => a + b, 0) / validPerCapita.length;
    const avgTapWater =
      validTapWater.reduce((a, b) => a + b, 0) / validTapWater.length;
    const avgLiteracy =
      states.reduce((a, s) => a + s.literacyPct, 0) / states.length;

    return {
      avgPerCapita,
      avgTapWater,
      avgLiteracy,
      totalRenewable,
      maxPerCapita,
      maxRenewable,
      maxHighways,
    };
  }, [states]);

  const handleResetView = useCallback(() => {
    setFocusedId(null);
    animateViewBoxTo(FULL_VIEWBOX);
  }, [animateViewBoxTo]);

  // Exit focus if active region filter excludes the currently focused state
  useEffect(() => {
    if (!focusedId || regionFilter === 'All') return;
    const focused = stateMap.get(focusedId);
    if (focused && focused.region !== regionFilter) {
      setFocusedId(null);
      animateViewBoxTo(FULL_VIEWBOX);
    }
  }, [regionFilter, focusedId, stateMap, animateViewBoxTo]);

  // Support Escape key to smoothly zoom back out to Full Bharat view
  useEffect(() => {
    if (!focusedId && viewBox.w >= BASE_W - 1) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleResetView();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [focusedId, viewBox.w, handleResetView]);

  const handleStateClick = useCallback(
    (stateId: string) => {
      onSelectState(stateId);
      if (focusedId === stateId) {
        // Clicking the already-focused state toggles back out to full Bharat map
        setFocusedId(null);
        animateViewBoxTo(FULL_VIEWBOX);
        return;
      }
      const targetBox = focusBoxMap.get(stateId);
      setFocusedId(stateId);
      if (targetBox) {
        animateViewBoxTo(targetBox);
      }
    },
    [focusedId, focusBoxMap, onSelectState, animateViewBoxTo]
  );

  const handleFocusOnly = useCallback(
    (stateId: string) => {
      const targetBox = focusBoxMap.get(stateId);
      setFocusedId(stateId);
      if (targetBox) {
        animateViewBoxTo(targetBox);
      }
    },
    [focusBoxMap, animateViewBoxTo]
  );

  const handleZoomIn = () => {
    const cur = viewBoxRef.current;
    const nextW = Math.max(MIN_MANUAL_W, cur.w / 1.32);
    const nextH = nextW / ASPECT;
    const cx = cur.x + cur.w / 2;
    const cy = cur.y + cur.h / 2;
    animateViewBoxTo({
      x: cx - nextW / 2,
      y: cy - nextH / 2,
      w: nextW,
      h: nextH,
    });
  };

  const handleZoomOut = () => {
    const cur = viewBoxRef.current;
    const nextW = Math.min(BASE_W, cur.w * 1.32);
    if (nextW >= BASE_W - 6) {
      handleResetView();
      return;
    }
    const nextH = nextW / ASPECT;
    const cx = cur.x + cur.w / 2;
    const cy = cur.y + cur.h / 2;
    animateViewBoxTo({
      x: cx - nextW / 2,
      y: cy - nextH / 2,
      w: nextW,
      h: nextH,
    });
  };

  const effectiveZoom = BASE_W / viewBox.w;
  const isZoomed = effectiveZoom > 1.03 || focusedId !== null;
  const labelScale = 1 / Math.sqrt(effectiveZoom);

  const { minVal, maxVal, legendSteps } = useMemo(() => {
    const values = states
      .map((s) => getMetricNumeric(s, metric))
      .filter((v): v is number => v !== null);
    const min = Math.min(...values);
    const max = Math.max(...values);

    const fmt = (n: number) => {
      if (metric === 'perCapita') return `₹${n.toFixed(1)}L`;
      if (metric === 'renewable') return `${n.toFixed(0)} GW`;
      if (metric === 'highways') return `${(n / 1000).toFixed(1)}k`;
      return `${Math.round(n)}%`;
    };

    const step = (max - min) / 4;
    return {
      minVal: min,
      maxVal: max,
      legendSteps: [0, 1, 2, 3, 4].map((i) => fmt(min + step * i)),
    };
  }, [states, metric]);

  const useTealRamp = metric === 'tapWater' || metric === 'renewable';
  const ramp = useTealRamp
    ? isDark
      ? TEAL_DARK_RAMP
      : TEAL_LIGHT_RAMP
    : isDark
      ? DARK_RAMP
      : LIGHT_RAMP;

  const getFillColor = (state: StateProfile | undefined): string => {
    if (!state) return isDark ? '#1E293B' : '#E2E8F0';
    const val = getMetricNumeric(state, metric);
    if (val === null) return isDark ? '#334155' : '#CBD5E1';
    const ratio = maxVal === minVal ? 0.5 : (val - minVal) / (maxVal - minVal);
    const eased =
      metric === 'renewable' || metric === 'perCapita'
        ? Math.sqrt(Math.max(0, Math.min(1, ratio)))
        : Math.max(0, Math.min(1, ratio));
    const bucket = Math.min(4, Math.floor(eased * 5));
    return ramp[bucket];
  };

  const focusedState = focusedId ? stateMap.get(focusedId) ?? null : null;
  const inspectedState =
    stateMap.get(hoveredId ?? '') ??
    focusedState ??
    stateMap.get(primaryId) ??
    states[0];

  const compactTerritories = COMPACT_TERRITORY_IDS.map((id) =>
    stateMap.get(id)
  ).filter((s): s is StateProfile => Boolean(s));

  // Render focused/hovered/primary/compare polygons last so highlight strokes stay crisp on top
  const orderedShapes = useMemo(() => {
    return [...BHARAT_MAP_SHAPES].sort((a, b) => {
      const rank = (id: string) =>
        id === focusedId
          ? 4
          : id === hoveredId
            ? 3
            : id === primaryId
              ? 2
              : id === compareId
                ? 1
                : 0;
      return rank(a.id) - rank(b.id);
    });
  }, [focusedId, hoveredId, primaryId, compareId]);

  const focusedBreakdownRows = useMemo(() => {
    if (!focusedState) return [];
    const perCapitaRank = getNationalRank(states, focusedState.id, 'perCapita');
    const tapWaterRank = getNationalRank(states, focusedState.id, 'tapWater');
    const renewableRank = getNationalRank(states, focusedState.id, 'renewable');
    const highwaysRank = getNationalRank(states, focusedState.id, 'highways');
    const literacyRank = getNationalRank(states, focusedState.id, 'literacy');

    const renewableSharePct =
      nationalBenchmarks.totalRenewable > 0
        ? (focusedState.renewableGw / nationalBenchmarks.totalRenewable) * 100
        : 0;

    return [
      {
        key: 'perCapita' as MapMetricKey,
        label: 'Per-Capita NSDP',
        source: 'MoSPI / RBI',
        display: focusedState.perCapitaDisplay,
        rankText: perCapitaRank
          ? `#${perCapitaRank.rank} of ${perCapitaRank.total}`
          : 'UT N/A',
        contextText:
          focusedState.perCapitaNsdpLakhs !== null
            ? `${
                focusedState.perCapitaNsdpLakhs >= nationalBenchmarks.avgPerCapita
                  ? '+'
                  : ''
              }${(
                focusedState.perCapitaNsdpLakhs - nationalBenchmarks.avgPerCapita
              ).toFixed(2)}L vs. avg (₹${nationalBenchmarks.avgPerCapita.toFixed(
                2
              )}L)`
            : 'Standalone NSDP not published by MoSPI',
        pct:
          focusedState.perCapitaNsdpLakhs !== null
            ? Math.min(
                100,
                (focusedState.perCapitaNsdpLakhs /
                  nationalBenchmarks.maxPerCapita) *
                  100
              )
            : 0,
      },
      {
        key: 'tapWater' as MapMetricKey,
        label: 'Rural Tap Water (JJM)',
        source: 'Jal Jeevan Mission',
        display: focusedState.tapWaterDisplay,
        rankText: tapWaterRank
          ? `#${tapWaterRank.rank} of ${tapWaterRank.total}`
          : 'Urban NCT',
        contextText:
          focusedState.tapWaterPct !== null
            ? `All-Bharat state avg: ${Math.round(
                nationalBenchmarks.avgTapWater
              )}%`
            : 'Urban piped supply managed by Delhi Jal Board',
        pct: focusedState.tapWaterPct ?? 0,
      },
      {
        key: 'renewable' as MapMetricKey,
        label: 'Renewable Capacity',
        source: 'MNRE',
        display: `${focusedState.renewableGw} GW`,
        rankText: renewableRank
          ? `#${renewableRank.rank} of ${renewableRank.total}`
          : '—',
        contextText: `${renewableSharePct.toFixed(1)}% of Bharat total capacity`,
        pct: Math.min(
          100,
          (focusedState.renewableGw / nationalBenchmarks.maxRenewable) * 100
        ),
      },
      {
        key: 'highways' as MapMetricKey,
        label: 'National Highways',
        source: 'MoRTH',
        display: `${focusedState.highwaysKm.toLocaleString('en-IN')} km`,
        rankText: highwaysRank
          ? `#${highwaysRank.rank} of ${highwaysRank.total}`
          : '—',
        contextText: `Lead state: ${nationalBenchmarks.maxHighways.toLocaleString(
          'en-IN'
        )} km`,
        pct: Math.min(
          100,
          (focusedState.highwaysKm / nationalBenchmarks.maxHighways) * 100
        ),
      },
      {
        key: 'literacy' as MapMetricKey,
        label: 'Literacy Rate',
        source: 'NSO / PLFS',
        display: `${focusedState.literacyPct}%`,
        rankText: literacyRank
          ? `#${literacyRank.rank} of ${literacyRank.total}`
          : '—',
        contextText: `All-Bharat state avg: ${nationalBenchmarks.avgLiteracy.toFixed(
          1
        )}%`,
        pct: focusedState.literacyPct,
      },
    ];
  }, [focusedState, states, nationalBenchmarks]);

  const svgViewBoxString = `${viewBox.x.toFixed(2)} ${viewBox.y.toFixed(2)} ${viewBox.w.toFixed(2)} ${viewBox.h.toFixed(2)}`;

  return (
    <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between h-full">
      <div>
        {/* Map Control Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
              Official Map of Bharat (28 States &amp; 8 UTs)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click any state or UT to zoom in &amp; inspect its full local breakdown
            </p>
          </div>

          <div
            role="group"
            aria-label="Choose which comparison slot map clicks update"
            className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg"
          >
            <button
              type="button"
              onClick={() => onChangeClickTarget('primary')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                clickTarget === 'primary'
                  ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Set Primary
            </button>
            <button
              type="button"
              onClick={() => onChangeClickTarget('compare')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                clickTarget === 'compare'
                  ? 'bg-[#0F766E] dark:bg-[#0D9488] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              Set Compare
            </button>
          </div>
        </div>

        {/* Cartographic Layer & Zoom Toolbar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowLabels((v) => !v)}
              aria-pressed={showLabels}
              className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded border transition-colors cursor-pointer ${
                showLabels
                  ? 'bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-900 dark:border-slate-200'
                  : 'bg-[#F8FAFC] dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Tag className="w-3 h-3" aria-hidden="true" />
              <span>Codes</span>
            </button>
            <button
              type="button"
              onClick={() => setShowGraticule((v) => !v)}
              aria-pressed={showGraticule}
              className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded border transition-colors cursor-pointer ${
                showGraticule
                  ? 'bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-900 dark:border-slate-200'
                  : 'bg-[#F8FAFC] dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Grid3X3 className="w-3 h-3" aria-hidden="true" />
              <span>Lat/Lon Grid</span>
            </button>
            {!focusedState && stateMap.get(primaryId) && (
              <button
                type="button"
                onClick={() => handleFocusOnly(primaryId)}
                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-[#1E3A8A] dark:text-[#60A5FA] hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Crosshair className="w-3 h-3" aria-hidden="true" />
                <span>Focus {stateMap.get(primaryId)?.name.split(' ')[0]}</span>
              </button>
            )}
          </div>

          <div className="inline-flex items-center gap-1">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={effectiveZoom <= 1.02}
              aria-label="Zoom out map"
              className="p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <span className="px-1.5 text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
              {effectiveZoom.toFixed(1)}×
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={viewBox.w <= MIN_MANUAL_W + 1}
              aria-label="Zoom in map"
              className="p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            {isZoomed && (
              <button
                type="button"
                onClick={handleResetView}
                aria-label="Reset map zoom to full Bharat view"
                title="Reset to Full Bharat (Esc)"
                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* SVG Choropleth Viewport with Animated Camera Zoom-on-Click */}
        <div className="relative mt-3 overflow-hidden bg-[#F0F6FC] dark:bg-[#0B1526] border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 flex items-center justify-center">
          {/* Active Focus Camera Bar */}
          {focusedState && (
            <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-white/92 dark:bg-[#0F172A]/92 backdrop-blur-xs border border-slate-200/90 dark:border-slate-700/90 shadow-xs">
              <div className="flex items-center gap-2 min-w-0 text-xs">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1E3A8A] dark:text-[#60A5FA] shrink-0">
                  Focused
                </span>
                <span className="font-semibold text-slate-950 dark:text-slate-50 truncate">
                  {focusedState.name}
                </span>
                <span className="hidden sm:inline text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
                  · {focusedState.region} · {effectiveZoom.toFixed(1)}×
                </span>
              </div>

              <button
                type="button"
                onClick={handleResetView}
                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors shrink-0 cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" aria-hidden="true" />
                <span>Full Bharat</span>
              </button>
            </div>
          )}

          <div className="w-full max-w-[465px]">
            <svg
              viewBox={svgViewBoxString}
              role="img"
              aria-label="Official BharatMaps-aligned interactive choropleth map of Bharat displaying all 28 states and 8 union territories with click-to-zoom focus"
              className="w-full h-auto select-none block"
            >
              {/* Clickable Ocean Backdrop to Reset Zoom */}
              <rect
                x={0}
                y={0}
                width={BASE_W}
                height={BASE_H}
                fill="transparent"
                onClick={() => {
                  if (isZoomed) {
                    handleResetView();
                  }
                }}
              />

              {/* Subtle Graticule & Tropic of Cancer */}
              {showGraticule && (
                <g pointerEvents="none">
                  {GRATICULE_LATS.map((g) => (
                    <g key={`lat-${g.lat}`}>
                      <line
                        x1={10}
                        y1={g.y}
                        x2={590}
                        y2={g.y}
                        stroke={
                          isDark
                            ? 'rgba(148,163,184,0.14)'
                            : 'rgba(100,116,139,0.18)'
                        }
                        strokeWidth={0.75}
                        vectorEffect="non-scaling-stroke"
                        strokeDasharray="3 3"
                      />
                      <text
                        x={14}
                        y={g.y - 3 * labelScale}
                        fontSize={7.5 * labelScale}
                        fontFamily="var(--font-mono)"
                        fill={
                          isDark
                            ? 'rgba(148,163,184,0.55)'
                            : 'rgba(71,85,105,0.65)'
                        }
                      >
                        {g.lat}°N
                      </text>
                    </g>
                  ))}
                  {GRATICULE_LONS.map((g) => (
                    <g key={`lon-${g.lon}`}>
                      <line
                        x1={g.x}
                        y1={10}
                        x2={g.x}
                        y2={670}
                        stroke={
                          isDark
                            ? 'rgba(148,163,184,0.14)'
                            : 'rgba(100,116,139,0.18)'
                        }
                        strokeWidth={0.75}
                        vectorEffect="non-scaling-stroke"
                        strokeDasharray="3 3"
                      />
                      <text
                        x={g.x + 3 * labelScale}
                        y={666}
                        fontSize={7.5 * labelScale}
                        fontFamily="var(--font-mono)"
                        fill={
                          isDark
                            ? 'rgba(148,163,184,0.55)'
                            : 'rgba(71,85,105,0.65)'
                        }
                      >
                        {g.lon}°E
                      </text>
                    </g>
                  ))}
                  {/* Tropic of Cancer */}
                  <line
                    x1={10}
                    y1={TROPIC_OF_CANCER_Y}
                    x2={590}
                    y2={TROPIC_OF_CANCER_Y}
                    stroke={
                      isDark
                        ? 'rgba(251,191,36,0.32)'
                        : 'rgba(180,83,9,0.35)'
                    }
                    strokeWidth={0.9}
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray="5 4"
                  />
                  <text
                    x={584}
                    y={TROPIC_OF_CANCER_Y - 4 * labelScale}
                    textAnchor="end"
                    fontSize={7 * labelScale}
                    fontFamily="var(--font-mono)"
                    fill={
                      isDark
                        ? 'rgba(251,191,36,0.62)'
                        : 'rgba(180,83,9,0.75)'
                    }
                  >
                    Tropic of Cancer (23.5°N)
                  </text>
                </g>
              )}

              {/* Subtle Cartographic Sea Labels */}
              <g pointerEvents="none" opacity={isDark ? 0.45 : 0.55}>
                <text
                  x={78}
                  y={482}
                  textAnchor="middle"
                  fontSize={8.5 * labelScale}
                  letterSpacing="2"
                  fontFamily="var(--font-sans)"
                  fontWeight="600"
                  fill={isDark ? '#64748B' : '#475569'}
                >
                  ARABIAN
                </text>
                <text
                  x={78}
                  y={482 + 12 * labelScale}
                  textAnchor="middle"
                  fontSize={8.5 * labelScale}
                  letterSpacing="2"
                  fontFamily="var(--font-sans)"
                  fontWeight="600"
                  fill={isDark ? '#64748B' : '#475569'}
                >
                  SEA
                </text>
                <text
                  x={386}
                  y={482}
                  textAnchor="middle"
                  fontSize={8.5 * labelScale}
                  letterSpacing="2"
                  fontFamily="var(--font-sans)"
                  fontWeight="600"
                  fill={isDark ? '#64748B' : '#475569'}
                >
                  BAY OF
                </text>
                <text
                  x={386}
                  y={482 + 12 * labelScale}
                  textAnchor="middle"
                  fontSize={8.5 * labelScale}
                  letterSpacing="2"
                  fontFamily="var(--font-sans)"
                  fontWeight="600"
                  fill={isDark ? '#64748B' : '#475569'}
                >
                  BENGAL
                </text>
                <text
                  x={260}
                  y={652}
                  textAnchor="middle"
                  fontSize={8 * labelScale}
                  letterSpacing="2.4"
                  fontFamily="var(--font-sans)"
                  fontWeight="600"
                  fill={isDark ? '#64748B' : '#475569'}
                >
                  BHARAT MAHASAGAR
                </text>
              </g>

              {/* Island UT Cartographic Reference Frames */}
              <g pointerEvents="none">
                <rect
                  x={LAKSHADWEEP_BOX.x1}
                  y={LAKSHADWEEP_BOX.y1}
                  width={LAKSHADWEEP_BOX.x2 - LAKSHADWEEP_BOX.x1}
                  height={LAKSHADWEEP_BOX.y2 - LAKSHADWEEP_BOX.y1}
                  rx={4 * labelScale}
                  fill="none"
                  stroke={
                    isDark
                      ? 'rgba(148,163,184,0.28)'
                      : 'rgba(100,116,139,0.32)'
                  }
                  strokeWidth={0.8}
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="3 2"
                />
                <text
                  x={(LAKSHADWEEP_BOX.x1 + LAKSHADWEEP_BOX.x2) / 2}
                  y={LAKSHADWEEP_BOX.y2 + 10 * labelScale}
                  textAnchor="middle"
                  fontSize={7 * labelScale}
                  fontFamily="var(--font-mono)"
                  fill={isDark ? '#94A3B8' : '#475569'}
                >
                  Lakshadweep
                </text>

                <rect
                  x={ANDAMAN_BOX.x1}
                  y={ANDAMAN_BOX.y1}
                  width={ANDAMAN_BOX.x2 - ANDAMAN_BOX.x1}
                  height={ANDAMAN_BOX.y2 - ANDAMAN_BOX.y1}
                  rx={4 * labelScale}
                  fill="none"
                  stroke={
                    isDark
                      ? 'rgba(148,163,184,0.28)'
                      : 'rgba(100,116,139,0.32)'
                  }
                  strokeWidth={0.8}
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="3 2"
                />
                <text
                  x={(ANDAMAN_BOX.x1 + ANDAMAN_BOX.x2) / 2}
                  y={ANDAMAN_BOX.y1 - 5 * labelScale}
                  textAnchor="middle"
                  fontSize={7 * labelScale}
                  fontFamily="var(--font-mono)"
                  fill={isDark ? '#94A3B8' : '#475569'}
                >
                  Andaman &amp; Nicobar
                </text>
              </g>

              {/* Compass North Indicator (shown in unzoomed overview) */}
              {!focusedState && (
                <g transform="translate(556, 36)" pointerEvents="none">
                  <circle
                    cx={0}
                    cy={0}
                    r={14}
                    fill={
                      isDark
                        ? 'rgba(15,23,42,0.75)'
                        : 'rgba(255,255,255,0.85)'
                    }
                    stroke={isDark ? '#334155' : '#CBD5E1'}
                    strokeWidth={0.9}
                  />
                  <polygon
                    points="0,-9 -3.2,2 0,-0.5 3.2,2"
                    fill={isDark ? '#60A5FA' : '#1E3A8A'}
                  />
                  <polygon
                    points="0,9 -3.2,2 0,-0.5 3.2,2"
                    fill={isDark ? '#475569' : '#94A3B8'}
                  />
                  <text
                    x={0}
                    y={-17}
                    textAnchor="middle"
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                    fontWeight="700"
                    fill={isDark ? '#CBD5E1' : '#334155'}
                  >
                    N
                  </text>
                </g>
              )}

              {/* All 36 Official BharatMaps Survey of Bharat Polygons */}
              {orderedShapes.map((shape) => {
                const state = stateMap.get(shape.id);
                const isFocused = shape.id === focusedId;
                const isPrimary = shape.id === primaryId;
                const isCompare = shape.id === compareId;
                const isHovered = shape.id === hoveredId;
                const inRegion =
                  regionFilter === 'All' || state?.region === regionFilter;

                const fill = getFillColor(state);

                const strokeColor = isFocused
                  ? isDark
                    ? '#FDE047'
                    : '#0F172A'
                  : isPrimary
                    ? isDark
                      ? '#FACC15'
                      : '#0F172A'
                    : isCompare
                      ? isDark
                        ? '#2DD4BF'
                        : '#0F766E'
                      : isHovered
                        ? isDark
                          ? '#FFFFFF'
                          : '#1E293B'
                        : isDark
                          ? '#0B1120'
                          : '#FFFFFF';

                const strokeWidth = isFocused
                  ? 2.6
                  : isPrimary || isCompare
                    ? 2.0
                    : isHovered
                      ? 1.5
                      : 0.75;

                const opacity = !inRegion
                  ? 0.2
                  : focusedId
                    ? isFocused
                      ? 1
                      : isHovered
                        ? 0.85
                        : isCompare || isPrimary
                          ? 0.65
                          : 0.34
                    : 1;

                const showDotMarker = DOT_MARKER_IDS.has(shape.id);
                const canShowLabel =
                  showLabels &&
                  (!shape.isSmallCallout || isFocused || effectiveZoom >= 2.2);

                const baseFontSize = isFocused
                  ? 10.5 * labelScale
                  : 8.5 * labelScale;

                return (
                  <g
                    key={shape.id}
                    onMouseEnter={() => setHoveredId(shape.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStateClick(shape.id);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isFocused}
                    aria-label={`${state?.name ?? shape.name}: ${
                      state ? formatMetricValue(state, metric) : 'No data'
                    }. ${
                      isFocused
                        ? 'Currently focused; activate to zoom out'
                        : 'Activate to zoom in and inspect local metrics'
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleStateClick(shape.id);
                      }
                    }}
                    className="cursor-pointer outline-none"
                    style={{
                      opacity,
                      transition: 'opacity 180ms ease',
                    }}
                  >
                    <path
                      d={shape.path}
                      fill={fill}
                      fillRule="evenodd"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    {showDotMarker && (
                      <circle
                        cx={shape.labelX}
                        cy={shape.labelY}
                        r={
                          (isFocused || isPrimary || isCompare || isHovered
                            ? 4.6
                            : 3.2) * labelScale
                        }
                        fill={fill}
                        stroke={strokeColor}
                        strokeWidth={isFocused || isPrimary || isCompare ? 1.8 : 1.1}
                        vectorEffect="non-scaling-stroke"
                      />
                    )}
                    {canShowLabel && (
                      <text
                        x={shape.labelX}
                        y={
                          showDotMarker
                            ? shape.labelY - 8.5 * labelScale
                            : shape.labelY
                        }
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={baseFontSize}
                        fontFamily="var(--font-mono)"
                        fontWeight={
                          isFocused || isPrimary || isCompare ? '700' : '600'
                        }
                        fill={isDark ? '#F8FAFC' : '#0F172A'}
                        paintOrder="stroke"
                        stroke={
                          isDark
                            ? 'rgba(11,17,32,0.88)'
                            : 'rgba(255,255,255,0.92)'
                        }
                        strokeWidth={2.4 * labelScale}
                        pointerEvents="none"
                      >
                        {isFocused && effectiveZoom >= 1.9
                          ? state?.name.replace(' (NCT)', '') ?? shape.name
                          : shape.shortCode}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Compact States & Union Territories Direct Selector */}
        <div className="mt-3 space-y-1.5 text-xs">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Quick zoom &amp; select compact States &amp; Union Territories:
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {compactTerritories.map((s) => {
              const isFocused = s.id === focusedId;
              const isPrimary = s.id === primaryId;
              const isCompare = s.id === compareId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleStateClick(s.id)}
                  onMouseEnter={() => setHoveredId(s.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`px-2 py-1 text-[11px] font-medium rounded-md border transition-colors cursor-pointer ${
                    isFocused
                      ? 'bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 border-slate-900 dark:border-amber-400'
                      : isPrimary
                        ? 'bg-[#1E3A8A] dark:bg-[#2563EB] text-white border-[#1E3A8A] dark:border-[#2563EB]'
                        : isCompare
                          ? 'bg-[#0F766E] dark:bg-[#0D9488] text-white border-[#0F766E] dark:border-[#0D9488]'
                          : 'bg-[#F8FAFC] dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {s.name
                    .replace(' (NCT)', '')
                    .replace('Dadra & Nagar Haveli and Daman & Diu', 'DNH & DD')
                    .replace('Andaman & Nicobar Islands', 'Andaman & Nicobar')}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Panel: Deep Focused Local Breakdown OR Quick Hover Inspector + Legend */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
        {focusedState ? (
          <div className="bg-[#F8FAFC] dark:bg-[#162033] border border-slate-200 dark:border-slate-700/80 rounded-lg p-3.5 space-y-3">
            {/* Focused Header */}
            <div className="flex flex-wrap items-start justify-between gap-2 pb-2.5 border-b border-slate-200/80 dark:border-slate-700/70">
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#1E3A8A] dark:text-[#60A5FA] font-semibold">
                  Local Development Breakdown · {focusedState.region}
                </div>
                <div className="text-sm font-semibold text-slate-950 dark:text-slate-50 mt-0.5">
                  {focusedState.name}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    onChangeClickTarget(
                      clickTarget === 'primary' ? 'compare' : 'primary'
                    )
                  }
                  className="px-2 py-1 text-[11px] font-medium rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {clickTarget === 'primary'
                    ? 'Next click: Compare'
                    : 'Next click: Primary'}
                </button>
                <button
                  type="button"
                  onClick={handleResetView}
                  className="px-2 py-1 text-[11px] font-semibold rounded bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Zoom Out
                </button>
              </div>
            </div>

            {/* 5-Metric Local Breakdown Bars */}
            <div className="space-y-2">
              {focusedBreakdownRows.map((row) => {
                const isActiveMetric = row.key === metric;
                return (
                  <div
                    key={row.key}
                    className={`rounded-md px-2.5 py-1.5 transition-colors ${
                      isActiveMetric
                        ? 'bg-white dark:bg-[#0F172A] border border-[#1E3A8A]/25 dark:border-[#60A5FA]/30'
                        : ''
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2 text-xs">
                      <div className="min-w-0 truncate">
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {row.label}
                        </span>
                        <span className="ml-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                          ({row.source})
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 shrink-0">
                        <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 tabular-nums">
                          {row.rankText}
                        </span>
                        <span className="font-mono text-xs font-semibold text-slate-950 dark:text-slate-50 tabular-nums">
                          {row.display}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isActiveMetric
                              ? 'bg-[#1E3A8A] dark:bg-[#60A5FA]'
                              : 'bg-slate-500 dark:bg-slate-400'
                          }`}
                          style={{
                            width: `${Math.max(row.pct > 0 ? 4 : 0, Math.round(row.pct))}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 shrink-0">
                        {row.contextText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key Focus Narrative */}
            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/70 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Key Focus:{' '}
              </span>
              {focusedState.keyFocus}{' '}
              <span className="text-slate-400 dark:text-slate-500">
                ({focusedState.officialNote})
              </span>
            </div>
          </div>
        ) : (
          inspectedState && (
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F8FAFC] dark:bg-[#162033] px-3.5 py-2.5 rounded-lg border border-slate-200/80 dark:border-slate-700/70">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-950 dark:text-slate-50">
                  {inspectedState.name}{' '}
                  <span className="font-normal text-slate-500 dark:text-slate-400">
                    · {inspectedState.region}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  Click any state to zoom in · {inspectedState.officialNote}
                </div>
              </div>
              <div className="font-mono text-sm font-semibold text-[#1E3A8A] dark:text-[#60A5FA] tabular-nums shrink-0">
                {formatMetricValue(inspectedState, metric)}
              </div>
            </div>
          )
        )}

        {/* 5-step Choropleth Scale Legend */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <span>Lower</span>
            <span>Choropleth Scale (36 States &amp; UTs)</span>
            <span>Higher</span>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {ramp.map((hex, i) => (
              <div key={hex} className="space-y-1">
                <div
                  className="h-2 rounded-xs"
                  style={{ backgroundColor: hex }}
                />
                <div className="text-[10px] font-mono tabular-nums text-slate-500 dark:text-slate-400 text-center">
                  {legendSteps[i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official BharatMaps Reference Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
          <span>
            Map reference: NIC BharatMaps &amp; Survey of Bharat (Web Mercator)
          </span>
          <a
            href="https://bharatmaps.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[#1E3A8A] dark:text-[#60A5FA] hover:underline"
          >
            <span>bharatmaps.gov.in</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
