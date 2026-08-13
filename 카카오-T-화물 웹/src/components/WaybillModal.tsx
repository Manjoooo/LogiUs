import React from 'react';
import { CargoItem } from '../types';

interface WaybillModalProps {
  cargo: CargoItem;
  onClose: () => void;
}

export const WaybillModal: React.FC<WaybillModalProps> = ({ cargo, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#e8e8ea] max-h-[90vh] overflow-y-auto relative text-left">
        {/* Modal Top Bar */}
        <div className="flex justify-between items-start pb-4 border-b border-[#e8e8ea] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fee500] text-[#1a1c1d] flex items-center justify-center font-bold text-[20px] shadow-xs">
              T
            </div>
            <div>
              <h3 className="text-[20px] font-bold text-[#1a1c1d] tracking-tight">화물 운송장 (Bill of Lading)</h3>
              <p className="text-[12px] text-[#5f5e5e]">카카오 T 화물 전자 운송 증명서</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5f5e5e] hover:text-[#1a1c1d] rounded-full hover:bg-[#f3f3f4] transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Printable Waybill Area */}
        <div className="space-y-6 text-[13px] border border-[#cdc7aa]/40 p-6 rounded-2xl bg-[#f9f9fa]">
          {/* Header Bar */}
          <div className="flex flex-wrap justify-between items-center gap-2 pb-4 border-b border-[#cdc7aa]/30">
            <div>
              <span className="text-[11px] font-bold text-[#7c775f] uppercase tracking-wider block">운송장 번호</span>
              <span className="text-[22px] font-bold text-[#1a1c1d]">{cargo.code}-20260812</span>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-[#25A55F]/10 text-[#25A55F] rounded-full font-bold text-[12px] inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span> 신뢰 화물 검증 완료
              </span>
              <p className="text-[11px] text-[#5f5e5e] mt-1">발행일: {cargo.createdAt}</p>
            </div>
          </div>

          {/* Logistics Route Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-[#e8e8ea]">
            <div>
              <p className="text-[11px] text-[#7c775f] font-bold">화주 (송하인)</p>
              <p className="font-bold text-[15px] text-[#1a1c1d]">김카카오 화주</p>
              <p className="text-[12px] text-[#5f5e5e]">서울 중구 세종대로 110</p>
            </div>
            <div>
              <p className="text-[11px] text-[#7c775f] font-bold">수하인 (도착지)</p>
              <p className="font-bold text-[15px] text-[#1a1c1d]">{cargo.destination.centerName}</p>
              <p className="text-[12px] text-[#5f5e5e]">{cargo.destination.address}</p>
            </div>
          </div>

          {/* Transport & Cargo Details Table */}
          <div className="bg-white rounded-xl border border-[#e8e8ea] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f3f3f4] text-[#5f5e5e] text-[12px] font-bold">
                <tr>
                  <th className="p-3 border-b border-[#e8e8ea]">항목</th>
                  <th className="p-3 border-b border-[#e8e8ea]">상세 내역</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeeeef] text-[13px]">
                <tr>
                  <td className="p-3 font-semibold text-[#5f5e5e]">운송 제목</td>
                  <td className="p-3 font-bold text-[#1a1c1d]">{cargo.title}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#5f5e5e]">배차 차량</td>
                  <td className="p-3 text-[#1a1c1d]">{cargo.vehicleType} ({cargo.vehicleNumber})</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#5f5e5e]">담당 기사</td>
                  <td className="p-3 text-[#1a1c1d]">{cargo.driverName} ({cargo.driverPhone})</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#5f5e5e]">화물 품목</td>
                  <td className="p-3 text-[#1a1c1d]">{cargo.cargoDetails.category}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#5f5e5e]">총 중량 / 온도</td>
                  <td className="p-3 text-[#1a1c1d]">{cargo.cargoDetails.weight} / {cargo.cargoDetails.tempCondition}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#5f5e5e]">배정 도크</td>
                  <td className="p-3 font-bold text-[#1a1c1d]">{cargo.destination.dockNumber} (변경 지정됨)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Barcode & Verification Footer */}
          <div className="flex flex-wrap justify-between items-center pt-2 gap-4">
            <div className="font-mono text-[11px] text-[#7c775f] bg-[#e8e8e9] px-3 py-2 rounded-lg border border-[#cdc7aa]/40">
              ||| | |||| | ||||| || |||||| | ||| KAKAO-T-FREIGHT-{cargo.code}
            </div>
            <div className="text-right">
              <p className="text-[11px] text-[#5f5e5e]">전자 서명 인증: Kakao T Logistics Systems Corp.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#cdc7aa]/50 text-[#1a1c1d] font-semibold hover:bg-[#f3f3f4] transition-colors"
          >
            닫기
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl bg-[#fee500] text-[#1a1c1d] font-bold hover:bg-[#f2db00] transition-colors flex items-center gap-2 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>운송장 인쇄 / PDF 저장</span>
          </button>
        </div>
      </div>
    </div>
  );
};
