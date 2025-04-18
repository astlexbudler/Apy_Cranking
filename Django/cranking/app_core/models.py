import random
from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime
import os



####################
# TABLE
# ACCOUNT: 계정 테이블
# GROUP: 그룹 테이블(장고 기본)
# CAR: 차량 테이블
# QUESTION: 문의 테이블
# QUESTION_TAG: 문의 태그 테이블
# ORDER: 주문 테이블
# ESTIMATE: 견적 테이블
# REVIEW: 리뷰 테이블
###################
# UPLOAD: 업로드 테이블
# POST: 게시글 테이블
# COMMENT: 게시글 댓글 테이블
# CHAT: 채팅 테이블
# NOTIFICATION: 알림 테이블
# SERVER_LOG: 서버 로그 테이블
# CERT_CODE: 인증 코드 테이블
# SERVER_SETTING: 서버 설정 테이블

def upload_to(instance, filename):  # 파일 업로드 경로 및 파일명 설정
    _, ext = os.path.splitext(filename)
    new_filename = f"{datetime.now().strftime('%Y%m%d%H%M%S%f')}{ext}" # 현재 시간을 이용한 파일명 생성
    return os.path.join(new_filename)



####################
# ACCOUNT: 계정 테이블
class ACCOUNT(AbstractUser):
    # id = models.AutoField(primary_key=True) 데이터베이스 식별용 아이디
    # username = models.CharField(max_length=150, unique=True) 로그인 시 사용하는 아이디
    # password = models.CharField(max_length=128)
    # first_name = models.CharField(max_length=30) # 닉네임 또는 업체명
    # last_name = models.CharField(max_length=150) # 정비소 강조 문구
    # email = models.EmailField(max_length=254)
    # is_active = models.BooleanField(default=True) # 계정 활성화 여부
    # is_staff = models.BooleanField(default=False) # 관리자 여부(최상위 관리자만 True)
    # is_superuser = models.BooleanField(default=False) # 최상위 관리자 여부(최상위 관리자만 True)
    # date_joined = models.DateTimeField(auto_now_add=True) # 가입일
    # last_login = models.DateTimeField(auto_now=True) # 마지막 로그인 시간
    # groups = models.ManyToManyField(Group) # 그룹(사용자, 파트너, 관리자)
    images = models.ManyToManyField('UPLOAD', related_name='account_images', blank=True) # 이미지
    tel = models.CharField(max_length=20) # 전화번호
    address = models.CharField(max_length=200, null=True, blank=True) # 주소
    lat = models.FloatField(null=True, blank=True) # 위도
    lon = models.FloatField(null=True, blank=True) # 경도
    avg_rate = models.FloatField(default=0) # 평균 평점
    is_sns = models.BooleanField(default=False) # SNS 계정 여부
    is_push = models.BooleanField(default=False) # 푸시 알림 여부
    is_email = models.BooleanField(default=False) # 이메일 알림 여부
    device_token = models.CharField(max_length=300, null=True, blank=True) # 디바이스 토큰
    note = models.TextField(blank=True, null=True) # 메모
# GROUP: 그룹 테이블
# class GROUP(models.Model):
# name = models.CharField(primary_key=True) # 그룹 이름(사용자, 파트너, 관리자)
# permissions = models.ManyToManyField(Permission)

####################
# CAR: 차량 테이블
class CAR(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    user = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='car_user') # 계정
    images = models.ManyToManyField('UPLOAD', related_name='car_images', blank=True) # 이미지
    number = models.CharField(max_length=20) # 차량 번호
    identification_number = models.CharField(max_length=100) # 차대 번호
    name = models.CharField(max_length=100) # 차량명
    manufacturer = models.CharField(max_length=40) # 제조사
    car_type = models.CharField(max_length=10, choices=[
        ('세단', '세단'), ('SUV', 'SUV'), ('쿠페', '쿠페'), ('해치백', '해치백'), ('웨건', '웨건'), ('밴', '밴'), ('트럭', '트럭')
    ]) # 차량 종류(세단, SUV, 쿠페, 해치백, 웨건, 밴, 트럭)
    car_size = models.CharField(max_length=10, choices=[
        ('경형', '경형'), ('소형', '소형'), ('중형', '중형'), ('대형', '대형'), ('특대형', '특대형')
    ]) # 차량 크기(경형, 소형, 중형, 대형, 특대형)
    year = models.CharField(max_length=20) # 연식
    cc = models.CharField(max_length=20) # 배기량
    engine = models.CharField(max_length=40) # 엔진
    fuel = models.CharField(max_length=20, choices=[
        ('전기', '전기'), ('LPG', 'LPG'), ('디젤', '디젤'), ('가솔린', '가솔린'), ('수소', '수소')
    ]) # 연료(전기, LPG, 디젤, 가솔린, 수소)
    transmission = models.CharField(max_length=20, choices=[
        ('자동', '자동'), ('수동', '수동')
    ]) # 변속기(자동, 수동)
    color = models.CharField(max_length=20) # 색상

####################
# QUESTION: 문의 테이블
class QUESTION(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    parent_question = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True) # 부모 문의
    tags = models.ManyToManyField('QUESTION_TAG', related_name='question_tags') # 태그
    image = models.ForeignKey('UPLOAD', on_delete=models.CASCADE, related_name='question_image', blank=True, null=True) # 이미지
    title = models.CharField(max_length=100) # 제목
    content = models.TextField() # 내용
    related_questions = models.ManyToManyField('self', blank=True) # 관련 문의

