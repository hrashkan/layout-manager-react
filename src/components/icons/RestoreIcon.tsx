import React from "react";

export const RestoreIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="7" y="3" width="14" height="14" rx="1" />
    <path d="M3 9v12h12" />
  </svg>
);

RestoreIcon.displayName = "RestoreIcon";
