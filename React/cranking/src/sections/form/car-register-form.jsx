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
import { Stepper, StepOne, StepTwo, StepThree } from 'src/sections/form/car-register-form-stepper';



// 차량 등록 폼
// ----------------------------------------------------------------------

// 차량 정보 등록 폼 유효성 검사 스키마
const StepOneSchema = zod.object({
    number: zod
        .string()
        .min(1, { message: '차량 번호를 입력해주세요.' })
        .max(20, { message: '차량 번호는 20자 이하로 입력해주세요.' })
        .refine(() => false, {
            message: '아직 API 연결이 되지 않았습니다.',
        }),
});
const StepTwoSchema = zod.object({
    name: zod
        .string()
        .min(1, { message: '차량 이름을 입력해주세요.' })
        .max(50, { message: '차량 이름은 50자 이하로 입력해주세요.' }),
    manufacturer: zod
        .string()
        .min(1, { message: '제조사를 입력해주세요.' })
        .max(50, { message: '제조사는 50자 이하로 입력해주세요.' }),
    carType: zod
        .string()
        .min(1, { message: '차량 종류를 입력해주세요.' })
        .max(50, { message: '차량 종류는 50자 이하로 입력해주세요.' }),
    carSize: zod
        .string()
        .min(1, { message: '차량 크기를 입력해주세요.' })
        .max(50, { message: '차량 크기는 50자 이하로 입력해주세요.' }),
    year: zod
        .string()
        .min(1, { message: '연도를 입력해주세요.' })
        .max(4, { message: '연도는 4자리로 입력해주세요.' }),
    cc: zod
        .string()
        .min(1, { message: '배기량을 입력해주세요.' })
        .max(10, { message: '배기량은 10자 이하로 입력해주세요.' }),
    fuel: zod
        .string()
        .min(1, { message: '연료 종류를 입력해주세요.' })
        .max(50, { message: '연료 종류는 50자 이하로 입력해주세요.' }),
    transmission: zod
        .string()
        .min(1, { message: '변속기를 입력해주세요.' })
        .max(50, { message: '변속기는 50자 이하로 입력해주세요.' }),
    color: zod
        .string()
        .min(1, { message: '차량 색상을 입력해주세요.' })
        .max(50, { message: '차량 색상은 50자 이하로 입력해주세요.' }),
    identificationNumber: zod
        .string()
        .min(1, { message: '차대번호를 입력해주세요.' })
        .max(50, { message: '차대번호는 50자 이하로 입력해주세요.' }),
});
const StepThreeSchema = zod.object({
    images: zod
        .array(zod.string())
        .min(1, { message: '사진을 업로드해주세요.' })
        .max(5, { message: '사진은 최대 5개까지 업로드 가능합니다.' }),
});

// 차량 등록 단계
const STEPS = ['차량 번호 입력', '차량 정보 확인', '사진 업로드'];

export function CarRegisterForm() {

    // 폼 초기화
    const methods = useForm({
        resolver: zodResolver(zod.object({
            stepOne: StepOneSchema,
            stepTwo: StepTwoSchema,
            stepThree: StepThreeSchema,
        })),
        defaultValues: {
            stepOne: {
                number: '',
            },
            stepTwo: {
                name: '',
                manufacturer: '',
                carType: '',
                carSize: '',
                year: '',
                cc: '',
                fuel: '',
                transmission: '',
                color: '',
                identificationNumber: '',
            },
            stepThree: {
                images: [],
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
