import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { ButtonCard } from 'src/sections/component/button-card';
import { SectionTitle } from 'src/sections/component/section-title';
import { NoticeSummary } from 'src/sections/component/notice-summary';
import { EventCarousel } from 'src/sections/component/event-carousel';



// 파트너 페이지 메인 섹션
// ----------------------------------------------------------------------
export function PartnerMainView({ noticePosts, eventPosts, orders }) {
  // 정비사 메인 페이지 메뉴 버튼 이미지
  const repairImage = `${CONFIG.assetsDir}/assets/images/menu/repair.png`;
  const mapImage = `${CONFIG.assetsDir}/assets/images/menu/map.png`;
  const mechanicImage = `${CONFIG.assetsDir}/assets/images/menu/mechanic.png`;

  // 정비사 메인 페이지 메뉴 버튼 이미지 렌더링
  const renderImage = (image, size) => (
    <Box
      component="img"
      src={image}
      sx={{
        width: size == 'small' ? '25%' : '35%',
        minWidth: size == 'small' ? '80px' : '85px',
        aspectRatio: '1/1',
        objectFit: 'contain'
      }}
    />
  )

  // 정비사 메인 페이지 메뉴 버튼 텍스트 렌더링
  const renderContent = (title, subTitle, size) => (
    <Typography
      variant={size == 'small' ? 'h6' : 'h4'}
      sx={{
        ml: size == 'small' ? 2 : 3,
        color: 'text.primary'
      }}
    >
      {title}
      <Typography
        variant={size == 'small' ? 'body2' : 'body1'}
        sx={{ color: 'text.secondary' }}
      >
        {subTitle}
      </Typography>
    </Typography>
  )

  // 정비사의 진행중인 주문 렌더링
  const renderOngoingRepairRequest = () => {
    if (orders) {
      return (
        orders.map((item) => (
          <ButtonCard
            key={item.id}
            link='/user/repair-request'
          >
            <Box sx={{ gap: 1, display: 'flex', alignItems: 'center', typography: 'h4' }}>
              {item.car.number}
              <Typography variant="subtitle2" component="span" sx={{ color: 'text.secondary' }}>
                {item.car.name}
              </Typography>
            </Box>
            {item.user.nickname}님
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
          </ButtonCard>
        ))
      )
    } else {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            typography: 'h4',
            color: 'text.secondary'
          }}
        >
          수리 요청 내역이 없습니다.
        </Box>
      )
    }
  }

  // 수리 요청 확인 버튼 렌더링
  const renderRepairButton = (
    <ButtonCard link={`${paths.partner.repairRequests}?status=request`}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        {renderImage(repairImage, 'large')}
        {renderContent('수리 요청 확인', '새 차량 정비 요청 확인', 'large')}
      </Box>
    </ButtonCard>
  )

  // 내 정비 요청 버튼 렌더링
  const renderMyRepairButton = (
    <ButtonCard link={`${paths.partner.repairRequests}?status=ongoing`}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        {renderImage(mechanicImage, 'small')}
        {renderContent('내 정비 요청', '진행중인 정비 요청 확인', 'small')}
      </Box>
    </ButtonCard>
  );

  // 정비소 찾기 버튼 렌더링
  const renderMapButton = (
    <ButtonCard link={paths.map}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        {renderImage(mapImage, 'small')}
        {renderContent('정비소 찾기', '주변 정비소 찾기', 'small')}
      </Box>
    </ButtonCard>
  )

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      {/* 메인 페이지 공지사항 */}
      <NoticeSummary posts={noticePosts} />

      {/* 메인 페이지 이벤트 */}
      <EventCarousel posts={eventPosts} />

      {/* 정비사의 진행중인 수리 요청 */}
      <SectionTitle
        title="진행중인 수리 요청"
        description="내 정비소의 진행중인 수리 요청을 확인하세요."
      />
      {renderOngoingRepairRequest(orders)}

      {/* 정비사 메인 페이지 메뉴 버튼 */}
      <Box sx={{ mb: 5 }}>

        <SectionTitle
          title="서비스"
          description="주변 정비 요청 검색 및 정비 요청 관리"
        />

        <Box
          component="section"
          sx={[
            {
              gap: 1,
              display: 'grid',
              pb: { xs: 5, md: 10 },
              gridTemplateColumns: { xs: 'repeat(2, 1fr)' },
            }
          ]}
        >
          {renderRepairButton}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
            {renderMyRepairButton}
            {renderMapButton}
          </Box>
        </Box >

      </Box >

    </Container >
  );
}
