import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  ComposedChart
} from 'recharts';

// Color definitions
const COLORS = ['#FEE500', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'];

export const ReportsView: React.FC = () => {
  // Filter States
  const [selectedPeriod, setSelectedPeriod] = useState<'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY'>('MONTHLY');
  const [selectedCenter, setSelectedCenter] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'ROUTE' | 'CENTER' | 'SHIPPER'>('ROUTE');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 1. Chart Data: Volume & On-time Trend (Composed)
  const volumeTrendData = [
    { period: '1주차', volumeTons: 3200, onTimeRate: 94.2, delayCount: 18 },
    { period: '2주차', volumeTons: 3650, onTimeRate: 95.8, delayCount: 14 },
    { period: '3주차', volumeTons: 4100, onTimeRate: 97.1, delayCount: 9 },
    { period: '4주차', volumeTons: 3330, onTimeRate: 96.5, delayCount: 11 },
  ];

  // 2. Chart Data: Logistics Center Comparison
  const centerPerformanceData = [
    { name: '용인 센터', totalDocks: 8, totalTrucks: 1420, waitTimeMin: 18, occupancyPct: 78, tcheckPassPct: 98.2 },
    { name: '인천 남동', totalDocks: 6, totalTrucks: 1850, waitTimeMin: 12, occupancyPct: 84, tcheckPassPct: 99.1 },
    { name: '의왕 ICD', totalDocks: 10, totalTrucks: 2100, waitTimeMin: 24, occupancyPct: 89, tcheckPassPct: 96.5 },
    { name: '평택 항만', totalDocks: 8, totalTrucks: 980, waitTimeMin: 10, occupancyPct: 62, tcheckPassPct: 99.4 },
    { name: '부산 신항', totalDocks: 12, totalTrucks: 2850, waitTimeMin: 29, occupancyPct: 92, tcheckPassPct: 95.8 },
  ];

  // 3. Chart Data: Vehicle Type Distribution (Pie Chart)
  const truckTypeDistribution = [
    { name: '11톤 윙바디', value: 42, count: 610, fill: '#191919' },
    { name: '25톤 트레일러', value: 28, count: 405, fill: '#FEE500' },
    { name: '5톤 카고', value: 18, count: 260, fill: '#10B981' },
    { name: '1톤/2.5톤 탑차', value: 12, count: 175, fill: '#3B82F6' },
  ];

  // 4. Chart Data: Peak Time Congestion (Hourly Area Chart)
  const hourlyPeakData = [
    { hour: '06시', inbound: 12, dockOccupancy: 25 },
    { hour: '08시', inbound: 45, dockOccupancy: 68 },
    { hour: '10시', inbound: 88, dockOccupancy: 94 },
    { hour: '12시', inbound: 52, dockOccupancy: 75 },
    { hour: '14시', inbound: 95, dockOccupancy: 98 },
    { hour: '16시', inbound: 70, dockOccupancy: 82 },
    { hour: '18시', inbound: 38, dockOccupancy: 50 },
    { hour: '20시', inbound: 15, dockOccupancy: 28 },
  ];

  // Table Data 1: Major Routes Analytics
  const routeReportData = [
    {
      route: '인천 남동구 ➔ 용인 처인구',
      distance: '68 km',
      monthlyVolume: '3,450 톤',
      avgLeadTime: '1시간 25분',
      onTimeRate: '92.4%',
      avgDelayMin: '+22 분',
      primaryDelayFactor: '서해안고속도로 IC 정체 & 도크 접안 대기',
      riskLevel: 'WARNING',
      action: '14시 피크 타임 분산 배차 필요',
    },
    {
      route: '경기 평택 ➔ 부산 강서구',
      distance: '380 km',
      monthlyVolume: '4,800 톤',
      avgLeadTime: '4시간 50분',
      onTimeRate: '98.1%',
      avgDelayMin: '+4 분',
      primaryDelayFactor: '정시 준수 양호 (경부고속도로 원활)',
      riskLevel: 'STABLE',
      action: '현행 스마트 Geofence 유지',
    },
    {
      route: '시흥 IC ➔ 의왕 ICD 터미널',
      distance: '32 km',
      monthlyVolume: '2,900 톤',
      avgLeadTime: '45분',
      onTimeRate: '89.5%',
      avgDelayMin: '+28 분',
      primaryDelayFactor: '의왕ICD 게이트 하차 적체 & 계근대 병목',
      riskLevel: 'ALERT',
      action: 'T-Check 사전 자동 계근 연동 확대',
    },
    {
      route: '수원 IC ➔ 부산 신항 센터',
      distance: '395 km',
      monthlyVolume: '3,100 톤',
      avgLeadTime: '5시간 10분',
      onTimeRate: '97.4%',
      avgDelayMin: '+6 분',
      primaryDelayFactor: '심야 운송 정시성 우수',
      riskLevel: 'STABLE',
      action: '야간 차주 인센티브 유지',
    },
    {
      route: '이천 물류센터 ➔ 인천 남동공단',
      distance: '85 km',
      monthlyVolume: '1,820 톤',
      avgLeadTime: '1시간 40분',
      onTimeRate: '95.0%',
      avgDelayMin: '+11 분',
      primaryDelayFactor: '영동고속도로 공사 구간 속도 제한',
      riskLevel: 'STABLE',
      action: '우회 경로 맵스 가이드 전송',
    },
  ];

  // Table Data 2: Center Dock Efficiency Table
  const centerReportData = [
    {
      center: '용인 물류센터',
      docks: '8개',
      truckCount: '1,420대',
      onTimeRate: '96.2%',
      tcheckPassPct: '98.2%',
      dwellTime: '18.2분',
      bottleneck: '상온식품 도크(D01~D03) 피크타임 접안 쏠림',
    },
    {
      center: '인천 남동 물류센터',
      docks: '6개',
      truckCount: '1,850대',
      onTimeRate: '98.5%',
      tcheckPassPct: '99.1%',
      dwellTime: '12.4분',
      bottleneck: '단거리 5톤 차량 입출차 빈도 높음',
    },
    {
      center: '의왕 ICD 물류센터',
      docks: '10개',
      truckCount: '2,100대',
      onTimeRate: '91.8%',
      tcheckPassPct: '96.5%',
      dwellTime: '24.5분',
      bottleneck: '컨테이너 계근 및 과적 AI 비전 재검수 다수',
    },
    {
      center: '평택 항만 물류센터',
      docks: '8개',
      truckCount: '980대',
      onTimeRate: '99.0%',
      tcheckPassPct: '99.4%',
      dwellTime: '10.1분',
      bottleneck: '항만 하선 시간대 연동 대기발생',
    },
    {
      center: '부산 신항 물류센터',
      docks: '12개',
      truckCount: '2,850대',
      onTimeRate: '94.8%',
      tcheckPassPct: '95.8%',
      dwellTime: '29.0분',
      bottleneck: '25톤 트레일러 대형 차량 회차 공간 부족',
    },
  ];

  // Table Data 3: Corporate Shippers Performance Table
  const shipperReportData = [
    {
      shipper: '(주)쿠팡 로지스틱스',
      monthlyOrders: '420건',
      volumeTons: '3,850톤',
      onTimeRate: '97.8%',
      totalFee: '₩ 142,500,000',
      taxStatus: '정산 완료',
      dockAssigned: 'D01, D02',
    },
    {
      shipper: 'CJ대한통운 (인천허브)',
      monthlyOrders: '380건',
      volumeTons: '3,200톤',
      onTimeRate: '96.5%',
      totalFee: '₩ 118,000,000',
      taxStatus: '정산 완료',
      dockAssigned: 'D03, D04',
    },
    {
      shipper: 'LG전자 물류사업부',
      monthlyOrders: '210건',
      volumeTons: '2,100톤',
      onTimeRate: '98.2%',
      totalFee: '₩ 89,200,000',
      taxStatus: '발행 완료',
      dockAssigned: 'D05',
    },
    {
      shipper: '삼성전자 SCM센터',
      monthlyOrders: '310건',
      volumeTons: '2,950톤',
      onTimeRate: '99.1%',
      totalFee: '₩ 105,800,000',
      taxStatus: '정산 완료',
      dockAssigned: 'D07',
    },
    {
      shipper: '현대모비스 용인 부품센터',
      monthlyOrders: '180건',
      volumeTons: '1,450톤',
      onTimeRate: '94.0%',
      totalFee: '₩ 64,000,000',
      taxStatus: '검토 중',
      dockAssigned: 'D08',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F4F4F6] font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#191919] text-[#FEE500] font-bold text-xs px-4 py-3 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-base text-amber-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Top Header & Filter Bar */}
        <div className="bg-white border border-[#E5E5E8] rounded-2xl p-5 shadow-xs flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-black text-[#FEE500] font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                INTELLIGENT REPORT & BIG DATA
              </span>
              <span className="text-xs text-gray-400 font-mono">Realtime Logistics Analytics</span>
            </div>
            <h2 className="text-xl font-black text-[#191919] mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-600">analytics</span>
              <span>통합 리포트 & 빅데이터 종합 분석 센터</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              구간별 물동량 트렌드, 지연 요인 식별, 센터별 도크 효율성 및 세금계산서 정산 지표 종합 모니터링
            </p>
          </div>

          {/* Interactive Export Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('📊 [통합 리포트 엑셀] 데이터베이스 출력이 시작되었습니다 (Logistics_Report_2026.xlsx).')}
              className="px-4 py-2 bg-emerald-600 text-white font-black text-xs rounded-xl shadow-xs hover:bg-emerald-700 transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Excel 다운로드</span>
            </button>
            <button
              onClick={() => showToast('🖨️ [경영진 보고용 PDF] 고화질 종합 리포트 인쇄 모드가 실행됩니다.')}
              className="px-4 py-2 bg-black text-[#FEE500] font-black text-xs rounded-xl shadow-xs hover:bg-gray-800 transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">print</span>
              <span>PDF 보고서 인쇄</span>
            </button>
          </div>
        </div>

        {/* Global Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          {/* Period Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              <span>집계 기간:</span>
            </span>
            <div className="flex items-center bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setSelectedPeriod('WEEKLY')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedPeriod === 'WEEKLY' ? 'bg-black text-[#FEE500]' : 'text-gray-600 hover:text-black'
                }`}
              >
                주간
              </button>
              <button
                onClick={() => setSelectedPeriod('MONTHLY')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedPeriod === 'MONTHLY' ? 'bg-black text-[#FEE500]' : 'text-gray-600 hover:text-black'
                }`}
              >
                월간 (8월)
              </button>
              <button
                onClick={() => setSelectedPeriod('QUARTERLY')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedPeriod === 'QUARTERLY' ? 'bg-black text-[#FEE500]' : 'text-gray-600 hover:text-black'
                }`}
              >
                3분기
              </button>
              <button
                onClick={() => setSelectedPeriod('YEARLY')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedPeriod === 'YEARLY' ? 'bg-black text-[#FEE500]' : 'text-gray-600 hover:text-black'
                }`}
              >
                2026 누적
              </button>
            </div>
          </div>

          {/* Logistics Center Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">warehouse</span>
              <span>물류센터 필터:</span>
            </span>
            <select
              value={selectedCenter}
              onChange={(e) => setSelectedCenter(e.target.value)}
              className="px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-black"
            >
              <option value="ALL">전체 물류센터 (5개 거점 통합)</option>
              <option value="YONGIN">용인 물류센터</option>
              <option value="INCHEON">인천 남동 물류센터</option>
              <option value="UIWANG">의왕 ICD 물류센터</option>
              <option value="PYEONGTAEK">평택 항만 물류센터</option>
              <option value="BUSAN">부산 신항 물류센터</option>
            </select>
          </div>
        </div>

        {/* Top Executive KPI Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 block">총 운송 물동량 (월간)</span>
              <span className="text-3xl font-black text-gray-900 mt-1 block">14,280 톤</span>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">▲ 전월 대비 +12.4% 증가</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 block">평균 정시 준수율 (On-Time)</span>
              <span className="text-3xl font-black text-gray-900 mt-1 block">96.8%</span>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">▲ 지연율 -2.1%p 개선</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 block">평균 도크 체류시간</span>
              <span className="text-3xl font-black text-gray-900 mt-1 block">18.2 분</span>
              <span className="text-[11px] text-blue-600 font-bold mt-1 block">▼ 전주 대비 -4.5분 단축</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">timer</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 block">CO₂ 탄소 배출 절감량</span>
              <span className="text-3xl font-black text-gray-900 mt-1 block">48.2 톤</span>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">🌱 공차율 감소 ESG 목표 달성</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">eco</span>
            </div>
          </div>
        </div>

        {/* AI Big Data Insight Box */}
        <div className="bg-gradient-to-r from-[#191919] via-[#242424] to-[#2E2E2E] text-white rounded-2xl p-5 shadow-md border border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEE500] text-black font-black flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-[#FEE500]">카카오 T 화물 AI 빅데이터 분석 인사이트</h3>
                <span className="bg-amber-400/20 text-amber-300 font-mono text-[10px] px-2 py-0.5 rounded border border-amber-400/40">
                  REALTIME SYNTHESIS
                </span>
              </div>
              <p className="text-xs text-gray-200 mt-1 leading-relaxed">
                "의왕 ICD 및 부산 신항 거점의 피크 타임(14시~16시) 입차 쏠림 현상으로 인해 평균 대기시간이 24분 이상 발생하고 있습니다.{' '}
                <span className="underline text-amber-300 font-bold">인천 남동 및 용인 물류센터로 분산 스마트 배차를 유도</span>하면 전체 리드타임을 평균 14.8% 추가 단축할 수 있습니다."
              </p>
            </div>
          </div>

          <button
            onClick={() => showToast('🤖 AI 자동 최적화 분산 배차 알고리즘이 적용되었습니다.')}
            className="px-4 py-2 bg-[#FEE500] text-black font-extrabold text-xs rounded-xl shadow hover:bg-yellow-400 transition shrink-0"
          >
            AI 추천 분산 배차 적용
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* VISUAL CHARTS SECTION (2x2 GRID)                              */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Volume Trend & On-Time Rate Composed Chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-[#191919] flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-lg">trending_up</span>
                  <span>주차별 화물 물동량(톤) & 정시 준수율(%) 종합 추이</span>
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">물동량 증가 추이 및 정시 준수율 보정 지표</p>
              </div>
              <span className="text-[11px] font-mono bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">
                단위: 톤(Bar) / %(Line)
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={volumeTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="period" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis yAxisId="right" orientation="right" domain={[80, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#10b981' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#191919', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar yAxisId="left" dataKey="volumeTons" name="물동량 (톤)" fill="#191919" radius={[6, 6, 0, 0]} barSize={32} />
                  <Line yAxisId="right" type="monotone" dataKey="onTimeRate" name="정시 준수율 (%)" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Logistics Center Comparison (Bar Chart) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-[#191919] flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-lg">warehouse</span>
                  <span>거점 물류센터별 도크 가동률(%) 및 평균 대기시간(분)</span>
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">5개 핵심 센터 도크 효율 비교</p>
              </div>
              <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-bold">
                Center KPIs
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={centerPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#4b5563' }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#191919', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="occupancyPct" name="도크 가동률 (%)" fill="#FEE500" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="waitTimeMin" name="평균 대기시간 (분)" fill="#EF4444" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Vehicle Type Distribution (Pie Chart) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-[#191919] flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-lg">pie_chart</span>
                  <span>차종별 배차 비중 & 운송 비율 (%)</span>
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">11톤 윙바디, 25톤 트레일러, 5톤 카고 등</p>
              </div>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={truckTypeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {truckTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#191919', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                    formatter={(val: any) => [`${val}%`, '배차 비중']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Hourly Peak Time Congestion (Area Chart) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-[#191919] flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-600 text-lg">schedule</span>
                  <span>시간대별 도크 피크 타임 입차 몰림 분포 (06시~20시)</span>
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">시간대별 입차 대수 및 도크 점유율 추이</p>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyPeakData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#191919', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="inbound" name="시간당 입차량 (대)" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} strokeWidth={2} />
                  <Area type="monotone" dataKey="dockOccupancy" name="도크 점유율 (%)" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* DETAILED DATA ANALYTICS TABLES SECTION                         */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white border border-[#E5E5E8] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-lg font-black text-[#191919] flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-800">table_chart</span>
                <span>한눈에 알아보는 상세 종합 데이터 분석 표</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                운송 노선, 거점 물류센터, 화주사별 세부 성과 및 지연 원인 종합 명세
              </p>
            </div>

            {/* Tab Switches */}
            <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('ROUTE')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  activeTab === 'ROUTE'
                    ? 'bg-black text-[#FEE500] shadow-xs'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="material-symbols-outlined text-sm">alt_route</span>
                <span>주요 노선별 리드타임</span>
              </button>
              <button
                onClick={() => setActiveTab('CENTER')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  activeTab === 'CENTER'
                    ? 'bg-black text-[#FEE500] shadow-xs'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="material-symbols-outlined text-sm">warehouse</span>
                <span>센터별 도크 효율</span>
              </button>
              <button
                onClick={() => setActiveTab('SHIPPER')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  activeTab === 'SHIPPER'
                    ? 'bg-black text-[#FEE500] shadow-xs'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="material-symbols-outlined text-sm">domain</span>
                <span>기업 화주별 거래 및 KPI</span>
              </button>
            </div>
          </div>

          {/* TABLE 1: ROUTE REPORT */}
          {activeTab === 'ROUTE' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                    <th className="py-3 px-3">운송 노선 (Route)</th>
                    <th className="py-3 px-3">거리</th>
                    <th className="py-3 px-3">월 물동량</th>
                    <th className="py-3 px-3">평균 소요시간</th>
                    <th className="py-3 px-3">정시 준수율</th>
                    <th className="py-3 px-3">평균 지연</th>
                    <th className="py-3 px-3">주요 지연 원인</th>
                    <th className="py-3 px-3 text-center">관리 등급</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {routeReportData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/20 transition">
                      <td className="py-3 px-3 font-extrabold text-black">{row.route}</td>
                      <td className="py-3 px-3 font-mono text-gray-500">{row.distance}</td>
                      <td className="py-3 px-3 font-bold text-gray-900">{row.monthlyVolume}</td>
                      <td className="py-3 px-3 font-medium text-gray-700">{row.avgLeadTime}</td>
                      <td className="py-3 px-3 font-black text-emerald-700">{row.onTimeRate}</td>
                      <td className="py-3 px-3 font-bold text-red-600">{row.avgDelayMin}</td>
                      <td className="py-3 px-3 text-gray-600 font-medium">{row.primaryDelayFactor}</td>
                      <td className="py-3 px-3 text-center">
                        {row.riskLevel === 'STABLE' && (
                          <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2.5 py-1 rounded-full">
                            안정 (95%+)
                          </span>
                        )}
                        {row.riskLevel === 'WARNING' && (
                          <span className="bg-amber-100 text-amber-900 font-extrabold text-[10px] px-2.5 py-1 rounded-full">
                            주의 (지연 발생)
                          </span>
                        )}
                        {row.riskLevel === 'ALERT' && (
                          <span className="bg-red-100 text-red-700 font-extrabold text-[10px] px-2.5 py-1 rounded-full animate-pulse">
                            경고 (집중 관제)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TABLE 2: CENTER DOCK EFFICIENCY REPORT */}
          {activeTab === 'CENTER' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                    <th className="py-3 px-3">거점 물류센터</th>
                    <th className="py-3 px-3">운영 도크</th>
                    <th className="py-3 px-3">월 입차 대수</th>
                    <th className="py-3 px-3">정시 입차율</th>
                    <th className="py-3 px-3">T-Check 합격률</th>
                    <th className="py-3 px-3">평균 도크 체류시간</th>
                    <th className="py-3 px-3">병목 요인 분석</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {centerReportData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/20 transition">
                      <td className="py-3 px-3 font-extrabold text-black">{row.center}</td>
                      <td className="py-3 px-3 font-mono font-bold text-gray-700">{row.docks}</td>
                      <td className="py-3 px-3 font-bold text-gray-900">{row.truckCount}</td>
                      <td className="py-3 px-3 font-bold text-blue-700">{row.onTimeRate}</td>
                      <td className="py-3 px-3 font-black text-emerald-700">{row.tcheckPassPct}</td>
                      <td className="py-3 px-3 font-mono font-bold text-gray-800">{row.dwellTime}</td>
                      <td className="py-3 px-3 text-gray-600 font-medium">{row.bottleneck}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TABLE 3: SHIPPER PERFORMANCE REPORT */}
          {activeTab === 'SHIPPER' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                    <th className="py-3 px-3">기업 화주사명</th>
                    <th className="py-3 px-3">월 발주건수</th>
                    <th className="py-3 px-3">총 물동량</th>
                    <th className="py-3 px-3">정시 준수율</th>
                    <th className="py-3 px-3">월 운송 거래액</th>
                    <th className="py-3 px-3">전용 배정 도크</th>
                    <th className="py-3 px-3 text-center">세금계산서 상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800">
                  {shipperReportData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/20 transition">
                      <td className="py-3 px-3 font-extrabold text-black">{row.shipper}</td>
                      <td className="py-3 px-3 font-bold text-gray-900">{row.monthlyOrders}</td>
                      <td className="py-3 px-3 font-mono font-bold text-gray-700">{row.volumeTons}</td>
                      <td className="py-3 px-3 font-black text-emerald-700">{row.onTimeRate}</td>
                      <td className="py-3 px-3 font-black text-gray-900">{row.totalFee}</td>
                      <td className="py-3 px-3 font-mono text-amber-900 font-bold">{row.dockAssigned}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="bg-gray-900 text-[#FEE500] font-black text-[10px] px-2.5 py-1 rounded-full">
                          {row.taxStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
