import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";

/** Section opener on the home page: a hairline, the heading, and an optional link on the right. */
export function SectionHeader({
  title,
  intro,
  action,
}: {
  title: string;
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal className="border-t border-border pt-6">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <h2 className="display max-w-3xl text-3xl leading-[1.1] text-balance sm:text-4xl">{title}</h2>
        {action}
      </div>
      {intro && (
        <p className="text-body mt-4 max-w-2xl text-base leading-relaxed text-pretty sm:text-[17px]">
          {intro}
        </p>
      )}
    </Reveal>
  );
}

/** Page opener for the inner pages: a soft label pill, a large title, optional lead and actions. */
export function PageHeader({
  label,
  title,
  subtitle,
  children,
}: {
  label: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="pb-12 md:pb-16">
      <span className="text-body inline-flex rounded-full bg-muted px-3 py-1.5 text-sm font-medium">
        {label}
      </span>
      <h1 className="display mt-6 max-w-4xl text-[2.75rem] leading-[1.05] text-balance sm:text-6xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-body mt-6 max-w-2xl text-lg leading-relaxed text-pretty">{subtitle}</p>
      )}
      {children}
    </Reveal>
  );
}

/** One row of a document-style page: heading on the left, content on the right. */
export function MarginSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal amount={0.1}>
      <section className="grid gap-5 border-t border-border py-10 md:grid-cols-12 md:gap-8 md:py-14">
        <h2 className="display text-xl leading-snug md:col-span-4">{title}</h2>
        <div className="md:col-span-8">{children}</div>
      </section>
    </Reveal>
  );
}
