import { useEffect, useRef } from "react";

export default function useScrollReveal(
  threshold = 0.1,
  rootMargin = "0px 0px 0px 0px"
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const revealChildren = () => {
      el.querySelectorAll(".reveal:not(.visible), .reveal-flip:not(.visible), .reveal-bounce:not(.visible), .reveal-slice:not(.visible), .reveal-slice-right:not(.visible)").forEach((child, i) => {
        setTimeout(() => {
          child.classList.add("visible");
        }, i * 100);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          revealChildren();
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible");
      revealChildren();
      observer.unobserve(el);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
