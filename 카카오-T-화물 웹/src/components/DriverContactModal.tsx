import React, { useState } from 'react';
import { CargoItem } from '../types';

interface DriverContactModalProps {
  cargo: CargoItem;
  onClose: () => void;
}

export const DriverContactModal: React.FC<DriverContactModalProps> = ({ cargo, onClose }) => {
  const [messageText, setMessageText] = useState('');
  const [sentMessage, setSentMessage] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setSentMessage(true);
    setTimeout(() => {
      setMessageText('');
      setSentMessage(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#e8e8ea] relative text-left">
        <div className="flex justify-between items-start pb-4 border-b border-[#e8e8ea] mb-5">
          <h3 className="text-[18px] font-bold text-[#1a1c1d]">운송 기사님 정보 및 연락</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5f5e5e] hover:text-[#1a1c1d] rounded-full hover:bg-[#f3f3f4]"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Driver Profile Header Card */}
        <div className="flex items-center gap-4 bg-[#f9f9fa] p-4 rounded-2xl border border-[#e8e8ea] mb-5">
          <img
            src={cargo.driverPhotoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={cargo.driverName}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#fee500] shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="text-[16px] font-bold text-[#1a1c1d]">{cargo.driverName}</h4>
            <p className="text-[13px] text-[#5f5e5e] font-medium">{cargo.vehicleType} ({cargo.vehicleNumber})</p>
            <p className="text-[12px] text-[#2563eb] font-semibold mt-0.5">{cargo.driverPhone}</p>
          </div>
        </div>

        {/* Action Call Button */}
        <a
          href={`tel:${cargo.driverPhone}`}
          className="w-full py-3 bg-[#1a1c1d] text-[#fee500] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors mb-5 shadow-xs"
        >
          <span className="material-symbols-outlined text-[20px]">call</span>
          <span>전화 걸기 ({cargo.driverPhone})</span>
        </a>

        {/* Direct SMS Message Box */}
        <form onSubmit={handleSendMessage} className="space-y-3">
          <label className="block text-[13px] font-bold text-[#1a1c1d]">
            기사님께 알림 메시지 보내기
          </label>
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="예: 하차지 도착 전 연락 부탁드립니다."
            rows={3}
            className="w-full p-3 border border-[#cdc7aa]/60 rounded-xl text-[13px] focus:outline-hidden focus:ring-2 focus:ring-[#fee500] bg-[#f9f9fa]"
          />

          {sentMessage ? (
            <div className="p-3 bg-[#25a55f]/10 text-[#25a55f] font-bold text-[13px] rounded-xl text-center flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>기사님 앱으로 메시지가 전송되었습니다!</span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!messageText.trim()}
              className="w-full py-2.5 bg-[#f3f3f4] hover:bg-[#e8e8e9] text-[#1a1c1d] font-bold text-[13px] rounded-xl border border-[#cdc7aa]/40 transition-colors disabled:opacity-50"
            >
              메시지 전송
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
