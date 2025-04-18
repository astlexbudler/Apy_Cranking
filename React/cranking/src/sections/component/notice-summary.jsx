import Autoplay from 'embla-carousel-autoplay';
import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Accordion from '@mui/material/Accordion';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { Iconify } from 'src/components/iconify';
import { Carousel, useCarousel } from 'src/components/carousel';

// 공지사항 케로셀 컴포넌트
// ----------------------------------------------------------------------

// 공지사항 목록 컴포넌트에서 사용되는 transition 효과를 정의
const transition = (theme) =>
    theme.transitions.create(['opacity', 'transform', 'background-color'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.short,
    });

export function NoticeSummary({ posts }) {
    const carousel = useCarousel({ loop: true, axis: 'y' }, [Autoplay({ playOnInit: true, delay: 5000 })]);
    const [expanded, setExpanded] = useState(false);
    const handleChange = () => {
        setExpanded(!expanded);
    };

    // 조건부 렌더링을 위한 함수
    if (!posts || posts.length == []) {
        return (
            <Box>
                <Typography
                    variant="h6"
                    sx={{
                        py: 2,
                    }}
                >
                    공지사항이 없습니다.
                </Typography>
            </Box >
        );
    }

    // useCarousel 훅을 사용하여 캐러셀을 초기화합니다.
    // loop: true로 설정하여 무한 루프를 활성화하고, Autoplay 플러그인을 사용하여 자동 재생을 설정합니다.
    const renderCarousel = () => (
        <Carousel
            carousel={carousel}
            sx={{ overflow: 'hidden', height: '30px' }}
        >
            {posts.map((item) => (
                <Box key={item.id} sx={{ position: 'relative', height: 1 }}>
                    <Link
                        underline="hover"
                        href={`/post?id=${item.id}`}
                        color="text.primary"
                        variant="h6"
                    >
                        {item.title}
                    </Link>
                </Box>
            ))}
        </Carousel>
    )

    // 공지사항 아코디언 렌더링
    const renderAccordionDetails = () => (
        <TableContainer component={Paper}>
            <Table sx={{ overflow: 'hidden' }}>
                <TableBody>
                    {posts.map((item) => (
                        <TableRow
                            key={item.id}
                            sx={{
                                transition: transition, // 기본 상태에서도 transition 적용
                                '&:hover': {
                                    transform: 'scale(1.01)',
                                    backgroundColor: 'grey.100',
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <Link
                                    underline="hover"
                                    href='/post?id=1'
                                    color="text.primary"
                                    variant="subtitle2"
                                >
                                    {item.title}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );

    return (
        <Box>
            <Accordion
                sx={{ border: 'none', boxShadow: 'none' }}
                expanded={expanded}
                onChange={handleChange}
            >
                <AccordionSummary>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: 1 }}>
                        <Box sx={{ position: 'relative', width: '100%' }}>
                            {renderCarousel()}
                        </Box>
                        <Iconify
                            width={16}
                            icon={expanded ? 'solar:alt-arrow-up-outline' : 'solar:alt-arrow-down-outline'}
                            sx={{ ml: 2 }}
                        />
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ typography: 'body2', color: 'text.secondary' }}>
                    {renderAccordionDetails()}
                </AccordionDetails>
            </Accordion>
        </Box>
    );

}