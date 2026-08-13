import React, { useState } from 'react';
import { GeofenceZone, DispatchOrder } from '../types';
import { MapPin, Navigation, AlertCircle, Shield, Truck, RefreshCw, Radio } from 'lucide-react';

interface GeofenceMapProps {
  zones: GeofenceZone[];
  dispatches: DispatchOrder[];
}

export const GeofenceMap: React.FC<GeofenceMapProps> = ({ zones, dispatches }) => {
  const [selectedZone, setSelectedZone] = useState<GeofenceZone | null>(zones[0]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const activeTransitList = dispatches.filter(d => d.status === 'IN_TRANSIT' || d.status === 'DOCKING');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Geofence Map Area (8 Cols) */}
      <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-600" />
              실시간 Geofence 권역 모니터링 (GPS Radar)
            </h3>
            <p className="text-xs text-gray-500">물류 거점 진입/출입 자동 인식 및 ETA 예측 시스템</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live GPS Sync
            </span>
          </div>
        </div>

        {/* Visual Map Canvas / Radar Container */}
        <div className="relative w-full h-[480px] bg-[#1a1c1d] rounded-xl overflow-hidden border border-gray-800 flex items-center justify-center">
          
          {/* Grid background lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
          
          {/* Radar Circles */}
          <div className="absolute w-96 h-96 rounded-full border border-yellow-500/20 animate-radar"></div>
          <div className="absolute w-64 h-64 rounded-full border border-yellow-500/30"></div>
          <div className="absolute w-32 h-32 rounded-full border border-yellow-500/40"></div>

          {/* Map Overlay SVG simulation */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <path d="M 50 120 Q 200 80 350 200 T 650 350" fill="none" stroke="#FEE500" strokeWidth="2" strokeDasharray="6,6" />
            <path d="M 120 380 Q 300 320 500 180 T 720 120" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" />
          </svg>

          {/* Interactive Geofence Radar Pins */}
          {zones.map((zone, idx) => {
            const positions = [
              { top: '25%', left: '30%' },
              { top: '40%', left: '60%' },
              { top: '65%', left: '35%' },
              { top: '30%', left: '75%' },
              { top: '75%', left: '70%' }
            ];
            const pos = positions[idx % positions.length];
            const isSelected = selectedZone?.id === zone.id;

            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                style={{ top: pos.top, left: pos.left }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                  isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                }`}
              >
                {/* Geofence Pulse Circle */}
                <div className={`w-28 h-28 rounded-full border-2 flex items-center justify-center transition ${
                  isSelected ? 'border-[#FEE500] bg-yellow-500/10 shadow-lg shadow-yellow-500/20' : 'border-gray-600 bg-gray-800/30'
                }`}>
                  <div className="bg-[#191919]/90 text-white p-2 rounded-xl border border-gray-700 shadow-md text-center max-w-[110px]">
                    <div className="text-[10px] text-yellow-400 font-bold truncate">{zone.name}</div>
                    <div className="text-[11px] font-extrabold flex items-center justify-center gap-1 mt-0.5">
                      <Truck className="w-3 h-3 text-white" />
                      {zone.activeTrucks}대
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Active Truck Animated Markers */}
          {activeTransitList.map((truck, idx) => {
            const truckPos = [
              { top: '32%', left: '42%' },
              { top: '50%', left: '48%' },
              { top: '60%', left: '55%' }
            ];
            const pos = truckPos[idx % truckPos.length];

            return (
              <div
                key={truck.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-[#FEE500] text-black px-2 py-1 rounded-lg font-bold text-[10px] shadow-lg flex items-center gap-1 z-30 animate-bounce"
              >
                <Truck className="w-3 h-3" />
                <span>{truck.truckPlate || truck.driverName}</span>
              </div>
            );
          })}

          {/* Map Controls Floating Overlay */}
          <div className="absolute bottom-4 left-4 bg-[#191919]/90 border border-gray-800 backdrop-blur-md p-3 rounded-xl text-white text-xs space-y-1">
            <div className="font-bold text-yellow-400 flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              권역 감지 메트릭스
            </div>
            <div className="text-[11px] text-gray-300">전체 감지 구역: {zones.length}개 거점</div>
            <div className="text-[11px] text-gray-300">실시간 구역내 기사: 130대 진행중</div>
          </div>

        </div>

        {/* Selected Zone Quick Info */}
        {selectedZone && (
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{selectedZone.name}</h4>
                <p className="text-xs text-gray-500">
                  반경 {selectedZone.radiusMeter}m 이내 &bull; 실시간 차적 {selectedZone.activeTrucks}대 체류중
                </p>
              </div>
            </div>
            <div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                selectedZone.status === 'CONGESTED' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {selectedZone.status === 'CONGESTED' ? '혼잡 (입고대기)' : '원활 (정상운영)'}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Geofence Event Log Sidebar (4 Cols) */}
      <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col space-y-4">
        
        <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
          <Navigation className="w-5 h-5 text-blue-600" />
          실시간 진출입 이벤트 로그
        </h3>

        <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
          {[
            { id: 'ev-1', zone: '이천 CJ 허브센터', plate: '경기 88바 1234', driver: '김철수', type: 'ENTRY', time: '방금 전', status: '진입 인지 (T-Check 연동)' },
            { id: 'ev-2', zone: '평택항 국제물류터미널', plate: '충남 80아 5678', driver: '박성호', type: 'ENTRY', time: '3분 전', status: '도킹 Bay 01 배정' },
            { id: 'ev-3', zone: '의왕 ICD 제1터미널', plate: '경남 91가 2345', driver: '이동현', type: 'EXIT', time: '12분 전', status: '하차완료 및 출입문 통과' },
            { id: 'ev-4', zone: '인천항 배후물류단지', plate: '인천 85사 9876', driver: '정재훈', type: 'ENTRY', time: '25분 전', status: '입고 점검 대기중' }
          ].map(log => (
            <div key={log.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  log.type === 'ENTRY' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {log.type === 'ENTRY' ? 'GEOFENCE 진입' : 'GEOFENCE 이탈'}
                </span>
                <span className="text-[10px] text-gray-400">{log.time}</span>
              </div>
              <div className="font-bold text-xs text-gray-900">{log.zone}</div>
              <div className="text-xs text-gray-600 flex items-center justify-between">
                <span>{log.plate} ({log.driver})</span>
                <span className="text-[11px] text-gray-500 font-medium">{log.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-gray-100">
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1">
            <RefreshCw className="w-3.5 h-3.5" />
            이벤트 로그 전체 새로고침
          </button>
        </div>

      </div>

    </div>
  );
};
