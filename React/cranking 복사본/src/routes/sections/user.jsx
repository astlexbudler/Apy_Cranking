import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { AuthLayout } from 'src/layouts/auth'; // 로그인 페이지 레이아웃
import { MainLayout } from 'src/layouts/main'; // 메인 페이지 레이아웃
import { SimpleLayout } from 'src/layouts/simple'; // 단순 페이지 레이아웃

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const UserMainPage = lazy(() => import('src/pages/main/user'));
const UserProfilePage = lazy(() => import('src/pages/account/profile/user'));
const UserCarsPage = lazy(() => import('src/pages/car/search'));
const UserCarRegisterPage = lazy(() => import('src/pages/car/register'));
const UserCarModifyPage = lazy(() => import('src/pages/car/modify'));
const UserRepairRequestsPage = lazy(() => import('src/pages/repair-request/search'));
const UserRepairRequestPage = lazy(() => import('src/pages/repair-request/detail'));
const UserCreateRepairRequestPage = lazy(() => import('src/pages/repair-request/create'));

// ----------------------------------------------------------------------

/**
 * 사용자 페이지들
 * 사용자 계정에서 사용하는 페이지들을 정의합니다.
 */
export const userRoutes = [
  {
    path: 'user', // url
    children: [
      /**
       * 단일 페이지들
       */
      {
        path: '', // 사용자 메인 페이지
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <UserMainPage />
          </MainLayout>
        ),
      },
      {
        path: 'profile',
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <UserProfilePage />
          </MainLayout>
        ),
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
          { path: 'cars', element: <UserCarsPage /> }, // 사용자 차량 목록 페이지
          { path: 'car-register', element: <UserCarRegisterPage /> }, // 차량 등록 페이지
          { path: 'car-modify', element: <UserCarModifyPage /> }, // 차량 수정 페이지
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
          { path: 'repair-requests', element: <UserRepairRequestsPage /> }, // 수리 요청 목록 페이지
          { path: 'repair-request', element: <UserRepairRequestPage /> }, // 수리 요청 상세 페이지
          { path: 'repair-request-write', element: <UserCreateRepairRequestPage /> }, // 수리 요청 작성 페이지
        ],
      },
    ]
  },
];