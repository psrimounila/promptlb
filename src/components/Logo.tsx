import logoSrc from "@/assets/promptlb-logo.png";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showText = true,
  size = "md",
}: {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: { img: "h-7 w-7", text: "text-base" },
    md: { img: "h-9 w-9", text: "text-lg" },
    lg: { img: "h-12 w-12", text: "text-2xl" },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src={logoSrc}
        alt="PromptLB logo"
        className={cn(s.img, "object-contain drop-shadow-[0_0_18px_oklch(0.66_0.16_265/0.45)]")}
      />
      {showText && (
        <span className={cn("font-bold tracking-tight", s.text)}>
          Prompt<span className="text-gradient-primary">LB</span>
        </span>
      )}
    </div>
  );
}
