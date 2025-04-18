import{j as e,q as D,B as s,T as c,p as m,C as a,H as $}from"./index-OSHjpEom.js";import{B as r}from"./button-card-DXe8aMx_.js";import{S as p}from"./section-title-DXBIhfo3.js";import{N as I,E as C}from"./event-carousel-B3lITXyH.js";import"./AccordionDetails-CQb334C5.js";import"./TableContainer-uNdq8VuB.js";function A({noticePosts:x,eventPosts:g,orders:d}){const h=`${a.assetsDir}/assets/images/menu/repair.png`,u=`${a.assetsDir}/assets/images/menu/map.png`,j=`${a.assetsDir}/assets/images/menu/mechanic.png`,n=(t,i)=>e.jsx(s,{component:"img",src:t,sx:{width:i=="small"?"25%":"35%",minWidth:i=="small"?"80px":"85px",aspectRatio:"1/1",objectFit:"contain"}}),o=(t,i,l)=>e.jsxs(c,{variant:l=="small"?"h6":"h4",sx:{ml:l=="small"?2:3,color:"text.primary"},children:[t,e.jsx(c,{variant:l=="small"?"body2":"body1",sx:{color:"text.secondary"},children:i})]}),y=()=>d?d.map(t=>e.jsxs(r,{link:"/user/repair-request",children:[e.jsxs(s,{sx:{gap:1,display:"flex",alignItems:"center",typography:"h4"},children:[t.car.number,e.jsx(c,{variant:"subtitle2",component:"span",sx:{color:"text.secondary"},children:t.car.name})]}),t.user.nickname,"님",e.jsxs(e.Fragment,{children:[e.jsxs(s,{sx:{gap:1,display:"flex",typography:"body2",mt:3},children:[e.jsx(s,{component:"span",sx:{flexGrow:1},children:"요청 일시"}),e.jsx(s,{component:"span",sx:{color:"text.secondary"},children:t.createdAt})]}),e.jsxs(s,{sx:{gap:1,display:"flex",typography:"body2"},children:[e.jsx(s,{component:"span",sx:{flexGrow:1},children:"현재 상태"}),e.jsx(s,{component:"span",sx:{color:"text.secondary"},children:t.status})]})]})]},t.id)):e.jsx(s,{sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",height:"100%",typography:"h4",color:"text.secondary"},children:"수리 요청 내역이 없습니다."}),f=e.jsx(r,{link:`${m.partner.repairRequests}?status=request`,children:e.jsxs(s,{sx:{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",height:"100%"},children:[n(h,"large"),o("수리 요청 확인","새 차량 정비 요청 확인","large")]})}),b=e.jsx(r,{link:`${m.partner.repairRequests}?status=ongoing`,children:e.jsxs(s,{sx:{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",height:"100%"},children:[n(j,"small"),o("내 정비 요청","진행중인 정비 요청 확인","small")]})}),w=e.jsx(r,{link:m.map,children:e.jsxs(s,{sx:{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",height:"100%"},children:[n(u,"small"),o("정비소 찾기","주변 정비소 찾기","small")]})});return e.jsxs(D,{sx:{mt:{xs:2,md:3},minHeight:"100vh"},children:[e.jsx(I,{posts:x}),e.jsx(C,{posts:g}),e.jsx(p,{title:"진행중인 수리 요청",description:"내 정비소의 진행중인 수리 요청을 확인하세요."}),y(),e.jsxs(s,{sx:{mb:5},children:[e.jsx(p,{title:"서비스",description:"주변 정비 요청 검색 및 정비 요청 관리"}),e.jsxs(s,{component:"section",sx:[{gap:1,display:"grid",pb:{xs:5,md:10},gridTemplateColumns:{xs:"repeat(2, 1fr)"}}],children:[f,e.jsxs(s,{sx:{display:"grid",gridTemplateColumns:"repeat(1, 1fr)"},children:[b,w]})]})]})]})}const H={title:`${a.appName}`},R=[{id:0,title:"[공지사항] Hofix 서버 점검 안내 (2025-10-01 ~ 2025-10-02)",createdAt:"2025-10-01 10:00"},{id:1,title:"[공지사항] Hofix 개인정보 처리방침 변경 안내",createdAt:"2025-10-01 10:00"},{id:2,title:"[공지사항] Hofix 서비스 이용약관 변경 안내",createdAt:"2025-10-01 10:00"}],k=[{id:0,image:`${a.assetsDir}/assets/images/1.webp`,title:"[이벤트] Hofix 신규 회원 가입 이벤트 안내",createdAt:"2025-10-01 10:00"},{id:1,image:`${a.assetsDir}/assets/images/2.webp`,title:"[이벤트] Hofix 10월 이벤트! 미션을 완료하고 보상을 받자!",createdAt:"2025-10-01 10:00"},{id:2,image:`${a.assetsDir}/assets/images/3.webp`,title:"[이벤트] 정비소 이용 후기 작성 이벤트 안내",createdAt:"2025-10-01 10:00"}],v=[{id:0,selectedQuestionTags:["엔진룸","소음","차량 흔들림"],user:{id:101,email:"jiyoon.lee@email.com",nickname:"이지윤",tel:"01012345678"},mechanic:{id:2,nickname:"우리 정비소",title:"내차처럼 소중히 다루겠습니다.",image:`${a.assetsDir}/assets/images/account/mechanic1.png`},car:{id:1,image:`${a.assetsDir}/assets/images/car/car1.png`,number:"12가 1234",name:"쏘렌토 MQ4",manufacturer:"기아"},createdAt:"2025-01-01 10:00",status:"수리",avaiableDates:["2025-01-02","2025-01-03","2025-01-04","2025-01-05","2025-01-06"]}];function P(){return e.jsxs(e.Fragment,{children:[e.jsx($,{children:e.jsxs("title",{children:[" ",H.title]})}),e.jsx(A,{noticePosts:R,eventPosts:k,orders:v})]})}export{P as default};
