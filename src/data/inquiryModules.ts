import { DietaryTaboo } from './geographyData';

export interface LivestockComparisonItem {
  id: 'pig' | 'cattle' | 'goat_sheep';
  nameKo: string;
  sweatGlands: string;
  dietType: string;
  humanFoodCompetition: '높음' | '낮음';
  waterFootprintLPerKg: number;
  mobilityInNomadism: '매우 낮음 (정착형)' | '중간~높음 (이동 가능)';
  nonMeatValue: string;
  bestClimate: string;
  worstClimate: string;
  ecologicalSummary: string;
}

export const LIVESTOCK_DATA: LivestockComparisonItem[] = [
  {
    id: 'pig',
    nameKo: '돼지 (정착·습윤 적합형)',
    sweatGlands: '땀샘이 거의 없음 (진흙·물·그늘 필수)',
    dietType: '잡식성 (곡물·견과류·음식물 찌꺼기)',
    humanFoodCompetition: '높음',
    waterFootprintLPerKg: 5988,
    mobilityInNomadism: '매우 낮음 (정착형)',
    nonMeatValue: '고기·지방 생산 외 우유·쟁기질·털 등 부가가치 없음',
    bestClimate: '온대·열대 습윤 산림 및 곡물 풍부 지역',
    worstClimate: '고온 건조 사막·스텝 (서남아시아·북아프리카)',
    ecologicalSummary:
      '돼지는 반추위가 없어 풀·섬유질을 소화하지 못하고 인간이 먹는 곡물·열매를 섭취해야 합니다. 또한 땀샘이 없어 기온이 35°C를 넘는 건조 지대에서는 생존을 위해 막대한 물과 그늘이 필요합니다.',
  },
  {
    id: 'cattle',
    nameKo: '소 (초식·농경 노동력형)',
    sweatGlands: '땀샘 발달 (체온 조절 양호, 열대 적응 품종 존재)',
    dietType: '반추 초식성 (볏짚·풀·농업 부산물 소화)',
    humanFoodCompetition: '낮음',
    waterFootprintLPerKg: 15415,
    mobilityInNomadism: '중간~높음 (이동 가능)',
    nonMeatValue: '쟁기질(농업 동력), 우유·버터(단백질), 쇠똥(연료·비료)',
    bestClimate: '몬순 농경 지대(남아시아), 온대·사바나 초원',
    worstClimate: '초극건조 사막 (식생 전무 지역)',
    ecologicalSummary:
      '소가 고기 1kg 생산에 소비하는 총 물 발자국은 크지만, 인도 몬순 농경 사회에서는 도축하지 않고 살려둘 때 매년 경작(쟁기질)·우유·연료용 쇠똥이라는 막대한 재생 에너지를 제공합니다.',
  },
  {
    id: 'goat_sheep',
    nameKo: '양·염소·낙타 (건조 유목 최적화형)',
    sweatGlands: '건조·고온 내성 및 수분 재흡수 매우 우수',
    dietType: '거친 사막 관목·마른 풀 소화 가능',
    humanFoodCompetition: '낮음',
    waterFootprintLPerKg: 8763,
    mobilityInNomadism: '중간~높음 (이동 가능)',
    nonMeatValue: '양털·가죽·우유·장거리 유목 이동 수단',
    bestClimate: '사막·스텝·고원 건조 지대',
    worstClimate: '과도한 다습 열대 우림 (기생충 취약)',
    ecologicalSummary:
      '서남아시아와 북아프리카의 유목민에게 양·염소·낙타는 인간이 먹을 수 없는 건조 초지의 풀을 젖·털·고기로 전환해 주는 가장 효율적인 가축이었습니다.',
  },
];

export interface GuidedMission {
  id: string;
  stepLabel: string;
  title: string;
  question: string;
  hint: string;
  presetConfig: {
    baseLayer: 'climate' | 'water' | 'none';
    showPork: boolean;
    showBeef: boolean;
    overlayMode: 'pattern' | 'tint';
    overlayOpacity: number;
    regionId: string;
    highlightExceptions: boolean;
    focusCountryKey: string;
  };
}

