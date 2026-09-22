"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api, fullImageUrl } from "@/lib/api";
import { useStore } from "@/context/StoreContext";
import type { Product } from "@/lib/types";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { user, addToCart, setQuantity, cart, refresh } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<{ id: string; message: string } | null>(null);
  const [adding, setAdding] = useState(false);
  const [related, setRelated] = useState<Product[]>([]);

  const isLoading =
    (product === null || String(product.id) !== id) && (error === null || error.id !== id);
  const currentError = error && error.id === id ? error.message : null;

  useEffect(() => {
    let cancelled = false;
    api
      .product(id)
      .then(async (p) => {
        if (cancelled) return;
        setProduct(p);
        const all = await api.products();
        if (cancelled) return;
        const sameCategory = all.filter((x) => x.id !== p.id && x.category === p.category);
        const rest = all.filter((x) => x.id !== p.id && x.category !== p.category);
        setRelated([...sameCategory, ...rest].slice(0, 4));
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) {
          setError({ id, message: err instanceof Error ? err.message : "Product not found" });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="aspect-square rounded-3xl bg-slate-200" />
          <div className="space-y-4 py-4">
            <div className="h-5 w-24 rounded bg-slate-200" />
            <div className="h-10 w-3/4 rounded bg-slate-200" />
            <div className="h-8 w-32 rounded bg-slate-200" />
            <div className="h-28 w-full rounded bg-slate-200" />
            <div className="h-12 w-full rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (currentError || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-semibold text-slate-700">Product not found</p>
        <p className="mt-1 text-sm text-slate-500">{currentError}</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
          Back to Store
        </Link>
      </div>
    );
  }

  const inCart = cart?.items.find((i) => i.product.id === product.id);
  const quantity = inCart?.quantity ?? 0;

  const handleAdd = async () => {
    if (!user?.authenticated) {
      window.location.href = `/login?next=/product/${product.id}`;
      return;
    }
    setAdding(true);
    try {
      await addToCart(product.id);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <Image
            src={fullImageUrl(product.image)}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col">
          {product.category && (
            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {product.category}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-extrabold text-emerald-700">Rs.{product.price.toLocaleString()}</span>
            {product.digital && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Digital Product</span>
            )}
          </div>

          <div className="my-6 h-px bg-slate-200" />

          <p className="leading-relaxed text-slate-600">
            {product.description || "No description available for this product."}
          </p>

          <div className="mt-8">
            {quantity > 0 ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-full border border-emerald-200 bg-emerald-50 p-1">
                  <button
                    onClick={() => setQuantity(product.id, quantity - 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm hover:bg-emerald-100 transition"
                    aria-label="Decrease quantity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
                  </button>
                  <span className="min-w-12 text-center text-lg font-bold text-emerald-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(product.id, quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm hover:bg-emerald-100 transition"
                    aria-label="Increase quantity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                </div>
                <Link
                  href="/cart"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-7 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg active:scale-95"
                >
                  <span>Go to Cart</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                disabled={adding}
                className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 px-10 py-4 text-base font-bold text-white shadow-lg shadow-emerald-700/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-teal-500 active:translate-y-0 active:scale-[0.98] disabled:opacity-60 cursor-pointer sm:w-auto"
              >
                {/* Glossy light sweep / shimmer animation on hover */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

                {/* Animated Cart Bag Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg] group-hover:scale-110"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>

                <span className="relative tracking-wide">
                  {adding ? "Adding..." : user?.authenticated ? "Add to Cart" : "Login to Add to Cart"}
                </span>

                {/* Subtle arrow glide on hover */}
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
                  className="opacity-75 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            )}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: "truck", title: "Fast Delivery", desc: "2-4 days in Nepal" },
              { icon: "shield", title: "Secure Payment", desc: "eSewa & COD" },
              { icon: "refresh", title: "Easy Returns", desc: "7 day guarantee" },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                <p className="text-sm font-semibold text-slate-800">{f.title}</p>
                <p className="mt-1 text-xs text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-extrabold text-slate-900">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {related.map((p) => (
              <div key={p.id}>
                <ProductCardFallbackLink product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ProductCardFallbackLink({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={fullImageUrl(product.image)}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-emerald-700">{product.name}</p>
        <p className="mt-1 font-bold text-emerald-700">Rs.{product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
