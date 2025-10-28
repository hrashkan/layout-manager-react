import { memo } from "react";
import { TabSet } from "./TabSet";
import { TabSetProps } from "../types";

export const MemoizedTabSet = memo<TabSetProps>(
  TabSet,
  (prevProps, nextProps) => {
    return (
      prevProps.node.id === nextProps.node.id &&
      prevProps.node.selected === nextProps.node.selected &&
      prevProps.node.width === nextProps.node.width &&
      prevProps.node.height === nextProps.node.height &&
      prevProps.node.flex === nextProps.node.flex &&
      prevProps.node.children?.length === nextProps.node.children?.length &&
      prevProps.className === nextProps.className
    );
  }
);

MemoizedTabSet.displayName = "MemoizedTabSet";
