import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 aurora-mesh opacity-70" />
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-60" />
      <div className="relative">
        <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
          Error 404
        </p>
        <h1 className="font-heading text-7xl font-bold tracking-tight text-gradient md:text-8xl">
          404
        </h1>
        <p className="mt-6 text-2xl font-semibold text-foreground mb-3">
          Page Not Found
        </p>
        <p className="mx-auto max-w-sm leading-relaxed text-muted-foreground mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "group h-11 cursor-pointer gap-2 px-4 text-sm",
          )}
        >
          <Home className="h-4 w-4 transition-transform duration-300 group-hover/button:scale-110" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
