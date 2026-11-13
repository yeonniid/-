import React, { useMemo, useState } from 'react';
import { LIVESTOCK_DATA } from '../data/inquiryModules';
import { ArrowRight } from 'lucide-react';

interface LivestockComparisonViewProps {
  onJumpToMap: (preset: {
    regionId: string;
    focusCountryKey: string;
    baseLayer: 'climate' | 'water';
    showPork: boolean;
    showBeef: boolean;
    highlightExceptions: boolean;
  }) => void;
}

export const LivestockComparisonView: React.FC<LivestockComparisonViewProps> = ({
  onJumpToMap,
}) => {
  const [annualRainfall, setAnnualRainfall] = useState<number>(180);
  const [lifestyle, setLifestyle] = useState<'nomadic' | 'monsoon_farming' | 'temperate_mixed'>(
    'nomadic'
  );

  // Compute dynamic ecological suitability index (0–100) based on rainfall + lifestyle
  const suitability = useMemo(() => {
    const rainFactor = Math.min(1, annualRainfall / 1500);

    let pigScore = Math.round(
      (annualRainfall < 250 ? 12 : annualRainfall < 500 ? 35 : 65 + rainFactor * 30) *
        (lifestyle === 'nomadic' ? 0.25 : lifestyle === 'monsoon_farming' ? 0.85 : 1.0)
    );
    pigScore = Math.max(5, Math.min(98, pigScore));

    let cattleScore = Math.round(
      (annualRainfall < 150 ? 22 : annualRainfall < 450 ? 52 : 76 + rainFactor * 18) *
        (lifestyle === 'nomadic' ? 0.72 : lifestyle === 'monsoon_farming' ? 1.0 : 0.92)
    );
    cattleScore = Math.max(10, Math.min(98, cattleScore));

    let goatSheepScore = Math.round(
      (annualRainfall < 400 ? 92 : annualRainfall < 900 ? 74 : 46) *
        (lifestyle === 'nomadic' ? 1.05 : lifestyle === 'monsoon_farming' ? 0.65 : 0.8)
    );
    goatSheepScore = Math.max(18, Math.min(98, goatSheepScore));

    return { pigScore, cattleScore, goatSheepScore };
  }, [annualRainfall, lifestyle]);

  const climateStageLabel =
    annualRainfall < 250
      ? '극건조 사막 (예: 사우디아라비아 59mm)'
      : annualRainfall < 500
      ? '반건조 스텝 (예: 이스라엘·이란 230–430mm)'
      : annualRainfall < 1200
      ? '온대·몬순 경작지 (예: 한국·인도 1,000–1,200mm)'
      : '고온다습 열대 우림·몬순 (예: 인도네시아 2,700mm)';

  return (
    <div className="space-y-6">
      {/* Interactive Ecological Suitability Simulator */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              기후·생업 조건별 가축 생태 적합도 시뮬레이터
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              연 강수량과 인간의 생업 방식을 조절하며 왜 특정 지역에서 돼지나 소의 도축이 금기시되었는지 생태적 비용을 비교해 보세요.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onJumpToMap({
                regionId: annualRainfall < 450 ? 'mena' : 'south_asia',
                focusCountryKey: annualRainfall < 450 ? '682' : '356',
                baseLayer: 'climate',
                showPork: true,
                showBeef: true,
                highlightExceptions: false,
              })
            }
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
          >
            <span>해당 기후 지역 지도에서 보기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <label htmlFor="rainfall-sim-slider" className="font-semibold text-slate-800">
                  가상 지역 연평균 강수량
                </label>
                <span className="font-mono-num font-bold text-sky-800">
                  {annualRainfall.toLocaleString()} mm/년
                </span>
              </div>
              <input
                id="rainfall-sim-slider"
                type="range"
                min={50}
                max={2700}
                step={50}
                value={annualRainfall}
                onChange={(e) => setAnnualRainfall(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono-num mt-1">
                <span>50mm (사막)</span>
                <span>500mm (스텝)</span>
                <span>1,200mm</span>
                <span>2,700mm (열대)</span>
              </div>
              <p className="mt-2 text-xs font-medium text-slate-700">{climateStageLabel}</p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-800 mb-2">인간의 생업 및 토지 이용 형태</p>
              <div className="space-y-1.5">
                {(
                  [
                    {
                      id: 'nomadic',
                      title: '건조 초지 유목·오아시스 정착',
                      desc: '이동성이 중요하며 곡물과 물이 희귀한 환경',
                    },
                    {
                      id: 'monsoon_farming',
                      title: '고밀도 계절풍(몬순) 집약 농경',
                      desc: '인구가 많고 쟁기질(소 동력)과 쇠똥 연료가 필수적인 환경',
                    },
                    {
                      id: 'temperate_mixed',
                      title: '온대 숲·곡물 혼합 농목업',
                      desc: '도토리 숲, 초지, 사료 작물이 고루 풍부한 환경',
                    },
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setLifestyle(mode.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg border transition-colors ${
                      lifestyle === mode.id
                        ? 'bg-white border-sky-500 shadow-xs'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-900">{mode.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Output Bars (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {[
              {
                label: '돼지 사육 적합도 (고기 전용 · 땀샘 없음 · 곡물 경쟁)',
                score: suitability.pigScore,
                barColor: 'bg-violet-600',
                note:
                  suitability.pigScore < 35
                    ? '부적합: 수분·그늘 부족과 유목 이동 불가능으로 사육 비용이 이익을 초과합니다.'
                    : '적합: 물과 그늘, 남은 곡물·부산물이 충분해 단백질 공급 효율이 높습니다.',
              },
              {
                label: '소 사육 적합도 (초식 반추 · 쟁기질 · 우유 · 연료)',
                score: suitability.cattleScore,
                barColor: 'bg-rose-600',
                note:
                  lifestyle === 'monsoon_farming'
                    ? '핵심 생산 수단: 살아있는 상태의 쟁기질·우유·연료 가치가 고기 가치를 압도합니다.'
                    : annualRainfall < 250
                    ? '제한적: 초지가 부족해 극건조 사막에서는 대규모 사육이 어렵습니다.'
                    : '적합: 풀과 농업 부산물을 유용한 노동력과 식품으로 전환합니다.',
              },
              {
                label: '양·염소·낙타 적합도 (건조 내성 · 유목 이동성)',
                score: suitability.goatSheepScore,
                barColor: 'bg-amber-600',
                note:
                  annualRainfall < 500
                    ? '최적: 거친 관목을 소화하고 장거리 이동이 가능해 건조 지역 핵심 가축입니다.'
                    : '보통: 습윤 지역에서는 가능하나 다습 시 질병 관리가 필요합니다.',
              },
            ].map((row) => (
              <div key={row.label} className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-900">{row.label}</span>
                  <span className="text-base font-bold text-slate-900 font-mono-num shrink-0">
                    {row.score}점 / 100
                  </span>
                </div>
                <div className="mt-2.5 h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${row.barColor} transition-all duration-200 rounded-full`}
                    style={{ width: `${row.score}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-600">{row.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Comparative Ecology Table */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">주요 가축별 생리·생태 및 자원 효율 비교표</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            고기 1kg 생산 기준 물 발자국(Water Footprint Analytics) 및 생태인류학적 특성 비교
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="py-3 px-4 font-semibold">구분</th>
                <th className="py-3 px-4 font-semibold">땀샘 및 체온 조절</th>
                <th className="py-3 px-4 font-semibold">식성 및 식량 경쟁</th>
                <th className="py-3 px-4 font-semibold text-right">물 발자국 (L/kg)</th>
                <th className="py-3 px-4 font-semibold">생존·농경 부가가치</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {LIVESTOCK_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60">
                  <td className="py-4 px-4 font-semibold text-slate-900 align-top whitespace-nowrap">
                    {item.nameKo}
                    <div className="text-[11px] font-normal text-slate-500 mt-1">
                      유목 이동성: {item.mobilityInNomadism}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-700 align-top max-w-xs">{item.sweatGlands}</td>
                  <td className="py-4 px-4 text-slate-700 align-top max-w-xs">
                    <div>{item.dietType}</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      인간과 식량 경쟁: <strong className="text-slate-800">{item.humanFoodCompetition}</strong>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-mono-num font-semibold text-slate-900 align-top whitespace-nowrap">
                    {item.waterFootprintLPerKg.toLocaleString()} L
                  </td>
                  <td className="py-4 px-4 text-slate-700 align-top max-w-sm">
                    <div className="font-medium text-slate-900">{item.nonMeatValue}</div>
                    <p className="mt-1 text-slate-600 leading-relaxed">{item.ecologicalSummary}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
