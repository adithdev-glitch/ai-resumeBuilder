import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import EditorHeader from '../components/editor/EditorHeader';
import ContactSection from '../components/editor/FormSections/ContactSection';
import SummarySection from '../components/editor/FormSections/SummarySection';
import ExperienceSection from '../components/editor/FormSections/ExperienceSection';
import EducationSection from '../components/editor/FormSections/EducationSection';
import ProjectsSection from '../components/editor/FormSections/ProjectsSection';
import SkillsSection from '../components/editor/FormSections/SkillsSection';
import CertificationsSection from '../components/editor/FormSections/CertificationsSection';
import ResumePreview from '../components/preview/ResumePreview';
import DiffProposal from '../components/editor/DiffProposal';
import TailorModal from '../components/editor/TailorModal';
import { aiApi } from '../api/ai';

export default function EditorPage() {
  const { resume, setResume, activeTemplate, setActiveTemplate, saveStatus } = useResume();
  const [mobileTab, setMobileTab] = useState('edit'); // 'edit' | 'preview'

  // AI Loading & Proposal states
  const [improvingBulletId, setImprovingBulletId] = useState(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  const [isTailorModalOpen, setIsTailorModalOpen] = useState(false);

  // Diff Proposal State
  const [diffProposal, setDiffProposal] = useState({
    isOpen: false,
    title: '',
    contextNote: '',
    original: '',
    suggested: '',
    onAccept: () => {},
  });

  const handleUpdate = (field, value) => {
    setResume((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // AI Action 1: Improve Bullet Point
  const handleImproveBullet = async ({ bullet, bulletKey, expIndex, bulletIndex, role }) => {
    setImprovingBulletId(bulletKey);
    try {
      const response = await aiApi.improveBullet({ bullet, role });
      const suggested = response.suggested || response.result || bullet;

      setDiffProposal({
        isOpen: true,
        title: 'Review Improved Bullet',
        contextNote: 'Strengthened with action verbs and quantifiable clarity.',
        original: bullet,
        suggested: suggested,
        onAccept: (newText) => {
          const updated = [...(resume.experience || [])];
          const newBullets = [...(updated[expIndex].bullets || [])];
          newBullets[bulletIndex] = newText;
          updated[expIndex].bullets = newBullets;
          handleUpdate('experience', updated);
          setDiffProposal((p) => ({ ...p, isOpen: false }));
        },
      });
    } catch {
      alert("Couldn't reach the suggestion service. Your text is unchanged.");
    } finally {
      setImprovingBulletId(null);
    }
  };

  // AI Action 2: Generate Summary from Experience
  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const response = await aiApi.generateSummary({
        experience: resume.experience || [],
        jobTitle: resume.personal?.jobTitle || '',
      });
      const suggested = response.summary || response.suggested || '';

      setDiffProposal({
        isOpen: true,
        title: 'Review Generated Summary',
        contextNote: 'Synthesized from your work history and key competencies.',
        original: resume.summary || '',
        suggested: suggested,
        onAccept: (newSummary) => {
          handleUpdate('summary', newSummary);
          setDiffProposal((p) => ({ ...p, isOpen: false }));
        },
      });
    } catch {
      alert("Couldn't reach the suggestion service. Your text is unchanged.");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // AI Action 3: Tailor to Job Description
  const handleTailorSubmit = async ({ jobDescription, targetRole }) => {
    setIsTailoring(true);
    try {
      const response = await aiApi.tailorExperience({
        experience: resume.experience || [],
        jobDescription,
        targetRole,
      });

      setIsTailorModalOpen(false);

      if (response.suggestedExperience && response.suggestedExperience.length > 0) {
        // Show first tailored bullet difference
        const firstDiff = response.suggestedExperience[0];
        const originalBullet = (resume.experience?.[0]?.bullets?.[0]) || '';
        const suggestedBullet = firstDiff.bullets?.[0] || originalBullet;

        setDiffProposal({
          isOpen: true,
          title: 'Review Tailored Bullets',
          contextNote: `Aligned with requirements for ${targetRole || 'target position'}.`,
          original: originalBullet,
          suggested: suggestedBullet,
          onAccept: () => {
            handleUpdate('experience', response.suggestedExperience);
            setDiffProposal((p) => ({ ...p, isOpen: false }));
          },
        });
      }
    } catch {
      alert("Couldn't reach the suggestion service. Your text is unchanged.");
    } finally {
      setIsTailoring(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Top Navigation */}
      <EditorHeader
        resume={resume}
        onTitleChange={(title) => handleUpdate('title', title)}
        saveStatus={saveStatus}
        mobileTab={mobileTab}
        setMobileTab={setMobileTab}
      />

      {/* Main Split Screen */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: Form Sections */}
        <section
          className={`w-full lg:w-1/2 h-full overflow-y-auto bg-cv-slate-50 border-r border-cv-slate-200 p-4 sm:p-6 lg:p-8 space-y-6 ${
            mobileTab === 'edit' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-6 pb-20">
            <ContactSection
              personal={resume.personal}
              onChange={(data) => handleUpdate('personal', data)}
            />

            <SummarySection
              summary={resume.summary}
              onChange={(data) => handleUpdate('summary', data)}
              onGenerateSummary={handleGenerateSummary}
              isGenerating={isGeneratingSummary}
            />

            <ExperienceSection
              experience={resume.experience}
              onChange={(data) => handleUpdate('experience', data)}
              onImproveBullet={handleImproveBullet}
              onOpenTailorModal={() => setIsTailorModalOpen(true)}
              improvingBulletId={improvingBulletId}
            />

            <EducationSection
              education={resume.education}
              onChange={(data) => handleUpdate('education', data)}
            />

            <ProjectsSection
              projects={resume.projects}
              onChange={(data) => handleUpdate('projects', data)}
            />

            <SkillsSection
              skills={resume.skills}
              onChange={(data) => handleUpdate('skills', data)}
            />

            <CertificationsSection
              certifications={resume.certifications}
              onChange={(data) => handleUpdate('certifications', data)}
            />
          </div>
        </section>

        {/* Right Panel: Live Preview */}
        <section
          className={`w-full lg:w-1/2 h-full overflow-hidden ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ResumePreview
            resume={resume}
            activeTemplate={activeTemplate}
            onTemplateChange={setActiveTemplate}
          />
        </section>
      </main>

      {/* Diff Proposal Modal */}
      <DiffProposal
        isOpen={diffProposal.isOpen}
        title={diffProposal.title}
        contextNote={diffProposal.contextNote}
        original={diffProposal.original}
        suggested={diffProposal.suggested}
        onAccept={diffProposal.onAccept}
        onReject={() => setDiffProposal((p) => ({ ...p, isOpen: false }))}
      />

      {/* Tailor Job Description Modal */}
      <TailorModal
        isOpen={isTailorModalOpen}
        onClose={() => setIsTailorModalOpen(false)}
        onTailorSubmit={handleTailorSubmit}
        isTailoring={isTailoring}
      />
    </div>
  );
}
