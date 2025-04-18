from django.urls import path
from django.urls import re_path
from . import views as v

urlpatterns = [

    # SNS 로그인 요청
    #path('login/kakao', v.kakao_login, name='kakao_login'),
    #path('login/google', v.google_login, name='google_login'),
    #path('login/apple', v.apple_login, name='apple_login'),
    #path('login_result', v.login_result, name='login_result'), # 로그인 결과 및 콜백 처리

    # Vite
    re_path(r'^.*$', v.index, name='index'),  # vue/react에서 사용하는 모든 페이지 진입
]
