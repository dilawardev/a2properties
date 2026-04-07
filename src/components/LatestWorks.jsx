import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const reels = [
  {
    title: "Selvara Phase 2",
    videoSrc: "/assets/video/reels/reel1.mp4",
    poster: "/assets/images/latest-work/Frame%203360.png",
    duration: "0:34",
    slug: "selvara-phase-2",
  },
  {
    title: "Samana Hills South Phase 3",
    videoSrc: "/assets/video/reels/reel2.mp4",
    poster: "/assets/images/latest-work/Frame%203361.png",
    duration: "0:44",
    slug: "samana-hills-south-phase-3",
  },
  {
    title: "Sera by Emaar",
    videoSrc: "/assets/video/reels/reel3.mp4",
    poster: "/assets/images/latest-work/Frame%203362.png",
    duration: "0:39",
    slug: "sera-by-emaar",
  },
  {
    title: "Soulever",
    videoSrc: "/assets/video/reels/reel4.mp4",
    poster: "/assets/images/latest-work/Frame%203364.png",
    duration: "0:41",
    slug: "soulever",
  },
];

const MuteIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M11 5 6 9H3v6h3l5 4V5Zm4 4 6 6m0-6-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VolumeIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M11 5 6 9H3v6h3l5 4V5Zm4.5 4.5a5 5 0 0 1 0 5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M17.5 7a8 8 0 0 1 0 10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="m8 5 11 7-11 7V5Z" />
  </svg>
);

const PauseIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z" />
  </svg>
);

const CloseIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LatestWorks = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const previewRefs = useRef([]);
  const modalVideoRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [sectionInView, setSectionInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(true);
  const [isPreviewMuted, setIsPreviewMuted] = useState(true);
  const [modalIndex, setModalIndex] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting && entry.intersectionRatio >= 0.3);
      },
      { threshold: [0, 0.15, 0.3, 0.5] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const shouldPlayActivePreview = sectionInView && modalIndex === null && isPreviewPlaying;

    previewRefs.current.forEach((video, index) => {
      if (!video) return;

      const isActivePreview = index === activeIndex;

      video.defaultMuted = isActivePreview ? isPreviewMuted : true;
      video.muted = isActivePreview ? isPreviewMuted : true;
      video.loop = true;

      if (isActivePreview && shouldPlayActivePreview) {
        const playPromise = video.play();
        if (playPromise?.catch) playPromise.catch(() => {});
        return;
      }

      video.pause();
      if (!isActivePreview && video.readyState > 0) {
        video.currentTime = 0;
      }
    });
  }, [activeIndex, isPreviewMuted, isPreviewPlaying, modalIndex, sectionInView]);

  useEffect(() => {
    if (modalIndex === null) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [modalIndex]);

  useEffect(() => {
    if (modalIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setModalIndex(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalIndex]);

  useEffect(() => {
    if (modalIndex === null) return undefined;

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 40);
    const playTimer = window.setTimeout(() => {
      const modalVideo = modalVideoRef.current;
      if (!modalVideo) return;

      modalVideo.currentTime = 0;
      modalVideo.muted = false;
      modalVideo.defaultMuted = false;
      modalVideo.volume = 1;

      const playPromise = modalVideo.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    }, 60);

    return () => {
      window.clearTimeout(focusTimer);
      window.clearTimeout(playTimer);
      modalVideoRef.current?.pause();
    };
  }, [modalIndex]);

  const activeModalReel = modalIndex !== null ? reels[modalIndex] : null;

  const openModal = (index, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    setModalIndex(index);
  };

  const closeModal = () => {
    setModalIndex(null);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleCardKeyDown = (index, event) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      openModal(index, event);
    }
  };

  const syncPreviewPlayback = (nextIndex, shouldPlay, muted) => {
    previewRefs.current.forEach((video, index) => {
      if (!video) return;

      const isTargetPreview = index === nextIndex;

      if (isTargetPreview) {
        video.defaultMuted = muted;
        video.muted = muted;

        if (shouldPlay) {
          const playPromise = video.play();
          if (playPromise?.catch) playPromise.catch(() => {});
        } else {
          video.pause();
        }

        return;
      }

      video.pause();
      video.defaultMuted = true;
      video.muted = true;
      if (video.readyState > 0) {
        video.currentTime = 0;
      }
    });
  };

  const handleMuteControl = (index, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (index !== activeIndex) {
      syncPreviewPlayback(index, true, false);
      setActiveIndex(index);
      setIsPreviewMuted(false);
      setIsPreviewPlaying(true);
      return;
    }

    const nextMuted = !isPreviewMuted;
    const shouldPlay = isPreviewPlaying || !nextMuted;

    syncPreviewPlayback(index, shouldPlay, nextMuted);
    setIsPreviewMuted(nextMuted);
    setIsPreviewPlaying(shouldPlay);
  };

  const handlePlayControl = (index, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (index !== activeIndex) {
      syncPreviewPlayback(index, true, false);
      setActiveIndex(index);
      setIsPreviewMuted(false);
      setIsPreviewPlaying(true);
      return;
    }

    const nextPlaying = !isPreviewPlaying;
    syncPreviewPlayback(index, nextPlaying, isPreviewMuted);
    setIsPreviewPlaying(nextPlaying);
  };

  const isCardMuted = (index) => index !== activeIndex || isPreviewMuted;

  const isCardPlaying = (index) => index === activeIndex && isPreviewPlaying;

  const getMuteLabel = (item, index) => {
    if (isCardMuted(index)) return `Unmute ${item.title}`;
    return `Mute ${item.title}`;
  };

  const getPlayLabel = (item, index) => {
    if (isCardPlaying(index)) return `Pause ${item.title}`;
    return `Play ${item.title}`;
  };

  return (
    <>
      <section ref={sectionRef} className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            {t("sections.latest_works_title")}
          </h2>
          <p className="text-gray-300">
            {t("sections.latest_works_subtitle")}
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:snap-none justify-items-center">
            {reels.map((item, idx) => {
              return (
                <div
                  key={item.slug}
                  role="button"
                  tabIndex={0}
                  onClick={(event) => openModal(idx, event)}
                  onKeyDown={(event) => handleCardKeyDown(idx, event)}
                  className="relative block flex-shrink-0 snap-center w-[80vw] max-w-[320px] sm:w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60"
                  aria-label={`Open ${item.title} reel`}
                >
                  <video
                    ref={(node) => {
                      previewRefs.current[idx] = node;
                    }}
                    muted={idx !== activeIndex || isPreviewMuted}
                    playsInline
                    loop
                    preload="metadata"
                    poster={item.poster}
                    aria-label={`${item.title} reel preview`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  >
                    <source src={item.videoSrc} type="video/mp4" />
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute top-4 left-4 rounded-full bg-black/45 px-3 py-1 text-white font-semibold text-sm backdrop-blur-sm">
                    <span>{item.duration}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => handleMuteControl(idx, event)}
                    className="absolute bottom-4 left-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/70"
                    aria-label={getMuteLabel(item, idx)}
                    title={getMuteLabel(item, idx)}
                  >
                    {isCardMuted(idx) ? <MuteIcon /> : <VolumeIcon />}
                  </button>
                  <button
                    type="button"
                    onClick={(event) => handlePlayControl(idx, event)}
                    className="absolute bottom-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/70"
                    aria-label={getPlayLabel(item, idx)}
                    title={getPlayLabel(item, idx)}
                  >
                    {isCardPlaying(idx) ? (
                      <PauseIcon />
                    ) : (
                      <PlayIcon className="h-4 w-4 translate-x-[1px]" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {activeModalReel && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
          onClick={handleOverlayClick}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeModalReel.title} reel player`}
            className="relative w-full max-w-md rounded-[32px] border border-white/15 bg-[#050505]/95 p-3 shadow-[0_26px_120px_rgba(0,0,0,0.75)]"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition hover:border-white/40 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/70"
              aria-label={t("buttons.close")}
            >
              <span className="sr-only">{t("buttons.close")}</span>
              <CloseIcon />
            </button>
            <div className="overflow-hidden rounded-[28px] bg-black aspect-[9/16]">
              <video
                key={activeModalReel.videoSrc}
                ref={modalVideoRef}
                autoPlay
                controls
                playsInline
                preload="auto"
                poster={activeModalReel.poster}
                className="h-full w-full object-cover"
              >
                <source src={activeModalReel.videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LatestWorks;
