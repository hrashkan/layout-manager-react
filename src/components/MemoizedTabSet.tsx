import { memo } from "react";
import { TabSet } from "./TabSet";
import { TabSetProps } from "../types";

export const MemoizedTabSet = memo<TabSetProps>(
  TabSet,
  (prevProps, nextProps) => {
    // Check all props that would require re-render
    if (prevProps.className !== nextProps.className) return false;
    if (prevProps.direction !== nextProps.direction) return false;
    if (prevProps.dragOverTabset !== nextProps.dragOverTabset) return false;
    if (prevProps.dropPosition !== nextProps.dropPosition) return false;
    if (prevProps.dropTargetIndex !== nextProps.dropTargetIndex) return false;
    if (prevProps.factory !== nextProps.factory) return false;
    if (prevProps.onTabSelect !== nextProps.onTabSelect) return false;
    if (prevProps.onTabClose !== nextProps.onTabClose) return false;
    if (prevProps.onTabDragStart !== nextProps.onTabDragStart) return false;
    if (prevProps.onTabDragEnd !== nextProps.onTabDragEnd) return false;
    if (prevProps.onDragOver !== nextProps.onDragOver) return false;
    if (prevProps.onDragLeave !== nextProps.onDragLeave) return false;
    if (prevProps.onDrop !== nextProps.onDrop) return false;
    if (prevProps.closeIcon !== nextProps.closeIcon) return false;
    if (prevProps.closeButtonClassName !== nextProps.closeButtonClassName)
      return false;
    if (prevProps.style !== nextProps.style) return false;
    if (prevProps.children !== nextProps.children) return false;

    // Deep compare node - this is the critical part
    // If node reference is the same, skip all checks
    if (prevProps.node === nextProps.node) {
      // Node reference unchanged, but still need to check if selected changed
      // (This shouldn't happen if updateNodeById works correctly, but just in case)
      if (prevProps.node.selected !== nextProps.node.selected) {
        return false;
      }
    } else {
      // Node reference changed - check if it's the same node with different properties
      if (prevProps.node.id !== nextProps.node.id) return false;

      // Only re-render if selected changed for THIS tabset
      if (prevProps.node.selected !== nextProps.node.selected) {
        return false; // This tabset needs to re-render
      }

      // Check other node properties that affect rendering
      if (prevProps.node.width !== nextProps.node.width) return false;
      if (prevProps.node.height !== nextProps.node.height) return false;
      if (prevProps.node.flex !== nextProps.node.flex) return false;
      if (prevProps.node.minWidth !== nextProps.node.minWidth) return false;
      if (prevProps.node.minHeight !== nextProps.node.minHeight) return false;
      if (prevProps.node.maxWidth !== nextProps.node.maxWidth) return false;
      if (prevProps.node.maxHeight !== nextProps.node.maxHeight) return false;

      // Compare children - only re-render if children actually changed
      // First check if children array reference is the same
      const prevChildren = prevProps.node.children || [];
      const nextChildren = nextProps.node.children || [];

      if (prevChildren === nextChildren) {
        // Same children array reference - no need to check individual children
      } else {
        // Different children array reference - check if children actually changed
        if (prevChildren.length !== nextChildren.length) return false;

        // Check if any child actually changed (not just reference)
        for (let i = 0; i < prevChildren.length; i++) {
          if (prevChildren[i] !== nextChildren[i]) {
            // Child reference changed - check if properties changed
            const prevChild = prevChildren[i];
            const nextChild = nextChildren[i];
            if (
              prevChild.id !== nextChild.id ||
              prevChild.type !== nextChild.type ||
              prevChild.name !== nextChild.name ||
              prevChild.component !== nextChild.component ||
              prevChild.enableClose !== nextChild.enableClose ||
              prevChild.enableDrag !== nextChild.enableDrag
            ) {
              return false;
            }
            // Child reference changed but properties are the same - this is fine, skip re-render
          }
        }
      }
    }

    return true; // Skip re-render
  }
);

MemoizedTabSet.displayName = "MemoizedTabSet";
