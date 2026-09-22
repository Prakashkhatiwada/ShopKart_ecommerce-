from django.http import JsonResponse
import json
import datetime
import requests
from django.conf import settings
from .models import * 
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect 
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.middleware.csrf import get_token

def store(request):
	if request.user.is_authenticated:
		customer = request.user.customer
		order, created = Order.objects.get_or_create(customer=customer, complete=False)
		items = order.orderitem_set.all()
		cartItems = order.get_cart_items
	else:
		items = []
		order = {'get_cart_total':0, 'get_cart_items':0}
		cartItems = order['get_cart_items']

	products = Product.objects.all()
	context = {'products':products, 'cartItems':cartItems}
	return render(request, 'store/store.html', context)

def cart(request):
	if request.user.is_authenticated:
		customer = request.user.customer
		order, created = Order.objects.get_or_create(customer=customer, complete=False)
		items = order.orderitem_set.all()
		cartItems = order.get_cart_items
	else:
		items = []
		order = {'get_cart_total':0, 'get_cart_items':0}
		cartItems = order['get_cart_items']

	context = {'items':items, 'order':order, 'cartItems':cartItems}
	return render(request, 'store/cart.html', context)

def checkout(request):
	if request.user.is_authenticated:
		customer = request.user.customer
		order, created = Order.objects.get_or_create(customer=customer, complete=False)
		items = order.orderitem_set.all()
		cartItems = order.get_cart_items
		try:
			shipping_address = ShippingAddress.objects.filter(customer=customer).order_by('-id').first()
		except:
			shipping_address = None
	else:
		items = []
		order = {'get_cart_total':0, 'get_cart_items':0}
		cartItems = order['get_cart_items']

	context = {'items':items, 'order':order, 'cartItems':cartItems}
	return render(request, 'store/checkout.html', context)

def product_detail(request, pk):
	product = Product.objects.get(id=pk)
	context = {'product':product}
	return render(request, 'store/product.html', context)

def updateItem(request):
	data = json.loads(request.body)
	productId = data['productId']
	action = data['action']
	print('Action:', action)
	print('Product:', productId)

	customer = request.user.customer
	product = Product.objects.get(id=productId)
	order, created = Order.objects.get_or_create(customer=customer, complete=False)

	orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)

	if action == 'add':
		orderItem.quantity = (orderItem.quantity + 1)
	elif action == 'remove':
		orderItem.quantity = (orderItem.quantity - 1)

	orderItem.save()

	if orderItem.quantity <= 0:
		orderItem.delete()

	return JsonResponse('Item was added', safe=False)

	return JsonResponse('Payment submitted..', safe=False)

import hmac
import hashlib
import base64
import uuid
import json as _json

ESEWA_SECRET_KEY = "8gBm/:&EnhH.1/q"
ESEWA_PRODUCT_CODE = "EPAYTEST"
ESEWA_GATEWAY = "https://rc.esewa.com.np/api/epay/main/v2/form"


def generate_esewa_signature(total_amount, transaction_uuid, product_code):
    message = f"total_amount={total_amount},transaction_uuid={transaction_uuid},product_code={product_code}"
    hmac_sha256 = hmac.new(ESEWA_SECRET_KEY.encode(), message.encode(), hashlib.sha256)
    signature = base64.b64encode(hmac_sha256.digest()).decode()
    return signature


def verify_esewa_signature(payload, received_signature):
    """Re-compute signature and compare with what eSewa sent back.
    eSewa's response includes 'signed_field_names' which tells us exactly
    what fields were signed and in what order.
    """
    signed_field_names = payload.get('signed_field_names', '')
    if not signed_field_names:
        return False
        
    message_parts = []
    for field in signed_field_names.split(','):
        val = payload.get(field, '')
        message_parts.append(f"{field}={val}")
        
    message = ",".join(message_parts)
    hmac_sha256 = hmac.new(ESEWA_SECRET_KEY.encode(), message.encode(), hashlib.sha256)
    expected = base64.b64encode(hmac_sha256.digest()).decode()
    
    return hmac.compare_digest(expected, received_signature)


# ---------------- API endpoints (for Next.js frontend) ----------------

def serialize_product(p):
    return {
        'id': p.id,
        'name': p.name,
        'price': float(p.price),
        'digital': p.digital,
        'category': p.category,
        'description': p.description,
        'image': p.imageURL,
    }

