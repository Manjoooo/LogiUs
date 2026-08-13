import React from 'react';

interface CargoSummaryCardProps {
  category: string;
  weight: string;
  tempCondition: string;
  currentTemp?: number;
  onOpenTempLog?: () => void;
}

export const CargoSummaryCard: React.FC<CargoSummaryCardProps> = ({
  category,
  weight,
  tempCondition,
  currentTemp = -18.5,
  onOpenTempLog,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#e8e8ea] shadow-xs p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[17px] font-bold text-[#1a1c1d] tracking-tight">화물 정보 요약</h3>
        {onOpenTempLog && (
          <button
            onClick={onOpenTempLog}
            className="text-[12px] text-[#2563eb] font-semibold hover:underline flex items-center gap-1"
          >
            <span>온도 그래프</span>
            <span className="material-symbols-outlined text-[14px]">show_chart</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center py-2.5 border-b border-[#e8e8ea]">
          <span className="text-[14px] text-[#5f5e5e]">품목</span>
          <span className="text-[14px] font-semibold text-[#1a1c1d]">{category}</span>
        </div>

        <div className="flex justify-between items-center py-2.5 border-b border-[#e8e8ea]">
          <span className="text-[14px] text-[#5f5e5e]">총 중량</span>
          <span className="text-[14px] font-semibold text-[#1a1c1d]">{weight}</span>
        </div>

        <div className="flex justify-between items-center py-2.5">
          <span className="text-[14px] text-[#5f5e5e]">온도 조건</span>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-[#2563eb]">{tempCondition}</span>
            <span className="text-[11px] bg-[#2563eb]/10 text-[#2563eb] font-bold px-2 py-0.5 rounded-full">
              현재 {currentTemp}℃
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
