import React, { useState } from 'react';
import { initialShipments, initialNotifications } from './data/shipments';
import { CargoItem, NotificationItem } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DelayAlertCard } from './components/DelayAlertCard';
import { RealtimeMapCard } from './components/RealtimeMapCard';
import { TransportProgress } from './components/TransportProgress';
import { UnloadingDockCard } from './components/UnloadingDockCard';
import { CargoSummaryCard } from './components/CargoSummaryCard';
import { CargoListTable } from './components/CargoListTable';
import { WaybillModal } from './components/WaybillModal';
import { TempLogModal } from './components/TempLogModal';
import { DriverContactModal } from './components/DriverContactModal';
import { UserProfileModal } from './components/UserProfileModal';
import { HelpModal } from './components/HelpModal';

export default function App() {
  const [shipments, setShipments] = useState<CargoItem[]>(initialShipments);
  const [selectedCargo, setSelectedCargo] = useState<CargoItem>(initialShipments[0]);
  const [activeTab, setActiveTab] = useState<'realtime' | 'all'>('realtime');
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Modals
  const [showWaybillModal, setShowWaybillModal] = useState(false);
  const [showTempModal, setShowTempModal] = useState(false);
  const [showDriverContactModal, setShowDriverContactModal] = useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState(false);

  // Handlers
  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const handleRecalculateEta = () => {
    setSelectedCargo((prev) => ({
      ...prev,
      delayNotice: prev.delayNotice
        ? { ...prev.delayNotice, updatedEta: '15:05' }
        : undefined,
    }));
  };

  const handleAdvanceStep = () => {
    setSelectedCargo((prev) => {
      const activeIdx = prev.steps.findIndex((s) => s.status === 'active');
      if (activeIdx === -1 || activeIdx >= prev.steps.length - 1) return prev;

      const newSteps = prev.steps.map((s, idx) => {
        if (idx < activeIdx + 1) return { ...s, status: 'completed' as const };
        if (idx === activeIdx + 1) return { ...s, status: 'active' as const, time: '방금' };
        return { ...s, status: 'pending' as const };
      });

      return {
        ...prev,
        steps: newSteps,
        status: newSteps[activeIdx + 1].title as any,
      };
    });
  };

  const handleSelectCargoFromList = (cargo: CargoItem) => {
    setSelectedCargo(cargo);
    setActiveTab('realtime');
  };

  return (
    <div className="min-h-screen bg-[#f9f9fa] text-[#1a1c1d] flex flex-col md:flex-row antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeShipmentCount={shipments.filter((s) => s.status === '운행 중').length}
        isOpenMobile={isOpenMobileSidebar}
        setIsOpenMobile={setIsOpenMobileSidebar}
        onOpenProfileModal={() => setShowUserProfileModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[240px] flex flex-col min-h-screen min-w-0">
        {/* Top Header Bar */}
        <Header
          title={activeTab === 'realtime' ? '화물 상세 내역' : '전체 화물 현황'}
          showBack={activeTab === 'realtime'}
          onBack={() => setActiveTab('all')}
          onOpenMobileSidebar={() => setIsOpenMobileSidebar(true)}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onOpenHelpModal={() => setShowHelpModal(true)}
        />

        {/* Content Canvas */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white/50 overflow-y-auto">
          {activeTab === 'all' ? (
            <CargoListTable
              shipments={shipments}
              onSelectCargo={handleSelectCargoFromList}
            />
          ) : (
            <div className="max-w-7xl mx-auto space-y-6 text-left">
              {/* Order Header & Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#e8e8ea]/60">
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-[#eeeeef] rounded-full text-[12px] font-bold text-[#4b4732]">
                      {selectedCargo.code}
                    </span>
                    {selectedCargo.isTrusted && (
                      <span className="px-2.5 py-1 bg-[#25A55F]/10 rounded-full text-[12px] text-[#25A55F] font-bold flex items-center gap-1 shadow-2xs">
                        <span className="material-symbols-outlined text-[15px]">verified</span>
                        신뢰 화물
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-[22px] sm:text-[28px] font-bold text-[#1a1c1d] tracking-tight leading-snug">
                    {selectedCargo.title}
                  </h1>
                </div>

                {/* Top Action Button */}
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => setShowWaybillModal(true)}
                    className="px-5 py-2.5 bg-white border border-[#e8e8ea] hover:border-[#1a1c1d] rounded-xl text-[14px] text-[#191919] font-bold hover:bg-[#f9f9fa] transition-all shadow-2xs flex items-center gap-2 active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>운송장 다운로드</span>
                  </button>
                </div>
              </div>

              {/* Bento Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Map & Delay Alert (Span 8) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Delay Alert Card (If delayed) */}
                  {selectedCargo.delayNotice && (
                    <DelayAlertCard
                      reason={selectedCargo.delayNotice.reason}
                      originalEta={selectedCargo.delayNotice.originalEta}
                      updatedEta={selectedCargo.delayNotice.updatedEta}
                      onRecalculateEta={handleRecalculateEta}
                    />
                  )}

                  {/* Realtime Vehicle Location Map */}
                  <RealtimeMapCard
                    cargo={selectedCargo}
                    onOpenDriverContact={() => setShowDriverContactModal(true)}
                    onOpenTempModal={() => setShowTempModal(true)}
                  />
                </div>

                {/* Right Column: Timeline & Cargo Info Cards (Span 4) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Progress Timeline */}
                  <TransportProgress
                    steps={selectedCargo.steps}
                    onAdvanceStep={handleAdvanceStep}
                  />

                  {/* Unloading Dock Info */}
                  <UnloadingDockCard
                    centerName={selectedCargo.destination.centerName}
                    address={selectedCargo.destination.address}
                    dockNumber={selectedCargo.destination.dockNumber}
                    dockUpdated={selectedCargo.destination.dockUpdated}
                    dockNotice={selectedCargo.destination.dockNotice}
                    onOpenMapDirections={() => setShowHelpModal(true)}
                  />

                  {/* Cargo Summary */}
                  <CargoSummaryCard
                    category={selectedCargo.cargoDetails.category}
                    weight={selectedCargo.cargoDetails.weight}
                    tempCondition={selectedCargo.cargoDetails.tempCondition}
                    currentTemp={selectedCargo.cargoDetails.currentTemp}
                    onOpenTempLog={() => setShowTempModal(true)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showWaybillModal && (
        <WaybillModal
          cargo={selectedCargo}
          onClose={() => setShowWaybillModal(false)}
        />
      )}

      {showTempModal && (
        <TempLogModal
          cargo={selectedCargo}
          onClose={() => setShowTempModal(false)}
        />
      )}

      {showDriverContactModal && (
        <DriverContactModal
          cargo={selectedCargo}
          onClose={() => setShowDriverContactModal(false)}
        />
      )}

      {showUserProfileModal && (
        <UserProfileModal onClose={() => setShowUserProfileModal(false)} />
      )}

      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}
    </div>
  );
}
