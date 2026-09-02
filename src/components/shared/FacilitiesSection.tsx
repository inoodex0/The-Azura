"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Dumbbell,
  Waves,
  Utensils,
  Sparkles,
  Car,
  Wifi,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  {
    id: 1,
    title: "Infinity Pool",
    subtitle: "Relax & Refresh",
    description:
      "Take a refreshing break and unwind beside our beautifully designed pool.",
    image: "/images/facilities/pool.webp",
    icon: Waves,
    large: true,
  },
  {
    id: 2,
    title: "Fine Dining",
    subtitle: "Taste & Discover",
    description:
      "Enjoy carefully crafted dishes prepared with fresh ingredients.",
    image: "/images/facilities/dining.avif",
    icon: Utensils,
    large: true,
  },
  {
    id: 3,
    title: "Spa & Wellness",
    subtitle: "Relax & Rejuvenate",
    description:
      "Restore your body and mind with our relaxing wellness experience.",
    image: "/images/facilities/spa.avif",
    icon: Sparkles,
    large: false,
  },
  {
    id: 4,
    title: "Fitness Center",
    subtitle: "Move & Energize",
    description:
      "Stay active with modern equipment available throughout your stay.",
    image: "/images/facilities/gym.webp",
    icon: Dumbbell,
    large: false,
  },
  {
    id: 5,
    title: "Private Parking",
    subtitle: "Easy & Convenient",
    description:
      "Secure and convenient parking for a worry-free arrival.",
    image: "/images/facilities/parking.jpg",
    icon: Car,
    large: false,
  },
  {
    id: 6,
    title: "High-Speed Wi-Fi",
    subtitle: "Always Connected",
    description:
      "Stay connected with reliable high-speed Wi-Fi throughout the hotel.",
    image: "/images/facilities/wifi.avif",
    icon: Wifi,
    large: false,
  },
];

export default function FacilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".facility-heading", {
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

      gsap.from(".facility-card", {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".facilities-grid",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".facility-bottom", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".facility-bottom",
          start: "top 90%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#ff784e] py-20 sm:py-28 lg:py-36"
    >

      <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-10">

        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <div className="facility-heading mb-10 lg:mb-14">

          {/* Label */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-white" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
              Hotel Facilities
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h2 className="max-w-2xl text-4xl font-light leading-[1.05] tracking-[-0.035em] text-black sm:text-5xl lg:text-6xl">
              Everything you need,
              <br />
              <span className="font-semibold">all in one place.</span>
            </h2>

            {/* Description */}
            <p className="max-w-xs border-l-2 border-white pb-1 pl-5 text-sm leading-7 text-black/60">
              From wellness and dining to leisure and convenience,
              discover everything designed to make your stay
              effortless.
            </p>
          </div>
        </div>

        {/* ===================================================== */}
        {/* FEATURED FACILITIES */}
        {/* ===================================================== */}

        <div className="facilities-grid grid grid-cols-1 gap-5 lg:grid-cols-2">

          {facilities.slice(0, 2).map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              large
            />
          ))}

        </div>

        {/* ===================================================== */}
        {/* SMALL FACILITIES */}
        {/* ===================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {facilities.slice(2).map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
            />
          ))}

        </div>

        {/* ===================================================== */}
        {/* BOTTOM CTA */}
        {/* ===================================================== */}

        <div className="facility-bottom mt-14 flex flex-col items-center gap-6 border-t border-black/10 pt-8 text-center">

          <Link
            href="/facilities"
            className="group flex w-fit items-center gap-4 border border-black px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-black transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
          >
            Explore All Facilities

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[#ff784e] transition-all duration-300 group-hover:bg-[#ff784e] group-hover:text-white">
              <ArrowUpRight size={14} />
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}

/* ============================================================= */
/* FACILITY CARD */
/* ============================================================= */

function FacilityCard({
  facility,
  large = false,
}: {
  facility: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    icon: React.ElementType;
  };
  large?: boolean;
}) {
  const Icon = facility.icon;

  return (
    <Link
      href={`/facilities/${facility.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace("&", "and")}`}
      className={`facility-card group relative block overflow-hidden bg-black ${
        large
          ? "aspect-[16/10] sm:aspect-[16/9]"
          : "aspect-[1/1]"
      }`}
    >

      {/* ================================================= */}
      {/* IMAGE */}
      {/* ================================================= */}

      <img
        src={facility.image}
        alt={facility.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-all duration-500 group-hover:from-black/90" />

      {/* Hover Orange Overlay */}
      <div className="absolute inset-0 bg-[#ff784e]/0 transition-all duration-500 group-hover:bg-[#ff784e]/10" />

      {/* ================================================= */}
      {/* TOP ICON */}
      {/* ================================================= */}

      <div className="absolute left-5 top-5 z-10 hidden h-11 w-11 items-center justify-center border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all duration-500 group-hover:border-[#ff784e] group-hover:bg-[#ff784e] sm:flex">
        <Icon size={18} strokeWidth={1.5} />
      </div>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 sm:p-7">

        {/* Subtitle */}
        <span className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.2em] text-[#ff784e] sm:mb-2 sm:text-[9px]">
          {facility.subtitle}
        </span>

        {/* Title */}
        <div className="flex items-end justify-between gap-5">

          <div>
            <h3
              className={`font-semibold tracking-[-0.025em] text-white ${
                large
                  ? "text-2xl sm:text-3xl sm:text-4xl"
                  : "text-lg sm:text-2xl"
              }`}
            >
              {facility.title}
            </h3>

            {/* Description only on large cards */}
            {large && (
              <p className="mt-3 max-w-md text-xs leading-6 text-white/55">
                {facility.description}
              </p>
            )}
          </div>

          {/* Arrow */}
          <span className="flex h-11 w-11 shrink-0 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:bg-[#ff784e] group-hover:text-white group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </span>

        </div>

        {/* Bottom Line */}
        <div className="mt-3 h-px w-full bg-white/20 sm:mt-5">
          <div className="h-full w-0 bg-[#ff784e] transition-all duration-700 group-hover:w-full" />
        </div>

      </div>

    </Link>
  );
}