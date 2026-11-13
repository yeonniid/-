export type ClimateCategory =
  | 'arid'
  | 'semiarid'
  | 'temperate'
  | 'tropical'
  | 'continental'
  | 'polar';

export type WaterStressLevel = 'extreme' | 'high' | 'medium' | 'low';

export type DietaryTaboo = 'pork' | 'beef' | 'both' | 'none';

export type WorldRegion =
  | 'mena'
  | 'south_asia'
  | 'se_asia'
  | 'east_asia'
  | 'europe'
  | 'sub_saharan'
  | 'americas'
  | 'oceania';

export interface CountryGeoProfile {
  key: string;
  nameKo: string;
  nameEn: string;
  region: WorldRegion;
  climateCategory: ClimateCategory;
  climateLabel: string;
  precipitationMm: number;
  waterStressLevel: WaterStressLevel;
  waterStressPercent: number;
  taboo: DietaryTaboo;
  religionLabel: string;
  isClimateException?: boolean;
  caseNote: string;
}

export const CLIMATE_META: Record<
  ClimateCategory,
  { label: string; shortLabel: string; rangeText: string; color: string; textColor: string }
> = {
  arid: {
    label: '극건조·사막 기후 (BW)',
    shortLabel: '사막·극건조',
    rangeText: '연 강수량 < 250mm',
    color: '#D97706',
    textColor: '#92400E',
  },
  semiarid: {
    label: '스텝·반건조 기후 (BS)',
    shortLabel: '스텝·반건조',
    rangeText: '연 강수량 250–500mm',
    color: '#FBBF24',
    textColor: '#92400E',
  },
  temperate: {
    label: '온대·지중해성 기후 (C)',
    shortLabel: '온대 습윤·지중해',
    rangeText: '연 강수량 500–1,200mm',
    color: '#34D399',
    textColor: '#065F46',
  },
  tropical: {
    label: '열대 우림·몬순·사바나 (A)',
    shortLabel: '열대·몬순 다우',
    rangeText: '연 강수량 > 1,200mm',
    color: '#0EA5E9',
    textColor: '#075985',
  },
  continental: {
    label: '냉대·대륙성 기후 (D)',
    shortLabel: '냉대·대륙성',
    rangeText: '한랭 건조~습윤',
    color: '#6EE7B7',
    textColor: '#065F46',
  },
  polar: {
    label: '한대·고산 기후 (E/H)',
    shortLabel: '한대·고산',
    rangeText: '연평균 기온 < 10°C',
    color: '#94A3B8',
    textColor: '#334155',
  },
};

export const WATER_STRESS_META: Record<
  WaterStressLevel,
  { label: string; shortLabel: string; rangeText: string; color: string }
> = {
  extreme: {
    label: '극심한 물 부족 (80% 이상)',
    shortLabel: '극심 (>80%)',
    rangeText: '수자원 취수율 > 80%',
    color: '#B91C1C',
  },
  high: {
    label: '높은 물 스트레스 (40–80%)',
    shortLabel: '높음 (40–80%)',
    rangeText: '수자원 취수율 40–80%',
    color: '#EA580C',
  },
  medium: {
    label: '보통 물 스트레스 (20–40%)',
    shortLabel: '보통 (20–40%)',
    rangeText: '수자원 취수율 20–40%',
    color: '#EAB308',
  },
  low: {
    label: '풍부한 수자원 (20% 미만)',
    shortLabel: '풍부 (<20%)',
    rangeText: '수자원 취수율 < 20%',
    color: '#14B8A6',
  },
};

export const TABOO_META: Record<
  DietaryTaboo,
  { label: string; shortLabel: string; color: string; patternId: string; description: string }
> = {
  pork: {
    label: '돼지고기 금기 (할랄·코셔 등)',
    shortLabel: '돼지고기 금기',
    color: '#6D28D9',
    patternId: 'pattern-pork',
    description: '이슬람교(할랄), 유대교(코셔), 에티오피아 정교회 등에서 돼지고기 섭취를 엄격히 금합니다.',
  },
  beef: {
    label: '소고기 금기 (힌두교 아힘사)',
    shortLabel: '소고기 금기',
    color: '#BE123C',
    patternId: 'pattern-beef',
    description: '힌두교 문화권에서 소를 신성한 생명 및 농경의 동반자로 여겨 도축과 섭취를 금합니다.',
  },
  both: {
    label: '돼지·소 복합 금기 지역',
    shortLabel: '돼지·소 복합 금기',
    color: '#0F172A',
    patternId: 'pattern-both',
    description: '힌두교(소고기 금기)와 이슬람교(돼지고기 금기) 인구가 크게 공존하여 두 육류 모두 금기 경향이 공존합니다.',
  },
  none: {
    label: '종교적 육류 금기 없음',
    shortLabel: '금기 없음',
    color: 'transparent',
    patternId: '',
    description: '기독교·불교·세속 문화권 등으로 돼지고기와 소고기 모두 보편적으로 사육 및 소비됩니다.',
  },
};

export interface RegionPreset {
  id: string;
  label: string;
  center: [number, number];
  scale: number;
}

export const REGION_PRESETS: RegionPreset[] = [
  { id: 'world', label: '전 세계', center: [12, 14], scale: 165 },
  { id: 'mena', label: '서남아·북아프리카', center: [30, 26], scale: 360 },
  { id: 'south_asia', label: '남아시아 (인도)', center: [78, 22], scale: 520 },
  { id: 'se_asia', label: '동남아시아', center: [112, 4], scale: 450 },
  { id: 'east_asia', label: '동아시아·유럽', center: [65, 42], scale: 260 },
];

type CompactEntry = [
  key: string,
  nameKo: string,
  nameEn: string,
  region: WorldRegion,
  climateCategory: ClimateCategory,
  climateLabel: string,
  precipitationMm: number,
  waterStressLevel: WaterStressLevel,
  waterStressPercent: number,
  taboo: DietaryTaboo,
  religionLabel: string,
  isClimateException?: boolean,
  caseNote?: string
];

