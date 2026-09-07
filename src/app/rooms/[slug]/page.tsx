"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  Lock,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import { roomsData } from "@/lib/roomsData";
import DatePicker from "@/components/shared/DatePicker";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Wifi, Tv, Wind, Coffee, Bath, Utensils, Sparkles, Lock,
};

function RoomDetailInner() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  const room = roomsData.find((r) => r.slug === slug);

  const [checkIn, setCheckIn] = useState(searchParams.get("checkin") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkout") || "");
  const [adults, setAdults] = useState(Number(searchParams.get("adults")) || 2);
  const [childrenCount, setChildrenCount] = useState(Number(searchParams.get("children")) || 0);
  const [roomsCount, setRoomsCount] = useState(Number(searchParams.get("rooms")) || 1);
  const [dateOpen, setDateOpen] = useState(false);

  const bookingLink = `/checkout?room=${room?.slug}&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${childrenCount}&rooms=${roomsCount}`;

  useEffect(() => {
    if (!room) {
      router.replace("/rooms");
      return;
    }
  }, [room, router]);

  useEffect(() => {
    if (!room) return;
    const ctx = gsap.context(() => {
      gsap.from(".room-hero-content", { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });

      gsap.utils.toArray<HTMLElement>(".room-detail-block").forEach((block, i) => {
        gsap.fromTo(block, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: { trigger: block, start: "top 92%", toggleActions: "play none none none" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".amenity-block").forEach((block, i) => {
        gsap.fromTo(block, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: block, start: "top 92%", toggleActions: "play none none none" },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, [slug]);

  if (!room) return null;

  const otherRooms = roomsData.filter((r) => r.slug !== room.slug).slice(0, 3);

  return (
    <main ref={pageRef} className="bg-white text-black overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden pt-[86px] lg:min-h-[65vh]">
        <div className="absolute inset-0">
          <img src={room.gallery[activeImage]} alt={room.name} className="w-full h-full object-cover transition-opacity duration-500" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

        {/* Image navigation arrows */}
        <button type="button" onClick={() => setActiveImage((p) => (p === 0 ? room.gallery.length - 1 : p - 1))}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 sm:left-4 lg:left-8">
          <div className="flex h-9 w-9 items-center justify-center border border-white/25 text-white backdrop-blur-sm transition-all hover:border-[#ff784e] hover:text-[#ff784e] sm:h-11 sm:w-11">
            <ChevronLeft size={16} />
          </div>
        </button>
        <button type="button" onClick={() => setActiveImage((p) => (p === room.gallery.length - 1 ? 0 : p + 1))}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 sm:right-4 lg:right-8">
          <div className="flex h-9 w-9 items-center justify-center border border-white/25 text-white backdrop-blur-sm transition-all hover:border-[#ff784e] hover:text-[#ff784e] sm:h-11 sm:w-11">
            <ChevronRight size={16} />
          </div>
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex gap-2 sm:bottom-8">
          {room.gallery.map((_, i) => (
            <button key={i} type="button" onClick={() => setActiveImage(i)}
              className={`h-[3px] transition-all duration-500 ${i === activeImage ? "w-8 bg-[#ff784e]" : "w-4 bg-white/40"}`} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 lg:px-10 pb-14 sm:pb-20">
          <div className="room-hero-content">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4 text-[11px] text-white/50">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/rooms" className="hover:text-white transition-colors">Rooms</Link>
              <span>/</span>
              <span className="text-[#ff784e]">{room.name}</span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              {room.tag && (
                <span className="px-3 py-1 text-[8px] font-bold uppercase tracking-[0.15em] bg-[#ff784e] text-white rounded-sm">{room.tag}</span>
              )}
              <div className="flex items-center gap-1">
                {Array.from({ length: room.stars }).map((_, i) => (
                  <Star key={i} size={11} className="fill-[#ff784e] text-[#ff784e]" />
                ))}
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-serif font-light leading-[0.95] text-white">
              {room.name}
            </h1>
            <p className="mt-2 text-[#ff784e] text-sm font-medium">{room.subtitle}</p>

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-8">
              <div>
                <span className="text-[9px] text-white/40 font-semibold uppercase tracking-[0.2em]">Starting from</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-serif font-light text-white">&#x09F3;{room.price}</span>
                  <span className="text-[11px] text-white/40">/night</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a href="tel:+8801401777888"
                  className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white hover:border-[#ff784e] hover:text-[#ff784e] transition-all rounded-lg">
                  <Phone size={13} /> Call to Book
                </a>
                <Link href={bookingLink}
                  className="group/btn inline-flex items-center gap-2 bg-[#ff784e] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.12em] hover:bg-white hover:text-[#1a1a1a] transition-all rounded-lg">
                  Book Now <ArrowUpRight size={13} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THUMBNAILS */}
      <section className="border-b border-black/5 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="flex gap-2 py-3 overflow-x-auto">
            {room.gallery.map((img, i) => (
              <button key={i} type="button" onClick={() => setActiveImage(i)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all ${i === activeImage ? "ring-2 ring-[#ff784e]" : "opacity-60 hover:opacity-100"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ROOM DETAILS */}
      <section className="room-details py-14 lg:py-20 bg-[#fafafa]">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">

            {/* Left — Info */}
            <div>
              <div className="room-detail-block">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8 bg-[#ff784e]/40" />
                  <span className="text-[#ff784e] text-[10px] font-bold uppercase tracking-[0.3em]">About This Room</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a]">{room.name}</h2>
                <p className="mt-4 text-black/50 text-[14px] leading-7">{room.description}</p>
                <p className="mt-4 text-black/45 text-[13px] leading-7">{room.longDescription}</p>
              </div>

              {/* Specs */}
              <div className="room-detail-block mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: BedDouble, label: "Bed", value: room.bed },
                  { icon: Users, label: "Guests", value: room.maxGuests },
                  { icon: Maximize2, label: "Size", value: room.size },
                  { icon: MapPin, label: "Floor", value: room.floor },
                ].map((spec) => (
                  <div key={spec.label} className="flex flex-col items-center gap-2 rounded-xl border border-black/[0.06] bg-white p-4">
                    <spec.icon size={20} className="text-[#ff784e]" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-black/40">{spec.label}</span>
                    <span className="text-[11px] font-medium text-[#1a1a1a] text-center">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="room-detail-block mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1a1a1a] mb-4">Room Highlights</h3>
                <div className="grid grid-cols-2 gap-3">
                  {room.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-3 rounded-xl border border-black/[0.04] bg-white px-4 py-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff784e]/10">
                        <Check size={14} className="text-[#ff784e]" />
                      </div>
                      <span className="text-[12px] font-medium text-[#1a1a1a]">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Booking Card */}
            <div>
              <div className="room-detail-block sticky top-24 rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[9px] text-black/30 font-semibold uppercase tracking-[0.2em]">From</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a]">&#x09F3;{room.price}</span>
                      <span className="text-[10px] text-black/30">/night</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: room.stars }).map((_, i) => (
                      <Star key={i} size={11} className="fill-[#ff784e] text-[#ff784e]" />
                    ))}
                  </div>
                </div>

                <div className="my-4 h-px bg-black/5 sm:my-5" />

                {/* Date buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setDateOpen(!dateOpen)}
                    className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2.5 text-left hover:border-[#ff784e] transition-colors">
                    <CalendarDays size={14} className="text-[#ff784e] shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-black/40">Check-in</span>
                      <span className="text-[11px] font-medium text-[#1a1a1a] truncate">
                        {checkIn ? new Date(checkIn + "T00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Select"}
                      </span>
                    </div>
                    <ChevronDown size={11} className={`text-black/30 shrink-0 transition-transform ${dateOpen ? "rotate-180" : ""}`} />
                  </button>
                  <button type="button" onClick={() => setDateOpen(!dateOpen)}
                    className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2.5 text-left hover:border-[#ff784e] transition-colors">
                    <CalendarDays size={14} className="text-[#ff784e] shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-black/40">Check-out</span>
                      <span className="text-[11px] font-medium text-[#1a1a1a] truncate">
                        {checkOut ? new Date(checkOut + "T00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Select"}
                      </span>
                    </div>
                    <ChevronDown size={11} className={`text-black/30 shrink-0 transition-transform ${dateOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {dateOpen && (
                  <div className="mt-3">
                    <DatePicker
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onCheckInChange={setCheckIn}
                      onCheckOutChange={(d) => { setCheckOut(d); if (d) setDateOpen(false); }}
                    />
                  </div>
                )}

                {/* Guests */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div>
                    <label className="block text-[8px] font-bold uppercase tracking-[0.12em] text-black/40 mb-1">Adults</label>
                    <select value={adults} onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full rounded-lg border border-black/10 px-2 py-2 text-[11px] text-[#1a1a1a] outline-none focus:border-[#ff784e] transition-colors">
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold uppercase tracking-[0.12em] text-black/40 mb-1">Children</label>
                    <select value={childrenCount} onChange={(e) => setChildrenCount(Number(e.target.value))}
                      className="w-full rounded-lg border border-black/10 px-2 py-2 text-[11px] text-[#1a1a1a] outline-none focus:border-[#ff784e] transition-colors">
                      {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold uppercase tracking-[0.12em] text-black/40 mb-1">Rooms</label>
                    <select value={roomsCount} onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="w-full rounded-lg border border-black/10 px-2 py-2 text-[11px] text-[#1a1a1a] outline-none focus:border-[#ff784e] transition-colors">
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                <div className="my-4 h-px bg-black/5 sm:my-5" />

                <Link href={bookingLink}
                  className="group flex w-full items-center justify-center gap-2 bg-[#ff784e] text-white py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] hover:bg-[#1a1a1a] transition-all rounded-lg sm:py-4">
                  Check Availability <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <a href="tel:+8801401777888"
                  className="mt-3 flex w-full items-center justify-center gap-2 border border-black/10 py-3.5 text-[11px] font-bold uppercase tracking-[0.1em] text-black/60 hover:border-[#ff784e] hover:text-[#ff784e] transition-all rounded-lg sm:py-4">
                  <Phone size={13} /> Call +880 1401 777 888
                </a>

                <p className="mt-3 text-center text-[10px] text-black/30 sm:mt-4">Free cancellation up to 24 hours before check-in</p>

                <div className="my-4 h-px bg-black/5 sm:my-5" />

                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-black/40 mb-3">This Room Includes</h4>
                <div className="space-y-2.5">
                  {room.amenities.slice(0, 6).map((a) => {
                    const Icon = iconMap[a.icon] || Check;
                    return (
                      <div key={a.label} className="flex items-center gap-3">
                        <Icon size={15} className="text-[#ff784e] shrink-0" />
                        <span className="text-[12px] text-black/60">{a.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES FULL */}
      <section className="amenities-grid py-14 lg:py-20 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#ff784e]/40" />
              <span className="text-[#ff784e] text-[10px] font-bold uppercase tracking-[0.3em]">Amenities</span>
              <span className="h-px w-8 bg-[#ff784e]/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a]">What&apos;s Included</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {room.amenities.map((a) => {
              const Icon = iconMap[a.icon] || Check;
              return (
                <div key={a.label} className="amenity-block flex items-center gap-4 rounded-xl border border-black/[0.04] bg-[#fafafa] px-5 py-4 hover:border-[#ff784e]/20 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ff784e]/10">
                    <Icon size={18} className="text-[#ff784e]" />
                  </div>
                  <span className="text-[12px] font-medium text-[#1a1a1a]">{a.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OTHER ROOMS */}
      <section className="py-14 lg:py-20 bg-[#fafafa]">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#ff784e]/40" />
              <span className="text-[#ff784e] text-[10px] font-bold uppercase tracking-[0.3em]">You May Also Like</span>
              <span className="h-px w-8 bg-[#ff784e]/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#1a1a1a]">Explore Other Rooms</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherRooms.map((r) => (
              <Link key={r.slug} href={`/rooms/${r.slug}`}
                className="group block overflow-hidden rounded-xl border border-black/[0.04] bg-white shadow-sm hover:shadow-lg transition-all duration-500">
                <div className="relative h-[200px] overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {r.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider bg-[#ff784e] text-white rounded-sm">{r.tag}</span>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: r.stars }).map((_, i) => (
                        <Star key={i} size={10} className="fill-[#ff784e] text-[#ff784e]" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-serif font-light text-[#1a1a1a] group-hover:text-[#ff784e] transition-colors">{r.name}</h3>
                  <p className="mt-1 text-[11px] text-black/40">{r.bed} · {r.size} · {r.maxGuests}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-serif font-light text-[#1a1a1a]">&#x09F3;{r.price}<span className="text-[10px] text-black/30">/night</span></span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff784e] flex items-center gap-1">View <ChevronRight size={12} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/rooms" className="inline-flex items-center gap-2 border border-black/10 px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-black/60 hover:border-[#ff784e] hover:text-[#ff784e] transition-all rounded-lg">
              View All Rooms <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default function RoomDetailPage() {
  return (
    <Suspense fallback={<div />}>
      <RoomDetailInner />
    </Suspense>
  );
}
