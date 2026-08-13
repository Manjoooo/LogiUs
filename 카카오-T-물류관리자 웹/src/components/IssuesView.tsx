import React, { useState } from 'react';

export const IssuesView: React.FC = () => {
  // Navigation Tabs: 'realtime' (실시간 현장 - Default, from image), 'knowledge' (누적 현장 지식), 'detail' (이슈 상세 SOP)
  const [activeTab, setActiveTab] = useState<'realtime' | 'knowledge' | 'detail'>('realtime');

  // AI Action Execution State
  const [isRerouted, setIsRerouted] = useState(false);
  const [rerouteLoading, setRerouteLoading] = useState(false);

  // Map Zoom State
  const [zoomLevel, setZoomLevel] = useState(1);

  // Modal State for Action Detail
  const [showModal, setShowModal] = useState(false);

  const handleExecuteReroute = () => {
    setRerouteLoading(true);
    setTimeout(() => {
      setRerouteLoading(false);
      setIsRerouted(true);
      alert('영향권 차량 12대에 우회 경로(45번 국도 → 39번 국도) 발송이 완료되었습니다.');
    }, 600);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F4F4F6] font-sans">
      <div className="max-w-[1400px] mx-auto space-y-5">
        
        {/* Top Header & Navigation Tabs (Matches Image) */}
        <div className="bg-white border border-[#E5E5E8] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-[#191919] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#FEE500] bg-black rounded-lg p-1 text-lg font-bold">
                  warning
                </span>
                <span>현장 인텔리전스</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                음성 제보 및 IoT 지오펜스 기반의 실시간 도로/센터 이슈 모니터링 및 AI 자동 우회 제안
              </p>
            </div>

            {/* Quick Alert Counter */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-100 text-red-700 font-extrabold text-xs rounded-full flex items-center gap-1.5 border border-red-200">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                실시간 돌발 이슈 1건
              </span>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full flex items-center gap-1">
                Voice Radar 수신 3건
              </span>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-200 text-sm font-bold pt-2">
            <button
              onClick={() => setActiveTab('realtime')}
              className={`pb-2.5 transition flex items-center gap-1.5 relative ${
                activeTab === 'realtime'
                  ? 'text-[#191919] font-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="material-symbols-outlined text-base">map</span>
              <span>실시간 현장</span>
              {activeTab === 'realtime' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EAB308] rounded-full"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('knowledge')}
              className={`pb-2.5 transition flex items-center gap-1.5 relative ${
                activeTab === 'knowledge'
                  ? 'text-[#191919] font-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="material-symbols-outlined text-base">database</span>
              <span>누적 현장 지식</span>
              {activeTab === 'knowledge' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EAB308] rounded-full"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('detail')}
              className={`pb-2.5 transition flex items-center gap-1.5 relative ${
                activeTab === 'detail'
                  ? 'text-[#191919] font-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="material-symbols-outlined text-base">analytics</span>
              <span>이슈 상세 분석 (SOP)</span>
              {activeTab === 'detail' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EAB308] rounded-full"></span>
              )}
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: 실시간 현장 ( 지도 중심 관제 - Matches Screenshot )    */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'realtime' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Left Interactive Map Area (8 cols) */}
            <div className="lg:col-span-8 bg-[#EBE8E1] border border-[#E5E5E8] rounded-2xl relative overflow-hidden min-h-[620px] shadow-xs flex flex-col justify-between p-4">
              
              {/* Map Zoom Controls (Top Left) */}
              <div className="absolute top-4 left-4 z-20 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col">
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.2, 1.8))}
                  className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 font-bold border-b border-gray-100 transition"
                  title="확대"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.2, 0.8))}
                  className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 font-bold transition"
                  title="축소"
                >
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
              </div>

              {/* Map Status Bar Indicator (Top Right) */}
              <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 shadow-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>라이브 관제망 연결됨</span>
              </div>

              {/* SVG Map Canvas with Roads & Markers */}
              <div
                className="w-full h-full absolute inset-0 transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Custom Stylized Map Road Grid Background */}
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Faint Grid / Roads */}
                  <g stroke="#FAF8F5" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M -50 120 Q 200 150, 450 180 T 900 220" />
                    <path d="M 100 -50 Q 220 300, 320 650" />
                    <path d="M 500 -50 Q 480 250, 580 650" />
                    <path d="M -50 480 Q 300 420, 850 520" />
                    <path d="M 250 180 Q 550 120, 850 300" />
                  </g>

                  {/* Main Road Highway Layer (Light Gray Lines) */}
                  <g stroke="#DDD9D0" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    {/* Primary Highway Route Line */}
                    <path d="M 120 180 C 180 250, 220 310, 320 380 L 450 450 L 520 540" />
                    <path d="M 320 380 C 400 320, 520 280, 680 320" />
                    <path d="M 150 480 Q 280 500, 450 450" />
                  </g>

                  {/* Original Route (Dark Olive Line passing through Rockfall) */}
                  {!isRerouted ? (
                    <path
                      d="M 120 180 C 180 250, 220 310, 320 380 L 450 450 L 520 540"
                      stroke="#5A561B"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                      className="drop-shadow-xs"
                    />
                  ) : (
                    /* Rerouted Alternative Detour Line (Green Line avoiding incident area) */
                    <g>
                      {/* Old route marked as dashed disabled */}
                      <path
                        d="M 120 180 C 180 250, 220 310, 320 380 L 450 450 L 520 540"
                        stroke="#9CA3AF"
                        strokeWidth="4"
                        strokeDasharray="6,6"
                        fill="none"
                      />
                      {/* New detour route */}
                      <path
                        d="M 120 180 C 180 250, 250 220, 360 210 L 560 260 C 580 360, 540 460, 520 540"
                        stroke="#10B981"
                        strokeWidth="6"
                        strokeLinecap="round"
                        fill="none"
                        className="animate-pulse"
                      />
                    </g>
                  )}

                  {/* Incident Alert Zone: Rockfall (낙석 발생) Dotted Circle Area */}
                  <g>
                    {/* Red Dashed Circle */}
                    <circle
                      cx="420"
                      cy="430"
                      r="40"
                      fill="#EF4444"
                      fillOpacity="0.2"
                      stroke="#EF4444"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      className="animate-spin-slow"
                    />
                    <circle cx="420" cy="430" r="16" fill="#DC2626" />
                  </g>
                </svg>

                {/* OVERLAY HTML MARKERS (Exact Placement as Screenshot) */}

                {/* 1. Vehicle Marker: KA-1025 */}
                <div
                  className="absolute top-[280px] left-[230px] flex flex-col items-center z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  onClick={() => alert('차량 정보: KA-1025 (김철수 차주) · 속도 42km/h · 목적지: 용인 물류센터')}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#433D0D] text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition">
                    <span className="material-symbols-outlined text-xl">local_shipping</span>
                  </div>
                  <div className="mt-1 bg-white border border-gray-300 rounded-md px-2 py-0.5 shadow-sm text-[11px] font-black text-gray-900 whitespace-nowrap">
                    KA-1025
                  </div>
                </div>

                {/* 2. Congestion Marker: 정체 (3km) */}
                <div className="absolute top-[210px] left-[450px] flex flex-col items-center z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-105 transition">
                  <div className="w-9 h-9 rounded-xl bg-[#FEE500] text-black flex items-center justify-center shadow-md border-2 border-white">
                    <span className="material-symbols-outlined text-xl font-bold">traffic</span>
                  </div>
                  <div className="mt-1 bg-white border border-gray-300 rounded-md px-2 py-0.5 shadow-sm text-[11px] font-black text-gray-900 whitespace-nowrap">
                    정체 (3km)
                  </div>
                </div>

                {/* 3. Incident Marker: 낙석 발생 (KA-1025 경로) */}
                <div className="absolute top-[430px] left-[420px] flex flex-col items-center z-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                    <span className="material-symbols-outlined text-lg">warning</span>
                  </div>
                  <div className="mt-1.5 bg-red-50 border border-red-300 rounded-lg px-2.5 py-1 shadow-md text-xs font-black text-red-700 whitespace-nowrap flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                    <span>낙석 발생 (KA-1025 경로)</span>
                  </div>
                </div>

                {/* 4. Center Congestion Marker: 센터 혼잡 (A물류) */}
                <div className="absolute top-[510px] left-[220px] flex flex-col items-center z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-105 transition">
                  <div className="w-8 h-8 rounded-xl bg-white text-gray-800 flex items-center justify-center shadow-md border border-gray-300">
                    <span className="material-symbols-outlined text-lg">warehouse</span>
                  </div>
                  <div className="mt-1 bg-white border border-gray-300 rounded-md px-2 py-0.5 shadow-sm text-[11px] font-bold text-gray-800 whitespace-nowrap">
                    센터 혼잡 (A물류)
                  </div>
                </div>

              </div>

              {/* Bottom Floating Detour Banner (Shows if rerouted) */}
              {isRerouted && (
                <div className="relative z-30 bg-emerald-900 text-white p-3.5 rounded-xl shadow-lg border border-emerald-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-400 text-xl">alt_route</span>
                    <div>
                      <p className="font-extrabold text-xs">우회 경로 발송 및 적용 완료</p>
                      <p className="text-[11px] text-emerald-200">
                        39번 국도 우회 노선 적용으로 예상 도착 지연시간 45분 → 15분으로 30분 단축되었습니다.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsRerouted(false)}
                    className="text-xs text-emerald-300 underline font-bold hover:text-white"
                  >
                    초기화
                  </button>
                </div>
              )}
            </div>

            {/* Right Side Control Panel (4 cols - Exact Match with Screenshot) */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Card 1: AI 대응 패널 (Top Card in Screenshot) */}
              <div className="bg-white rounded-2xl border border-[#E5E5E8] p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-black text-base text-[#191919] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-amber-500 text-xl">smart_toy</span>
                      <span>AI 대응 패널</span>
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium">현장 상황 분석 및 자동 대응 제안</p>
                  </div>
                </div>

                {/* Critical Alert Box: 낙석 발생 감지 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-black text-sm text-red-600">
                      <span className="material-symbols-outlined text-base">error</span>
                      <span>낙석 발생 감지</span>
                    </div>
                    <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-extrabold px-2 py-0.5 rounded">
                      심각도: 상
                    </span>
                  </div>

                  {/* Voice Radar Evidence Box (Exact Match to Image) */}
                  <div className="bg-red-50/70 border border-red-100 rounded-xl p-3.5 space-y-1.5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500"></div>
                    <div className="flex items-center gap-1 text-xs font-bold text-red-900 pl-1">
                      <span className="material-symbols-outlined text-sm text-red-600">mic</span>
                      <span>Voice Radar 근거</span>
                    </div>
                    <p className="text-xs font-bold text-gray-900 leading-relaxed pl-1">
                      "지금 45번 국도 터널 입구 쪽 낙석 있어요. 우회하세요."
                    </p>
                    <div className="flex justify-between items-center text-[10px] text-gray-500 pl-1 pt-0.5">
                      <span>제보자: 김기사님 (평판 4.8)</span>
                      <span className="font-semibold text-gray-600">방금 전</span>
                    </div>
                  </div>

                  {/* Impact Analysis Section */}
                  <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200 space-y-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                      <span className="material-symbols-outlined text-sm text-gray-500">analytics</span>
                      <span>영향도 분석</span>
                    </div>
                    <ul className="text-xs text-gray-800 space-y-1 font-medium pl-1">
                      <li className="flex items-center gap-1.5">
                        <span className="text-red-500 font-bold">📈</span>
                        <span>해당 구간 통과 예정 차량 <strong className="text-red-600 font-extrabold">12대 지연 예상</strong></span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-amber-500 font-bold">⏱</span>
                        <span>평균 <strong className="text-gray-900 font-extrabold">45분 추가 소요</strong> 예측</span>
                      </li>
                    </ul>
                  </div>

                  {/* AI Recommended Action (Yellow Banner) */}
                  <div className="bg-[#FFFDE7] border border-[#FDE047] rounded-xl p-3.5 flex items-center justify-between gap-2 shadow-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-xs font-extrabold text-[#3B3800]">
                        <span className="material-symbols-outlined text-sm text-amber-600">lightbulb</span>
                        <span>AI 권장 액션</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900">영향권 차량 우회 경로 전송</p>
                      <p className="text-[10px] text-amber-900 font-semibold">예상 단축 시간: 30분</p>
                    </div>

                    <button
                      onClick={handleExecuteReroute}
                      disabled={rerouteLoading || isRerouted}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition shadow-xs whitespace-nowrap ${
                        isRerouted
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#2D2A00] hover:bg-black text-white'
                      }`}
                    >
                      {rerouteLoading
                        ? '전송 중...'
                        : isRerouted
                        ? '✓ 실행 완료'
                        : '실행'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: 실시간 Voice Radar (Bottom Card in Screenshot) */}
              <div className="bg-white rounded-2xl border border-[#E5E5E8] p-5 shadow-xs space-y-3.5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-lg">sensors</span>
                    <h4 className="font-extrabold text-sm text-[#191919]">실시간 Voice Radar</h4>
                  </div>
                  <span className="bg-[#FEE500] text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                    Live
                  </span>
                </div>

                {/* Voice Item 1: 센터 혼잡 (Exact Match) */}
                <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl space-y-1.5 hover:border-gray-300 transition">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-900">센터 혼잡</span>
                    <span className="text-[10px] text-gray-400 font-medium">5분 전</span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">
                    "A물류센터 도크 꽉 차서 대기줄 엄청 기네요. 1시간 이상 대기 예상됩니다."
                  </p>
                  <p className="text-[10px] text-gray-500 flex items-center gap-1 font-semibold pt-0.5">
                    <span className="material-symbols-outlined text-xs text-red-500">location_on</span>
                    인천 A물류센터
                  </p>
                </div>

                {/* Voice Item 2: 기상 악화 (Exact Match) */}
                <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl space-y-1.5 hover:border-gray-300 transition">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-900">기상 악화</span>
                    <span className="text-[10px] text-gray-400 font-medium">12분 전</span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">
                    "강원도 쪽 진입하는데 눈발 날리기 시작합니다. 결빙 주의."
                  </p>
                  <p className="text-[10px] text-gray-500 flex items-center gap-1 font-semibold pt-0.5">
                    <span className="material-symbols-outlined text-xs text-blue-500">location_on</span>
                    영동고속도로
                  </p>
                </div>

                {/* Voice Item 3: 돌발 정체 */}
                <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl space-y-1.5 hover:border-gray-300 transition">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-900">돌발 정체</span>
                    <span className="text-[10px] text-gray-400 font-medium">18분 전</span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">
                    "서해안 고속도로 목감IC 부근 화물차 갓길 정차로 2차로 통제 중입니다."
                  </p>
                  <p className="text-[10px] text-gray-500 flex items-center gap-1 font-semibold pt-0.5">
                    <span className="material-symbols-outlined text-xs text-amber-500">location_on</span>
                    서해안고속도로
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: 누적 현장 지식 (Accumulated Field Knowledge Log)       */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'knowledge' && (
          <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 shadow-xs space-y-5">
            <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#191919]">누적 현장 지식 DB</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  차주들의 음성 제보 및 센터 관제 데이터를 기반으로 학습된 돌발 상황 패턴 알고리즘입니다.
                </p>
              </div>

              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="지속 발생 패턴 검색..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-xs w-64 focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
                />
                <span className="material-symbols-outlined text-gray-400 text-sm absolute left-3 top-2.5">
                  search
                </span>
              </div>
            </div>

            {/* Knowledge Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase">
                    <th className="py-3 px-4">패턴 ID</th>
                    <th className="py-3 px-4">구간 / 센터</th>
                    <th className="py-3 px-4">이슈 유형</th>
                    <th className="py-3 px-4">누적 제보 건수</th>
                    <th className="py-3 px-4">AI 권장 우회/대응 책</th>
                    <th className="py-3 px-4">SOP 반영 상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3.5 px-4 font-bold text-gray-900">KNOW-402</td>
                    <td className="py-3.5 px-4 font-bold">45번 국도 (터널 구간)</td>
                    <td className="py-3.5 px-4 text-red-600 font-bold">낙석 및 동절기 빙판</td>
                    <td className="py-3.5 px-4">42건 (최근 3개월)</td>
                    <td className="py-3.5 px-4 text-gray-700">39번 국도 진입로 우회 노선 자동 안내</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
                        SOP 연동됨
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3.5 px-4 font-bold text-gray-900">KNOW-388</td>
                    <td className="py-3.5 px-4 font-bold">인천 A물류센터 D07 도크</td>
                    <td className="py-3.5 px-4 text-amber-600 font-bold">금요일 하역 병목</td>
                    <td className="py-3.5 px-4">89건 (최근 6개월)</td>
                    <td className="py-3.5 px-4 text-gray-700">D08 분산 도크 개방 및 시차 접안 배정</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
                        SOP 연동됨
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3.5 px-4 font-bold text-gray-900">KNOW-312</td>
                    <td className="py-3.5 px-4 font-bold">영동고속도로 대관령 구간</td>
                    <td className="py-3.5 px-4 text-blue-600 font-bold">강풍 및 돌발 강설</td>
                    <td className="py-3.5 px-4">31건 (동절기)</td>
                    <td className="py-3.5 px-4 text-gray-700">차주 앱 푸시 경보 및 체인 착용 안내</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-blue-100 text-blue-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
                        모니터링중
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: 이슈 상세 분석 (SOP - Detailed Cause Analysis View)    */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'detail' && (
          <div className="space-y-5">
            {/* Banner */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600"></div>
              <div className="flex items-center gap-3.5 z-10">
                <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <span className="material-symbols-outlined text-2xl font-bold">warning</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-600 text-white tracking-wider">
                      CRITICAL ALERT
                    </span>
                    <h2 className="text-base font-extrabold text-red-900">도착 지연 경고: KA-1025 (45번 국도 구간)</h2>
                  </div>
                  <p className="text-xs text-red-700 mt-1">
                    +35분 지연 예상 <span className="line-through opacity-70 ml-1">14:35</span>
                    <span className="font-extrabold ml-1.5 text-red-900">15:10 도착 예정</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto z-10">
                <button
                  onClick={() => alert('김철수 차주님(010-3321-9081)에게 긴급 확인 전화 연결 중입니다.')}
                  className="flex-1 sm:flex-none px-4 py-2 bg-white border border-red-300 text-red-700 font-bold text-xs rounded-xl hover:bg-red-50 transition"
                >
                  차주 직접 연락
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition shadow-xs"
                >
                  즉시 조치 가이드 실행
                </button>
              </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column: AI Cause Analysis */}
              <div className="lg:col-span-7 space-y-5">
                <section className="bg-white rounded-2xl border border-[#E5E5E8] p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-amber-600">auto_awesome</span>
                    <h3 className="text-base font-bold text-gray-900">AI 원인 분석 & 판단 근거</h3>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-red-600 text-xl mt-0.5">traffic</span>
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 mb-0.5">근본 원인 (Root Cause)</h4>
                        <p className="text-sm font-extrabold text-gray-900">
                          45번 국도 터널 입구 구간 낙석 발생 및 서행 정체
                        </p>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">판단 근거 (Evidence)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white border border-gray-200 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span>ETA 초과</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900">기준 시간 초과</p>
                      <div className="w-full bg-gray-100 h-1.5 mt-2 rounded-full overflow-hidden">
                        <div className="bg-red-500 w-[85%] h-full"></div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                        <span className="material-symbols-outlined text-sm">forum</span>
                        <span>Voice Radar</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900">김기사님 음성제보</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">"터널 입구 낙석"</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                        <span className="material-symbols-outlined text-sm">route</span>
                        <span>GPS 패턴</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900">서행 속도 지속</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">평균속도 12km/h</p>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-2xl border border-[#E5E5E8] p-5 shadow-xs">
                  <h3 className="text-base font-bold text-gray-900 mb-5">이슈 감지 및 처리 타임라인</h3>
                  <div className="relative pl-6 border-l-2 border-gray-200 space-y-5">
                    <div className="relative">
                      <div className="absolute -left-[31px] bg-red-600 rounded-full p-1 border-2 border-white">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-extrabold text-red-600">방금 전 (현재)</span>
                        <span className="text-sm font-bold text-gray-900">AI 우회 경로 자동 산출</span>
                      </div>
                      <p className="text-xs text-gray-600">39번 국도 대체 우회로 적용 시 30분 단축 가능 분석 완료.</p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[31px] bg-amber-500 rounded-full p-1 border-2 border-white">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-700">14:04</span>
                        <span className="text-sm font-bold text-gray-900">김기사님 Voice Radar 수신</span>
                      </div>
                      <p className="text-xs text-gray-600 font-mono bg-gray-50 p-2 rounded border border-gray-200 mt-1">
                        "지금 45번 국도 터널 입구 쪽 낙석 있어요. 우회하세요."
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Recommended Dispatcher Actions */}
              <div className="lg:col-span-5 space-y-5">
                <section className="bg-white rounded-2xl border border-[#E5E5E8] p-5 shadow-xs">
                  <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600">playlist_add_check</span>
                    오퍼레이터 추천 조치 시나리오
                  </h3>

                  <div className="space-y-3">
                    <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-extrabold text-amber-900">옵션 A (추천)</span>
                        <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                          AI 자동 승인
                        </span>
                      </div>
                      <p className="text-xs font-bold text-gray-900 mb-1">영향권 차량 12대에 39번 국도 우회 경로 발송</p>
                      <p className="text-[11px] text-gray-600 mb-2">차주 네비게이션 자동 갱신 및 카카오 알림톡 전송</p>
                      <button
                        onClick={handleExecuteReroute}
                        className="w-full bg-[#FEE500] text-black font-extrabold text-xs py-2 rounded-lg hover:bg-yellow-400 transition"
                      >
                        {isRerouted ? '✓ 조치 적용 완료' : '우회 경로 발송 및 알림 실행'}
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-gray-900 mb-2">긴급 조치 모달</h3>
            <p className="text-xs text-gray-600 mb-4">
              KA-1025 차량 및 영향권 화물차에 대해 SOP에 따른 조치를 진행합니다.
            </p>

            <div className="space-y-2 mb-6 text-xs">
              <label className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#FEE500]" />
                <span className="font-bold">45번 국도 낙석 우회 경로(39번 국도) 차주 앱 발송</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#FEE500]" />
                <span className="font-bold">화주 담당자 카카오 알림톡 지연 통보</span>
              </label>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsRerouted(true);
                  alert('모든 조치 절차가 성공적으로 수행되었습니다.');
                }}
                className="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-red-700 transition"
              >
                조치 실행하기
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 bg-gray-200 text-gray-800 font-bold py-2.5 rounded-xl text-xs hover:bg-gray-300 transition"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
