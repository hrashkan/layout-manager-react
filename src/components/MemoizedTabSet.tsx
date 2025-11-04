import { memo } from "react";
import { TabSet } from "./TabSet";
import { TabSetProps } from "../types";

export const MemoizedTabSet = memo<TabSetProps>(
  TabSet,
  (prevProps, nextProps) => {
    if (prevProps.node !== nextProps.node) {
      if (prevProps.node.id !== nextProps.node.id) return false;
      if (prevProps.node.selected !== nextProps.node.selected) return false;
      if (prevProps.node.width !== nextProps.node.width) return false;
      if (prevProps.node.height !== nextProps.node.height) return false;
      if (prevProps.node.flex !== nextProps.node.flex) return false;
      if (prevProps.node.minWidth !== nextProps.node.minWidth) return false;
      if (prevProps.node.minHeight !== nextProps.node.minHeight) return false;
      if (prevProps.node.maxWidth !== nextProps.node.maxWidth) return false;
      if (prevProps.node.maxHeight !== nextProps.node.maxHeight) return false;

      const prevChildren = prevProps.node.children || [];
      const nextChildren = nextProps.node.children || [];

      if (prevChildren.length !== nextChildren.length) return false;

      for (let i = 0; i < prevChildren.length; i++) {
        if (prevChildren[i] !== nextChildren[i]) {
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
        }
      }
    }

    if (prevProps.className !== nextProps.className) return false;
    if (prevProps.direction !== nextProps.direction) return false;
    if (prevProps.dragOverTabset !== nextProps.dragOverTabset) return false;
    if (prevProps.dropPosition !== nextProps.dropPosition) return false;
    if (prevProps.factory !== nextProps.factory) return false;
    if (prevProps.onTabSelect !== nextProps.onTabSelect) return false;
    if (prevProps.onTabClose !== nextProps.onTabClose) return false;
    if (prevProps.onTabDragStart !== nextProps.onTabDragStart) return false;
    if (prevProps.onTabDragEnd !== nextProps.onTabDragEnd) return false;
    if (prevProps.onDragOver !== nextProps.onDragOver) return false;
    if (prevProps.onDragLeave !== nextProps.onDragLeave) return false;
    if (prevProps.onDrop !== nextProps.onDrop) return false;

    return true;
  }
);

MemoizedTabSet.displayName = "MemoizedTabSet";
