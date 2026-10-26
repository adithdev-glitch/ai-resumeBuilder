import React from 'react';
import {
  FileText,
  Cpu,
  Sparkles,
  FileDown,
  Check,
  Undo2,
  Redo2,
  AlignLeft,
  Bold,
  Italic,
  Underline,
  Share2,
  Download,
  MousePointer2,
} from 'lucide-react';

export default function FeatureMockupSection() {
  return (
    <section id="features" className="py-20 lg:py-28 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Headings */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-cv-slate-900 tracking-tight">
            Why Choose Our AI Resume Builder?
          </h2>
          <p className="mt-3 text-base text-cv-slate-600">
            Smart Features to Elevate Your Job Application
          </p>
        </div>

        {/* Laptop Mockup with 4 Floating Feature Cards */}
        <div className="relative max-w-5xl mx-auto">
          {/* Card 1: Top-Left (ATS-Friendly Templates) */}
          <div className="hidden lg:flex absolute -left-12 top-6 z-20 w-80 bg-white p-5 rounded-2xl border border-cv-slate-200/90 shadow-float flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-cv-blue-50 border border-cv-blue-border flex items-center justify-center text-cv-blue">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-cv-slate-900">ATS-Friendly Templates</h3>
              <p className="text-xs text-cv-slate-500 mt-1 leading-relaxed">
                Ensure your resume passes Applicant Tracking Systems effortlessly
              </p>
            </div>
          </div>

          {/* Card 2: Bottom-Left (AI-Powered Suggestions) */}
          <div className="hidden lg:flex absolute -left-16 bottom-16 z-20 w-80 bg-white p-5 rounded-2xl border border-cv-slate-200/90 shadow-float flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-cv-blue-50 border border-cv-blue-border flex items-center justify-center text-cv-blue">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-cv-slate-900">AI-Powered Suggestions</h3>
              <p className="text-xs text-cv-slate-500 mt-1 leading-relaxed">
                Get real-time recommendations to improve wording and structure.
              </p>
            </div>
          </div>

          {/* Card 3: Top-Right (Instant Feedback) */}
          <div className="hidden lg:flex absolute -right-12 top-10 z-20 w-80 bg-white p-5 rounded-2xl border border-cv-slate-200/90 shadow-float flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-cv-blue-50 border border-cv-blue-border flex items-center justify-center text-cv-blue">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-cv-slate-900">Instant Feedback</h3>
              <p className="text-xs text-cv-slate-500 mt-1 leading-relaxed">
                AI analyzes and scores your resume for maximum impact.
              </p>
            </div>
          </div>

          {/* Card 4: Bottom-Right (Export in Multiple Formats) */}
          <div className="hidden lg:flex absolute -right-16 bottom-12 z-20 w-80 bg-white p-5 rounded-2xl border border-cv-slate-200/90 shadow-float flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-cv-blue-50 border border-cv-blue-border flex items-center justify-center text-cv-blue">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-cv-slate-900">Export in Multiple Formats</h3>
              <p className="text-xs text-cv-slate-500 mt-1 leading-relaxed">
                Download in PDF, DOCX, or share online with ease.
              </p>
            </div>
          </div>

          {/* Laptop Frame Container */}
          <div className="relative mx-auto w-full max-w-4xl bg-[#1E242B] p-3 sm:p-4 rounded-t-3xl shadow-2xl border-t border-x border-slate-700">
            {/* Laptop Camera dot */}
            <div className="flex justify-center mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-900/60" />
              </div>
            </div>

            {/* Laptop Screen */}
            <div className="bg-white rounded-lg overflow-hidden border border-slate-300 shadow-inner text-[10px] sm:text-xs">
              {/* Screen Top Bar */}
              <div className="h-9 bg-cv-slate-50 border-b border-cv-slate-200 px-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-cv-slate-800">Resume</span>
                  <div className="flex items-center text-cv-slate-400 gap-1 ml-4">
                    <Undo2 className="w-3 h-3" />
                    <Redo2 className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] text-cv-slate-600 ml-3">100% ▾</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-2.5 py-1 text-[11px] font-semibold text-cv-blue bg-white border border-cv-blue-border rounded">
                    Download
                  </button>
                  <button className="px-2.5 py-1 text-[11px] font-semibold text-white bg-cv-blue rounded">
                    Share
                  </button>
                </div>
              </div>

              {/* Screen Split Layout */}
              <div className="grid grid-cols-12 h-[380px] sm:h-[440px] bg-cv-slate-100 overflow-hidden">
                {/* Left Form Pane */}
                <div className="col-span-4 bg-white border-r border-cv-slate-200 p-3 overflow-y-auto space-y-3">
                  <div className="flex justify-between items-center py-1 border-b border-cv-slate-100 font-semibold text-cv-slate-800">
                    <span>Personal Detail</span>
                    <span className="text-cv-slate-400">+</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center font-semibold text-cv-slate-800">
                      <span>Professional Summary</span>
                      <span className="text-cv-slate-400">−</span>
                    </div>
                    <p className="text-[9px] text-cv-slate-400">
                      Write a brief, engaging summary of your role, achievements, and key skills.
                    </p>

                    {/* Editor Toolbar */}
                    <div className="flex items-center gap-1.5 text-cv-slate-600 bg-cv-slate-50 p-1 rounded border border-cv-slate-200">
                      <Bold className="w-3 h-3" />
                      <Italic className="w-3 h-3" />
                      <Underline className="w-3 h-3" />
                      <AlignLeft className="w-3 h-3 ml-2" />
                    </div>

                    <div className="relative">
                      <div className="p-2 border border-cv-slate-200 rounded text-[9px] text-cv-slate-700 leading-snug bg-cv-slate-50">
                        Passionate UI/UX Designer with three years of hands-on experience crafting digital products. Skilled in user research, prototyping, and visual design...
                      </div>

                      {/* "Get Help with AI" inline button with cursor pointer */}
                      <div className="flex justify-end mt-1 relative">
                        <button className="px-2 py-0.5 text-[9px] font-semibold text-cv-blue bg-cv-blue-50 border border-cv-blue-border rounded flex items-center gap-1 shadow-sm">
                          <span>Get Help with AI</span>
                          <MousePointer2 className="w-3 h-3 text-cv-slate-900 fill-cv-slate-900 absolute -bottom-2 -right-1" />
                        </button>
                      </div>

                      {/* AI Suggestion Popover (As seen in the screenshot) */}
                      <div className="mt-2 bg-white border border-cv-blue-200 rounded-lg p-2.5 shadow-lg space-y-1.5 animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-cv-blue flex items-center gap-1">
                            AI Suggestion
                          </span>
                        </div>
                        <p className="text-[9px] text-cv-slate-700 leading-tight">
                          UI/UX Designer with three years of experience crafting intuitive, user-friendly digital products. Skilled in research, prototyping, and visual design. I transform complex ideas into seamless experiences that drive engagement.
                        </p>
                        <div className="flex justify-end gap-1.5 pt-1">
                          <button className="px-1.5 py-0.5 text-[8px] border border-cv-slate-200 rounded text-cv-slate-600">
                            Retry
                          </button>
                          <button className="px-2 py-0.5 text-[8px] bg-cv-blue text-white rounded font-medium">
                            Use
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-cv-slate-100 font-semibold text-cv-slate-800">
                    <span>Employment History</span>
                    <span className="text-cv-slate-400">+</span>
                  </div>
                </div>

                {/* Middle Preview Pane */}
                <div className="col-span-5 p-3 flex justify-center items-start overflow-y-auto">
                  <div className="w-full bg-white p-3 rounded shadow-sm border border-cv-slate-200 space-y-2">
                    <div className="flex items-center gap-2 border-b border-cv-slate-200 pb-2">
                      <div className="w-8 h-8 rounded-full bg-cv-blue-100 text-cv-blue flex items-center justify-center font-bold text-xs">
                        J
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-cv-slate-900 leading-none">Jenifer</h4>
                        <span className="text-[9px] text-cv-slate-500">Product Designer</span>
                      </div>
                    </div>
                    <div className="text-[8px] text-cv-slate-500">
                      jenifer@gmail.com • +62 821-0000-0000 • Surabaya, Indonesia
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-[9px] text-cv-slate-900 border-b border-cv-slate-100">
                        Experience
                      </div>
                      <div className="space-y-1 text-[8px] text-cv-slate-700">
                        <div>
                          <div className="font-bold">Freelance UI Designer — Studio Ghoib</div>
                          <div>May 2023–Present</div>
                        </div>
                        <div>
                          <div className="font-bold">Product Designer — Company AYE</div>
                          <div>Mar 2022–May 2023</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Styling Pane */}
                <div className="col-span-3 bg-white border-l border-cv-slate-200 p-2.5 space-y-2 text-[9px]">
                  <span className="font-bold text-cv-slate-800 block border-b border-cv-slate-100 pb-1">
                    Typography
                  </span>
                  <div>
                    <span className="text-cv-slate-500 block mb-0.5">Font</span>
                    <div className="border border-cv-slate-200 rounded p-1 font-semibold flex justify-between">
                      <span>Plus Jakarta</span>
                      <span>▾</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="border border-cv-slate-200 rounded p-1">Medium ▾</div>
                    <div className="border border-cv-slate-200 rounded p-1">12 ▾</div>
                  </div>
                  <div className="pt-2 border-t border-cv-slate-100">
                    <span className="text-cv-slate-500 block mb-0.5">Size</span>
                    <div className="grid grid-cols-2 gap-1 text-[8px]">
                      <div className="border border-cv-slate-200 rounded p-1 text-center">120 px</div>
                      <div className="border border-cv-slate-200 rounded p-1 text-center">120 px</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Base Stand */}
          <div className="w-[105%] -ml-[2.5%] h-4 bg-slate-700 rounded-b-2xl border-t border-slate-600 shadow-xl" />
        </div>

        {/* Mobile Grid for the 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 lg:hidden">
          <div className="bg-white p-5 rounded-2xl border border-cv-slate-200 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-cv-blue-50 border border-cv-blue-border flex items-center justify-center text-cv-blue">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-cv-slate-900">ATS-Friendly Templates</h3>
            <p className="text-xs text-cv-slate-500">Ensure your resume passes Applicant Tracking Systems effortlessly</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-cv-slate-200 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-cv-blue-50 border border-cv-blue-border flex items-center justify-center text-cv-blue">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-cv-slate-900">AI-Powered Suggestions</h3>
            <p className="text-xs text-cv-slate-500">Get real-time recommendations to improve wording and structure.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-cv-slate-200 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-cv-blue-50 border border-cv-blue-border flex items-center justify-center text-cv-blue">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-cv-slate-900">Instant Feedback</h3>
            <p className="text-xs text-cv-slate-500">AI analyzes and scores your resume for maximum impact.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-cv-slate-200 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-cv-blue-50 border border-cv-blue-border flex items-center justify-center text-cv-blue">
              <FileDown className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-cv-slate-900">Export in Multiple Formats</h3>
            <p className="text-xs text-cv-slate-500">Download in PDF, DOCX, or share online with ease.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
