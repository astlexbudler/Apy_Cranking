import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { AlertCustom } from 'src/sections/modal/alert-custom';
import { ButtonReturnLogin } from 'src/sections/component/button-return-login';



// 이메일 입력 폼
// ----------------------------------------------------------------------

// 회원가입 폼 유효성 검사 스키마
const VerifySchema = zod
    .object({
        email: zod
            .string()
            .min(1, '이메일 주소를 입력해주세요.')
            .email('유효한 이메일 주소 형식이 아닙니다.'),
    });

export function AccountVerifyForm() {

    // 폼 초기화
    const methods = useForm({
        resolver: zodResolver(VerifySchema),
        defaultValues: {
            email: '',
        },
        mode: 'onChange',
    });

    // 폼 메서드 추출
    const {
        reset,
        handleSubmit,
    } = methods;

    // Form 제출 핸들러
    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data));
        reset();
    });

    // Alert 상태 관리
    const [open, setOpen] = useState(false);

    return (
        <>
            <Form methods={methods} onSubmit={onSubmit}>
                <Box
                    sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}
                >
                    <Field.Text
                        name="email"
                        label="이메일"
                        slotProps={{ inputLabel: { shrink: true } }}
                        placeholder="이메일을 입력해주세요"
                    />

                    <Button
                        color="inherit"
                        size="large"
                        variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{ mt: 5 }}
                    >
                        인증코드 요청
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
                title="인증번호 전송 완료"
                message="입력한 이메일 주소로 인증번호가 전송되었습니다."
                buttons={
                    <Button
                        variant="contained"
                        color="inherit"
                        href={paths.reset}
                        onClick={() => setOpen(false)}
                    >
                        확인
                    </Button>
                }
            />
        </>

    );
}
