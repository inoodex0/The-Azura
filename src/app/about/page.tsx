"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fade-up",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".slide-left", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".slide-left",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".slide-right", {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".slide-right",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
          once: true,
          onEnter: () => {
            document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
              const target = parseInt(el.dataset.count || "0", 10);
              const suffix = el.dataset.suffix || "";
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = Math.round(obj.val) + suffix;
                },
              });
            });
          },
        },
      });

      gsap.from(".testimonial-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 80%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-white text-black overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[70vh] flex items-center bg-[#f7f4ef] overflow-hidden pt-[86px]">

        <div className="max-w-[1500px] mx-auto w-full px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#ff784e] text-[11px] font-bold uppercase tracking-[0.3em]">
                  Since 2018
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-serif font-light leading-[1.05] text-[#1a1a1a]">
                The Trusted Brand of
                <span className="block text-[#ff784e]">Luxury Hospitality</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-[#ff784e]/80 font-serif italic">
                Enjoy a Luxury Experience in Cox&apos;s Bazar
              </p>

              <p className="mt-6 text-black/55 leading-8 max-w-xl text-[15px]">
                Welcome to one of Cox&apos;s Bazar&apos;s most renowned landmarks, The Azura
                Hotel & Resort. Since it first opened its doors in 2018, thousands of visitors,
                including distinguished personalities, have been drawn to its elegant charm and
                warm hospitality. After years of being part of the tourism growth of Cox&apos;s
                Bazar, we understand the needs of well-travelled guests.
              </p>

              <div className="mt-8 space-y-3">
                <p className="flex items-center gap-3 text-sm text-black/60">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff784e] text-white text-[10px] font-bold">✓</span>
                  For information: +880 1401 777 888
                </p>
                <p className="flex items-center gap-3 text-sm text-black/60">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff784e] text-white text-[10px] font-bold">✓</span>
                  Email: reservation.theazura@gmail.com
                </p>
                <p className="flex items-center gap-3 text-sm text-black/60">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff784e] text-white text-[10px] font-bold">✓</span>
                  Book Online and get more Discount — <Link href="/booking" className="font-bold text-[#1a1a1a] hover:text-[#ff784e] transition">BOOK HERE</Link>
                </p>
              </div>
            </div>

            {/* Overlapping Images */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
              <div className="absolute top-0 right-0 w-[70%] h-[75%] rounded-sm overflow-hidden shadow-2xl">
                <img
                  src="/images/about/about-hero.jpg"
                  alt="The Azura Hotel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-sm overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/about/about-story.jpg"
                  alt="The Azura Experience"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative border frame */}
              <div className="absolute -top-3 -right-3 w-[65%] h-[70%] border border-[#ff784e]/30 rounded-sm pointer-events-none" />
            </div>

          </div>
        </div>

      </section>


      {/* =====================================================
          RESTAURANT SECTION
      ===================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-0 items-stretch">

            {/* Image */}
            <div className="slide-left overflow-hidden">
              <img
                src="/images/dining/restaurant.avif"
                alt="The Azura Restaurant"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
            </div>

            {/* Content */}
            <div className="slide-right bg-[#f7f4ef] flex items-center">
              <div className="px-8 py-12 sm:px-14 lg:px-20">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#ff784e] text-[11px] font-bold uppercase tracking-[0.3em]">
                    Restaurant
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1a1a1a]">
                  The Azura Dining
                </h2>

                <div className="mt-6 h-px w-16 bg-[#ff784e]/40" />

                <p className="mt-6 text-black/55 leading-8 text-[15px] max-w-md">
                  Our signature restaurant, with its elegant design-inspired interior,
                  invites you to experience an international menu featuring everything from
                  local fresh delicacies to global cuisines.
                </p>

                <Link
                  href="/dining"
                  className="group mt-8 inline-flex items-center gap-3 bg-[#ff784e] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#e86a3e] transition-all duration-300"
                >
                  More Details
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          SPA / WELLNESS SECTION
      ===================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-0 items-stretch">

            {/* Content */}
            <div className="slide-left bg-[#f7f4ef] flex items-center order-2 lg:order-1">
              <div className="px-8 py-12 sm:px-14 lg:px-20">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#ff784e] text-[11px] font-bold uppercase tracking-[0.3em]">
                    Spa &amp; Wellness
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1a1a1a]">
                  Aqua SPA
                </h2>

                <div className="mt-6 h-px w-16 bg-[#ff784e]/40" />

                <p className="mt-6 text-black/55 leading-8 text-[15px] max-w-md">
                  Leaving behind the pressure of everyday life, you enter a world where time
                  stands still. Our authentic spa offers the perfect retreat — be it to heal,
                  pamper, rejuvenate or revitalize, rest assured that your desires will be met,
                  completely.
                </p>

                <Link
                  href="/facilities"
                  className="group mt-8 inline-flex items-center gap-3 border border-[#ff784e] text-[#ff784e] px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#ff784e] hover:text-white transition-all duration-300"
                >
                  Read More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="slide-right overflow-hidden order-1 lg:order-2">
              <img
                src="/images/facilities/spa.avif"
                alt="The Azura Spa"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          POOL / RECREATION SECTION
      ===================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-0 items-stretch">

            {/* Image */}
            <div className="slide-left overflow-hidden">
              <img
                src="/images/facilities/pool.webp"
                alt="The Azura Pool"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
            </div>

            {/* Content */}
            <div className="slide-right bg-[#f7f4ef] flex items-center">
              <div className="px-8 py-12 sm:px-14 lg:px-20">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#ff784e] text-[11px] font-bold uppercase tracking-[0.3em]">
                    Recreation
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1a1a1a]">
                  Infinity Pool
                </h2>

                <div className="mt-6 h-px w-16 bg-[#ff784e]/40" />

                <p className="mt-6 text-black/55 leading-8 text-[15px] max-w-md">
                  A supervised, fun-filled area where guests can relax and enjoy.
                  Experience the grandeur of a pool that stretches along the resort.
                  Its vast size means there is plenty of space for everyone to swim,
                  play, or simply relax without feeling crowded.
                </p>

                <Link
                  href="/facilities"
                  className="group mt-8 inline-flex items-center gap-3 bg-[#ff784e] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#e86a3e] transition-all duration-300"
                >
                  Read More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          STATS SECTION
      ===================================================== */}
      <section className="stats-section py-20 lg:py-24 bg-[#f7f4ef]">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="text-[#ff784e] text-[11px] font-bold uppercase tracking-[0.3em]">
              Since 2018
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1a1a1a]">
              Experience &amp; Awards
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="stat-item text-center">
              <span data-count="8" data-suffix="" className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-[#ff784e]/30">0</span>
              <span className="block mt-1 text-sm font-medium text-black/70">Years Of<br />Experience</span>
            </div>
            <div className="stat-item text-center">
              <span data-count="50" data-suffix="K+" className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-[#ff784e]/30">0</span>
              <span className="block mt-1 text-sm font-medium text-black/70">Online<br />Bookings</span>
            </div>
            <div className="stat-item text-center">
              <span data-count="15" data-suffix="+" className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-[#ff784e]/30">0</span>
              <span className="block mt-1 text-sm font-medium text-black/70">Best Service<br />Awards</span>
            </div>
            <div className="stat-item text-center">
              <span data-count="120" data-suffix="" className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-[#ff784e]/30">0</span>
              <span className="block mt-1 text-sm font-medium text-black/70">Luxury<br />Rooms</span>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          TESTIMONIALS SECTION
      ===================================================== */}
     

    </main>
  );
}
