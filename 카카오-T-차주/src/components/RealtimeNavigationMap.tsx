import React, { useState, useEffect } from 'react';
import { FreightItem } from '../types';
import kakaoNaviImage from '../assets/images/kakao_navi_map_ui_1786596480211.jpg';

interface RealtimeNavigationMapProps {
  activeFreight: FreightItem;
  onOpenRadar: () => void;
  onOpenVoiceReport: () => void;
}

const NAV_STEPS = [
  { distanceMeters: 500, turnInstruction: '신갈JC에서 용인/수원 방면 우회전', icon: 'turn_right', lane: '3차로 이용' },
  { distanceMeters: 1200, turnInstruction: '영동고속도로 3.2km 직진', icon: 'straight', lane: '주행 차로' },
  { distanceMeters: 800, turnInstruction: '북수원 IC 진출 후 서부우회도로 진입', icon: 'fork_right', lane: '1,2차로 이용' },
  { distanceMeters: 350, turnInstruction: '목적지 용인 물류센터 하차 도크 D08 도착 예정', icon: 'warehouse', lane: '하차장 전용 차로' },
];

export const RealtimeNavigationMap: React.FC<RealtimeNavigationMapProps> = ({
  activeFreight,
  onOpenRadar,
  onOpenVoiceReport,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(84);
  const [stepIndex, setStepIndex] = useState(0);
  const [currentDist, setCurrentDist] = useState(NAV_STEPS[0].distanceMeters);
  const [remainingTotalKm, setRemainingTotalKm] = useState(activeFreight.distanceKm || 62);
  const [isVoiceActive, setIsVoiceActive] = useState(true);
  const [voiceToast, setVoiceToast] = useState<string | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');

  const currentStep = NAV_STEPS[stepIndex];

  // Simulation timer for dynamic speed and distance countdown
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Speed variation between 80 and 88 km/h
      const speedDelta = Math.floor(Math.random() * 5) - 2;
      setSpeed((prev) => Math.min(92, Math.max(76, prev + speedDelta)));

      // Distance countdown
      setCurrentDist((prev) => {
        if (prev <= 50) {
          // Advance to next navigation step
          const nextIdx = (stepIndex + 1) % NAV_STEPS.length;
          setStepIndex(nextIdx);
          triggerVoiceGuidance(`${NAV_STEPS[nextIdx].turnInstruction}`);
          return NAV_STEPS[nextIdx].distanceMeters;
        }
        return prev - 15;
      });

      // Total distance slight countdown
      setRemainingTotalKm((prev) => Math.max(0.1, Number((prev - 0.02).toFixed(2))));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, stepIndex]);

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('SpeechSynthesis error:', err);
      }
    }
  };

  const triggerVoiceGuidance = (msg: string, force = false) => {
    if (isVoiceActive || force) {
      setVoiceToast(`🗣️ 음성 안내: "${msg}"`);
      speakText(msg);
      setTimeout(() => setVoiceToast(null), 3500);
    }
  };

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setVoiceToast('🔄 실시간 최적 경로(교통상황 반영) 재탐색 중...');
    if (isVoiceActive) speakText('실시간 최적 경로를 재탐색합니다.');
    setTimeout(() => {
      setIsRecalculating(false);
      const doneMsg = '최단 시간 안전 경로가 설정되었습니다.';
      setVoiceToast('✅ ' + doneMsg + ' (+3분 단축)');
      if (isVoiceActive) speakText(doneMsg);
      setTimeout(() => setVoiceToast(null), 3000);
    }, 1500);
  };

  return (
    <div className="w-full bg-[#1e2022] rounded-2xl border border-[#cdc7aa] overflow-hidden shadow-xl text-white relative flex flex-col font-sans">
      {/* Voice Toast HUD Notification */}
      {voiceToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-[#fee500] text-[#1a1c1d] px-4 py-2 rounded-full text-xs font-bold shadow-2xl animate-fade-in flex items-center gap-2 border border-[#6a5f00]/30 max-w-[90%] text-center">
          <span>{voiceToast}</span>
        </div>
      )}

      {/* Recalculating Spinner Overlay */}
      {isRecalculating && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-[#fee500] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-[#fee500]">실시간 경로 재탐색 중...</p>
        </div>
      )}

      {/* 1. TOP NAV HUD HEADER (KakaoNavi Style) */}
      <div className="bg-[#121314]/95 backdrop-blur-md p-4 border-b border-white/10 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Turn Direction Icon */}
          <div className="w-12 h-12 rounded-xl bg-[#fee500] text-[#1a1c1d] flex flex-col items-center justify-center font-bold shadow-md shrink-0">
            <span className="material-symbols-outlined text-[28px]">{currentStep.icon}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-[#fee500]">{currentDist}m</span>
              <span className="text-[11px] bg-white/20 text-white/90 px-2 py-0.5 rounded font-semibold">
                {currentStep.lane}
              </span>
            </div>
            <p className="text-sm font-bold text-white leading-tight mt-0.5">{currentStep.turnInstruction}</p>
          </div>
        </div>

        {/* Speed Limit & Compass */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border-2 border-red-500 bg-white text-black font-extrabold text-xs flex items-center justify-center shadow-xs">
            100
          </div>

          <button
            onClick={() => setViewMode(viewMode === '3D' ? '2D' : '3D')}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center justify-center transition-colors border border-white/20"
            title="시점 변경"
          >
            {viewMode}
          </button>
        </div>
      </div>

      {/* 2. REALTIME NAVIGATION MAP CONTAINER */}
      <div className={`relative w-full h-[360px] md:h-[440px] bg-slate-900 overflow-hidden ${viewMode === '3D' ? 'perspective-800' : ''}`}>
        {/* Background Map Image matching user's KakaoNavi screenshot */}
        <img
          src={kakaoNaviImage}
          alt="KakaoNavi Realtime GPS Navigation Map"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 ${
            viewMode === '3D' ? 'scale-105' : 'scale-100'
          }`}
        />

        {/* KakaoNavi Top Left Floating Direction Box (matching user screenshot) */}
        <div className="absolute top-3 left-3 z-30 bg-[#165bc6] text-white p-3 rounded-2xl shadow-xl border border-white/20 flex flex-col gap-1.5 max-w-[210px] animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[32px] text-white">turn_slight_right</span>
            <div>
              <div className="text-xl font-black leading-none">2.2km</div>
              <div className="text-xs font-bold text-blue-100 mt-0.5">신갈 방면</div>
            </div>
          </div>
          <div className="bg-[#0f4091] px-2.5 py-1 rounded-lg flex items-center justify-between text-xs font-bold border border-white/10">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">turn_left</span>
              <span>1.6km</span>
            </div>
            <span className="text-[10px] opacity-80">수원/용인</span>
          </div>
        </div>

        {/* Right Side KakaoNavi Floating Control Buttons (P, Gas, 3D, Traffic Light, Congestion Bar) */}
        <div className="absolute top-3 right-3 z-30 flex items-start gap-2">
          {/* Vertical Traffic Congestion Bar (Green/Yellow/Red) */}
          <div className="w-3.5 h-44 bg-slate-200/90 rounded-full border border-black/20 p-0.5 flex flex-col justify-between shadow-md">
            <div className="w-full h-24 bg-emerald-500 rounded-t-full" />
            <div className="w-full h-8 bg-amber-500" />
            <div className="w-full h-10 bg-red-600 rounded-b-full" />
          </div>

          {/* Icon Column */}
          <div className="flex flex-col gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-gray-200 text-gray-800 text-xs font-bold">
            <button className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-700 font-extrabold" title="주차장">
              P
            </button>
            <button className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-700" title="주유소">
              <span className="material-symbols-outlined text-base">local_gas_station</span>
            </button>
            <button
              onClick={() => setViewMode(viewMode === '3D' ? '2D' : '3D')}
              className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-700 font-bold"
              title="3D/2D 전환"
            >
              {viewMode}
            </button>
            <button className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-700" title="교통 정보">
              <span className="material-symbols-outlined text-base">traffic</span>
            </button>
          </div>
        </div>

        {/* Left Side Zoom Controls (+ / - / Refresh) */}
        <div className="absolute bottom-16 left-3 z-30 flex flex-col bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 text-gray-800 overflow-hidden">
          <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 border-b border-gray-200 font-bold text-base">
            +
          </button>
          <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 border-b border-gray-200 font-bold text-base">
            -
          </button>
          <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100">
            <span className="material-symbols-outlined text-base text-gray-600">refresh</span>
          </button>
        </div>

        {/* Floating Gas Station Price Pin (Self 1,475) */}
        <div className="absolute top-[38%] left-[28%] z-20 bg-white text-gray-900 border border-gray-300 rounded-full px-2 py-0.5 shadow-md text-[10px] font-extrabold flex items-center gap-1 pointer-events-none">
          <span className="bg-emerald-500 text-white text-[8px] px-1 rounded font-bold">Self</span>
          <span>1,475</span>
        </div>

        {/* Floating Gas Station Price Pin 2 */}
        <div className="absolute top-[28%] right-[32%] z-20 bg-white text-gray-900 border border-gray-300 rounded-full px-2 py-0.5 shadow-md text-[10px] font-extrabold flex items-center gap-1 pointer-events-none">
          <span className="bg-blue-600 text-white text-[8px] px-1 rounded font-bold">SK</span>
          <span>1,539</span>
        </div>

        {/* Floating "내 위치로" Pill Button */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() => triggerVoiceGuidance('현재 위치로 재정렬합니다')}
            className="bg-[#2d3138]/90 hover:bg-[#2d3138] text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl border border-white/20 flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-sm text-[#fee500]" style={{ fontVariationSettings: "'FILL' 1" }}>
              near_me
            </span>
            <span>내 위치로</span>
          </button>
        </div>

        {/* Moving Truck GPS Marker */}
        <div className="absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
          <div className="absolute w-16 h-16 rounded-full border-2 border-[#165bc6] animate-ping opacity-60" />
          <div className="w-12 h-12 bg-[#165bc6] text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-blue-500/30">
            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              navigation
            </span>
          </div>
          <div className="mt-1 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#fee500] border border-white/20 shadow-md">
            내 화물차 ({speed}km/h)
          </div>
        </div>

        {/* Bottom Left Live GPS Stats */}
        <div className="absolute bottom-3 left-3 z-30 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-xs flex items-center gap-3 shadow-lg">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/60">현재 속도</span>
            <span className="text-base font-extrabold text-[#fee500]">{speed} <span className="text-xs font-normal text-white/80">km/h</span></span>
          </div>

          <div className="w-px h-6 bg-white/20" />

          <div className="flex flex-col">
            <span className="text-[10px] text-white/60">남은 거리</span>
            <span className="text-base font-extrabold text-white">{remainingTotalKm} <span className="text-xs font-normal text-white/80">km</span></span>
          </div>

          <div className="w-px h-6 bg-white/20" />

          <div className="flex flex-col">
            <span className="text-[10px] text-white/60">ETA</span>
            <span className="text-base font-extrabold text-[#84fbab]">6:43 PM</span>
          </div>
        </div>

        {/* Top-Right Floating Actions (Field Radar & Voice) */}
        <div className="absolute top-16 right-3 z-30 flex flex-col gap-2">
          <button
            onClick={onOpenRadar}
            className="bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-xl backdrop-blur-md border border-red-400 shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">radar</span>
            <span>현장 Radar</span>
          </button>

          <button
            onClick={() => {
              const nextVoiceState = !isVoiceActive;
              setIsVoiceActive(nextVoiceState);
              if (nextVoiceState) {
                const voiceMsg = `음성 안내가 켜졌습니다. ${currentDist}미터 앞 ${currentStep.turnInstruction}`;
                setVoiceToast(`🗣️ 음성 안내: "${currentDist}m 앞 ${currentStep.turnInstruction}"`);
                speakText(voiceMsg);
                setTimeout(() => setVoiceToast(null), 3500);
              } else {
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                setVoiceToast('🔇 음성 안내가 꺼졌습니다');
                speakText('음성 안내가 꺼졌습니다.');
                setTimeout(() => setVoiceToast(null), 2500);
              }
            }}
            className={`text-xs font-bold px-3 py-2 rounded-xl backdrop-blur-md border shadow-md flex items-center gap-1.5 transition-all cursor-pointer ${
              isVoiceActive
                ? 'bg-black/70 text-[#fee500] border-[#fee500]/40'
                : 'bg-black/40 text-white/60 border-white/20'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {isVoiceActive ? 'volume_up' : 'volume_off'}
            </span>
            <span>{isVoiceActive ? '음성 ON' : '음성 OFF'}</span>
          </button>
        </div>
      </div>

      {/* 3. NAVIGATION FOOTER CONTROL BAR */}
      <div className="p-3 bg-[#17181a] border-t border-white/10 flex items-center justify-between gap-2 z-20">
        {/* Play/Pause Simulation */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex-1 py-2.5 px-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-white/10"
        >
          <span className="material-symbols-outlined text-sm text-[#fee500]">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
          <span>{isPlaying ? '주행 일시정지' : '주행 재개'}</span>
        </button>

        {/* Recalculate Route */}
        <button
          onClick={handleRecalculate}
          className="flex-1 py-2.5 px-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-white/10"
        >
          <span className="material-symbols-outlined text-sm text-[#84fbab]">alt_route</span>
          <span>경로 재탐색</span>
        </button>

        {/* Voice Report Trigger */}
        <button
          onClick={onOpenVoiceReport}
          className="flex-1 py-2.5 px-3 bg-[#fee500] text-[#1a1c1d] rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 hover:bg-[#fee500]/90 transition-all shadow-md"
        >
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            mic
          </span>
          <span>음성 제보</span>
        </button>
      </div>
    </div>
  );
};
