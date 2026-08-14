"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Calendar as CalendarIcon,
  CheckSquare,
  BarChart3,
  Settings as SettingsIcon,
  Play,
  Pause,
  RotateCcw,
  Flame,
  Clock,
  AlertCircle,
  Check,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "dashboard" | "calendar" | "tasks" | "progress" | "settings";

type TaskItem = {
  id: string;
  title: string;
  deadline: string;
  priority: "urgent" | "mepet" | "waspada" | "aman";
  category: string;
  completed: boolean;
};

const initialTasks: TaskItem[] = [
  {
    id: "1",
    title: "Selesaikan Room Database Migration",
    deadline: "Hari ini, 23:59",
    priority: "urgent",
    category: "Android",
    completed: false,
  },
  {
    id: "2",
    title: "Tugas Kuliah Sistem Informasi",
    deadline: "Besok, 12:00",
    priority: "mepet",
    category: "Kuliah",
    completed: false,
  },
  {
    id: "3",
    title: "Review PR Neobrutalism UI Specs",
    deadline: "18 Agu, 17:00",
    priority: "waspada",
    category: "Mother",
    completed: true,
  },
  {
    id: "4",
    title: "Perbarui Dokumentasi README & API",
    deadline: "20 Agu, 20:00",
    priority: "aman",
    category: "Dokumentasi",
    completed: false,
  },
];

const habitsList = [
  { id: "h1", name: "Mandi Pagi & Sholat", streak: 12, completed: true, icon: "🌅" },
  { id: "h2", name: "Belajar Kotlin & Jetpack Compose", streak: 7, completed: false, icon: "💻" },
  { id: "h3", name: "Olahraga / Workout 20 Menit", streak: 5, completed: false, icon: "🏋️" },
  { id: "h4", name: "Baca Buku / Dokumentasi Tech", streak: 4, completed: true, icon: "📖" },
];

