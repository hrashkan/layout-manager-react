import React from "react";

/**
 * Default scroll left icon component
 * Extracted for better tree-shaking and code organization
 */
export const ScrollLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

ScrollLeftIcon.displayName = "ScrollLeftIcon";
