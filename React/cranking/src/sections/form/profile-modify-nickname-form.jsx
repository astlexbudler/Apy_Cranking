import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';

import { Form, Field } from 'src/components/hook-form';

import { ConfirmTextNickname } from 'src/sections/component/confirm-text-nickname';


// 닉네임 변경 폼
// ----------------------------------------------------------------------

// 로그인 폼 유효성 검사 스키마
const ModifyNicknameSchema = zod
    .object({
        nickname: zod
            .string()
            .min(2, '닉네임은 2자 이상입니다.')
            .max(30, '닉네임은 30자 이하입니다.'),
    });

export function ProfileModifyNicknameForm() {

    // 폼 초기화
    const methods = useForm({
        resolver: zodResolver(ModifyNicknameSchema),
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
    const [nicknameOk, setNicknameOk] = useState(); // 닉네임 중복 확인 상태
    // 폼 제출 핸들러
    const onSubmit = handleSubmit(async (data) => {
        alert(JSON.stringify(data)); // 제출된 데이터 출력
        reset(); // 폼 초기화
    });

    // 닉네임 중복 확인
    const handleCheckNickname = async (nickname) => {
        // TODO: 닉네임 중복 체크 API
        console.log(nickname); // Placeholder to avoid unused variable error
        setNicknameOk(true); // Placeholder to simulate successful nickname check
    };

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Box
                sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}
            >
                <Field.Text
                    name="nickname"
                    label="이름"
                    slotProps={{ inputLabel: { shrink: true } }}
                    placeholder="이름을 입력해주세요"
                    helperText={<ConfirmTextNickname ok={nicknameOk} error={errors.nickname?.message} />}
                    onBlur={() => handleCheckNickname(getValues('nickname'))}
                />
            </Box>
        </Form>
    );
}
