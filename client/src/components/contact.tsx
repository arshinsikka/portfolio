import { Phone, Mail, Github, ExternalLink } from "lucide-react";

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
            If you're building something exciting, want to collaborate, or just want to say hi — I'd love to hear from you.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Phone Numbers */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Phone</h3>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Singapore</p>
                <a 
                  href="tel:+6580164894" 
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  +65 80164894
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">India</p>
                <a 
                  href="tel:+919818298925" 
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  +91 9818298925
                </a>
              </div>
            </div>
          </div>

          {/* Email Addresses */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Email</h3>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">NUS Email</p>
                <a 
                  href="mailto:e1186295@u.nus.edu" 
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  e1186295@u.nus.edu
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Personal Email</p>
                <a 
                  href="mailto:sikka.arshin@gmail.com" 
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  sikka.arshin@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Links</h3>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="https://github.com/arshinsikka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <a 
              href="https://lectureai.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Lecture AI Website</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}