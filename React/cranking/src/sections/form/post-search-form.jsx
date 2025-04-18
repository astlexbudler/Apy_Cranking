import { z as zod } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

function searchPost(search) {
    // 검색어를 사용하여 게시글을 검색하는 로직을 구현합니다.
    // 예를 들어, API 호출 등을 통해 검색 결과를 가져올 수 있습니다.
    console.log('Searching for:', search);
}

// 로그인 폼의 구성 요소를 정의
export function PostSearchForm() {

    // 폼 초기화
    const defaultValues = { // 초기값 설정
        searchKeyword: '', // 검색어 초기값
        searchType: 'title', // 검색 타입 초기값
    }
    const methods = useForm({ // useForm 훅을 사용하여 폼 상태 관리
        resolver: zodResolver(zod.object({
            searchKeyword: zod
                .string()
        })),
        defaultValues,
        mode: 'onChange', // 입력값 변경 시 유효성 검사
    });
    const { reset, handleSubmit } = methods; // useForm 훅에서 제공하는 메서드 추출
    const onSubmit = handleSubmit(async (data) => { // 폼 제출 핸들러
        alert(JSON.stringify(data)); // 제출된 데이터 출력
        reset();
    });

    const [searchType, setSearchType] = useState('title'); // 상태 변수를 사용하여 선택된 값을 관리합니다.
    const handleChange = (event) => {
        setSearchType(event.target.value);
    }

    return (
        <>
            <Divider sx={{ my: 5 }} />

            <Form methods={methods} onSubmit={onSubmit}>
                <Box>
                    <Field.Select
                        name="searchType"
                        label="검색"
                        sx={{ display: 'inline-block', width: '80px', mr: 2 }}
                        value={searchType}
                        onChange={handleChange}
                    >
                        <MenuItem value="title">제목</MenuItem>
                    </Field.Select>

                    <Field.Text
                        name="searchKeyword"
                        type="text"
                        label="검색어"
                        placeholder="검색어를 입력해주세요"
                        sx={{ display: 'inline-block', width: { xs: 'calc(100% - 120px)', md: '300px' }, mr: 2 }}
                        slotProps={{
                            inputLabel: { shrink: true },
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => searchPost(methods.getValues('search'))} edge="end">
                                            <Iconify
                                                icon="eva:search-outline"
                                                sx={{ width: 20, height: 20 }}
                                            />
                                        </IconButton>
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
