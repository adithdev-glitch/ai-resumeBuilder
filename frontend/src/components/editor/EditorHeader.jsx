import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CvCraftLogo from '../common/CvCraftLogo';
import { Download, FileText, Check, AlertCircle, Loader2, ArrowLeft, ChevronDown } from 'lucide-react';
import { exportResumeToDocx } from '../../utils/docxExport';
import { useAuth } from '../../context/AuthContext';

export default function EditorHeader({
  resume,
  onTitleChange,
  saveStatus = 'saved',
  mobileTab,
  setMobileTab,
}) {
  const { user } = useAuth();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);

  const handlePrintPdf = () => {
    setShowExportMenu(false);
    window.print();
  };

  const handleDownloadDocx = async () => {
    setShowExportMenu(false);
    setIsExportingDocx(true);
    try {
      await exportResumeToDocx(resume);
    } catch {
      alert('Failed to generate DOCX file.');
    } finally {
      setIsExportingDocx(false);
    }
  };

  return (
    <header className="h-14 bg-white border-b border-cv-slate-200 px-4 flex items-center justify-between z-20 shrink-0 no-print">
      {/* Left: Back button + Logo + Resume Title */}
      <div className="flex items-center gap-4 min-w-0">
        <Link
          to="/"
          className="text-cv-slate-500 hover:text-cv-slate-900 p-1 rounded-md transition-colors"
          title="Back to Home"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <Link to="/" className="shrink-0 flex items-center">
          <CvCraftLogo className="h-6 w-auto" showText={false} />
        </Link>

        <div className="h-4 w-[1px] bg-cv-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2 min-w-0">
          <input
            type="text"
            value={resume.title || 'Untitled Resume'}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-xs sm:text-sm font-bold text-cv-slate-900 bg-transparent hover:bg-cv-slate-50 focus:bg-white border border-transparent hover:border-cv-slate-200 focus:border-cv-blue rounded px-1.5 py-0.5 truncate max-w-[140px] sm:max-w-[220px] focus:outline-none"
            title="Click to rename"
          />

          {/* Quiet Autosave Indicator */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-cv-slate-500 pl-1 select-none">
            {saveStatus === 'saving' && (
              <>
                <Loader2 className="w-3 h-3 text-cv-blue animate-spin" />
                <span>Saving...</span>
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-cv-slate-500">Saved</span>
              </>
            )}
            {saveStatus === 'unsaved' && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-cv-slate-500">Unsaved changes</span>
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <AlertCircle className="w-3 h-3 text-red-500" />
                <span className="text-red-500">Couldn't save changes</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Middle: Mobile Tab Toggle (Edit vs Preview) */}
      <div className="flex lg:hidden items-center bg-cv-slate-100 p-0.5 rounded-lg border border-cv-slate-200 text-xs">
        <button
          type="button"
          onClick={() => setMobileTab('edit')}
          className={`px-3 py-1 font-semibold rounded-md transition-colors ${
            mobileTab === 'edit'
              ? 'bg-white text-cv-slate-900 shadow-sm'
              : 'text-cv-slate-600 hover:text-cv-slate-900'
          }`}
        >
          Form
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`px-3 py-1 font-semibold rounded-md transition-colors ${
            mobileTab === 'preview'
              ? 'bg-white text-cv-slate-900 shadow-sm'
              : 'text-cv-slate-600 hover:text-cv-slate-900'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Right: Resumes link + Export Dropdown */}
      <div className="flex items-center gap-3">
        {user ? (
          <Link
            to="/dashboard"
            className="hidden sm:inline-flex text-xs font-semibold text-cv-slate-600 hover:text-cv-slate-900 px-3 py-1.5 rounded-lg hover:bg-cv-slate-100 transition-colors"
          >
            My Resumes
          </Link>
        ) : (
          <Link
            to="/login"
            className="hidden sm:inline-flex text-xs font-semibold text-cv-slate-600 hover:text-cv-slate-900 px-3 py-1.5 rounded-lg hover:bg-cv-slate-100 transition-colors"
          >
            Sign In
          </Link>
        )}

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover px-3.5 py-1.5 rounded-lg shadow-sm transition-colors inline-flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
            <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-cv-slate-200 rounded-xl shadow-modal py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
              <button
                type="button"
                onClick={handlePrintPdf}
                className="w-full text-left px-3.5 py-2 text-xs text-cv-slate-800 hover:bg-cv-slate-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cv-blue" />
                  <div>
                    <div className="font-semibold">Print to PDF</div>
                    <div className="text-[10px] text-cv-slate-500">ATS-compliant formatting</div>
                  </div>
                </div>
              </button>

              <div className="h-[1px] bg-cv-slate-100 my-1" />

              <button
                type="button"
                onClick={handleDownloadDocx}
                disabled={isExportingDocx}
                className="w-full text-left px-3.5 py-2 text-xs text-cv-slate-800 hover:bg-cv-slate-50 flex items-center justify-between disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Download DOCX</div>
                    <div className="text-[10px] text-cv-slate-500">Editable Word document</div>
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
