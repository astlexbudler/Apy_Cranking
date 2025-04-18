from django.urls import path
from . import apis as a

urlpatterns = [

    # apis as a
    path('test', a.api_test, name='api_test'), # 테스트 api(GET)
    path('csrftoken', a.api_csrftoken, name='api_csrftoken'), # csrf 토큰 api(GET)
    path('login', a.api_login, name='api_login'), # 로그인 api(POST)
    path('logout', a.api_logout, name='api_logout'), # 로그아웃 api(GET)

    # 계정 관리 RESTful api
    path('account', a.api_account.as_view(), name='api_account'),
    # POST /api/account/ - 계정 생성
    # GET /api/account/ - (search_type) single: 단일 계정 조회, list: 계정 목록 조회, near_mechanics: 가까운 정비공 목록 조회
    # PATCH /api/account/ - 계정 수정
    # DELETE /api/account/ - 계정 비활성화 및 삭제

    # 차량 관리 RESTful api
    path('car', a.api_car.as_view(), name='api_car'),
    # POST /api/car/ - 차량 생성
    # GET /api/car/ - (search_type) single: 단일 차량 조회, list: 차량 목록 조회
    # PATCH /api/car/ - 차량 수정
    # DELETE /api/car/ - 차량 삭제

    # 게시글 관리 RESTful api
    path('post', a.api_post.as_view(), name='api_post'),
    # POST /api/post/ - 게시글 생성
    # GET /api/post/ - (search_type) single: 단일 게시글 조회, list: 게시글 목록 조회
    # PATCH /api/post/ - 게시글 수정
    # DELETE /api/post/ - 게시글 삭제

    # 댓글 관리 RESTful api
    path('comment', a.api_comment.as_view(), name='api_comment'),
    # POST /api/comment/ - 댓글 생성
    # GET /api/comment/ - (search_type) single: 단일 댓글 조회, list: 댓글 목록 조회
    # PATCH /api/comment/ - 댓글 수정
    # DELETE /api/comment/ - 댓글 삭제

    # 질문 관리 RESTful api
    path('question', a.api_question.as_view(), name='api_question'),
    # POST /api/question/ - 질문 생성
    # GET /api/question/ - (search_type) single: 단일 질문 조회, tree: 질문 트리 조회
    # PATCH /api/question/ - 질문 수정
    # DELETE /api/question/ - 질문 삭제

    # 질문 태그 관리 RESTful api
    path('question_tag', a.api_question_tag.as_view(), name='api_question_tag'),
    # POST /api/question_tag/ - 질문 태그 생성
    # GET /api/question_tag/ - (search_type) single: 단일 질문 태그 조회, list: 질문 태그 목록 조회
    # PATCH /api/question_tag/ - 질문 태그 수정
    # DELETE /api/question_tag/ - 질문 태그 삭제

    # 주문 관리 RESTful api
    path('order', a.api_order.as_view(), name='api_order'),
    # POST /api/order/ - 주문 생성
    # GET /api/order/ - (search_type) single: 단일 주문 조회, list: 주문 목록 조회
    # PATCH /api/order/ - 주문 수정
    # DELETE /api/order/ - 주문 삭제

    # 견적 관리 RESTful api
    path('estimate', a.api_estimate.as_view(), name='api_estimate'),
    # POST /api/estimate/ - 견적 생성
    # GET /api/estimate/ - (search_type) single: 단일 견적 조회, list: 견적 목록 조회
    # PATCH /api/estimate/ - 견적 수정
    # DELETE /api/estimate/ - 견적 삭제

    # 리뷰 관리 RESTful api
    path('review', a.api_review.as_view(), name='api_review'),
    # POST /api/review/ - 리뷰 생성
    # GET /api/review/ - (search_type) single: 단일 리뷰 조회, list: 리뷰 목록 조회
    # PATCH /api/review/ - 리뷰 수정
    # DELETE /api/review/ - 리뷰 삭제

    # 알림 관리 RESTful api
    path('notification', a.api_notification.as_view(), name='api_notification'),
    # POST /api/notification/ - 알림 생성
    # GET /api/notification/ - (search_type) single: 단일 알림 조회, list: 알림 목록 조회

    # 채팅 관리 RESTful api
    path('chat', a.api_chat.as_view(), name='api_chat'),
    # POST /api/chat/ - 채팅 생성
    # GET /api/chat/ - (search_type) single: 단일 채팅 조회, list: 채팅 목록 조회

    # 서버 로그 관리 RESTful api
    path('server_log', a.api_server_log.as_view(), name='api_server_log'),
    # POST /api/server_log/ - 서버 로그 생성
    # GET /api/server_log/ - (search_type) single: 단일 서버 로그 조회, list: 서버 로그 목록 조회

    # 인증 코드 관리 RESTful api
    path('cert_code', a.api_cert_code.as_view(), name='api_cert_code'),
    # POST /api/cert_code/ - 인증 코드 생성
    # GET /api/cert_code/ - (search_type) single: 단일 인증 코드 조회, list: 인증 코드 목록 조회
    # DELETE /api/cert_code/ - 인증 코드 삭제

    # 서버 설정 관리 RESTful api
    path('server_setting', a.api_server_setting.as_view(), name='api_server_setting'),
    # GET /api/server_setting/ - 서버 설정 조회
    # PATCH /api/server_setting/ - 서버 설정 수정

]
