import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Directly downloads the resume as a clean, high-resolution A4 PDF file using jsPDF
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

  // Create an off-screen clone with standard A4 dimensions (794px at 96 DPI)
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px';
  container.style.zIndex = '-9999';
  container.style.backgroundColor = '#ffffff';

  const clone = sourceElement.cloneNode(true);
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';
  clone.style.border = 'none';
  clone.style.width = '794px';
  clone.style.boxSizing = 'border-box';
  clone.style.minHeight = '0';
  clone.style.maxHeight = '1120px';
  clone.style.overflow = 'hidden';
  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    // Render the clone to high-resolution canvas
    const canvas = await html2canvas(clone, {
      scale: 2, // 2x retina sharpness
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Standard A4 dimensions in mm: 210mm x 297mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Render single A4 page cleanly
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight), undefined, 'FAST');

    // Only add a second page if there is substantial overflow (> 35mm), preventing accidental blank pages
    let heightLeft = imgHeight - pageHeight;
    let position = -pageHeight;
    while (heightLeft > 35) {
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
      position -= pageHeight;
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
