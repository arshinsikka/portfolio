import { Github } from "lucide-react";
import { SiInstagram, SiTelegram, SiLinkedin } from "react-icons/si";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/arshinsikka",
      icon: Github,
      color: "hover:text-slate-900 dark:hover:text-slate-300",
      tooltip: "View my GitHub"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/arshin-sikka",
      icon: SiLinkedin,
      color: "hover:text-blue-700 dark:hover:text-blue-400",
      tooltip: "Connect on LinkedIn"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/arshinsikka",
      icon: SiInstagram,
      color: "hover:text-pink-600 dark:hover:text-pink-400",
      tooltip: "Follow on Instagram"
    },
    {
      name: "Telegram",
      url: "https://t.me/arshinsikka",
      icon: SiTelegram,
      color: "hover:text-sky-500 dark:hover:text-sky-400",
      tooltip: "Message on Telegram"
    },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Social Links */}
        <div className="flex justify-center items-center space-x-6 mb-6">
          {socialLinks.map((link, index) => {
            const IconComponent = link.icon;
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
            © 2026 Arshin Sikka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}