####################
# QUESTION_TAG: 문의 태그 테이블
class QUESTION_TAG(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    name = models.CharField(max_length=100, unique=True) # 태그 이름

####################
# ORDER: 주문 테이블
class ORDER(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    selected_questions = models.ManyToManyField('QUESTION', related_name='order_selected_questions') # 선택된 문의
    user = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='order_user') # 사용자
    mechanic = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='order_mechanic', null=True, blank=True) # 정비공
    images = models.ManyToManyField('UPLOAD', related_name='order_images') # 이미지
    message = models.TextField() # 메시지
    address = models.CharField(max_length=200) # 주소
    lat = models.FloatField() # 위도
    lon = models.FloatField() # 경도
    status = models.CharField(max_length=20, default='요청됨', choices=[
        ('요청됨', '요청됨'), ('진행중', '진행중'), ('수리중', '수리중'), ('완료', '완료'), ('취소', '취소'), ('리뷰작성함', '리뷰작성함')
    ]) # 상태(요청됨, 진행중, 완료, 취소, 리뷰작성함)
    available_dates = models.CharField(max_length=200, null=True, blank=True) # 가능한 날짜
    purchase_amount = models.IntegerField(default=0) # 구매 금액
    days = models.IntegerField(default=0) # 일수
    created_at = models.DateTimeField(auto_now_add=True) # 생성일
    completed_at = models.DateTimeField(auto_now=True) # 완료일

####################
# ESTIMATE
class ESTIMATE(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    mechanic = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='estimate_mechanic') # 정비공
    order = models.ForeignKey('ORDER', on_delete=models.CASCADE, related_name='estimate_order') # 주문
    days_estimate = models.IntegerField(default=1) # 예상 일수
    price_estimate = models.IntegerField(default=0) # 예상 가격
    message = models.TextField() # 메시지
    created_at = models.DateTimeField(auto_now_add=True) # 생성일

####################
# REVIEW
class REVIEW(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    user = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='review_user') # 사용자
    mechanic = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='review_mechanic') # 정비공
    images = models.ManyToManyField('UPLOAD', related_name='review_images') # 이미지
    rate = models.IntegerField(default=5, choices=[(i, str(i)) for i in range(1, 6)],) # 평점(1, 2, 3, 4, 5)
    message = models.CharField(max_length=200) # 메시지
    created_at = models.DateTimeField(auto_now_add=True) # 생성일



####################
# UPLOAD: 업로드 테이블
class UPLOAD(models.Model):
    #id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    file = models.FileField(upload_to=upload_to) # 파일

####################
# POST: 게시글 테이블
class POST(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    author = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='post_author') # 작성자
    image = models.ForeignKey('UPLOAD', on_delete=models.CASCADE, related_name='post_image', blank=True, null=True) # 이미지
    board = models.CharField(max_length=20, choices=[
        ('이벤트', '이벤트'), ('공지', '공지'), ('문의', '문의')
    ]) # 게시판(이벤트, 공지, 문의)
    title = models.CharField(max_length=100) # 제목
    content = models.TextField() # 내용
    view_count = models.IntegerField(default=0) # 조회수
    created_at = models.DateTimeField(auto_now_add=True) # 생성일

####################
# COMMENT: 게시글 댓글 테이블
class COMMENT(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, related_name='comment_parent', null=True, blank=True) # 부모 댓글
    post = models.ForeignKey('POST', on_delete=models.CASCADE, related_name='comment_post') # 게시글
    author = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='comment_author') # 작성자
    content = models.CharField(max_length=200) # 내용
    created_at = models.DateTimeField(auto_now_add=True) # 생성일

####################
# CHAT: 채팅 테이블
class CHAT(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    sender = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='chat_sender') # 발신자
    receiver = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='chat_receiver') # 수신자
    order = models.ForeignKey('ORDER', on_delete=models.CASCADE, related_name='chat_order') # 주문
    image = models.ForeignKey('UPLOAD', on_delete=models.CASCADE, related_name='chat_image', blank=True, null=True) # 이미지
    is_read = models.BooleanField(default=False) # 읽음 여부
    content = models.CharField(max_length=200) # 내용
    created_at = models.DateTimeField(auto_now_add=True) # 생성일

####################
# NOTIFICATION: 알림 테이블
class NOTIFICATION(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    target = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='notification_target') # 대상
    title = models.CharField(max_length=100) # 제목
    link = models.CharField(max_length=200) # 링크
    content = models.CharField(max_length=200) # 내용
    is_send = models.BooleanField(default=False) # 전송 여부
    created_at = models.DateTimeField(auto_now_add=True) # 생성일

####################
# SERVER_LOG
class SERVER_LOG(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    message = models.TextField() # 메시지
    created_at = models.DateTimeField(auto_now_add=True) # 생성일

####################
# CERT_CODE
class CERT_CODE(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    account = models.ForeignKey('ACCOUNT', on_delete=models.CASCADE, related_name='cert_account') # 계정
    code = models.CharField(max_length=6) # 코드
    created_at = models.DateTimeField(auto_now_add=True) # 생성일
    def save(self, *args, **kwargs):
        self.code = ''.join([str(random.randint(0, 9)) for i in range(6)]) # 6자리 랜덤 코드 생성
        super(CERT_CODE, self).save(*args, **kwargs)

####################
# SERVER_SETTING
class SERVER_SETTING(models.Model):
    # id = models.AutoField(primary_key=True) # 데이터베이스 식별용 아이디
    name = models.CharField(max_length=100) # 이름
    value = models.TextField() # 값
