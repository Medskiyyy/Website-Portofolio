import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ExternalLink, Github, BookOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FeaturedProjectSection() {
  const t = useTranslations("FeaturedProject");

  const techStack = ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"];

  return (
    <section className="w-full py-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            {t("label")}
          </h2>
          <p className="text-2xl font-bold text-foreground">{t("title")}</p>
        </div>

        {/* Featured Project Card */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          {/* Project Image */}
          <div className="relative w-full h-56 md:h-72 bg-muted overflow-hidden">
            <Image
              src="/thumb-pempek.png"
              alt="Pempek Cek Lis"
              fill
              priority
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Project Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-card-foreground mb-2">
                  Pempek Cek Lis
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("description")}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 md:min-w-[160px]">
                <a
                  href="https://pempekceklist.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "sm" }), "gap-2 w-full justify-center")}
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("liveDemo")}
                </a>
                <a
                  href="https://github.com/Medskiyyy/Website-Portofolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2 w-full justify-center")}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <Link
                  href="/projects/pempek-cek-lis"
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 w-full justify-center")}
                >
                  <BookOpen className="h-4 w-4" />
                  {t("caseStudy")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
