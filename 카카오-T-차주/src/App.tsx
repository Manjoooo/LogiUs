import { useState } from 'react';
import {
  NavigationTab,
  FreightItem,
  TransitStage,
  IncidentReport,
} from './types';
import {
  INITIAL_FREIGHT_LIST,
  INITIAL_TRANSIT_STAGES,
  INITIAL_INCIDENT,
} from './data/mockData';
import { HeaderNav } from './components/HeaderNav';
import { FreightListScreen } from './components/FreightListScreen';
import { FreightDetailModal } from './components/FreightDetailModal';
import { DispatchSplashModal } from './components/DispatchSplashModal';
import { TransitProgressScreen } from './components/TransitProgressScreen';
import { FieldRadarScreen } from './components/FieldRadarScreen';
import { VoiceReportModal } from './components/VoiceReportModal';
import { OperatorWaitModal } from './components/OperatorWaitModal';
import { CompletionEvaluationModal } from './components/CompletionEvaluationModal';
import { MyPageScreen } from './components/MyPageScreen';
import { TCheckGuideScreen } from './components/TCheckGuideScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [freights] = useState<FreightItem[]>(INITIAL_FREIGHT_LIST);

  // Active freight state (default KA-1025)
  const [activeFreight, setActiveFreight] = useState<FreightItem>(INITIAL_FREIGHT_LIST[0]);
  const [transitStages, setTransitStages] = useState<TransitStage[]>(INITIAL_TRANSIT_STAGES);
  const [incident] = useState<IncidentReport>(INITIAL_INCIDENT);

  // Modals state
  const [selectedFreightDetail, setSelectedFreightDetail] = useState<FreightItem | null>(null);
  const [dispatchSplashFreight, setDispatchSplashFreight] = useState<FreightItem | null>(null);
  const [isVoiceReportOpen, setIsVoiceReportOpen] = useState(false);
  const [isOperatorWaitOpen, setIsOperatorWaitOpen] = useState(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [lastVoiceReportText, setLastVoiceReportText] = useState(
    '"앞에 산에서 돌이 떨어져서 2개 차로가 막혀 있어요."'
  );

  // Handlers
  const handleSelectFreightDetail = (item: FreightItem) => {
    setSelectedFreightDetail(item);
  };

  const handleAcceptDispatch = (item: FreightItem) => {
    setSelectedFreightDetail(null);
    setDispatchSplashFreight(item);
  };

  const handleStartTransit = (item: FreightItem) => {
    setActiveFreight(item);
    setDispatchSplashFreight(null);
    setCurrentTab('transit');
  };

  const handleUpdateStage = (stageStep: number) => {
    setTransitStages((prev) =>
      prev.map((s) => {
        if (s.step < stageStep) {
          return { ...s, status: 'completed' };
        } else if (s.step === stageStep) {
          return { ...s, status: 'active' };
        } else {
          return { ...s, status: 'pending' };
        }
      })
    );
  };

  const handleVoiceReportSubmit = (voiceText: string) => {
    setLastVoiceReportText(voiceText);
    setIsVoiceReportOpen(false);
    setIsOperatorWaitOpen(true);
  };

  const handleConfirmDockUpdate = () => {
    // Update stage info to reflect revised ETA & dock
    setTransitStages((prev) =>
      prev.map((s) =>
        s.step === 6
          ? { ...s, location: '하차 도크 D08 변경 완료' }
          : s
      )
    );
  };

  const handleFinishEvaluation = () => {
    setIsCompletionModalOpen(false);
    setCurrentTab('home');
  };

  return (
    <div className="min-h-screen bg-[#f9f9fa] text-[#1a1c1d] flex flex-col md:pl-[240px] font-sans antialiased selection:bg-[#fee500]">
      {/* Navigation Bar (Desktop Side & Mobile Top/Bottom) */}
      <HeaderNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeOrderCode={activeFreight ? activeFreight.code : undefined}
      />

      {/* Main Screen Content */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <FreightListScreen
            freights={freights}
            onSelectFreightDetail={handleSelectFreightDetail}
            onAcceptDispatch={handleAcceptDispatch}
            onOpenTCheckGuide={() => setCurrentTab('tcheck')}
          />
        )}

        {currentTab === 'freight' && (
          <FreightListScreen
            freights={freights}
            onSelectFreightDetail={handleSelectFreightDetail}
            onAcceptDispatch={handleAcceptDispatch}
            onOpenTCheckGuide={() => setCurrentTab('tcheck')}
          />
        )}

        {currentTab === 'transit' && (
          <TransitProgressScreen
            activeFreight={activeFreight}
            stages={transitStages}
            onUpdateStage={handleUpdateStage}
            onOpenVoiceReport={() => setIsVoiceReportOpen(true)}
            onOpenRadar={() => setCurrentTab('radar')}
            onCompleteTransit={() => setIsCompletionModalOpen(true)}
          />
        )}

        {currentTab === 'radar' && (
          <FieldRadarScreen
            incident={incident}
            activeFreight={activeFreight}
            onSelectActiveFreight={() => setCurrentTab('transit')}
            onOpenVoiceReport={() => setIsVoiceReportOpen(true)}
          />
        )}

        {currentTab === 'my' && <MyPageScreen />}

        {currentTab === 'tcheck' && <TCheckGuideScreen />}
      </main>

      {/* MODALS */}
      {/* APP-02 Freight Detail Modal */}
      {selectedFreightDetail && (
        <FreightDetailModal
          freight={selectedFreightDetail}
          onClose={() => setSelectedFreightDetail(null)}
          onAcceptDispatch={handleAcceptDispatch}
        />
      )}

      {/* APP-03 Dispatch Confirmed Splash Modal */}
      {dispatchSplashFreight && (
        <DispatchSplashModal
          freight={dispatchSplashFreight}
          onClose={() => setDispatchSplashFreight(null)}
          onStartTransit={handleStartTransit}
        />
      )}

      {/* APP-07 Voice Report Confirm Modal */}
      {isVoiceReportOpen && (
        <VoiceReportModal
          activeFreight={activeFreight}
          onClose={() => setIsVoiceReportOpen(false)}
          onSubmitReport={handleVoiceReportSubmit}
        />
      )}

      {/* APP-08 & APP-09 Operator Response Wait & Result Modal */}
      {isOperatorWaitOpen && (
        <OperatorWaitModal
          activeFreight={activeFreight}
          voiceReportText={lastVoiceReportText}
          onClose={() => setIsOperatorWaitOpen(false)}
          onConfirmDockUpdate={handleConfirmDockUpdate}
        />
      )}

      {/* APP-10 Completion Evaluation Modal */}
      {isCompletionModalOpen && (
        <CompletionEvaluationModal
          activeFreight={activeFreight}
          onClose={() => setIsCompletionModalOpen(false)}
          onFinishEvaluation={handleFinishEvaluation}
        />
      )}
    </div>
  );
}
