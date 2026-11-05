import React, { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 scroll-mt-24">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Support & Inquiries</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact Us
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
          Have an inquiry, feedback, or need developer support? Send our team a message.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B132B]/80 backdrop-blur-xl p-6 sm:p-8 shadow-sm dark:shadow-[0_0_30px_rgba(0,0,0,0.6)]">
        {/* Subtle accent glow in background */}
        <div
          className="absolute top-0 right-0 w-48 h-48 blur-3xl opacity-10 dark:opacity-15 pointer-events-none rounded-full"
          style={{ backgroundColor: 'var(--accent-color)' }}
        />

        {submitted ? (
          <div className="text-center py-8 space-y-3 relative z-10">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
              Message Sent
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              Thank you for reaching out. Our team will review your message promptly.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-accent bg-accent-hover transition-colors shadow-xs"
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-500/50 text-xs text-red-600 dark:text-red-300">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Developer Submission">App Submission</option>
                <option value="Feedback">Feedback / Suggestions</option>
                <option value="Copyright & DMCA">Copyright / DMCA Notice</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you?"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-accent bg-accent-hover transition-all flex items-center justify-center gap-2 focus:outline-none shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
