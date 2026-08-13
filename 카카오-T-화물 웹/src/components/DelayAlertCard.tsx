import React, { useState } from 'react';

interface DelayAlertCardProps {
  reason: string;
  originalEta: string;
  updatedEta: string;
  onRecalculateEta?: () => void;
}

export const DelayAlertCard: React.FC<DelayAlertCardProps> = ({
  reason,
  originalEta,
  updatedEta,
  onRecalculateEta,
}) => {
  const [isRecalculating, setIsRecalculating] = useState(false);

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      if (onRecalculateEta) onRecalculateEta();
    }, 800);
  };

  return (
    <div className="bg-[#f04452]/5 border border-[#f04452]/20 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 shadow-xs">
      {/* Alert Icon */}
      <div className="p-3 bg-[#f04452]/10 rounded-full text-[#f04452] shrink-0 mt-0.5">
        <span className="material-symbols-outlined text-[24px]">warning</span>
      </div>

      {/* Alert Text & Details */}
      <div className="flex-1 w-full">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
          <h3 className="text-[18px] font-bold text-[#f04452] tracking-tight">도착 지연 예상</h3>
          <span className="text-[12px] bg-[#f04452]/10 text-[#f04452] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f04452] animate-ping" />
            실시간 지연 감지됨
          </span>
        </div>

        <p className="text-[14px] text-[#4b4732] leading-relaxed mb-4">
          현재 구간 <strong className="text-[#1a1c1d] font-bold">{reason}</strong>로 인해 하차지 도착 시간이 지연될 예정입니다.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3.5 rounded-xl border border-[#e8e8ea] shadow-xs">
          <div className="flex items-center gap-4 text-[14px]">
            <div className="flex flex-col">
              <span className="text-[#5f5e5e] text-[11px] font-medium">기존 ETA</span>
              <span className="font-semibold text-[#1a1c1d] line-through decoration-[#5f5e5e]/80">
                {originalEta}
              </span>
            </div>

            <span className="material-symbols-outlined text-[#5f5e5e]">arrow_right_alt</span>

            <div className="flex flex-col">
              <span className="text-[#f04452] text-[11px] font-bold">변경 ETA</span>
              <span className="font-bold text-[#f04452] text-[18px] leading-tight">
                {updatedEta}
              </span>
            </div>
          </div>

          <button
            onClick={handleRecalculate}
            disabled={isRecalculating}
            className="text-[13px] font-semibold text-[#1a1c1d] bg-[#f3f3f4] hover:bg-[#e8e8e9] active:scale-98 px-3.5 py-2 rounded-lg border border-[#cdc7aa]/40 transition-all flex items-center gap-1.5"
          >
            <span className={`material-symbols-outlined text-[16px] ${isRecalculating ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isRecalculating ? '재계산 중...' : 'ETA 다시 계산'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
