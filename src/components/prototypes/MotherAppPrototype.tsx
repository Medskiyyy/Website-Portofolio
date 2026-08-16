"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. EXACT MATERIAL 3 SVG VECTOR ICONS (Extracted from Android Jetpack Compose)
// ============================================================================

export const HomeIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

export const CalendarMonthIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
  </svg>
);

export const TaskAltIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M22 5.18L10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10L22 5.18zM19.79 10.22C19.92 10.79 20 11.39 20 12c0 4.41-3.59 8-8 8s-8-3.59-8-8 3.59-8 8-8c1.66 0 3.14.51 4.38 1.39l1.44-1.44C16.1 2.67 14.13 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.19-.22-2.33-.6-3.39l-1.61 1.61z" />
  </svg>
);

export const InsightsIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M21 18.01a3 3 0 0 0-3-3c-.45 0-.87.1-1.25.28l-3.04-3.05a2.95 2.95 0 0 0 0-2.48l3.04-3.05c.38.18.8.29 1.25.29a3 3 0 1 0-3-3c0 .45.1.87.29 1.25l-3.05 3.04a2.95 2.95 0 0 0-2.48 0L6.71 5.25A2.99 2.99 0 0 0 7 4a3 3 0 1 0-3 3c.45 0 .87-.1 1.25-.28l3.04 3.05a2.95 2.95 0 0 0 0 2.48l-3.04 3.05A2.99 2.99 0 0 0 4 15a3 3 0 1 0 3 3c0-.45-.1-.87-.29-1.25l3.05-3.04a2.95 2.95 0 0 0 2.48 0l3.05 3.04c-.19.38-.29.8-.29 1.25a3 3 0 1 0 6 0z" />
  </svg>
);

export const SettingsIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

export const WhatshotIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
  </svg>
);

export const SearchIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

export const AddIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

export const ScheduleIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
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

export const LockIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

export const DeleteIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

export const CloseIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export const CheckIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

export const EditIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

export const TrophyIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1c1.83-.43 3.24-1.86 3.61-3.96C19.08 11.63 21 9.55 21 7V5h-2zm-14 3V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
  </svg>
);

export const RepeatIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
  </svg>
);

export const SchoolIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
  </svg>
);

export const AddTaskIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M22 5.18L10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10L22 5.18zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.57 0 3.04.46 4.28 1.25l1.45-1.45C16.1 2.67 14.13 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10c1.73 0 3.36-.44 4.79-1.22l-1.52-1.52C14.28 19.67 13.17 20 12 20z" />
  </svg>
);

export const EventIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm3 18H5V8h14v11z" />
  </svg>
);

export const ArrowBackIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);

export const ArrowForwardIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

export const PauseCircleIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
  </svg>
);

export const PlayCircleIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
  </svg>
);

export const ChevronRightIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

export const FavoriteIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const AlarmIcon = ({ className = "w-6 h-6", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9 0 4.97 4.02 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
  </svg>
);

// ============================================================================
// 2. DATA MODELS & TYPES
// ============================================================================

export type MainTab = "dashboard" | "calendar" | "tasks" | "progress" | "settings";
export type ProgressSubTab = "habits" | "study" | "stats" | "heatmap" | "achieve";
export type PriorityLevel = "URGENT" | "MEPET" | "WASPADA" | "AMAN";

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: PriorityLevel;
  category: "Kuliah" | "Belajar" | "Gym" | "Ibadah" | "Deadline";
  completed: boolean;
  dueDate: string; // YYYY-MM-DD
}

export interface ScheduleItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  status: "Belum Dimulai" | "Sedang Berjalan" | "Selesai";
  category: string;
}

export interface HabitItem {
  id: string;
  name: string;
  type: "routine" | "timer";
  targetMinute: number; // 0 for routine
  todayMinute: number;
  subtitle: string;
  streak: number;
  bestStreak: number;
  completed: boolean;
  category: string;
}

export interface StudySessionItem {
  id: string;
  habitTitle: string;
  date: string; // "Senin, 17 Agustus 2026"
  timeRange: string; // "13:15 - 13:15 (1m)"
  durationMinutes: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  unlocked: boolean;
}

// ============================================================================
// 3. PRIORITY COLOR TOKEN RESOLVER (NeoPriorityBadge)
// ============================================================================

const getPriorityDetails = (priority: PriorityLevel) => {
  switch (priority) {
    case "URGENT":
      return {
        bg: "bg-[#FF6B6B]",
        border: "border-[#121212]",
        text: "text-[#121212]",
        label: "URGENT",
      };
    case "MEPET":
      return {
        bg: "bg-[#FF9F43]",
        border: "border-[#121212]",
        text: "text-[#121212]",
        label: "MEPET",
      };
    case "WASPADA":
      return {
        bg: "bg-[#FECA57]",
        border: "border-[#121212]",
        text: "text-[#121212]",
        label: "WASPADA",
      };
    case "AMAN":
    default:
      return {
        bg: "bg-[#1DD1A1]",
        border: "border-[#121212]",
        text: "text-[#121212]",
        label: "AMAN",
      };
  }
};

// ============================================================================
// 4. MAIN PROTOTYPE COMPONENT
// ============================================================================

