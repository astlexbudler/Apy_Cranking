import{j as t,B as n,T as s,I as h,a as m,D as a,b as p,q as j,H as b,C as d}from"./index-OSHjpEom.js";import{B as u}from"./button-goback-D5HbDokW.js";import{u as g,t as f,z as x,F as y,I as v}from"./form-provider-By_UTwdL.js";import{T as F}from"./TextField-D7_CctXc.js";import"./MenuItem-B5XJ1Y_I.js";import"./List-DhaKcT6X.js";import"./ListItemText-A0pJ6c80.js";function A({post:e}){if(!e)return t.jsx(n,{sx:{textAlign:"center",py:4,minHeight:"300px"},children:t.jsx(s,{variant:"h3",component:"h1",sx:{mt:4,color:"text.secondary"},children:"게시글을 확인할 수 없습니다."})});const i=()=>t.jsxs(t.Fragment,{children:[t.jsx(s,{variant:"h4",component:"h1",sx:{mt:4},children:e.title}),t.jsxs(n,{sx:{my:4,display:"flex",alignItems:"center"},children:[t.jsxs(n,{sx:{flexGrow:1},children:[t.jsx(s,{variant:"subtitle1",sx:{mb:.5},children:e.author.nickname}),t.jsxs(n,{sx:[{flexWrap:"wrap",display:"flex",alignItems:"center",typography:"caption",color:"text.secondary"}],children:["작성일 ",e.createdAt,t.jsx(s,{sx:{mx:1},children:"·"}),"조회수: ",e.viewCount]})]}),t.jsx(h,{color:"default",children:t.jsx(m,{icon:"solar:share-outline"})})]})]}),r=()=>t.jsx("div",{dangerouslySetInnerHTML:{__html:e.content}});return t.jsxs(t.Fragment,{children:[t.jsx(n,{children:i()}),t.jsx(n,{sx:{pb:5},children:r()})]})}function H({comments:e}){if(!e||e.length===0)return t.jsxs(t.Fragment,{children:[t.jsx(a,{sx:{mt:5}}),t.jsx(n,{sx:[{gap:{xs:3,md:4},py:{xs:5,md:10}}],children:t.jsx(s,{variant:"subtitle1",sx:{color:"text.secondary"},children:"댓글이 없습니다."})})]});const i=r=>t.jsxs(t.Fragment,{children:[t.jsxs(n,{sx:{gap:2,mb:5},children:[t.jsx(n,{sx:{gap:2,display:"flex",flexWrap:"wrap",alignItems:"flex-start"},children:t.jsxs(n,{sx:{flexGrow:1},children:[t.jsx(s,{variant:"h6",sx:{mb:.5},children:r.author.nickname}),t.jsx(s,{variant:"body2",sx:{color:"text.secondary"},children:r.author.title})]})}),t.jsx(s,{variant:"body2",sx:{color:"text.secondary"},children:r.content}),t.jsxs(s,{variant:"caption",sx:{color:"text.disabled"},children:["작성일 ",r.createdAt]})]}),t.jsx(a,{sx:{mb:5}})]});return t.jsxs(t.Fragment,{children:[t.jsx(a,{sx:{mt:5}}),t.jsx(n,{sx:[{gap:{xs:3,md:4},py:5}],children:e.map((r,o)=>i(r))})]})}function I(){const e={content:""},i=g({resolver:f(x.object({content:x.string().min(1,{message:"댓글을 입력해주세요."}).max(200,{message:"댓글은 200자 이내로 작성해주세요."})})),defaultValues:e,mode:"onChange"}),{reset:r,handleSubmit:o}=i,l=o(async c=>{alert(JSON.stringify(c)),r()});return t.jsxs(t.Fragment,{children:[t.jsx(a,{sx:{mt:5,mb:4}}),t.jsx(s,{variant:"h4",component:"h2",sx:{mb:2},children:"댓글 작성"}),t.jsx(y,{methods:i,onSubmit:l,children:t.jsx(n,{children:t.jsx(F,{name:"content",label:"댓글",placeholder:"댓글을 입력해주세요.",sx:{width:"100%"},slotProps:{inputLabel:{shrink:!0},input:{endAdornment:t.jsx(v,{position:"end",children:t.jsx(p,{variant:"contained",color:"inherit",size:"large",sx:{mr:-1.25},children:"댓글 쓰기"})})}}})})})]})}function C({post:e,comments:i}){return t.jsxs(j,{sx:{mt:{xs:2,md:3},minHeight:"100vh"},children:[t.jsx(u,{}),t.jsx(A,{post:e}),t.jsx(I,{}),t.jsx(H,{comments:i})]})}const T={title:`${d.appName}`},w={id:0,image:`${d.assetsDir}/assets/images/post/post1.png`,title:"[공지사항] Hofix 서버 점검 안내 (2025-10-01 ~ 2025-10-02)",author:{id:0,nickname:"Hofix 운영팀",accountType:"관리자"},board:"공지",createdAt:"2025-10-01 10:00",viewCount:10,content:`
    <p>안녕하세요, 차량 정비 예약 서비스 <b>Hofix</b>입니다.</p>
    <p>
    보다 편리하고 정확한 정비소 검색을 위해 <b>2025년 10월 1일(수) 00:00부터 10월 2일(목) 23:59까지</b>
    Hofix 서버 점검 및 서비스 업데이트가 진행될 예정입니다.
    이번 업데이트는 특히 <b>지도 기능 개선</b>에 중점을 두었으며, 사용자의 위치 기반으로
    <i>주변 정비소를 더 빠르고 정확하게 탐색</i>할 수 있도록 최적화하였습니다.
    </p>
    <p>또한, 다음과 같은 새로운 기능이 추가됩니다:</p>
    <ul>
      <li>정비소 <b>혼잡도 실시간 표시</b> 기능</li>
      <li>정비소의 <b>영업시간, 사용자 후기, 평점</b> 확인 기능 강화</li>
      <li>예약 시 <b>알림 기능</b> 개선으로 알림 예약 및 일정 관리 기능 추가</li>
      <li><i>사용자 UI/UX 개선</i>을 통해 더 직관적인 화면 구성</li>
    </ul>
    <p>
    업데이트 이후에는 기존 앱으로는 일부 기능이 정상적으로 작동하지 않을 수 있으므로,
    <b>반드시 앱을 최신 버전으로 업데이트</b>해 주시기 바랍니다.<br />
    최신 버전은 <b>플레이스토어(Android)</b> 또는 <b>앱스토어(iOS)</b>에서 'Hofix'를 검색 후,
    업데이트 버튼을 눌러 설치하실 수 있습니다.
    </p>
    <p>
    점검 기간 동안에는 서비스 접속이 <i>일시적으로 제한</i>될 수 있으며, 이로 인해 불편을 끼쳐드리는 점 양해 부탁드립니다.
    보다 안정적이고 향상된 서비스를 제공하기 위한 조치이오니 너그러운 이해와 협조를 부탁드립니다.
    </p>
    <p>
    앞으로도 Hofix는 사용자 여러분의 편의를 최우선으로 생각하며 <b>지속적인 서비스 개선</b>을 이어가겠습니다.
    <br />감사합니다.
    </p>
    <hr />
    <table border="1">
      <thead>
        <tr><th>항목</th><th>내용</th></tr>
      </thead>
      <tbody>
        <tr><td>점검 기간</td><td>2025년 10월 1일 00:00 ~ 10월 2일 23:59</td></tr>
        <tr><td>주요 업데이트</td><td>지도 기능 개선, 혼잡도 표시, 알림 기능 강화</td></tr>
        <tr><td>업데이트 필수 여부</td><td><b>필수</b></td></tr>
        <tr><td>업데이트 방법</td><td>플레이스토어 또는 앱스토어에서 최신 버전 설치</td></tr>
      </tbody>
    </table>`},k=[{id:1,author:{nickname:"우리 정비소",title:"내차처럼 챙겨드립니다.",accountType:"정비소"},content:"안녕하세요. 댓글 내용입니다. 정비소입니다.",createdAt:"2025-10-01 12:00"},{id:2,author:{nickname:"김정비",accountType:"사용자"},content:"안녕하세요. 댓글 내용입니다. 사용자입니다.",createdAt:"2025-10-01 12:00"}];function V(){return t.jsxs(t.Fragment,{children:[t.jsx(b,{children:t.jsxs("title",{children:[" ",T.title]})}),t.jsx(C,{post:w,comments:k})]})}export{V as default};
