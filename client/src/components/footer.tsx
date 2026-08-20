import { Github } from "lucide-react";
import { SiInstagram, SiTelegram, SiLinkedin } from "react-icons/si";
import type { IconType } from "react-icons";
import { socialLinks, footerCopyright, type SocialIcon } from "@/content/profile";

const ICONS: Record<SocialIcon, IconType | typeof Github> = {
  github: Github,
  linkedin: SiLinkedin,
  instagram: SiInstagram,
  telegram: SiTelegram,
};

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-page flex-col gap-s3 px-gutter py-s5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-label uppercase text-ink-muted">
          {footerCopyright}
        </p>

        <ul className="flex items-center gap-s5">
          {socialLinks.map((link) => {
            const Icon = ICONS[link.icon];
            return (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-ink-muted transition-colors duration-150 hover:text-accent"
                  aria-label={link.name}
                  title={link.tooltip}
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
