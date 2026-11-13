import React, { useMemo, useRef, useState } from 'react';
import { geoGraticule10, geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import worldAtlas from 'world-atlas/countries-110m.json';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import {
  CLIMATE_META,
  COUNTRY_PROFILES,
  CountryGeoProfile,
  REGION_PRESETS,
  TABOO_META,
  WATER_STRESS_META,
} from '../data/geographyData';

export type BaseLayerType = 'climate' | 'water' | 'none';
export type OverlayStyleMode = 'pattern' | 'tint';

interface WorldOverlayMapProps {
  baseLayer: BaseLayerType;
  showPork: boolean;
  showBeef: boolean;
  overlayMode: OverlayStyleMode;
  overlayOpacity: number;
  highlightExceptions: boolean;
  selectedCountryKey: string;
  activeRegionId: string;
  onSelectCountry: (key: string) => void;
  onSelectRegion: (regionId: string) => void;
}

interface CountryFeature {
  type: 'Feature';
  id?: string | number;
  properties: {
    name?: string;
  };
  geometry: GeoJSON.Geometry;
  profileKey: string;
  profile?: CountryGeoProfile;
}

const SVG_WIDTH = 960;
const SVG_HEIGHT = 500;

export const WorldOverlayMap: React.FC<WorldOverlayMapProps> = ({
  baseLayer,
  showPork,
  showBeef,
  overlayMode,
  overlayOpacity,
  highlightExceptions,
  selectedCountryKey,
  activeRegionId,
  onSelectCountry,
  onSelectRegion,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomMultiplier, setZoomMultiplier] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; startPanX: number; startPanY: number } | null>(null);
  const didDragRef = useRef(false);

  const [hoveredCountry, setHoveredCountry] = useState<{
    profile: CountryGeoProfile;
    clientX: number;
    clientY: number;
  } | null>(null);

  const activePreset = useMemo(
    () => REGION_PRESETS.find((r) => r.id === activeRegionId) || REGION_PRESETS[0],
    [activeRegionId]
  );

  // Reset local pan/zoom whenever region preset changes
  const handlePresetClick = (regionId: string) => {
    setZoomMultiplier(1);
    setPanOffset({ x: 0, y: 0 });
    onSelectRegion(regionId);
  };

  const projection = useMemo(() => {
    return geoNaturalEarth1()
      .center(activePreset.center)
      .scale(activePreset.scale * zoomMultiplier)
      .translate([SVG_WIDTH / 2 + panOffset.x, SVG_HEIGHT / 2 + panOffset.y]);
  }, [activePreset, zoomMultiplier, panOffset]);

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);
  const graticulePath = useMemo(() => pathGenerator(geoGraticule10()) || '', [pathGenerator]);

  const countries = useMemo<CountryFeature[]>(() => {
    const topology = worldAtlas as unknown as Topology<{
      countries: GeometryCollection<{ name?: string }>;
    }>;
    const geo = feature(topology, topology.objects.countries);
    return geo.features
      .filter((f) => f.id !== '010' && f.id !== '260') // Exclude Antarctica & French Southern Antarctic Lands
      .map((f) => {
        const rawKey = f.id ? String(f.id) : String(f.properties?.name || '');
        return {
          ...f,
          id: f.id ?? undefined,
          profileKey: rawKey,
          profile: COUNTRY_PROFILES[rawKey],
        } as CountryFeature;
      });
  }, []);

  const getBaseFill = (profile?: CountryGeoProfile): string => {
    if (!profile || baseLayer === 'none') return '#E2E8F0';
    if (baseLayer === 'climate') {
      return CLIMATE_META[profile.climateCategory].color;
    }
    return WATER_STRESS_META[profile.waterStressLevel].color;
  };

  const getOverlayFill = (profile?: CountryGeoProfile): string | null => {
    if (!profile) return null;
    const { taboo } = profile;
    if (taboo === 'none') return null;

    const porkActive = showPork && (taboo === 'pork' || taboo === 'both');
    const beefActive = showBeef && (taboo === 'beef' || taboo === 'both');

    if (!porkActive && !beefActive) return null;

    if (overlayMode === 'pattern') {
      if (porkActive && beefActive) return 'url(#pattern-both)';
      if (porkActive) return 'url(#pattern-pork)';
      return 'url(#pattern-beef)';
    }

    if (porkActive && beefActive) return '#581C87';
    if (porkActive) return TABOO_META.pork.color;
    return TABOO_META.beef.color;
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    didDragRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startPanX: panOffset.x,
      startPanY: panOffset.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      didDragRef.current = true;
    }
    const container = containerRef.current;
    const scaleX = container ? SVG_WIDTH / container.clientWidth : 1;
    const scaleY = container ? SVG_HEIGHT / container.clientHeight : 1;
    setPanOffset({
      x: Math.max(-420, Math.min(420, dragStartRef.current.startPanX + dx * scaleX)),
      y: Math.max(-240, Math.min(240, dragStartRef.current.startPanY + dy * scaleY)),
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    setZoomMultiplier((prev) => Math.max(0.85, Math.min(4.5, Number((prev * factor).toFixed(2)))));
  };

  const normalizedOpacity = Math.max(0, Math.min(1, overlayOpacity / 100));

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Map Top Toolbar: Regional Presets & Zoom Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {REGION_PRESETS.map((preset) => {
            const active = preset.id === activeRegionId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetClick(preset.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setZoomMultiplier((z) => Math.min(4.5, Number((z * 1.25).toFixed(2))))}
            aria-label="지도 확대"
            title="지도 확대"
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomMultiplier((z) => Math.max(0.85, Number((z * 0.8).toFixed(2))))}
            aria-label="지도 축소"
            title="지도 축소"
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setZoomMultiplier(1);
              setPanOffset({ x: 0, y: 0 });
              onSelectRegion('world');
            }}
            aria-label="지도 위치 초기화"
            title="지도 위치 초기화"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>초기화</span>
          </button>
        </div>
      </div>

      {/* Interactive Cartographic Canvas */}
      <div
        ref={containerRef}
        className="relative w-full bg-[#EFF6FF] select-none overflow-hidden"
        style={{ aspectRatio: '16 / 9', minHeight: '360px' }}
      >
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className={`w-full h-full block ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => {
            handlePointerUp();
            setHoveredCountry(null);
          }}
          onWheel={handleWheel}
          role="img"
          aria-label="세계 기후와 종교적 금기 음식 분포 오버레이 지도"
        >
          <defs>
            {/* Ocean background gradient */}
            <linearGradient id="ocean-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F0F7FF" />
              <stop offset="100%" stopColor="#E0EEFF" />
            </linearGradient>

            {/* Diagonal hatch pattern for Pork Taboo (lets base climate color shine underneath) */}
            <pattern
              id="pattern-pork"
              width="7"
              height="7"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <rect width="7" height="7" fill="rgba(109, 40, 217, 0.24)" />
              <line x1="0" y1="0" x2="0" y2="7" stroke="#5B21B6" strokeWidth="2.4" />
            </pattern>

            {/* Reverse cross-hatch/dot pattern for Beef Taboo */}
            <pattern
              id="pattern-beef"
              width="8"
              height="8"
              patternTransform="rotate(-45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <rect width="8" height="8" fill="rgba(190, 18, 60, 0.24)" />
              <line x1="0" y1="0" x2="0" y2="8" stroke="#9F1239" strokeWidth="2.4" />
              <circle cx="4" cy="4" r="1.1" fill="#9F1239" />
            </pattern>

            {/* Combined pattern for countries with both taboos (e.g. India) */}
            <pattern
              id="pattern-both"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <rect width="8" height="8" fill="rgba(88, 28, 135, 0.24)" />
              <path d="M 0,8 L 8,0" stroke="#9F1239" strokeWidth="2" />
              <path d="M 0,0 L 8,8" stroke="#5B21B6" strokeWidth="2" />
            </pattern>
          </defs>

          {/* Ocean Fill */}
          <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#ocean-grad)" />

          {/* Graticule Lines */}
          <path d={graticulePath} fill="none" stroke="#CBD5E1" strokeWidth={0.5} strokeOpacity={0.65} />

          {/* Layer 1: Physical Geography Base Fill (Climate or Water Stress) */}
          <g>
            {countries.map((c) => {
              const d = pathGenerator(c);
              if (!d) return null;
              const isSelected = c.profileKey === selectedCountryKey;
              return (
                <path
                  key={`base-${c.profileKey}`}
                  d={d}
                  fill={getBaseFill(c.profile)}
                  stroke={isSelected ? '#0F172A' : '#FFFFFF'}
                  strokeWidth={isSelected ? 1.8 : 0.55}
                  className="transition-colors duration-150"
                  onClick={() => {
                    if (didDragRef.current) return;
                    if (c.profile) onSelectCountry(c.profileKey);
                  }}
                  onMouseMove={(e) => {
                    if (!c.profile) return;
                    setHoveredCountry({
                      profile: c.profile,
                      clientX: e.clientX,
                      clientY: e.clientY,
                    });
                  }}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
              );
            })}
          </g>

          {/* Layer 2: Religious Dietary Taboo Overlay */}
          <g style={{ pointerEvents: 'none' }}>
            {countries.map((c) => {
              const overlayFill = getOverlayFill(c.profile);
              if (!overlayFill) return null;
              const d = pathGenerator(c);
              if (!d) return null;
              return (
                <path
                  key={`overlay-${c.profileKey}`}
                  d={d}
                  fill={overlayFill}
                  fillOpacity={overlayMode === 'pattern' ? Math.max(0.15, normalizedOpacity) : normalizedOpacity * 0.78}
                  stroke="none"
                />
              );
            })}
          </g>

          {/* Layer 3: Climate Exception & Selected Country Borders */}
          <g style={{ pointerEvents: 'none' }}>
            {highlightExceptions &&
              countries
                .filter((c) => c.profile?.isClimateException)
                .map((c) => {
                  const d = pathGenerator(c);
                  if (!d) return null;
                  return (
                    <path
                      key={`exc-${c.profileKey}`}
                      d={d}
                      fill="none"
                      stroke="#0F172A"
                      strokeWidth={1.7}
                      strokeDasharray="3.5 2"
                    />
                  );
                })}

            {countries
              .filter((c) => c.profileKey === selectedCountryKey)
              .map((c) => {
                const d = pathGenerator(c);
                if (!d) return null;
                return (
                  <path
                    key={`sel-${c.profileKey}`}
                    d={d}
                    fill="none"
                    stroke="#0F172A"
                    strokeWidth={2.2}
                  />
                );
              })}
          </g>
        </svg>

        {/* Floating Hover Tooltip */}
        {hoveredCountry && !isDragging && (
          <div
            className="fixed z-50 pointer-events-none bg-slate-900/95 text-white rounded-lg px-3.5 py-2.5 shadow-lg border border-slate-700/80 max-w-xs"
            style={{
              left: Math.min(window.innerWidth - 260, hoveredCountry.clientX + 14),
              top: Math.max(12, hoveredCountry.clientY - 12),
            }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-white">
                {hoveredCountry.profile.nameKo}
              </span>
              <span className="text-xs text-slate-300">{hoveredCountry.profile.nameEn}</span>
            </div>
            <div className="mt-1.5 text-xs text-slate-200 space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-xs shrink-0 border border-white/30"
                  style={{
                    backgroundColor: CLIMATE_META[hoveredCountry.profile.climateCategory].color,
                  }}
                />
                <span>{hoveredCountry.profile.climateLabel}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-slate-300 font-mono-num">
                <span>연 강수량 {hoveredCountry.profile.precipitationMm.toLocaleString()}mm</span>
                <span>물 스트레스 {hoveredCountry.profile.waterStressPercent}%</span>
              </div>
              <div className="pt-1 border-t border-slate-700 flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-xs shrink-0"
                  style={{
                    backgroundColor:
                      hoveredCountry.profile.taboo === 'none'
                        ? '#64748B'
                        : TABOO_META[hoveredCountry.profile.taboo].color,
                  }}
                />
                <span className="font-medium text-white">
                  {TABOO_META[hoveredCountry.profile.taboo].shortLabel}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-300 truncate">{hoveredCountry.profile.religionLabel}</span>
              </div>
            </div>
          </div>
        )}

        {/* Map Hint Top-Right */}
        <div className="hidden sm:block absolute top-3 right-3 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 pointer-events-none">
          국가를 클릭해 지리·생태 정보를 탐색하세요 (드래그·휠 확대 지원)
        </div>
      </div>

      {/* Cartographic Legend Strip */}
      <div className="px-4 py-3 bg-white border-t border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 text-xs">
        {/* Base Layer Legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="font-semibold text-slate-700 shrink-0">
            {baseLayer === 'climate'
              ? '바탕: 기후·강수량'
              : baseLayer === 'water'
              ? '바탕: 수자원 스트레스'
              : '바탕: 단색(금기 강조)'}
          </span>
          {baseLayer === 'climate' &&
            (['arid', 'semiarid', 'temperate', 'tropical', 'continental', 'polar'] as const).map(
              (cat) => (
                <div key={cat} className="flex items-center gap-1.5 text-slate-700">
                  <span
                    className="w-3 h-3 rounded-xs border border-slate-300 shrink-0"
                    style={{ backgroundColor: CLIMATE_META[cat].color }}
                  />
                  <span>{CLIMATE_META[cat].shortLabel}</span>
                </div>
              )
            )}
          {baseLayer === 'water' &&
            (['extreme', 'high', 'medium', 'low'] as const).map((lvl) => (
              <div key={lvl} className="flex items-center gap-1.5 text-slate-700">
                <span
                  className="w-3 h-3 rounded-xs border border-slate-300 shrink-0"
                  style={{ backgroundColor: WATER_STRESS_META[lvl].color }}
                />
                <span>{WATER_STRESS_META[lvl].shortLabel}</span>
              </div>
            ))}
        </div>

        {/* Overlay Taboo Legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          <span className="font-semibold text-slate-700 shrink-0">오버레이: 금기 음식</span>
          {showPork && (
            <div className="flex items-center gap-1.5 text-slate-700">
              <span
                className="w-3.5 h-3.5 rounded-xs border border-violet-800 shrink-0"
                style={{
                  backgroundImage:
                    overlayMode === 'pattern'
                      ? 'repeating-linear-gradient(45deg, rgba(109,40,217,0.3), rgba(109,40,217,0.3) 2px, #5B21B6 2px, #5B21B6 4px)'
                      : 'none',
                  backgroundColor: overlayMode === 'tint' ? '#6D28D9' : 'transparent',
                }}
              />
              <span>돼지고기 금기</span>
            </div>
          )}
          {showBeef && (
            <div className="flex items-center gap-1.5 text-slate-700">
              <span
                className="w-3.5 h-3.5 rounded-xs border border-rose-800 shrink-0"
                style={{
                  backgroundImage:
                    overlayMode === 'pattern'
                      ? 'repeating-linear-gradient(-45deg, rgba(190,18,60,0.3), rgba(190,18,60,0.3) 2px, #9F1239 2px, #9F1239 4px)'
                      : 'none',
                  backgroundColor: overlayMode === 'tint' ? '#BE123C' : 'transparent',
                }}
              />
              <span>소고기 금기</span>
            </div>
          )}
          {showPork && showBeef && (
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3.5 h-3.5 rounded-xs border border-slate-800 bg-purple-950/50 shrink-0" />
              <span>복합 금기 (인도 등)</span>
            </div>
          )}
          {highlightExceptions && (
            <div className="flex items-center gap-1.5 text-slate-800 font-medium">
              <span className="w-3.5 h-3.5 rounded-xs border-2 border-dashed border-slate-900 shrink-0" />
              <span>습윤 기후 예외 (문화 전파)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