export const GUIDED_MISSIONS: GuidedMission[] = [
  {
    id: 'mission-1',
    stepLabel: '탐구 1단계',
    title: '건조 기후대와 돼지고기 금기의 겹침 확인하기',
    question:
      '사하라 사막에서 아라비아 반도·중앙아시아로 이어지는 건조 기후대(주황·노랑)와 돼지고기 금기(보라색 사선)가 얼마나 일치하나요?',
    hint: '투명도 슬라이더를 좌우로 움직여 보며 서남아시아·북아프리카 경계와 사하라 이남 아프리카의 경계를 비교해 보세요.',
    presetConfig: {
      baseLayer: 'climate',
      showPork: true,
      showBeef: false,
      overlayMode: 'pattern',
      overlayOpacity: 75,
      regionId: 'mena',
      highlightExceptions: false,
      focusCountryKey: '682',
    },
  },
  {
    id: 'mission-2',
    stepLabel: '탐구 2단계',
    title: '인도 몬순 농경과 소고기 금기 탐구하기',
    question:
      '수자원이 상대적으로 풍부한 남아시아 몬순 지역에서 왜 고기를 얻기 위해 소를 도축하는 것이 금기시되었을까요?',
    hint: '인도(356)와 네팔(524)을 클릭해 소가 고기 외에 농경 사회에 제공하는 가치(쟁기질·우유·연료)를 확인해 보세요.',
    presetConfig: {
      baseLayer: 'climate',
      showPork: true,
      showBeef: true,
      overlayMode: 'pattern',
      overlayOpacity: 80,
      regionId: 'south_asia',
      highlightExceptions: false,
      focusCountryKey: '356',
    },
  },
  {
    id: 'mission-3',
    stepLabel: '탐구 3단계',
    title: '기후 결정론의 반례: 열대 우림의 돼지고기 금기',
    question:
      '인도네시아와 말레이시아는 비가 매우 많이 오는 열대 우림인데, 왜 사막 지역과 똑같이 돼지고기를 금기시할까요?',
    hint: '예외 사례 강조를 켜고 인도네시아(파란색 열대 바탕 + 보라색 금기 사선)와 인접한 태국·베트남·필리핀을 비교해 보세요.',
    presetConfig: {
      baseLayer: 'climate',
      showPork: true,
      showBeef: false,
      overlayMode: 'pattern',
      overlayOpacity: 75,
      regionId: 'se_asia',
      highlightExceptions: true,
      focusCountryKey: '360',
    },
  },
];

export interface WorksheetQuestion {
  id: string;
  title: string;
  prompt: string;
  options: { id: string; text: string; isCorrect: boolean; feedback: string }[];
  inspectPreset: {
    regionId: string;
    focusCountryKey: string;
    baseLayer: 'climate' | 'water';
    showPork: boolean;
    showBeef: boolean;
    highlightExceptions: boolean;
  };
  inspectLabel: string;
}

