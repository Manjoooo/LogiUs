import React from 'react';

interface SidebarProps {
  activeTab: 'realtime' | 'all';
  setActiveTab: (tab: 'realtime' | 'all') => void;
  activeShipmentCount: number;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  onOpenProfileModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeShipmentCount,
  isOpenMobile,
  setIsOpenMobile,
  onOpenProfileModal,
}) => {
  // User Avatar hotlinked image provided in template or high quality backup
  const avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDnlEtXVlmOav5ciXAVks3HYNQh8P-u4gWe9cck4Z3UdeTCO3mOMsDw2IomLG77EEpbAx_pdzIdFiAp425z_Zcm_fV2Xb8uFFNIg0yNCHeCcAUjT9ZD4EJmj7RxlIKKH4aeBQSg9DSvD4ogINsOqiEverbFp4dM6k0i82m22OUQZzEc0N0uU2WZgGFALQ8pAho_tZOTx1gn0H2i2-Q7v4gWrn7kpA4IMnrEAuNOt-HW1aNqjHh1THdJ";

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[240px] bg-[#f9f9fa] border-r border-[#cdc7aa]/40 z-50 flex flex-col justify-between py-6 transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="px-6 mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-[24px] font-bold text-[#1a1c1d] tracking-tight leading-none flex items-center gap-1.5">
                <span className="text-[#fee500] bg-[#1a1c1d] px-1.5 py-0.5 rounded text-[16px]">T</span>
                카카오 T 화물
              </h1>
              <p className="text-[12px] font-medium text-[#5f5e5e] mt-1.5">화주 전용 관제 시스템</p>
            </div>
            <button
              onClick={() => setIsOpenMobile(false)}
              className="md:hidden p-1.5 rounded-lg text-[#5f5e5e] hover:bg-black/5"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1">
            <button
              onClick={() => {
                setActiveTab('all');
                setIsOpenMobile(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-[14px] transition-all text-left ${
                activeTab === 'all'
                  ? 'bg-[#1a1c1d] text-white shadow-xs font-semibold'
                  : 'text-[#5f5e5e] hover:bg-[#e2e2e3]/60 hover:text-[#1a1c1d]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>전체 현황</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('realtime');
                setIsOpenMobile(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-[14px] transition-all text-left ${
                activeTab === 'realtime'
                  ? 'bg-[#fee500] text-[#1a1c1d] font-bold shadow-xs border border-[#fee500]'
                  : 'text-[#5f5e5e] hover:bg-[#e2e2e3]/60 hover:text-[#1a1c1d]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                <span>실시간 운송</span>
              </div>
              {activeShipmentCount > 0 && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    activeTab === 'realtime'
                      ? 'bg-[#1a1c1d] text-[#fee500]'
                      : 'bg-[#fee500] text-[#1a1c1d]'
                  }`}
                >
                  {activeShipmentCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* User Profile Card */}
        <div className="px-4">
          <button
            onClick={onOpenProfileModal}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#e2e2e3]/50 transition-colors border border-transparent hover:border-[#cdc7aa]/30 text-left"
          >
            <div className="w-10 h-10 rounded-full bg-[#eeeeef] overflow-hidden border border-[#cdc7aa]/50 shrink-0 shadow-xs">
              <img
                src={avatarUrl}
                alt="김카카오 화주 Avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-[#1a1c1d] truncate">김카카오 화주</p>
              <p className="text-[12px] text-[#5f5e5e]">내 정보 및 설정</p>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#7c775f]">chevron_right</span>
          </button>
        </div>
      </aside>
    </>
  );
};
