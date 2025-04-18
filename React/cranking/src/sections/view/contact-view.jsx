import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

import { SectionTitle } from 'src/sections/component/section-title';


// 연락처 메인 섹션
// ----------------------------------------------------------------------
export function ContactView() {
  const image = `${CONFIG.assetsDir}/assets/icons/banner/ic-python.svg`;

  const rowStyles = {
    sx: {
      gap: 1,
      display: 'flex',
      alignItems: 'flex-start'
    }
  };

  const renderImage = () => (
    <Box
      component="img"
      src={image}
      sx={{
        maxWidth: '100%',
        width: '100px',
        aspectRatio: '1/1',
        objectFit: 'contain',
        mb: 2,
      }}
    />
  );

  const renderContactInfo = () => (
    <>
      <Box {...rowStyles}>
        <Iconify width={24} icon="carbon:location" sx={{ mt: '2px' }} />
        <div>
          <Box sx={{ gap: 1, display: 'flex', alignItems: 'center', mb: 0.5, typography: 'h6' }}>
            주소
            <Link>
              <Iconify inline width={18} icon="carbon:launch" />
            </Link>
          </Box>
          <Typography variant="body2">508 Bridle Avenue Newnan, GA 30263e</Typography>
        </div>
      </Box>
      <Box {...rowStyles}>
        <Iconify width={24} icon="solar:smartphone-outline" sx={{ mt: '2px' }} />
        <div>
          <Typography variant="h6" sx={{ mb: 0.5, textAlign: 'left' }}>
            연락처
          </Typography>
          <Typography variant="body2">+1 234 567 890</Typography>
        </div>
      </Box>
      <Box {...rowStyles}>
        <Iconify width={24} icon="carbon:email" sx={{ mt: '2px' }} />
        <div>
          <Typography variant="h6" sx={{ mb: 0.5, textAlign: 'left' }}>
            이메일
          </Typography>
          <Link color="inherit" variant="body2" href="mailto:hello@example.com">
            hello@example.com
          </Link>
        </div>
      </Box>
      <Box {...rowStyles}>
        <Iconify width={24} icon="solar:clock-circle-outline" sx={{ mt: '2px' }} />
        <div>
          <Typography variant="h6" sx={{ mb: 0.5, textAlign: 'left' }}>
            운영시간
          </Typography>
          <Typography variant="body2">Mon-Fri: 9 am — 6 pm</Typography>
        </div>
      </Box>
    </>
  );

  return (
    <Container sx={{ textAlign: 'left' }}>

      {/* 페이지 제목 */}
      {renderImage()}
      <SectionTitle
        title="크랭킹"
        description="서비스 소개 텍스트"
      />

      {/* 연락처 정보 */}
      <Box
        sx={[
          { gap: 3, display: 'flex', flexDirection: 'column' },
        ]}
      >
        {renderContactInfo()}
      </Box>

    </Container>
  );
}
