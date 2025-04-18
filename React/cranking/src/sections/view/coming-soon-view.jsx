import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { CONFIG } from 'src/global-config';

import { SectionTitle } from 'src/sections/component/section-title';



// 서비스 준비중 메인 섹션
// ----------------------------------------------------------------------
export function ComingSoonView() {
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
        title="서비스 준비중입니다."
        description="서비스 오픈을 위해서 준비중입니다..."
      />

    </Container>
  );
}
