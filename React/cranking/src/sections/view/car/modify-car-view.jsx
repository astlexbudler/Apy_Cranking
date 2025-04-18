
import Container from '@mui/material/Container';

import { ButtonGoback } from 'src/sections/component/button-goback';
import { SectionTitle } from 'src/sections/component/section-title';
import { CarRegisterForm } from 'src/sections/form/car-register-form';


// 자동차 정보 수정 메인 섹션
// ----------------------------------------------------------------------
export function ModifyCarView() {

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      {/* 페이지 제목 및 뒤로라기 버튼 */}
      <ButtonGoback />
      <SectionTitle
        title="차량 정보 수정"
        description="차량 정보를 수정하기 위해 아래 정보를 입력해주세요."
      />

      {/* 차량 등록 폼 */}
      <CarRegisterForm />

    </Container>
  );
}
