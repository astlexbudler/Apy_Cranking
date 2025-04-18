import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { Iconify } from 'src/components/iconify';

import { CarouselYaxis } from './carousel-yaxis';

// ----------------------------------------------------------------------

export function NoticeSummary(expanded) {

    return (
        <Box>
            <Accordion sx={{ border: 'none', boxShadow: 'none' }}>
                <AccordionSummary>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: 1 }}>
                        <CarouselYaxis />
                        <Iconify
                            width={16}
                            icon={expanded ? 'solar:alt-arrow-down-outline' : 'solar:alt-arrow-right-outline'}
                            sx={{ ml: 2 }}
                        />
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ typography: 'body2', color: 'text.secondary' }}>
                    <Box sx={{ my: 2 }}>
                        [공지사항] 크랭킹 서버 점검 안내 (2021.10.01 ~ 2021.10.02)
                    </Box>
                    <Divider />
                    <Box sx={{ my: 2 }}>
                        [이벤트] 10월 이벤트! 미션을 완료하고 보상을 받자!
                    </Box>
                    <Divider />
                    <Box sx={{ my: 2 }}>
                        [업데이트] 10월 업데이트! 새로운 캐릭터 추가!
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
