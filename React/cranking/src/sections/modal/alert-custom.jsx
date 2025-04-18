import React from 'react';

import { Box, Modal, Typography } from '@mui/material';


export function AlertCustom({ open, close, icon, title, message, buttons }) {
    return (
        <Modal open={open} onClose={close}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 360,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 3,
                    textAlign: 'center',
                }}
            >

                {icon}

                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>

                <Typography variant="body2" sx={{ mb: 3 }}>
                    {message}
                </Typography>

                {/* 버튼 영역 */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {buttons}
                </Box>
            </Box>
        </Modal>
    );
}
