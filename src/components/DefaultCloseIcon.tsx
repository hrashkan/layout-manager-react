import React from "react";

interface DefaultCloseIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const DefaultCloseIcon: React.FC<DefaultCloseIconProps> = ({
  size = 16,
  color = "#666",
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};
