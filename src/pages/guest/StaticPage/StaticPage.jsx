import React from "react";
import { Link } from "react-router-dom";

const StaticPage = ({ title, eyebrow, body }) => {
  return (
    <div className="py-12 text-white">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
        <p className="text-sm text-white/60 uppercase tracking-wide">{eyebrow}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">{title}</h1>
        <p className="mt-4 text-sm sm:text-base text-white/70 max-w-3xl">
          {body}
        </p>
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
