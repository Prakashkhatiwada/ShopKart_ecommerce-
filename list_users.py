import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from django.contrib.auth.models import User

users = User.objects.all()
print("Existing users:")
for user in users:
    print(f"Username: {user.username}, Is Superuser: {user.is_superuser}")
