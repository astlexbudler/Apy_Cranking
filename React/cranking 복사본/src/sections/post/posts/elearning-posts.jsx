import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

export function ElearningPosts({ posts, sx, ...other }) {
  return (
    <>
      <Box
        sx={[
          {
            display: 'grid',
            columnGap: 4,
            rowGap: { xs: 4, md: 5 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Box>

      <Pagination
        count={10}
        sx={{ py: 10, [`& .${paginationClasses.ul}`]: { justifyContent: 'center' } }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

export function PostItem({ post, sx, ...other }) {
  return (
    <Paper
      variant="outlined"
      sx={[
        { borderRadius: 2, overflow: 'hidden', bgcolor: 'transparent' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Image src={post.coverUrl} alt={post.title} ratio="1/1" />
      <Box sx={{ display: 'flex', gap: 3, p: 3 }}>

        <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
          <Link
            component={RouterLink}
            href='/post'
            color="inherit"
            variant="h6"
            sx={(theme) => ({
              ...theme.mixins.maxLine({ line: 2, persistent: theme.typography.h6 }),
            })}
          >
            {post.title}
          </Link>

          <Box sx={{ gap: 1.5, display: 'flex', alignItems: 'center', pt: 1.5 }}>
            <Box sx={{ gap: 0.5, display: 'flex', flexDirection: 'column' }}>
              <Box component="span" sx={{ typography: 'body2' }}>
                {post.author.name}
              </Box>

              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                2025-01-01 12:00
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
