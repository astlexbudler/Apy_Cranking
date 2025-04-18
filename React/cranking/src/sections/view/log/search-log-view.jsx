import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import ListItemText from '@mui/material/ListItemText';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { SectionTitle } from 'src/sections/component/section-title';


// 서버 로그 메인 섹션
// ----------------------------------------------------------------------
const logMessages = [
  {
    id: 1,
    message: '서버가 시작되었습니다.',
    createdAt: '2025-04-17 10:00:12',
  },
  {
    id: 2,
    message: '사용자 요청 처리 중 오류 발생: DB 연결 실패',
    createdAt: '2025-04-17 10:01:45',
  },
  {
    id: 3,
    message: '새로운 정비사 계정이 등록되었습니다.',
    createdAt: '2025-04-17 10:05:03',
  },
];

export function SearchLogView() {
  return (
    <Container sx={{ mt: { xs: 2, md: 3 }, minHeight: '100vh' }}>
      {/* 제목 */}
      <SectionTitle
        title="서버 로그 메세지"
        description="서버에서 발생한 로그 메세지를 확인할 수 있습니다."
      />

      {/* 로그 리스트 */}
      <List>
        {logMessages.map((log, index) => (
          <Box key={log.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={log.message}
                secondary={log.createdAt}
              />
            </ListItem>
            {index < logMessages.length - 1 && <Divider />}
          </Box>
        ))}
      </List>

      {/* 페이지네이션 */}
      <Pagination
        count={10}
        sx={{ py: 10, [`& .${paginationClasses.ul}`]: { justifyContent: 'center' } }}
      />

    </Container>
  );
}