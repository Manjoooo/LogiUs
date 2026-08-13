import React, { useState } from 'react';
import { FreightItem } from '../types';
import { HOTLINK_IMAGES } from '../data/mockData';
import { classifyVoiceReport } from '../utils/voiceClassifier';

interface OperatorWaitModalProps {
  activeFreight: FreightItem;
  voiceReportText: string;
  onClose: () => void;
  onConfirmDockUpdate: () => void;
}

export const OperatorWaitModal: React.FC<OperatorWaitModalProps> = ({
  activeFreight,
  voiceReportText,
  onClose,
  onConfirmDockUpdate,
}) => {
  const [showResult, setShowResult] = useState(false);

  // Dynamic classification based on user's voice report text
  const reportInfo = classifyVoiceReport(
    voiceReportText || '앞에 산에서 돌이 떨어져서 2개 차로가 막혀 있어요.'
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-sans">
      <div className="bg-[#f9f9fa] w-full max-w-md rounded-2xl border border-[#cdc7aa] shadow-2xl overflow-hidden flex flex-col relative max-h-[92vh]">
        {/* Step 1: APP-08 Waiting Screen */}
        {!showResult ? (
          <div className="flex flex-col h-full overflow-y-auto p-5 space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-[#cdc7aa]">
              <h2 className="text-base font-bold text-[#1a1c1d]">관제 실시간 대응 대기</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#eeeeef] text-[#1a1c1d]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Notification Banner */}
            <div className="bg-[#fee500] rounded-xl p-3.5 flex items-center gap-3 shadow-xs border border-[#cdc7aa]">
              <span className="material-symbols-outlined text-[#716600]" style={{ fontVariationSettings: "'FILL' 1" }}>
                campaign
              </span>
              <div>
                <p className="text-sm font-extrabold text-[#1a1c1d]">관제센터에 AI 음성 제보 공유 완료</p>
                <p className="text-xs text-[#6a5f00] font-medium">물류센터 및 인근 차량에 실시간 공유 중</p>
              </div>
            </div>

            {/* Order Status Card */}
            <div className="bg-white border border-[#cdc7aa] rounded-2xl p-4 flex flex-col gap-3 shadow-xs">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#84fbab] text-[#00743e] text-[11px] font-bold">
                      Emerald Truck
                    </span>
                    <span className="text-xs text-[#5f5e5e] font-semibold">{activeFreight.trustLevel}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1a1c1d]">Order: {activeFreight.code}</h3>
                </div>
              </div>

              <div className="h-px bg-[#cdc7aa]/40 w-full" />

              {/* Dynamic Issue detail */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#5f5e5e]">이슈 유형</span>
                  <span className={`font-extrabold px-2 py-0.5 rounded ${reportInfo.badgeBg} ${reportInfo.badgeTextColor}`}>
                    {reportInfo.category} (14:04 접수)
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-[#5f5e5e] shrink-0 mr-2">영향 범위</span>
                  <span className="font-bold text-[#1a1c1d] text-right">{reportInfo.impact}</span>
                </div>

                <div className="bg-[#f9f9fa] p-2.5 rounded-xl border border-[#cdc7aa] text-xs text-[#1a1c1d] font-semibold">
                  제보 내용: &quot;{voiceReportText || '앞에 산에서 돌이 떨어져서 2개 차로가 막혀 있어요.'}&quot;
                </div>
              </div>

              <div className="h-px bg-[#cdc7aa]/40 w-full" />

              {/* ETA Delay Card */}
              <div className="bg-red-50 rounded-xl p-3 flex flex-col gap-2 border border-red-200">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                  ETA DELAY (예상 지연 반영)
                </span>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-[#5f5e5e] line-through">기존 14:35</span>
                    <span className="text-base font-extrabold text-red-600">현재 15:10</span>
                  </div>

                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                    +35분
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-[#cdc7aa] rounded-2xl p-4 shadow-xs">
              <h4 className="text-xs font-bold text-[#1a1c1d] mb-3">관제 처리 타임라인</h4>

              <div className="relative pl-5 flex flex-col gap-4 text-xs">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-[#cdc7aa]" />

                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#cdc7aa]" />
                  <div>
                    <span className="text-[#5f5e5e]">14:03</span>
                    <p className="font-semibold text-[#1a1c1d]">도로 현장 지연 감지</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#cdc7aa]" />
                  <div>
                    <span className="text-[#5f5e5e]">14:04</span>
                    <p className="font-semibold text-[#1a1c1d]">AI 음성 제보 분석 ({reportInfo.badgeText})</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#fee500] ring-2 ring-[#6a5f00]" />
                  <div>
                    <span className="text-[#6a5f00] font-bold">14:05</span>
                    <p className="font-bold text-[#1a1c1d]">물류센터 하차 도크 변경 및 시간 조정 완료</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Button to proceed to response result */}
            <button
              onClick={() => setShowResult(true)}
              className="w-full bg-[#fee500] text-[#1a1c1d] text-sm font-extrabold py-3.5 rounded-xl hover:bg-[#fee500]/90 transition-colors shadow-md mt-2 flex items-center justify-center gap-2"
            >
              <span>관제 조치 결과 확인하기</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        ) : (
          /* Step 2: APP-09 Response Result Screen */
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Header Image / Dock Illustration */}
            <div className="relative w-full h-[200px] bg-[#eeeeef] flex items-center justify-center overflow-hidden">
              <img
                src={HOTLINK_IMAGES.dockUpdatedIllustration}
                alt="2.5D Isometric Logistics Dock"
                className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#f9f9fa] via-transparent to-transparent" />

              <div className="relative z-10 bg-[#84fbab] text-[#00743e] rounded-full w-16 h-16 flex items-center justify-center shadow-md border-2 border-white mt-12">
                <span
                  className="material-symbols-outlined text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col gap-5">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#1a1c1d] mb-1">
                  운송 정보가 업데이트됐어요
                </h3>
                <p className="text-xs text-[#5f5e5e]">
                  물류센터에 변경된 도크 및 시간 정보가 자동 공유됐습니다.
                </p>
              </div>

              {/* Changes Data Grid */}
              <div className="bg-[#f3f3f4] rounded-xl p-4 flex flex-col gap-3 border border-[#cdc7aa]">
                {/* Change Item 1 */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#eeeeef] rounded-full w-9 h-9 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#4b4732]">dock</span>
                  </div>

                  <div className="flex-1 pt-0.5">
                    <p className="text-xs text-[#5f5e5e] mb-0.5">하차 도크 변경</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#5f5e5e] line-through">D07</span>
                      <span className="material-symbols-outlined text-xs text-[#5f5e5e]">
                        arrow_forward
                      </span>
                      <span className="text-base font-bold text-[#6a5f00]">D08 (배정 완료)</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#cdc7aa]/40 w-full" />

                {/* Change Item 2 */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#eeeeef] rounded-full w-9 h-9 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#4b4732]">schedule</span>
                  </div>

                  <div className="flex-1 pt-0.5">
                    <p className="text-xs text-[#5f5e5e] mb-0.5">도착 예정 시간 (ETA)</p>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-[#1a1c1d]">15:10</span>
                      <span className="bg-[#84fbab] text-[#00743e] px-2 py-0.5 rounded text-[10px] font-bold">
                        업데이트 완료
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onConfirmDockUpdate();
                  onClose();
                }}
                className="w-full bg-[#fee500] text-[#1a1c1d] text-base font-bold h-[52px] rounded-xl flex items-center justify-center hover:bg-[#fee500]/90 transition-colors shadow-md mt-2"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
