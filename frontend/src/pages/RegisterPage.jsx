import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CvCraftLogo from '../components/common/CvCraftLogo';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await register({ email, password });
      navigate('/templates');
    } catch (err) {
      setError(err.message || 'Unable to create account. Please try another email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cv-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-block">
          <CvCraftLogo className="h-9 w-auto" />
        </Link>
        <h2 className="text-xl font-bold text-cv-slate-900">Create your account</h2>
        <p className="text-xs text-cv-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-cv-blue hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-cv-slate-200 rounded-xl sm:px-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-cv-slate-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-cv-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-cv-slate-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-3 py-2 text-xs border border-cv-slate-200 rounded-lg focus:outline-none focus:border-cv-blue focus:ring-1 focus:ring-cv-blue"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-cv-blue hover:bg-cv-blue-hover rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/editor"
              className="text-xs text-cv-slate-500 hover:text-cv-slate-900 underline"
            >
              Start building without an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
