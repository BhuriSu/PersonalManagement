from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Goal
from .serializers import GoalSerializer


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
