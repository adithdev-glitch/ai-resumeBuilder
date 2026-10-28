import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CvCraftLogo from '../components/common/CvCraftLogo';
import { resumesApi } from '../api/resumes';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { Plus, Copy, Trash2, Edit3, FileText, ArrowRight, LogOut, Loader2 } from 'lucide-react';
import { sampleResume } from '../data/sampleResume';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { setResume } = useResume();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const data = await resumesApi.getAll();
      setResumes(data.resumes || []);
    } catch {
      // If error or unauthenticated, display empty
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreateNew = async () => {
    try {
      const newResumeData = {
        ...sampleResume,
        title: 'New Resume',
        _id: undefined,
      };
      const created = await resumesApi.create(newResumeData);
      setResume(created.resume);
      navigate('/editor');
    } catch {
      // Local fallback
      setResume(sampleResume);
      navigate('/editor');
    }
  };

  const handleOpenResume = (item) => {
    setResume(item);
    navigate('/editor');
  };

  const handleDuplicate = async (e, id) => {
    e.stopPropagation();
    setActionLoadingId(id);
    try {
      const res = await resumesApi.duplicate(id);
      setResumes([res.resume, ...resumes]);
    } catch {
      alert("Couldn't duplicate resume.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete this resume? This cannot be undone.')) return;
    setActionLoadingId(id);
    try {
      await resumesApi.delete(id);
      setResumes(resumes.filter((r) => (r._id || r.id) !== id));
    } catch {
      alert("Couldn't delete resume.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-cv-slate-50 flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-cv-slate-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <CvCraftLogo />
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-cv-slate-400">
            Resumes Workspace
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-cv-slate-600 font-medium">
            {user ? user.email : 'Guest Session'}
          </span>
          {user ? (
            <button
              onClick={logout}
              className="p-1.5 text-cv-slate-500 hover:text-cv-slate-900 rounded-md hover:bg-cv-slate-100 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/login"
              className="font-semibold text-cv-blue hover:text-cv-blue-hover"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 sm:p-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-cv-slate-900">Your Resumes</h1>
            <p className="text-xs text-cv-slate-500 mt-0.5">
              Create, edit, duplicate, and download your resumes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/templates"
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-sm transition-colors inline-flex items-center gap-1.5"
            >
              Browse Templates
            </Link>
            <button
              onClick={() => navigate('/templates')}
              className="px-4 py-2 text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover rounded-lg shadow-sm transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              New Resume
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-cv-slate-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : resumes.length === 0 ? (
          /* Human, dry empty state as specified in prompt */
          <div className="bg-white border border-cv-slate-200 rounded-xl p-12 text-center space-y-4 max-w-md mx-auto my-12">
            <div className="w-12 h-12 rounded-xl bg-cv-blue-50 border border-cv-blue-border flex items-center justify-center mx-auto text-cv-blue">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-cv-slate-900">No resumes yet</h3>
              <p className="text-xs text-cv-slate-500 mt-1">
                Start with a blank one or customize the pre-filled template.
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Start Building
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map((item) => (
              <div
                key={item._id || item.id}
                onClick={() => handleOpenResume(item)}
                className="bg-white border border-cv-slate-200 hover:border-cv-blue-border hover:shadow-md rounded-xl p-5 cursor-pointer transition-all flex flex-col justify-between group space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-cv-slate-400 mb-2">
                    <span className="capitalize">{item.template || 'Classic'}</span>
                    <span>{new Date(item.updatedAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-sm font-bold text-cv-slate-900 group-hover:text-cv-blue transition-colors">
                    {item.title || 'Untitled Resume'}
                  </h3>
                  <p className="text-xs text-cv-slate-500 mt-1 line-clamp-2">
                    {item.personal?.fullName || 'No name'} — {item.personal?.jobTitle || 'No title'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-cv-slate-100">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Duplicate"
                      onClick={(e) => handleDuplicate(e, item._id || item.id)}
                      disabled={actionLoadingId === (item._id || item.id)}
                      className="p-1.5 text-cv-slate-400 hover:text-cv-slate-700 rounded hover:bg-cv-slate-100"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={(e) => handleDelete(e, item._id || item.id)}
                      disabled={actionLoadingId === (item._id || item.id)}
                      className="p-1.5 text-cv-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-xs font-semibold text-cv-blue group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    Edit <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
