import React, { useCallback } from "react";
import { TabProps } from "../types";
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
}) => {
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

      // Add visual feedback
      e.currentTarget.classList.add("dragging");
      document.body.classList.add("dragging");

      // Call the parent handler
      onDragStart?.(node.id, index);
    },
    [node.id, index, onDragStart]
  );

  const handleDragEnd = useCallback(
    (e: React.DragEvent) => {
      e.currentTarget.classList.remove("dragging");
      document.body.classList.remove("dragging");

      // Call the parent handler
      onDragEnd?.();
    },
    [onDragEnd]
  );

  return (
    <div
      className={`react-flex-layout-tab ${className}`}
      style={{ ...style, cursor: "grab" }}
      onClick={handleClick}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span className="react-flex-layout-tab-title">
        {node.name || "Untitled"}
      </span>
      {node.enableClose !== false && (
        <button
          className="react-flex-layout-tab-close"
          onClick={handleClose}
          type="button"
          aria-label="Close tab"
        >
          ×
        </button>
      )}
    </div>
  );
};
