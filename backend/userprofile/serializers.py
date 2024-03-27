from .models import UserProfile
from django.contrib.auth import get_user_model
from rest_framework import serializers, fields
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('user', 'hometown', 'age', 'gender')

class UserSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(max_length=128, required=False)
    confirm_password = serializers.CharField(max_length=128, required=False)
    userprofile = UserProfileSerializer(read_only=True)

    def validate(self, data):
        if data.get('password', '') != '':
            if data.get('old_password', '') != '':
                if not self.context['request'].user.check_password(data.get('old_password')):
                    raise serializers.ValidationError({'old_password': _('Wrong old password.')})
            if data.get('password', '') != data.get('confirm_password', ''):
                raise serializers.ValidationError({'confirm_password': _("The password fields didn't match.")})
        return data

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'old_password', 'password', 'confirm_password', 'first_name', 'last_name', 'userprofile', 'date_joined')

    def create(self, validated_data):
        if 'old_password' in validated_data:
            del(validated_data['old_password'])
        if 'confirm_password' in validated_data:
            del(validated_data['confirm_password'])
        user = User.objects.create(**validated_data)
        return user

    def update(self, instance, validated_data):
        if 'old_password' in validated_data:
            del(validated_data['old_password'])
        if 'confirm_password' in validated_data:
            del(validated_data['confirm_password'])
        super().update(instance=instance, validated_data=validated_data)
        return instance
