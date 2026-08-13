import React from 'react';
import { Mode } from '../types';
import { 
  LayoutDashboard, 
  MapPin, 
  Truck, 
  BarChart3, 
  PlusCircle, 
  Bell, 
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  currentMode: Mode;
  setMode: (mode: Mode) => void;
  openBookingModal: () => void;
  unassignedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentMode, 
  setMode, 
  openBookingModal,
  unassignedCount 
}) => {
  return (
    <header className="bg-[#191919] text-white border-b border-gray-800 sticky top-0 z-50">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setMode('dashboard')}>
          <div className="w-9 h-9 bg-[#FEE500] rounded-xl flex items-center justify-center font-extrabold text-black text-xl shadow-md">
            T
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight">카카오 T 화물</span>
              <span className="bg-[#FEE500] text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                관리자 웹 센터
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">실시간 화물 관제 & Geofence GPS & T-Check 도킹 점검 시스템</p>
          </div>
        </div>

        {/* Global Action Button & User */}
        <div className="flex items-center space-x-3">
          <button
            onClick={openBookingModal}
            className="bg-[#FEE500] hover:bg-yellow-400 text-black text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-sm active:scale-95"
            id="btn-new-booking"
          >
            <PlusCircle className="w-4 h-4" />
            <span>신규 화물 접수</span>
          </button>

          <div className="relative hidden md:block">
            <button className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition relative">
              <Bell className="w-5 h-5" />
              {unassignedCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              )}
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-2 pl-3 border-l border-gray-800 text-xs text-gray-300">
            <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
              관
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-white">물류관제센터</div>
              <div className="text-[10px] text-gray-400">오퍼레이터 A (관리자)</div>
            </div>
          </div>
        </div>

      </div>

      {/* Mode Navigation Bar */}
      <div className="bg-[#242424] border-t border-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 overflow-x-auto py-2 scrollbar-none">
          
          <button
            onClick={() => setMode('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition ${
              currentMode === 'dashboard'
                ? 'bg-[#FEE500] text-black shadow-sm font-bold'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>실시간 관제 대시보드</span>
            {unassignedCount > 0 && (
              <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${currentMode === 'dashboard' ? 'bg-black text-white' : 'bg-red-500 text-white'}`}>
                {unassignedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMode('geofence')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition ${
              currentMode === 'geofence'
                ? 'bg-[#FEE500] text-black shadow-sm font-bold'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Geofence 위치 관제</span>
          </button>

          <button
            onClick={() => setMode('tcheck')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition ${
              currentMode === 'tcheck'
                ? 'bg-[#FEE500] text-black shadow-sm font-bold'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>T-Check 도킹 센터</span>
          </button>

          <button
            onClick={() => setMode('analytics')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition ${
              currentMode === 'analytics'
                ? 'bg-[#FEE500] text-black shadow-sm font-bold'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>통계 및 세금정산</span>
          </button>

        </div>
      </div>
    </header>
  );
};
