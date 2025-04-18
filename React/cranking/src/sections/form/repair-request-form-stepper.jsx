import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import MuiStepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export function Stepper({ steps, activeStep }) {

    return (
        <MuiStepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
            {steps.map((label, index) => (
                <Step key={label}>
                    <StepLabel
                        slots={{
                            stepIcon: ({ active, completed }) => (
                                <Box
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        display: 'flex',
                                        borderRadius: '50%',
                                        alignItems: 'center',
                                        color: 'text.disabled',
                                        typography: 'subtitle2',
                                        justifyContent: 'center',
                                        bgcolor: 'action.disabledBackground',
                                        ...(active && { bgcolor: 'primary.main', color: 'primary.contrastText' }),
                                        ...(completed && { bgcolor: 'primary.main', color: 'primary.contrastText' }),
                                    }}
                                >
                                    {completed ? (
                                        <Iconify width={14} icon="mingcute:check-fill" />
                                    ) : (
                                        <Box sx={{ typography: 'subtitle2' }}>{index + 1}</Box>
                                    )}
                                </Box>
                            ),
                        }}
                    >
                        {label}
                    </StepLabel>
                </Step>
            ))}
        </MuiStepper>
    );
}

// 자가 진단 질문 선택(Step 1)
// ----------------------------------------------------------------------
export function StepOne() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (_event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ mb: 5 }}>
            {/* 1. 엔진룸에 소리가 발생함 */}
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                sx={{ border: 'none', boxShadow: 'none' }}
            >
                <AccordionSummary>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: 1 }}>
                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <Box>
                                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Field.Checkbox name="stepOne.question1" />
                                    엔진룸에 소리가 발생함
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ ml: 2 }}>
                                #엔진룸 #소음
                            </Typography>
                        </Box>
                        <Iconify
                            width={16}
                            icon={
                                expanded === 'panel1'
                                    ? 'solar:alt-arrow-up-outline'
                                    : 'solar:alt-arrow-down-outline'
                            }
                            sx={{ ml: 2 }}
                        />
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ typography: 'body2', color: 'text.secondary' }}>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        안녕하세요! Hofix입니다. <br /><br />
                        차량 주행 중 엔진룸에서 소리가 들리나요? <br />
                        다음과 같은 경우를 의심해볼 수 있습니다: <br /><br />
                        1. 엔진 내부 부품 마모 또는 고장<br />
                        2. 배기 시스템 문제<br />
                        3. 벨트 및 풀리 마모<br /><br />
                        빠르게 정비소 점검을 받아보시길 권장드립니다. <br />
                        Hofix는 안전 운전을 응원합니다!
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* 2. 에어컨에서 냄새가 나고 안시원함 */}
            <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
                sx={{ border: 'none', boxShadow: 'none' }}
            >
                <AccordionSummary>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: 1 }}>
                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <Box>
                                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Field.Checkbox name="stepOne.question2" />
                                    에어컨에서 냄새가 나고 안시원함
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ ml: 2 }}>
                                #에어컨 #냄새 #냉방불량
                            </Typography>
                        </Box>
                        <Iconify
                            width={16}
                            icon={
                                expanded === 'panel2'
                                    ? 'solar:alt-arrow-up-outline'
                                    : 'solar:alt-arrow-down-outline'
                            }
                            sx={{ ml: 2 }}
                        />
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ typography: 'body2', color: 'text.secondary' }}>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        안녕하세요! Hofix입니다. <br /><br />
                        에어컨에서 냄새가 나거나 냉방 성능이 떨어졌다면, 아래 항목을 확인해보세요: <br /><br />
                        1. 에바포레이터 오염으로 인한 곰팡이 냄새<br />
                        2. 에어컨 필터 오염<br />
                        3. 냉매 부족 또는 컴프레서 이상<br /><br />
                        쾌적한 운전을 위해 에어컨 점검을 추천드립니다.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* 3. 차량이 한쪽으로 쏠리는 것 같음 */}
            <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
                sx={{ border: 'none', boxShadow: 'none' }}
            >
                <AccordionSummary>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: 1 }}>
                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <Box>
                                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Field.Checkbox name="stepOne.question3" />
                                    차량이 한쪽으로 쏠리는 것 같음
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ ml: 2 }}>
                                #쏠림 #휠얼라인먼트 #타이어
                            </Typography>
                        </Box>
                        <Iconify
                            width={16}
                            icon={
                                expanded === 'panel3'
                                    ? 'solar:alt-arrow-up-outline'
                                    : 'solar:alt-arrow-down-outline'
                            }
                            sx={{ ml: 2 }}
                        />
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ typography: 'body2', color: 'text.secondary' }}>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        안녕하세요! Hofix입니다. <br /><br />
                        차량이 한쪽으로 쏠리는 증상이 있다면 아래를 의심해보세요: <br /><br />
                        1. 휠 얼라인먼트 불량<br />
                        2. 타이어 압력 불균형 또는 마모<br />
                        3. 서스펜션 문제<br /><br />
                        주행 안전을 위해 가까운 정비소에서 점검을 받는 것을 권장합니다.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

