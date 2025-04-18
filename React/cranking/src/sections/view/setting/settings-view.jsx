import Container from '@mui/material/Container';

import { ButtonGoback } from 'src/sections/component/button-goback';
import { SectionTitle } from 'src/sections/component/section-title';



// 서비스 설정 메인 섹션
// ----------------------------------------------------------------------
export function SettingsView() {

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      <ButtonGoback />

      <SectionTitle
        title="수리 요청 상세"
        description="12가 3456 차량 수리 요청"
      />

    </Container>
  );
}
