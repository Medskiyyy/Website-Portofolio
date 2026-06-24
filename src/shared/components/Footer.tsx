import React from "react";
import { Mail, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card/75 transition-colors duration-200">
      <div className="section-shell flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="order-2 text-sm text-muted-foreground md:order-1">
          &copy; {currentYear} Ahmad Hidayatullah. All rights reserved.
        </p>

        <div className="order-1 flex items-center gap-3 md:order-2">
          <a
            href="mailto:hidayatahmadd1377@gmail.com"
            className="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Email Address"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">hidayatahmadd1377@gmail.com</span>
          </a>
          <a
            href="https://github.com/Medskiyyy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
