import React, { useState } from 'react';
import { DockingBay } from '../types';
import { 
  ShieldCheck, 
  Truck, 
  QrCode, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Scale, 
  Lock, 
  Disc,
  RefreshCw
} from 'lucide-react';

interface TCheckDockingControlProps {
  bays: DockingBay[];
  onVerifyBay: (bayNo: string, weightOk: boolean, sealOk: boolean, tireOk: boolean) => void;
}

export const TCheckDockingControl: React.FC<TCheckDockingControlProps> = ({ bays, onVerifyBay }) => {
  const [selectedBay, setSelectedBay] = useState<DockingBay>(bays[0]);

  // Checklist state
  const [weightOk, setWeightOk] = useState<boolean>(true);
  const [sealOk, setSealOk] = useState<boolean>(true);
  const [tireOk, setTireOk] = useState<boolean>(true);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState<boolean>(false);

  const handleBayClick = (bay: DockingBay) => {
    setSelectedBay(bay);
    setWeightOk(bay.weightOk);
    setSealOk(bay.sealOk);
    setTireOk(bay.tireOk);
    setVerifiedSuccess(false);
  };

  const handleVerify = () => {
    onVerifyBay(selectedBay.bayNo, weightOk, sealOk, tireOk);
    setVerifiedSuccess(true);
    setTimeout(() => {
      setVerifiedSuccess(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#FEE500] text-black text-xs font-extrabold px-2 py-0.5 rounded">T-CHECK</span>
            <h2 className="text-lg font-bold text-gray-900">물류 센터 스마트 도킹 & 차량 사전 점검</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            입고 도킹 차량 계근 중량, 봉인 상태, 타이어 마모도 및 결적 안전수칙을 자동 점검합니다.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="bg-black hover:bg-gray-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition shadow"
          >
            <QrCode className="w-4 h-4 text-[#FEE500]" />
            <span>기사 앱 T-Check QR 스캔</span>
          </button>
        </div>
      </div>

      {/* Docking Bays Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {bays.map(bay => {
          const isSelected = selectedBay.bayNo === bay.bayNo;
          const isOccupied = bay.status !== 'VACANT';

          return (
            <div
              key={bay.bayNo}
              onClick={() => handleBayClick(bay)}
              className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#191919] text-white border-black ring-2 ring-[#FEE500] shadow-md'
                  : isOccupied
                  ? 'bg-white text-gray-900 border-gray-200 hover:border-gray-400'
                  : 'bg-gray-50 text-gray-400 border-dashed border-gray-300 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-black text-sm ${isSelected ? 'text-[#FEE500]' : 'text-gray-900'}`}>
                  {bay.bayNo}
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${
                  bay.status === 'VACANT' ? 'bg-gray-300' :
                  bay.status === 'DOCKING' ? 'bg-yellow-400 animate-ping' :
                  bay.status === 'INSPECTION' ? 'bg-blue-500' :
                  'bg-emerald-500'
                }`}></span>
              </div>

              <div className="my-3 text-left space-y-0.5">
                <div className={`font-bold text-xs truncate ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                  {bay.truckPlate !== 'EMPTY' ? bay.truckPlate : '공석 (Vacant)'}
                </div>
                <div className={`text-[11px] truncate ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>
                  {bay.driver !== '-' ? bay.driver + ' 기사님' : '차량 대기중'}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-700/30 flex items-center justify-between text-[10px]">
                <span className={isSelected ? 'text-gray-400' : 'text-gray-500'}>{bay.status}</span>
                <span className={`font-extrabold ${isSelected ? 'text-[#FEE500]' : 'text-emerald-600'}`}>
                  {bay.progress}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Bay Detail & Interactive Inspection Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Truck Diagram & 2.5D Inspection Model (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
          
          <div className="flex items-center justify-between border-b pb-3 border-gray-100">
            <div>
              <span className="text-xs font-bold text-yellow-600">{selectedBay.zone}</span>
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                {selectedBay.bayNo} 입고 점검 트랙
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">차량번호</span>
              <div className="font-black text-sm text-gray-900">{selectedBay.truckPlate}</div>
            </div>
          </div>

          {/* 2.5D Isometric Truck Diagram Graphic */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center justify-center relative min-h-[280px]">
            
            {/* Truck Graphic Shell */}
            <div className="relative w-full max-w-md bg-white p-4 rounded-2xl border-2 border-gray-800 shadow-lg flex flex-col items-center space-y-3">
              
              <div className="w-full flex items-center justify-between px-2">
                <span className="bg-yellow-400 text-black text-[10px] font-extrabold px-2 py-0.5 rounded">
                  5톤 윙바디 카고
                </span>
                <span className="text-xs font-mono font-bold text-gray-700">T-CHECK-SAFE-ID: #8921</span>
              </div>

              {/* Truck Visual SVG */}
              <div className="w-full py-2 flex items-center justify-center">
                <svg className="w-64 h-28 text-gray-800" viewBox="0 0 200 80" fill="currentColor">
                  {/* Cabin */}
                  <path d="M 140 20 L 170 20 L 190 45 L 190 65 L 140 65 Z" fill="#191919" />
                  <path d="M 150 25 L 168 25 L 180 42 L 150 42 Z" fill="#FEE500" />
                  {/* Container Cargo Body */}
                  <rect x="10" y="10" width="125" height="55" rx="4" fill="#e5e7eb" stroke="#191919" strokeWidth="2" />
                  <line x1="10" y1="38" x2="135" y2="38" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3,3" />
                  <text x="35" y="32" fontSize="10" fontWeight="bold" fill="#374151">T-CHECK LOGISTICS</text>
                  {/* Wheels */}
                  <circle cx="35" cy="65" r="10" fill="#111827" stroke="#FEE500" strokeWidth="2" />
                  <circle cx="70" cy="65" r="10" fill="#111827" stroke="#FEE500" strokeWidth="2" />
                  <circle cx="165" cy="65" r="10" fill="#111827" fillOpacity="0.9" stroke="#FEE500" strokeWidth="2" />
                </svg>
              </div>

              {/* Sensor Nodes */}
              <div className="w-full grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className={`p-2 rounded-xl border font-bold ${weightOk ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  중량 센서: {weightOk ? '정상 (통과)' : '초과 경고'}
                </div>
                <div className={`p-2 rounded-xl border font-bold ${sealOk ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  컨테이너 봉인: {sealOk ? '일치' : '파손 미일치'}
                </div>
                <div className={`p-2 rounded-xl border font-bold ${tireOk ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  타이어 마모: {tireOk ? '안전 (82%)' : '교체 요망'}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Inspection Checklist Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
          
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b pb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              현장 담당자 필수 점검 항목
            </h3>

            {/* Checklist items */}
            <div className="space-y-3">
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-gray-700" />
                  <div>
                    <div className="text-xs font-bold text-gray-900">적재 중량 계근 점검</div>
                    <p className="text-[10px] text-gray-500">허용 과적 제한 기준 준수 여부</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={weightOk}
                  onChange={e => setWeightOk(e.target.checked)}
                  className="w-5 h-5 accent-black rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-gray-700" />
                  <div>
                    <div className="text-xs font-bold text-gray-900">화물 봉인 (Seal) 번호 검수</div>
                    <p className="text-[10px] text-gray-500">전송된 바코드/RFID 봉인 일치</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={sealOk}
                  onChange={e => setSealOk(e.target.checked)}
                  className="w-5 h-5 accent-black rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Disc className="w-4 h-4 text-gray-700" />
                  <div>
                    <div className="text-xs font-bold text-gray-900">차량 트레드/타이어 안전 점검</div>
                    <p className="text-[10px] text-gray-500">장거리 운송 전 타이어 공기압 체크</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={tireOk}
                  onChange={e => setTireOk(e.target.checked)}
                  className="w-5 h-5 accent-black rounded cursor-pointer"
                />
              </div>

            </div>

            {verifiedSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                T-Check 도킹 승인 및 데이터베이스에 기록되었습니다!
              </div>
            )}
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-[#FEE500] hover:bg-yellow-400 text-black text-sm font-extrabold py-3.5 rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>T-Check 도킹 점검 완료 승인</span>
          </button>

        </div>

      </div>

      {/* QR Modal Simulation */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-gray-900">T-Check 기사 모바일 QR 스캔</h3>
            <p className="text-xs text-gray-500">기사 모바일 앱에서 제시하는 QR 코드를 스캐너에 비춰주세요.</p>
            
            <div className="w-48 h-48 mx-auto bg-gray-900 rounded-2xl p-4 flex items-center justify-center border-4 border-[#FEE500]">
              <QrCode className="w-36 h-36 text-white" />
            </div>

            <p className="text-[11px] font-mono text-gray-600">QR-CODE: #KAKAO-T-CHECK-2026-0813</p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full bg-black text-white text-xs font-bold py-2.5 rounded-xl hover:bg-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
