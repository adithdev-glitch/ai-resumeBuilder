import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-white border-t border-cv-slate-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-cv-slate-900 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-2 text-sm text-cv-slate-600">
            Start building for free. Upgrade only if you need unlimited AI assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl border border-cv-slate-200 p-8 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cv-slate-500">
                Community
              </span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-cv-slate-900">$0</span>
                <span className="text-xs text-cv-slate-500">forever</span>
              </div>
              <p className="text-xs text-cv-slate-600 mt-2">
                Everything you need to craft, preview, and export a clean resume.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-cv-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All 11+ ATS-friendly templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited PDF & DOCX exports</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Local autosave in browser</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>5 AI bullet rewrites included</span>
                </li>
              </ul>
            </div>

            <Link
              to="/templates"
              className="mt-8 w-full py-2.5 text-center text-xs font-semibold text-cv-slate-800 bg-cv-slate-100 hover:bg-cv-slate-200 rounded-xl transition-colors"
            >
              Start Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-white rounded-2xl border-2 border-cv-blue p-8 flex flex-col justify-between shadow-md relative">
            <div className="absolute -top-3 right-6 bg-cv-blue text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
              Full Access
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cv-blue">
                Professional
              </span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-cv-slate-900">$9</span>
                <span className="text-xs text-cv-slate-500">/ month</span>
              </div>
              <p className="text-xs text-cv-slate-600 mt-2">
                For active job seekers who want tailored resumes for every application.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-cv-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cv-blue shrink-0" />
                  <span>Unlimited AI bullet rewriting & tailoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cv-blue shrink-0" />
                  <span>Tailor to Job Description matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cv-blue shrink-0" />
                  <span>Save unlimited resume versions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cv-blue shrink-0" />
                  <span>Cloud autosave & multi-device sync</span>
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="mt-8 w-full py-2.5 text-center text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover rounded-xl shadow-sm transition-colors"
            >
              Get Pro Plan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
