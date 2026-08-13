import React, { useState } from 'react';

interface CenterInfo {
  id: string;
  name: string;
  code: string;
  location: string;
  totalDocks: number;
  todayCount: number;
  waitingCount: number;
  avgWaitMinutes: number;
  dockOccupancyPct: number;
  recommendationTruck: string;
  recommendationTargetDock: string;
}

const centersData: Record<string, CenterInfo> = {
  YONGIN: {
    id: 'YONGIN',
    name: '용인 물류센터',
    code: 'Yongin Hub',
    location: '경기도 용인시 처인구',
    totalDocks: 8,
    todayCount: 48,
    waitingCount: 6,
    avgWaitMinutes: 18,
    dockOccupancyPct: 76,
    recommendationTruck: 'KA-1025',
    recommendationTargetDock: 'D08',
  },
  INCHEON: {
    id: 'INCHEON',
    name: '인천 남동 물류센터',
    code: 'Incheon Hub',
    location: '인천광역시 남동구 남동대로',
    totalDocks: 6,
    todayCount: 62,
    waitingCount: 3,
    avgWaitMinutes: 12,
    dockOccupancyPct: 83,
    recommendationTruck: 'KA-5829',
    recommendationTargetDock: 'D05',
  },
  UIWANG: {
    id: 'UIWANG',
    name: '의왕 ICD 물류센터',
    code: 'Uiwang Terminal',
    location: '경기도 의왕시 오봉로',
    totalDocks: 10,
    todayCount: 84,
    waitingCount: 8,
    avgWaitMinutes: 24,
    dockOccupancyPct: 90,
    recommendationTruck: 'KA-3301',
    recommendationTargetDock: 'D09',
  },
  PYEONGTAEK: {
    id: 'PYEONGTAEK',
    name: '평택 항만 물류센터',
    code: 'Pyeongtaek Hub',
    location: '경기도 평택시 포승읍',
    totalDocks: 8,
    todayCount: 35,
    waitingCount: 2,
    avgWaitMinutes: 10,
    dockOccupancyPct: 62,
    recommendationTruck: 'KA-8820',
    recommendationTargetDock: 'D04',
  },
  BUSAN: {
    id: 'BUSAN',
    name: '부산 신항 물류센터',
    code: 'Busan New Port',
    location: '부산광역시 강서구 성북동',
    totalDocks: 12,
    todayCount: 105,
    waitingCount: 11,
    avgWaitMinutes: 29,
    dockOccupancyPct: 92,
    recommendationTruck: 'KA-3678',
    recommendationTargetDock: 'D12',
  },
};

