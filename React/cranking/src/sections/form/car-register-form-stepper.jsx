import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import MuiStepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

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

// 차량 번호 입력(Step 1)
// ----------------------------------------------------------------------
export function StepOne() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (_event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
                차량 정보 확인
            </Typography>
            <Field.Text
                name="stepOne.number"
                label="차량 번호 입력"
                placeholder="예) 12가 3456"
                helperText="차량 번호를 이용하여 차량 정보를 조회합니다."
                slotProps={{ inputLabel: { shrink: true } }}
            />
        </>
    );
}

// 차량 정보 확인(Step 2)
// ----------------------------------------------------------------------
export function StepTwo() {
    return (
        <>
            <Field.Text
                name="stepTwo.name"
                label="차량 이름"
                slotProps={{ inputLabel: { shrink: true } }}
            />
            <Field.Text
                name="stepTwo.manufacturer"
                label="차량 제조사"
                slotProps={{ inputLabel: { shrink: true } }}
            />
            <Field.Text
                name="stepTwo.carType"
                label="차량 종류"
                slotProps={{ inputLabel: { shrink: true } }}
            />
            <Field.Text
                name="stepTwo.carSize"
                label="차량 크기"
                slotProps={{ inputLabel: { shrink: true } }}
            />
            <Field.Text
                name="stepTwo.year"
                label="차량 연식"
                slotProps={{ inputLabel: { shrink: true } }}
            />
            <Field.Text
                name="stepTwo.cc"
                label="차량 배기량"
                slotProps={{ inputLabel: { shrink: true } }}
            />
            <Field.Text
                name="stepTwo.fuel"
                label="차량 연료"
                slotProps={{ inputLabel: { shrink: true } }}
            />
            <Field.Text
                name="stepTwo.transmission"
                label="차량 변속기"
                slotProps={{ inputLabel: { shrink: true } }}
            />
            <Field.Text
                name="stepTwo.color"
                label="차량 색상"
                slotProps={{ inputLabel: { shrink: true } }}
            />
            <Field.Text
                name="stepTwo.identificationNumber"
                label="차대 번호"
                slotProps={{ inputLabel: { shrink: true } }}
            />
        </>
    );
}

// 차량 사진 업로드(Step 3)
// ----------------------------------------------------------------------
export function StepThree() {
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
                파일 업로드
            </Typography>

            {/* 업로드된 파일들 */}
            <Field.File
                name="stepThree.images"
                label="차량 사진 업로드"
                slotProps={{ inputLabel: { shrink: true } }}
                multiple
                accept="image/*"
                onChange={handleFileChange}
                value={files.map(file => URL.createObjectURL(file))}
                renderInput={(params) => (
                    <Field.TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <IconButton
                                    onClick={() => setFiles([])}
                                    size="small"
                                    sx={{ ml: 1 }}
                                >
                                    <Iconify icon="tabler:trash" width={20} />
                                </IconButton>
                            ),
                        }}
                    />
                )}
            />

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
