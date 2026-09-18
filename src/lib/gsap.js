import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Single place where GSAP is configured. Import `gsap` / `ScrollTrigger`
 * from here — never directly from the package — so plugins are registered
 * exactly once and every section shares the same easing language.
 */
gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'power3.out', duration: 0.9 });

// Stops mobile browsers from firing a full refresh every time the URL bar
// collapses, which is what causes mid-scroll jumps on iOS Safari.
ScrollTrigger.config({ ignoreMobileResize: true });

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };