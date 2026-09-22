export type Product = {
  id: number;
  name: string;
  price: number;
  digital: boolean;
  category: string | null;
  description: string | null;
  image: string;
};

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  get_total: number;
};

export type OrderInfo = {
  id: number;
  get_cart_total: number;
  get_cart_items: number;
};

export type CartContext = {
  items: CartItem[];
  order: OrderInfo;
  cartItems: number;
};

export type UserInfo = {
  authenticated: boolean;
  username?: string;
  email?: string;
  items?: CartItem[];
  order?: OrderInfo;
  cartItems?: number;
};
