import React from 'react';

export const SettingsView: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F4F4F6] font-sans">
      <div className="max-w-4xl mx-auto space-y-5">
        <div className="bg-white border border-[#E5E5E8] rounded-2xl p-5 shadow-xs">
          <h2 className="text-lg font-black text-[#191919]">관제 시스템 설정 & 임계값 지정</h2>
          <p className="text-xs text-gray-500 mt-1">
            Geofence 자동 반경 기준, 지연 발생 알림 임계시간, 담당자 알림톡 전송 조건 설정
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-bold text-gray-900 text-sm">Geofence 진입/이탈 감지 반경</p>
              <p className="text-gray-500">물류 센터 주변 자동 감지 영역 반경</p>
            </div>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg font-bold bg-gray-50">
              <option>200m (기본값)</option>
              <option>500m</option>
              <option>1,000m</option>
            </select>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-bold text-gray-900 text-sm">자동 지연 경고 임계시간</p>
              <p className="text-gray-500">예정 ETA 대비 초과 시 알람 발생</p>
            </div>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg font-bold bg-gray-50">
              <option>+15분 초과 시</option>
              <option>+30분 초과 시</option>
              <option>+60분 초과 시</option>
            </select>
          </div>

          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-bold text-gray-900 text-sm">카카오 알림톡 관제사 자동 발송</p>
              <p className="text-gray-500">심각 지연 발생 시 관제팀 단톡방 자동 공유</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#FEE500]" />
          </div>
        </div>
      </div>
    </div>
  );
};
