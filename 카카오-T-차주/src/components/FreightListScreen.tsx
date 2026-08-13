import React, { useState } from 'react';
import { FreightItem } from '../types';
import { VoiceFreightGrabSection } from './VoiceFreightGrabSection';

interface FreightListScreenProps {
  freights: FreightItem[];
  onSelectFreightDetail: (freight: FreightItem) => void;
  onAcceptDispatch: (freight: FreightItem) => void;
  onOpenTCheckGuide: () => void;
}

export const FreightListScreen: React.FC<FreightListScreenProps> = ({
  freights,
  onSelectFreightDetail,
  onAcceptDispatch,
  onOpenTCheckGuide,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'trust' | 'nearby' | 'voice'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price'>('newest');
  const [showVoiceGrabSection, setShowVoiceGrabSection] = useState(false);

  const filteredFreights = freights
    .filter((f) => {
      if (activeFilter === 'trust') {
        return f.trustLevel === '신뢰 화물' || f.trustLevel === '믿고 운송';
      }
      if (activeFilter === 'nearby') {
        return f.distanceKm <= 50;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price') {
        return b.price - a.price;
      }
      return 0; // default newest
    });

  const renderBadge = (item: FreightItem) => {
    switch (item.trustLevel) {
      case '신뢰 화물':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#84fbab]/30 text-[#006d3a] font-medium text-xs">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            신뢰 화물
          </span>
        );
      case '믿고 운송':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-700 font-medium text-xs">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            믿고 운송
          </span>
        );
      case '안정 화물':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-200 text-gray-700 font-medium text-xs">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            안정 화물
          </span>
        );
      case '확인된 화물':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-100 text-amber-800 font-medium text-xs">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            확인된 화물
          </span>
        );
      case '새 화물':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-600 font-medium text-xs">
            <span className="material-symbols-outlined text-[14px]">new_releases</span>
            새 화물
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Welcome Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-base text-[#5f5e5e] mb-1 font-medium">김기사님,</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1c1d]">오늘도 안전 운전하세요.</h2>
        </div>

        <button
          onClick={onOpenTCheckGuide}
          className="self-start md:self-auto flex items-center gap-2 bg-white border border-[#cdc7aa] px-4 py-2 rounded-xl text-sm font-semibold text-[#1a1c1d] hover:bg-[#eeeeef] shadow-xs transition-all"
        >
          <span className="material-symbols-outlined text-[#6a5f00]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          T-Check 등급 안내
        </button>
      </div>

      {/* AI Voice Cargo Acceptance Feature Banner */}
      <div className="mb-6 bg-gradient-to-r from-[#1a1c1d] via-[#2d3138] to-[#1a1c1d] text-white p-5 rounded-2xl shadow-md border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#fee500] text-[#1a1c1d] flex items-center justify-center font-extrabold shrink-0 shadow-lg">
            <span className="material-symbols-outlined text-[28px] animate-pulse">mic</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#fee500] text-[#1a1c1d] font-black px-2 py-0.5 rounded">AI 신기능</span>
              <h3 className="text-base md:text-lg font-bold text-white">말 한마디로 화물 선점하기 (AI 음성 배차)</h3>
            </div>
            <p className="text-xs text-gray-300 mt-1">
              운전 중 터치 없이 "용인 가는 5톤 화물 잡아줘"라고 말하면 AI가 최적 화물을 찾아 자동 배차 수락합니다.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const nextState = !showVoiceGrabSection;
            setShowVoiceGrabSection(nextState);
            if (nextState) setActiveFilter('voice');
          }}
          className="self-start md:self-auto bg-[#fee500] hover:bg-[#fee500]/90 text-[#1a1c1d] px-5 py-2.5 rounded-xl text-xs md:text-sm font-extrabold flex items-center gap-2 shadow-md transition-all active:scale-95 whitespace-nowrap cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">graphic_eq</span>
          <span>{showVoiceGrabSection || activeFilter === 'voice' ? '음성관 접기' : '🎙️ 음성으로 화물 잡기'}</span>
        </button>
      </div>

      {/* Embedded AI Voice Freight Grab Interactive Section */}
      {(showVoiceGrabSection || activeFilter === 'voice') && (
        <VoiceFreightGrabSection
          freights={freights}
          onSelectFreightDetail={onSelectFreightDetail}
          onAcceptDispatch={onAcceptDispatch}
          onCloseVoiceMode={() => {
            setShowVoiceGrabSection(false);
            if (activeFilter === 'voice') setActiveFilter('all');
          }}
        />
      )}

      {/* Filter and Sort Utility Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-[#cdc7aa] shadow-xs">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => {
              setActiveFilter('all');
              setShowVoiceGrabSection(false);
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeFilter === 'all'
                ? 'bg-[#eeeeef] text-[#1a1c1d] border-[#1a1c1d]'
                : 'bg-white text-[#5f5e5e] border-[#cdc7aa] hover:bg-[#f9f9fa]'
            }`}
          >
            전체 화물 ({freights.length})
          </button>

          <button
            onClick={() => {
              setActiveFilter('voice');
              setShowVoiceGrabSection(true);
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              activeFilter === 'voice'
                ? 'bg-[#fee500] text-[#1a1c1d] border-[#6a5f00] font-bold shadow-xs'
                : 'bg-[#fee500]/15 text-[#6a5f00] border-[#6a5f00]/30 hover:bg-[#fee500]/30'
            }`}
          >
            <span className="material-symbols-outlined text-sm">mic</span>
            <span>🎙️ 음성 화물 잡기</span>
          </button>

          <button
            onClick={() => {
              setActiveFilter('trust');
              setShowVoiceGrabSection(false);
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeFilter === 'trust'
                ? 'bg-[#84fbab]/40 text-[#006d3a] border-[#006d3a]'
                : 'bg-white text-[#5f5e5e] border-[#cdc7aa] hover:bg-[#f9f9fa]'
            }`}
          >
            신뢰 / 믿고 운송
          </button>

          <button
            onClick={() => {
              setActiveFilter('nearby');
              setShowVoiceGrabSection(false);
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              activeFilter === 'nearby'
                ? 'bg-[#fee500]/40 text-[#6a5f00] border-[#6a5f00]'
                : 'bg-white text-[#5f5e5e] border-[#cdc7aa] hover:bg-[#f9f9fa]'
            }`}
          >
            근거리 (50km 이내)
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#5f5e5e] font-medium ml-auto">
          <span className="material-symbols-outlined text-sm">sort</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'price')}
            className="bg-transparent border-none text-xs font-bold text-[#1a1c1d] focus:outline-none cursor-pointer"
          >
            <option value="newest">최신순</option>
            <option value="price">높은 운임순</option>
          </select>
        </div>
      </div>

      {/* Freight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFreights.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-2xl border border-[#cdc7aa] p-5 hover:border-[#6a5f00] transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between group"
            onClick={() => onSelectFreightDetail(item)}
          >
            <div>
              {/* Header Badge & Price */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="mb-2">{renderBadge(item)}</div>
                  <h3 className="text-lg font-bold text-[#1a1c1d] group-hover:text-[#6a5f00] transition-colors">
                    {item.code}
                  </h3>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-[#6a5f00]">
                    {item.price.toLocaleString()}
                    <span className="text-sm font-normal text-[#5f5e5e] ml-1">원</span>
                  </p>
                </div>
              </div>

              {/* Route Info */}
              <div className="flex items-center gap-3 mb-5 bg-[#f9f9fa] p-3 rounded-xl border border-[#eeeeef]">
                <div className="flex-1 text-center">
                  <span className="text-base font-bold text-[#1a1c1d] block">{item.origin}</span>
                  <span className="text-xs text-[#5f5e5e] block mt-0.5">{item.originTime}</span>
                </div>

                <div className="flex flex-col items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#cdc7aa]">arrow_forward</span>
                  <span className="text-[11px] text-[#5f5e5e] bg-white px-2 py-0.5 rounded-full border border-[#cdc7aa] font-medium">
                    {item.distanceKm}km
                  </span>
                </div>

                <div className="flex-1 text-center">
                  <span className="text-base font-bold text-[#1a1c1d] block">{item.destination}</span>
                  <span className="text-xs text-[#5f5e5e] block mt-0.5">{item.destinationTime}</span>
                </div>
              </div>
            </div>

            {/* Footer vehicle type and Action Buttons */}
            <div className="border-t border-[#eeeeef] pt-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[#5f5e5e]">
                <span className="material-symbols-outlined text-lg">local_shipping</span>
                <span className="text-sm font-medium">{item.vehicleType}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFreightDetail(item);
                  }}
                  className="bg-white border border-[#cdc7aa] text-[#1a1c1d] px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#eeeeef] transition-colors active:scale-95"
                >
                  상세보기
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAcceptDispatch(item);
                  }}
                  className="bg-[#fee500] text-[#1a1c1d] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#fee500]/80 transition-colors active:scale-95 shadow-xs"
                >
                  배차 수락
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
