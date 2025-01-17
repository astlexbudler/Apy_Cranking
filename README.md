# 크랭킹(진행중) * 작성중

원격 차량 정비 예약 서비스.
Django와 Flutter Webview를 이용해서 웹사이트와 앱을 같이 제작합니다.
사용자용 앱과 파트너용 앱이 별도로 구분되며, 하나의 프로젝트로 두 개의 앱을 제공합니다.

---

## 개요

Cranking은 일반 사용자(user), 파트너 회원(partner), 관리자(admin)로 구분되는 계정 시스템을 기반으로, 차량 정비 예약 및 관리 서비스를 제공합니다.
사용자는 차량 문제를 사진과 텍스트로 등록하고, 파트너 회원은 이를 바탕으로 진단 및 견적을 제공합니다.
채팅을 통해 추가 협의를 진행한 후 정비를 예약하고, 정비 완료 후 리뷰를 남길 수 있습니다.
관리자는 서비스 운영 전반을 관리하고 사용자 및 파트너의 요청을 처리합니다.

---

## 주의

⚠️ 시크릿 인증 키를 직접 하드코딩하지 마세요. credentials.json 파일에 인증키를 저장하고 따로 관리하여야합니다.

---

## 프로젝트 구조

프로젝트 명: Cranking 크랭킹

- **app_core**:
프로젝트의 기본 설정과 관련된 앱. 사전 설정 데이터 및 스케줄러, 기본적인 설정과 관련된 테이블이 정의되어있습니다.
  - MODEL:
UPLOAD(파일 업로드), CERT_CODE(이메일 인증 코드), CrankingUser(사용자), SERVER_SETTING(서버 설정), SERVER_LOG(서버 기록)

- **app_api**:
API 요청 주소와 해당 요청에 대한 처리가 정의되어있는 앱. 별도로 정의된 테이블은 없습니다.

- **app_user**:
사용자 앱. 기본 사용자 페이지들에 대한 주소와 해당 요청에 대한 처리가 정의되어있는 앱.  
주 페이지들이 정의되어있습니다.
  - PATH:
/(시작 및 로그인 페이지)  
/login_kakao(카카오 로그인 페이지)  
/login_naver(네이버 로그인 페이지)  
/login_apple(애플 로그인 페이지)  
/register(회원가입 페이지, SNS 가입 포함)  
/find_account(계정 복구 페이지. 이메일 인증 후 아이디 확인 및 비밀번호 초기화 페이지로 이동)  
/reset_account(계정 복구 페이지. 가입된 아이디를 확인하고 비밀번호 초기화를 진행)  
/profile(사용자 프로필 정보 페이지. 내용 수정 가능)  
/map(지도 페이지. 서비스에 가입된 파트너들의 정보 확인 가능. 세부 정보는 모달을 이용하여 표시)  
/contact(관리자 정보 페이지. 필수)  
/terms(이용 약관 페이지. 필수)

- **app_post**:
게시글 관련 앱. 공지사항 및 이벤트 등의 게시글에 대한 처리가 정의되어있습니다.
  - PATH:
/post(게시글 세부 정보 페이지)  
/post/notice(공지사항 페이지)  
/post/event(이벤트 페이지)  
/post/write_post(게시글 작성 페이지. 관리자만 접근 가능합니다.)  
/post/rewrite_post(게시글 수정 페이지. 관리자만 접근 가능합니다.)
  - MODEL:
POST(게시글), COMMENT(댓글)

- **app_order**:
차량 정비 요청과 관련된 앱. 차량 정비 예약 및 주문 처리에 대한 정의가 되어있습니다.
  - PATH:
/order(활성 요청 확인 페이지)  
/order/request(새 정비 요청 생성하기)  
/order/histories(내 요청 기록들 확인 페이지)  
/order/history(내 요청 기록 상세 페이지)  
/order/write_review(파트너 정비 리뷰 작성 페이지)
  - MODEL:
ORDER(정비 요청), ESTIMATE(예상 견적)

- **app_message**:
채팅 및 알림 앱. 채팅 및 알림 관련 요청에 대한 처리가 정의되어있습니다.
  - PATH:
/chat(채팅방 페이지)
  - MODEL:
CHAT(채팅), NOTIFICATION(알림)

- **app_partner**:
파트너 앱. 파트너 요청에 대한 처리가 정의되어있습니다.
  - PATH:
/partner(파트너 로그인 및 메인 페이지)  
/partner/register(파트너 가입 요청 작성 페이지)  
/partner/profile(파트너 프로필 페이지. 수정도 가능)  
/partner/orders(견적 요청들 확인 페이지)  
/partner/history(완료된 견적 요청들 확인 페이지)  
/partner/chats(대화중인 채팅방 페이지)

