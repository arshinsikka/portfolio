import { Github } from "lucide-react";
import { SiInstagram, SiTelegram, SiLinkedin } from "react-icons/si";
import type { IconType } from "react-icons";
import { Container } from "@/components/section";
import { socialLinks, footerCopyright, type SocialIcon } from "@/content/profile";

const ICONS: Record<SocialIcon, IconType | typeof Github> = {
  github: Github,
  linkedin: SiLinkedin,
  instagram: SiInstagram,
  telegram: SiTelegram,
};

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <Container width="wide" className="py-8">

        {/* Social Links */}
        <div className="flex justify-center items-center space-x-6 mb-6">
          {socialLinks.map((link, index) => {
            const IconComponent = ICONS[link.icon];
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-slate-600 dark:text-slate-400 ${link.color} transition-colors duration-300`}
                aria-label={link.name}
                title={link.tooltip}
              >
                <IconComponent className="w-6 h-6" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {footerCopyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
