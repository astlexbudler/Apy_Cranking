import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { AlertCustom } from 'src/sections/modal/alert-custom';
import { ConfirmTextEmail } from 'src/sections/component/confirm-text-email';
import { ConfirmTextNickname } from 'src/sections/component/confirm-text-nickname';
import { ConfirmTextPassword } from 'src/sections/component/confirm-text-password';
import { ConfirmTextPasswordCheck } from 'src/sections/component/confirm-text-password-check';



// 파트너 회원가입 폼
// ----------------------------------------------------------------------

// 회원가입 폼 유효성 검사 스키마
const PartnerRegisterSchema = zod
    .object({
        email: zod
            .string()
            .min(1, '이메일 주소를 입력해주세요.')
            .email('유효한 이메일 주소 형식이 아닙니다.'),
        password: zod
            .string()
            .min(6, '비밀번호는 6자 이상입니다.')
            .max(30, '비밀번호는 30자 이하입니다.')
            .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/, {
                message: '영문과 숫자를 포함해야 합니다.',
            }),
        confirmPassword: zod.string(),
        nickname: zod
            .string()
            .min(2, '닉네임은 2자 이상입니다.')
            .max(30, '닉네임은 30자 이하입니다.'),
        tel: zod
            .string()
            .min(4, '전화번호는 4자 이상입니다.')
            .max(20, '전화번호는 20자 이하입니다.'),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                path: ['confirmPassword'],
                message: '비밀번호가 일치하지 않습니다.',
                code: 'custom',
            });
        }
    });

export function AccountSignUpPartnerForm() {

    // 폼 초기화
    const methods = useForm({
        resolver: zodResolver(PartnerRegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            nickname: '',
            tel: '',
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
    const [nicknameOk, setNicknameOk] = useState(); // 닉네임 중복 확인 상태
    const [emailOk, setEmailOk] = useState(); // 이메일 중복 확인 상태
    const [passwordOk, setPasswordOk] = useState(); // 비밀번호 유효성 확인 상태
    const [passwordCheckOk, setPasswordCheckOk] = useState(); // 비밀번호 확인 상태

    // 이메일 중복 확인
    const handleCheckEmail = async (email) => {
        // TODO: 이메일 중복 체크 API 호출
        console.log('Checking email:', email); // Use the variable to avoid unused warnings
        const isDuplicate = false;
        setEmailOk(!isDuplicate);
    };

    // 닉네임 중복 확인
    const handleCheckNickname = async (nickname) => {
        // TODO: 닉네임 중복 체크 API 호출
        console.log('Checking nickname:', nickname); // Use the variable to avoid unused warnings
        const isDuplicate = false;
        setNicknameOk(!isDuplicate);
    };

    // Form 제출 핸들러
    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data));
        reset();
    });

    // Alert 상태 관리
    const [open, setOpen] = useState(false);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                파트너 회원가입
            </Typography>

            <Form methods={methods} onSubmit={onSubmit}>
                <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
                    <Field.Text
                        name="nickname"
                        label="사업소명"
                        slotProps={{ inputLabel: { shrink: true } }}
                        placeholder="이름을 입력해주세요"
                        helperText={<ConfirmTextNickname ok={nicknameOk} error={errors.nickname?.message} />}
                        onBlur={() => handleCheckNickname(getValues('nickname'))}
                    />

                    <Field.Text
                        name="email"
                        label="이메일"
                        slotProps={{ inputLabel: { shrink: true } }}
                        placeholder="이메일을 입력해주세요"
                        helperText={<ConfirmTextEmail ok={emailOk} error={errors.email?.message} />}
                        onBlur={() => handleCheckEmail(getValues('email'))}
                    />

                    <Field.Text
                        name="tel"
                        label="전화번호"
                        slotProps={{ inputLabel: { shrink: true } }}
                        placeholder="전화번호를 입력해주세요"
                        helperText={errors.tel?.message}
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
                                                icon={
                                                    showPassword.value ? 'solar:eye-outline' : 'solar:eye-closed-outline'
                                                }
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
                                                icon={
                                                    showPassword.value ? 'solar:eye-outline' : 'solar:eye-closed-outline'
                                                }
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

                    <Typography variant="caption" sx={{ mt: 5 }}>
                        <Link
                            component={RouterLink}
                            href={paths.terms}
                            target="_blank"
                            underline="always"
                        >
                            이용약관 및 개인정보 처리 방침
                        </Link>
                    </Typography>

                    <Button
                        fullWidth
                        color="inherit"
                        size="large"
                        variant="contained"
                        onClick={() => setOpen(true)}
                    >
                        동의 후 회원가입
                    </Button>

                    <Typography variant="caption" color="text.secondary">
                        * 파트너 회원가입 시, 관리자 승인 후 사용 가능합니다. 가입 후 24시간 이내에 승인이 이루어지지 않을 경우, 고객센터로 문의 바랍니다.
                    </Typography>
                </Box>
            </Form>
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
                title="회원가입 완료"
                message="회원가입이 완료되었습니다."
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
