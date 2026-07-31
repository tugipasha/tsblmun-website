"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import DelegateModal from "./DelegateModal";
import ChairboardModal from "./ChairboardModal";
import AdminModal from "./AdminModal";
import PressModal from "./PressModal";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const CARD_ACCENT_FROM = "#12332f";
const CARD_ACCENT_TO = "#1d4a43";

const CARDS = [
  {
    id: 1,
    index: "01",
    cat: "Security Council",
    pre: "Global ",
    em: "Peace",
    img: "/committee-img-1.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    index: "02",
    cat: "Human Rights Council",
    pre: "Human ",
    em: "Dignity",
    img: "/committee-img-2.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.\n\nDuis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
  },
  {
    id: 3,
    index: "03",
    cat: "Economic and Social",
    pre: "Shared ",
    em: "Prosperity",
    img: "/committee-img-3.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in dapibus odio. Mauris vel risus vitae ligula volutpat tincidunt id at magna. Aliquam erat volutpat. Phasellus interdum ligula sit amet magna fermentum, vitae dignissim sem sodales.\n\nSuspendisse potenti. Quisque dictum finibus justo, a pretium ipsum efficitur in. Aenean feugiat magna id dolor tincidunt, et aliquet massa vulputate.",
  },
  {
    id: 4,
    index: "04",
    cat: "Crisis Committee",
    pre: "Turning ",
    em: "Point",
    img: "/committee-img-4.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat lectus et magna tempor, a dapibus justo molestie. Nam porttitor leo vitae est blandit, in finibus elit convallis.\n\nCurabitur euismod, ligula vel faucibus vehicula, augue arcu fermentum quam, et efficitur velit nisl sed risus. Integer nec luctus orci. Praesent ac mi sagittis, porta velit et, sollicitudin nunc.",
  },
  {
    id: 5,
    index: "05",
    cat: "Environmental Council",
    pre: "Climate ",
    em: "Future",
    img: "/committee-img-5.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a metus a eros lobortis elementum in eget neque. Etiam congue dolor vel justo pretium, ut vulputate sem auctor.\n\nDonec egestas ullamcorper sapien, vitae hendrerit nisi tempus a. Cras feugiat varius libero, sed malesuada lectus blandit at. Aliquam erat volutpat. Morbi auctor scelerisque est sit amet rutrum.",
  },
  {
    id: 6,
    index: "06",
    cat: "Legal Committee",
    pre: "Rule of ",
    em: "Law",
    img: "/committee-img-6.jpg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque sit amet augue ac eros pretium facilisis.\n\nMaecenas tempor, sapien sit amet posuere porta, dolor ex pellentesque lectus, eget dictum justo nisi sed sem. Proin fermentum, orci non vestibulum congue, erat nibh rhoncus libero.",
  },
];

const TEAM = [
  {
    name: "Elif Yıldız",
    role: "Secretary-General",
    initials: "EY",
    bio: "Leads the conference vision and represents TSBL MUN externally.",
    grad: "linear-gradient(155deg, #2aae8b 0%, #1a7b6d 100%)",
  },
  {
    name: "Kaan Demir",
    role: "Deputy Secretary-General",
    initials: "KD",
    bio: "Oversees committee operations and supports the Secretary-General.",
    grad: "linear-gradient(155deg, #2d9a7a 0%, #1e6859 100%)",
  },
  {
    name: "Zeynep Kaya",
    role: "Director-General",
    initials: "ZK",
    bio: "Manages logistics, scheduling, and on-site conference flow.",
    grad: "linear-gradient(155deg, #24868e 0%, #184c5c 100%)",
  },
  {
    name: "Mert Aydın",
    role: "USG Delegate Affairs",
    initials: "MA",
    bio: "Handles delegate communications and onboarding experience.",
    grad: "linear-gradient(155deg, #2f6a8d 0%, #223e5c 100%)",
  },
  {
    name: "Selin Arslan",
    role: "USG Chairboard Affairs",
    initials: "SA",
    bio: "Coordinates chairs and ensures committee procedure quality.",
    grad: "linear-gradient(155deg, #1e6859 0%, #123c33 100%)",
  },
  {
    name: "Ege Şahin",
    role: "USG Press & Media",
    initials: "EŞ",
    bio: "Directs the press corps and the conference's visual coverage.",
    grad: "linear-gradient(155deg, #3d6b94 0%, #223e5c 100%)",
  },
  {
    name: "Defne Çelik",
    role: "USG Sponsorship",
    initials: "DÇ",
    bio: "Builds partnerships and manages conference funding.",
    grad: "linear-gradient(155deg, #2e9868 0%, #1a5b45 100%)",
  },
  {
    name: "Berk Yılmaz",
    role: "Head of IT",
    initials: "BY",
    bio: "Maintains the platform, registration systems, and tech support.",
    grad: "linear-gradient(155deg, #24868e 0%, #14434a 100%)",
  },
];