export const WORKSHEET_QUESTIONS: WorksheetQuestion[] = [
  {
    id: 'q1',
    title: '문항 01. 서남아시아와 돼지 사육의 생태적 한계',
    prompt:
      '서남아시아·북아프리카의 건조 기후대에서 돼지고기 금기가 정착한 자연지리적·생태적 배경으로 가장 타당한 것은?',
    options: [
      {
        id: 'a',
        text: '돼지는 땀샘이 거의 없고 인간과 곡물·수자원을 두고 직접 경쟁해 건조 지역에서 사육 비용이 극도로 높기 때문이다.',
        isCorrect: true,
        feedback:
          '정답입니다! 돼지는 잡식성이라 풀만 먹고 살 수 없으며, 땀샘이 없어 고온 건조한 환경에서는 막대한 물과 그늘이 필요해 사육 효율이 크게 떨어집니다.',
      },
      {
        id: 'b',
        text: '돼지가 사막의 모래를 너무 빨리 파헤쳐 사막화를 가속하는 유일한 가축이었기 때문이다.',
        isCorrect: false,
        feedback:
          '아쉽습니다. 사막화보다는 돼지의 생리적 특성(땀샘 부재로 인한 수분·그늘 필요)과 식성(인간과 곡물 경쟁)이 핵심 원인입니다.',
      },
      {
        id: 'c',
        text: '서남아시아에는 연 강수량이 2,000mm를 넘어 돼지가 늪에 빠질 위험이 컸기 때문이다.',
        isCorrect: false,
        feedback:
          '지도에서 사우디아라비아·이집트의 강수량(50~60mm)을 다시 확인해 보세요. 서남아시아는 극건조 사막·반건조 기후입니다.',
      },
    ],
    inspectPreset: {
      regionId: 'mena',
      focusCountryKey: '682',
      baseLayer: 'water',
      showPork: true,
      showBeef: false,
      highlightExceptions: false,
    },
    inspectLabel: '서남아 수자원 스트레스 지도 보기',
  },
  {
    id: 'q2',
    title: '문항 02. 인도의 소고기 금기와 생존 경제',
    prompt:
      '인도에서 소를 도축하지 않고 신성시하는 힌두교 규범(아힘사)을 생태·지리적으로 해석할 때 가장 적절한 설명은?',
    options: [
      {
        id: 'a',
        text: '인도에서는 소가 자랄 수 없는 한대 기후여서 희귀 동물로 보호받았다.',
        isCorrect: false,
        feedback:
          '지도에서 인도의 기후를 확인해 보세요. 인도는 열대 몬순 기후로, 소는 농경에 널리 활용되어 왔습니다.',
      },
      {
        id: 'b',
        text: '살아있는 소가 매년 제공하는 쟁기질(농업 노동력), 우유, 연료용 쇠똥의 가치가 일회성 고기보다 훨씬 크기 때문이다.',
        isCorrect: true,
        feedback:
          '정답입니다! 인구 밀도가 높은 몬순 벼·밭농사 지대에서 가뭄이나 흉년 때 소를 잡아먹으면 다음 해 농사를 지을 동력을 잃게 되므로, 살아있는 소를 보호하는 문화적 금기가 생존 전략으로 기능했습니다.',
      },
      {
        id: 'c',
        text: '인도에는 돼지고기 생산량이 지나치게 많아 소고기를 먹을 필요가 없었기 때문이다.',
        isCorrect: false,
        feedback:
          '인도에는 무슬림 인구도 많아 돼지고기 역시 보편적 대체재가 아니었습니다. 소의 농경·재생 자원 가치가 핵심입니다.',
      },
    ],
    inspectPreset: {
      regionId: 'south_asia',
      focusCountryKey: '356',
      baseLayer: 'climate',
      showPork: false,
      showBeef: true,
      highlightExceptions: false,
    },
    inspectLabel: '남아시아 소고기 금기 지도 보기',
  },
  {
    id: 'q3',
    title: '문항 03. 자연환경만으로는 설명되지 않는 문화 전파',
    prompt:
      '지도에서 동남아시아를 관찰할 때, "종교적 금기 음식은 오직 기후 환경에 의해서만 결정된다"는 환경결정론을 반박할 수 있는 가장 좋은 근거는?',
    options: [
      {
        id: 'a',
        text: '습윤한 열대 우림인 인도네시아·말레이시아에서도 해상 교역으로 전파된 이슬람 문화 때문에 돼지고기가 금기시된다.',
        isCorrect: true,
        feedback:
          '정확합니다! 인도네시아(연 강수량 2,700mm 이상)는 생태적으로는 돼지 사육에 매우 유리하지만, 종교·문화 전파가 자연환경의 제약을 넘어 식문화를 결정한 대표 사례입니다.',
      },
      {
        id: 'b',
        text: '유럽은 건조 사막이 많아서 전 지역에서 돼지고기와 소고기를 모두 금지한다.',
        isCorrect: false,
        feedback:
          '유럽은 온대·서안 해양성 기후로 물과 목초지가 풍부하며, 육류 금기 지역이 아닙니다.',
      },
      {
        id: 'c',
        text: '한국과 일본은 사막 기후이지만 예외적으로 돼지고기를 많이 소비한다.',
        isCorrect: false,
        feedback:
          '한국과 일본은 사계절 계절풍 습윤 기후(연 강수량 1,200~1,600mm)입니다.',
      },
    ],
    inspectPreset: {
      regionId: 'se_asia',
      focusCountryKey: '360',
      baseLayer: 'climate',
      showPork: true,
      showBeef: false,
      highlightExceptions: true,
    },
    inspectLabel: '동남아 예외 사례 지도 보기',
  },
  {
    id: 'q4',
    title: '문항 04. 복합적 지리 사고: 한 국가 내 점이지대',
    prompt:
      '사하라 사막 남쪽 경계(사헬 지대)에 위치한 나이지리아 등에서 나타나는 지리적 특징으로 옳은 것은?',
    options: [
      {
        id: 'a',
        text: '북부 건조 사헬 지역은 이슬람권(돼지 금기), 남부 열대 습윤 지역은 기독교권(비금기)으로 기후대와 종교 경계가 겹쳐 나타난다.',
        isCorrect: true,
        feedback:
          '정답입니다! 사하라 횡단 교역로와 건조-습윤 점이지대(사헬)를 따라 종교적 영향력과 목축·농경 생활양식이 뚜렷하게 분화되었습니다.',
      },
      {
        id: 'b',
        text: '아프리카 대륙 전체가 힌두교 문화권이어서 소고기 금기만 나타난다.',
        isCorrect: false,
        feedback:
          '지도에서 아프리카의 금기 오버레이 색상을 확인해 보세요. 북부·사헬·동아프리카 일부는 돼지고기 금기(이슬람·에티오피아 정교회)가 나타납니다.',
      },
      {
        id: 'c',
        text: '사헬 지대는 연 강수량 3,000mm 이상의 열대 우림이다.',
        isCorrect: false,
        feedback:
          '사헬 지대는 사하라 사막 남쪽 가장자리의 반건조 스텝 기후 지대입니다.',
      },
    ],
    inspectPreset: {
      regionId: 'world',
      focusCountryKey: '566',
      baseLayer: 'climate',
      showPork: true,
      showBeef: true,
      highlightExceptions: false,
    },
    inspectLabel: '아프리카 나이지리아 위치 보기',
  },
];

