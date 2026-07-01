import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { FloatingEnhancer } from "@/components/FloatingEnhancer";

import appCss from "../styles.css?url";

const NO_FLASH_THEME = `(function(){try{var t=localStorage.getItem('promptlb-theme');if(!t){t='dark';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PromptLB: Your AI Prompt Library" },
      {
        name: "description",
        content:
          "Discover, organize and share verified AI prompts for ChatGPT, Claude, Gemini, Midjourney and more.",
      },
      { name: "author", content: "PromptLB" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "PromptLB: Your AI Prompt Library" },
      { name: "twitter:title", content: "PromptLB: Your AI Prompt Library" },
      { property: "og:description", content: "PromptLB helps you turn simple ideas into powerful AI prompts, instantly." },
      { name: "twitter:description", content: "PromptLB helps you turn simple ideas into powerful AI prompts, instantly." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ea92135a-1a16-4c5f-8a48-5dba60779a2b/id-preview-098393e3--dc7b36a3-4b58-4157-8243-3a432988e595.lovable.app-1776836259587.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ea92135a-1a16-4c5f-8a48-5dba60779a2b/id-preview-098393e3--dc7b36a3-4b58-4157-8243-3a432988e595.lovable.app-1776836259587.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [{ children: NO_FLASH_THEME }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      <FloatingEnhancer />
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
}
