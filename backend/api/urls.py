from django.urls import path
from api import views

urlpatterns = [
    # Goal URLs
    path('goals/', views.get_goals),
    path('goals/create/', views.create_goal),
    path('goals/update/<int:pk>/', views.goal_update),
    path('goals/delete/<int:pk>/', views.goal_delete),  

    # Mistake URLs
    path('mistakes/', views.get_mistakes),
    path('mistakes/create/', views.create_mistake),
    path('mistakes/update/<int:pk>/', views.mistake_update),
    path('mistakes/delete/<int:pk>/', views.mistake_delete), 

    # Profile URLs
    path('profiles/', views.get_profiles),
    path('profiles/create/', views.create_profile),
    path('profiles/update/<int:pk>/', views.profile_update),
    path('profiles/delete/<int:pk>/', views.profile_delete), 

    # Deal URLs
    path('deals/', views.get_deals),
    path('deals/create/', views.create_deal),
    path('deals/update/<int:pk>/', views.deal_update),
    path('deals/delete/<int:pk>/', views.deal_delete), 

    # Graph URLs
    path('graphs/', views.get_graphs),
    path('graphs/create/', views.create_graph),
    path('graphs/update/<int:pk>/', views.graph_update),
    path('graphs/delete/<int:pk>/', views.graph_delete),  

    # Conversation URLs 
    path('conversations/', views.get_conversations),
    path('conversations/create/', views.create_conversation),
    path('conversations/update/<int:pk>/', views.conversation_update),
    path('conversations/delete/<int:pk>/', views.conversation_delete), 

    # Urgency URLs
    path('urgencies/', views.get_urgencies),
    path('urgencies/create/', views.create_urgency),
    path('urgencies/update/<int:pk>/', views.urgency_update),
    path('urgencies/delete/<int:pk>/', views.urgency_delete),  

]
