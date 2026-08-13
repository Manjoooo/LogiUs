import React from 'react';
import { CargoItem } from '../types';

interface TempLogModalProps {
  cargo: CargoItem;
  onClose: () => void;
}

export const TempLogModal: React.FC<TempLogModalProps> = ({ cargo, onClose }) => {
  // Sample telemetry data points over time
  const tempLogs = [
    { time: '10:00 (상차완료)', temp: -18.0, status: '정상' },
    { time: '11:00 (시흥 분기점)', temp: -18.2, status: '정상' },
    { time: '12:00 (안성 휴게소)', temp: -18.4, status: '정상' },
    { time: '13:00 (남사 IC)', temp: -18.5, status: '정상' },
    { time: '현재 (실시간 감지)', temp: cargo.cargoDetails.currentTemp, status: '정상' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#e8e8ea] relative text-left">
        <div className="flex justify-between items-start pb-4 border-b border-[#e8e8ea] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center font-bold text-[20px]">
              <span className="material-symbols-outlined text-[24px]">ac_unit</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#1a1c1d]">콜드체인 실시간 온도 모니터링</h3>
              <p className="text-[12px] text-[#5f5e5e]">기준 조건: {cargo.cargoDetails.tempCondition}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5f5e5e] hover:text-[#1a1c1d] rounded-full hover:bg-[#f3f3f4]"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Current Temp Gauge Box */}
        <div className="bg-[#2563eb]/5 border border-[#2563eb]/20 p-5 rounded-2xl mb-6 flex items-center justify-between">
          <div>
            <p className="text-[12px] font-semibold text-[#2563eb]">현재 적재함 실시간 온도</p>
            <p className="text-[32px] font-bold text-[#2563eb] tracking-tight">{cargo.cargoDetails.currentTemp}℃</p>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 bg-[#25a55f] text-white rounded-full text-[12px] font-bold">
              안정 (정상 유지 중)
            </span>
            <p className="text-[11px] text-[#5f5e5e] mt-1.5">센서 ID: SENSOR-COLD-8821</p>
          </div>
        </div>

        {/* Telemetry Timeline Table */}
        <div className="space-y-3">
          <h4 className="text-[14px] font-bold text-[#1a1c1d]">시간별 측정 데이터</h4>
          <div className="border border-[#e8e8ea] rounded-xl overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#f3f3f4] text-[#5f5e5e] font-semibold border-b border-[#e8e8ea]">
                <tr>
                  <th className="p-3">시간 / 구간</th>
                  <th className="p-3">측정 온도</th>
                  <th className="p-3">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeeeef]">
                {tempLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-[#f9f9fa]">
                    <td className="p-3 font-medium text-[#1a1c1d]">{log.time}</td>
                    <td className="p-3 font-bold text-[#2563eb]">{log.temp}℃</td>
                    <td className="p-3">
                      <span className="text-[11px] text-[#25a55f] font-bold bg-[#25a55f]/10 px-2 py-0.5 rounded-full">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1a1c1d] text-white rounded-xl font-semibold hover:bg-black transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
