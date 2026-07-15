import React, { useState, useEffect, useRef } from "react";
import GradientButton from "./GradientButton.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocale, setLocale } from "../hooks/useLocale";
import { useAiMapLock } from "../hooks/useAiMapLock.jsx";

const navItems = [
  { key: "home", href: "/" },
  { key: "offplan", href: "/properties" },
  { key: "ai_map", href: "/ai-map" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
  { key: "faqs", href: "/#faqs" },
];

const projectLinks = [
  { label: "Off Plan", href: "/properties?type=NEW" },
  { label: "Buy", href: "/properties?type=SELL" },
  { label: "Rent", href: "/properties?type=RENT" },
];

const NavLockBadge = ({ locked }) => (
  <span
    className={[
      "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold",
      locked
        ? "border-white/25 bg-white/5 text-white/70"
        : "border-emerald-300/40 bg-emerald-300/10 text-emerald-100",
    ].join(" ")}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="6" y="11" width="12" height="9" rx="2" ry="2" />
      <path
        d="M9 11V8a3 3 0 0 1 6 0v3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!locked && <path d="M14 11c.15-1.6-.35-3-2-3" strokeLinecap="round" />}
    </svg>
    <span>{locked ? "Locked" : "Live"}</span>
  </span>
);

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isUnlocked: isAiMapUnlocked, openUnlockModal } = useAiMapLock();
  const currentLocale = getLocale();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Sticky/floating header state
  const [isFloating, setIsFloating] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const menuRef = useRef(null);
  const bottomBarRef = useRef(null);
  const prevMobileRef = useRef(false);
  const headerRef = useRef(null);

  // Measure header height (for layout spacer)
  useEffect(() => {
    const measure = () => setHeaderHeight(headerRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // If we enter mobile, ensure floating is reset
  useEffect(() => {
    if (!isMobile) return undefined;
    const id = requestAnimationFrame(() => setIsFloating(false));
    return () => cancelAnimationFrame(id);
  }, [isMobile]);

  // Toggle floating header after scrolling past header height (desktop only)
  useEffect(() => {
    if (isMobile) return undefined;

    const onScroll = () => {
      const threshold = headerHeight || (headerRef.current?.offsetHeight ?? 0);
      setIsFloating(window.scrollY >= threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerHeight, isMobile]);

  // Check if screen is below 820px
  useEffect(() => {
    const checkMobile = () => {
      const nowMobile = window.innerWidth < 820;
      const wasMobile = prevMobileRef.current;

      if (wasMobile && !nowMobile && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = "";
      }

      prevMobileRef.current = nowMobile;
      setIsMobile(nowMobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMenuOpen]);

  // Manage scroll lock and click outside handler (mobile menu)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        isMobile &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        bottomBarRef.current &&
        !bottomBarRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen && isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isMobile]);

  const handleToggleLocale = async () => {
    const next = currentLocale === "en" ? "ar" : "en";
    await setLocale(next);
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavItemClick = (event, item, after = () => {}) => {
    const isAiMap = item.key === "ai_map";
    const samePath = location.pathname === item.href;

    // If clicking current route, just scroll to top
    if (!isAiMap && samePath) {
      event.preventDefault();
      after();
      scrollToTop();
      return;
    }

    if (isAiMap && !isAiMapUnlocked) {
      event.preventDefault();
      openUnlockModal(() => {
        after();
        navigate(item.href, { state: { aiMapAccessGranted: true } });
      });
      return;
    }

    after();
  };

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "z-50 transition-all duration-300",
          isFloating
            ? "fixed top-6 left-4 right-4 mx-auto max-w-6xl translate-y-0"
            : "relative w-full",
          isFloating
            ? "bg-black/85 backdrop-blur-xl border-white/10 rounded-3xl shadow-xl"
            : "bg-transparent border-transparent rounded-none shadow-none",
          "border",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <img
                src="/assets/icons/logo.svg"
                alt="A2 Properties logo"
                className="h-14 w-15"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-sm text-gray-100">
            {navItems.map((item) => {
              const className =
                "relative transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md";
              const isAiMap = item.key === "ai_map";
              const isProjects = item.key === "offplan";
              const label = (
                <span className="flex items-center gap-2">
                  <span>{t(`nav.${item.key}`)}</span>
                  {isProjects && (
                    <svg
                      className="h-3.5 w-3.5 text-white/60 transition-transform duration-200 group-hover:rotate-180 group-hover:text-white/90 group-focus-within:rotate-180 group-focus-within:text-white/90"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7.5 10 12.5 15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {isAiMap && <NavLockBadge locked={!isAiMapUnlocked} />}
                </span>
              );

              if (isProjects) {
                return (
                  <div key={item.key} className="group relative py-2">
                    <Link
                      to={item.href}
                      className={className}
                      onClick={(event) => handleNavItemClick(event, item)}
                    >
                      {label}
                    </Link>
                    <div className="absolute left-1/2 top-full z-50 min-w-40 -translate-x-1/2 rounded-2xl border border-white/15 bg-black/90 p-2 opacity-0 shadow-[0_22px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-200 ease-out -translate-y-1 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
                      {projectLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return item.external ? (
                <a
                  key={item.key}
                  href={item.href}
                  className={className}
                  target="_blank"
                  rel="noreferrer"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={item.key}
                  to={item.href}
                  className={className}
                  onClick={(event) => handleNavItemClick(event, item)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Explore button wrapper hover */}
            <div className="transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0">
              <GradientButton href="/properties">
                {t("buttons.explore_properties")}
              </GradientButton>
            </div>

            {/* Locale button */}
            <button
              type="button"
              onClick={handleToggleLocale}
              className={[
                "px-4 py-2 rounded-full text-[15px] font-semibold leading-none",
                "text-white border border-white/35 bg-white/5",
                "transition-all duration-300",
                "hover:border-white/70 hover:bg-white/10 hover:-translate-y-0.5",
                "active:translate-y-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
              ].join(" ")}
            >
              {currentLocale === "en" ? t("lang.ar") : t("lang.en")}
            </button>
          </div>
        </div>
      </header>

      {/* prevents layout jump when header becomes fixed */}
      {isFloating && !isMobile && <div style={{ height: headerHeight }} aria-hidden />}

      {/* Bottom Navigation Bar - Mobile Only */}
      {isMobile && (
        <div
          ref={bottomBarRef}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group px-6 py-4 bg-[rgba(24,24,24,0.85)] backdrop-blur-lg border border-white/20 rounded-full flex items-center gap-3 text-white transition-all hover:bg-[rgba(24,24,24,0.95)] shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              style={{
                boxShadow:
                  "0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-5 bg-white transition-all ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-white transition-all ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-white transition-all ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
              <span className="text-base font-medium leading-none">{t("nav.navigation")}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleLocale}
              className="px-4 py-3 rounded-full text-base font-semibold leading-none text-white border border-white/35 bg-[rgba(24,24,24,0.85)] hover:bg-[rgba(24,24,24,0.95)] transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {currentLocale === "en" ? t("lang.ar") : t("lang.en")}
            </button>
          </div>
        </div>
      )}

      {/* Navigation Menu Overlay - Mobile Only */}
      {isMobile && (
        <div
          ref={menuRef}
          className={`fixed inset-0 z-40 flex items-center justify-center px-4 transition-opacity duration-300 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            className={`relative w-full max-w-sm bg-[rgba(24,24,24,0.9)] backdrop-blur-xl border border-white/20 rounded-3xl transition-all duration-300 ease-out ${
              isMenuOpen
                ? "scale-100 opacity-100 translate-y-0"
                : "scale-95 opacity-0 translate-y-4"
            }`}
            style={{
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex flex-col p-6">
              <nav className="space-y-2 mb-6">
                {navItems.map((item) => {
                  const isAiMap = item.key === "ai_map";
                  const isProjects = item.key === "offplan";
                  const label = (
                    <span className="flex items-center gap-2">
                      <span>{t(`nav.${item.key}`)}</span>
                      {isAiMap && <NavLockBadge locked={!isAiMapUnlocked} />}
                    </span>
                  );

                  const content = (
                    <span className="flex items-center justify-between">
                      {label}
                      <span className="text-sm font-bold opacity-70 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  );

                  const className =
                    "group block px-4 py-3 text-white text-base font-medium rounded-xl transition-all hover:bg-white/10 active:bg-white/20 hover:-translate-y-0.5 active:translate-y-0";
                  const onClick = (event) =>
                    handleNavItemClick(event, item, () => setIsMenuOpen(false));

                  if (isProjects) {
                    return (
                      <div key={item.key} className="rounded-xl bg-white/[0.03] p-2">
                        <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                          {t(`nav.${item.key}`)}
                        </div>
                        <div className="space-y-1">
                          {projectLinks.map((link) => (
                            <Link
                              key={link.href}
                              to={link.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="group block rounded-lg px-3 py-2.5 text-white text-base font-medium transition-all hover:bg-white/10 active:bg-white/20"
                            >
                              <span className="flex items-center justify-between">
                                <span>{link.label}</span>
                                <span className="text-sm font-bold opacity-70 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                                  -&gt;
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return item.external ? (
                    <a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={onClick}
                      className={className}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      key={item.key}
                      to={item.href}
                      onClick={onClick}
                      className={className}
                    >
                      {content}
                    </Link>
                  );
                })}
                <Link
                  to="/contact-us"
                  onClick={() => setIsMenuOpen(false)}
                  className="group block px-4 py-3 text-white text-base font-medium rounded-xl transition-all hover:bg-white/10 active:bg-white/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="flex items-center justify-between">
                    <span>{t("nav.contact")}</span>
                    <span className="text-sm font-bold opacity-70 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                      -&gt;
                    </span>
                  </span>
                </Link>
              </nav>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full px-6 py-3 bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-white/20 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all hover:bg-[rgba(255,255,255,0.15)] hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>{t("buttons.close")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
