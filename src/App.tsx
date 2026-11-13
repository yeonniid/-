import { useState } from 'react';
import { BaseLayerType, OverlayStyleMode, WorldOverlayMap } from './components/WorldOverlayMap';
import { InquiryPanel } from './components/InquiryPanel';
import { LivestockComparisonView } from './components/LivestockComparisonView';
import { WorksheetView } from './components/WorksheetView';
import { GUIDED_MISSIONS, GuidedMission } from './data/inquiryModules';

type ActiveTab = 'map' | 'livestock' | 'worksheet';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('map');

  // Map Layer & Overlay State
  const [baseLayer, setBaseLayer] = useState<BaseLayerType>('climate');
  const [showPork, setShowPork] = useState<boolean>(true);
  const [showBeef, setShowBeef] = useState<boolean>(true);
  const [overlayMode, setOverlayMode] = useState<OverlayStyleMode>('pattern');
  const [overlayOpacity, setOverlayOpacity] = useState<number>(80);
  const [highlightExceptions, setHighlightExceptions] = useState<boolean>(false);
  const [selectedCountryKey, setSelectedCountryKey] = useState<string>('682'); // Saudi Arabia default spotlight
  const [activeRegionId, setActiveRegionId] = useState<string>('world');
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);

  const handleResetAll = () => {
    setActiveTab('map');
    setBaseLayer('climate');
    setShowPork(true);
    setShowBeef(true);
    setOverlayMode('pattern');
    setOverlayOpacity(80);
    setHighlightExceptions(false);
    setSelectedCountryKey('682');
    setActiveRegionId('world');
    setActiveMissionId(null);
  };

  const handleApplyMission = (mission: GuidedMission) => {
    setActiveMissionId(mission.id);
    setBaseLayer(mission.presetConfig.baseLayer);
    setShowPork(mission.presetConfig.showPork);
    setShowBeef(mission.presetConfig.showBeef);
    setOverlayMode(mission.presetConfig.overlayMode);
    setOverlayOpacity(mission.presetConfig.overlayOpacity);
    setActiveRegionId(mission.presetConfig.regionId);
    setHighlightExceptions(mission.presetConfig.highlightExceptions);
    setSelectedCountryKey(mission.presetConfig.focusCountryKey);
  };

  const handleJumpToMap = (preset: {
    regionId: string;
    focusCountryKey: string;
    baseLayer: 'climate' | 'water';
    showPork: boolean;
    showBeef: boolean;
    highlightExceptions: boolean;
  }) => {
    setBaseLayer(preset.baseLayer);
    setShowPork(preset.showPork);
    setShowBeef(preset.showBeef);
    setOverlayMode('pattern');
    setOverlayOpacity(80);
    setActiveRegionId(preset.regionId);
    setSelectedCountryKey(preset.focusCountryKey);
    setHighlightExceptions(preset.highlightExceptions);
    setActiveMissionId(null);
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line brand wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 text-left focus-visible:outline-2 focus-visible:outline-sky-600 rounded-sm"
          >
            기후-종교 오버레이 맵
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="flex items-center gap-5 sm:gap-7 text-sm font-medium" aria-label="주요 메뉴">
            <button
              type="button"
              onClick={() => setActiveTab('map')}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                activeTab === 'map'
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              지도 탐구
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('livestock')}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                activeTab === 'livestock'
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              가축 생태 비교
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('worksheet')}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                activeTab === 'worksheet'
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              탐구 워크시트
            </button>
          </nav>

          {/* Zone 3: Single primary action */}
          <div className="hidden sm:flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                if (activeMissionId) {
                  handleResetAll();
                } else {
                  setActiveTab('map');
                  handleApplyMission(GUIDED_MISSIONS[0]);
                }
              }}
              className="px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              {activeMissionId ? '전체 지도 초기화' : '탐구 미션 시작'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-5 sm:py-6">
        {/* Compact Context Header */}
        <div className="mb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              금기 음식의 지리학
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              기후·수자원 바탕 지도 위에 돼지고기·소고기 금기 분포를 색깔별로 겹쳐 보며 자연환경과 문화 전파의 관계를 탐구하세요.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <span>기후대별 채색</span>
            <span aria-hidden="true">·</span>
            <span>금기 패턴 오버레이</span>
            <span aria-hidden="true">·</span>
            <span>예외 사례 대조</span>
          </div>
        </div>

        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left / Main Stage: Interactive World Map (8 columns) */}
            <div className="lg:col-span-8">
              <WorldOverlayMap
                baseLayer={baseLayer}
                showPork={showPork}
                showBeef={showBeef}
                overlayMode={overlayMode}
                overlayOpacity={overlayOpacity}
                highlightExceptions={highlightExceptions}
                selectedCountryKey={selectedCountryKey}
                activeRegionId={activeRegionId}
                onSelectCountry={(key) => setSelectedCountryKey(key)}
                onSelectRegion={(regionId) => setActiveRegionId(regionId)}
              />
            </div>

            {/* Right / Control & Concept Deck (4 columns) */}
            <div className="lg:col-span-4">
              <InquiryPanel
                baseLayer={baseLayer}
                setBaseLayer={setBaseLayer}
                showPork={showPork}
                setShowPork={setShowPork}
                showBeef={showBeef}
                setShowBeef={setShowBeef}
                overlayMode={overlayMode}
                setOverlayMode={setOverlayMode}
                overlayOpacity={overlayOpacity}
                setOverlayOpacity={setOverlayOpacity}
                highlightExceptions={highlightExceptions}
                setHighlightExceptions={setHighlightExceptions}
                selectedCountryKey={selectedCountryKey}
                onSelectCountry={(key) => setSelectedCountryKey(key)}
                activeMissionId={activeMissionId}
                onApplyMission={handleApplyMission}
              />
            </div>
          </div>
        )}

        {activeTab === 'livestock' && (
          <LivestockComparisonView onJumpToMap={handleJumpToMap} />
        )}

        {activeTab === 'worksheet' && (
          <WorksheetView onJumpToMap={handleJumpToMap} />
        )}
      </main>
    </div>
  );
}
