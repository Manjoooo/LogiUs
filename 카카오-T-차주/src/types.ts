export type NavigationTab = 'home' | 'freight' | 'radar' | 'transit' | 'my' | 'tcheck';

export type TrustLevel = '정보 확인' | '새 화물' | '확인된 화물' | '안정 화물' | '신뢰 화물' | '믿고 운송';

export interface FreightItem {
  id: string;
  code: string;
  trustLevel: TrustLevel;
  trustBadgeType: 'verified' | 'favorite' | 'shield' | 'check_circle' | 'new_releases';
  price: number;
  origin: string;
  originTime: string;
  destination: string;
  destinationTime: string;
  distanceKm: number;
  vehicleType: string; // e.g., '5톤 카고', '11톤 윙바디', '3.5톤 탑차', '25톤 카고', '1톤 다마스'
  itemType: string; // e.g. '파레트', '전자제품', '식품'
  status: 'available' | 'accepted' | 'in_transit' | 'completed';
}

export interface TransitStage {
  step: number;
  title: string;
  time?: string;
  location?: string;
  status: 'completed' | 'active' | 'pending';
}

export interface IncidentReport {
  id: string;
  type: string; // e.g. '낙석', '교통정체', '사고', '기상 악화', '물류센터 혼잡'
  distanceAheadKm?: number;
  description: string;
  affectedLanes?: string;
  locationName: string;
  time: string;
  confirmedCount: number;
  recentDriverReportsCount: number;
  userConfirmed: boolean;
  mapImageUrl?: string;
}

export interface VoiceReportState {
  orderCode: string;
  voiceText: string;
  category: string;
  impact: string;
  locationName: string;
  timestamp: string;
  mapImageUrl: string;
}

export interface DriverProfile {
  name: string;
  vehicleType: string;
  avatarUrl: string;
  monthlyTransitsCount: number;
  totalDistanceKm: number;
  avgWaitTimeMinutes: number;
  over30MinWaitCount: number;
}
