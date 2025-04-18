import { useFormContext } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
//import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export function SignInForm({ sx, ...other }) {
  const showPassword = useBoolean();

  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Box
      sx={[
        { gap: 3, display: 'flex', flexDirection: 'column' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Field.Text
        name="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Field.Text
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        type={showPassword.value ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify
                    icon={showPassword.value ? 'solar:eye-outline' : 'solar:eye-closed-outline'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Link
        component={RouterLink}
        href={paths.verify}
        variant="body2"
        color="inherit"
        sx={{ alignSelf: 'flex-end' }}
      >
        비밀번호를 잊으셨나요?
      </Link>
      {/*
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        로그인
      </LoadingButton>
      */}
      <Button
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        href={paths.user.main}
      >
        로그인
      </Button>
    </Box>
  );
}
