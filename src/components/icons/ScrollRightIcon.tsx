import React from "react";

/**
 * Default scroll right icon component
 * Extracted for better tree-shaking and code organization
 */
export const ScrollRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
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
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

ScrollRightIcon.displayName = "ScrollRightIcon";
