import { useCallback, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

/**
 * Height of the fixed header, in px — matches the h-[80px] bar in
 * components/Header/Header.jsx. Anchor targets land below it.
 */
export const HEADER_OFFSET = 80;

/**
 * useSmoothScroll
 *
 * Boots Lenis and drives it off GSAP's ticker so momentum scrolling and
 * every ScrollTrigger share one clock — without this they run on separate
 * rAF loops and scrubbed animations lag a frame behind the page.
 *
 * Returns a `scrollTo` for anchor navigation. If reduced motion is on,
 * Lenis never starts and `scrollTo` falls back to native scrolling.
 */
export default function useSmoothScroll() {
    const lenisRef = useRef(null);

    useLayoutEffect(() => {
        if (prefersReducedMotion()) return;

        const lenis = new Lenis({
            duration: 1.05,
            smoothWheel: true,
            // Native momentum on touch devices feels better than an emulated one.
            syncTouch: false,
            autoRaf: false,
        });
        lenisRef.current = lenis;

        const update = (time) => lenis.raf(time * 1000);

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.off('scroll', ScrollTrigger.update);
            gsap.ticker.remove(update);
            gsap.ticker.lagSmoothing(500, 33);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    const scrollTo = useCallback((target) => {
        const el =
            typeof target === 'string' ? document.getElementById(target) : target;
        if (!el) return;

        if (lenisRef.current) {
            lenisRef.current.scrollTo(el, {
                offset: -HEADER_OFFSET,
                duration: 1.1,
            });
        } else {
            window.scrollTo({
                top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
                behavior: 'smooth',
            });
        }
    }, []);

    return { lenisRef, scrollTo };
}