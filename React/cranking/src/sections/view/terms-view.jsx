import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { SectionTitle } from 'src/sections/component/section-title';




// 이용약관 메인 섹션
// ----------------------------------------------------------------------
export function SignInView() {

  // 이용약관 박스 랜더링
  const renderTerms = (
    <Paper variant="outlined" sx={{ p: 2, maxHeight: 500, overflow: 'auto' }}>
      <Typography variant="body2" sx={{
        whiteSpace: 'pre-line',
        textAlign: 'left',
      }}>
        {`Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi.
Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Vestibulum eu
odio. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras ultricies mi eu
turpis hendrerit fringilla. Phasellus consectetuer vestibulum elit. Phasellus magna.
Nullam tincidunt adipiscing enim. Vestibulum volutpat pretium libero. Nullam quis ante.
Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut, faucibus non, euismod id,
nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
turpis egestas. Fusce ac felis sit amet ligula pharetra condimentum. Morbi mattis
ullamcorper velit. Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent
turpis. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a
pretium mi sem ut ipsum. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi...`}
      </Typography>
    </Paper>
  )

  return (
    <Container sx={{ textAlign: 'left' }}>

      {/* 페이지 제목 렌더링 */}
      <SectionTitle
        title="이용약관 및 개인정보 처리 방침"
        description="서비스 이용을 위해 아래 내용을 확인해주세요."
      />

      {/* 이용약관 랜더링 */}
      {renderTerms}

    </Container>
  );
}
