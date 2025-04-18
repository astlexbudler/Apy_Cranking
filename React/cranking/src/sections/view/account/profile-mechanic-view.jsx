
import { useMemo, useState, useCallback } from 'react';
import { APIProvider, Map as ReactGoogleMap } from '@vis.gl/react-google-maps';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { ButtonGoback } from 'src/sections/component/button-goback';
import { MarkerWithInfo } from 'src/sections/component/marker-with-info';
import { MechanicCarousel } from 'src/sections/component/mechanic-carousel';

// 사용자 계정 프로필 메인 섹션
// ----------------------------------------------------------------------
export function ProfileMechanicView({ account, reviews }) {
  const [activeMarkerId, setActiveMarkerId] = useState(1);
  const position = {
    lat: 37.5665,
    lng: 126.978,
  }

  const defaultCenter = useMemo(() => position, [position]);

  const handleOpenInfo = useCallback(
    (markerId) => {
      if (markerId && activeMarkerId === markerId) {
        setActiveMarkerId(null);
      } else {
        setActiveMarkerId(markerId);
      }
    },
    [activeMarkerId]
  );

  const handleCloseInfo = useCallback(() => setActiveMarkerId(null), []);

  const renderReview = (review) => (
    <>
      <Box sx={{ gap: 2, mb: 5 }}>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Avatar alt={review.writer.nickname} sx={{ width: 40, height: 40 }}>
            {review.writer.nickname[0]}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {review.writer.nickname}
            </Typography>
            <Rating size="small" value={review.rate} precision={0.5} readOnly />
          </Box>
        </Box>

        {review.photo && (
          <Box
            component="img"
            src={review.photo}
            alt="리뷰 이미지"
            sx={{
              width: '100%',
              maxHeight: 160,
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
        )}

        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          {review.content}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          작성일 {review.createdAt}
        </Typography>
      </Box>
      <Divider sx={{ mb: 5 }} />
    </>
  );

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>



      {/* 제목 */}
      <ButtonGoback />
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          프로필 정보
        </Typography>
        <Typography variant="body2" color="text.secondary">
          프로필 정보 확인 및 수정
        </Typography>
      </Box>

      {/* 프로필 정보 */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {account.nickname}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
          {account.title}
        </Typography>
      </Box>

      <MechanicCarousel />

      <Box
        component="section"
        sx={[
          (theme) => ({
            height: '300px',
            overflow: 'hidden',
            //  Remove outline when focused
            '& .gm-style iframe + div': {
              border: 'none !important',
            },
            // Info: wrapper
            '& .gm-style .gm-style-iw-c': {
              borderRadius: 1.5,
              padding: '0px !important',
              boxShadow: theme.vars.customShadows.z8,
            },
            // Info: content
            '& .gm-style .gm-style-iw-d': {
              overflow: 'unset !important',
              maxHeight: 'unset !important',
            },
            // Info: close button
            '& .gm-style-iw-chr': {
              top: 4,
              right: 4,
              position: 'absolute',
              '& button': {
                width: '20px !important',
                height: '20px !important',
                borderRadius: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex !important',
                padding: '4px !important',
                bgcolor: 'black !important',
              },
              '& .gm-ui-hover-effect>span': {
                bgcolor: 'white',
                margin: '0 !important',
                width: '100% !important',
                height: '100% !important',
              },
            },
          }),
        ]}
      >
        <APIProvider apiKey={CONFIG.googleMapApiKey}>
          <ReactGoogleMap
            mapId="49ae42fed52588c3"
            minZoom={1.5}
            defaultZoom={3}
            defaultCenter={defaultCenter}
            gestureHandling="greedy"
            disableDefaultUI
          >
            <MarkerWithInfo
              key={1}
              open={location.id === activeMarkerId}
            />
          </ReactGoogleMap>
        </APIProvider>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* 리뷰 목록 */}
      <Box sx={{ py: 3 }}>
        <Typography variant="h6" gutterBottom>
          사용자 리뷰
        </Typography>

        <Box sx={{ gap: 4 }}>
          {reviews.map((review) => renderReview(review))}
        </Box>
      </Box>
    </Container>
  );
}