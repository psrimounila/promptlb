import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <nav className="glass-strong flex items-center justify-between rounded-2xl px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Prompt<span className="text-gradient-primary">LB</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#categories"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Categories
            </a>
            <a
              href="#playground"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Playground
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
