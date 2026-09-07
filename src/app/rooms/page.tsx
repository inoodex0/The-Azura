"use client";

import { useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Users,
  Maximize2,
  Phone,
  Star,
  Check,
  Wifi,
  Tv,
  Wind,
  Coffee,
  Bath,
  Utensils,
  Sparkles,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    id: "premier-room",
    name: "Premier Room",
    subtitle: "Comfort Redefined",
    tag: "Popular",
    description: "Experience elegance in our beautifully designed Premier Room. Featuring modern amenities, plush bedding, and stunning city views, this room is perfect for both business and leisure travelers.",
    image: "/images/room1.avif",
    price: "7,500",
    floor: "3rd - 5th Floor",
    bed: "1 King Bed",
    maxGuests: "2 Adults",
    size: "320 sq ft",
    stars: 4,
    amenities: ["Free Wi-Fi", "LED TV", "Air Conditioning", "Mini Bar", "Room Service", "City View"],
    features: [
      { icon: Wifi, label: "Free Wi-Fi" },
      { icon: Tv, label: "42\" LED TV" },
      { icon: Wind, label: "Central AC" },
      { icon: Coffee, label: "Mini Bar" },
    ],
  },
  {
    id: "superior-deluxe-room",
    name: "Superior Deluxe Room",
    subtitle: "Spacious Luxury",
    tag: "Best Seller",
    description: "Our Superior Deluxe Room offers extra space and premium finishes. Enjoy the separate seating area, upgraded bathroom, and panoramic views that make your stay truly memorable.",
    image: "/images/room2.avif",
    price: "9,500",
    floor: "4th - 6th Floor",
    bed: "1 King Bed",
    maxGuests: "2 Adults",
    size: "400 sq ft",
    stars: 4,
    amenities: ["Free Wi-Fi", "LED TV", "Air Conditioning", "Mini Bar", "Room Service", "City View", "Seating Area"],
    features: [
      { icon: Wifi, label: "Free Wi-Fi" },
      { icon: Tv, label: "50\" LED TV" },
      { icon: Wind, label: "Central AC" },
      { icon: Coffee, label: "Mini Bar" },
    ],
  },
  {
    id: "executive-room",
    name: "Executive Room",
    subtitle: "Business Class Comfort",
    tag: "",
    description: "Designed for the discerning business traveler, the Executive Room combines functionality with luxury. Features a work desk, ergonomic chair, and premium connectivity.",
    image: "/images/room3.avif",
    price: "11,000",
    floor: "6th - 8th Floor",
    bed: "1 King Bed / Twin Beds",
    maxGuests: "2 Adults",
    size: "450 sq ft",
    stars: 4,
    amenities: ["Free Wi-Fi", "LED TV", "Air Conditioning", "Mini Bar", "Room Service", "Work Desk", "Nespresso Machine"],
    features: [
      { icon: Wifi, label: "High-Speed Wi-Fi" },
      { icon: Tv, label: "55\" Smart TV" },
      { icon: Wind, label: "Central AC" },
      { icon: Coffee, label: "Nespresso" },
    ],
  },
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    subtitle: "Ultimate Prestige",
    tag: "Luxury",
    description: "The pinnacle of luxury at The Azura. Our Presidential Suite features a private living room, dining area, panoramic terrace, and dedicated butler service for the most discerning guests.",
    image: "/images/rooms/room-1.avif",
    price: "35,000",
    floor: "8th Floor",
    bed: "1 King Bed",
    maxGuests: "3 Adults",
    size: "1200 sq ft",
    stars: 5,
    amenities: ["Free Wi-Fi", "LED TV", "Air Conditioning", "Full Bar", "Butler Service", "Panoramic Terrace", "Private Dining", "Jacuzzi"],
    features: [
      { icon: Wifi, label: "Premium Wi-Fi" },
      { icon: Tv, label: "65\" OLED TV" },
      { icon: Bath, label: "Jacuzzi" },
      { icon: Utensils, label: "Private Dining" },
    ],
  },
  {
    id: "premier-suite",
    name: "Premier Suite",
    subtitle: "Elegant Living",
    tag: "Family",
    description: "A generous suite with separate living and sleeping areas. Perfect for extended stays or families, the Premier Suite offers home-like comfort with hotel luxury.",
    image: "/images/rooms/room-2.avif",
    price: "18,000",
    floor: "7th Floor",
    bed: "1 King Bed",
    maxGuests: "3 Adults",
    size: "750 sq ft",
    stars: 5,
    amenities: ["Free Wi-Fi", "LED TV", "Air Conditioning", "Mini Bar", "Living Room", "Dining Area", "Room Service", "Sea View"],
    features: [
      { icon: Wifi, label: "Free Wi-Fi" },
      { icon: Tv, label: "55\" Smart TV" },
      { icon: Wind, label: "Central AC" },
      { icon: Coffee, label: "Mini Bar" },
    ],
  },
  {
    id: "honeymoon-suite",
    name: "Honeymoon Suite",
    subtitle: "Romantic Escape",
    tag: "Romantic",
    description: "Crafted for love and celebration. Our Honeymoon Suite features a king-size bed with premium linens, rose petal turndown service, champagne on arrival, and breathtaking sunset views.",
    image: "/images/rooms/room-3.avif",
    price: "22,000",
    floor: "7th Floor",
    bed: "1 King Bed",
    maxGuests: "2 Adults",
    size: "650 sq ft",
    stars: 5,
    amenities: ["Free Wi-Fi", "LED TV", "Air Conditioning", "Full Bar", "Champagne", "Rose Turndown", "Sunset View", "Bathtub"],
    features: [
      { icon: Wifi, label: "Free Wi-Fi" },
      { icon: Tv, label: "50\" Smart TV" },
      { icon: Bath, label: "Bathtub" },
      { icon: Coffee, label: "Full Bar" },
    ],
  },
];

