from rest_framework import serializers
from .models import Goal, Mistake,  Profile, Deal, Graph, Article, Urgency

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        modal = Goal
        fields = '__all__'

class MistakeSerializer(serializers.ModelSerializer):
    class Meta:
        modal = Mistake
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        modal = Profile
        fields = '__all__'

class DealSerializer(serializers.ModelSerializer):
    class Meta:
        modal = Deal
        fields = '__all__'

class GraphSerializer(serializers.ModelSerializer):
    class Meta:
        modal = Graph
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        modal = Article
        fields = '__all__'
    
class UrgencySerializer(serializers.ModelSerializer):
    class Meta:
        modal = Urgency
        fields = '__all__'