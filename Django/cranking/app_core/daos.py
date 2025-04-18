import datetime
import math
import random
import re
import string
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, logout, get_user_model
from django.contrib.auth.models import Group
from django.db.models import Q, Count, Case, When, Value, IntegerField
from django.conf import settings
from django.contrib.auth.models import Group
from . import utils
from . import models



####################
# SERVICE
# - def default_contexts(request) => {} # 기본 사용자 정보
# class AccountService: # 계정 테이블
# class CarService: # 차량 테이블
# class QuestionService: # 질문 테이블
# class QuestionTagService: # 질문 태그 테이블
# class OrderService: # 주문 테이블
# class EstimateService: # 견적 테이블
# class ReviewService: # 리뷰 테이블
####################
# class UploadService: # 업로드 테이블
# class PostService: # 게시글 테이블
# class CommentService: # 댓글 테이블
# class ChatService: # 채팅 테이블
# class NotificationService: # 알림 테이블
# class ServerLogService: # 서버 로그 테이블
# class CertCodeService: # 인증 코드 테이블
# class ServerSettingService: # 서버 설정 테이블



# 기본 사용자 정보
def default_contexts(request):
    return {}

####################
# ACCOUNT: 계정 테이블
class AccountService:
    EMAIL_REGEX = '^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$' # 이메일 형식
    PASSWORD_REGEX = '^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$' # 비밀번호 형식
    NICKNAME_REGEX = '^[a-zA-Z0-9가-힣]{2,20}$' # 닉네임 형식
    TEL_REGEX = '^[0-9]{4,20}$' # 연락처 형식
    COORDS_REGEX = '^[0-9]+\.[0-9]+$' # 좌표 형식
    ACCOUNT_TYPE_REGEX = {"사용자", "파트너", "관리자"} # 계정 타입

    @classmethod
    def create_account(cls, account_id, password, nickname, account_type, address, lat, lon, tel, is_push, is_email, mechanic_title=None, image_ids=None): # 계정 생성

        # 데이터 확인 및 중복검사
        if not re.fullmatch(cls.EMAIL_REGEX, account_id): # 이메일 형식
            return {'success': False, 'message': '올바른 이메일 형식이 아닙니다.'}
        if not re.fullmatch(cls.PASSWORD_REGEX, password): # 비밀번호 형식
            return {'success': False, 'message': '올바른 비밀번호 형식이 아닙니다.'}
        if account_type not in cls.ACCOUNT_TYPE_REGEX: # 계정 타입
            return {'success': False, 'message': '올바른 계정 타입이 아닙니다.'}
        if not (len(address) > 1 and len(address) < 200): # 주소 형식
            return {'success': False, 'message': '너무 길거나 짧은 주소입니다.'}
        if not (len(nickname) > 1 and len(nickname) < 100): # 닉네임 형식
            return {'success': False, 'message': '너무 길거나 짧은 닉네임입니다.'}
        if mechanic_title and not (len(mechanic_title) > 1 and len(mechanic_title) < 100): # 정비사 타이틀 형식
            return {'success': False, 'message': '너무 길거나 짧은 정비사 타이틀입니다.'}
        if not re.fullmatch(cls.COORDS_REGEX, str(lat)) or not re.match(cls.COORDS_REGEX, str(lon)):
            return {'success': False, 'message': '올바른 좌표 형식이 아닙니다. 만약 이 메세지를 보신다면 유지보수 담당자에게 문의하세요.'}
        if not re.fullmatch(cls.TEL_REGEX, tel):
            return {'success': False, 'message': '올바른 전화번호 형식이 아닙니다.'}
        exists = models.ACCOUNT.objects.filter(
            Q(username=account_id) | Q(nickname=nickname)
        ).exists()
        if exists:
            return {'success': False, 'message': '닉네임 또는 이메일이 이미 다른 계정에서 사용 중입니다. 다른 닉네임 또는 이메일을 사용해주세요.'}

        # 계정 생성
        account = models.ACCOUNT.objects.create(
            username=account_id,
            first_name=nickname,
            last_name=mechanic_title,
            address=address,
            lat=lat,
            lon=lon,
            tel=tel,
            is_push=is_push,
            is_email=is_email,
        )
        account_group = Group.objects.filter(name=account_type).first()
        if not account_group:
            account_group = Group.objects.create(name=account_type)
        account.groups.add(account_group)
        account.set_password(password)
        if image_ids:
            for image_id in map(str.strip, str(image_ids).split(',')):
                image = models.UPLOAD.objects.filter(id=image_id).first()
                if image:
                    account.images.add(image)
        if account_type == '관리자':
            account.is_staff = True
            account.is_superuser = True
        account.save()

        return {
            'success': True,
            'message': '계정 생성 성공',
            'data': {
                'id': account.id
            }
        }

    @classmethod
    def update_account(cls, account_id, **kwargs): # 계정 수정

        # 데이터 확인
        account = models.ACCOUNT.objects.filter(id=id).first()
        if not account: # 계정 존재 여부
            return {'success': False, 'message': '존재하지 않는 계정입니다.'}
        if 'password' in kwargs and kwargs['password'] and not re.fullmatch(cls.PASSWORD_REGEX, kwargs['password']): # 비밀번호 형식
            return {'success': False, 'message': '올바른 비밀번호 형식이 아닙니다.'}
        if 'nickname' in kwargs and kwargs['nickname']: # 닉네임 중복검사 및 형식
            nickname_exist = models.ACCOUNT.objects.filter(nickname=kwargs['nickname']).first()
            if nickname_exist or not re.fullmatch(cls.NICKNAME_REGEX, kwargs['nickname']):
                return {'success': False, 'message': '이미 존재하는 닉네임이거나 사용할 수 없는 닉네임입니다.'}
        if 'tel' in kwargs and kwargs['tel'] and not re.fullmatch(cls.TEL_REGEX, kwargs['tel']): # 전화번호 형식
            return {'success': False, 'message': '올바른 전화번호 형식이 아닙니다.'}
        if 'address' in kwargs and kwargs['address'] and (len(kwargs['address']) > 200 or len(kwargs['address']) < 1): # 주소 형식
            return {'success': False, 'message': '너무 길거나 짧은 주소입니다.'}
        if 'lat' in kwargs and 'lon' in kwargs and (not re.fullmatch(cls.COORDS_REGEX, str(kwargs['lat'])) or not re.match(cls.COORDS_REGEX, str(kwargs['lon']))): # 좌표 형식
            return {'success': False, 'message': '올바른 좌표 형식이 아닙니다. 만약 이 메세지를 보신다면 유지보수 담당자에게 문의하세요.'}
        if 'mechanic_title' in kwargs and kwargs['mechanic_title'] and (len(kwargs['mechanic_title']) > 150 or len(kwargs['mechanic_title']) < 1):
            return {'success': False, 'message': '너무 길거나 짧은 정비사 타이틀입니다.'}

        # 계정 수정
        for field, value in kwargs.items():
            if value is not None:
                if field == 'password': # 비밀번호 수정
                    account.set_password(value)
                elif field == 'image_ids': # 이미지 수정
                    account.images.clear()
                    for image_id in map(str.strip, str(value).split(',')):
                        image = models.UPLOAD.objects.filter(id=image_id).first()
                        if image:
                            account.images.add(image)
                else: # 그 외 수정
                    setattr(account, field, value)
        account.save()

        return {
            'success': True,
            'message': '계정 수정 성공',
            'data': {
                'id': account.id
            }
        }

    @classmethod
    def select_accounts(cls, page=1, offset=10, order_by='-date_joined', detail=False, **filters): # 계정 목록 검색

        # 쿼리 생성
        query = Q()
        if 'username' in filters and filters['username']:
            query &= Q(username__contains=filters['username'])
        if 'nickname' in filters and filters['nickname']:
            query &= Q(nickname__contains=filters['nickname'])
        if 'account_type' in filters and filters['account_type']:
            query &= Q(groups__name=filters['account_type'])
        if 'business_name' in filters and filters['business_name']:
            query &= Q(business_name__contains=filters['business_name'])
        if 'tel' in filters and filters['tel']:
            query &= Q(tel__contains=filters['tel'])
        if 'is_push' in filters and filters['is_push']:
            query &= Q(is_push=filters['is_push'])
        if 'is_email' in filters and filters['is_email']:
            query &= Q(is_email=filters['is_email'])
        if 'is_active' in filters and filters['is_active']:
            query &= Q(is_active=filters['is_active'])
        if 'account_type' in filters and filters['account_type']:
            query &= Q(groups__name=filters['account_type'])

        # 계정 조회
        actns = models.ACCOUNT.objects.filter(query).order_by(order_by)

        # 페이지네이션
        last_page = math.ceil(actns.count() / offset)
        actns = actns[(page - 1) * offset:page * offset]

        # 계정 정보
        accounts = []
        for actn in actns:
            images = [] # 이미지 정보
            for image in actn.images.all():
                data = UploadService.select_upload(image.id)
                if data['success']:
                    images.append(data['data'])

            accounts.append({
                'id': actn.id,
                'username': actn.username,
                'nickname': actn.first_name,
                'business_name': actn.last_name,
                'account_type': actn.groups.first().name if actn.groups.first() else '사용자',
                'is_active': actn.is_active,
                'is_push': actn.is_push,
                'is_email': actn.is_email,
                'tel': actn.tel,
                'image_ids': str(images[0]['id']) if len(images) > 0 else None, # 이미지 아이디(첫번째 이미지만)
                'images': [images[0]] if len(images) > 0 else [], # 이미지 정보(첫번째 이미지만)
            })
            if detail: # 세부 정보 검색
                accounts[-1].update({
                    'address': actn.address,
                    'lat': actn.lat,
                    'lon': actn.lon,
                    'image_ids': ','.join([str(image['id']) for image in images]), # 이미지 아이디
                    'images': images, # 이미지 정보
                })

        return {
            'success': True,
            'message': '계정 조회 성공',
            'data': {
                'last_page': last_page,
                'accounts': accounts
            }
        }

    @classmethod
    def select_near_mechnics(cls, lat, lon, meter=1000, page=1, offset=10, detail=False): # 가까운 정비사 검색

        # 계정 조회
        meter_to_lat = meter * 0.0000089
        meter_to_lon = meter * 0.0000111
        actns = models.ACCOUNT.objects.filter(
            lat__range=(lat - meter_to_lat, lat + meter_to_lat),
            lon__range=(lon - meter_to_lon, lon + meter_to_lon),
            groups__name='partner',
            is_active=True
        )

        # 페이지네이션
        last_page = math.ceil(actns.count() / offset)
        actns = actns[(page - 1) * offset:page * offset]

        # 계정 정보
        accounts = []
        for actn in actns:
            images = [] # 이미지 정보
            for image in actn.images.all():
                data = UploadService.select_upload(image.id)
                if data['success']:
                    images.append(data['data'])

            accounts.append({
                'id': actn.id,
                'username': actn.username,
                'nickname': actn.first_name,
                'business_name': actn.last_name,
                'account_type': actn.groups.first().name if actn.groups.first() else 'user',
                'lat': actn.lat,
                'lon': actn.lon,
                'distance': utils.get_distance(lat, lon, actn.lat, actn.lon),
                'tel': actn.tel,
                'image_ids': str(images[0]['id']) if len(images) > 0 else None, # 이미지 아이디(첫번째 이미지만)
                'images': [images[0]] if len(images) > 0 else [], # 이미지 정보(첫번째 이미지만)
            })
            if detail: # 세부 정보 검색
                accounts[-1].update({
                    'address': actn.address,
                    'is_push': actn.is_push,
                    'is_email': actn.is_email,
                    'image_ids': ','.join([str(image['id']) for image in images]), # 이미지 아이디
                    'images': images, # 이미지 정보
                })

        return {
            'success': True,
            'message': '계정 조회 성공',
            'last_page': last_page,
            'data': accounts
        }

    @classmethod
    def select_account(cls, detail=False, **filters): # 계정 조회

        # 쿼리 생성
        query = Q()
        if 'id' in filters and filters['id']:
            query &= Q(id=filters['id'])
        if 'username' in filters and filters['username']:
            query &= Q(username=filters['username'])
        if 'nickname' in filters and filters['nickname']:
            query &= Q(nickname=filters['nickname'])

        # 계정 조회
        acnt = models.ACCOUNT.objects.prefetch_related(
            'images'
        ).filter(query).first()
        if not acnt:
            return {'success': False, 'message': '존재하지 않는 계정입니다.'}

        # 계정 정보
        images = [] # 이미지 정보
        for image in acnt.images.all():
            data = UploadService.select_upload(image.id)
            if data['success']:
                images.append(data['data'])

        account = {
            'id': acnt.id,
            'username': acnt.username,
            'nickname': acnt.first_name,
            'business_name': acnt.last_name,
            'account_type': acnt.groups.first().name if acnt.groups.first() else 'user',
            'is_active': acnt.is_active,
            'image_ids': str(images[0]['id']) if len(images) > 0 else None, # 이미지 아이디(첫번째 이미지만)
            'images': [images[0]] if len(images) > 0 else [], # 이미지 정보(첫번째 이미지만)
        }
        if detail: # 세부 정보 검색
            account.update({
                'address': acnt.address,
                'lat': acnt.lat,
                'lon': acnt.lon,
                'tel': acnt.tel,
                'is_push': acnt.is_push,
                'is_email': acnt.is_email,
                'date_joined': utils.format_datetime(acnt.date_joined),
                'last_login': utils.format_datetime(acnt.last_login),
                'image_ids': ','.join([str(image['id']) for image in images]), # 이미지 아이디
                'images': images, # 이미지 정보
            })

        return {
            'success': True,
            'message': '계정 조회 성공',
            'data': account
        }

    @classmethod
    def disable_account(cls, account_id): # 계정 비활성화
        account = models.ACCOUNT.objects.filter(id=id).first()
        if account:
            account.is_active = False
            account.save()
        return {'success': True, 'message': '계정 삭제 성공'}

    @classmethod
    def erase_account(cls, account_id): # 계정 삭제
        account = models.ACCOUNT.objects.filter(id=id).first()
        if account:
            account.delete()
        return {'success': True, 'message': '계정 삭제 성공'}



