from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


# Create your views here.
def homepage(request):
    return HttpResponse('Hello Worlddddd')


# Create your views here.
def yo(request):
    return HttpResponse("yooyoyyoy")

# Create your views here.
@api_view(['POST'])
def stoca(request):
    return HttpResponse("Stocazz")