import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { Iconify } from 'src/components/iconify';

import { ButtonCard } from 'src/sections/component/button-card';
import { ButtonGoback } from 'src/sections/component/button-goback';
import { SectionTitle } from 'src/sections/component/section-title';
import { CarDetailModal } from 'src/sections/modal/car-detail-modal';


// 자동차 검색 메인 섹션
// ----------------------------------------------------------------------
export function SearchCarView({ cars }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = (modalName) => () => setOpenModal(modalName);

  // 차량 목록 렌더링
  const renderCarList = (
    cars.map((car, index) => (
      <ButtonCard
        sx={{
          p: 0,
          overflow: 'hidden',
        }}
        key={index}
        onClick={handleOpen('car-detail')}
      >
        <Box
          component="section"
          sx={{
            gap: 1,
            display: 'flex',
          }}
        >
          {/* 차량 이미지 썸네일 */}
          <Box
            sx={{
              width: '200px',
              position: 'relative',
              borderRadius: 2,
              '& img': {
                objectFit: 'cover',
                transition: '0.3s',
              },
            }}
          >
            <Box
              component="img"
              src={car.images[0]}
              sx={{
                width: '100%',
                height: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* 차량 정보 */}
          <Box
            sx={{
              p: 2,
              flex: 1,
            }}
          >
            {/* 차량명 + 번호 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: 'text.primary' }}>
                [{car.manufacturer}] {car.name}
              </Typography>

              <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'right' }}>
                {car.number}
              </Typography>
            </Box>

            {/* 차량 주요 정보 */}
            <Box sx={{ gap: 1.5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ gap: 0.5, display: 'flex', flexDirection: 'column' }}>
                <Box component="span" sx={{ typography: 'body2' }}>
                  {car.year}년식 · {car.fuel} · {car.transmission}
                </Box>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  크기-{car.carSize} · 차종-{car.carType} · {car.cc}cc · 색상-{car.color}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </ButtonCard>
    ))
  )

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      {/* 페이지 제목 및 뒤로가기 버튼 */}
      <ButtonGoback />
      <SectionTitle
        title='내 차량'
        description="게시글 목록"
      />

      {/* 차량 추가 버튼 */}
      <ButtonCard link="/user/car-register" sx={{ backgroundColor: 'background.neutral' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 1,
            py: { xs: 1, md: 2 },
          }}>
          <Iconify icon="eva:plus-fill"
            sx={{
              width: 24,
              height: 24,
              mr: 1,
              color: 'text.disabled',
            }} />
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            차량 추가
          </Typography>
        </Box>
      </ButtonCard>

      {/* 차량 목록 */}
      {renderCarList}

      {/* 페이지네이션 버튼 */}
      <Pagination
        count={10}
        sx={{ py: 10, [`& .${paginationClasses.ul}`]: { justifyContent: 'center' } }}
      />

      <CarDetailModal openModal={openModal} setOpenModal={setOpenModal} />

    </Container>
  );
}
