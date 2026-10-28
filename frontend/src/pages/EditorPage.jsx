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
import CustomSection from '../components/editor/FormSections/CustomSection';
import ResumePreview from '../components/preview/ResumePreview';
import DiffProposal from '../components/editor/DiffProposal';
import TailorModal from '../components/editor/TailorModal';
import RearrangeSectionsModal from '../components/editor/RearrangeSectionsModal';
import AddCustomSectionModal from '../components/editor/AddCustomSectionModal';
import { aiApi } from '../api/ai';
import { ArrowUpDown, SlidersHorizontal, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import {
  DEFAULT_SECTION_ORDER,
  normalizeSectionOrder,
  moveSectionInOrder,
  SECTION_METADATA,
  getSectionMetadata,
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
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);

  const sectionOrder = normalizeSectionOrder(resume.sectionOrder, resume.customSections);

  const handleUpdateSectionOrder = (newOrder) => {
    handleUpdate('sectionOrder', newOrder);
  };

  const handleMoveSection = (index, direction) => {
    const updated = moveSectionInOrder(sectionOrder, index, direction, resume.customSections);
    handleUpdate('sectionOrder', updated);
  };

  const handleAddCustomSection = (newSection) => {
    const updatedCustom = [...(resume.customSections || []), newSection];
    const updatedOrder = [...sectionOrder, newSection.id];
    setResume((prev) => ({
      ...prev,
      customSections: updatedCustom,
      sectionOrder: updatedOrder,
    }));
  };

  const handleUpdateCustomSection = (updatedSection) => {
    const updatedCustom = (resume.customSections || []).map((s) =>
      s.id === updatedSection.id ? updatedSection : s
    );
    handleUpdate('customSections', updatedCustom);
  };

  const handleDeleteCustomSection = (sectionId) => {
    const updatedCustom = (resume.customSections || []).filter((s) => s.id !== sectionId);
    const updatedOrder = sectionOrder.filter((id) => id !== sectionId);
    setResume((prev) => ({
      ...prev,
      customSections: updatedCustom,
      sectionOrder: updatedOrder,
    }));
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
      default: {
        const customSection = (resume.customSections || []).find((c) => c.id === sectionKey);
        if (customSection) {
          return (
            <CustomSection
              key={customSection.id}
              section={customSection}
              onChange={handleUpdateCustomSection}
              onDelete={handleDeleteCustomSection}
            />
          );
        }
        return null;
      }
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
                <div className="bg-white rounded-xl border border-cv-slate-200 p-3 sm:px-4 sm:py-3 shadow-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-cv-blue flex items-center justify-center shrink-0">
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-cv-slate-900 flex items-center gap-2">
                          <span>Section Sequence</span>
                          <span className="text-[10px] font-semibold text-cv-slate-500 bg-cv-slate-100 px-2 py-0.5 rounded-md border border-cv-slate-200">
                            {sectionOrder.length} Sections
                          </span>
                        </div>
                          <p className="text-[11px] text-cv-slate-500 hidden sm:block truncate">
                            Use arrows on any section or click to reorder all
                          </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setIsAddSectionModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-cv-slate-700 hover:text-cv-blue bg-cv-slate-100 hover:bg-blue-50 border border-cv-slate-200 hover:border-blue-200 rounded-lg transition-all shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-cv-blue" />
                        <span>Add Section</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsRearrangeModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-cv-blue hover:text-white bg-blue-50 hover:bg-cv-blue border border-blue-200 hover:border-transparent rounded-lg transition-all shadow-2xs cursor-pointer"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Rearrange All</span>
                        <span className="sm:hidden">Rearrange</span>
                      </button>
                    </div>
                  </div>

                  {/* Dynamically Ordered Section Cards */}
                  {sectionOrder.map((sectionKey, index) => {
                    const meta = getSectionMetadata(sectionKey, resume.customSections);
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
                            {meta.isCustom && (
                              <span className="text-[9.5px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-1.5 py-0.2 rounded-md">
                                Custom
                              </span>
                            )}
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

                  {/* Add Custom Section Bottom Banner Card */}
                  <button
                    type="button"
                    onClick={() => setIsAddSectionModalOpen(true)}
                    className="w-full py-4 px-4 border-2 border-dashed border-cv-slate-300 hover:border-cv-blue hover:bg-blue-50/40 rounded-2xl transition-all flex items-center justify-center gap-3 text-cv-slate-600 hover:text-cv-blue group cursor-pointer shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cv-slate-100 group-hover:bg-blue-100/80 text-cv-slate-500 group-hover:text-cv-blue flex items-center justify-center transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-cv-slate-800 group-hover:text-cv-blue">
                        Add Custom Section
                      </div>
                      <div className="text-[11px] text-cv-slate-500">
                        Add Languages, Volunteer, Awards, Publications or any custom heading
                      </div>
                    </div>
                  </button>
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
              customSections={resume.customSections || []}
              onUpdateOrder={handleUpdateSectionOrder}
              onOpenAddSection={() => {
                setIsRearrangeModalOpen(false);
                setIsAddSectionModalOpen(true);
              }}
            />

            {/* Add Custom Section Modal */}
            <AddCustomSectionModal
              isOpen={isAddSectionModalOpen}
              onClose={() => setIsAddSectionModalOpen(false)}
              onAddSection={handleAddCustomSection}
            />
          </div>
          );
}
