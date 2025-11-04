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
  dropTargetIndex,
  direction = "ltr",
  className = "",
  style = {},
  closeIcon,
  closeButtonClassName,
}) => {
  const tabs = useMemo(() => {
    return node.children?.filter((child) => child.type === "tab") || [];
  }, [node.children]);

  // In RTL mode, reverse the tabs for proper visual order
  const tabsToRender = useMemo(() => {
    return direction === "rtl" ? [...tabs].reverse() : tabs;
  }, [tabs, direction]);

  // Ensure selected index is within bounds
  const rawSelectedIndex = node.selected ?? 0;
  const selectedTabIndex = Math.min(
    rawSelectedIndex,
    Math.max(0, tabs.length - 1)
  );
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

      // Check if we're over the header area (top 40px typically)
      const headerHeight = 40;
      const isOverHeader = y < headerHeight;

      if (isOverHeader) {
        // Find which tab we're over
        const headerRect = (e.currentTarget as HTMLElement)
          .querySelector(".react-flex-layout-tabset-header")
          ?.getBoundingClientRect();
        if (headerRect) {
          const headerX = e.clientX - headerRect.left;
          const tabElements = (e.currentTarget as HTMLElement).querySelectorAll(
            ".react-flex-layout-tab"
          );
          let targetIndex = tabs.length;

          if (direction === "rtl") {
            // For RTL, check from right to left
            for (let i = tabElements.length - 1; i >= 0; i--) {
              const tabRect = tabElements[i].getBoundingClientRect();
              const tabLeft = tabRect.left - headerRect.left;
              const tabRight = tabRect.right - headerRect.left;
              const tabCenter = (tabLeft + tabRight) / 2;

              if (headerX > tabCenter) {
                const originalIndex = tabs.findIndex(
                  (t) => t.id === tabsToRender[i].id
                );
                targetIndex = originalIndex;
                break;
              }
            }
            // If we're before all tabs in RTL, place at the end
            if (targetIndex === tabs.length && tabElements.length > 0) {
              const firstTabRect = tabElements[0].getBoundingClientRect();
              if (headerX > firstTabRect.right - headerRect.left) {
                const originalIndex = tabs.findIndex(
                  (t) => t.id === tabsToRender[0].id
                );
                targetIndex = originalIndex;
              }
            }
          } else {
            // For LTR, check from left to right
            for (let i = 0; i < tabElements.length; i++) {
              const tabRect = tabElements[i].getBoundingClientRect();
              const tabLeft = tabRect.left - headerRect.left;
              const tabRight = tabRect.right - headerRect.left;
              const tabCenter = (tabLeft + tabRight) / 2;

              if (headerX < tabCenter) {
                const originalIndex = tabs.findIndex(
                  (t) => t.id === tabsToRender[i].id
                );
                targetIndex = originalIndex;
                break;
              }
            }
          }

          // If we're past all tabs, place at the end
          if (targetIndex === tabs.length) {
            targetIndex = tabs.length;
          }

          position = "tab";
          onDragOver?.(e, node.id, position, targetIndex);
          return;
        }
      }

      // Determine drop zone based on mouse position for content area
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
    [node.id, tabs, tabsToRender, onDragOver]
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
        {tabsToRender.map((tab) => {
          const originalIndex = tabs.findIndex((t) => t.id === tab.id);
          const isActive = originalIndex === selectedTabIndex;
          const showDropIndicatorBefore =
            isDragOver &&
            dropPosition === "tab" &&
            dropTargetIndex !== null &&
            originalIndex === dropTargetIndex;

          return (
            <React.Fragment key={tab.id}>
              {showDropIndicatorBefore && (
                <div className="react-flex-layout-tab-drop-indicator" />
              )}
              <Tab
                node={tab}
                index={originalIndex}
                onSelect={handleTabSelect}
                onClose={handleTabClose}
                onDragStart={handleTabDragStart}
                onDragEnd={onTabDragEnd}
                className={isActive ? "active" : ""}
                closeIcon={closeIcon}
                closeButtonClassName={closeButtonClassName}
              />
            </React.Fragment>
          );
        })}
        {isDragOver &&
          dropPosition === "tab" &&
          dropTargetIndex !== null &&
          dropTargetIndex === tabs.length && (
            <div className="react-flex-layout-tab-drop-indicator" />
          )}
      </div>
      <div className="react-flex-layout-tabset-content">
        {selectedTab && (factory ? factory(selectedTab) : children)}
      </div>
    </div>
  );
};
