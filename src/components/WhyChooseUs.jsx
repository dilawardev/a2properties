import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CountUp from "./CountUp.jsx";
import { useTranslation } from "react-i18next";
import companyStats from "../data/companyStats.js";
import GlassSurface from "./GlassSurface.jsx";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const cardClasses =
    "group h-full min-h-[190px] w-full flex flex-col items-start justify-start rounded-[12px] bg-white/10 px-6 py-5 text-white backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/15";

  return (
    <section className="relative z-30 space-y-8">
      <h2 className="text-3xl md:text-4xl font-semibold text-white text-center">
        {t("sections.why_choose_us_title")}
      </h2>
      {/* Mobile: Swiper carousel */}
      <div className="block sm:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.5}
          centeredSlides
          className="pb-2"
        >
          {companyStats.map((item) => (
            <SwiperSlide key={item.key}>
              <GlassSurface
                width="100%"
                height="auto"
                borderRadius={12}
                backgroundOpacity={0.18}
                saturation={1.5}
                opacity={0.95}
                className="mx-2 min-h-[190px] border border-white/20"
              >
                <div className={cardClasses}>
                  <h3 className="text-lg font-semibold mb-1 text-white">
                    {t(`sections.why_choose_us_items.${item.key}_title`)}
                  </h3>

                  <div className="text-3xl font-bold my-2 text-white">
                    <CountUp to={item.value} duration={2} />
                    <span className="ml-1 text-base font-semibold">
                      {t(`sections.why_choose_us_items.${item.key}_suffix`)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-200 leading-relaxed">
                    {t(`sections.why_choose_us_items.${item.key}_copy`)}
                  </p>
                </div>
              </GlassSurface>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tablet & Desktop: grid layout */}
      <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {companyStats.map((item) => (
          <GlassSurface
            key={item.key}
            width="100%"
            height="auto"
            borderRadius={12}
            backgroundOpacity={0.18}
            saturation={1.5}
            opacity={0.95}
            className="min-h-[190px] border border-white/20"
          >
            <div className={cardClasses}>
              <h3 className="text-lg font-semibold mb-1 text-white">
                {t(`sections.why_choose_us_items.${item.key}_title`)}
              </h3>

              <div className="text-3xl font-bold my-2 text-white">
                <CountUp to={item.value} duration={2} />
                <span className="ml-1 text-base font-semibold">
                  {t(`sections.why_choose_us_items.${item.key}_suffix`)}
                </span>
              </div>

              <p className="text-sm text-gray-200 leading-relaxed">
                {t(`sections.why_choose_us_items.${item.key}_copy`)}
              </p>
            </div>
          </GlassSurface>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