export default function MotherAppPrototype() {
  // Navigation & Screen States
  const [activeTab, setActiveTab] = useState<MainTab>("dashboard");
  const [taskSubTab, setTaskSubTab] = useState<"active" | "completed">("active");
  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  const [progressSubTab, setProgressSubTab] = useState<ProgressSubTab>("habits");
  const [statsPeriod, setStatsPeriod] = useState<"Hari Ini" | "Minggu Ini" | "Bulan Ini" | "Tahun Ini">("Minggu Ini");
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("light");

  // Selected Day on Calendar
  const [selectedDay, setSelectedDay] = useState<number>(17);

  // Modals and Sheets
  const [isMotherGreetingOpen, setIsMotherGreetingOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isCreateScheduleOpen, setIsCreateScheduleOpen] = useState(false);
  const [selectedTaskDetail, setSelectedTaskDetail] = useState<TaskItem | null>(null);
  const [isBackupConfirmOpen, setIsBackupConfirmOpen] = useState(false);

  // Snackbar Toast
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const snackbarTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (snackbarTimerRef.current) clearTimeout(snackbarTimerRef.current);
    setSnackbarMessage(msg);
    snackbarTimerRef.current = setTimeout(() => {
      setSnackbarMessage(null);
    }, 3000);
  };

  // ==========================================================================
  // REAL APP STATE & DATA FIXTURES (Matching Jetpack Compose ViewModels)
  // ==========================================================================

  // 1. Tasks
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "t1",
      title: "Tugas Akhir Bab 3 & Skripsi",
      description: "Selesaikan pembahasan arsitektur Room database dan Jetpack Compose UI",
      deadline: "Senin, 17 Agustus 2026 • 23:59",
      priority: "URGENT",
      category: "Kuliah",
      completed: false,
      dueDate: "2026-08-17",
    },
    {
      id: "t2",
      title: "Review Materi Mobile Programming",
      description: "Pelajari StateFlow, Coroutines, dan Neobrutalism shadow calculations",
      deadline: "Selasa, 18 Agustus 2026 • 15:00",
      priority: "MEPET",
      category: "Belajar",
      completed: false,
      dueDate: "2026-08-18",
    },
    {
      id: "t3",
      title: "Submit Laporan Praktikum Jaringan",
      description: "Upload file PDF konfigurasi routing mikrotik ke portal akademik",
      deadline: "Kamis, 20 Agustus 2026 • 12:00",
      priority: "WASPADA",
      category: "Kuliah",
      completed: false,
      dueDate: "2026-08-20",
    },
    {
      id: "t4",
      title: "Persiapan Presentasi Proyek USB",
      description: "Siapkan slide mockup figma dan demo interactive video",
      deadline: "Sabtu, 15 Agustus 2026 • Selesai",
      priority: "AMAN",
      category: "Kuliah",
      completed: true,
      dueDate: "2026-08-15",
    },
  ]);

  // 2. Schedules
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: "s1",
      title: "Kuliah Pemrograman Mobile",
      date: "2026-08-17",
      startTime: "08:00",
      endTime: "10:30",
      status: "Selesai",
      category: "Kuliah",
    },
    {
      id: "s2",
      title: "Sesi Belajar Algoritma & Struktur Data",
      date: "2026-08-17",
      startTime: "13:00",
      endTime: "15:00",
      status: "Sedang Berjalan",
      category: "Belajar",
    },
    {
      id: "s3",
      title: "Latihan Rutin Gym & Cardio",
      date: "2026-08-17",
      startTime: "16:30",
      endTime: "18:00",
      status: "Belum Dimulai",
      category: "Gym",
    },
  ]);

  // 3. Habits
  const [habits, setHabits] = useState<HabitItem[]>([
    {
      id: "h1",
      name: "Bangun Pagi & Sholat Subuh",
      type: "routine",
      targetMinute: 0,
      todayMinute: 1,
      subtitle: "Pengingat Rutinitas",
      streak: 5,
      bestStreak: 14,
      completed: true,
      category: "Ibadah",
    },
    {
      id: "h2",
      name: "Belajar Coding & Android Studio",
      type: "timer",
      targetMinute: 120, // 2 hours
      todayMinute: 45,
      subtitle: "Sedang berjalan",
      streak: 5,
      bestStreak: 12,
      completed: false,
      category: "Belajar",
    },
    {
      id: "h3",
      name: "Membaca Buku Pemrograman",
      type: "timer",
      targetMinute: 30,
      todayMinute: 0,
      subtitle: "Belum mulai",
      streak: 3,
      bestStreak: 7,
      completed: false,
      category: "Belajar",
    },
    {
      id: "h4",
      name: "Minum Air 2 Liter",
      type: "routine",
      targetMinute: 0,
      todayMinute: 0,
      subtitle: "Pengingat Rutinitas",
      streak: 4,
      bestStreak: 10,
      completed: false,
      category: "Gym",
    },
  ]);

  // 4. Study Sessions History
  const [studySessions, setStudySessions] = useState<StudySessionItem[]>([
    {
      id: "ss1",
      habitTitle: "Belajar Coding & Android Studio",
      date: "Senin, 17 Agustus 2026",
      timeRange: "13:00 - 13:45 (45m)",
      durationMinutes: 45,
    },
    {
      id: "ss2",
      habitTitle: "Membaca Buku Pemrograman",
      date: "Minggu, 16 Agustus 2026",
      timeRange: "20:00 - 20:30 (30m)",
      durationMinutes: 30,
    },
    {
      id: "ss3",
      habitTitle: "Belajar Coding & Android Studio",
      date: "Minggu, 16 Agustus 2026",
      timeRange: "14:15 - 15:15 (1j 0m)",
      durationMinutes: 60,
    },
    {
      id: "ss4",
      habitTitle: "Belajar Coding & Android Studio",
      date: "Sabtu, 15 Agustus 2026",
      timeRange: "09:00 - 10:15 (1j 15m)",
      durationMinutes: 75,
    },
  ]);

  // 5. Achievements
  const [achievements, setAchievements] = useState<AchievementItem[]>([
    {
      id: "ach-streak-7",
      title: "Streak 7 Hari",
      description: "Pertahankan streak belajar selama 7 hari berturut-turut",
      current: 5,
      target: 7,
      unlocked: false,
    },
    {
      id: "ach-study-10",
      title: "Belajar 10 Jam",
      description: "Kumpulkan total waktu belajar 10 jam di aplikasi",
      current: 10,
      target: 10,
      unlocked: true,
    },
    {
      id: "ach-streak-30",
      title: "Streak 30 Hari",
      description: "Konsistensi tanpa henti selama 30 hari penuh",
      current: 5,
      target: 30,
      unlocked: false,
    },
    {
      id: "ach-study-100",
      title: "Belajar 100 Jam",
      description: "Mastery tingkat tinggi dengan 100 jam belajar",
      current: 18,
      target: 100,
      unlocked: false,
    },
    {
      id: "ach-streak-100",
      title: "Streak 100 Hari",
      description: "Dedikasi legendaris 100 hari streak tanpa putus",
      current: 5,
      target: 100,
      unlocked: false,
    },
    {
      id: "ach-task-100",
      title: "100 Task Selesai",
      description: "Selesaikan 100 tugas akademik atau pekerjaan",
      current: 1,
      target: 100,
      unlocked: false,
    },
    {
      id: "ach-task-500",
      title: "500 Task Selesai",
      description: "Selesaikan 500 tugas produktivitas",
      current: 1,
      target: 500,
      unlocked: false,
    },
    {
      id: "ach-activity-100",
      title: "100 Activity Selesai",
      description: "Hadir dan tuntaskan 100 jadwal kegiatan",
      current: 14,
      target: 100,
      unlocked: false,
    },
  ]);

  // Form Inputs for New Task
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<PriorityLevel>("URGENT");
  const [newTaskCategory, setNewTaskCategory] = useState<"Kuliah" | "Belajar" | "Gym" | "Ibadah">("Kuliah");

  // Form Inputs for New Schedule
  const [newScheduleTitle, setNewScheduleTitle] = useState("");
  const [newScheduleStart, setNewScheduleStart] = useState("14:00");
  const [newScheduleEnd, setNewScheduleEnd] = useState("15:30");

  // ==========================================================================
  // 5. LIVE TIMER & CHRONOMETER SERVICE (Foreground Service Simulation)
  // ==========================================================================

  const [timerPhase, setTimerPhase] = useState<"IDLE" | "RUNNING" | "PAUSED">("IDLE");
  const [timerHabitTitle, setTimerHabitTitle] = useState("Belajar Coding & Android Studio");
  const [timerTargetMinute, setTimerTargetMinute] = useState(120);
  const [timerElapsedSeconds, setTimerElapsedSeconds] = useState(2700); // 45 minutes
  const [isFocusModeFullscreen, setIsFocusModeFullscreen] = useState(false);

  useEffect(() => {
    if (timerPhase !== "RUNNING") return;
    const interval = setInterval(() => {
      setTimerElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerPhase]);

  const formatChronometer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const min = Math.floor((totalSec % 3600) / 60);
    const sec = totalSec % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    }
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleStartTimer = (habitName?: string, targetMin?: number) => {
    if (habitName) setTimerHabitTitle(habitName);
    if (targetMin) setTimerTargetMinute(targetMin);
    setTimerPhase("RUNNING");
    setIsFocusModeFullscreen(true);
  };

  const handlePauseTimer = () => {
    setTimerPhase("PAUSED");
  };

  const handleResumeTimer = () => {
    setTimerPhase("RUNNING");
  };

  const handleStopTimer = () => {
    const elapsedMin = Math.max(1, Math.floor(timerElapsedSeconds / 60));
    setTimerPhase("IDLE");
    setIsFocusModeFullscreen(false);

    // Append study session
    const newSession: StudySessionItem = {
      id: `ss-${Date.now()}`,
      habitTitle: timerHabitTitle,
      date: "Senin, 17 Agustus 2026",
      timeRange: `13:00 - 13:${45 + elapsedMin} (${elapsedMin}m)`,
      durationMinutes: elapsedMin,
    };
    setStudySessions((prev) => [newSession, ...prev]);

    // Update habit minutes
    setHabits((prev) =>
      prev.map((h) =>
        h.name === timerHabitTitle ? { ...h, todayMinute: h.todayMinute + elapsedMin } : h,
      ),
    );

    showToast(`Sesi belajar (${elapsedMin}m) berhasil disimpan!`);
  };

  // ==========================================================================
  // 6. DYNAMIC MOTHER GREETING GENERATOR
  // ==========================================================================

  const motherGreetingText = useMemo(() => {
    const urgentTasks = tasks.filter((t) => !t.completed && t.priority === "URGENT");
    if (urgentTasks.length > 0) {
      return `Semangat pagi! Hari ini kamu punya tugas mendesak "${urgentTasks[0].title}". Selesaikan yang ini dulu ya nak, biar pikiranmu tenang ❤️`;
    }
    const streak = habits.find((h) => h.name.includes("Coding"))?.streak || 5;
    if (streak >= 3) {
      return `Wah, hebat sekali! Streak belajarmu sudah ${streak} hari berturut-turut. Pertahankan konsistensimu hari ini ya anakku sayang ❤️`;
    }
    return "Semangat beraktivitas hari ini! Jangan lupa jaga kesehatan dan luangkan waktu untuk istirahat yang cukup ya ❤️";
  }, [tasks, habits]);

  // Dark Mode calculation
  const isDark = themeMode === "dark";

  // Filtered Tasks
  const activeTasksList = useMemo(
    () =>
      tasks.filter(
        (t) =>
          !t.completed &&
          (taskSearchQuery === "" || t.title.toLowerCase().includes(taskSearchQuery.toLowerCase())),
      ),
    [tasks, taskSearchQuery],
  );

  const completedTasksList = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.completed &&
          (taskSearchQuery === "" || t.title.toLowerCase().includes(taskSearchQuery.toLowerCase())),
      ),
    [tasks, taskSearchQuery],
  );

  // Total Study Minutes Calculation
  const totalStudyMinutes = useMemo(
    () => studySessions.reduce((acc, curr) => acc + curr.durationMinutes, 0),
    [studySessions],
  );

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col font-sans select-none overflow-hidden text-xs transition-colors duration-150",
        isDark ? "bg-[#141210] text-[#F0EBDF]" : "bg-[#F5F1E8] text-[#1B1B1B]",
      )}
    >
      {/* ================= 1. ANDROID SYSTEM STATUS BAR ================= */}
      <div
        className={cn(
          "flex h-7 shrink-0 items-center justify-between px-4 pt-1 text-[11px] font-black tracking-tight",
          isDark ? "text-[#F0EBDF]" : "text-[#1B1B1B]",
        )}
      >
        <span className="font-mono">06:36</span>
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <span className="font-bold">LTE</span>
          <span>📶</span>
          <span
            className={cn(
              "rounded-full px-1 py-0.2 border-[1.5px] border-[#121212] font-black",
              isDark ? "bg-[#FFD60A] text-[#121212]" : "bg-[#FFD60A] text-[#121212]",
            )}
          >
            100%
          </span>
        </div>
      </div>

      {/* ================= 2. MAIN SCROLLABLE BODY ================= */}
      <div className="flex-1 overflow-y-auto px-3.5 pb-24 pt-1.5 scrollbar-none">
        {/* ========================================================= */}
        {/* ================= TAB 1: DASHBOARD ===================== */}
        {/* ========================================================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-4">
            {/* Header: Greeting & Universal Search */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <h1
                  className={cn(
                    "text-2xl font-black tracking-tight leading-none",
                    isDark ? "text-[#F0EBDF]" : "text-[#1B1B1B]",
                  )}
                >
                  Selamat Pagi
                </h1>
                <p
                  className={cn(
                    "text-xs font-bold mt-1",
                    isDark ? "text-[#C8C2B2]" : "text-[#4A463C]",
                  )}
                >
                  Senin, 17 Agustus 2026
                </p>
              </div>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-[#121212] bg-white dark:bg-[#201D18] text-[#121212] dark:text-[#F0EBDF] shadow-[3px_3px_0px_#121212] dark:shadow-[3px_3px_0px_#F0F0F0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                title="Pencarian Global"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Mother Greeting Trigger Chip */}
            <button
              onClick={() => setIsMotherGreetingOpen(true)}
              className="flex w-full items-center justify-between rounded-[10px] border-[2.5px] border-[#121212] bg-[#FFD60A] px-3 py-2 text-[#121212] shadow-[3px_3px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-left"
            >
              <div className="flex items-center gap-2">
                <FavoriteIcon className="h-4 w-4 text-[#121212]" />
                <span className="font-black text-xs">Pesan dari Ibu ❤️</span>
              </div>
              <span className="text-[10px] font-bold underline">Baca Pesan</span>
            </button>

            {/* Streak Hero Card (StreakCard.kt) */}
            <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-[#FEE140] p-4 text-[#121212] shadow-[4px_4px_0px_#121212]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block rounded-[8px] border-[2px] border-[#121212] bg-[#121212] px-2.5 py-0.5 text-[10px] font-black tracking-wider text-[#FEE140] uppercase">
                    STREAK BELAJAR
                  </span>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="font-mono text-4xl font-black leading-none tracking-tight">5</span>
                    <span className="text-base font-black tracking-wide">HARI</span>
                  </div>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#121212] bg-[#121212] shadow-[2px_2px_0px_#121212]">
                  <WhatshotIcon className="h-8 w-8 text-[#FEE140]" />
                </div>
              </div>
            </div>

            {/* Daily Target Card (TargetCard.kt) */}
            <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#121212] dark:shadow-[4px_4px_0px_#F0F0F0]">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-[#121212] dark:text-[#F0EBDF]">
                  Target Hari Ini
                </span>
                <span className="font-mono text-xs font-black text-[#FFD60A]">
                  {Math.floor(timerElapsedSeconds / 60)}m / 2j
                </span>
              </div>
              <div className="mt-2.5 h-[14px] w-full overflow-hidden rounded-[7px] border-[2px] border-[#121212] bg-[#EFEAD8] dark:bg-[#2C2C32]">
                <div
                  className="h-full bg-[#FFD60A] transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.round(((timerElapsedSeconds / 60) / 120) * 100))}%`,
                  }}
                />
              </div>
            </div>

            {/* Section: Deadline Terdekat */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-[#121212] dark:text-[#F0EBDF] tracking-tight">
                  Deadline Terdekat
                </h2>
                <button
                  onClick={() => {
                    setActiveTab("tasks");
                    setTaskSubTab("active");
                  }}
                  className="text-[11px] font-bold text-[#FFD60A] underline"
                >
                  Lihat Semua
                </button>
              </div>

              {tasks.filter((t) => !t.completed).length === 0 ? (
                <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 text-center shadow-[4px_4px_0px_#121212]">
                  <p className="text-xs font-bold text-[#4A463C] dark:text-[#C8C2B2]">
                    Belum ada deadline aktif.
                  </p>
                </div>
              ) : (
                tasks
                  .filter((t) => !t.completed)
                  .slice(0, 3)
                  .map((task) => {
                    const badge = getPriorityDetails(task.priority);
                    return (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTaskDetail(task)}
                        className={cn(
                          "cursor-pointer flex items-center justify-between rounded-[14px] border-[3.5px] border-[#121212] p-3.5 text-[#121212] shadow-[4px_4px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all",
                          badge.bg,
                        )}
                      >
                        <div className="pr-2 flex-1">
                          <p className="font-black text-xs leading-snug line-clamp-1">{task.title}</p>
                          <p className="text-[10px] font-bold opacity-90 mt-0.5">{task.deadline}</p>
                        </div>
                        <span className="shrink-0 rounded-[8px] border-[2px] border-[#121212] bg-white/30 px-2.5 py-1 text-[11px] font-black uppercase text-[#121212]">
                          {task.priority}
                        </span>
                      </div>
                    );
                  })
              )}
            </div>

            {/* Section: Jadwal Hari Ini */}
            <div className="space-y-2.5">
              <h2 className="text-sm font-black text-[#121212] dark:text-[#F0EBDF] tracking-tight">
                Jadwal Hari Ini
              </h2>
              {schedules.map((sch) => (
                <div
                  key={sch.id}
                  className="flex items-center gap-3 rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-3 text-[#121212] dark:text-[#F0EBDF] shadow-[4px_4px_0px_#121212] dark:shadow-[4px_4px_0px_#F0F0F0]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border-[2px] border-[#121212] bg-[#FFD60A] text-[#121212]">
                    <ScheduleIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-xs line-clamp-1">{sch.title}</p>
                    <p className="text-[10px] font-mono font-bold text-[#4A463C] dark:text-[#C8C2B2] mt-0.5">
                      {sch.startTime} - {sch.endTime}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-[6px] border-[1.5px] border-[#121212] px-2 py-0.5 text-[9px] font-black uppercase",
                      sch.status === "Selesai"
                        ? "bg-[#1DD1A1] text-[#121212]"
                        : sch.status === "Sedang Berjalan"
                          ? "bg-[#FFD60A] text-[#121212]"
                          : "bg-[#EFEAD8] text-[#121212]",
                    )}
                  >
                    {sch.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Actions (3 Buttons) */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <button
                onClick={() => setIsCreateTaskOpen(true)}
                className="flex flex-col items-center justify-center rounded-[10px] border-[2.5px] border-[#121212] bg-white dark:bg-[#201D18] p-3 text-center text-[#121212] dark:text-[#F0EBDF] shadow-[3px_3px_0px_#121212] dark:shadow-[3px_3px_0px_#F0F0F0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <AddIcon className="h-5 w-5 mb-1" />
                <span className="font-black text-[10px] leading-tight">+ Task</span>
              </button>
              <button
                onClick={() => setIsCreateScheduleOpen(true)}
                className="flex flex-col items-center justify-center rounded-[10px] border-[2.5px] border-[#121212] bg-white dark:bg-[#201D18] p-3 text-center text-[#121212] dark:text-[#F0EBDF] shadow-[3px_3px_0px_#121212] dark:shadow-[3px_3px_0px_#F0F0F0] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <EventNoteIcon className="h-5 w-5 mb-1" />
                <span className="font-black text-[10px] leading-tight">+ Jadwal</span>
              </button>
              <button
                onClick={() => handleStartTimer()}
                className="flex flex-col items-center justify-center rounded-[10px] border-[2.5px] border-[#121212] bg-[#FFD60A] p-3 text-center text-[#121212] shadow-[3px_3px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <TimerIcon className="h-5 w-5 mb-1 text-[#121212]" />
                <span className="font-black text-[10px] leading-tight">Start Timer</span>
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
                <button
                  onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
                  className="p-1 text-[#121212] dark:text-[#F0EBDF] hover:opacity-75"
                >
                  <ArrowBackIcon className="h-5 w-5" />
                </button>
                <h2 className="text-base font-black text-[#121212] dark:text-[#F0EBDF]">
                  Agustus 2026
                </h2>
                <button
                  onClick={() => setSelectedDay(Math.min(31, selectedDay + 1))}
                  className="p-1 text-[#121212] dark:text-[#F0EBDF] hover:opacity-75"
                >
                  <ArrowForwardIcon className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={() => setSelectedDay(17)}
                className="text-xs font-black text-[#FFD60A] underline mt-0.5"
              >
                Hari Ini (17 Ags)
              </button>
            </div>

            {/* Calendar Matrix (Monday-First Grid) */}
            <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-3.5 shadow-[4px_4px_0px_#121212] dark:shadow-[4px_4px_0px_#F0F0F0]">
              <div className="grid grid-cols-7 gap-1 text-center font-black text-[10px] mb-2 text-[#4A463C] dark:text-[#C8C2B2]">
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* Blank days before August 1 (August 1, 2026 starts on Saturday = index 5) */}
                <div />
                <div />
                <div />
                <div />
                <div />
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isSelected = selectedDay === day;
                  const isToday = day === 17;
                  const hasActivity = [5, 6, 7, 11, 12, 14, 15, 16, 17, 18, 20].includes(day);

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        "flex h-9 flex-col items-center justify-center rounded-[8px] font-mono text-[11px] font-black transition-all relative",
                        isSelected
                          ? "border-[2px] border-[#121212] bg-[#FFD60A] text-[#121212] shadow-[2px_2px_0px_#121212]"
                          : isToday
                            ? "text-[#FFD60A] font-black"
                            : "text-[#121212] dark:text-[#F0EBDF] hover:bg-black/5 dark:hover:bg-white/5",
                      )}
                    >
                      <span>{day}</span>
                      {hasActivity && (
                        <span
                          className={cn(
                            "absolute bottom-0.5 h-1 w-3 rounded-full",
                            isSelected ? "bg-[#121212]" : "bg-[#FFD60A]",
                          )}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Day Activities */}
            <div className="space-y-2 pt-1">
              <h3 className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                Aktivitas: {selectedDay} Agustus 2026
              </h3>

              {selectedDay === 17 ? (
                <div className="space-y-2">
                  <div className="rounded-[10px] border-[2.5px] border-[#121212] bg-[#FF6B6B] p-3 text-[#121212] shadow-[3px_3px_0px_#121212]">
                    <div className="flex justify-between items-center">
                      <span className="font-black text-xs">Tugas Akhir Bab 3</span>
                      <span className="rounded-md border border-black bg-white/40 px-2 py-0.5 text-[9px] font-black">
                        URGENT
                      </span>
                    </div>
                    <p className="text-[10px] font-bold mt-1">Deadline 23:59</p>
                  </div>

                  <div className="rounded-[10px] border-[2.5px] border-[#121212] bg-white dark:bg-[#201D18] p-3 shadow-[3px_3px_0px_#121212] text-[#121212] dark:text-[#F0EBDF]">
                    <div className="flex justify-between items-center">
                      <span className="font-black text-xs">Kuliah Pemrograman Mobile</span>
                      <span className="text-[10px] font-mono font-bold">08:00 - 10:30</span>
                    </div>
                  </div>
                </div>
              ) : selectedDay === 18 ? (
                <div className="rounded-[10px] border-[2.5px] border-[#121212] bg-[#FF9F43] p-3 text-[#121212] shadow-[3px_3px_0px_#121212]">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-xs">Review Materi Mobile Programming</span>
                    <span className="rounded-md border border-black bg-white/40 px-2 py-0.5 text-[9px] font-black">
                      MEPET
                    </span>
                  </div>
                </div>
              ) : (
                <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 text-center shadow-[4px_4px_0px_#121212]">
                  <p className="text-xs font-bold text-[#4A463C] dark:text-[#C8C2B2]">
                    Tidak ada aktivitas pada tanggal ini.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= TAB 3: TUGAS ========================= */}
        {/* ========================================================= */}
        {activeTab === "tasks" && (
          <div className="space-y-4 pt-1">
            {/* Search Input Box */}
            <div className="flex items-center gap-2 rounded-[10px] border-[2.5px] border-[#121212] bg-white dark:bg-[#201D18] px-3 py-2 text-[#121212] dark:text-[#F0EBDF] shadow-[3px_3px_0px_#121212]">
              <SearchIcon className="h-4 w-4 shrink-0 text-[#4A463C]" />
              <input
                type="text"
                placeholder="Cari tugas..."
                value={taskSearchQuery}
                onChange={(e) => setTaskSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs font-bold outline-none placeholder:text-[#4A463C]"
              />
              {taskSearchQuery && (
                <button onClick={() => setTaskSearchQuery("")}>
                  <CloseIcon className="h-4 w-4 text-[#4A463C]" />
                </button>
              )}
            </div>

            {/* Sub-tabs: Aktif vs Selesai */}
            <div className="flex border-b-[3px] border-[#121212]">
              <button
                onClick={() => setTaskSubTab("active")}
                className={cn(
                  "flex-1 py-2 text-center text-xs font-black transition-all relative",
                  taskSubTab === "active"
                    ? "text-[#FFD60A]"
                    : "text-[#4A463C] dark:text-[#C8C2B2]",
                )}
              >
                Aktif ({activeTasksList.length})
                {taskSubTab === "active" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FFD60A]" />
                )}
              </button>
              <button
                onClick={() => setTaskSubTab("completed")}
                className={cn(
                  "flex-1 py-2 text-center text-xs font-black transition-all relative",
                  taskSubTab === "completed"
                    ? "text-[#FFD60A]"
                    : "text-[#4A463C] dark:text-[#C8C2B2]",
                )}
              >
                Selesai ({completedTasksList.length})
                {taskSubTab === "completed" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FFD60A]" />
                )}
              </button>
            </div>

            {/* Tasks Content List */}
            {taskSubTab === "active" ? (
              <div className="space-y-2.5">
                {activeTasksList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <TaskAltIcon className="h-12 w-12 text-[#121212] dark:text-[#F0EBDF] mb-2" />
                    <p className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                      Belum ada tugas aktif
                    </p>
                    <p className="text-xs text-[#4A463C] dark:text-[#C8C2B2] mt-1">
                      Tekan tombol + untuk menambahkan tugas baru.
                    </p>
                  </div>
                ) : (
                  activeTasksList.map((task) => {
                    const badge = getPriorityDetails(task.priority);
                    return (
                      <div
                        key={task.id}
                        className={cn(
                          "rounded-[14px] border-[3.5px] border-[#121212] p-4 text-[#121212] shadow-[4px_4px_0px_#121212] transition-all",
                          badge.bg,
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div
                            onClick={() => setSelectedTaskDetail(task)}
                            className="cursor-pointer flex-1 pr-2"
                          >
                            <h4 className="font-black text-xs leading-snug">{task.title}</h4>
                            <p className="text-[10px] font-bold opacity-90 mt-1">{task.deadline}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="rounded-[8px] border-[2px] border-[#121212] bg-white/30 px-2 py-0.5 text-[10px] font-black uppercase">
                              {task.priority}
                            </span>
                            <button
                              onClick={() => {
                                setTasks((prev) =>
                                  prev.map((t) => (t.id === task.id ? { ...t, completed: true } : t)),
                                );
                                showToast(`Tugas "${task.title}" diselesaikan!`);
                              }}
                              className="flex h-7 w-7 items-center justify-center rounded-[8px] border-[2px] border-[#121212] bg-white shadow-[1.5px_1.5px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px]"
                              title="Tandai Selesai"
                            >
                              <CheckIcon className="h-4 w-4 text-[#121212]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="space-y-2.5">
                {completedTasksList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckIcon className="h-12 w-12 text-[#121212] dark:text-[#F0EBDF] mb-2" />
                    <p className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                      Belum ada tugas selesai
                    </p>
                    <p className="text-xs text-[#4A463C] dark:text-[#C8C2B2] mt-1">
                      Tugas yang diselesaikan akan muncul di sini.
                    </p>
                  </div>
                ) : (
                  completedTasksList.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 text-[#121212] dark:text-[#F0EBDF] shadow-[4px_4px_0px_#121212]"
                    >
                      <div className="flex-1 pr-2">
                        <p className="font-black text-xs line-through opacity-70">{task.title}</p>
                        <p className="text-[10px] font-bold text-[#4A463C] dark:text-[#C8C2B2] mt-0.5">
                          Selesai
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setTasks((prev) =>
                            prev.map((t) => (t.id === task.id ? { ...t, completed: false } : t)),
                          );
                          showToast(`Tugas "${task.title}" diaktifkan kembali!`);
                        }}
                        className="rounded-[8px] border-[2px] border-[#121212] bg-[#FFD60A] px-2.5 py-1 text-[10px] font-black text-[#121212] shadow-[1.5px_1.5px_0px_#121212]"
                      >
                        Buka Lagi
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= TAB 4: PROGRES ======================= */}
        {/* ========================================================= */}
        {activeTab === "progress" && (
          <div className="space-y-4 pt-1">
            {/* Top 5 Sub-tabs Carousel */}
            <div className="flex gap-4 overflow-x-auto border-b-[3px] border-[#121212] pb-1 scrollbar-none">
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
                      ? "text-[#FFD60A]"
                      : "text-[#4A463C] dark:text-[#C8C2B2]",
                  )}
                >
                  {sub.label}
                  {progressSubTab === sub.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FFD60A]" />
                  )}
                </button>
              ))}
            </div>

            {/* Sub-tab 1: Kebiasaan (Habit List) */}
            {progressSubTab === "habits" && (
              <div className="space-y-3">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#121212] dark:shadow-[4px_4px_0px_#F0F0F0]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                          {habit.name}
                        </h3>
                        <p className="text-[10px] font-bold text-[#FFD60A] mt-0.5">
                          {habit.type === "routine"
                            ? "Pengingat Rutinitas"
                            : habit.todayMinute > 0
                              ? "Sedang Berjalan"
                              : "Belum Mulai"}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (habit.type === "timer") {
                            handleStartTimer(habit.name, habit.targetMinute);
                          } else {
                            setHabits((prev) =>
                              prev.map((h) =>
                                h.id === habit.id ? { ...h, completed: !h.completed } : h,
                              ),
                            );
                            showToast(`Kebiasaan "${habit.name}" ${!habit.completed ? "selesai" : "dibatalkan"}!`);
                          }
                        }}
                        className={cn(
                          "rounded-[10px] border-[2.5px] border-[#121212] px-3.5 py-1.5 font-black text-xs shadow-[2.5px_2.5px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all",
                          habit.type === "timer"
                            ? "bg-[#FFD60A] text-[#121212]"
                            : habit.completed
                              ? "bg-[#1DD1A1] text-[#121212]"
                              : "bg-white dark:bg-[#2E2A22] text-[#121212] dark:text-[#F0EBDF]",
                        )}
                      >
                        {habit.type === "timer"
                          ? "Mulai"
                          : habit.completed
                            ? "✓ Selesai"
                            : "Tandai Selesai"}
                      </button>
                    </div>

                    {habit.targetMinute > 0 && (
                      <div className="mt-2.5">
                        <div className="flex justify-between font-mono text-[10px] font-bold text-[#4A463C] dark:text-[#C8C2B2] mb-1">
                          <span>{habit.todayMinute}m / {habit.targetMinute}m</span>
                          <span>{Math.round((habit.todayMinute / habit.targetMinute) * 100)}%</span>
                        </div>
                        <div className="h-2.5 w-full overflow-hidden rounded-[5px] border-[1.5px] border-[#121212] bg-[#EFEAD8] dark:bg-[#2C2C32]">
                          <div
                            className="h-full bg-[#FFD60A]"
                            style={{
                              width: `${Math.min(100, Math.round((habit.todayMinute / habit.targetMinute) * 100))}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between text-[10px] font-bold">
                      <div className="flex items-center gap-1.5 text-[#121212] dark:text-[#F0EBDF]">
                        <WhatshotIcon className="h-4 w-4 text-[#FF9F43]" />
                        <span>{habit.streak} hari</span>
                        <span className="opacity-50">·</span>
                        <span className="opacity-75">Terbaik: {habit.bestStreak} hari</span>
                      </div>
                      <button
                        onClick={() => showToast("Streak berhasil dipulihkan dari cadangan!")}
                        className="text-[10px] font-bold text-[#3E63DD] underline"
                      >
                        Pulihkan Streak
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-tab 2: Belajar (Study Sessions Log) */}
            {progressSubTab === "study" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                    Total belajar: {Math.floor(totalStudyMinutes / 60)}j {totalStudyMinutes % 60}m
                  </p>
                  <button
                    onClick={() => handleStartTimer()}
                    className="rounded-[8px] border-[2px] border-[#121212] bg-[#FFD60A] px-2.5 py-1 text-[10px] font-black text-[#121212] shadow-[2px_2px_0px_#121212]"
                  >
                    + Sesi Baru
                  </button>
                </div>

                {studySessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-3.5 shadow-[4px_4px_0px_#121212] dark:shadow-[4px_4px_0px_#F0F0F0]"
                  >
                    <div>
                      <p className="font-black text-xs text-[#121212] dark:text-[#F0EBDF]">
                        {session.habitTitle}
                      </p>
                      <p className="text-[10px] text-[#4A463C] dark:text-[#C8C2B2] mt-0.5">
                        {session.date}
                      </p>
                      <p className="text-[10px] font-mono font-bold text-[#FFD60A]">
                        {session.timeRange}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setStudySessions((prev) => prev.filter((s) => s.id !== session.id));
                        showToast("Sesi belajar dihapus.");
                      }}
                      className="p-1.5 text-[#E5484D] hover:opacity-75"
                      title="Hapus Sesi"
                    >
                      <DeleteIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-tab 3: Statistik */}
            {progressSubTab === "stats" && (
              <div className="space-y-3">
                {/* Period Selector */}
                <div className="flex gap-1.5 overflow-x-auto">
                  {(["Hari Ini", "Minggu Ini", "Bulan Ini", "Tahun Ini"] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setStatsPeriod(period)}
                      className={cn(
                        "rounded-[8px] border-[2px] border-[#121212] px-3 py-1 text-[11px] font-black shadow-[2px_2px_0px_#121212]",
                        statsPeriod === period
                          ? "bg-[#FFD60A] text-[#121212]"
                          : "bg-white dark:bg-[#201D18] text-[#121212] dark:text-[#F0EBDF]",
                      )}
                    >
                      {period}
                    </button>
                  ))}
                </div>

                {/* 1. Belajar Card */}
                <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#121212] space-y-2">
                  <h4 className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                    Belajar ({statsPeriod})
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[#4A463C] dark:text-[#C8C2B2] text-[10px] font-bold">Total Jam Belajar</p>
                      <p className="font-black text-base font-mono text-[#FFD60A]">3j 30m</p>
                    </div>
                    <div>
                      <p className="text-[#4A463C] dark:text-[#C8C2B2] text-[10px] font-bold">Jumlah Sesi</p>
                      <p className="font-black text-base font-mono">{studySessions.length}</p>
                    </div>
                  </div>
                </div>

                {/* 2. Kebiasaan Card */}
                <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#121212] space-y-2">
                  <h4 className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                    Kebiasaan
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[#4A463C] dark:text-[#C8C2B2] text-[10px] font-bold">Streak Aktif</p>
                      <p className="font-black text-base font-mono text-[#1DD1A1]">5 Hari</p>
                    </div>
                    <div>
                      <p className="text-[#4A463C] dark:text-[#C8C2B2] text-[10px] font-bold">Streak Tertinggi</p>
                      <p className="font-black text-base font-mono text-[#FF9F43]">14 Hari</p>
                    </div>
                  </div>
                </div>

                {/* 3. Tugas Card */}
                <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#121212] space-y-2">
                  <h4 className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                    Tugas
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-[#4A463C] dark:text-[#C8C2B2] text-[9px] font-bold">Total</p>
                      <p className="font-black text-sm font-mono">{tasks.length}</p>
                    </div>
                    <div>
                      <p className="text-[#4A463C] dark:text-[#C8C2B2] text-[9px] font-bold">Selesai</p>
                      <p className="font-black text-sm font-mono text-[#1DD1A1]">
                        {tasks.filter((t) => t.completed).length}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#4A463C] dark:text-[#C8C2B2] text-[9px] font-bold">Mendesak</p>
                      <p className="font-black text-sm font-mono text-[#FF6B6B]">
                        {tasks.filter((t) => !t.completed && t.priority === "URGENT").length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 4: Heatmap (16-Week Consistency Matrix) */}
            {progressSubTab === "heatmap" && (
              <div className="space-y-4">
                <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#121212]">
                  <h4 className="font-black text-xs text-[#121212] dark:text-[#F0EBDF] mb-3">
                    Matriks Konsistensi 16 Minggu
                  </h4>

                  {/* 16 columns x 7 rows matrix */}
                  <div className="grid grid-cols-16 gap-1">
                    {Array.from({ length: 112 }, (_, i) => {
                      // Deterministic mock intensity shades
                      const intensity =
                        i % 7 === 0 || i % 11 === 0
                          ? "bg-[#FFD60A]"
                          : i % 5 === 0
                            ? "bg-[#FFD60A]/70"
                            : i % 3 === 0
                              ? "bg-[#FFD60A]/40"
                              : "bg-[#EFEAD8] dark:bg-[#2C2C32]";

                      return (
                        <div
                          key={i}
                          className={cn(
                            "aspect-square rounded-[3px] border-[0.5px] border-[#121212]/30",
                            intensity,
                          )}
                        />
                      );
                    })}
                  </div>

                  {/* Heatmap Legend */}
                  <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-[#4A463C] dark:text-[#C8C2B2]">
                    <span>Sedikit</span>
                    <div className="flex gap-1">
                      <span className="h-3 w-3 rounded-[2px] bg-[#EFEAD8] dark:bg-[#2C2C32] border border-black/20" />
                      <span className="h-3 w-3 rounded-[2px] bg-[#FFD60A]/30 border border-black/20" />
                      <span className="h-3 w-3 rounded-[2px] bg-[#FFD60A]/60 border border-black/20" />
                      <span className="h-3 w-3 rounded-[2px] bg-[#FFD60A]/85 border border-black/20" />
                      <span className="h-3 w-3 rounded-[2px] bg-[#FFD60A] border border-black/20" />
                    </div>
                    <span>Banyak</span>
                  </div>
                </div>

                {/* Ringkasan Konsistensi */}
                <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#121212] space-y-2">
                  <h4 className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                    Ringkasan
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#4A463C] dark:text-[#C8C2B2]">Total Hari Aktif</span>
                      <span className="font-black font-mono">18 Hari</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A463C] dark:text-[#C8C2B2]">Hari Terbaik</span>
                      <span className="font-black">Kamis, 6 Agustus 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A463C] dark:text-[#C8C2B2]">Durasi Terlama</span>
                      <span className="font-black font-mono">2j 15m</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 5: Pencapaian (8 Badges) */}
            {progressSubTab === "achieve" && (
              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#121212] dark:shadow-[4px_4px_0px_#F0F0F0]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {ach.unlocked ? (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border-[2px] border-[#121212] bg-[#FFD60A] text-[#121212]">
                            <TrophyIcon className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border-[2px] border-[#121212] bg-[#EFEAD8] dark:bg-[#2C2C32] text-[#4A463C]">
                            <LockIcon className="h-5 w-5" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-black text-xs text-[#121212] dark:text-[#F0EBDF]">
                            {ach.title}
                          </h4>
                          <p className="text-[10px] text-[#4A463C] dark:text-[#C8C2B2]">
                            {ach.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "rounded-[6px] border-[1.5px] border-[#121212] px-2 py-0.5 text-[9px] font-black uppercase",
                          ach.unlocked
                            ? "bg-[#FFD60A] text-[#121212]"
                            : "bg-[#EFEAD8] dark:bg-[#2C2C32] text-[#4A463C] dark:text-[#C8C2B2]",
                        )}
                      >
                        {ach.unlocked ? "Terbuka" : "Terkunci"}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between font-mono text-[9px] font-bold text-[#4A463C] dark:text-[#C8C2B2] mb-1">
                        <span>{ach.current} / {ach.target}</span>
                        <span>{Math.min(100, Math.round((ach.current / ach.target) * 100))}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full border-[1.5px] border-[#121212] bg-[#EFEAD8] dark:bg-[#2C2C32]">
                        <div
                          className="h-full bg-[#FFD60A]"
                          style={{
                            width: `${Math.min(100, Math.round((ach.current / ach.target) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>
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
            <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#121212] space-y-3">
              <h3 className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                Tampilan
              </h3>
              <div className="space-y-2.5">
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
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-[2.5px] border-[#121212]">
                      {themeMode === opt.id && (
                        <div className="h-2.5 w-2.5 rounded-full bg-[#FFD60A]" />
                      )}
                    </div>
                    <span className="font-bold text-xs text-[#121212] dark:text-[#F0EBDF]">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cadangan & Pulihkan */}
            <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#121212] space-y-3">
              <h3 className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                Cadangan & Pulihkan
              </h3>
              <p className="text-[11px] text-[#4A463C] dark:text-[#C8C2B2]">
                Backup terakhir: Selasa, 11 Agustus 2026
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => showToast("File cadangan mother-backup-2026-08-17.db berhasil diekspor!")}
                  className="flex-1 rounded-[10px] border-[2.5px] border-[#121212] bg-white dark:bg-[#2E2A22] py-2 font-black text-xs text-[#121212] dark:text-[#F0EBDF] shadow-[3px_3px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  Ekspor Data
                </button>
                <button
                  onClick={() => setIsBackupConfirmOpen(true)}
                  className="flex-1 rounded-[10px] border-[2.5px] border-[#121212] bg-white dark:bg-[#2E2A22] py-2 font-black text-xs text-[#121212] dark:text-[#F0EBDF] shadow-[3px_3px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  Impor Data
                </button>
              </div>
            </div>

            {/* Tentang */}
            <div className="rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-4 shadow-[4px_4px_0px_#121212] space-y-1">
              <p className="text-[10px] font-bold text-[#FFD60A]">Tentang Aplikasi</p>
              <h3 className="font-black text-lg text-[#121212] dark:text-[#F0EBDF]">Mother</h3>
              <p className="text-xs font-bold text-[#4A463C] dark:text-[#C8C2B2]">Versi 3.4.0</p>
              <p className="text-[10px] text-[#4A463C] dark:text-[#C8C2B2] pt-1">
                Aplikasi manajemen belajar & produktivitas berbasis Neobrutalism dengan kasih sayang seorang ibu.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ================= STICKY ACTIVE TIMER BANNER (ActiveTimerBanner.kt) ================= */}
      {timerPhase !== "IDLE" && !isFocusModeFullscreen && (
        <div
          onClick={() => setIsFocusModeFullscreen(true)}
          className="absolute bottom-16 left-3.5 right-3.5 z-30 cursor-pointer flex items-center justify-between rounded-[14px] border-[3.5px] border-[#121212] bg-[#FFD60A] p-3 text-[#121212] shadow-[4px_4px_0px_#121212] animate-in slide-in-from-bottom-2 duration-150"
        >
          <div className="flex items-center gap-2.5">
            {timerPhase === "RUNNING" ? (
              <PlayCircleIcon className="h-6 w-6 text-[#121212] animate-pulse" />
            ) : (
              <PauseCircleIcon className="h-6 w-6 text-[#121212]" />
            )}
            <div>
              <p className="font-black text-xs line-clamp-1">{timerHabitTitle}</p>
              <p className="text-[10px] font-mono font-bold text-[#121212]/80">
                {timerPhase === "RUNNING" ? "Mode Fokus" : "Timer Dijeda"} • {formatChronometer(timerElapsedSeconds)}
              </p>
            </div>
          </div>
          <ChevronRightIcon className="h-5 w-5 text-[#121212]" />
        </div>
      )}

      {/* ================= FLOATING ACTION BUTTON (FAB) ================= */}
      {!isFocusModeFullscreen && (
        <button
          onClick={() => setIsQuickAddOpen(true)}
          className="absolute bottom-16 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-[14px] border-[3.5px] border-[#121212] bg-[#FFD60A] text-[#121212] shadow-[4px_4px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          title="Tambah Cepat"
        >
          <AddIcon className="h-7 w-7 text-[#121212]" />
        </button>
      )}

      {/* ================= 3. BOTTOM NAVIGATION BAR ================= */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-20 flex h-16 items-center justify-around border-t-[3px] border-[#121212] px-1",
          isDark ? "bg-[#141210]" : "bg-[#F5F1E8]",
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
              onClick={() => {
                setActiveTab(item.id);
              }}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all"
            >
              {isActive ? (
                <div className="flex h-7 w-14 items-center justify-center rounded-full bg-[#FFD60A] border-[2px] border-[#121212] shadow-[1px_1px_0px_#121212]">
                  <Icon className="h-4 w-4 text-[#121212]" />
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
                  "text-[9px] tracking-tight",
                  isActive
                    ? "font-black text-[#121212] dark:text-[#FFD60A]"
                    : "font-bold text-[#4A463C] dark:text-[#C8C2B2]",
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* 4. MODALS, SHEETS & FULLSCREEN OVERLAYS                                */}
      {/* ===================================================================== */}

      {/* A. MOTHER GREETING DIALOG (MotherGreetingDialog.kt) */}
      {isMotherGreetingOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-5 text-[#121212] dark:text-[#F0EBDF] shadow-[5px_5px_0px_#121212]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[2.5px] border-[#121212] bg-[#FEE140] text-[#121212]">
                <FavoriteIcon className="h-6 w-6 text-[#121212]" />
              </div>
              <div>
                <h3 className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                  Pesan dari Ibu ❤️
                </h3>
                <p className="text-[10px] font-bold text-[#4A463C] dark:text-[#C8C2B2]">
                  Pengingat Kasih Sayang
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs font-semibold leading-relaxed">
              {motherGreetingText}
            </p>

            <div className="mt-4 rounded-[10px] border-[2px] border-[#121212] bg-[#EFEAD8] dark:bg-[#2C2C32] p-3 text-[11px] font-bold space-y-1">
              <p>• {tasks.filter((t) => !t.completed).length} Deadline / Tugas menunggu</p>
              <p>• {schedules.length} Aktivitas jadwal hari ini</p>
            </div>

            <button
              onClick={() => setIsMotherGreetingOpen(false)}
              className="mt-4 w-full rounded-[10px] border-[2.5px] border-[#121212] bg-[#FFD60A] py-2.5 font-black text-xs text-[#121212] shadow-[3px_3px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Siap, Bu!
            </button>
          </div>
        </div>
      )}

      {/* B. QUICK ADD SHEET (QuickAddSheet.kt) */}
      {isQuickAddOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 animate-in fade-in duration-150">
          <div className="rounded-t-[20px] border-t-[3.5px] border-x-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-5 shadow-[0px_-4px_0px_#121212] space-y-2.5">
            <div className="flex items-center justify-between pb-1">
              <h3 className="font-black text-sm text-[#121212] dark:text-[#F0EBDF]">
                Tambah Cepat
              </h3>
              <button
                onClick={() => setIsQuickAddOpen(false)}
                className="rounded-full p-1 text-[#121212] dark:text-[#F0EBDF]"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {[
              {
                id: "add-task",
                label: "Tambah Tugas",
                icon: AddTaskIcon,
                action: () => {
                  setIsQuickAddOpen(false);
                  setIsCreateTaskOpen(true);
                },
              },
              {
                id: "add-sch",
                label: "Tambah Jadwal",
                icon: EventIcon,
                action: () => {
                  setIsQuickAddOpen(false);
                  setIsCreateScheduleOpen(true);
                },
              },
              {
                id: "add-habit",
                label: "Tambah Kebiasaan",
                icon: RepeatIcon,
                action: () => {
                  setIsQuickAddOpen(false);
                  setActiveTab("progress");
                  setProgressSubTab("habits");
                  showToast("Pilih sub-tab Kebiasaan untuk konfigurasi.");
                },
              },
              {
                id: "add-session",
                label: "Tambah Sesi Manual",
                icon: SchoolIcon,
                action: () => {
                  setIsQuickAddOpen(false);
                  setActiveTab("progress");
                  setProgressSubTab("study");
                },
              },
              {
                id: "add-pomo",
                label: "Mulai Timer Pomodoro",
                icon: TimerIcon,
                action: () => {
                  setIsQuickAddOpen(false);
                  handleStartTimer("Sesi Fokus Pomodoro", 25);
                },
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex w-full items-center gap-3 rounded-[10px] border-[2.5px] border-[#121212] bg-[#F5F1E8] dark:bg-[#2E2A22] p-3 text-left font-black text-xs text-[#121212] dark:text-[#F0EBDF] shadow-[2px_2px_0px_#121212] active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <Icon className="h-5 w-5 text-[#FFD60A]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* C. UNIVERSAL SEARCH MODAL (SearchScreen.kt) */}
      {isSearchOpen && (
        <div className="absolute inset-0 z-50 flex flex-col bg-[#F5F1E8] dark:bg-[#141210] p-4 animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-[10px] border-[2.5px] border-[#121212] bg-white dark:bg-[#201D18] px-3 py-2 text-[#121212] dark:text-[#F0EBDF] shadow-[3px_3px_0px_#121212]">
              <SearchIcon className="h-4 w-4 text-[#4A463C]" />
              <input
                type="text"
                autoFocus
                placeholder="Cari tugas, jadwal, kebiasaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs font-bold outline-none"
              />
            </div>
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border-[2.5px] border-[#121212] bg-[#FF6B6B] text-[#121212] shadow-[2px_2px_0px_#121212]"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex-1 overflow-y-auto space-y-3">
            {searchQuery === "" ? (
              <p className="text-center text-xs font-bold text-[#4A463C] dark:text-[#C8C2B2] pt-8">
                Ketik kata kunci untuk mencari di semua modul.
              </p>
            ) : (
              <>
                <h4 className="font-black text-xs text-[#FFD60A]">Hasil Pencarian:</h4>
                {tasks
                  .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSelectedTaskDetail(t);
                      }}
                      className="cursor-pointer rounded-[10px] border-[2px] border-[#121212] bg-white dark:bg-[#201D18] p-3 text-[#121212] dark:text-[#F0EBDF] shadow-[2px_2px_0px_#121212]"
                    >
                      <span className="text-[9px] font-black text-[#FFD60A]">TUGAS</span>
                      <p className="font-black text-xs">{t.title}</p>
                    </div>
                  ))}
                {schedules
                  .filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((s) => (
                    <div
                      key={s.id}
                      className="rounded-[10px] border-[2px] border-[#121212] bg-white dark:bg-[#201D18] p-3 text-[#121212] dark:text-[#F0EBDF] shadow-[2px_2px_0px_#121212]"
                    >
                      <span className="text-[9px] font-black text-[#3E63DD]">JADWAL</span>
                      <p className="font-black text-xs">{s.title}</p>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* D. CREATE TASK MODAL (CreateTaskScreen.kt) */}
      {isCreateTaskOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-5 text-[#121212] dark:text-[#F0EBDF] shadow-[5px_5px_0px_#121212] space-y-3">
            <h3 className="font-black text-sm">Tambah Tugas Baru</h3>

            <div>
              <label className="text-[10px] font-bold">Judul Tugas</label>
              <input
                type="text"
                placeholder="Contoh: Laporan Akhir"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="mt-1 w-full rounded-[8px] border-[2px] border-[#121212] bg-[#F5F1E8] dark:bg-[#2E2A22] p-2 text-xs font-bold outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold">Tingkat Prioritas</label>
              <div className="mt-1 grid grid-cols-4 gap-1.5">
                {(["URGENT", "MEPET", "WASPADA", "AMAN"] as const).map((p) => {
                  const b = getPriorityDetails(p);
                  return (
                    <button
                      key={p}
                      onClick={() => setNewTaskPriority(p)}
                      className={cn(
                        "rounded-[6px] border-[2px] border-[#121212] py-1 text-[10px] font-black",
                        newTaskPriority === p ? `${b.bg} text-[#121212] shadow-[2px_2px_0px_#121212]` : "bg-white/40",
                      )}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsCreateTaskOpen(false)}
                className="flex-1 rounded-[10px] border-[2.5px] border-[#121212] bg-[#EFEAD8] py-2 font-black text-xs text-[#121212]"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (!newTaskTitle.trim()) {
                    showToast("Judul tugas tidak boleh kosong!");
                    return;
                  }
                  const newTask: TaskItem = {
                    id: `task-${Date.now()}`,
                    title: newTaskTitle,
                    description: "Tugas baru ditambahkan via Quick Add",
                    deadline: "Hari Ini • 23:59",
                    priority: newTaskPriority,
                    category: newTaskCategory,
                    completed: false,
                    dueDate: "2026-08-17",
                  };
                  setTasks((prev) => [newTask, ...prev]);
                  setNewTaskTitle("");
                  setIsCreateTaskOpen(false);
                  showToast("Tugas baru berhasil disimpan!");
                }}
                className="flex-1 rounded-[10px] border-[2.5px] border-[#121212] bg-[#FFD60A] py-2 font-black text-xs text-[#121212] shadow-[2px_2px_0px_#121212]"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* E. CREATE SCHEDULE MODAL (CreateScheduleScreen.kt) */}
      {isCreateScheduleOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-5 text-[#121212] dark:text-[#F0EBDF] shadow-[5px_5px_0px_#121212] space-y-3">
            <h3 className="font-black text-sm">Tambah Jadwal Baru</h3>

            <div>
              <label className="text-[10px] font-bold">Judul Aktivitas</label>
              <input
                type="text"
                placeholder="Contoh: Belajar Kelompok"
                value={newScheduleTitle}
                onChange={(e) => setNewScheduleTitle(e.target.value)}
                className="mt-1 w-full rounded-[8px] border-[2px] border-[#121212] bg-[#F5F1E8] dark:bg-[#2E2A22] p-2 text-xs font-bold outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold">Jam Mulai</label>
                <input
                  type="text"
                  value={newScheduleStart}
                  onChange={(e) => setNewScheduleStart(e.target.value)}
                  className="mt-1 w-full rounded-[8px] border-[2px] border-[#121212] bg-[#F5F1E8] dark:bg-[#2E2A22] p-2 font-mono text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold">Jam Selesai</label>
                <input
                  type="text"
                  value={newScheduleEnd}
                  onChange={(e) => setNewScheduleEnd(e.target.value)}
                  className="mt-1 w-full rounded-[8px] border-[2px] border-[#121212] bg-[#F5F1E8] dark:bg-[#2E2A22] p-2 font-mono text-xs font-bold"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsCreateScheduleOpen(false)}
                className="flex-1 rounded-[10px] border-[2.5px] border-[#121212] bg-[#EFEAD8] py-2 font-black text-xs text-[#121212]"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (!newScheduleTitle.trim()) {
                    showToast("Judul jadwal tidak boleh kosong!");
                    return;
                  }
                  const newSch: ScheduleItem = {
                    id: `sch-${Date.now()}`,
                    title: newScheduleTitle,
                    date: "2026-08-17",
                    startTime: newScheduleStart,
                    endTime: newScheduleEnd,
                    status: "Belum Dimulai",
                    category: "Kuliah",
                  };
                  setSchedules((prev) => [...prev, newSch]);
                  setNewScheduleTitle("");
                  setIsCreateScheduleOpen(false);
                  showToast("Jadwal baru berhasil disimpan!");
                }}
                className="flex-1 rounded-[10px] border-[2.5px] border-[#121212] bg-[#FFD60A] py-2 font-black text-xs text-[#121212] shadow-[2px_2px_0px_#121212]"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* F. TASK DETAIL DIALOG */}
      {selectedTaskDetail && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-5 text-[#121212] dark:text-[#F0EBDF] shadow-[5px_5px_0px_#121212] space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded-[8px] border-[2px] border-[#121212] bg-[#FFD60A] px-2.5 py-0.5 text-[10px] font-black uppercase text-[#121212]">
                {selectedTaskDetail.priority}
              </span>
              <button
                onClick={() => setSelectedTaskDetail(null)}
                className="rounded-full p-1"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <h3 className="font-black text-sm">{selectedTaskDetail.title}</h3>
            <p className="text-xs text-[#4A463C] dark:text-[#C8C2B2]">
              {selectedTaskDetail.description}
            </p>

            <div className="rounded-[8px] border border-[#121212] bg-[#F5F1E8] dark:bg-[#2E2A22] p-2.5 text-[10px] font-bold space-y-1">
              <p>📅 Deadline: {selectedTaskDetail.deadline}</p>
              <p>🏷️ Kategori: {selectedTaskDetail.category}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setTasks((prev) => prev.filter((t) => t.id !== selectedTaskDetail.id));
                  setSelectedTaskDetail(null);
                  showToast("Tugas berhasil dihapus.");
                }}
                className="flex-1 rounded-[10px] border-[2.5px] border-[#121212] bg-[#FF6B6B] py-2 font-black text-xs text-[#121212] shadow-[2px_2px_0px_#121212]"
              >
                Hapus
              </button>
              <button
                onClick={() => {
                  setTasks((prev) =>
                    prev.map((t) =>
                      t.id === selectedTaskDetail.id ? { ...t, completed: !t.completed } : t,
                    ),
                  );
                  setSelectedTaskDetail(null);
                  showToast("Status tugas berhasil diperbarui!");
                }}
                className="flex-1 rounded-[10px] border-[2.5px] border-[#121212] bg-[#1DD1A1] py-2 font-black text-xs text-[#121212] shadow-[2px_2px_0px_#121212]"
              >
                {selectedTaskDetail.completed ? "Buka Kembali" : "Tandai Selesai"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* G. BACKUP RESTORE CONFIRMATION DIALOG */}
      {isBackupConfirmOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-[14px] border-[3.5px] border-[#121212] bg-white dark:bg-[#201D18] p-5 text-[#121212] dark:text-[#F0EBDF] shadow-[5px_5px_0px_#121212] space-y-3">
            <h3 className="font-black text-sm">Pulihkan Data</h3>
            <p className="text-xs text-[#4A463C] dark:text-[#C8C2B2]">
              Seluruh data saat ini akan diganti dengan data dari file backup. Lanjutkan?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsBackupConfirmOpen(false)}
                className="flex-1 rounded-[10px] border-[2.5px] border-[#121212] bg-[#EFEAD8] py-2 font-black text-xs text-[#121212]"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setIsBackupConfirmOpen(false);
                  showToast("Data berhasil dipulihkan dari cadangan!");
                }}
                className="flex-1 rounded-[10px] border-[2.5px] border-[#121212] bg-[#FFD60A] py-2 font-black text-xs text-[#121212] shadow-[2px_2px_0px_#121212]"
              >
                Pulihkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* H. FULLSCREEN FOCUS MODE OVERLAY (FocusModeScreen.kt) */}
      {isFocusModeFullscreen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-between bg-[#141210] p-5 text-[#F0EBDF] animate-in fade-in duration-150">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className="rounded-[8px] border-[2px] border-[#121212] bg-[#FFD60A] px-2.5 py-1 font-mono text-[10px] font-black uppercase text-[#121212]">
              ⚡ FOREGROUND SERVICE
            </span>
            <button
              onClick={() => setIsFocusModeFullscreen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-[#F0EBDF] bg-[#201D18] text-[#F0EBDF]"
              title="Kecilkan ke Banner"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Center Display: Giant 57sp Chronometer */}
          <div className="my-auto text-center space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#FFD60A]">
              {timerHabitTitle}
            </h3>
            <div className="font-mono text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_24px_rgba(255,214,10,0.5)]">
              {formatChronometer(timerElapsedSeconds)}
            </div>
            <p className="text-xs font-mono text-[#C8C2B2]">
              {timerPhase === "RUNNING"
                ? "Sesi Berjalan di Background..."
                : "Timer Sedang Dijeda"}
            </p>
          </div>

          {/* Bottom Action Controls */}
          <div className="space-y-3">
            <div className="flex gap-3">
              {timerPhase === "RUNNING" ? (
                <button
                  onClick={handlePauseTimer}
                  className="flex-1 flex h-12 items-center justify-center gap-2 rounded-[10px] border-[2.5px] border-[#121212] bg-white font-black text-xs text-[#121212] shadow-[3px_3px_0px_#FFFFFF] active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <PauseCircleIcon className="h-5 w-5" />
                  <span>Jeda</span>
                </button>
              ) : (
                <button
                  onClick={handleResumeTimer}
                  className="flex-1 flex h-12 items-center justify-center gap-2 rounded-[10px] border-[2.5px] border-[#121212] bg-[#FFD60A] font-black text-xs text-[#121212] shadow-[3px_3px_0px_#FFFFFF] active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <PlayCircleIcon className="h-5 w-5" />
                  <span>Lanjutkan</span>
                </button>
              )}

              <button
                onClick={handleStopTimer}
                className="flex-1 flex h-12 items-center justify-center rounded-[10px] border-[2.5px] border-[#121212] bg-[#FF6B6B] font-black text-xs text-[#121212] shadow-[3px_3px_0px_#FFFFFF] active:translate-x-[2px] active:translate-y-[2px]"
              >
                Selesai / Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* I. SNACKBAR TOAST NOTIFICATION */}
      {snackbarMessage && (
        <div className="absolute top-8 left-4 right-4 z-50 flex items-center justify-between rounded-[10px] border-[2.5px] border-[#121212] bg-[#FFD60A] px-3.5 py-2.5 text-xs font-black text-[#121212] shadow-[4px_4px_0px_#121212] animate-in slide-in-from-top-2 duration-150">
          <span>{snackbarMessage}</span>
          <button
            onClick={() => setSnackbarMessage(null)}
            className="rounded p-0.5 hover:bg-black/10"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
