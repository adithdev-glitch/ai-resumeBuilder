import React, { useRef, useState, useEffect } from 'react';

export default function ResumeCardThumbnail({ TemplateComponent, sampleResume }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.42);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        // Standard A4 width is ~794px at 96 DPI
        const width = containerRef.current.clientWidth;
        setScale(width / 794);
      }
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[1/1.414] bg-white rounded-md overflow-hidden select-none border border-cv-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
    >
      <div
        style={{
          width: '794px',
          minHeight: '1123px',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
        className="p-8 bg-white"
      >
        <TemplateComponent resume={sampleResume} />
      </div>
    </div>
  );
}
