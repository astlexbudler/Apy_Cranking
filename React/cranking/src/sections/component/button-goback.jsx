import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ButtonGoback() {

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="caption"
        sx={{
          mb: 3,
          color: 'text.disabled',
        }}
      >
        <Iconify
          icon="ic:baseline-arrow-back-ios"
          sx={{
            width: 12,
            height: 12,
            color: 'text.disabled',
          }}
        />
        뒤로가기
      </Typography>
      <Divider sx={{ my: 2 }} />
    </Box>
  )
}