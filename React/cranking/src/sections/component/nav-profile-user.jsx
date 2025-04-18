import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import { Iconify } from 'src/components/iconify';

import { AccountResignModal } from 'src/sections/modal/account-resign-modal';
import { AccountModifyPasswordModal } from 'src/sections/modal/account-modify-password-modal';



// 프로필 페이지 네비게이션
// ----------------------------------------------------------------------

export function NavProfileUser() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = (modalName) => () => setOpenModal(modalName);

  return (
    <>
      <Paper
        elevation={5}
        sx={{
          height: '100%',
        }}
      >
        <Stack
          divider={<Divider component="span" sx={{ borderStyle: 'dashed' }} />}
          sx={{
            width: { xs: 72, md: 280 },
            flexShrink: 0,
            borderRadius: 2,
            display: 'flex',
          }}
        >
          <Box
            sx={{
              p: 3,
              pb: 2,
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Typography variant="subtitle1" noWrap sx={{ mb: 0.5 }}>
              사용자 닉네임
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
              your@email.com
            </Typography>
          </Box>
          <Box component="nav" sx={{ my: 1, px: 3, '& li': { display: 'flex' } }}>
            <ul>
              <ButtonBase
                disableRipple
                sx={{
                  gap: 2,
                  width: 1,
                  height: 44,
                  borderRadius: 1,
                  typography: 'body2',
                  justifyContent: 'flex-start',
                  color: 'primary.main',
                }}
              >
                <Iconify icon="carbon:user-avatar" width={24} height={24} />
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  내 정보
                </Typography>
              </ButtonBase>
              <ButtonBase
                disableRipple
                onClick={handleOpen('modify-password')}
                sx={{
                  gap: 2,
                  width: 1,
                  height: 44,
                  borderRadius: 1,
                  typography: 'body2',
                  justifyContent: 'flex-start',
                  color: 'text.secondary',
                }}
              >
                <Iconify icon="carbon:password" width={24} height={24} />
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  비밀번호 변경
                </Typography>
              </ButtonBase>
              <ButtonBase
                disableRipple
                sx={{
                  gap: 2,
                  width: 1,
                  height: 44,
                  borderRadius: 1,
                  typography: 'body2',
                  justifyContent: 'flex-start',
                  color: 'text.secondary',
                }}
              >
                <Iconify icon="carbon:car" width={24} height={24} />
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  차량 관리
                </Typography>
              </ButtonBase>
              <ButtonBase
                disableRipple
                sx={{
                  gap: 2,
                  width: 1,
                  height: 44,
                  borderRadius: 1,
                  typography: 'body2',
                  justifyContent: 'flex-start',
                  color: 'text.secondary',
                }}
              >
                <Iconify icon="iconoir:post" width={24} height={24} />
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  정비 기록
                </Typography>
              </ButtonBase>
              <ButtonBase
                disableRipple
                onClick={handleOpen('resign-account')}
                sx={{
                  gap: 2,
                  width: 1,
                  height: 44,
                  borderRadius: 1,
                  typography: 'body2',
                  justifyContent: 'flex-start',
                  color: 'text.secondary',
                }}
              >
                <Iconify icon="carbon:trash-can" width={24} height={24} />
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  회원 탈퇴
                </Typography>
              </ButtonBase>
            </ul>
          </Box>
          <Box sx={{ py: 1.5, px: 3 }}>
            <ButtonBase
              disableRipple
              sx={{
                gap: 2,
                width: 1,
                height: 44,
                borderRadius: 1,
                typography: 'body2',
                justifyContent: 'flex-start',
                color: 'text.secondary',
              }}
            >
              <Iconify icon="carbon:logout" width={24} height={24} />
              <Typography
                variant="body2"
                sx={{
                  display: { xs: 'none', md: 'block' },
                  whiteSpace: 'nowrap',
                }}
              >
                로그아웃
              </Typography>
            </ButtonBase>
          </Box>
        </Stack >
      </Paper >
      <AccountResignModal openModal={openModal} setOpenModal={setOpenModal} />
      <AccountModifyPasswordModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  )
}