export const DockMgmtView: React.FC = () => {
  // Selected Center Key
  const [selectedCenterKey, setSelectedCenterKey] = useState<string>('YONGIN');
  const activeCenter = centersData[selectedCenterKey] || centersData.YONGIN;

  // State to toggle between Default View (Image 1) and Detailed View (Image 2)
  const [isDetailedView, setIsDetailedView] = useState(false);

  // State for interactive smart dock recommendation approval
  const [approvedDock, setApprovedDock] = useState<string | null>(null);

  const handleApprove = () => {
    setApprovedDock(activeCenter.recommendationTargetDock);
    alert(`[${activeCenter.name}] ${activeCenter.recommendationTruck} 차량이 ${activeCenter.recommendationTargetDock} 도크로 승인 및 호출 배정되었습니다.`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F4F4F6] font-sans">
      <div className="max-w-[1400px] mx-auto space-y-5">
        
        {/* Top View Mode & Logistics Center Switcher Header */}
        <div className="bg-white border border-[#E5E5E8] rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-black text-[#191919] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FEE500] font-extrabold bg-black rounded-lg p-1 text-base">
                meeting_room
              </span>
              <span>도크 관제</span>
            </h2>

            <span className="text-gray-300">|</span>

            {/* Logistics Center Selection Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200">
              {Object.values(centersData).map((center) => {
                const isSelected = center.id === selectedCenterKey;
                return (
                  <button
                    key={center.id}
                    onClick={() => {
                      setSelectedCenterKey(center.id);
                      setApprovedDock(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-black text-[#FEE500] shadow-xs'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-sm ${isSelected ? 'text-[#FEE500]' : 'text-red-500'}`}>
                      location_on
                    </span>
                    <span>{center.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-amber-400 text-black font-extrabold' : 'bg-gray-200 text-gray-600'}`}>
                      {center.totalDocks}도크
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggle Button for "자세히 보기" (Detailed Analysis View) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDetailedView(false)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                !isDetailedView
                  ? 'bg-black text-[#FEE500] shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="material-symbols-outlined text-sm">grid_view</span>
              <span>기본 도크 관제</span>
            </button>
            <button
              onClick={() => setIsDetailedView(true)}
              className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                isDetailedView
                  ? 'bg-[#FEE500] text-black shadow-sm ring-2 ring-yellow-400'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-sm">analytics</span>
              <span>자세히 보기 (통합 분석)</span>
              {!isDetailedView && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              )}
            </button>
          </div>
        </div>

        {/* Selected Center Sub-info Header */}
        <div className="bg-gradient-to-r from-[#191919] to-[#2B2B2B] text-white rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEE500] text-black font-black flex items-center justify-center text-lg">
              <span className="material-symbols-outlined">warehouse</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">{activeCenter.name} ({activeCenter.code})</h3>
                <span className="bg-emerald-500 text-black font-black text-[10px] px-2 py-0.5 rounded-full">
                  실시간 관제중
                </span>
              </div>
              <p className="text-xs text-gray-300 font-mono mt-0.5">{activeCenter.location} · 총 {activeCenter.totalDocks}개 스마트 도크 레이아웃</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <span className="text-gray-400 block font-bold">운영 도크</span>
              <span className="text-white font-extrabold text-sm">{activeCenter.totalDocks}개 도크</span>
            </div>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="text-right">
              <span className="text-gray-400 block font-bold">센터 상태</span>
              <span className="text-[#FEE500] font-extrabold text-sm">정상 가동중</span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: DEFAULT DOCK MANAGEMENT                              */}
        {/* ------------------------------------------------------------- */}
        {!isDetailedView ? (
          <div className="space-y-5">
            {/* Top 4 KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: 오늘 입차 */}
              <div className="bg-white rounded-2xl p-5 border border-[#E5E5E8] shadow-xs flex flex-col justify-between">
                <span className="text-xs font-bold text-gray-600">오늘 입차 ({activeCenter.name})</span>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#191919]">{activeCenter.todayCount}</span>
                    <span className="text-sm font-bold text-gray-500">대</span>
                  </div>
                  <span className="material-symbols-outlined text-emerald-600 text-2xl font-bold">
                    trending_up
                  </span>
                </div>
              </div>

              {/* Card 2: 현재 대기 */}
              <div className="bg-white rounded-2xl p-5 border border-[#E5E5E8] shadow-xs flex flex-col justify-between">
                <span className="text-xs font-bold text-gray-600">현재 대기</span>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-red-600">{activeCenter.waitingCount}</span>
                    <span className="text-sm font-bold text-gray-500">대</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                    <span className="material-symbols-outlined text-lg">warning</span>
                  </div>
                </div>
              </div>

              {/* Card 3: 평균 대기 */}
              <div className="bg-white rounded-2xl p-5 border border-[#E5E5E8] shadow-xs flex flex-col justify-between">
                <span className="text-xs font-bold text-gray-600">평균 대기시간</span>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#191919]">{activeCenter.avgWaitMinutes}</span>
                    <span className="text-sm font-bold text-gray-500">분</span>
                  </div>
                  <span className="material-symbols-outlined text-gray-500 text-2xl">
                    timer
                  </span>
                </div>
              </div>

              {/* Card 4: 도크 가동률 */}
              <div className="bg-white rounded-2xl p-5 border border-[#E5E5E8] shadow-xs flex flex-col justify-between">
                <span className="text-xs font-bold text-gray-600">도크 가동률</span>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#191919]">{activeCenter.dockOccupancyPct}</span>
                    <span className="text-sm font-bold text-gray-500">%</span>
                  </div>
                  <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: `${activeCenter.dockOccupancyPct}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Dock Allocation Recommendation Banner */}
            <div className="bg-[#FFFDE7] border border-[#FDE047] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3B3800] text-[#FEE500] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">lightbulb</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#191919]">AI 스마트 도크 배정 추천 [{activeCenter.name}]</h3>
                  <p className="text-xs text-gray-700 font-medium mt-0.5">
                    대기 중인 <span className="font-bold text-black underline">{activeCenter.recommendationTruck}</span> 차량을{' '}
                    <span className="font-bold text-amber-900">{activeCenter.recommendationTargetDock} 도크</span>로 이동시킵니다.
                  </p>
                </div>
              </div>

              <button
                onClick={handleApprove}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#423B00] hover:bg-[#2B2700] text-white font-extrabold text-xs rounded-xl transition shadow-xs whitespace-nowrap"
              >
                {approvedDock === activeCenter.recommendationTargetDock ? '✓ 호출 완료됨' : '승인 및 호출'}
              </button>
            </div>

            {/* Realtime Dock Status Section (Grid D01-D08/D10/D12) */}
            <div className="bg-white rounded-2xl border border-[#E5E5E8] p-5 shadow-xs space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <h3 className="font-bold text-base text-[#191919] flex items-center gap-2">
                  <span>실시간 도크 현황 (D01~D0{activeCenter.totalDocks})</span>
                  <span className="text-xs font-mono font-normal text-gray-400">[{activeCenter.name}]</span>
                </h3>
                <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                  <span className="flex items-center gap-1 text-red-600">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span> 사용중
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span> 대기중
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <span className="w-2 h-2 rounded-full border border-gray-400"></span> 비어있음
                  </span>
                </div>
              </div>

              {/* Docks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: activeCenter.totalDocks }).map((_, idx) => {
                  const dockNo = `D${String(idx + 1).padStart(2, '0')}`;
                  const isRec = dockNo === activeCenter.recommendationTargetDock;

                  if (idx === 0) {
                    return (
                      <div key={dockNo} className="bg-red-50/30 border border-red-200 rounded-2xl p-4 flex flex-col justify-between h-44 shadow-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-black text-lg text-red-600">{dockNo}</span>
                          <span className="bg-red-100 text-red-700 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full">
                            상차중
                          </span>
                        </div>
                        <div className="flex flex-col items-center my-auto">
                          <span className="material-symbols-outlined text-3xl text-gray-800">
                            local_shipping
                          </span>
                          <p className="font-black text-sm text-[#191919] mt-1">KA-5829</p>
                          <p className="text-[11px] text-gray-500 font-medium">11톤 윙바디 · 진행률 80%</p>
                        </div>
                      </div>
                    );
                  }

                  if (idx === 2) {
                    return (
                      <div key={dockNo} className="bg-red-50/30 border border-red-200 rounded-2xl p-4 flex flex-col justify-between h-44 shadow-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-black text-lg text-red-600">{dockNo}</span>
                          <span className="bg-red-100 text-red-700 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full">
                            하차중
                          </span>
                        </div>
                        <div className="flex flex-col items-center my-auto">
                          <span className="material-symbols-outlined text-3xl text-gray-800">
                            local_shipping
                          </span>
                          <p className="font-black text-sm text-[#191919] mt-1">KA-1192</p>
                          <p className="text-[11px] text-gray-500 font-medium">5톤 카고 · 진행률 20%</p>
                        </div>
                      </div>
                    );
                  }

                  if (idx === 5) {
                    return (
                      <div key={dockNo} className="bg-emerald-50/30 border border-emerald-300 rounded-2xl p-4 flex flex-col justify-between h-44 shadow-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-black text-lg text-emerald-700">{dockNo}</span>
                          <span className="bg-emerald-700 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full">
                            진입대기
                          </span>
                        </div>
                        <div className="flex flex-col items-center my-auto">
                          <span className="material-symbols-outlined text-3xl text-emerald-800">
                            directions_car
                          </span>
                          <p className="font-black text-sm text-[#191919] mt-1">KA-8821</p>
                          <p className="text-[11px] text-emerald-700 font-bold">도착 완료 · 호출 대기</p>
                        </div>
                      </div>
                    );
                  }

                  if (isRec) {
                    return (
                      <div key={dockNo} className="bg-[#FFFDE7]/60 border-2 border-dashed border-[#FACC15] rounded-2xl p-4 flex flex-col justify-between h-44 shadow-xs relative">
                        <div className="flex justify-between items-center">
                          <span className="font-black text-lg text-amber-800">{dockNo}</span>
                          <span className="bg-[#FEE500] text-black font-black text-[10px] px-2 py-0.5 rounded">
                            배정 추천
                          </span>
                        </div>
                        <div className="flex flex-col items-center my-auto">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 mb-1">
                            <span className="material-symbols-outlined text-lg font-bold">
                              login
                            </span>
                          </div>
                          <p className="font-black text-sm text-[#191919]">{activeCenter.recommendationTruck} 대기중</p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={dockNo} className="bg-gray-50/50 border border-gray-200 rounded-2xl p-4 flex flex-col justify-between h-44">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-lg text-gray-400">{dockNo}</span>
                        <span className="bg-gray-100 text-gray-500 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                          비어있음
                        </span>
                      </div>
                      <div className="flex flex-col items-center my-auto text-gray-300">
                        <span className="material-symbols-outlined text-3xl">meeting_room</span>
                        <p className="text-xs font-bold text-gray-400 mt-2">대기 차량 없음</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* VIEW 2: DETAILED DOCK CONTROL SYSTEM                         */
          /* ------------------------------------------------------------- */
          <div className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column (8 cols) */}
              <div className="lg:col-span-8 space-y-5">
                <div className="bg-white rounded-2xl border border-[#E5E5E8] p-5 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-base text-[#191919]">실시간 도크 상세 현황</h3>
                      <span className="bg-blue-100 text-blue-700 font-bold text-xs px-2.5 py-0.5 rounded-full">
                        총 {activeCenter.totalDocks}개 ({activeCenter.name})
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                      <span className="flex items-center gap-1 text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 작업중
                      </span>
                      <span className="flex items-center gap-1 text-amber-600">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span> 대기중
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <span className="w-2 h-2 rounded-full border border-gray-400"></span> 비어있음
                      </span>
                      <span className="flex items-center gap-1 text-red-600">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span> 점검중
                      </span>
                    </div>
                  </div>

                  {/* Dock Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-base text-gray-900">D01</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                          작업중
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-0.5">
                        <p>차량번호: <span className="font-bold text-gray-900">12가 3456</span></p>
                        <p>품목: <span className="font-medium text-gray-700">상온식품</span></p>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] text-emerald-700 font-bold mb-0.5">
                          <span>진행률</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50/20 border border-amber-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-base text-gray-900">D02</span>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                          대기중
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-0.5">
                        <p>차량번호: <span className="font-bold text-gray-900">98나 7654</span></p>
                        <p>품목: <span className="font-medium text-gray-700">가전제품</span></p>
                        <p className="text-[11px] font-bold text-red-600 flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-xs">schedule</span>
                          접안 대기 15분째
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50/40 border-2 border-blue-400 rounded-xl p-3.5 shadow-xs flex flex-col justify-between space-y-2 relative overflow-hidden">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-base text-blue-800">{activeCenter.recommendationTargetDock}</span>
                        <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                          비어있음 (권장)
                        </span>
                      </div>
                      <div className="text-center my-1">
                        <p className="text-xs font-bold text-blue-900">{activeCenter.recommendationTruck} 분산 배차 가능</p>
                      </div>
                      <button
                        onClick={handleApprove}
                        className="w-full bg-blue-600 text-white font-bold text-xs py-1.5 rounded-lg hover:bg-blue-700 transition"
                      >
                        이곳으로 차량 배정하기 →
                      </button>
                    </div>

                    <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-black text-base text-gray-400">D04</span>
                        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded">
                          비어있음
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 text-center my-2 font-medium">
                        <p>대기 차량 없음</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Timeline */}
                <div className="bg-white rounded-2xl border border-[#E5E5E8] p-5 shadow-xs space-y-4">
                  <h3 className="font-black text-base text-[#191919]">
                    오늘의 도착 예정 화물 타임라인 [{activeCenter.name}]
                  </h3>
                  <div className="overflow-x-auto">
                    <div className="min-w-[600px] space-y-3 font-sans">
                      <div className="grid grid-cols-6 text-center text-xs font-bold text-gray-400 border-b border-gray-100 pb-2 pl-16">
                        <span>08:00</span>
                        <span>10:00</span>
                        <span>12:00</span>
                        <span>14:00</span>
                        <span>16:00</span>
                        <span>18:00</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-600 w-12 text-right">Lane 1</span>
                        <div className="flex-1 h-12 bg-gray-50 rounded-xl border border-gray-100 relative overflow-hidden">
                          <div className="absolute top-1 bottom-1 left-[58%] w-32 bg-red-100 border border-red-300 rounded-lg p-1.5 text-[10px] text-red-900 shadow-xs">
                            <p className="font-extrabold leading-tight">77마 5544</p>
                            <p className="text-[9px] text-red-700">KR-8820 (15:10)</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-600 w-12 text-right">Lane 2</span>
                        <div className="flex-1 h-12 bg-gray-50 rounded-xl border border-gray-100 relative overflow-hidden">
                          <div className="absolute top-1 bottom-1 left-[63%] w-32 bg-amber-100 border border-amber-300 rounded-lg p-1.5 text-[10px] text-amber-900 shadow-xs">
                            <p className="font-extrabold leading-tight">12가 3456</p>
                            <p className="text-[9px] text-amber-800">KR-9102 (15:25)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (4 cols) */}
              <div className="lg:col-span-4 space-y-5">
                <div className="bg-[#181D2A] text-white rounded-2xl p-5 shadow-md border border-slate-700 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-700/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-indigo-400 text-lg">mic</span>
                      <h4 className="font-bold text-sm">현장 제보 반영 (Voice Radar)</h4>
                    </div>
                    <span className="bg-indigo-600/80 text-indigo-100 font-bold text-[10px] px-2 py-0.5 rounded">
                      {activeCenter.name}
                    </span>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                      <span className="material-symbols-outlined text-sm">smart_toy</span>
                      <span>AI 현장 상황 요약</span>
                    </div>
                    <p className="text-sm font-extrabold text-white">
                      "D07 주변 입차 혼잡 반복 보고"
                    </p>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50 text-xs">
                      <p className="text-slate-200">"도크 진입로 화물차 순차 대기 조치 완료되었습니다."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
