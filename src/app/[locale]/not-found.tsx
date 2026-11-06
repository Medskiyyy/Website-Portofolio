import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="flex flex-1 flex-col justify-center py-24">
      <div className="section-shell">
        <p className="eyebrow">
          <span className="text-primary">404</span>
        </p>
        <h1 className="display mt-5 max-w-3xl text-5xl leading-[1.02] text-balance sm:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-6 mb-10 max-w-md text-lg leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 cursor-pointer gap-2 px-5 text-sm font-medium",
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          {t("cta")}
        </Link>
      </div>
    </main>
  );
}
