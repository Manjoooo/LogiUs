import React, { useState } from 'react';
import { IncidentReport, FreightItem } from '../types';
import { HOTLINK_IMAGES } from '../data/mockData';

interface FieldRadarScreenProps {
  incident: IncidentReport;
  activeFreight: FreightItem;
  onSelectActiveFreight: () => void;
  onOpenVoiceReport: () => void;
}

export const FieldRadarScreen: React.FC<FieldRadarScreenProps> = ({
  incident,
  activeFreight,
  onSelectActiveFreight,
  onOpenVoiceReport,
}) => {
  const [detourActive, setDetourActive] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(incident.userConfirmed);
  const [confirmCount, setConfirmCount] = useState(incident.confirmedCount);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!userConfirmed) {
      setUserConfirmed(true);
      setConfirmCount((prev) => prev + 1);
      showToast('제보 확인이 등록되었습니다. 감사합니다!');
    } else {
      showToast('이미 확인하신 제보입니다.');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden font-sans text-[#1a1c1d]">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1a1c1d] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-xl animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* Map Background Area */}
      <div className="absolute inset-0 z-0 bg-[#e2e2e3]">
        <img
          src={HOTLINK_IMAGES.mapRadarBg}
          alt="GPS Navigation Highway Map"
          className="w-full h-full object-cover opacity-90"
        />

        {/* Gradient Overlay for UI readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f9f9fa] via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>

      {/* Map Pins */}
      {/* 1. Main Focus: Rockfall Hazard Pin */}
      <div className="absolute top-[38%] left-[52%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center cursor-pointer">
        <div className="animate-bounce">
          <div className="bg-red-600 text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg ring-4 ring-red-500/30">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              landslide
            </span>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md mt-1 shadow-md border border-[#cdc7aa] text-xs text-red-600 font-bold">
          낙석 (1.2km)
        </div>
      </div>

      {/* 2. Traffic Jam Pin */}
      <div className="absolute top-[26%] left-[32%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center opacity-85">
        <div className="bg-[#6a5f00] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            traffic
          </span>
        </div>
      </div>

      {/* 3. Logistics Center Congestion Pin */}
      <div className="absolute top-[18%] left-[72%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center opacity-85">
        <div className="bg-[#5f5e5e] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            warehouse
          </span>
        </div>
      </div>

      {/* Top Floating Header */}
      <header className="absolute top-4 left-0 w-full px-4 z-20 flex justify-between items-center pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-sm border border-[#cdc7aa] flex items-center gap-2 pointer-events-auto">
          <span className="material-symbols-outlined text-[#6a5f00]">radar</span>
          <span className="text-sm font-bold text-[#1a1c1d]">현장 Radar</span>
        </div>

        <button
          onClick={onOpenVoiceReport}
          className="bg-[#fee500] text-[#1a1c1d] px-4 py-2 rounded-full text-xs font-bold shadow-md border border-[#cdc7aa] flex items-center gap-1.5 pointer-events-auto hover:bg-[#fee500]/90 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">add_alert</span>
          이슈 제보하기
        </button>
      </header>

      {/* Overlay UI Container (Bottom Stack) */}
      <div className="absolute bottom-[80px] md:bottom-8 w-full px-4 z-20 max-w-xl left-1/2 -translate-x-1/2 flex flex-col gap-3 pointer-events-none">
        {/* Detour Alert Card if active */}
        {detourActive && (
          <div className="bg-[#006d3a] text-white p-3 rounded-xl shadow-lg border border-[#84fbab] flex items-center justify-between pointer-events-auto animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">alt_route</span>
              <span>우회 경로 적용됨: 3.5km 우회 (예상 시간 +8분, 안전 경로)</span>
            </div>
            <button
              onClick={() => setDetourActive(false)}
              className="text-white/80 hover:text-white text-xs font-bold underline ml-2"
            >
              취소
            </button>
          </div>
        )}

        {/* Main Warning Card (Glassmorphism Bento) */}
        <div className="bg-white/95 backdrop-blur-xl border border-red-200 rounded-2xl shadow-xl overflow-hidden pointer-events-auto">
          <div className="h-1.5 w-full bg-red-600" />

          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 text-red-700 p-2.5 rounded-xl shrink-0">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  warning
                </span>
              </div>

              <div className="flex-1">
                <h2 className="text-base font-bold text-red-700 flex items-center gap-1">
                  <span>🪨</span> {incident.description}
                </h2>
                <p className="text-xs text-red-600 font-medium mt-0.5">
                  영향: {incident.affectedLanes} ({incident.locationName})
                </p>
              </div>
            </div>

            <div className="bg-[#f3f3f4] rounded-xl p-3 border border-[#cdc7aa]/50 grid grid-cols-1 text-xs gap-1.5 text-[#1a1c1d]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#5f5e5e]">group</span>
                <span>상태: <strong className="font-bold">다수 차주 교차 확인 ({confirmCount}명)</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#5f5e5e]">history</span>
                <span>최근 8분: <strong className="text-[#6a5f00]">차주 {incident.recentDriverReportsCount}명 유사 제보</strong></span>
              </div>
            </div>

            <div className="flex gap-2.5 mt-1">
              <button
                onClick={() => setDetourActive(!detourActive)}
                className={`flex-1 font-bold text-xs h-[48px] rounded-xl shadow-xs transition-all flex justify-center items-center gap-1.5 active:scale-98 ${
                  detourActive
                    ? 'bg-gray-800 text-white'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">alt_route</span>
                {detourActive ? '원래 경로 보기' : '우회 경로 확인'}
              </button>

              <button
                onClick={handleConfirm}
                className={`flex-1 font-bold text-xs h-[48px] rounded-xl border transition-all flex justify-center items-center gap-1.5 active:scale-98 ${
                  userConfirmed
                    ? 'bg-[#84fbab]/30 border-[#006d3a] text-[#006d3a]'
                    : 'bg-white border-[#cdc7aa] text-[#1a1c1d] hover:bg-[#eeeeef]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                {userConfirmed ? '확인 완료' : '나도 확인했어요'}
              </button>
            </div>
          </div>
        </div>

        {/* Trust Freight Information Card */}
        <div
          onClick={onSelectActiveFreight}
          className="bg-white rounded-xl p-3 flex items-center justify-between shadow-md border border-[#cdc7aa] pointer-events-auto cursor-pointer hover:bg-[#eeeeef] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#84fbab] text-[#00743e] rounded-full flex items-center justify-center shrink-0 border border-[#006d3a]/20">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_shipping
              </span>
            </div>

            <div className="flex flex-col text-left">
              <div className="text-[11px] text-[#5f5e5e] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#006d3a]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                신뢰 화물 정보
              </div>

              <div className="text-xs font-bold text-[#1a1c1d] flex items-baseline gap-1">
                {activeFreight.code} <span className="text-[#006d3a] font-semibold">[{activeFreight.trustLevel}]</span>
              </div>
            </div>
          </div>

          <button className="w-8 h-8 flex items-center justify-center text-[#5f5e5e]">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};
