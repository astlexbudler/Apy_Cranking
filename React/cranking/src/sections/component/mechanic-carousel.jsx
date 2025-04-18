import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';

import { CONFIG } from 'src/global-config';

import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

// ServiceEventCarousel 컴포넌트에서 사용되는 transition 효과를 정의

export function MechanicCarousel() {
  const carImages = [`${CONFIG.assetsDir}/assets/images/car/car1.jpg`, `${CONFIG.assetsDir}/assets/images/car/car2.jpg`, `${CONFIG.assetsDir}/assets/images/car/car3.jpg`];
  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  return (
    <Box sx={{ position: 'relative', mb: 5, width: '100%' }}>
      <Carousel carousel={carousel} sx={{ borderRadius: 2, width: '100%' }}>
        {carImages.map((image, index) => (
          createCarouselItem(image, index)
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
function createCarouselItem(image, index) {
  return (
    <Box
      key={index}
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={image}
        sx={{
          objectFit: 'cover',
          aspectRatio: { xs: '4/3', sm: '16/10' },
          width: '100%',
        }}
      />

    </Box>
  )
}