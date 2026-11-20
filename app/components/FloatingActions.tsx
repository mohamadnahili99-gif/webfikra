"use client";

import { useEffect, useState } from "react";

export default function FloatingActions({ arabic }: { arabic: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 720);
    window.addEventListener("scroll", update, { passive: true });
    // The initial state is intentionally false to avoid hydration differences.
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <aside aria-label={arabic ? "اختصارات الموقع" : "Quick actions"} className="pointer-events-none fixed bottom-5 end-4 z-[60] flex flex-col items-center gap-3 sm:bottom-7 sm:end-7">
      {scrolled && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
          aria-label={arabic ? "العودة إلى أعلى الصفحة" : "Back to top"}
          className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#2c2119] text-xl text-[#ffbd83] shadow-lg transition hover:-translate-y-1 hover:bg-[#47301e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3a66e]"
        >
          ↑
        </button>
      )}
      <a
        href="https://wa.me/96171524556"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={arabic ? "تواصل مع WEBFIKRA عبر واتساب" : "Contact WEBFIKRA on WhatsApp"}
        title={arabic ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
        className="pointer-events-auto grid h-[58px] w-[58px] place-items-center rounded-full border-[3px] border-white bg-[#1bca64] text-white shadow-[0_10px_34px_rgba(8,110,54,.35)] transition hover:-translate-y-1 hover:bg-[#17b65a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3a66e]"
      >
        <svg aria-hidden="true" viewBox="0 0 32 32" fill="currentColor" width="31" height="31">
          <path d="M16.04 3.15c-7.1 0-12.86 5.75-12.87 12.85a12.75 12.75 0 0 0 1.72 6.44L3.1 29l7.54-2.48a12.86 12.86 0 0 0 5.4 1.17h.01c7.1 0 12.86-5.76 12.86-12.87A12.74 12.74 0 0 0 16.04 3.15Zm0 22.34h-.01a10.6 10.6 0 0 1-5.22-1.42l-.38-.23-4.48 1.48 1.46-4.36-.25-.4a10.57 10.57 0 0 1-1.62-5.56c0-5.86 4.77-10.63 10.64-10.63a10.63 10.63 0 0 1 0 21.26Zm5.85-7.96c-.32-.16-1.89-.94-2.18-1.04-.3-.11-.5-.16-.72.16-.21.32-.83 1.03-1.01 1.24-.19.21-.37.24-.7.08-.32-.16-1.35-.5-2.58-1.6-.96-.86-1.61-1.91-1.8-2.23-.18-.32-.02-.49.15-.65.14-.14.32-.38.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.36-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.55.08-.83.4-.29.32-1.09 1.06-1.09 2.59s1.12 3.01 1.27 3.22c.16.21 2.2 3.36 5.34 4.71.75.32 1.34.51 1.8.66.76.24 1.45.2 2 .12.6-.09 1.89-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"/>
        </svg>
      </a>
    </aside>
  );
}
