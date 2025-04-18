from pathlib import Path
import os

##################################################
# 기본 정보 설정
##################################################
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-lmtparxg=a^f#p$x^b+tg_#@)7^e@rkuzi&_6a4l2(2m2$8hrq'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

X_FRAME_OPTIONS = 'ALLOWALL'

XS_SHARING_ALLOWED_METHODS = ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE']

##################################################
# Application 설정
##################################################
# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.sitemaps',
    'app_core',
    'app_api',
    'app_user',
    'corsheaders',
    'django_apscheduler',
    'allauth',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.kakao',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.apple',
]

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

# scheduler 설정
APSCHEDULER_DATETIME_FORMAT = "N J, Y, f:s a"
SCHEDULER_DEFAULT = True

# sitemap 설정
SITE_ID = 2
SITE_DOMAIN = 'cranking.applifyapplications.com'
CSRF_TRUSTED_ORIGINS=[
    'http://127.0.0.1:8000', 'http://127.0.0.1:3000'
]

ROOT_URLCONF = 'cranking.urls'

# CORS 설정
CORS_ORIGIN_ALLOW_ALL = True
SECURE_CROSS_ORIGIN_OPENER_POLICY='same-origin-allow-popups'

# CSRF 설정
CSRF_COOKIE_HTTPONLY = False  # JavaScript에서 CSRF 토큰을 읽을 수 있도록 설정
CSRF_COOKIE_SECURE = False  # HTTPS 환경이 아니라면 False (배포 시 True로 변경)
CSRF_COOKIE_SAMESITE = 'Lax'  # 크로스 사이트 요청이 필요하면 'None'으로 변경

# SNS 로그인 설정
SOCIALACCOUNT_PROVIDERS = {
    "apple": {
        "APP": {"client_id": 'com.applifyids.login', # SERVICE ID
            "secret": 'KL********', # KEY ID
            "key": 'GW********', # APP ID PREPIX
"certificate_key": """-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----
"""
        },
        'SCOPE': ['email'],
        'AUTH_PARAMS': {'access_type': 'online'}
    },
    "naver": {
        "APP": {
            "client_id": 'NExmsO_**********', # CLIENT ID
            "secret": 'UW********', # CLIENT SECRET
        },
    },
    "google": {
        "APP": {},
    }
}
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    )
}



##################################################
# template 설정
##################################################
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cranking.wsgi.application'



##################################################
# 데이터베이스 설정
##################################################
# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
AUTH_USER_MODEL = 'app_core.ACCOUNT'



##################################################
# 비밀번호
##################################################
# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



##################################################
# 서버 time zone 설정
##################################################
# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/
LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_L10N = True

USE_TZ = False



##################################################
# static, media 디렉토리 설정
##################################################
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join('staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
DATA_UPLOAD_MAX_MEMORY_SIZE = 50 * 1024 * 1024  # 50MB

ASSETS_URL = '/assets/'
ASSETS_ROOT = os.path.join(BASE_DIR, 'static', 'assets')



##################################################
# model 기본 primary key 설정
##################################################
# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'