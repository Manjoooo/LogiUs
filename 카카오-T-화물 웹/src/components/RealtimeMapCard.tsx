import React, { useState, useEffect } from 'react';
import { CargoItem } from '../types';

interface RealtimeMapCardProps {
  cargo: CargoItem;
  onOpenDriverContact: () => void;
  onOpenTempModal: () => void;
}

export const RealtimeMapCard: React.FC<RealtimeMapCardProps> = ({
  cargo,
  onOpenDriverContact,
  onOpenTempModal,
}) => {
  const [isSimulating, setIsSimulating] = useState(true);
  const [truckPosIndex, setTruckPosIndex] = useState(42); // Percentage along path
  const [speed, setSpeed] = useState(cargo.currentLocation.speedKmH || 72);

  // Live simulation of movement along highway
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setTruckPosIndex((prev) => {
        if (prev >= 88) return 40; // loop back for continuous simulation
        return prev + 0.3;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const mapBgUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCE0HnCCRqQLe2WDyvtH4Xy_JB9PIuoqrfDBjH17aUO7s9a5sWauhbJGDJG426kekQJnwXRAVTCMRKHqWIxZQL5tzjowJriWgurdEPeQkTZxUnPM5cidc6G0DdSyMOkkFCRQSkZIcOCOTpbZ18sp7H5uMrnYFBboatT8zZwznnfxnr8c27a4DCFLeDVp5LhWiNVG_jGHmAy9JD-s_8hzYvgWURtLjE-D7K1ljlAtWc7uYbHUC-JTAYS';

  const remainingKm = Math.max(1, Math.round(cargo.currentLocation.remainingDistanceKm * (1 - (truckPosIndex - 40) / 50)));

  return (
    <div className="bg-white rounded-2xl border border-[#e8e8ea] shadow-xs overflow-hidden flex flex-col min-h-[420px]">
      {/* Top Header Bar */}
      <div className="p-4 sm:px-6 border-b border-[#e8e8ea] flex flex-wrap justify-between items-center gap-3 bg-[#f9f9fa]">
        <h3 className="text-[16px] font-bold text-[#1a1c1d] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#6a5f00] text-[20px]">my_location</span>
          실시간 차량 위치
        </h3>

        <div className="flex items-center gap-3">
          {/* Temperature Quick Status */}
          <button
            onClick={onOpenTempModal}
            className="text-[12px] bg-[#006d3a]/10 text-[#006d3a] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 hover:bg-[#006d3a]/20 transition-colors border border-[#006d3a]/20"
            title="온도 관제 상세 보기"
          >
            <span className="material-symbols-outlined text-[15px]">ac_unit</span>
            <span>{cargo.cargoDetails.currentTemp}℃ (정상)</span>
          </button>

          {/* Live Sync Badge */}
          <span className="text-[12px] text-[#5f5e5e] flex items-center gap-1.5 font-medium bg-white px-2.5 py-1 rounded-full border border-[#e8e8ea]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            실시간 연동 중
          </span>
        </div>
      </div>

      {/* Map View Canvas Container */}
      <div className="flex-1 relative bg-[#eeeeef] overflow-hidden min-h-[320px] sm:min-h-[380px]">
        {/* Background Map Graphic */}
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full opacity-70 transition-transform duration-700"
          style={{ backgroundImage: `url(${mapBgUrl})` }}
        />

        {/* Dynamic Vector Route Line and Animated Marker */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Main Truck Route Path */}
          <path
            d="M 60 220 C 140 180, 260 260, 380 180 S 580 160, 720 240"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="8 4"
          />
        </svg>

        {/* Vehicle Position Marker */}
        <div
          className="absolute transition-all duration-1000 ease-linear z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${truckPosIndex}%`,
            top: `${50 - Math.sin(truckPosIndex / 10) * 12}%`,
          }}
        >
          <div className="relative group cursor-pointer">
            {/* Radar Pulsing Ring */}
            <div className="absolute -inset-3 bg-[#fee500]/60 rounded-full animate-ping opacity-75" />
            <div className="relative w-11 h-11 rounded-full bg-[#1a1c1d] border-2 border-[#fee500] shadow-xl flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[22px] text-[#fee500]">
                local_shipping
              </span>
            </div>
            {/* Speed Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1c1d] text-[#fee500] text-[11px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap">
              {speed} km/h
            </div>
          </div>
        </div>

        {/* Map Interactive Controls (Top Right Overlay) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className="p-2.5 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-[#e8e8ea] text-[#1a1c1d] hover:bg-white transition-all flex items-center gap-1.5 text-[12px] font-semibold"
            title={isSimulating ? '실시간 관제 일시정지' : '실시간 관제 재생'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSimulating ? 'pause_circle' : 'play_circle'}
            </span>
            <span className="hidden sm:inline">{isSimulating ? '시뮬레이션 일시정지' : '위치 추적 재개'}</span>
          </button>

          <button
            onClick={onOpenDriverContact}
            className="p-2.5 bg-[#1a1c1d] text-[#fee500] rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-1.5 text-[12px] font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span className="hidden sm:inline">기사님 통화</span>
          </button>
        </div>

        {/* Bottom Current Location Overlay Box (Matching design screenshot) */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[340px] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#e8e8ea] z-20 transition-all">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[12px] font-medium text-[#5f5e5e]">현재 위치</p>
            <span className="px-2.5 py-0.5 bg-[#fee500] rounded text-[11px] font-bold text-[#1a1c1d] shadow-2xs">
              {cargo.status}
            </span>
          </div>

          <p className="text-[17px] font-bold text-[#1a1c1d] mb-1 tracking-tight">
            {cargo.currentLocation.name}
          </p>

          <p className="text-[13px] text-[#4b4732] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#7c775f]">near_me</span>
            <span>{cargo.currentLocation.detail.split('(')[0]} (하차지까지 {remainingKm}km)</span>
          </p>

          {/* Quick Stats Bar inside location card */}
          <div className="mt-3 pt-2.5 border-t border-[#eeeeef] flex items-center justify-between text-[11px] text-[#5f5e5e]">
            <span>차량: {cargo.vehicleNumber}</span>
            <span>기사: {cargo.driverName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
