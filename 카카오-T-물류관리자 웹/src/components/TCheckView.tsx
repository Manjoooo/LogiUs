import React, { useState } from 'react';

export interface TCheckVehicle {
  id: string;
  driver: string;
  truckType: string;
  status: 'PASSED' | 'INSPECTION' | 'FAILED';
  weight: string;
  weightStatus: 'NORMAL' | 'OVERWEIGHT' | 'SCANNING';
  sealNo: string;
  sealStatus: 'MATCH' | 'DAMAGED' | 'CHECKING';
  tireStatus: string;
  time: string;
  failReason?: string;
  isBlocked?: boolean;
  dockNo?: string;
}

export const TCheckView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'PASSED' | 'INSPECTION' | 'FAILED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCertVehicle, setSelectedCertVehicle] = useState<TCheckVehicle | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial 18 Vehicles Data
  const [vehicles, setVehicles] = useState<TCheckVehicle[]>([
    {
      id: 'KA-1025',
      driver: '김철수',
      truckType: '5톤 카고',
      status: 'PASSED',
      weight: '4.8톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-9912',
      sealStatus: 'MATCH',
      tireStatus: '마모도 85% (양호)',
      time: '13:42 완료',
      dockNo: 'D01',
    },
    {
      id: 'KA-1039',
      driver: '최영철',
      truckType: '11톤 윙바디',
      status: 'FAILED',
      weight: '12.4톤 (+1.4톤 과적)',
      weightStatus: 'OVERWEIGHT',
      sealNo: 'SL-8802',
      sealStatus: 'MATCH',
      tireStatus: '공기압 주의 (2.1 bar)',
      time: '14:08 경고',
      failReason: '계근 규정 중량 1.4톤 초과 과적 감지',
      isBlocked: true,
      dockNo: '대기구역 2',
    },
    {
      id: 'KA-5829',
      driver: '이진우',
      truckType: '25톤 트레일러',
      status: 'FAILED',
      weight: '24.1톤 (정상)',
      weightStatus: 'NORMAL',
      sealNo: 'SL-7731 (개봉 훼손)',
      sealStatus: 'DAMAGED',
      tireStatus: 'Tread 92% (양호)',
      time: '14:15 경고',
      failReason: '봉인(Seal) AI 비전 훼손 및 미승인 개봉 감지',
      isBlocked: true,
      dockNo: '검수 게이트 B',
    },
    {
      id: 'KA-3301',
      driver: '박동진',
      truckType: '11톤 윙바디',
      status: 'INSPECTION',
      weight: '비전 스캔중...',
      weightStatus: 'SCANNING',
      sealNo: 'SL-1092',
      sealStatus: 'CHECKING',
      tireStatus: 'AI 마모도 분석중 (82%)',
      time: '14:22 진행',
      dockNo: 'T-Check Gate #1',
    },
    {
      id: 'KA-7741',
      driver: '정재훈',
      truckType: '5톤 탑차',
      status: 'INSPECTION',
      weight: '5.1톤 (계근중)',
      weightStatus: 'SCANNING',
      sealNo: 'SL-4402',
      sealStatus: 'CHECKING',
      tireStatus: '하부 센서 측정 대기',
      time: '14:25 진행',
      dockNo: 'T-Check Gate #2',
    },
    {
      id: 'KA-9102',
      driver: '강성호',
      truckType: '18톤 카고',
      status: 'INSPECTION',
      weight: '진입 센서 감지',
      weightStatus: 'SCANNING',
      sealNo: '바코드 태그 인식중',
      sealStatus: 'CHECKING',
      tireStatus: '측정 대기',
      time: '14:28 진행',
      dockNo: 'T-Check Gate #3',
    },
    {
      id: 'KA-2041',
      driver: '윤상현',
      truckType: '11톤 윙바디',
      status: 'PASSED',
      weight: '10.8톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-3319',
      sealStatus: 'MATCH',
      tireStatus: '마모도 90% (양호)',
      time: '13:50 완료',
      dockNo: 'D03',
    },
    {
      id: 'KA-8820',
      driver: '한승우',
      truckType: '25톤 냉동탑',
      status: 'PASSED',
      weight: '22.5톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-8810',
      sealStatus: 'MATCH',
      tireStatus: '마모도 88% (양호)',
      time: '13:35 완료',
      dockNo: 'D05',
    },
    {
      id: 'KA-6612',
      driver: '오민석',
      truckType: '5톤 카고',
      status: 'PASSED',
      weight: '4.9톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-6611',
      sealStatus: 'MATCH',
      tireStatus: '마모도 92% (양호)',
      time: '13:20 완료',
      dockNo: 'D02',
    },
    {
      id: 'KA-4419',
      driver: '임재범',
      truckType: '11톤 윙바디',
      status: 'PASSED',
      weight: '10.2톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-4418',
      sealStatus: 'MATCH',
      tireStatus: '마모도 81% (양호)',
      time: '13:10 완료',
      dockNo: 'D04',
    },
    {
      id: 'KA-3920',
      driver: '배동현',
      truckType: '18톤 트레일러',
      status: 'PASSED',
      weight: '17.1톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-3919',
      sealStatus: 'MATCH',
      tireStatus: '마모도 87% (양호)',
      time: '12:55 완료',
      dockNo: 'D06',
    },
    {
      id: 'KA-5501',
      driver: '송지훈',
      truckType: '5톤 탑차',
      status: 'PASSED',
      weight: '4.7톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-5500',
      sealStatus: 'MATCH',
      tireStatus: '마모도 94% (양호)',
      time: '12:40 완료',
      dockNo: 'D07',
    },
    {
      id: 'KA-7123',
      driver: '신형철',
      truckType: '11톤 윙바디',
      status: 'PASSED',
      weight: '10.9톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-7122',
      sealStatus: 'MATCH',
      tireStatus: '마모도 83% (양호)',
      time: '12:25 완료',
      dockNo: 'D08',
    },
    {
      id: 'KA-8234',
      driver: '유관우',
      truckType: '25톤 윙바디',
      status: 'PASSED',
      weight: '23.8톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-8233',
      sealStatus: 'MATCH',
      tireStatus: '마모도 89% (양호)',
      time: '12:10 완료',
      dockNo: 'D02',
    },
    {
      id: 'KA-9345',
      driver: '권태수',
      truckType: '5톤 카고',
      status: 'PASSED',
      weight: '4.6톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-9344',
      sealStatus: 'MATCH',
      tireStatus: '마모도 91% (양호)',
      time: '11:50 완료',
      dockNo: 'D01',
    },
    {
      id: 'KA-1456',
      driver: '황도현',
      truckType: '11톤 탑차',
      status: 'PASSED',
      weight: '10.1톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-1455',
      sealStatus: 'MATCH',
      tireStatus: '마모도 86% (양호)',
      time: '11:30 완료',
      dockNo: 'D03',
    },
    {
      id: 'KA-2567',
      driver: '안성재',
      truckType: '18톤 카고',
      status: 'PASSED',
      weight: '16.9톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-2566',
      sealStatus: 'MATCH',
      tireStatus: '마모도 88% (양호)',
      time: '11:15 완료',
      dockNo: 'D04',
    },
    {
      id: 'KA-3678',
      driver: '홍길동',
      truckType: '25톤 트레일러',
      status: 'PASSED',
      weight: '24.0톤',
      weightStatus: 'NORMAL',
      sealNo: 'SL-3677',
      sealStatus: 'MATCH',
      tireStatus: '마모도 90% (양호)',
      time: '11:00 완료',
      dockNo: 'D05',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Stats calculation
  const totalCount = vehicles.length;
  const passedCount = vehicles.filter((v) => v.status === 'PASSED').length;
  const inspectionCount = vehicles.filter((v) => v.status === 'INSPECTION').length;
  const failedCount = vehicles.filter((v) => v.status === 'FAILED').length;
  const blockedCount = vehicles.filter((v) => v.isBlocked).length;

  // Handler functions for actions
  const toggleBlockVehicle = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const newBlock = !v.isBlocked;
          showToast(
            newBlock
              ? `[${v.id}] 도크 진입 차단 조치가 적용되었습니다.`
              : `[${v.id}] 차단 해제되었습니다. 정상 검수 진입이 가능합니다.`
          );
          return { ...v, isBlocked: newBlock };
        }
        return v;
      })
    );
  };

  const approveInspection = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          showToast(`[${v.id}] 관제사 직권으로 T-Check 검수가 최종 승인되었습니다.`);
          return {
            ...v,
            status: 'PASSED',
            weight: v.weight.includes('톤') ? v.weight : '정상 통과',
            weightStatus: 'NORMAL',
            sealStatus: 'MATCH',
            tireStatus: '마모도 90% (승인 완료)',
            time: '방금 승인',
            isBlocked: false,
          };
        }
        return v;
      })
    );
  };

  const reInspectVehicle = (id: string) => {
    showToast(`[${id}] 센서 재계근 및 봉인 AI 비전 재검수를 요청했습니다.`);
  };

  const requestReloadInstruction = (id: string) => {
    showToast(`[${id}] 기사 휴대폰 및 물류센터 단말기로 과적 재상차/분발 지시를 전달했습니다.`);
  };

  // Filtered List
  const filteredVehicles = vehicles.filter((v) => {
    if (activeTab === 'PASSED' && v.status !== 'PASSED') return false;
    if (activeTab === 'INSPECTION' && v.status !== 'INSPECTION') return false;
    if (activeTab === 'FAILED' && v.status !== 'FAILED') return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        v.id.toLowerCase().includes(q) ||
        v.driver.toLowerCase().includes(q) ||
        v.truckType.toLowerCase().includes(q) ||
        v.sealNo.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F4F4F6] font-sans relative">
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#191919] text-[#FEE500] font-bold text-xs px-4 py-3 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-base text-amber-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-5">
        {/* Top Summary Header Banner */}
        <div className="bg-white border border-[#E5E5E8] rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-amber-900 bg-[#FEE500] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                T-CHECK SAFETY COMPLIANCE
              </span>
              <span className="text-xs text-gray-400 font-mono">Realtime AI Gate Inspection</span>
            </div>
            <h2 className="text-xl font-black text-[#191919] mt-1.5 flex items-center gap-2">
              <span>상하차지 품질 & 안전 적합성 검수 센터</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                정상 작동중
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              도크 진입 차량의 중량 과적 여부, 봉인(Seal) 파손, 타이어 상태 AI 실시간 센서 검수 (총 {totalCount}대 관리)
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-gray-500 font-bold block">오늘의 검수 통과율</span>
              <span className="text-2xl font-black text-emerald-600">
                {Math.round((passedCount / (totalCount - inspectionCount)) * 1000) / 10}%
              </span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-right">
              <span className="text-xs text-gray-500 font-bold block">진입 차단 / 부적합</span>
              <span className="text-2xl font-black text-red-600">{failedCount}건 ({blockedCount}대 차단)</span>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                activeTab === 'ALL'
                  ? 'bg-black text-[#FEE500] shadow-xs'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>전체 차량</span>
              <span className="bg-gray-800 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {totalCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('PASSED')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                activeTab === 'PASSED'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <span>적합 통과</span>
              <span className="bg-emerald-100 text-emerald-900 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {passedCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('INSPECTION')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                activeTab === 'INSPECTION'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white border border-amber-300 text-amber-800 hover:bg-amber-50'
              }`}
            >
              <span>검수 진행중</span>
              <span className="bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                {inspectionCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('FAILED')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                activeTab === 'FAILED'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white border border-red-300 text-red-600 hover:bg-red-50'
              }`}
            >
              <span>부적합 경고</span>
              <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-extrabold animate-pulse">
                {failedCount}
              </span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="차량번호, 기사명, 봉인번호 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-1.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-black w-64 shadow-xs"
            />
          </div>
        </div>

        {/* Total Vehicle Grid List (All 18 items supported) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVehicles.map((vehicle) => {
            const isPassed = vehicle.status === 'PASSED';
            const isFailed = vehicle.status === 'FAILED';
            const isInspection = vehicle.status === 'INSPECTION';

            return (
              <div
                key={vehicle.id}
                className={`bg-white rounded-2xl p-4 shadow-xs border transition-all flex flex-col justify-between relative overflow-hidden ${
                  isFailed
                    ? 'border-red-300 ring-2 ring-red-100'
                    : isInspection
                    ? 'border-amber-300 bg-amber-50/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Blocked Badge Ribbon */}
                {vehicle.isBlocked && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white font-black text-[9px] px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1 z-10">
                    <span className="material-symbols-outlined text-[11px]">block</span>
                    <span>진입 차단됨</span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-2.5">
                    <div>
                      {isPassed && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded inline-block">
                          적합 통과 (PASSED)
                        </span>
                      )}
                      {isFailed && (
                        <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded inline-block">
                          부적합 경고 (FAILED)
                        </span>
                      )}
                      {isInspection && (
                        <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded inline-block animate-pulse">
                          검수 진행중 (INSPECTING)
                        </span>
                      )}

                      <h3 className="text-base font-black text-[#191919] mt-1 flex items-center gap-1.5">
                        <span>{vehicle.id}</span>
                        <span className="text-xs font-normal text-gray-500">
                          ({vehicle.driver} / {vehicle.truckType})
                        </span>
                      </h3>
                    </div>
                    {!vehicle.isBlocked && (
                      <span className="text-[11px] text-gray-400 font-mono font-bold">{vehicle.time}</span>
                    )}
                  </div>

                  {/* Failure Reason Alert Banner if failed */}
                  {isFailed && vehicle.failReason && (
                    <div className="bg-red-50 border border-red-200 p-2 rounded-xl text-[11px] font-bold text-red-700 mb-3 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-red-600 shrink-0">
                        error
                      </span>
                      <span>{vehicle.failReason}</span>
                    </div>
                  )}

                  {/* Inspection Sensor Metrics */}
                  <div className="grid grid-cols-3 gap-1.5 text-center my-3 text-xs">
                    {/* Weight Metric */}
                    <div
                      className={`p-2 rounded-xl border ${
                        vehicle.weightStatus === 'OVERWEIGHT'
                          ? 'bg-red-50 border-red-200'
                          : 'bg-gray-50 border-gray-100'
                      }`}
                    >
                      <span className="text-[10px] text-gray-400 block font-bold">계근 중량</span>
                      <span
                        className={`font-extrabold ${
                          vehicle.weightStatus === 'OVERWEIGHT'
                            ? 'text-red-600'
                            : vehicle.weightStatus === 'SCANNING'
                            ? 'text-amber-600 animate-pulse'
                            : 'text-emerald-700'
                        }`}
                      >
                        {vehicle.weight}
                      </span>
                    </div>

                    {/* Seal Metric */}
                    <div
                      className={`p-2 rounded-xl border ${
                        vehicle.sealStatus === 'DAMAGED'
                          ? 'bg-red-50 border-red-200'
                          : 'bg-gray-50 border-gray-100'
                      }`}
                    >
                      <span className="text-[10px] text-gray-400 block font-bold">봉인(Seal)</span>
                      <span
                        className={`font-extrabold text-[11px] ${
                          vehicle.sealStatus === 'DAMAGED'
                            ? 'text-red-600'
                            : vehicle.sealStatus === 'CHECKING'
                            ? 'text-amber-600'
                            : 'text-gray-800'
                        }`}
                      >
                        {vehicle.sealNo}
                      </span>
                    </div>

                    {/* Tire AI Metric */}
                    <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                      <span className="text-[10px] text-gray-400 block font-bold">타이어 AI</span>
                      <span className="font-extrabold text-gray-800 text-[11px]">
                        {vehicle.tireStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Interactive Action Buttons */}
                <div className="pt-2 border-t border-gray-100 space-y-1.5">
                  {isPassed && (
                    <button
                      onClick={() => setSelectedCertVehicle(vehicle)}
                      className="w-full bg-gray-100 hover:bg-[#FEE500] hover:text-black text-gray-800 font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>검수 인증서 확인</span>
                    </button>
                  )}

                  {isFailed && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => requestReloadInstruction(vehicle.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">front_hand</span>
                        <span>재상차 지시</span>
                      </button>
                      <button
                        onClick={() => toggleBlockVehicle(vehicle.id)}
                        className={`px-3 font-bold text-xs py-2 rounded-xl transition flex items-center gap-1 ${
                          vehicle.isBlocked
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-gray-800 hover:bg-black text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {vehicle.isBlocked ? 'lock_open' : 'block'}
                        </span>
                        <span>{vehicle.isBlocked ? '차단 해제' : '진입 차단'}</span>
                      </button>
                    </div>
                  )}

                  {isInspection && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => approveInspection(vehicle.id)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        <span>검수 승인</span>
                      </button>
                      <button
                        onClick={() => reInspectVehicle(vehicle.id)}
                        className="px-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs py-2 rounded-xl transition flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        <span>재검수</span>
                      </button>
                      <button
                        onClick={() => toggleBlockVehicle(vehicle.id)}
                        className="px-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs py-2 rounded-xl transition"
                        title="진입 차단"
                      >
                        <span className="material-symbols-outlined text-sm">block</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* OFFICIAL T-CHECK AI INSPECTION CERTIFICATE MODAL */}
      {selectedCertVehicle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-300 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-5 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-gray-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#FEE500] text-black font-black text-[10px] px-2.5 py-0.5 rounded-full">
                    KAKAOT FREIGHT T-CHECK CERTIFICATE
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">NO: TC-2026-0812-{selectedCertVehicle.id.replace('KA-', '')}</span>
                </div>
                <h3 className="text-xl font-black text-[#191919] mt-1">전자 T-Check 검수 인증서</h3>
              </div>
              <button
                onClick={() => setSelectedCertVehicle(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition"
              >
                ✕
              </button>
            </div>

            {/* Certificate Body Card */}
            <div className="bg-[#FAF9F5] border border-amber-200/80 rounded-2xl p-4 space-y-3 relative overflow-hidden">
              {/* Official Stamp Watermark */}
              <div className="absolute right-3 bottom-3 opacity-15 pointer-events-none border-4 border-emerald-600 text-emerald-800 rounded-full w-28 h-28 flex items-center justify-center font-black text-center text-xs rotate-[-18deg]">
                VERIFIED<br />T-CHECK<br />PASSED
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                <div>
                  <span className="text-gray-400 font-bold block text-[10px]">차량 번호 / 차주</span>
                  <strong className="text-gray-900 text-sm">{selectedCertVehicle.id}</strong> ({selectedCertVehicle.driver})
                </div>
                <div>
                  <span className="text-gray-400 font-bold block text-[10px]">차종 및 적재능력</span>
                  <strong className="text-gray-900">{selectedCertVehicle.truckType}</strong>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block text-[10px]">검수 장소</span>
                  <span className="text-gray-800">인천 물류센터 Gate #2</span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block text-[10px]">판독 시각</span>
                  <span className="text-gray-800 font-mono">2026-08-12 {selectedCertVehicle.time}</span>
                </div>
              </div>

              {/* Verified Checklist */}
              <div className="bg-white border border-gray-200 rounded-xl p-3 space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                  <span className="font-bold text-gray-700 flex items-center gap-1">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">scale</span>
                    <span>1. 계근 과적 상태</span>
                  </span>
                  <span className="font-black text-emerald-600">{selectedCertVehicle.weight} (적합)</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                  <span className="font-bold text-gray-700 flex items-center gap-1">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">lock</span>
                    <span>2. 화물 봉인(Seal) AI 비전</span>
                  </span>
                  <span className="font-black text-emerald-600">{selectedCertVehicle.sealNo} (일치)</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700 flex items-center gap-1">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">tire_repair</span>
                    <span>3. 타이어 AI 마모/공기압</span>
                  </span>
                  <span className="font-black text-emerald-600">{selectedCertVehicle.tireStatus}</span>
                </div>
              </div>

              {/* Barcode / QR Simulation */}
              <div className="bg-white border border-gray-200 rounded-xl p-3 text-center flex flex-col items-center justify-center">
                <div className="font-mono text-[10px] tracking-[0.3em] font-extrabold text-gray-800 uppercase">
                  ||||| ||||||| ||| |||||| |||||| ||||
                </div>
                <span className="text-[9px] text-gray-400 font-mono mt-1">
                  KAKAOT-SECURITY-BLOCKCHAIN-HASH: e9f2a8c01b9
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  showToast('전자 T-Check 검수 인증서가 출력이 예약되었습니다.');
                  setSelectedCertVehicle(null);
                }}
                className="flex-1 bg-[#191919] text-[#FEE500] font-black text-xs py-2.5 rounded-xl hover:bg-black transition flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>인증서 발급 / 출력</span>
              </button>
              <button
                onClick={() => setSelectedCertVehicle(null)}
                className="px-5 bg-gray-200 text-gray-800 font-bold text-xs py-2.5 rounded-xl hover:bg-gray-300 transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