- **app_supervisor**:
관리자 앱. 관리자 요청에 대한 처리가 정의되어있습니다.
  - PATH:
/supervisor(관리자 로그인 및 페인 페이지)  
/supervisor/users(사용자 목록 페이지)  
/supervisor/partners(파트너 목록 페이지. 가입 신청 확인 가능)  
/supervisor/orders(모든 견적 요청 확인 페이지)  
/supervisor/order_detail(견적 상세 확인 페이지)  
/supervisor/send_push(푸시 알림 발송 페이지)

---

## 기능설명

- **사용자 계정**:
사용자 계정은 일반 사용자(user)와 파트너 회원(partner) 그리고 관리자(admin)으로 구분됩니다. 일반 사용자는 SNS 로그인 또는 직접 이메일을 입력하여 가입이 가능하며, 선택적으로 차량 정보를 입력하여 가입할 수 있습니다. 파트너 회원의 경우 가입 신청만 가능하며, 가입 신청 작성 시, 가입 대기 중 상태로 가입이 가능합니다. 가입 시 정보소 정보를 추가로 입력해야합니다.

-**차량 정비 예약**:
차량 정비를 예약하기 위해서 사용자는 견적 확인 버튼을 통해서 차량에 문제 또는 정비를 요청하는 부분의 대한 설명과 함께 선택적으로 이미지를 업로드하여 요청을 작성할 수 있습니다.
요청된 차량 정비에는 파트너 회원이 ESTIMATE(예상 견적)을 보낼 수 있습니다. 보낸 예상 견적에는 금액 범위, 세부 내용과 이미지를 첨부하여 보냃 수 있고 사용자는 보낸 견적을 확인하고, 파트너와 채팅을 통해 추가적인 견적 내용에 대해서 상의할 수 있습니다.
사용자는 보낸 견적들 중 하나의 파트너를 선택하여 정비 예약을 진행할 수 있으며, 이때부터는 사용자와 파트너간의 채팅으로 자율적으로 정비가 진행됩니다.
이후 리뷰 작성을 통해 사용자는 파트너의 리뷰를 작성할 수 있으며, 이 때, 금액도 같이 작성합니다.

-**채팅 및 알림 시스템**:
파트너와 회원간 차량 정비 예약과 관련한 견적 요청을 위해서 채팅을 사용합니다. 채팅으로는 메세지와 함께, 이미지도 보낼 수 있습니다.
채팅의 경우 실시간 채팅이 아닌 request 요청 후 새로운 채팅 메세지 확인을 통해서 진행합니다.
알림 시스템의 경우 사용자 및 파트너 필드에 있는 device 토큰값과 app_id 값을 통해서 사용자의 앱과 디바이스를 식별하여 알림 메세지를 보낼 수 있습니다. 알림 메세지에는 제목, 메세지, 링크를 작성할 수 있습니다.

-**파트너 계정**:
파트너 계정은 기본적으로는 사용자와 별개의 앱을 사용합니다. 다만 같은 프로젝트 내에서 처리됩니다.
파트너는 가입 시 정비소의 정보를 추가로 입력하고 가입할 수 있습니다. 이때, 정비소의 주소가 좌표 형태로도 필드에 저장됩니다.
파트너의 위치로부터 nKm 이내에 있는 정비 요청을 확인할 수 있습니다. 파트너는 요청된 정비 예약에 예상 견적을 작성하여 발송할 수 있습니다.
발송된 예상 견적을 확인한 사용자는 채팅 시작을 통해 파트너와 견적에 대해서 채팅으로 상의할 수 있으며, 사용자가 정비소 선택 버튼을 누르면 현재 대화중인 파트너와만 대화할수 있게 되어 세부적인 정비 요청에 대한 대화를 주고 받을 수 있게 됩니다.
파트너는 본인의 정비소에 대한 리뷰를 확인할 수 있습니다.

-**관리자 계정**:
관리자 계정은 사이트 내 공지사항이나 이벤트 게시긇을 작성할 수 있으며, 사용자를 조회하거나, 파트너 계정의 가입 요청을 확인할 수 있습니다.
추가로 회원들에게 푸시 메세지를 발송할 수 있습니다. 푸시 메세지는 타겟(사용자 또는 파트너), 제목, 메세지, 링크로 구분되며, 푸시 메세지 발송 요청 후 5분 이내에 푸시 메세지가 발송됩니다.
파트너 계정은 Django admin 접근 권한이 부여됩니다.

-**리뷰 작성**:
주문이 완료되면 사용자는 파트너에게 리뷰를 작성할 수 있습니다. 리뷰에는 금액과 평점, 평가를 남길 수 있습니다.
리뷰는 파트너 정보에서 확인이 가능합니다.
