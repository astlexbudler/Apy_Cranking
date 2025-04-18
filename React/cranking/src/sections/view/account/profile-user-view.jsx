import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import { SectionTitle } from 'src/sections/component/section-title';
import { NavProfileUser } from 'src/sections/component/nav-profile-user';
import { AccountModifyTelModal } from 'src/sections/modal/account-modify-tel-modal';
import { AccountModifyAddressModal } from 'src/sections/modal/account-modify-address-modal';
import { AccountModifyNicknameModal } from 'src/sections/modal/account-modify-nickname-modal';



// 사용자 계정 프로필 메인 섹션
// ----------------------------------------------------------------------
export function ProfileUserView({ account }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = (modalName) => () => setOpenModal(modalName);

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>
      <Box sx={{ gap: 2, display: 'flex' }}>

        {/* 사용자 프로필 네비게이션 */}
        <NavProfileUser />

        {/* 사용자 프로필 정보 */}
        <Paper
          elevation={5}
          sx={{
            width: '100%',
            minHeight: '300px',
            p: 3,
          }}
        >
          <SectionTitle
            title="프로필 정보"
            description="프로필 정보 확인 및 수정"
          />

          {/* 프로필 정보 표시 영역 */}
          <Box
            component="section"
            sx={{
              display: 'grid',
              gap: 3,
              mt: 3,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                lg: 'repeat(2, 1fr)',
              }
            }}
          >

            {/* 이메일 */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
              <Typography variant="caption" color="text.secondary">
                이메일
              </Typography>
              <Typography variant="body1">
                {account.email}
              </Typography>
            </Box>

            {/* 닉네임 */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
              <Typography variant="caption" color="text.secondary">
                {'닉네임 '}
                <ButtonBase
                  variant="caption"
                  color="text.secondary"
                  onClick={handleOpen('modify-nickname')}
                >
                  <i className="fi fi-rr-pen-clip" />
                </ButtonBase>
              </Typography>
              <Typography variant="body1">
                {account.nickname}
              </Typography>
            </Box>

            {/* 연락처 */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
              <Typography variant="caption" color="text.secondary">
                {'연락처 '}
                <ButtonBase
                  variant="caption"
                  color="text.secondary"
                  onClick={handleOpen('modify-tel')}
                >
                  <i className="fi fi-rr-pen-clip" />
                </ButtonBase>
              </Typography>
              <Typography variant="body1">
                {account.tel}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 3
            }}
          >
            {/* 주소 */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
              <Typography variant="caption" color="text.secondary">
                {'등록된 주소 '}
                <ButtonBase
                  variant="caption"
                  color="text.secondary"
                  onClick={handleOpen('modify-address')}
                >
                  <i className="fi fi-rr-pen-clip" />
                </ButtonBase>
              </Typography>
              <Typography variant="body1">
                {account.address}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              mt: 3
            }}
          >
            {/* 차량번호 */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
              <Typography variant="caption" color="text.secondary">
                등록된 차량
              </Typography>
              <Typography variant="body1">
                12가 1234(현대 소나타 뉴라이즈 2020), 34나 5678(기아 K5 2021)
              </Typography>
            </Box>
          </Box>


        </Paper>
      </Box>
      <AccountModifyNicknameModal openModal={openModal} setOpenModal={setOpenModal} />
      <AccountModifyTelModal openModal={openModal} setOpenModal={setOpenModal} />
      <AccountModifyAddressModal openModal={openModal} setOpenModal={setOpenModal} />
    </Container>
  );
}
