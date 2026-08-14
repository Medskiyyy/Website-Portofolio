"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Calendar as CalendarIcon,
  CheckSquare,
  BarChart3,
  Settings as SettingsIcon,
  Search,
  Flame,
  Clock,
  Play,
  Pause,
  X,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TopTab = "dashboard" | "calendar" | "tasks" | "progress" | "settings";
type Priority = "URGENT" | "MEPET" | "WASPADA" | "AMAN";

interface TaskItem {
  id: string;
  title: string;
  deadline: string;
  priority: Priority;
  category: string;
  description: string;
  completed: boolean;
}

interface ScheduleItem {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  status: "Belum Mulai" | "Selesai" | "Berlangsung";
}

interface HabitItem {
  id: string;
  name: string;
  target: string;
  streak: number;
  completed: boolean;
  icon: string;
}

const initialTasks: TaskItem[] = [
  {
    id: "1",
    title: "Selesaikan Room Database Migration",
    deadline: "14 Agu 2026, 23:59",
    priority: "URGENT",
    category: "Android",
    description: "Migrasi skema Room DB ke v3.4.0 dengan AutoMigrationSpec.",
    completed: false,
  },
  {
    id: "2",
    title: "Tugas Kuliah Sistem Informasi",
    deadline: "15 Agu 2026, 12:00",
    priority: "MEPET",
    category: "Kuliah",
    description: "Analisis kebutuhan sistem enterprise architecture.",
    completed: false,
  },
  {
    id: "3",
    title: "Review PR Neobrutalism UI Specs",
    deadline: "18 Agu 2026, 17:00",
    priority: "WASPADA",
    category: "Mother",
    description: "Validasi ketebalan border 3.5dp dan offset shadow 4dp.",
    completed: true,
  },
  {
    id: "4",
    title: "Perbarui Dokumentasi README & API",
    deadline: "20 Agu 2026, 20:00",
    priority: "AMAN",
    category: "Dokumentasi",
    description: "Dokumentasikan Foreground Service Live Notification Chronometer.",
    completed: false,
  },
];

const initialSchedules: ScheduleItem[] = [
  {
    id: "s1",
    title: "Sesi Belajar Jetpack Compose",
    startTime: "09:00",
    endTime: "11:00",
    status: "Berlangsung",
  },
  {
    id: "s2",
    title: "Review Habit & Target Streak",
    startTime: "14:30",
    endTime: "15:00",
    status: "Belum Mulai",
  },
];

const initialHabits: HabitItem[] = [
  { id: "h1", name: "Mandi Pagi & Sholat", target: "Setiap hari", streak: 12, completed: true, icon: "🌅" },
  { id: "h2", name: "Belajar Kotlin & Compose", target: "1j 30m / hari", streak: 7, completed: false, icon: "💻" },
  { id: "h3", name: "Olahraga / Workout", target: "20m / hari", streak: 5, completed: false, icon: "🏋️" },
  { id: "h4", name: "Baca Dokumentasi Tech", target: "15m / hari", streak: 4, completed: true, icon: "📖" },
];

