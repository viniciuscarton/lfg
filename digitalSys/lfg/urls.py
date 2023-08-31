from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('proposta/', views.proposta, name="proposta"),
    path('listagem/', views.listagem, name="listagem"),
]