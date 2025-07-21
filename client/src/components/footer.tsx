import { Github } from "lucide-react";
import { SiInstagram, SiTelegram, SiLinkedin, SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/arshinsikka",
      icon: SiInstagram,
      color: "hover:text-pink-600"
    },
    {
      name: "Telegram",
      url: "https://t.me/arshinsikka",
      icon: SiTelegram,
      color: "hover:text-blue-500"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/arshin-sikka",
      icon: SiLinkedin,
      color: "hover:text-blue-700"
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/917011873972",
      icon: SiWhatsapp,
      color: "hover:text-green-600"
    },
    {
      name: "GitHub",
      url: "https://github.com/arshinsikka",
      icon: Github,
      color: "hover:text-slate-900"
    }
  ];

  return (
    <footer className="bg-slate-100 border-t border-slate-200">
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
                className={`text-slate-600 ${link.color} transition-colors duration-300`}
                aria-label={link.name}
              >
                <IconComponent className="w-6 h-6" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-slate-500">
            © 2025 Arshin Sikka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}