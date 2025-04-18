
import Container from '@mui/material/Container';

import { ButtonGoback } from 'src/sections/component/button-goback';
import { SectionTitle } from 'src/sections/component/section-title';
import { RepairRequestForm } from 'src/sections/form/repair-request-form';



// 정비 요청 작성 메인 섹션
// ----------------------------------------------------------------------
export function WriteRepairRequestView() {

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      <ButtonGoback />

      <SectionTitle
        title="수리 요청 작성"
        description="차량 수리 요청을 작성합니다."
      />

      <RepairRequestForm />

    </Container>
  );
}
