import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';

import { varBounce, MotionContainer } from 'src/components/animate';



// 서버 오류 메인 섹션
// ----------------------------------------------------------------------
export function Error500View() {

  return (
    <MotionContainer>
      <m.div variants={varBounce('in')}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          500
        </Typography>
      </m.div>

      <m.div variants={varBounce('in')}>
        <Typography sx={{ color: 'text.secondary' }}>
          잘못된 요청입니다. 서버에서 요청을 처리할 수 없습니다.
        </Typography>
      </m.div>

      <m.div variants={varBounce('in')}>
        <Box
          component="img"
          src={`${CONFIG.assetsDir}/assets/illustrations/illustration-404.svg`}
          sx={{ mx: 'auto', width: 320, maxWidth: 1, height: 'auto', my: { xs: 5, sm: 10 } }}
        />
      </m.div>

      <Button component={RouterLink} href="/" size="large" color="inherit" variant="contained">
        처음 페이지
      </Button>
    </MotionContainer>
  );
}
