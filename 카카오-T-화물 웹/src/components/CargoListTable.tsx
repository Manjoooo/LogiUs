import React, { useState } from 'react';
import { CargoItem } from '../types';

interface CargoListTableProps {
  shipments: CargoItem[];
  onSelectCargo: (cargo: CargoItem) => void;
}

export const CargoListTable: React.FC<CargoListTableProps> = ({ shipments, onSelectCargo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('전체');

  const filtered = shipments.filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      if (filterStatus === '전체') return true;
      return item.status === filterStatus;
    }

    const matchesSearch =
      item.code.toLowerCase().includes(term) ||
      item.title.toLowerCase().includes(term) ||
      item.destination.centerName.toLowerCase().includes(term) ||
      item.destination.address.toLowerCase().includes(term) ||
      item.currentLocation.name.toLowerCase().includes(term) ||
      item.driverName.toLowerCase().includes(term) ||
      item.vehicleNumber.toLowerCase().includes(term);

    if (filterStatus === '전체') return matchesSearch;
    return matchesSearch && item.status === filterStatus;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner & Stats */}
      <div className="bg-white rounded-2xl p-6 border border-[#e8e8ea] shadow-xs flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-[#1a1c1d] tracking-tight">전체 화물 운송 현황</h2>
          <p className="text-[13px] text-[#5f5e5e] mt-1">
            현재 관제 중인 총 <span className="font-bold text-[#1a1c1d]">{shipments.length}</span>건의 화물 운송건 내역입니다.
          </p>
        </div>

        <div className="flex gap-2 text-[12px]">
          <div className="bg-[#fee500]/20 border border-[#fee500] px-3.5 py-2 rounded-xl text-[#1a1c1d] font-bold">
            운행 중 {shipments.filter((s) => s.status === '운행 중').length}건
          </div>
          <div className="bg-[#25a55f]/10 border border-[#25a55f]/30 px-3.5 py-2 rounded-xl text-[#25a55f] font-bold">
            완료 {shipments.filter((s) => s.status === '운송 완료').length}건
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-[#eeeeef] p-1 rounded-xl overflow-x-auto hide-scrollbar">
            {['전체', '운행 중', '상차 완료', '운송 완료'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`px-3.5 py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-all ${
                  filterStatus === tab
                    ? 'bg-white text-[#1a1c1d] shadow-xs'
                    : 'text-[#5f5e5e] hover:text-[#1a1c1d]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Instant Search Bar */}
          <div className="relative flex-1 md:max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7c775f] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="화물 코드(KA-1025) 또는 목적지 이름(용인 메가허브) 검색"
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#cdc7aa]/60 rounded-xl text-[13px] font-medium placeholder-[#7c775f]/70 focus:outline-hidden focus:ring-2 focus:ring-[#fee500] focus:border-[#fee500] transition-all shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7c775f] hover:text-[#1a1c1d] rounded-full hover:bg-[#eeeeef] transition-colors"
                title="검색어 지우기"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Search Tag Suggestions */}
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#5f5e5e]">
          <span className="font-semibold text-[#1a1c1d] flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#6a5f00]">bolt</span>
            빠른 키워드:
          </span>
          {['KA-1025', 'KA-1024', '용인 메가허브', '부산 신항', '세종'].map((keyword) => (
            <button
              key={keyword}
              onClick={() => setSearchTerm(keyword)}
              className={`px-2.5 py-1 rounded-md transition-all text-[11px] font-semibold border ${
                searchTerm === keyword
                  ? 'bg-[#1a1c1d] text-[#fee500] border-[#1a1c1d]'
                  : 'bg-white hover:bg-[#f3f3f4] text-[#4b4732] border-[#e8e8ea]'
              }`}
            >
              #{keyword}
            </button>
          ))}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#f04452] underline text-[11px] font-semibold ml-1"
            >
              초기화
            </button>
          )}
        </div>
      </div>

      {/* Results Count Summary */}
      {searchTerm && (
        <div className="text-[13px] text-[#5f5e5e] flex items-center justify-between">
          <p>
            '<strong className="text-[#1a1c1d]">{searchTerm}</strong>' 검색 결과:{' '}
            <strong className="text-[#6a5f00] font-bold">{filtered.length}건</strong>
          </p>
        </div>
      )}

      {/* Cargo Items Grid / Empty State */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e8e8ea] p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-[#eeeeef] rounded-full flex items-center justify-center mx-auto text-[#7c775f]">
            <span className="material-symbols-outlined text-[28px]">search_off</span>
          </div>
          <h3 className="text-[16px] font-bold text-[#1a1c1d]">검색 조건과 일치하는 화물이 없습니다.</h3>
          <p className="text-[13px] text-[#5f5e5e]">
            화물 코드(예: KA-1025) 또는 목적지 이름(예: 용인 메가허브)을 확인해 주세요.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('전체');
            }}
            className="mt-2 px-4 py-2 bg-[#fee500] text-[#1a1c1d] font-bold rounded-xl text-[13px] hover:bg-[#f2db00] transition-colors"
          >
            모든 필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCargo(item)}
              className="bg-white rounded-2xl border border-[#e8e8ea] hover:border-[#fee500] p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Badges */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#f3f3f4] rounded-full text-[11px] font-bold text-[#4b4732] group-hover:bg-[#fee500]/30 transition-colors">
                      {item.code}
                    </span>
                    {item.isTrusted && (
                      <span className="px-2.5 py-1 bg-[#25A55F]/10 text-[#25A55F] rounded-full text-[11px] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">verified</span> 신뢰 화물
                      </span>
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      item.status === '운행 중'
                        ? 'bg-[#fee500] text-[#1a1c1d]'
                        : item.status === '운송 완료'
                        ? 'bg-[#25a55f] text-white'
                        : 'bg-[#eeeeef] text-[#5f5e5e]'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-bold text-[#1a1c1d] group-hover:text-[#6a5f00] transition-colors mb-2 line-clamp-1">
                  {item.title}
                </h3>

                {/* Destination & Current Location Info */}
                <div className="text-[12px] text-[#5f5e5e] space-y-1.5 mb-4 bg-[#f9f9fa] p-3 rounded-xl border border-[#eeeeef]">
                  <p className="flex items-center justify-between font-semibold text-[#1a1c1d]">
                    <span className="flex items-center gap-1 text-[#006d3a]">
                      <span className="material-symbols-outlined text-[16px]">warehouse</span>
                      목적지:
                    </span>
                    <span className="text-[#1a1c1d] bg-white px-2 py-0.5 rounded border border-[#e8e8ea] text-[11px]">
                      {item.destination.centerName}
                    </span>
                  </p>
                  <p className="flex items-center gap-1.5 font-medium text-[#1a1c1d] pt-1 border-t border-[#eeeeef]">
                    <span className="material-symbols-outlined text-[15px] text-[#7c775f]">location_on</span>
                    <span>현재: {item.currentLocation.name}</span>
                  </p>
                </div>
              </div>

              {/* Driver & Footer */}
              <div className="pt-3 border-t border-[#eeeeef] flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1a1c1d]">{item.driverName}</span>
                  <span className="text-[#7c775f]">({item.vehicleType})</span>
                </div>
                <span className="text-[#2563eb] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  상세보기
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
