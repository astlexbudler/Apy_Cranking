import { lazy } from 'react';
import { Outlet } from 'react-router';

import { MainLayout } from 'src/layouts/main'; // 메인 페이지 레이아웃



// lazy loading
// ----------------------------------------------------------------------

const SuperuserMainPage = lazy(() => import('src/pages/superuser/main'));
const SuperuserProfilePage = lazy(() => import('src/pages/superuser/profile'));
const SuperuserAccountsPage = lazy(() => import('src/pages/superuser/accounts'));
const SuperuserAccountPage = lazy(() => import('src/pages/superuser/account'));
const SuperuserPostWritePage = lazy(() => import('src/pages/superuser/post-write'));
const SuperuserPostModifyPage = lazy(() => import('src/pages/superuser/post-modify'));
const SuperuserRepairRequestsPage = lazy(() => import('src/pages/superuser/repair-requests'));
const SuperuserRepairRequestPage = lazy(() => import('src/pages/superuser/repair-request'));
const SuperuserCarsPage = lazy(() => import('src/pages/superuser/cars'));
const SuperuserLogsPage = lazy(() => import('src/pages/superuser/logs'));
const SuperuserSettingsPage = lazy(() => import('src/pages/superuser/settings'));

// superuser section
/**
 * 관리자 페이지들
 * 관리자 계정에서 사용하는 페이지들을 정의합니다.
 */
// ----------------------------------------------------------------------

export const superuserRoutes = [
  {
    path: 'superuser', // url
    children: [
      {
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <Outlet />
          </MainLayout>
        ),
        children: [
          { path: '', element: <SuperuserMainPage /> }, // 관리자 메인 페이지
          { path: 'profile', element: <SuperuserProfilePage /> }, // 관리자 프로필 페이지
          { path: 'accounts', element: <SuperuserAccountsPage /> }, // 관리자 계정 목록 페이지
          { path: 'account', element: <SuperuserAccountPage /> }, // 관리자 계정 상세 페이지
          { path: 'cars', element: <SuperuserCarsPage /> }, // 차량 목록 페이지
          { path: 'repair-requests', element: <SuperuserRepairRequestsPage /> }, // 관리자 수리 요청 목록 페이지
          { path: 'repair-request', element: <SuperuserRepairRequestPage /> }, // 관리자 수리 요청 상세 페이지
          { path: 'post-edit', element: <SuperuserPostModifyPage /> }, // 게시글 수정 페이지
          { path: 'post-write', element: <SuperuserPostWritePage /> }, // 게시글 작성 페이지
          { path: 'logs', element: <SuperuserLogsPage /> }, // 로그 목록 페이지
          { path: 'settings', element: <SuperuserSettingsPage /> }, // 설정 페이지
        ]
      },
    ]
  },
];