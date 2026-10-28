import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CvCraftLogo from '../common/CvCraftLogo';
import { Download, Check, AlertCircle, Loader2, ArrowLeft, Printer } from 'lucide-react';
import { exportResumeToPdf, openPrintDialog } from '../../utils/pdfExport';
import { useAuth } from '../../context/AuthContext';

export default function EditorHeader({
  resume,
  onTitleChange,
  saveStatus = 'saved',
  mobileTab,
  setMobileTab,
}) {
  const { user } = useAuth();
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [downloadNotification, setDownloadNotification] = useState('');

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    setDownloadNotification('');
    try {
      const result = await exportResumeToPdf(resume);
      setDownloadNotification(`Downloaded "${result.filename}" to your Downloads folder.`);
      setTimeout(() => setDownloadNotification(''), 6000);
    } catch {
      // Fallback to print dialog
      openPrintDialog();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrintPdf = () => {
    openPrintDialog();
  };

  return (
    <header className="h-14 bg-white border-b border-cv-slate-200 px-4 flex items-center justify-between z-20 shrink-0 no-print">
      {/* Left: Back button + Logo + Resume Title */}
      <div className="flex items-center gap-4 min-w-0">
        <Link
          to="/templates"
          className="text-cv-slate-500 hover:text-cv-slate-900 p-1 rounded-md transition-colors flex items-center gap-1 text-xs font-medium"
          title="Back to Templates"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Templates</span>
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
          className={`px-3 py-1 font-semibold rounded-md transition-colors ${mobileTab === 'edit'
              ? 'bg-white text-cv-slate-900 shadow-sm'
              : 'text-cv-slate-600 hover:text-cv-slate-900'
            }`}
        >
          Form
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`px-3 py-1 font-semibold rounded-md transition-colors ${mobileTab === 'preview'
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

        <div className="flex items-center gap-2">
          {/* Print / Save as PDF Secondary Button */}
          <button
            type="button"
            onClick={handlePrintPdf}
            className="text-xs font-semibold text-cv-slate-700 bg-cv-slate-100 hover:bg-cv-slate-200 border border-cv-slate-200 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
            title="Open system print dialog to print or save vector PDF"
          >
            <Printer className="w-3.5 h-3.5 text-cv-slate-600" />
            <span className="hidden sm:inline">Print / Save as PDF</span>
          </button>

          {/* Download PDF Primary Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover px-3.5 py-1.5 rounded-lg shadow-sm transition-colors inline-flex items-center gap-1.5 disabled:opacity-70 cursor-pointer"
            title="Download clean high-resolution A4 PDF directly to your device"
          >
            {isExportingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{isExportingPdf ? 'Downloading PDF...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Download Confirmation Toast */}
      {downloadNotification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadNotification}</span>
        </div>
      )}
    </header>
  );
}
