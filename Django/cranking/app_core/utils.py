import datetime

def prefix_upload_path(file): # 파일 업로드 경로 및 파일명 설정 함수
    return '/media/' + str(file)

def resize_image(image_file): # 이미지 리사이즈 함수
    return image_file

def format_datetime(dt): # 날짜 형식 변환 함수
    return datetime.datetime.strftime(dt.created_at, '%Y-%m-%d %H:%M')

def calculate_distance(lat1, lon1, lat2, lon2): # 거리 계산 함수
    return 0