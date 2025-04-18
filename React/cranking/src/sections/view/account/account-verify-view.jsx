import Box from '@mui/material/Box';

import { CONFIG } from 'src/global-config';

import { Logo } from 'src/components/logo';

import { SectionTitle } from 'src/sections/component/section-title';
import { AccountVerifyForm } from 'src/sections/form/account-verify-form';



// 계정 찾기 인증 번호 발송 메인 섹션
// ----------------------------------------------------------------------
export function AccountVerifyView() {
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
        description="계정에 등록된 이메일 주소를 입력하면 비밀번호 재설정을 위한 인증코드를 보내드립니다."
        sx={{ mt: { xs: 5, md: 8 }, textAlign: { xs: 'center', md: 'left' } }}
      />

      {/* 이메일 입력 폼 */}
      <AccountVerifyForm />

    </>
  );
}
