import React, { useState } from 'react';
import { FreightItem } from '../types';
import { HOTLINK_IMAGES } from '../data/mockData';
import { classifyVoiceReport } from '../utils/voiceClassifier';

interface VoiceReportModalProps {
  activeFreight: FreightItem;
  onClose: () => void;
  onSubmitReport: (voiceText: string, category: string, impact: string) => void;
}

const PRESET_PHRASES = [
  {
    id: 'rockfall',
    label: '🪨 낙석 제보',
    text: '앞에 산에서 돌이 떨어져서 2개 차로가 막혀 있어요.',
  },
  {
    id: 'traffic',
    label: '🚗 추돌/정체 제보',
    text: '터널 지나고 터널 입구 부근에 3중 추돌 사고가 나서 차가 심하게 밀립니다.',
  },
  {
    id: 'flood',
    label: '🌧️ 호우/침수 제보',
    text: '갑자기 집중호우로 도로 하부 구간에 물이 차서 서행 중입니다.',
  },
];

export const VoiceReportModal: React.FC<VoiceReportModalProps> = ({
  activeFreight,
  onClose,
  onSubmitReport,
}) => {
  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState(1);
  const [voiceText, setVoiceText] = useState(PRESET_PHRASES[1].text);
  const [isEditing, setIsEditing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Live NLP Classification using our smart classifier
  const classification = classifyVoiceReport(voiceText);

  const handleSelectPreset = (idx: number) => {
    setSelectedPhraseIndex(idx);
    setVoiceText(PRESET_PHRASES[idx].text);
    setIsEditing(false);
  };

  const handleSimulateVoiceRecording = () => {
    setIsRecording(true);
    const nextIdx = (selectedPhraseIndex + 1) % PRESET_PHRASES.length;
    setTimeout(() => {
      setSelectedPhraseIndex(nextIdx);
      setVoiceText(PRESET_PHRASES[nextIdx].text);
      setIsRecording(false);
    }, 1200);
  };

  const handleSubmit = () => {
    onSubmitReport(
      voiceText,
      classification.category,
      classification.impact
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 md:p-4 overflow-y-auto animate-fade-in font-sans">
      <div className="bg-[#f9f9fa] w-full max-w-xl rounded-t-2xl md:rounded-2xl border border-[#cdc7aa] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <header className="bg-white border-b border-[#cdc7aa] h-[60px] flex items-center justify-between px-4 sticky top-0 z-10">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eeeeef] text-[#1a1c1d] transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <h1 className="text-base font-bold text-[#1a1c1d] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#6a5f00]" style={{ fontVariationSettings: "'FILL' 1" }}>
              graphic_eq
            </span>
            <span>AI 현장 음성 제보</span>
          </h1>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eeeeef] text-[#1a1c1d] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Active Freight Context Badge */}
          <div className="flex items-center justify-between bg-[#e8e8e9] px-3.5 py-2 rounded-xl border border-[#cdc7aa]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4b4732]">
              <span className="material-symbols-outlined text-[#6a5f00] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_shipping
              </span>
              <span>운송 화물: {activeFreight.code} [{activeFreight.vehicleType}]</span>
            </div>
            <span className="text-[11px] font-bold text-[#006d3a] bg-[#84fbab]/40 px-2 py-0.5 rounded">
              GPS 실시간 연결
            </span>
          </div>



          {/* Voice Input Box */}
          <section className="space-y-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h2 className="text-sm font-bold text-[#1a1c1d] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#6a5f00]">record_voice_over</span>
                <span>인식된 음성 텍스트</span>
              </h2>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {PRESET_PHRASES.map((phrase, idx) => (
                  <button
                    key={phrase.id}
                    type="button"
                    onClick={() => handleSelectPreset(idx)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-bold transition-all whitespace-nowrap ${
                      selectedPhraseIndex === idx
                        ? 'bg-[#fee500] text-[#1a1c1d] border-[#6a5f00]'
                        : 'bg-white text-[#5f5e5e] border-[#cdc7aa] hover:bg-[#eeeeef]'
                    }`}
                  >
                    {phrase.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recognized Text Display Box */}
            <div className="bg-white border border-[#cdc7aa] rounded-xl p-4 shadow-xs relative overflow-hidden">
              {isRecording ? (
                <div className="flex items-center justify-center py-4 gap-3 text-[#6a5f00]">
                  <span className="w-3 h-3 bg-red-600 rounded-full animate-ping" />
                  <span className="text-sm font-bold">마이크로 말씀하신 내용을 분석하고 있습니다...</span>
                </div>
              ) : isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={voiceText}
                    onChange={(e) => setVoiceText(e.target.value)}
                    rows={3}
                    className="w-full text-sm text-[#1a1c1d] border border-[#cdc7aa] rounded-lg p-2.5 focus:outline-none focus:ring-2 ring-[#6a5f00]"
                  />
                  <p className="text-[11px] text-[#5f5e5e]">
                    * 텍스트에 &apos;낙석/돌&apos;, &apos;추돌/사고/정체&apos;, &apos;비/물/호우/침수&apos; 단어가 포함되면 AI가 자동 분류합니다.
                  </p>
                </div>
              ) : (
                <p className="text-base text-[#1a1c1d] leading-relaxed font-semibold">
                  &quot;{voiceText}&quot;
                </p>
              )}
            </div>
          </section>

          {/* AI Live Analysis Classification Box */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-[#5f5e5e] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#006d3a]">psychology</span>
              <span>AI 음성 실시간 데이터 분류 결과</span>
            </h3>

            {/* AI Result Cards Grid */}
            <div className={`bg-gradient-to-br ${classification.bgGradient} border ${classification.borderColor} rounded-2xl p-4 shadow-xs space-y-3`}>
              <div className="flex items-center justify-between pb-2 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px] text-red-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {classification.icon}
                    </span>
                  </div>

                  <div>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${classification.badgeBg} ${classification.badgeTextColor}`}>
                      {classification.badgeText}
                    </span>
                    <h4 className="text-base font-bold text-[#1a1c1d] mt-0.5">{classification.category}</h4>
                  </div>
                </div>

                <span className="material-symbols-outlined text-[#006d3a] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-black/5">
                  <span className="text-[#5f5e5e] block mb-0.5">영향 및 상태</span>
                  <span className="font-bold text-[#1a1c1d]">{classification.impact}</span>
                </div>

                <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-black/5">
                  <span className="text-[#5f5e5e] block mb-0.5">GPS 제보 위치</span>
                  <span className="font-bold text-[#1a1c1d]">경부고속도로 하행 382km</span>
                </div>
              </div>

              {/* Recommended Route Advice */}
              <div className="bg-white/90 p-2.5 rounded-xl border border-black/5 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[#6a5f00] text-sm">alt_route</span>
                <span className="font-semibold text-[#1a1c1d]">{classification.recommendedRouteAdvice}</span>
              </div>
            </div>

            {/* Map Preview */}
            <div className="rounded-xl border border-[#cdc7aa] overflow-hidden h-32 relative">
              <img
                src={HOTLINK_IMAGES.mapVoicePreview}
                alt="Voice Report Map Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1d]/80 via-transparent to-transparent flex items-end justify-between p-3">
                <span className="bg-white text-[#1a1c1d] text-[11px] font-bold px-3 py-1 rounded-full border border-[#cdc7aa] shadow-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-red-600">pin_drop</span> 제보 지점 핀 설정됨
                </span>

                <span className="text-[10px] text-white/90 font-medium">14:04 생성</span>
              </div>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-white border-t border-[#cdc7aa] sticky bottom-0 z-20">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 h-[48px] bg-white border border-[#cdc7aa] text-[#1a1c1d] text-xs font-bold rounded-xl flex items-center justify-center gap-1 hover:bg-[#eeeeef] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              {isEditing ? '수정 완료' : '직접 수정'}
            </button>

            <button
              type="button"
              onClick={handleSimulateVoiceRecording}
              disabled={isRecording}
              className="flex-1 h-[48px] bg-[#fee500]/20 border border-[#6a5f00]/40 text-[#1a1c1d] text-xs font-bold rounded-xl flex items-center justify-center gap-1 hover:bg-[#fee500]/40 transition-all active:scale-98 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-sm ${isRecording ? 'animate-spin' : 'animate-pulse text-red-600'}`}>
                mic
              </span>
              <span>{isRecording ? '분석 중...' : '다시 말하기'}</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="flex-[2] h-[48px] bg-[#fee500] text-[#1a1c1d] text-sm font-extrabold rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#fee500]/90 transition-all shadow-md active:scale-98"
            >
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                send
              </span>
              <span>관제센터에 제보 공유</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
