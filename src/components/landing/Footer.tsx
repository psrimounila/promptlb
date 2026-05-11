import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { SocialDock } from "@/components/SocialDock";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo />

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground sm:gap-x-8">
            <Link to="/library" className="transition-colors hover:text-foreground">
              Explore Prompts
            </Link>
            <Link to="/playground" className="transition-colors hover:text-foreground">
              Test Prompts
            </Link>
            <Link to="/tutorial" className="transition-colors hover:text-foreground">
              How It Works
            </Link>
            <Link to="/faq" className="transition-colors hover:text-foreground">
              FAQ
            </Link>
            <Link to="/dashboard" className="transition-colors hover:text-foreground">
              Dashboard
            </Link>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <SocialDock />
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} PromptLB. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