def get_order_context(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        items = order.orderitem_set.all()
        return {
            'items': [{
                'id': i.id,
                'product': serialize_product(i.product),
                'quantity': i.quantity,
                'get_total': float(i.get_total),
            } for i in items],
            'order': {
                'id': order.id,
                'get_cart_total': float(order.get_cart_total),
                'get_cart_items': order.get_cart_items,
            },
            'cartItems': order.get_cart_items,
        }
    return {'items': [], 'order': {'get_cart_total': 0, 'get_cart_items': 0}, 'cartItems': 0}

@ensure_csrf_cookie
def apiCsrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

def apiProducts(request):
    products = Product.objects.all()
    return JsonResponse([serialize_product(p) for p in products], safe=False)

def apiProduct(request, pk):
    product = Product.objects.get(id=pk)
    return JsonResponse(serialize_product(product))

def apiUser(request):
    if request.user.is_authenticated:
        ctx = get_order_context(request)
        return JsonResponse({'authenticated': True, 'username': request.user.username, 'email': request.user.email, **ctx})
    return JsonResponse({'authenticated': False})

def apiCart(request):
    return JsonResponse(get_order_context(request))

def apiUpdateItem(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']
    customer = request.user.customer
    product = Product.objects.get(id=productId)
    order, created = Order.objects.get_or_create(customer=customer, complete=False)
    orderItem, created = OrderItem.objects.get_or_create(order=order, product=product)
    if action == 'add':
        orderItem.quantity = (orderItem.quantity + 1)
    elif action == 'remove':
        orderItem.quantity = (orderItem.quantity - 1)
    orderItem.save()
    if orderItem.quantity <= 0:
        orderItem.delete()
    return JsonResponse(get_order_context(request))

def apiLogin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = authenticate(request, username=data['username'], password=data['password'])
        if user is not None:
            login(request, user)
            return JsonResponse(get_order_context(request))
        return JsonResponse({'error': 'Username or Password incorrect'}, status=400)
    return JsonResponse({'error': 'POST required'}, status=405)

@csrf_exempt
def apiGoogleLogin(request):
    """Authenticate or register user using Google ID Token / OAuth."""
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=405)

    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    token = data.get('credential') or data.get('id_token') or data.get('token')
    if not token:
        return JsonResponse({'error': 'Google token is required'}, status=400)

    email = None
    name = None

    try:
        # Validate Google token using Google's official tokeninfo endpoint
        verify_url = f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
        resp = requests.get(verify_url, timeout=10)

        if resp.status_code == 200:
            info = resp.json()
            # Validate issuer
            if info.get('iss') not in ['accounts.google.com', 'https://accounts.google.com']:
                return JsonResponse({'error': 'Invalid Google token issuer'}, status=400)

            # Validate client ID if configured in settings
            configured_client_id = getattr(settings, 'GOOGLE_CLIENT_ID', '')
            if configured_client_id and info.get('aud') != configured_client_id:
                return JsonResponse({'error': 'Google Client ID mismatch'}, status=400)

            # Validate email verification
            email_verified = info.get('email_verified')
            if str(email_verified).lower() not in ['true', '1']:
                return JsonResponse({'error': 'Google email is not verified'}, status=400)

            email = info.get('email')
            name = info.get('name') or info.get('given_name')
        else:
            # Fallback: check if access token was passed
            userinfo_url = f"https://www.googleapis.com/oauth2/v3/userinfo?access_token={token}"
            u_resp = requests.get(userinfo_url, timeout=10)
            if u_resp.status_code == 200:
                info = u_resp.json()
                email = info.get('email')
                name = info.get('name')
            elif settings.DEBUG and (data.get('is_mock') or token.startswith('mock-')):
                # In development mode, allow tested mock payload if Google Cloud is not set up
                email = data.get('email')
                name = data.get('name') or (email.split('@')[0] if email else 'Google User')
                if not email or '@' not in email:
                    return JsonResponse({'error': 'Valid email is required'}, status=400)
            else:
                return JsonResponse({'error': 'Google token verification failed'}, status=400)
    except Exception as e:
        if settings.DEBUG and (data.get('is_mock') or str(token).startswith('mock-')):
            email = data.get('email')
            name = data.get('name') or (email.split('@')[0] if email else 'Google User')
        else:
            return JsonResponse({'error': f'Google verification service error: {str(e)}'}, status=500)

    if not email:
        return JsonResponse({'error': 'Could not extract verified email from Google account'}, status=400)

    # Find existing user or create a new user
    user = User.objects.filter(email=email).first()
    if not user:
        base_username = email.split('@')[0].replace('.', '_').replace('-', '_')
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}_{counter}"
            counter += 1

        user = User.objects.create_user(
            username=username,
            email=email,
            password=User.objects.make_random_password()
        )
        if name:
            parts = name.strip().split(' ', 1)
            user.first_name = parts[0]
            if len(parts) > 1:
                user.last_name = parts[1]
            user.save()

    # Ensure Customer profile exists for checkout and cart tracking
    customer, _ = Customer.objects.get_or_create(
        user=user,
        defaults={'name': name or user.get_full_name() or user.username, 'email': user.email}
    )
    if not customer.name and name:
        customer.name = name
        customer.save()

    # Log the user into Django session
    login(request, user)
    return JsonResponse(get_order_context(request))


