import { memo } from "react";
import { Tab } from "./Tab";
import { TabProps } from "../types";

export const MemoizedTab = memo<TabProps>(Tab, (prevProps, nextProps) => {
  return (
    prevProps.node.id === nextProps.node.id &&
    prevProps.node.name === nextProps.node.name &&
    prevProps.node.enableClose === nextProps.node.enableClose &&
    prevProps.node.enableDrag === nextProps.node.enableDrag &&
    prevProps.className === nextProps.className
  );
});

MemoizedTab.displayName = "MemoizedTab";
