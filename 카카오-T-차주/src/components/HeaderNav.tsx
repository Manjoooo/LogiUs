import React from 'react';
import { NavigationTab } from '../types';
import { HOTLINK_IMAGES } from '../data/mockData';

interface HeaderNavProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  activeOrderCode?: string;
  onOpenProfile?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTab,
  onSelectTab,
  activeOrderCode,
  onOpenProfile,
}) => {
  return (
    <>
      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex flex-col py-8 bg-[#f9f9fa] text-[#1a1c1d] w-[240px] h-screen fixed left-0 top-0 border-r border-[#cdc7aa] z-50">
        <div className="px-6 mb-8 cursor-pointer" onClick={() => onSelectTab('home')}>
          <h1 className="text-2xl font-bold text-[#1a1c1d]">카카오 T 화물</h1>
          <p className="text-[#5f5e5e] text-sm mt-1">물류 관제 &amp; 드라이버</p>
        </div>

        <ul className="flex flex-col gap-2 px-4 flex-1">
          <li>
            <button
              onClick={() => onSelectTab('home')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left font-bold text-sm transition-all ${
                currentTab === 'home'
                  ? 'bg-[#fee500]/20 text-[#6a5f00] font-extrabold border-r-4 border-[#6a5f00]'
                  : 'text-[#5f5e5e] hover:bg-[#eeeeef] hover:text-[#1a1c1d]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0" style={{ fontVariationSettings: currentTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}>
                dashboard
              </span>
              <span className="text-sm font-bold whitespace-nowrap leading-none">관제 현황 (홈)</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectTab('transit')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left font-bold text-sm transition-all ${
                currentTab === 'transit'
                  ? 'bg-[#fee500]/20 text-[#6a5f00] font-extrabold border-r-4 border-[#6a5f00]'
                  : 'text-[#5f5e5e] hover:bg-[#eeeeef] hover:text-[#1a1c1d]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0" style={{ fontVariationSettings: currentTab === 'transit' ? "'FILL' 1" : "'FILL' 0" }}>
                local_shipping
              </span>
              <span className="text-sm font-bold whitespace-nowrap leading-none">실시간 운송</span>
              {activeOrderCode && (
                <span className="ml-auto text-[10px] bg-[#006d3a] text-white px-2 py-0.5 rounded-full font-bold shrink-0">
                  운행중
                </span>
              )}
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectTab('radar')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left font-bold text-sm transition-all ${
                currentTab === 'radar'
                  ? 'bg-[#fee500]/20 text-[#6a5f00] font-extrabold border-r-4 border-[#6a5f00]'
                  : 'text-[#5f5e5e] hover:bg-[#eeeeef] hover:text-[#1a1c1d]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0" style={{ fontVariationSettings: currentTab === 'radar' ? "'FILL' 1" : "'FILL' 0" }}>
                radar
              </span>
              <span className="text-sm font-bold whitespace-nowrap leading-none">현장 Radar</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectTab('tcheck')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left font-bold text-sm transition-all ${
                currentTab === 'tcheck'
                  ? 'bg-[#fee500]/20 text-[#6a5f00] font-extrabold border-r-4 border-[#6a5f00]'
                  : 'text-[#5f5e5e] hover:bg-[#eeeeef] hover:text-[#1a1c1d]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0" style={{ fontVariationSettings: currentTab === 'tcheck' ? "'FILL' 1" : "'FILL' 0" }}>
                verified_user
              </span>
              <span className="text-sm font-bold whitespace-nowrap leading-none">T-Check 관리</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectTab('my')}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left font-bold text-sm transition-all ${
                currentTab === 'my'
                  ? 'bg-[#fee500]/20 text-[#6a5f00] font-extrabold border-r-4 border-[#6a5f00]'
                  : 'text-[#5f5e5e] hover:bg-[#eeeeef] hover:text-[#1a1c1d]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0" style={{ fontVariationSettings: currentTab === 'my' ? "'FILL' 1" : "'FILL' 0" }}>
                person
              </span>
              <span className="text-sm font-bold whitespace-nowrap leading-none">마이페이지</span>
            </button>
          </li>
        </ul>

        {/* Quick Driver Badge in Sidebar Footer */}
        <div className="px-4 pt-4 border-t border-[#cdc7aa]">
          <div
            onClick={() => onSelectTab('my')}
            className="flex items-center gap-3 p-2 rounded-lg bg-[#eeeeef] hover:bg-[#e8e8e9] cursor-pointer transition-colors"
          >
            <img
              src={HOTLINK_IMAGES.driverProfile}
              alt="Driver Profile"
              className="w-10 h-10 rounded-full object-cover border border-[#cdc7aa]"
            />
            <div className="text-left overflow-hidden">
              <p className="text-sm font-bold text-[#1a1c1d] truncate">김철수 기사님</p>
              <p className="text-xs text-[#5f5e5e]">5톤 카고 • 안전운행중</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-[#f9f9fa] border-b border-[#cdc7aa] h-[60px] px-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('home')}>
          <h2 className="text-lg font-bold text-[#1a1c1d]">카카오 T 화물</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTab('radar')}
            title="현장 Radar"
            className="p-2 text-[#4b4732] hover:bg-[#eeeeef] rounded-full transition-colors relative"
          >
            <span className="material-symbols-outlined text-[22px]">radar</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          </button>

          <button
            onClick={() => onSelectTab('tcheck')}
            title="T-Check 안내"
            className="p-2 text-[#4b4732] hover:bg-[#eeeeef] rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">help_outline</span>
          </button>

          <button
            onClick={() => onSelectTab('my')}
            className="ml-1 w-8 h-8 rounded-full overflow-hidden border border-[#cdc7aa] focus:ring-2 ring-[#6a5f00]"
          >
            <img
              src={HOTLINK_IMAGES.driverProfile}
              alt="Driver Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 bg-[#f9f9fa]/95 backdrop-blur-md border-t border-[#cdc7aa] z-50 h-[64px] shadow-lg">
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all min-w-[64px] ${
            currentTab === 'home'
              ? 'bg-[#fee500] text-[#1a1c1d] font-black shadow-xs'
              : 'text-[#5f5e5e] font-semibold hover:text-[#1a1c1d]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px] leading-none" style={{ fontVariationSettings: currentTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}>
            home
          </span>
          <span className="text-[11px] font-bold mt-1 leading-none whitespace-nowrap">홈</span>
        </button>

        <button
          onClick={() => onSelectTab('freight')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all min-w-[64px] ${
            currentTab === 'freight'
              ? 'bg-[#fee500] text-[#1a1c1d] font-black shadow-xs'
              : 'text-[#5f5e5e] font-semibold hover:text-[#1a1c1d]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px] leading-none" style={{ fontVariationSettings: currentTab === 'freight' ? "'FILL' 1" : "'FILL' 0" }}>
            local_shipping
          </span>
          <span className="text-[11px] font-bold mt-1 leading-none whitespace-nowrap">화물</span>
        </button>

        <button
          onClick={() => onSelectTab('transit')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative min-w-[68px] ${
            currentTab === 'transit'
              ? 'bg-[#fee500] text-[#1a1c1d] font-black shadow-xs'
              : 'text-[#5f5e5e] font-semibold hover:text-[#1a1c1d]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px] leading-none" style={{ fontVariationSettings: currentTab === 'transit' ? "'FILL' 1" : "'FILL' 0" }}>
            navigation
          </span>
          <span className="text-[11px] font-bold mt-1 leading-none whitespace-nowrap">실시간 운송</span>
          {activeOrderCode && (
            <span className="absolute top-1 right-2 w-2 h-2 bg-[#006d3a] rounded-full ring-2 ring-white" />
          )}
        </button>

        <button
          onClick={() => onSelectTab('my')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all min-w-[64px] ${
            currentTab === 'my'
              ? 'bg-[#fee500] text-[#1a1c1d] font-black shadow-xs'
              : 'text-[#5f5e5e] font-semibold hover:text-[#1a1c1d]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px] leading-none" style={{ fontVariationSettings: currentTab === 'my' ? "'FILL' 1" : "'FILL' 0" }}>
            person
          </span>
          <span className="text-[11px] font-bold mt-1 leading-none whitespace-nowrap">마이</span>
        </button>
      </nav>
    </>
  );
};
