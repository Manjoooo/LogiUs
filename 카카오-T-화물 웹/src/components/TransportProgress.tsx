import React from 'react';
import { TransportStep } from '../types';

interface TransportProgressProps {
  steps: TransportStep[];
  onAdvanceStep?: () => void;
}

export const TransportProgress: React.FC<TransportProgressProps> = ({
  steps,
  onAdvanceStep,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#e8e8ea] shadow-xs p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[17px] font-bold text-[#1a1c1d] tracking-tight">운송 진행률</h3>
        {onAdvanceStep && (
          <button
            onClick={onAdvanceStep}
            className="text-[11px] font-medium text-[#5f5e5e] hover:text-[#1a1c1d] hover:bg-[#f3f3f4] px-2 py-1 rounded-md transition-colors"
            title="단계 시뮬레이션"
          >
            + 단계 진척
          </button>
        )}
      </div>

      <div className="relative pl-6 space-y-7 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#e8e8ea]">
        {steps.map((step) => {
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';

          return (
            <div key={step.id} className="relative flex items-start gap-4 group">
              {/* Timeline Indicator Node */}
              {isCompleted ? (
                <div className="absolute -left-[23px] top-0.5 w-6 h-6 rounded-full border-2 border-white bg-[#25A55F] text-white shadow-xs flex items-center justify-center shrink-0 z-10">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
              ) : isActive ? (
                <div className="absolute -left-[23px] top-0.5 w-6 h-6 rounded-full border-2 border-white bg-[#fee500] text-[#1a1c1d] shadow-xs flex items-center justify-center shrink-0 z-10 ring-4 ring-[#fee500]/30">
                  <div className="w-2 h-2 rounded-full bg-[#1a1c1d]" />
                </div>
              ) : (
                <div className="absolute -left-[23px] top-0.5 w-6 h-6 rounded-full border-2 border-white bg-[#e8e8ea] text-[#7c775f] shadow-2xs flex items-center justify-center shrink-0 z-10" />
              )}

              {/* Step Content */}
              <div className={`flex-1 ${!isCompleted && !isActive ? 'opacity-50' : ''}`}>
                <div className="flex flex-col">
                  {step.time && (
                    <time className="text-[12px] text-[#5f5e5e] font-medium leading-none mb-1">
                      {step.time}
                    </time>
                  )}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[14px] ${
                        isActive ? 'font-bold text-[#1a1c1d]' : 'font-semibold text-[#1a1c1d]'
                      }`}
                    >
                      {step.title}
                    </span>
                    {step.badgeText && (
                      <span className="text-[11px] font-bold text-[#f04452] bg-[#f04452]/10 px-2 py-0.5 rounded-full">
                        {step.badgeText}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
