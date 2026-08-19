import { Phone, Mail } from "lucide-react";
import { Section } from "@/components/section";
import { contact } from "@/content/profile";

export default function Contact() {
  return (
    <Section
      tone="tinted"
      width="narrow"
      heading={contact.heading}
      subtitle={contact.subtitle}
    >
      {/* Contact Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Phone */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide text-xs">
            {contact.phone.heading}
          </h3>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{contact.phone.label}</p>
              <a
                href={contact.phone.href}
                className="text-slate-800 dark:text-slate-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {contact.phone.display}
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide text-xs">
            {contact.email.heading}
          </h3>
          <div className="space-y-3">
            {/* Primary — NUS */}
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{contact.email.primary.label}</p>
                <a
                  href={contact.email.primary.href}
                  className="text-slate-800 dark:text-slate-200 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {contact.email.primary.address}
                </a>
              </div>
            </div>
            {/* Secondary — Personal */}
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{contact.email.secondary.label}</p>
                <a
                  href={contact.email.secondary.href}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {contact.email.secondary.address}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
