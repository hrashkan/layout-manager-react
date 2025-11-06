import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SplitterProps } from "../types";
import "./Splitter.css";

export const Splitter: React.FC<SplitterProps> = ({
  direction,
  onResize,
  onResizeStart,
  size = 8,
  className = "",
  style = {},
  customStyles = {},
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef<number>(0);
  const lastPosRef = useRef<number>(0);
  const rafPendingRef = useRef<boolean>(false);
  const moveHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const upHandlerRef = useRef<(() => void) | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(true);
      startPosRef.current = direction === "horizontal" ? e.clientX : e.clientY;
      lastPosRef.current = startPosRef.current;

      onResizeStart?.();

      const handleMouseMove = (e: MouseEvent) => {
        lastPosRef.current = direction === "horizontal" ? e.clientX : e.clientY;
        if (!rafPendingRef.current) {
          rafPendingRef.current = true;
          requestAnimationFrame(() => {
            rafPendingRef.current = false;
            const delta = lastPosRef.current - startPosRef.current;
            onResize(delta);
          });
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        moveHandlerRef.current = null;
        upHandlerRef.current = null;
        rafPendingRef.current = false;
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      moveHandlerRef.current = handleMouseMove;
      upHandlerRef.current = handleMouseUp;
    },
    [direction, onResize, onResizeStart]
  );

  const defaultStyles: React.CSSProperties = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none",
  };

  const currentStyles = useMemo<React.CSSProperties>(() => {
    if (isDragging && customStyles.active) return customStyles.active;
    if (customStyles.default) return customStyles.default;
    return defaultStyles;
  }, [isDragging, customStyles.active, customStyles.default]);

  const splitterStyle: React.CSSProperties = useMemo(() => {
    const isHorizontal = direction === "horizontal";
    return {
      ...style,
      width: isHorizontal ? `${size}px` : "100%",
      height: !isHorizontal ? `${size}px` : "100%",
      minWidth: isHorizontal ? `${size}px` : undefined,
      minHeight: !isHorizontal ? `${size}px` : undefined,
      flexShrink: 0,
      cursor: isHorizontal ? "col-resize" : "row-resize",
      ...currentStyles,
      transition: isDragging ? "none" : "all 0.2s ease",
    } as React.CSSProperties;
  }, [direction, size, style, currentStyles, isDragging]);

  useEffect(() => {
    return () => {
      if (moveHandlerRef.current) {
        document.removeEventListener("mousemove", moveHandlerRef.current);
      }
      if (upHandlerRef.current) {
        document.removeEventListener("mouseup", upHandlerRef.current);
      }
      rafPendingRef.current = false;
    };
  }, []);

  return (
    <div
      className={`react-flex-layout-splitter ${className}`}
      style={splitterStyle}
      onMouseDown={handleMouseDown}
    />
  );
};
