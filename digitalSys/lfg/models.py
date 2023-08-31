from django.db import models
from djongo import models

class Campos(models.Model):
    TIPOS = [
        ('texto', 'Texto'),
        ('numero', 'Número'),
        ('data', 'Data'),
    ]

    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=10, choices=TIPOS)
    obrigatorio = models.BooleanField(default=False)

    def __str__(self):
        return self.nome


