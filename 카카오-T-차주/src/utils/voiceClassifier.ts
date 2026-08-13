export interface VoiceClassificationResult {
  category: string;
  impact: string;
  icon: string;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  borderColor: string;
  bgGradient: string;
  matchedType: 'rockfall' | 'traffic' | 'flood' | 'other';
  recommendedRouteAdvice: string;
}

export function classifyVoiceReport(rawText: string): VoiceClassificationResult {
  const text = rawText ? rawText.trim() : '';

  // 1) Rockfall / Mountain / Stones / Landslide (낙석)
  // User Prompt: "앞에 산에서 돌이 떨어져서 2개 차로가 막혀 있어요."
  if (
    text.includes('돌') ||
    text.includes('산') ||
    text.includes('낙석') ||
    text.includes('막혀')
  ) {
    return {
      category: '도로 장애 / 낙석',
      impact: '2개 차로 통제 (대형 화물차 우회 권장)',
      icon: 'landslide',
      badgeText: '낙석 경보',
      badgeBg: 'bg-red-100',
      badgeTextColor: 'text-red-700',
      borderColor: 'border-red-300',
      bgGradient: 'from-red-50 to-orange-50',
      matchedType: 'rockfall',
      recommendedRouteAdvice: '3.5km 전방 우회 도로 (지방도 302호선) 안내 적용 가능',
    };
  }

  // 2) Traffic accident / Traffic jam / Delay (추돌 / 정체)
  // User Prompt: "터널 지나고 터널 입구 부근에 3중 추돌 사고가 나서 차가 심하게 밀립니다."
  if (
    text.includes('추돌') ||
    text.includes('사고') ||
    text.includes('밀립') ||
    text.includes('밀리') ||
    text.includes('정체') ||
    text.includes('터널') ||
    text.includes('서행')
  ) {
    return {
      category: '도로 장애/정체',
      impact: '전 차로 정체 및 서행 (예상 대기 40분)',
      icon: 'traffic',
      badgeText: '도로 장애/정체',
      badgeBg: 'bg-amber-100',
      badgeTextColor: 'text-amber-800',
      borderColor: 'border-amber-300',
      bgGradient: 'from-amber-50 to-yellow-50',
      matchedType: 'traffic',
      recommendedRouteAdvice: '우회 차로 이용 시 ETA 15분 단축 가능',
    };
  }

  // 3) Water / Rain / Flood / Rainstorm (호우 / 침수)
  // User Prompt: "갑자기 집중호우로 도로 하부 구간에 물이 차서 서행 중입니다."
  if (
    text.includes('물') ||
    text.includes('비') ||
    text.includes('호우') ||
    text.includes('폭우') ||
    text.includes('침수') ||
    text.includes('집중호우') ||
    text.includes('차서')
  ) {
    return {
      category: '도로 마비/침수',
      impact: '도로 침수 (안전 서행 및 고지대 경로 권장)',
      icon: 'tsunami',
      badgeText: '도로 마비/침수',
      badgeBg: 'bg-cyan-100',
      badgeTextColor: 'text-cyan-800',
      borderColor: 'border-cyan-300',
      bgGradient: 'from-cyan-50 to-blue-50',
      matchedType: 'flood',
      recommendedRouteAdvice: '지하차도 우회 및 고가도로 우회 경로 안내',
    };
  }

  // Fallback
  return {
    category: '기타 현장 제보',
    impact: '주위 안전 관찰 후 서행 운행',
    icon: 'warning',
    badgeText: '현장 제보',
    badgeBg: 'bg-gray-100',
    badgeTextColor: 'text-gray-800',
    borderColor: 'border-gray-300',
    bgGradient: 'from-gray-50 to-slate-50',
    matchedType: 'other',
    recommendedRouteAdvice: '관제센터 실시간 모니터링 중',
  };
}
