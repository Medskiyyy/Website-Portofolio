import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";

/**
 * Section opener used on the home page: a heavy rule, a numbered label in the
 * left margin, and the heading plus intro in the main column — the same
 * margin-note layout a printed notebook or technical report uses.
 */
export function SectionHeader({
  number,
  label,
  title,
  intro,
}: {
  number: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="grid gap-4 border-t border-foreground pt-5 md:grid-cols-12 md:gap-8">
      <p className="eyebrow md:col-span-3">
        <span className="text-primary">§ {number}</span>
        <span className="mx-2" aria-hidden>
          /
        </span>
        {label}
      </p>
      <div className="md:col-span-9">
        <h2 className="display max-w-3xl text-3xl leading-[1.1] text-balance sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {intro && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground">
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/** Page opener for the inner pages: label, large serif title, optional lead and actions. */
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
    <Reveal className="border-b border-foreground pb-10 md:pb-14">
      <p className="eyebrow">{label}</p>
      <h1 className="display mt-5 max-w-4xl text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {subtitle}
        </p>
      )}
      {children}
    </Reveal>
  );
}

/** One row of a document-style page: heading in the margin, content in the main column. */
export function MarginSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal amount={0.1}>
      <section className="grid gap-4 border-b border-border py-10 md:grid-cols-12 md:gap-8 md:py-12">
        <h2 className="eyebrow md:col-span-3 md:pt-1">{title}</h2>
        <div className="md:col-span-9">{children}</div>
      </section>
    </Reveal>
  );
}
