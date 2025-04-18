import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

import { ButtonGoback } from 'src/sections/component/button-goback';
import { SectionTitle } from 'src/sections/component/section-title';



// 채팅 메인 섹션
// ----------------------------------------------------------------------
export function ChatView() {

  const messages = [
    {
      id: 1,
      from: 'mechanic',
      text: '안녕하세요, 차량 상태 확인했습니다. 엔진오일 교환이 필요합니다.',
      time: '오전 9:15',
    },
    {
      id: 2,
      from: 'user',
      text: '교환 비용은 얼마나 드나요?',
      time: '오전 9:17',
    },
    {
      id: 3,
      from: 'mechanic',
      text: '약 6만원 정도 예상됩니다.',
      time: '오전 9:18',
    },
  ];

  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>

      <ButtonGoback />
      <Typography variant="h5" sx={{ mb: 5 }}>
        12가 3456 차량 수리 요청
      </Typography>

      <SectionTitle
        title="우리 정비소"
        description={
          <>
            {`20년 경력의 차량 전문가 `}
            <Link
              href={paths.mechanicView}
              variant="subtitle2"
            >
              프로필 보기 {'>'}
            </Link>
          </>
        }
        sx={{
          mb: 3,
        }}
      />

      {/* 채팅 영역 */}
      <Paper
        variant="outlined"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          mb: 2,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pr: 1,
            height: 'calc(100vh - 500px)',
          }}
        >
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
              }}
            >
              <Paper
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: msg.from === 'user' ? 'primary.main' : 'grey.100',
                  color: msg.from === 'user' ? 'common.white' : 'text.primary',
                  borderRadius: 2,
                  borderTopRightRadius: msg.from === 'user' ? 0 : 2,
                  borderTopLeftRadius: msg.from === 'user' ? 2 : 0,
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Paper>
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  color: 'text.disabled',
                  textAlign: msg.from === 'user' ? 'right' : 'left',
                }}
              >
                {msg.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* 입력창 */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: 메시지 전송 로직
        }}
      >
        <TextField
          fullWidth
          placeholder="메시지를 입력하세요..."
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <IconButton type="submit" color="primary">
          <Iconify icon="carbon:send" width={20} height={20} />
        </IconButton>
      </Box>

    </Container>
  );
}
