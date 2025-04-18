import React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

import { CarCarousel } from 'src/sections/component/car-carousel';

// ----------------------------------------------------------------------

export function CarDetailModal({ openModal, setOpenModal, }) {
    const handleClose = () => setOpenModal(false);

    return (
        <Modal
            open={openModal == 'car-detail'}
            onClose={handleClose}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 0,
                    overflow: 'hidden',
                }}
            >
                {/* modalHead */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 3,
                        py: 2,
                        borderBottom: '1px solid #eee',
                    }}
                >
                    <Typography variant="h6">
                        차량 정보
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <Iconify icon="carbon:close" width={20} height={20} />
                    </IconButton>
                </Box>

                {/* modalBody */}
                <Box
                    sx={{
                        px: 3,
                        py: 2,
                    }}
                >
                    <CarCarousel />
                    {/* 차량명 + 번호 */}
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        쏘렌토 MQ4
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        차량 번호: 12가 1234
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* 주요 정보 */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                연식
                            </Typography>
                            <Typography variant="body1">2023</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                연료
                            </Typography>
                            <Typography variant="body1">디젤</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                변속기
                            </Typography>
                            <Typography variant="body1">자동</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                배기량
                            </Typography>
                            <Typography variant="body1">2200cc</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                색상
                            </Typography>
                            <Typography variant="body1">진회색</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                차종
                            </Typography>
                            <Typography variant="body1">SUV</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                제조사
                            </Typography>
                            <Typography variant="body1">기아</Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                차량 크기
                            </Typography>
                            <Typography variant="body1">대형</Typography>
                        </Box>

                        <Box sx={{ gridColumn: 'span 2' }}>
                            <Typography variant="caption" color="text.secondary">
                                차량 식별번호 (VIN)
                            </Typography>
                            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                                KMHE341ABCD567890
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* modalFooter */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                        px: 3,
                        py: 2,
                        borderTop: '1px solid #eee',
                        bgcolor: 'background.default',
                    }}
                >
                    <Button onClick={handleClose}>닫기</Button>
                    <Button variant="contained" onClick={() => { }}>
                        수정하기
                    </Button>
                </Box>
            </Box>
        </Modal>

    )
}