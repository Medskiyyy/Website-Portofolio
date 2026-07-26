import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
      <div className="relative">
        <p className="mb-4 text-sm font-bold tracking-widest text-primary uppercase">404</p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 mb-10 max-w-sm text-base leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 cursor-pointer gap-2 px-5 text-sm font-semibold",
          )}
        >
          <Home className="h-4 w-4" />
          {t("cta")}
        </Link>
      </div>
    </main>
  );
}
