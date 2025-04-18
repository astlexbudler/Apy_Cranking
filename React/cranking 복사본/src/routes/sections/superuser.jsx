import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { AuthLayout } from 'src/layouts/auth'; // 로그인 페이지 레이아웃
import { MainLayout } from 'src/layouts/main'; // 메인 페이지 레이아웃
import { SimpleLayout } from 'src/layouts/simple'; // 단순 페이지 레이아웃

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const SuperuserMainPage = lazy(() => import('src/pages/main/superuser'));
const SuperuserProfilePage = lazy(() => import('src/pages/account/profile/superuser'));
const SuperuserAccountsPage = lazy(() => import('src/pages/account/profile/search'));
const SuperuserAccountPage = lazy(() => import('src/pages/account/profile/detail'));
const SuperuserPostsPage = lazy(() => import('src/pages/post/search'));
const SuperuserPostWritePage = lazy(() => import('src/pages/post/write'));
const SuperuserPostModifyPage = lazy(() => import('src/pages/post/modify'));
const SuperuserRepairRequestsPage = lazy(() => import('src/pages/repair-request/search'));
const SuperuserRepairRequestPage = lazy(() => import('src/pages/repair-request/detail'));

// ----------------------------------------------------------------------

/**
 * 관리자 페이지들
 * 관리자 계정에서 사용하는 페이지들을 정의합니다.
 */
export const superuserRoutes = [
  {
    path: 'superuser', // url
    children: [
      /**
       * 단일 페이지들
       */
      {
        path: 'main', // 관리자 메인 페이지
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <SuperuserMainPage />
          </MainLayout>
        ),
      },

      /**
       * 게시글 관련 페이지들
      */
      {
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <Outlet />
          </MainLayout>
        ),
        children: [
          { path: 'posts', element: <SuperuserPostsPage /> }, // 관리자 게시글 목록 페이지
          { path: 'post-write', element: <SuperuserPostWritePage /> }, // 게시글 작성 페이지
          { path: 'post-edit', element: <SuperuserPostModifyPage /> }, // 게시글 수정 페이지
        ],
      },

      /**
       * 정보 페이지들
       */
      {
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <Outlet />
          </MainLayout>
        ),
        children: [
          { path: 'profile', element: <SuperuserProfilePage /> }, // 관리자 프로필 페이지
          { path: 'accounts', element: <SuperuserAccountsPage /> }, // 관리자 계정 목록 페이지
          { path: 'account', element: <SuperuserAccountPage /> }, // 관리자 계정 상세 페이지
        ],
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
          { path: 'repair-requests', element: <SuperuserRepairRequestsPage /> }, // 관리자 수리 요청 목록 페이지
          { path: 'repair-request', element: <SuperuserRepairRequestPage /> }, // 관리자 수리 요청 상세 페이지
        ],
      },
    ]
  },
];