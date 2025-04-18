import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { AuthLayout } from 'src/layouts/auth'; // 로그인 페이지 레이아웃
import { MainLayout } from 'src/layouts/main'; // 메인 페이지 레이아웃
import { SimpleLayout } from 'src/layouts/simple'; // 단순 페이지 레이아웃

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const PartnerMainPage = lazy(() => import('src/pages/main/partner'));
const PartnerProfilePage = lazy(() => import('src/pages/account/profile/partner'));
const PartnerRepairRequestsPage = lazy(() => import('src/pages/repair-request/search'));
const PartnerRepairRequestPage = lazy(() => import('src/pages/repair-request/detail'));

// ----------------------------------------------------------------------

/**
 * 파트너 페이지들
 * 파트너 계정에서 사용하는 페이지들을 정의합니다.
 */
export const partnerRoutes = [
  {
    path: 'partner', // url
    children: [
      /**
       * 단일 페이지들
       */
      {
        path: 'main', // 파트너 메인 페이지
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <PartnerMainPage />
          </MainLayout>
        ),
      },
      {
        path: 'profile', // 파트너 프로필 페이지
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <PartnerProfilePage />
          </MainLayout>
        ),
      },

      /**
       * 수리 요청 관리 페이지들
       */
      {
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <Outlet />
          </MainLayout>
        ),
        children: [
          { path: 'repair-requests', element: <PartnerRepairRequestsPage /> }, // 파트너 수리 요청 목록 페이지
          { path: 'repair-request', element: <PartnerRepairRequestPage /> }, // 파트너 수리 요청 상세 페이지
        ],
      },
    ]
  },
];