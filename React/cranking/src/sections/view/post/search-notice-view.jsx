import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { PostTable } from 'src/sections/component/post-table';
import { SectionTitle } from 'src/sections/component/section-title';
import { PostSearchForm } from 'src/sections/form/post-search-form';



// 게시글 검색 메인 섹션
// ----------------------------------------------------------------------
export function SearchNoticeView({ posts }) {

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      <SectionTitle
        title="공지사항"
        description={
          <Box sx={{ display: 'flex' }}>
            <Box>
              공지사항 게시글 목록
            </Box>
            <Button
              size="medium"
              variant="contained"
              sx={{ ml: 'auto', gap: 1 }}
            >
              <i className="fi fi-rr-edit" /> 공지사항 작성
            </Button>
          </Box>
        }
      />

      <PostTable posts={posts} sx={{ mb: 5 }} />

      <PostSearchForm />

      <Pagination
        count={10}
        sx={{ py: 10, [`& .${paginationClasses.ul}`]: { justifyContent: 'center' } }}
      />

    </Container>
  );
}
