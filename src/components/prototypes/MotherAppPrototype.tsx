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
    src: "/42681f53-0734-4d58-b2ee-bc6ba563940c.jpg",
    label: "Dashboard",
    tab: "dashboard",
    subLabel: "Ringkasan Streak, Target & Deadline",
  },
  "dashboard-bottom": {
    src: "/3a1b286d-8e17-4a83-8652-a0a99c9b87b2.jpg",
    label: "Dashboard (Aksi Cepat)",
    tab: "dashboard",
    subLabel: "Jadwal & Tombol Aksi",
  },
  calendar: {
    src: "/e66a7f8c-b2a7-4147-840d-9a4167745969.jpg",
    label: "Kalender",
    tab: "calendar",
    subLabel: "Matrix Tanggal & Indikator Streak",
  },
  "tasks-active": {
    src: "/7fd2f321-54ef-4b23-b91c-8e73f0f0c537.jpg",
    label: "Tugas Aktif",
    tab: "tasks",
    subLabel: "Daftar Tugas & Status Prioritas",
  },
  "tasks-completed": {
    src: "/a4202737-e289-4003-a321-45eeaf37f973.jpg",
    label: "Tugas Selesai",
    tab: "tasks",
    subLabel: "Tugas yang Telah Selesai",
  },
  "progress-habits": {
    src: "/5ab3f293-ff45-4023-a3a1-ec34328ffb97.jpg",
    label: "Kebiasaan",
    tab: "progress",
    subLabel: "Daftar Kebiasaan & Rutinitas",
  },
  "progress-study": {
    src: "/767a6a9d-eaa1-434c-996b-bf20e3dbc538.jpg",
    label: "Riwayat Belajar",
    tab: "progress",
    subLabel: "Total Jam & Sesi Belajar",
  },
  "progress-stats": {
    src: "/267a4d06-4edd-45ff-a376-ce2ef42704e3.jpg",
    label: "Statistik",
    tab: "progress",
    subLabel: "Metrik Produktivitas Periode",
  },
  "progress-heatmap": {
    src: "/0a343842-8817-4182-96e3-235e8e95b513.jpg",
    label: "Heatmap",
    tab: "progress",
    subLabel: "Matriks Konsistensi 16 Minggu",
  },
  "progress-achieve": {
    src: "/e7fe28fa-bf70-46ed-8beb-893612ea485c.jpg",
    label: "Pencapaian",
    tab: "progress",
    subLabel: "Badges & Target Prestasi",
  },
  settings: {
    src: "/0c31c108-5d56-4cdd-97ad-6f4ac9da8244.jpg",
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
            className="absolute bottom-[16%] right-4 z-30 flex items-center gap-1.5 rounded-full border-[1.5px] border-black bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[9px] font-black text-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
            title="Gulir Tampilan Dashboard"
          >
            <span>{dashboardScroll === "top" ? "⬇ Lihat Bawah" : "⬆ Lihat Atas"}</span>
          </button>
        )}

        {/* 4. BOTTOM NAVIGATION BAR HOTSPOTS (5 Tabs) */}
        <div className="absolute bottom-0 left-0 right-0 h-[14%] z-30 flex">
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

      {/* ================= TOP INTERACTIVE SUB-NAV CONTROLLER ================= */}
      {/* Provides a clear UI controller so users can easily tap specific sub-screens */}
      {activeTab === "progress" && (
        <div className="absolute top-8 left-2 right-2 z-40 flex items-center justify-between gap-1 overflow-x-auto rounded-[10px] border-[2px] border-black bg-white/95 p-1 shadow-[2px_2px_0px_#000000] backdrop-blur-xs scrollbar-none">
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
                "rounded-[6px] px-2 py-0.5 text-[9px] font-black transition-all whitespace-nowrap cursor-pointer",
                progressSubTab === sub.id
                  ? "bg-[#FFD43F] text-black shadow-[1px_1px_0px_#000000]"
                  : "text-zinc-700 hover:bg-zinc-100",
              )}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      {activeTab === "tasks" && (
        <div className="absolute top-8 left-12 right-12 z-40 flex items-center justify-center gap-1.5 rounded-[10px] border-[2px] border-black bg-white/95 p-1 shadow-[2px_2px_0px_#000000] backdrop-blur-xs">
          <button
            onClick={() => setTasksSubTab("active")}
            className={cn(
              "flex-1 rounded-[6px] py-0.5 text-[10px] font-black transition-all cursor-pointer",
              tasksSubTab === "active"
                ? "bg-[#FFD43F] text-black shadow-[1px_1px_0px_#000000]"
                : "text-zinc-700 hover:bg-zinc-100",
            )}
          >
            Aktif
          </button>
          <button
            onClick={() => setTasksSubTab("completed")}
            className={cn(
              "flex-1 rounded-[6px] py-0.5 text-[10px] font-black transition-all cursor-pointer",
              tasksSubTab === "completed"
                ? "bg-[#FFD43F] text-black shadow-[1px_1px_0px_#000000]"
                : "text-zinc-700 hover:bg-zinc-100",
            )}
          >
            Selesai
          </button>
        </div>
      )}

      {/* ================= INTERACTIVE HINT BADGE ================= */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <span className="inline-flex items-center gap-1 rounded-full border border-black/40 bg-black/75 px-2.5 py-0.5 text-[8px] font-black tracking-wider text-white uppercase backdrop-blur-xs shadow-xs">
          Interactive Live Preview
        </span>
      </div>
    </div>
  );
}
