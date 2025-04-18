
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { Iconify } from 'src/components/iconify';

import { ButtonCard } from 'src/sections/component/button-card';
import { ButtonGoback } from 'src/sections/component/button-goback';
import { SectionTitle } from 'src/sections/component/section-title';



// 정비 요청 조회 메인 섹션
// ----------------------------------------------------------------------
export function SearchRepairRequestView({ orders }) {

  // 정비 요청 목록 렌더링
  const renderRepairRequestList = () => {
    var orderList = [];
    for (var i = 0; i < orders.length; i++) {
      if (orders[i].mechanic === null) {
        orderList.push(
          <ButtonCard>
            <Box sx={{ gap: 1, display: 'flex', alignItems: 'center', typography: 'h4' }}>
              견적 받는 중..
              <Typography variant="subtitle2" component="span" sx={{ color: 'text.secondary' }}>
                {orders[i].car.number}
              </Typography>
            </Box>
            {orders[i].estimateCount}개의 견적이 도착했습니다.
            <>
              <Box sx={{ gap: 1, display: 'flex', typography: 'body2', mt: 3 }}>
                <Box component="span" sx={{ flexGrow: 1 }}>
                  요청 일시
                </Box>
                <Box component="span" sx={{ color: 'text.secondary' }}>
                  {orders[i].createdAt}
                </Box>
              </Box>

              <Box sx={{ gap: 1, display: 'flex', typography: 'body2' }}>
                <Box component="span" sx={{ flexGrow: 1 }}>
                  현재 상태
                </Box>
                <Box component="span" sx={{ color: 'text.secondary' }}>
                  {orders[i].status}
                </Box>
              </Box>
            </>
          </ButtonCard>
        );
        continue;
      }
      orderList.push(
        <ButtonCard>
          <Box sx={{ gap: 1, display: 'flex', alignItems: 'center', typography: 'h4' }}>
            {orders[i].mechanic.nickname}
            <Typography variant="subtitle2" component="span" sx={{ color: 'text.secondary' }}>
              {orders[i].car.number}
            </Typography>
          </Box>
          {orders[i].mechanic.title}
          <>
            <Box sx={{ gap: 1, display: 'flex', typography: 'body2', mt: 3 }}>
              <Box component="span" sx={{ flexGrow: 1 }}>
                요청 일시
              </Box>
              <Box component="span" sx={{ color: 'text.secondary' }}>
                {orders[i].createdAt}
              </Box>
            </Box>

            <Box sx={{ gap: 1, display: 'flex', typography: 'body2' }}>
              <Box component="span" sx={{ flexGrow: 1 }}>
                현재 상태
              </Box>
              <Box component="span" sx={{ color: 'text.secondary' }}>
                {orders[i].status}
              </Box>
            </Box>
          </>
        </ButtonCard>
      );
    }
    return orderList;
  }

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      {/* 페이지 제목 및 뒤로가기 버튼 */}
      <ButtonGoback />
      <SectionTitle
        title="내 수리 요청"
        description="차량 수리 요청 내역을 확인하세요."
      />

      {/* 수리 요청 생성 버튼 */}
      <ButtonCard link="/user/repair-request-write" sx={{ backgroundColor: 'background.neutral' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 1,
            py: { xs: 1, md: 2 },
          }}>
          <Iconify
            icon="ic:baseline-plus"
            sx={{
              width: 24,
              height: 24,
              mr: 1,
              color: 'text.disabled',
            }} />
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            수리 요청
          </Typography>
        </Box>
      </ButtonCard>

      {/* 수리 요청 목록 */}
      {renderRepairRequestList()}

      {/* 페이지네이션 버튼 */}
      <Pagination
        count={10}
        sx={{ py: 10, [`& .${paginationClasses.ul}`]: { justifyContent: 'center' } }}
      />

    </Container>
  );
}