####################
# CAR: 차량 테이블
class CarService:
    CAR_TYPE_REGEX = {'세단', 'SUV', '쿠페', '해치백', '웨건', '밴', '트럭', '기타'} # 차량 종류 형식
    CAR_SIZE_REGEX = {'경차', '소형(준중형 포함)', '중형(준대형 포함)', '대형', '기타'} # 차량 크기 형식
    FUEL_REGEX = {'전기', 'LPG', '경유', '휘발유', '수소'} # 연료 형식
    TRANSMISSION_REGEX = {'자동', '수동'} # 변속기 형식
    NUMBER_REGEX = '^[0-9가-힣]{1,20}$' # 차량 번호 형식
    ID_NUMBER_REGEX = '^[0-9A-Z-]{1,100}$' # 차대 번호 형식
    MANUFACTURER_REGEX = '^[a-zA-Z0-9가-힣\s]{1,40}$' # 제조사 형식
    YEAR_REGEX = '^[0-9]{1,20}$' # 연식 형식
    CC_REGEX = '^[0-9]{1,20}$' # 배기량 형식
    ENGINE_REGEX = '^[a-zA-Z0-9가-힣\s]{1,20}$' # 엔진 형식
    NAME_REGEX = '^[a-zA-Z0-9가-힣\s]{1,100}$' # 차량명 형식

    @classmethod
    def create_car(cls, user_id, number, id_number, name, car_type, year, cc, engine, fuel, transmission, manufacturer, size, image_ids=None): # 차량 생성

        # 데이터 확인
        user = models.ACCOUNT.objects.filter(id=user_id).first()
        if not user:
            return {'success': False, 'message': '존재하지 않는 사용자입니다.'}
        if car_type not in cls.CAR_TYPE_REGEX:
            return {'success': False, 'message': '차량 종류 형식이 아닙니다.'}
        if size not in cls.CAR_SIZE_REGEX:
            return {'success': False, 'message': '차량 크기 형식이 아닙니다.'}
        if fuel not in cls.FUEL_REGEX:
            return {'success': False, 'message': '연료 형식이 아닙니다.'}
        if transmission not in cls.TRANSMISSION_REGEX:
            return {'success': False, 'message': '변속기 형식이 아닙니다.'}
        if not re.fullmatch(cls.NUMBER_REGEX, number):
            return {'success': False, 'message': '차량 번호 형식이 아닙니다.'}
        if not re.fullmatch(cls.ID_NUMBER_REGEX, id_number):
            return {'success': False, 'message': '차대 번호 형식이 아닙니다.'}
        if not re.fullmatch(cls.NAME_REGEX, name):
            return {'success': False, 'message': '차량명 형식이 아닙니다.'}
        if not re.fullmatch(cls.MANUFACTURER_REGEX, manufacturer):
            return {'success': False, 'message': '제조사 형식이 아닙니다.'}
        if not re.fullmatch(cls.YEAR_REGEX, year):
            return {'success': False, 'message': '연식 형식이 아닙니다.'}
        if not re.fullmatch(cls.CC_REGEX, cc):
            return {'success': False, 'message': '배기량 형식이 아닙니다.'}
        if not re.fullmatch(cls.ENGINE_REGEX, engine):
            return {'success': False, 'message': '엔진 형식이 아닙니다.'}

        # 차량 생성
        car = models.CAR.objects.create(
            user=user,
            number=number,
            identification_number=id_number,
            name=name,
            car_type=car_type,
            year=year,
            cc=cc,
            engine=engine,
            fuel=fuel,
            transmission=transmission,
            manufacturer=manufacturer,
            car_size=size
        )
        if image_ids:
            for image_id in map(str.strip, str(image_ids).split(',')):
                image = models.UPLOAD.objects.filter(id=image_id).first()
                if image:
                    car.images.add(image)

        return {
            'success': True,
            'message': '차량 생성 성공',
            'data': {
                'id': car.id
            }
        }

    @classmethod
    def update_car(cls, account_id, car_id, **kwargs): # 차량 수정

        # 데이터 확인
        car = models.CAR.objects.filter(id=id).first()
        if not car:
            return {'success': False, 'message': '존재하지 않는 차량입니다.'}
        if 'car_type' in kwargs and kwargs['car_type'] and kwargs['car_type'] not in cls.CAR_TYPE_REGEX:
            return {'success': False, 'message': '차량 종류 형식이 아닙니다.'}
        if 'size' in kwargs and kwargs['size'] and kwargs['size'] not in cls.CAR_SIZE_REGEX:
            return {'success': False, 'message': '차량 크기 형식이 아닙니다.'}
        if 'fuel' in kwargs and kwargs['fuel'] and kwargs['fuel'] not in cls.FUEL_REGEX:
            return {'success': False, 'message': '연료 형식이 아닙니다.'}
        if 'transmission' in kwargs and kwargs['transmission'] and kwargs['transmission'] not in cls.TRANSMISSION_REGEX:
            return {'success': False, 'message': '변속기 형식이 아닙니다.'}

        # 차량 수정
        for field, value in kwargs.items():
            if value is not None:
                if field == 'image_ids': # 이미지 수정
                    car.images.clear()
                    for image_id in map(str.strip, str(value).split(',')):
                        image = models.UPLOAD.objects.filter(id=image_id).first()
                        if image:
                            car.images.add(image)
                else:
                    setattr(car, field, value)
        car.save()

        return {
            'success': True,
            'message': '차량 수정 성공',
            'data': {
                'id': car.id
            }
        }

    @classmethod
    def select_account_cars(cls, account_id, detail=False): # 차량 목록 조회

        # 쿼리 생성
        query = Q(user__id=user_id)

        # 차량 조회
        cars = models.CAR.objects.filter(query)

        # 차량 정보
        car_list = []
        for car in cars:
            images = [] # 이미지 정보
            for image in car.images.all():
                data = UploadService.select_upload(image.id)
                if data['success']:
                    images.append(data['data'])

            car_list.append({
                'id': car.id,
                'number': car.number,
                'name': car.name,
                'car_type': car.car_type,
                'year': car.year,
                'size': car.car_size,
                'image_ids': str(images[0]['id']) if len(images) > 0 else None, # 이미지 아이디(첫번째 이미지만)
                'images': [images[0]] if len(images) > 0 else [], # 이미지 정보(첫번째 이미지만)
            })
            if detail: # 세부 정보 검색
                car_list[-1].update({
                    'id_number': car.identification_number,
                    'cc': car.cc,
                    'engine': car.engine,
                    'fuel': car.fuel,
                    'transmission': car.transmission,
                    'manufacturer': car.manufacturer,
                    'image_ids': ','.join([str(image['id']) for image in images]), # 이미지 아이디
                    'images': images, # 이미지 정보
                })

        return {
            'success': True,
            'message': '차량 조회 성공',
            'data': car_list
        }

    @classmethod
    def select_car(cls, car_id, detail=False):

        # 차량 조회
        car = models.CAR.objects.filter(id=id).first()
        if not car:
            return {'success': False, 'message': '존재하지 않는 차량입니다.'}

        # 차량 정보
        images = [] # 이미지 정보
        for image in car.images.all():
            data = UploadService.select_upload(image.id)
            if data['success']:
                images.append(data['data'])

        car_info = {
            'id': car.id,
            'number': car.number,
            'name': car.name,
            'car_type': car.car_type,
            'year': car.year,
            'size': car.car_size,
            'image_ids': str(images[0]['id']) if len(images) > 0 else None, # 이미지 아이디(첫번째 이미지만)
            'images': [images[0]] if len(images) > 0 else [], # 이미지 정보(첫번째 이미지만)
        }
        if detail: # 세부 정보 검색
            car_info.update({
                'id_number': car.identification_number,
                'cc': car.cc,
                'engine': car.engine,
                'fuel': car.fuel,
                'transmission': car.transmission,
                'manufacturer': car.manufacturer,
                'image_ids': ','.join([str(image['id']) for image in images]), # 이미지 아이디
                'images': images, # 이미지 정보
            })

        return {
            'success': True,
            'message': '차량 조회 성공',
            'data': car_info
        }

    @classmethod
    def delete_car(cls, account_id, car_id): # 차량 삭제
        car = models.CAR.objects.filter(id=id).first()
        if car:
            car.delete()
        return {'success': True, 'message': '차량 삭제 성공'}



