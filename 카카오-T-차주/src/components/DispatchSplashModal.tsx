import React from 'react';
import { FreightItem } from '../types';
import { HOTLINK_IMAGES } from '../data/mockData';

interface DispatchSplashModalProps {
  freight: FreightItem;
  onClose: () => void;
  onStartTransit: (freight: FreightItem) => void;
}

export const DispatchSplashModal: React.FC<DispatchSplashModalProps> = ({
  freight,
  onClose,
  onStartTransit,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-md bg-[#f9f9fa] rounded-2xl border border-[#cdc7aa] shadow-2xl overflow-hidden flex flex-col relative">
        {/* Background gradient decorative element */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#fee500]/20 to-transparent pointer-events-none" />

        {/* Top Close Button */}
        <header className="flex justify-between items-center p-4 z-10">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            <span className="material-symbols-outlined text-[#1a1c1d]">close</span>
          </button>
        </header>

        {/* Content Body */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 space-y-6">
          {/* Animated Hero Icon Graphic */}
          <div className="w-40 h-40 rounded-full bg-[#fee500] flex items-center justify-center shadow-lg relative my-2">
            <div className="absolute inset-0 rounded-full border-4 border-[#fee500] animate-ping opacity-60" />
            <span
              className="material-symbols-outlined text-[72px] text-[#716600]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              task_alt
            </span>
          </div>

          {/* Title & Tag */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#e8e8e9] px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#84faab]" />
              <span className="text-xs font-semibold text-[#5f5e5e]">{freight.code}</span>
            </div>

            <h2 className="text-2xl font-bold text-[#1a1c1d]">배차가 확정됐어요</h2>
            <p className="text-sm text-[#4b4732]">안전 운행 부탁드립니다.</p>
          </div>

          {/* Shipment Details Card */}
          <div className="w-full bg-white border border-[#cdc7aa] rounded-xl p-4 space-y-4 shadow-xs">
            {/* Carrier Info */}
            <div className="flex items-center gap-3 pb-3 border-b border-[#e2e2e3]">
              <div className="w-12 h-12 rounded-full bg-[#eeeeef] flex items-center justify-center overflow-hidden shrink-0 border border-[#cdc7aa]">
                <img
                  src={HOTLINK_IMAGES.emeraldTruck}
                  alt="Emerald Truck"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="text-sm font-bold text-[#1a1c1d]">
                  [Emerald Truck] {freight.trustLevel}
                </p>
                <p className="text-xs text-[#5f5e5e]">{freight.vehicleType} • {freight.itemType}</p>
              </div>
            </div>

            {/* Timeline info */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-[#5f5e5e]">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  <span>상차 예정</span>
                </div>
                <span className="font-bold text-[#1a1c1d]">13:30</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-[#5f5e5e]">
                  <span className="material-symbols-outlined text-[18px]">flag</span>
                  <span>도착 예정</span>
                </div>
                <span className="font-bold text-[#1a1c1d]">14:35</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer CTA */}
        <div className="p-4 bg-white border-t border-[#cdc7aa] z-20">
          <button
            onClick={() => onStartTransit(freight)}
            className="w-full h-[52px] bg-[#fee500] text-[#201c00] text-base font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#fee500]/90 active:scale-98 transition-all shadow-md"
          >
            <span className="material-symbols-outlined">navigation</span>
            <span>운송 시작하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
