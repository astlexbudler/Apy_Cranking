import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { AuthLayout } from 'src/layouts/auth'; // 로그인 페이지 레이아웃
import { MainLayout } from 'src/layouts/main'; // 메인 페이지 레이아웃
import { SimpleLayout } from 'src/layouts/simple'; // 단순 페이지 레이아웃

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const SignUpPage = lazy(() => import('src/pages/account/register'));
const VerifyPage = lazy(() => import('src/pages/account/verify'));
const ResetPage = lazy(() => import('src/pages/account/reset'));
const PostsPage = lazy(() => import('src/pages/post/search'));
const PostPage = lazy(() => import('src/pages/post/view'));
const ChatPage = lazy(() => import('src/pages/other/chat'));
const MapPage = lazy(() => import('src/pages/other/map'));
const MechanicViewPage = lazy(() => import('src/pages/other/mechanic-view'));
const ContactPage = lazy(() => import('src/pages/other/contact'));
const TermsPage = lazy(() => import('src/pages/other/terms'));
const MaintenancePage = lazy(() => import('src/pages/other/maintenance'));
const ComingSoonPage = lazy(() => import('src/pages/other/coming-soon'));
const Page404 = lazy(() => import('src/pages/other/error/404'));
const Page500 = lazy(() => import('src/pages/other/error/500'));

// ----------------------------------------------------------------------

/**
 * 메인 및 기타 페이지들
 * 메인 페이지와 기타 다른 계정에서 공통으로 사용하는 페이지들을 정의합니다.
 */
export const mainRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      /**
       * 단일 페이지들
       */
      {
        path: 'chat', // 채팅 페이지
        element: (
          <SimpleLayout slotProps={{ content: { compact: true } }}>
            <ChatPage />
          </SimpleLayout>
        ),
      },
      {
        path: 'map', // 지도 페이지
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <MapPage />
          </MainLayout>
        ),
      },
      {
        path: 'mechanic-view', // 정비소 페이지
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <MechanicViewPage />
          </MainLayout>
        ),
      },
      {
        path: 'contact', // 연락처 페이지
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <ContactPage />
          </MainLayout>
        ),
      },
      {
        path: 'terms', // 이용약관 페이지
        element: (
          <MainLayout slotProps={{ content: { compact: true } }}>
            <TermsPage />
          </MainLayout>
        ),
      },



      /**
       * 인증 관련 페이지들
       */
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
          { path: 'posts/notice', element: <PostsPage /> }, // 게시글 검색 페이지
          { path: 'posts/event', element: <PostsPage /> }, // 게시글 검색 페이지
          { path: 'post', element: <PostPage /> }, // 게시글 보기 페이지
        ],
      },

      /**
       * 기타 페이지들
      */
      {
        element: (
          <SimpleLayout slotProps={{ content: { compact: true } }}>
            <Outlet />
          </SimpleLayout>
        ),
        children: [
          { path: 'coming-soon', element: <ComingSoonPage /> }, // 준비중 페이지
          { path: 'maintenance', element: <MaintenancePage /> }, // 유지보수 페이지
        ],
      },

      /**
       * 에러 페이지들
      */
      {
        path: 'error',
        children: [
          { path: '500', element: <Page500 /> }, // 500 페이지
          { path: '404', element: <Page404 /> }, // 404 페이지
        ],
      },
    ],
  },
];
