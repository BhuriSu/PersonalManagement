from django.urls import path
from api import views

urlpatterns = [
    path('goals/', views.get_goals),
    path('goals/create/',  views.create_goal),
    path('goals/update/<int:pk>',  views.goal_update_and_delete),
    path('goals/delete/<int:pk>',  views.goal_update_and_delete),

    path('mistakes/', views.get_mistakes),
    path('mistakes/create/',  views.create_mistake),
    path('mistakes/update/<int:pk>',  views.mistake_update_and_delete),
    path('mistakes/delete/<int:pk>',  views.mistake_update_and_delete),

    path('profiles/', views.get_profiles),
    path('profiles/create/',  views.create_profile),
    path('profiles/update/<int:pk>',  views.profile_update_and_delete),
    path('profiles/delete/<int:pk>',  views.profile_update_and_delete),

    path('deals/', views.get_deals),
    path('deals/create/',  views.create_deal),
    path('deals/update/<int:pk>',  views.deal_update_and_delete),
    path('deals/delete/<int:pk>',  views.deal_update_and_delete),

    path('graphs/', views.get_graphs),
    path('graphs/create/',  views.create_graph),
    path('graphs/update/<int:pk>',  views.graph_update_and_delete),
    path('graphs/delete/<int:pk>',  views.graph_update_and_delete),

    path('articles/', views.get_articles),
    path('articles/create/',  views.create_article),
    path('articles/update/<int:pk>',  views.article_update_and_delete),
    path('articles/delete/<int:pk>',  views.article_update_and_delete),

    path('urgencies/', views.get_urgencies),
    path('urgencies/create/',  views.create_urgency),
    path('urgencies/update/<int:pk>',  views.urgency_update_and_delete),
    path('urgencies/delete/<int:pk>',  views.urgency_update_and_delete),
]