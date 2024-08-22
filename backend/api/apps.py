from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    
# python manage.py runserver

#when change something in backend and get error ... does not exist >>  python manage.py migrate