export interface TransportStep {
  id: string;
  title: string;
  time?: string;
  status: 'completed' | 'active' | 'pending';
  badgeText?: string;
  badgeType?: 'warning' | 'success' | 'info';
  description?: string;
}

export interface CargoItem {
  id: string;
  code: string; // e.g. KA-1025
  isTrusted: boolean; // 신뢰 화물
  title: string;
  driverName: string;
  driverPhone: string;
  driverPhotoUrl?: string;
  vehicleNumber: string;
  vehicleType: string; // 5톤 냉동탑차
  status: '운행 중' | '상차 완료' | '하차 완료' | '운송 완료' | '지연 예상';
  
  // ETA & Delay info
  delayNotice?: {
    reason: string; // 교통정체
    originalEta: string; // 14:35
    updatedEta: string; // 15:10
  };

  // Location info
  currentLocation: {
    name: string; // 경부고속도로 하행선
    detail: string; // 남사IC 인근 (하차지까지 45km)
    remainingDistanceKm: number;
    speedKmH: number;
  };

  // Destination & Dock
  destination: {
    centerName: string; // 용인 메가허브 물류센터
    address: string; // 경기 용인시 처인구 백암면 고안로 51
    dockNumber: string; // D08
    dockUpdated: boolean;
    dockNotice?: string;
  };

  // Cargo Specs
  cargoDetails: {
    category: string; // 냉동식품 (혼적)
    weight: string; // 4.2t
    tempCondition: string; // -18℃ 이하 유지
    currentTemp: number; // -18.5
  };

  // Progress steps
  steps: TransportStep[];

  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'delay' | 'dock' | 'status';
}
