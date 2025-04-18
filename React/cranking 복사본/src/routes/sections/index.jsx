import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { AuthLayout } from 'src/layouts/auth'; // 로그인 페이지 레이아웃
import { MainLayout } from 'src/layouts/main'; // 메인 페이지 레이아웃
import { SimpleLayout } from 'src/layouts/simple'; // 단순 페이지 레이아웃

import { SplashScreen } from 'src/components/loading-screen';

import { mainRoutes } from './main';
import { userRoutes } from './user';
import { partnerRoutes } from './partner';
import { superuserRoutes } from './superuser';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/account/login'));
const Page404 = lazy(() => import('src/pages/other/error/404'));

// ----------------------------------------------------------------------

/**
 * 라우트 섹션
 * 아래 라우트 섹션에서 필요한 페이지들을 import하여 사용합니다. (lazy loading)
 * 새로운 페이지를 추가할 때는 src/routes/path.js에 라우트 경로를 추가하고, src/pages에 필요한 페이지를 추가합니다.
 */
export const routesSection = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <AuthLayout>
            <HomePage />
          </AuthLayout>
        ),
      },

      // 메인 및 기타 페이지들(/)
      ...mainRoutes,

      // 사용자 페이지들(/user)
      ...userRoutes,

      // 파트너 페이지들(/partner)
      ...partnerRoutes,

      // 관리자 페이지들(/superuser)
      ...superuserRoutes,

      // 404 페이지
      { path: '*', element: <Page404 /> },
    ],
  },
];
