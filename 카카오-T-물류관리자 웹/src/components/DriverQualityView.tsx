import React from 'react';

export const DriverQualityView: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F4F4F6] font-sans">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="bg-white border border-[#E5E5E8] rounded-2xl p-5 shadow-xs flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black text-[#191919]">차주 내부 관리 & 등급 평가</h2>
            <p className="text-xs text-gray-500 mt-1">
              정시 준수율, 사고/지연 발생률, 화주 평가점수를 기반으로 한 차주 우수/리스크 관리
            </p>
          </div>
          <button className="px-4 py-2 bg-[#FEE500] text-black font-extrabold text-xs rounded-xl shadow-xs hover:bg-yellow-400 transition">
            + 우수 차주 인센티브 지급
          </button>
        </div>

        <div className="bg-white border border-[#E5E5E8] rounded-2xl p-5 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-bold bg-gray-50">
                <th className="py-3 px-3">차주명 / 차량</th>
                <th className="py-3 px-3">연락처</th>
                <th className="py-3 px-3">누적 운송</th>
                <th className="py-3 px-3">정시 준수율</th>
                <th className="py-3 px-3">평가 점수</th>
                <th className="py-3 px-3">상태</th>
                <th className="py-3 px-3">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              <tr>
                <td className="py-3.5 px-3">
                  <div className="font-bold text-gray-900">김철수 (KA-1025)</div>
                  <span className="text-[11px] text-gray-400">5톤 카고</span>
                </td>
                <td className="py-3.5 px-3 text-gray-600">010-3321-9081</td>
                <td className="py-3.5 px-3 font-bold text-gray-900">142건</td>
                <td className="py-3.5 px-3 font-bold text-emerald-600">96.8%</td>
                <td className="py-3.5 px-3 font-bold text-amber-500">★ 4.9 / 5.0</td>
                <td className="py-3.5 px-3">
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2 py-0.5 rounded">
                    우수 차주 (S)
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 font-bold rounded-lg hover:bg-gray-200">
                    상세보기
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-3">
                  <div className="font-bold text-gray-900">이영희 (KA-1026)</div>
                  <span className="text-[11px] text-gray-400">11톤 윙바디</span>
                </td>
                <td className="py-3.5 px-3 text-gray-600">010-8812-4401</td>
                <td className="py-3.5 px-3 font-bold text-gray-900">98건</td>
                <td className="py-3.5 px-3 font-bold text-emerald-600">94.2%</td>
                <td className="py-3.5 px-3 font-bold text-amber-500">★ 4.7 / 5.0</td>
                <td className="py-3.5 px-3">
                  <span className="bg-gray-100 text-gray-700 font-bold text-[11px] px-2 py-0.5 rounded">
                    일반 차주 (A)
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 font-bold rounded-lg hover:bg-gray-200">
                    상세보기
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
