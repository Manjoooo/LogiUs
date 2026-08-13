import React from 'react';
import { AdminMode } from '../types';

interface AdminHeaderProps {
  currentMode: AdminMode;
  title: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
  return (
    <header className="fixed top-0 right-0 left-[220px] h-[56px] bg-[#F8F8F8] border-b border-[#E0E0E0] flex items-center justify-between px-6 z-30 font-sans">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-base font-bold text-[#191919] tracking-tight">{title}</h1>
      </div>

      {/* Right Utility Bar */}
      <div className="flex items-center gap-3 text-[#424242]">
        {/* Notifications */}
        <button className="p-1.5 hover:bg-gray-200 rounded-full transition relative">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Help */}
        <button className="p-1.5 hover:bg-gray-200 rounded-full transition">
          <span className="material-symbols-outlined text-xl">help_outline</span>
        </button>

        <div className="w-px h-4 bg-gray-300 mx-1"></div>

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200/60 px-2 py-1 rounded-lg transition">
          <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-xs font-bold overflow-hidden border border-gray-400">
            <span className="material-symbols-outlined text-lg">person</span>
          </div>
          <span className="text-xs font-bold text-[#191919]">관리자 님</span>
          <span className="material-symbols-outlined text-sm text-gray-500">expand_more</span>
        </div>
      </div>
    </header>
  );
};
