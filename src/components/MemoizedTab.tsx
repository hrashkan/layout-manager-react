import { memo } from "react";
import { Tab } from "./Tab";
import { TabProps } from "../types";

export const MemoizedTab = memo<TabProps>(Tab, (prevProps, nextProps) => {
  if (prevProps.className !== nextProps.className) return false;
  if (prevProps.style !== nextProps.style) return false;
  if (prevProps.closeIcon !== nextProps.closeIcon) return false;
  if (prevProps.closeButtonClassName !== nextProps.closeButtonClassName)
    return false;

  if (prevProps.index !== nextProps.index) return false;
  if (prevProps.onSelect !== nextProps.onSelect) return false;
  if (prevProps.onClose !== nextProps.onClose) return false;
  if (prevProps.onDragStart !== nextProps.onDragStart) return false;
  if (prevProps.onDragEnd !== nextProps.onDragEnd) return false;

  if (prevProps.node.id !== nextProps.node.id) return false;
  if (prevProps.node.name !== nextProps.node.name) return false;

  return true;
});

MemoizedTab.displayName = "MemoizedTab";
