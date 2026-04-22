import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo />

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <Link to="/library" className="transition-colors hover:text-foreground">
              Library
            </Link>
            <Link to="/pricing" className="transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link to="/dashboard" className="transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PromptLB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
