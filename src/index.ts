export { Layout } from "./components/Layout";
export { TabSet } from "./components/TabSet";
export { Tab } from "./components/Tab";
export { Splitter } from "./components/Splitter";
export { DefaultCloseIcon } from "./components/DefaultCloseIcon";
export { ScrollLeftIcon, ScrollRightIcon, MaximizeIcon, RestoreIcon } from "./components/icons";

export { MemoizedTab } from "./components/MemoizedTab";
export { MemoizedTabSet } from "./components/MemoizedTabSet";
export { useTabActive } from "./hooks/useTabActive";

export type {
  LayoutNode,
  LayoutModel,
  LayoutProps,
  LayoutRef,
  LayoutAction,
  SelectTabPayload,
  CloseTabsetPayload,
  MaximizeTabsetPayload,
  TabProps,
  TabSetProps,
  SplitterProps,
  ResizeData,
  DragData,
} from "./types";

export {
  createLayoutModel,
  createTab,
  createTabSet,
  createRow,
  createColumn,
  findNodeById,
  updateNodeById,
  removeNodeById,
  calculateFlexValues,
  removeEmptyTabsets,
  removeTab,
  restoreTab,
  tabExists,
  addTabToTabset,
  isCapabilityEnabled,
  countTabsets,
  nodeContainsId,
  resolveMaximizedTabsetId,
  withSyncedMaximize,
} from "./utils/layoutUtils";
export type { ComponentRestoreData } from "./utils/layoutUtils";


import "./components/Layout.css";
import "./components/TabSet.css";
import "./components/Tab.css";
import "./components/Splitter.css";
