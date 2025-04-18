import { useState, useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fCurrency } from 'src/utils/format-number';

import CardButton from 'src/components/button/CardButton';

import { FilterTime } from '../filters/filter-time';
import { FilterGuests } from '../filters/filter-guests';

// ----------------------------------------------------------------------

export function CurrentRepairRequest() {

  const renderMechanic = () => (
    <>
      <Box sx={{ gap: 1, display: 'flex', alignItems: 'center', typography: 'h4' }}>
        우리 정비소
        <Typography variant="subtitle2" component="span" sx={{ color: 'text.disabled' }}>
          123가 4567
        </Typography>
      </Box>
      내차처럼 챙겨드립니다.
    </>
  );

  const renderStatus = () => (
    <>
      <Box sx={{ gap: 1, display: 'flex', typography: 'body2', mt: 3 }}>
        <Box component="span" sx={{ flexGrow: 1 }}>
          입고 일시
        </Box>
        <Box component="span" sx={{ color: 'text.disabled' }}>
          2025-03-27 09:00
        </Box>
      </Box>

      <Box sx={{ gap: 1, display: 'flex', typography: 'body2' }}>
        <Box component="span" sx={{ flexGrow: 1 }}>
          현재 상태
        </Box>
        <Box component="span" sx={{ color: 'text.disabled' }}>
          수리 진행 중..
        </Box>
      </Box>
    </>
  );


  return (
    <>
      <CardButton
        link=''>
        {renderMechanic()}
        {renderStatus()}
      </CardButton>
    </>
  );
}
