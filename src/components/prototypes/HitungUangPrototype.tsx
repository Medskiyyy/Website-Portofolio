"use client";

import React, { useState } from "react";
import Image from "next/image";

export type HitungTab = "dashboard" | "transaksi" | "scan" | "akun" | "budget";
export type BudgetSubTab = "aktif" | "riwayat";

interface ScreenMeta {
  src: string;
  label: string;
  tab: HitungTab;
}

const SCREENS: Record<string, ScreenMeta> = {
  dashboard: {
    src: "/75a10438-5f47-4ce5-bf62-1682d349a46e.jpg",
    label: "Dashboard",
    tab: "dashboard",
  },
  transaksi: {
    src: "/195ca552-358e-41f3-934f-340aa9ac1f20.jpg",
    label: "Riwayat Transaksi",
    tab: "transaksi",
  },
  scan: {
    src: "/0b10a410-8ae5-4bb2-a875-016a6f0cc104.jpg",
    label: "Scan Struk (OCR)",
    tab: "scan",
  },
  akun: {
    src: "/49220d1e-85fb-4adb-a9c6-c438bafa1b02.jpg",
    label: "Akun & Dompet",
    tab: "akun",
  },
  "budget-aktif": {
    src: "/b7e42da1-ffba-4c1f-ba4a-d2fb98bd9d8e.jpg",
    label: "Anggaran Aktif",
    tab: "budget",
  },
  "budget-riwayat": {
    src: "/ce815785-81e7-4cb7-aa1c-04e700ce497f.jpg",
    label: "Riwayat Anggaran",
    tab: "budget",
  },
};

export default function HitungUangPrototype() {
  const [activeTab, setActiveTab] = useState<HitungTab>("dashboard");
  const [budgetSubTab, setBudgetSubTab] = useState<BudgetSubTab>("aktif");

  let currentKey = "dashboard";
  if (activeTab === "dashboard") {
    currentKey = "dashboard";
  } else if (activeTab === "transaksi") {
    currentKey = "transaksi";
  } else if (activeTab === "scan") {
    currentKey = "scan";
  } else if (activeTab === "akun") {
    currentKey = "akun";
  } else if (activeTab === "budget") {
    currentKey = budgetSubTab === "riwayat" ? "budget-riwayat" : "budget-aktif";
  }

  const currentScreen = SCREENS[currentKey] || SCREENS.dashboard;

  return (
    <div className="relative flex h-full w-full flex-col select-none overflow-hidden bg-white">
      {/* ================= SCREENSHOT DISPLAY ================= */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        <Image
          key={currentScreen.src}
          src={currentScreen.src}
          alt={`Tampilan Aplikasi HitungUang - ${currentScreen.label}`}
          fill
          priority
          sizes="(max-width: 768px) 300px, 360px"
          className="object-cover object-top transition-opacity duration-200"
        />

        {/* ================= INTERACTIVE HOTSPOTS / TOUCH TARGETS ================= */}

        {/* 1. BACK BUTTON ON SCAN SCREEN */}
        {activeTab === "scan" && (
          <button
            onClick={() => setActiveTab("dashboard")}
            className="absolute top-[6%] left-[4%] h-[6%] w-[12%] z-30 cursor-pointer"
            title="Kembali ke Dashboard"
          />
        )}

        {/* 2. SUB-TABS HOTSPOT ON BUDGET SCREEN (Aktif vs Riwayat) */}
        {activeTab === "budget" && (
          <div className="absolute top-[18%] left-0 right-0 h-[7%] z-30 flex">
            <button
              onClick={() => setBudgetSubTab("aktif")}
              className="flex-1 cursor-pointer"
              title="Anggaran Aktif"
            />
            <button
              onClick={() => setBudgetSubTab("riwayat")}
              className="flex-1 cursor-pointer"
              title="Riwayat Anggaran"
            />
          </div>
        )}

        {/* 3. BOTTOM NAVIGATION BAR HOTSPOTS (5 Tabs) */}
        {activeTab !== "scan" && (
          <div className="absolute bottom-0 left-0 right-0 h-[13%] z-30 flex">
            <button
              onClick={() => setActiveTab("dashboard")}
              className="flex-1 cursor-pointer"
              title="Dashboard"
            />
            <button
              onClick={() => setActiveTab("transaksi")}
              className="flex-1 cursor-pointer"
              title="Transaksi"
            />
            <button
              onClick={() => setActiveTab("scan")}
              className="flex-1 cursor-pointer"
              title="Scan Struk"
            />
            <button
              onClick={() => setActiveTab("akun")}
              className="flex-1 cursor-pointer"
              title="Akun & Dompet"
            />
            <button
              onClick={() => setActiveTab("budget")}
              className="flex-1 cursor-pointer"
              title="Anggaran / Budget"
            />
          </div>
        )}
      </div>
    </div>
  );
}
