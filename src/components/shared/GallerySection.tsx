"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: 1,
    title: "Grand Lobby",
    category: "Interior",
    image: "/images/room1.avif",
  },
  {
    id: 2,
    title: "Infinity Pool",
    category: "Experience",
    image: "/images/room2.avif",
  },
  {
    id: 3,
    title: "Luxury Suite",
    category: "Rooms",
    image: "/images/room3.avif",
  },
  {
    id: 4,
    title: "Signature Dining",
    category: "Dining",
    image: "/images/dining/restaurant.avif",
  },
  {
    id: 5,
    title: "Wellness & Spa",
    category: "Wellness",
    image: "/images/rooms/room-1.avif",
  },
  {
    id: 6,
    title: "Evening Lounge",
    category: "Lifestyle",
    image: "/images/rooms/room-2.avif",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".gallery-item", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".gallery-bottom", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-bottom",
          start: "top 90%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((activeIndex + 1) % galleryItems.length);
      if (e.key === "ArrowLeft") setActiveIndex((activeIndex - 1 + galleryItems.length) % galleryItems.length);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-32"
      >
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">

          {/* HEADER */}
          <div className="gallery-heading mb-8 flex flex-col justify-between gap-6 border-b border-black/10 pb-6 sm:mb-12 sm:pb-8 lg:mb-16 lg:flex-row lg:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3 sm:mb-6">
                <span className="h-[2px] w-8 bg-[#ff784e] sm:w-10" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-black sm:text-[10px]">
                  Our Gallery
                </span>
              </div>
              <h2 className="text-4xl font-light leading-[0.95] tracking-[-0.05em] text-black sm:text-5xl lg:text-[82px]">
                See the
                <br />
                <span className="font-semibold">experience.</span>
              </h2>
            </div>
            <div className="max-w-sm lg:pb-2">
              <p className="border-l-2 border-[#ff784e] pl-5 text-[13px] leading-6 text-black/45 sm:text-sm sm:leading-7">
                Take a glimpse into the spaces, details and
                experiences that make The Azura special.
              </p>
            </div>
          </div>

          {/* GALLERY GRID — 3 columns like Almaris */}
          <div className="gallery-grid grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">

            {galleryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(item.id - 1)}
                className="gallery-item group relative aspect-[4/3] overflow-hidden rounded-xl bg-black text-left"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/30" />

                {/* View text */}
                <span className="absolute inset-0 flex items-center justify-center text-[15px] font-semibold uppercase tracking-[0.15em] text-white opacity-0 transition-all duration-500 group-hover:opacity-100 sm:text-[17px]">
                  View
                </span>
              </button>
            ))}

          </div>

          {/* BOTTOM */}
          <div className="gallery-bottom mt-8 flex flex-col justify-between gap-4 border-t border-black/10 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:pt-7">
            <p className="text-[9px] uppercase tracking-[0.2em] text-black/35 sm:text-[10px]">
              Click any image to explore
            </p>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#ff784e] sm:w-10" />
              <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-black/40 sm:text-[9px]">
                The Azura Collection
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* LIGHTBOX */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-all duration-300 hover:border-[#ff784e] hover:bg-[#ff784e] sm:right-8 sm:top-8 sm:h-11 sm:w-11"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((activeIndex - 1 + galleryItems.length) % galleryItems.length);
            }}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-all duration-300 hover:border-[#ff784e] hover:bg-[#ff784e] sm:left-8 sm:h-12 sm:w-12"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="relative max-h-[85vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[activeIndex].image}
              alt={galleryItems[activeIndex].title}
              className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain sm:max-h-[78vh]"
            />
            <div className="mt-3 flex items-center justify-between gap-4 text-white sm:mt-5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#ff784e]">
                  {galleryItems[activeIndex].category}
                </p>
                <h3 className="mt-1 text-base font-semibold sm:text-xl">
                  {galleryItems[activeIndex].title}
                </h3>
              </div>
              <span className="text-[11px] text-white/40 sm:text-xs">
                {String(activeIndex + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((activeIndex + 1) % galleryItems.length);
            }}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-all duration-300 hover:border-[#ff784e] hover:bg-[#ff784e] sm:right-8 sm:h-12 sm:w-12"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </>
  );
}
