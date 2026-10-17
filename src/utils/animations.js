/**
 * Aces Adventure Club - Premium GSAP Animation System
 *
 * Provides high-performance GreenSock animations for:
 * - Staggered hero typography and call-to-actions
 * - Interactive adventure and expedition cards
 * - Floating badges and glowing stat numbers
 * - Smooth mobile navigation drawer slide & fade
 * - Modal dialog zoom-in and fade-out
 * - Section reveals with subtle parallax easing
 */

import { Platform } from "react-native";
import gsap from "gsap";

/**
 * Checks if user prefers reduced motion or if not in web environment.
 */
export const isMotionAllowed = () => {
  if (Platform.OS !== "web" || typeof window === "undefined") {
    return false;
  }
  try {
    return !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  } catch (_e) {
    return true;
  }
};

/**
 * Animate hero section elements with a luxury staggered entrance.
 */
export const animateHero = (targets = ".gsap-hero-item") => {
  if (!isMotionAllowed()) return;

  try {
    gsap.killTweensOf(targets);
    gsap.fromTo(
      targets,
      {
        opacity: 0,
        y: 35,
        filter: "blur(4px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "filter",
      }
    );
  } catch (err) {
    console.debug("[GSAP] animateHero error:", err);
  }
};

/**
 * Animate cards in a grid with an energetic staggered wave.
 */
export const animateCards = (targets = ".gsap-card") => {
  if (!isMotionAllowed()) return;

  try {
    gsap.killTweensOf(targets);
    gsap.fromTo(
      targets,
      {
        opacity: 0,
        y: 40,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: "back.out(1.2)",
      }
    );
  } catch (err) {
    console.debug("[GSAP] animateCards error:", err);
  }
};

/**
 * Animate statistics or counter items.
 */
export const animateStats = (targets = ".gsap-stat") => {
  if (!isMotionAllowed()) return;

  try {
    gsap.killTweensOf(targets);
    gsap.fromTo(
      targets,
      {
        opacity: 0,
        scale: 0.85,
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  } catch (err) {
    console.debug("[GSAP] animateStats error:", err);
  }
};

/**
 * Animate a section entrance when it comes into view or loads.
 */
export const animateSection = (targets = ".gsap-section") => {
  if (!isMotionAllowed()) return;

  try {
    gsap.killTweensOf(targets);
    gsap.fromTo(
      targets,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  } catch (err) {
    console.debug("[GSAP] animateSection error:", err);
  }
};

/**
 * Animate mobile menu dropdown open/close.
 */
export const animateMobileMenu = (target = ".gsap-mobile-menu", isOpen = true) => {
  if (!isMotionAllowed()) return;

  try {
    gsap.killTweensOf(target);
    if (isOpen) {
      gsap.fromTo(
        target,
        {
          opacity: 0,
          y: -15,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: "power3.out",
        }
      );
    }
  } catch (err) {
    console.debug("[GSAP] animateMobileMenu error:", err);
  }
};

/**
 * Animate modal dialog pop-in.
 */
export const animateModal = (target = ".gsap-modal-content") => {
  if (!isMotionAllowed()) return;

  try {
    gsap.killTweensOf(target);
    gsap.fromTo(
      target,
      {
        opacity: 0,
        scale: 0.92,
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.5)",
      }
    );
  } catch (err) {
    console.debug("[GSAP] animateModal error:", err);
  }
};

export default {
  animateHero,
  animateCards,
  animateStats,
  animateSection,
  animateMobileMenu,
  animateModal,
  isMotionAllowed,
};
