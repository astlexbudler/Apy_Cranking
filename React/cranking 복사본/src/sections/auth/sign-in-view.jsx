import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { Form } from 'src/components/hook-form';

import { FormHead } from './components/form-head';
import { SignInSchema } from './components/schema';
import { SignInForm } from './components/sign-in-form';
import { FormSocials } from './components/form-socials';
import { FormDivider } from './components/form-divider';

// ----------------------------------------------------------------------

export function SignInView() {
  const defaultValues = { email: '', password: '' };

  const methods = useForm({ resolver: zodResolver(SignInSchema), defaultValues });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <Logo sx={{ alignSelf: { xs: 'center', md: 'flex-start' } }} />

      <FormHead
        title="로그인"
        description={
          <>
            {`계정이 없으신가요? `}
            <Link
              component={RouterLink}
              href={paths.signUp}
              variant="subtitle2"
            >
              가입하기
            </Link>
          </>
        }
        sx={{ mt: { xs: 5, md: 8 }, textAlign: { xs: 'center', md: 'left' } }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        <SignInForm />
      </Form>

      <FormDivider />

      <FormSocials />
    </>
  );
}
