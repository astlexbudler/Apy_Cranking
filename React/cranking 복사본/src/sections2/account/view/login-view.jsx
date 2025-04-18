import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


export function LoginView() {

  // init form
  const defaultValues = { email: '', password: '' };
  const methods = useForm({
    resolver: zodResolver(zod.object({
      email: zod
        .string()
        .min(1, { message: 'Email is required!' })
        .email({ message: 'Email must be a valid email address!' }),
      password: zod
        .string()
        .min(1, { message: 'Password is required!' })
        .min(6, { message: 'Password must be at least 6 characters!' }),
    })), defaultValues
  });
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
      TODO
    </>
  );
}
