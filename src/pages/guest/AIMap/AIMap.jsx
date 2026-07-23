import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GradientButton from "../../../components/GradientButton.jsx";

const AIMapPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      key: "live",
      title: t("sections.ai_map_page.features.live.title"),
      body: t("sections.ai_map_page.features.live.body"),
      accent: "from-[#7DF5CA]/70 via-[#7DF5CA]/40 to-transparent",
    },
    {
      key: "filters",
      title: t("sections.ai_map_page.features.filters.title"),
      body: t("sections.ai_map_page.features.filters.body"),
      accent: "from-[#7CC7FF]/60 via-[#7CC7FF]/30 to-transparent",
    },
    {
      key: "workflows",
      title: t("sections.ai_map_page.features.workflows.title"),
      body: t("sections.ai_map_page.features.workflows.body"),
      accent: "from-[#F5D76E]/60 via-[#F5D76E]/30 to-transparent",
    },
  ];

  const steps = t("sections.ai_map_page.steps", { returnObjects: true });

  const mapUrl = "https://a2-properties.map.estate/en/map/uae-dubai/projects";

  return (
    <div className="space-y-12 sm:space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#141414] via-[#0f1013] to-[#090b0c] px-6 sm:px-10 py-12 sm:py-16 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        <div className="absolute -left-24 -top-24 h-64 w-64 bg-[#7DF5CA]/[0.12] blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 bg-white/10 blur-[140px]" />
        <div className="absolute -right-16 -bottom-24 h-64 w-64 bg-[#7CC7FF]/10 blur-[120px]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr,0.85fr] items-center">
          <div className="space-y-5 text-white">
            <p className="text-xs uppercase tracking-[0.22em] text-white/60">
              {t("sections.ai_map_page.kicker")}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              {t("sections.ai_map_page.heading")}
            </h1>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed">
              {t("sections.ai_map_page.subheading")}
            </p>

            <div className="flex flex-wrap gap-3">
              {["pill_realtime", "pill_verified", "pill_shareable"].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-white/80 backdrop-blur"
                >
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                  {t(`sections.ai_map_page.${pill}`)}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <GradientButton to="/contact-us">
                {t("sections.ai_map_page.cta_primary")}
              </GradientButton>
              <Link
                to="/properties"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/25 text-sm font-semibold text-white bg-white/5 transition-all hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0"
              >
                {t("sections.ai_map_page.cta_secondary")}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 space-y-4 shadow-[0_18px_70px_rgba(0,0,0,0.45)]">
            <p className="text-sm uppercase tracking-[0.16em] text-white/60">
              {t("sections.ai_map_page.steps_title")}
            </p>
            <ul className="space-y-3 text-white">
              {Array.isArray(steps)
                ? steps.map((step, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-white/80">
                        {index + 1}
                      </span>
                      <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                        {step}
                      </p>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.key}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 text-white shadow-[0_18px_70px_rgba(0,0,0,0.4)] transition-transform duration-200 hover:-translate-y-1"
          >
            <div
              className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${feature.accent}`}
            />
            <div className="relative space-y-2">
              <p className="text-lg font-semibold">{feature.title}</p>
              <p className="text-sm text-white/75 leading-relaxed">{feature.body}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
              {t("sections.ai_map_page.kicker")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              {t("sections.ai_map_page.map_section_title")}
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              {t("sections.ai_map_page.map_section_subtitle")}
            </p>
          </div>

          <div className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
            {t("sections.ai_map_page.pill_realtime")}
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden max-w-[1250px] rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 via-transparent to-black/10" />
          <iframe
            title={t("sections.map_iframe_title")}
            src={mapUrl}
            loading="lazy"
            scrolling="no"
            className="relative z-10 block max-w-[1250px] w-full h-[760px] rounded-3xl border-0"
          />
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/10 to-white/5 px-6 sm:px-10 py-10 shadow-[0_26px_90px_rgba(0,0,0,0.45)]">
        <div className="absolute -left-20 -top-28 h-56 w-56 bg-[#7DF5CA]/10 blur-[120px]" />
        <div className="absolute right-0 -bottom-24 h-64 w-64 bg-[#7CC7FF]/[0.12] blur-[140px]" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-white">
          <div className="space-y-2 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.18em] text-white/70">
              {t("sections.ai_map_page.cta_title")}
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold">
              {t("sections.ai_map_page.heading")}
            </h3>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed">
              {t("sections.ai_map_page.cta_body")}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <GradientButton to="/contact-us">
              {t("sections.ai_map_page.cta_primary")}
            </GradientButton>
            <Link
              to="/properties"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/25 text-sm font-semibold text-white bg-white/5 transition-all hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0"
            >
              {t("sections.ai_map_page.cta_secondary")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIMapPage;
