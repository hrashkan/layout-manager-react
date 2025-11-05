export { Layout } from "./components/Layout";
export { TabSet } from "./components/TabSet";
export { Tab } from "./components/Tab";
export { Splitter } from "./components/Splitter";
export { DefaultCloseIcon } from "./components/DefaultCloseIcon";

export { MemoizedTab } from "./components/MemoizedTab";
export { MemoizedTabSet } from "./components/MemoizedTabSet";

export type {
  LayoutNode,
  LayoutModel,
  LayoutProps,
  LayoutRef,
  LayoutAction,
  SelectTabPayload,
  CloseTabsetPayload,
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
} from "./utils/layoutUtils";
export type { ComponentRestoreData } from "./utils/layoutUtils";

export {
  createLayoutStorage,
  isLocalStorageAvailable,
  LayoutStorage,
} from "./utils/storageUtils";
export type { StorageOptions } from "./utils/storageUtils";

export { useLayoutStorage } from "./hooks/useLayoutStorage";
export type { UseLayoutStorageOptions } from "./hooks/useLayoutStorage";

import "./components/Layout.css";
import "./components/TabSet.css";
import "./components/Tab.css";
import "./components/Splitter.css";
