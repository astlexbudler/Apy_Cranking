import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { AuthLayout } from 'src/layouts/auth'; // 로그인 페이지 레이아웃
import { MainLayout } from 'src/layouts/main'; // 메인 페이지 레이아웃
import { SimpleLayout } from 'src/layouts/simple'; // 단순 페이지 레이아웃

import { SplashScreen } from 'src/components/loading-screen';

import { userRoutes } from './user';
import { partnerRoutes } from './partner';
import { superuserRoutes } from './superuser';




// lazy loading
// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/sign-in')); // 로그인 페이지(시작 페이지)
const SignUpPage = lazy(() => import('src/pages/sign-up')); // 회원가입 페이지
const VerifyPage = lazy(() => import('src/pages/verify'));
const ResetPage = lazy(() => import('src/pages/reset'));
const NoticesPage = lazy(() => import('src/pages/notices')); // 공지사항 페이지
const EventsPage = lazy(() => import('src/pages/events')); // 이벤트 페이지
const PostPage = lazy(() => import('src/pages/post'));
const ChatPage = lazy(() => import('src/pages/chat'));
const MapPage = lazy(() => import('src/pages/map'));
const MechanicViewPage = lazy(() => import('src/pages/mechanic-view'));
const ContactPage = lazy(() => import('src/pages/contact'));
const TermsPage = lazy(() => import('src/pages/terms'));
const MaintenancePage = lazy(() => import('src/pages/maintenance'));
const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));
const Page500 = lazy(() => import('src/pages/error/500'));
const Page404 = lazy(() => import('src/pages/error/404')); // 404 페이지


// routes section
/**
 * 라우트 섹션
 * 아래 라우트 섹션에서 필요한 페이지들을 import하여 사용합니다. (lazy loading)
 * 새로운 페이지를 추가할 때는 src/routes/path.js에 라우트 경로를 추가하고, src/pages에 필요한 페이지를 추가합니다.
 */
// ----------------------------------------------------------------------

export const routesSection = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true, // 로그인 페이지(시작 페이지)
        element: (
          <AuthLayout>
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        element: (
          <AuthLayout slotProps={{ content: { compact: true } }}>
            <Outlet />
          </AuthLayout>
        ),
        children: [
          { path: 'sign-up', element: <SignUpPage /> }, // 회원가입 페이지
          { path: 'verify', element: <VerifyPage /> }, // 이메일 인증 페이지
          { path: 'reset', element: <ResetPage /> }, // 비밀번호 재설정 페이지
        ],
      },
      {
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <Outlet />
          </MainLayout>
        ),
        children: [
          { path: 'notices', element: <NoticesPage /> }, // 공지사항 페이지
          { path: 'events', element: <EventsPage /> }, // 이벤트 페이지
          { path: 'post', element: <PostPage /> }, // 게시물 상세 페이지
          { path: 'chat', element: <ChatPage /> }, // 채팅 페이지
          { path: 'map', element: <MapPage /> }, // 지도 페이지
          { path: 'mechanic-view', element: <MechanicViewPage /> }, // 정비소 페이지
        ],
      },
      {
        element: (
          <SimpleLayout slotProps={{ content: { compact: true } }}>
            <Outlet />
          </SimpleLayout>
        ),
        children: [
          { path: 'contact', element: <ContactPage /> }, // 고객센터 페이지
          { path: 'terms', element: <TermsPage /> }, // 이용약관 페이지
          { path: 'coming-soon', element: <ComingSoonPage /> }, // 준비중 페이지
          { path: 'maintenance', element: <MaintenancePage /> }, // 유지보수 페이지
        ],
      },

      // 사용자 페이지들(/user)
      ...userRoutes,

      // 파트너 페이지들(/partner)
      ...partnerRoutes,

      // 관리자 페이지들(/superuser)
      ...superuserRoutes,

      // 에러 페이지들
      {
        element: (
          <SimpleLayout slotProps={{ content: { compact: true } }}>
            <Outlet />
          </SimpleLayout>
        ),
        children: [
          { path: '500', element: <Page500 /> }, // 서버 에러 페이지
          { path: '*', element: <Page404 /> }, // 알 수 없는 페이지(404) - 경로가 잘못되었거나, 페이지가 존재하지 않음
        ],
      },
    ],
  },
];
