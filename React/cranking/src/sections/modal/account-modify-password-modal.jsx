import React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

import { ProfileModifyPasswordForm } from 'src/sections/form/profile-modify-password-form';

// ----------------------------------------------------------------------

export function AccountModifyPasswordModal({ openModal, setOpenModal, }) {
    const handleClose = () => setOpenModal(false);

    return (
        <Modal
            open={openModal == 'modify-password'}
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
                    <Typography variant="h6">비밀번호 변경</Typography>
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
                    <ProfileModifyPasswordForm />
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
                    <Button onClick={handleClose}>취소</Button>
                    <Button variant="contained" onClick={() => { }}>변경하기</Button>
                </Box>
            </Box>
        </Modal>

    )
}