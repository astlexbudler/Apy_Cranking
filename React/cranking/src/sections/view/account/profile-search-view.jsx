import Container from '@mui/material/Container';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { SectionTitle } from 'src/sections/component/section-title';



// 계정 검색 메인 섹션
// ----------------------------------------------------------------------
export function ProfileSearchView() {

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      <SectionTitle
        title='계정'
        description="게시글 목록"
      />

      <Pagination
        count={10}
        sx={{ py: 10, [`& .${paginationClasses.ul}`]: { justifyContent: 'center' } }}
      />

    </Container>
  );
}