####################
# QUESTION: 질문 테이블
class QuestionService:
    TITLE_REGEX = '^[a-zA-Z0-9가-힣\s]{1,100}$' # 제목 형식

    @classmethod
    def create_question(cls, account_id, image_id, title, content, related_question_ids=None, parent_question_id=None, tag_ids=None):

        # 데이터 확인
        if parent_question_id:
            parent_question = models.QUESTION.objects.filter(
                id=parent_question_id
            ).first()
            if not parent_question:
                return {
                    'success': False,
                    'message': '존재하지 않는 부모 질문입니다.'
                }
        if not re.fullmatch(cls.TITLE_REGEX, title):
            return {'success': False, 'message': '제목 형식이 아닙니다.'}

        # 질문 생성
        question = models.QUESTION.objects.create(
            title=title,
            content=content
        )
        if parent_question_id:
            question.parent_question = parent_question
        if image_id:
            image = models.UPLOAD.objects.filter(id=image_id).first()
            if image:
                question.image = image
        if tag_ids:
            for tag_id in map(str.strip, str(tag_ids).split(',')):
                tag = models.QUESTION_TAG.objects.filter(id=tag_id).first()
                if tag:
                    question.tags.add(tag)
        if related_question_ids:
            for related_question_id in map(str.strip, str(related_question_ids).split(',')):
                related_question = models.QUESTION.objects.filter(id=related_question_id).first()
                if related_question:
                    question.related_questions.add(related_question)
        question.save()

        return {
            'success': True,
            'message': '질문 생성 성공',
            'data': {
                'id': question.id
            }
        }

    @classmethod
    def update_question(cls, account_id, question_id, **kwargs):

        # 데이터 확인
        question = models.QUESTION.objects.filter(id=question_id).first()
        if not question:
            return {'success': False, 'message': '존재하지 않는 질문입니다.'}
        if 'title' in kwargs and kwargs['title'] and not re.fullmatch(cls.TITLE_REGEX, kwargs['title']):
            return {'success': False, 'message': '제목 형식이 아닙니다.'}

        # 질문 수정
        for field, value in kwargs.items():
            if value is not None:
                if field == 'image_id': # 이미지 수정
                    image = models.UPLOAD.objects.filter(
                        id=value
                    ).first()
                    if image:
                        setattr(question, 'image', image)
                elif field == 'related_question_ids': # 관련 질문 수정
                    question.related_questions.clear()
                    for related_question_id in map(str.strip, str(value).split(',')):
                        related_question = models.QUESTION.objects.filter(id=related_question_id).first()
                        if related_question:
                            question.related_questions.add(related_question)
                elif field == 'tag_ids': # 태그 수정
                    question.tags.clear()
                    for tag_id in map(str.strip, str(value).split(',')):
                        tag = models.QUESTION_TAG.objects.filter(id=tag_id).first()
                        if tag:
                            question.tags.add(tag)
                else:
                    setattr(question, field, value)
        question.save()

        return {
            'success': True,
            'message': '질문 수정 성공',
            'data': {
                'id': question.id
            }
        }

    @classmethod
    def select_question(cls, question_id=None, detail=False):

        # 질문 가져오기
        if question_id:
            question = models.QUESTION.objects.filter(
                id=question_id
            ).first()
            if not question:
                return {
                    'success': False,
                    'message': '존재하지 않는 질문입니다.'
                }
            questions = [question]
        else:
            questions = models.QUESTION.objects.filter(
                parent_question=None
            )

        # 질문 트리 생성. 선택한 노드(또는 최상위 노드)의 자식 노드까지만 생성
        question_tree = []
        for question in questions:
            tags = [] # 태그 정보
            for tag in question.tags.all():
                tag_data = TagService.select_tag(tag.id)
                if tag_data['success']:
                    tags.append(tag_data['data'])

            related_questions = [] # 관련 질문 정보
            for related_question in question.related_questions.all() and detail:
                related_question_data = QuestionService.select_question(related_question.id, detail=False)
                if related_question_data['success']:
                    related_questions.append(related_question_data['data'])

            children = [] # 자식 노드 정보
            for child in models.QUESTION.objects.filter(parent_question=question) and detail:
                children.append(QuestionService.select_question(child.id, detail=False)['data'])

            image = None # 이미지 정보
            if question.image:
                image_data = UploadService.select_upload(question.image.id)
                if image_data['success']:
                    image = image_data['data']

            question_tree.append({
                'id': question.id,
                'tag_ids': ','.join([str(tag['id']) for tag in tags]),
                'tags': tags, # 태그 정보
                'image_id': str(question.image.id) if question.image else None,
                'image': image, # 이미지 정보
                'title': question.title,
            })
            if detail:
                question_tree[-1].update({
                    'content': question.content,
                    'related_question_ids': ','.join([str(related_question.id) for related_question in question.related_questions.all()]),
                    'related_questions': related_questions, # 관련 질문 정보
                    'children_ids': ','.join([str(child['id']) for child in children]),
                    'children': children # 자식 노드 정보(재귀적으로 자식 노드 조회)
                })

        return {
            'success': True,
            'message': '질문 트리 생성 성공',
            'data': question_tree
        }

    @classmethod
    def delete_question(cls, question_id, account_id):

        # 데이터 확인
        question = models.QUESTION.objects.filter(id=question_id).first()
        if not question:
            return {'success': False, 'message': '존재하지 않는 질문입니다.'}

        # 질문 삭제
        question.delete()

        return {'success': True, 'message': '질문 삭제 성공'}



