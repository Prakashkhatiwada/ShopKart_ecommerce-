"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { api } from "@/lib/api";
import { useStore } from "@/context/StoreContext";

function VerifyPayment() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const { refresh } = useStore();
  const [status, setStatus] = useState<"loading" | "success" | "error">(data ? "loading" : "error");
  const [message, setMessage] = useState(data ? "" : "Invalid payment response. Missing data parameter.");

  useEffect(() => {
    if (!data) return;

    let isMounted = true;
    api
      .esewaVerify(data)
      .then((res: Record<string, unknown>) => {
        if (!isMounted) return;
        if (res.success || res.already_complete) {
          setStatus("success");
          refresh(); // refresh the cart so it's empty
        } else {
          setStatus("error");
          setMessage(typeof res.error === "string" ? res.error : "Payment verification failed.");
        }
      })
      .catch((err: Error) => {
        if (!isMounted) return;
        setStatus("error");
        setMessage(err.message || "Failed to verify payment with server.");
      });

    return () => {
      isMounted = false;
    };
  }, [data, refresh]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-emerald-600" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-slate-900">Verifying Payment...</h1>
        <p className="mt-3 text-slate-600">Please wait while we confirm your transaction with eSewa.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-slate-900">Payment Failed</h1>
        <p className="mt-3 text-red-600">{message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/checkout"
            className="inline-flex rounded-full bg-slate-800 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-900 transition"
          >
            Try Again
          </Link>
          <Link
            href="/#products"
            className="inline-flex rounded-full bg-slate-100 px-6 py-3 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-200 transition"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
      </div>
      <h1 className="mt-6 text-3xl font-extrabold text-slate-900">Payment Successful!</h1>
      <p className="mt-3 text-slate-600">
        Thank you for your order. Your payment has been confirmed and we have started processing
        your order right away.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/#products"
          className="inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="h-20 w-20 mx-auto rounded-full bg-slate-100 animate-pulse"></div>
      </div>
    }>
      <VerifyPayment />
    </Suspense>
  );
}
