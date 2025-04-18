import { lazy } from 'react';
import { Outlet } from 'react-router';

import { MainLayout } from 'src/layouts/main'; // 메인 페이지 레이아웃



// lazy loading
// ----------------------------------------------------------------------

const PartnerMainPage = lazy(() => import('src/pages/partner/main'));
const PartnerProfilePage = lazy(() => import('src/pages/partner/profile'));
const PartnerRepairRequestsPage = lazy(() => import('src/pages/partner/repair-request'));
const PartnerRepairRequestPage = lazy(() => import('src/pages/partner/repair-request'));
const PartnerEstimatesPage = lazy(() => import('src/pages/partner/estimates'));
const PartnerEstimateWritePage = lazy(() => import('src/pages/partner/estimate-write'));

// partner section
/**
 * 파트너 페이지들
 * 파트너 계정에서 사용하는 페이지들을 정의합니다.
 */
// ----------------------------------------------------------------------

export const partnerRoutes = [
  {
    path: 'partner', // url
    children: [
      {
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <Outlet />
          </MainLayout>
        ),
        children: [
          { path: '', element: <PartnerMainPage /> }, // 파트너 메인 페이지
          { path: 'profile', element: <PartnerProfilePage /> }, // 파트너 프로필 페이지
          { path: 'repair-requests', element: <PartnerRepairRequestsPage /> }, // 파트너 수리 요청 목록 페이지
          { path: 'repair-request', element: <PartnerRepairRequestPage /> }, // 파트너 수리 요청 상세 페이지
          { path: 'estimates', element: <PartnerEstimatesPage /> }, // 파트너 견적 목록 페이지
          { path: 'estimate-write', element: <PartnerEstimateWritePage /> }, // 파트너 견적 작성 페이지
        ],
      },
    ]
  },
];