export interface TabooSummaryStats {
  aridTotal: number;
  aridPorkTabooCount: number;
  aridPorkPercent: number;
  totalPorkTabooCount: number;
  porkInDryCount: number;
  porkInWetExceptionCount: number;
}

export function computeCorrelationStats(
  profiles: { climateCategory: string; taboo: DietaryTaboo; isClimateException?: boolean }[]
): TabooSummaryStats {
  const aridOrSemi = profiles.filter(
    (p) => p.climateCategory === 'arid' || p.climateCategory === 'semiarid'
  );
  const aridPork = aridOrSemi.filter((p) => p.taboo === 'pork' || p.taboo === 'both');

  const allPork = profiles.filter((p) => p.taboo === 'pork' || p.taboo === 'both');
  const porkInDry = allPork.filter(
    (p) => p.climateCategory === 'arid' || p.climateCategory === 'semiarid'
  );
  const porkInWetException = allPork.filter((p) => Boolean(p.isClimateException));

  return {
    aridTotal: aridOrSemi.length,
    aridPorkTabooCount: aridPork.length,
    aridPorkPercent: aridOrSemi.length ? Math.round((aridPork.length / aridOrSemi.length) * 100) : 0,
    totalPorkTabooCount: allPork.length,
    porkInDryCount: porkInDry.length,
    porkInWetExceptionCount: porkInWetException.length,
  };
}
