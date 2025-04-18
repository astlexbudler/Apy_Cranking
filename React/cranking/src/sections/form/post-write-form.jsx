import '@toast-ui/editor/dist/toastui-editor.css';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from '@toast-ui/react-editor';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { AlertCustom } from 'src/sections/modal/alert-custom';


// 이메일 입력 폼
// ----------------------------------------------------------------------

// 회원가입 폼 유효성 검사 스키마
const PostSchema = zod
    .object({
        title: zod
            .string()
            .min(1, '제목을 입력해주세요.')
            .max(100, '제목은 100자 이내로 입력해주세요.'),
    });

export function PostWriteForm() {

    // 폼 초기화
    const methods = useForm({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: '', // 제목
            content: '', // 내용
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
                        name="title"
                        label="제목"
                        slotProps={{
                            inputLabel: { shrink: true },
                            input: {
                                sx: {
                                    backgroundColor: 'white',
                                    border: '1px solid rgb(218, 221, 230)',
                                    borderRadius: 0.7,
                                }
                            }
                        }}
                        placeholder="게시글 제목을 입력해주세요."
                    />

                    <Editor
                        initialValue="여기에 글을 작성해보세요"
                        previewStyle="vertical"
                        height="400px"
                        initialEditType="wysiwyg"
                        useCommandShortcut
                    />

                    <Button
                        color="inherit"
                        size="large"
                        variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{ mt: 5 }}
                    >
                        게시글 작성
                    </Button>
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
                title="게시글 작성 완료"
                message="게시글이 작성되었습니다."
                buttons={
                    <Button
                        variant="contained"
                        color="inherit"
                        href={paths.posts}
                        onClick={() => setOpen(false)}
                    >
                        확인
                    </Button>
                }
            />
        </>

    );
}
