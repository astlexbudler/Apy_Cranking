import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Form, Field } from 'src/components/hook-form';


// 프로필 주소 변경 폼
// ----------------------------------------------------------------------

// 주소 변경 폼 유효성 검사 스키마
const ModifyAddressSchema = zod.object({
    address: zod
        .string()
        .min(2, '주소를 입력해주세요.')
        .max(200, '주소는 200자 이하입니다.'),
    addressDetail: zod
        .string()
        .max(200, '상세 주소는 200자 이하입니다.')
        .optional(),
});

export function ProfileModifyAddressForm() {

    // 폼 초기화
    const methods = useForm({
        resolver: zodResolver(ModifyAddressSchema),
        defaultValues: {
            address: '',
            addressDetail: '',
        },
        mode: 'onChange',
    });

    // 폼 메서드 추출
    const {
        handleSubmit, // 폼 제출 메서드
        setValue, // 폼 값 설정 메서드
        reset, // 폼 초기화 메서드
    } = methods;

    // Form 제출 핸들러
    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data));
        reset();
    });

    // 주소 검색 버튼 클릭 핸들러
    const openDaumPostcode = () => {
        const element_wrap = document.getElementById('wrap');

        new (window).daum.Postcode({
            oncomplete(data) {
                let addr = '';
                let extraAddr = '';

                if (data.userSelectedType === 'R') {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }

                if (data.userSelectedType === 'R') {
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    if (extraAddr !== '') {
                        extraAddr = ' (' + extraAddr + ')';
                    }
                }

                setValue('address', addr + extraAddr);
                element_wrap.style.display = 'none';
            },
            onresize(size) {
                element_wrap.style.height = size.height + 'px';
            },
            width: '100%',
            height: '100%',
        }).embed(element_wrap);

        element_wrap.style.display = 'block';
    };

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>

                {/* 주소 검색 버튼 */}
                <Box sx={{ textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        onClick={openDaumPostcode}
                        sx={{ width: '60px' }}
                        size="small"
                    >
                        주소 검색
                    </Button>
                </Box>

                {/* 주소 검색창 */}
                <Box
                    id="wrap"
                    sx={{
                        display: 'none',
                        border: '1px solid rgb(218, 221, 230)',
                        borderRadius: 0.7,
                        width: '100%',
                        maxHeight: '300px',
                        position: 'relative',
                        overflowY: 'scroll',
                    }}
                >
                    {/* 닫기 버튼 */}
                    <img
                        src="//t1.daumcdn.net/postcode/resource/images/close.png"
                        alt="접기 버튼"
                        onClick={(e) => {
                            e.target.closest('#wrap').style.display = 'none';
                        }}
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            right: '0px',
                            top: '-1px',
                            zIndex: 1,
                        }}
                    />
                    {/* 이부분에 주소 검색기가 표시됩니다.*/}
                </Box>

                {/* 주소 입력 */}
                <Field.Text
                    name="address"
                    label="주소"
                    placeholder="검색되지 않는 경우 직접 입력해주세요."
                    slotProps={{ inputLabel: { shrink: true } }}
                />

                {/* 상세 주소 입력 */}
                <Field.Text
                    name="addressDetail"
                    label="상세 주소"
                    placeholder="상세 주소를 입력해주세요."
                    slotProps={{ inputLabel: { shrink: true } }}
                    helperText='상세주소가 있는 경우 입력해주세요. 상세주소는 선택사항입니다.'
                />

            </Box>
        </Form>
    );
}