const ROLES = [
  {
    label: "Delegate",
    key: "delegate",
    desc: "Represent a nation on the floor",
    accent: "#2aae8b",
    accentDim: "rgba(42,174,139,0.16)",
    icon: (
      <path
        d="M4 20V6.8C4 5.8 4.8 5 5.8 5H14l6 6v8.2c0 1-.8 1.8-1.8 1.8H5.8C4.8 22 4 21.2 4 20.2V20Z M14 5v5.2c0 .44.36.8.8.8H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Chairboard",
    key: "chairboard",
    desc: "Guide procedure inside committee",
    accent: "#3aa8c9",
    accentDim: "rgba(58,168,201,0.16)",
    icon: (
      <path
        d="M12 3 4 6.5v4c0 5 3.4 8.9 8 10.5 4.6-1.6 8-5.5 8-10.5v-4L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Admin",
    key: "admin",
    desc: "Run logistics and conference ops",
    accent: "#d9a656",
    accentDim: "rgba(217,166,86,0.16)",
    icon: (
      <path
        d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z M19.4 13.5c.04-.33.06-.66.06-1s-.02-.67-.06-1l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.4.96a7.3 7.3 0 0 0-1.72-1l-.36-2.55a.5.5 0 0 0-.5-.43h-3.84a.5.5 0 0 0-.5.43l-.36 2.55c-.63.24-1.2.58-1.72 1l-2.4-.96a.5.5 0 0 0-.6.22L2.75 9.28a.5.5 0 0 0 .12.64L4.9 11.5c-.04.33-.06.66-.06 1s.02.67.06 1l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.31.6.22l2.4-.96c.52.42 1.09.76 1.72 1l.36 2.55c.05.25.26.43.5.43h3.84c.24 0 .45-.18.5-.43l.36-2.55c.63-.24 1.2-.58 1.72-1l2.4.96c.21.09.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64L19.4 13.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Press",
    key: "press",
    desc: "Cover the conference on the ground",
    accent: "#8a7fd6",
    accentDim: "rgba(138,127,214,0.16)",
    icon: (
      <path
        d="M4 7.5A1.5 1.5 0 0 1 5.5 6h9A1.5 1.5 0 0 1 16 7.5v11a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 18.5v-11Z M16 9h2.5A1.5 1.5 0 0 1 20 10.5v8a2 2 0 0 1-2 2h-2.34 M7 9.8h6M7 12.6h6M7 15.4h3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => {};

const COUNTDOWN_TARGET = new Date("2026-11-18T00:00:00");

function getTimeLeft() {
  const diff = COUNTDOWN_TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function StickyConference() {
  const root = useRef(null);
  const stage = useRef(null);
  const homeRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);
  const cardRefs = useRef([]);
  const detailWrapRef = useRef(null);
  const introOverlayRef = useRef(null);
  const introVideoRef = useRef(null);
  const introVideoMobileRef = useRef(null);
  const stackTriggerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [activeCardId, setActiveCardId] = useState(null);
  const activeCardIdRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const lenisRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(null); // "delegate" | "chairboard" | "admin" | "press" | null

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (openModal) lenis.stop();
    else lenis.start();
  }, [openModal]);
  const syncExpandedStateRef = useRef(null);
  const [teamIndex, setTeamIndex] = useState(0);

  const teamPrev = () =>
    setTeamIndex((i) => (i - 1 + TEAM.length) % TEAM.length);
  const teamNext = () => setTeamIndex((i) => (i + 1) % TEAM.length);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const toggleCard = (cardId) => {
    setActiveCardId((prev) => {
      const next = prev === cardId ? null : cardId;
      activeCardIdRef.current = next;
      return next;
    });
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (syncExpandedStateRef.current) {
      syncExpandedStateRef.current();
    }
  }, [activeCardId]);

  useIsomorphicLayoutEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", ({ scroll, limit }) => {
      setHeaderScrolled(scroll > 40);
      setScrollProgress(limit > 0 ? scroll / limit : 0);
      setShowTopBtn(scroll > 600);
    });
    const ticker = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let intervalId = 0;
    const cleanupSync = () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (intervalId) window.clearInterval(intervalId);
      try {
        ScrollTrigger.removeEventListener("refresh", syncExpandedState);
      } catch (_) {}
    };

    // Shared layout constants/helpers for the paper-stack committee cards.
    // Declared here (outer scope of the effect) rather than inside
    // gsap.context(...) below, so computeStackLayout — which needs them —
    // and the ScrollTrigger onUpdate inside gsap.context both close over the
    // same values instead of two disconnected scopes.
    const total = CARDS.length;
    const seg = 1 / total;
    const ease = gsap.parseEase("power2.inOut");
    const lerp = gsap.utils.interpolate;
    const Y_OFFSET = 9;
    const SCALE_STEP = 0.06;
    const EXIT_Y = -215;
    const EXIT_ROT = -26;
    const EXIT_SCALE = 1.03;
    const PARK_Y = -260;
    const PARK_ROT = -26;

    // Computes the exact resting transform (yPercent/rotationX/scale) that the
    // main stack ScrollTrigger's onUpdate would assign to each card for the
    // *current* scroll progress. Shared by the ScrollTrigger onUpdate itself
    // and by syncExpandedState, so opening/closing a card never disagrees
    // with where the scroll position says each card should be.
    function computeStackLayout() {
      const total = CARDS.length;
      const segLocal = 1 / total;
      const trigger = stackTriggerRef.current;
      const progress = trigger ? trigger.progress : 0;
      const activeIndex = Math.min(Math.floor(progress / segLocal), total - 1);
      const segProgress = (progress - activeIndex * segLocal) / segLocal;
      const e = ease(segProgress);

      return cardRefs.current.map((_, i) => {
        if (i < activeIndex) {
          return { yPercent: PARK_Y, rotationX: PARK_ROT, scale: 1 };
        } else if (i === activeIndex) {
          return {
            yPercent: lerp(-50, EXIT_Y, e),
            rotationX: lerp(0, EXIT_ROT, e),
            scale: lerp(1, EXIT_SCALE, e),
          };
        } else {
          const behind = i - activeIndex;
          const yo = (behind - e) * Y_OFFSET;
          const sc = 1 - (behind - e) * SCALE_STEP;
          return { yPercent: -50 + yo, rotationX: 0, scale: sc };
        }
      });
    }

    function syncExpandedState() {
      const stageEl = stage.current;
      if (!stageEl) return;
      const stackCards = stageEl.querySelectorAll(".card:not(.expanded-card)");
      const expandedCard = stageEl.querySelector(".expanded-card");
      const detailPanel = detailWrapRef.current;
      const total = CARDS.length;

      if (activeCardIdRef.current != null && expandedCard && detailPanel) {
        // Normalize every background card onto the same flat resting
        // transform (rotationX: 0, consistent yPercent/scale) before fading
        // them back, so cards caught mid-scroll-animation (different
        // rotationX / yPercent values) don't end up visually overlapping.
        cardRefs.current.forEach((card, i) => {
          if (!card || card.classList.contains("expanded-card")) return;
          gsap.to(card, {
            xPercent: -65,
            yPercent: -50,
            rotationX: 0,
            scale: 0.96,
            opacity: 0.15,
            pointerEvents: "none",
            duration: reduceMotion ? 0.01 : 0.5,
            ease: "power3.out",
            overwrite: "auto",
            delay: reduceMotion ? 0 : i * 0.03,
          });
        });

        // On desktop the expanded card sits off-center to leave room for the
        // side detail panel; on mobile/tablet there's no side panel, so it
        // must be dead-center or it renders partly off-screen.
        const isDesktopLayout =
          typeof window !== "undefined" && window.innerWidth >= 1024;
        const expandedXPercent = isDesktopLayout ? -68 : -50;

        // FLIP-style open: animate from the clicked card's real on-screen
        // position/size into the expanded card's resting position, so the
        // expansion visually grows out of the card that was clicked.
        const sourceIndex = CARDS.findIndex(
          (c) => c.id === activeCardIdRef.current
        );
        const sourceCard = cardRefs.current[sourceIndex];

        if (sourceCard && !reduceMotion) {
          const from = sourceCard.getBoundingClientRect();
          gsap.set(expandedCard, {
            xPercent: expandedXPercent,
            yPercent: -50,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
          });
          const to = expandedCard.getBoundingClientRect();

          const scaleX = from.width / to.width;
          const scaleY = from.height / to.height;
          const originX = from.left + from.width / 2 - (to.left + to.width / 2);
          const originY = from.top + from.height / 2 - (to.top + to.height / 2);

          gsap.fromTo(
            expandedCard,
            {
              x: originX,
              y: originY,
              scaleX,
              scaleY,
              opacity: 0.4,
            },
            {
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              overwrite: "auto",
              force3D: true,
            }
          );
        } else {
          gsap.fromTo(
            expandedCard,
            { xPercent: expandedXPercent, yPercent: -50, scale: 0.94, opacity: 0 },
            {
              xPercent: expandedXPercent,
              yPercent: -50,
              scale: 1,
              opacity: 1,
              duration: reduceMotion ? 0.01 : 0.55,
              ease: "power3.out",
              overwrite: "auto",
              force3D: true,
            }
          );
        }

        gsap.fromTo(
          detailPanel,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: reduceMotion ? 0.01 : 0.55,
            ease: "power3.out",
            delay: reduceMotion ? 0 : 0.12,
            overwrite: "auto",
            force3D: true,
          }
        );
      } else {
        const layout = computeStackLayout();
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const target = layout[i];
          gsap.to(card, {
            xPercent: -50,
            yPercent: target.yPercent,
            rotationX: target.rotationX,
            scale: target.scale,
            opacity: 1,
            pointerEvents: "auto",
            duration: reduceMotion ? 0.01 : 0.45,
            ease: "power3.out",
            overwrite: "auto",
            delay: reduceMotion ? 0 : i * 0.02,
          });
        });
        gsap.to([expandedCard, detailPanel].filter(Boolean), {
          opacity: 0,
          pointerEvents: "none",
          duration: reduceMotion ? 0.01 : 0.32,
          ease: "power2.in",
          overwrite: "auto",
        });
        if (expandedCard) {
          gsap.set(expandedCard, { x: 0, y: 0, scaleX: 1, scaleY: 1 });
        }
      }
    }

    const ctx = gsap.context(() => {
      // --- Intro preloader overlay (video) — always plays, independent of
      // prefers-reduced-motion, since it's explicit content, not a UI effect.
      if (introOverlayRef.current) {
        const videoEl = introVideoRef.current;
        const videoElMobile = introVideoMobileRef.current;
        if (videoEl) videoEl.play().catch(() => {});
        if (videoElMobile) videoElMobile.play().catch(() => {});
        gsap.to(introOverlayRef.current, {
          autoAlpha: 0,
          duration: 2,
          ease: "power2.inOut",
          delay: 4.75,
          onComplete: () => setIntroDone(true),
        });
      } else {
        setIntroDone(true);
      }

      // --- Home entrance animations (delayed until after intro) ---
      const introEls = gsap.utils.toArray(".intro-anim");
      if (introEls.length) {
        gsap.set(introEls, {
          y: reduceMotion ? 0 : 24,
          opacity: 0,
          force3D: true,
        });
        const startDelay = !introOverlayRef.current ? 0.12 : 4.75;
        gsap.to(introEls, {
          y: 0,
          opacity: 1,
          duration: reduceMotion ? 0.01 : 0.95,
          ease: "power3.out",
          stagger: reduceMotion ? 0 : 0.11,
          delay: startDelay,
          force3D: true,
          immediateRender: false,
          clearProps: reduceMotion ? "all" : "transform",
          overwrite: "auto",
        });
      }

      // --- Home → Work overlay scroll effect: home scales down & slides up under work ---
      if (homeRef.current && stage.current) {
        gsap.set(homeRef.current, { willChange: "transform, opacity" });
        ScrollTrigger.create({
          trigger: stage.current,
          start: "top bottom",
          end: "top top",
          scrub: 0.8,
          onUpdate(self) {
            const p = self.progress;
            const s = 1 - 0.06 * p;
            const y = -32 * p;
            const o = 1 - 0.3 * p;
            gsap.set(homeRef.current, {
              scale: s,
              y,
              opacity: o,
              force3D: true,
            });
          },
        });
      }

      // --- Work → Team / Team → Contact: same paper-push-under effect, so
      // every section transition reads as one paper sliding over the last.
      [
        { shrinkEl: stage.current, triggerEl: teamRef.current },
        { shrinkEl: teamRef.current, triggerEl: contactRef.current },
      ].forEach(({ shrinkEl, triggerEl }) => {
        if (!shrinkEl || !triggerEl) return;
        gsap.set(shrinkEl, { willChange: "transform, opacity" });
        ScrollTrigger.create({
          trigger: triggerEl,
          start: "top bottom",
          end: "top top",
          scrub: 0.8,
          onUpdate(self) {
            const p = self.progress;
            const s = 1 - 0.06 * p;
            const y = -32 * p;
            const o = 1 - 0.3 * p;
            gsap.set(shrinkEl, {
              scale: s,
              y,
              opacity: o,
              force3D: true,
            });
          },
        });
      });

      // --- Paper-stack committee cards ---
      cardRefs.current.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50 + i * Y_OFFSET,
          scale: 1 - i * SCALE_STEP,
          zIndex: total - i,
          force3D: true,
        });
      });

      stackTriggerRef.current = ScrollTrigger.create({
        trigger: stage.current,
        start: "top top",
        end: `+=${(window.innerHeight || 720) * (total === 6 ? 8.5 : 6.5)}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1.1,
        onUpdate(self) {
          if (activeCardIdRef.current != null) return;
          const layout = computeStackLayout();

          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const target = layout[i];
            gsap.set(card, {
              yPercent: target.yPercent,
              rotationX: target.rotationX,
              scale: target.scale,
            });
          });
        },
      });

      // --- Active card expand: run once on mount + on ScrollTrigger refresh ---
      syncExpandedStateRef.current = syncExpandedState;
      rafId = requestAnimationFrame(syncExpandedState);
      try {
        ScrollTrigger.addEventListener("refresh", syncExpandedState);
      } catch (_) {}
    }, root);

    // Mobile browsers report a taller (chrome-visible) viewport on first
    // paint, then shrink/settle as the address bar collapses on scroll.
    // ignoreMobileResize (set globally) stops ScrollTrigger from reacting to
    // every toolbar flicker, but that also means the very first measurement
    // must already reflect the settled viewport — otherwise the pinned
    // committees section reserves the wrong scroll distance and a stray
    // empty strip shows up at the bottom once it unpins. One resync shortly
    // after mount, before the user starts scrolling, fixes that.
    const settleRefreshId = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.clearTimeout(settleRefreshId);
      cleanupSync();
      ctx.revert();
      gsap.ticker.remove(ticker);
      if (lenis && typeof lenis.destroy === "function") {
        lenis.destroy();
      }
      lenisRef.current = null;
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const activeCard =
    activeCardId != null ? CARDS.find((c) => c.id === activeCardId) : null;

  return (
    <main
      ref={root}
      className="relative bg-bg min-w-0 w-full overflow-x-hidden"
    >
      <div className="grain-overlay" aria-hidden="true" />
      <div
        ref={introOverlayRef}
        className="fixed inset-0 z-[100] bg-bg flex items-center justify-center overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <video
          ref={introVideoRef}
          src="/intro-pc.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="relative z-10 h-full w-full object-cover max-md:hidden"
        />
        <video
          ref={introVideoMobileRef}
          src="/intro-phone.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="relative z-10 h-full w-full object-cover md:hidden"
        />
      </div>

      {/* scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[51] h-[2px] w-full bg-[rgba(243,250,246,0.08)]"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[linear-gradient(90deg,#3fdcb2,var(--gold))]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <header className="fixed top-0 left-0 z-50 w-full">
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 transition-opacity duration-500 bg-[rgba(10,12,11,0.45)] backdrop-blur-md ${
            headerScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="flex items-center justify-between gap-3 px-[3.1rem] py-[1.9rem] max-md:px-[1rem] max-md:py-[1rem]">
        <div className="relative flex items-center gap-[0.6rem] min-w-0 flex-shrink-0">
          <div className="relative h-[1.8rem] w-[1.8rem] flex items-center justify-center flex-shrink-0">
            <span className="logo-glow" aria-hidden="true" />
            <img
              src="/tsbl-mun-logo.png"
              alt="TSBL MUN"
              className="relative z-10 h-[1.8rem] w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            />
          </div>
          <span className="mix-blend-difference font-serif text-[1.15rem] font-medium tracking-[0.01em] truncate">
            TSBL MUN
          </span>
        </div>
        <nav className="mix-blend-difference flex items-center gap-[1.2rem] md:gap-[2rem] text-[0.82rem] tracking-[0.04em] min-w-0 justify-end">
          <a
            href="#home"
            className="text-paper opacity-[0.78] hover:opacity-100 max-md:hidden transition-opacity duration-200 flex-shrink-0"
          >
            Home
          </a>
          <a
            href="#work"
            className="text-paper opacity-[0.78] hover:opacity-100 max-md:hidden transition-opacity duration-200 flex-shrink-0"
          >
            Committees
          </a>
          <a
            href="#team"
            className="text-paper opacity-[0.78] hover:opacity-100 max-md:hidden transition-opacity duration-200 flex-shrink-0"
          >
            Team
          </a>
          <a
            href="#contact"
            className="text-paper opacity-[0.78] hover:opacity-100 max-md:hidden transition-opacity duration-200 flex-shrink-0"
          >
            Applications
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden relative flex-shrink-0 flex flex-col items-center justify-center gap-[5px] h-[44px] w-[44px] -mr-[0.5rem]"
          >
            <span
              className={`block h-[1.5px] w-[20px] bg-paper transition-transform duration-300 ${
                mobileMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-[20px] bg-paper transition-opacity duration-200 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[1.5px] w-[20px] bg-paper transition-transform duration-300 ${
                mobileMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
        </div>
      </header>

      {/* ================ MOBILE MENU OVERLAY ================ */}
      <div
        className={`fixed inset-0 z-[60] md:hidden bg-[rgba(10,26,24,0.98)] backdrop-blur-lg transition-opacity duration-300 flex flex-col items-center justify-center gap-[2rem] ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {[
          { href: "#home", label: "Home" },
          { href: "#work", label: "Committees" },
          { href: "#team", label: "Team" },
          { href: "#contact", label: "Applications" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-[2rem] tracking-[-0.01em] text-paper opacity-90 hover:opacity-100 transition-opacity"
          >
            {item.label}
          </a>
        ))}
        <span className="accent-rule mt-[0.5rem]" aria-hidden="true" />
        <p className="font-sans text-[0.68rem] tracking-[0.16em] uppercase text-muted">
          TSBL MUN — Istanbul 2026
        </p>
      </div>

      {/* ================ HERO / HOME ================ */}
      <section
        id="home"
        ref={homeRef}
        className="paper-panel relative z-[1] w-full min-h-[100svh] overflow-hidden bg-bg flex flex-col items-center justify-center text-center px-[2.4rem] max-md:px-[1.3rem]"
      >
        <div className="hero-glow" aria-hidden="true" />

        <h1 className="intro-anim relative font-serif font-normal text-[clamp(3.2rem,13vw,7.5rem)] leading-[0.94] tracking-[-0.02em]">
          <span className="block">TSBL MUN</span>
          <span className="block italic text-muted mt-[0.05em]">2026</span>
        </h1>

        <p className="intro-anim relative mt-[1.2rem] md:mt-[1.5rem] font-sans text-[0.95rem] md:text-[1.15rem] tracking-[0.01em] text-paper opacity-[0.78] max-w-[540px]">
          Where Tomorrow&apos;s Leaders Shape Today&apos;s World
        </p>

        {timeLeft && (
          <div className="intro-anim relative mt-[2.4rem] md:mt-[3rem] flex flex-col items-center">
            <p className="font-sans text-[0.66rem] md:text-[0.7rem] tracking-[0.24em] uppercase text-muted mb-[0.9rem] md:mb-[1rem]">
              Conference is live
            </p>
            <div className="countdown-wrap flex items-stretch gap-0 rounded-[1.1rem] md:rounded-[1.2rem] border border-[rgba(243,250,246,0.16)] bg-[rgba(243,250,246,0.04)] backdrop-blur-md px-[1.1rem] md:px-[1.8rem] py-[1rem] md:py-[1.3rem] [box-shadow:0_30px_60px_-30px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds, accent: true },
              ].map((unit, i) => (
                <div key={unit.label} className="flex items-stretch">
                  {i !== 0 && (
                    <span className="w-px bg-[rgba(243,250,246,0.14)] mx-[0.9rem] md:mx-[1.3rem]" />
                  )}
                  <div className="text-center min-w-[3.2rem] md:min-w-[3.8rem]">
                    <div
                      className={`font-serif text-[clamp(1.7rem,5.5vw,2.4rem)] leading-none tabular-nums ${
                        unit.accent ? "text-gold" : "text-paper"
                      }`}
                    >
                      {String(unit.value).padStart(2, "0")}
                    </div>
                    <div className="mt-[0.5rem] font-sans text-[0.56rem] md:text-[0.62rem] tracking-[0.16em] uppercase text-muted">
                      {unit.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="intro-anim relative mt-[2.2rem] md:mt-[2.6rem] flex items-center gap-[0.9rem] md:gap-[1.1rem]">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(120deg,#2aae8b,#1a7b6d)] px-[1.7rem] md:px-[2rem] py-[0.85rem] md:py-[1rem] text-[0.82rem] md:text-[0.88rem] tracking-[0.03em] text-paper font-medium transition-transform duration-300 hover:-translate-y-[2px] whitespace-nowrap [box-shadow:0_20px_50px_-20px_rgba(42,174,139,0.5)]"
          >
            Apply Now
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(243,250,246,0.22)] px-[1.7rem] md:px-[2rem] py-[0.85rem] md:py-[1rem] text-[0.82rem] md:text-[0.88rem] tracking-[0.03em] text-paper transition-all duration-300 hover:border-gold hover:bg-[rgba(217,166,86,0.1)] whitespace-nowrap"
          >
            View Committees
          </a>
        </div>

        <div className="intro-anim relative mt-[2.6rem] md:mt-[3.2rem] flex flex-col items-center gap-[0.6rem] text-[0.66rem] tracking-[0.22em] uppercase text-muted">
          Scroll
          <span className="cue-bar rotate-90" />
        </div>
      </section>


      {/* ================ WORK / COMMITTEES (pinned stacked + expanded card + right detail) ================ */}
      <section
        ref={stage}
        id="work"
        className="relative z-[2] w-full h-[100svh] overflow-hidden bg-stage [perspective:1400px]"
      >
        <div className="grid-lines" aria-hidden="true" />

        {/* --- Stacked paper cards --- */}
        {CARDS.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`card group absolute top-1/2 left-1/2 grid w-[clamp(320px,56vw,780px)] md:w-[clamp(380px,56vw,780px)] h-[min(72vh,700px)] md:h-[min(76vh,700px)] grid-rows-[auto_minmax(0,1fr)_auto] gap-[0.9rem] md:gap-[1.1rem] rounded-[1.4rem] md:rounded-[1.6rem] p-[1.2rem] md:p-[1.5rem] pb-[1.2rem] md:pb-[1.4rem] text-paper origin-top [will-change:transform] border border-[rgba(243,250,246,0.1)] [box-shadow:0_50px_100px_-40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] max-md:w-[calc(100%-1.8rem)] max-md:left-[50%]`}
            style={{
              backgroundImage: `linear-gradient(155deg, ${CARD_ACCENT_TO} 0%, ${CARD_ACCENT_FROM} 100%)`,
            }}
          >
            <div className="flex items-center justify-between gap-2 text-[0.72rem] md:text-[0.74rem] tracking-[0.16em] uppercase">
              <span className="font-serif italic text-[1.05rem] md:text-[1.15rem] opacity-90 flex-shrink-0">
                {c.index}
              </span>
              <span className="font-medium opacity-[0.9] rounded-full border border-[rgba(243,250,246,0.24)] bg-[rgba(243,250,246,0.08)] px-[0.7rem] md:px-[0.9rem] py-[0.3rem] md:py-[0.35rem] backdrop-blur-sm truncate text-right">
                {c.cat}
              </span>
            </div>
            <div
              className="relative overflow-hidden rounded-[1rem] md:rounded-[1.1rem] border border-[rgba(243,250,246,0.1)]"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 20%, ${CARD_ACCENT_TO}55 0%, ${CARD_ACCENT_FROM}88 55%, ${CARD_ACCENT_FROM}aa 100%), repeating-linear-gradient(45deg, rgba(243,250,246,0.04) 0 2px, transparent 2px 16px)`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <img
                src={c.img}
                alt=""
                className="h-full w-full object-cover [filter:saturate(1.02)_contrast(1.04)] transition-transform duration-[600ms] group-hover:scale-[1.04]"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="flex items-end justify-between gap-[0.8rem] md:gap-[1rem] flex-wrap md:flex-nowrap">
              <h2 className="font-serif font-medium text-[clamp(1.4rem,2.6vw,2.3rem)] leading-[0.96] tracking-[-0.01em] min-w-0">
                {c.pre}
                <em className="italic font-normal opacity-[0.82]">{c.em}</em>
              </h2>
              <button
                type="button"
                onClick={() => toggleCard(c.id)}
                className="shrink-0 inline-flex items-center gap-[0.45em] rounded-full bg-paper px-[0.95rem] md:px-[1.1rem] py-[0.55rem] md:py-[0.62rem] text-[0.78rem] md:text-[0.82rem] font-medium tracking-[0.02em] text-ink no-underline [box-shadow:0_10px_24px_-14px_rgba(0,0,0,0.5)] transition-[gap,transform,background-color] duration-300 hover:gap-[0.78em] hover:-translate-y-px"
              >
                {activeCardId === c.id ? "Close details" : "View committee"}
                <span>→</span>
              </button>
            </div>
          </div>
        ))}

        {/* --- Expanded single card (shown only when activeCardId !== null) --- */}
        {activeCard && (
          <div
            className="expanded-card card group absolute top-1/2 left-1/2 z-20 w-[calc(100%-1.6rem)] max-w-[420px] lg:w-[clamp(320px,44vw,600px)] lg:max-w-none h-[min(82vh,720px)] lg:h-[min(74vh,700px)] grid grid-rows-[auto_auto_minmax(0,1fr)_auto] lg:grid-rows-[auto_minmax(0,1fr)_auto] gap-[0.7rem] md:gap-[0.9rem] lg:gap-[1rem] rounded-[1.4rem] lg:rounded-[1.6rem] p-[1.1rem] md:p-[1.3rem] lg:p-[1.6rem] text-paper origin-center [will-change:transform] border border-[rgba(243,250,246,0.18)] [box-shadow:0_60px_120px_-40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)]"
            style={{
              backgroundImage: `linear-gradient(155deg, ${CARD_ACCENT_TO} 0%, ${CARD_ACCENT_FROM} 100%)`,
            }}
          >
            <div className="flex items-center justify-between gap-2 text-[0.7rem] md:text-[0.76rem] tracking-[0.16em] uppercase">
              <span className="font-serif italic text-[1.05rem] md:text-[1.2rem] opacity-92 flex-shrink-0">
                {activeCard.index}
              </span>
              <span className="font-medium opacity-[0.92] rounded-full border border-[rgba(243,250,246,0.26)] bg-[rgba(243,250,246,0.1)] px-[0.7rem] md:px-[0.95rem] py-[0.3rem] md:py-[0.38rem] backdrop-blur-sm truncate text-right">
                {activeCard.cat}
              </span>
            </div>
            <div
              className="relative overflow-hidden rounded-[1rem] lg:rounded-[1.2rem] border border-[rgba(243,250,246,0.12)] h-[clamp(90px,18vh,160px)] lg:h-auto"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 20%, ${CARD_ACCENT_TO}55 0%, ${CARD_ACCENT_FROM}88 55%, ${CARD_ACCENT_FROM}aa 100%), repeating-linear-gradient(45deg, rgba(243,250,246,0.04) 0 2px, transparent 2px 16px)`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/4 via-transparent to-transparent" />
              <img
                src={activeCard.img}
                alt=""
                className="h-full w-full object-cover [filter:saturate(1.04)_contrast(1.05)]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* Title + mobile/tablet-only scrollable detail content (desktop uses the side panel instead) */}
            <div className="min-h-0 overflow-y-auto lg:overflow-visible flex flex-col gap-[0.6rem]">
              <h2 className="flex-shrink-0 font-serif font-medium text-[clamp(1.3rem,5vw,2rem)] lg:text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[0.98] tracking-[-0.01em] min-w-0">
                {activeCard.pre}
                <em className="italic font-normal opacity-[0.84]">
                  {activeCard.em}
                </em>
              </h2>
              <div className="lg:hidden h-px w-full bg-[rgba(243,250,246,0.2)] flex-shrink-0" />
              <div className="lg:hidden space-y-[0.6rem] text-[0.82rem] leading-[1.55] text-[rgba(243,250,246,0.88)] pr-[0.2rem]">
                {activeCard.content.split(/\n\s*\n/).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
                <a
                  href="#contact"
                  onClick={() => toggleCard(activeCard.id)}
                  className="inline-flex items-center gap-[0.4em] pt-[0.2rem] text-[0.78rem] tracking-[0.04em] text-paper underline underline-offset-4"
                >
                  Apply for this committee <span>↗</span>
                </a>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center justify-end gap-[0.8rem] md:gap-[1rem]">
              <button
                type="button"
                onClick={() => toggleCard(activeCard.id)}
                className="shrink-0 inline-flex items-center gap-[0.45em] rounded-full bg-paper px-[1rem] md:px-[1.15rem] py-[0.58rem] md:py-[0.65rem] text-[0.78rem] md:text-[0.84rem] font-medium tracking-[0.02em] text-ink transition-[gap,transform] duration-300 hover:gap-[0.72em] hover:-translate-y-px"
              >
                Close <span>×</span>
              </button>
            </div>
          </div>
        )}

        {/* --- Right detail panel (lorem ipsum content) --- */}
        <div
          ref={detailWrapRef}
          className={`absolute top-1/2 right-[4%] md:right-[5%] -translate-y-1/2 w-[clamp(260px,28vw,420px)] rounded-[1.4rem] border border-[rgba(243,250,246,0.16)] bg-[rgba(15,39,37,0.92)] backdrop-blur-xl p-[1.2rem] md:p-[1.5rem] text-paper [box-shadow:0_40px_80px_-30px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.06)] max-lg:hidden ${
            activeCard ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {activeCard && (
            <div className="h-full max-h-[74vh] flex flex-col gap-[0.8rem] overflow-hidden">
              <div className="flex items-center gap-[0.6rem]">
                <span
                  className="inline-flex items-center justify-center h-[26px] min-w-[48px] rounded-full px-[0.65rem] font-sans text-[0.58rem] font-medium tracking-[0.14em] uppercase"
                  style={{
                    color: "var(--gold)",
                    backgroundColor: "rgba(217,166,86,0.1)",
                    border: "1px solid rgba(217,166,86,0.35)",
                  }}
                >
                  {activeCard.cat}
                </span>
                <span className="font-serif italic text-muted text-[0.9rem]">
                  {activeCard.index}
                </span>
              </div>
              <h3 className="font-serif font-normal text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.02] tracking-[-0.01em]">
                {activeCard.pre}
                <em className="italic opacity-80">{activeCard.em}</em>
              </h3>
              <div className="h-[1px] w-full bg-line" />
              <div className="flex-1 overflow-y-auto pr-[0.35rem] space-y-[0.9rem] text-[0.82rem] md:text-[0.86rem] leading-[1.62] text-[rgba(243,250,246,0.88)] [scrollbar-width:thin]">
                {activeCard.content.split(/\n\s*\n/).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              <div className="flex items-center justify-between pt-[0.4rem]">
                <button
                  type="button"
                  onClick={() => setOpenModal("delegate")}
                  className="inline-flex items-center gap-[0.4em] text-[0.78rem] tracking-[0.04em] text-muted hover:text-paper transition-colors"
                >
                  Apply for this committee <span>↗</span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleCard(activeCard.id)}
                  className="inline-flex items-center gap-[0.4em] rounded-full border border-[rgba(243,250,246,0.25)] px-[0.85rem] py-[0.4rem] text-[0.72rem] tracking-[0.08em] uppercase text-paper hover:bg-paper hover:text-ink transition-colors"
                >
                  Back ←
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================ TEAM / SECRETARIAT (z bumped from 5 → 4, since journey removed) ================ */}
      <section
        id="team"
        ref={teamRef}
        className="paper-panel relative z-[4] w-full min-h-[100svh] overflow-hidden bg-bg flex flex-col justify-center px-[2.4rem] max-md:px-[1.1rem]"
      >
        <div className="section-vignette" aria-hidden="true" />
        <span className="accent-rule relative mb-[0.9rem] md:mb-[1.1rem]" aria-hidden="true" />
        <p className="relative font-sans text-[0.72rem] tracking-[0.22em] uppercase text-muted max-md:text-[0.68rem]">
          The people behind the podium
        </p>
        <div className="relative flex items-end justify-between gap-[1.2rem] mt-[0.8rem] md:mt-[1rem] flex-wrap">
          <h2 className="font-serif font-normal text-[clamp(2rem,6.5vw,5.6rem)] leading-[1] tracking-[-0.02em]">
            Meet the
            <br />
            <em className="italic text-muted">secretariat.</em>
          </h2>
        </div>

        {/* --- Coverflow carousel: centered card, stacked neighbors, side arrows --- */}
        <div className="relative mt-[2.4rem] md:mt-[3.4rem] w-full flex items-center justify-center gap-[0.6rem] md:gap-[1.6rem]">
          <button
            type="button"
            onClick={teamPrev}
            aria-label="Previous team member"
            className="relative z-[20] flex-shrink-0 flex items-center justify-center h-[42px] w-[42px] md:h-[52px] md:w-[52px] rounded-full border border-[rgba(243,250,246,0.22)] bg-[rgba(243,250,246,0.05)] backdrop-blur-sm text-paper transition-all duration-300 hover:border-gold hover:bg-[rgba(217,166,86,0.14)] hover:-translate-x-[2px] active:scale-90"
          >
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
              <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 7H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative flex-1 max-w-[900px] h-[380px] md:h-[440px]"
            style={{ perspective: "1400px" }}
          >
            {TEAM.map((m, i) => {
              const total = TEAM.length;
              let offset = i - teamIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset -= -total;
              const abs = Math.abs(offset);
              const visible = abs <= 2;

              const translateX = offset * 168;
              const translateZ = -abs * 140;
              const rotateY = offset * -28;
              const scale = 1 - abs * 0.16;
              const opacity = visible ? 1 - abs * 0.34 : 0;
              const z = 10 - abs;

              return (
                <div
                  key={i}
                  onClick={() => abs !== 0 && setTeamIndex(i)}
                  className={`absolute top-1/2 left-1/2 w-[190px] md:w-[240px] rounded-[1.2rem] md:rounded-[1.5rem] p-[1.1rem] md:p-[1.5rem] border overflow-hidden transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] [box-shadow:0_40px_90px_-30px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] ${
                    abs === 0
                      ? "border-[rgba(217,166,86,0.5)] cursor-default"
                      : "border-[rgba(243,250,246,0.12)] cursor-pointer"
                  }`}
                  style={{
                    backgroundImage: m.grad,
                    transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex: z,
                    pointerEvents: visible ? "auto" : "none",
                  }}
                >
                  {/* sheen overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
                    style={{
                      background:
                        "radial-gradient(120% 90% at 15% 0%, rgba(255,255,255,0.35), transparent 55%)",
                    }}
                    aria-hidden="true"
                  />
                  {/* gold ring glow on the active card */}
                  {abs === 0 && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[1.2rem] md:rounded-[1.5rem]"
                      style={{
                        boxShadow:
                          "inset 0 0 0 1px rgba(217,166,86,0.6), 0 0 60px -10px rgba(217,166,86,0.35)",
                      }}
                      aria-hidden="true"
                    />
                  )}

                  <div className="relative flex items-center justify-between">
                    <span className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-[rgba(243,250,246,0.55)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-[6px] w-[6px] rounded-full bg-gold opacity-70" />
                  </div>

                  <div className="relative mt-[0.7rem] md:mt-[0.9rem] aspect-square rounded-[0.85rem] md:rounded-[1rem] bg-[rgba(0,0,0,0.22)] border border-[rgba(243,250,246,0.12)] flex items-center justify-center overflow-hidden">
                    <span className="font-serif italic text-[clamp(1.8rem,4.4vw,2.7rem)] text-[rgba(243,250,246,0.4)]">
                      {m.initials}
                    </span>
                  </div>

                  <div className="relative mt-[0.85rem] md:mt-[1.1rem] h-px w-[1.6rem] bg-[rgba(217,166,86,0.6)]" />

                  <p className="relative mt-[0.5rem] font-serif text-[1.02rem] md:text-[1.15rem] leading-[1.15] tracking-[-0.005em] text-paper break-words">
                    {m.name}
                  </p>
                  <p className="relative mt-[0.15rem] text-[0.64rem] md:text-[0.68rem] tracking-[0.12em] uppercase text-paper opacity-70 break-words">
                    {m.role}
                  </p>
                  <p className="relative mt-[0.6rem] text-[0.72rem] md:text-[0.76rem] leading-[1.5] text-[rgba(243,250,246,0.72)]">
                    {m.bio}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={teamNext}
            aria-label="Next team member"
            className="relative z-[20] flex-shrink-0 flex items-center justify-center h-[42px] w-[42px] md:h-[52px] md:w-[52px] rounded-full border border-[rgba(243,250,246,0.22)] bg-[rgba(243,250,246,0.05)] backdrop-blur-sm text-paper transition-all duration-300 hover:border-gold hover:bg-[rgba(217,166,86,0.14)] hover:translate-x-[2px] active:scale-90"
          >
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
              <path d="M9 1L15 7L9 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 7H1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="relative mt-[1.6rem] md:mt-[2rem] flex items-center justify-center gap-[0.5rem]">
          {TEAM.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setTeamIndex(i)}
              aria-label={`Go to team member ${i + 1}`}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                i === teamIndex ? "w-[22px] bg-gold" : "w-[6px] bg-[rgba(243,250,246,0.22)] hover:bg-[rgba(243,250,246,0.4)]"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================ CONTACT / CTA (z bumped from 6 → 5) ================ */}
      <section
        id="contact"
        ref={contactRef}
        className="paper-panel relative z-[5] w-full min-h-[100svh] overflow-hidden bg-bg flex flex-col justify-center items-start px-[2.4rem] gap-[1.2rem] md:gap-[1.4rem] max-md:px-[1.1rem]"
      >
        <div className="section-vignette" aria-hidden="true" />
        <span className="accent-rule relative" aria-hidden="true" />
        <p className="relative font-sans text-[0.72rem] tracking-[0.22em] uppercase text-muted max-md:text-[0.68rem]">
          Ready to take the floor?
        </p>
        <h2 className="relative font-serif font-normal text-[clamp(2rem,6.5vw,5.6rem)] leading-[1] tracking-[-0.02em]">
          Let&apos;s shape
          <br />
          <em className="italic text-muted">the resolution.</em>
        </h2>

        <p className="relative mt-[0.2rem] font-sans text-[0.68rem] md:text-[0.72rem] tracking-[0.1em] uppercase text-muted">
          Choose how you&apos;ll take part
        </p>

        <div className="relative mt-[0.8rem] md:mt-[1.1rem] grid grid-cols-1 sm:grid-cols-2 gap-[0.85rem] md:gap-[1rem] w-full max-w-[820px]">
          {ROLES.map((role) => (
            <button
              key={role.key}
              type="button"
              onClick={() => setOpenModal(role.key)}
              style={{ "--role-accent": role.accent, "--role-accent-dim": role.accentDim }}
              className="role-card group relative flex items-center gap-[1rem] md:gap-[1.2rem] rounded-[1.1rem] md:rounded-[1.2rem] border border-[rgba(243,250,246,0.12)] bg-[rgba(243,250,246,0.03)] backdrop-blur-sm px-[1.1rem] md:px-[1.3rem] py-[1.1rem] md:py-[1.25rem] text-left transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[var(--role-accent)] hover:bg-[rgba(243,250,246,0.05)] hover:-translate-y-[3px] min-w-0 overflow-hidden [box-shadow:0_20px_45px_-30px_rgba(0,0,0,0.6)] hover:[box-shadow:0_28px_60px_-28px_var(--role-accent-dim),0_0_0_1px_var(--role-accent-dim)]"
            >
              {/* accent glow that blooms in on hover */}
              <span
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(120% 140% at 0% 0%, var(--role-accent-dim), transparent 60%)",
                }}
                aria-hidden="true"
              />

              <span
                className="relative z-[1] flex-shrink-0 flex items-center justify-center h-[2.9rem] w-[2.9rem] md:h-[3.2rem] md:w-[3.2rem] rounded-[0.85rem] border transition-all duration-[400ms]"
                style={{
                  borderColor: "rgba(243,250,246,0.16)",
                  backgroundColor: "rgba(243,250,246,0.04)",
                  color: role.accent,
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-500 group-hover:scale-110"
                >
                  {role.icon}
                </svg>
              </span>

              <span className="relative z-[1] flex-1 min-w-0">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-serif text-[1.08rem] md:text-[1.22rem] tracking-[-0.01em] text-paper truncate">
                    {role.label}
                  </span>
                  <span
                    className="flex-shrink-0 flex items-center justify-center h-[1.7rem] w-[1.7rem] md:h-[1.85rem] md:w-[1.85rem] rounded-full border text-[0.72rem] opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-[2px] group-hover:rotate-45"
                    style={{
                      borderColor: "rgba(243,250,246,0.22)",
                      color: role.accent,
                    }}
                  >
                    ↗
                  </span>
                </span>
                <span className="mt-[0.3rem] block font-sans text-[0.74rem] md:text-[0.78rem] leading-[1.4] text-muted truncate">
                  {role.desc}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="relative mt-[1.6rem] md:mt-[2rem] flex flex-col sm:flex-row sm:items-center gap-[1rem] sm:gap-[1.6rem]">
          <button
            type="button"
            onClick={() => setOpenModal("delegate")}
            className="relative inline-flex items-center justify-center gap-[0.5em] rounded-full bg-paper px-[1.5rem] md:px-[1.8rem] py-[0.85rem] md:py-[1rem] text-[0.85rem] md:text-[0.92rem] tracking-[0.02em] text-ink transition-transform duration-300 hover:-translate-y-[2px] whitespace-nowrap [box-shadow:0_0_0_1px_rgba(217,166,86,0.4),0_20px_50px_-20px_rgba(217,166,86,0.35)]"
          >
            Register now <span>↗</span>
          </button>
          <p className="font-sans text-[0.66rem] md:text-[0.72rem] tracking-[0.12em] uppercase text-muted">
            TSBL MUN — Model United Nations · Istanbul
          </p>
        </div>
      </section>

      {/* back to top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Yukarı çık"
        style={{ bottom: "max(1.6rem, calc(env(safe-area-inset-bottom) + 1rem))" }}
        className={`fixed right-[1.6rem] md:bottom-[2.2rem] md:right-[2.2rem] z-[55] flex items-center justify-center h-[46px] w-[46px] rounded-full border border-[rgba(243,250,246,0.18)] bg-[rgba(10,12,11,0.6)] backdrop-blur-md text-paper transition-all duration-300 hover:border-gold hover:bg-[rgba(217,166,86,0.16)] hover:-translate-y-[2px] ${
          showTopBtn
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-[10px] pointer-events-none"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <DelegateModal open={openModal === "delegate"} onClose={() => setOpenModal(null)} />
      <ChairboardModal open={openModal === "chairboard"} onClose={() => setOpenModal(null)} />
      <AdminModal open={openModal === "admin"} onClose={() => setOpenModal(null)} />
      <PressModal open={openModal === "press"} onClose={() => setOpenModal(null)} />
    </main>
  );
}
