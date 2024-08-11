from django.urls import path
from api import views

urlpatterns = [
    path('goals/', views.get_goals),
    path('goals/create/',  views.create_goal),
    path('goals/update/<str:pk>',  views.goal_update_and_delete),
    path('goals/delete/<str:pk>',  views.goal_update_and_delete),

    path('mistakes/', views.get_mistakes),
    path('mistakes/create/',  views.create_mistake),
    path('mistakes/update/<str:pk>',  views.mistake_update_and_delete),
    path('mistakes/delete/<str:pk>',  views.mistake_update_and_delete),

    path('profiles/', views.get_profiles),
    path('profiles/create/',  views.create_profile),
    path('profiles/update/<str:pk>',  views.profile_update_and_delete),
    path('profiles/delete/<str:pk>',  views.profile_update_and_delete),

    path('deals/', views.get_deals),
    path('deals/create/',  views.create_deal),
    path('deals/update/<str:pk>',  views.deal_update_and_delete),
    path('deals/delete/<str:pk>',  views.deal_update_and_delete),

    path('graphs/', views.get_graphs),
    path('graphs/create/',  views.create_graph),
    path('graphs/update/<str:pk>',  views.graph_update_and_delete),
    path('graphs/delete/<str:pk>',  views.graph_update_and_delete),

    path('articles/', views.get_articles),
    path('articles/create/',  views.create_article),
    path('articles/update/<str:pk>',  views.article_update_and_delete),
    path('articles/delete/<str:pk>',  views.article_update_and_delete),

    path('urgencies/', views.get_urgencies),
    path('urgencies/create/',  views.create_urgency),
    path('urgencies/update/<str:pk>',  views.urgency_update_and_delete),
    path('urgencies/delete/<str:pk>',  views.urgency_update_and_delete),
]