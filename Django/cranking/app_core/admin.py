from django.contrib import admin
from . import models

class AccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'first_name', 'last_name', 'email', 'is_active', 'is_staff', 'is_superuser', 'date_joined', 'last_login', 'tel', 'address', 'lat', 'lon', 'is_push', 'is_email', 'avg_rate', 'device_token')
    list_display_links = ('id', 'username', 'first_name', 'last_name', 'email', 'is_active', 'is_staff', 'is_superuser', 'date_joined', 'last_login', 'tel', 'address', 'lat', 'lon', 'is_push', 'is_email', 'avg_rate', 'device_token')
    search_fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_active', 'is_staff', 'is_superuser', 'date_joined', 'last_login', 'tel', 'address', 'lat', 'lon', 'is_push', 'is_email', 'avg_rate', 'device_token')
    list_per_page = 25

class CarAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'number', 'identification_number', 'name', 'manufacturer', 'car_type', 'car_size', 'year', 'cc', 'engine', 'fuel', 'transmission')
    list_display_links = ('id', 'user', 'number', 'identification_number', 'name', 'manufacturer', 'car_type', 'car_size', 'year', 'cc', 'engine', 'fuel', 'transmission')
    search_fields = ('id', 'user', 'number', 'identification_number', 'name', 'manufacturer', 'car_type', 'car_size', 'year', 'cc', 'engine', 'fuel', 'transmission')
    list_per_page = 25

class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'image', 'board', 'title', 'content', 'view_count', 'created_at')
    list_display_links = ('id', 'author', 'image', 'board', 'title', 'content', 'view_count', 'created_at')
    search_fields = ('id', 'author', 'image', 'board', 'title', 'content', 'view_count', 'created_at')
    list_per_page = 25

class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'parent_comment', 'post', 'author', 'content', 'created_at')
    list_display_links = ('id', 'parent_comment', 'post', 'author', 'content', 'created_at')
    search_fields = ('id', 'parent_comment', 'post', 'author', 'content', 'created_at')
    list_per_page = 25

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'parent_question', 'title', 'content')
    list_display_links = ('id', 'parent_question', 'title', 'content')
    search_fields = ('id', 'parent_question', 'title', 'content')
    list_per_page = 25

class QuestionTagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('id', 'name')
    list_per_page = 25

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'mechanic', 'message', 'address', 'lat', 'lon', 'status', 'available_dates', 'purchase_amount', 'days', 'created_at', 'completed_at')
    list_display_links = ('id', 'user', 'mechanic', 'message', 'address', 'lat', 'lon', 'status', 'available_dates', 'purchase_amount', 'days', 'created_at', 'completed_at')
    search_fields = ('id', 'user', 'mechanic', 'message', 'address', 'lat', 'lon', 'status', 'available_dates', 'purchase_amount', 'days', 'created_at', 'completed_at')
    list_per_page = 25

class EstimateAdmin(admin.ModelAdmin):
    list_display = ('id', 'mechanic', 'order', 'days_estimate', 'price_estimate', 'message', 'created_at')
    list_display_links = ('id', 'mechanic', 'order', 'days_estimate', 'price_estimate', 'message', 'created_at')
    search_fields = ('id', 'mechanic', 'order', 'days_estimate', 'price_estimate', 'message', 'created_at')
    list_per_page = 25

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'mechanic', 'rate', 'message', 'created_at')
    list_display_links = ('id', 'user', 'mechanic', 'rate', 'message', 'created_at')
    search_fields = ('id', 'user', 'mechanic', 'rate', 'message', 'created_at')
    list_per_page = 25

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'target', 'title', 'link', 'content', 'is_send', 'created_at')
    list_display_links = ('id', 'target', 'title', 'link', 'content', 'is_send', 'created_at')
    search_fields = ('id', 'target', 'title', 'link', 'content', 'is_send', 'created_at')
    list_per_page = 25

class ChatAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver', 'image', 'is_read', 'content', 'created_at')
    list_display_links = ('id', 'sender', 'receiver', 'image', 'is_read', 'content', 'created_at')
    search_fields = ('id', 'sender', 'receiver', 'image', 'is_read', 'content', 'created_at')
    list_per_page = 25

class ServerLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'message', 'created_at')
    list_display_links = ('id', 'message', 'created_at')
    search_fields = ('id', 'message', 'created_at')
    list_per_page = 25

class CertCodeAdmin(admin.ModelAdmin):
    list_display = ('id', 'account', 'code', 'created_at')
    list_display_links = ('id', 'account', 'code', 'created_at')
    search_fields = ('id', 'account', 'code', 'created_at')
    list_per_page = 25

class ServerSettingAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'value')
    list_display_links = ('id', 'name', 'value')
    search_fields = ('id', 'name', 'value')
    list_per_page = 25

admin.site.register(models.ACCOUNT, AccountAdmin)
admin.site.register(models.CAR, CarAdmin)
admin.site.register(models.POST, PostAdmin)
admin.site.register(models.COMMENT, CommentAdmin)
admin.site.register(models.QUESTION, QuestionAdmin)
admin.site.register(models.QUESTION_TAG, QuestionTagAdmin)
admin.site.register(models.ORDER, OrderAdmin)
admin.site.register(models.ESTIMATE, EstimateAdmin)
admin.site.register(models.REVIEW, ReviewAdmin)
admin.site.register(models.NOTIFICATION, NotificationAdmin)
admin.site.register(models.CHAT, ChatAdmin)
admin.site.register(models.SERVER_LOG, ServerLogAdmin)
admin.site.register(models.CERT_CODE, CertCodeAdmin)
admin.site.register(models.SERVER_SETTING, ServerSettingAdmin)