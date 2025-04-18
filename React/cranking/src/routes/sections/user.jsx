import { lazy } from 'react';
import { Outlet } from 'react-router';

import { MainLayout } from 'src/layouts/main'; // 메인 페이지 레이아웃



// lazy loading
// ----------------------------------------------------------------------

const UserMainPage = lazy(() => import('src/pages/user/main'));
const UserProfilePage = lazy(() => import('src/pages/user/profile'));
const UserCarsPage = lazy(() => import('src/pages/user/cars'));
const UserCarRegisterPage = lazy(() => import('src/pages/user/car-register'));
const UserCarModifyPage = lazy(() => import('src/pages/user/car-modify'));
const UserRepairRequestsPage = lazy(() => import('src/pages/user/repair-requests'));
const UserRepairRequestPage = lazy(() => import('src/pages/user/repair-request'));
const UserCreateRepairRequestPage = lazy(() => import('src/pages/user/repair-request-write'));

// user section
/**
 * 사용자 페이지들
 * 사용자 계정에서 사용하는 페이지들을 정의합니다.
 */
// ----------------------------------------------------------------------

export const userRoutes = [
  {
    path: 'user', // 사용자 페이지
    children: [
      {
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <Outlet />
          </MainLayout>
        ),
        children: [
          { path: '', element: <UserMainPage /> }, // 사용자 메인 페이지
          { path: 'profile', element: <UserProfilePage /> }, // 사용자 프로필 페이지
          { path: 'cars', element: <UserCarsPage /> }, // 사용자 차량 목록 페이지
          { path: 'car-register', element: <UserCarRegisterPage /> }, // 차량 등록 페이지
          { path: 'car-modify', element: <UserCarModifyPage /> }, // 차량 수정 페이지
          { path: 'repair-requests', element: <UserRepairRequestsPage /> }, // 수리 요청 목록 페이지
          { path: 'repair-request', element: <UserRepairRequestPage /> }, // 수리 요청 상세 페이지
          { path: 'repair-request-write', element: <UserCreateRepairRequestPage /> }, // 수리 요청 작성 페이지
        ],
      },
    ]
  },
];