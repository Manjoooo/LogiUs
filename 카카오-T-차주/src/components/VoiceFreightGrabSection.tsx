import React, { useState, useEffect } from 'react';
import { FreightItem } from '../types';

interface VoiceFreightGrabSectionProps {
  freights: FreightItem[];
  onSelectFreightDetail: (freight: FreightItem) => void;
  onAcceptDispatch: (freight: FreightItem) => void;
  onCloseVoiceMode?: () => void;
}

export const VoiceFreightGrabSection: React.FC<VoiceFreightGrabSectionProps> = ({
  freights,
  onSelectFreightDetail,
  onAcceptDispatch,
  onCloseVoiceMode,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [analyzedQuery, setAnalyzedQuery] = useState<{
    destination?: string;
    vehicleType?: string;
    maxDistance?: number;
    code?: string;
    minPrice?: number;
    sortByHighestPrice?: boolean;
  } | null>(null);

  const [matchedFreight, setMatchedFreight] = useState<FreightItem | null>(null);
  const [autoAcceptCountdown, setAutoAcceptCountdown] = useState<number | null>(null);

  // Preset voice prompt scenarios
  const PRESET_VOICE_COMMANDS = [
    { label: '🎙️ "용인 가는 5톤 화물 잡아줘"', text: '용인 가는 5톤 화물 잡아줘' },
    { label: '🎙️ "천안행 11톤 20만원 이상 배차해줘"', text: '천안행 11톤 20만원 이상 배차해줘' },
    { label: '🎙️ "가장 높은 운임 화물 잡아줘"', text: '가장 높은 운임 화물 잡아줘' },
    { label: '🎙️ "50km 이내 신뢰 화물 선택해줘"', text: '50km 이내 신뢰 화물 선택해줘' },
    { label: '🎙️ "KA-1025 화물 배차 수락!"', text: 'KA-1025 화물 배차 수락' },
  ];

  // Process voice input text and match freight
  const processVoiceText = (text: string) => {
    setTranscription(text);
    setIsListening(false);

    // Analyze intent
    const query: typeof analyzedQuery = {};

    if (text.includes('용인')) query.destination = '용인';
    if (text.includes('천안')) query.destination = '천안';
    if (text.includes('안산')) query.destination = '안산';
    if (text.includes('광주')) query.destination = '광주';
    if (text.includes('마포') || text.includes('서울')) query.destination = '서울';

    if (text.includes('5톤')) query.vehicleType = '5톤';
    if (text.includes('11톤')) query.vehicleType = '11톤';
    if (text.includes('3.5톤')) query.vehicleType = '3.5톤';
    if (text.includes('25톤')) query.vehicleType = '25톤';
    if (text.includes('1톤')) query.vehicleType = '1톤';

    if (text.includes('20만원')) query.minPrice = 200000;
    if (text.includes('높은 운임') || text.includes('비싼')) query.sortByHighestPrice = true;
    if (text.includes('50km') || text.includes('근거리')) query.maxDistance = 50;

    // Match order code
    const codeMatch = text.match(/KA-\d{4}/i);
    if (codeMatch) {
      query.code = codeMatch[0].toUpperCase();
    }

    setAnalyzedQuery(query);

    // Find best matching freight item from freights
    let candidate = freights.find((f) => {
      if (query.code && f.code.toUpperCase() === query.code) return true;
      let score = 0;
      if (query.destination && f.destination.includes(query.destination)) score += 3;
      if (query.vehicleType && f.vehicleType.includes(query.vehicleType)) score += 2;
      if (query.minPrice && f.price >= query.minPrice) score += 2;
      if (query.maxDistance && f.distanceKm <= query.maxDistance) score += 1;
      return score > 0;
    });

    if (!candidate && query.sortByHighestPrice) {
      candidate = [...freights].sort((a, b) => b.price - a.price)[0];
    }

    // Default to first freight if no strict match
    if (!candidate) {
      candidate = freights[0];
    }

    setMatchedFreight(candidate);
    setAutoAcceptCountdown(5);
  };

  // Simulate microphone button click
  const handleStartListening = () => {
    setIsListening(true);
    setTranscription('');
    setMatchedFreight(null);
    setAnalyzedQuery(null);
    setAutoAcceptCountdown(null);

    // Auto finish listening after 2.5 seconds simulation
    setTimeout(() => {
      processVoiceText('용인 가는 5톤 카고 신뢰 화물 잡아줘');
    }, 2500);
  };

  // Countdown timer effect
  useEffect(() => {
    if (autoAcceptCountdown === null || autoAcceptCountdown <= 0) return;

    const timer = setInterval(() => {
      setAutoAcceptCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoAcceptCountdown]);

  return (
    <div className="bg-[#1a1c1d] text-white rounded-3xl p-5 md:p-7 shadow-xl border border-gray-800 mb-8 relative overflow-hidden transition-all">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#fee500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#fee500] text-[#1a1c1d] flex items-center justify-center font-black shadow-md">
            <span className="material-symbols-outlined text-[24px]">mic</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-black text-white">AI 음성 배차 수락관</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#fee500]/20 text-[#fee500] text-[10px] font-extrabold border border-[#fee500]/30">
                실시간 음성인식
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">운전 중 터치 없이 말 한마디로 최적 화물을 선점하세요.</p>
          </div>
        </div>

        {onCloseVoiceMode && (
          <button
            onClick={onCloseVoiceMode}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        )}
      </div>

      {/* Voice Recognition Interactive Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left Side: Voice Mic & Prompt Buttons (5 cols) */}
        <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-5">
          {/* Pulsating Mic Button */}
          <div className="flex flex-col items-center justify-center py-4">
            <button
              onClick={handleStartListening}
              disabled={isListening}
              className={`relative group w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isListening
                  ? 'bg-red-500 ring-8 ring-red-500/30 scale-105'
                  : 'bg-[#fee500] text-[#1a1c1d] hover:bg-[#fee500]/90 ring-4 ring-[#fee500]/20 active:scale-95 shadow-xl'
              }`}
            >
              {isListening && (
                <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping" />
              )}
              <span className={`material-symbols-outlined text-[42px] ${isListening ? 'text-white animate-pulse' : 'text-[#1a1c1d]'}`}>
                {isListening ? 'graphic_eq' : 'mic'}
              </span>
            </button>

            <p className="text-sm font-bold text-gray-200 mt-3 text-center">
              {isListening ? (
                <span className="text-red-400 animate-pulse flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  음성 분석 중입니다...
                </span>
              ) : (
                '버튼을 누르고 말하거나 아래 문장을 클릭하세요'
              )}
            </p>
          </div>

          {/* Preset Commands */}
          <div>
            <label className="text-[11px] font-bold text-gray-400 block mb-2">
              💡 음성 명령 클릭 테스트:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_VOICE_COMMANDS.map((cmd, i) => (
                <button
                  key={i}
                  onClick={() => processVoiceText(cmd.text)}
                  className="text-xs bg-white/10 hover:bg-[#fee500] hover:text-[#1a1c1d] text-gray-300 px-3 py-1.5 rounded-xl border border-white/10 transition-all font-medium active:scale-95 text-left truncate max-w-full"
                >
                  {cmd.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Recognized Voice Result & Matched Freight (7 cols) */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4">
          {/* Voice Input Log */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#fee500]">graphic_eq</span>
                인식된 음성 명령
              </span>
              {transcription && (
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  AI 인텐트 분석 완료
                </span>
              )}
            </div>

            <div className="bg-black/50 rounded-xl p-3 text-sm text-gray-100 min-h-[48px] flex items-center border border-white/10 font-semibold">
              {transcription ? (
                <span className="text-[#fee500]">"{transcription}"</span>
              ) : (
                <span className="text-gray-500 italic">"인천에서 용인 가는 5톤 화물 잡아줘..."</span>
              )}
            </div>

            {/* Analyzed Tag Badges */}
            {analyzedQuery && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {analyzedQuery.destination && (
                  <span className="text-[11px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-md font-bold">
                    ✓ 하차지: {analyzedQuery.destination}
                  </span>
                )}
                {analyzedQuery.vehicleType && (
                  <span className="text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md font-bold">
                    ✓ 차량: {analyzedQuery.vehicleType}
                  </span>
                )}
                {analyzedQuery.code && (
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md font-bold">
                    ✓ 화물코드: {analyzedQuery.code}
                  </span>
                )}
                {analyzedQuery.sortByHighestPrice && (
                  <span className="text-[11px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-md font-bold">
                    ✓ 높은 운임 매칭
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Matched Freight Display Card */}
          {matchedFreight ? (
            <div className="bg-white text-[#1a1c1d] rounded-2xl p-4 border-2 border-[#fee500] shadow-2xl relative animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-[#fee500] text-[#1a1c1d] text-[11px] font-black px-2.5 py-0.5 rounded-md">
                  BEST AI 매칭 화물
                </span>
                <span className="text-xl font-extrabold text-[#6a5f00]">
                  {matchedFreight.price.toLocaleString()}원
                </span>
              </div>

              <div className="flex items-center justify-between mb-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <div className="font-bold text-sm">{matchedFreight.origin}</div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>→</span>
                  <span className="font-bold text-[#6a5f00]">{matchedFreight.distanceKm}km</span>
                  <span>→</span>
                </div>
                <div className="font-bold text-sm text-[#006d3a]">{matchedFreight.destination}</div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <span>화물코드: <strong>{matchedFreight.code}</strong></span>
                <span>차종: <strong>{matchedFreight.vehicleType}</strong></span>
                <span>등급: <strong>{matchedFreight.trustLevel}</strong></span>
              </div>

              {/* Action Confirm Button */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => onSelectFreightDetail(matchedFreight)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors"
                >
                  상세보기
                </button>

                <button
                  type="button"
                  onClick={() => onAcceptDispatch(matchedFreight)}
                  className="flex-1 py-2.5 bg-[#fee500] hover:bg-[#fee500]/90 text-[#1a1c1d] rounded-xl text-sm font-extrabold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98"
                >
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span>
                    {autoAcceptCountdown && autoAcceptCountdown > 0
                      ? `⚡ 음성 배차 수락 확정 (${autoAcceptCountdown}초 후)`
                      : '⚡ 음성 배차 수락 확정'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10 text-center flex flex-col items-center justify-center gap-2 text-gray-400">
              <span className="material-symbols-outlined text-3xl text-[#fee500]/60">graphic_eq</span>
              <p className="text-xs font-medium">마이크 버튼을 누르거나 예시 문장을 클릭하면<br />AI가 최적 화물을 찾아서 즉시 배차 수락합니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
