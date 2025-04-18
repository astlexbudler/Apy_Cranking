import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


// ----------------------------------------------------------------------

export function CommentTable({ comments }) {

    // 조건부 렌더링을 위한 함수
    if (!comments || comments.length === 0) {
        return (
            <>
                <Divider sx={{ mt: 5 }} />

                <Box
                    sx={[
                        { gap: { xs: 3, md: 4 }, py: { xs: 5, md: 10 } },
                    ]}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ color: 'text.secondary' }}
                    >
                        댓글이 없습니다.
                    </Typography>
                </Box>
            </>
        );
    }

    // 댓글 렌더링
    const renderComment = (comment) => (
        <>
            <Box
                sx={{
                    gap: 2,
                    mb: 5,
                }}
            >
                <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ mb: 0.5 }}>
                            {comment.author.nickname}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {comment.author.title}
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {comment.content}
                </Typography>

                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    작성일 {comment.createdAt}
                </Typography>
            </Box>
            <Divider sx={{ mb: 5 }} />
        </>
    )

    return (
        <>
            <Divider sx={{ mt: 5 }} />

            <Box
                sx={[
                    { gap: { xs: 3, md: 4 }, py: 5 },
                ]}
            >
                {comments.map((comment, index) => (
                    renderComment(comment)
                ))}
            </Box>
        </>
    )
}