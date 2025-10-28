// Main components
export { Layout } from "./components/Layout";
export { TabSet } from "./components/TabSet";
export { Tab } from "./components/Tab";
export { Splitter } from "./components/Splitter";
export { DefaultCloseIcon } from "./components/DefaultCloseIcon";

// Memoized components for better performance
export { MemoizedTab } from "./components/MemoizedTab";
export { MemoizedTabSet } from "./components/MemoizedTabSet";

// Types
export type {
  LayoutNode,
  LayoutModel,
  LayoutProps,
  LayoutAction,
  SelectTabPayload,
  CloseTabsetPayload,
  TabProps,
  TabSetProps,
  SplitterProps,
  ResizeData,
  DragData,
} from "./types";

// Utilities
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
} from "./utils/layoutUtils";

// Storage utilities
export {
  createLayoutStorage,
  isLocalStorageAvailable,
  LayoutStorage,
} from "./utils/storageUtils";
export type { StorageOptions } from "./utils/storageUtils";

// Storage hook
export { useLayoutStorage } from "./hooks/useLayoutStorage";
export type { UseLayoutStorageOptions } from "./hooks/useLayoutStorage";

// CSS imports
import "./components/Layout.css";
import "./components/TabSet.css";
import "./components/Tab.css";
import "./components/Splitter.css";
