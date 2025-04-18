import Box from '@mui/material/Box';

import { CONFIG } from 'src/global-config';

import SmallImagedCardButton from 'src/components/button/SmallImagedCardButton';
import LargeImagedCardButton from 'src/components/button/LargeImagedCardButton';

// ----------------------------------------------------------------------

export function UserMainCardButtons() {

  const repairImage = `${CONFIG.assetsDir}/assets/images/menu/repair.png`;
  const mapImage = `${CONFIG.assetsDir}/assets/images/menu/map.png`;
  const carImage = `${CONFIG.assetsDir}/assets/images/menu/car.png`;

  return (
    <>
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
        <LargeImagedCardButton photoUrl={repairImage} title="수리" subTitle="차량 수리 서비스" link="/repair" />
        <Box sx={{ gap: 1, display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
          <SmallImagedCardButton photoUrl={mapImage} title="정비소 찾기" subTitle="가까운 정비소 찾기" link="/map" />
          <SmallImagedCardButton photoUrl={carImage} title="차량 등록" subTitle="차량 등록하기" link="/car" />
        </Box>
      </Box>
    </>
  );
}
