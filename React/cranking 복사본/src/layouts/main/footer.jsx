import { varAlpha, isEqualPath } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button, { buttonClasses } from '@mui/material/Button';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { _socials } from 'src/_mock';
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';

import { pageLinks as listItems } from '../nav-config-main';

// ----------------------------------------------------------------------

export function Footer({ layoutQuery = 'md', sx, ...other }) {
  const pathname = usePathname();

  const renderInfo = () => (
    <>
      <Logo />
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        The starting point for your next project based on easy-to-customize Material-UI © helps you
        build apps faster and better.
      </Typography>
    </>
  );

  const renderApps = () => (
    <>
      <Typography variant="h6">Apps</Typography>

      <Box
        sx={{
          gap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <AppStoreButton
          startIcon={<Iconify width={28} icon="ri:apple-fill" />}
          caption="Download on the"
          title="Apple Store"
        />
        <AppStoreButton
          startIcon={<Iconify width={28} icon="logos:google-play-icon" />}
          caption="Download from"
          title="Google Play"
        />
      </Box>
    </>
  );

  const renderTop = () => (
    <Container sx={{ py: 10 }}>
      <Grid container spacing={3}>
        <Grid
          size={{ xs: 12, md: 5, lg: 4 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, md: 5 },
          }}
        >
          <Box sx={[(theme) => ({ ...blockStyles(theme, layoutQuery) }), { gap: 3 }]}>
            {renderInfo()}
          </Box>

          <Box sx={[(theme) => ({ ...blockStyles(theme, layoutQuery) })]}>{renderApps()}</Box>
        </Grid>

      </Grid>
    </Container>
  );

  const renderBottom = () => (
    <Container
      sx={{
        py: 3,
        gap: 2.5,
        display: 'flex',
        textAlign: 'center',
        color: 'text.secondary',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Typography variant="caption"> © All rights reserved.</Typography>

      <Box
        component="span"
        sx={{
          gap: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link variant="caption" color="inherit" href='/contact'>
          고객센터
        </Link>
        <Box
          sx={{
            width: 3,
            height: 3,
            opacity: 0.4,
            borderRadius: '50%',
            bgcolor: 'currentColor',
          }}
        />
        <Link variant="caption" color="inherit" href='/terms'>
          개인정보 처리 방침 및 이용약관
        </Link>
      </Box>
    </Container>
  );

  return (
    <Box
      component="footer"
      sx={[
        (theme) => ({
          borderTop: `solid 1px ${theme.vars.palette.divider}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {renderTop()}
      <Divider />
      {renderBottom()}
    </Box>
  );
}

// ----------------------------------------------------------------------

const blockStyles = (theme, layoutQuery) => ({
  gap: 2,
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  [theme.breakpoints.up(layoutQuery)]: {
    textAlign: 'left',
    alignItems: 'flex-start',
  },
});

const AppStoreButton = styled(({ title, caption, ...other }) => (
  <Button {...other}>
    <div>
      <Box
        component="span"
        sx={{
          opacity: 0.72,
          display: 'block',
          textAlign: 'left',
          typography: 'caption',
        }}
      >
        {caption}
      </Box>

      <Box component="span" sx={{ mt: -0.5, typography: 'h6' }}>
        {title}
      </Box>
    </div>
  </Button>
))(({ theme }) => ({
  flexShrink: 0,
  padding: '5px 12px',
  color: theme.vars.palette.common.white,
  border: `solid 1px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.vars.palette.grey[900]}, ${theme.vars.palette.common.black})`,
  [`& .${buttonClasses.startIcon}`]: {
    marginLeft: 0,
  },
}));
