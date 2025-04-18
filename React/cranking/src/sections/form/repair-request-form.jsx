import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

import { AlertCustom } from 'src/sections/modal/alert-custom';
import { Stepper, StepOne, StepTwo, StepThree } from 'src/sections/form/repair-request-form-stepper';



// 차량 등록 폼
// ----------------------------------------------------------------------

// 차량 정보 등록 폼 유효성 검사 스키마
const StepOneSchema = zod.object({
    selectedQuestions: zod
        .array(zod.string())
        .max(5, { message: '최대 5개까지 질문을 선택할 수 있습니다.' }),
});
const StepTwoSchema = zod.object({
    carNumber: zod
        .string()
        .min(1, { message: '차량 번호를 입력해주세요.' })
        .max(20, { message: '차량 번호는 20자 이하로 작성해주세요.' }),
    images: zod
        .array(zod.string())
        .max(5, { message: '최대 5개까지 사진을 업로드할 수 있습니다.' }),
});
const StepThreeSchema = zod.object({
    message: zod
        .string()
        .min(1, { message: '이상 증상 설명을 입력해주세요.' })
        .max(500, { message: '이상 증상 설명은 500자 이하로 작성해주세요.' }),
    availableDates: zod
        .array(zod.string())
        .min(1, { message: '가능한 날짜를 선택해주세요.' })
        .max(7, { message: '가능한 날짜는 최대 7개까지 선택 가능합니다.' }),
    address: zod
        .string()
        .min(1, { message: '주소를 입력해주세요.' })
        .max(100, { message: '주소는 100자 이하로 작성해주세요.' }),
});

// 차량 등록 단계
const STEPS = ['자기 진단 질문', '사진 업로드', '문제 상세 설명'];

export function RepairRequestForm() {

    // 폼 초기화
    const methods = useForm({
        resolver: zodResolver(zod.object({
            stepOne: StepOneSchema,
            stepTwo: StepTwoSchema,
            stepThree: StepThreeSchema,
        })),
        defaultValues: {
            stepOne: {
                selectedQuestions: [],
            },
            stepTwo: {
                carNumber: '',
                images: [],
            },
            stepThree: {
                message: '',
                availableDates: [],
                address: '',
            }
        },
        mode: 'onChange',
    });

    // 폼 메서드 추출
    const {
        reset, // 폼 초기화 메서드
        handleSubmit, // 폼 제출 메서드
        getValues, // 폼 값 가져오기
        trigger, // 폼 유효성 검사 메서드
        clearErrors, // 폼 오류 초기화 메서드
        formState: { errors, isSubmitting }, // 폼 상태
    } = methods;

    // 수리 요청 작성 페이지의 Stepper 컴포넌트
    const [activeStep, setActiveStep] = useState(0);

    // Stepper의 각 단계에 대한 유효성 검사 스키마
    const handleNext = useCallback(
        async (step) => {
            if (step) {
                const isValid = await trigger(step);

                if (isValid) {
                    clearErrors();
                    setActiveStep((currentStep) => currentStep + 1);
                }
            } else {
                setActiveStep((currentStep) => currentStep + 1);
            }
        },
        [trigger, clearErrors]
    );
    const handleBack = useCallback(() => {
        setActiveStep((currentStep) => currentStep - 1);
    }, []);

    // 폼 제출 핸들러
    const onSubmit = handleSubmit(async (data) => {
        console.log('Form data:', data);
    });
    const completedStep = activeStep === STEPS.length;

    // Alert 상태 관리
    const [open, setOpen] = useState(false);

    return (
        <>
            <Stepper steps={STEPS} activeStep={activeStep} />

            <Form methods={methods} onSubmit={onSubmit}>
                <Box
                    sx={[
                        (theme) => ({
                            p: 3,
                            mb: 3,
                            gap: 3,
                            minHeight: 240,
                            display: 'flex',
                            borderRadius: 1.5,
                            flexDirection: 'column',
                            border: `dashed 1px ${theme.vars.palette.divider}`,
                        }),
                    ]}
                >
                    {activeStep === 0 && <StepOne />}
                    {activeStep === 1 && <StepTwo />}
                    {activeStep === 2 && <StepThree />}
                </Box>

                {!completedStep && (
                    <Box sx={{ display: 'flex', mb: 5 }}>
                        {activeStep !== 0 && <Button onClick={handleBack}>뒤로</Button>}

                        <Box sx={{ flex: '1 1 auto' }} />

                        {activeStep === 0 && (
                            <Button type="submit" variant="contained" onClick={() => handleNext('stepOne')}>
                                다음
                            </Button>
                        )}

                        {activeStep === 1 && (
                            <Button type="submit" variant="contained" onClick={() => handleNext('stepTwo')}>
                                다음
                            </Button>
                        )}

                        {activeStep === STEPS.length - 1 && (
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                요청하기
                            </LoadingButton>
                        )}
                    </Box>
                )}
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
