import React, { useCallback, useRef, useState } from "react";
import { SplitterProps } from "../types";
import "./Splitter.css";

export const Splitter: React.FC<SplitterProps> = ({
  direction,
  onResize,
  size = 8,
  className = "",
  style = {},
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef<number>(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(true);
      startPosRef.current = direction === "horizontal" ? e.clientX : e.clientY;

      const handleMouseMove = (e: MouseEvent) => {
        const currentPos = direction === "horizontal" ? e.clientX : e.clientY;
        const delta = currentPos - startPosRef.current;
        onResize(delta);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [direction, onResize]
  );

  const splitterStyle: React.CSSProperties = {
    ...style,
    width: direction === "horizontal" ? `${size}px` : "100%",
    height: direction === "vertical" ? `${size}px` : "100%",
    minWidth: direction === "horizontal" ? `${size}px` : undefined,
    minHeight: direction === "vertical" ? `${size}px` : undefined,
    flexShrink: 0,
    cursor: direction === "horizontal" ? "col-resize" : "row-resize",
    backgroundColor: isDragging ? "#007acc" : "#e1e1e1",
    transition: isDragging ? "none" : "background-color 0.2s ease",
  };

  return (
    <div
      className={`react-flex-layout-splitter ${className}`}
      style={splitterStyle}
      onMouseDown={handleMouseDown}
    />
  );
};
