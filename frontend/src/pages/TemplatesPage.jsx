import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { RESUME_TEMPLATES, TEMPLATE_CATEGORIES } from '../data/templatesData';
import { getProfileForTemplate } from '../data/templateProfiles';
import ResumeCardThumbnail from '../components/templates/ResumeCardThumbnail';
import ResuMateLogo from '../components/common/ResuMateLogo';
import { 
  FileText, 
  Upload, 
  Edit3, 
  Check, 
  LogOut, 
  Sparkles, 
  Briefcase, 
  Layers, 
  User, 
  X,
  FileCode,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function TemplatesPage() {
  const { user, logout } = useAuth();
  const { setResume, setActiveTemplate, resume } = useResume();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('resume'); // 'resume' | 'coverletter' | 'tracker'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importError, setImportError] = useState('');
  const fileInputRef = useRef(null);

  // Filter templates by category
  const filteredTemplates = RESUME_TEMPLATES.filter((tmpl) => {
    if (selectedCategory === 'all') return true;
    return tmpl.category === selectedCategory;
  });

  // Handle template selection
  const handleSelectTemplate = (templateId) => {
    setActiveTemplate(templateId);
    // If the current resume doesn't have an ID or is fresh, apply template
    setResume((prev) => ({
      ...prev,
      template: templateId,
    }));
    navigate('/editor');
  };

  // Handle JSON Import
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (parsed.personal || parsed.experience) {
          setResume((prev) => ({
            ...prev,
            ...parsed,
            template: prev.template || 'classic',
          }));
          setImportModalOpen(false);
          navigate('/editor');
        } else {
          setImportError('Invalid resume JSON format. Must contain personal or experience details.');
        }
      } catch (err) {
        setImportError('Failed to parse file as valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row font-sans text-slate-800">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-full md:w-64 bg-[#F2F4F7] border-r border-slate-200/90 flex flex-col justify-between shrink-0 p-6 md:min-h-screen">
        <div className="space-y-8">
          {/* ResuMate Brand Logo */}
          <Link to="/" className="flex items-center group">
            <ResuMateLogo className="h-8 w-auto" />
          </Link>

          {/* Left Navigation Menu */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('resume')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'resume'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-700" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => setActiveTab('coverletter')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'coverletter'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileCode className="w-4 h-4 text-slate-500" />
              <span>Cover Letter</span>
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'tracker'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span>Job Tracker</span>
            </button>
          </nav>
        </div>

        {/* Bottom Auth Section */}
        <div className="pt-6 border-t border-slate-200/80">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <div className="truncate flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {user.name || 'User'}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="flex-1 text-center py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  My Resumes
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-red-600 bg-white border border-slate-200 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <Link
                to="/login"
                className="w-full block text-center py-2.5 px-4 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full block text-center py-2.5 px-4 text-xs font-bold text-white bg-[#191528] hover:bg-[#251f3c] rounded-xl transition-all shadow-sm"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 lg:px-10 py-5 sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {TEMPLATE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-white text-slate-900 border-2 border-slate-800 shadow-sm'
                      : 'bg-slate-100 text-slate-600 border border-transparent hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Import Button */}
          <button
            onClick={() => setImportModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            <span>Import existing resume</span>
          </button>
        </header>

        {/* Tab Specific Content */}
        {activeTab === 'resume' && (
          <div className="flex-1 p-6 lg:p-10 max-w-7xl">
            {/* ATS Guarantee Banner */}
            <div className="mb-8 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    All {RESUME_TEMPLATES.length} Templates are 100% ATS-Compliant
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Engineered with clean semantic HTML tags, standard fonts, and linear hierarchies that pass Workday, Taleo, and Greenhouse scanners.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0 self-start sm:self-auto">
                ATS Friendly Guaranteed
              </span>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => {
                const sampleForPreview = getProfileForTemplate(template.id);
                return (
                  <div
                    key={template.id}
                    className="flex flex-col group cursor-pointer"
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    {/* Resume Card Preview Container */}
                    <div className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-slate-400 bg-white group-hover:-translate-y-1">
                      <ResumeCardThumbnail
                        TemplateComponent={template.component}
                        sampleResume={sampleForPreview}
                      />

                      {/* Hover Overlay with Action Button */}
                      <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 backdrop-blur-[1px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectTemplate(template.id);
                          }}
                          className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Use This Template</span>
                        </button>
                      </div>

                      {/* Badge Top Corner */}
                      <div className="absolute top-3 right-3 pointer-events-none">
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-white/95 text-slate-800 rounded-md shadow-sm border border-slate-200 backdrop-blur-sm">
                          {template.badge}
                        </span>
                      </div>
                    </div>

                    {/* Template Name and Tagline */}
                    <div className="mt-3.5 flex items-center justify-between">
                      <h4 className="text-xs font-extrabold tracking-wider text-slate-800 uppercase group-hover:text-blue-600 transition-colors">
                        {template.name}
                      </h4>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        ATS 99%+
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {template.tagline}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cover Letter Tab Coming Soon View */}
        {activeTab === 'coverletter' && (
          <div className="flex-1 p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <FileCode className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Cover Letter Builder</h2>
            <p className="text-xs text-slate-500 max-w-md mt-2">
              Generate matching ATS-friendly cover letters tailored to your resume in seconds using our built-in AI assistant.
            </p>
            <button
              onClick={() => setActiveTab('resume')}
              className="mt-6 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
            >
              Back to Resume Templates
            </button>
          </div>
        )}

        {/* Job Tracker Tab Coming Soon View */}
        {activeTab === 'tracker' && (
          <div className="flex-1 p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Job Application Tracker</h2>
            <p className="text-xs text-slate-500 max-w-md mt-2">
              Organize your job search, track interview stages, and tie custom resumes to specific job postings.
            </p>
            <button
              onClick={() => setActiveTab('resume')}
              className="mt-6 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
            >
              Back to Resume Templates
            </button>
          </div>
        )}
      </main>

      {/* ================= IMPORT RESUME MODAL ================= */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-600" />
                Import Existing Resume
              </h3>
              <button
                onClick={() => {
                  setImportModalOpen(false);
                  setImportError('');
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Upload a previously exported JSON resume file or choose one of our verified career templates to start customizing immediately.
            </p>

            {importError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {importError}
              </div>
            )}

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-blue-50/50 group"
            >
              <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-600 mx-auto mb-2 transition-colors" />
              <p className="text-xs font-bold text-slate-800">
                Click to browse resume file
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Supports .json exports from ResuMate, JSONResume, or standard formats
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setImportModalOpen(false);
                  navigate('/editor');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-black rounded-xl transition-colors"
              >
                Start with Sample Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
