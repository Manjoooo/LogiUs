import React from 'react';
import { FreightItem } from '../types';
import { HOTLINK_IMAGES } from '../data/mockData';

interface FreightDetailModalProps {
  freight: FreightItem;
  onClose: () => void;
  onAcceptDispatch: (freight: FreightItem) => void;
}

export const FreightDetailModal: React.FC<FreightDetailModalProps> = ({
  freight,
  onClose,
  onAcceptDispatch,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-center items-end md:items-center p-0 md:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#f9f9fa] w-full max-w-[540px] rounded-t-2xl md:rounded-2xl border border-[#cdc7aa] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-[#f9f9fa] border-b border-[#cdc7aa] h-[60px] flex justify-between items-center px-4">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eeeeef] text-[#1a1c1d] transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <h2 className="text-base font-bold text-[#1a1c1d]">화물 상세 정보 ({freight.code})</h2>

          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#cdc7aa]">
            <img
              src={HOTLINK_IMAGES.managerProfile1}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Badge Icon Header */}
          <section className="flex flex-col items-center text-center mt-2">
            <div className="w-20 h-20 mb-3 bg-[#84fbab] rounded-full flex items-center justify-center shadow-sm border border-[#67dd91]">
              <span
                className="material-symbols-outlined text-[#00743e] text-[40px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_shipping
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[#006d3a] mb-1">{freight.trustLevel}</h3>
            <p className="text-sm text-[#5f5e5e] max-w-xs">
              최근 운송에서 등록 정보가 안정적으로 일치했어요.
            </p>
          </section>

          {/* Route & Price Card */}
          <section className="bg-white rounded-xl border border-[#cdc7aa] p-5 shadow-xs">
            <div className="flex justify-between items-center mb-5">
              <div className="flex-1 text-center">
                <span className="block text-xs text-[#5f5e5e] mb-1">상차</span>
                <span className="block text-base font-bold text-[#1a1c1d]">{freight.origin}</span>
                <span className="block text-xs text-[#5f5e5e] mt-1">{freight.originTime}</span>
              </div>

              <div className="px-3 flex flex-col items-center">
                <span className="material-symbols-outlined text-[#cdc7aa] mb-1">arrow_forward</span>
                <span className="text-xs font-semibold text-[#4b4732] bg-[#f3f3f4] px-2.5 py-1 rounded-full">
                  {freight.distanceKm}km
                </span>
              </div>

              <div className="flex-1 text-center">
                <span className="block text-xs text-[#5f5e5e] mb-1">하차</span>
                <span className="block text-base font-bold text-[#1a1c1d]">{freight.destination}</span>
                <span className="block text-xs text-[#5f5e5e] mt-1">{freight.destinationTime}</span>
              </div>
            </div>

            <hr className="border-t border-[#cdc7aa] mb-5" />

            <div className="flex justify-between items-baseline">
              <span className="text-sm text-[#5f5e5e]">운임</span>
              <span className="text-2xl font-bold text-[#1a1c1d]">
                {freight.price.toLocaleString()}
                <span className="text-base font-normal text-[#5f5e5e] ml-1">원</span>
              </span>
            </div>
          </section>

          {/* Transportation Info */}
          <section className="bg-white rounded-xl border border-[#cdc7aa] p-5 shadow-xs">
            <h4 className="text-base font-bold text-[#1a1c1d] border-b border-[#cdc7aa] pb-3 mb-3">
              운송 상세 정보
            </h4>

            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-[#5f5e5e]">차종</span>
                <span className="text-[#1a1c1d] font-semibold">{freight.vehicleType}</span>
              </li>

              <li className="flex justify-between">
                <span className="text-[#5f5e5e]">품목</span>
                <span className="text-[#1a1c1d] font-semibold">{freight.itemType}</span>
              </li>

              <li className="flex justify-between">
                <span className="text-[#5f5e5e]">거리</span>
                <span className="text-[#1a1c1d] font-semibold">{freight.distanceKm}km</span>
              </li>

              <li className="flex justify-between">
                <span className="text-[#5f5e5e]">화물 번호</span>
                <span className="text-[#1a1c1d] font-semibold">{freight.code}</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Bottom CTA Button */}
        <div className="p-4 bg-white border-t border-[#cdc7aa] sticky bottom-0">
          <button
            onClick={() => onAcceptDispatch(freight)}
            className="w-full bg-[#fee500] text-[#1a1c1d] text-base font-bold rounded-xl h-[52px] flex items-center justify-center hover:bg-[#fee500]/90 active:scale-98 transition-all shadow-md"
          >
            배차 수락
          </button>
        </div>
      </div>
    </div>
  );
};
