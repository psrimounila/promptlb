import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, MailCheck } from "lucide-react";

const search = z.object({
  mode: z.enum(["signin", "signup"]).catch("signin"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Sign in · PromptLB" },
      { name: "description", content: "Sign in or create your free PromptLB account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSignUp, setIsSignUp] = useState(mode === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [resending, setResending] = useState(false);

  const getPostAuthDestination = (): "/breakdown" | "/dashboard" => {
    try {
      const dest = sessionStorage.getItem("promptlb:post-auth-redirect");
      if (dest === "/breakdown") return "/breakdown";
    } catch {}
    return "/dashboard";
  };

  useEffect(() => setIsSignUp(mode === "signup"), [mode]);
  useEffect(() => {
    if (user) {
      const dest = getPostAuthDestination();
      try {
        sessionStorage.removeItem("promptlb:post-auth-redirect");
      } catch {}
      navigate({ to: dest });
    }
  }, [user, navigate]);

  const resendConfirmation = async () => {
    if (!email) return toast.error("Enter your email first");
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth?mode=signin` },
      });
      if (error) throw error;
      toast.success("Confirmation email resent. Check your inbox.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not resend");
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNeedsConfirmation(false);
    try {
      if (isSignUp) {
        const redirectUrl = `${window.location.origin}/auth?mode=signin`;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: { display_name: displayName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Welcome to PromptLB!");
          navigate({ to: getPostAuthDestination() });
        } else {
          setNeedsConfirmation(true);
          toast.success("Check your email to confirm your account.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          const msg = error.message.toLowerCase();
          if (msg.includes("email not confirmed") || msg.includes("not confirmed")) {
            setNeedsConfirmation(true);
            toast.error("Email not confirmed yet. Click the link in your inbox, then try again.");
            return;
          }
          throw error;
        }
        toast.success("Welcome back!");
        navigate({ to: getPostAuthDestination() });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-hero opacity-50" />
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex justify-center sm:mb-8">
          <Logo size="lg" />
        </Link>

        <div className="glass-strong rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignUp
              ? "Start building your prompt library. Free forever."
              : "Sign in to access your prompts and history."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isSignUp && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Display name</Label>
                <Input
                  id="name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Jane Doe"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {needsConfirmation && (
              <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs">
                <MailCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Confirm your email to continue.</p>
                  <p className="mt-0.5 text-muted-foreground">
                    We sent a confirmation link to <span className="font-medium text-foreground">{email}</span>. After you click it, come back and sign in.
                  </p>
                  <button
                    type="button"
                    onClick={resendConfirmation}
                    disabled={resending}
                    className="mt-1.5 font-medium text-primary underline-offset-4 hover:underline disabled:opacity-60"
                  >
                    {resending ? "Resending…" : "Resend confirmation email"}
                  </button>
                </div>
              </div>
            )}

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSignUp ? "Create account" : "Sign in"}
            </Button>
          </form>


          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() =>
                navigate({ to: "/auth", search: { mode: isSignUp ? "signin" : "signup" } })
              }
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {isSignUp ? "Sign in" : "Sign up free"}
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