const RAW_COUNTRIES: CompactEntry[] = [
  // === MENA (서남아시아 및 북아프리카) ===
  ['682', '사우디아라비아', 'Saudi Arabia', 'mena', 'arid', 'BWh · 열대 사막', 59, 'extreme', 98, 'pork', '이슬람(할랄)', false, '연 강수량 60mm 미만의 극건조 사막 기후입니다. 땀샘이 없어 수분과 그늘이 필수적이고 인간과 곡물·물을 두고 경쟁하는 돼지 사육은 생태적으로 막대한 손실이었으며, 유목에 적합한 낙타·양 중심의 목축과 돼지고기 금기 규범이 맞물렸습니다.'],
  ['818', '이집트', 'Egypt', 'mena', 'arid', 'BWh · 사막·나일강 오아시스', 51, 'extreme', 96, 'pork', '이슬람(할랄)', false, '나일강 유역을 제외한 대부분이 사막입니다. 고대 이집트 초기에는 나일강 습지에서 돼지를 길렀으나, 인구 증가와 건조화·산림 감소가 심화되며 곡물·물 효율이 떨어지는 돼지를 부정한 동물로 배척하게 된 대표적 사례입니다.'],
  ['376', '이스라엘', 'Israel', 'mena', 'semiarid', 'BSh/Csa · 지중해·반건조', 435, 'extreme', 91, 'pork', '유대교(코셔)', false, '유대교 율법(카슈루트)에서 되새김질하지 않고 굽만 갈라진 돼지를 금기시합니다. 레반트 지역의 건조한 여름과 한정된 수자원, 유목 및 소규모 농경 환경에서 돼지 사육의 생태적 비효율과 맞물린 대표 사례입니다.'],
  ['275', '팔레스타인', 'Palestine', 'mena', 'semiarid', 'BSh/Csa · 반건조 지중해', 402, 'extreme', 88, 'pork', '이슬람(할랄)', false, '건조한 여름과 높은 수자원 스트레스를 겪는 레반트 지역으로 이슬람 할랄 규범에 따라 돼지고기를 금기시합니다.'],
  ['364', '이란', 'Iran', 'mena', 'arid', 'BWk/BSk · 고원 사막·스텝', 228, 'extreme', 84, 'pork', '이슬람(시아파)', false, '이란 고원의 건조·반건조 환경에서 산악 유목(양·염소)과 카나트(지하 관개수로) 농업이 발달했으며, 돼지 사육은 수자원·사료 효율 면에서 부적합했습니다.'],
  ['368', '이라크', 'Iraq', 'mena', 'arid', 'BWh · 사막·메소포타미아', 216, 'extreme', 89, 'pork', '이슬람(할랄)', false, '티그리스·유프라테스 강 유역의 높은 증발량과 고온 건조 기후 속에서 돼지는 땀샘 부재로 열 스트레스가 극심해 정착 농경·유목 체계에서 배제되었습니다.'],
  ['792', '튀르키예', 'Turkey', 'mena', 'semiarid', 'BSk/Csa · 아나톨리아 스텝·지중해', 593, 'high', 56, 'pork', '이슬람(수니파)', false, '아나톨리아 내륙의 건조 스텝과 지중해성 기후가 나타나며, 양·소 중심의 목축과 이슬람 할랄 문화가 결합해 돼지고기 소비가 극히 제한적입니다.'],
  ['760', '시리아', 'Syria', 'mena', 'semiarid', 'BSh/BWk · 반건조·사막', 252, 'extreme', 86, 'pork', '이슬람(할랄)', false, '비옥한 초승달 지대 일부이지만 내륙 대부분이 반건조~사막이며 심각한 물 스트레스를 겪습니다.'],
  ['400', '요르단', 'Jordan', 'mena', 'arid', 'BWh · 사막', 111, 'extreme', 94, 'pork', '이슬람(할랄)', false, '세계 최상위권 물 부족 국가로, 수분 소모가 큰 돼지 사육 대신 건조 적응력이 높은 염소·양 사육이 전통적입니다.'],
  ['422', '레바논', 'Lebanon', 'mena', 'temperate', 'Csa · 지중해성', 661, 'high', 62, 'pork', '이슬람·기독교 공존', false, '기독교 인구가 공존하는 일부 지역에서는 돼지고기가 소비되나, 무슬림 인구가 다수이며 건조한 여름철 수자원 제약이 큽니다.'],
  ['887', '예멘', 'Yemen', 'mena', 'arid', 'BWh · 고온 사막', 167, 'extreme', 95, 'pork', '이슬람(할랄)'],
  ['512', '오만', 'Oman', 'mena', 'arid', 'BWh · 사막', 125, 'extreme', 93, 'pork', '이슬람(할랄)'],
  ['784', '아랍에미리트', 'United Arab Emirates', 'mena', 'arid', 'BWh · 사막', 78, 'extreme', 99, 'pork', '이슬람(할랄)'],
  ['634', '카타르', 'Qatar', 'mena', 'arid', 'BWh · 사막', 74, 'extreme', 99, 'pork', '이슬람(할랄)'],
  ['414', '쿠웨이트', 'Kuwait', 'mena', 'arid', 'BWh · 사막', 121, 'extreme', 98, 'pork', '이슬람(할랄)'],
  ['012', '알제리', 'Algeria', 'mena', 'arid', 'BWh · 사하라 사막', 89, 'extreme', 88, 'pork', '이슬람(할랄)'],
  ['434', '리비아', 'Libya', 'mena', 'arid', 'BWh · 사하라 사막', 56, 'extreme', 95, 'pork', '이슬람(할랄)'],
  ['504', '모로코', 'Morocco', 'mena', 'semiarid', 'BSh/Csa · 반건조·아틀라스', 346, 'high', 68, 'pork', '이슬람(할랄)'],
  ['788', '튀니지', 'Tunisia', 'mena', 'semiarid', 'BSh/Csa · 지중해·반건조', 207, 'extreme', 82, 'pork', '이슬람(할랄)'],
  ['732', '서사하라', 'W. Sahara', 'mena', 'arid', 'BWh · 사하라 사막', 45, 'extreme', 92, 'pork', '이슬람(할랄)'],
  ['478', '모리타니', 'Mauritania', 'mena', 'arid', 'BWh · 사하라·사헬', 92, 'high', 61, 'pork', '이슬람(할랄)'],
  ['729', '수단', 'Sudan', 'mena', 'arid', 'BWh · 사하라·사헬', 250, 'high', 72, 'pork', '이슬람(할랄)'],
  ['004', '아프가니스탄', 'Afghanistan', 'mena', 'semiarid', 'BWk/BSk · 건조 산악', 327, 'high', 74, 'pork', '이슬람(할랄)'],
  ['398', '카자흐스탄', 'Kazakhstan', 'mena', 'semiarid', 'BSk/BWk · 중앙아시아 스텝', 250, 'medium', 36, 'pork', '이슬람(세속 혼재)', false, '광활한 건조 스텝 초원에서 말·양 유목 문화가 발달했으며 이슬람 문화권 영향으로 돼지고기 금기가 널리 유지됩니다.'],
  ['860', '우즈베키스탄', 'Uzbekistan', 'mena', 'arid', 'BWk · 내륙 사막·오아시스', 206, 'extreme', 89, 'pork', '이슬람(할랄)'],
  ['795', '투르크메니스탄', 'Turkmenistan', 'mena', 'arid', 'BWk · 카라쿰 사막', 161, 'extreme', 92, 'pork', '이슬람(할랄)'],
  ['417', '키르기스스탄', 'Kyrgyzstan', 'mena', 'semiarid', 'BSk/D · 톈산 고산 스텝', 533, 'medium', 38, 'pork', '이슬람(할랄)'],
  ['762', '타지키스탄', 'Tajikistan', 'mena', 'semiarid', 'BSk/D · 파미르 고산', 691, 'medium', 35, 'pork', '이슬람(할랄)'],
  ['031', '아제르바이잔', 'Azerbaijan', 'mena', 'semiarid', 'BSk · 카스피해 반건조', 447, 'high', 55, 'pork', '이슬람(시아파)'],
  ['196', '키프로스', 'Cyprus', 'mena', 'semiarid', 'BSh/Csa · 지중해 반건조', 498, 'high', 64, 'none', '그리스 정교회'],
  ['N. Cyprus', '북키프로스', 'N. Cyprus', 'mena', 'semiarid', 'BSh/Csa · 지중해 반건조', 450, 'high', 65, 'pork', '이슬람(할랄)'],

  // === SOUTH ASIA (남아시아) ===
  ['356', '인도', 'India', 'south_asia', 'tropical', 'Am/Aw · 열대 몬순·사바나', 1083, 'high', 69, 'both', '힌두교(소 금기) · 이슬람 공존', false, '인구 밀도가 매우 높은 몬순 농업 지대입니다. 힌두교의 아힘사(불살생) 사상으로 소를 신성시하여 소고기를 금기시하는데, 마빈 해리스 등의 생태인류학 연구는 소가 쟁기질(농업 노동력), 우유, 연료용 쇠똥을 제공하는 살아있는 생산 수단이었음을 강조합니다. 북부 무슬림 인구는 돼지고기를 금기시해 복합 금기 양상을 보입니다.'],
  ['524', '네팔', 'Nepal', 'south_asia', 'temperate', 'Cwa/H · 몬순 온대·히말라야', 1500, 'low', 14, 'beef', '힌두교(소 금기)', false, '세계 유일의 힌두교 국가 전통이 강하게 남아 소 도축을 법적·종교적으로 금지합니다. 산악 농경에서 소의 쟁기질과 유제품 가치가 매우 큽니다.'],
  ['586', '파키스탄', 'Pakistan', 'south_asia', 'arid', 'BWh/BSh · 인더스 건조·반건조', 494, 'extreme', 85, 'pork', '이슬람(할랄)', false, '인더스강 관개에 의존하는 건조·반건조 지역으로 물 스트레스가 매우 높으며, 이슬람 할랄 규범에 따라 돼지고기를 엄격히 금합니다.'],
  ['050', '방글라데시', 'Bangladesh', 'south_asia', 'tropical', 'Am · 열대 몬순 다우', 2666, 'low', 12, 'pork', '이슬람(할랄)', true, '연 강수량 2,600mm가 넘는 습윤 몬순 삼각주이지만, 역사적 이슬람 전파로 인해 돼지고기를 금기시하는 대표적 기후 예외 사례입니다.'],
  ['144', '스리랑카', 'Sri Lanka', 'south_asia', 'tropical', 'Af/Am · 열대 우림·몬순', 1712, 'medium', 28, 'none', '불교·힌두교 공존', false, '불교도가 다수이나 힌두교·이슬람 소수 공동체도 있어 지역별로 소·돼지 소비가 갈립니다.'],
  ['064', '부탄', 'Bhutan', 'south_asia', 'temperate', 'Cwb/H · 히말라야 고산 몬순', 2200, 'low', 4, 'none', '티베트 불교', false, '불교 불살생 교리 영향으로 국내 도축을 억제하나, 수입 육류 소비가 이루어지며 특정 축종만의 절대적 교리 금기는 아닙니다.'],

  // === SOUTHEAST ASIA (동남아시아 — 문화 전파 예외 사례 핵심!) ===
  ['360', '인도네시아', 'Indonesia', 'se_asia', 'tropical', 'Af/Am · 열대 우림·몬순', 2702, 'low', 15, 'pork', '이슬람(할랄)', true, '★ 핵심 예외 사례: 연 강수량 2,700mm가 넘는 고온다습한 열대 우림으로 생태적으로는 돼지 사육에 매우 유리한 환경입니다. 실제로 힌두교 문화가 남은 발리 섬에서는 돼지고기 요리가 발달했으나, 해상 교역을 통한 이슬람 전파로 전국 대부분에서 돼지고기가 금기시되었습니다.'],
  ['458', '말레이시아', 'Malaysia', 'se_asia', 'tropical', 'Af · 열대 우림', 2875, 'low', 8, 'pork', '이슬람(할랄)', true, '★ 핵심 예외 사례: 열대 우림 기후로 물과 숲 그늘이 풍부해 야생 멧돼지 서식에 이상적이나, 말레이 세계의 이슬람화로 돼지고기 금기(할랄)가 정착했습니다.'],
  ['096', '브루나이', 'Brunei', 'se_asia', 'tropical', 'Af · 열대 우림', 2722, 'low', 5, 'pork', '이슬람(할랄)', true, '보르네오 섬의 습윤한 열대 우림 기후이지만 이슬람 국교 체제로 돼지고기가 엄격히 금기시됩니다.'],
  ['764', '태국', 'Thailand', 'se_asia', 'tropical', 'Aw/Am · 열대 사바나·몬순', 1622, 'medium', 23, 'none', '상좌부 불교', false, '인도네시아·말레이시아와 유사한 동남아 열대 몬순 기후이지만 불교 문화권으로 돼지고기·소고기 모두 금기 없이 활발히 소비됩니다(대조군).'],
  ['704', '베트남', 'Vietnam', 'se_asia', 'tropical', 'Aw/Am · 열대 몬순', 1821, 'medium', 21, 'none', '불교·유교·민속', false, '동일한 열대·아열대 습윤 환경 속에서 논농사 부산물을 활용한 돼지 사육이 매우 발달한 대조군입니다.'],
  ['608', '필리핀', 'Philippines', 'se_asia', 'tropical', 'Af/Am · 열대 우림·몬순', 2348, 'low', 18, 'none', '가톨릭(기독교)', false, '습윤한 열대 도서 환경에서 스페인 식민기 가톨릭 전파와 결합해 돼지고기(레촌 등) 식문화가 크게 발달했습니다.'],
  ['116', '캄보디아', 'Cambodia', 'se_asia', 'tropical', 'Aw · 열대 사바나', 1904, 'low', 7, 'none', '상좌부 불교'],
  ['418', '라오스', 'Laos', 'se_asia', 'tropical', 'Aw · 열대 사바나', 1834, 'low', 6, 'none', '상좌부 불교'],
  ['104', '미얀마', 'Myanmar', 'se_asia', 'tropical', 'Am/Aw · 열대 몬순', 2091, 'low', 9, 'none', '상좌부 불교'],
  ['626', '동티모르', 'Timor-Leste', 'se_asia', 'tropical', 'Aw · 열대 사바나', 1500, 'low', 10, 'none', '가톨릭'],
  ['598', '파푸아뉴기니', 'Papua New Guinea', 'se_asia', 'tropical', 'Af · 열대 우림', 3142, 'low', 2, 'none', '기독교·전통신앙', false, '열대 다우 산림 지대에서 전통적으로 돼지가 부와 의례의 상징으로 매우 중요하게 사육되어 온 대조 사례입니다.'],

  // === EAST ASIA (동아시아) ===
  ['410', '대한민국', 'South Korea', 'east_asia', 'temperate', 'Dwa/Cfa · 냉·온대 계절풍', 1274, 'medium', 37, 'none', '종교 다원·무종교', false, '사계절이 뚜렷하고 여름철 강수가 집중되는 온·냉대 습윤 환경으로, 돼지고기와 소고기 모두 종교적 금기 없이 널리 소비됩니다.'],
  ['408', '북한', 'North Korea', 'east_asia', 'continental', 'Dwa · 냉대 겨울건조', 1054, 'low', 18, 'none', '무종교'],
  ['156', '중국', 'China', 'east_asia', 'temperate', 'Cfa/Dwa/BWk · 온대·대륙성(서부 건조)', 645, 'high', 46, 'none', '유교·불교·도교·무종교', false, '세계 최대의 돼지고기 생산·소비국으로, 동부 온대·아열대 습윤 농경지대에서 촌락 단위 돼지 사육(집 가 家 글자에 돼지 시 豕 포함)이 발달했습니다. 단, 서북부 건조 신장·닝샤 지역은 이슬람 영향으로 돼지고기를 금합니다.'],
  ['392', '일본', 'Japan', 'east_asia', 'temperate', 'Cfa · 온대 해양성·계절풍', 1668, 'medium', 24, 'none', '신토·불교'],
  ['158', '대만', 'Taiwan', 'east_asia', 'tropical', 'Cfa/Af · 아열대 습윤', 2400, 'medium', 31, 'none', '불교·도교'],
  ['496', '몽골', 'Mongolia', 'east_asia', 'semiarid', 'BSk/BWk · 한랭 스텝·고비 사막', 241, 'low', 11, 'none', '티베트 불교', false, '건조 초원 유목 지대여서 말·양·소·염소 목축이 중심이며 정착형 가축인 돼지 사육은 극히 적지만, 종교적 교리에 의한 금기는 아닙니다.'],

  // === EUROPE (유럽) ===
  ['276', '독일', 'Germany', 'europe', 'temperate', 'Cfb · 서안 해양성', 700, 'medium', 22, 'none', '기독교·세속', false, '연중 고른 강수와 온화한 서안 해양성 기후로 목초지와 참나무 숲(도토리 사료)이 풍부해 전통적으로 돼지고기·소고기 식문화가 모두 발달했습니다.'],
  ['250', '프랑스', 'France', 'europe', 'temperate', 'Cfb · 서안 해양성·지중해', 867, 'medium', 21, 'none', '가톨릭·세속'],
  ['826', '영국', 'United Kingdom', 'europe', 'temperate', 'Cfb · 서안 해양성', 1220, 'low', 16, 'none', '성공회·세속'],
  ['724', '스페인', 'Spain', 'europe', 'temperate', 'Csa/BSk · 지중해성·내륙', 636, 'high', 44, 'none', '가톨릭', false, '지중해성 건조 여름이 있으나 참나무 숲(데헤사) 방목 체계를 통해 이베리코 돼지 사육이 고유하게 발달한 기독교 문화권입니다.'],
  ['380', '이탈리아', 'Italy', 'europe', 'temperate', 'Csa/Cfa · 지중해성·온대', 832, 'medium', 32, 'none', '가톨릭'],
  ['620', '포르투갈', 'Portugal', 'europe', 'temperate', 'Csa/Csb · 지중해성', 854, 'medium', 25, 'none', '가톨릭'],
  ['616', '폴란드', 'Poland', 'europe', 'continental', 'Dfb/Cfb · 온대·냉대 점이', 600, 'low', 15, 'none', '가톨릭'],
  ['804', '우크라이나', 'Ukraine', 'europe', 'continental', 'Dfb · 대륙성 초원(체르노젬)', 565, 'low', 16, 'none', '정교회'],
  ['643', '러시아', 'Russia', 'europe', 'continental', 'Dfb/Dfc · 냉대 대륙성', 460, 'low', 8, 'none', '러시아 정교회'],
  ['752', '스웨덴', 'Sweden', 'europe', 'continental', 'Dfc/Dfb · 냉대', 624, 'low', 3, 'none', '개신교(루터교)'],
  ['578', '노르웨이', 'Norway', 'europe', 'continental', 'Dfc/Cfc · 냉대·서안 해양', 1414, 'low', 2, 'none', '개신교(루터교)'],
  ['246', '핀란드', 'Finland', 'europe', 'continental', 'Dfc · 냉대', 536, 'low', 3, 'none', '개신교(루터교)'],
  ['208', '덴마크', 'Denmark', 'europe', 'temperate', 'Cfb · 서안 해양성', 703, 'low', 14, 'none', '개신교', false, '인구보다 많은 돼지를 사육할 만큼 온대 습윤 낙농·양돈 산업이 발달한 유럽 대표 사례입니다.'],
  ['528', '네덜란드', 'Netherlands', 'europe', 'temperate', 'Cfb · 서안 해양성', 778, 'low', 17, 'none', '기독교·세속'],
  ['056', '벨기에', 'Belgium', 'europe', 'temperate', 'Cfb · 서안 해양성', 847, 'medium', 31, 'none', '가톨릭'],
  ['442', '룩셈부르크', 'Luxembourg', 'europe', 'temperate', 'Cfb · 서안 해양성', 934, 'low', 14, 'none', '가톨릭'],
  ['756', '스위스', 'Switzerland', 'europe', 'temperate', 'Cfb/H · 알프스 고산·온대', 1537, 'low', 6, 'none', '기독교'],
  ['040', '오스트리아', 'Austria', 'europe', 'temperate', 'Dfb/Cfb · 알프스·온대', 1110, 'low', 5, 'none', '가톨릭'],
  ['203', '체코', 'Czechia', 'europe', 'temperate', 'Cfb/Dfb · 온대 대륙성', 677, 'low', 19, 'none', '무종교·가톨릭'],
  ['703', '슬로바키아', 'Slovakia', 'europe', 'continental', 'Dfb · 냉대 습윤', 824, 'low', 7, 'none', '가톨릭'],
  ['348', '헝가리', 'Hungary', 'europe', 'temperate', 'Cfb/Dfb · 판노니아 평원', 589, 'low', 12, 'none', '가톨릭'],
  ['642', '루마니아', 'Romania', 'europe', 'continental', 'Dfb · 대륙성', 637, 'low', 16, 'none', '정교회'],
  ['100', '불가리아', 'Bulgaria', 'europe', 'temperate', 'Cfa/Dfb · 온대·대륙성', 608, 'medium', 22, 'none', '정교회'],
  ['300', '그리스', 'Greece', 'europe', 'temperate', 'Csa · 지중해성', 652, 'high', 42, 'none', '그리스 정교회'],
  ['372', '아일랜드', 'Ireland', 'europe', 'temperate', 'Cfb · 서안 해양성', 1118, 'low', 3, 'none', '가톨릭'],
  ['352', '아이슬란드', 'Iceland', 'europe', 'polar', 'ET/Cfc · 한대·아한대', 1940, 'low', 1, 'none', '개신교'],
  ['112', '벨라루스', 'Belarus', 'europe', 'continental', 'Dfb · 냉대 습윤', 618, 'low', 6, 'none', '정교회'],
  ['498', '몰도바', 'Moldova', 'europe', 'continental', 'Dfb · 대륙성', 450, 'medium', 25, 'none', '정교회'],
  ['440', '리투아니아', 'Lithuania', 'europe', 'continental', 'Dfb · 냉대 습윤', 656, 'low', 4, 'none', '가톨릭'],
  ['428', '라트비아', 'Latvia', 'europe', 'continental', 'Dfb · 냉대 습윤', 641, 'low', 3, 'none', '기독교'],
  ['233', '에스토니아', 'Estonia', 'europe', 'continental', 'Dfb · 냉대 습윤', 626, 'low', 4, 'none', '무종교·기독교'],
  ['191', '크로아티아', 'Croatia', 'europe', 'temperate', 'Cfb/Csa · 온대·지중해', 1113, 'low', 5, 'none', '가톨릭'],
  ['705', '슬로베니아', 'Slovenia', 'europe', 'temperate', 'Cfb · 온대·고산', 1162, 'low', 4, 'none', '가톨릭'],
  ['070', '보스니아 헤르체고비나', 'Bosnia and Herz.', 'europe', 'temperate', 'Cfb · 온대·지중해', 1028, 'low', 6, 'pork', '이슬람(보슈냐크 다수)'],
  ['008', '알바니아', 'Albania', 'europe', 'temperate', 'Csa · 지중해성', 1485, 'low', 11, 'pork', '이슬람(다수)', true, '연 강수량 1,400mm가 넘는 습윤한 지중해성 기후이지만 오스만 제국 시기의 이슬람 전파로 무슬림 인구가 다수입니다.'],
  ['Kosovo', '코소보', 'Kosovo', 'europe', 'temperate', 'Cfb/Dfb · 온대 내륙', 720, 'low', 15, 'pork', '이슬람(다수)', true],
  ['807', '북마케도니아', 'Macedonia', 'europe', 'temperate', 'Cfa/BSk · 지중해·내륙', 619, 'medium', 27, 'none', '정교회·이슬람 공존'],
  ['688', '세르비아', 'Serbia', 'europe', 'temperate', 'Cfb/Cfa · 온대 대륙성', 686, 'low', 11, 'none', '정교회'],
  ['499', '몬테네그로', 'Montenegro', 'europe', 'temperate', 'Csa/Cfb · 지중해·산악', 1500, 'low', 4, 'none', '정교회'],
  ['268', '조지아', 'Georgia', 'europe', 'temperate', 'Cfa/H · 흑해 습윤·고산', 1026, 'low', 8, 'none', '조지아 정교회'],
  ['051', '아르메니아', 'Armenia', 'europe', 'semiarid', 'BSk/Dfa · 고산 반건조', 562, 'high', 52, 'none', '아르메니아 사도교회'],

  // === SUB-SAHARAN AFRICA (사하라 이남 아프리카) ===
  ['231', '에티오피아', 'Ethiopia', 'sub_saharan', 'semiarid', 'BSh/Cwb · 사바나·고산 반건조', 848, 'low', 16, 'pork', '에티오피아 정교회·이슬람', false, '주목할 사례: 이슬람교뿐만 아니라 고대 유대교 전통을 계승한 에티오피아 정교회 역시 돼지고기를 금기시합니다. 에티오피아 고원과 주변 건조 지대의 오랜 목축·농경 문화와 맞닿아 있습니다.'],
  ['706', '소말리아', 'Somalia', 'sub_saharan', 'arid', 'BWh · 열대 사막·건조', 282, 'high', 54, 'pork', '이슬람(할랄)'],
  ['Somaliland', '소말릴란드', 'Somaliland', 'sub_saharan', 'arid', 'BWh · 반건조·사막', 220, 'high', 55, 'pork', '이슬람(할랄)'],
  ['262', '지부티', 'Djibouti', 'sub_saharan', 'arid', 'BWh · 극건조 사막', 220, 'high', 58, 'pork', '이슬람(할랄)'],
  ['232', '에리트레아', 'Eritrea', 'sub_saharan', 'arid', 'BWh/BSh · 홍해 사막·스텝', 384, 'high', 48, 'pork', '이슬람·에리트레아 정교회'],
  ['562', '니제르', 'Niger', 'sub_saharan', 'arid', 'BWh · 사하라·사헬', 151, 'medium', 24, 'pork', '이슬람(할랄)'],
  ['148', '차드', 'Chad', 'sub_saharan', 'semiarid', 'BWh/BSh · 사헬 반건조', 322, 'low', 14, 'pork', '이슬람(할랄)'],
  ['466', '말리', 'Mali', 'sub_saharan', 'arid', 'BWh/BSh · 사하라·사헬', 282, 'low', 16, 'pork', '이슬람(할랄)'],
  ['686', '세네갈', 'Senegal', 'sub_saharan', 'semiarid', 'BSh/Aw · 사헬·사바나', 686, 'low', 12, 'pork', '이슬람(할랄)'],
  ['270', '감비아', 'Gambia', 'sub_saharan', 'tropical', 'Aw · 열대 사바나', 836, 'low', 11, 'pork', '이슬람(할랄)'],
  ['324', '기니', 'Guinea', 'sub_saharan', 'tropical', 'Aw/Am · 열대 사바나·몬순', 1651, 'low', 5, 'pork', '이슬람(할랄)', true, '강수량이 풍부한 서아프리카 열대 지역이나 무슬림 인구가 다수여서 돼지고기 금기가 확산된 사례입니다.'],
  ['694', '시에라리온', 'Sierra Leone', 'sub_saharan', 'tropical', 'Am · 열대 몬순', 2526, 'low', 4, 'pork', '이슬람(다수)', true],
  ['854', '부르키나파소', 'Burkina Faso', 'sub_saharan', 'semiarid', 'BSh/Aw · 사헬·사바나', 748, 'low', 13, 'pork', '이슬람(다수)'],
  ['566', '나이지리아', 'Nigeria', 'sub_saharan', 'tropical', 'Aw/BSh · 북부 사헬·남부 열대', 1150, 'low', 17, 'pork', '이슬람(북부)·기독교(남부)', false, '북부 건조 사헬 지대는 이슬람권(돼지고기 금기)인 반면, 남부 열대 습윤 지대는 기독교권(돼지고기 소비)으로 한 국가 내에서도 기후대·종교 경계가 뚜렷하게 나타납니다.'],
  ['624', '기니비사우', 'Guinea-Bissau', 'sub_saharan', 'tropical', 'Aw · 열대 사바나', 1577, 'low', 5, 'none', '이슬람·전통·기독교 혼재'],
  ['384', '코트디부아르', "Côte d'Ivoire", 'sub_saharan', 'tropical', 'Aw/Am · 열대 사바나·우림', 1348, 'low', 6, 'none', '이슬람·기독교 공존'],
  ['288', '가나', 'Ghana', 'sub_saharan', 'tropical', 'Aw · 열대 사바나', 1187, 'low', 7, 'none', '기독교(다수)'],
  ['768', '토고', 'Togo', 'sub_saharan', 'tropical', 'Aw · 열대 사바나', 1168, 'low', 6, 'none', '기독교·전통신앙'],
  ['204', '베냉', 'Benin', 'sub_saharan', 'tropical', 'Aw · 열대 사바나', 1039, 'low', 7, 'none', '기독교·전통·이슬람'],
  ['430', '라이베리아', 'Liberia', 'sub_saharan', 'tropical', 'Am · 열대 몬순', 2391, 'low', 2, 'none', '기독교(다수)'],
  ['120', '카메룬', 'Cameroon', 'sub_saharan', 'tropical', 'Af/Aw · 열대 우림·사바나', 1604, 'low', 4, 'none', '기독교(다수)'],
  ['140', '중앙아프리카공화국', 'Central African Rep.', 'sub_saharan', 'tropical', 'Aw · 열대 사바나', 1343, 'low', 2, 'none', '기독교'],
  ['728', '남수단', 'S. Sudan', 'sub_saharan', 'tropical', 'Aw · 열대 사바나', 900, 'low', 5, 'none', '기독교·전통신앙'],
  ['404', '케냐', 'Kenya', 'sub_saharan', 'semiarid', 'BSh/Aw · 사바나·반건조', 630, 'medium', 26, 'none', '기독교'],
  ['800', '우간다', 'Uganda', 'sub_saharan', 'tropical', 'Aw/Af · 열대 사바나', 1180, 'low', 7, 'none', '기독교'],
  ['834', '탄자니아', 'Tanzania', 'sub_saharan', 'tropical', 'Aw · 열대 사바나', 1071, 'low', 11, 'none', '기독교·이슬람 공존'],
  ['646', '르완다', 'Rwanda', 'sub_saharan', 'tropical', 'Aw/Cwb · 열대 고원', 1212, 'low', 9, 'none', '가톨릭·개신교'],
  ['108', '부룬디', 'Burundi', 'sub_saharan', 'tropical', 'Aw · 열대 고원', 1274, 'low', 8, 'none', '가톨릭'],
  ['180', '콩고민주공화국', 'Dem. Rep. Congo', 'sub_saharan', 'tropical', 'Af/Aw · 콩고 열대 우림', 1543, 'low', 2, 'none', '기독교'],
  ['178', '콩고공화국', 'Congo', 'sub_saharan', 'tropical', 'Af/Aw · 열대 우림', 1646, 'low', 2, 'none', '기독교'],
  ['266', '가봉', 'Gabon', 'sub_saharan', 'tropical', 'Af/Am · 열대 우림', 1831, 'low', 1, 'none', '기독교'],
  ['226', '적도기니', 'Eq. Guinea', 'sub_saharan', 'tropical', 'Af/Am · 열대 우림', 2156, 'low', 1, 'none', '가톨릭'],
  ['024', '앙골라', 'Angola', 'sub_saharan', 'tropical', 'Aw/BSh · 사바나·남부 건조', 1010, 'low', 4, 'none', '가톨릭'],
  ['894', '잠비아', 'Zambia', 'sub_saharan', 'tropical', 'Cwa/Aw · 열대 사바나', 1020, 'low', 5, 'none', '기독교'],
  ['454', '말라위', 'Malawi', 'sub_saharan', 'tropical', 'Cwa/Aw · 열대 사바나', 1181, 'low', 7, 'none', '기독교'],
  ['508', '모잠비크', 'Mozambique', 'sub_saharan', 'tropical', 'Aw · 열대 사바나', 1032, 'low', 5, 'none', '기독교'],
  ['716', '짐바브웨', 'Zimbabwe', 'sub_saharan', 'semiarid', 'BSh/Cwa · 반건조 사바나', 657, 'medium', 21, 'none', '기독교'],
  ['072', '보츠와나', 'Botswana', 'sub_saharan', 'arid', 'BWh/BSh · 칼라하리 사막', 416, 'medium', 23, 'none', '기독교'],
  ['516', '나미비아', 'Namibia', 'sub_saharan', 'arid', 'BWh · 나미브 사막', 285, 'medium', 22, 'none', '기독교'],
  ['710', '남아프리카공화국', 'South Africa', 'sub_saharan', 'semiarid', 'BSk/Cfb · 반건조·온대', 495, 'high', 63, 'none', '기독교'],
  ['426', '레소토', 'Lesotho', 'sub_saharan', 'temperate', 'Cwb · 고산 온대', 788, 'low', 8, 'none', '기독교'],
  ['748', '에스와티니', 'eSwatini', 'sub_saharan', 'temperate', 'Cwa · 아열대', 788, 'low', 16, 'none', '기독교'],
  ['450', '마다가스카르', 'Madagascar', 'sub_saharan', 'tropical', 'Aw/Af · 열대 우림·사바나', 1513, 'low', 11, 'none', '기독교·전통신앙'],

  // === AMERICAS (아메리카) ===
  ['840', '미국', 'United States of America', 'americas', 'temperate', 'Cfa/Dfa/BSk · 온대·대륙성·서부 건조', 715, 'medium', 28, 'none', '기독교·세속', false, '광대한 옥수수·대두 지대(콘 벨트)와 풍부한 초원을 바탕으로 소고기와 돼지고기 모두 대규모 상업 축산이 이루어집니다.'],
  ['124', '캐나다', 'Canada', 'americas', 'continental', 'Dfc/ET · 냉대·한대', 537, 'low', 4, 'none', '기독교·세속'],
  ['484', '멕시코', 'Mexico', 'americas', 'semiarid', 'BSh/Aw · 반건조 고원·열대', 758, 'high', 44, 'none', '가톨릭'],
  ['320', '과테말라', 'Guatemala', 'americas', 'tropical', 'Aw/Am · 열대·고산', 1996, 'low', 8, 'none', '가톨릭·개신교'],
  ['084', '벨리즈', 'Belize', 'americas', 'tropical', 'Am · 열대 몬순', 1705, 'low', 2, 'none', '가톨릭·개신교'],
  ['340', '온두라스', 'Honduras', 'americas', 'tropical', 'Aw/Am · 열대', 1976, 'low', 6, 'none', '가톨릭'],
  ['222', '엘살바도르', 'El Salvador', 'americas', 'tropical', 'Aw · 열대 사바나', 1784, 'low', 16, 'none', '가톨릭'],
  ['558', '니카라과', 'Nicaragua', 'americas', 'tropical', 'Aw/Af · 열대', 2280, 'low', 3, 'none', '가톨릭'],
  ['188', '코스타리카', 'Costa Rica', 'americas', 'tropical', 'Af/Am · 열대 우림', 2926, 'low', 5, 'none', '가톨릭'],
  ['591', '파나마', 'Panama', 'americas', 'tropical', 'Am/Af · 열대', 2928, 'low', 3, 'none', '가톨릭'],
  ['192', '쿠바', 'Cuba', 'americas', 'tropical', 'Aw · 열대 사바나', 1335, 'medium', 24, 'none', '가톨릭'],
  ['388', '자메이카', 'Jamaica', 'americas', 'tropical', 'Af/Aw · 열대', 2051, 'low', 12, 'none', '개신교'],
  ['332', '아이티', 'Haiti', 'americas', 'tropical', 'Aw · 열대 사바나', 1440, 'medium', 22, 'none', '가톨릭'],
  ['214', '도미니카공화국', 'Dominican Rep.', 'americas', 'tropical', 'Aw/Af · 열대', 1410, 'medium', 29, 'none', '가톨릭'],
  ['630', '푸에르토리코', 'Puerto Rico', 'americas', 'tropical', 'Am · 열대', 1687, 'low', 15, 'none', '가톨릭'],
  ['044', '바하마', 'Bahamas', 'americas', 'tropical', 'Aw · 열대 사바나', 1292, 'low', 9, 'none', '기독교'],
  ['780', '트리니다드토바고', 'Trinidad and Tobago', 'americas', 'tropical', 'Am · 열대 몬순', 2200, 'low', 12, 'none', '기독교·힌두교 공존'],
  ['170', '콜롬비아', 'Colombia', 'americas', 'tropical', 'Af/Aw · 열대 우림·안데스', 3240, 'low', 3, 'none', '가톨릭'],
  ['862', '베네수엘라', 'Venezuela', 'americas', 'tropical', 'Aw/Af · 열대 사바나', 2044, 'low', 4, 'none', '가톨릭'],
  ['328', '가이아나', 'Guyana', 'americas', 'tropical', 'Af · 열대 우림', 2387, 'low', 2, 'none', '기독교·힌두교 공존'],
  ['740', '수리남', 'Suriname', 'americas', 'tropical', 'Af · 열대 우림', 2331, 'low', 2, 'none', '기독교·힌두·이슬람 공존'],
  ['218', '에콰도르', 'Ecuador', 'americas', 'tropical', 'Af/H · 열대·안데스', 2274, 'low', 7, 'none', '가톨릭'],
  ['604', '페루', 'Peru', 'americas', 'arid', 'BWk/Af/H · 해안 사막·아마존·고산', 1738, 'medium', 22, 'none', '가톨릭'],
  ['068', '볼리비아', 'Bolivia', 'americas', 'tropical', 'Aw/H · 사바나·안데스', 1146, 'low', 5, 'none', '가톨릭'],
  ['076', '브라질', 'Brazil', 'americas', 'tropical', 'Af/Aw/Cfa · 열대·아열대', 1761, 'low', 4, 'none', '가톨릭·개신교', false, '풍부한 수자원과 광활한 사바나(세하두)·초원을 기반으로 세계 최대의 소고기·육류 수출국 중 하나입니다.'],
  ['600', '파라과이', 'Paraguay', 'americas', 'temperate', 'Cfa/Aw · 아열대·사바나', 1130, 'low', 3, 'none', '가톨릭'],
  ['858', '우루과이', 'Uruguay', 'americas', 'temperate', 'Cfa · 온대 초원(팜파스)', 1300, 'low', 4, 'none', '가톨릭·세속'],
  ['032', '아르헨티나', 'Argentina', 'americas', 'temperate', 'Cfa/BWk · 팜파스 온대·파타고니아', 591, 'low', 11, 'none', '가톨릭', false, '비옥한 팜파스 초원 지대에서 소 사육이 세계적 규모로 발달했으며, 종교적 육류 금기가 없습니다.'],
  ['152', '칠레', 'Chile', 'americas', 'temperate', 'Csb/BWk · 지중해성·아타카마', 1522, 'high', 58, 'none', '가톨릭'],
  ['238', '포클랜드 제도', 'Falkland Is.', 'americas', 'polar', 'ET/Cfc · 한랭 해양성', 600, 'low', 1, 'none', '기독교'],
  ['304', '그린란드', 'Greenland', 'americas', 'polar', 'ET/EF · 빙설·툰드라', 400, 'low', 1, 'none', '개신교(루터교)'],

  // === OCEANIA (오세아니아) ===
  ['036', '오스트레일리아', 'Australia', 'oceania', 'arid', 'BWh/BSk · 건조 내륙·동부 온대', 534, 'medium', 24, 'none', '기독교·세속', false, '대륙 내륙이 광활한 사막·반건조 초원이나, 유럽계 이주와 상업적 대목축(양·소)이 발달해 육류 금기는 존재하지 않습니다.'],
  ['554', '뉴질랜드', 'New Zealand', 'oceania', 'temperate', 'Cfb · 서안 해양성', 1732, 'low', 3, 'none', '기독교·세속'],
  ['242', '피지', 'Fiji', 'oceania', 'tropical', 'Af · 열대 해양성', 2592, 'low', 2, 'none', '기독교·힌두교 공존'],
  ['548', '바누아투', 'Vanuatu', 'oceania', 'tropical', 'Af · 열대 해양성', 2000, 'low', 2, 'none', '기독교'],
  ['090', '솔로몬 제도', 'Solomon Is.', 'oceania', 'tropical', 'Af · 열대 우림', 3028, 'low', 1, 'none', '기독교'],
  ['540', '누벨칼레도니', 'New Caledonia', 'oceania', 'tropical', 'Aw · 열대 해양성', 1400, 'low', 3, 'none', '가톨릭'],
];

