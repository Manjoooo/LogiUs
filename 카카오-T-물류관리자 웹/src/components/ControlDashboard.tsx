import React, { useState } from 'react';
import { DispatchOrder, DispatchStatus } from '../types';
import { 
  Truck, 
  Search, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight,
  Filter,
  UserCheck
} from 'lucide-react';

interface ControlDashboardProps {
  dispatches: DispatchOrder[];
  onUpdateStatus: (id: string, newStatus: DispatchStatus, driverInfo?: { driverName: string; driverPhone: string; truckPlate: string }) => void;
  openBookingModal: () => void;
  onSelectVoiceRadar?: () => void;
}

export const ControlDashboard: React.FC<ControlDashboardProps> = ({
  dispatches,
  onUpdateStatus,
  openBookingModal,
  onSelectVoiceRadar
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDispatch, setSelectedDispatch] = useState<DispatchOrder | null>(null);

  // Quick Driver Assignment Modal State
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [inputDriverName, setInputDriverName] = useState<string>('이정훈 (추천)');
  const [inputDriverPhone, setInputDriverPhone] = useState<string>('010-9821-4321');
  const [inputTruckPlate, setInputTruckPlate] = useState<string>('경기 82자 9912');

  const filteredDispatches = dispatches.filter(d => {
    const matchesStatus = selectedStatus === 'ALL' || d.status === selectedStatus;
    const matchesQuery = !searchQuery || 
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shipper.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.pickUp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.dropOff.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.cargoType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.driverName && d.driverName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesQuery;
  });

  const countSearching = dispatches.filter(d => d.status === 'SEARCHING').length;
  const countInTransit = dispatches.filter(d => d.status === 'IN_TRANSIT' || d.status === 'DOCKING').length;
  const countCompleted = dispatches.filter(d => d.status === 'COMPLETED').length;
  const totalRevenue = dispatches.reduce((acc, curr) => acc + curr.fee, 0);

  const handleQuickAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (assigningId) {
      onUpdateStatus(assigningId, 'DISPATCHED', {
        driverName: inputDriverName,
        driverPhone: inputDriverPhone,
        truckPlate: inputTruckPlate
      });
      setAssigningId(null);
    }
  };

  const getStatusBadge = (status: DispatchStatus) => {
    switch (status) {
      case 'SEARCHING':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200 flex items-center gap-1"><Clock className="w-3 h-3" /> 배차대기</span>;
      case 'DISPATCHED':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1"><UserCheck className="w-3 h-3" /> 배차완료</span>;
      case 'DOCKING':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1"><Truck className="w-3 h-3" /> T-Check 도킹중</span>;
      case 'IN_TRANSIT':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center gap-1"><Truck className="w-3 h-3 animate-pulse" /> 운송중</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 운송완료</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Cards Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">매칭 대기 화물</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{countSearching} <span className="text-xs text-yellow-600 font-normal">건</span></h3>
            <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span> AI Voice Radar 매칭 가능
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">실시간 도킹 및 운송중</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{countInTransit} <span className="text-xs text-blue-600 font-normal">대</span></h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Geofence GPS 정상 작동중</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">금일 배차완료율</p>
            <h3 className="text-2xl font-extrabold text-gray-900">98.4<span className="text-xs font-normal">%</span></h3>
            <p className="text-[11px] text-gray-500 mt-1">완료: {countCompleted}건</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">오늘의 전체 물류 운임</p>
            <h3 className="text-2xl font-extrabold text-gray-900">{(totalRevenue / 10000).toLocaleString()}<span className="text-xs text-gray-500 font-normal">만원</span></h3>
            <p className="text-[11px] text-gray-400 mt-1">자동 전자 세금계산서 연동</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Quick Action Banner */}
      <div className="bg-gradient-to-r from-[#191919] to-gray-800 text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FEE500] text-black flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base">카카오 T 화물 실시간 배차 스마트 오퍼레이팅</h4>
            <p className="text-xs text-gray-300">신규 화주 배차 접수, 기사 수동/자동 매칭 및 T-Check 사전 안전성 점검을 관리합니다.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={openBookingModal}
            className="bg-[#FEE500] text-black text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-yellow-400 transition flex items-center gap-1.5 whitespace-nowrap shadow"
          >
            신규 화물 등록하기
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'ALL', label: '전체' },
              { id: 'SEARCHING', label: '배차대기' },
              { id: 'DISPATCHED', label: '배차완료' },
              { id: 'DOCKING', label: '도킹중' },
              { id: 'IN_TRANSIT', label: '운송중' },
              { id: 'COMPLETED', label: '운송완료' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  selectedStatus === tab.id
                    ? 'bg-black text-white font-bold'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="화주명, 출발지, 도착지, 기사 검색..."
              className="w-full bg-gray-50 border border-gray-200 text-xs text-gray-900 pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

        </div>
      </div>

      {/* Dispatch Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3.5">화물번호 / 긴급</th>
                <th className="px-4 py-3.5">화주명 / 구간</th>
                <th className="px-4 py-3.5">화물 / 톤수</th>
                <th className="px-4 py-3.5">운임료</th>
                <th className="px-4 py-3.5">상태</th>
                <th className="px-4 py-3.5">배정 기사 / 차번</th>
                <th className="px-4 py-3.5 text-right">관제 작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDispatches.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                    조회된 배차 건이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredDispatches.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    
                    {/* ID / Urgent */}
                    <td className="px-4 py-3.5 font-medium text-gray-900">
                      <div className="font-bold flex items-center gap-1.5">
                        {item.id}
                        {item.urgent && (
                          <span className="bg-red-100 text-red-600 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                            긴급
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400 font-normal mt-0.5">
                        {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Shipper & Route */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-gray-900">{item.shipper}</div>
                      <div className="text-gray-500 text-[11px] mt-0.5 flex items-center gap-1 truncate max-w-xs">
                        <span className="text-gray-700 font-medium">{item.pickUp.split(' ')[0]} {item.pickUp.split(' ')[1]}</span>
                        <ArrowRight className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="text-gray-700 font-medium">{item.dropOff.split(' ')[0]} {item.dropOff.split(' ')[1]}</span>
                      </div>
                    </td>

                    {/* Cargo / Tonnage */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-gray-800">{item.cargoType}</div>
                      <div className="text-gray-400 text-[11px] mt-0.5">{item.tonnage} ({item.weightTon}톤)</div>
                    </td>

                    {/* Fee */}
                    <td className="px-4 py-3.5 font-bold text-gray-900">
                      {item.fee.toLocaleString()}원
                      <div className="text-[10px] text-gray-400 font-normal">{item.distanceKm}km</div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Driver */}
                    <td className="px-4 py-3.5">
                      {item.driverName ? (
                        <div>
                          <div className="font-semibold text-gray-900">{item.driverName} 기사님</div>
                          <div className="text-gray-400 text-[11px] flex items-center gap-1 mt-0.5">
                            <span>{item.truckPlate}</span>
                            <a href={`tel:${item.driverPhone}`} className="text-blue-600 hover:underline">
                              <PhoneCall className="w-3 h-3 inline" />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">미배정</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right space-x-1">
                      {item.status === 'SEARCHING' && (
                        <button
                          onClick={() => setAssigningId(item.id)}
                          className="bg-black hover:bg-gray-800 text-white font-semibold text-[11px] px-2.5 py-1.5 rounded-lg transition"
                        >
                          기사 즉시 배정
                        </button>
                      )}

                      {item.status === 'DISPATCHED' && (
                        <button
                          onClick={() => onUpdateStatus(item.id, 'DOCKING')}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-[11px] px-2.5 py-1.5 rounded-lg transition"
                        >
                          도킹 진입
                        </button>
                      )}

                      {item.status === 'DOCKING' && (
                        <button
                          onClick={() => onUpdateStatus(item.id, 'IN_TRANSIT')}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] px-2.5 py-1.5 rounded-lg transition"
                        >
                          상차완료 & 출발
                        </button>
                      )}

                      {item.status === 'IN_TRANSIT' && (
                        <button
                          onClick={() => onUpdateStatus(item.id, 'COMPLETED')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] px-2.5 py-1.5 rounded-lg transition"
                        >
                          하차완료 처리
                        </button>
                      )}

                      {item.status === 'COMPLETED' && (
                        <span className="text-xs text-emerald-600 font-bold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 정산완료
                        </span>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Driver Assignment Modal */}
      {assigningId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 border border-gray-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-yellow-600" />
                기사 수동 배정 ({assigningId})
              </h3>
              <button onClick={() => setAssigningId(null)} className="text-gray-400 hover:text-black">✕</button>
            </div>

            <form onSubmit={handleQuickAssign} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">기사 성함</label>
                <input
                  type="text"
                  value={inputDriverName}
                  onChange={e => setInputDriverName(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">연락처</label>
                <input
                  type="text"
                  value={inputDriverPhone}
                  onChange={e => setInputDriverPhone(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">차량 번호</label>
                <input
                  type="text"
                  value={inputTruckPlate}
                  onChange={e => setInputTruckPlate(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setAssigningId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FEE500] text-black hover:bg-yellow-400 shadow"
                >
                  배정 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