####################
# QUESTION_TAG: 질문 태그 테이블
class TagService:
    NAME_REGEX = '^[a-zA-Z0-9가-힣\s]{1,100}$' # 이름 형식

    @classmethod
    def create_tag(cls, name, account_id):

        # 데이터 확인
        if not re.fullmatch(cls.NAME_REGEX, name):
            return {'success': False, 'message': '이름 형식이 아닙니다.'}

        # 태그 생성
        tag = models.QUESTION_TAG.objects.create(name=name)

        return {
            'success': True,
            'message': '태그 생성 성공',
            'data': {
                'id': tag.id
            }
        }

    @classmethod
    def update_tag(cls, account_id, tag_id, **kwargs):

        # 데이터 확인
        tag = models.QUESTION_TAG.objects.filter(id=tag_id).first()
        if not tag:
            return {'success': False, 'message': '존재하지 않는 태그입니다.'}
        if not re.fullmatch(cls.NAME_REGEX, name):
            return {'success': False, 'message': '이름 형식이 아닙니다.'}

        # 태그 수정
        tag.name = name
        tag.save()

        return {
            'success': True,
            'message': '태그 수정 성공',
            'data': {
                'id': tag.id
            }
        }

    @classmethod
    def select_tag(cls, tag_id):

        # 데이터 확인
        tag = models.QUESTION_TAG.objects.filter(id=tag_id).first()
        if not tag:
            return {'success': False, 'message': '존재하지 않는 태그입니다.'}

        return {
            'success': True,
            'message': '태그 조회 성공',
            'data': {
                'id': tag.id,
                'name': tag.name
            }
        }

    @classmethod
    def delete_tag(cls, tag_id, account_id):

        # 데이터 확인
        tag = models.QUESTION_TAG.objects.filter(id=tag_id).first()
        if not tag:
            return {'success': False, 'message': '존재하지 않는 태그입니다.'}

        # 태그 삭제
        tag.delete()

        return {'success': True, 'message': '태그 삭제 성공'}