export default function MotherAppPrototype() {
  const [activeTab, setActiveTab] = useState<TopTab>("dashboard");
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [schedules] = useState<ScheduleItem[]>(initialSchedules);
  const [habits, setHabits] = useState<HabitItem[]>(initialHabits);
  const [taskTab, setTaskTab] = useState<"ACTIVE" | "COMPLETED">("ACTIVE");
  const [progressSubTab, setProgressSubTab] = useState<"habits" | "study" | "stats" | "achieve">("habits");

  // Selected task detail dialog
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  // Calendar State
  const [selectedDay, setSelectedDay] = useState<number>(14);

  // Live Focus Timer State
  const [isFocusOpen, setIsFocusOpen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25m
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const habitFocusTitle = "Belajar Jetpack Compose";

  // Mockup internal theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Timer runner
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

  // Priority color mapper directly from Color.kt
  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case "URGENT":
        return "#FF6B6B"; // Coral Red
      case "MEPET":
        return "#FF9F43";  // Bright Orange
      case "WASPADA":
        return "#FECA57"; // Bright Gold
      case "AMAN":
        return "#1DD1A1";   // Mint Green
    }
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const displayedTasks = taskTab === "ACTIVE" ? activeTasks : completedTasks;

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col font-sans select-none overflow-hidden text-xs transition-colors duration-150",
        isDarkMode ? "bg-[#141210] text-[#F0EBDF]" : "bg-[#F5F1E8] text-[#1B1B1B]",
      )}
    >
      {/* 1. Android Top System Status Bar */}
      <div className="flex h-7 shrink-0 items-center justify-between px-4 pt-1 text-[10px] font-mono font-bold tracking-tight opacity-75">
        <span>09:41</span>
        <div className="flex items-center gap-1.5">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      {/* 2. Main Scrollable Container */}
      <div className="flex-1 overflow-y-auto px-3.5 pb-16 pt-1">
        {/* ========================================================= */}
        {/* ================= 1. TAB: DASHBOARD SCREEN ============= */}
        {/* ========================================================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-3.5">
            {/* Header: Greeting & Search Icon (DashboardScreen.kt §143) */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <h1 className="text-lg font-black tracking-tight leading-tight">Selamat Pagi, Ahmad! 👋</h1>
                <p className="text-[10px] font-bold opacity-60">Kamis, 14 Agustus 2026</p>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                title="Toggle Demo Dark Mode"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-[2.5px] shadow-[2px_2px_0px_#121212] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all",
                  isDarkMode
                    ? "border-[#F0EBDF] bg-[#201D18] text-amber-300"
                    : "border-[#1B1B1B] bg-white text-zinc-900",
                )}
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Streak Hero Card (DashboardScreen.kt §180) */}
            <div
              className={cn(
                "rounded-[14px] border-[3.5px] p-4 text-[#121212] shadow-[4px_4px_0px_#121212] transition-all bg-[#FEE140] border-[#1B1B1B]",
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block rounded-[6px] bg-[#121212] px-2 py-0.5 text-[9px] font-black tracking-wider text-[#FEE140] uppercase">
                    STREAK HARI INI
                  </span>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-mono text-4xl font-black leading-none tracking-tight">7</span>
                    <span className="text-sm font-black">HARI</span>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#121212] bg-[#121212]">
                  <Flame className="h-7 w-7 text-[#FEE140] fill-[#FEE140]" />
                </div>
              </div>
            </div>

            {/* Target Card (DashboardScreen.kt §249) */}
            <div
              className={cn(
                "rounded-[14px] border-[3.5px] p-3.5 shadow-[4px_4px_0px_#121212]",
                isDarkMode
                  ? "border-[#F0EBDF] bg-[#201D18] text-[#F0EBDF]"
                  : "border-[#1B1B1B] bg-white text-[#1B1B1B]",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px]">Target Hari Ini</span>
                <span className="font-mono text-[11px] font-black text-[#3E63DD] dark:text-[#7C93FF]">
                  1j 25m / 2j 00m
                </span>
              </div>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full border-2 border-[#1B1B1B] bg-zinc-200 dark:bg-zinc-800">
                <div className="h-full bg-[#3E63DD] dark:bg-[#7C93FF]" style={{ width: "70%" }} />
              </div>
            </div>

            {/* Deadlines Section (DashboardScreen.kt §323) */}
            <div className="space-y-2">
              <h2 className="font-black text-xs uppercase tracking-wider opacity-90">Deadline Terdekat</h2>
              <div className="space-y-2">
                {tasks.slice(0, 2).map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                    className="flex cursor-pointer items-center justify-between rounded-[14px] border-[3.5px] border-[#1B1B1B] p-3 text-[#121212] shadow-[4px_4px_0px_#121212] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                  >
                    <div className="pr-2 truncate">
                      <p className="font-black text-[11px] truncate leading-tight">{task.title}</p>
                      <p className="text-[9px] font-bold opacity-80 mt-0.5">{task.deadline}</p>
                    </div>
                    <span className="shrink-0 rounded-[8px] border-2 border-[#121212] bg-[#121212] px-2 py-0.5 text-[9px] font-black tracking-wider text-white uppercase">
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Jadwal Hari Ini (DashboardScreen.kt §368) */}
            <div className="space-y-2">
              <h2 className="font-black text-xs uppercase tracking-wider opacity-90">Jadwal Hari Ini</h2>
              <div className="space-y-2">
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className={cn(
                      "flex items-center gap-3 rounded-[14px] border-[3.5px] p-3 shadow-[4px_4px_0px_#121212]",
                      isDarkMode
                        ? "border-[#F0EBDF] bg-[#201D18] text-[#F0EBDF]"
                        : "border-[#1B1B1B] bg-white text-[#1B1B1B]",
                    )}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border-2 border-[#1B1B1B] bg-[#3E63DD] text-white">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex-1 truncate">
                      <p className="font-bold text-[11px] truncate">{schedule.title}</p>
                      <p className="text-[9px] opacity-70 font-mono">
                        {schedule.startTime} - {schedule.endTime}
                      </p>
                    </div>
                    <span className="text-[9px] font-bold opacity-75">{schedule.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions (DashboardScreen.kt §418) */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => {
                  setActiveTab("tasks");
                  setTaskTab("ACTIVE");
                }}
                className={cn(
                  "flex flex-col items-center justify-center rounded-[14px] border-[3.5px] p-2.5 text-center shadow-[3px_3px_0px_#121212] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all",
                  isDarkMode ? "border-[#F0EBDF] bg-[#201D18]" : "border-[#1B1B1B] bg-white",
                )}
              >
                <Plus className="h-4 w-4 mb-1" />
                <span className="font-bold text-[9px] leading-tight">+ Task</span>
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={cn(
                  "flex flex-col items-center justify-center rounded-[14px] border-[3.5px] p-2.5 text-center shadow-[3px_3px_0px_#121212] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all",
                  isDarkMode ? "border-[#F0EBDF] bg-[#201D18]" : "border-[#1B1B1B] bg-white",
                )}
              >
                <CalendarDays className="h-4 w-4 mb-1" />
                <span className="font-bold text-[9px] leading-tight">+ Jadwal</span>
              </button>
              <button
                onClick={() => setIsFocusOpen(true)}
                className="flex flex-col items-center justify-center rounded-[14px] border-[3.5px] border-[#1B1B1B] bg-[#3E63DD] p-2.5 text-center text-white shadow-[3px_3px_0px_#121212] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <Timer className="h-4 w-4 mb-1" />
                <span className="font-black text-[9px] leading-tight">Start Timer</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 2. TAB: CALENDAR SCREEN ============== */}
        {/* ========================================================= */}
        {activeTab === "calendar" && (
          <div className="space-y-3.5 pt-1">
            {/* Month Header (CalendarScreen.kt §297) */}
            <div className="flex items-center justify-between">
              <button className="rounded-lg p-1 hover:bg-black/10">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-center">
                <p className="font-black text-xs">Agustus 2026</p>
                <button
                  onClick={() => setSelectedDay(14)}
                  className="font-bold text-[10px] text-[#3E63DD] dark:text-[#7C93FF]"
                >
                  Hari Ini
                </button>
              </div>
              <button className="rounded-lg p-1 hover:bg-black/10">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Month Grid (CalendarScreen.kt §327) */}
            <div
              className={cn(
                "rounded-[14px] border-[3.5px] p-2.5 shadow-[4px_4px_0px_#121212]",
                isDarkMode ? "border-[#F0EBDF] bg-[#201D18]" : "border-[#1B1B1B] bg-white",
              )}
            >
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px] mb-1">
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
                  <span key={d} className="opacity-60">
                    {d}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isSelected = selectedDay === day;
                  const isToday = day === 14;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        "flex h-8 flex-col items-center justify-center rounded-lg font-mono text-[10px] font-bold transition-all",
                        isSelected
                          ? "border-2 border-[#1B1B1B] bg-[#3E63DD] text-white shadow-[2px_2px_0px_#121212]"
                          : isToday
                            ? "font-black text-[#3E63DD] underline"
                            : "hover:bg-black/5 dark:hover:bg-white/5",
                      )}
                    >
                      <span>{day}</span>
                      {[12, 14, 15, 18].includes(day) && (
                        <span className="h-1 w-2.5 rounded-full bg-orange-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Day Activities List */}
            <div className="space-y-2">
              <h3 className="font-black text-xs uppercase tracking-wider opacity-90">
                Aktivitas {selectedDay} Agustus 2026
              </h3>
              <div className="space-y-2">
                <div
                  className={cn(
                    "flex items-center justify-between rounded-[14px] border-[3.5px] p-3 shadow-[4px_4px_0px_#121212]",
                    isDarkMode ? "border-[#F0EBDF] bg-[#201D18]" : "border-[#1B1B1B] bg-white",
                  )}
                >
                  <div>
                    <p className="font-bold text-[11px]">Sesi Belajar Jetpack Compose</p>
                    <p className="text-[9px] opacity-70 font-mono">09:00 - 11:00 (Berlangsung)</p>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: getPriorityColor("URGENT") }}
                  className="flex items-center justify-between rounded-[14px] border-[3.5px] border-[#1B1B1B] p-3 text-[#121212] shadow-[4px_4px_0px_#121212]"
                >
                  <div>
                    <p className="font-black text-[11px]">Selesaikan Room Database Migration</p>
                    <p className="text-[9px] font-bold opacity-80">Deadline: 23:59</p>
                  </div>
                  <span className="rounded-[8px] border-2 border-[#121212] bg-[#121212] px-2 py-0.5 text-[8px] font-black text-white uppercase">
                    URGENT
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 3. TAB: TASKS SCREEN ================= */}
        {/* ========================================================= */}
        {activeTab === "tasks" && (
          <div className="space-y-3 pt-1">
            {/* TabRow: Aktif / Selesai (TasksScreen.kt §107) */}
            <div className="grid grid-cols-2 rounded-[10px] border-[2.5px] border-[#1B1B1B] p-0.5 bg-zinc-200 dark:bg-zinc-800">
              <button
                onClick={() => setTaskTab("ACTIVE")}
                className={cn(
                  "rounded-[8px] py-1.5 font-black text-xs transition-all",
                  taskTab === "ACTIVE"
                    ? "border-2 border-[#1B1B1B] bg-white text-[#1B1B1B] shadow-[2px_2px_0px_#121212]"
                    : "opacity-60",
                )}
              >
                Aktif ({activeTasks.length})
              </button>
              <button
                onClick={() => setTaskTab("COMPLETED")}
                className={cn(
                  "rounded-[8px] py-1.5 font-black text-xs transition-all",
                  taskTab === "COMPLETED"
                    ? "border-2 border-[#1B1B1B] bg-white text-[#1B1B1B] shadow-[2px_2px_0px_#121212]"
                    : "opacity-60",
                )}
              >
                Selesai ({completedTasks.length})
              </button>
            </div>

            {/* Task List (TasksScreen.kt §222) */}
            <div className="space-y-2.5">
              {displayedTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  style={{
                    backgroundColor: task.completed
                      ? isDarkMode
                        ? "#242424"
                        : "#E5E5E5"
                      : getPriorityColor(task.priority),
                  }}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-[14px] border-[3.5px] border-[#1B1B1B] p-3 text-[#121212] shadow-[4px_4px_0px_#121212] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all",
                    task.completed && "opacity-60 text-zinc-600 dark:text-zinc-400",
                  )}
                >
                  <div className="flex-1 pr-2 truncate">
                    <p className={cn("font-black text-[11px] truncate", task.completed && "line-through")}>
                      {task.title}
                    </p>
                    <p className="text-[9px] font-bold opacity-80 mt-0.5">{task.deadline}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 rounded-[8px] border-2 border-[#121212] bg-[#121212] px-2 py-0.5 text-[8px] font-black text-white uppercase">
                      {task.priority}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTask(task.id);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-[8px] border-2 border-[#121212] bg-white"
                    >
                      <Edit2 className="h-3 w-3 text-[#121212]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 4. TAB: PROGRESS SCREEN ============== */}
        {/* ========================================================= */}
        {activeTab === "progress" && (
          <div className="space-y-3 pt-1">
            {/* Scrollable Sub-tabs (ProgressScreen.kt §47) */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {[
                { id: "habits" as const, label: "Habit" },
                { id: "study" as const, label: "Study" },
                { id: "stats" as const, label: "Statistik" },
                { id: "achieve" as const, label: "Pencapaian" },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setProgressSubTab(sub.id)}
                  className={cn(
                    "shrink-0 rounded-[8px] border-2 px-3 py-1 text-[10px] font-black transition-all",
                    progressSubTab === sub.id
                      ? "border-[#1B1B1B] bg-[#3E63DD] text-white shadow-[2px_2px_0px_#121212]"
                      : isDarkMode
                        ? "border-[#F0EBDF] bg-[#201D18]"
                        : "border-[#1B1B1B] bg-white",
                  )}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Habit Sub-Tab Content */}
            {progressSubTab === "habits" && (
              <div className="space-y-2">
                <h3 className="font-black text-xs uppercase tracking-wider opacity-90">
                  Daftar Kebiasaan Harian
                </h3>
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    onClick={() => toggleHabit(habit.id)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-[14px] border-[3.5px] p-3 shadow-[4px_4px_0px_#121212] transition-all",
                      habit.completed
                        ? "border-[#1B1B1B] bg-[#1DD1A1] text-[#121212]"
                        : isDarkMode
                          ? "border-[#F0EBDF] bg-[#201D18]"
                          : "border-[#1B1B1B] bg-white",
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <span className="text-base">{habit.icon}</span>
                      <div>
                        <p className="font-black text-[11px] truncate">{habit.name}</p>
                        <p className="text-[9px] opacity-75 font-mono">{habit.target}</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-[8px] border-2 border-[#121212] bg-[#121212] px-2 py-0.5 font-mono text-[9px] font-black text-[#FEE140]">
                      🔥 {habit.streak} Hari
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Study / Stats Sub-Tab Content */}
            {progressSubTab !== "habits" && (
              <div className="space-y-3">
                <div
                  className={cn(
                    "rounded-[14px] border-[3.5px] p-3.5 shadow-[4px_4px_0px_#121212]",
                    isDarkMode ? "border-[#F0EBDF] bg-[#201D18]" : "border-[#1B1B1B] bg-white",
                  )}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-bold text-[11px]">Total Waktu Fokus</span>
                    <span className="font-mono text-xs font-black text-[#3E63DD]">18j 40m</span>
                  </div>
                  <div className="flex items-end justify-between gap-1.5 h-20 pt-2 border-b-2 border-black/20 pb-1">
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
                            "w-full rounded-t border-2 border-[#121212] transition-all",
                            idx === 3 ? "bg-[#3E63DD]" : "bg-[#FECA57]",
                          )}
                          style={{ height: item.h }}
                        />
                        <span className="text-[8px] font-bold font-mono opacity-70">{item.d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div
                    className={cn(
                      "rounded-[14px] border-[3.5px] p-3 shadow-[3px_3px_0px_#121212] bg-[#3E63DD] text-white border-[#1B1B1B]",
                    )}
                  >
                    <p className="text-[9px] font-black uppercase opacity-90">Total Sesi</p>
                    <p className="font-mono text-xl font-black mt-0.5">34 Sesi</p>
                  </div>
                  <div
                    className={cn(
                      "rounded-[14px] border-[3.5px] p-3 shadow-[3px_3px_0px_#121212] bg-[#FEE140] text-[#121212] border-[#1B1B1B]",
                    )}
                  >
                    <p className="text-[9px] font-black uppercase opacity-90">Streak Terbaik</p>
                    <p className="font-mono text-xl font-black mt-0.5">14 Hari</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= 5. TAB: SETTINGS SCREEN ============== */}
        {/* ========================================================= */}
        {activeTab === "settings" && (
          <div className="space-y-3 pt-1">
            <h2 className="font-black text-sm">Pengaturan</h2>
            <div
              className={cn(
                "rounded-[14px] border-[3.5px] divide-y-[2.5px] shadow-[4px_4px_0px_#121212]",
                isDarkMode
                  ? "border-[#F0EBDF] bg-[#201D18] divide-[#F0EBDF]/20"
                  : "border-[#1B1B1B] bg-white divide-[#1B1B1B]/20",
              )}
            >
              <div className="flex items-center justify-between p-3.5">
                <div>
                  <p className="font-bold text-[11px]">Tema Tampilan</p>
                  <p className="text-[9px] opacity-70">Mode Gelap / Terang Neobrutalism</p>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="rounded-[8px] border-2 border-[#1B1B1B] bg-[#3E63DD] px-3 py-1 font-black text-white text-[10px] shadow-[2px_2px_0px_#121212]"
                >
                  {isDarkMode ? "Dark" : "Light"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5">
                <div>
                  <p className="font-bold text-[11px]">Foreground Timer Service</p>
                  <p className="text-[9px] opacity-70">Notifikasi & Live Chronometer</p>
                </div>
                <span className="rounded-[6px] border-2 border-[#121212] bg-[#1DD1A1] px-2 py-0.5 text-[8px] font-black text-[#121212] uppercase">
                  AKTIF
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5">
                <div>
                  <p className="font-bold text-[11px]">Versi Aplikasi</p>
                  <p className="text-[9px] font-mono opacity-70">Mother v3.4.0 (Jetpack Compose)</p>
                </div>
                <span className="font-mono text-[10px] font-bold">Release</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= FOCUS MODE OVERLAY (FocusModeScreen.kt) ================= */}
      {isFocusOpen && (
        <div className="absolute inset-0 z-40 flex flex-col justify-between bg-[#141210] p-5 text-[#F0EBDF] animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="rounded-[6px] border-2 border-[#F0EBDF] bg-[#3E63DD] px-2 py-0.5 font-mono text-[9px] font-black uppercase text-white shadow-[2px_2px_0px_#F0EBDF]">
              ⚡ FOREGROUND SERVICE
            </span>
            <button
              onClick={() => setIsFocusOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#F0EBDF] bg-[#201D18]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="my-auto text-center space-y-3">
            <h3 className="text-sm font-black text-[#FECA57] uppercase tracking-wider">
              {habitFocusTitle}
            </h3>
            <div className="font-mono text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_24px_rgba(62,99,221,0.6)]">
              {formatTimer(timerSeconds)}
            </div>
            <p className="text-[9px] font-mono text-zinc-400">
              {isTimerRunning ? "Sesi Berjalan di Background..." : "Sesi Dijeda"}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex-1 flex h-11 items-center justify-center gap-1.5 rounded-[10px] border-2 border-white bg-[#3E63DD] font-black text-white shadow-[3px_3px_0px_#FFFFFF] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {isTimerRunning ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white" />}
                <span>{isTimerRunning ? "Jeda" : "Mulai"}</span>
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(1500);
                  setIsFocusOpen(false);
                }}
                className="flex-1 flex h-11 items-center justify-center rounded-[10px] border-2 border-white bg-[#FF6B6B] font-black text-[#121212] shadow-[3px_3px_0px_#FFFFFF] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                Selesai
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

      {/* ================= ACTIVE TIMER BANNER (ActiveTimerBanner.kt) ================= */}
      {isTimerRunning && !isFocusOpen && (
        <div
          onClick={() => setIsFocusOpen(true)}
          className="absolute bottom-14 left-3 right-3 z-30 flex cursor-pointer items-center justify-between rounded-[10px] border-2 border-[#121212] bg-[#3E63DD] px-3 py-2 text-white shadow-[3px_3px_0px_#121212] active:scale-[0.98]"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="font-black text-[9px] truncate">Timer: {habitFocusTitle}</span>
          </div>
          <span className="font-mono text-[10px] font-black">{formatTimer(timerSeconds)}</span>
        </div>
      )}

      {/* ================= DETAIL TASK ALERT DIALOG (TasksScreen.kt §275) ================= */}
      {selectedTask && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-in fade-in duration-150">
          <div
            className={cn(
              "w-full rounded-[14px] border-[3.5px] p-4 shadow-[5px_5px_0px_#121212]",
              isDarkMode
                ? "border-[#F0EBDF] bg-[#201D18] text-[#F0EBDF]"
                : "border-[#1B1B1B] bg-white text-[#1B1B1B]",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-black text-sm">{selectedTask.title}</h3>
              <span
                style={{ backgroundColor: getPriorityColor(selectedTask.priority) }}
                className="shrink-0 rounded-[8px] border-2 border-[#121212] px-2 py-0.5 text-[8px] font-black text-[#121212] uppercase"
              >
                {selectedTask.priority}
              </span>
            </div>

            <div className="mt-3 space-y-1.5 text-[10px]">
              <p className="font-bold text-[#3E63DD]">Deskripsi:</p>
              <p className="opacity-80">{selectedTask.description}</p>
              <p className="font-mono font-bold mt-2">Deadline: {selectedTask.deadline}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  toggleTask(selectedTask.id);
                  setSelectedTask(null);
                }}
                className="flex-1 rounded-[10px] border-2 border-[#1B1B1B] bg-[#3E63DD] py-1.5 font-black text-white text-[10px] shadow-[2px_2px_0px_#121212]"
              >
                {selectedTask.completed ? "Buka Kembali" : "Selesaikan Tugas"}
              </button>
              <button
                onClick={() => setSelectedTask(null)}
                className="rounded-[10px] border-2 border-[#1B1B1B] px-3 py-1.5 font-bold text-[10px]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. BOTTOM NAVIGATION BAR (Destinations.kt) ================= */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-20 flex h-13 items-center justify-around border-t-[2.5px] px-1",
          isDarkMode
            ? "border-[#F0EBDF]/30 bg-[#141210] text-[#F0EBDF]"
            : "border-[#1B1B1B] bg-[#F5F1E8] text-[#1B1B1B]",
        )}
      >
        {[
          { id: "dashboard" as TopTab, label: "Home", icon: Home },
          { id: "calendar" as TopTab, label: "Calendar", icon: CalendarIcon },
          { id: "tasks" as TopTab, label: "Tasks", icon: CheckSquare },
          { id: "progress" as TopTab, label: "Progress", icon: BarChart3 },
          { id: "settings" as TopTab, label: "Settings", icon: SettingsIcon },
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
                "flex flex-col items-center justify-center gap-0.5 rounded-lg py-1 px-2 font-black transition-all",
                isActive
                  ? "text-[#3E63DD] dark:text-[#7C93FF] scale-110"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              <Icon className={cn("h-4 w-4", isActive && "stroke-[3]")} />
              <span className="text-[8px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
