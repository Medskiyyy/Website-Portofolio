"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. EXACT MATERIAL 3 SVG VECTOR ICONS (Matching Android Compose & Screenshots)
// ============================================================================

export const HomeIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

export const CalendarMonthIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h2v2h-2v-2zm-4 0h2v2H8v-2zm8 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm-4 0h2v2H8v-2zm8 0h2v2h-2v-2z" />
  </svg>
);

export const TaskAltIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M22 5.18L10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10L22 5.18zM19.79 10.22C19.92 10.79 20 11.39 20 12c0 4.41-3.59 8-8 8s-8-3.59-8-8 3.59-8 8-8c1.66 0 3.14.51 4.38 1.39l1.44-1.44C16.1 2.67 14.13 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10c1.73 0 3.36-.44 4.79-1.22l-1.52-1.52C14.28 19.67 13.17 20 12 20z" />
  </svg>
);

// Exact Insights icon with the connected polyline + 2 sparkle stars as shown in screenshot
export const InsightsIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93 0-1.1-.9-2-2-2z" />
    <path d="M15 9l.94-2.06L18 6l-2.06-.94L15 3l-.94 2.06L12 6l2.06.94zm4.5 3l.47-1.03L21 10.5l-1.03-.47L19.5 9l-.47 1.03-1.03.47 1.03.47z" />
  </svg>
);

export const SettingsIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

export const SearchIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);

export const FlameIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 23c-4.97 0-9-4.03-9-9 0-4.66 3.52-8.5 7.9-8.95C10.42 6.55 10 8.23 10 10c0 1.66 1.34 3 3 3 .83 0 1.58-.34 2.12-.88C15.68 13.23 16 14.58 16 16c0 3.86-3.14 7-7 7z" />
  </svg>
);

export const PlusIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const EventNoteIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z" />
  </svg>
);

export const TimerIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
  </svg>
);

export const PencilIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

export const TrashIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

export const LockIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

export const CheckIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const ArrowLeftIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const CloseIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className} {...props}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const PlayIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const PauseIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

// ============================================================================
// 2. TYPES
// ============================================================================

type MainTab = "dashboard" | "calendar" | "tasks" | "progress" | "settings";
type ProgressSubTab = "habits" | "study" | "stats" | "heatmap" | "achieve";

interface TaskItem {
  id: string;
  title: string;
  deadline: string;
  status: "AMAN" | "URGENT" | "MEPET" | "WASPADA";
  completed: boolean;
}

interface StudyItem {
  id: string;
  title: string;
  date: string;
  time: string;
}

interface HabitItem {
  id: string;
  name: string;
  type: "routine" | "timer";
  subtitle: string;
  targetText?: string;
  streak: number;
  bestStreak: number;
  completed: boolean;
}

// ============================================================================
// 3. MAIN PROTOTYPE
// ============================================================================

