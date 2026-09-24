from django.db import migrations

PRODUCTS = [
    {
        'name': 'ASUS',
        'price': '90000.00',
        'digital': True,
        'category': 'Laptop',
        'description': 'The ASUS ExpertBook B1400 is a business laptop designed for productivity, featuring military-grade durability, a range of security features, and extensive connectivity options.',
        'image': 'asus.jpg',
    },
    {
        'name': 'DELL',
        'price': '96000.00',
        'digital': True,
        'category': 'Laptop',
        'description': 'Dell Inspiron 14 7420 2022 (Intel Core i7-1255U, 16GB, 512GB, 14',
        'image': 'dell1.jpg',
    },
    {
        'name': 'ASUS',
        'price': '1000.00',
        'digital': True,
        'category': 'Laptop',
        'description': 'A business laptop designed for productivity, featuring military-grade durability, a range of security features, and extensive connectivity options.',
        'image': 'asus_EjAXoSf.jpg',
    },
    {
        'name': 'Tomato',
        'price': '20.00',
        'digital': False,
        'category': 'vegitables',
        'description': 'Red toms!',
        'image': 'tom.webp',
    },
    {
        'name': 'Bicycle',
        'price': '30.00',
        'digital': False,
        'category': 'Cycle',
        'description': 'Mountain Bicycle adjustable for offroad !',
        'image': 'image.png',
    },
    {
        'name': 'Home',
        'price': '11999.00',
        'digital': True,
        'category': 'House',
        'description': 'Ramro xa Ghar !',
        'image': 'example1_yR3xU91.png',
    },
    {
        'name': 'Macbook M1',
        'price': '99000.00',
        'digital': True,
        'category': 'Laptop',
        'description': 'Portable to use !',
        'image': 'mac_RIJfQJj.jpg',
    },
]


def seed_products(apps, schema_editor):
    Product = apps.get_model('store', 'Product')
    for data in PRODUCTS:
        if not Product.objects.filter(name=data['name'], price=data['price']).exists():
            Product.objects.create(**data)


def remove_products(apps, schema_editor):
    Product = apps.get_model('store', 'Product')
    for data in PRODUCTS:
        Product.objects.filter(name=data['name'], price=data['price']).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_product_category_product_description'),
    ]

    operations = [
        migrations.RunPython(seed_products, remove_products),
    ]