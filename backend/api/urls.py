from django.urls import path
from api import views

urlpatterns = [
    # Goal URLs
    path('goals/', views.get_goals),
    path('goals/create/', views.create_goal),
    path('goals/<int:pk>/', views.goal_update_and_delete),  # Combined update and delete

    # Mistake URLs
    path('mistakes/', views.get_mistakes),
    path('mistakes/create/', views.create_mistake),
    path('mistakes/<int:pk>/', views.mistake_update_and_delete),  # Combined update and delete

    # Profile URLs
    path('profiles/', views.get_profiles),
    path('profiles/create/', views.create_profile),
    path('profiles/<int:pk>/', views.profile_update_and_delete),  # Combined update and delete

    # Deal URLs
    path('deals/', views.get_deals),
    path('deals/create/', views.create_deal),
    path('deals/<int:pk>/', views.deal_update_and_delete),  # Combined update and delete

    # Graph URLs
    path('graphs/', views.get_graphs),
    path('graphs/create/', views.create_graph),
    path('graphs/<int:pk>/', views.graph_update_and_delete),  # Combined update and delete

    # Article URLs
    path('articles/', views.get_articles),
    path('articles/create/', views.create_article),
    path('articles/<int:pk>/', views.article_update_and_delete),  # Combined update and delete

    # Urgency URLs
    path('urgencies/', views.get_urgencies),
    path('urgencies/create/', views.create_urgency),
    path('urgencies/<int:pk>/', views.urgency_update_and_delete),  # Combined update and delete

]
