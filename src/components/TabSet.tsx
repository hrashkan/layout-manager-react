import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { TabSetProps, DropPosition } from "../types";
import { Tab } from "./Tab";
import { ScrollLeftIcon, ScrollRightIcon } from "./icons";
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
  scrollLeftIcon,
  scrollRightIcon,
}) => {
  const tabs = useMemo(() => {
    return node.children?.filter((child) => child.type === "tab") || [];
  }, [node.children]);

  const idToIndex = useMemo(() => {
    const map = new Map<string, number>();
    for (let i = 0; i < tabs.length; i++) {
      const t = tabs[i];
      if (t && t.id) map.set(t.id, i);
    }
    return map;
  }, [tabs]);

  const tabsToRender = useMemo(() => {
    return tabs;
  }, [tabs]);

  const rawSelectedIndex = node.selected ?? 0;
  const selectedTabIndex = Math.min(
    rawSelectedIndex,
    Math.max(0, tabs.length - 1)
  );
  const selectedTab = tabs[selectedTabIndex];

  const handleTabSelect = useCallback(
    (tabId: string) => {
      const tabIndex = idToIndex.get(tabId);
      if (tabIndex !== undefined && tabIndex !== -1) {
        onTabSelect?.(node.id, tabIndex);
      }
    },
    [node.id, idToIndex, onTabSelect]
  );

  const handleTabClose = useCallback(
    (tabId: string) => {
      const tabIndex = idToIndex.get(tabId);
      if (tabIndex !== undefined && tabIndex !== -1) {
        onTabClose?.(node.id, tabIndex);
      }
    },
    [node.id, idToIndex, onTabClose]
  );

  const handleTabDragStart = useCallback(
    (tabId: string, tabIndex?: number) => {
      const derivedIndex =
        tabIndex !== undefined ? tabIndex : idToIndex.get(tabId) ?? -1;
      if (derivedIndex !== -1) {
        onTabDragStart?.(node.id, derivedIndex);
      }
    },
    [node.id, idToIndex, onTabDragStart]
  );

  const headerRef = useRef<HTMLDivElement | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkScrollButtonsRef = useRef<() => void>();
  checkScrollButtonsRef.current = () => {
    const container = tabsContainerRef.current;
    if (!container) {
      setShowLeftArrow(false);
      setShowRightArrow(false);
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 1);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      checkScrollButtonsRef.current?.();
    }, 10);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;

      let position: DropPosition = "center";

      const headerHeight = 40;
      const isOverHeader = y < headerHeight;

      if (isOverHeader) {
        const headerEl = headerRef.current;
        if (headerEl) {
          const headerRect = headerEl.getBoundingClientRect();
          const headerX = e.clientX - headerRect.left;
          const tabElements = headerEl.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let targetIndex = tabs.length;

          if (direction === "rtl") {
            for (let i = tabElements.length - 1; i >= 0; i--) {
              const tabRect = (
                tabElements[i] as HTMLElement
              ).getBoundingClientRect();
              const tabLeft = tabRect.left - headerRect.left;
              const tabRight = tabRect.right - headerRect.left;
              const tabCenter = (tabLeft + tabRight) / 2;

              if (headerX > tabCenter) {
                const originalIndex = idToIndex.get(tabsToRender[i].id);
                if (originalIndex !== undefined && originalIndex !== -1) {
                  targetIndex = originalIndex;
                }
                break;
              }
            }
            if (targetIndex === tabs.length && tabElements.length > 0) {
              const firstTabRect = (
                tabElements[0] as HTMLElement
              ).getBoundingClientRect();
              if (headerX > firstTabRect.right - headerRect.left) {
                const originalIndex = idToIndex.get(tabsToRender[0].id);
                if (originalIndex !== undefined && originalIndex !== -1) {
                  targetIndex = originalIndex;
                }
              }
            }
          } else {
            for (let i = 0; i < tabElements.length; i++) {
              const tabRect = (
                tabElements[i] as HTMLElement
              ).getBoundingClientRect();
              const tabLeft = tabRect.left - headerRect.left;
              const tabRight = tabRect.right - headerRect.left;
              const tabCenter = (tabLeft + tabRight) / 2;

              if (headerX < tabCenter) {
                const originalIndex = idToIndex.get(tabsToRender[i].id);
                if (originalIndex !== undefined && originalIndex !== -1) {
                  targetIndex = originalIndex;
                }
                break;
              }
            }
          }

          position = "tab";
          onDragOver?.(e, node.id, position, targetIndex);
          return;
        }
      }

      if (x < width * 0.25) {
        position = direction === "rtl" ? "right" : "left";
      } else if (x > width * 0.75) {
        position = direction === "rtl" ? "left" : "right";
      } else if (y < height * 0.25) {
        position = "top";
      } else if (y > height * 0.75) {
        position = "bottom";
      } else {
        position = "center";
      }

      onDragOver?.(e, node.id, position);
    },
    [node.id, direction, tabs.length, tabsToRender, idToIndex, onDragOver]
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

  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container || selectedTabIndex < 0) return;

    let rafId: number;
    rafId = requestAnimationFrame(() => {
      const tabElements = container.children;
      const selectedTab = tabElements[selectedTabIndex] as HTMLElement;
      if (!selectedTab) return;

      const containerRect = container.getBoundingClientRect();
      const tabRect = selectedTab.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;

      if (tabRect.left < containerRect.left) {
        container.scrollTo({
          left: scrollLeft - (containerRect.left - tabRect.left) - 10,
          behavior: "smooth",
        });
      } else if (tabRect.right > containerRect.right) {
        container.scrollTo({
          left: scrollLeft + (tabRect.right - containerRect.right) + 10,
          behavior: "smooth",
        });
      }
    });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [selectedTabIndex, tabsToRender.length]);

  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;

    const rafIdRef = { current: 0 };
    rafIdRef.current = requestAnimationFrame(() => {
      checkScrollButtonsRef.current?.();
    });

    container.addEventListener("scroll", handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        checkScrollButtonsRef.current?.();
      });
    });
    resizeObserver.observe(container);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      container.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
  }, [handleScroll, tabsToRender.length]);

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

  if (tabs.length === 0) {
    return null;
  }

  const visualDropPosition =
    isDragOver && dropPosition
      ? direction === "rtl" &&
        (dropPosition === "left" || dropPosition === "right")
        ? dropPosition === "left"
          ? "right"
          : "left"
        : dropPosition
      : undefined;

  return (
    <div
      className={`react-flex-layout-tabset ${
        isDragOver ? "drag-over" : ""
      } ${className}`}
      style={tabSetStyle}
      data-tabset-id={node.id}
      data-drop-position={visualDropPosition}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="react-flex-layout-tabset-header" ref={headerRef}>
        {showLeftArrow && (
          <button
            className="react-flex-layout-tabset-scroll-button react-flex-layout-tabset-scroll-left"
            onClick={() => {
              const container = tabsContainerRef.current;
              if (container) {
                container.scrollBy({ left: -200, behavior: "smooth" });
              }
            }}
            type="button"
            aria-label="Scroll left"
          >
            {scrollLeftIcon || <ScrollLeftIcon />}
          </button>
        )}
        <div
          ref={tabsContainerRef}
          className="react-flex-layout-tabset-tabs-container"
          onScroll={handleScroll}
        >
          {tabsToRender.map((tab) => {
            const originalIndex = idToIndex.get(tab.id) ?? -1;
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
        {showRightArrow && (
          <button
            className="react-flex-layout-tabset-scroll-button react-flex-layout-tabset-scroll-right"
            onClick={() => {
              const container = tabsContainerRef.current;
              if (container) {
                container.scrollBy({ left: 200, behavior: "smooth" });
              }
            }}
            type="button"
            aria-label="Scroll right"
          >
            {scrollRightIcon || <ScrollRightIcon />}
          </button>
        )}
      </div>
      <div className="react-flex-layout-tabset-content">
        {selectedTab && (factory ? factory(selectedTab) : children)}
      </div>
    </div>
  );
};
