"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Calendar as CalendarIcon,
  CheckCircle2,
  Sparkles,
  Settings as SettingsIcon,
  Search,
  Flame,
  Plus,
  CalendarDays,
  Timer,
  Pencil,
  Trash2,
  Lock,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MainTab = "dashboard" | "calendar" | "tasks" | "progress" | "settings";
type ProgressSubTab = "habits" | "study" | "stats" | "heatmap" | "achieve";

interface HabitItem {
  id: string;
  name: string;
  type: "routine" | "timer";
  subtitle: string;
  streak: number;
  bestStreak: number;
  duration?: string;
  completed: boolean;
}

export default function MotherAppPrototype() {
  const [activeTab, setActiveTab] = useState<MainTab>("dashboard");
  const [taskSubTab, setTaskSubTab] = useState<"active" | "completed">("active");
  const [progressSubTab, setProgressSubTab] = useState<ProgressSubTab>("habits");
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("light");

  // Interactive Task
  const [tasks, setTasks] = useState([
    {
      id: "t1",
      title: "Hackathon USB",
      deadline: "Kamis, 1 Oktober 2026",
      status: "AMAN",
      completed: false,
    },
  ]);

  // Interactive Habits
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
      duration: "0m / 3j",
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

  // Calendar selected day
  const [selectedDay, setSelectedDay] = useState<number>(17);

  // Live Timer State (Simulates Foreground Service)
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25:00
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerHabitTitle, setTimerHabitTitle] = useState("Learning Cyber Security");

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isDark = themeMode === "dark";

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col font-sans select-none overflow-hidden text-xs transition-colors duration-150",
        isDark ? "bg-[#18181B] text-[#F4F4F5]" : "bg-[#FAF7F2] text-[#121212]",
      )}
    >
      {/* ================= 1. ANDROID STATUS BAR ================= */}
      <div className="flex h-7 shrink-0 items-center justify-between px-4 pt-1 text-[11px] font-bold tracking-tight opacity-80">
        <span className="font-mono">6:36</span>
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <span>4G</span>
          <span>📶</span>
          <span className="rounded-full bg-black/10 dark:bg-white/20 px-1">30</span>
        </div>
      </div>

      {/* ================= 2. MAIN SCROLLABLE BODY ================= */}
      <div className="flex-1 overflow-y-auto px-3.5 pb-20 pt-1.5 scrollbar-none">
        {/* ========================================================= */}
        {/* ================= TAB 1: DASHBOARD ===================== */}
        {/* ========================================================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-4">
            {/* Header: Greeting & Search */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <h1 className="text-2xl font-black tracking-tight leading-none text-[#121212] dark:text-white">
                  Selamat Pagi
                </h1>
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-1">
                  Senin, 17 Agustus 2026
                </p>
              </div>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-black bg-white dark:bg-zinc-800 text-black dark:text-white shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                title="Cari"
              >
                <Search className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Hero Card: STREAK BELAJAR */}
            <div className="rounded-[20px] border-[3px] border-black bg-[#FFD43F] p-4 text-black shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block rounded-md bg-black px-2.5 py-0.5 text-[9px] font-black tracking-wider text-[#FFD43F] uppercase">
                    STREAK BELAJAR
                  </span>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="font-mono text-4xl font-black leading-none tracking-tight">0</span>
                    <span className="text-base font-black">HARI</span>
                  </div>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black">
                  <Flame className="h-7 w-7 text-white fill-white" />
                </div>
              </div>
            </div>

            {/* Target Hari Ini */}
            <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-4 shadow-[4px_4px_0px_#000000]">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-black dark:text-white">Target Hari Ini</span>
                <span className="font-mono text-xs font-black text-[#EAB308]">0m / 3j</span>
              </div>
              <div className="mt-2.5 h-3.5 w-full overflow-hidden rounded-full border-[2px] border-black bg-[#F5EFE6] dark:bg-zinc-800">
                <div className="h-full bg-[#FFD43F] w-0" />
              </div>
            </div>

            {/* Section: Deadline Terdekat */}
            <div className="space-y-2">
              <h2 className="text-sm font-black text-black dark:text-white tracking-tight">
                Deadline Terdekat
              </h2>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-[20px] border-[3px] border-black bg-[#2DD4BF] p-3.5 text-black shadow-[4px_4px_0px_#000000]"
                >
                  <div>
                    <p className="font-black text-xs leading-snug">{task.title}</p>
                    <p className="text-[10px] font-bold opacity-80 mt-0.5">{task.deadline}</p>
                  </div>
                  <span className="rounded-xl border-[2px] border-black bg-[#2DD4BF] px-3 py-1 text-[10px] font-black uppercase">
                    {task.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Section: Jadwal Hari Ini */}
            <div className="space-y-2">
              <h2 className="text-sm font-black text-black dark:text-white tracking-tight">
                Jadwal Hari Ini
              </h2>
              <div className="rounded-[20px] border-[3px] border-black bg-[#F5EFE6] dark:bg-zinc-800 p-4 shadow-[4px_4px_0px_#000000]">
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Belum ada aktivitas hari ini.
                </p>
              </div>
            </div>

            {/* Quick Actions (3 Buttons) */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <button
                onClick={() => {
                  setActiveTab("tasks");
                  setTaskSubTab("active");
                }}
                className="flex flex-col items-center justify-center rounded-[18px] border-[2.5px] border-black bg-white dark:bg-zinc-900 p-3 text-center shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <Plus className="h-5 w-5 mb-1 stroke-[3]" />
                <span className="font-black text-[9px] leading-tight">Tambah Tugas</span>
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className="flex flex-col items-center justify-center rounded-[18px] border-[2.5px] border-black bg-white dark:bg-zinc-900 p-3 text-center shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <CalendarDays className="h-5 w-5 mb-1 stroke-[2.5]" />
                <span className="font-black text-[9px] leading-tight">Tambah Jadwal</span>
              </button>
              <button
                onClick={() => {
                  setTimerHabitTitle("Belajar Fokus");
                  setIsTimerOpen(true);
                }}
                className="flex flex-col items-center justify-center rounded-[18px] border-[2.5px] border-black bg-white dark:bg-zinc-900 p-3 text-center shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <Timer className="h-5 w-5 mb-1 stroke-[2.5]" />
                <span className="font-black text-[9px] leading-tight">Mulai Timer</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= TAB 2: KALENDER ====================== */}
        {/* ========================================================= */}
        {activeTab === "calendar" && (
          <div className="space-y-4 pt-1">
            {/* Header: Month & Navigation */}
            <div className="text-center relative">
              <div className="flex items-center justify-between px-2">
                <button className="p-1 hover:opacity-70">
                  <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                </button>
                <h2 className="text-base font-black">Agustus 2026</h2>
                <button className="p-1 hover:opacity-70">
                  <ChevronRight className="h-5 w-5 stroke-[2.5]" />
                </button>
              </div>
              <button
                onClick={() => setSelectedDay(17)}
                className="text-xs font-black text-[#EAB308] mt-0.5"
              >
                Hari Ini
              </button>
            </div>

            {/* Calendar Matrix */}
            <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-3.5 shadow-[4px_4px_0px_#000000]">
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] mb-2 text-zinc-600 dark:text-zinc-400">
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* Blank days before Aug 1 (starts Saturday) */}
                <div />
                <div />
                <div />
                <div />
                <div />
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isSelected = selectedDay === day;
                  const isToday = day === 17;
                  const hasStreak = [5, 6, 7, 11, 12, 14].includes(day);

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        "flex h-9 flex-col items-center justify-center rounded-lg font-mono text-[11px] font-bold transition-all relative",
                        isSelected
                          ? "border-[2px] border-black bg-[#FFD43F] text-black shadow-[1.5px_1.5px_0px_#000]"
                          : isToday
                            ? "text-[#EAB308] font-black"
                            : "hover:bg-black/5 dark:hover:bg-white/5",
                      )}
                    >
                      <span>{day}</span>
                      {hasStreak && (
                        <span className="absolute bottom-1 h-1 w-3 rounded-full bg-[#FFD43F] border-[0.5px] border-black/50" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Day Activity Details */}
            <div className="space-y-1.5 pt-2">
              <h3 className="font-black text-sm">
                Senin, {selectedDay} Agustus 2026
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Tidak ada aktivitas pada tanggal ini.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= TAB 3: TUGAS ========================= */}
        {/* ========================================================= */}
        {activeTab === "tasks" && (
          <div className="space-y-4 pt-1">
            {/* Top input/search box */}
            <div className="rounded-[12px] border-[2.5px] border-black bg-white dark:bg-zinc-900 p-3 shadow-[3px_3px_0px_#000000]">
              <span className="text-xs font-semibold text-zinc-500">Tugas</span>
            </div>

            {/* Subtabs: Aktif vs Selesai */}
            <div className="flex border-b-[2px] border-zinc-300 dark:border-zinc-700">
              <button
                onClick={() => setTaskSubTab("active")}
                className={cn(
                  "flex-1 py-2 text-center text-xs font-black transition-all relative",
                  taskSubTab === "active" ? "text-[#EAB308]" : "text-zinc-600 dark:text-zinc-400",
                )}
              >
                Aktif
                {taskSubTab === "active" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EAB308]" />
                )}
              </button>
              <button
                onClick={() => setTaskSubTab("completed")}
                className={cn(
                  "flex-1 py-2 text-center text-xs font-black transition-all relative",
                  taskSubTab === "completed" ? "text-[#EAB308]" : "text-zinc-600 dark:text-zinc-400",
                )}
              >
                Selesai
                {taskSubTab === "completed" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EAB308]" />
                )}
              </button>
            </div>

            {/* Tasks Content */}
            {taskSubTab === "active" ? (
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-[20px] border-[3px] border-black bg-[#2DD4BF] p-4 text-black shadow-[4px_4px_0px_#000000]"
                  >
                    <div>
                      <p className="font-black text-xs leading-snug">{task.title}</p>
                      <p className="text-[10px] font-bold opacity-80 mt-0.5">{task.deadline}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-xl border-[2px] border-black bg-[#2DD4BF] px-3 py-1 text-[10px] font-black uppercase">
                        {task.status}
                      </span>
                      <button className="p-1 text-black hover:opacity-75">
                        <Pencil className="h-4 w-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Check className="h-10 w-10 stroke-[3] text-black dark:text-white mb-3" />
                <p className="font-black text-sm text-black dark:text-white">Belum ada tugas selesai</p>
                <p className="text-xs text-zinc-500 mt-1">Tugas yang diselesaikan akan muncul di sini.</p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= TAB 4: PROGRES ======================= */}
        {/* ========================================================= */}
        {activeTab === "progress" && (
          <div className="space-y-4 pt-1">
            {/* Top Sub-tabs */}
            <div className="flex gap-4 overflow-x-auto border-b-[2px] border-zinc-300 dark:border-zinc-700 pb-1 scrollbar-none">
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
                  className={cn(
                    "shrink-0 pb-1.5 text-xs font-black transition-all relative",
                    progressSubTab === sub.id
                      ? "text-[#EAB308]"
                      : "text-zinc-600 dark:text-zinc-400",
                  )}
                >
                  {sub.label}
                  {progressSubTab === sub.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EAB308]" />
                  )}
                </button>
              ))}
            </div>

            {/* 1. Kebiasaan Sub-tab */}
            {progressSubTab === "habits" && (
              <div className="space-y-3">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-4 shadow-[4px_4px_0px_#000000]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-black text-sm text-black dark:text-white">{habit.name}</h3>
                        <p className="text-[10px] font-bold text-[#EAB308] mt-0.5">{habit.subtitle}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (habit.type === "timer") {
                            setTimerHabitTitle(habit.name);
                            setIsTimerOpen(true);
                          } else {
                            setHabits((prev) =>
                              prev.map((h) => (h.id === habit.id ? { ...h, completed: !h.completed } : h)),
                            );
                          }
                        }}
                        className="rounded-[12px] border-[2px] border-black bg-white dark:bg-zinc-800 px-3.5 py-1.5 font-black text-xs text-black dark:text-white shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                      >
                        {habit.type === "timer" ? "Mulai" : habit.completed ? "Selesai ✓" : "Tandai Selesai"}
                      </button>
                    </div>

                    {habit.duration && (
                      <div className="mt-2">
                        <p className="font-mono text-[10px] text-zinc-600 dark:text-zinc-400 mb-1">{habit.duration}</p>
                        <div className="h-1.5 w-full rounded-full bg-[#E5E5E5] overflow-hidden">
                          <div className="h-full bg-[#FFD43F] w-0" />
                        </div>
                      </div>
                    )}

                    <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-zinc-700 dark:text-zinc-300">
                      <Flame className="h-3.5 w-3.5 text-[#EAB308] fill-[#EAB308]" />
                      <span>{habit.streak} hari</span>
                      <span className="opacity-50">·</span>
                      <span className="opacity-75">Terbaik: {habit.bestStreak} hari</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Belajar Sub-tab */}
            {progressSubTab === "study" && (
              <div className="space-y-3">
                <p className="font-black text-sm">Total belajar: 3j 11m</p>
                {[
                  { title: "Mandi", date: "Jumat, 14 Agustus 2026", time: "13:15 - 13:15 (1m)" },
                  { title: "Bangun", date: "Jumat, 14 Agustus 2026", time: "13:15 - 13:15 (1m)" },
                  { title: "Bangun", date: "Rabu, 12 Agustus 2026", time: "19:18 - 19:18 (1m)" },
                  { title: "Learning Cyber Security", date: "Rabu, 12 Agustus 2026", time: "08:04 - 09:07 (1j 3m)" },
                  { title: "Mandi", date: "Selasa, 11 Agustus 2026", time: "18:30 - 18:30 (1m)" },
                  { title: "Bangun", date: "Selasa, 11 Agustus 2026", time: "10:24 - 10:24 (1m)" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-4 shadow-[4px_4px_0px_#000000]"
                  >
                    <div>
                      <p className="font-black text-xs">{item.title}</p>
                      <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">{item.date}</p>
                      <p className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400">{item.time}</p>
                    </div>
                    <button className="p-1 text-black dark:text-white hover:opacity-75">
                      <Trash2 className="h-4 w-4 stroke-[2.5]" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Statistik Sub-tab */}
            {progressSubTab === "stats" && (
              <div className="space-y-3">
                <div className="rounded-[12px] border-[2.5px] border-black bg-white dark:bg-zinc-900 p-3 shadow-[3px_3px_0px_#000000] flex justify-between items-center">
                  <span className="text-xs font-bold">Minggu Ini</span>
                  <span className="text-xs">▼</span>
                </div>

                <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-4 shadow-[4px_4px_0px_#000000] space-y-2">
                  <h4 className="font-black text-sm">Belajar</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-zinc-500 text-[10px]">Total Jam Belajar</p>
                      <p className="font-black text-sm font-mono">0m</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-[10px]">Jumlah Sesi</p>
                      <p className="font-black text-sm font-mono">0</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px]">Rata-rata Durasi</p>
                    <p className="font-black text-sm font-mono">0m</p>
                  </div>
                </div>

                <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-4 shadow-[4px_4px_0px_#000000] space-y-2">
                  <h4 className="font-black text-sm">Kebiasaan</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-zinc-500 text-[10px]">Hari Selesai</p>
                      <p className="font-black text-sm font-mono">0</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-[10px]">Hari Gagal</p>
                      <p className="font-black text-sm font-mono">0</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-[10px]">Streak Aktif</p>
                      <p className="font-black text-sm font-mono">0</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-[10px]">Streak Tertinggi</p>
                      <p className="font-black text-sm font-mono">3</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Heatmap Sub-tab */}
            {progressSubTab === "heatmap" && (
              <div className="space-y-4">
                <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-4 shadow-[4px_4px_0px_#000000]">
                  {/* Heatmap Grid */}
                  <div className="grid grid-cols-12 gap-1.5">
                    {Array.from({ length: 72 }, (_, i) => {
                      const isActive = [34, 45, 46, 57, 58, 69].includes(i);
                      const isHigh = [46, 58].includes(i);
                      return (
                        <div
                          key={i}
                          className={cn(
                            "aspect-square rounded-sm border-[0.5px] border-black/20 transition-all",
                            isHigh
                              ? "bg-[#FFD43F]"
                              : isActive
                                ? "bg-[#FFE793]"
                                : "bg-[#F5EFE6] dark:bg-zinc-800",
                          )}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-zinc-500">
                    <span>Sedikit</span>
                    <div className="flex gap-1">
                      <span className="h-2.5 w-2.5 rounded-xs bg-[#F5EFE6]" />
                      <span className="h-2.5 w-2.5 rounded-xs bg-[#FFF3C4]" />
                      <span className="h-2.5 w-2.5 rounded-xs bg-[#FFE793]" />
                      <span className="h-2.5 w-2.5 rounded-xs bg-[#FFD43F]" />
                    </div>
                    <span>Banyak</span>
                  </div>
                </div>

                {/* Ringkasan */}
                <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-4 shadow-[4px_4px_0px_#000000] space-y-2.5">
                  <h4 className="font-black text-sm">Ringkasan</h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400">Total Hari Aktif</span>
                      <span className="font-black font-mono">6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400">Hari Terbaik</span>
                      <span className="font-black">Kamis, 6 Agustus 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400">Durasi Terlama</span>
                      <span className="font-black font-mono">1j 23m</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Pencapaian Sub-tab */}
            {progressSubTab === "achieve" && (
              <div className="space-y-3">
                {[
                  { title: "Streak 7 Hari", progress: "3 / 7" },
                  { title: "Belajar 10 Jam", progress: "3 / 10" },
                  { title: "Streak 30 Hari", progress: "3 / 30" },
                  { title: "Belajar 100 Jam", progress: "3 / 100" },
                  { title: "Streak 100 Hari", progress: "3 / 100" },
                  { title: "100 Task Selesai", progress: "0 / 100" },
                ].map((ach, idx) => (
                  <div
                    key={idx}
                    className="rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-4 shadow-[4px_4px_0px_#000000]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Lock className="h-4 w-4 text-black dark:text-white stroke-[2.5]" />
                        <h4 className="font-black text-xs">{ach.title}</h4>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-500">Terkunci</span>
                    </div>
                    <div className="mt-2.5 h-1.5 w-full rounded-full bg-[#E5E5E5] overflow-hidden">
                      <div className="h-full bg-[#FFD43F] w-[40%]" />
                    </div>
                    <p className="mt-1.5 font-mono text-[9px] text-zinc-500">{ach.progress}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= TAB 5: PENGATURAN ==================== */}
        {/* ========================================================= */}
        {activeTab === "settings" && (
          <div className="space-y-4 pt-1">
            {/* Tampilan (Theme) */}
            <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-4 shadow-[4px_4px_0px_#000000] space-y-3">
              <h3 className="font-black text-sm">Tampilan</h3>
              <div className="space-y-2">
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
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-[2px] border-black">
                      {themeMode === opt.id && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#EAB308]" />
                      )}
                    </div>
                    <span className="font-bold text-xs">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cadangan & Pulihkan */}
            <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-4 shadow-[4px_4px_0px_#000000] space-y-3">
              <h3 className="font-black text-sm">Cadangan & Pulihkan</h3>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                Backup terakhir: Selasa, 11 Agustus 2026
              </p>
              <div className="flex gap-3">
                <button className="flex-1 rounded-[12px] border-[2.5px] border-black bg-white dark:bg-zinc-800 py-2 font-black text-xs shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                  Ekspor Data
                </button>
                <button className="flex-1 rounded-[12px] border-[2.5px] border-black bg-white dark:bg-zinc-800 py-2 font-black text-xs shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                  Impor Data
                </button>
              </div>
            </div>

            {/* Tentang */}
            <div className="rounded-[20px] border-[3px] border-black bg-white dark:bg-zinc-900 p-4 shadow-[4px_4px_0px_#000000] space-y-1">
              <p className="text-[10px] font-bold text-zinc-500">Tentang</p>
              <h3 className="font-black text-lg">Mother</h3>
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
            setTimerHabitTitle("Belajar Fokus");
            setIsTimerOpen(true);
          }
        }}
        className="absolute bottom-16 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-[16px] border-[3px] border-black bg-[#FFD43F] text-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
      >
        <Plus className="h-6 w-6 stroke-[3]" />
      </button>

      {/* ================= LIVE TIMER OVERLAY ================= */}
      {isTimerOpen && (
        <div className="absolute inset-0 z-40 flex flex-col justify-between bg-[#121212] p-5 text-white animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="rounded-md border-2 border-white bg-[#FFD43F] px-2 py-0.5 font-mono text-[9px] font-black uppercase text-black">
              ⚡ FOREGROUND SERVICE
            </span>
            <button
              onClick={() => setIsTimerOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-zinc-800"
            >
              <X className="h-4 w-4" />
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
                className="flex-1 flex h-11 items-center justify-center gap-1.5 rounded-[12px] border-2 border-white bg-[#FFD43F] font-black text-black shadow-[3px_3px_0px_#FFFFFF] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {isTimerRunning ? <Pause className="h-4 w-4 fill-black" /> : <Play className="h-4 w-4 fill-black" />}
                <span>{isTimerRunning ? "Jeda" : "Mulai"}</span>
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(1500);
                  setIsTimerOpen(false);
                }}
                className="flex-1 flex h-11 items-center justify-center rounded-[12px] border-2 border-white bg-[#FF6B6B] font-black text-black shadow-[3px_3px_0px_#FFFFFF] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. BOTTOM NAVIGATION BAR ================= */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-20 flex h-14 items-center justify-around border-t-[2.5px] px-2",
          isDark
            ? "border-zinc-800 bg-[#18181B] text-[#F4F4F5]"
            : "border-black bg-[#FAF7F2] text-[#121212]",
        )}
      >
        {[
          { id: "dashboard" as MainTab, label: "Dashboard", icon: Home },
          { id: "calendar" as MainTab, label: "Kalender", icon: CalendarIcon },
          { id: "tasks" as MainTab, label: "Tugas", icon: CheckCircle2 },
          { id: "progress" as MainTab, label: "Progres", icon: Sparkles },
          { id: "settings" as MainTab, label: "Pengaturan", icon: SettingsIcon },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsTimerOpen(false);
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 transition-all",
                isActive ? "text-black dark:text-white" : "opacity-60 hover:opacity-100",
              )}
            >
              {isActive ? (
                <div className="flex items-center justify-center rounded-full bg-[#FFD43F] px-4 py-1 border-[2px] border-black shadow-[1px_1px_0px_#000]">
                  <Icon className="h-4 w-4 stroke-[2.5] text-black" />
                </div>
              ) : (
                <Icon className="h-4 w-4 stroke-[2]" />
              )}
              <span className="text-[9px] font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
