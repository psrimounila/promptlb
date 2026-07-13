import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
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
  Wand2,
  BookOpen,
  Play,
  Menu,
  X,
  Shield,
  Users,
} from "lucide-react";


export function Navbar() {
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = (profile?.display_name || profile?.username || user?.email || "?")
    .slice(0, 2)
    .toUpperCase();

  const focusEnhancer = () => {
    const el = document.querySelector<HTMLTextAreaElement>('[data-enhancer-input]');
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => el.focus(), 400);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToEnhancer = () => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      focusEnhancer();
    } else {
      navigate({ to: "/" });
      setTimeout(focusEnhancer, 300);
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
        Test Prompts
      </Link>
      <Link
  to="/community"
  onClick={() => setMobileOpen(false)}
  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
>
  <Users className="h-4 w-4" />
  Community
</Link>
      <Link
        to="/tutorial"
        onClick={() => setMobileOpen(false)}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        How It Works
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
      {isAdmin && (
        <Link
          to="/admin"
          onClick={() => setMobileOpen(false)}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          <Shield className="h-3.5 w-3.5" /> Admin Dashboard
        </Link>
      )}

    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <nav>
          <div className="flex items-center justify-between gap-2">
            <Link to="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
              <Logo size="sm" />
            </Link>

            <div className="hidden items-center gap-7 md:flex">
              {navLinks}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                size="sm"
                className="hidden bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex"
                onClick={goToEnhancer}
              >
                <Wand2 className="h-3.5 w-3.5" />
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
                      <Play className="h-4 w-4" /> Test Prompts
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate({ to: "/library" })}>
                      <BookOpen className="h-4 w-4" /> Explore Prompts
                    </DropdownMenuItem>
                    <DropdownMenuItem
  onClick={() => navigate({ to: "/community" })}
>
  <Users className="h-4 w-4" />
  Community
</DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => navigate({ to: "/admin" })}>
                        <Shield className="h-4 w-4" /> Admin Dashboard
                      </DropdownMenuItem>
                    )}

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
              {/* mobile extras handled inline in navLinks */}
              <Button
                variant="hero"
                size="sm"
                className="w-full justify-center"
                onClick={goToEnhancer}
              >
                <Wand2 className="h-3.5 w-3.5" />
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
