import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

// PostTableRow 컴포넌트에서 사용되는 transition 효과를 정의
const transition = (theme) =>
    theme.transitions.create(['opacity', 'transform', 'background-color'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.short,
    });

export function PostTable({ posts }) {

    // 조건부 렌더링을 위한 함수
    if (!posts || posts == []) {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">
                                게시글이 없습니다.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    // 게시글 테이블 행 렌더링 함수
    const renderPostTableRow = (ps) => (
        Array.from({ length: ps.length }).map((_, index) => (
            <TableRow
                key={index}
                sx={{
                    transition, // 기본 상태에서도 transition 적용
                    '&:hover': {
                        transform: 'scale(1.01)',
                        backgroundColor: 'grey.100',
                    },
                }}
            >
                <TableCell component="th" scope="row">
                    <Link
                        underline="hover"
                        href={`/post?id=${ps[index].id}`}
                        color="text.primary"
                        variant="subtitle2"
                    >
                        {ps[index].title} [{ps[index].commentCount}]
                    </Link>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="caption">
                        {ps[index].author.nickname}
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="caption">
                        {ps[index].createdAt}
                    </Typography>
                </TableCell>
            </TableRow>
        ))
    );

    return (
        <TableContainer component={Paper} sx={{ minHeight: '500px' }}>
            <Table sx={{ overflow: 'hidden' }}>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{ backgroundColor: 'background.paper' }}
                        >
                            게시글
                            <Iconify
                                icon='mynaui:chevron-down-solid'
                                sx={{ width: 16, height: 16, ml: 1 }}
                                color="text.secondary"
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderPostTableRow(posts)}
                </TableBody>
            </Table>
        </TableContainer >
    )
}