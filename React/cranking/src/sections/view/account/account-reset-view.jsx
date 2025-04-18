import Box from '@mui/material/Box';

import { CONFIG } from 'src/global-config';

import { Logo } from 'src/components/logo';

import { SectionTitle } from 'src/sections/component/section-title';
import { AccountResetForm } from 'src/sections/form/account-reset-form';



// 계정 찾기 비밀번호 초기화 메인 섹션
// ----------------------------------------------------------------------
export function AccountResetView() {
  const image = `${CONFIG.assetsDir}/assets/images/auth/lock.png`;

  // 아이콘 렌더링
  const renderIcon = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: { xs: 5, md: 8 },
      }}
    >
      <Box
        component="img"
        src={image}
        sx={{ width: 90, height: 90 }}
      />
    </Box>
  );

  return (
    <>
      {/* 상단 로고 */}
      <Logo sx={{ alignSelf: { xs: 'center', md: 'flex-start' } }} />

      {/* 페이지 제목 및 설명 */}
      {renderIcon}
      <SectionTitle
        title="비밀번호 재설정"
        description="이메일 인증코드와 새 비밀번호를 입력해주세요."
        sx={{ mt: { xs: 5, md: 8 }, textAlign: { xs: 'center', md: 'left' } }}
      />

      {/* 비밀번호 재설정 폼 */}
      <AccountResetForm />

    </>
  );
}
