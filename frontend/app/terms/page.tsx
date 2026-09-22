import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          ← Back to Shop
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: September 2026</p>
      </div>

      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Overview</h2>
          <p>
            Welcome to ShopKart. By visiting our store and purchasing products from us, you engage in our service and agree to be bound by the following terms and conditions.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Products & Pricing</h2>
          <p>
            All product prices are listed in Nepalese Rupees (NPR). Prices are subject to change without notice. We reserve the right at any time to modify or discontinue any product.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Orders & Payment</h2>
          <p>
            We accept online payments via eSewa as well as Cash on Delivery (COD). By placing an order, you confirm that the information provided is accurate and complete.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Delivery & Returns</h2>
          <p>
            Deliveries are made across Nepal. If you receive a damaged or incorrect product, please contact our support team within 7 days of delivery for a replacement or refund.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">5. Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to us at{" "}
            <span className="font-semibold text-emerald-600">support@shopkart.np</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
