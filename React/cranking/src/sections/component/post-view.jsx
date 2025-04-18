import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function PostView({ post }) {

    // 조건부 렌더링을 위한 함수
    if (!post) {
        return (
            <Box sx={{ textAlign: 'center', py: 4, minHeight: '300px' }}>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{ mt: 4, color: 'text.secondary' }}
                >
                    게시글을 확인할 수 없습니다.
                </Typography>
            </Box>
        );
    }

    // 게시글 제목 렌더링
    const renderTitleArea = () => (
        <>
            <Typography variant="h4" component="h1" sx={{ mt: 4 }}>
                {post.title}
            </Typography>
            <Box sx={{ my: 4, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        {post.author.nickname}
                    </Typography>
                    <Box
                        sx={[
                            {
                                flexWrap: 'wrap',
                                display: 'flex',
                                alignItems: 'center',
                                typography: 'caption',
                                color: 'text.secondary',
                            },
                        ]}
                    >
                        작성일 {post.createdAt}
                        <Typography sx={{ mx: 1 }}>·</Typography>
                        조회수: {post.viewCount}
                    </Box>
                </Box>
                <IconButton color='default'>
                    <Iconify icon="solar:share-outline" />
                </IconButton>
            </Box>
        </>
    )

    const renderContentArea = () => (
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
    )

    return (
        <>
            <Box>
                {renderTitleArea()}
            </Box>
            <Box sx={{ pb: 5 }}>
                {renderContentArea()}
            </Box >
        </>
    )
}