import React from "react";
import { Link } from "react-router-dom";

const StaticPage = ({ title, eyebrow, body, sections = [] }) => {
  return (
    <div className="py-12 text-white">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
        <p className="text-sm text-white/60 uppercase tracking-wide">{eyebrow}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">{title}</h1>
        {body ? (
          <p className="mt-4 text-sm sm:text-base text-white/70 max-w-3xl">
            {body}
          </p>
        ) : null}
        {sections.length ? (
          <div className="mt-8 max-w-4xl space-y-7 text-sm sm:text-base leading-relaxed text-white/70">
            {sections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items?.length ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/contact-us"
            className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#7DF5CA] to-white px-6 text-sm font-semibold text-black shadow"
          >
            Contact Us
          </Link>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StaticPage;
