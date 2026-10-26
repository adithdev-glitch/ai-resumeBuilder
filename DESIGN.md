# CVCRAFT Design System & Tokens

This document records the visual direction, design tokens, typography, and architectural decisions for CVCRAFT.

## 1. Visual Philosophy
- **Restrained & Editorial**: Avoids the "purple AI SaaS" tropes (no purple-to-blue gradients, no neon glows, no sparkle ✨ icons, no fake badges).
- **Human-Made Craft**: Clean typography, crisp 1px borders (`#E2E8F0`), generous whitespace, and purposeful micro-interactions (150ms ease).
- **Utility-First AI**: Gemini functions as a calm inline assistant with diff proposals (accept/edit/reject) rather than an omnipresent gimmick.

## 2. Color Palette

| Token | Hex Value | Purpose / Usage |
|---|---|---|
| `--cv-blue` | `#1677FF` | Primary action accent (buttons, active tabs, subtle highlights) |
| `--cv-blue-hover` | `#0958D9` | Hover state for interactive primary controls |
| `--cv-blue-subtle` | `#E6F4FF` | Soft background tiles on the hero grid, active selection tags |
| `--cv-blue-border` | `#BAE0FF` | Active input outlines and subtle badges |
| `--cv-dark` | `#0B0F19` | Central hero icon badge background and dark contrast elements |
| `--cv-yellow` | `#FADB14` | Secondary pinwheel logo accent color |
| `--text-primary` | `#0F172A` | High contrast headings and body text (`slate-900`) |
| `--text-secondary`| `#475569` | Secondary captions, subheaders, and helper labels (`slate-600`)|
| `--border-subtle` | `#E2E8F0` | Form field outlines, divider lines, and card containers |
| `--diff-add-bg` | `#F0FDF4` | Inline diff proposal background for suggested text additions |
| `--diff-del-bg` | `#FEF2F2` | Inline diff proposal background for replaced text |

## 3. Typography Scale

- **UI & App Headings**: `Plus Jakarta Sans`
  - Crisp geometric sans-serif with excellent legibility at both micro sizes (12px) and hero display titles (48px–56px).
- **Classic Resume Template**: `Newsreader` / `Source Serif 4`
  - High-authority, literary serif. Ideal for executive, academic, legal, and traditional ATS submissions.
- **Modern Resume Template**: `Public Sans` / `Plus Jakarta Sans`
  - Neutral, objective, and high-readability sans for tech, product, and design roles.
- **Compact Template**: Tight baseline grid with `10pt` type and tabular alignment for single-page ATS resumes.

## 4. Spacing & Elevation

- **Spacing Grid**: Based on a standard 4px / 8px baseline (`p-2`, `p-4`, `p-6`, `p-8`).
- **Hero Grid**: 56px geometric grid with scattered `#E6F4FF` tinted highlight blocks, matching the Dribbble design reference.
- **Elevation**:
  - Cards & Form Panels: Crisp 1px border (`#E2E8F0`) with subtle `0 2px 10px rgba(0,0,0,0.04)`.
  - Floating Hero Cards: `0 20px 40px -15px rgba(15, 23, 42, 0.08)` to achieve weightless separation without muddy shadows.
  - Modals & Dropdowns: `0 25px 50px -12px rgba(15, 23, 42, 0.25)`.

## 5. ATS Compliance Guarantee
- Printable A4 canvas with zero multi-column table hacks that confuse ATS parsers.
- True selectable text rendered with semantic HTML (`<h1>`, `<h2>`, `<p>`, `<ul>`, `<li>`).
- Print stylesheet enforces pure black text on pure white paper with exact 20mm margins.
