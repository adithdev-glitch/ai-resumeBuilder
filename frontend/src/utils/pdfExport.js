import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Standard A4 dimensions at 96 DPI: 210mm x 297mm
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123; // Math.round((794 * 297) / 210)
export const PDF_PAGE_WIDTH_MM = 210;
export const PDF_PAGE_HEIGHT_MM = 297;

// Strict equal 18mm margin on all 4 sides of every page (matches p-[18mm])
export const MARGIN_MM = 18;
export const MARGIN_PX = Math.round((MARGIN_MM / 25.4) * 96); // exactly 68px

/**
 * Checks whether a slice of the rendered canvas contains actual visible content
 * (avoids generating an accidental blank page from a few sub-pixel trailing margins).
 */
function checkSliceHasContent(canvas, startY, height) {
  if (height <= 25) return false;
  const ctx = canvas.getContext('2d');
  const clampedY = Math.max(0, Math.min(startY, canvas.height - 1));
  const clampedHeight = Math.min(height, canvas.height - clampedY);
  if (clampedHeight <= 25) return false;

  try {
    const imgData = ctx.getImageData(0, clampedY, canvas.width, clampedHeight);
    const data = imgData.data;
    // Step by 32 bytes (8 pixels) for rapid evaluation
    for (let i = 0; i < data.length; i += 32) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // If opaque and not almost pure white (detects text, borders, accents, images)
      if (a > 30 && (r < 240 || g < 240 || b < 240)) {
        return true;
      }
    }
  } catch {
    // If getImageData fails, fallback to true so content is not lost
    return true;
  }
  return false;
}

/**
 * Resets any inline marginTop shifts added by applySmartPageBreaks
 */
export function resetSmartPageBreaks(root) {
  if (!root) return;
  const shiftedElements = root.querySelectorAll('[data-page-break-shifted="true"]');
  shiftedElements.forEach((el) => {
    el.style.marginTop = '';
    el.removeAttribute('data-page-break-shifted');
  });
}

