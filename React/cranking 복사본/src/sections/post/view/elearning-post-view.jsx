import { usePopover } from 'minimal-shared/hooks';
import { useFormContext } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { fDate } from 'src/utils/format-time';

import { _socials, _coursePosts } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { Form } from 'src/components/hook-form';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { SignInForm } from '../../auth/components/sign-in-form';
import { SignInSchema } from '../../auth/components/schema';
import { PostAuthor } from '../../blog/post-author';

// ----------------------------------------------------------------------

const post = _coursePosts[0];
const prevPost = _coursePosts[1];
const nextPost = _coursePosts[2];
const latestPosts = _coursePosts.slice(3, 6);

// ----------------------------------------------------------------------

export function ElearningPostView() {
  const openSocial = usePopover();

  const renderHead = () => (
    <Box sx={{ mt: { xs: 5, md: 10 } }}>

      <Typography variant="h2" component="h1" sx={{ my: 3 }}>
        {post.title}
      </Typography>

      <Typography variant="h5" component="p">
        {post.description}
      </Typography>
    </Box>
  );

  const renderToolbar = () => (
    <Box
      sx={[
        (theme) => ({
          py: 3,
          my: 5,
          display: 'flex',
          alignItems: 'center',
          borderTop: `solid 1px ${theme.vars.palette.divider}`,
          borderBottom: `solid 1px ${theme.vars.palette.divider}`,
        }),
      ]}
    >

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{post.author.name}</Typography>
        <Typography variant="caption" sx={{ mt: 0.5, display: 'block', color: 'text.secondary' }}>
          {fDate(post.createdAt)}
        </Typography>
      </Box>

      <IconButton onClick={openSocial.onOpen} color={openSocial.open ? 'primary' : 'default'}>
        <Iconify icon="solar:share-outline" />
      </IconButton>
    </Box>
  );

  const defaultValues = { email: '', password: '' };

  const methods = useForm({ resolver: zodResolver(SignInSchema), defaultValues });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <Divider />

      <Container>
        <CustomBreadcrumbs
          links={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '' },
            { name: post.title },
          ]}
          sx={{ my: { xs: 3, md: 5 } }}
        />

        {renderHead()}

        {renderToolbar()}

        <Markdown content={post.content} firstLetter />

        <Divider sx={{ mt: 10 }} />

        <Form methods={methods} onSubmit={onSubmit}>
          <SignInForm />
        </Form>


        <PostAuthor author={post.author} />

      </Container>

    </>
  );
}
