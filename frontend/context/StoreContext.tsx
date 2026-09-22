"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { CartContext, UserInfo } from "@/lib/types";

type StoreState = {
  user: UserInfo | null;
  cart: CartContext | null;
  cartItems: number;
  loading: boolean;
  refresh: () => Promise<void>;
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  setQuantity: (productId: number, quantity: number) => Promise<void>;
  login: (username: string, password: string) => Promise<UserInfo>;
  googleLogin: (credential: string, extraData?: Record<string, unknown>) => Promise<UserInfo>;
  register: (data: { username: string; email: string; password: string; confirm_password: string }) => Promise<UserInfo>;
  logout: () => Promise<void>;
};

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [cart, setCart] = useState<CartContext | null>(null);
  const [loading, setLoading] = useState(true);

  const applyUser = (data: UserInfo) => {
    setUser(data);
    if (data.authenticated && data.cartItems !== undefined) {
      setCart({
        items: data.items ?? [],
        order: data.order ?? { id: 0, get_cart_total: 0, get_cart_items: 0 },
        cartItems: data.cartItems,
      });
    } else {
      setCart({ items: [], order: { id: 0, get_cart_total: 0, get_cart_items: 0 }, cartItems: 0 });
    }
  };

  const refresh = useCallback(async () => {
    try {
      await api.ensureCsrf();
      const data = await api.user();
      applyUser(data);
    } catch {
      setUser({ authenticated: false });
      setCart({ items: [], order: { id: 0, get_cart_total: 0, get_cart_items: 0 }, cartItems: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await api.ensureCsrf();
        const data = await api.user();
        if (cancelled) return;
        applyUser(data);
      } catch {
        if (!cancelled) {
          setUser({ authenticated: false });
          setCart({ items: [], order: { id: 0, get_cart_total: 0, get_cart_items: 0 }, cartItems: 0 });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addToCart = useCallback(async (productId: number) => {
    const data = await api.updateItem(productId, "add");
    setCart(data);
  }, []);

  const removeFromCart = useCallback(async (productId: number) => {
    const data = await api.updateItem(productId, "remove");
    setCart(data);
  }, []);

  const setQuantity = useCallback(async (productId: number, quantity: number) => {
    const ctx = await api.cart();
    const item = ctx.items.find((i) => i.product.id === productId);
    if (!item) return;
    const diff = quantity - item.quantity;
    for (let i = 0; i < Math.abs(diff); i++) {
      const data = await api.updateItem(productId, diff > 0 ? "add" : "remove");
      ctx.items = data.items;
      ctx.order = data.order;
      ctx.cartItems = data.cartItems;
    }
    setCart({ ...ctx });
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const data = await api.login(username, password);
    applyUser(data);
    return data;
  }, []);

  const googleLogin = useCallback(async (credential: string, extraData?: Record<string, unknown>) => {
    const data = await api.googleLogin(credential, extraData);
    applyUser(data);
    return data;
  }, []);

  const register = useCallback(
    async (data: { username: string; email: string; password: string; confirm_password: string }) => {
      const result = await api.register(data);
      applyUser(result);
      return result;
    },
    []
  );

  const logout = useCallback(async () => {
    await api.logout();
    setUser({ authenticated: false });
    setCart({ items: [], order: { id: 0, get_cart_total: 0, get_cart_items: 0 }, cartItems: 0 });
  }, []);

  const value = useMemo<StoreState>(
    () => ({
      user,
      cart,
      cartItems: cart?.cartItems ?? 0,
      loading,
      refresh,
      addToCart,
      removeFromCart,
      setQuantity,
      login,
      googleLogin,
      register,
      logout,
    }),
    [user, cart, loading, refresh, addToCart, removeFromCart, setQuantity, login, googleLogin, register, logout]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
