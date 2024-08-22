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
def update_goal(request, pk):
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
def delete_goal(request, pk):
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
def update_mistake(request, pk):
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
def delete_mistake(request, pk):
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
def update_profile(request, pk):
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
def delete_profile(request, pk):
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
def update_deal(request, pk):
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
def delete_deal(request, pk):
    try:
        deal = Deal.objects.get(pk=pk)
    except Deal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    deal.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

### Map

@api_view(['GET'])
def get_maps(request):
    maps =  Map.objects.all()
    serializer = MapSerializer(maps, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_map(request):
    serializer = MapSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_map(request, pk):
    try:
        map = Map.objects.get(pk=pk)
    except Map.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = MapSerializer(map, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_map(request, pk):
    try:
        map = Map.objects.get(pk=pk)
    except Map.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    map.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    
### Conversation

@api_view(['GET'])
def get_conversations(request):
    conversations =  Conversation.objects.all()
    serializer = ConversationSerializer(conversations, many=True).data
    return Response(serializer)

@api_view(['POST'])
def create_conversation(request):
    serializer = ConversationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_conversation(request, pk):
    try:
        conversation = conversation.objects.get(pk=pk)
    except conversation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ConversationSerializer(conversation, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_conversation(request, pk):
    try:
        conversation = conversation.objects.get(pk=pk)
    except conversation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    conversation.delete()
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
def update_urgency(request, pk):
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
def delete_urgency(request, pk):
    try:
        urgency = Urgency.objects.get(pk=pk)
    except Urgency.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    urgency.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)