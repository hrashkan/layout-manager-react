// Main components
export { Layout } from "./components/Layout";
export { TabSet } from "./components/TabSet";
export { Tab } from "./components/Tab";
export { Splitter } from "./components/Splitter";

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
} from "./utils/layoutUtils";

// CSS imports
import "./components/Layout.css";
import "./components/TabSet.css";
import "./components/Tab.css";
import "./components/Splitter.css";