export default function MotherAppPrototype() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [habits, setHabits] = useState(habitsList);
  const [taskFilter, setTaskFilter] = useState<"all" | "urgent" | "mepet" | "aman">("all");
  const [selectedDate, setSelectedDate] = useState<number>(14);

  // Focus Timer state
  const [isFocusOpen, setIsFocusOpen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25:00
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const sessionLabel = "Belajar Jetpack Compose";

  // Mockup internal theme (light/dark)
  const [mockupDark, setMockupDark] = useState(true);

  // Timer interval effect
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              completed: !h.completed,
              streak: !h.completed ? h.streak + 1 : Math.max(0, h.streak - 1),
            }
          : h,
      ),
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === "all") return true;
    return t.priority === taskFilter;
  });

  const completedHabitsCount = habits.filter((h) => h.completed).length;

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col font-sans select-none overflow-hidden text-xs transition-colors duration-200",
        mockupDark ? "bg-[#121212] text-[#F4F4F5]" : "bg-[#FFFDF9] text-[#18181B]",
      )}
    >
      {/* Top Status Bar Simulation */}
      <div className="flex h-7 shrink-0 items-center justify-between px-4 pt-1 text-[10px] font-mono font-bold tracking-tight opacity-75">
        <span>09:41</span>
        <div className="flex items-center gap-1.5">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      {/* Main Content Area based on Active Tab */}
      <div className="flex-1 overflow-y-auto px-3.5 pb-16 pt-1">
        {/* ================= TAB 1: DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-3">
            {/* Header Greeting */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Kamis, 14 Agustus
                </p>
                <h2 className="text-base font-black tracking-tight">Selamat Pagi, Ahmad! 👋</h2>
              </div>
              <button
                onClick={() => setMockupDark(!mockupDark)}
                aria-label="Toggle demo theme"
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg border-2 font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all",
                  mockupDark
                    ? "border-white/90 bg-[#242424] text-amber-300"
                    : "border-black bg-amber-100 text-amber-900",
                )}
              >
                {mockupDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Streak & Target Progress Card */}
            <div
              className={cn(
                "rounded-xl border-2 p-3 shadow-[3px_3px_0px_rgba(0,0,0,1)]",
                mockupDark
                  ? "border-white/80 bg-[#1E1E1E]"
                  : "border-black bg-[#FFF7ED] text-zinc-900",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                  <span className="font-black text-xs uppercase tracking-wide">
                    7 Hari Streak Aktif
                  </span>
                </div>
                <span className="rounded-md border border-black/40 bg-orange-500/20 px-1.5 py-0.5 text-[9px] font-black text-orange-600 dark:text-orange-400">
                  Konsisten
                </span>
              </div>
              <div className="mt-2.5 space-y-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span>Target Belajar Hari Ini</span>
                  <span className="font-mono">1j 25m / 2j 00m</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full border border-black/60 bg-zinc-300 dark:bg-zinc-800">
                  <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: "70%" }} />
                </div>
              </div>
            </div>

            {/* Quick Focus Timer CTA Card */}
            <div
              className={cn(
                "rounded-xl border-2 p-3 shadow-[3px_3px_0px_rgba(0,0,0,1)]",
                mockupDark ? "border-white/80 bg-[#182234]" : "border-black bg-[#EFF6FF]",
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-blue-500">
                    Aktivitas Berikutnya
                  </p>
                  <h3 className="font-black text-xs">{sessionLabel}</h3>
                  <p className="text-[10px] opacity-75 font-mono">25 Menit Sesi Fokus</p>
                </div>
                <button
                  onClick={() => setIsFocusOpen(true)}
                  className="flex items-center gap-1 rounded-lg border-2 border-black bg-blue-500 px-2.5 py-1.5 font-black text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                >
                  <Play className="h-3 w-3 fill-white" />
                  <span>{isTimerRunning ? "Lanjutkan" : "Mulai"}</span>
                </button>
              </div>
            </div>

            {/* Habits Today Check Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-xs uppercase tracking-wide">
                  Kebiasaan Hari Ini ({completedHabitsCount}/{habits.length})
                </h3>
                <span className="text-[10px] font-bold text-primary">Semua</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {habits.slice(0, 4).map((habit) => (
                  <button
                    key={habit.id}
                    onClick={() => toggleHabit(habit.id)}
                    className={cn(
                      "flex items-center justify-between rounded-lg border-2 p-2 text-left shadow-[2px_2px_0px_rgba(0,0,0,1)] active:scale-[0.98] transition-all",
                      habit.completed
                        ? mockupDark
                          ? "border-emerald-500/80 bg-emerald-950/40 text-emerald-300"
                          : "border-black bg-emerald-100 text-emerald-950"
                        : mockupDark
                          ? "border-white/70 bg-[#1C1C1C]"
                          : "border-black bg-white",
                    )}
                  >
                    <div className="truncate pr-1">
                      <span className="mr-1">{habit.icon}</span>
                      <span className="font-bold text-[10px]">{habit.name}</span>
                    </div>
                    <div
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 font-black",
                        habit.completed
                          ? "border-black bg-emerald-500 text-white"
                          : "border-black/50 bg-transparent",
                      )}
                    >
                      {habit.completed && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Deadline Terdekat */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-xs uppercase tracking-wide">Deadline Terdekat</h3>
                <span className="text-[10px] font-bold text-primary">Lihat Tasks</span>
              </div>
              <div className="space-y-1.5">
                {tasks.slice(0, 2).map((t) => (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-lg border-2 p-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all",
                      t.priority === "urgent"
                        ? mockupDark
                          ? "border-red-500/80 bg-red-950/30"
                          : "border-black bg-red-50"
                        : mockupDark
                          ? "border-amber-500/80 bg-amber-950/30"
                          : "border-black bg-amber-50",
                    )}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <div
                        className={cn(
                          "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border",
                          t.completed ? "border-black bg-black text-white" : "border-black/60",
                        )}
                      >
                        {t.completed && <Check className="h-2 w-2 stroke-[3]" />}
                      </div>
                      <span className={cn("font-bold text-[10px] truncate", t.completed && "line-through opacity-50")}>
                        {t.title}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider border border-black/40",
                        t.priority === "urgent"
                          ? "bg-red-500 text-white"
                          : "bg-amber-400 text-black",
                      )}
                    >
                      {t.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CALENDAR ================= */}
        {activeTab === "calendar" && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary">Agustus 2026</span>
                <h2 className="text-sm font-black">Agenda & Kalender</h2>
              </div>
              <button
                onClick={() => setSelectedDate(14)}
                className="rounded-md border-2 border-black bg-primary px-2 py-0.5 font-bold text-white text-[9px] shadow-[1px_1px_0px_rgba(0,0,0,1)]"
              >
                Hari Ini
              </button>
            </div>

            {/* Calendar Week Strip */}
            <div
              className={cn(
                "rounded-xl border-2 p-2 shadow-[3px_3px_0px_rgba(0,0,0,1)]",
                mockupDark ? "border-white/80 bg-[#1C1C1C]" : "border-black bg-white",
              )}
            >
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px]">
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
                  <span key={d} className="opacity-60">
                    {d}
                  </span>
                ))}
                {[10, 11, 12, 13, 14, 15, 16].map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-lg py-1.5 transition-all font-mono",
                      selectedDate === day
                        ? "border-2 border-black bg-primary font-black text-white shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]"
                        : "hover:bg-zinc-200 dark:hover:bg-zinc-800",
                    )}
                  >
                    <span>{day}</span>
                    {day === 14 && (
                      <span className="mt-0.5 h-1 w-1 rounded-full bg-orange-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule List for Selected Date */}
            <div className="space-y-2">
              <h3 className="font-black text-xs uppercase tracking-wide">
                Aktivitas ({selectedDate} Agustus)
              </h3>
              <div className="space-y-2">
                <div
                  className={cn(
                    "flex items-start gap-2.5 rounded-xl border-2 p-2.5 shadow-[2px_2px_0px_rgba(0,0,0,1)]",
                    mockupDark ? "border-white/80 bg-[#1E293B]" : "border-black bg-blue-50",
                  )}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-black bg-blue-500 text-white font-bold">
                    <Clock className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-[11px]">Sesi Belajar Android</p>
                      <span className="font-mono text-[9px] font-bold text-blue-500">
                        09:00 - 11:00
                      </span>
                    </div>
                    <p className="text-[9px] opacity-75 mt-0.5">
                      Fokus implementasi Jetpack Compose StateFlow
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex items-start gap-2.5 rounded-xl border-2 p-2.5 shadow-[2px_2px_0px_rgba(0,0,0,1)]",
                    mockupDark ? "border-white/80 bg-[#271C19]" : "border-black bg-orange-50",
                  )}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-black bg-orange-500 text-white font-bold">
                    <AlertCircle className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-[11px]">Review Target Streak</p>
                      <span className="font-mono text-[9px] font-bold text-orange-500">
                        14:30 - 15:00
                      </span>
                    </div>
                    <p className="text-[9px] opacity-75 mt-0.5">
                      Verifikasi 4 kebiasaan harian
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: TASKS ================= */}
        {activeTab === "tasks" && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary">Manajemen Tugas</span>
                <h2 className="text-sm font-black">Matriks Prioritas</h2>
              </div>
              <span className="rounded-md border border-black/40 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 text-[9px] font-bold font-mono">
                {tasks.filter((t) => !t.completed).length} Aktif
              </span>
            </div>

            {/* Filter Priority Chips */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              {(["all", "urgent", "mepet", "aman"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTaskFilter(filter)}
                  className={cn(
                    "rounded-lg border-2 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider transition-all shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]",
                    taskFilter === filter
                      ? "border-black bg-primary text-white"
                      : mockupDark
                        ? "border-white/60 bg-[#242424] text-zinc-300"
                        : "border-black bg-white text-zinc-700",
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Tasks List */}
            <div className="space-y-2">
              {filteredTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className={cn(
                    "flex cursor-pointer items-start justify-between rounded-xl border-2 p-2.5 shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all",
                    t.completed
                      ? "opacity-50 border-black/40 bg-zinc-200 dark:bg-zinc-900"
                      : t.priority === "urgent"
                        ? mockupDark
                          ? "border-red-500/80 bg-red-950/30"
                          : "border-black bg-red-100"
                        : t.priority === "mepet"
                          ? mockupDark
                            ? "border-amber-500/80 bg-amber-950/30"
                            : "border-black bg-amber-100"
                          : mockupDark
                            ? "border-emerald-500/80 bg-emerald-950/30"
                            : "border-black bg-emerald-100",
                  )}
                >
                  <div className="flex items-start gap-2 pr-2">
                    <div
                      className={cn(
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 font-black",
                        t.completed ? "border-black bg-black text-white" : "border-black bg-white",
                      )}
                    >
                      {t.completed && <Check className="h-2.5 w-2.5 stroke-[3] text-white" />}
                    </div>
                    <div>
                      <p className={cn("font-bold text-[11px]", t.completed && "line-through")}>
                        {t.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[8px] font-bold opacity-75 font-mono">
                        <span>⏰ {t.deadline}</span>
                        <span>🏷️ {t.category}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded border border-black px-1.5 py-0.5 text-[8px] font-black uppercase",
                      t.priority === "urgent" && "bg-red-500 text-white",
                      t.priority === "mepet" && "bg-amber-400 text-black",
                      t.priority === "waspada" && "bg-blue-400 text-black",
                      t.priority === "aman" && "bg-emerald-500 text-white",
                    )}
                  >
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: PROGRESS ================= */}
        {activeTab === "progress" && (
          <div className="space-y-3 pt-1">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-primary">Statistik & Analitik</span>
              <h2 className="text-sm font-black">Progres Belajar & Streak</h2>
            </div>

            {/* Weekly Hours Bar Chart Visual */}
            <div
              className={cn(
                "rounded-xl border-2 p-3 shadow-[3px_3px_0px_rgba(0,0,0,1)]",
                mockupDark ? "border-white/80 bg-[#1C1C1C]" : "border-black bg-white",
              )}
            >
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-bold text-[10px]">Waktu Fokus Mingguan</span>
                <span className="font-mono text-xs font-black text-primary">18j 40m Total</span>
              </div>
              <div className="flex items-end justify-between gap-1.5 h-20 pt-2 border-b border-black/20 dark:border-white/20 pb-1">
                {[
                  { d: "S", h: "60%" },
                  { d: "S", h: "85%" },
                  { d: "R", h: "45%" },
                  { d: "K", h: "95%" },
                  { d: "J", h: "70%" },
                  { d: "S", h: "30%" },
                  { d: "M", h: "50%" },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div
                      className={cn(
                        "w-full rounded-t border border-black/80 transition-all",
                        idx === 3 ? "bg-primary" : "bg-zinc-400 dark:bg-zinc-700",
                      )}
                      style={{ height: item.h }}
                    />
                    <span className="text-[8px] font-bold font-mono opacity-60">{item.d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className={cn(
                  "rounded-xl border-2 p-2.5 shadow-[2px_2px_0px_rgba(0,0,0,1)]",
                  mockupDark ? "border-white/80 bg-[#1E293B]" : "border-black bg-blue-100 text-zinc-900",
                )}
              >
                <p className="text-[9px] font-bold uppercase text-blue-600 dark:text-blue-400">Total Sesi</p>
                <p className="font-mono text-lg font-black mt-0.5">34 Sesi</p>
                <p className="text-[8px] opacity-75">Rata-rata 42m/sesi</p>
              </div>

              <div
                className={cn(
                  "rounded-xl border-2 p-2.5 shadow-[2px_2px_0px_rgba(0,0,0,1)]",
                  mockupDark ? "border-white/80 bg-[#271C19]" : "border-black bg-orange-100 text-zinc-900",
                )}
              >
                <p className="text-[9px] font-bold uppercase text-orange-600 dark:text-orange-400">Streak Tertinggi</p>
                <p className="font-mono text-lg font-black mt-0.5">14 Hari</p>
                <p className="text-[8px] opacity-75">Rekor bulan ini</p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: SETTINGS ================= */}
        {activeTab === "settings" && (
          <div className="space-y-3 pt-1">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-primary">Konfigurasi</span>
              <h2 className="text-sm font-black">Pengaturan Aplikasi</h2>
            </div>

            <div
              className={cn(
                "rounded-xl border-2 divide-y-2 shadow-[3px_3px_0px_rgba(0,0,0,1)]",
                mockupDark
                  ? "border-white/80 bg-[#1C1C1C] divide-white/20"
                  : "border-black bg-white divide-black/20",
              )}
            >
              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="font-bold text-[11px]">Tema Tampilan</p>
                  <p className="text-[9px] opacity-75">Mode Gelap / Terang Neobrutalism</p>
                </div>
                <button
                  onClick={() => setMockupDark(!mockupDark)}
                  className="rounded-lg border-2 border-black bg-primary px-2.5 py-1 font-bold text-white text-[9px] shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                >
                  {mockupDark ? "Dark" : "Light"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="font-bold text-[11px]">Foreground Timer Service</p>
                  <p className="text-[9px] opacity-75">Notifikasi & lock-screen aktif</p>
                </div>
                <span className="rounded bg-emerald-500/20 border border-emerald-500 px-1.5 py-0.5 text-[8px] font-black text-emerald-400 uppercase">
                  Aktif
                </span>
              </div>

              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="font-bold text-[11px]">Versi Aplikasi</p>
                  <p className="text-[9px] font-mono opacity-75">Mother v3.4.0 (Compose)</p>
                </div>
                <span className="font-mono text-[9px] font-bold">Release</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= FOCUS CHRONOMETER OVERLAY ================= */}
      {isFocusOpen && (
        <div className="absolute inset-0 z-30 flex flex-col justify-between bg-black/95 p-4 text-white animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pt-1">
            <span className="rounded border border-white/40 bg-white/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase">
              ⚡ Live Foreground Service
            </span>
            <button
              onClick={() => setIsFocusOpen(false)}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40 bg-zinc-800"
            >
              <X className="h-3.5 w-3.5 text-white" />
            </button>
          </div>

          <div className="my-auto text-center space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
              {sessionLabel}
            </p>
            <div className="font-mono text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(59,130,246,0.5)]">
              {formatTimer(timerSeconds)}
            </div>
            <p className="text-[9px] text-zinc-400 font-mono">
              {isTimerRunning ? "Sesi Berjalan di Background..." : "Sesi Dijeda"}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex h-12 w-28 items-center justify-center gap-2 rounded-xl border-2 border-white bg-primary text-xs font-black shadow-[3px_3px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {isTimerRunning ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white" />}
                <span>{isTimerRunning ? "Jeda" : "Mulai"}</span>
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(1500);
                }}
                className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-zinc-800 font-black shadow-[3px_3px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <RotateCcw className="h-4 w-4 text-white" />
              </button>
            </div>

            <button
              onClick={() => setIsFocusOpen(false)}
              className="w-full text-center text-[10px] font-bold text-zinc-400 hover:text-white"
            >
              Kecilkan ke Background Banner ↓
            </button>
          </div>
        </div>
      )}

      {/* ================= PERSISTENT ACTIVE TIMER BANNER (when running & minimized) ================= */}
      {isTimerRunning && !isFocusOpen && (
        <div
          onClick={() => setIsFocusOpen(true)}
          className="absolute bottom-13 left-2 right-2 z-20 flex cursor-pointer items-center justify-between rounded-lg border-2 border-black bg-blue-500 px-3 py-1.5 text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] active:scale-[0.98]"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="font-black text-[9px] truncate">Timer Aktif: {sessionLabel}</span>
          </div>
          <span className="font-mono text-[10px] font-black">{formatTimer(timerSeconds)}</span>
        </div>
      )}

      {/* ================= BOTTOM NAVIGATION (5 TABS) ================= */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-10 flex h-13 items-center justify-around border-t-2 px-1 backdrop-blur-md",
          mockupDark
            ? "border-white/30 bg-[#121212]/95 text-zinc-400"
            : "border-black/30 bg-[#FFFDF9]/95 text-zinc-600",
        )}
      >
        {[
          { id: "dashboard" as Tab, label: "Home", icon: Home },
          { id: "calendar" as Tab, label: "Kalender", icon: CalendarIcon },
          { id: "tasks" as Tab, label: "Tasks", icon: CheckSquare },
          { id: "progress" as Tab, label: "Progress", icon: BarChart3 },
          { id: "settings" as Tab, label: "Settings", icon: SettingsIcon },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsFocusOpen(false);
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 rounded-lg py-1 px-2 font-bold transition-all",
                isActive
                  ? mockupDark
                    ? "text-primary scale-105"
                    : "text-primary scale-105"
                  : "hover:opacity-100 opacity-60",
              )}
            >
              <Icon className={cn("h-4 w-4", isActive && "stroke-[2.5]")} />
              <span className="text-[8px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
