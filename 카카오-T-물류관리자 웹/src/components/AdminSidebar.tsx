import React from 'react';
import { AdminMode } from '../types';

interface AdminSidebarProps {
  currentMode: AdminMode;
  setMode: (mode: AdminMode) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentMode, setMode }) => {
  const menuItems: { id: AdminMode; label: string; icon: string }[] = [
    { id: 'dashboard', label: '관제 현황', icon: 'grid_view' },
    { id: 'realtime', label: '실시간 운송', icon: 'local_shipping' },
    { id: 'issues', label: '이슈 대응', icon: 'warning' },
    { id: 'tcheck', label: 'T-Check 관리', icon: 'verified_user' },
    { id: 'drivers', label: '차주 내부관리', icon: 'person_search' },
    { id: 'dock', label: '도크 관리', icon: 'meeting_room' },
    { id: 'shippers', label: '화주 현황', icon: 'business' },
    { id: 'reports', label: '리포트', icon: 'bar_chart' },
    { id: 'settings', label: '시스템 설정', icon: 'settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-[#EDEDED] text-[#191919] border-r border-[#E2E2E2] flex flex-col py-5 z-40 shrink-0 select-none font-sans">
      {/* Header Logo */}
      <div className="px-5 mb-6 flex items-center gap-3">
        <div className="w-9 h-9 bg-[#FEE500] rounded-full flex items-center justify-center shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-black font-extrabold text-xl">local_shipping</span>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-lg text-black tracking-tight leading-none">카카오 T 화물</span>
          <span className="text-[11px] text-[#666666] font-medium mt-1">물류 관리자</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-2.5 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = currentMode === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs transition-all relative group ${
                isActive
                  ? 'bg-[#FFFDE7] text-black font-bold shadow-xs'
                  : 'text-[#424242] hover:bg-[#E2E2E2]/70 hover:text-black font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-lg ${
                    isActive ? 'text-black font-bold' : 'text-[#616161]'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-[13px] tracking-tight">{item.label}</span>
              </div>

              {/* Yellow Right Pill Indicator on Selected State */}
              {isActive && (
                <div className="absolute right-0 top-2 bottom-2 w-1.5 bg-[#FEE500] rounded-l-full"></div>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
