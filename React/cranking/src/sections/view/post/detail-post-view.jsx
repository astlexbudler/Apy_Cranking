import Container from '@mui/material/Container';

import { PostView } from 'src/sections/component/post-view';
import { CommentTable } from 'src/sections/component/comment-table';
import { ButtonGoback } from 'src/sections/component/button-goback';
import { CommentWriteForm } from 'src/sections/form/comment-write-form';



// 게시글 세부 내용 메인 섹션
// ----------------------------------------------------------------------
export function DetailPostView({ post, comments }) {

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      <ButtonGoback />
      <PostView post={post} />

      <CommentWriteForm />

      <CommentTable comments={comments} />

    </Container>
  );
}
