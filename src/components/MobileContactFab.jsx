import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const contactActions = [
  {
    key: "whatsapp",
    href: "https://wa.me/971588314825",
    external: true,
    labelKey: "buttons.contact_whatsapp",
    fallback: "WhatsApp",
    className:
      "border-emerald-400/40 bg-emerald-400/15 text-emerald-100 hover:border-emerald-300/70 hover:bg-emerald-400/20 focus-visible:ring-emerald-300/60",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.01 0C5.39 0 .03 5.37 0 12c0 2.11.55 4.17 1.6 6.01L0 24l6.16-1.57A11.97 11.97 0 0 0 24 12c0-3.19-1.24-6.19-3.48-8.52ZM12 21.86c-1.9 0-3.76-.51-5.39-1.47l-.39-.23-3.66.93.98-3.56-.25-.37A9.88 9.88 0 0 1 2.1 12C2.1 6.53 6.55 2.1 12.01 2.1c2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.99c0 5.46-4.44 9.87-9.88 9.87Zm5.72-7.39c-.31-.16-1.84-.91-2.13-1.02-.29-.1-.5-.16-.71.16-.21.31-.82 1.02-1.01 1.23-.19.21-.37.23-.68.08-.31-.16-1.33-.49-2.53-1.56-.94-.84-1.58-1.87-1.76-2.18-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.63-.53-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.04 1.29 3.25c.16.21 2.22 3.39 5.38 4.75.75.32 1.33.51 1.78.65.75.24 1.43.2 1.97.12.6-.09 1.84-.75 2.1-1.47.26-.72.26-1.34.18-1.47-.08-.13-.29-.21-.6-.37Z" />
      </svg>
    ),
  },
  {
    key: "email",
    href: "mailto:info@a2properties.ae",
    labelKey: "buttons.contact_email",
    fallback: "Email",
    className:
      "border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/15 focus-visible:ring-white/40",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 8l8 5 8-5" />
        <path d="M4 8v10h16V8" />
      </svg>
    ),
  },
  {
    key: "phone",
    href: "tel:+971588314825",
    labelKey: "sections.property_listings_call",
    fallback: "Call",
    className:
      "border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/15 focus-visible:ring-white/40",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.59 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.11a2 2 0 0 1 2.11-.45c.8.27 1.64.47 2.5.59A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
];

const MobileContactFab = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <div ref={rootRef} className="fixed bottom-24 right-6 z-50 hidden max-[819px]:block">
      <div className="absolute bottom-16 right-0 flex flex-col items-end gap-2">
        {contactActions.map((action, index) => (
          <a
            key={action.key}
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noreferrer" : undefined}
            aria-label={t(action.labelKey, action.fallback)}
            title={t(action.labelKey, action.fallback)}
            onClick={() => setIsOpen(false)}
            className={[
              "grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md shadow-[0_14px_40px_rgba(0,0,0,0.45)]",
              "transition-all duration-300 ease-out active:translate-y-0 focus-visible:outline-none focus-visible:ring-2",
              action.className,
              isOpen
                ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
                : "translate-y-3 scale-90 opacity-0 pointer-events-none",
            ].join(" ")}
            style={{ transitionDelay: isOpen ? `${index * 70}ms` : "0ms" }}
          >
            {action.icon}
            <span className="sr-only">{t(action.labelKey, action.fallback)}</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={t("nav.contact")}
        aria-expanded={isOpen}
        className={[
          "grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/75 text-white backdrop-blur-md",
          "shadow-[0_14px_40px_rgba(0,0,0,0.5)] transition-all duration-300",
          "hover:bg-black/85 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        ].join(" ")}
      >
        <svg
          className="h-5 w-5 transition-transform duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          {isOpen ? (
            <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <>
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
              <path d="M8 9h8M8 13h5" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
};

export default MobileContactFab;
