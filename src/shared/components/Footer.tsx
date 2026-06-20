import React from "react";
import { Mail, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 py-8 px-6 md:flex-row md:px-8">
        {/* Copyright */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 order-2 md:order-1">
          &copy; {currentYear} Ahmad Hidayatullah. All rights reserved.
        </p>

        {/* Contact Links */}
        <div className="flex items-center gap-6 order-1 md:order-2">
          <a
            href="mailto:contact@ahmadhidayatullah.com" // You can substitute with user email later or keep generic
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
            aria-label="Email Address"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">contact@ahmadhidayatullah.com</span>
          </a>
          <a
            href="https://github.com" // Update when GitHub profile is set up
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
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
