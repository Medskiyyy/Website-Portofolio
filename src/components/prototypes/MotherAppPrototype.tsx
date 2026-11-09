"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ============================================================================
// REAL APPLICATION SCREENSHOT MAPPINGS (Extracted from Mother Android Device)
// ============================================================================

export type MainTab = "dashboard" | "calendar" | "tasks" | "progress" | "settings";
export type TasksSubTab = "active" | "completed";
export type ProgressSubTab = "habits" | "study" | "stats" | "heatmap" | "achieve";

interface ScreenMeta {
  src: string;
  label: string;
  tab: MainTab;
  subLabel?: string;
}

const SCREENS: Record<string, ScreenMeta> = {
  dashboard: {
    src: "/screens/mother-dashboard.jpg",
    label: "Dashboard",
    tab: "dashboard",
    subLabel: "Ringkasan Streak, Target & Deadline",
  },
  "dashboard-bottom": {
    src: "/screens/mother-dashboard-bottom.jpg",
    label: "Dashboard (Aksi Cepat)",
    tab: "dashboard",
    subLabel: "Jadwal & Tombol Aksi",
  },
  calendar: {
    src: "/screens/mother-calendar.jpg",
    label: "Kalender",
    tab: "calendar",
    subLabel: "Matrix Tanggal & Indikator Streak",
  },
  "tasks-active": {
    src: "/screens/mother-tasks-active.jpg",
    label: "Tugas Aktif",
    tab: "tasks",
    subLabel: "Daftar Tugas & Status Prioritas",
  },
  "tasks-completed": {
    src: "/screens/mother-tasks-completed.jpg",
    label: "Tugas Selesai",
    tab: "tasks",
    subLabel: "Tugas yang Telah Selesai",
  },
  "progress-habits": {
    src: "/screens/mother-progress-habits.jpg",
    label: "Kebiasaan",
    tab: "progress",
    subLabel: "Daftar Kebiasaan & Rutinitas",
  },
  "progress-study": {
    src: "/screens/mother-progress-study.jpg",
    label: "Riwayat Belajar",
    tab: "progress",
    subLabel: "Total Jam & Sesi Belajar",
  },
  "progress-stats": {
    src: "/screens/mother-progress-stats.jpg",
    label: "Statistik",
    tab: "progress",
    subLabel: "Metrik Produktivitas Periode",
  },
  "progress-heatmap": {
    src: "/screens/mother-progress-heatmap.jpg",
    label: "Heatmap",
    tab: "progress",
    subLabel: "Matriks Konsistensi 16 Minggu",
  },
  "progress-achieve": {
    src: "/screens/mother-progress-achieve.jpg",
    label: "Pencapaian",
    tab: "progress",
    subLabel: "Badges & Target Prestasi",
  },
  settings: {
    src: "/screens/mother-settings.jpg",
    label: "Pengaturan",
    tab: "settings",
    subLabel: "Tema, Backup & Info Aplikasi",
  },
};

