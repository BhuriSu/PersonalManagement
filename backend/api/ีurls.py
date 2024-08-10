from django.urls import path
from api import views

urlpatterns = [
    path('goals/', views.get_goals),
    path('goals/create/',  views.create_goal),
    path('goals/update/<str:pk>',  views.goal_update_and_delete),
    path('goals/delete/<str:pk>',  views.goal_update_and_delete),
]