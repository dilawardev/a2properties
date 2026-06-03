import React, { useEffect, useMemo, useRef, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const NewsletterSubscribeModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({ name: "", email: "", hp: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    setForm({ name: "", email: "", hp: "" });
    setError("");
    setSuccess(false);
    setSubmitting(false);

    const timer = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const trapFocus = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll(focusableSelector);
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [onClose, open]);

  const isValid = useMemo(() => emailRegex.test(form.email.trim()), [form.email]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!isValid) {
      setError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit?.({
        email: form.email.trim().toLowerCase(),
        name: form.name.trim() || undefined,
        hp: form.hp,
      });
      setSuccess(true);
      setForm({ name: "", email: "", hp: "" });
    } catch (err) {
      setError(err?.message || "Subscription failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose?.();
  };

  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={handleOverlayClick}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#111]/95 px-6 py-6 sm:px-8 shadow-[0_26px_120px_rgba(0,0,0,0.7)]"
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-white/5" />
            <div className="relative space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                    Newsletter
                  </p>
                  <h2 id="newsletter-title" className="text-2xl font-semibold text-white">
                    Stay updated
                  </h2>
                  <p className="text-sm text-white/65">
                    Get Dubai market updates, property news, and curated investment insights.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/20 bg-white/5 p-2 text-white/80 hover:text-white hover:border-white/40 transition"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  ref={firstFieldRef}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/15"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/15"
                />
                <input
                  type="text"
                  name="hp"
                  value={form.hp}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {error ? <p className="text-sm text-rose-300">{error}</p> : null}
                {success ? (
                  <p className="text-sm text-[#7DF5CA]">
                    Subscribed successfully. We will keep you updated.
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className={[
                    "w-full inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-[#111] bg-white transition-all duration-200",
                    submitting || !isValid
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:-translate-y-0.5 active:translate-y-0",
                  ].join(" ")}
                >
                  {submitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NewsletterSubscribeModal;
