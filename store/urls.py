from django.urls import path

from . import views

urlpatterns = [
	# Leave as empty string for base url
	path('', views.store, name="store"),
	path('cart/', views.cart, name="cart"),
	path('checkout/', views.checkout, name="checkout"),
	path('update_item/', views.updateItem, name="update_item"),
	path('product/<str:pk>/', views.product_detail, name="product"),
	path('register/', views.registerPage, name="register"),
	path('login/', views.loginPage, name="login"),
	path('logout/', views.logoutUser, name="logout"),

	# API endpoints for Next.js frontend
	path('api/csrf', views.apiCsrf, name="api_csrf"),
	path('api/products', views.apiProducts, name="api_products"),
	path('api/product/<str:pk>', views.apiProduct, name="api_product"),
	path('api/user', views.apiUser, name="api_user"),
	path('api/cart', views.apiCart, name="api_cart"),
	path('api/update_item', views.apiUpdateItem, name="api_update_item"),
	path('api/login', views.apiLogin, name="api_login"),
	path('api/google-login', views.apiGoogleLogin, name="api_google_login"),
	path('api/register', views.apiRegister, name="api_register"),
	path('api/logout', views.apiLogout, name="api_logout"),
	path('api/process_order', views.apiProcessOrder, name="api_process_order"),
	path('api/esewa/verify', views.apiEsewaVerify, name="api_esewa_verify"),
]
