import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { FormHead } from './components/form-head';
import { ResetPasswordSchema } from './components/schema';
import { FormReturnLink } from './components/form-return-link';
import { FormResendCode } from './components/form-resend-code';

// ----------------------------------------------------------------------

export function ResetView() {
  const password = useBoolean();

  const defaultValues = {
    code: '',
    email: 'your@email.com',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Field.Text name="email" label="이메일" />

      <Field.Code name="code" />

      <Typography>
        이메일로 전송된 인증코드를 입력해주세요.
      </Typography>

      <Field.Text
        name="password"
        label="새 비밀번호"
        placeholder="비밀번호를 입력해주세요"
        type={password.value ? 'text' : 'password'}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Field.Text
        name="confirmPassword"
        label="새 비밀번호 확인"
        type={password.value ? 'text' : 'password'}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {/*
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Update password..."
      >
        Update password
      </LoadingButton>*/}
      <Button
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        href={paths.signIn}
      >
        비밀번호 수정
      </Button>
    </Box>
  );

  return (
    <>
      <FormHead
        icon={
          <Box
            component="img"
            alt="Reset password"
            src={`${CONFIG.assetsDir}/assets/images/auth/lock.png`}
            sx={{ width: 90, height: 90, mb: 5 }}
          />
        }
        title="비밀번호 수정"
        description="새로운 비밀번호와 인증코드를 입력해주세요."
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormResendCode onResendCode={() => {}} value={0} disabled={false} />

      <FormReturnLink href={paths.signIn} />
    </>
  );
}
