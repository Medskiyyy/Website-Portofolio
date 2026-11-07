import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="flex flex-1 flex-col justify-center py-24">
      <div className="section-shell">
        <span className="text-body inline-flex rounded-full bg-muted px-3 py-1.5 text-sm font-medium tabular-nums">
          404
        </span>
        <h1 className="display mt-6 max-w-3xl text-5xl leading-[1.05] text-balance sm:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-6 mb-10 max-w-md text-lg leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
        <Link href="/" className="btn-pill btn-dark">
          <ArrowLeft className="h-4 w-4" />
          {t("cta")}
        </Link>
      </div>
    </main>
  );
}
