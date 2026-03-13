import { Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Building something exciting? Looking to collaborate? I'd love to hear from you.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Phone */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide text-xs">
              Phone
            </h3>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Singapore</p>
                <a
                  href="tel:+6580164894"
                  className="text-slate-800 dark:text-slate-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  +65 80164894
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide text-xs">
              Email
            </h3>
            <div className="space-y-3">
              {/* Primary — NUS */}
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">NUS (preferred)</p>
                  <a
                    href="mailto:arshin.sikka@u.nus.edu"
                    className="text-slate-800 dark:text-slate-200 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    arshin.sikka@u.nus.edu
                  </a>
                </div>
              </div>
              {/* Secondary — Personal */}
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Personal</p>
                  <a
                    href="mailto:sikka.arshin@gmail.com"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    sikka.arshin@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
