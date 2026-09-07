"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  singleMonth?: boolean;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function formatDate(year: number, month: number, day: number) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function isDateBefore(a: string, b: string) {
  return a && b && a < b;
}

function isSameDate(a: string, b: string) {
  return a && b && a === b;
}

function isDateInRange(date: string, start: string, end: string) {
  if (!start || !end) return false;
  return date > start && date < end;
}

export default function DatePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: DatePickerProps) {
  const today = useMemo(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
  }, []);

  const [leftMonth, setLeftMonth] = useState(today.month);
  const [leftYear, setLeftYear] = useState(today.year);
  const [selecting, setSelecting] = useState<"checkin" | "checkout">("checkin");
  const panelRef = useRef<HTMLDivElement>(null);

  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;

  const rightMonthLabel = new Date(rightYear, rightMonth).toLocaleString("en-US", { month: "short" });
  const leftMonthLabel = new Date(leftYear, leftMonth).toLocaleString("en-US", { month: "short" });

  const todayStr = formatDate(today.year, today.month, today.day);

  const prevMonth = () => {
    if (leftMonth === 0) {
      setLeftMonth(11);
      setLeftYear(leftYear - 1);
    } else {
      setLeftMonth(leftMonth - 1);
    }
  };

  const nextMonth = () => {
    if (leftMonth === 11) {
      setLeftMonth(0);
      setLeftYear(leftYear + 1);
    } else {
      setLeftMonth(leftMonth + 1);
    }
  };

  const handleDateClick = (dateStr: string) => {
    if (dateStr < todayStr) return;

    if (selecting === "checkin") {
      onCheckInChange(dateStr);
      onCheckOutChange("");
      setSelecting("checkout");
    } else {
      if (dateStr <= checkIn) {
        onCheckInChange(dateStr);
        onCheckOutChange("");
        setSelecting("checkout");
      } else {
        onCheckOutChange(dateStr);
        setSelecting("checkin");
      }
    }
  };

  const renderMonth = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
      <div className="flex-1">
        <div className="mb-3 text-center text-sm font-semibold text-white">
          {leftMonthLabel === rightMonthLabel ? `${leftMonthLabel} ${leftYear}` : `${new Date(year, month).toLocaleString("en-US", { month: "short" })} ${year}`}
        </div>
        <div className="mb-1 grid grid-cols-7 gap-0">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1 text-center text-[10px] font-medium uppercase tracking-wider text-white/40">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0">
          {days.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;

            const dateStr = formatDate(year, month, day);
            const isPast = dateStr < todayStr;
            const isCheckIn = isSameDate(dateStr, checkIn);
            const isCheckOut = isSameDate(dateStr, checkOut);
            const inRange = isDateInRange(dateStr, checkIn, checkOut);
            const isToday = dateStr === todayStr;

            let bgClass = "";
            if (isCheckIn || isCheckOut) {
              bgClass = "bg-[#ff784e] text-white font-semibold";
            } else if (inRange) {
              bgClass = "bg-[#ff784e]/15 text-[#ff784e]";
            } else if (isPast) {
              bgClass = "text-white/20 cursor-not-allowed";
            } else {
              bgClass = "text-white/80 hover:bg-white/10 cursor-pointer";
            }

            return (
              <button
                key={dateStr}
                type="button"
                disabled={isPast}
                onClick={() => handleDateClick(dateStr)}
                className={`relative flex h-7 w-full items-center justify-center rounded-lg text-[11px] transition-all duration-150 sm:h-8 sm:text-xs ${bgClass}`}
              >
                {isToday && !(isCheckIn || isCheckOut) && (
                  <span className="absolute inset-0 rounded-lg border border-[#ff784e]/40" />
                )}
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div ref={panelRef} className="w-full rounded-2xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5 sm:px-4 sm:py-3">
        <button type="button" onClick={prevMonth} className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-[#ff784e] hover:text-[#ff784e] sm:h-8 sm:w-8">
          <ChevronLeft size={14} />
        </button>
        <div className="flex gap-3 text-[11px] font-medium text-white/50 sm:gap-6 sm:text-xs">
          <button
            type="button"
            onClick={() => setSelecting("checkin")}
            className={`rounded-full px-2 py-0.5 transition sm:px-3 sm:py-1 ${selecting === "checkin" ? "bg-[#ff784e] text-white" : "hover:text-white"}`}
          >
            Check-in {checkIn ? new Date(checkIn + "T00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
          </button>
          <button
            type="button"
            onClick={() => setSelecting("checkout")}
            className={`rounded-full px-2 py-0.5 transition sm:px-3 sm:py-1 ${selecting === "checkout" ? "bg-[#ff784e] text-white" : "hover:text-white"}`}
          >
            Check-out {checkOut ? new Date(checkOut + "T00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
          </button>
        </div>
        <button type="button" onClick={nextMonth} className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-[#ff784e] hover:text-[#ff784e] sm:h-8 sm:w-8">
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex gap-0 p-4">
        {renderMonth(leftYear, leftMonth)}
        <div className="mx-3 hidden w-px bg-white/10 sm:block" />
        <div className="hidden sm:block">{renderMonth(rightYear, rightMonth)}</div>
      </div>
    </div>
  );
}
