import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Prompt<span className="text-gradient-primary">LB</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Library
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Blog
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Contact
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