####################
# ORDER: 주문 테이블
class OrderService:
    ADDRESS_REGEX = '^[a-zA-Z0-9가-힣\s]{1,200}$' # 주소 형식
    STATUS_REGEX = ['요청됨', '진행중', '완료', '취소', '리뷰작성함'] # 상태 형식
    DATE_REGEX = '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' # 날짜 형식(YYYY-MM-DD)
    COORDINATE_REGEX = '^[0-9]{1,3}\.[0-9]{6}$' # 좌표 형식(DDD.DDDDDD)

    @classmethod
    def create_order(cls, user_id, message, address, lat, lon, available_dates, image_ids=None, question_ids=None):

        # 데이터 확인
        user = models.ACCOUNT.objects.filter(id=user_id).first()
        if not user:
            return {'success': False, 'message': '존재하지 않는 사용자입니다.'}
        mechanic = models.ACCOUNT.objects.filter(id=mechanic_id).first()
        if not mechanic:
            return {'success': False, 'message': '존재하지 않는 정비사입니다.'}
        if not re.fullmatch(cls.ADDRESS_REGEX, address):
            return {'success': False, 'message': '주소 형식이 아닙니다.'}
        for date in str(available_dates).split(','):
            if not re.fullmatch(cls.DATE_REGEX, date):
                return {'success': False, 'message': '날짜 형식이 아닙니다.'}
        if not re.fullmatch(cls.COORDINATE_REGEX, lat) or not re.fullmatch(cls.COORDINATE_REGEX, lon):
            return {'success': False, 'message': '좌표 형식이 아닙니다.'}

        # 주문 생성
        order = models.ORDER.objects.create(
            user=user,
            mechanic=mechanic,
            message=message,
            address=address,
            available_dates=available_dates,
            purchase_amount=purchase_amount,
            days=days,
            lat=lat,
            lon=lon
        )
        if image_ids:
            for image_id in map(str.strip, str(image_ids).split(',')):
                image = models.UPLOAD.objects.filter(id=image_id).first()
                if image:
                    order.images.add(image)
        if question_ids:
            for question_id in map(str.strip, str(question_ids).split(',')):
                question = models.QUESTION.objects.filter(id=question_id).first()
                if question:
                    order.questions.add(question)
        order.save()

        return {
            'success': True,
            'message': '주문 생성 성공',
            'data': {
                'id': order.id
            }
        }

    @classmethod
    def update_order(cls, account_id, order_id, **kwargs): # 주문 수정

        # 데이터 확인
        order = models.ORDER.objects.filter(id=order_id).first()
        if not order:
            return {'success': False, 'message': '존재하지 않는 주문입니다.'}

        # 주문 수정
        if status:
            order.status = status
        if message:
            order.message = message
        order.save()

        return {
            'success': True,
            'message': '주문 수정 성공',
            'data': {
                'id': order.id
            }
        }

    @classmethod
    def select_orders(cls, page=1, offset=10, detail=False, **filters):
        # 쿼리 생성
        query = Q()
        if user_id:
            query &= Q(user__id=user_id)
        if mechanic_id:
            query &= Q(mechanic__id=mechanic_id)
        if status:
            query &= Q(status=status)

        # 주문 조회
        orders = models.ORDER.objects.filter(query).order_by('-created_at')

        # 페이지네이션
        last_page = math.ceil(orders.count() / offset)
        orders = orders[(page - 1) * offset:page * offset]

        # 주문 정보
        order_list = []
        for order in orders:
            images = [] # 이미지 정보
            for image in order.images.all():
                image_data = UploadService.select_upload(image.id)
                if image_data['success']:
                    images.append(image_data['data'])

            questions = [] # 질문 정보
            for question in order.questions.all():
                question_data = QuestionService.select_question(question.id, detail=False)
                if question_data['success']:
                    questions.append(question_data['data'])

            user_data = AccountService.select_account(id=order.user.id, detail=False) # 사용자 정보
            if not user_data['success']:
                order.delete()
                continue
            user = user_data['data']

            order_list.append({
                'id': order.id,
                'user': user, # 사용자 정보
                'status': order.status,
                'address': order.address,
                'lat': order.lat,
                'lon': order.lon,
                'distance': utils.calculate_distance(lat, lon, order.lat, order.lon),
                'available_dates': order.available_dates,
                'image_ids': ','.join([str(image['id']) for image in images]),
                'images': images, # 이미지 정보
                'question_ids': ','.join([str(question['id']) for question in questions]),
                'questions': questions, # 질문 정보
                'created_at': utils.format_datetime(order.created_at)
            })

        return {
            'success': True,
            'message': '주문 조회 성공',
            'last_page': last_page,
            'data': order_list
        }

    @classmethod
    def select_order(cls, order_id, lat=None, lon=None):

        # 주문 조회
        order = models.ORDER.objects.filter(id=order_id).first()
        if not order:
            return {'success': False, 'message': '존재하지 않는 주문입니다.'}

        # 주문 정보
        images = [] # 이미지 정보
        for image in order.images.all():
            image_data = UploadService.select_upload(image.id)
            if image_data['success']:
                images.append(image_data['data'])

        questions = [] # 질문 정보
        for question in order.questions.all():
            question_data = QuestionService.select_question(question.id, detail=False)
            if question_data['success']:
                questions.append(question_data['data'])

        user_data = AccountService.select_account(id=order.user.id, detail=False) # 사용자 정보
        if not user_data['success']:
            order.delete()
            return {'success': False, 'message': '존재하지 않는 사용자입니다.'}
        user = user_data['data']

        mechanic_data = AccountService.select_account(id=order.mechanic.id, detail=False) # 정비사 정보
        if not mechanic_data['success']:
            mechanic = None
        else:
            mechanic = mechanic_data['data']

        order_info = {
            'id': order.id,
            'user': user, # 사용자 정보
            'mechanic': mechanic, # 정비사 정보
            'status': order.status,
            'message': order.message,
            'address': order.address,
            'lat': order.lat,
            'lon': order.lon,
            'distance': utils.calculate_distance(lat, lon, order.lat, order.lon),
            'available_dates': order.available_dates,
            'purchase_amount': order.purchase_amount,
            'days': order.days,
            'created_at': utils.format_datetime(order.created_at),
            'image_ids': ','.join([str(image['id']) for image in images]),
            'images': images, # 이미지 정보
            'question_ids': ','.join([str(question['id']) for question in questions]),
            'questions': questions, # 질문 정보
        }

        return {
            'success': True,
            'message': '주문 조회 성공',
            'data': order_info
        }



####################
# ESTIMATE: 견적 테이블
class EstimateService:

    @classmethod
    def create_estimate(cls, mechanic_id, order_id, days_estimate, price_estimate, message):

        # 데이터 확인
        mechanic = models.ACCOUNT.objects.filter( # 정비사 확인
            id=mechanic_id
        ).first()
        if not mechanic:
            return {
                'success': False,
                'message': '존재하지 않는 정비사입니다.'
            }
        order = models.ORDER.objects.filter( # 주문 확인
            id=order_id
        ).first()
        if not order:
            return {
                'success': False,
                'message': '존재하지 않는 주문입니다.'
            }

        # 견적 생성
        estimate = models.ESTIMATE.objects.create(
            mechanic=mechanic,
            order=order,
            days_estimate=days_estimate,
            price_estimate=price_estimate,
            message=message
        )

        return {
            'success': True,
            'message': '견적 생성 성공',
            'data': {
                'id': estimate.id
            }
        }

    @classmethod
    def update_estimate(cls, account_id, estimate_id, **kwargs):

        # 데이터 확인
        estimate = models.ESTIMATE.objects.filter(
            id=estimate_id
        ).first()
        if not estimate:
            return {'success': False, 'message': '존재하지 않는 견적입니다.'}

        # 견적 수정
        if days_estimate:
            estimate.days_estimate = days_estimate
        if price_estimate:
            estimate.price_estimate = price_estimate
        if message:
            estimate.message = message
        estimate.save()

        return {
            'success': True,
            'message': '견적 수정 성공',
            'data': {
                'id': estimate.id
            }
        }

    @classmethod
    def select_estimate(cls, estimate_id, detail=False):

        # 견적 조회
        estimate = models.ESTIMATE.objects.filter(
            id=estimate_id
        ).first()
        if not estimate:
            return {'success': False, 'message': '존재하지 않는 견적입니다.'}

        # 견적 정보
        estimate_info = {
            'id': estimate.id,
            'mechanic_id': estimate.mechanic.id,
            'order_id': estimate.order.id,
            'days_estimate': estimate.days_estimate,
            'price_estimate': estimate.price_estimate,
            'message': estimate.message
        }

        return {
            'success': True,
            'message': '견적 조회 성공',
            'data': estimate_info
        }

    @classmethod
    def select_estimates(cls, page=1, offset=10, detail=False, **filters):

        # 쿼리 생성
        query = Q()
        if mechanic_id:
            query &= Q(mechanic__id=mechanic_id)
        if order_id:
            query &= Q(order__id=order_id)
        if status:
            query &= Q(status=status)

        # 견적 조회
        estimates = models.ESTIMATE.objects.filter(query)
        estimate_list = []
        for estimate in estimates:
            estimate_list.append({
                'id': estimate.id,
                'mechanic_id': estimate.mechanic.id,
                'order_id': estimate.order.id,
                'days_estimate': estimate.days_estimate,
                'price_estimate': estimate.price_estimate,
                'message': estimate.message
            })

        return {
            'success': True,
            'message': '견적 조회 성공',
            'data': estimate_list
        }

    @classmethod
    def delete_estimate(cls, account_id, estimate_id):

        # 데이터 확인
        estimate = models.ESTIMATE.objects.filter(
            id=estimate_id
        ).first()
        if not estimate:
            return {'success': False, 'message': '존재하지 않는 견적입니다.'}

        # 견적 삭제
        estimate.delete()

        return {'success': True, 'message': '견적 삭제 성공'}



