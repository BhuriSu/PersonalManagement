from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Goal, Mistake, Profile, Deal, Graph, Article, Urgency
from .serializers import GoalSerializer, MistakeSerializer, ProfileSerializer, DealSerializer, GraphSerializer, ArticleSerializer, UrgencySerializer
import logging
### Goal 

@api_view(['GET'])
def get_goals(request):
    goals = Goal.objects.all()
    serializer = GoalSerializer(goals, many=True).data
    return Response(serializer)

@api_view(['POST'])

def create_goal(request):
    logging.info(f'Request data: {request.data}')
    serializer = GoalSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    logging.error(f'Validation errors: {serializer.errors}')
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def goal_update_and_delete(request, pk):
    try:
        goals = Goal.objects.get(pk=pk)
    except Goal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        goals.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = GoalSerializer(goals, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
### Mistake

@api_view(['GET'])
def get_mistakes(request):
    mistakes = Mistake.objects.all()
    serializer = MistakeSerializer(mistakes, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_mistake(request):
    serializer = MistakeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def mistake_update_and_delete(request, pk):
    try:
        mistakes = Mistake.objects.get(pk=pk)
    except Mistake.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        mistakes.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = MistakeSerializer(mistakes, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
### Profile

@api_view(['GET'])
def get_profiles(request):
    profiles =  Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_profile(request):
    serializer = ProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def profile_update_and_delete(request, pk):
    try:
        profiles = Mistake.objects.get(pk=pk)
    except Mistake.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        profiles.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = ProfileSerializer(profiles, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

### Deal

@api_view(['GET'])
def get_deals(request):
    deals =  Profile.objects.all()
    serializer = DealSerializer(deals, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_deal(request):
    serializer = DealSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def deal_update_and_delete(request, pk):
    try:
        deals = Deal.objects.get(pk=pk)
    except Deal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        deals.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = DealSerializer(deals, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

### Graph

@api_view(['GET'])
def get_graphs(request):
    graphs =  Graph.objects.all()
    serializer = GraphSerializer(graphs, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_graph(request):
    serializer = GraphSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def graph_update_and_delete(request, pk):
    try:
        graphs = Graph.objects.get(pk=pk)
    except Graph.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        graphs.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = GraphSerializer(graphs, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
### Article

@api_view(['GET'])
def get_articles(request):
    articles =  Article.objects.all()
    serializer = ArticleSerializer(articles, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_article(request):
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def article_update_and_delete(request, pk):
    try:
        articles = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        articles.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = ArticleSerializer(articles, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
### Urgency

@api_view(['GET'])
def get_urgencies(request):
    urgencies =  Urgency.objects.all()
    serializer = UrgencySerializer(urgencies, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_urgency(request):
    serializer = UrgencySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def urgency_update_and_delete(request, pk):
    try:
        urgencies = Urgency.objects.get(pk=pk)
    except Urgency.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        urgencies.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = UrgencySerializer(urgencies, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)