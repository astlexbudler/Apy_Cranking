import { useFormContext } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignUpForm({ sx, ...other }) {
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
        name="fullName"
        label="이름"
        slotProps={{ inputLabel: { shrink: true } }}
        placeholder="이름을 입력해주세요"
      />

      <Field.Text
        name="email"
        label="이메일"
        slotProps={{ inputLabel: { shrink: true } }}
        placeholder="이메일을 입력해주세요"
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

      <Field.Text
        name="confirmPassword"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 입력해주세요"
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
      {/*
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        회원가입
      </LoadingButton>
      */}
      <Button
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        href={paths.signIn}
      >
        회원가입
      </Button>
    </Box>
  );
}
