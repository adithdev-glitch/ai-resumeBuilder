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
import RearrangeSectionsModal from '../components/editor/RearrangeSectionsModal';
import { aiApi } from '../api/ai';
import { ArrowUpDown, SlidersHorizontal, ArrowUp, ArrowDown } from 'lucide-react';
import {
  DEFAULT_SECTION_ORDER,
  normalizeSectionOrder,
  moveSectionInOrder,
  SECTION_METADATA,
} from '../utils/sectionOrder';

export default function EditorPage() {
  const { resume, setResume, activeTemplate, setActiveTemplate, saveStatus } = useResume();
  const [mobileTab, setMobileTab] = useState('edit'); // 'edit' | 'preview'

  // AI Loading & Proposal states
  const [improvingBulletId, setImprovingBulletId] = useState(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  const [isTailorModalOpen, setIsTailorModalOpen] = useState(false);
  const [isRearrangeModalOpen, setIsRearrangeModalOpen] = useState(false);

  const sectionOrder = normalizeSectionOrder(resume.sectionOrder);

  const handleUpdateSectionOrder = (newOrder) => {
    handleUpdate('sectionOrder', newOrder);
  };

  const handleMoveSection = (index, direction) => {
    const updated = moveSectionInOrder(sectionOrder, index, direction);
    handleUpdate('sectionOrder', updated);
  };

  // Diff Proposal State
  const [diffProposal, setDiffProposal] = useState({
    isOpen: false,
    title: '',
    contextNote: '',
    original: '',
    suggested: '',
    onAccept: () => { },
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

  const renderSectionComponent = (sectionKey) => {
    switch (sectionKey) {
      case 'personal':
        return (
          <ContactSection
            personal={resume.personal}
            onChange={(data) => handleUpdate('personal', data)}
          />
        );
      case 'summary':
        return (
          <SummarySection
            summary={resume.summary}
            onChange={(data) => handleUpdate('summary', data)}
            onGenerateSummary={handleGenerateSummary}
            isGenerating={isGeneratingSummary}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            experience={resume.experience}
            onChange={(data) => handleUpdate('experience', data)}
            onImproveBullet={handleImproveBullet}
            onOpenTailorModal={() => setIsTailorModalOpen(true)}
            improvingBulletId={improvingBulletId}
          />
        );
      case 'education':
        return (
          <EducationSection
            education={resume.education}
            onChange={(data) => handleUpdate('education', data)}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            projects={resume.projects}
            onChange={(data) => handleUpdate('projects', data)}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            skills={resume.skills}
            onChange={(data) => handleUpdate('skills', data)}
          />
        );
      case 'certifications':
        return (
          <CertificationsSection
            certifications={resume.certifications}
            onChange={(data) => handleUpdate('certifications', data)}
          />
        );
      default:
        return null;
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
          className={`w-full lg:w-1/2 h-full overflow-y-auto bg-cv-slate-50 border-r border-cv-slate-200 p-4 sm:p-6 lg:p-8 space-y-6 ${mobileTab === 'edit' ? 'block' : 'hidden lg:block'
            }`}
        >
            <div className="max-w-2xl mx-auto space-y-5 pb-20">
              {/* Rearrange Sections Top Toolbar */}
              <div className="bg-white rounded-xl border border-cv-slate-200 p-3 sm:px-4 sm:py-3 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-cv-blue flex items-center justify-center shrink-0">
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-cv-slate-900 flex items-center gap-2">
                      <span>Section Sequence</span>
                      <span className="text-[10px] font-semibold text-cv-slate-500 bg-cv-slate-100 px-2 py-0.5 rounded-md border border-cv-slate-200">
                        {sectionOrder.length} Sections
                      </span>
                    </div>
                    <p className="text-[11px] text-cv-slate-500 hidden sm:block">
                      Use arrows on any section or click to reorder all
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsRearrangeModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-cv-blue hover:text-white bg-blue-50 hover:bg-cv-blue border border-blue-200 hover:border-transparent rounded-lg transition-all shadow-2xs cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Rearrange All</span>
                </button>
              </div>

              {/* Dynamically Ordered Section Cards */}
              {sectionOrder.map((sectionKey, index) => {
                const meta = SECTION_METADATA[sectionKey] || { label: sectionKey };
                const isFirst = index === 0;
                const isLast = index === sectionOrder.length - 1;

                return (
                  <div key={sectionKey} className="space-y-1.5">
                    {/* Section Position Pill & Controls */}
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center justify-center w-4.5 h-4.5 rounded bg-cv-slate-200 text-[10px] font-bold text-cv-slate-700">
                          {index + 1}
                        </span>
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-cv-slate-500">
                          {meta.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-0.5 bg-white border border-cv-slate-200 rounded-md p-0.5 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => handleMoveSection(index, -1)}
                          disabled={isFirst}
                          title={`Move ${meta.label} Up`}
                          className="p-1 rounded hover:bg-cv-slate-100 text-cv-slate-600 hover:text-cv-slate-900 disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-[1px] h-3 bg-cv-slate-200" />
                        <button
                          type="button"
                          onClick={() => handleMoveSection(index, 1)}
                          disabled={isLast}
                          title={`Move ${meta.label} Down`}
                          className="p-1 rounded hover:bg-cv-slate-100 text-cv-slate-600 hover:text-cv-slate-900 disabled:opacity-20 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {renderSectionComponent(sectionKey)}
                  </div>
                );
              })}
            </div>
        </section>

        {/* Right Panel: Live Preview */}
        <section
          className={`w-full lg:w-1/2 h-full overflow-hidden ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'
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

      {/* Rearrange Sections Modal */}
      <RearrangeSectionsModal
        isOpen={isRearrangeModalOpen}
        onClose={() => setIsRearrangeModalOpen(false)}
        sectionOrder={sectionOrder}
        onUpdateOrder={handleUpdateSectionOrder}
      />
    </div>
  );
}
