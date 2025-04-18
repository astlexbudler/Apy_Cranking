import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { CONFIG } from 'src/global-config';

import { SectionTitle } from 'src/sections/component/section-title';



// 점검중 메인 섹션
// ----------------------------------------------------------------------
export function MaintenanceView() {
  const image = `${CONFIG.assetsDir}/assets/images/menu/repair.png`;

  // 이미지 렌더링
  const renderImage = (
    <Box
      component="img"
      src={image}
      sx={{
        maxWidth: '100%',
        width: '100px',
        aspectRatio: '1/1',
        objectFit: 'contain',
        mb: 2,
      }}
    />
  )

  return (
    <Container sx={{ textAlign: 'left' }}>

      {/* 페이지 제목 렌더링 */}
      {renderImage}
      <SectionTitle
        title="서비스 점검 중입니다."
        description="현재 서비스 점검 중입니다. 잠시 후 다시 시도해주세요."
      />

    </Container>
  );
}
