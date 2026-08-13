import React from 'react';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#e8e8ea] relative text-left">
        <div className="flex justify-between items-start pb-4 border-b border-[#e8e8ea] mb-5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#6a5f00]">help_outline</span>
            <h3 className="text-[18px] font-bold text-[#1a1c1d]">카카오 T 화물 도움말</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5f5e5e] hover:text-[#1a1c1d] rounded-full hover:bg-[#f3f3f4]"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="space-y-4 text-[13px] text-[#4b4732] mb-6">
          <div className="bg-[#f9f9fa] p-3.5 rounded-xl border border-[#e8e8ea]">
            <h4 className="font-bold text-[#1a1c1d] mb-1">Q. ETA 지연은 어떻게 감지되나요?</h4>
            <p className="text-[12px] text-[#5f5e5e]">
              차량 내 GPS 및 한국도로공사 실시간 교통정보 데이터를 연동하여 정체 발생 시 ETA가 자동으로 업데이트됩니다.
            </p>
          </div>

          <div className="bg-[#f9f9fa] p-3.5 rounded-xl border border-[#e8e8ea]">
            <h4 className="font-bold text-[#1a1c1d] mb-1">Q. 하차 도크가 변경되면 알림이 오나요?</h4>
            <p className="text-[12px] text-[#5f5e5e]">
              물류센터 도크 배정 변경 즉시 관제 알림 메세지 및 앱 푸시로 전송됩니다.
            </p>
          </div>

          <div className="bg-[#f9f9fa] p-3.5 rounded-xl border border-[#e8e8ea]">
            <h4 className="font-bold text-[#1a1c1d] mb-1">카카오 T 화물 고객센터</h4>
            <p className="text-[14px] font-bold text-[#1a1c1d] mt-1">1588-1025 (24시간 관제 센터)</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#1a1c1d] text-white font-bold rounded-xl hover:bg-black transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};
