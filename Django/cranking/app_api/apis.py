from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from app_core import models, daos
from django.http import JsonResponse
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, logout, login
import datetime
import random
import string
from django.views.decorators.csrf import ensure_csrf_cookie



# 테스트 api(GET)
def api_test(request):
    return JsonResponse({
        'success': True,
        'status': 200,
        'message': 'api_test',
        'data': {}
    })

# csrf 토큰 api(GET)
@ensure_csrf_cookie
def api_csrftoken(request):
    return JsonResponse({
        'success': True,
        'status': 200,
        'message': 'api_csrftoken',
        'data': {}
    })

# 로그인 api(POST)
def api_login(request):
    return JsonResponse({
        'success': True,
        'status': 200,
        'message': 'api_login',
        'data': {}
    })

# 로그아웃 api(GET)
def api_logout(request):
    return JsonResponse({
        'success': True,
        'status': 200,
        'message': 'api_logout',
        'data': {}
    })

# 계정 관리 RESTful api
class api_account(APIView):
    def post(self, request): # 계정 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_account post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 계정 조회, list: 계정 목록 조회, near_mechanics: 가까운 정비공 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_account get',
            'data': {}
        })

    def patch(self, request): # 계정 수정
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_account patch',
            'data': {}
        })

    def delete(self, request): # 계정 비활성화 및 삭제
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_account delete',
            'data': {}
        })

# 차량 관리 RESTful api
class api_car(APIView):
    def post(self, request): # 차량 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_car post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 차량 조회, list: 차량 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_car get',
            'data': {}
        })

    def patch(self, request): # 차량 수정
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_car patch',
            'data': {}
        })

    def delete(self, request): # 차량 삭제
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_car delete',
            'data': {}
        })

# 게시글 관리 RESTful api
class api_post(APIView):
    def post(self, request): # 게시글 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_post post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 게시글 조회, list: 게시글 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_post get',
            'data': {}
        })

    def patch(self, request): # 게시글 수정
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_post patch',
            'data': {}
        })

    def delete(self, request): # 게시글 삭제
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_post delete',
            'data': {}
        })

# 댓글 관리 RESTful api
class api_comment(APIView):
    def post(self, request): # 댓글 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_comment post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 댓글 조회, list: 댓글 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_comment get',
            'data': {}
        })

    def patch(self, request): # 댓글 수정
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_comment patch',
            'data': {}
        })

    def delete(self, request): # 댓글 삭제
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_comment delete',
            'data': {}
        })

# 질문 관리 RESTful api
class api_question(APIView):
    def post(self, request): # 질문 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_question post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 질문 조회, tree: 질문 트리 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_question get',
            'data': {}
        })

    def patch(self, request): # 질문 수정
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_question patch',
            'data': {}
        })

    def delete(self, request): # 질문 삭제
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_question delete',
            'data': {}
        })

# 질문 태그 관리 RESTful api
class api_question_tag(APIView):
    def post(self, request): # 질문 태그 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_question_tag post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 질문 태그 조회, list: 질문 태그 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_question_tag get',
            'data': {}
        })

    def patch(self, request): # 질문 태그 수정
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_question_tag patch',
            'data': {}
        })

    def delete(self, request): # 질문 태그 삭제
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_question_tag delete',
            'data': {}
        })

# 주문 관리 RESTful api
class api_order(APIView):
    def post(self, request): # 주문 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_order post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 주문 조회, list: 주문 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_order get',
            'data': {}
        })

    def patch(self, request): # 주문 수정
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_order patch',
            'data': {}
        })

    def delete(self, request): # 주문 삭제
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_order delete',
            'data': {}
        })

# 견적 관리 RESTful api
class api_estimate(APIView):
    def post(self, request): # 견적 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_estimate post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 견적 조회, list: 견적 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_estimate get',
            'data': {}
        })

    def patch(self, request): # 견적 수정
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_estimate patch',
            'data': {}
        })

    def delete(self, request): # 견적 삭제
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_estimate delete',
            'data': {}
        })

# 리뷰 관리 RESTful api
class api_review(APIView):
    def post(self, request): # 리뷰 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_review post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 리뷰 조회, list: 리뷰 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_review get',
            'data': {}
        })

    def patch(self, request): # 리뷰 수정
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_review patch',
            'data': {}
        })

    def delete(self, request): # 리뷰 삭제
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_review delete',
            'data': {}
        })

# 알림 관리 RESTful api
class api_notification(APIView):
    def post(self, request): # 알림 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_notification post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 알림 조회, list: 알림 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_notification get',
            'data': {}
        })

# 채팅 관리 RESTful api
class api_chat(APIView):
    def post(self, request): # 채팅 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_chat post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 채팅 조회, list: 채팅 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_chat get',
            'data': {}
        })

# 서버 로그 관리 RESTful api
class api_server_log(APIView):
    def post(self, request): # 서버 로그 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_server_log post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 서버 로그 조회, list: 서버 로그 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_server_log get',
            'data': {}
        })

# 인증 코드 관리 RESTful api
class api_cert_code(APIView):
    def post(self, request): # 인증 코드 생성
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_cert_code post',
            'data': {}
        })

    def get(self, request): # (search_type) single: 단일 인증 코드 조회, list: 인증 코드 목록 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_cert_code get',
            'data': {}
        })

    def delete(self, request): # 인증 코드 삭제
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_cert_code delete',
            'data': {}
        })

# 서버 설정 관리 RESTful api
class api_server_setting(APIView):
    def get(self, request): # 서버 설정 조회
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_server_setting get',
            'data': {}
        })

    def patch(self, request): # 서버 설정 수정
        return JsonResponse({
            'success': True,
            'status': 200,
            'message': 'api_server_setting patch',
            'data': {}
        })