export default function MotherAppPrototype() {
  const [activeTab, setActiveTab] = useState<MainTab>("dashboard");
  const [tasksSubTab, setTasksSubTab] = useState<TasksSubTab>("active");
  const [progressSubTab, setProgressSubTab] = useState<ProgressSubTab>("habits");
  const [dashboardScroll, setDashboardScroll] = useState<"top" | "bottom">("top");

  // Determine which real screenshot to display
  let currentKey = "dashboard";
  if (activeTab === "dashboard") {
    currentKey = dashboardScroll === "bottom" ? "dashboard-bottom" : "dashboard";
  } else if (activeTab === "calendar") {
    currentKey = "calendar";
  } else if (activeTab === "tasks") {
    currentKey = tasksSubTab === "completed" ? "tasks-completed" : "tasks-active";
  } else if (activeTab === "progress") {
    currentKey = `progress-${progressSubTab}`;
  } else if (activeTab === "settings") {
    currentKey = "settings";
  }

  const currentScreen = SCREENS[currentKey] || SCREENS.dashboard;

  return (
    <div className="relative flex h-full w-full flex-col select-none overflow-hidden bg-[#FAF7F2]">
      {/* ================= SCREENSHOT DISPLAY ================= */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        <Image
          key={currentScreen.src}
          src={currentScreen.src}
          alt={`Tampilan Aplikasi Mother - ${currentScreen.label}`}
          fill
          priority
          sizes="(max-width: 768px) 300px, 360px"
          className="object-cover object-top transition-opacity duration-200"
        />

        {/* ================= INTERACTIVE HOTSPOTS / TOUCH TARGETS ================= */}

        {/* 1. TOP SUB-TABS HOTSPOT FOR TUGAS (Aktif vs Selesai) */}
        {activeTab === "tasks" && (
          <div className="absolute top-[18%] left-0 right-0 h-[8%] z-30 flex">
            <button
              onClick={() => setTasksSubTab("active")}
              className="flex-1 cursor-pointer"
              title="Lihat Tugas Aktif"
            />
            <button
              onClick={() => setTasksSubTab("completed")}
              className="flex-1 cursor-pointer"
              title="Lihat Tugas Selesai"
            />
          </div>
        )}

        {/* 2. TOP SUB-TABS HOTSPOT FOR PROGRES (5 Sub-tabs) */}
        {activeTab === "progress" && (
          <div className="absolute top-[6%] left-0 right-0 h-[6%] z-30 flex">
            <button
              onClick={() => setProgressSubTab("habits")}
              className="w-[22%] cursor-pointer"
              title="Kebiasaan"
            />
            <button
              onClick={() => setProgressSubTab("study")}
              className="w-[18%] cursor-pointer"
              title="Belajar"
            />
            <button
              onClick={() => setProgressSubTab("stats")}
              className="w-[20%] cursor-pointer"
              title="Statistik"
            />
            <button
              onClick={() => setProgressSubTab("heatmap")}
              className="w-[20%] cursor-pointer"
              title="Heatmap"
            />
            <button
              onClick={() => setProgressSubTab("achieve")}
              className="w-[20%] cursor-pointer"
              title="Pencapaian"
            />
          </div>
        )}

        {/* 3. DASHBOARD SCROLL TOGGLE HOTSPOT */}
        {activeTab === "dashboard" && (
          <button
            onClick={() =>
              setDashboardScroll((prev) => (prev === "top" ? "bottom" : "top"))
            }
            className="absolute bottom-[16%] left-4 z-30 flex items-center gap-1.5 rounded-full border-[1.5px] border-black bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[9px] font-black text-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
            title="Gulir Tampilan Dashboard"
          >
            <span>{dashboardScroll === "top" ? "⬇ Lihat Bawah" : "⬆ Lihat Atas"}</span>
          </button>
        )}

        {/* 4. BOTTOM NAVIGATION BAR HOTSPOTS (5 Tabs) */}
        <div className="absolute bottom-0 left-0 right-0 h-[13%] z-30 flex">
          <button
            onClick={() => {
              setActiveTab("dashboard");
              setDashboardScroll("top");
            }}
            className="flex-1 cursor-pointer"
            title="Tab Dashboard"
          />
          <button
            onClick={() => setActiveTab("calendar")}
            className="flex-1 cursor-pointer"
            title="Tab Kalender"
          />
          <button
            onClick={() => setActiveTab("tasks")}
            className="flex-1 cursor-pointer"
            title="Tab Tugas"
          />
          <button
            onClick={() => setActiveTab("progress")}
            className="flex-1 cursor-pointer"
            title="Tab Progres"
          />
          <button
            onClick={() => setActiveTab("settings")}
            className="flex-1 cursor-pointer"
            title="Tab Pengaturan"
          />
        </div>
      </div>
    </div>
  );
}
