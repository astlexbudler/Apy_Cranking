import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Form, Field } from 'src/components/hook-form';

import { FormHead } from './components/form-head';
import { ResetPasswordSchema } from './components/schema';
import { FormReturnLink } from './components/form-return-link';

// ----------------------------------------------------------------------

export function VerifyView
() {
  const defaultValues = { email: '' };

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
      <Field.Text name="email" hiddenLabel placeholder="이메일" />

      {/**
      <LoadingButton
        fullWidth
        size="large"
        color="inherit"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        인증코드 요청
      </LoadingButton> */}
      <Button
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        href={paths.reset}
      >
        인증코드 요청
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
        title="비밀번호 재설정"
        description="계정에 등록된 이메일 주소를 입력하면 비밀번호 재설정을 위한 인증코드를 보내드립니다."
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormReturnLink href={paths.signIn} />
    </>
  );
}
