import React, { useState } from 'react';
import { AdminMode, DispatchOrder } from '../types';

interface DashboardViewProps {
  dispatches: DispatchOrder[];
  onNavigateMode: (mode: AdminMode) => void;
  onSelectOrder?: (orderId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  dispatches,
  onNavigateMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderModal, setSelectedOrderModal] = useState<DispatchOrder | null>(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F4F4F6] font-sans">
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Top 4 KPI Cards Grid (Matches Image 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: 운송 중 */}
          <div
            onClick={() => onNavigateMode('realtime')}
            className="bg-white rounded-2xl p-5 border border-[#E5E5E8] shadow-xs flex flex-col justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-700">운송 중</span>
              <div className="w-9 h-9 rounded-full bg-[#FFFDE7] flex items-center justify-center text-amber-700">
                <span className="material-symbols-outlined text-lg">local_shipping</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#191919]">24</span>
              <span className="text-sm font-bold text-gray-500">건</span>
            </div>
          </div>

          {/* Card 2: 지연 발생 */}
          <div
            onClick={() => onNavigateMode('issues')}
            className="bg-white rounded-2xl p-5 border border-[#E5E5E8] shadow-xs flex flex-col justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-700">지연 발생</span>
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <span className="material-symbols-outlined text-lg">timer</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-red-600">3</span>
              <span className="text-sm font-bold text-gray-500">건</span>
            </div>
          </div>

          {/* Card 3: 긴급 이슈 */}
          <div
            onClick={() => onNavigateMode('issues')}
            className="bg-white rounded-2xl p-5 border border-red-200 shadow-xs flex flex-col justify-between hover:shadow-md transition cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-red-600">긴급 이슈</span>
              <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <span className="material-symbols-outlined text-lg">warning</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-red-600">1</span>
              <span className="text-sm font-bold text-gray-500">건</span>
            </div>
          </div>

