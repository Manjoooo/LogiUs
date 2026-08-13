import React, { useState } from 'react';
import { AdminMode, DispatchOrder } from './types';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { DashboardView } from './components/DashboardView';
import { RealtimeTransportView } from './components/RealtimeTransportView';
import { IssuesView } from './components/IssuesView';
import { TCheckView } from './components/TCheckView';
import { DriverQualityView } from './components/DriverQualityView';
import { DockMgmtView } from './components/DockMgmtView';
import { ShippersView } from './components/ShippersView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';

const INITIAL_DISPATCHES: DispatchOrder[] = [
  {
    id: 'KA-1025',
    shipper: '(주)카카오 물류센터',
    pickUp: '인천 남동구 고잔동',
    dropOff: '용인시 처인구 백암면',
    cargoType: '전자부품 (팔레트 8개)',
    tonnage: '5톤 카고',
    weightTon: 4.8,
    fee: 380000,
    status: 'IN_TRANSIT',
    driverName: '김철수',
    driverPhone: '010-3321-9081',
    truckPlate: '경기 82바 1025',
    dockingBay: 'D01',
    requestedTime: '13:30',
    distanceKm: 68,
    urgent: true,
    tCheckStatus: 'PASSED',
    createdAt: '2026-08-12 11:20',
  },
  {
    id: 'KA-1026',
    shipper: '쿠팡 로지스틱스',
    pickUp: '경기 평택시 포승읍',
    dropOff: '부산 강서구 미음동',
    cargoType: '식품류 (냉장)',
    tonnage: '11톤 윙바디',
    weightTon: 10.2,
    fee: 850000,
    status: 'IN_TRANSIT',
    driverName: '이영희',
    driverPhone: '010-8812-4401',
    truckPlate: '서울 90자 8812',
    dockingBay: 'D03',
    requestedTime: '14:00',
    distanceKm: 380,
    urgent: false,
    tCheckStatus: 'PASSED',
    createdAt: '2026-08-12 12:00',
  },
  {
    id: 'KA-1027',
    shipper: 'CJ 대한통운',
    pickUp: '서울 마포구 성산동',
    dropOff: '서울 강남구 역삼동',
    cargoType: '의류 의약품',
    tonnage: '1톤 탑차',
    weightTon: 0.9,
    fee: 120000,
    status: 'DISPATCHED',
    driverName: '박지민',
    driverPhone: '010-5519-2041',
    truckPlate: '경기 80아 5519',
    dockingBay: null,
    requestedTime: '15:30',
    distanceKm: 18,
    urgent: false,
    tCheckStatus: 'PENDING',
    createdAt: '2026-08-12 13:10',
  },
];

export function App() {
  const [currentMode, setCurrentMode] = useState<AdminMode>('dashboard');
  const [dispatches] = useState<DispatchOrder[]>(INITIAL_DISPATCHES);

  const modeTitles: Record<AdminMode, string> = {
    dashboard: '운영 대시보드',
    realtime: '실시간 운송 · Geofence 관제',
    issues: '이슈 대응',
    tcheck: 'T-Check 관리',
    drivers: '차주 내부관리',
    dock: '도크 관리',
    shippers: '화주 현황',
    reports: '리포트',
    settings: '시스템 설정',
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#191919] font-sans antialiased flex overflow-hidden">
      {/* Fixed Left Sidebar */}
      <AdminSidebar currentMode={currentMode} setMode={setCurrentMode} />

      {/* Main Right Content Area */}
      <div className="flex-1 pl-[220px] flex flex-col h-screen overflow-hidden relative">
        {/* Fixed Header */}
        <AdminHeader currentMode={currentMode} title={modeTitles[currentMode]} />

        {/* Content Container below fixed header (56px top offset) */}
        <main className="pt-[56px] flex-1 flex flex-col overflow-hidden">
          {currentMode === 'dashboard' && (
            <DashboardView dispatches={dispatches} onNavigateMode={setCurrentMode} />
          )}

          {currentMode === 'realtime' && <RealtimeTransportView />}

          {currentMode === 'issues' && <IssuesView />}

          {currentMode === 'tcheck' && <TCheckView />}

          {currentMode === 'drivers' && <DriverQualityView />}

          {currentMode === 'dock' && <DockMgmtView />}

          {currentMode === 'shippers' && <ShippersView />}

          {currentMode === 'reports' && <ReportsView />}

          {currentMode === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

export default App;