function RoomsPageInner() {
  const pageRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const bp = `checkin=${searchParams.get("checkin") || ""}&checkout=${searchParams.get("checkout") || ""}&adults=${searchParams.get("adults") || "2"}&children=${searchParams.get("children") || "0"}&rooms=${searchParams.get("rooms") || "1"}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rooms-hero-text", {
        y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2,
      });

      gsap.from(".room-block", {
        y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".rooms-list", start: "top 80%", once: true },
      });

      gsap.from(".stat-item", {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".stats-strip", start: "top 90%", once: true },
      });

      gsap.from(".cta-block", {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: ".cta-section", start: "top 90%", once: true },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-white text-black overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden pt-[86px] lg:min-h-[65vh]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/images/room1.avif')" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 lg:px-10 pb-14 sm:pb-20">
          <div className="rooms-hero-text max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <Sparkles size={14} className="text-[#ff784e]" />
              <span className="text-[#ff784e] text-[10px] font-bold uppercase tracking-[0.3em]">The Azura Collection</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-serif font-light leading-[0.95] text-white">
              Rooms &{" "}
              <span className="italic text-[#ff784e]">Suites</span>
            </h1>
            <p className="mt-5 max-w-lg text-white/60 text-[15px] leading-7">
              Discover our collection of beautifully designed rooms and suites, each crafted to deliver an unforgettable stay at The Azura.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a href="#rooms" className="group inline-flex items-center gap-3 bg-[#ff784e] text-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 rounded-lg">
                View Rooms <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="tel:+8801401777888" className="inline-flex items-center gap-2 border border-white/25 text-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] hover:border-[#ff784e] hover:text-[#ff784e] transition-all duration-300 rounded-lg">
                <Phone size={14} /> Call to Book
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="stats-strip border-b border-black/5 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: "6", label: "Room Types" },
              { value: "320+", label: "Sq Ft to 1200" },
              { value: "24/7", label: "Room Service" },
              { value: "5★", label: "Suite Rating" },
            ].map((stat, i) => (
              <div key={stat.label} className={`stat-item flex items-center gap-4 py-6 lg:py-8 ${i < 3 ? "lg:border-r lg:border-black/5" : ""} ${i === 0 ? "" : "border-l border-black/5 lg:border-l-0"}`}>
                <span className="text-2xl sm:text-3xl font-serif font-light text-[#ff784e]">{stat.value}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-black/40 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROOMS LIST */}
      <section id="rooms" className="rooms-list py-16 lg:py-24 bg-[#fafafa]">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="mb-14 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#ff784e]/40" />
              <span className="text-[#ff784e] text-[10px] font-bold uppercase tracking-[0.3em]">Our Collection</span>
              <span className="h-px w-8 bg-[#ff784e]/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-light text-[#1a1a1a]">Explore Every Room</h2>
            <p className="mt-3 max-w-lg mx-auto text-black/40 text-[14px] leading-7">
              From cozy rooms to lavish suites, find the perfect space for your stay.
            </p>
          </div>

          <div className="space-y-8 lg:space-y-12">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                id={room.id}
                className="room-block scroll-mt-24 group"
              >
                <div className={`grid gap-0 overflow-hidden rounded-2xl border border-black/[0.04] bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500 ${
                  index % 2 === 0
                    ? "lg:grid-cols-[1.1fr_1fr]"
                    : "lg:grid-cols-[1fr_1.1fr]"
                }`}>
                  {/* Image */}
                  <div className={`relative h-[260px] sm:h-[320px] lg:h-[460px] overflow-hidden ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Tag */}
                    {room.tag && (
                      <div className="absolute top-5 left-5">
                        <span className="px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] bg-[#ff784e] text-white rounded-sm">{room.tag}</span>
                      </div>
                    )}

                    {/* Floor badge */}
                    <div className="absolute top-5 right-5">
                      <span className="px-3 py-1.5 text-[8px] font-medium uppercase tracking-wider bg-black/50 text-white backdrop-blur-sm rounded-sm">{room.floor}</span>
                    </div>

                    {/* Stars + name overlay */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: room.stars }).map((_, i) => (
                          <Star key={i} size={11} className="fill-[#ff784e] text-[#ff784e]" />
                        ))}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-serif font-light text-white leading-tight">{room.name}</h3>
                      <p className="text-[11px] text-white/60 mt-1">{room.subtitle}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                    <div>
                      <p className="text-[13px] text-black/50 leading-7">{room.description}</p>

                      {/* Room specs */}
                      <div className="mt-6 grid grid-cols-3 gap-3">
                        {[
                          { icon: BedDouble, label: room.bed },
                          { icon: Users, label: room.maxGuests },
                          { icon: Maximize2, label: room.size },
                        ].map((spec) => (
                          <div key={spec.label} className="flex flex-col items-center gap-2 rounded-xl bg-[#f7f4ef]/70 px-3 py-3 border border-[#f7f4ef]">
                            <spec.icon size={16} className="text-[#ff784e]" />
                            <span className="text-[9px] font-medium text-black/50 text-center leading-tight">{spec.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Features */}
                      <div className="mt-5 grid grid-cols-4 gap-2">
                        {room.features.map((f) => (
                          <div key={f.label} className="flex flex-col items-center gap-2 rounded-xl border border-black/[0.04] bg-white p-3 hover:border-[#ff784e]/20 transition-colors">
                            <f.icon size={18} className="text-[#ff784e]" />
                            <span className="text-[8px] font-semibold uppercase tracking-wider text-black/40 text-center leading-tight">{f.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Amenities */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {room.amenities.map((a) => (
                          <span key={a} className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-medium text-[#ff784e] bg-[#ff784e]/[0.06] border border-[#ff784e]/10 rounded-full">
                            <Check size={9} /> {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price + Actions */}
                    <div className="mt-6 pt-5 border-t border-black/5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                        <div>
                          <span className="text-[9px] text-black/30 font-semibold uppercase tracking-[0.2em]">Starting from</span>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a]">&#x09F3;{room.price}</span>
                            <span className="text-[10px] text-black/30">/night</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <a href="tel:+8801401777888"
                            className="inline-flex items-center gap-2 border border-black/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-black/60 hover:border-[#ff784e] hover:text-[#ff784e] transition-all rounded-lg">
                            <Phone size={13} /> Call
                          </a>
                          <Link href={`/rooms/${room.id}?${bp}`}
                            className="group/btn inline-flex items-center gap-2 border border-black/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-black/60 hover:border-[#ff784e] hover:text-[#ff784e] transition-all rounded-lg">
                            View Details <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
                          </Link>
                          <Link href={`/checkout?room=${room.id}&${bp}`}
                            className="group/btn inline-flex items-center gap-2 bg-[#ff784e] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.1em] hover:bg-[#1a1a1a] transition-all rounded-lg">
                            Book Now <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section cta-block relative py-20 lg:py-28 bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 opacity-10"><img src="/images/about/about-hero.jpg" alt="" className="w-full h-full object-cover" /></div>
        <div className="absolute inset-0 bg-[#1a1a1a]/80" />
        <div className="absolute top-8 left-8 h-16 w-16 border-t border-l border-[#ff784e]/20" />
        <div className="absolute bottom-8 right-8 h-16 w-16 border-b border-r border-[#ff784e]/20" />
        <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-8 bg-[#ff784e]/40" />
            <span className="text-[#ff784e] text-[10px] font-bold uppercase tracking-[0.3em]">Need Help Choosing?</span>
            <span className="h-px w-8 bg-[#ff784e]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
            Let Us Help You Find the <span className="italic text-[#ff784e]">Perfect Room</span>
          </h2>
          <p className="mt-5 max-w-lg mx-auto text-white/50 text-[15px] leading-7">
            Our team is available 24/7 to help you choose the best room for your needs. Call us or book online.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+8801401777888" className="group inline-flex items-center gap-4 bg-[#ff784e] text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-white hover:text-[#1a1a1a] transition-all duration-300">
              Call +880 1401 777 888 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/booking" className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.18em] hover:border-[#ff784e] hover:text-[#ff784e] transition-all duration-300">
              Book Online
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default function RoomsPage() {
  return (
    <Suspense fallback={<div />}>
      <RoomsPageInner />
    </Suspense>
  );
}
