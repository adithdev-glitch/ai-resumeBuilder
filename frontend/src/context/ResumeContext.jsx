import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { sampleResume } from '../data/sampleResume';
import { resumesApi } from '../api/resumes';
import { useAuth } from './AuthContext';

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const { user } = useAuth();
  const [resume, setResume] = useState(() => {
    // Try restoring from local backup or default to realistic sample
    const saved = localStorage.getItem('cvcraft_current_resume');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return sampleResume;
      }
    }
    return sampleResume;
  });

  const [activeTemplate, setActiveTemplate] = useState(resume.template || 'classic');
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'unsaved' | 'error'
  const isInitialMount = useRef(true);

  // Keep template synced
  const handleTemplateChange = (tmpl) => {
    setActiveTemplate(tmpl);
    setResume((prev) => ({ ...prev, template: tmpl }));
  };

  // Debounced Autosave Effect
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setSaveStatus('unsaved');
    localStorage.setItem('cvcraft_current_resume', JSON.stringify(resume));

    const timeout = setTimeout(async () => {
      if (user && resume._id) {
        setSaveStatus('saving');
        try {
          await resumesApi.update(resume._id, resume);
          setSaveStatus('saved');
        } catch {
          setSaveStatus('error');
        }
      } else {
        // Guest user local auto-save
        setSaveStatus('saved');
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [resume, user]);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        activeTemplate,
        setActiveTemplate: handleTemplateChange,
        saveStatus,
        setSaveStatus,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
