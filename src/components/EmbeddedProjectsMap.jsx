import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EmbeddedProjectsMap = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleActivate = () => {
    navigate("/ai-map");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <section id="ai-map" className="space-y-4">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
        {t("sections.ai_map_page.map_section_title")}
      </h2>
      <p className="text-sm md:text-base text-gray-300 max-w-3xl">
        {t("sections.map_intro")}
      </p>

      <div
        role="button"
        tabIndex={0}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        className="group relative min-w-0 overflow-hidden max-w-[1250px] rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 shadow-[0_24px_80px_rgba(0,0,0,0.55)] cursor-pointer"
      >
        <img
          src="/assets/images/map/image.png"
          alt={t("sections.map_iframe_title")}
          className="block max-w-[1250px] w-full h-[520px] md:h-[640px] object-cover"
        />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 px-6 text-center backdrop-blur-[2px] transition-all duration-300"
        >
          <div className="mb-3 rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-50">
            Live map
          </div>

          <h3 className="text-2xl sm:text-3xl font-semibold text-white">
            Open the live AI Map
          </h3>
          <p className="mt-2 max-w-xl text-sm sm:text-base text-white/75">
            Jump straight into the live Dubai projects map.
          </p>

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111] transition-all duration-200 hover:-translate-y-0.5"
          >
            Go to AI Map
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmbeddedProjectsMap;
