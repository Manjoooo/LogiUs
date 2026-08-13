import React from 'react';
import { DRIVER_PROFILE } from '../data/mockData';

export const MyPageScreen: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-8 py-6 space-y-6 pb-24">
      {/* Driver Profile Header Card */}
      <section className="bg-white rounded-2xl p-6 border border-[#cdc7aa] shadow-xs flex items-center gap-4">
        <div className="relative">
          <img
            src={DRIVER_PROFILE.avatarUrl}
            alt={DRIVER_PROFILE.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#e8e8e9]"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#84faab] border-2 border-white rounded-full" />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-bold text-[#1a1c1d] flex items-center gap-1.5">
            {DRIVER_PROFILE.name}
            <span className="material-symbols-outlined text-base text-[#6a5f00]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </h2>

          <div className="mt-1 inline-flex items-center gap-1 bg-[#e8e8e9] px-2.5 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px] text-[#4b4732]">local_shipping</span>
            <span className="text-xs font-semibold text-[#4b4732]">{DRIVER_PROFILE.vehicleType}</span>
          </div>
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#eeeeef] text-[#5f5e5e] transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </section>

      {/* Driver Stats Grid (Bento style) */}
      <section className="grid grid-cols-2 gap-3 md:gap-4">
        {/* Stat Card 1 */}
        <div className="bg-white border border-[#cdc7aa] rounded-2xl p-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#5f5e5e]">이번 달 운송</span>
            <div className="w-8 h-8 rounded-full bg-[#fee500]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#6a5f00] text-[18px]">inventory_2</span>
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#1a1c1d]">{DRIVER_PROFILE.monthlyTransitsCount}</span>
            <span className="text-xs text-[#4b4732]">건</span>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white border border-[#cdc7aa] rounded-2xl p-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#5f5e5e]">총 운행거리</span>
            <div className="w-8 h-8 rounded-full bg-[#fee500]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#6a5f00] text-[18px]">route</span>
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#1a1c1d]">
              {DRIVER_PROFILE.totalDistanceKm.toLocaleString()}
            </span>
            <span className="text-xs text-[#4b4732]">km</span>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white border border-[#cdc7aa] rounded-2xl p-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#5f5e5e]">평균 대기시간</span>
            <div className="w-8 h-8 rounded-full bg-[#e8e8e9] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#4b4732] text-[18px]">timer</span>
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#1a1c1d]">{DRIVER_PROFILE.avgWaitTimeMinutes}</span>
            <span className="text-xs text-[#4b4732]">분</span>
          </div>
        </div>

        {/* Stat Card 4 (Warning) */}
        <div className="bg-white border border-[#cdc7aa] rounded-2xl p-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#5f5e5e]">30분 초과 대기</span>
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600 text-[18px]">warning</span>
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-red-600">{DRIVER_PROFILE.over30MinWaitCount}</span>
            <span className="text-xs text-[#4b4732]">건</span>
          </div>
        </div>
      </section>

      {/* Recent History List */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-[#1a1c1d]">최근 운송 내역</h3>

        <div className="space-y-3">
          {/* Item 1 */}
          <article className="bg-white border border-[#cdc7aa] rounded-2xl overflow-hidden shadow-xs p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-[#e8e8e9] text-[#4b4732] text-xs font-semibold px-2 py-0.5 rounded">
                운송 완료
              </span>
              <span className="text-xs text-[#5f5e5e]">10. 24 (목)</span>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <div className="flex flex-col items-center mt-1">
                <div className="w-2 h-2 rounded-full bg-[#6a5f00]" />
                <div className="w-0.5 h-6 bg-[#cdc7aa] my-1" />
                <div className="w-2 h-2 rounded-full bg-[#5f5e5e]" />
              </div>

              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-xs text-[#5f5e5e]">상차지</p>
                  <p className="font-bold text-[#1a1c1d]">경기 평택시 포승읍</p>
                </div>

                <div>
                  <p className="text-xs text-[#5f5e5e]">하차지</p>
                  <p className="font-bold text-[#1a1c1d]">부산 강서구 송정동</p>
                </div>
              </div>
            </div>
          </article>

          {/* Item 2 */}
          <article className="bg-white border border-[#cdc7aa] rounded-2xl overflow-hidden shadow-xs p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-[#e8e8e9] text-[#4b4732] text-xs font-semibold px-2 py-0.5 rounded">
                운송 완료
              </span>
              <span className="text-xs text-[#5f5e5e]">10. 22 (화)</span>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <div className="flex flex-col items-center mt-1">
                <div className="w-2 h-2 rounded-full bg-[#6a5f00]" />
                <div className="w-0.5 h-6 bg-[#cdc7aa] my-1" />
                <div className="w-2 h-2 rounded-full bg-[#5f5e5e]" />
              </div>

              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-xs text-[#5f5e5e]">상차지</p>
                  <p className="font-bold text-[#1a1c1d]">인천 서구 오류동</p>
                </div>

                <div>
                  <p className="text-xs text-[#5f5e5e]">하차지</p>
                  <p className="font-bold text-[#1a1c1d]">충남 천안시 서북구</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
