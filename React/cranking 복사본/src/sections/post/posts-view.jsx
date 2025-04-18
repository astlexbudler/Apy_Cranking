import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { _tags, _mock, _coursePosts } from 'src/_mock';

import { Advertisement } from '../advertisement';
import { PostSidebar } from '../blog/post-sidebar';
import { ElearningPosts } from './posts/elearning-posts';
import { ElearningNewsletter } from './elearning-newsletter';
import { PostSearchMobile } from '../blog/post-search-mobile';
import { ElearningFeaturedPost } from './posts/elearning-featured-post';

// ----------------------------------------------------------------------

const posts = _coursePosts.slice(0, 8);
const featuredPost = _coursePosts[3];
const recentPosts = _coursePosts.slice(-4);

// ----------------------------------------------------------------------

export function PostsView() {
  return (
    <>
      <PostSearchMobile />
      <Container sx={{ pt: 10 }}>
        <ElearningPosts posts={posts} />
      </Container>
    </>
  );
}
