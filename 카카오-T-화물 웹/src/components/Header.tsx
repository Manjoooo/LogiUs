import React, { useState } from 'react';
import { NotificationItem } from '../types';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  onOpenMobileSidebar: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onOpenHelpModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  showBack = true,
  onOpenMobileSidebar,
  notifications,
  onMarkNotificationRead,
  onOpenHelpModal,
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 h-[64px] bg-[#f9f9fa]/90 backdrop-blur-md border-b border-[#cdc7aa]/30 px-4 md:px-8 flex items-center justify-between">
      {/* Left controls */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-full hover:bg-[#eeeeef] text-[#1a1c1d] transition-colors"
          title="메뉴 열기"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        {showBack && onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-[#eeeeef] text-[#1a1c1d] transition-colors flex items-center justify-center"
            title="뒤로가기"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
        )}

        <h2 className="text-[18px] font-semibold text-[#1a1c1d] tracking-tight">{title}</h2>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative p-2 rounded-full hover:bg-[#eeeeef] text-[#1a1c1d] transition-colors focus:outline-hidden"
            title="알림"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#f04452] ring-2 ring-white animate-pulse" />
            )}
          </button>

          {showNotifMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#cdc7aa]/40 z-50 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#eeeeef]">
                  <h4 className="font-semibold text-[15px] text-[#1a1c1d] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#25A55F]">notifications</span>
                    실시간 관제 알림
                  </h4>
                  <span className="text-[12px] bg-[#fee500] text-[#1a1c1d] px-2 py-0.5 rounded-full font-bold">
                    {unreadCount}개 안읽음
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1 hide-scrollbar">
                  {notifications.length === 0 ? (
                    <p className="text-[13px] text-[#5f5e5e] text-center py-6">새로운 알림이 없습니다.</p>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onMarkNotificationRead(item.id)}
                        className={`p-3 rounded-xl cursor-pointer transition-colors text-left border ${
                          item.read
                            ? 'bg-[#f9f9fa] border-transparent opacity-75'
                            : 'bg-[#fffdf0] border-[#fee500]/60'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-[13px] text-[#1a1c1d] flex items-center gap-1.5">
                            {item.type === 'delay' && <span className="material-symbols-outlined text-[16px] text-[#f04452]">warning</span>}
                            {item.type === 'dock' && <span className="material-symbols-outlined text-[16px] text-[#6a5f00]">warehouse</span>}
                            {item.type === 'status' && <span className="material-symbols-outlined text-[16px] text-[#25a55f]">check_circle</span>}
                            {item.title}
                          </span>
                          <span className="text-[11px] text-[#7c775f]">{item.time}</span>
                        </div>
                        <p className="text-[12px] text-[#4b4732] leading-snug">{item.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Help Button */}
        <button
          onClick={onOpenHelpModal}
          className="p-2 rounded-full hover:bg-[#eeeeef] text-[#1a1c1d] transition-colors"
          title="도움말 및 안내"
        >
          <span className="material-symbols-outlined text-[22px]">help_outline</span>
        </button>
      </div>
    </header>
  );
};
