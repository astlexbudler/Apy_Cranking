import Link from '@mui/material/Link';

import { paths } from 'src/routes/paths';

import { Logo } from 'src/components/logo';

import { SectionTitle } from 'src/sections/component/section-title';
import { AccountSignInForm } from 'src/sections/form/account-sign-in-form';
import { ButtonGroupSocialLogin } from 'src/sections/component/button-group-social-login';




// 로그인 메인 섹션
// ----------------------------------------------------------------------
export function AccountSignInView() {

  return (
    <>

      {/* 상단 로고 */}
      <Logo sx={{ alignSelf: { xs: 'center', md: 'flex-start' } }} />

      {/* 페이지 제목 및 설명 */}
      <SectionTitle
        title="로그인"
        description={
          <>
            {`계정이 없으신가요? `}
            <Link
              href={paths.signUp}
              variant="subtitle2"
            >
              가입하기
            </Link>
          </>
        }
        sx={{ mt: { xs: 5, md: 8 }, textAlign: { xs: 'center', md: 'left' } }}
      />

      {/* 로그인 폼 */}
      <AccountSignInForm />

      {/* 소셜 로그인 버튼 그룹 */}
      <ButtonGroupSocialLogin />

    </>
  );
}
