import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';

import { _mock } from 'src/_mock';

import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

// ----------------------------------------------------------------------

export function ServiceEventCarousel() {
  const SLIDES = Array.from({ length: 20 }, (_, index) => ({
    id: _mock.id(index),
    title: _mock.postTitle(index),
    coverUrl: _mock.image.cover(index),
    description: _mock.description(index),
  }));
  const data = SLIDES.slice(2, 6)


  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  return (
    <>
      <Box sx={{ position: 'relative', mb: 5, width: '100%' }}>
        <Carousel carousel={carousel} sx={{ borderRadius: 2, width: '100%' }}>
          {data.map((item, index) => (
            <CarouselItem key={item.id} index={index} item={item} />
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
    </>
  );
}

function CarouselItem({ item, index }) {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box
        component="img"
        alt={item.title}
        src={item.coverUrl}
        sx={{ objectFit: 'cover', aspectRatio: { xs: '4/3', sm: '16/10' }, width: '100%' }}
      />
    </Box>
  );
}
