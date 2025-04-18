import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/global-config';

import { ChatView } from 'src/sections/view/chat-view';



// 채팅 페이지
// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.appName}` };

const chats = [
  {
    sender: {
      id: 1,
      nickname: '사용자1',
      accountType: '사용자',
    },
    receiver: {
      id: 2,
      nickname: '정비사1',
      accountType: '정비사',
      image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png`
    },
    content: '안녕하세요, 정비사님! 차량 하부에서 이상한 소리가 나는데 봐주실 수 있나요?',
    createdAt: '2025-01-01 09:00',
  },
  {
    sender: {
      id: 2,
      nickname: '정비사1',
      accountType: '정비사',
      image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png`
    },
    receiver: {
      id: 1,
      nickname: '사용자1',
      accountType: '사용자',
    },
    content: '안녕하세요! 어떤 상황에서 소리가 나는지 조금 더 자세히 설명해주실 수 있나요?',
    createdAt: '2025-01-01 09:01',
  },
  {
    sender: {
      id: 1,
      nickname: '사용자1',
      accountType: '사용자',
    },
    receiver: {
      id: 2,
      nickname: '정비사1',
      accountType: '정비사',
      image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png`
    },
    content: '속도가 60km/h 이상일 때 바닥 쪽에서 덜그럭거리는 소리가 나요.',
    createdAt: '2025-01-01 09:02',
  },
  {
    sender: {
      id: 2,
      name: '정비사1',
      accountType: '정비사',
      images: [
        { id: 0, image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png` },
        { id: 1, image: `${CONFIG.assetsDir}/assets/images/account/mechanic2.png` },
        { id: 2, image: `${CONFIG.assetsDir}/assets/images/account/mechanic3.png` },
      ],
    },
    receiver: {
      id: 1,
      nickname: '사용자1',
      accountType: '사용자',
    },
    content: '하부 부싱이나 서스펜션 문제일 수 있겠네요. 점검은 15,000원이고 수리비는 상태에 따라 달라집니다.',
    createdAt: '2025-01-01 09:04',
  },
  {
    sender: {
      id: 1,
      nickname: '사용자1',
      accountType: '사용자',
    },
    receiver: {
      id: 2,
      name: '정비사1',
      accountType: '정비사',
      images: [
        { id: 0, image: `${CONFIG.assetsDir}/assets/images/account/mechanic1.png` },
        { id: 1, image: `${CONFIG.assetsDir}/assets/images/account/mechanic2.png` },
        { id: 2, image: `${CONFIG.assetsDir}/assets/images/account/mechanic3.png` },
      ],
    },
    content: '감사합니다. 그럼 내일 오전에 방문드릴게요!',
    createdAt: '2025-01-01 09:05',
  },
];

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ChatView chats={chats} />
    </>
  );
}
