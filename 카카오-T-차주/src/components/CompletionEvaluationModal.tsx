import React, { useState } from 'react';
import { FreightItem } from '../types';

interface CompletionEvaluationModalProps {
  activeFreight: FreightItem;
  onClose: () => void;
  onFinishEvaluation: () => void;
}

export const CompletionEvaluationModal: React.FC<CompletionEvaluationModalProps> = ({
  activeFreight,
  onClose,
  onFinishEvaluation,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const REASON_OPTIONS = [
    '거리/경로',
    '상차장소',
    '하차장소',
    '화물 크기/중량',
    '상/하차 시간',
    '기타',
  ];

  const toggleReason = (reason: string) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter((r) => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#f9f9fa] w-full max-w-md rounded-2xl border border-[#cdc7aa] shadow-2xl overflow-hidden flex flex-col relative max-h-[90vh]">
        {/* Top Header */}
        <header className="flex justify-between items-center px-4 h-[56px] bg-white border-b border-[#cdc7aa]">
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#eeeeef] text-[#1a1c1d]"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <h2 className="text-base font-bold text-[#1a1c1d]">운행 완료 평가</h2>

          <div className="w-9" />
        </header>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Order Header */}
          <div className="text-center">
            <div className="inline-block bg-[#eeeeef] px-4 py-1.5 rounded-full mb-3 border border-[#cdc7aa]">
              <span className="text-xs text-[#5f5e5e]">주문번호</span>
              <span className="text-sm font-bold text-[#1a1c1d] ml-2">{activeFreight.code}</span>
            </div>

            <h3 className="text-2xl font-bold text-[#1a1c1d] mb-1">수고하셨습니다!</h3>
            <p className="text-xs text-[#5f5e5e]">
              더 나은 배차 환경을 위해 이번 운행에 대한 의견을 남겨주세요.
            </p>
          </div>

          {/* STEP 1: Initial Question */}
          {step === 1 && (
            <section className="bg-white rounded-2xl border border-[#cdc7aa] p-5 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-[#1a1c1d] text-center">
                등록된 화물 정보와 실제가 일치했나요?
              </h4>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full h-[50px] rounded-xl border border-[#cdc7aa] bg-white flex items-center justify-center text-sm font-bold text-[#1a1c1d] hover:bg-[#eeeeef] transition-colors active:scale-98"
                >
                  정확했어요
                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full h-[50px] rounded-xl border border-[#cdc7aa] bg-white flex items-center justify-center text-sm font-bold text-[#1a1c1d] hover:bg-[#eeeeef] transition-colors active:scale-98"
                >
                  일부 달랐어요
                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full h-[50px] rounded-xl border border-[#cdc7aa] bg-white flex items-center justify-center text-sm font-bold text-[#1a1c1d] hover:bg-[#eeeeef] transition-colors active:scale-98"
                >
                  많이 달랐어요
                </button>
              </div>
            </section>
          )}

          {/* STEP 2: Detailed Reasons */}
          {step === 2 && (
            <section className="bg-white rounded-2xl border border-[#cdc7aa] p-5 shadow-xs space-y-4">
              <div className="text-center">
                <h4 className="text-sm font-bold text-[#1a1c1d]">어떤 정보가 달랐나요?</h4>
                <p className="text-xs text-[#5f5e5e] mt-0.5">(다중 선택 가능)</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {REASON_OPTIONS.map((reason) => {
                  const isSelected = selectedReasons.includes(reason);
                  return (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => toggleReason(reason)}
                      className={`h-[48px] rounded-xl border text-xs font-semibold flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-[#6a5f00] bg-[#fee500]/20 text-[#6a5f00] font-bold'
                          : 'border-[#cdc7aa] bg-white text-[#1a1c1d] hover:bg-[#eeeeef]'
                      }`}
                    >
                      {reason}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={selectedReasons.length === 0}
                onClick={() => setStep(3)}
                className="w-full h-[50px] rounded-xl bg-[#fee500] text-[#1a1c1d] text-sm font-bold mt-2 disabled:opacity-50 hover:bg-[#fee500]/90 transition-colors shadow-xs"
              >
                평가 제출하기
              </button>
            </section>
          )}

          {/* STEP 3: Confirmation Dialog */}
          {step === 3 && (
            <section className="flex flex-col items-center justify-center py-6 text-center space-y-4">
              <div className="w-20 h-20 bg-[#84fbab] rounded-full flex items-center justify-center shadow-md">
                <span
                  className="material-symbols-outlined text-[44px] text-[#00743e]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>

              <h4 className="text-xl font-bold text-[#1a1c1d]">평가가 반영됐어요</h4>

              <p className="text-xs text-[#5f5e5e]">
                기사님의 소중한 의견 감사합니다.
                <br />
                더 나은 화물 네트워크를 만들겠습니다.
              </p>

              <button
                type="button"
                onClick={onFinishEvaluation}
                className="mt-4 w-full h-[50px] rounded-xl bg-[#fee500] text-[#1a1c1d] text-sm font-bold hover:bg-[#fee500]/90 transition-colors shadow-md"
              >
                홈으로 돌아가기
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
