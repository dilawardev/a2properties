import React, { useEffect, useMemo, useRef, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const phoneRegex = /^[+]?[\d\s\-().]{7,}$/;

const CallbackRequestModal = ({ open, onClose, onSubmit, requestedPerson }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    hp: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setForm({ name: "", phone: "", email: "", message: "", hp: "" });
    setError("");
    setSuccess(false);
    setSubmitting(false);
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => clearTimeout(timer);
  }, [open]);

  const isValid = useMemo(() => {
    const emailOk = !form.email.trim() || emailRegex.test(form.email.trim());
    return form.name.trim().length > 1 && phoneRegex.test(form.phone.trim()) && emailOk;
  }, [form.email, form.name, form.phone]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!isValid) {
      setError("Please enter your name, a valid phone number, and a valid email if provided.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit?.({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase() || undefined,
        message: form.message.trim() || undefined,
        requestedPerson,
        hp: form.hp,
      });
      setSuccess(true);
      setForm({ name: "", phone: "", email: "", message: "", hp: "" });
    } catch (err) {
      setError(err?.message || "Failed to submit callback request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose?.();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="callback-title"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-[#111]/95 px-6 py-6 shadow-[0_26px_120px_rgba(0,0,0,0.7)]"
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-white/5" />
        <div className="relative space-y-5 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Callback</p>
              <h2 id="callback-title" className="mt-1 text-2xl font-semibold">
                Request a callback
              </h2>
              <p className="mt-2 text-sm text-white/65">
                Share your details and our team will contact you shortly.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/20 bg-white/5 p-2 text-white/80 hover:border-white/40 hover:text-white"
              aria-label="Close"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {success ? (
            <div className="rounded-2xl border border-[#7DF5CA]/30 bg-[#7DF5CA]/10 p-5">
              <p className="text-lg font-semibold">Request received</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Thank you. Our team will contact you shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#111]"
              >
                Close
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                ref={firstFieldRef}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address (optional)"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                placeholder="Message (optional)"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
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
              <button
                type="submit"
                disabled={!isValid || submitting}
                className={[
                  "inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#111]",
                  !isValid || submitting ? "cursor-not-allowed opacity-70" : "hover:-translate-y-0.5",
                ].join(" ")}
              >
                {submitting ? "Submitting..." : "Submit request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallbackRequestModal;
