"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-amber-300" />
            Free Home Delivery Available 
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Shop the Best
            <span className="block text-amber-300">at the Best Prices</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-emerald-50">
            Discover quality products across laptops, gadgets, groceries and more. Pay securely
            with eSewa in just a few clicks.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-base font-bold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
            >
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link
              href="/#categories"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-7 py-3 text-base font-bold text-white transition hover:bg-white/10"
            >
              Browse Categories
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-8 text-white">
            <div>
              <p className="text-2xl font-extrabold">7+</p>
              <p className="text-sm text-emerald-100">Products</p>
            </div>
            <div className="h-10 w-px bg-white/30" />
            <div>
              <p className="text-2xl font-extrabold">100%</p>
              <p className="text-sm text-emerald-100">Secure Payment</p>
            </div>
            <div className="h-10 w-px bg-white/30" />
            <div>
              <p className="text-2xl font-extrabold">24/7</p>
              <p className="text-sm text-emerald-100">Support</p>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl border-8 border-white/20 shadow-2xl">
            <Image
              src="/images/mac_GoOlMnZ.jpg"
              alt="Featured product"
              fill
              sizes="(min-width: 1024px) 400px, 0px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-8 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5" /></svg>
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">Fast Delivery</p>
              <p className="text-xs text-slate-500">Across Nepal</p>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.7a1 1 0 0 0 .9.7l5.9.2-4.6 3.7a1 1 0 0 0-.3 1L17 20l-5-3.6-5 3.6 1.2-5.7a1 1 0 0 0-.3-1L3.3 9.6l5.9-.2a1 1 0 0 0 .9-.7L12 3z" /></svg>
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">eSewa Pay</p>
              <p className="text-xs text-slate-500">Easy checkout</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