def apiRegister(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        email = data['email']
        password = data['password']
        confirm_password = data['confirm_password']
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already taken'}, status=400)
        if password != confirm_password:
            return JsonResponse({'error': 'Passwords do not match'}, status=400)
        user = User.objects.create_user(username=username, email=email, password=password)
        Customer.objects.create(user=user, name=username, email=email)
        login(request, user)
        return JsonResponse(get_order_context(request))
    return JsonResponse({'error': 'POST required'}, status=405)

def apiLogout(request):
    logout(request)
    return JsonResponse({'success': True})

@csrf_exempt
def apiProcessOrder(request):
    """API endpoint: saves shipping info, generates eSewa payment payload."""
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=405)

    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)

    data = json.loads(request.body)
    customer = request.user.customer
    order, _ = Order.objects.get_or_create(customer=customer, complete=False)

    if order.get_cart_items == 0:
        return JsonResponse({'error': 'Cart is empty'}, status=400)

    # Use a stable UUID-based transaction ID
    transaction_id = str(uuid.uuid4())
    order.transaction_id = transaction_id
    order.save()

    # Save shipping address if order requires physical delivery
    shipping = data.get('shipping', {})
    if order.shipping and shipping.get('address'):
        ShippingAddress.objects.create(
            customer=customer,
            order=order,
            address=shipping.get('address', ''),
            city=shipping.get('city', ''),
            state=shipping.get('state', ''),
            zipcode=shipping.get('zipcode', ''),
        )

    # Build eSewa payload — total must be formatted consistently for the signature
    total = float(order.get_cart_total)
    total_str = f"{total:.2f}"
    signature = generate_esewa_signature(total_str, transaction_id, ESEWA_PRODUCT_CODE)

    origin = request.headers.get('origin') or request.headers.get('referer')
    if origin:
        from urllib.parse import urlparse
        parsed = urlparse(origin)
        base_url = f"{parsed.scheme}://{parsed.netloc}"
    else:
        base_url = os.environ.get('FRONTEND_URL', 'http://localhost:3000')

    esewa_data = {
        'amount': total_str,
        'tax_amount': '0',
        'total_amount': total_str,
        'transaction_uuid': transaction_id,
        'product_code': ESEWA_PRODUCT_CODE,
        'product_service_charge': '0',
        'product_delivery_charge': '0',
        'success_url': f'{base_url}/checkout/success',
        'failure_url': f'{base_url}/checkout',
        'signed_field_names': 'total_amount,transaction_uuid,product_code',
        'signature': signature,
    }
    return JsonResponse(esewa_data)


@csrf_exempt
def apiEsewaVerify(request):
    """Called from success page to verify eSewa payment response.
    eSewa redirects to success_url?data=<base64-encoded-JSON>.
    We decode it, verify the HMAC, and mark the order as complete.
    """
    encoded = request.GET.get('data') or (json.loads(request.body or '{}').get('data') if request.method == 'POST' else None)
    if not encoded:
        return JsonResponse({'error': 'Missing data parameter'}, status=400)

    try:
        decoded = base64.b64decode(encoded + '==').decode('utf-8')  # pad to be safe
        payload = _json.loads(decoded)
    except Exception:
        return JsonResponse({'error': 'Invalid data encoding'}, status=400)

    # Required fields from eSewa response
    status = payload.get('status')
    total_amount = payload.get('total_amount')
    transaction_uuid = payload.get('transaction_uuid')
    received_signature = payload.get('signature')

    if status != 'COMPLETE':
        return JsonResponse({'success': False, 'error': f'Payment status: {status}'}, status=400)

    # Verify signature using the payload and signed_field_names
    if not verify_esewa_signature(payload, received_signature):
        return JsonResponse({'success': False, 'error': 'Signature mismatch — possible tampering'}, status=400)

    # Find the order by transaction_id and mark complete
    try:
        order = Order.objects.get(transaction_id=transaction_uuid, complete=False)
        order.complete = True
        order.save()
        return JsonResponse({
            'success': True,
            'transaction_uuid': transaction_uuid,
            'total_amount': total_amount,
            'order_id': order.id,
        })
    except Order.DoesNotExist:
        # Order might already be marked complete (duplicate callback)
        try:
            order = Order.objects.get(transaction_id=transaction_uuid, complete=True)
            return JsonResponse({'success': True, 'already_complete': True, 'order_id': order.id})
        except Order.DoesNotExist:
            return JsonResponse({'error': 'Order not found'}, status=404)

def registerPage(request):
	if request.method == 'POST':
		data = request.POST
		username = data['username']
		email = data['email']
		password = data['password']
		confirm_password = data['confirm_password']

		if password == confirm_password:
			if User.objects.filter(username=username).exists():
				messages.info(request, 'Username already exists')
			elif User.objects.filter(email=email).exists():
				messages.info(request, 'Email already taken')
			else:
				user = User.objects.create_user(username=username, email=email, password=password)
				Customer.objects.create(user=user, name=username, email=email)
				login(request, user)
				return redirect('store')
		else:
			messages.info(request, 'Passwords do not match')

	context = {}
	return render(request, 'store/register.html', context)

def loginPage(request):
	if request.method == 'POST':
		data = request.POST
		username = data['username']
		password = data['password']

		user = authenticate(request, username=username, password=password)

		if user is not None:
			login(request, user)
			return redirect('store')
		else:
			messages.info(request, 'Username or Password incorrect')

	context = {}
	return render(request, 'store/login.html', context)

def logoutUser(request):
	logout(request)
	return redirect('login')
