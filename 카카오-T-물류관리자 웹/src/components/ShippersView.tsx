import React, { useState } from 'react';

export interface CorporateShipper {
  id: string;
  name: string;
  businessNo: string;
  contactPerson: string;
  phone: string;
  email: string;
  cargoType: string;
  monthlyOrders: number;
  totalFreightFee: string;
  assignedDock: string;
  status: 'ACTIVE' | 'PENDING' | 'VIP';
  registeredDate: string;
}

export interface ShipperTransaction {
  orderId: string;
  shipperName: string;
  route: string;
  vehicle: string;
  driver: string;
  freightFee: string;
  status: 'DELIVERING' | 'COMPLETED' | 'WAITING_PICKUP' | 'SETTLED';
  date: string;
}

export const ShippersView: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State for New Shipper Registration
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newBizNo, setNewBizNo] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCargo, setNewCargo] = useState('이커머스/일반화물');
  const [newOrdersGoal, setNewOrdersGoal] = useState('150');
  const [newAssignedDock, setNewAssignedDock] = useState('D01');

  // Selected Transaction for Invoice Modal
  const [selectedTx, setSelectedTx] = useState<ShipperTransaction | null>(null);

  // Active Shippers Live State List
  const [shippers, setShippers] = useState<CorporateShipper[]>([
    {
      id: 'SH-1001',
      name: '(주)쿠팡 로지스틱스',
      businessNo: '120-88-12345',
      contactPerson: '김민수 팀장',
      phone: '010-3819-2041',
      email: 'logistics@coupang.com',
      cargoType: '이커머스 / 당일배송',
      monthlyOrders: 420,
      totalFreightFee: '₩ 142,500,000',
      assignedDock: 'D01, D02',
      status: 'VIP',
      registeredDate: '2025-03-15',
    },
    {
      id: 'SH-1002',
      name: 'CJ대한통운 (인천허브)',
      businessNo: '110-81-99210',
      contactPerson: '박성훈 파트장',
      phone: '010-9281-3310',
      email: 'hub@cjlogistics.com',
      cargoType: '택배 소형/중형 화물',
      monthlyOrders: 380,
      totalFreightFee: '₩ 118,000,000',
      assignedDock: 'D03, D04',
      status: 'VIP',
      registeredDate: '2025-04-01',
    },
    {
      id: 'SH-1003',
      name: 'LG전자 물류사업부',
      businessNo: '211-85-44319',
      contactPerson: '최영재 부장',
      phone: '010-4412-8821',
      email: 'scm@lge.com',
      cargoType: '가전제품 / 정밀기기',
      monthlyOrders: 210,
      totalFreightFee: '₩ 89,200,000',
      assignedDock: 'D05',
      status: 'ACTIVE',
      registeredDate: '2025-06-12',
    },
    {
      id: 'SH-1004',
      name: '삼성전자 SCM센터',
      businessNo: '124-81-00912',
      contactPerson: '이정훈 수석',
      phone: '010-8820-1123',
      email: 'logistics@samsung.com',
      cargoType: '반도체/전자 부품',
      monthlyOrders: 310,
      totalFreightFee: '₩ 105,800,000',
      assignedDock: 'D07',
      status: 'VIP',
      registeredDate: '2025-02-10',
    },
    {
      id: 'SH-1005',
      name: '현대모비스 용인 부품센터',
      businessNo: '220-81-33190',
      contactPerson: '정태호 과장',
      phone: '010-5512-9901',
      email: 'parts@mobis.co.kr',
      cargoType: '자동차 부품 / 모듈',
      monthlyOrders: 180,
      totalFreightFee: '₩ 64,000,000',
      assignedDock: 'D08',
      status: 'ACTIVE',
      registeredDate: '2025-08-20',
    },
    {
      id: 'SH-1006',
      name: '롯데글로벌로지스',
      businessNo: '105-86-77812',
      contactPerson: '한지민 대리',
      phone: '010-2234-9912',
      email: 'global@lotte.net',
      cargoType: '유통 / 콜드체인',
      monthlyOrders: 140,
      totalFreightFee: '₩ 42,000,000',
      assignedDock: 'D06',
      status: 'ACTIVE',
      registeredDate: '2025-11-05',
    },
  ]);

  // Shipper Transactions History List State
  const [transactions, setTransactions] = useState<ShipperTransaction[]>([
    {
      orderId: 'ORD-2026-0812-01',
      shipperName: '(주)쿠팡 로지스틱스',
      route: '인천 남동센터 ➔ 용인 물류센터',
      vehicle: 'KA-1025 (11톤 윙바디)',
      driver: '김철수 차주',
      freightFee: '₩ 450,000',
      status: 'DELIVERING',
      date: '2026-08-12 14:10',
    },
    {
      orderId: 'ORD-2026-0812-02',
      shipperName: 'CJ대한통운 (인천허브)',
      route: '시흥 IC ➔ 의왕 ICD 터미널',
      vehicle: 'KA-5829 (25톤 트레일러)',
      driver: '이진우 차주',
      freightFee: '₩ 680,000',
      status: 'WAITING_PICKUP',
      date: '2026-08-12 13:50',
    },
    {
      orderId: 'ORD-2026-0812-03',
      shipperName: 'LG전자 물류사업부',
      route: '평택 항만 ➔ 용인 물류센터',
      vehicle: 'KA-3301 (11톤 윙바디)',
      driver: '박동진 차주',
      freightFee: '₩ 520,000',
      status: 'COMPLETED',
      date: '2026-08-12 12:30',
    },
    {
      orderId: 'ORD-2026-0812-04',
      shipperName: '삼성전자 SCM센터',
      route: '수원 IC ➔ 부산 신항센터',
      vehicle: 'KA-8820 (25톤 냉동탑)',
      driver: '한승우 차주',
      freightFee: '₩ 1,250,000',
      status: 'SETTLED',
      date: '2026-08-12 11:15',
    },
    {
      orderId: 'ORD-2026-0812-05',
      shipperName: '현대모비스 용인 부품센터',
      route: '울산 공장 ➔ 용인 물류센터',
      vehicle: 'KA-2041 (11톤 윙바디)',
      driver: '윤상현 차주',
      freightFee: '₩ 890,000',
      status: 'SETTLED',
      date: '2026-08-12 10:00',
    },
    {
      orderId: 'ORD-2026-0812-06',
      shipperName: '롯데글로벌로지스',
      route: '이천 물류센터 ➔ 인천 남동공단',
      vehicle: 'KA-6612 (5톤 카고)',
      driver: '오민석 차주',
      freightFee: '₩ 340,000',
      status: 'SETTLED',
      date: '2026-08-12 09:20',
    },
  ]);

  const [activeTxTab, setActiveTxTab] = useState<'ALL' | 'DELIVERING' | 'COMPLETED' | 'SETTLED'>('ALL');
  const [searchTxQuery, setSearchTxQuery] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add New Shipper Handler
  const handleRegisterShipper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim()) {
      alert('기업명을 입력해주세요.');
      return;
    }

    const createdShipper: CorporateShipper = {
      id: `SH-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newCompany,
      businessNo: newBizNo || '123-88-00991',
      contactPerson: newContact || '담당자',
      phone: newPhone || '010-0000-0000',
      email: newEmail || 'contact@company.com',
      cargoType: newCargo,
      monthlyOrders: parseInt(newOrdersGoal) || 100,
      totalFreightFee: '₩ 0 (신규)',
      assignedDock: newAssignedDock,
      status: 'ACTIVE',
      registeredDate: new Date().toISOString().split('T')[0],
    };

    setShippers([createdShipper, ...shippers]);
    setIsModalOpen(false);

    // Add a sample transaction for the new shipper too!
    const newTx: ShipperTransaction = {
      orderId: `ORD-2026-0812-${Math.floor(10 + Math.random() * 90)}`,
      shipperName: newCompany,
      route: '신규등록 ➔ 용인 물류센터 (첫 발주)',
      vehicle: 'KA-1025 (11톤 윙바디 배정)',
      driver: '배차 진행중',
      freightFee: '₩ 420,000',
      status: 'WAITING_PICKUP',
      date: '방금 신청',
    };
    setTransactions([newTx, ...transactions]);

    // Reset Form
    setNewCompany('');
    setNewBizNo('');
    setNewContact('');
    setNewPhone('');
    setNewEmail('');

    showToast(`🎉 [${newCompany}] 기업 화주사가 성공적으로 등록 및 전용 도크(${newAssignedDock})가 배정되었습니다!`);
  };

  // Filter Transactions
  const filteredTransactions = transactions.filter((tx) => {
    if (activeTxTab === 'DELIVERING' && tx.status !== 'DELIVERING' && tx.status !== 'WAITING_PICKUP') return false;
    if (activeTxTab === 'COMPLETED' && tx.status !== 'COMPLETED') return false;
    if (activeTxTab === 'SETTLED' && tx.status !== 'SETTLED') return false;

    if (searchTxQuery.trim() !== '') {
      const q = searchTxQuery.toLowerCase();
      return (
        tx.orderId.toLowerCase().includes(q) ||
        tx.shipperName.toLowerCase().includes(q) ||
        tx.route.toLowerCase().includes(q) ||
        tx.driver.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F4F4F6] font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#191919] text-[#FEE500] font-bold text-xs px-4 py-3 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-base text-amber-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white border border-[#E5E5E8] rounded-2xl p-5 shadow-xs flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#FEE500] text-black font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                CORPORATE SHIPPER SCM
              </span>
              <span className="text-xs text-gray-400 font-mono">Realtime Enterprise Logistics</span>
            </div>
            <h2 className="text-xl font-black text-[#191919] mt-1">기업 화주 거래 및 발주 현황</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              카카오 T 화물 연동 주요 화주사별 물동량, 실시간 세금계산서 정산 및 전용 도크 배정 통합 관리
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-black hover:bg-gray-800 text-[#FEE500] font-black text-xs rounded-xl shadow-md transition flex items-center gap-2 transform active:scale-95"
          >
            <span className="material-symbols-outlined text-base">add_business</span>
            <span>+ 신규 기업 화주 등록</span>
          </button>
        </div>

        {/* Top Metric Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-bold block">이번 달 총 기업 발주건</span>
              <span className="text-3xl font-black text-gray-900 mt-1 block">1,842 건</span>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">▲ 전월 대비 +14.2% 증가</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-bold block">총 운송 거래액 (정산)</span>
              <span className="text-3xl font-black text-gray-900 mt-1 block">₩ 482,500,000</span>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">✓ 카카오T 자동 결제 정산 완료</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">payments</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-bold block">활성 기업 화주사</span>
              <span className="text-3xl font-black text-gray-900 mt-1 block">{shippers.length} 개사</span>
              <span className="text-[11px] text-blue-600 font-bold mt-1 block">전용 API & 도크 배정 완료</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">domain</span>
            </div>
          </div>
        </div>

        {/* Registered Active Corporate Shippers Cards */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-black text-[#191919] flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-800">domain_verification</span>
              <span>등록된 기업 화주사 목록 ({shippers.length}개)</span>
            </h3>
            <span className="text-xs text-gray-400 font-mono">가나다/발주량순</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shippers.map((shipper) => (
              <div
                key={shipper.id}
                className="bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-4 shadow-xs transition space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      {shipper.status === 'VIP' ? (
                        <span className="bg-[#FEE500] text-black font-black text-[9px] px-2 py-0.5 rounded-md">
                          VIP 핵심화주
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-700 font-bold text-[9px] px-2 py-0.5 rounded-md">
                          일반 기업화주
                        </span>
                      )}
                      <h4 className="text-base font-black text-[#191919] mt-1">{shipper.name}</h4>
                      <p className="text-[11px] text-gray-400 font-mono">사업자: {shipper.businessNo}</p>
                    </div>

                    <span className="bg-amber-100 text-amber-900 font-black text-xs px-2.5 py-1 rounded-xl">
                      {shipper.assignedDock}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-2.5 my-2.5 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold">주요 화물:</span>
                      <span className="font-extrabold text-gray-800">{shipper.cargoType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold">월 발주건수:</span>
                      <span className="font-extrabold text-indigo-700">{shipper.monthlyOrders} 건 / 월</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold">월 운송 거래액:</span>
                      <span className="font-black text-emerald-700">{shipper.totalFreightFee}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-1 text-[11px]">
                      <span className="text-gray-400">담당자:</span>
                      <span className="text-gray-700 font-medium">{shipper.contactPerson} ({shipper.phone})</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 border-t border-gray-100 pt-2">
                  <button
                    onClick={() => {
                      setSearchTxQuery(shipper.name);
                      showToast(`[${shipper.name}] 거래 및 발주 내역을 검색했습니다.`);
                    }}
                    className="flex-1 bg-gray-100 hover:bg-black hover:text-white text-gray-800 font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">receipt_long</span>
                    <span>거래 이력</span>
                  </button>
                  <button
                    onClick={() => showToast(`[${shipper.name}] 전용 간편 배차 예약 화면으로 연결됩니다.`)}
                    className="flex-1 bg-[#FEE500] hover:bg-yellow-400 text-black font-extrabold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                    <span>배차 요청</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILED SHIPPER TRANSACTIONS & DISPATCH HISTORY TABLE */}
        <div className="bg-white border border-[#E5E5E8] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-lg font-black text-[#191919] flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-800">table_view</span>
                <span>상세 화주 거래 & 발주 운송 내역</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                기업 화주별 실시간 배차 노선, 운임료, 결제 상태 및 세금계산서 발급 현황
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTxTab('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTxTab === 'ALL'
                    ? 'bg-black text-[#FEE500]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체 ({transactions.length})
              </button>
              <button
                onClick={() => setActiveTxTab('DELIVERING')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTxTab === 'DELIVERING'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                운송 진행중
              </button>
              <button
                onClick={() => setActiveTxTab('COMPLETED')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTxTab === 'COMPLETED'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                운송 완료
              </button>
              <button
                onClick={() => setActiveTxTab('SETTLED')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTxTab === 'SETTLED'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                정산 완료
              </button>
            </div>
          </div>

          {/* Search Box Toolbar */}
          <div className="flex justify-between items-center gap-2">
            <div className="relative flex-1 max-w-xs">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="화주명, 발주번호, 노선 검색..."
                value={searchTxQuery}
                onChange={(e) => setSearchTxQuery(e.target.value)}
                className="pl-8 pr-4 py-1.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-black w-full"
              />
            </div>
            {searchTxQuery && (
              <button
                onClick={() => setSearchTxQuery('')}
                className="text-xs text-gray-500 font-bold hover:underline"
              >
                초기화
              </button>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="bg-gray-100 text-gray-600 font-bold border-b border-gray-200">
                  <th className="py-3 px-3">발주 번호</th>
                  <th className="py-3 px-3">기업 화주사</th>
                  <th className="py-3 px-3">운송 노선</th>
                  <th className="py-3 px-3">배정 차량 / 차주</th>
                  <th className="py-3 px-3 text-right">운임료</th>
                  <th className="py-3 px-3 text-center">운송 상태</th>
                  <th className="py-3 px-3">발주 시각</th>
                  <th className="py-3 px-3 text-center">관리 액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.orderId} className="hover:bg-amber-50/20 transition">
                    <td className="py-3 px-3 font-mono font-bold text-gray-900">{tx.orderId}</td>
                    <td className="py-3 px-3 font-extrabold text-black">{tx.shipperName}</td>
                    <td className="py-3 px-3 font-medium text-gray-700">{tx.route}</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-gray-900">{tx.vehicle}</div>
                      <div className="text-[10px] text-gray-400">{tx.driver}</div>
                    </td>
                    <td className="py-3 px-3 text-right font-black text-emerald-700 text-sm">
                      {tx.freightFee}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {tx.status === 'DELIVERING' && (
                        <span className="bg-blue-100 text-blue-800 font-bold text-[10px] px-2.5 py-1 rounded-full animate-pulse">
                          운송중
                        </span>
                      )}
                      {tx.status === 'WAITING_PICKUP' && (
                        <span className="bg-amber-100 text-amber-900 font-bold text-[10px] px-2.5 py-1 rounded-full">
                          상차대기
                        </span>
                      )}
                      {tx.status === 'COMPLETED' && (
                        <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-full">
                          운송완료
                        </span>
                      )}
                      {tx.status === 'SETTLED' && (
                        <span className="bg-gray-900 text-[#FEE500] font-black text-[10px] px-2.5 py-1 rounded-full">
                          정산완료
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-gray-500">{tx.date}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => setSelectedTx(tx)}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-[#FEE500] hover:text-black font-bold text-[11px] rounded-lg transition"
                      >
                        명세서/계산서
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* NEW SHIPPER REGISTRATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-300 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 animate-scaleUp">
            <div className="flex justify-between items-start border-b border-gray-200 pb-3">
              <div>
                <span className="bg-[#FEE500] text-black font-black text-[10px] px-2.5 py-0.5 rounded-full">
                  NEW ENTERPRISE SHIPPER
                </span>
                <h3 className="text-xl font-black text-[#191919] mt-1">신규 기업 화주 등록</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterShipper} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">기업명 (법인/사업자명) *</label>
                <input
                  type="text"
                  required
                  placeholder="예: (주)쿠팡, 현대글로비스, 컬리"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-bold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">사업자등록번호</label>
                  <input
                    type="text"
                    placeholder="120-88-00000"
                    value={newBizNo}
                    onChange={(e) => setNewBizNo(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-mono text-gray-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">주요 업종/화물</label>
                  <select
                    value={newCargo}
                    onChange={(e) => setNewCargo(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-bold text-gray-900"
                  >
                    <option value="이커머스/일반화물">이커머스 / 일반화물</option>
                    <option value="신선식품/콜드체인">신선식품 / 콜드체인</option>
                    <option value="가전/전자부품">가전 / 전자부품</option>
                    <option value="자동차부품/모듈">자동차부품 / 모듈</option>
                    <option value="의류/패션">의류 / 패션</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">담당자 성명</label>
                  <input
                    type="text"
                    placeholder="홍길동 팀장"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black text-gray-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">담당자 연락처</label>
                  <input
                    type="text"
                    placeholder="010-0000-0000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">이메일 (전자세금계산서 발급용)</label>
                <input
                  type="email"
                  placeholder="scm@company.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">월 예상 물동량 (건)</label>
                  <input
                    type="number"
                    value={newOrdersGoal}
                    onChange={(e) => setNewOrdersGoal(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-bold text-gray-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">전용 배정 도크</label>
                  <select
                    value={newAssignedDock}
                    onChange={(e) => setNewAssignedDock(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black font-bold text-gray-900"
                  >
                    <option value="D01">D01 도크</option>
                    <option value="D02">D02 도크</option>
                    <option value="D03">D03 도크</option>
                    <option value="D04">D04 도크</option>
                    <option value="D05">D05 도크</option>
                    <option value="D06">D06 도크</option>
                    <option value="D07">D07 도크</option>
                    <option value="D08">D08 도크</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-black text-[#FEE500] font-black py-3 rounded-xl hover:bg-gray-900 transition text-xs"
                >
                  신규 기업 화주 등록 완료
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition text-xs"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TRANSACTION INVOICE & TAX DRAFT MODAL */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-300 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 animate-scaleUp">
            <div className="flex justify-between items-start border-b border-gray-200 pb-3">
              <div>
                <span className="bg-[#FEE500] text-black font-black text-[10px] px-2.5 py-0.5 rounded-full">
                  KAKAOT FREIGHT STATEMENT
                </span>
                <h3 className="text-xl font-black text-[#191919] mt-1">전자 거래 명세서 / 세금계산서</h3>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-3 text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-400 font-bold">발주 번호</span>
                <span className="font-mono font-bold text-gray-900">{selectedTx.orderId}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-400 font-bold">기업 화주사</span>
                <span className="font-black text-gray-900">{selectedTx.shipperName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-400 font-bold">운송 구간</span>
                <span className="font-extrabold text-gray-800">{selectedTx.route}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-400 font-bold">배정 차량</span>
                <span className="font-bold text-gray-900">{selectedTx.vehicle} ({selectedTx.driver})</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-400 font-bold">합계 운임료 (VAT 포함)</span>
                <span className="font-black text-emerald-700 text-base">{selectedTx.freightFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-bold">발주 및 정산 일시</span>
                <span className="font-mono text-gray-700">{selectedTx.date}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  showToast(`[${selectedTx.orderId}] 전자 세금계산서가 성공적으로 국세청 발행 완료되었습니다.`);
                  setSelectedTx(null);
                }}
                className="flex-1 bg-[#191919] text-[#FEE500] font-black text-xs py-2.5 rounded-xl hover:bg-black transition flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">receipt</span>
                <span>전자세금계산서 즉시 발행</span>
              </button>
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 bg-gray-200 text-gray-800 font-bold text-xs py-2.5 rounded-xl hover:bg-gray-300 transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
