import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from django.contrib.auth.models import User

try:
    user = User.objects.get(username='admin')
    user.set_password('admin')
    user.is_superuser = True
    user.is_staff = True
    user.save()
    print("User 'admin' updated. Password set to 'admin'. Superuser permissions granted.")
except User.DoesNotExist:
    User.objects.create_superuser('admin', 'admin@example.com', 'admin')
    print("User 'admin' created with password 'admin'.")
