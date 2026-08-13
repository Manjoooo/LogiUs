import React, { useState, useEffect } from 'react';
import { AnalyticsSummary } from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Download, 
  Printer, 
  DollarSign, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return <div className="p-12 text-center text-gray-400">통계 데이터를 불러오는 중입니다...</div>;
  }

  const { summary, weeklyVolume } = data;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-yellow-600" />
            운송 통계 & 전자 세금계산서 정산 센터
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            주간 물류 적재 톤수, 운임 매출 분석 및 국세청 자동 연동 세금계산서 발행 내역
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => alert('월간 물류 리포트 PDF 다운로드가 시작되었습니다.')}
            className="bg-black text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-gray-800 transition flex items-center gap-1.5 shadow"
          >
            <Download className="w-4 h-4 text-[#FEE500]" />
            <span>종합 리포트 PDF 다운로드</span>
          </button>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly Freight Volume Chart */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FEE500]" />
              주간 화물 물동량 추이 (톤)
            </h3>
            <span className="text-xs text-gray-400 font-medium">단위: Ton</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyVolume}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#191919', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} 톤`, '물동량']}
                />
                <Bar dataKey="volumeTons" fill="#FEE500" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Revenue Line Chart */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              일자별 운송 매출액 (원)
            </h3>
            <span className="text-xs text-gray-400 font-medium">단위: KRW</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyVolume}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#191919', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                  formatter={(val: any) => [`${val.toLocaleString()} 원`, '매출액']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Tax Invoices Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-700" />
            전자 세금계산서 발행 및 국세청 승인 목록
          </h3>
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 국세청(NTS) 전송 완료
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">승인번호</th>
                <th className="px-4 py-3">공급받는 자 (화주)</th>
                <th className="px-4 py-3">공급가액</th>
                <th className="px-4 py-3">부가가치세 (10%)</th>
                <th className="px-4 py-3">총 합계금액</th>
                <th className="px-4 py-3">발행일자</th>
                <th className="px-4 py-3 text-right">인쇄 / 출력</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { id: '20260813-4100-9812-001', name: '(주)CJ대한통운 이천센터', price: 409091, vat: 40909, total: 450000, date: '2026-08-13' },
                { id: '20260813-4100-9812-002', name: '삼성SDI 평택사업장', price: 254545, vat: 25455, total: 280000, date: '2026-08-13' },
                { id: '20260813-4100-9812-003', name: '현대글로비스 의왕ICD', price: 445455, vat: 44545, total: 490000, date: '2026-08-13' }
              ].map(tax => (
                <tr key={tax.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-mono font-bold text-gray-900">{tax.id}</td>
                  <td className="px-4 py-3 font-bold text-gray-900">{tax.name}</td>
                  <td className="px-4 py-3 text-gray-700">{tax.price.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-gray-700">{tax.vat.toLocaleString()}원</td>
                  <td className="px-4 py-3 font-bold text-gray-900">{tax.total.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-gray-500">{tax.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => alert(`승인번호 ${tax.id} 세금계산서 인쇄 서식이 준비되었습니다.`)}
                      className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition"
                    >
                      <Printer className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
