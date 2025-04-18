
import Container from '@mui/material/Container';

import { PostWriteForm } from 'src/sections/form/post-write-form';
import { ButtonGoback } from 'src/sections/component/button-goback';
import { SectionTitle } from 'src/sections/component/section-title';




// 게시글 작성 메인 섹션
// ----------------------------------------------------------------------
export function WritePostView() {

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      <ButtonGoback />

      <SectionTitle
        title="게시글 작성"
        description="게시글 작성을 위해 아래 내용을 입력해주세요."
      />

      <PostWriteForm />

    </Container>
  );
}
