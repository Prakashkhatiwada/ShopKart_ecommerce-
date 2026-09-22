"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import { fullImageUrl } from "@/lib/api";

export default function CartPage() {
  const { user, cart, setQuantity, removeFromCart, refresh, loading } = useStore();

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!user?.authenticated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-slate-900">Please login to view your cart</h1>
        <p className="mt-2 text-slate-500">You need to be signed in to add items and checkout.</p>
        <Link href="/login" className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
          Login
        </Link>
      </div>
    );
  }

  const items = cart?.items ?? [];
  const total = cart?.order.get_cart_total ?? 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900">Shopping Cart</h1>
      <p className="mt-1 text-sm text-slate-500">{loading ? "Loading..." : `${items.length} item${items.length === 1 ? "" : "s"} in your cart`}</p>

      {!loading && items.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-16 text-center">
          <p className="text-lg font-semibold text-slate-700">Your cart is empty</p>
          <p className="mt-1 text-sm text-slate-500">Browse our products and find something you like.</p>
          <Link href="/#products" className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                <Link href={`/product/${item.product.id}`} className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={fullImageUrl(item.product.image)}
                    alt={item.product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex-1">
                  <Link href={`/product/${item.product.id}`} className="font-semibold text-slate-800 hover:text-emerald-700">
                    {item.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-slate-500">Rs.{item.product.price.toLocaleString()} each</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-emerald-200 bg-emerald-50 p-1">
                    <button
                      onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm hover:bg-emerald-100"
                      aria-label="Decrease"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
                    </button>
                    <span className="min-w-9 text-center text-sm font-bold text-emerald-800">{item.quantity}</span>
                    <button
                      onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm hover:bg-emerald-100"
                      aria-label="Increase"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                    </button>
                  </div>

                  <span className="w-24 text-right font-extrabold text-slate-900">
                    Rs.{item.get_total.toLocaleString()}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-extrabold text-slate-900">Order Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <dt>Subtotal</dt>
                <dd className="font-semibold text-slate-800">Rs.{total.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between text-slate-600">
                <dt>Delivery</dt>
                <dd className="font-semibold text-emerald-700">Free</dd>
              </div>
              <div className="flex justify-between text-slate-600">
                <dt>Tax</dt>
                <dd className="font-semibold text-slate-800">Rs.0</dd>
              </div>
            </dl>
            <div className="my-4 h-px bg-slate-200" />
            <div className="flex justify-between">
              <span className="text-base font-bold text-slate-900">Total</span>
              <span className="text-2xl font-extrabold text-emerald-700">Rs.{total.toLocaleString()}</span>
            </div>
            <Link
              href="/checkout"
              className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-700/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-teal-500 active:translate-y-0 active:scale-[0.98]"
            >
              {/* Glossy light sweep effect */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative">Proceed to Checkout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/#products" className="mt-3 block text-center text-sm font-medium text-slate-500 hover:text-emerald-700">
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