####################
# REVIEW: 리뷰 테이블
class ReviewService:
    RATE_REGEX = '^[0-5]$' # 평점 형식

    @classmethod
    def create_review(cls, user_id, mechanic_id, rate, message, image_ids=None):

        # 데이터 확인
        user = models.ACCOUNT.objects.filter( # 사용자 확인
            id=user_id
        ).first()
        if not user:
            return {
                'success': False,
                'message': '존재하지 않는 사용자입니다.'
            }
        mechanic = models.ACCOUNT.objects.filter( # 정비사 확인
            id=mechanic_id
        ).first()
        if not mechanic:
            return {
                'success': False,
                'message': '존재하지 않는 정비사입니다.'
            }
        if not re.fullmatch(cls.RATE_REGEX, rate):
            return {'success': False, 'message': '평점 형식이 아닙니다.'}
        if not (len(message) >= 1 and len(message) <= 200):
            return {'success': False, 'message': '메시지 형식이 아닙니다.'}

        # 리뷰 생성
        review = models.REVIEW.objects.create(
            user=user,
            mechanic=mechanic,
            rate=rate,
            message=message
        )
        if image_ids:
            for image_id in map(str.strip, str(image_ids).split(',')):
                image = models.UPLOAD.objects.filter(id=image_id).first()
                if image:
                    review.images.add(image)
        review.save()

        return {
            'success': True,
            'message': '리뷰 생성 성공',
            'data': {
                'id': review.id
            }
        }

    @classmethod
    def update_review(cls, account_id, review_id, **kwargs):

        # 데이터 확인
        review = models.REVIEW.objects.filter(
            id=review_id
        ).first()
        if not review:
            return {'success': False, 'message': '존재하지 않는 리뷰입니다.'}

        # 리뷰 수정
        if rate:
            review.rate = rate
        if message:
            review.message = message
        review.save()

        return {
            'success': True,
            'message': '리뷰 수정 성공',
            'data': {
                'id': review.id
            }
        }

    @classmethod
    def select_reviews(cls, user_id=None, mechanic_id=None, detail=False):

        # 쿼리 생성
        query = Q()
        if user_id:
            query &= Q(user__id=user_id)
        if mechanic_id:
            query &= Q(mechanic__id=mechanic_id)

        # 리뷰 조회
        reviews = models.REVIEW.objects.filter(query)
        review_list = []
        for review in reviews:
            images = [] # 이미지 정보
            for image in review.images.all():
                image_data = UploadService.select_upload(image.id)
                if image_data['success']:
                    images.append(image_data['data'])

            review_list.append({
                'id': review.id,
                'user_id': review.user.id,
                'mechanic_id': review.mechanic.id,
                'rate': review.rate,
                'message': review.message,
                'image_ids': ','.join([str(image['id']) for image in images]),
                'images': images # 이미지 정보
            })

        return {
            'success': True,
            'message': '리뷰 조회 성공',
            'data': review_list
        }

    @classmethod
    def select_review(cls, review_id=None, order_id=None, detail=False):

        # 리뷰 조회
        review = models.REVIEW.objects.filter(
            id=review_id
        ).first()
        if not review:
            return {'success': False, 'message': '존재하지 않는 리뷰입니다.'}

        # 리뷰 정보
        images = []
        for image in review.images.all():
            image_data = UploadService.select_upload(image.id)
            if image_data['success']:
                images.append(image_data['data'])

        review_info = {
            'id': review.id,
            'user_id': review.user.id,
            'mechanic_id': review.mechanic.id,
            'rate': review.rate,
            'message': review.message,
            'image_ids': ','.join([str(image['id']) for image in images]),
            'images': images # 이미지 정보
        }

        return {
            'success': True,
            'message': '리뷰 조회 성공',
            'data': review_info
        }

    @classmethod
    def delete_review(cls, review_id, account_id):

        # 데이터 확인
        review = models.REVIEW.objects.filter(
            id=review_id
        ).first()
        if not review:
            return {'success': False, 'message': '존재하지 않는 리뷰입니다.'}

        # 리뷰 삭제
        review.delete()

        return {'success': True, 'message': '리뷰 삭제 성공'}



####################
# UPLOAD: 업로드 테이블
class UploadService:

    @classmethod
    def create_upload(cls, file):
        file = models.UPLOAD.objects.create(file=utils.resize_image(file))
        return {
            'success': True,
            'message': '업로드 성공',
            'data': {
                'id': file.id,
                'path': utils.prefix_upload_path(file.file)
            }
        }

    @classmethod
    def select_upload(cls, id):
        upload = models.UPLOAD.objects.filter(id=id).first()
        if not upload:
            return {
                'success': False,
                'message': '업로드된 파일을 찾을 수 없습니다.'
            }
        return {
            'success': True,
            'message': '업로드 조회 성공',
            'data': {
                'id': upload.id,
                'path': utils.prefix_upload_path(upload.file)
            }
        }

    @classmethod
    def delete_upload(cls, id):
        upload = models.UPLOAD.objects.filter(id=id).first()
        if upload:
            upload.delete()
        return {
            'success': True,
            'message': '업로드 삭제 성공'
        }



####################
# CHAT: 채팅 테이블
class ChatService:

    @classmethod
    def create_chat(cls, sender_id, content, receiver_id, order=None, image_id=None):

        # 데이터 확인
        sender = models.ACCOUNT.objects.filter(
            id=sender_id
        ).first()
        if not sender:
            return {
                'success': False,
                'message': '존재하지 않는 보낸이입니다.'
            }
        receiver = models.ACCOUNT.objects.filter(
            id=receiver_id
        ).first()
        if not receiver:
            return {
                'success': False,
                'message': '존재하지 않는 받는이입니다.'
            }
        image = models.UPLOAD.objects.filter(
            id=image_id
        ).first()
        if not image:
            return {
                'success': False,
                'message': '존재하지 않는 이미지입니다.'
            }

        # 채팅 생성
        chat = models.CHAT.objects.create(
            sender=sender,
            receiver=receiver,
            image=image,
            content=content
        )

        return {
            'success': True,
            'message': '채팅 생성 성공',
            'id': chat.id
        }

    @classmethod
    def select_chats(cls, sender_id=None, receiver_id=None):

        # 쿼리 생성
        query = Q()
        if sender_id:
            query &= Q(sender__id=sender_id)
        if receiver_id:
            query &= Q(receiver__id=receiver_id)

        # 채팅 조회
        chats = models.CHAT.objects.filter(
            query
        )
        chat_list = []
        for chat in chats:
            chat_list.append({
                'id': chat.id,
                'sender_id': chat.sender.id,
                'receiver_id': chat.receiver.id,
                'image_id': chat.image.id,
                'content': chat.content
            })

        return {
            'success': True,
            'message': '채팅 조회 성공',
            'chats': chat_list
        }

    @classmethod
    def select_unread_chat(cls, sender_id=None, receiver_id=None):

        # 쿼리 생성
        query = Q()
        query &= Q(is_read=False)
        if sender_id:
            query &= Q(sender__id=sender_id)
        if receiver_id:
            query &= Q(receiver__id=receiver_id)

        # 채팅 조회
        chats = models.CHAT.objects.filter(
            query
        )
        chat_list = []
        for chat in chats:
            chat_list.append({
                'id': chat.id,
                'sender_id': chat.sender.id,
                'receiver_id': chat.receiver.id,
                'image_id': chat.image.id,
                'content': chat.content
            })

        return {
            'success': True,
            'message': '읽지 않은 채팅 조회 성공',
            'chats': chat_list
        }

    @classmethod
    def update_chat(cls, chat_id, is_read):

        # 데이터 확인
        chat = models.CHAT.objects.filter(
            id=id
        ).first()
        if not chat:
            return {
                'success': False,
                'message': '존재하지 않는 채팅입니다.'
            }

        # 채팅 수정
        chat.is_read = is_read
        chat.save()

        return {
            'success': True,
            'message': '채팅 수정 성공',
            'id': chat.id
        }



