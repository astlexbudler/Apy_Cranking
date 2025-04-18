import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { NaverIcon, KakaoIcon, AppleIcon } from 'src/assets/icons';

// ----------------------------------------------------------------------

export function FormSocials({
  sx,
  signInWithGoogle,
  singInWithGithub,
  signInWithTwitter,
  ...other
}) {
  return (
    <Box
      sx={[
        { gap: 1.5, display: 'flex', justifyContent: 'center' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <IconButton color="inherit" onClick={signInWithGoogle}>
        <NaverIcon />
      </IconButton>

      <IconButton color="inherit" onClick={signInWithGoogle}>
        <KakaoIcon />
      </IconButton>

      <IconButton color="inherit" onClick={singInWithGithub}>
        <AppleIcon />
      </IconButton>

    </Box>
  );
}
