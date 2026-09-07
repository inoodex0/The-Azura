"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  BedDouble,
} from "lucide-react";
import gsap from "gsap";
import DatePicker from "./DatePicker";

const slides = [
  { src: "/images/room1.avif", alt: "Luxury Hotel Room" },
  { src: "/images/room2.avif", alt: "Premium Suite" },
  { src: "/images/room3.avif", alt: "Executive Room" },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Booking state */
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [calendarSide, setCalendarSide] = useState<"left" | "right">("left");
  const [calendarFlipBelow, setCalendarFlipBelow] = useState(true);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const guestsBtnRef = useRef<HTMLButtonElement>(null);
  const roomsBtnRef = useRef<HTMLButtonElement>(null);
  const [guestsPos, setGuestsPos] = useState({ top: 0, left: 0 });
  const [roomsPos, setRoomsPos] = useState({ top: 0, left: 0 });

  const openCalendar = (e: React.MouseEvent, side: "left" | "right") => {
    const rect = e.currentTarget.getBoundingClientRect();
    const calendarH = 400;
    const spaceBelow = window.innerHeight - rect.bottom;
    const flip = spaceBelow < calendarH;
    setCalendarFlipBelow(!flip);
    setCalendarSide(side);
    if (flip) {
      setCalendarPos({ top: rect.top - calendarH - 8, left: side === "left" ? rect.left : rect.right - 600 });
    } else {
      setCalendarPos({ top: rect.bottom + 8, left: side === "left" ? rect.left : rect.right - 600 });
    }
    setDateOpen(!dateOpen);
    setGuestsOpen(false);
    setRoomsOpen(false);
  };

  /* ─── GSAP entrance ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(heroRef.current, { scale: 1.08 }, { scale: 1, duration: 1.8 })
        .fromTo(".hero-label", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=1")
        .fromTo(".hero-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .fromTo(".hero-description", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.6")
        .fromTo(".hero-actions", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(bookingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ─── Slide transition ─── */
  const goTo = (index: number) => {
    const next = ((index % slides.length) + slides.length) % slides.length;
    const outEl = slideRefs.current[current];
    const inEl = slideRefs.current[next];

    if (outEl && inEl && current !== next) {
      gsap.to(outEl, { opacity: 0, scale: 1.05, duration: 1.2, ease: "power2.inOut" });
      gsap.fromTo(
        inEl,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.inOut" }
      );
    }

    setCurrent(next);
  };

  /* ─── Auto-play ─── */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        const outEl = slideRefs.current[prev];
        const inEl = slideRefs.current[next];

        if (outEl && inEl) {
          gsap.to(outEl, { opacity: 0, scale: 1.05, duration: 1.2, ease: "power2.inOut" });
          gsap.fromTo(
            inEl,
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "power2.inOut" }
          );
        }
        return next;
      });
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const prev = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goTo(current - 1);
  };

  const next = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goTo(current + 1);
  };

  useEffect(() => {
    const onScroll = () => {
      setDateOpen(false);
      setGuestsOpen(false);
      setRoomsOpen(false);
    };
    if (dateOpen || guestsOpen || roomsOpen) {
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [dateOpen, guestsOpen, roomsOpen]);

  return (
    <section className="relative min-h-[100dvh] bg-black sm:h-screen">

      {/* ========================================================= */}
      {/* IMAGE SLIDER — full cover */}
      {/* ========================================================= */}

      <div ref={heroRef} className="absolute inset-0 h-full w-full overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 h-full w-full"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[2] bg-black/40" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* ========================================================= */}
      {/* SLIDER CONTROLS */}
      {/* ========================================================= */}

      {/* Prev arrow — left middle */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 hidden sm:flex lg:left-8"
        aria-label="Previous slide"
      >
        <div className="flex h-12 w-12 items-center justify-center border border-white/30 text-white backdrop-blur-sm transition-all duration-300 hover:border-[#ff784e] hover:text-[#ff784e]">
          <ChevronLeft size={20} />
        </div>
      </button>

      {/* Next arrow — right middle */}
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 hidden sm:flex lg:right-8"
        aria-label="Next slide"
      >
        <div className="flex h-12 w-12 items-center justify-center border border-white/30 text-white backdrop-blur-sm transition-all duration-300 hover:border-[#ff784e] hover:text-[#ff784e]">
          <ChevronRight size={20} />
        </div>
      </button>

      {/* Dots — bottom center */}
      <div className="absolute bottom-[110px] left-1/2 z-20 -translate-x-1/2 sm:bottom-[130px] lg:bottom-[140px]">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                goTo(i);
              }}
              className={`h-[3px] transition-all duration-500 ${
                i === current ? "w-8 bg-[#ff784e]" : "w-4 bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* HERO CONTENT — centered */}
      {/* ========================================================= */}

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1500px] flex-col items-center justify-center px-4 pt-[70px] pb-[280px] text-center sm:h-screen sm:px-8 sm:pt-20 sm:pb-[180px] lg:px-10 lg:pt-32 lg:pb-60"
      >
        {/* Label */}
        <div className="hero-label mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
          <span className="h-px w-6 bg-[#ff784e] sm:w-10" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white sm:text-[11px] sm:tracking-[0.3em]">
            Welcome to The Azura
          </span>
          <span className="h-px w-6 bg-[#ff784e] sm:w-10" />
        </div>

        {/* Heading */}
        <h1 className="hero-title text-[32px] font-light leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px]">
          Welcome to
          <br />
          <span className="font-semibold">The Azura</span>
        </h1>

        {/* Description */}
        <p className="hero-description mt-4 max-w-[300px] px-1 text-[11px] leading-5 text-white/80 sm:mt-7 sm:max-w-2xl sm:text-sm sm:leading-7 md:text-base">
          Stay close to nature, comfort, and breathtaking views. The Azura welcomes you
          to unwind and enjoy every moment.
        </p>

        {/* Actions */}
        <div className="hero-actions mt-5 flex w-full max-w-xs flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-3">
          <Link
            href="/booking"
            className="group flex w-full items-center justify-center gap-4 bg-[#ff784e] px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-white hover:text-black sm:w-fit sm:px-6 sm:text-[12px]"
          >
            Book Your Stay
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:bg-[#ff784e] group-hover:text-white">
              <ArrowUpRight size={15} />
            </span>
          </Link>
          <Link
            href="/rooms"
            className="flex w-full items-center justify-center gap-3 border border-white/40 px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:w-fit sm:px-6"
          >
            Explore Rooms
          </Link>
        </div>
      </div>

      {/* ========================================================= */}
      {/* BOOKING SEARCH — bottom bar */}
      {/* ========================================================= */}

      <div
        ref={bookingRef}
        className="absolute bottom-0 left-0 z-20 w-full"
      >
        <div className="mx-auto max-w-[1300px] px-2 pb-2 sm:px-6 sm:pb-5 lg:px-10 lg:pb-8">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl sm:rounded-2xl lg:rounded-3xl">

            {/* Top accent line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#ff784e] to-transparent" />

            {/* Mobile layout */}
            <div className="p-2.5 sm:hidden">
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <button type="button"
                    onClick={(e) => openCalendar(e, "left")}
                    className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-3 text-left">
                    <CalendarDays size={15} className="text-[#ff784e] shrink-0" />
                    <div className="flex flex-1 flex-col min-w-0">
                      <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/35">Check-in</span>
                      <span className="mt-0.5 text-[12px] font-medium text-white truncate">{checkIn ? new Date(checkIn + "T00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Select"}</span>
                    </div>
                    <ChevronDown size={13} className={`text-white/25 transition-all duration-300 shrink-0 ${dateOpen ? "rotate-180 text-[#ff784e]" : ""}`} />
                  </button>
                </div>

                <div className="relative">
                  <button type="button"
                    onClick={(e) => openCalendar(e, "right")}
                    className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-3 text-left">
                    <CalendarDays size={15} className="text-[#ff784e] shrink-0" />
                    <div className="flex flex-1 flex-col min-w-0">
                      <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/35">Check-out</span>
                      <span className="mt-0.5 text-[12px] font-medium text-white truncate">{checkOut ? new Date(checkOut + "T00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Select"}</span>
                    </div>
                    <ChevronDown size={13} className={`text-white/25 transition-all duration-300 shrink-0 ${dateOpen ? "rotate-180 text-[#ff784e]" : ""}`} />
                  </button>
                </div>

                <button type="button"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const spaceBelow = window.innerHeight - rect.bottom;
                    if (spaceBelow < 200) {
                      setGuestsPos({ top: rect.top - 200, left: rect.left });
                    } else {
                      setGuestsPos({ top: rect.bottom + 8, left: rect.left });
                    }
                    setGuestsOpen(!guestsOpen);
                    setRoomsOpen(false);
                    setDateOpen(false);
                  }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-3 text-left">
                  <Users size={15} className="text-[#ff784e] shrink-0" />
                  <div className="flex flex-1 flex-col min-w-0">
                    <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/35">Guests</span>
                    <span className="mt-0.5 text-[12px] font-medium text-white truncate">{adults}A, {children}C</span>
                  </div>
                  <ChevronDown size={13} className={`text-white/25 transition-all duration-300 shrink-0 ${guestsOpen ? "rotate-180 text-[#ff784e]" : ""}`} />
                </button>

                <button type="button"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const spaceBelow = window.innerHeight - rect.bottom;
                    if (spaceBelow < 200) {
                      setRoomsPos({ top: rect.top - 200, left: rect.left });
                    } else {
                      setRoomsPos({ top: rect.bottom + 8, left: rect.left });
                    }
                    setRoomsOpen(!roomsOpen);
                    setGuestsOpen(false);
                    setDateOpen(false);
                  }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-3 text-left">
                  <BedDouble size={15} className="text-[#ff784e] shrink-0" />
                  <div className="flex flex-1 flex-col min-w-0">
                    <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/35">Rooms</span>
                    <span className="mt-0.5 text-[12px] font-medium text-white truncate">{rooms} Room{rooms > 1 ? "s" : ""}</span>
                  </div>
                  <ChevronDown size={13} className={`text-white/25 transition-all duration-300 shrink-0 ${roomsOpen ? "rotate-180 text-[#ff784e]" : ""}`} />
                </button>
              </div>
              <Link href={`/rooms?checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}&rooms=${rooms}`}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#ff784e] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                Check Availability <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Desktop layout */}
            <div className="hidden sm:block p-4 lg:p-5">
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">

                {/* Check-in Date */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => openCalendar(e, "left")}
                    className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.05] px-5 py-3.5 text-left transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08]"
                  >
                    <span className="text-[#ff784e]"><CalendarDays size={18} /></span>
                    <span className="flex flex-1 flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">Check-in</span>
                      <span className="mt-1 whitespace-nowrap text-sm font-medium text-white">
                        {checkIn ? new Date(checkIn + "T00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select date"}
                      </span>
                    </span>
                    <ChevronDown size={14} className={`text-white/30 transition-all duration-300 ${dateOpen ? "rotate-180 text-[#ff784e]" : ""}`} />
                  </button>
                </div>

                {/* Check-out Date */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => openCalendar(e, "right")}
                    className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.05] px-5 py-3.5 text-left transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08]"
                  >
                    <span className="text-[#ff784e]"><CalendarDays size={18} /></span>
                    <span className="flex flex-1 flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">Check-out</span>
                      <span className="mt-1 whitespace-nowrap text-sm font-medium text-white">
                        {checkOut ? new Date(checkOut + "T00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select date"}
                      </span>
                    </span>
                    <ChevronDown size={14} className={`text-white/30 transition-all duration-300 ${dateOpen ? "rotate-180 text-[#ff784e]" : ""}`} />
                  </button>
                </div>

                {/* Guests Dropdown */}
                <div className="relative">
                  <button
                    ref={guestsBtnRef}
                    type="button"
                    onClick={() => {
                      if (!guestsOpen && guestsBtnRef.current) {
                        const rect = guestsBtnRef.current.getBoundingClientRect();
                        setGuestsPos({ top: rect.bottom + 8, left: rect.left });
                      }
                      setGuestsOpen(!guestsOpen);
                      setRoomsOpen(false);
                      setDateOpen(false);
                    }}
                    className="group flex w-full items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.05] px-3 py-2.5 text-left transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08] sm:items-center sm:gap-3 sm:rounded-xl sm:px-5 sm:py-3.5"
                  >
                    <span className="text-[#ff784e]"><Users size={16} className="sm:hidden" /><Users size={18} className="hidden sm:block" /></span>
                    <span className="flex flex-1 flex-col">
                      <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-white/40 sm:text-[9px] sm:tracking-[0.18em]">Guests</span>
                      <span className="mt-0.5 whitespace-nowrap text-[11px] font-medium text-white sm:mt-1 sm:text-sm">{adults} Adults, {children} Children</span>
                    </span>
                    <ChevronDown size={12} className={`text-white/30 transition-all duration-300 sm:hidden ${guestsOpen ? "rotate-180 text-[#ff784e]" : ""}`} />
                    <ChevronDown size={14} className={`hidden text-white/30 transition-all duration-300 sm:block ${guestsOpen ? "rotate-180 text-[#ff784e]" : ""}`} />
                  </button>
                </div>

                {/* Rooms Dropdown */}
                <div className="relative">
                  <button
                    ref={roomsBtnRef}
                    type="button"
                    onClick={() => {
                      if (!roomsOpen && roomsBtnRef.current) {
                        const rect = roomsBtnRef.current.getBoundingClientRect();
                        setRoomsPos({ top: rect.bottom + 8, left: rect.left });
                      }
                      setRoomsOpen(!roomsOpen);
                      setGuestsOpen(false);
                      setDateOpen(false);
                    }}
                    className="group flex w-full items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.05] px-3 py-2.5 text-left transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08] sm:items-center sm:gap-3 sm:rounded-xl sm:px-5 sm:py-3.5"
                  >
                    <span className="text-[#ff784e]"><BedDouble size={16} className="sm:hidden" /><BedDouble size={18} className="hidden sm:block" /></span>
                    <span className="flex flex-1 flex-col">
                      <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-white/40 sm:text-[9px] sm:tracking-[0.18em]">Rooms</span>
                      <span className="mt-0.5 whitespace-nowrap text-[11px] font-medium text-white sm:mt-1 sm:text-sm">{rooms} Room{rooms > 1 ? "s" : ""}</span>
                    </span>
                    <ChevronDown size={12} className={`text-white/30 transition-all duration-300 sm:hidden ${roomsOpen ? "rotate-180 text-[#ff784e]" : ""}`} />
                    <ChevronDown size={14} className={`hidden text-white/30 transition-all duration-300 sm:block ${roomsOpen ? "rotate-180 text-[#ff784e]" : ""}`} />
                  </button>
                </div>

                <Link
                  href={`/rooms?checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}&rooms=${rooms}`}
                  className="group flex col-span-2 w-full items-center justify-center gap-2.5 rounded-lg bg-[#ff784e] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-white hover:text-black sm:text-[11px] sm:tracking-[0.12em] lg:col-span-1 lg:py-0"
                >
                  Check Availability
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(guestsOpen || roomsOpen || dateOpen) && (
        <div className="fixed inset-0 z-[99]" onClick={() => { setGuestsOpen(false); setRoomsOpen(false); setDateOpen(false); }} />
      )}

      {/* Guests portal */}
      {guestsOpen && typeof window !== "undefined" && createPortal(
        <div
          data-lenis-prevent
          className="fixed z-[100] w-64 overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl max-sm:left-1/2 max-sm:top-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2"
          style={window.innerWidth >= 640 ? { top: guestsPos.top, left: guestsPos.left } : undefined}
        >
          <div className="p-4">
            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-medium text-white">Adults</span>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm font-bold text-white transition hover:border-[#ff784e] hover:text-[#ff784e]">-</button>
                <span className="w-6 text-center text-base font-semibold text-white">{adults}</span>
                <button type="button" onClick={() => setAdults(Math.min(10, adults + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm font-bold text-white transition hover:border-[#ff784e] hover:text-[#ff784e]">+</button>
              </div>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-medium text-white">Children</span>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm font-bold text-white transition hover:border-[#ff784e] hover:text-[#ff784e]">-</button>
                <span className="w-6 text-center text-base font-semibold text-white">{children}</span>
                <button type="button" onClick={() => setChildren(Math.min(6, children + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm font-bold text-white transition hover:border-[#ff784e] hover:text-[#ff784e]">+</button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Rooms portal */}
      {roomsOpen && typeof window !== "undefined" && createPortal(
        <div
          data-lenis-prevent
          className="fixed z-[100] w-52 overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl max-sm:left-1/2 max-sm:top-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2"
          style={window.innerWidth >= 640 ? { top: roomsPos.top, left: roomsPos.left } : undefined}
        >
          <div className="p-4">
            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-medium text-white">Rooms</span>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm font-bold text-white transition hover:border-[#ff784e] hover:text-[#ff784e]">-</button>
                <span className="w-6 text-center text-base font-semibold text-white">{rooms}</span>
                <button type="button" onClick={() => setRooms(Math.min(5, rooms + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm font-bold text-white transition hover:border-[#ff784e] hover:text-[#ff784e]">+</button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Calendar portal */}
      {dateOpen && typeof window !== "undefined" && createPortal(
        <div
          data-lenis-prevent
          onClick={(e) => e.stopPropagation()}
          className="fixed z-[100] w-[calc(100vw-24px)] max-w-[600px] overflow-hidden rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl"
          style={{ top: calendarPos.top, left: calendarPos.left }}
        >
          <DatePicker
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={(d) => setCheckIn(d)}
            onCheckOutChange={(d) => {
              setCheckOut(d);
              if (d) setDateOpen(false);
            }}
          />
        </div>,
        document.body
      )}
    </section>
  );
}
