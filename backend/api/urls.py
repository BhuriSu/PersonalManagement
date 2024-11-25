from django.urls import path
from api import views
from .rag_view import rag_chat_view

urlpatterns = [
    # Goal URLs
    path('goals/', views.get_goals),
    path('goals/create/', views.create_goal),
    path('goals/update/<int:pk>/', views.update_goal),
    path('goals/delete/<int:pk>/', views.delete_goal),  

    # Mistake URLs
    path('mistakes/', views.get_mistakes),
    path('mistakes/create/', views.create_mistake),
    path('mistakes/update/<int:pk>/', views.update_mistake),
    path('mistakes/delete/<int:pk>/', views.delete_mistake), 

    # Profile URLs
    path('profiles/', views.get_profiles),
    path('profiles/create/', views.create_profile),
    path('profiles/update/<int:pk>/', views.update_profile),
    path('profiles/delete/<int:pk>/', views.delete_profile), 

    # Deal URLs
    path('deals/', views.get_deals),
    path('deals/create/', views.create_deal),
    path('deals/update/<int:pk>/', views.update_deal),
    path('deals/delete/<int:pk>/', views.delete_deal), 

    # Map URLs
    path('maps/', views.get_maps),
    path('maps/create/', views.create_map),
    path('maps/delete/<int:pk>/', views.delete_map),  

    # Conversation URLs 
    path('conversations/', views.get_conversations),
    path('conversations/create/', views.create_conversation),
    path('conversations/update/<int:pk>/', views.update_conversation),
    path('conversations/delete/<int:pk>/', views.delete_conversation), 

    # Urgency URLs
    path('urgencies/', views.get_urgencies),
    path('urgencies/create/', views.create_urgency),
    path('urgencies/update/<int:pk>/', views.update_urgency),
    path('urgencies/delete/<int:pk>/', views.delete_urgency),  
 
    path('chat/', rag_chat_view, name='rag_chat'),
]
