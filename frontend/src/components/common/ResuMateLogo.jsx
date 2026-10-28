import React from 'react';

export default function ResuMateLogo({ className = 'h-7 w-auto', showText = true, textColor = 'text-cv-slate-900' }) {
  return (
    <div className="inline-flex items-center gap-2.5 select-none font-bold tracking-tight">
      {/* Precision Geometric Origami Pinwheel */}
      <svg
        className={className}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Leaf - Blue */}
        <path
          d="M20 4L27 15H17C14.7909 15 13 13.2091 13 11V4H20Z"
          fill="#1677FF"
        />
        {/* Top-Right Fold - Yellow */}
        <path
          d="M36 13L25 20V10C25 7.79086 26.7909 6 29 6H36V13Z"
          fill="#FADB14"
        />
        {/* Bottom-Right Leaf - Light Blue */}
        <path
          d="M36 27L25 20H35C35.5523 20 36 20.4477 36 21V27Z"
          fill="#69B1FF"
        />
        {/* Bottom Leaf - Blue */}
        <path
          d="M20 36L13 25H23C25.2091 25 27 26.7909 27 29V36H20Z"
          fill="#0958D9"
        />
        {/* Bottom-Left Fold - Yellow */}
        <path
          d="M4 27L15 20V30C15 32.2091 13.2091 34 11 34H4V27Z"
          fill="#FADB14"
        />
        {/* Top-Left Leaf - Sky Blue */}
        <path
          d="M4 13L15 20H5C4.44772 20 4 19.5523 4 19V13Z"
          fill="#4096FF"
        />
      </svg>
      {showText && (
        <span className={`text-xl font-bold tracking-tight ${textColor} leading-none`}>
          Resu<span className="text-cv-blue font-extrabold">Mate</span>
        </span>
      )}
    </div>
  );
}
