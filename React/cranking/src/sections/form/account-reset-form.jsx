import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { AlertCustom } from 'src/sections/modal/alert-custom';
import { ButtonReturnLogin } from 'src/sections/component/button-return-login';
import { ConfirmTextPassword } from 'src/sections/component/confirm-text-password';
import { ConfirmTextCertCode } from 'src/sections/component/confirm-text-cert-code';
import { ConfirmTextPasswordCheck } from 'src/sections/component/confirm-text-password-check';



// 비밀번호 재설정 폼
// ----------------------------------------------------------------------

// 비밀번호 재설정 검사 스키마
const ResetSchema = zod
    .object({
        code: zod
            .string()
            .regex(/^\d{6}$/, '6자리 숫자 코드를 입력해주세요.'),
        password: zod
            .string()
            .min(6, '비밀번호는 6자 이상입니다.')
            .max(30, '비밀번호는 30자 이하입니다.')
            .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/, {
                message: '영문과 숫자를 포함해야 합니다.',
            }),
        confirmPassword: zod.string(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                path: ['confirmPassword'],
                message: '비밀번호가 일치하지 않습니다.',
            });
        }
    });

export function AccountResetForm() {

    // 폼 초기화
    const methods = useForm({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: 'your@email.com', // 실제 사용 시 서버에서 세팅하거나 props로 받아오도록 변경
            code: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    });

    // 폼 메서드 추출
    const {
        reset,
        handleSubmit,
        getValues,
        formState: { errors },
    } = methods;

    const showPassword = useBoolean();
    const [codeOk, setCodeOk] = useState();
    const [passwordOk, setPasswordOk] = useState();
    const [passwordCheckOk, setPasswordCheckOk] = useState();

    // Form 제출 핸들러
    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data));
        reset();
    });

    // 인증코드 확인
    const validateCode = () => {
        const value = getValues('code');
        setCodeOk(/^\d{6}$/.test(value));
        // 나중에 서버와 통신하여 인증코드 확인 로직 추가
    };

    // 비밀번호 유효성 검사
    const validatePassword = () => {
        const value = getValues('password');
        setPasswordOk(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/.test(value));
    };

    // 비밀번호 확인
    const validateConfirmPassword = () => {
        const value = getValues('confirmPassword');
        setPasswordCheckOk(value === getValues('password'));
    };

    // Alert 상태 관리
    const [open, setOpen] = useState(false);

    return (
        <>
            <Form methods={methods} onSubmit={onSubmit}>
                <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
                    <Field.Text
                        name="email"
                        label="이메일"
                        helperText="가입된 계정의 이메일 주소입니다."
                        slotProps={{ input: { readOnly: true } }}
                    />

                    <Field.Code
                        name="code"
                        onBlur={validateCode}
                        helperText={
                            <Box sx={{ width: '80px' }}>
                                <ConfirmTextCertCode ok={codeOk} error={errors.code?.message} />
                            </Box>
                        }
                    />

                    <Field.Text
                        name="password"
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                        type={showPassword.value ? 'text' : 'password'}
                        onBlur={validatePassword}
                        helperText={
                            <ConfirmTextPassword
                                ok={passwordOk}
                                error={errors.password?.message}
                            />
                        }
                        slotProps={{
                            inputLabel: { shrink: true },
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={showPassword.onToggle} edge="end">
                                            <Iconify
                                                icon={
                                                    showPassword.value
                                                        ? 'solar:eye-outline'
                                                        : 'solar:eye-closed-outline'
                                                }
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
                        onBlur={validateConfirmPassword}
                        helperText={
                            <ConfirmTextPasswordCheck
                                ok={passwordCheckOk}
                                error={errors.confirmPassword?.message}
                            />
                        }
                        slotProps={{
                            inputLabel: { shrink: true },
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={showPassword.onToggle} edge="end">
                                            <Iconify
                                                icon={
                                                    showPassword.value
                                                        ? 'solar:eye-outline'
                                                        : 'solar:eye-closed-outline'
                                                }
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Button
                        fullWidth
                        color="inherit"
                        size="large"
                        variant="contained"
                        sx={{ mt: 5 }}
                        onClick={() => setOpen(true)}
                    >
                        비밀번호 수정
                    </Button>
                </Box>
            </Form>
            <ButtonReturnLogin />
            <AlertCustom
                open={open}
                close={() => setOpen(false)}
                icon={
                    <Iconify
                        icon="carbon:checkmark-filled"
                        width={80}
                        height={80}
                        sx={{ color: 'success.main', mb: 2 }}
                    />
                }
                title="비밀번호 수정 완료"
                message="비밀번호가 성공적으로 수정되었습니다. 로그인 페이지로 이동합니다."
                buttons={
                    <Button
                        variant="contained"
                        color="inherit"
                        href={paths.signIn}
                        onClick={() => setOpen(false)}
                    >
                        확인
                    </Button>
                }
            />
        </>
    );
}
