import React from 'react';
import {
  ALL_COUNTRY_LIST,
  CLIMATE_META,
  COUNTRY_PROFILES,
  SPOTLIGHT_KEYS,
  TABOO_META,
  WATER_STRESS_META,
} from '../data/geographyData';
import { computeCorrelationStats, GUIDED_MISSIONS, GuidedMission } from '../data/inquiryModules';
import { BaseLayerType, OverlayStyleMode } from './WorldOverlayMap';
import { Droplets, Layers, Compass, Sparkles } from 'lucide-react';

interface InquiryPanelProps {
  baseLayer: BaseLayerType;
  setBaseLayer: (val: BaseLayerType) => void;
  showPork: boolean;
  setShowPork: (val: boolean) => void;
  showBeef: boolean;
  setShowBeef: (val: boolean) => void;
  overlayMode: OverlayStyleMode;
  setOverlayMode: (val: OverlayStyleMode) => void;
  overlayOpacity: number;
  setOverlayOpacity: (val: number) => void;
  highlightExceptions: boolean;
  setHighlightExceptions: (val: boolean) => void;
  selectedCountryKey: string;
  onSelectCountry: (key: string) => void;
  activeMissionId: string | null;
  onApplyMission: (mission: GuidedMission) => void;
}

export const InquiryPanel: React.FC<InquiryPanelProps> = ({
  baseLayer,
  setBaseLayer,
  showPork,
  setShowPork,
  showBeef,
  setShowBeef,
  overlayMode,
  setOverlayMode,
  overlayOpacity,
  setOverlayOpacity,
  highlightExceptions,
  setHighlightExceptions,
  selectedCountryKey,
  onSelectCountry,
  activeMissionId,
  onApplyMission,
}) => {
  const selectedProfile = COUNTRY_PROFILES[selectedCountryKey] || COUNTRY_PROFILES['682'];
  const stats = React.useMemo(() => computeCorrelationStats(ALL_COUNTRY_LIST), []);

  return (
    <aside className="flex flex-col gap-4">
      {/* 1. GIS Layer Controls */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-700 shrink-0" />
            <h2 className="text-sm font-semibold text-slate-900">지도 레이어 중첩 제어</h2>
          </div>
          <span className="text-xs text-slate-500">자연 + 문화</span>
        </div>

        {/* Base Physical Layer */}
        <div className="mt-4">
          <p className="text-xs font-medium text-slate-600 mb-2">1. 바탕 지도 (자연지리 환경)</p>
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
            {(
              [
                { id: 'climate', label: '기후·강수량' },
                { id: 'water', label: '물 스트레스' },
                { id: 'none', label: '바탕 끄기' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setBaseLayer(opt.id)}
                className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-sky-600 ${
                  baseLayer === opt.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overlay Religious Taboo Layer */}
        <div className="mt-4">
          <p className="text-xs font-medium text-slate-600 mb-2">2. 오버레이 (종교적 금기 음식)</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setShowPork(!showPork)}
              className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg border transition-colors text-left focus-visible:outline-2 focus-visible:outline-sky-600 ${
                showPork
                  ? 'bg-violet-50 border-violet-300 text-violet-950'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span className="w-3 h-3 rounded-xs bg-violet-700 shrink-0" />
                돼지고기 금기
              </span>
              <span className="text-[11px] font-semibold">{showPork ? '켬' : '끔'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowBeef(!showBeef)}
              className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg border transition-colors text-left focus-visible:outline-2 focus-visible:outline-sky-600 ${
                showBeef
                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span className="w-3 h-3 rounded-xs bg-rose-700 shrink-0" />
                소고기 금기
              </span>
              <span className="text-[11px] font-semibold">{showBeef ? '켬' : '끔'}</span>
            </button>
          </div>
        </div>

        {/* Overlay Style & Opacity Slider */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-600">오버레이 표현 방식</span>
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md">
              <button
                type="button"
                onClick={() => setOverlayMode('pattern')}
                className={`px-2.5 py-1 text-xs font-medium rounded-sm transition-colors whitespace-nowrap ${
                  overlayMode === 'pattern'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                사선 패턴
              </button>
              <button
                type="button"
                onClick={() => setOverlayMode('tint')}
                className={`px-2.5 py-1 text-xs font-medium rounded-sm transition-colors whitespace-nowrap ${
                  overlayMode === 'tint'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                색채 투명
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="overlay-opacity-slider" className="font-medium text-slate-700">
                금기 레이어 투명도
              </label>
              <span className="font-mono-num font-semibold text-slate-900">{overlayOpacity}%</span>
            </div>
            <input
              id="overlay-opacity-slider"
              type="range"
              min={0}
              max={100}
              step={5}
              value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono-num mt-0.5">
              <span>0% (자연환경만)</span>
              <span>50%</span>
              <span>100% (금기 강조)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setHighlightExceptions(!highlightExceptions)}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
              highlightExceptions
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>습윤 기후 예외 사례(문화 전파) 테두리 강조</span>
            </span>
            <span className="font-semibold">{highlightExceptions ? '켜짐' : '꺼짐'}</span>
          </button>
        </div>
      </section>

      {/* 2. Selected Country Geographical & Ecological Profile */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-700 shrink-0" />
            <h2 className="text-sm font-semibold text-slate-900">선택 지역 지리·생태 분석</h2>
          </div>
          <span className="text-xs text-slate-500">지도 클릭 전환</span>
        </div>

        {/* Quick Spotlight Country Buttons */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {SPOTLIGHT_KEYS.map((key) => {
            const p = COUNTRY_PROFILES[key];
            if (!p) return null;
            const active = key === selectedProfile.key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectCountry(key)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p.nameKo}
              </button>
            );
          })}
        </div>

        {/* Selected Country Details */}
        <div className="mt-4">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900">{selectedProfile.nameKo}</h3>
            <span className="text-xs text-slate-500">{selectedProfile.nameEn}</span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
            <span>{selectedProfile.climateLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedProfile.religionLabel}</span>
            {selectedProfile.isClimateException && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-amber-800">기후 예외(문화 전파)</span>
              </>
            )}
          </div>

          {/* Numeric Geography Metrics (Tabular) */}
          <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
            <div>
              <div className="text-[11px] text-slate-500">연 강수량</div>
              <div className="mt-0.5 text-sm font-semibold text-slate-900 font-mono-num">
                {selectedProfile.precipitationMm.toLocaleString()}mm
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">물 스트레스</div>
              <div className="mt-0.5 text-sm font-semibold text-slate-900 font-mono-num">
                {selectedProfile.waterStressPercent}%
              </div>
              <div className="text-[11px] text-slate-500">
                {WATER_STRESS_META[selectedProfile.waterStressLevel].shortLabel}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">종교적 금기</div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-xs shrink-0"
                  style={{
                    backgroundColor:
                      selectedProfile.taboo === 'none'
                        ? '#94A3B8'
                        : TABOO_META[selectedProfile.taboo].color,
                  }}
                />
                <span className="text-xs font-semibold text-slate-900 truncate">
                  {TABOO_META[selectedProfile.taboo].shortLabel}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-3 pt-3 border-t border-slate-100 text-xs leading-relaxed text-slate-700">
            {selectedProfile.caseNote}
          </p>
        </div>
      </section>

      {/* 3. Live Spatial Correlation & 3-Step Guided Inquiry */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-sky-700 shrink-0" />
            <h2 className="text-sm font-semibold text-slate-900">공간 상관 지표 및 3단계 탐구</h2>
          </div>
          <span className="text-xs text-slate-500 font-mono-num">
            {ALL_COUNTRY_LIST.length}개국 분석
          </span>
        </div>

        {/* Computed Spatial Correlation Stats */}
        <div className="mt-3 grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="text-[11px] text-slate-500">건조·반건조 중 돼지 금기 비율</div>
            <div className="mt-0.5 text-base font-bold text-slate-900 font-mono-num">
              {stats.aridPorkPercent}%
              <span className="ml-1.5 text-xs font-normal text-slate-500">
                ({stats.aridPorkTabooCount}/{stats.aridTotal}개국)
              </span>
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500">습윤 지역 전파 예외 국가</div>
            <div className="mt-0.5 text-base font-bold text-slate-900 font-mono-num">
              {stats.porkInWetExceptionCount}개국
              <span className="ml-1.5 text-xs font-normal text-slate-500">
                (인니·방글라 등)
              </span>
            </div>
          </div>
        </div>

        {/* Guided 3-Step Inquiry Missions */}
        <div className="mt-3 space-y-2">
          {GUIDED_MISSIONS.map((mission) => {
            const isActive = activeMissionId === mission.id;
            return (
              <button
                key={mission.id}
                type="button"
                onClick={() => onApplyMission(mission)}
                className={`w-full text-left p-3 rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-sky-600 ${
                  isActive
                    ? 'bg-sky-50/80 border-sky-300'
                    : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-sky-800">{mission.stepLabel}</span>
                  <span className="text-[11px] text-slate-500">
                    {isActive ? '지도 적용됨' : '지도에 적용'}
                  </span>
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-900">{mission.title}</div>
                {isActive && (
                  <div className="mt-2 pt-2 border-t border-sky-200/80 space-y-1 text-xs text-slate-700 leading-relaxed">
                    <p className="font-medium text-slate-900">{mission.question}</p>
                    <p className="text-slate-600">{mission.hint}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
};
