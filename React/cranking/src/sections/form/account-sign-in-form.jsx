import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';


// 로그인 폼
// ----------------------------------------------------------------------

// 로그인 폼 유효성 검사 스키마
const LoginSchema = zod
    .object({
        email: zod
            .string()
            .min(1, '이메일 주소를 입력해주세요.')
            .email('유효한 이메일 주소 형식이 아닙니다.'),
        password: zod
            .string()
            .min(1, '비밀번호를 입력해주세요.')
            .min(6, '비밀번호는 6자 이상입니다.'),
    });

export function AccountSignInForm() {

    // 폼 초기화
    const methods = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    // 폼 메서드 추출
    const {
        reset, // 폼 초기화 메서드
        handleSubmit, // 폼 제출 메서드
    } = methods;
    const showPassword = useBoolean(); // 비밀번호 표시 토글 상태 관리

    // 폼 제출 핸들러
    const onSubmit = handleSubmit(async (data) => {
        alert(JSON.stringify(data)); // 제출된 데이터 출력
        reset(); // 폼 초기화
    });

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }} >
                <Field.Text
                    name="email"
                    label="이메일"
                    placeholder="이메일을 입력해주세요"
                    slotProps={{ inputLabel: { shrink: true } }}
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
                <Link
                    component={RouterLink}
                    href={paths.verify}
                    variant="body2"
                    color="inherit"
                    sx={{ alignSelf: 'flex-end' }}
                >
                    비밀번호를 잊으셨나요?
                </Link>
                <Button
                    fullWidth
                    color="inherit"
                    size="large"
                    variant="contained"
                    href={paths.user.main}
                >
                    로그인
                </Button>
            </Box>
        </Form>
    );
}
