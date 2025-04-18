import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { usePathname, useSearchParams } from 'src/routes/hooks';

import { Form } from 'src/components/hook-form';

import { FormHead } from './components/form-head';
import { SignUpSchema } from './components/schema';
import { SignUpForm } from './components/sign-up-form';
//import { FormDivider } from './components/form-divider';
//import { FormSocials } from './components/form-socials';
import { SignUpTerms } from './components/sign-up-terms';

// ----------------------------------------------------------------------

export function SignUpView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({ resolver: zodResolver(SignUpSchema), defaultValues });

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

  const CATEGORIES = [
    { value: '', label: '사용자 계정' },
    { value: 'controls', label: '파트너 계정' },
  ];
  const CATEGORY_PARAM = 'category';
  const selectedCategory = searchParams.get(CATEGORY_PARAM) ?? '';

  return (
    <>
      <FormHead
        title="회원가입"
        description={
          <>
            {`이미 계정이 있으신가요? `}  
            <Link component={RouterLink} href={paths.signIn} variant="subtitle2">
              로그인하기
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      <ToggleButtonGroup
        exclusive value={selectedCategory}
        sx={{ border: 'none', mb: 3 }}
      >
          {CATEGORIES.map((option) => (
            <ToggleButton
              key={option.label}
              component={RouterLink}
              value={option.value}
              aria-label={option.label}
            >
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

      <Form methods={methods} onSubmit={onSubmit}>
        <SignUpForm />
      </Form>

      <SignUpTerms />
    </>
  );
}
