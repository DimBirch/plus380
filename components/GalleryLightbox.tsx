'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryLightbox({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-ink-800"
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="(max-width: 768px) 45vw, 320px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 backdrop-blur-md"
          onClick={close}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-bone-50 hover:border-red-400/60"
          >
            <X size={18} />
          </button>

          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-bone-50 hover:border-red-400/60 sm:left-8"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="relative aspect-[4/3] w-[90vw] max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex]}
              alt={`${alt} ${openIndex + 1}`}
              fill
              sizes="90vw"
              className="rounded-xl object-contain"
            />
          </div>

          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-bone-50 hover:border-red-400/60 sm:right-8"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
}
