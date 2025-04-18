import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export function SignUpTerms({ sx, ...other }) {
  return (
    <Box
      component="span"
      sx={[
        {
          mt: 3,
          display: 'block',
          textAlign: 'center',
          typography: 'caption',
          color: 'text.secondary',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Link
        underline="always"
        color="text.primary"
        component={RouterLink}
        href={paths.terms}
        target="_blank"
      >
        개인정보 처리 방침 및 이용약관
      </Link>
      {' 에 동의합니다.'}
      .
    </Box>
  );
}
