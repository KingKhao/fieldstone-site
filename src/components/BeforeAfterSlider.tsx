"use client";

import { useState } from "react";

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  title,
}: {
  beforeSrc: string;
  afterSrc: string;
  title: string;
}) {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <div className="select-none">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={`${title} — before`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            showAfter ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterSrc}
          alt={`${title} — after`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            showAfter ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-x-0 bottom-3 flex justify-center">
          <div className="inline-flex rounded-full bg-charcoal/70 p-1 backdrop-blur-sm">
            <button
              type="button"
              aria-pressed={!showAfter}
              onClick={() => setShowAfter(false)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${
                !showAfter ? "bg-paper text-charcoal" : "text-paper/75 hover:text-paper"
              }`}
            >
              Before
            </button>
            <button
              type="button"
              aria-pressed={showAfter}
              onClick={() => setShowAfter(true)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${
                showAfter ? "bg-clay text-paper" : "text-paper/75 hover:text-paper"
              }`}
            >
              After
            </button>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-charcoal-muted">Tap to compare the before and after.</p>
    </div>
  );
}
