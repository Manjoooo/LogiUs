import React, { useState, useEffect } from 'react';

export const RealtimeTransportView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PICKUP' | 'DROPOFF' | 'DELAY'>('ALL');
  
  // Map View Mode: 'VECTOR' (Clean Vector HD), 'SATELLITE' (HD Satellite View), '3D' (Perspective 3D)
  const [mapMode, setMapMode] = useState<'VECTOR' | 'SATELLITE' | '3D'>('VECTOR');

  // Layer Toggles
  const [showTraffic, setShowTraffic] = useState(true);
  const [showGeofences, setShowGeofences] = useState(true);
  const [showWeather, setShowWeather] = useState(true);
  const [isTracking, setIsTracking] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  // Selected Truck Tracking
  const [selectedTruckId, setSelectedTruckId] = useState<string>('KA-1025');

  // Live animation state for KA-1025 (percent 0 to 100 along path)
  const [truckPos, setTruckPos] = useState(48); // % along path

  // Live speed simulation
  const [speed, setSpeed] = useState(68);

  useEffect(() => {
    const interval = setInterval(() => {
      setTruckPos((prev) => {
        if (prev >= 92) return 8; // loop route
        return prev + 0.25;
      });
      // slight speed fluctuation
      setSpeed(65 + Math.floor(Math.sin(Date.now() / 800) * 8));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Multi-segment Waypoints along real Metropolitan Logistics Route:
  // Incheon Namdong (20, 26) -> Siheung IC (34, 38) -> Anyang/Uiwang ICD (48, 52) -> Suwon IC (58, 68) -> Yongin Hub (74, 82)
  const calculatePositionAndAngle = (p: number) => {
    // p is 0 to 100
    // Segment 1: Incheon Namdong (20, 26) to Siheung IC (34, 38) [p: 0..25]
    // Segment 2: Siheung IC (34, 38) to Uiwang ICD (48, 52) [p: 25..50]
    // Segment 3: Uiwang ICD (48, 52) to Suwon IC (58, 68) [p: 50..75]
    // Segment 4: Suwon IC (58, 68) to Yongin Hub (74, 82) [p: 75..100]

    let x = 20;
    let y = 26;
    let angle = 40;

    if (p <= 25) {
      const t = p / 25;
      x = 20 + t * 14;
      y = 26 + t * 12;
      angle = Math.atan2(12, 14) * (180 / Math.PI);
    } else if (p <= 50) {
      const t = (p - 25) / 25;
      x = 34 + t * 14;
      y = 38 + t * 14;
      angle = Math.atan2(14, 14) * (180 / Math.PI);
    } else if (p <= 75) {
      const t = (p - 50) / 25;
      x = 48 + t * 10;
      y = 52 + t * 16;
      angle = Math.atan2(16, 10) * (180 / Math.PI);
    } else {
      const t = (p - 75) / 25;
      x = 58 + t * 16;
      y = 68 + t * 14;
      angle = Math.atan2(14, 16) * (180 / Math.PI);
    }

    return { x, y, angle };
  };

  const { x: currentLeft, y: currentTop, angle: truckAngle } = calculatePositionAndAngle(truckPos);

  return (
    <div className="flex-1 overflow-hidden p-6 bg-[#F4F4F6] font-sans flex flex-col h-[calc(100vh-56px)]">
      {/* Top Controls & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 shrink-0">
        {/* Left Status & Vehicle Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeFilter === 'ALL'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>전체 관제</span>
            <span className="bg-gray-700 text-white text-[10px] px-1.5 py-0.2 rounded-full">18대</span>
          </button>
          <button
            onClick={() => setActiveFilter('PICKUP')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeFilter === 'PICKUP'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>상차 대기</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">4대</span>
          </button>
          <button
            onClick={() => setActiveFilter('DROPOFF')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeFilter === 'DROPOFF'
                ? 'bg-[#191919] text-white shadow-xs'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>하차 대기</span>
            <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">11대</span>
          </button>
          <button
            onClick={() => setActiveFilter('DELAY')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeFilter === 'DELAY'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white border border-red-300 text-red-600 hover:bg-red-50'
            }`}
          >
            <span>돌발/지연</span>
            <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-extrabold animate-pulse">3대</span>
          </button>
        </div>

        {/* Map View Mode Selectors & Layer Toggles */}
        <div className="flex items-center gap-2">
          {/* Map Style Selector Buttons */}
          <div className="bg-white border border-gray-300 p-1 rounded-xl flex items-center gap-1 shadow-xs">
            <button
              onClick={() => setMapMode('VECTOR')}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold transition flex items-center gap-1 ${
                mapMode === 'VECTOR'
                  ? 'bg-black text-[#FEE500] shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="material-symbols-outlined text-sm">map</span>
              <span>HD 벡터</span>
            </button>
            <button
              onClick={() => setMapMode('SATELLITE')}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold transition flex items-center gap-1 ${
                mapMode === 'SATELLITE'
                  ? 'bg-indigo-900 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="material-symbols-outlined text-sm">satellite_alt</span>
              <span>HD 위성</span>
            </button>
            <button
              onClick={() => setMapMode('3D')}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold transition flex items-center gap-1 ${
                mapMode === '3D'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="material-symbols-outlined text-sm">3d_rotation</span>
              <span>3D 입체관제</span>
            </button>
          </div>

          {/* Layers Quick Toggle */}
          <div className="hidden md:flex items-center gap-1 bg-white border border-gray-300 p-1 rounded-xl text-xs font-bold text-gray-700">
            <button
              onClick={() => setShowTraffic(!showTraffic)}
              className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                showTraffic ? 'bg-emerald-100 text-emerald-800' : 'text-gray-400'
              }`}
            >
              <span className="material-symbols-outlined text-sm">traffic</span>
              <span>교통량</span>
            </button>
            <button
              onClick={() => setShowGeofences(!showGeofences)}
              className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                showGeofences ? 'bg-amber-100 text-amber-800' : 'text-gray-400'
              }`}
            >
              <span className="material-symbols-outlined text-sm">radar</span>
              <span>권역</span>
            </button>
            <button
              onClick={() => setShowWeather(!showWeather)}
              className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                showWeather ? 'bg-blue-100 text-blue-800' : 'text-gray-400'
              }`}
            >
              <span className="material-symbols-outlined text-sm">thermostat</span>
              <span>기상</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Map + Right Side Vehicle Telemetry) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0">
        
        {/* ULTRA HD MAP CANVAS CONTAINER (8 Cols) */}
        <div className="lg:col-span-8 bg-[#151922] border border-[#2A303F] rounded-2xl overflow-hidden relative shadow-md flex flex-col justify-between">
          
          {/* Map Controls Floating Overlay (Top Left) */}
          <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
            <div className="bg-[#1C2230]/90 border border-slate-700/80 backdrop-blur-md p-3 rounded-2xl shadow-xl text-white text-xs space-y-2">
              <div className="flex items-center justify-between gap-3 border-b border-slate-700 pb-2">
                <span className="font-extrabold text-[#FEE500] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  HD 관제 센서
                </span>
                <span className="text-[10px] text-slate-400 font-mono">GPS 5G Ultra Sync</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono">
                <div>관제차량: <strong className="text-white">KA-1025</strong></div>
                <div>실시간속도: <strong className="text-emerald-400">{speed} km/h</strong></div>
                <div>현재위치: <strong className="text-slate-200">의왕 ICD 부근</strong></div>
                <div>도착예정: <strong className="text-amber-400">15:10 (38분남음)</strong></div>
              </div>
            </div>

            {/* Quick Vehicle Selector */}
            <div className="bg-[#1C2230]/90 border border-slate-700/80 backdrop-blur-md px-3 py-2 rounded-xl text-xs text-slate-300 flex items-center gap-2">
              <span className="font-bold text-slate-400">관제 대상:</span>
              <button
                onClick={() => setSelectedTruckId('KA-1025')}
                className={`px-2 py-0.5 rounded font-extrabold text-xs transition ${
                  selectedTruckId === 'KA-1025' ? 'bg-[#FEE500] text-black' : 'bg-slate-800 text-slate-300'
                }`}
              >
                KA-1025
              </button>
              <button
                onClick={() => setSelectedTruckId('KA-5829')}
                className={`px-2 py-0.5 rounded font-extrabold text-xs transition ${
                  selectedTruckId === 'KA-5829' ? 'bg-[#FEE500] text-black' : 'bg-slate-800 text-slate-300'
                }`}
              >
                KA-5829
              </button>
            </div>
          </div>

          {/* Zoom & Camera Buttons (Top Right) */}
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-1.5">
            <button
              onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.6))}
              className="w-9 h-9 bg-[#1C2230] text-white border border-slate-700 rounded-xl shadow-lg flex items-center justify-center font-black hover:bg-slate-800 transition"
              title="확대"
            >
              +
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.85))}
              className="w-9 h-9 bg-[#1C2230] text-white border border-slate-700 rounded-xl shadow-lg flex items-center justify-center font-black hover:bg-slate-800 transition"
              title="축소"
            >
              -
            </button>
            <button
              onClick={() => setIsTracking(!isTracking)}
              className={`w-9 h-9 rounded-xl border shadow-lg flex items-center justify-center transition ${
                isTracking
                  ? 'bg-[#FEE500] text-black border-black font-bold'
                  : 'bg-[#1C2230] text-white border-slate-700 hover:bg-slate-800'
              }`}
              title="차량 카메라 추적"
            >
              <span className="material-symbols-outlined text-lg">my_location</span>
            </button>
          </div>

          {/* DYNAMIC MAP VIEWPORT (VECTOR / SATELLITE / 3D) */}
          <div
            className={`w-full h-full absolute inset-0 transition-transform duration-500 ease-out ${
              mapMode === '3D' ? 'perspective-1000' : ''
            }`}
            style={{
              transform: mapMode === '3D'
                ? `scale(${zoomLevel}) rotateX(32deg) rotateZ(-6deg) translateY(-20px)`
                : `scale(${zoomLevel})`,
            }}
          >
            {/* 1. MAP BACKGROUND BASE LAYER */}
            {mapMode === 'SATELLITE' ? (
              /* Satellite Dark Map Texture */
              <div className="absolute inset-0 bg-[#0c121e]">
                {/* Simulated High-Res Satellite Imagery Canvas with Land & Water & Terrain */}
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="oceanGrad" cx="10%" cy="30%" r="90%">
                      <stop offset="0%" stopColor="#082032" />
                      <stop offset="100%" stopColor="#030c16" />
                    </radialGradient>
                    <pattern id="satGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" />
                    </pattern>
                  </defs>
                  {/* West Sea Water Body */}
                  <path d="M 0 0 L 260 0 L 220 220 L 140 400 L 0 600 Z" fill="url(#oceanGrad)" />
                  <rect width="100%" height="100%" fill="url(#satGrid)" />
                  
                  {/* Mountain Terrain Contours (Gwanak, Gwanggyo, Cheonggye) */}
                  <path d="M 380 80 Q 420 140 390 200 Q 360 260 410 320" stroke="#1c2d42" strokeWidth="40" strokeLinecap="round" fill="none" opacity="0.6" />
                  <path d="M 520 280 Q 580 340 550 420" stroke="#1a2d3f" strokeWidth="50" strokeLinecap="round" fill="none" opacity="0.5" />
                </svg>
              </div>
            ) : (
              /* Vector HD Clean Dark Map Theme */
              <div className="absolute inset-0 bg-[#161B26]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="vectorGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2B3245" strokeWidth="0.8" strokeOpacity="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#vectorGrid)" />

                  {/* Coastline / West Sea (Incheon Sea Coast) */}
                  <path d="M 0 0 L 220 0 C 200 120, 150 250, 110 400 L 0 600 Z" fill="#0E1624" stroke="#1D2A3F" strokeWidth="2" />
                  {/* Han River (한강) */}
                  <path d="M 120 0 C 280 80, 450 60, 800 110" fill="none" stroke="#1A2B42" strokeWidth="18" strokeLinecap="round" />
                  <path d="M 120 0 C 280 80, 450 60, 800 110" fill="none" stroke="#253E61" strokeWidth="8" strokeLinecap="round" />
                </svg>
              </div>
            )}

            {/* 2. HIGHWAY & ROAD NETWORK SVG LAYER */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Glow Filter for Active Logistics Route */}
                <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Secondary Local Expressways (Dark Gray Lines) */}
              <g stroke="#2C354A" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none">
                {/* Route 100 Ring Road */}
                <path d="M 180 80 C 350 140, 500 160, 720 220" />
                {/* Secondary Arterial to Suwon */}
                <path d="M 340 380 Q 420 480 480 600" />
                {/* Yeongdong Branch */}
                <path d="M 480 520 Q 620 540 760 560" />
              </g>

              {/* Major Highway Casing Lines */}
              <g stroke="#3A4663" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M 180 80 C 350 140, 500 160, 720 220" />
                <path d="M 340 380 Q 420 480 480 600" />
                <path d="M 480 520 Q 620 540 760 560" />
              </g>

              {/* LIVE TRAFFIC OVERLAY COLORED SEGMENTS (If Traffic toggle enabled) */}
              {showTraffic && (
                <g strokeWidth="4" strokeLinecap="round" fill="none">
                  {/* Incheon to Siheung (Green - Smooth 82km/h) */}
                  <path d="M 20% 26% L 34% 38%" stroke="#10B981" />
                  {/* Siheung to Uiwang (Yellow - Slow 42km/h) */}
                  <path d="M 34% 38% L 48% 52%" stroke="#F59E0B" />
                  {/* Uiwang to Suwon (Green - Smooth 78km/h) */}
                  <path d="M 48% 52% L 58% 68%" stroke="#10B981" />
                  {/* Suwon to Yongin Hub (Green - Smooth 72km/h) */}
                  <path d="M 58% 68% L 74% 82%" stroke="#10B981" />
                </g>
              )}

              {/* MAIN LOGISTICS ROUTE (Incheon Namdong -> Yongin Hub) GLOW LINE */}
              <g filter="url(#routeGlow)">
                {/* Outer Neon Glow Path */}
                <path
                  d="M 20% 26% L 34% 38% L 48% 52% L 58% 68% L 74% 82%"
                  fill="none"
                  stroke="#FEE500"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
                {/* Inner Dashed Precision Guide */}
                <path
                  d="M 20% 26% L 34% 38% L 48% 52% L 58% 68% L 74% 82%"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="4 4"
                />
              </g>
            </svg>

            {/* 3. CITY & LOGISTICS HUB WAYPOINT BADGES */}
            {/* Hub 1: 인천 항만 / 남동공단 (Start Geofence) */}
            <div className="absolute top-[26%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              {showGeofences && (
                <div className="w-28 h-28 rounded-full border-2 border-emerald-400 bg-emerald-500/15 animate-pulse absolute"></div>
              )}
              <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-lg z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <div className="mt-2 px-2.5 py-1 bg-[#1A2232] border border-emerald-500/80 rounded-xl shadow-xl text-center z-10">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-black text-white">인천 남동공단</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">상차완료 (13:52)</span>
              </div>
            </div>

            {/* Hub 2: 시흥 IC (Waypoint) */}
            <div className="absolute top-[38%] left-[34%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
              <div className="mt-1 px-2 py-0.5 bg-[#1C2230]/90 border border-slate-700 rounded-md shadow-md text-[10px] font-bold text-slate-300">
                시흥 IC (18km)
              </div>
            </div>

            {/* Hub 3: 의왕 ICD 물류터미널 (Middle Checkpoint) */}
            <div className="absolute top-[52%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-black shadow-md"></div>
              <div className="mt-1 px-2 py-0.5 bg-[#1C2230]/90 border border-amber-500/60 rounded-md shadow-md text-[10px] font-bold text-amber-300 flex items-center gap-1">
                <span>의왕 ICD</span>
                <span className="text-[9px] text-slate-400 font-mono">42km/h 서행</span>
              </div>
            </div>

            {/* Hub 4: 수원 IC (Waypoint) */}
            <div className="absolute top-[68%] left-[58%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
              <div className="mt-1 px-2 py-0.5 bg-[#1C2230]/90 border border-slate-700 rounded-md shadow-md text-[10px] font-bold text-slate-300">
                수원 IC (44km)
              </div>
            </div>

            {/* Hub 5: 용인 물류센터 (Destination Geofence) */}
            <div className="absolute top-[82%] left-[74%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              {showGeofences && (
                <div className="w-32 h-32 rounded-full border-2 border-amber-500 bg-amber-500/20 animate-pulse absolute"></div>
              )}
              <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-black shadow-lg z-10 flex items-center justify-center">
                <span className="material-symbols-outlined text-black text-[10px] font-black">flag</span>
              </div>
              <div className="mt-2 px-2.5 py-1 bg-[#1A2232] border border-amber-500 rounded-xl shadow-xl text-center z-10">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-black text-white">용인 물류센터</span>
                </div>
                <span className="text-[10px] text-amber-400 font-mono font-bold">하차예정 (15:10)</span>
              </div>
            </div>

            {/* 4. REALTIME MOVING VEHICLE MARKER (KA-1025) */}
            <div
              className="absolute z-40 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
              style={{ left: `${currentLeft}%`, top: `${currentTop}%` }}
            >
              {/* GPS Trailing Pulse Effect */}
              <div className="w-12 h-12 rounded-full bg-[#FEE500]/25 border border-[#FEE500] animate-ping absolute"></div>

              {/* Vehicle Body with Angle Orientation */}
              <div
                className="w-11 h-11 rounded-2xl bg-[#FEE500] border-2 border-black flex items-center justify-center shadow-2xl relative transition-transform duration-200"
                style={{ transform: `rotate(${truckAngle - 45}deg)` }}
              >
                <span className="material-symbols-outlined text-black font-black text-2xl">
                  local_shipping
                </span>
              </div>

              {/* Vehicle Telemetry Floating Tag */}
              <div className="mt-1.5 bg-[#111622] text-[#FEE500] border border-[#FEE500]/80 px-2.5 py-1 rounded-xl shadow-2xl flex flex-col items-center whitespace-nowrap z-50">
                <div className="flex items-center gap-1 text-xs font-black">
                  <span>KA-1025</span>
                  <span className="bg-[#FEE500] text-black font-black text-[9px] px-1 rounded">11톤</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-300 font-mono mt-0.5">
                  <span className="text-emerald-400 font-bold">{speed} km/h</span>
                  <span>·</span>
                  <span>ETA 15:10</span>
                </div>
              </div>
            </div>

            {/* Weather Overlay Overlay Badge (If enabled) */}
            {showWeather && (
              <div className="absolute bottom-4 left-4 z-30 bg-[#1C2230]/90 border border-slate-700/80 backdrop-blur-md px-3 py-2 rounded-xl text-xs text-white flex items-center gap-3 shadow-xl">
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-amber-400 text-lg">wb_sunny</span>
                  <span>수도권 화물노선 기상</span>
                </div>
                <div className="text-slate-300 text-[11px] font-mono flex items-center gap-2 border-l border-slate-700 pl-3">
                  <span>기온: <strong>24.5°C</strong></span>
                  <span>노면: <strong>건조 (정상)</strong></span>
                  <span>시정: <strong>10km+</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE VEHICLE & DISPATCH TELEMETRY PANEL (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto min-h-0">
          
          {/* Card 1: Selected Vehicle Live Monitor */}
          <div className="bg-white border border-[#E5E5E8] rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-[#FEE500] text-black font-extrabold text-[11px] px-2.5 py-0.5 rounded-full">
                  실시간 운송중
                </span>
                <h3 className="text-2xl font-black text-[#191919] mt-1.5">KA-1025</h3>
                <p className="text-xs text-gray-500 font-medium">11톤 윙바디 · 김철수 차주 (평판 4.9 ★)</p>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-400 font-bold">GPS 상태</div>
                <div className="text-emerald-600 font-extrabold text-xs flex items-center gap-1 justify-end mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  수신 양호 (5G)
                </div>
              </div>
            </div>

            {/* Live Progress Metrics */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                <span>운송 구간 진행률</span>
                <span className="text-amber-800 font-extrabold">{Math.round(truckPos)}% (38km / 58km)</span>
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${truckPos}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-gray-500 pt-1">
                <span>인천 남동공단 (13:52 출발)</span>
                <span>용인 물류센터 (15:10 예정)</span>
              </div>
            </div>

            {/* Sensor & Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white border border-gray-200 p-2.5 rounded-xl">
                <span className="text-[10px] text-gray-400 font-bold block">적재함 온도</span>
                <span className="text-sm font-black text-emerald-600">4.2°C (상온/냉장)</span>
              </div>
              <div className="bg-white border border-gray-200 p-2.5 rounded-xl">
                <span className="text-[10px] text-gray-400 font-bold block">배터리 / RPM</span>
                <span className="text-sm font-black text-gray-900">98% / 1,850 RPM</span>
              </div>
            </div>
          </div>

          {/* Card 2: Geofence Event History */}
          <div className="bg-white border border-[#E5E5E8] rounded-2xl p-5 shadow-xs flex-1 flex flex-col space-y-3">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-gray-700 text-lg">radar</span>
                <h4 className="font-bold text-sm text-[#191919]">Geofence 자동 인식 로그</h4>
              </div>
              <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-200">
                실시간 5G 센서
              </span>
            </div>

            <div className="space-y-3 relative pl-5 border-l-2 border-gray-200 ml-1 font-sans text-xs">
              {/* Event 1 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-0 text-emerald-600 bg-white rounded-full">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-gray-900">상차지 진입 인식</span>
                  <span className="text-[10px] text-gray-400">13:31</span>
                </div>
                <p className="text-[11px] text-gray-600">인천 남동 반경 200m 감지구역 진입 완료.</p>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-0 text-emerald-600 bg-white rounded-full">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-gray-900">상차 완료 및 출발 이탈</span>
                  <span className="text-[10px] text-gray-400">13:52</span>
                </div>
                <p className="text-[11px] text-gray-600">인천 남동 반경 200m 이탈. 본선 운송 시작.</p>
              </div>

              {/* Event 3 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-0 text-amber-500 bg-white rounded-full animate-pulse">
                  <span className="material-symbols-outlined text-base">adjust</span>
                </div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-gray-900">하차지 접근중 (의왕 통과)</span>
                  <span className="text-[10px] text-amber-700 font-bold">15:10 (예정)</span>
                </div>
                <p className="text-[11px] text-gray-600">용인 물류센터 D08 도크 배정 준비 완료.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