export default function MotherAppPrototype() {
  const [activeTab, setActiveTab] = useState<MainTab>("dashboard");
  const [taskSubTab, setTaskSubTab] = useState<"active" | "completed">("active");
  const [progressSubTab, setProgressSubTab] = useState<ProgressSubTab>("habits");
  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("light");

  // Notification on initial load (Simulates Android system push notification "Pesan dari Ibu")
  const [showPushNotification, setShowPushNotification] = useState(true);

  // Live Timer Service Simulation
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [timerHabitTitle, setTimerHabitTitle] = useState("Learning Cyber Security");
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // State: Tasks matching real screenshot (Hackathon USB - AMAN)
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "t1",
      title: "Hackathon USB",
      deadline: "Kamis, 1 Oktober 2026",
      status: "AMAN",
      completed: false,
    },
  ]);

  // State: Habits matching screenshot (Bangun, Learning Cyber Security, Mandi)
  const [habits, setHabits] = useState<HabitItem[]>([
    {
      id: "h1",
      name: "Bangun",
      type: "routine",
      subtitle: "Pengingat Rutinitas",
      streak: 0,
      bestStreak: 2,
      completed: false,
    },
    {
      id: "h2",
      name: "Learning Cyber Security",
      type: "timer",
      subtitle: "Belum mulai",
      targetText: "0m / 3j",
      streak: 0,
      bestStreak: 3,
      completed: false,
    },
    {
      id: "h3",
      name: "Mandi",
      type: "routine",
      subtitle: "Pengingat Rutinitas",
      streak: 0,
      bestStreak: 1,
      completed: false,
    },
  ]);

  // State: Study sessions matching screenshot
  const [studyList, setStudyList] = useState<StudyItem[]>([
    { id: "s1", title: "Mandi", date: "Jumat, 14 Agustus 2026", time: "13:15 - 13:15 (1m)" },
    { id: "s2", title: "Bangun", date: "Jumat, 14 Agustus 2026", time: "13:15 - 13:15 (1m)" },
    { id: "s3", title: "Bangun", date: "Rabu, 12 Agustus 2026", time: "19:18 - 19:18 (1m)" },
    { id: "s4", title: "Learning Cyber Security", date: "Rabu, 12 Agustus 2026", time: "08:04 - 09:07 (1j 3m)" },
    { id: "s5", title: "Mandi", date: "Selasa, 11 Agustus 2026", time: "18:30 - 18:30 (1m)" },
    { id: "s6", title: "Bangun", date: "Selasa, 11 Agustus 2026", time: "10:24 - 10:24 (1m)" },
  ]);

  const isDark = themeMode === "dark";

  return (
    <div
      className={cn(
        "relative flex h-full min-h-[640px] w-full flex-col font-sans select-none overflow-hidden text-[#121212] transition-colors",
        isDark ? "bg-[#141210] text-[#F0EBDF]" : "bg-[#FAF7F2] text-[#121212]",
      )}
    >
      {/* ================= 1. ANDROID STATUS BAR (6:36, Wifi, 30) ================= */}
      <div className="flex h-7 shrink-0 items-center justify-between px-4 pt-1 text-[11px] font-black tracking-tight">
        <div className="flex items-center gap-1 font-sans">
          <span>6:36</span>
          <span className="text-[10px]">f</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px]">
          <span>⏰</span>
          <span>📶</span>
          <span className="rounded-full bg-black/10 dark:bg-white/20 px-1 py-0.2 font-bold text-[9px]">30</span>
        </div>
      </div>

      {/* ================= ANDROID PUSH NOTIFICATION: PESAN DARI IBU ================= */}
      {showPushNotification && (
        <div className="mx-3.5 mt-1 z-30 flex items-start gap-2.5 rounded-[14px] border-[2.5px] border-black bg-white dark:bg-[#201D18] p-2.5 shadow-[3px_3px_0px_#000000] animate-in slide-in-from-top-3 duration-200">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFD43F] border-[1.5px] border-black text-black font-black text-xs">
            ❤️
          </div>
          <div className="flex-1 pr-1">
            <div className="flex items-center justify-between">
              <span className="font-black text-[10px] uppercase text-[#EAB308]">Pesan dari Ibu</span>
              <span className="text-[9px] text-zinc-500 font-mono">Baru saja</span>
            </div>
            <p className="text-[11px] font-bold leading-tight mt-0.5 text-zinc-900 dark:text-zinc-100">
              Semangat pagi anakku! Jangan lupa jaga kesehatan dan tuntaskan target belajarmu hari ini ya ❤️
            </p>
          </div>
          <button
            onClick={() => setShowPushNotification(false)}
            className="text-zinc-500 hover:text-black dark:hover:text-white p-0.5"
            title="Tutup Notifikasi"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* ================= 2. MAIN SCROLLABLE CONTENT ================= */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-2 scrollbar-none">
        {/* ========================================================= */}
        {/* ================= TAB 1: DASHBOARD ===================== */}
        {/* ========================================================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-4">
            {/* Header: Selamat Pagi + Search */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <h1 className="text-3xl font-black tracking-tight leading-none text-[#121212] dark:text-white">
                  Selamat Pagi
                </h1>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-300 mt-1.5">
                  Senin, 17 Agustus 2026
                </p>
              </div>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] border-black bg-white dark:bg-[#201D18] text-black dark:text-white shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                title="Cari"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Hero Card: STREAK BELAJAR (Yellow with black circle + flame) */}
            <div className="rounded-[20px] border-[3px] border-black bg-[#FFD43F] p-4.5 text-black shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block rounded-lg bg-black px-3 py-1 text-[10px] font-black tracking-wider text-[#FFD43F] uppercase">
                    STREAK BELAJAR
                  </span>
                  <div className="mt-2.5 flex items-baseline gap-2">
                    <span className="text-5xl font-black leading-none tracking-tight">0</span>
                    <span className="text-lg font-black tracking-wide">HARI</span>
                  </div>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black">
                  <div className="text-[#FFD43F]">
                    <FlameIcon className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Target Hari Ini Card */}
            <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-black dark:text-white">Target Hari Ini</span>
                <span className="font-mono text-xs font-black text-[#EAB308]">0m / 3j</span>
              </div>
              <div className="mt-2.5 h-3.5 w-full overflow-hidden rounded-full border-[2px] border-black bg-[#F5EFE6] dark:bg-zinc-800">
                <div className="h-full bg-[#FFD43F] w-0" />
              </div>
            </div>

            {/* Section: Deadline Terdekat */}
            <div className="space-y-2">
              <h2 className="text-base font-black text-black dark:text-white tracking-tight">
                Deadline Terdekat
              </h2>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-[20px] border-[3px] border-black bg-[#1DD1A1] p-3.5 text-black shadow-[4px_4px_0px_#000000]"
                >
                  <div>
                    <p className="font-black text-sm leading-snug">{task.title}</p>
                    <p className="text-[11px] font-bold text-zinc-900 mt-0.5">{task.deadline}</p>
                  </div>
                  <span className="rounded-xl border-[2px] border-black bg-[#1DD1A1] px-3.5 py-1 text-xs font-black uppercase">
                    {task.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Section: Jadwal Hari Ini */}
            <div className="space-y-2">
              <h2 className="text-base font-black text-black dark:text-white tracking-tight">
                Jadwal Hari Ini
              </h2>
              <div className="rounded-[20px] border-[3px] border-black bg-[#F5EFE6] dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000]">
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Belum ada aktivitas hari ini.
                </p>
              </div>
            </div>

            {/* Quick Actions (3 Cards Side-by-Side) */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <button
                onClick={() => {
                  setActiveTab("tasks");
                  setTaskSubTab("active");
                }}
                className="flex flex-col items-center justify-center rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-3 text-center text-black dark:text-white shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all h-24 cursor-pointer"
              >
                <PlusIcon className="h-5 w-5 mb-1" />
                <span className="font-black text-[10px] leading-tight">Tambah Tugas</span>
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className="flex flex-col items-center justify-center rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-3 text-center text-black dark:text-white shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all h-24 cursor-pointer"
              >
                <EventNoteIcon className="h-5 w-5 mb-1 text-black dark:text-white" />
                <span className="font-black text-[10px] leading-tight">Tambah Jadwal</span>
              </button>
              <button
                onClick={() => {
                  setTimerHabitTitle("Learning Cyber Security");
                  setIsTimerModalOpen(true);
                  setIsTimerRunning(true);
                }}
                className="flex flex-col items-center justify-center rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-3 text-center text-black dark:text-white shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all h-24 cursor-pointer"
              >
                <TimerIcon className="h-5 w-5 mb-1 text-black dark:text-white" />
                <span className="font-black text-[10px] leading-tight">Mulai Timer</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= TAB 2: KALENDER ======================= */}
        {/* ========================================================= */}
        {activeTab === "calendar" && (
          <div className="space-y-4 pt-1">
            {/* Header: Month & Left/Right Arrows */}
            <div className="text-center relative pt-1">
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={() => setSelectedDay((prev) => Math.max(1, prev - 1))}
                  className="p-1 hover:opacity-75 cursor-pointer"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <h2 className="text-base font-black text-black dark:text-white">
                  Agustus 2026
                </h2>
                <button
                  onClick={() => setSelectedDay((prev) => Math.min(31, prev + 1))}
                  className="p-1 hover:opacity-75 cursor-pointer"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={() => setSelectedDay(17)}
                className="text-xs font-black text-[#EAB308] mt-0.5 cursor-pointer"
              >
                Hari Ini
              </button>
            </div>

            {/* Calendar Grid (Drawn directly on background) */}
            <div className="pt-2 px-1">
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs mb-3 text-zinc-700 dark:text-zinc-300">
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center">
                {/* August 2026 starts Saturday (5 blanks for Sen-Jum) */}
                <div />
                <div />
                <div />
                <div />
                <div />
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isSelected = selectedDay === day;
                  const isToday = day === 17;
                  const hasStreakBar = [5, 6, 7, 11, 12, 14].includes(day);

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className="relative flex flex-col items-center justify-center py-1 cursor-pointer"
                    >
                      <span
                        className={cn(
                          "font-sans text-xs font-bold transition-all",
                          isToday
                            ? "text-[#EAB308] font-black"
                            : isSelected
                              ? "font-black text-black dark:text-white"
                              : "text-zinc-800 dark:text-zinc-200",
                        )}
                      >
                        {day}
                      </span>
                      {hasStreakBar && (
                        <span className="mt-1 h-1 w-4 rounded-full bg-[#FFD43F]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Day Activity Details */}
            <div className="space-y-1 pt-6 px-1">
              <h3 className="font-black text-base text-black dark:text-white">
                Senin, {selectedDay} Agustus 2026
              </h3>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Tidak ada aktivitas pada tanggal ini.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= TAB 3: TUGAS ========================== */}
        {/* ========================================================= */}
        {activeTab === "tasks" && (
          <div className="space-y-4 pt-1">
            {/* Top input/search box */}
            <div className="rounded-[10px] border-[2px] border-black bg-white dark:bg-[#201D18] px-3.5 py-3 shadow-[2px_2px_0px_#000000]">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Tugas</span>
            </div>

            {/* Sub-tabs: Aktif vs Selesai */}
            <div className="flex border-b-[2px] border-zinc-300 dark:border-zinc-700 bg-transparent">
              <button
                onClick={() => setTaskSubTab("active")}
                className="flex-1 py-2 text-center text-xs font-black text-[#EAB308] transition-all relative cursor-pointer"
              >
                Aktif
                {taskSubTab === "active" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FFD43F]" />
                )}
              </button>
              <button
                onClick={() => setTaskSubTab("completed")}
                className="flex-1 py-2 text-center text-xs font-black text-[#EAB308] transition-all relative cursor-pointer"
              >
                Selesai
                {taskSubTab === "completed" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FFD43F]" />
                )}
              </button>
            </div>

            {/* Tasks Content List */}
            {taskSubTab === "active" ? (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-[20px] border-[3px] border-black bg-[#1DD1A1] p-4 text-black shadow-[4px_4px_0px_#000000]"
                  >
                    <div>
                      <p className="font-black text-sm leading-snug">{task.title}</p>
                      <p className="text-[11px] font-bold text-zinc-900 mt-0.5">{task.deadline}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl border-[2px] border-black bg-[#1DD1A1] px-3.5 py-1 text-xs font-black uppercase">
                        {task.status}
                      </span>
                      <button className="p-1 text-black hover:opacity-75 cursor-pointer">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <CheckIcon className="h-10 w-10 stroke-[4] text-black dark:text-white mb-3" />
                <p className="font-black text-base text-black dark:text-white">Belum ada tugas selesai</p>
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-1">
                  Tugas yang diselesaikan akan muncul di sini.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= TAB 4: PROGRES ======================== */}
        {/* ========================================================= */}
        {activeTab === "progress" && (
          <div className="space-y-4 pt-1">
            {/* Top Sub-tabs (All Yellow Text, Active with Yellow Underline) */}
            <div className="flex gap-6 overflow-x-auto border-b-[2px] border-zinc-300 dark:border-zinc-700 pb-1 scrollbar-none">
              {[
                { id: "habits" as const, label: "Kebiasaan" },
                { id: "study" as const, label: "Belajar" },
                { id: "stats" as const, label: "Statistik" },
                { id: "heatmap" as const, label: "Heatmap" },
                { id: "achieve" as const, label: "Pencapaian" },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setProgressSubTab(sub.id)}
                  className="shrink-0 pb-1.5 text-xs font-black text-[#EAB308] transition-all relative whitespace-nowrap cursor-pointer"
                >
                  {sub.label}
                  {progressSubTab === sub.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FFD43F]" />
                  )}
                </button>
              ))}
            </div>

            {/* 1. Kebiasaan Sub-tab */}
            {progressSubTab === "habits" && (
              <div className="space-y-3.5">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-black text-base text-black dark:text-white">{habit.name}</h3>
                        <p className="text-[11px] font-bold text-[#EAB308] mt-0.5">{habit.subtitle}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (habit.type === "timer") {
                            setTimerHabitTitle(habit.name);
                            setIsTimerModalOpen(true);
                            setIsTimerRunning(true);
                          } else {
                            setHabits((prev) =>
                              prev.map((h) => (h.id === habit.id ? { ...h, completed: !h.completed } : h)),
                            );
                          }
                        }}
                        className="rounded-[14px] border-[2.5px] border-black bg-white dark:bg-[#201D18] px-4 py-2 font-black text-xs text-black dark:text-white shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
                      >
                        {habit.type === "timer" ? "Mulai" : habit.completed ? "Selesai ✓" : "Tandai Selesai"}
                      </button>
                    </div>

                    {habit.targetText && (
                      <div className="mt-2">
                        <p className="font-mono text-xs text-zinc-700 dark:text-zinc-300 mb-1">{habit.targetText}</p>
                        <div className="h-1.5 w-full rounded-full bg-[#E5E5E5] dark:bg-zinc-700 overflow-hidden relative">
                          <div className="h-full bg-[#FFD43F] w-0" />
                          <div className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-[#FFD43F]" />
                        </div>
                      </div>
                    )}

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      <FlameIcon className="h-4 w-4 text-[#FF9F43]" />
                      <span>{habit.streak} hari</span>
                      <span className="text-zinc-400">·</span>
                      <span className="text-zinc-600 dark:text-zinc-400">Terbaik: {habit.bestStreak} hari</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Belajar Sub-tab */}
            {progressSubTab === "study" && (
              <div className="space-y-3">
                <p className="font-black text-base text-black dark:text-white">Total belajar: 3j 11m</p>
                {studyList.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000]"
                  >
                    <div>
                      <p className="font-black text-sm text-black dark:text-white">{item.title}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">{item.date}</p>
                      <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">{item.time}</p>
                    </div>
                    <button
                      onClick={() => setStudyList((prev) => prev.filter((s) => s.id !== item.id))}
                      className="p-1 text-black dark:text-white hover:opacity-75 cursor-pointer"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Statistik Sub-tab */}
            {progressSubTab === "stats" && (
              <div className="space-y-3.5">
                {/* Outlined Dropdown: Tanggal / Minggu Ini */}
                <div className="rounded-[10px] border-[2px] border-black bg-white dark:bg-[#201D18] p-3 shadow-[2px_2px_0px_#000000] flex justify-between items-center relative pt-3.5">
                  <span className="absolute -top-2.5 left-3 bg-white dark:bg-[#201D18] px-1 text-[10px] font-bold text-zinc-700 dark:text-zinc-300">
                    Tanggal
                  </span>
                  <span className="text-xs font-bold text-black dark:text-white">Minggu Ini</span>
                  <span className="text-[10px]">▼</span>
                </div>

                {/* Belajar */}
                <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000] space-y-2">
                  <h4 className="font-black text-base text-black dark:text-white">Belajar</h4>
                  <div className="space-y-1.5 text-xs font-bold">
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Total Jam Belajar</span>
                      <span className="font-mono">0m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Jumlah Sesi</span>
                      <span className="font-mono">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Rata-rata Durasi</span>
                      <span className="font-mono">0m</span>
                    </div>
                  </div>
                </div>

                {/* Kebiasaan */}
                <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000] space-y-2">
                  <h4 className="font-black text-base text-black dark:text-white">Kebiasaan</h4>
                  <div className="space-y-1.5 text-xs font-bold">
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Hari Selesai</span>
                      <span className="font-mono">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Hari Gagal</span>
                      <span className="font-mono">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Streak Aktif</span>
                      <span className="font-mono">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Streak Tertinggi</span>
                      <span className="font-mono">3</span>
                    </div>
                  </div>
                </div>

                {/* Tugas */}
                <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000] space-y-2">
                  <h4 className="font-black text-base text-black dark:text-white">Tugas</h4>
                  <div className="space-y-1.5 text-xs font-bold">
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Total Tugas</span>
                      <span className="font-mono">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Tugas Selesai</span>
                      <span className="font-mono">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Tugas Terlambat</span>
                      <span className="font-mono">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Tugas Aktif</span>
                      <span className="font-mono">0</span>
                    </div>
                  </div>
                </div>

                {/* Jadwal */}
                <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000] space-y-2">
                  <h4 className="font-black text-base text-black dark:text-white">Jadwal</h4>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-600 dark:text-zinc-400 font-medium">Jadwal Selesai</span>
                    <span className="font-mono">0</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Heatmap Sub-tab (Drawn directly on background) */}
            {progressSubTab === "heatmap" && (
              <div className="space-y-4">
                <div className="pt-2">
                  {/* 16 columns x 7 rows heatmap matrix */}
                  <div className="grid grid-cols-16 gap-1">
                    {Array.from({ length: 112 }, (_, i) => {
                      const isBright = [74, 85].includes(i);
                      const isMedium = [62, 73, 86].includes(i);
                      const isLight = [61, 72].includes(i);

                      return (
                        <div
                          key={i}
                          className={cn(
                            "aspect-square rounded-[3px] transition-all",
                            isBright
                              ? "bg-[#FFD43F]"
                              : isMedium
                                ? "bg-[#FFE082]"
                                : isLight
                                  ? "bg-[#FFF9C4]"
                                  : "bg-[#EFEAE1] dark:bg-zinc-800",
                          )}
                        />
                      );
                    })}
                  </div>

                  {/* Heatmap Legend */}
                  <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
                    <span>Sedikit</span>
                    <div className="flex gap-1">
                      <span className="h-3 w-3 rounded-[2px] bg-[#EFEAE1] dark:bg-zinc-800" />
                      <span className="h-3 w-3 rounded-[2px] bg-[#FFFDE7]" />
                      <span className="h-3 w-3 rounded-[2px] bg-[#FFF9C4]" />
                      <span className="h-3 w-3 rounded-[2px] bg-[#FFE082]" />
                      <span className="h-3 w-3 rounded-[2px] bg-[#FFD43F]" />
                    </div>
                    <span>Banyak</span>
                  </div>
                </div>

                {/* Ringkasan Card */}
                <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000] space-y-2">
                  <h4 className="font-black text-base text-black dark:text-white">Ringkasan</h4>
                  <div className="space-y-1.5 text-xs font-bold">
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Total Hari Aktif</span>
                      <span className="font-mono">6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Hari Terbaik</span>
                      <span>Kamis, 6 Agustus 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Durasi Terlama</span>
                      <span className="font-mono">1j 23m</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Pencapaian Sub-tab */}
            {progressSubTab === "achieve" && (
              <div className="space-y-3">
                {[
                  { title: "Streak 7 Hari", current: 3, target: 7 },
                  { title: "Belajar 10 Jam", current: 3, target: 10 },
                  { title: "Streak 30 Hari", current: 3, target: 30 },
                  { title: "Belajar 100 Jam", current: 3, target: 100 },
                  { title: "Streak 100 Hari", current: 3, target: 100 },
                  { title: "100 Task Selesai", current: 0, target: 100 },
                ].map((ach, idx) => (
                  <div
                    key={idx}
                    className="rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <LockIcon className="h-5 w-5 text-black dark:text-white" />
                        <div>
                          <h4 className="font-black text-sm text-black dark:text-white">{ach.title}</h4>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-black dark:text-white">Terkunci</span>
                    </div>

                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-[#E5E5E5] dark:bg-zinc-700 overflow-hidden relative">
                        <div
                          className="h-full bg-[#FFD43F]"
                          style={{ width: `${(ach.current / ach.target) * 100}%` }}
                        />
                        <div className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-[#FFD43F]" />
                      </div>
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
                      {ach.current} / {ach.target}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= TAB 5: PENGATURAN ===================== */}
        {/* ========================================================= */}
        {activeTab === "settings" && (
          <div className="space-y-4 pt-1">
            {/* Tampilan (Theme) */}
            <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000] space-y-3.5">
              <h3 className="font-black text-base text-black dark:text-white">Tampilan</h3>
              <div className="space-y-3">
                {[
                  { id: "light" as const, label: "Terang" },
                  { id: "dark" as const, label: "Gelap" },
                  { id: "system" as const, label: "Ikuti Sistem" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    onClick={() => setThemeMode(opt.id)}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border-[2.5px] transition-all",
                        themeMode === opt.id
                          ? "border-[#EAB308]"
                          : "border-black dark:border-white",
                      )}
                    >
                      {themeMode === opt.id && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#EAB308]" />
                      )}
                    </div>
                    <span className="font-bold text-xs text-black dark:text-white">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cadangan & Pulihkan */}
            <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000] space-y-3">
              <h3 className="font-black text-base text-black dark:text-white">Cadangan & Pulihkan</h3>
              <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                Backup terakhir: Selasa, 11 Agustus 2026
              </p>
              <div className="flex gap-3">
                <button className="flex-1 rounded-[14px] border-[2.5px] border-black bg-white dark:bg-[#201D18] py-2 font-black text-xs text-black dark:text-white shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                  Ekspor Data
                </button>
                <button className="flex-1 rounded-[14px] border-[2.5px] border-black bg-white dark:bg-[#201D18] py-2 font-black text-xs text-black dark:text-white shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                  Impor Data
                </button>
              </div>
            </div>

            {/* Tentang */}
            <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#000000] space-y-1">
              <p className="text-xs font-bold text-zinc-500">Tentang</p>
              <h3 className="font-black text-xl text-black dark:text-white">Mother</h3>
              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Versi 3.4.0</p>
            </div>
          </div>
        )}
      </div>

      {/* ================= FLOATING ACTION BUTTON (FAB) ================= */}
      <button
        onClick={() => {
          if (activeTab === "dashboard" || activeTab === "tasks") {
            setTaskSubTab("active");
            setActiveTab("tasks");
          } else {
            setTimerHabitTitle("Learning Cyber Security");
            setIsTimerModalOpen(true);
            setIsTimerRunning(true);
          }
        }}
        className="absolute bottom-20 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-[20px] border-[3px] border-black bg-[#FFD43F] text-black shadow-[3.5px_3.5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        title="Tambah"
      >
        <PlusIcon className="h-7 w-7" />
      </button>

      {/* ================= 3. BOTTOM NAVIGATION BAR (Exact Material 3 Layout) ================= */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-20 flex h-16 items-center justify-around border-t-[2.5px] px-1 transition-colors",
          isDark
            ? "border-zinc-800 bg-[#141210] text-[#F0EBDF]"
            : "border-black bg-[#FAF7F2] text-[#121212]",
        )}
      >
        {[
          { id: "dashboard" as MainTab, label: "Dashboard", icon: HomeIcon },
          { id: "calendar" as MainTab, label: "Kalender", icon: CalendarMonthIcon },
          { id: "tasks" as MainTab, label: "Tugas", icon: TaskAltIcon },
          { id: "progress" as MainTab, label: "Progres", icon: InsightsIcon },
          { id: "settings" as MainTab, label: "Pengaturan", icon: SettingsIcon },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all cursor-pointer"
            >
              {isActive ? (
                <div className="flex h-7 w-14 items-center justify-center rounded-full bg-[#FFD43F] border-[2px] border-black shadow-[1px_1px_0px_#000000]">
                  <Icon className="h-4 w-4 text-black" />
                </div>
              ) : (
                <div className="flex h-7 w-14 items-center justify-center">
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isDark ? "text-[#C8C2B2]" : "text-[#4A463C]",
                    )}
                  />
                </div>
              )}
              <span
                className={cn(
                  "text-[10px] tracking-tight",
                  isActive
                    ? "font-black text-black dark:text-white"
                    : "font-bold text-zinc-700 dark:text-zinc-300",
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= LIVE TIMER OVERLAY MODAL ================= */}
      {isTimerModalOpen && (
        <div className="absolute inset-0 z-40 flex flex-col justify-between bg-[#121212] p-5 text-white animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="rounded-md border-2 border-white bg-[#FFD43F] px-2.5 py-0.5 font-mono text-[9px] font-black uppercase text-black">
              ⚡ FOREGROUND SERVICE
            </span>
            <button
              onClick={() => setIsTimerModalOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-zinc-800 cursor-pointer"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="my-auto text-center space-y-3">
            <h3 className="text-sm font-black text-[#FFD43F] uppercase tracking-wider">
              {timerHabitTitle}
            </h3>
            <div className="font-mono text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_24px_rgba(255,212,63,0.5)]">
              {formatTimer(timerSeconds)}
            </div>
            <p className="text-[10px] font-mono text-zinc-400">
              {isTimerRunning ? "Sesi Berjalan di Background..." : "Sesi Dijeda"}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex-1 flex h-11 items-center justify-center gap-1.5 rounded-[12px] border-2 border-white bg-[#FFD43F] font-black text-black shadow-[3px_3px_0px_#FFFFFF] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                {isTimerRunning ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                <span>{isTimerRunning ? "Jeda" : "Mulai"}</span>
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setIsTimerModalOpen(false);
                }}
                className="flex-1 flex h-11 items-center justify-center rounded-[12px] border-2 border-white bg-[#FF6B6B] font-black text-black shadow-[3px_3px_0px_#FFFFFF] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
