from django.db import models

# Create your models here.
class Goal(models.Model):
    goal = models.CharField(max_length=200)
    how = models.TextField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    place = models.CharField(max_length=50)

class Mistake(models.Model):
    mistake = models.CharField(max_length=200)
    cost = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    place = models.CharField(max_length=50)
    solution = models.CharField(max_length=500)

class Profile(models.Model):
    name = models.CharField(max_length=100)
    age = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    place = models.CharField(max_length=50)
    career = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    email = models.CharField(max_length=50)

class Deal(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    place = models.CharField(max_length=50)
    deal = models.CharField(max_length=200)
    dealTime = models.CharField(max_length=50)
    place = models.CharField(max_length=50)
    money = models.CharField(max_length=50)
    profit = models.CharField(max_length=50)

class Graph(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name

class Conversation(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name

class Urgency(models.Model):
    urgency = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    information = models.CharField(max_length=500)