####################
# POST: 게시글 테이블
class PostService:
    BOARD_REGEX = ['공지', '이벤트', '문의'] # 게시판 형식

    @classmethod
    def create_post(cls, author_id, board, title, content, image_id=None):

        # 데이터 확인
        if board not in cls.BOARD_REGEX:
            return {'success': False, 'message': '게시판 형식이 아닙니다.'}
        if not (len(title) >= 1 and len(title) <= 100):
            return {'success': False, 'message': '제목 형식이 아닙니다.'}
        author = models.ACCOUNT.objects.filter(id=author_id).first()
        if not author:
            return {'success': False, 'message': '존재하지 않는 사용자입니다.'}

        # 게시글 생성
        post = models.POST.objects.create(
            author=author,
            board=board,
            title=title,
            content=content
        )
        if image_id:
            image = models.UPLOAD.objects.filter(
                id=image_id
            ).first()
            if image:
                post.image = image
        post.save()

        return {
            'success': True,
            'message': '게시글 생성 성공',
            'data': {
                'id': post.id
            }
        }

    @classmethod
    def update_post(cls, post_id, author_id, **kwargs):

        # 데이터 확인
        post = models.POST.objects.filter(id=post_id).first()
        if not post:
            return {'success': False, 'message': '존재하지 않는 게시글입니다.'}
        author = models.ACCOUNT.objects.filter(id=author_id).first()
        if not author:
            return {'success': False, 'message': '존재하지 않는 사용자입니다.'}
        if post.author != author and author.groups.first().name != 'admin':
            return {'success': False, 'message': '게시글 작성자가 아닙니다.'}
        if 'title' in kwargs and kwargs['title'] and not (len(kwargs['title']) >= 1 and len(kwargs['title']) <= 100):
            return {'success': False, 'message': '제목 형식이 아닙니다.'}

        # 게시글 수정
        for field, value in kwargs.items():
            if value is not None:
                if field == 'image_id': # 이미지 수정
                    image = models.UPLOAD.objects.filter(id=value).first()
                    if image:
                        post.image = image
                else:
                    setattr(post, field, value)
        post.save()

        return {
            'success': True,
            'message': '게시글 수정 성공',
            'data': {
                'id': post.id
            }
        }

    @classmethod
    def select_posts(cls, offset=10, page=1, detail=False, **filters):

        # 쿼리 생성
        query = Q()
        if 'board' in filters and filters['board']:
            query &= Q(board=filters['board'])
        if 'author_id' in filters and filters['author_id']:
            query &= Q(author__id=filters['author_id'])
        if 'title' in filters and filters['title']:
            query &= Q(title__contains=filters['title'])

        # 게시글 조회
        posts = models.POST.objects.filter(query).order_by('-created_at')

        # 페이지네이션
        last_page = math.ceil(posts.count() / offset)
        posts = posts[(page - 1) * offset:page * offset]

        # 게시글 정보
        post_list = []
        for post in posts:
            author_data = AccountService.select_account(id=post.author.id, detail=False) # 작성자 정보
            if not author_data['success']:
                post.delete()
                continue
            author = author_data['data']

            image = None # 이미지 정보
            if post.image:
                image_data = UploadService.select_upload(post.image.id)
                if image_data['success']:
                    image = image_data['data']

            post_list.append({
                'id': post.id,
                'author_id': str(post.author.id),
                'author': author, # 작성자 정보
                'image_id': str(image.id) if image else None, # 이미지 아이디
                'image': image, # 이미지 정보
                'title': post.title,
                'view_count': post.view_count,
                'created_at': utils.format_datetime(post.created_at)
            })
            if detail:
                post_list[-1].update({
                    'board': post.board,
                })

        return {
            'success': True,
            'message': '게시글 조회 성공',
            'last_page': last_page,
            'data': post_list
        }

    @classmethod
    def select_post(cls, post_id):

        # 게시글 조회
        post = models.POST.objects.filter(id=post_id).first()
        if not post:
            return {'success': False, 'message': '존재하지 않는 게시글입니다.'}

        # 게시글 정보
        author_data = AccountService.select_account(id=post.author.id, detail=False) # 작성자 정보
        if not author_data['success']:
            post.delete()
            return {'success': False, 'message': '존재하지 않는 사용자입니다.'}
        author = author_data['data']

        image = None # 이미지 정보
        if post.image:
            image_data = UploadService.select_upload(post.image.id)
            if image_data['success']:
                image = image_data['data']

        post_info = {
            'id': post.id,
            'author_id': str(post.author.id),
            'author': author, # 작성자 정보
            'image_id': str(image.id) if image else None, # 이미지 아이디
            'image': image, # 이미지 정보
            'board': post.board,
            'title': post.title,
            'content': post.content,
            'view_count': post.view_count,
            'created_at': utils.format_datetime(post.created_at)
        }

        return {
            'success': True,
            'message': '게시글 조회 성공',
            'data': post_info
        }

    @classmethod
    def delete_post(cls, post_id, author_id):

        # 데이터 확인
        post = models.POST.objects.filter(id=post_id).first()
        if not post:
            return {'success': False, 'message': '존재하지 않는 게시글입니다.'}
        author = models.ACCOUNT.objects.filter(id=author_id).first()
        if not author:
            return {'success': False, 'message': '존재하지 않는 사용자입니다.'}
        if post.author != author and author.groups.first().name != 'admin':
            return {'success': False, 'message': '게시글 작성자가 아닙니다.'}

        # 게시글 삭제
        post.delete()

        return {'success': True, 'message': '게시글 삭제 성공'}



