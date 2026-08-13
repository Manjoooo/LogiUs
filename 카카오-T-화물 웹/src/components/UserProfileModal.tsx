import React from 'react';

interface UserProfileModalProps {
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ onClose }) => {
  const avatarUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDnlEtXVlmOav5ciXAVks3HYNQh8P-u4gWe9cck4Z3UdeTCO3mOMsDw2IomLG77EEpbAx_pdzIdFiAp425z_Zcm_fV2Xb8uFFNIg0yNCHeCcAUjT9ZD4EJmj7RxlIKKH4aeBQSg9DSvD4ogINsOqiEverbFp4dM6k0i82m22OUQZzEc0N0uU2WZgGFALQ8pAho_tZOTx1gn0H2i2-Q7v4gWrn7kpA4IMnrEAuNOt-HW1aNqjHh1THdJ';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#e8e8ea] relative text-left">
        <div className="flex justify-between items-start pb-4 border-b border-[#e8e8ea] mb-5">
          <h3 className="text-[18px] font-bold text-[#1a1c1d]">화주 계정 정보</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5f5e5e] hover:text-[#1a1c1d] rounded-full hover:bg-[#f3f3f4]"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="flex items-center gap-4 bg-[#f9f9fa] p-4 rounded-2xl border border-[#e8e8ea] mb-5">
          <img
            src={avatarUrl}
            alt="김카카오 화주 Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#fee500] shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-[18px] font-bold text-[#1a1c1d]">김카카오</h4>
              <span className="px-2 py-0.5 bg-[#fee500] text-[#1a1c1d] text-[11px] font-bold rounded-full">
                프리미엄 화주
              </span>
            </div>
            <p className="text-[13px] text-[#5f5e5e] font-medium">(주) 카카오로지스틱스 물류관리팀</p>
            <p className="text-[12px] text-[#7c775f]">사업자번호: 120-88-99012</p>
          </div>
        </div>

        <div className="space-y-3 text-[13px] mb-6">
          <div className="flex justify-between py-2 border-b border-[#eeeeef]">
            <span className="text-[#5f5e5e]">연락처</span>
            <span className="font-semibold text-[#1a1c1d]">010-8821-1025</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#eeeeef]">
            <span className="text-[#5f5e5e]">이메일</span>
            <span className="font-semibold text-[#1a1c1d]">shipper.kakao@kakaot.com</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#eeeeef]">
            <span className="text-[#5f5e5e]">신뢰 화물 등급</span>
            <span className="font-bold text-[#25a55f]">AAA+ 등급</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#5f5e5e]">자동 결제 수단</span>
            <span className="font-semibold text-[#1a1c1d]">카카오페이 기업카드 (8821)</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#1a1c1d] text-white font-bold rounded-xl hover:bg-black transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
