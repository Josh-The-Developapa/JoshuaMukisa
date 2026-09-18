import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

/**
 * useScrollReveal
 *
 * Attach the returned ref to a container, mark the things that should
 * animate in with `data-reveal`, and they fade/rise once as they enter.
 *
 *   const scope = useScrollReveal();
 *   <section ref={scope}><div data-reveal>…</div></section>
 *
 * Uses ScrollTrigger.batch, so elements that enter the viewport together
 * are staggered together instead of each firing its own tween — that's
 * what makes a grid feel choreographed rather than twitchy.
 *
 * Animations run once and never replay on scroll-up. Honours
 * prefers-reduced-motion by leaving everything visible and static.
 */
export default function useScrollReveal({
    selector = '[data-reveal]',
    y = 28,
    stagger = 0.09,
    start = 'top 88%',
    duration = 0.85,
} = {}) {
    const scope = useRef(null);

    useLayoutEffect(() => {
        const root = scope.current;
        if (!root) return;

        const items = gsap.utils.toArray(selector, root);
        if (!items.length) return;

        if (prefersReducedMotion()) {
            gsap.set(items, { opacity: 1, y: 0, clearProps: 'transform' });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.set(items, { opacity: 0, y, willChange: 'transform, opacity' });

            ScrollTrigger.batch(items, {
                start,
                once: true,
                onEnter: (batch) =>
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration,
                        stagger,
                        overwrite: true,
                        clearProps: 'willChange',
                    }),
            });
        }, root);

        return () => ctx.revert();
    }, [selector, y, stagger, start, duration]);

    return scope;
}