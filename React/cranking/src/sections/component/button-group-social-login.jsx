import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import { NaverIcon, KakaoIcon, AppleIcon } from 'src/assets/icons';




// 소셜 로그인 버튼 그룹(네이버, 카카오, 애플)
// ----------------------------------------------------------------------

export function ButtonGroupSocialLogin() {
  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Box
        sx={{ gap: 1.5, display: 'flex', justifyContent: 'center' }}
      >

        <IconButton color="inherit">
          <NaverIcon />
        </IconButton>

        <IconButton color="inherit">
          <KakaoIcon />
        </IconButton>

        <IconButton color="inherit">
          <AppleIcon />
        </IconButton>

      </Box>
    </>
  );
}
