from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Campos

def index(request):
    return render(request, 'index.html')

def proposta(request):
    return render(request, 'proposta.html')

def listagem(request):
    return render(request, 'listagem.html')
