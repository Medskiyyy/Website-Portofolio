"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export default function CopyEmailButton({ className }: { className?: string }) {
  const t = useTranslations("ContactPreview");
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      window.location.href = `mailto:${profile.email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button type="button" onClick={copy} className={cn("btn-pill btn-outline relative", className)}>
      <span
        role="status"
        className={cn(
          "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg bg-foreground px-2.5 py-1.5 text-[13px] font-medium whitespace-nowrap text-background transition-[opacity,transform] duration-200",
          copied ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0",
        )}
      >
        {copied ? t("copiedToast") : ""}
      </span>
      {copied ? t("copiedEmail") : t("copyEmail")}
    </button>
  );
}