const REGION_DEFAULT_NOTE: Record<WorldRegion, string> = {
  mena: '고온 건조 또는 반건조 환경과 높은 수자원 스트레스가 나타나며, 땀샘이 없어 수분과 그늘이 필수적인 돼지보다 양·염소·낙타 사육이 유리한 지리적 조건을 보입니다.',
  south_asia: '계절풍(몬순)과 높은 인구 밀도 속에서 농경 노동력과 유제품을 제공하는 소의 생태·경제적 가치가 크며, 건조 서부 및 무슬림 지역에서는 돼지고기 금기가 우세합니다.',
  se_asia: '고온다습한 열대 강수 환경으로 생태적으로는 돼지 사육에 적합하지만, 해상 실크로드를 통한 이슬람 전파 지역에서는 문화·종교적 요인으로 돼지고기가 금기시됩니다.',
  east_asia: '계절풍 기반의 습윤 농경과 목초지가 결합되어 종교적 육류 금기 없이 돼지와 소를 비롯한 다양한 가축 사육이 발달했습니다.',
  europe: '서안 해양성 및 온대·냉대 습윤 기후로 사료 작물과 숲(도토리 등)이 풍부하여 돼지고기와 소고기 모두 보편적으로 소비됩니다.',
  sub_saharan: '북부 사하라·사헬 건조 지대는 이슬람권(돼지 금기), 중·남부 열대 사바나·우림 지대는 기독교·전통 신앙권(비금기)으로 기후대와 문화권의 점이지대가 나타납니다.',
  americas: '유럽식 축산 문화의 전파와 광활한 초원·곡물 지대를 바탕으로 종교적 육류 금기 없이 대규모 축산과 육류 소비가 이루어집니다.',
  oceania: '해양성·열대·건조 기후가 공존하나 기독교·세속 문화권 및 전통 태평양 농경·돼지 사육 문화로 종교적 금기가 나타나지 않습니다.',
};

export const COUNTRY_PROFILES: Record<string, CountryGeoProfile> = Object.fromEntries(
  RAW_COUNTRIES.map((entry) => {
    const [
      key,
      nameKo,
      nameEn,
      region,
      climateCategory,
      climateLabel,
      precipitationMm,
      waterStressLevel,
      waterStressPercent,
      taboo,
      religionLabel,
      isClimateException,
      caseNote,
    ] = entry;
    return [
      key,
      {
        key,
        nameKo,
        nameEn,
        region,
        climateCategory,
        climateLabel,
        precipitationMm,
        waterStressLevel,
        waterStressPercent,
        taboo,
        religionLabel,
        isClimateException: Boolean(isClimateException),
        caseNote: caseNote || REGION_DEFAULT_NOTE[region],
      },
    ];
  })
);

export const ALL_COUNTRY_LIST = Object.values(COUNTRY_PROFILES);

export const SPOTLIGHT_KEYS = ['682', '356', '360', '818', '231', '410'] as const;
