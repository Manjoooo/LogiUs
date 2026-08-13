import React from 'react';

interface UnloadingDockCardProps {
  centerName: string;
  address: string;
  dockNumber: string;
  dockUpdated?: boolean;
  dockNotice?: string;
  onOpenMapDirections?: () => void;
}

export const UnloadingDockCard: React.FC<UnloadingDockCardProps> = ({
  centerName,
  address,
  dockNumber,
  dockUpdated = true,
  dockNotice = '지연으로 인해 하차 도크가 변경되었습니다.',
  onOpenMapDirections,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#e8e8ea] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-[#f3f3f4] border-b border-[#e8e8ea] flex justify-between items-center">
        <h3 className="text-[16px] font-bold text-[#1a1c1d] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#1a1c1d] text-[20px]">warehouse</span>
          하차지 정보
        </h3>
        {onOpenMapDirections && (
          <button
            onClick={onOpenMapDirections}
            className="text-[12px] font-semibold text-[#6a5f00] hover:underline flex items-center gap-1"
          >
            <span>지도 보기</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <p className="text-[12px] text-[#5f5e5e] mb-1">도착지 센터</p>
          <p className="text-[16px] font-bold text-[#1a1c1d]">{centerName}</p>
          <p className="text-[13px] text-[#4b4732] mt-1">{address}</p>
        </div>

        <div className="pt-4 border-t border-[#e8e8ea]">
          <div className="flex justify-between items-center bg-[#fee500]/15 p-3.5 rounded-xl border border-[#fee500]/40 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#6a5f00] text-[20px]">dock</span>
              <span className="text-[14px] font-semibold text-[#1a1c1d]">
                배정 도크 {dockUpdated && <span className="text-[12px] font-bold text-[#6a5f00]">(업데이트됨)</span>}
              </span>
            </div>
            <span className="text-[18px] font-bold text-[#1a1c1d] px-3 py-1 bg-white rounded-lg shadow-xs border border-[#e8e8ea]">
              {dockNumber}
            </span>
          </div>

          {dockNotice && (
            <p className="text-[12px] text-[#5f5e5e] mt-2.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#6a5f00]">info</span>
              <span>{dockNotice}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
