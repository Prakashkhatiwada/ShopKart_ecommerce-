import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      {/* Upper Main Footer */}
      <div className="bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
                  S
                </span>
                <span className="text-lg font-extrabold text-white">ShopKart</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Your one-stop online store in Nepal. Quality products at great prices with secure
                eSewa payment and fast delivery.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Shop</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="hover:text-emerald-400 transition" href="/">All Products</Link></li>
                <li><Link className="hover:text-emerald-400 transition" href="/#categories">Categories</Link></li>
                <li><Link className="hover:text-emerald-400 transition" href="/cart">Cart</Link></li>
                <li><Link className="hover:text-emerald-400 transition" href="/checkout">Checkout</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Account</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="hover:text-emerald-400 transition" href="/login">Login</Link></li>
                <li><Link className="hover:text-emerald-400 transition" href="/register">Register</Link></li>
                <li><Link className="hover:text-emerald-400 transition" href="/cart">My Orders</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Payment</h4>
              <div className="mt-3 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-emerald-700 shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="22" fill="#60BB46" />
                    <path d="M24 8C14 8 7 15 7 24h4c0-7 5-12 13-12v-4zM24 40c-10 0-17-7-17-16h4c0 7 5 12 13 12v4zM41 24h-4c0 7-5 12-13 12v4c10 0 17-7 17-16zM24 8v4c8 0 13 5 13 12h4C41 15 34 8 24 8z" fill="white" />
                  </svg>
                  eSewa
                </span>
                <span className="text-xs text-slate-400">Payments supported</span>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Secure online transactions powered by eSewa. Cash on Delivery (COD) also available across Nepal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer Bottom Bar */}
      <div className="border-t border-slate-200 bg-white py-4 shadow-sm text-slate-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
          
          {/* Left: Cookie icon, Shop Bag icon, Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:justify-start">
            {/* Cookie settings badge */}
            <button
              type="button"
              title="Cookie Preferences"
              aria-label="Cookie Preferences"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 transition transform hover:scale-105 shadow-sm shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-.34-.02-.67-.06-1-.54.34-1.18.54-1.87.54-1.93 0-3.5-1.57-3.5-3.5 0-.7.21-1.34.56-1.88-.34-.08-.7-.12-1.06-.12-2.48 0-4.5-2.02-4.5-4.5 0-.57.11-1.11.31-1.61C12.63 2.05 12.32 2 12 2zm-3.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-2 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm2.5-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
              </svg>
            </button>

            {/* Shopping Bag icon */}
            <Link
              href="/"
              title="ShopKart"
              aria-label="ShopKart Home"
              className="flex h-8 w-8 items-center justify-center text-black hover:opacity-80 transition shrink-0"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6V5a4 4 0 0 0-8 0v1H4v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6h-4zm-6-1a2 2 0 0 1 4 0v1h-4V5zm3.7 10.2c-.3.2-.8.4-1.4.4-.7 0-1.2-.2-1.6-.6-.4-.4-.6-.9-.6-1.5h1.3c0 .3.1.5.3.7.2.2.5.2.8.2.3 0 .6-.1.8-.2.2-.1.3-.3.3-.6 0-.2-.1-.4-.3-.5-.1-.1-.4-.2-.8-.3l-.8-.2c-.6-.2-1.1-.4-1.4-.7-.3-.3-.5-.7-.5-1.2 0-.6.2-1.1.7-1.5.5-.4 1.1-.6 1.8-.6.7 0 1.2.2 1.6.5.4.3.7.8.7 1.4h-1.3c0-.3-.1-.5-.3-.7-.2-.1-.5-.2-.7-.2-.3 0-.5.1-.7.2-.2.1-.3.3-.3.5 0 .2.1.4.3.5.1.1.4.2.8.3l.7.2c.7.2 1.2.5 1.5.8.3.3.5.8.5 1.3 0 .7-.3 1.3-.8 1.7z"/>
              </svg>
            </Link>

            {/* Terms of Service */}
            <Link
              href="/terms"
              className="text-sm font-normal text-slate-600 hover:text-slate-950 hover:underline transition"
            >
              Terms of Service
            </Link>

            {/* Privacy Policy */}
            <Link
              href="/privacy"
              className="text-sm font-normal text-slate-600 hover:text-slate-950 hover:underline transition"
            >
              Privacy Policy
            </Link>

            <span className="hidden lg:inline text-xs text-slate-400">
              © {currentYear} ShopKart
            </span>
          </div>

          {/* Right: Social Media Icons */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 transition transform hover:scale-105 shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 transition transform hover:scale-105 shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 transition transform hover:scale-105 shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 transition transform hover:scale-105 shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 transition transform hover:scale-105 shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.76 1.33-.03 2.54-.79 3.03-2.01.24-.55.33-1.16.32-1.75.02-4.94.01-9.88.01-14.82z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 transition transform hover:scale-105 shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-slate-800 transition transform hover:scale-105 shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.367-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
