import Link from "next/link";

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: September 2026</p>
      </div>

      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Information We Collect</h2>
          <p>
            When you browse or make a purchase on ShopKart, we collect personal information you give us such as your name, address, phone number, and email address to process orders and deliver products.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. How We Use Your Information</h2>
          <p>
            We use your personal data to fulfill orders, process payments, provide customer support, and communicate important updates regarding your shipments.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Cookies & Tracking</h2>
          <p>
            We use cookies to maintain your shopping cart, remember your login session, and analyze website traffic to improve user experience. You can adjust your cookie settings at any time.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Payment Security</h2>
          <p>
            We do not store your payment credentials directly. All digital transactions are securely routed through certified gateways such as eSewa.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">5. Contact Us</h2>
          <p>
            For privacy inquiries or data requests, contact us at{" "}
            <span className="font-semibold text-emerald-600">privacy@shopkart.np</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
