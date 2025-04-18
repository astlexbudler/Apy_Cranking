import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

// PostCard 컴포넌트에서 사용되는 transition 효과를 정의
const transition = (theme) =>
    theme.transitions.create(['opacity', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.short,
    });

export function PostCardList({ posts }) {

    // 조건부 렌더링을 위한 함수
    if (!posts || posts == []) {
        return (
            <Paper>
                <Typography align="center" sx={{ p: 2 }}>
                    게시글이 없습니다.
                </Typography>
            </Paper>
        );
    }

    // 게시글 카드 렌더링 함수
    const renderPostCard = (ps) => (
        Array.from({ length: ps.length }).map((_, index) => (
            <Paper
                sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    '&:hover': {
                        '&': { transform: 'scale(1.01)', transition },
                        '& img': { opacity: 0.8, transform: 'scale(1.06)', transition },
                    },
                }}
                elevation={2}
            >
                <Image
                    src={ps[index].image}
                    ratio="1/1"
                />
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>

                    <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'right' }}>
                        views: {ps[index].viewCount}
                    </Typography>

                    <Link
                        href='/post'
                        color="inherit"
                        variant="h6"
                        sx={(theme) => ({
                            ...theme.mixins.maxLine({ line: 2, persistent: theme.typography.h6 }),
                        })}
                    >
                        {ps[index].title}
                    </Link>

                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {ps[index].createdAt}
                    </Typography>

                </Box>
            </Paper>
        ))
    );

    return (
        <Box
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1 auto',
                overflowY: 'auto',
                minHeight: '500px',
            }}
        >
            <Typography
                sx={{
                    mb: 2,
                    color: 'text.secondary',
                }}
                variant='subtitle2'
            >
                게시글
                <Iconify
                    icon='mynaui:chevron-down-solid'
                    sx={{ width: 16, height: 16, ml: 1 }}
                    color="text.secondary"
                />
            </Typography>
            <Box
                sx={[
                    {
                        display: 'grid',
                        columnGap: 4,
                        rowGap: { xs: 4, md: 5 },
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                    },
                ]}
            >
                {renderPostCard(posts)}
            </Box>
        </Box >
    )
}