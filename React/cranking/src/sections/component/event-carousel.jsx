import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

// ServiceEventCarousel 컴포넌트에서 사용되는 transition 효과를 정의
const transition = (theme) =>
  theme.transitions.create(['opacity', 'transform'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  });

export function EventCarousel({ posts }) {
  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  // 조건부 렌더링을 위한 함수
  if (!posts || posts.length === 0) {
    return createCarouselItem({
      id: 0,
      title: '진행중인 이벤트가 없습니다',
      image: `${CONFIG.assetsDir}/assets/images/cover/cover-1.webp`,
      createdAt: '2025-10-01 12:00',
    });
  }

  return (
    <Box sx={{ position: 'relative', mb: 5, width: '100%' }}>
      <Carousel carousel={carousel} sx={{ borderRadius: 2, width: '100%' }}>
        {posts.map((item, index) => (
          createCarouselItem(item)
        ))}
      </Carousel>

      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{
          top: 16,
          right: 16,
          position: 'absolute',
          color: 'common.white',
        }}
      />
    </Box>
  );
}

// CarouselItem 컴포넌트는 각 슬라이드의 내용을 렌더링합니다.
function createCarouselItem(item) {
  return (
    <Box
      key={item.id}
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={item.image}
        sx={{
          objectFit: 'cover',
          aspectRatio: { xs: '4/3', sm: '16/10' },
          width: '100%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'end',
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 80%, rgb(0, 0, 0) 100%)',
          '&:hover': {
            '&': { transform: 'scale(1.01); opacity: 0.8', transition },
          },
        }}
      >
        <Box
          sx={{
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
          }}
        >
          <Link
            href={item.id !== 0 ? `/post?id=${item.id}` : '/user'}
            color="inherit"
            variant="h4"
            sx={{
              color: 'white',
            }}
          >
            {item.title}
          </Link>
          <Typography
            variant="caption"
            sx={{
              color: 'white',
              textAlign: 'right',
            }}
          >
            {item.createdAt}
          </Typography>
        </Box>
      </Box>

    </Box>
  )
}