/**
 * Ensures strict equal margins (top, bottom, left, right = 18mm / 68px) on every page.
 * Shifts block elements that would otherwise encroach into the bottom margin of a page
 * down to the top content boundary of the next page, keeping orphan section headings paired.
 */
  export function applySmartPageBreaks(cloneRoot, pageHeightPx = A4_HEIGHT_PX, marginPx = MARGIN_PX) {
    const selectors = [
      '.resume-section-item',
      '[class*="space-y-"] > div',
      '[class*="space-y-"] > li',
      'section > div > div',
      'section > div',
      'section',
      'header',
      'article > header',
      'li',
    ];

    const allCandidateElements = Array.from(cloneRoot.querySelectorAll(selectors.join(',')));

    // Filter out parent containers that have children in the list to avoid double-shifting or giant empty blocks
    const elements = allCandidateElements.filter((el) => {
      return !allCandidateElements.some((other) => other !== el && el.contains(other));
    });

    const contentZoneHeight = pageHeightPx - 2 * marginPx; // 1123 - 136 = 987px

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const rootRect = cloneRoot.getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        const top = rect.top - rootRect.top;
        const bottom = rect.bottom - rootRect.top;
        const height = rect.height;

        // Skip elements taller than 75% of usable page content (cannot fit on one page without splitting)
        if (height > contentZoneHeight * 0.75) continue;

        // Determine current page (0-indexed: 0 = page 1, 1 = page 2, etc.)
        const pageIndex = Math.floor(top / pageHeightPx);
        const pageStart = pageIndex * pageHeightPx;
        const pageContentTop = pageStart + marginPx;
        const pageContentBottom = (pageIndex + 1) * pageHeightPx - marginPx;

        // 1. If element starts inside the top margin of pageIndex (for pageIndex >= 1)
        if (pageIndex > 0 && top < pageContentTop) {
          const pushDistance = pageContentTop - top;
          const currentMarginTop = parseFloat(window.getComputedStyle(el).marginTop) || 0;
          el.style.marginTop = `${currentMarginTop + pushDistance}px`;
          el.setAttribute('data-page-break-shifted', 'true');
          continue;
        }

          // 2. If element extends into the 18mm bottom margin of pageIndex
          if (bottom > pageContentBottom) {
            let targetEl = el;

            // Look for a preceding heading (immediate sibling or parent's sibling for space-y-* containers)
            let headingEl = null;
            const isHeader = (node) =>
              node && (/^(H2|H3|HEADER)$/i.test(node.tagName) || node.classList?.contains('resume-section-header'));
            if (isHeader(el.previousElementSibling)) {
              headingEl = el.previousElementSibling;
            } else if (
              !el.previousElementSibling &&
              el.parentElement &&
              isHeader(el.parentElement.previousElementSibling)
            ) {
              headingEl = el.parentElement.previousElementSibling;
            }

            if (headingEl) {
              const hRect = headingEl.getBoundingClientRect();
              const hTop = hRect.top - rootRect.top;
              if (hTop > pageContentBottom - 55) {
                targetEl = headingEl;
              }
            }

            const targetRect = targetEl.getBoundingClientRect();
            const targetTop = targetRect.top - rootRect.top;
            const nextPageContentTop = (pageIndex + 1) * pageHeightPx + marginPx;
            const pushDistance = nextPageContentTop - targetTop;

            if (pushDistance > 0) {
              const currentMarginTop = parseFloat(window.getComputedStyle(targetEl).marginTop) || 0;
              targetEl.style.marginTop = `${currentMarginTop + pushDistance}px`;
              targetEl.setAttribute('data-page-break-shifted', 'true');
            }
          }
        }
      }

      /**
       * Directly downloads the resume as a clean, high-resolution multi-page A4 PDF file using jsPDF
       * with strictly equal 18mm margins on all 4 sides of every page.
       */
      export async function exportResumeToPdf(resume) {
        const sourceElement = document.getElementById('resume-document');
        if (!sourceElement) {
          throw new Error('Resume preview element not found.');
        }

        const rawName =
          resume?.personal?.fullName?.trim() ||
          resume?.title?.trim() ||
          'Candidate';
        const cleanName =
          rawName
            .replace(/[^a-zA-Z0-9_-]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_+|_+$/g, '') || 'Candidate';
        const filename = `${cleanName}_Resume.pdf`;

        // Create an off-screen clone with exact standard A4 width (794px at 96 DPI)
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = `${A4_WIDTH_PX}px`;
        container.style.zIndex = '-9999';
        container.style.backgroundColor = '#ffffff';

        const clone = sourceElement.cloneNode(true);
        clone.style.transform = 'none';
        clone.style.margin = '0';
        clone.style.boxShadow = 'none';
        clone.style.border = 'none';
        clone.style.width = `${A4_WIDTH_PX}px`;
        clone.style.boxSizing = 'border-box';
        clone.style.minHeight = `${A4_HEIGHT_PX}px`;
        clone.style.height = 'auto';
        clone.style.maxHeight = 'none';
        clone.style.overflow = 'visible';
        clone.style.display = 'flex';
        clone.style.flexDirection = 'column';
        container.appendChild(clone);
        document.body.appendChild(container);

        try {
          // Wait for fonts and all images inside clone to be fully loaded
          if (document.fonts?.ready) {
            await document.fonts.ready;
          }
          const images = Array.from(clone.querySelectorAll('img'));
          if (images.length > 0) {
            await Promise.all(
              images.map((img) => {
                if (img.complete) return Promise.resolve();
                return new Promise((resolve) => {
                  img.onload = resolve;
                  img.onerror = resolve;
                });
              })
            );
          }

          // Apply smart page breaks to ensure strict equal 18mm margins on every page
          applySmartPageBreaks(clone, A4_HEIGHT_PX, MARGIN_PX);

          // Render the clone to high-resolution canvas (2x retina sharpness)
          const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: A4_WIDTH_PX,
          });

          // Standard A4 dimensions in mm: 210mm x 297mm
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true,
          });

          // Exact canvas height corresponding to 1 A4 page (maintaining 210:297 ratio)
          const pageCanvasHeight = Math.round((canvas.width * PDF_PAGE_HEIGHT_MM) / PDF_PAGE_WIDTH_MM);

          let pageIndex = 0;
          while (pageIndex * pageCanvasHeight < canvas.height) {
            const srcY = pageIndex * pageCanvasHeight;
            const remainingCanvasHeight = canvas.height - srcY;

            // For page 2 and beyond, check if there is actual content
            if (pageIndex > 0) {
              if (remainingCanvasHeight < 25) {
                break;
              }
              const hasContent = checkSliceHasContent(canvas, srcY, Math.min(pageCanvasHeight, remainingCanvasHeight));
              if (!hasContent) {
                break;
              }
              pdf.addPage('a4', 'portrait');
            }

            // Create an exact A4 page canvas
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = pageCanvasHeight;
            const pageCtx = pageCanvas.getContext('2d');

            // Crisp white paper background
            pageCtx.fillStyle = '#ffffff';
            pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvasHeight);

            // Draw the current page slice from master canvas
            const sliceHeight = Math.min(pageCanvasHeight, remainingCanvasHeight);
            pageCtx.drawImage(
              canvas,
              0,
              srcY,
              canvas.width,
              sliceHeight,
              0,
              0,
              canvas.width,
              sliceHeight
            );

            const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
            pdf.addImage(pageImgData, 'JPEG', 0, 0, PDF_PAGE_WIDTH_MM, PDF_PAGE_HEIGHT_MM, undefined, 'FAST');

            pageIndex++;
          }

          // Direct, reliable download mechanism that guarantees correct filename in Chrome & macOS Finder
          const pdfBlob = pdf.output('blob');
          const blobWithMime = new Blob([pdfBlob], { type: 'application/pdf' });
          const downloadUrl = window.URL.createObjectURL(blobWithMime);

          const downloadLink = document.createElement('a');
          downloadLink.style.display = 'none';
          downloadLink.href = downloadUrl;
          downloadLink.download = filename;
          downloadLink.setAttribute('download', filename);
          document.body.appendChild(downloadLink);
          downloadLink.click();

          setTimeout(() => {
            try {
              document.body.removeChild(downloadLink);
              window.URL.revokeObjectURL(downloadUrl);
            } catch {
              // ignore
            }
          }, 60000);

          return { success: true, filename };
        } finally {
          document.body.removeChild(container);
        }
      }

      /**
       * Opens dedicated high-fidelity print window for native macOS/Windows Save as PDF
       */
      export function openPrintDialog() {
        window.open('/print', '_blank');
      }
