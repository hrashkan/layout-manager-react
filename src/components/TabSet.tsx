import React, { useCallback, useMemo } from "react";
import { TabSetProps, DropPosition } from "../types";
import { Tab } from "./Tab";
import "./TabSet.css";

export const TabSet: React.FC<TabSetProps> = ({
  node,
  children,
  factory,
  onTabSelect,
  onTabClose,
  onTabDragStart,
  onTabDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  dragOverTabset,
  dropPosition,
  className = "",
  style = {},
}) => {
  const tabs = useMemo(() => {
    return node.children?.filter((child) => child.type === "tab") || [];
  }, [node.children]);

  const selectedTabIndex = node.selected ?? 0;
  const selectedTab = tabs[selectedTabIndex];

  const handleTabSelect = useCallback(
    (tabId: string) => {
      const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
      if (tabIndex !== -1) {
        onTabSelect?.(node.id, tabIndex);
      }
    },
    [node.id, tabs, onTabSelect]
  );

  const handleTabClose = useCallback(
    (tabId: string) => {
      const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
      if (tabIndex !== -1) {
        onTabClose?.(node.id, tabIndex);
      }
    },
    [node.id, tabs, onTabClose]
  );

  const handleTabDragStart = useCallback(
    (tabId: string, tabIndex?: number) => {
      console.log("TABSET DRAG START:", node.id, tabId, tabIndex);
      const actualIndex =
        tabIndex !== undefined
          ? tabIndex
          : tabs.findIndex((tab) => tab.id === tabId);
      if (actualIndex !== -1) {
        onTabDragStart?.(node.id, actualIndex);
      }
    },
    [node.id, tabs, onTabDragStart]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";

      // Calculate drop position based on mouse position
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;

      let position: DropPosition = "center";

      // Determine drop zone based on mouse position
      if (x < width * 0.25) {
        position = "left";
      } else if (x > width * 0.75) {
        position = "right";
      } else if (y < height * 0.25) {
        position = "top";
      } else if (y > height * 0.75) {
        position = "bottom";
      } else {
        position = "center";
      }

      // Pass position information to the drag over handler
      onDragOver?.(e, node.id, position);
    },
    [node.id, onDragOver]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      onDragLeave?.(e);
    },
    [onDragLeave]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      onDrop?.(e, node.id);
    },
    [node.id, onDrop]
  );

  const isDragOver = dragOverTabset === node.id;

  const tabSetStyle: React.CSSProperties = {
    ...style,
    width: node.width ? `${node.width}%` : undefined,
    height: node.height ? `${node.height}%` : undefined,
    flex: `${node.flex || 1} 1 0%`,
    minWidth: node.minWidth ? `${node.minWidth}px` : undefined,
    minHeight: node.minHeight ? `${node.minHeight}px` : undefined,
    maxWidth: node.maxWidth ? `${node.maxWidth}px` : undefined,
    maxHeight: node.maxHeight ? `${node.maxHeight}px` : undefined,
  };

  // Don't render anything if tabset is empty
  if (tabs.length === 0) {
    return null;
  }

  return (
    <div
      className={`react-flex-layout-tabset ${
        isDragOver ? "drag-over" : ""
      } ${className}`}
      style={tabSetStyle}
      data-drop-position={isDragOver ? dropPosition : undefined}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="react-flex-layout-tabset-header">
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            node={tab}
            index={index}
            onSelect={handleTabSelect}
            onClose={handleTabClose}
            onDragStart={handleTabDragStart}
            onDragEnd={onTabDragEnd}
            className={index === selectedTabIndex ? "active" : ""}
          />
        ))}
      </div>
      <div className="react-flex-layout-tabset-content">
        {selectedTab && (factory ? factory(selectedTab) : children)}
      </div>
    </div>
  );
};
