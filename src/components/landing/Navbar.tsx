import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  LogOut,
  Sparkles,
  Play,
  Menu,
  X,
} from "lucide-react";

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = (profile?.display_name || profile?.username || user?.email || "?")
    .slice(0, 2)
    .toUpperCase();

  const goToEnhancer = () => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById("enhancer");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate({ to: "/", hash: "enhancer" } as never);
      // After navigation, attempt scroll
      setTimeout(() => {
        const el = document.getElementById("enhancer");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  };

  const navLinks = (
    <>
      <Link
        to="/library"
        onClick={() => setMobileOpen(false)}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Explore Prompts
      </Link>
      <Link
        to="/playground"
        onClick={() => setMobileOpen(false)}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Compare Prompts
      </Link>
      {user && (
        <Link
          to="/dashboard"
          onClick={() => setMobileOpen(false)}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4">
        <nav className="glass-strong rounded-2xl px-3 py-2.5 sm:px-5 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            <Link to="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
              <Logo size="sm" />
            </Link>

            <div className="hidden items-center gap-6 md:flex">
              {navLinks}
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center gap-1 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground">
                  More <ChevronDown className="h-3.5 w-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-44">
                  <DropdownMenuItem onClick={() => navigate({ to: "/tutorial" })}>
                    <BookOpen className="h-4 w-4" /> Tutorial
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/faq" })}>
                    <HelpCircle className="h-4 w-4" /> FAQ
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="hero"
                size="sm"
                className="hidden sm:inline-flex"
                onClick={goToEnhancer}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Enhance Prompt
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarFallback className="bg-gradient-primary text-xs font-semibold text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                      <span className="text-sm font-medium">
                        {profile?.display_name || "User"}
                      </span>
                      <span className="truncate text-xs font-normal text-muted-foreground">
                        {user.email}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}>
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate({ to: "/playground" })}>
                      <Play className="h-4 w-4" /> Compare Prompts
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate({ to: "/library" })}>
                      <Sparkles className="h-4 w-4" /> Explore Prompts
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut().then(() => navigate({ to: "/" }))}
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex"
                  onClick={() =>
                    navigate({ to: "/auth", search: { mode: "signin" } })
                  }
                >
                  Sign in
                </Button>
              )}

              <button
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((o) => !o)}
                className="ml-1 rounded-md border border-border bg-surface/60 p-1.5 md:hidden"
              >
                {mobileOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3 md:hidden">
              {navLinks}
              <Link
                to="/tutorial"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Tutorial
              </Link>
              <Link
                to="/faq"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                FAQ
              </Link>
              <Button
                variant="hero"
                size="sm"
                className="w-full justify-center"
                onClick={goToEnhancer}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Enhance Prompt
              </Button>
              {!user && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate({ to: "/auth", search: { mode: "signin" } });
                  }}
                >
                  Sign in
                </Button>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
