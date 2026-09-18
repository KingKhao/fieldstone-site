"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  title,
}: {
  beforeSrc: string;
  afterSrc: string;
  title: string;
}) {
  const [position, setPosition] = useState(50); // % of width showing the "after" image
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
    else if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
    else if (e.key === "Home") setPosition(0);
    else if (e.key === "End") setPosition(100);
  };

  return (
    <div className="select-none">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full touch-none overflow-hidden rounded-xl bg-stone"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={beforeSrc} alt={`${title} — before`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={afterSrc}
            alt={`${title} — after`}
            className="h-full object-cover"
            style={{ width: containerWidth ? `${containerWidth}px` : "100%", maxWidth: "none" }}
            draggable={false}
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-paper">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-clay px-3 py-1 text-xs font-semibold uppercase tracking-wide text-paper">
          After
        </span>

        <div className="absolute inset-y-0" style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
          <div className="h-full w-0.5 bg-paper/90" />
          <button
            type="button"
            role="slider"
            aria-label={`Drag to compare before and after — ${title}`}
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onKeyDown={onKeyDown}
            className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-paper text-clay shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-charcoal-muted">Drag the handle to compare — or use the arrow keys.</p>
    </div>
  );
}
