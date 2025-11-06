import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { TabProps } from "../types";
import { DefaultCloseIcon } from "./DefaultCloseIcon";
import "./Tab.css";

export const Tab: React.FC<TabProps> = ({
  node,
  index,
  onClose,
  onSelect,
  onDragStart,
  onDragEnd,
  className = "",
  style = {},
  closeIcon,
  closeButtonClassName = "",
}) => {
  const isDraggingRef = useRef(false);

  const handleClick = useCallback(() => {
    onSelect?.(node.id);
  }, [node.id, onSelect]);

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose?.(node.id);
    },
    [node.id, onClose]
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData("text/plain", node.id);
      e.dataTransfer.effectAllowed = "move";

      e.currentTarget.classList.add("dragging");
      document.body.classList.add("dragging");

      isDraggingRef.current = true;

      onDragStart?.(node.id, index);
    },
    [node.id, index, onDragStart]
  );

  const handleDragEnd = useCallback(
    (e: React.DragEvent) => {
      e.currentTarget.classList.remove("dragging");
      document.body.classList.remove("dragging");

      isDraggingRef.current = false;

      onDragEnd?.();
    },
    [onDragEnd]
  );

  useEffect(() => {
    return () => {
      if (isDraggingRef.current) {
        document.body.classList.remove("dragging");
        isDraggingRef.current = false;
      }
    };
  }, []);

  const mergedStyle = useMemo(() => ({ ...style, cursor: "grab" }), [style]);

  return (
    <div
      className={`react-flex-layout-tab ${className}`}
      style={mergedStyle}
      onClick={handleClick}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span className="react-flex-layout-tab-title">
        {node.name || "Untitled"}
      </span>
      <button
        className={`react-flex-layout-tab-close ${closeButtonClassName}`.trim()}
        onClick={handleClose}
        type="button"
        aria-label="Close tab"
      >
        {closeIcon || <DefaultCloseIcon />}
      </button>
    </div>
  );
};
