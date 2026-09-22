"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { api, fullImageUrl } from "@/lib/api";

const ESEWA_GATEWAY = "https://rc.esewa.com.np/api/epay/main/v2/form";

export default function CheckoutPage() {
  const { user, cart, refresh, loading } = useStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!user?.authenticated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Please login to checkout</h1>
        <p className="mt-2 text-slate-500">Login or create an account to complete your order.</p>
        <Link href="/login" className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
          Login
        </Link>
      </div>
    );
  }

  const items = cart?.items ?? [];
  const total = cart?.order.get_cart_total ?? 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.address || !form.city) {
      setError("Please fill in your shipping address and city.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const esewaData = await api.processOrder({
        form: { total },
        shipping: form,
      });

      const formEl = document.createElement("form");
      formEl.method = "POST";
      formEl.action = ESEWA_GATEWAY;
      Object.entries(esewaData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        formEl.appendChild(input);
      });
      document.body.appendChild(formEl);
      formEl.submit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900">Checkout</h1>
      <p className="mt-1 text-sm text-slate-500">Complete your order with secure eSewa payment.</p>

      {!loading && items.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-16 text-center">
          <p className="text-lg font-semibold text-slate-700">Your cart is empty</p>
          <Link href="/#products" className="mt-4 inline-flex rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900">Shipping Information</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Address *</span>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="e.g. Kalanki, Kathmandu"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">City *</span>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Kathmandu"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">State / Province</span>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Bagmati"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">Zip / Postal Code</span>
                  <input
                    type="text"
                    value={form.zipcode}
                    onChange={(e) => setForm({ ...form, zipcode: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="44600"
                  />
                </label>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900">Payment Method</h2>
              <div className="mt-4 flex items-center gap-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="22" fill="#60BB46" />
                    <path d="M24 8C14 8 7 15 7 24h4c0-7 5-12 13-12v-4zM24 40c-10 0-17-7-17-16h4c0 7 5 12 13 12v4zM41 24h-4c0 7-5 12-13 12v4c10 0 17-7 17-16zM24 8v4c8 0 13 5 13 12h4C41 15 34 8 24 8z" fill="white" />
                  </svg>
                </span>
                <div>
                  <p className="font-bold text-slate-900">eSewa Online Payment</p>
                  <p className="text-xs text-slate-500">
                    You will be redirected to eSewa to complete the payment securely.
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">Selected</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || items.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-4 text-base font-bold text-white shadow-lg transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Redirecting to eSewa...
                </>
              ) : (
                <>
                  Pay Rs.{total.toLocaleString()} with eSewa
                </>
              )}
            </button>
          </form>

          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-extrabold text-slate-900">Order Items</h2>
            <div className="mt-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={fullImageUrl(item.product.image)}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{item.product.name}</p>
                    <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-800">Rs.{item.get_total.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="my-4 h-px bg-slate-200" />
            <div className="flex justify-between">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-xl font-extrabold text-emerald-700">Rs.{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
