import React, { useState } from 'react';
import { PlusCircle, Truck, MapPin, DollarSign, Clock, AlertTriangle } from 'lucide-react';

interface ShipperBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDispatch: (dispatchData: any) => void;
}

export const ShipperBookingModal: React.FC<ShipperBookingModalProps> = ({ isOpen, onClose, onCreateDispatch }) => {
  const [shipper, setShipper] = useState<string>('(주)카카오 물류 파트너');
  const [pickUp, setPickUp] = useState<string>('경기 용인시 기흥구 덕영대로 1750');
  const [dropOff, setDropOff] = useState<string>('부산 동구 충장대로 286 (부산항)');
  const [cargoType, setCargoType] = useState<string>('전자 기기 8파렛트');
  const [tonnage, setTonnage] = useState<string>('11톤 윙바디');
  const [weightTon, setWeightTon] = useState<number>(7.5);
  const [fee, setFee] = useState<number>(420000);
  const [requestedTime, setRequestedTime] = useState<string>('2026-08-13 14:00');
  const [distanceKm, setDistanceKm] = useState<number>(320);
  const [urgent, setUrgent] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateDispatch({
      shipper,
      pickUp,
      dropOff,
      cargoType,
      tonnage,
      weightTon,
      fee,
      requestedTime,
      distanceKm,
      urgent
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-3 border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FEE500] text-black font-extrabold flex items-center justify-center text-sm">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">신규 화물 배차 접수</h3>
              <p className="text-xs text-gray-500">화주 전용 스마트 배차 등록</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black text-xl font-bold p-1">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">화주 회사명</label>
              <input
                type="text"
                value={shipper}
                onChange={e => setShipper(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">상차 요청 일시</label>
              <input
                type="text"
                value={requestedTime}
                onChange={e => setRequestedTime(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">상차지 주소 (Pick Up)</label>
            <input
              type="text"
              value={pickUp}
              onChange={e => setPickUp(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">하차지 주소 (Drop Off)</label>
            <input
              type="text"
              value={dropOff}
              onChange={e => setDropOff(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">화물 상세 내용</label>
              <input
                type="text"
                value={cargoType}
                onChange={e => setCargoType(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">차종 및 톤수</label>
              <select
                value={tonnage}
                onChange={e => setTonnage(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
              >
                <option value="1톤 용달">1톤 용달</option>
                <option value="5톤 카고">5톤 카고</option>
                <option value="5톤 윙바디">5톤 윙바디</option>
                <option value="11톤 윙바디">11톤 윙바디</option>
                <option value="25톤 트레일러">25톤 트레일러</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">총 중량 (Ton)</label>
              <input
                type="number"
                step="0.1"
                value={weightTon}
                onChange={e => setWeightTon(parseFloat(e.target.value))}
                required
                className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">운임료 (KRW)</label>
              <input
                type="number"
                step="10000"
                value={fee}
                onChange={e => setFee(parseInt(e.target.value))}
                required
                className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">예상 거리 (km)</label>
              <input
                type="number"
                value={distanceKm}
                onChange={e => setDistanceKm(parseInt(e.target.value))}
                required
                className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FEE500]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="chk-urgent"
              checked={urgent}
              onChange={e => setUrgent(e.target.checked)}
              className="w-4 h-4 accent-red-600 rounded cursor-pointer"
            />
            <label htmlFor="chk-urgent" className="text-xs font-bold text-red-600 cursor-pointer">
              긴급 출고 건 (Voice Radar 및 상단 강조 노출)
            </label>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-[#FEE500] text-black hover:bg-yellow-400 shadow transition"
            >
              화물 배차 즉시 등록
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
