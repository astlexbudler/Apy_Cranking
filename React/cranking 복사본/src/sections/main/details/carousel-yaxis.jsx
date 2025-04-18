import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

// ----------------------------------------------------------------------

export function CarouselYaxis() {
  const carousel = useCarousel({ loop: true, axis: 'y' }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Carousel
        carousel={carousel}
        sx={{ overflow: 'hidden', height: '30px' }}
      >
        <Box sx={{ position: 'relative', height: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            [공지사항] 크랭킹 서버 점검 안내
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', height: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            [이벤트] 10월 이벤트! 미션을 완료하고 보상을 받자!
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', height: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            [업데이트] 10월 업데이트! 새로운 캐릭터 추가!
          </Typography>
        </Box>
      </Carousel>
    </Box>
  );
}