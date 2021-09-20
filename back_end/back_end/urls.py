from django.contrib import admin
from django.urls import path, include

admin.site.site_header = "CD Gallery Admin"
admin.site.site_title = "CD Gallery Portal"
admin.site.index_title = "Welcome CD Gallery Portal"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
]
