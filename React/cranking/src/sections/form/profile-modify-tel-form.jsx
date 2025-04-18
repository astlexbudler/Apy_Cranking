import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';

import { Form, Field } from 'src/components/hook-form';



// 프로필 연락처 변경 폼
// ----------------------------------------------------------------------

// 연락처 변경 폼 유효성 검사 스키마
const ModifyTelSchema = zod
    .object({
        tel: zod
            .string()
            .min(2, '전화번호를 입력해주세요.')
            .max(20, '전화번호는 20자 이하입니다.'),
    });

export function ProfileModifyTelForm() {

    // 폼 초기화
    const methods = useForm({
        resolver: zodResolver(ModifyTelSchema),
        defaultValues: {
            tel: '', // 전화번호
        },
        mode: 'onChange',
    });

    // 폼 메서드 추출
    const {
        reset, // 폼 초기화 메서드
        handleSubmit, // 폼 제출 메서드
    } = methods;

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
                    name="tel"
                    label="전화번호"
                    slotProps={{ inputLabel: { shrink: true } }}
                    placeholder="전화번호를 입력해주세요"
                    helperText="전화번호는 '-' 없이 입력해주세요."
                />
            </Box>
        </Form>
    );
}
