import React from 'react';

interface TCheckGuideScreenProps {
  onClose?: () => void;
}

export const TCheckGuideScreen: React.FC<TCheckGuideScreenProps> = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-8 py-6 space-y-6 pb-24">
      {/* Hero Intro */}
      <section className="bg-white rounded-2xl border border-[#cdc7aa] p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="material-symbols-outlined text-[#6a5f00] text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#1a1c1d]">T-Check란?</h2>
        </div>

        <p className="text-sm md:text-base text-[#4b4732] leading-relaxed">
          실제 운송 경험을 바탕으로 등록된 화물 정보의 신뢰 수준을 보여주는 지표입니다.
          기사님의 피드백과 운송 데이터를 통해 더욱 신뢰할 수 있는 화물 네트워크를 만듭니다.
        </p>
      </section>

      {/* Trust Levels Grid */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-[#1a1c1d] border-b border-[#cdc7aa] pb-2">
          신뢰도 등급 체계
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Level 1 */}
          <div className="bg-white border border-[#cdc7aa] rounded-xl p-4 flex flex-col items-center text-center shadow-xs">
            <div className="w-14 h-14 bg-[#eeeeef] rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[#5f5e5e] text-2xl">info</span>
            </div>
            <span className="text-sm font-bold text-[#1a1c1d]">정보 확인</span>
          </div>

          {/* Level 2 */}
          <div className="bg-white border border-[#cdc7aa] rounded-xl p-4 flex flex-col items-center text-center shadow-xs">
            <div className="w-14 h-14 bg-[#eeeeef] rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[#5f5e5e] text-2xl">fiber_new</span>
            </div>
            <span className="text-sm font-bold text-[#1a1c1d]">새 화물</span>
          </div>

          {/* Level 3 */}
          <div className="bg-white border border-[#cdc7aa] rounded-xl p-4 flex flex-col items-center text-center shadow-xs">
            <div className="w-14 h-14 bg-[#eeeeef] rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[#5f5e5e] text-2xl">check_circle</span>
            </div>
            <span className="text-sm font-bold text-[#1a1c1d]">확인된 화물</span>
          </div>

          {/* Level 4 */}
          <div className="bg-white border border-[#cdc7aa] rounded-xl p-4 flex flex-col items-center text-center shadow-xs">
            <div className="w-14 h-14 bg-[#eeeeef] rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[#6a5f00] text-2xl">security</span>
            </div>
            <span className="text-sm font-bold text-[#1a1c1d]">안정 화물</span>
          </div>

          {/* Level 5 */}
          <div className="bg-white border border-[#cdc7aa] rounded-xl p-4 flex flex-col items-center text-center shadow-xs">
            <div className="w-14 h-14 bg-[#84fbab]/30 rounded-full flex items-center justify-center mb-3">
              <span
                className="material-symbols-outlined text-[#006d3a] text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <span className="text-sm font-bold text-[#1a1c1d]">신뢰 화물</span>
          </div>

          {/* Level 6 - MAX */}
          <div className="bg-white border-2 border-[#6a5f00] rounded-xl p-4 flex flex-col items-center text-center bg-[#fee500]/10 relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 bg-[#6a5f00] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
              MAX
            </div>
            <div className="w-14 h-14 bg-[#fee500] rounded-full flex items-center justify-center mb-3 shadow-xs">
              <span
                className="material-symbols-outlined text-[#716600] text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_shipping
              </span>
            </div>
            <span className="text-sm font-bold text-[#716600]">믿고 운송</span>
          </div>
        </div>
      </section>

      {/* Key Evaluation Metrics */}
      <section className="bg-white border border-[#cdc7aa] rounded-2xl p-5 shadow-xs">
        <h3 className="text-base font-bold text-[#1a1c1d] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#5f5e5e]">analytics</span>
          주요 평가 항목
        </h3>

        <ul className="space-y-4 text-sm">
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#6a5f00] mt-0.5">route</span>
            <div>
              <strong className="text-[#1a1c1d] block mb-0.5">운송 거리 및 경로 정확도</strong>
              <p className="text-xs text-[#4b4732]">실제 이동 데이터와 등록된 경로의 일치율을 분석합니다.</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#6a5f00] mt-0.5">schedule</span>
            <div>
              <strong className="text-[#1a1c1d] block mb-0.5">상/하차 시간 준수율</strong>
              <p className="text-xs text-[#4b4732]">약속된 상하차 시간 내 처리 완료 여부를 평가합니다.</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#6a5f00] mt-0.5">fact_check</span>
            <div>
              <strong className="text-[#1a1c1d] block mb-0.5">화물 정보 일치도</strong>
              <p className="text-xs text-[#4b4732]">
                무게, 규격 등 사전 등록 정보와 현장 확인 정보의 차이를 비교합니다.
              </p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};
