from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

GENDER_CHOICES = (
    ('M', 'M'),
    ('F', 'F'),
)

class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='userprofile', on_delete=models.CASCADE)
    hometown = models.TextField(_('Hometown'), max_length=255, null=True, blank=True)
    age = models.DateField(_('Age'), null=True, blank=True)
    gender = models.CharField(_('Gender'), max_length=1, choices=GENDER_CHOICES, default='M')

    def __str__(self):
        return self.user.username
