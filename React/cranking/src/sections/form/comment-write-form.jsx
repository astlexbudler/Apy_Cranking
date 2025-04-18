import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { Form } from 'src/components/hook-form';

// ----------------------------------------------------------------------

// 로그인 폼의 구성 요소를 정의
export function CommentWriteForm() {

    // 폼 초기화
    const defaultValues = { // 초기값 설정
        content: '',
    }
    const methods = useForm({ // useForm 훅을 사용하여 폼 상태 관리
        resolver: zodResolver(zod.object({
            content: zod
                .string()
                .min(1, { message: '댓글을 입력해주세요.' }) // 필수 입력
                .max(200, { message: '댓글은 200자 이내로 작성해주세요.' }), // 최대 200자
        })),
        defaultValues,
        mode: 'onChange', // 입력값 변경 시 유효성 검사
    });
    const { reset, handleSubmit } = methods; // useForm 훅에서 제공하는 메서드 추출
    const onSubmit = handleSubmit(async (data) => { // 폼 제출 핸들러
        alert(JSON.stringify(data)); // 제출된 데이터 출력
        reset();
    });

    return (
        <>
            <Divider sx={{ mt: 5, mb: 4 }} />

            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                댓글 작성
            </Typography>
            <Form methods={methods} onSubmit={onSubmit}>
                <Box>
                    <TextField
                        name='content'
                        label="댓글"
                        placeholder="댓글을 입력해주세요."
                        sx={{ width: '100%' }}
                        slotProps={{
                            inputLabel: { shrink: true },
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button variant="contained" color="inherit" size="large" sx={{ mr: -1.25 }}>
                                            댓글 쓰기
                                        </Button>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
            </Form >
        </>
    );
}
