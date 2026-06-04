import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CallbackRequestModal from "../../../components/CallbackRequestModal.jsx";
import { submitCallbackRequest } from "../../../api/notifications.js";
import companyStats from "../../../data/companyStats.js";

const pillars = [
  {
    title: "Advisory first",
    body: "We pair market intelligence with tailored guidance, helping clients buy, sell, and invest with clarity.",
  },
  {
    title: "Global reach, local focus",
    body: "Our Dubai roots and international network keep us close to every opportunity, from luxury launches to off-plan gems.",
  },
  {
    title: "Design + data",
    body: "We combine storytelling, architecture, and analytics to present properties with intention and accuracy.",
  },
];

const leadership = [
  {
    name: "Abdullah Al Hashimi",
    title: "Chief Executive Officer",
    image: "/assets/images/CEO/IMG_1493.jpeg",
    message:
      "Our mission is to make Dubai real estate feel clear, discreet, and dependable for every client we serve.",
    blurb:
      "Steers A2 Properties with a focus on disciplined growth, transparent partnerships, and investor-first execution across Dubai’s prime districts.",
  },
];

const About = () => {
  const { t, i18n } = useTranslation();
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackPerson, setCallbackPerson] = useState("");

  const openCallbackModal = (person = "") => {
    setCallbackPerson(person);
    setCallbackOpen(true);
  };

  const handleCallbackSubmit = (payload) => {
    return submitCallbackRequest({
      ...payload,
      source:
        callbackPerson === "Leadership meeting"
          ? "About Leadership Meeting"
          : "About Leadership",
      language: i18n?.language || "en",
    });
  };

  const ceo = leadership[0];

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#141414] via-[#0f1013] to-[#090b0c] px-6 sm:px-10 py-12 sm:py-16 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        <div className="absolute -left-24 -top-24 h-64 w-64 bg-[#7DF5CA]/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 bg-white/5 blur-[120px]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr,1fr] items-center">
          <div className="space-y-5 text-white">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">About A2 Properties</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              A trusted real estate partner grounded in Dubai, connected worldwide.
            </h1>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed">
              We help investors, homeowners, and developers navigate Dubai's most dynamic neighborhoods. From off-plan
              launches to premium resales, our team pairs data, design, and deep market knowledge to deliver clarity and
              confidence at every step.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@a2properties.ae"
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-semibold shadow hover:bg-gray-200 transition"
              >
                Talk to our team
              </a>
              <a
                href="/properties"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                View listings
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {companyStats.map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-white shadow-[0_16px_50px_rgba(0,0,0,0.4)]"
              >
                <p className="text-2xl sm:text-3xl font-semibold">
                  {item.value}
                  <span className="ml-1 text-base font-semibold">
                    {t(`sections.why_choose_us_items.${item.key}_suffix`)}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-white/60 mt-1 leading-snug">
                  {t(`sections.why_choose_us_items.${item.key}_title`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

   

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1013] via-[#0b0c0f] to-black text-white shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[#7DF5CA]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-white/5 blur-[120px]" />

        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">
                Leadership
              </p>
              <div className="space-y-3">
                <h3 className="text-3xl font-semibold leading-tight sm:text-4xl">
                  Message from the CEO
                </h3>
                <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
                  “{ceo.message}”
                </p>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                {ceo.blurb}
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-2xl font-semibold leading-tight">{ceo.name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-white/50">
                  {ceo.title}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openCallbackModal(ceo.name)}
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow transition hover:bg-gray-200"
                >
                  Request a callback
                </button>
                <a
                  href={`mailto:info@a2properties.ae?subject=Meeting%20request%20with%20${encodeURIComponent(
                    ceo.name
                  )}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Email CEO office
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:min-h-[560px]">
            <img
              src={ceo.image}
              alt={ceo.name}
              className="absolute inset-0 h-full w-full object-cover object-bottom"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-md">
              <p className="text-sm font-semibold">{ceo.name}</p>
              <p className="text-xs text-white/65">{ceo.title}</p>
            </div>
          </div>
        </div>
      </section>

      <CallbackRequestModal
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
        onSubmit={handleCallbackSubmit}
        requestedPerson={callbackPerson}
      />

    </div>
  );
};

export default About;
