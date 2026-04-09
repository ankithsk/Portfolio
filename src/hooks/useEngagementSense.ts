export interface DwellTrigger {
  selector: string;
  threshold: number; // seconds of continuous visibility to trigger
  onTrigger: () => void;
  once?: boolean; // default true — fire only once
}

export function initEngagementSense(triggers: DwellTrigger[]) {
  const dwellTimers = new Map<string, number>();
  const fired = new Set<string>();
  const intervals = new Map<string, ReturnType<typeof setInterval>>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const selector = (entry.target as HTMLElement).dataset.dwellId!;
        const trigger = triggers.find((t) => t.selector === selector);
        if (!trigger) return;
        const once = trigger.once !== false;

        if (entry.isIntersecting) {
          // Start counting dwell time
          dwellTimers.set(selector, Date.now());
          const interval = setInterval(() => {
            if (once && fired.has(selector)) {
              clearInterval(interval);
              return;
            }
            const start = dwellTimers.get(selector);
            if (start && (Date.now() - start) / 1000 >= trigger.threshold) {
              trigger.onTrigger();
              fired.add(selector);
              if (once) clearInterval(interval);
            }
          }, 500);
          intervals.set(selector, interval);
        } else {
          // Left viewport — reset timer
          dwellTimers.delete(selector);
          const interval = intervals.get(selector);
          if (interval) clearInterval(interval);
          intervals.delete(selector);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Attach data-dwell-id attributes and observe
  triggers.forEach((trigger) => {
    const el = document.querySelector(trigger.selector);
    if (el) {
      (el as HTMLElement).dataset.dwellId = trigger.selector;
      observer.observe(el);
    }
  });

  // Scroll velocity tracking
  let lastScrollY = window.scrollY;
  let lastScrollTime = Date.now();
  let scrollVelocity = 0;

  const onScroll = () => {
    const now = Date.now();
    const dt = (now - lastScrollTime) / 1000;
    if (dt > 0) {
      scrollVelocity = Math.abs(window.scrollY - lastScrollY) / dt;
    }
    lastScrollY = window.scrollY;
    lastScrollTime = now;
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  return {
    getScrollVelocity: () => scrollVelocity,
    destroy: () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      intervals.forEach((interval) => clearInterval(interval));
    },
  };
}
