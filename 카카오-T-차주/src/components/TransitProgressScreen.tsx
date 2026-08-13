import React, { useState, useEffect } from 'react';
import { FreightItem, TransitStage } from '../types';
import { RealtimeNavigationMap } from './RealtimeNavigationMap';

interface TransitProgressScreenProps {
  activeFreight: FreightItem;
  stages: TransitStage[];
  onUpdateStage: (stageStep: number) => void;
  onOpenVoiceReport: () => void;
  onOpenRadar: () => void;
  onCompleteTransit: () => void;
}

export const TransitProgressScreen: React.FC<TransitProgressScreenProps> = ({
  activeFreight,
  stages,
  onUpdateStage,
  onOpenVoiceReport,
  onOpenRadar,
  onCompleteTransit,
}) => {
  const [activeTab, setActiveTab] = useState<'navi' | 'timeline'>('navi');
  
  // Emergency SOS States
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isHazardLightsOn, setIsHazardLightsOn] = useState(false);
  const [sosTimestamp, setSosTimestamp] = useState<string | null>(null);
  const [dispatchResponseTimer, setDispatchResponseTimer] = useState(0);

  // Audio & TTS Helpers
  const playEmergencySirenSound = () => {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3); // A4

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } catch (e) {
        console.warn('Audio Context sound error:', e);
      }
    }
  };

  const speakEmergencyAlert = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('TTS error:', e);
      }
    }
  };

  // Timer effect when SOS is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isEmergencyActive) {
      interval = setInterval(() => {
        setDispatchResponseTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setDispatchResponseTimer(0);
    }
    return () => clearInterval(interval);
  }, [isEmergencyActive]);

  const triggerEmergencySos = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    setSosTimestamp(timeStr);
    setIsEmergencyActive(true);
    setIsHazardLightsOn(true);
    setIsSosModalOpen(true);

    playEmergencySirenSound();
    speakEmergencyAlert(
      '비상 상황 발생! 관제센터 및 119, 112로 최고 우선순위 긴급 구조 요청 신호가 전송되었습니다.'
    );
  };

  const cancelEmergencySos = () => {
    setIsEmergencyActive(false);
    setIsSosModalOpen(false);
    setIsHazardLightsOn(false);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    speakEmergencyAlert('긴급 비상 상황 요청이 해제되었습니다.');
  };

  const activeStage = stages.find((s) => s.status === 'active') || stages[stages.length - 1];

  return (
    <div
      className={`w-full max-w-3xl mx-auto px-4 md:px-8 py-6 space-y-6 pb-24 font-sans transition-all duration-300 ${
        isEmergencyActive
          ? 'ring-4 ring-red-600 ring-offset-4 rounded-3xl bg-red-50/40'
          : ''
      }`}
    >
      {/* FLASHING EMERGENCY ALERT BAR (Appears when SOS is Active) */}
      {isEmergencyActive && (
        <section className="bg-red-600 text-white rounded-2xl p-4 shadow-xl border-2 border-red-700 animate-pulse flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white text-2xl animate-spin">
                warning
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-white text-red-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  LV.1 긴급 SOS
                </span>
                <span className="text-xs font-bold text-red-100">
                  접수 시각: {sosTimestamp} (경과시간: {Math.floor(dispatchResponseTimer / 60)}분 {dispatchResponseTimer % 60}초)
                </span>
              </div>
              <h2 className="text-sm md:text-base font-extrabold mt-0.5">
                🚨 관제센터 최우선 비상 구조 대응 중 | 실시간 GPS 추적 활성화
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <button
              onClick={() => setIsSosModalOpen(true)}
              className="bg-white text-red-700 hover:bg-red-50 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shadow-xs"
            >
              관제 상태 보기
            </button>
            <button
              onClick={cancelEmergencySos}
              className="bg-red-950/80 hover:bg-red-950 text-white px-3 py-2 rounded-xl text-xs font-bold transition-all border border-red-400/40"
            >
              비상 해제
            </button>
          </div>
        </section>
      )}

      {/* Top Active Order Bar */}
      <section className={`bg-white rounded-2xl border transition-colors p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isEmergencyActive ? 'border-red-400 bg-red-50/20' : 'border-[#cdc7aa]'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-[#84fbab]/40 text-[#006d3a] rounded-full text-xs font-bold">
              {activeFreight.trustLevel}
            </span>
            <span className="text-xs text-[#5f5e5e] font-bold">주문번호: {activeFreight.code}</span>
          </div>

          <h1 className="text-xl md:text-2xl font-extrabold text-[#1a1c1d]">
            {activeFreight.origin} &rarr; {activeFreight.destination}
            <span className={`text-sm font-bold ml-2 px-2.5 py-1 rounded-md ${
              isEmergencyActive
                ? 'bg-red-600 text-white animate-pulse'
                : 'text-[#6a5f00] bg-[#fee500]/30'
            }`}>
              {isEmergencyActive ? '🚨 비상 SOS 운행' : '운행중'}
            </span>
          </h1>
          <p className="text-xs text-[#5f5e5e] mt-1">
            차종: {activeFreight.vehicleType} | 품목: {activeFreight.itemType}
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 border-[#cdc7aa]/40 pt-3 md:pt-0 flex-wrap">
          <div className="text-left md:text-right">
            <p className="text-[11px] text-[#5f5e5e] font-medium">도착 예정 시간 (ETA)</p>
            <p className="text-xl md:text-2xl font-extrabold text-[#6a5f00]">14:35</p>
          </div>

          <div className="flex bg-[#e8e8e9] p-1 rounded-xl border border-[#cdc7aa]">
            <button
              onClick={() => setActiveTab('navi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'navi'
                  ? 'bg-white text-[#1a1c1d] shadow-xs'
                  : 'text-[#5f5e5e] hover:text-[#1a1c1d]'
              }`}
            >
              🗺️ 실시간 네비
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-white text-[#1a1c1d] shadow-xs'
                  : 'text-[#5f5e5e] hover:text-[#1a1c1d]'
              }`}
            >
              📋 운송 단계
            </button>
          </div>
        </div>
      </section>

      {/* 1. REAL-TIME NAVIGATION VIEW OR TIMELINE VIEW */}
      {activeTab === 'navi' ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#1a1c1d] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#6a5f00]" style={{ fontVariationSettings: "'FILL' 1" }}>
                navigation
              </span>
              <span>실시간 GPS 네비게이션 관제</span>
            </h2>

            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              isEmergencyActive
                ? 'bg-red-100 text-red-700 animate-pulse'
                : 'text-[#006d3a] bg-[#84fbab]/30'
            }`}>
              {isEmergencyActive ? '🚨 비상 GPS 추적 중' : 'GPS 관제 연결됨'}
            </span>
          </div>

          {/* Embedded Interactive Realtime Navigation Map */}
          <RealtimeNavigationMap
            activeFreight={activeFreight}
            onOpenRadar={onOpenRadar}
            onOpenVoiceReport={onOpenVoiceReport}
          />
        </section>
      ) : (
        /* 2. 10-STEP TIMELINE VIEW */
        <section className="bg-white rounded-2xl border border-[#cdc7aa] p-5 shadow-xs">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-base font-bold text-[#1a1c1d]">운송 진행 10단계 현황</h3>
            <span className="text-xs font-semibold text-[#006d3a] bg-[#84fbab]/30 px-2.5 py-1 rounded-full">
              진행 단계: {activeStage.step} / {stages.length}
            </span>
          </div>

          <div className="relative pl-6 border-l-2 border-[#e8e8e9] space-y-6">
            {stages.map((stage) => {
              const isCompleted = stage.status === 'completed';
              const isActive = stage.status === 'active';

              return (
                <div
                  key={stage.step}
                  onClick={() => {
                    if (stage.step === 10) {
                      onCompleteTransit();
                    } else {
                      onUpdateStage(stage.step);
                    }
                  }}
                  className={`relative cursor-pointer transition-all ${
                    isActive ? 'scale-[1.01]' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <span
                    className={`absolute -left-[33px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white text-[12px] font-bold shadow-xs transition-colors ${
                      isCompleted
                        ? 'bg-[#84fbab] text-[#00743e]'
                        : isActive
                        ? 'bg-[#fee500] text-[#716600] ring-2 ring-[#6a5f00]'
                        : 'bg-[#e8e8e9] text-[#5f5e5e]'
                    }`}
                  >
                    {isCompleted ? (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    ) : (
                      stage.step
                    )}
                  </span>

                  <div>
                    <h4
                      className={`text-sm font-bold ${
                        isActive ? 'text-[#6a5f00] text-base' : 'text-[#1a1c1d]'
                      }`}
                    >
                      {stage.title}
                    </h4>

                    {stage.time && (
                      <p className="text-xs text-[#5f5e5e] mt-0.5">
                        {stage.time} {stage.location ? `- ${stage.location}` : ''}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#eeeeef]">
            <button
              onClick={onCompleteTransit}
              className="w-full bg-[#eeeeef] hover:bg-[#e8e8e9] text-[#1a1c1d] text-sm font-bold py-3 rounded-xl transition-colors border border-[#cdc7aa]"
            >
              운행 완료 및 평가하기
            </button>
          </div>
        </section>
      )}

      {/* Voice Reporting Hero Banner */}
      <section className="bg-gradient-to-r from-[#fee500]/20 via-amber-50 to-orange-50 border border-[#cdc7aa] rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 shrink-0 bg-[#fee500] rounded-2xl shadow-md flex items-center justify-center text-[#1a1c1d] text-2xl border border-[#6a5f00]/20">
              🎙️
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#1a1c1d]">말로 현장 알려주기 (AI 음성 인식)</h3>
              <p className="text-xs text-[#4b4732] mt-0.5">
                주행 중 타이핑 없이 음성으로 말하면 AI가 <strong>낙석, 정체, 침수</strong>를 자동 분석합니다.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenVoiceReport}
            className="bg-[#fee500] text-[#1a1c1d] px-5 py-3 rounded-xl text-xs font-extrabold shadow-md hover:bg-[#fee500]/90 transition-all border border-[#6a5f00]/30 shrink-0 flex items-center justify-center gap-1.5 active:scale-98"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              mic
            </span>
            <span>음성 제보 시작</span>
          </button>
        </div>
      </section>

      {/* Quick Situation Trigger Cards */}
      <section className="bg-white rounded-2xl border border-[#cdc7aa] p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-[#1a1c1d] flex items-center justify-between">
          <span>AI 상황별 음성 제보 시뮬레이션</span>
          <span className="text-xs text-[#5f5e5e] font-normal">클릭 시 AI 자동 분류 테스트</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: Rockfall */}
          <div
            onClick={onOpenVoiceReport}
            className="p-3.5 rounded-xl border border-red-200 bg-red-50/60 hover:bg-red-50 transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                🪨 낙석 발생
              </span>
              <span className="material-symbols-outlined text-red-600 text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>

            <p className="text-xs text-[#1a1c1d] font-bold leading-relaxed">
              &quot;앞에 산에서 돌이 떨어져서 2개 차로가 막혀 있어요.&quot;
            </p>

            <span className="text-[11px] text-red-600 font-medium">유형: 도로 장애 / 낙석</span>
          </div>

          {/* Card 2: Traffic */}
          <div
            onClick={onOpenVoiceReport}
            className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-50 transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                🚗 사고 / 정체
              </span>
              <span className="material-symbols-outlined text-amber-700 text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>

            <p className="text-xs text-[#1a1c1d] font-bold leading-relaxed">
              &quot;터널 지나고 터널 입구 부근에 3중 추돌 사고가 나서 차가 심하게 밀립니다.&quot;
            </p>

            <span className="text-[11px] text-amber-700 font-medium">유형: 도로 장애 / 정체</span>
          </div>

          {/* Card 3: Flood */}
          <div
            onClick={onOpenVoiceReport}
            className="p-3.5 rounded-xl border border-cyan-200 bg-cyan-50/60 hover:bg-cyan-50 transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded">
                🌧️ 호우 / 침수
              </span>
              <span className="material-symbols-outlined text-cyan-700 text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>

            <p className="text-xs text-[#1a1c1d] font-bold leading-relaxed">
              &quot;갑자기 집중호우로 도로 하부 구간에 물이 차서 서행 중입니다.&quot;
            </p>

            <span className="text-[11px] text-cyan-700 font-medium">유형: 도로 마비 / 침수</span>
          </div>
        </div>
      </section>

      {/* Floating Buttons: SOS + Voice Report */}
      <div className="fixed right-5 bottom-20 md:bottom-8 flex flex-col gap-2.5 z-40">
        <button
          onClick={triggerEmergencySos}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full text-xs font-black shadow-xl flex items-center gap-2 transition-all cursor-pointer border border-red-700 animate-pulse active:scale-95"
        >
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
            e911_emergency
          </span>
          <span>🚨 긴급 SOS</span>
        </button>

        <button
          onClick={onOpenVoiceReport}
          className="bg-[#fee500] text-[#1a1c1d] px-5 py-3.5 rounded-full text-sm font-extrabold shadow-xl flex items-center gap-2 hover:opacity-95 active:scale-95 transition-all border border-[#cdc7aa]"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
          <span>현장 음성 제보</span>
        </button>
      </div>

      {/* EMERGENCY SOS HIGH-PRIORITY ALERT MODAL */}
      {isSosModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-sans">
          <div className="bg-[#f9f9fa] w-full max-w-lg rounded-2xl border-2 border-red-600 shadow-2xl overflow-hidden flex flex-col relative max-h-[92vh]">
            {/* Modal Red Flashing Header */}
            <div className="bg-red-600 text-white p-5 space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-2">
                  <span className="bg-white text-red-700 px-2.5 py-0.5 rounded-md text-xs font-black uppercase">
                    HIGH PRIORITY
                  </span>
                  <span className="text-xs text-red-100 font-bold">
                    접수 시각: {sosTimestamp || '즉시'}
                  </span>
                </div>
                <button
                  onClick={() => setIsSosModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <div className="flex items-center gap-3 pt-1 relative z-10">
                <span className="material-symbols-outlined text-3xl animate-ping shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                  e911_emergency
                </span>
                <div>
                  <h2 className="text-lg font-black leading-tight">
                    관제센터 최우선 긴급 SOS 신호 발송
                  </h2>
                  <p className="text-xs text-red-100 mt-0.5">
                    119/112 통합 구조 시스템 및 물류 관제 전용 비상회선 자동 개설 완료
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-5 space-y-4 overflow-y-auto">
              {/* Emergency Status Card */}
              <div className="bg-white border-2 border-red-200 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-gray-100">
                  <span className="text-gray-500 font-bold">관제 수신 상태</span>
                  <span className="text-red-600 font-black bg-red-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                    응답 수신 중 ({dispatchResponseTimer}초 경과)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-semibold block">화물 주문번호</span>
                    <strong className="text-gray-900 font-extrabold">{activeFreight.code}</strong>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                    <span className="text-[10px] text-gray-500 font-semibold block">차량 및 차종</span>
                    <strong className="text-gray-900 font-extrabold">{activeFreight.vehicleType}</strong>
                  </div>
                </div>

                <div className="bg-red-50/70 p-3 rounded-lg border border-red-200 text-xs space-y-1">
                  <div className="flex justify-between text-red-800">
                    <span className="font-bold">현재 실시간 GPS 위치</span>
                    <span className="font-mono text-[11px]">37.2411° N, 127.0820° E</span>
                  </div>
                  <p className="text-red-700 font-medium">
                    📍 경부고속도로 하행 382.5km 지점 (수원신갈 IC 부근)
                  </p>
                </div>
              </div>

              {/* Emergency Hazard Control */}
              <div className="bg-[#1a1c1d] text-white p-4 rounded-xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-2xl ${isHazardLightsOn ? 'text-amber-400 animate-bounce' : 'text-gray-500'}`}>
                    warning
                  </span>
                  <div>
                    <h4 className="text-xs font-bold">차량 비상점등 (Flashing Hazard)</h4>
                    <p className="text-[11px] text-gray-400">
                      {isHazardLightsOn ? '🚨 비상 점등 및 경보 작동 중' : '비상 점등 꺼짐'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsHazardLightsOn(!isHazardLightsOn)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    isHazardLightsOn
                      ? 'bg-amber-400 text-gray-950 hover:bg-amber-300'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {isHazardLightsOn ? '점등 ON' : '점등 OFF'}
                </button>
              </div>

              {/* Direct Emergency Hotlines */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-700 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-red-600">call</span>
                  <span>긴급 구조 및 관제 바로 연결</span>
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href="tel:119"
                    className="bg-red-50 hover:bg-red-100 border border-red-300 text-red-700 p-2.5 rounded-xl text-center flex flex-col items-center justify-center transition-all cursor-pointer"
                  >
                    <span className="text-base font-black">119</span>
                    <span className="text-[10px] font-bold">긴급구조</span>
                  </a>

                  <a
                    href="tel:112"
                    className="bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-800 p-2.5 rounded-xl text-center flex flex-col items-center justify-center transition-all cursor-pointer"
                  >
                    <span className="text-base font-black">112</span>
                    <span className="text-[10px] font-bold">경찰신고</span>
                  </a>

                  <a
                    href="tel:15880000"
                    className="bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 p-2.5 rounded-xl text-center flex flex-col items-center justify-center transition-all cursor-pointer"
                  >
                    <span className="text-xs font-black">관제센터</span>
                    <span className="text-[10px] font-bold">1588-0000</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center gap-3">
              <button
                onClick={cancelEmergencySos}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl text-xs font-bold transition-all"
              >
                비상 상황 해제 (Clear Emergency)
              </button>
              <button
                onClick={() => setIsSosModalOpen(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-xs font-extrabold transition-all shadow-md"
              >
                관제 모니터링 지속
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
