import { useState } from 'react';

import Link from '@mui/material/Link';
import { Divider } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';

import { SectionTitle } from 'src/sections/component/section-title';
import { AccountSignUpUserForm } from 'src/sections/form/account-sign-up-user-form';
import { AccountSignUpPartnerForm } from 'src/sections/form/account-sign-up-partner-form';



// 회원가입 메인 섹션
// ----------------------------------------------------------------------
export function AccountSignUpView() {

  // 사용자 계정과 파트너 계정 선택 상태 관리
  const [selectedTab, setSelectedTab] = useState('user');
  const handleTabChange = (event, newAccountType) => {
    if (newAccountType !== null) {
      setSelectedTab(newAccountType);
    }
  };

  // 계정 선택 버튼 그룹 렌더링
  const renderAccountSelectButtonGroup = (
    <ToggleButtonGroup
      value={selectedTab}
      exclusive
      onChange={handleTabChange}
      sx={{ border: 'none' }}
    >
      <ToggleButton
        value="user"
        sx={{
          flexGrow: 1,
          borderRadius: 0,
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        사용자 계정
      </ToggleButton>

      <ToggleButton
        value="partner"
        sx={{
          flexGrow: 1,
          borderRadius: 0,
        }}
      >
        파트너 계정
      </ToggleButton>
    </ToggleButtonGroup>
  );

  // selectedTab에 따라 사용자 계정 또는 파트너 계정 폼 렌더링
  const renderForm = () => {
    if (selectedTab === 'user') {
      return <AccountSignUpUserForm />;
    } else if (selectedTab === 'partner') {
      return <AccountSignUpPartnerForm />;
    }
    return null;
  }

  return (
    <>

      {/* 상단 로고 */}
      <Logo sx={{ alignSelf: { xs: 'center', md: 'flex-start' } }} />

      {/* 페이지 제목 및 설명 */}
      <SectionTitle
        title="회원가입"
        description={
          <>
            {`이미 계정이 있으신가요? `}
            <Link component={RouterLink} href={paths.signIn} variant="subtitle2">
              로그인하기
            </Link>
          </>
        }
        sx={{ mt: { xs: 5, md: 8 }, textAlign: { xs: 'center', md: 'left' } }}
      />

      {/* 사용자 계정과 파트너 계정 선택 */}
      {renderAccountSelectButtonGroup}

      <Divider sx={{ mb: 4 }} />

      {/* 사용자 계정 또는 파트너 계정에 따라 다른 폼 렌더링 */}
      {renderForm()}

    </>
  );
}