####################
# COMMENT: 게시글 댓글 테이블
class CommentService:

    @classmethod
    def create_comment(cls, post_id, author_id, content, parent_comment_id=None):

        # 데이터 확인
        post = models.POST.objects.filter(id=post_id).first()
        if not post:
            return {'success': False, 'message': '존재하지 않는 게시글입니다.'}
        author = models.ACCOUNT.objects.filter(id=author_id).first()
        if not author:
            return {'success': False, 'message': '존재하지 않는 사용자입니다.'}
        if not (len(content) >= 1 and len(content) <= 200):
            return {'success': False, 'message': '댓글 내용이 너무 길거나 짧습니다.'}

        # 댓글 생성
        comment = models.COMMENT.objects.create(
            post=post,
            author=author,
            content=content
        )
        if parent_comment_id:
            parent_comment = models.COMMENT.objects.filter(id=parent_comment_id).first()
            if parent_comment:
                comment.parent_comment = parent_comment
        comment.save()

        return {
            'success': True,
            'message': '댓글 생성 성공',
            'data': {
                'id': comment.id
            }
        }

    @classmethod
    def update_comment(cls, comment_id, author_id, **kwargs):

        # 데이터 확인
        comment = models.COMMENT.objects.filter(id=comment_id).first()
        if not comment:
            return {'success': False, 'message': '존재하지 않는 댓글입니다.'}
        author = models.ACCOUNT.objects.filter(id=author_id).first()
        if not author:
            return {'success': False, 'message': '존재하지 않는 사용자입니다.'}
        if comment.author != author and author.groups.first().name != 'admin':
            return {'success': False, 'message': '댓글 작성자가 아닙니다.'}
        if not (len(content) >= 1 and len(content) <= 200):
            return {'success': False, 'message': '댓글 내용이 너무 길거나 짧습니다.'}

        # 댓글 수정
        comment.content = content
        comment.save()

        return {
            'success': True,
            'message': '댓글 수정 성공',
            'data': {
                'id': comment.id
            }
        }

    @classmethod
    def select_comments(cls, post_id):

        # 데이터 확인
        post = models.POST.objects.filter(id=post_id).first()
        if not post:
            return {'success': False, 'message': '존재하지 않는 게시글입니다.'}

        # 댓글 조회
        comments = models.COMMENT.objects.filter(post=post)

        # 댓글 정보
        comment_list = []
        for comment in comments:
            children = []
            children_comments = models.COMMENT.objects.filter(parent_comment=comment)
            for child in children_comments:
                author_data = AccountService.select_account(id=child.author.id, detail=False) # 작성자 정보
                if not author_data['success']:
                    child.delete()
                    continue
                author = author_data['data']

                children.append({
                    'id': child.id,
                    'author_id': str(child.author.id),
                    'author': author, # 작성자 정보
                    'content': child.content,
                    'created_at': utils.format_datetime(child.created_at)
                })

            author_data = AccountService.select_account(id=comment.author.id, detail=False) # 작성자 정보
            if not author_data['success']:
                for child in children:
                    CommentService.delete_comment(child['id'])
                comment.delete()
                continue
            author = author_data['data']

            comment_list.append({
                'id': comment.id,
                'author_id': str(comment.author.id),
                'author': author, # 작성자 정보
                'content': comment.content,
                'created_at': utils.format_datetime(comment.created_at),
                'children': children
            })

        return {
            'success': True,
            'message': '댓글 조회 성공',
            'data': comment_list
        }

    @classmethod
    def delete_comment(cls, comment_id, author_id):

        # 데이터 확인
        comment = models.COMMENT.objects.filter(id=comment_id).first()
        if not comment:
            return {'success': False, 'message': '존재하지 않는 댓글입니다.'}
        author = models.ACCOUNT.objects.filter(id=author_id).first()
        if not author:
            return {'success': False, 'message': '존재하지 않는 사용자입니다.'}
        if comment.author != author and author.groups.first().name != 'admin':
            return {'success': False, 'message': '댓글 작성자가 아닙니다.'}

        # 댓글 삭제
        comment.delete()

        return {
            'success': True,
            'message': '댓글 삭제 성공'
        }




####################
# NOTIFICATION: 알림 테이블
class NotificationService:

    @classmethod
    def create_notification(cls, account_id, title, content, target_ids, link=None):
        if not (len(title) >= 1 and len(title) <= 100):
            return {'success': False, 'message': '너무 길거나 짧은 제목입니다.'}
        if not (len(content) >= 1 and len(content) <= 200):
            return {'success': False, 'message': '너무 길거나 짧은 내용입니다.'}

        send_count = 0
        for target_id in str(target_ids).split(','):
            target = models.ACCOUNT.objects.filter(id=target_id).first()
            if target:
                send_count += 1
                models.NOTIFICATION.objects.create(
                    target=target,
                    title=title,
                    link=link,
                    content=content
                )
        return {
            'success': True,
            'message': '알림 생성 성공',
            'send_count': send_count
        }

    @classmethod
    def select_notifications(cls, target_id=None, is_send=None):
        query = Q()
        if target_id:
            query &= Q(target__id=target_id)
        if is_send:
            query &= Q(is_send=is_send)
        notifications = models.NOTIFICATION.objects.filter(query).order_by('-created_at')
        notification_list = []
        for notification in notifications:
            notification_list.append({
                'id': notification.id,
                'target_id': notification.target.id,
                'title': notification.title,
                'link': notification.link,
                'content': notification.content,
                'is_send': notification.is_send
            })
        return {
            'success': True,
            'message': '알림 조회 성공',
            'notifications': notification_list
        }

    @classmethod
    def update_notification(cls, notification_id, is_send):
        notification = models.NOTIFICATION.objects.filter(id=id).first()
        if not notification:
            return {
                'success': False,
                'message': '존재하지 않는 알림입니다.'
            }
        notification.is_send = is_send
        notification.save()
        return {
            'success': True,
            'message': '알림 수정 성공',
            'id': notification.id
        }

    @classmethod
    def delete_read_notifications(cls, target_id):
        notification = models.NOTIFICATION.objects.filter(id=id).first()
        if notification:
            notification.delete()
        return {
            'success': True,
            'message': '알림 삭제 성공'
        }



####################
# SERVER_LOG: 서버 로그 테이블
class ServerLogService:

    @classmethod
    def create_server_log(cls, message):
        server_log = models.SERVER_LOG.objects.create(message=message)
        return {
            'success': True,
            'message': '서버 로그 생성 성공',
            'id': server_log.id
        }

    @classmethod
    def select_server_logs(cls, days=None):
        query = Q()
        if days:
            query &= Q(created_at__gte=datetime.datetime.now() - datetime.timedelta(days=days))
        server_logs = models.SERVER_LOG.objects.filter(query).order_by('-created_at')
        server_log_list = []
        for server_log in server_logs:
            server_log_list.append({
                'id': server_log.id,
                'message': server_log.message,
                'created_at': datetime.datetime.strftime(server_log.created_at, '%Y-%m-%d %H:%M:%S')
            })
        return {
            'success': True,
            'message': '서버 로그 조회 성공',
            'server_logs': server_log_list
        }



####################
# CERT_CODE: 인증 코드 테이블
class CertCodeService:

    @classmethod
    def create_cert_code(cls, account_id):
        account = models.ACCOUNT.objects.filter(id=account_id).first()
        if not account:
            return {
                'success': False,
                'message': '존재하지 않는 계정입니다.'
            }
        cert_code = models.CERT_CODE.objects.create(account=account)
        return {
            'success': True,
            'message': '인증 코드 생성 성공',
            'id': cert_code.id,
            'code': cert_code.code
        }

    @classmethod
    def select_cert_code(cls, account_id, code):
        cert_code = models.CERT_CODE.objects.select_related('account').filter(
            account__id=account_id,
            code=code
        ).first()
        if not cert_code:
            return {
                'success': False,
                'message': '존재하지 않는 인증 코드입니다.'
            }
        return {
            'success': True,
            'message': '인증 코드 조회 성공',
            'cert_code': {
                'id': cert_code.id,
                'account': {
                    'id': cert_code.account.id,
                    'username': cert_code.account.username
                },
                'code': cert_code.code
            }
        }

    @classmethod
    def delete_account_cert_code(cls, account_id):

        # 인증 코드 삭제
        models.CERT_CODE.objects.filter(
            account__id=account_id,
            code=code
        ).delete()

        return {
            'success': True,
            'message': '인증 코드 삭제 성공'
        }



####################
# SERVER_SETTING: 서버 설정 테이블
class ServerSettingService:

    @classmethod
    def create_server_setting(cls, name, value):
        server_setting = models.SERVER_SETTING.objects.create(name=name, value=value)
        return {
            'success': True,
            'message': '서버 설정 생성 성공',
            'name': server_setting.name
        }

    @classmethod
    def select_server_setting(cls, name):
        server_setting = models.SERVER_SETTING.objects.filter(name=name).first()
        if not server_setting:
            return {
                'success': False,
                'message': '존재하지 않는 서버 설정입니다.'
            }
        return {
            'success': True,
            'message': '서버 설정 조회 성공',
            'server_setting': {
                'name': server_setting.name,
                'value': server_setting.value
            }
        }

    @classmethod
    def update_server_setting(cls, name, value):
        server_setting = models.SERVER_SETTING.objects.filter(name=name).first()
        if not server_setting:
            return {
                'success': False,
                'message': '존재하지 않는 서버 설정입니다.'
            }
        server_setting.value = value
        server_setting.save()
        return {
            'success': True,
            'message': '서버 설정 수정 성공',
            'name': server_setting.name
        }