          {/* Card 4: 정시 도착률 */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E5E8] shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-700">정시 도착률</span>
              <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#191919]">91</span>
              <span className="text-sm font-bold text-gray-500">%</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '91%' }}></div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: 실시간 이슈 패널 (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E5E5E8] p-5 shadow-xs flex flex-col space-y-4">
            {/* Panel Header */}
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500 text-lg">notifications</span>
                <h3 className="font-bold text-base text-[#191919]">실시간 이슈 패널</h3>
              </div>
              <span className="bg-red-100 text-red-600 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                4건
              </span>
            </div>

            {/* Issue Card 1 (KA-1025) */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white relative hover:border-red-300 transition">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-red-100 text-red-700 font-bold text-[11px] px-2 py-0.5 rounded">
                  지연 경고 (+35분)
                </span>
                <span className="text-xs text-gray-400">방금 전</span>
              </div>
              <h4 className="font-extrabold text-sm text-[#191919] mb-1">KA-1025 배차 지연 발생</h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                인천 남동에서 용인 처인으로 이동 중인 차량이 심각한 교통 정체로 지연되고 있습니다.
              </p>
              <div className="bg-gray-50 p-2.5 rounded-lg flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5 text-gray-700">
                  <span className="material-symbols-outlined text-sm text-gray-500">person</span>
                  <span className="font-bold">김철수 (5톤 카고)</span>
                </div>
                <button
                  onClick={() => onNavigateMode('realtime')}
                  className="font-bold text-gray-800 hover:text-black hover:underline text-xs"
                >
                  상세보기
                </button>
              </div>
            </div>

            {/* Issue Card 2 (KA-1042) */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white hover:border-amber-300 transition">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-amber-100 text-amber-800 font-bold text-[11px] px-2 py-0.5 rounded">
                  경로 이탈 의심
                </span>
                <span className="text-xs text-gray-400">15분 전</span>
              </div>
              <h4 className="font-extrabold text-sm text-[#191919] mb-1">KA-1042 지정 경로 이탈</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                GPS 신호가 지정된 고속도로를 벗어난 것으로 확인됩니다.
              </p>
            </div>

            {/* Map Preview Card */}
            <div
              onClick={() => onNavigateMode('realtime')}
              className="rounded-xl overflow-hidden border border-gray-200 relative h-36 cursor-pointer group shadow-xs"
            >
              <div
                className="w-full h-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUjmeO4iGb484selfg6t9lJzPJ8aI30mytCdvMpBNW1HBOzLkXoUDCh29vgul5E35DN8RnDXppbsb2xFijpo0ul9n2jLX9OVRV67IanH3jmlsSyyRee-563YVZmXyFgDDd7CstjC3HeDl82KYe8ql1SUosUAjBsW0gKIHQobl9fi7-uAFnyH4y-l8wnZGnAzqBOpJ7TCrODNvUjorM40re9McRnrgiGKb5VNNid48qV966pV49KQCK')",
                }}
              ></div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-bold text-gray-900 border border-gray-200 shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>실시간 관제 맵</span>
              </div>
            </div>
          </div>

          {/* Right Column: 실시간 운송 목록 (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E5E8] p-5 shadow-xs flex flex-col space-y-4">
            {/* Table Header Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
              <h3 className="font-bold text-base text-[#191919]">실시간 운송 목록</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="오더번호, 차주 검색"
                    className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-400 w-44 sm:w-52"
                  />
                </div>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  <span>필터</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold bg-gray-50/80">
                    <th className="py-3 px-3">오더 번호</th>
                    <th className="py-3 px-3">차주 / 차량</th>
                    <th className="py-3 px-3">출발지 → 도착지</th>
                    <th className="py-3 px-3">상태</th>
                    <th className="py-3 px-3">ETA (지연)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Row 1: KA-1025 */}
                  <tr
                    onClick={() => onNavigateMode('realtime')}
                    className="hover:bg-yellow-50/40 transition cursor-pointer font-medium"
                  >
                    <td className="py-3.5 px-3 font-extrabold text-[#191919]">KA-1025</td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#191919]">김철수</span>
                        <span className="bg-gray-100 text-gray-600 text-[11px] px-1.5 py-0.5 rounded border border-gray-200">
                          5톤 카고
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-gray-800">
                      인천 남동 <span className="text-gray-400 mx-1">→</span> <span className="font-bold text-black">용인 처인</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="bg-[#FEE500] text-black font-extrabold text-[11px] px-2.5 py-1 rounded-full">
                        운송 중
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#191919]">15:10</span>
                        <span className="bg-red-100 text-red-600 font-bold text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[10px]">trending_up</span>
                          +35분
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Row 2: KA-1026 */}
                  <tr
                    onClick={() => onNavigateMode('realtime')}
                    className="hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-3 font-bold text-[#191919]">KA-1026</td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#191919]">이영희</span>
                        <span className="bg-gray-100 text-gray-600 text-[11px] px-1.5 py-0.5 rounded border border-gray-200">
                          11톤 윙바디
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-gray-800">
                      경기 평택 <span className="text-gray-400 mx-1">→</span> 부산 강서
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="bg-[#FEE500] text-black font-extrabold text-[11px] px-2.5 py-1 rounded-full">
                        운송 중
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-[#191919]">18:30</td>
                  </tr>

                  {/* Row 3: KA-1027 */}
                  <tr
                    onClick={() => onNavigateMode('realtime')}
                    className="hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-3 font-bold text-[#191919]">KA-1027</td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#191919]">박지민</span>
                        <span className="bg-gray-100 text-gray-600 text-[11px] px-1.5 py-0.5 rounded border border-gray-200">
                          1톤 탑차
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-gray-800">
                      서울 마포 <span className="text-gray-400 mx-1">→</span> 서울 강남
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="bg-gray-200 text-gray-700 font-bold text-[11px] px-2.5 py-1 rounded-full">
                        상차 대기
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-gray-400">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
