from django.shortcuts import render
from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from .serializers import UserProfileSerializer, UserSerializer
from django.shortcuts import get_object_or_404
from django.conf import settings

User = get_user_model()

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def list(request):
    search = request.GET.get('search', '')
    page_size = request.GET.get('page_size', settings.REST_FRAMEWORK['PAGE_SIZE'])

    paginator = PageNumberPagination()
    paginator.page_size = page_size
    users = User.objects.all()
    users = users.filter(
        (Q(username__icontains=search) | Q(email__icontains=search) | Q(first_name__icontains=search) | Q(last_name__icontains=search))
    ).order_by('-id')
    context = paginator.paginate_queryset(users, request)
    serializer = UserSerializer(context, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create(request):
    user_serializer = UserSerializer(data=request.data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        user.set_password(user_serializer.data.get('password'))
        user.save()
        profile_data = request.data.get('userprofile', None)
        if profile_data:
            profile_data.setdefault('user', user.id)
            user_profile_serializer = UserProfileSerializer(data=profile_data)
            if user_profile_serializer.is_valid():
                user_profile_serializer.save()
                user = get_object_or_404(User, pk=user_profile_serializer.data.get('user'))
                user_serializer = UserSerializer(user)
            else:
                return Response(user_profile_serializer.errors, status=HTTP_400_BAD_REQUEST)
        return Response(user_serializer.data, status=HTTP_201_CREATED)
    return Response(user_serializer.errors, status=HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
# @permission_classes([IsAuthenticated])
def update(request, pk):
    user = get_object_or_404(User, pk=pk)
    user_serializer = UserSerializer(user, data=request.data, partial=True)
    if user_serializer.is_valid():
        user = user_serializer.save()
        if user_serializer.data.get('old_password', '') != '':
            user.set_password(user_serializer.data.get('password'))
            user.save()
        profile_data = request.data.get('userprofile', None)
        if profile_data:
            profile_data.setdefault('user', user.id)
            try:
                user_profile_serializer = UserProfileSerializer(user.userprofile, data=profile_data)
            except User.userprofile.RelatedObjectDoesNotExist:
                user_profile_serializer = UserProfileSerializer(data=profile_data)
            if user_profile_serializer.is_valid():
                user_profile_serializer.save()
                user = get_object_or_404(User, pk=user_profile_serializer.data.get('user'))
                user_serializer = UserSerializer(user)
            else:
                return Response(user_profile_serializer.errors, status=HTTP_400_BAD_REQUEST)
        return Response(user_serializer.data, status=HTTP_200_OK)
    return Response(user_serializer.errors, status=HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
def destroy(request, pk):
    user = get_object_or_404(User, pk=pk)
    user.delete()
    return Response({}, status=HTTP_200_OK)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def retrieve(request, pk):
    user = get_object_or_404(User, pk=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=HTTP_200_OK)
