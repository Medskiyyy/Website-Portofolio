import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        404
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
        Page Not Found
      </h1>
      <p className="text-muted-foreground max-w-sm leading-relaxed mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className={cn(buttonVariants(), "gap-2")}>
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </main>
  );
}
