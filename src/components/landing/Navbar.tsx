import { Link, useNavigate } from "@tanstack/react-router";
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
import { Crown, LayoutDashboard, LogOut, Sparkles, User } from "lucide-react";

export function Navbar() {
  const { user, profile, isPro, signOut } = useAuth();
  const navigate = useNavigate();

  const initials = (profile?.display_name || profile?.username || user?.email || "?")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <nav className="glass-strong flex items-center justify-between rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link
              to="/library"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Library
            </Link>
            <Link
              to="/pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {!isPro && user && (
              <Button
                size="sm"
                className="bg-gradient-pro text-amber-950 hover:opacity-90 hidden sm:inline-flex"
                onClick={() => navigate({ to: "/pricing" })}
              >
                <Crown className="h-3.5 w-3.5" />
                Upgrade
              </Button>
            )}
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
                    <span className="text-xs font-normal text-muted-foreground truncate">
                      {user.email}
                    </span>
                    {isPro && (
                      <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-md bg-gradient-pro px-1.5 py-0.5 text-[10px] font-bold text-amber-950">
                        <Crown className="h-2.5 w-2.5" /> PRO
                      </span>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}>
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/library" })}>
                    <Sparkles className="h-4 w-4" /> Browse library
                  </DropdownMenuItem>
                  {!isPro && (
                    <DropdownMenuItem onClick={() => navigate({ to: "/pricing" })}>
                      <Crown className="h-4 w-4" /> Upgrade to Pro
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut().then(() => navigate({ to: "/" }))}>
                    <LogOut className="h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex"
                  onClick={() => navigate({ to: "/auth", search: { mode: "signin" } })}
                >
                  Sign in
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => navigate({ to: "/auth", search: { mode: "signup" } })}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
