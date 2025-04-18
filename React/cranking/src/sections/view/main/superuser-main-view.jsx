import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { ButtonCard } from 'src/sections/component/button-card';
import { SectionTitle } from 'src/sections/component/section-title';
import { NoticeSummary } from 'src/sections/component/notice-summary';
import { EventCarousel } from 'src/sections/component/event-carousel';



// 관리자 페이지 메인 섹션
// ----------------------------------------------------------------------
export function SuperuserMainView({ noticePosts, eventPosts }) {

  // 관리자 메인 페이지 메뉴 버튼 이미지
  const repairImage = `${CONFIG.assetsDir}/assets/images/menu/repair.png`;
  const mapImage = `${CONFIG.assetsDir}/assets/images/menu/map.png`;
  const carImage = `${CONFIG.assetsDir}/assets/images/menu/car.png`;
  const userImage = `${CONFIG.assetsDir}/assets/images/menu/group.png`;
  const mechanicImage = `${CONFIG.assetsDir}/assets/images/menu/mechanic.png`;
  const noticeImage = `${CONFIG.assetsDir}/assets/images/menu/megaphone.png`;
  const eventImage = `${CONFIG.assetsDir}/assets/images/menu/presents.png`;
  const devImage = `${CONFIG.assetsDir}/assets/images/menu/coding.png`;
  const settingImage = `${CONFIG.assetsDir}/assets/images/menu/settings.png`;

  // 관리자 메인 페이지 메뉴 버튼 이미지 렌더링
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

  // 관리자 메인 페이지 메뉴 버튼 텍스트 렌더링
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

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      {/* 메인 페이지 공지사항 */}
      <NoticeSummary posts={noticePosts} />

      {/* 메인 페이지 이벤트 */}
      <EventCarousel posts={eventPosts} />

      {/* 관리자 메인 페이지 메뉴 버튼 */}
      <Box sx={{ mb: 5 }}>

        <SectionTitle
          title="관리자 메뉴"
          description="Cranking 서비스 관리 메뉴"
        />

        <Box
          component="section"
          sx={[
            {
              gap: 1,
              display: 'grid',
              pb: { xs: 5, md: 10 },
              gridTemplateColumns: { xs: 'repeat(2, 1fr)' },
            },
          ]}
        >

          {/* 사용자 관리 */}
          <ButtonCard link={`${paths.superuser.accounts}?accountType=user`}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}>
              {renderImage(userImage, 'small')}
              {renderContent('사용자 관리', '사용자 정보 확인 및 관리', 'small')}
            </Box>
          </ButtonCard>

          {/* 차량 관리 */}
          <ButtonCard link={paths.superuser.cars}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}>
              {renderImage(carImage, 'small')}
              {renderContent('차량 관리', '사용자가 등록한 차량 정보 확인', 'small')}
            </Box>
          </ButtonCard>

          {/* 정비사 관리 */}
          <ButtonCard link={`${paths.superuser.accounts}?accountType=partner`}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}>
              {renderImage(mechanicImage, 'small')}
              {renderContent('정비사 관리', '정비사 정보 확인 및 관리', 'small')}
            </Box>
          </ButtonCard>

          {/* 정비소 찾기 */}
          <ButtonCard link={paths.map}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}>
              {renderImage(mapImage, 'small')}
              {renderContent('정비소 찾기', '가까운 정비소 검색', 'small')}
            </Box>
          </ButtonCard>

          {/* 공지사항 관리 */}
          <ButtonCard link={`${paths.superuser.posts}?board=notice`}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}>
              {renderImage(noticeImage, 'small')}
              {renderContent('공지사항 관리', '공지사항 게시글 등록 및 관리', 'small')}
            </Box>
          </ButtonCard>

          {/* 이벤트 관리 */}
          <ButtonCard link={`${paths.superuser.posts}?board=event`}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}>
              {renderImage(eventImage, 'small')}
              {renderContent('이벤트 관리', '이벤트 게시글 등록 및 관리', 'small')}
            </Box>
          </ButtonCard>

          {/* 주문 관리 */}
          <ButtonCard link={`${paths.superuser.repairRequests}`}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}>
              {renderImage(repairImage, 'small')}
              {renderContent('수리 요청 확인', '사용자가 신청한 수리 요청 확인', 'small')}
            </Box>
          </ButtonCard>

          {/* 서버 로그 */}
          <ButtonCard link={paths.superuser.logs}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}>
              {renderImage(devImage, 'small')}
              {renderContent('서버 로그', '서버 로그 메세지 확인', 'small')}
            </Box>
          </ButtonCard>

          {/* 시스템 설정 */}
          <ButtonCard link={paths.superuser.settings}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}>
              {renderImage(settingImage, 'small')}
              {renderContent('시스템 설정', '시스템 설정 및 관리', 'small')}
            </Box>
          </ButtonCard>

        </Box>

      </Box >
    </Container >
  );
}
