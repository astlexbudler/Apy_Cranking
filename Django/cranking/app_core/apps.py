from django.apps import AppConfig
from cranking import settings


class AppCoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app_core'

    def ready(self):

        if settings.SCHEDULER_DEFAULT:
            from . import scheduler
            scheduler.startScheduler()