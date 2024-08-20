from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

### Goal 

@api_view(['GET'])
def get_goals(request):
    goals = Goal.objects.all()
    serializer = GoalSerializer(goals, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_goal(request):
    serializer = GoalSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def goal_update(request, pk):
    try:
        goal = Goal.objects.get(pk=pk)
    except Goal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = GoalSerializer(goal, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def goal_delete(request, pk):
    try:
        goal = Goal.objects.get(pk=pk)
    except Goal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    goal.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    

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

@api_view(['PUT'])
def mistake_update(request, pk):
    try:
        mistake = Mistake.objects.get(pk=pk)
    except Mistake.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = MistakeSerializer(mistake, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def mistake_delete(request, pk):
    try:
        mistake = Mistake.objects.get(pk=pk)
    except Mistake.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    mistake.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    
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

@api_view(['PUT'])
def profile_update(request, pk):
    try:
        profile = Mistake.objects.get(pk=pk)
    except Mistake.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProfileSerializer(profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def profile_delete(request, pk):
    try:
        profile = Mistake.objects.get(pk=pk)
    except Mistake.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    profile.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

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

@api_view(['PUT'])
def deal_update(request, pk):
    try:
        deal = Deal.objects.get(pk=pk)
    except Deal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = DealSerializer(deal, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deal_delete(request, pk):
    try:
        deal = Deal.objects.get(pk=pk)
    except Deal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    deal.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

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

@api_view(['PUT'])
def graph_update(request, pk):
    try:
        graph = Graph.objects.get(pk=pk)
    except Graph.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = GraphSerializer(graph, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def graph_delete(request, pk):
    try:
        graph = Graph.objects.get(pk=pk)
    except Graph.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    graph.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    
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

@api_view(['PUT'])
def article_update(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ArticleSerializer(article, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def article_delete(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    article.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    
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

@api_view(['PUT'])
def urgency_update(request, pk):
    try:
        urgency = Urgency.objects.get(pk=pk)
    except Urgency.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UrgencySerializer(urgency, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def urgency_delete(request, pk):
    try:
        urgency = Urgency.objects.get(pk=pk)
    except Urgency.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    urgency.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)