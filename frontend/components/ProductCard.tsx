"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { fullImageUrl } from "@/lib/api";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { user, addToCart, setQuantity, cart } = useStore();
  const router = useRouter();
  const [adding, setAdding] = useState(false);

  const inCart = cart?.items.find((i) => i.product.id === product.id);
  const quantity = inCart?.quantity ?? 0;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.authenticated) {
      router.push(`/login?next=/product/${product.id}`);
      return;
    }
    setAdding(true);
    try {
      await addToCart(product.id);
    } finally {
      setAdding(false);
    }
  };

  const handleQty = async (e: React.MouseEvent, delta: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.authenticated) {
      router.push("/login");
      return;
    }
    await setQuantity(product.id, quantity + delta);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-slate-100">
        <Image
          src={fullImageUrl(product.image)}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
            {product.category}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.id}`} className="line-clamp-1 font-semibold text-slate-800 hover:text-emerald-700">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-extrabold text-emerald-700">Rs.{product.price.toLocaleString()}</span>
        </div>

        <div className="mt-3">
          {quantity > 0 ? (
            <div className="flex items-center justify-between rounded-full border border-emerald-200 bg-emerald-50 p-1">
              <button
                onClick={(e) => handleQty(e, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm hover:bg-emerald-100 transition"
                aria-label="Decrease quantity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
              </button>
              <span className="text-sm font-bold text-emerald-800">{quantity}</span>
              <button
                onClick={(e) => handleQty(e, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm hover:bg-emerald-100 transition"
                aria-label="Increase quantity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              disabled={adding}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 py-2.5 px-4 text-sm font-semibold text-white shadow-md shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-teal-500 active:translate-y-0 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              {/* Glossy light sweep effect */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              
              {/* Cart Icon with hover micro-interaction */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg] group-hover:scale-110"
              >
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>

              <span className="relative">
                {adding ? "Adding..." : "Add to Cart"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
