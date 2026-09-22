"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";
import type { Product } from "@/lib/types";

type Category = { name: string; count: number };

function ProductsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    api
      .products()
      .then((data) => setProducts(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo<Category[]>(() => {
    const map = new Map<string, number>();
    for (const p of products) {
      const name = p.category || "Other";
      map.set(name, (map.get(name) ?? 0) + 1);
    }
    return [{ name: "All", count: products.length }, ...[...map.entries()].map(([name, count]) => ({ name, count }))];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = activeCategory === "All" || (p.category || "Other") === activeCategory;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false) ||
        (p.category?.toLowerCase().includes(q) ?? false);
      return matchesCategory && matchesQuery;
    });
  }, [products, query, activeCategory]);

  const CategoryPill = ({ cat }: { cat: Category }) => (
    <button
      onClick={() => setActiveCategory(cat.name)}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
        activeCategory === cat.name
          ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
          : "border-slate-300 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-700"
      }`}
    >
      {cat.name} <span className="ml-1 text-xs opacity-70">{cat.count}</span>
    </button>
  );

  return (
    <div>
      <Hero />

      <section id="categories" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <span className="text-sm font-semibold text-slate-500">Categories:</span>
          {categories.map((cat) => (
            <CategoryPill key={cat.name} cat={cat} />
          ))}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {query ? `Results for "${query}"` : "Featured Products"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {loading ? "Loading products..." : `${filtered.length} product${filtered.length === 1 ? "" : "s"} available`}
            </p>
          </div>
          {query && (
            <button
              onClick={() => router.replace("/")}
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            <p className="font-semibold">Could not load products</p>
            <p className="mt-1 text-sm">{error}. Make sure the Django backend is running on port 8000.</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="aspect-square bg-slate-200" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-5 w-1/3 rounded bg-slate-200" />
                  <div className="h-9 w-full rounded-full bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-lg font-semibold text-slate-700">No products found</p>
            <p className="mt-1 text-sm text-slate-500">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i === 0} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="aspect-square bg-slate-200" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-5 w-1/3 rounded bg-slate-200" />
                  <div className="h-9 w-full rounded-full bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <ProductsView />
    </Suspense>
  );
}
