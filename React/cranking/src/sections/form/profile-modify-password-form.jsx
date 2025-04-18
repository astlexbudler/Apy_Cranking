import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { ConfirmTextPassword } from 'src/sections/component/confirm-text-password';
import { ConfirmTextPasswordCheck } from 'src/sections/component/confirm-text-password-check';

// 비밀번호 변경 폼
// ----------------------------------------------------------------------

// 로그인 폼 유효성 검사 스키마
const LoginSchema = zod
    .object({
        password: zod
            .string()
            .min(1, '비밀번호를 입력해주세요.')
            .min(6, '비밀번호는 6자 이상입니다.'),
        passwordConfirm: zod
            .string()
            .min(1, '비밀번호를 입력해주세요.')
            .min(6, '비밀번호는 6자 이상입니다.')
            .refine((val, ctx) => {
                if (val !== ctx.parent.password) {
                    ctx.addIssue({
                        code: zod.ZodIssueCode.custom,
                        message: '비밀번호가 일치하지 않습니다.',
                    });
                }
                return true;
            }),
    });

export function ProfileModifyPasswordForm() {

    // 폼 초기화
    const methods = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            password: '',
            passwordConfirm: '',
        },
        mode: 'onChange',
    });

    // 폼 메서드 추출
    const {
        reset, // 폼 초기화 메서드
        handleSubmit, // 폼 제출 메서드
        getValues, // 폼 값 가져오기 메서드
        formState: { errors }, // 폼 상태 및 에러 메시지
    } = methods;
    const showPassword = useBoolean(); // 비밀번호 표시 토글 상태 관리
    const [passwordOk, setPasswordOk] = useState(); // 비밀번호 유효성 확인 상태
    const [passwordCheckOk, setPasswordCheckOk] = useState(); // 비밀번호 확인 상태

    // 폼 제출 핸들러
    const onSubmit = handleSubmit(async (data) => {
        alert(JSON.stringify(data)); // 제출된 데이터 출력
        reset(); // 폼 초기화
    });

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Box
                sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}
            >
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
                    helperText={
                        <ConfirmTextPassword
                            ok={passwordOk}
                            error={errors.password?.message}
                        />
                    }
                    onBlur={() => {
                        const value = getValues('password');
                        const passReg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/;
                        setPasswordOk(passReg.test(value));
                    }}
                />
                <Field.Text
                    name="passwordConfirm"
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
                    helperText={
                        <ConfirmTextPasswordCheck
                            ok={passwordCheckOk}
                            error={errors.confirmPassword?.message}
                        />
                    }
                    onBlur={() => {
                        const value = getValues('confirmPassword');
                        setPasswordCheckOk(value === getValues('password'));
                    }}
                />
            </Box>
        </Form>
    );
}
