import React, { useState } from "react";
import GlassSurface from "./GlassSurface.jsx";
import { useTranslation } from "react-i18next";
import NewsletterSubscribeModal from "./NewsletterSubscribeModal.jsx";
import { submitNewsletterSubscription } from "../api/notifications.js";

const cards = [
  {
    key: "community",
    actions: [
      {
        actionKey: "community_open_discord",
        href: "https://linktr.ee/a2properties",
        external: true,
      },
    ],
  },
  {
    key: "support",
    actions: [
      {
        actionKey: "support_talk",
        href: "https://wa.me/971588314825",
        external: true,
      },
      { actionKey: "support_open_faqs", href: "/#faqs" },
    ],
  },
  {
    key: "newsletter",
    actions: [{ actionKey: "newsletter_subscribe", modal: "newsletter" }],
  },
];

const InvestorHighlights = () => {
  const { t, i18n } = useTranslation();
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  const handleNewsletterSubmit = (payload) => {
    return submitNewsletterSubscription({
      ...payload,
      source: "investor_highlights_modal",
      language: i18n?.language || "en",
    });
  };

  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-semibold text-white">
          {t("sections.investor_heading")}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <GlassSurface
            key={card.key}
            className="h-full p-5 text-left"
            width="100%"
            height="100%"
          >
            <div className="space-y-3 text-white">
              <p className="text-sm text-gray-300">
                {t(`sections.investor_cards.${card.key}_title`)}
              </p>
              <h3 className="text-xl font-semibold">
                {t(`sections.investor_cards.${card.key}_subtitle`)}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {t(`sections.investor_cards.${card.key}_body`)}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {card.actions.map((action) =>
                  action.modal === "newsletter" ? (
                    <button
                      key={action.actionKey}
                      type="button"
                      onClick={() => setNewsletterOpen(true)}
                      className="px-3 py-2 text-xs rounded-md bg-white/10 border border-white/20 hover:border-white/40 transition-colors"
                    >
                      {t(`sections.investor_actions.${action.actionKey}`)}
                    </button>
                  ) : (
                    <a
                      key={action.actionKey}
                      href={action.href}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noreferrer" : undefined}
                      className="px-3 py-2 text-xs rounded-md bg-white/10 border border-white/20 hover:border-white/40 transition-colors"
                    >
                      {t(`sections.investor_actions.${action.actionKey}`)}
                    </a>
                  )
                )}
              </div>
            </div>
          </GlassSurface>
        ))}
      </div>
      <NewsletterSubscribeModal
        open={newsletterOpen}
        onClose={() => setNewsletterOpen(false)}
        onSubmit={handleNewsletterSubmit}
      />
    </section>
  );
}

export default InvestorHighlights;