// 파손 이미지 첨부(Step 2)
// ----------------------------------------------------------------------
export function StepTwo() {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setFiles(prev => [...prev, ...Array.from(selectedFiles)]);
        }
    };

    const handleRemoveFile = (indexToRemove) => {
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                차량 선택
            </Typography>
            <Field.Select
                name="stepTwo.car"
                label="차량 선택"
                slotProps={{ inputLabel: { shrink: true } }}
                slotPropsSelect={{ native: true }}
                slotPropsMenuItem={{ dense: true }}
                slotPropsInput={{ readOnly: true }}
                slotPropsTextField={{ disabled: true }}
            />

            <Typography variant="h6" gutterBottom>
                파일 업로드
            </Typography>

            {/* 업로드 버튼 */}
            <Button
                variant="outlined"
                component="label"
                startIcon={<Iconify icon="solar:upload-bold" />}
                sx={{ mb: 2 }}
            >
                파일 선택
                <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleFileChange}
                />
            </Button>

            {/* 업로드된 파일 리스트 */}
            {files.length > 0 && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        업로드된 파일
                    </Typography>
                    <List>
                        {files.map((file, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                                        <Iconify icon="tabler:trash" width={20} />
                                    </IconButton>
                                }
                            >
                                <Box
                                    component="img"
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    sx={{ width: 40, height: 40, borderRadius: 1, mr: 2 }}
                                />
                                <ListItemText
                                    primary={file.name}
                                    secondary={`${(file.size / 1024).toFixed(1)} KB`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
}

// 수리 요청 정보 입력(Step 3)
// ----------------------------------------------------------------------
export function StepThree() {
    return (
        <>
            <Field.Text
                name="stepThree.message"
                label="수리 요청 정보"
                slotProps={{ inputLabel: { shrink: true } }}
            />
            <Field.Text
                name="stepThree.selectedDates"
                label="선택된 날짜"
                slotProps={{ inputLabel: { shrink: true } }}
                slotPropsTextField={{ disabled: true }}
                slotPropsInput={{ readOnly: true }}
            />
            <Field.DatePicker
                name="stepThree.date"
                label="수리 진행 가능 날짜"
                slotProps={{ inputLabel: { shrink: true } }}
                slotPropsDate={{ views: ['year', 'month', 'day'] }}
            />
            <Field.Text
                name="stepThree.address"
                label="주소"
                slotProps={{ inputLabel: { shrink: true } }}
                slotPropsTextField={{ disabled: true }}
                slotPropsInput={{ readOnly: true }}
            />
        </>
    );
}

// ----------------------------------------------------------------------

export function StepCompleted({ onReset }) {
    return (
        <Box
            sx={{
                gap: 3,
                display: 'flex',
                flex: '1 1 auto',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: 'inherit',
                bgcolor: 'background.neutral',
            }}
        >
            <Typography variant="subtitle1">All steps completed - you&apos;re finished</Typography>
            <Button
                variant="outlined"
                onClick={onReset}
                startIcon={<Iconify icon="solar:restart-bold" />}
            >
                Reset
            </Button>
        </Box>
    );
}
