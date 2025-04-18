import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ButtonCard } from 'src/sections/component/button-card';
import { SectionTitle } from 'src/sections/component/section-title';

// ----------------------------------------------------------------------

export function RepairRequestTable({ orders }) {

    // 조건부 렌더링을 위한 함수
    if (!orders || orders.length == []) {
        return (
            <Box sx={{ mb: 5 }}>

                <SectionTitle
                    title="최근 수리 요청"
                    description="내 차량의 최근 수리 요청 내역을 확인하세요."
                />

                <Typography
                    variant="subtitle1"
                    sx={{
                        py: 2,
                        color: 'text.disabled',
                    }}
                >
                    최근 수리 요청 내역이 없습니다.
                </Typography>

            </Box>
        );
    }

    // 카드 정보 렌더링 함수
    const renderCardInfo = ({ item }) => {
        if (item.mechanic === null) {
            return (
                <>
                    <Box sx={{ gap: 1, display: 'flex', alignItems: 'center', typography: 'h4' }}>
                        견적 받는 중..
                        <Typography variant="subtitle2" component="span" sx={{ color: 'text.secondary' }}>
                            {item.car.number}
                        </Typography>
                    </Box>
                    {item.estimateCount}개의 견적이 도착했습니다.
                    <>
                        <Box sx={{ gap: 1, display: 'flex', typography: 'body2', mt: 3 }}>
                            <Box component="span" sx={{ flexGrow: 1 }}>
                                요청 일시
                            </Box>
                            <Box component="span" sx={{ color: 'text.secondary' }}>
                                {item.createdAt}
                            </Box>
                        </Box>

                        <Box sx={{ gap: 1, display: 'flex', typography: 'body2' }}>
                            <Box component="span" sx={{ flexGrow: 1 }}>
                                현재 상태
                            </Box>
                            <Box component="span" sx={{ color: 'text.secondary' }}>
                                {item.status}
                            </Box>
                        </Box>
                    </>
                </>
            );
        }
        return (
            <>
                <Box sx={{ gap: 1, display: 'flex', alignItems: 'center', typography: 'h4' }}>
                    {item.mechanic.nickname}
                    <Typography variant="subtitle2" component="span" sx={{ color: 'text.secondary' }}>
                        {item.car.number}
                    </Typography>
                </Box>
                {item.mechanic.title}
                <>
                    <Box sx={{ gap: 1, display: 'flex', typography: 'body2', mt: 3 }}>
                        <Box component="span" sx={{ flexGrow: 1 }}>
                            요청 일시
                        </Box>
                        <Box component="span" sx={{ color: 'text.secondary' }}>
                            {item.createdAt}
                        </Box>
                    </Box>

                    <Box sx={{ gap: 1, display: 'flex', typography: 'body2' }}>
                        <Box component="span" sx={{ flexGrow: 1 }}>
                            현재 상태
                        </Box>
                        <Box component="span" sx={{ color: 'text.secondary' }}>
                            {item.status}
                        </Box>
                    </Box>
                </>
            </>
        );
    }

    return (
        <Box sx={{ mb: 5 }}>

            {orders.map((item) => (
                <ButtonCard
                    key={item.id}
                    link='/user/repair-request'
                >
                    {renderCardInfo({ item })}
                </ButtonCard>
            ))}

        </Box>
    );
}
