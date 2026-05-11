import { Linkedin, Instagram } from "lucide-react";

export function SocialDock() {
  const links = [
    {
      href: "https://www.linkedin.com/company/promptlb",
      label: "LinkedIn",
      Icon: Linkedin,
    },
    {
      href: "https://www.instagram.com/promptlb_app?igsh=MTVoNmlnb21neDByOQ==",
      label: "Instagram",
      Icon: Instagram,
    },
  ];

  return (
    <div className="flex flex-row gap-2">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground shadow-elegant transition-all hover:-translate-y-0.5 hover:text-primary-glow hover:shadow-glow"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
